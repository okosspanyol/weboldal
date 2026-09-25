/**
 * A mentett tartalom összefésülése az alapértékekkel: ha az oldal később új mezőt kap,
 * a régi mentésből hiányzó érték az alapértelmezettet veszi fel, és semmi nem törik el.
 */
import { alapHorgonyok, alapTartalom, szakaszAlapok } from './alap';
import type { Szakasz, SzakaszTipus, Tartalom } from './tipusok';

type Obj = Record<string, unknown>;

const objektum = (x: unknown): x is Obj => typeof x === 'object' && x !== null && !Array.isArray(x);

/**
 * Az alap szerkezetét követi: az objektumokat kulcsonként fésüli össze, a listákat egészben veszi át
 * a mentésből (a lista elemeit az alap első elemének mintájára egészíti ki), a típusa nem egyezőt eldobja.
 */
function fesul<T>(alap: T, mentett: unknown): T {
	if (mentett === undefined || mentett === null) return alap;

	if (Array.isArray(alap)) {
		if (!Array.isArray(mentett)) return alap;
		const minta = alap[0];
		return mentett.map((elem) => (minta === undefined ? elem : fesul(minta, elem))) as T;
	}

	if (objektum(alap)) {
		if (!objektum(mentett)) return alap;
		const eredmeny: Obj = {};
		for (const [kulcs, ertek] of Object.entries(alap)) eredmeny[kulcs] = fesul(ertek, mentett[kulcs]);
		return eredmeny as T;
	}

	return (typeof mentett === typeof alap ? mentett : alap) as T;
}

function fesulSzakasz(mentett: unknown, index: number): Szakasz | null {
	if (!objektum(mentett)) return null;
	const tipus = mentett.tipus as SzakaszTipus;
	if (!(tipus in szakaszAlapok)) return null;

	return {
		id: typeof mentett.id === 'string' && mentett.id ? mentett.id : `${tipus}-${index}`,
		tipus,
		lathato: mentett.lathato !== false,
		horgony: typeof mentett.horgony === 'string' ? mentett.horgony : alapHorgonyok[tipus],
		adat: fesul(szakaszAlapok[tipus]() as unknown, mentett.adat)
	} as Szakasz;
}

export function osszefesul(mentett: unknown): Tartalom {
	const alap = alapTartalom();
	if (!objektum(mentett)) return alap;

	const { szakaszok: _sz, ...alapTobbi } = alap;
	const tartalom = fesul(alapTobbi, mentett) as Omit<Tartalom, 'szakaszok'>;

	const szakaszok = Array.isArray(mentett.szakaszok)
		? mentett.szakaszok.map(fesulSzakasz).filter((s): s is Szakasz => s !== null)
		: alap.szakaszok;

	// Egyedi azonosítók (a szerkesztő ezek alapján követi a szakaszokat)
	const latott = new Set<string>();
	for (const s of szakaszok) {
		while (latott.has(s.id)) s.id += '-2';
		latott.add(s.id);
	}

	return { ...tartalom, szakaszok };
}
