/**
 * A teljes weboldal egyetlen D1-sorban él (`oldal` tábla, id = 1), JSON-ként.
 *
 * Olvasás három szinten, hogy a D1-hez szinte soha ne kelljen fordulni:
 *   1. a Worker memóriája (izolátumonként, MEMORIA_MP másodpercig),
 *   2. a Cloudflare adatközpont gyorsítótára (Cache API, CACHE_MP másodpercig — csak saját domainen működik),
 *   3. D1 (egyetlen sor, egyetlen olvasás).
 * Mentéskor mindhárom azonnal frissül abban az adatközpontban, ahonnan mentettél;
 * a világ többi részén legkésőbb CACHE_MP másodperc múlva.
 */
import type { D1Database } from '@cloudflare/workers-types';
import { alapTartalom } from '$lib/tartalom/alap';
import { osszefesul } from '$lib/tartalom/osszefesul';
import type { Tartalom } from '$lib/tartalom/tipusok';

export const MEMORIA_MP = 30;
export const CACHE_MP = 600;

export const SEMA = `CREATE TABLE IF NOT EXISTS oldal (
	id INTEGER PRIMARY KEY CHECK (id = 1),
	adat TEXT NOT NULL,
	elozo TEXT,
	verzio INTEGER NOT NULL,
	frissitve TEXT NOT NULL
)`;

export interface Betoltott {
	tartalom: Tartalom;
	/** 0 = még nincs mentés (alapértelmezett tartalom). */
	verzio: number;
	frissitve: string;
}

let memoria: (Betoltott & { ido: number }) | null = null;

const CACHE_KULCS = 'https://tartalom.okosspanyol.belso/oldal';

function cache(platform: App.Platform | undefined): Cache | undefined {
	try {
		return (platform?.caches as unknown as { default?: Cache } | undefined)?.default;
	} catch {
		return undefined;
	}
}

function alap(): Betoltott {
	return { tartalom: alapTartalom(), verzio: 0, frissitve: '' };
}

async function d1Olvasas(db: D1Database): Promise<Betoltott> {
	try {
		const sor = await db
			.prepare('SELECT adat, verzio, frissitve FROM oldal WHERE id = 1')
			.first<{ adat: string; verzio: number; frissitve: string }>();
		if (!sor) return alap();
		return { tartalom: osszefesul(JSON.parse(sor.adat)), verzio: sor.verzio, frissitve: sor.frissitve };
	} catch (hiba) {
		// Még nincs tábla (első indítás) — az alapértelmezett tartalom látszik.
		if (String(hiba).includes('no such table')) return alap();
		throw hiba;
	}
}

/** A nyilvános oldal ezt használja: gyorsítótárból, ha lehet. */
export async function tartalomBetoltese(platform: App.Platform | undefined): Promise<Betoltott> {
	const most = Date.now();
	if (memoria && most - memoria.ido < MEMORIA_MP * 1000) return memoria;

	const db = platform?.env?.DB;
	if (!db) return alap();

	const c = cache(platform);
	if (c) {
		const talalat = await c.match(CACHE_KULCS).catch(() => undefined);
		if (talalat) {
			const b = (await talalat.json()) as { adat: unknown; verzio: number; frissitve: string };
			memoria = { tartalom: osszefesul(b.adat), verzio: b.verzio, frissitve: b.frissitve, ido: most };
			return memoria;
		}
	}

	const b = await d1Olvasas(db);
	memoria = { ...b, ido: most };
	if (c) platform?.ctx?.waitUntil(cacheIras(c, b));
	return b;
}

async function cacheIras(c: Cache, b: Betoltott) {
	await c
		.put(
			CACHE_KULCS,
			new Response(JSON.stringify({ adat: b.tartalom, verzio: b.verzio, frissitve: b.frissitve }), {
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': `public, max-age=${CACHE_MP}`
				}
			})
		)
		.catch(() => {});
}

/** Az admin mindig a friss, D1-ben lévő állapotot kapja. */
export async function tartalomFrissen(platform: App.Platform | undefined): Promise<Betoltott> {
	const db = platform?.env?.DB;
	return db ? d1Olvasas(db) : alap();
}

export class Utkozes extends Error {}

/**
 * Mentés. Ha közben máshonnan (pl. egy másik lapon) már mentettél, `Utkozes`-t dob,
 * hogy ne írd felül észrevétlenül a másik változatot.
 */
export async function tartalomMentese(
	platform: App.Platform | undefined,
	tartalom: Tartalom,
	alapVerzio: number
): Promise<Betoltott> {
	const db = platform?.env?.DB;
	if (!db) throw new Error('Nincs D1 adatbázis (DB) a Workerhez kötve.');

	await db.prepare(SEMA).run();
	const jelenlegi = await db
		.prepare('SELECT verzio, adat FROM oldal WHERE id = 1')
		.first<{ verzio: number; adat: string }>();
	const verzio = jelenlegi?.verzio ?? 0;
	if (verzio !== alapVerzio) throw new Utkozes();

	const frissitve = new Date().toISOString();
	const ujVerzio = verzio + 1;
	const eredmeny = await db
		.prepare(
			`INSERT INTO oldal (id, adat, elozo, verzio, frissitve) VALUES (1, ?1, NULL, ?2, ?3)
			 ON CONFLICT (id) DO UPDATE SET elozo = oldal.adat, adat = ?1, verzio = ?2, frissitve = ?3
			 WHERE oldal.verzio = ?4`
		)
		.bind(JSON.stringify(tartalom), ujVerzio, frissitve, verzio)
		.run();
	if (!eredmeny.meta.changes) throw new Utkozes();

	return frissites(platform, { tartalom, verzio: ujVerzio, frissitve });
}

/** Az előző mentés visszaállítása (egy lépés visszavonás). */
export async function elozoVisszaallitasa(platform: App.Platform | undefined): Promise<Betoltott> {
	const db = platform?.env?.DB;
	if (!db) throw new Error('Nincs D1 adatbázis (DB) a Workerhez kötve.');
	const sor = await db
		.prepare('SELECT elozo, verzio FROM oldal WHERE id = 1')
		.first<{ elozo: string | null; verzio: number }>();
	if (!sor?.elozo) throw new Error('Nincs korábbi mentés.');

	const frissitve = new Date().toISOString();
	const ujVerzio = sor.verzio + 1;
	await db
		.prepare(
			'UPDATE oldal SET adat = elozo, elozo = adat, verzio = ?1, frissitve = ?2 WHERE id = 1'
		)
		.bind(ujVerzio, frissitve)
		.run();

	return frissites(platform, {
		tartalom: osszefesul(JSON.parse(sor.elozo)),
		verzio: ujVerzio,
		frissitve
	});
}

async function frissites(platform: App.Platform | undefined, b: Betoltott): Promise<Betoltott> {
	memoria = { ...b, ido: Date.now() };
	const c = cache(platform);
	if (c) await cacheIras(c, b);
	return b;
}

export async function vanElozo(platform: App.Platform | undefined): Promise<boolean> {
	const db = platform?.env?.DB;
	if (!db) return false;
	try {
		const sor = await db
			.prepare('SELECT elozo IS NOT NULL AS van FROM oldal WHERE id = 1')
			.first<{ van: number }>();
		return !!sor?.van;
	} catch {
		return false;
	}
}
