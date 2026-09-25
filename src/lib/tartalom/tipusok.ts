/**
 * A weboldal teljes tartalma. Egyetlen JSON-ként egyetlen D1-sorban él, és az adminban szerkeszthető.
 *
 * Szövegekben használható jelölések (lásd `szoveg.ts`):
 *   _spanyol dőlt_   **kiemelés**   [link szövege](https://…)   {keresztnev} {email} … változók
 */

export interface Link {
	szoveg: string;
	href: string;
}

export interface Altalanos {
	/** Böngészőfül és Google-találat címe. */
	oldalCim: string;
	/** Keresőben megjelenő leírás (legfeljebb 155 karakter). */
	leiras: string;
	/** Facebookon, Messengerben megosztáskor megjelenő cím. */
	megosztasSzoveg: string;
	ogKep: string;
	ogKepAlt: string;
	/** Pl. https://okosspanyol.hu — ha üres, a böngészőben látott cím számít. */
	sajatDomain: string;
	email: string;
	/** Közvetlen üzenet link (hangüzenethez), pl. https://ig.me/m/felhasznalonev */
	uzenetLink: string;
	kozossegi: Link[];
}

export interface Tanar {
	keresztnev: string;
	teljesNev: string;
	evek: string;
}

export interface FoglalasBeallitas {
	/** A foglalórendszer nyilvános linkje. Ha üres, a gombok a foglalási részhez görgetnek. */
	url: string;
	/** Beágyazható (iframe) naptár linkje. */
	beagyazottUrl: string;
	gombSzoveg: string;
	platform: string;
	fizetes: string;
	lemondasOrak: string;
	berletErvenyesseg: string;
}

export interface Fejlec {
	/** Vízszintes logó képe. Ha a fájl nem létezik, betűkből kirakott logó látszik. */
	logoKep: string;
	logoAlt: string;
	menu: Link[];
	/** Mobilon a képernyő alján végig látszó foglalás gomb. */
	mobilSav: boolean;
}

export interface Barion {
	lathato: boolean;
	/** A Barion hivatalos logósávja (pl. /barion-logo.svg vagy a Barion által adott kép címe). */
	kep: string;
	link: string;
	szoveg: string;
	kartyak: string;
}

export interface Lablec {
	leiras: string;
	kapcsolatCim: string;
	tudnivalokCim: string;
	linkek: Link[];
	copyright: string;
	zaroEs: string;
	barion: Barion;
}

export interface Aloldal {
	/** Az aloldal címe az oldal gyökere után, pl. „aszf” → /aszf */
	utvonal: string;
	cim: string;
	elotag: string;
	leiras: string;
	torzs: string;
	indexelheto: boolean;
	foglalasGomb: boolean;
}

export interface Hibaoldal {
	elotag: string;
	cim: string;
	szoveg: string;
	gomb: string;
}

/* ——— Szakaszok ——— */

export interface CimSzoveg {
	cim: string;
	szoveg: string;
}

export interface NyitoAdat {
	cim: string;
	alcim: string;
	masodikGomb: Link;
	szuro: string;
	foto: string;
	fotoAlt: string;
	boltivFelirat: string;
	jellemzok: CimSzoveg[];
}

export interface VideoAdat {
	elotag: string;
	cim: string;
	szoveg: string;
	youtube: string;
	gombSzoveg: string;
}

export interface RolamAdat {
	elotag: string;
	cim: string;
	foto: string;
	fotoAlt: string;
	boltivFelirat: string;
	bevezeto: string;
	idezet: string;
	folytatas: string;
	tenyekCim: string;
	tenyek: string[];
	zaro: string;
}

export interface OraKartya {
	cim: string;
	es: string;
	kinek: string;
	pontok: string[];
	szin: 'vizsga' | 'munka';
}

export interface OrakAdat {
	elotag: string;
	cim: string;
	bevezeto: string;
	kinekCimke: string;
	kartyak: OraKartya[];
	miertSzam: string;
	miertEgyseg: string;
	miertCim: string;
	miertSzoveg: string;
}

export interface OraLepes {
	cim: string;
	ido: string;
	perc: number;
	szoveg: string;
	es: string;
}

export interface OraMeneteAdat {
	elotag: string;
	cim: string;
	mintaCimke: string;
	lepesek: OraLepes[];
}

export interface KinekSzolAdat {
	elotag: string;
	cim: string;
	igenCim: string;
	igen: string[];
	nemCim: string;
	nem: string[];
	megjegyzes: string;
}

export interface Csomag {
	nev: string;
	reszlet: string;
	ar: string;
	/** Kiemelő címke, pl. „Legnépszerűbb”. Üresen nincs kiemelés. */
	cimke: string;
}

export interface ArakAdat {
	elotag: string;
	cim: string;
	ajanlatCimke: string;
	ajanlat: string;
	csomagok: Csomag[];
	megjegyzes: string;
}

export interface FoglalasAdat {
	elotag: string;
	cim: string;
	bevezeto: string;
	lepesek: CimSzoveg[];
	vanLinkFelirat: string;
	vanLinkGomb: string;
	nincsLinkFelirat: string;
	nincsLinkSzoveg: string;
	nemTalalsz: string;
}

export interface TudnivalokAdat {
	elotag: string;
	cim: string;
	elemek: CimSzoveg[];
}

export interface SzintfelmeroAdat {
	kerdes: string;
	cim: string;
	szoveg: string;
	gombSzoveg: string;
	/** Ha üres: az üzenet link, ha az sincs, e-mail. */
	gombLink: string;
}

export interface Anyag {
	cim: string;
	alcim: string;
	kulcsszo: string;
	fajl: string;
}

export interface IngyenesAnyagokAdat {
	elotag: string;
	cim: string;
	bevezeto: string;
	anyagok: Anyag[];
	letoltesGomb: string;
	uzenetSzoveg: string;
	uzenetGomb: string;
	hamarosanSzoveg: string;
}

export interface GyikKerdes {
	kerdes: string;
	valasz: string;
	linkSzoveg: string;
	linkHref: string;
}

export interface GyikAdat {
	elotag: string;
	cim: string;
	kerdesek: GyikKerdes[];
}

export interface Opcio {
	szoveg: string;
	ertek: string;
}

export interface HirlevelAdat {
	elotag: string;
	cim: string;
	szoveg: string;
	/** A hírlevélküldő űrlapjának „action” címe. Ha üres, e-mailes feliratkozás látszik. */
	action: string;
	nevCimke: string;
	nevMezo: string;
	emailCimke: string;
	emailMezo: string;
	ertesitesCim: string;
	ertesitesMezo: string;
	ertesitesek: Opcio[];
	celCim: string;
	celMezo: string;
	celok: Opcio[];
	hozzajarulas: string;
	gomb: string;
	apro: string;
	keszuloCim: string;
	keszulo: string[];
	levelSzoveg: string;
	levelTargy: string;
	levelApro: string;
	nincsEmail: string;
}

export interface ZaroAdat {
	elotag: string;
	cim: string;
	apro: string;
}

export interface SzovegAdat {
	elotag: string;
	cim: string;
	torzs: string;
	sotet: boolean;
	foglalasGomb: boolean;
}

export interface SzakaszAdatok {
	nyito: NyitoAdat;
	video: VideoAdat;
	rolam: RolamAdat;
	orak: OrakAdat;
	oraMenete: OraMeneteAdat;
	kinekSzol: KinekSzolAdat;
	arak: ArakAdat;
	foglalas: FoglalasAdat;
	tudnivalok: TudnivalokAdat;
	szintfelmero: SzintfelmeroAdat;
	ingyenesAnyagok: IngyenesAnyagokAdat;
	gyik: GyikAdat;
	hirlevel: HirlevelAdat;
	zaro: ZaroAdat;
	szoveg: SzovegAdat;
}

export type SzakaszTipus = keyof SzakaszAdatok;

export type Szakasz<T extends SzakaszTipus = SzakaszTipus> = {
	[K in T]: {
		/** Belső, egyedi azonosító (a szerkesztőnek). */
		id: string;
		tipus: K;
		lathato: boolean;
		/** Horgony a menühöz, pl. „arak” → /#arak */
		horgony: string;
		adat: SzakaszAdatok[K];
	};
}[T];

export interface Tartalom {
	altalanos: Altalanos;
	tanar: Tanar;
	foglalas: FoglalasBeallitas;
	fejlec: Fejlec;
	szakaszok: Szakasz[];
	lablec: Lablec;
	aloldalak: Aloldal[];
	hibaoldal: Hibaoldal;
}
