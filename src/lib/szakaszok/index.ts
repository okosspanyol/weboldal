import type { Component } from 'svelte';
import type { SzakaszTipus } from '$lib/tartalom/tipusok';
import Nyito from './Nyito.svelte';
import Video from './Video.svelte';
import Rolam from './Rolam.svelte';
import Orak from './Orak.svelte';
import OraMenete from './OraMenete.svelte';
import KinekSzol from './KinekSzol.svelte';
import Arak from './Arak.svelte';
import Foglalas from './Foglalas.svelte';
import Tudnivalok from './Tudnivalok.svelte';
import Szintfelmero from './Szintfelmero.svelte';
import IngyenesAnyagok from './IngyenesAnyagok.svelte';
import Gyik from './Gyik.svelte';
import Hirlevel from './Hirlevel.svelte';
import ZaroFelhivas from './ZaroFelhivas.svelte';
import Szoveg from './Szoveg.svelte';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SzakaszKomponens = Component<{ adat: any; horgony?: string; id?: string; elonezet?: boolean }>;

export const szakaszKomponensek: Record<SzakaszTipus, SzakaszKomponens> = {
	nyito: Nyito,
	video: Video,
	rolam: Rolam,
	orak: Orak,
	oraMenete: OraMenete,
	kinekSzol: KinekSzol,
	arak: Arak,
	foglalas: Foglalas,
	tudnivalok: Tudnivalok,
	szintfelmero: Szintfelmero,
	ingyenesAnyagok: IngyenesAnyagok,
	gyik: Gyik,
	hirlevel: Hirlevel,
	zaro: ZaroFelhivas,
	szoveg: Szoveg
};
