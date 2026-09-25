/**
 * Egyszerű, egyfelhasználós belépés az adminba.
 * A jelszó a Worker `ADMIN_JELSZO` titkos változójában van; a süti aláírt (HMAC-SHA256),
 * így a jelszó cseréje minden korábbi belépést érvénytelenít.
 */
import type { Cookies } from '@sveltejs/kit';

export const SUTI = 'okos_admin';
const ERVENYES_NAP = 30;

const kodol = new TextEncoder();

async function kulcs(jelszo: string) {
	return crypto.subtle.importKey(
		'raw',
		kodol.encode(`okosspanyol-admin:${jelszo}`),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign', 'verify']
	);
}

const hex = (b: ArrayBuffer) =>
	[...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');

async function alair(jelszo: string, adat: string) {
	return hex(await crypto.subtle.sign('HMAC', await kulcs(jelszo), kodol.encode(adat)));
}

/** Időzítés-biztos összehasonlítás. */
async function egyezik(a: string, b: string) {
	const [ha, hb] = await Promise.all([
		crypto.subtle.digest('SHA-256', kodol.encode(a)),
		crypto.subtle.digest('SHA-256', kodol.encode(b))
	]);
	const x = new Uint8Array(ha);
	const y = new Uint8Array(hb);
	let kulonbseg = 0;
	for (let i = 0; i < x.length; i++) kulonbseg |= x[i] ^ y[i];
	return kulonbseg === 0;
}

export async function jelszoHelyes(jelszo: string | undefined, megadott: string) {
	if (!jelszo) return false;
	return egyezik(jelszo, megadott);
}

export async function belepteto(cookies: Cookies, jelszo: string, biztonsagos: boolean) {
	const lejarat = Date.now() + ERVENYES_NAP * 86400_000;
	const ertek = `${lejarat}.${await alair(jelszo, String(lejarat))}`;
	cookies.set(SUTI, ertek, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: biztonsagos,
		maxAge: ERVENYES_NAP * 86400
	});
}

export async function belepve(cookies: Cookies, jelszo: string | undefined) {
	const ertek = cookies.get(SUTI);
	if (!ertek || !jelszo) return false;
	const [lejarat, alairas] = ertek.split('.');
	if (!lejarat || !alairas || Number(lejarat) < Date.now()) return false;
	return egyezik(alairas, await alair(jelszo, lejarat));
}

export function kileptetes(cookies: Cookies) {
	cookies.delete(SUTI, { path: '/' });
}
