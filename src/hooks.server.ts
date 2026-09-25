import { dev, version } from '$app/environment';
import { json, redirect, type Handle } from '@sveltejs/kit';
import { belepve } from '$lib/server/azonositas';
import { CACHE_MP, tartalomBetoltese } from '$lib/server/tarolo';

/**
 * Kész HTML-oldalak gyorsítótára. A kulcsban benne van a tartalom verziója és a kód verziója,
 * így egy admin-mentés vagy egy új kitétel után magától a friss oldal készül el.
 */
const html = new Map<string, { test: string; fejlecek: [string, string][] }>();
const HTML_MAX = 60;

/** Böngésző: mindig rákérdez, de ha nem változott semmi, 304-et kap (nem tölti le újra). */
const BONGESZO = 'public, max-age=0, must-revalidate';

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	if (pathname === '/admin' || pathname.startsWith('/admin/')) {
		const jelszo = event.platform?.env?.ADMIN_JELSZO;
		event.locals.admin = await belepve(event.cookies, jelszo);
		if (!event.locals.admin && pathname !== '/admin/belepes') {
			if (pathname.startsWith('/admin/api/')) return json({ hiba: 'Lépj be újra.' }, { status: 401 });
			redirect(303, '/admin/belepes');
		}
		const valasz = await resolve(event);
		valasz.headers.set('Cache-Control', 'no-store');
		valasz.headers.set('X-Robots-Tag', 'noindex, nofollow');
		return valasz;
	}

	const betoltott = await tartalomBetoltese(event.platform);
	event.locals.tartalom = betoltott.tartalom;
	event.locals.verzio = betoltott.verzio;

	if (event.request.method !== 'GET' || dev) return resolve(event);

	// A mentés ideje is benne van, így egy újralétrehozott adatbázis azonos verziószáma sem ütközik.
	const jel = `${betoltott.verzio}.${Date.parse(betoltott.frissitve || '0') || 0}`;
	const etag = `W/"${jel}-${version}"`;
	if (event.request.headers.get('if-none-match') === etag) {
		return new Response(null, { status: 304, headers: { ETag: etag, 'Cache-Control': BONGESZO } });
	}

	const kulcs = `${pathname}?v=${jel}&b=${version}`;
	const kesz = (test: BodyInit | null, fejlecek: HeadersInit, status = 200) => {
		const h = new Headers(fejlecek);
		h.set('ETag', etag);
		h.set('Cache-Control', BONGESZO);
		return new Response(test, { status, headers: h });
	};

	// 1. A Worker memóriája
	const memoriabol = html.get(kulcs);
	if (memoriabol) return kesz(memoriabol.test, memoriabol.fejlecek);

	// 2. Az adatközpont gyorsítótára (saját domainen)
	const c = (event.platform?.caches as unknown as { default?: Cache } | undefined)?.default;
	const cacheKulcs = `https://html.okosspanyol.belso${kulcs}`;
	if (c) {
		const talalat = await c.match(cacheKulcs).catch(() => undefined);
		if (talalat) {
			const test = await talalat.text();
			const fejlecek = [...talalat.headers].filter(([k]) => k === 'content-type') as [string, string][];
			tarol(kulcs, test, fejlecek);
			return kesz(test, fejlecek);
		}
	}

	// 3. Elkészítés
	const valasz = await resolve(event);
	const tipus = valasz.headers.get('content-type') ?? '';
	if (valasz.status !== 200 || !/text\/(html|plain)|xml/.test(tipus)) return valasz;

	const test = await valasz.text();
	const fejlecek: [string, string][] = [['content-type', tipus]];
	tarol(kulcs, test, fejlecek);
	if (c) {
		event.platform?.ctx?.waitUntil(
			c
				.put(
					cacheKulcs,
					new Response(test, {
						headers: { 'content-type': tipus, 'Cache-Control': `public, max-age=${CACHE_MP * 6}` }
					})
				)
				.catch(() => {})
		);
	}
	return kesz(test, [...valasz.headers]);
};

function tarol(kulcs: string, test: string, fejlecek: [string, string][]) {
	if (html.size >= HTML_MAX) html.delete(html.keys().next().value!);
	html.set(kulcs, { test, fejlecek });
}
