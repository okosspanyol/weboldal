import { getContext, setContext } from 'svelte';
import { blokk, sima, sor, valtozok, type Valtozok } from './szoveg';
import type { Tartalom } from './tipusok';

const KULCS = Symbol('tartalom');

/** A gyökér elrendezés (vagy az admin előnézete) adja át a tartalmat az összes komponensnek. */
export function tartalomBeallitasa(get: () => Tartalom) {
	setContext(KULCS, get);
}

/**
 * Komponensekben: `const o = oldal();` majd `o.t.foglalas.url`, `{@html o.sor(adat.cim)}`.
 * Az admin előnézetében a tartalom élő ($state), így minden gépelés azonnal látszik.
 */
export function oldal() {
	const get = getContext<() => Tartalom>(KULCS);
	return {
		get t() {
			return get();
		},
		get v(): Valtozok {
			return valtozok(get());
		},
		sor: (szoveg: string, extra?: Valtozok) => sor(szoveg, valtozok(get(), extra)),
		blokk: (szoveg: string, extra?: Valtozok) => blokk(szoveg, valtozok(get(), extra)),
		sima: (szoveg: string, extra?: Valtozok) => sima(szoveg, valtozok(get(), extra))
	};
}
