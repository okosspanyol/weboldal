/**
 * A vizuális szerkesztő űrlapjainak leírása. Minden szakasztípushoz és beállításcsoporthoz
 * itt van felsorolva, milyen mezőket lehet szerkeszteni — a felület ebből épül fel magától.
 */
import type { SzakaszTipus } from '$lib/tartalom/tipusok';

export type Mezo =
	| {
			tipus: 'szoveg';
			kulcs: string;
			cimke: string;
			sugo?: string;
			/** Több soros mező. */
			hosszu?: boolean;
			/** Bekezdések, címek, listák is (## Cím, - lista). */
			blokk?: boolean;
			/** Jelölések nélküli, sima mező (pl. mezőnév, kulcsszó). */
			sima?: boolean;
	  }
	| { tipus: 'link' | 'kep'; kulcs: string; cimke: string; sugo?: string }
	| { tipus: 'szam' | 'kapcsolo'; kulcs: string; cimke: string; sugo?: string }
	| {
			tipus: 'valaszto';
			kulcs: string;
			cimke: string;
			sugo?: string;
			opciok: { ertek: string; szoveg: string }[];
	  }
	| {
			tipus: 'csoport';
			/** Ha meg van adva, egy belső objektumot szerkeszt; ha nincs, csak vizuális csoport. */
			kulcs?: string;
			cimke: string;
			sugo?: string;
			mezok: Mezo[];
			/** Alapból becsukva. */
			csukott?: boolean;
	  }
	| {
			tipus: 'lista';
			kulcs: string;
			cimke: string;
			sugo?: string;
			/** Egyszerű szöveglista, vagy objektumok listája a megadott mezőkkel. */
			elem: 'szoveg' | Mezo[];
			elemNev: string;
			uj: () => unknown;
			/** Az elem címe a listában (objektumoknál). */
			elemCim?: (elem: Record<string, unknown>) => string;
	  };

const sz = (kulcs: string, cimke: string, extra: Partial<Extract<Mezo, { tipus: 'szoveg' }>> = {}): Mezo => ({
	tipus: 'szoveg',
	kulcs,
	cimke,
	...extra
});
const hosszu = (kulcs: string, cimke: string, sugo?: string): Mezo => sz(kulcs, cimke, { hosszu: true, sugo });
const blokk = (kulcs: string, cimke: string, sugo?: string): Mezo =>
	sz(kulcs, cimke, { hosszu: true, blokk: true, sugo });
const lnk = (kulcs: string, cimke: string, sugo?: string): Mezo => ({ tipus: 'link', kulcs, cimke, sugo });
const kep = (kulcs: string, cimke: string, sugo?: string): Mezo => ({ tipus: 'kep', kulcs, cimke, sugo });
const kapcs = (kulcs: string, cimke: string, sugo?: string): Mezo => ({ tipus: 'kapcsolo', kulcs, cimke, sugo });
const szovegLista = (kulcs: string, cimke: string, elemNev: string, sugo?: string): Mezo => ({
	tipus: 'lista',
	kulcs,
	cimke,
	sugo,
	elem: 'szoveg',
	elemNev,
	uj: () => ''
});
const linkLista = (kulcs: string, cimke: string, elemNev: string, sugo?: string): Mezo => ({
	tipus: 'lista',
	kulcs,
	cimke,
	sugo,
	elemNev,
	elem: [sz('szoveg', 'Felirat'), lnk('href', 'Link', 'Pl. https://…, /aszf vagy #arak (a főoldal egy része)')],
	uj: () => ({ szoveg: 'Új link', href: '' }),
	elemCim: (e) => String(e.szoveg || 'Link')
});

const fejMezok = [sz('elotag', 'Spanyol felirat a cím fölött'), sz('cim', 'Cím')];

export const szakaszInfo: Record<SzakaszTipus, { nev: string; leiras: string; ikon: string }> = {
	nyito: { nev: 'Nyitó rész', leiras: 'Nagy cím, foglalás gomb, fotó a boltívben', ikon: '★' },
	video: { nev: 'Bemutatkozó videó', leiras: 'YouTube-videó, kattintásra indul', ikon: '▶' },
	rolam: { nev: 'Rólam', leiras: 'Bemutatkozás fotóval és tényekkel', ikon: '☺' },
	orak: { nev: 'Az órák', leiras: 'Vizsga- és munka-kártya, „Miért 30 perc?”', ikon: '▦' },
	oraMenete: { nev: 'Egy óra menete', leiras: 'Idősáv és lépések mintamondatokkal', ikon: '⏱' },
	kinekSzol: { nev: 'Kinek szól', leiras: 'Neked való / nem neked való lista', ikon: '✓' },
	arak: { nev: 'Árak', leiras: 'Csomagok, indulási ajánlat', ikon: 'Ft' },
	foglalas: { nev: 'Foglalás', leiras: 'Három lépés és a foglalónaptár', ikon: '▣' },
	tudnivalok: { nev: 'Foglalási tudnivalók', leiras: 'Helyszín, fizetés, lemondás…', ikon: 'ℹ' },
	szintfelmero: { nev: 'Szintfelmérés', leiras: 'Olíva doboz hangüzenet gombbal', ikon: '?' },
	ingyenesAnyagok: { nev: 'Ingyenes anyagok', leiras: 'Letölthető PDF-ek', ikon: '⇩' },
	gyik: { nev: 'GYIK', leiras: 'Lenyíló kérdések és válaszok', ikon: '≡' },
	hirlevel: { nev: 'Hírlevél', leiras: 'Feliratkozás vagy e-mailes értesítés', ikon: '✉' },
	zaro: { nev: 'Záró felhívás', leiras: 'Utolsó nagy foglalás gomb', ikon: '→' },
	szoveg: { nev: 'Szöveges blokk', leiras: 'Szabad szöveg címmel, bekezdésekkel, listával', ikon: '¶' }
};

export const szakaszSemak: Record<SzakaszTipus, Mezo[]> = {
	nyito: [
		sz('cim', 'Főcím', { sugo: 'A _spanyol_ szó terrakotta dőlttel jelenik meg.' }),
		hosszu('alcim', 'Alcím'),
		{
			tipus: 'csoport',
			kulcs: 'masodikGomb',
			cimke: 'Második gomb (a foglalás gomb mellett)',
			mezok: [sz('szoveg', 'Felirat'), lnk('href', 'Link')]
		},
		hosszu('szuro', 'Kis szöveg a gombok alatt'),
		kep('foto', 'Fotó', 'Ha üres, díszített boltív látszik.'),
		sz('fotoAlt', 'A fotó leírása (felolvasóknak)', { sima: true }),
		sz('boltivFelirat', 'Felirat a boltívben (ha nincs fotó)'),
		{
			tipus: 'lista',
			kulcs: 'jellemzok',
			cimke: 'Jellemzők (01 / 03)',
			elemNev: 'jellemző',
			elem: [sz('cim', 'Cím'), hosszu('szoveg', 'Szöveg')],
			uj: () => ({ cim: 'Új jellemző', szoveg: '' }),
			elemCim: (e) => String(e.cim)
		}
	],
	video: [
		lnk('youtube', 'YouTube-videó linkje', 'Pl. https://www.youtube.com/watch?v=… vagy https://youtu.be/… — amíg üres, a rész nem látszik.'),
		...fejMezok,
		hosszu('szoveg', 'Szöveg'),
		sz('gombSzoveg', 'Lejátszás felirat')
	],
	rolam: [
		...fejMezok,
		kep('foto', 'Fotó', 'Ha üres, díszített boltív látszik.'),
		sz('fotoAlt', 'A fotó leírása (felolvasóknak)', { sima: true }),
		sz('boltivFelirat', 'Felirat a boltívben (ha nincs fotó)'),
		blokk('bevezeto', 'Bemutatkozás'),
		hosszu('idezet', 'Kiemelt idézet'),
		blokk('folytatas', 'Folytatás'),
		sz('tenyekCim', 'Tények listájának neve (felolvasóknak)', { sima: true }),
		szovegLista('tenyek', 'Tények rólad', 'tény'),
		hosszu('zaro', 'Záró mondat')
	],
	orak: [
		...fejMezok,
		hosszu('bevezeto', 'Bevezető'),
		sz('kinekCimke', 'A kártyák „Neked szól, ha” felirata'),
		{
			tipus: 'lista',
			kulcs: 'kartyak',
			cimke: 'Kártyák',
			elemNev: 'kártya',
			elem: [
				sz('cim', 'Cím'),
				sz('es', 'Spanyol felirat'),
				{
					tipus: 'valaszto',
					kulcs: 'szin',
					cimke: 'Szín',
					opciok: [
						{ ertek: 'vizsga', szoveg: 'Terrakotta (vizsga)' },
						{ ertek: 'munka', szoveg: 'Sötét terrakotta (munka)' }
					]
				},
				hosszu('kinek', 'Kinek szól'),
				szovegLista('pontok', 'Pontok', 'pont')
			],
			uj: () => ({ cim: 'Új kártya', es: '', kinek: '', pontok: [], szin: 'vizsga' }),
			elemCim: (e) => String(e.cim)
		},
		{
			tipus: 'csoport',
			cimke: '„Miért 30 perc?” doboz',
			mezok: [
				sz('miertSzam', 'Nagy szám'),
				sz('miertEgyseg', 'Mértékegység'),
				sz('miertCim', 'Cím'),
				hosszu('miertSzoveg', 'Szöveg')
			]
		}
	],
	oraMenete: [
		...fejMezok,
		sz('mintaCimke', '„Minta” címke'),
		{
			tipus: 'lista',
			kulcs: 'lepesek',
			cimke: 'Lépések',
			elemNev: 'lépés',
			elem: [
				sz('cim', 'Cím'),
				sz('ido', 'Időtartam felirata'),
				{ tipus: 'szam', kulcs: 'perc', cimke: 'Perc (az idősáv arányához)' },
				hosszu('szoveg', 'Leírás'),
				sz('es', 'Spanyol mintamondat')
			],
			uj: () => ({ cim: 'Új lépés', ido: '5 perc', perc: 5, szoveg: '', es: '' }),
			elemCim: (e) => String(e.cim)
		}
	],
	kinekSzol: [
		...fejMezok,
		sz('igenCim', '„Neked való” oszlop címe'),
		szovegLista('igen', 'Neked való, ha…', 'sor'),
		sz('nemCim', '„Nem neked való” oszlop címe'),
		szovegLista('nem', 'Nem neked való, ha…', 'sor'),
		hosszu('megjegyzes', 'Megjegyzés')
	],
	arak: [
		...fejMezok,
		{
			tipus: 'lista',
			kulcs: 'csomagok',
			cimke: 'Csomagok',
			elemNev: 'csomag',
			elem: [
				sz('nev', 'Név'),
				sz('reszlet', 'Részlet'),
				sz('ar', 'Ár'),
				sz('cimke', 'Kiemelő címke', { sugo: 'Pl. „Legnépszerűbb” — ha kitöltöd, a csomag kiemelve jelenik meg.' })
			],
			uj: () => ({ nev: 'Új csomag', reszlet: '', ar: '[ár] Ft', cimke: '' }),
			elemCim: (e) => `${e.nev} — ${e.ar}`
		},
		sz('ajanlatCimke', 'Ajánlat címkéje'),
		hosszu('ajanlat', 'Indulási ajánlat', 'Ha üres, nem jelenik meg.'),
		hosszu('megjegyzes', 'Megjegyzés a gomb mellett')
	],
	foglalas: [
		...fejMezok,
		hosszu('bevezeto', 'Bevezető'),
		{
			tipus: 'lista',
			kulcs: 'lepesek',
			cimke: 'Lépések',
			elemNev: 'lépés',
			elem: [sz('cim', 'Cím'), hosszu('szoveg', 'Szöveg')],
			uj: () => ({ cim: 'Új lépés', szoveg: '' }),
			elemCim: (e) => String(e.cim)
		},
		{
			tipus: 'csoport',
			cimke: 'Naptár helyén',
			sugo: 'A foglalórendszer linkje és a beágyazott naptár az Alapadatok fülön állítható.',
			mezok: [
				sz('vanLinkFelirat', 'Felirat, ha van foglalórendszer'),
				sz('vanLinkGomb', 'Gomb, ha van foglalórendszer'),
				sz('nincsLinkFelirat', 'Felirat, ha még nincs'),
				hosszu('nincsLinkSzoveg', 'Szöveg, ha még nincs')
			]
		},
		hosszu('nemTalalsz', 'Szöveg alul')
	],
	tudnivalok: [
		...fejMezok,
		{
			tipus: 'lista',
			kulcs: 'elemek',
			cimke: 'Tudnivalók',
			elemNev: 'tudnivaló',
			elem: [sz('cim', 'Cím'), hosszu('szoveg', 'Szöveg')],
			uj: () => ({ cim: 'Új tudnivaló', szoveg: '' }),
			elemCim: (e) => String(e.cim)
		}
	],
	szintfelmero: [
		sz('kerdes', 'Nagy spanyol kérdés'),
		sz('cim', 'Cím'),
		hosszu('szoveg', 'Szöveg'),
		sz('gombSzoveg', 'Gomb felirata'),
		lnk('gombLink', 'Gomb linkje', 'Ha üres: az üzenet link (Alapadatok), ha az sincs, e-mail.')
	],
	ingyenesAnyagok: [
		...fejMezok,
		hosszu('bevezeto', 'Bevezető'),
		{
			tipus: 'lista',
			kulcs: 'anyagok',
			cimke: 'Anyagok',
			elemNev: 'anyag',
			elem: [
				sz('cim', 'Cím'),
				sz('alcim', 'Alcím'),
				sz('kulcsszo', 'Kulcsszó (üzenetben kérhető)', { sima: true }),
				lnk('fajl', 'PDF', 'Pl. /anyagok/puska.pdf (a static/anyagok mappából) vagy külső link. Ha üres, üzenetben kérhető.')
			],
			uj: () => ({ cim: 'Új anyag', alcim: '', kulcsszo: '', fajl: '' }),
			elemCim: (e) => String(e.cim)
		},
		sz('letoltesGomb', 'Letöltés gomb'),
		hosszu('uzenetSzoveg', 'Szöveg, ha üzenetben kérhető', '{kulcsszo} = az anyag kulcsszava'),
		sz('uzenetGomb', 'Üzenet gomb'),
		hosszu('hamarosanSzoveg', 'Szöveg, ha nincs üzenet link sem')
	],
	gyik: [
		...fejMezok,
		{
			tipus: 'lista',
			kulcs: 'kerdesek',
			cimke: 'Kérdések',
			elemNev: 'kérdés',
			elem: [
				sz('kerdes', 'Kérdés'),
				hosszu('valasz', 'Válasz'),
				sz('linkSzoveg', 'Link felirata (nem kötelező)'),
				lnk('linkHref', 'Link')
			],
			uj: () => ({ kerdes: 'Új kérdés?', valasz: '', linkSzoveg: '', linkHref: '' }),
			elemCim: (e) => String(e.kerdes)
		}
	],
	hirlevel: [
		...fejMezok,
		hosszu('szoveg', 'Szöveg'),
		lnk(
			'action',
			'Hírlevélküldő űrlapjának címe (action)',
			'MailerLite, Brevo, Mailchimp stb. beágyazható űrlapjából. Ha üres, e-mailes jelentkezés látszik.'
		),
		{
			tipus: 'csoport',
			cimke: 'Űrlap (ha van hírlevélküldő)',
			csukott: true,
			mezok: [
				sz('nevCimke', 'Név mező felirata'),
				sz('nevMezo', 'Név mező neve (name)', { sima: true, sugo: 'Amit a szolgáltató vár, pl. fields[name]' }),
				sz('emailCimke', 'E-mail mező felirata'),
				sz('emailMezo', 'E-mail mező neve (name)', { sima: true, sugo: 'Pl. fields[email] vagy EMAIL' }),
				sz('ertesitesCim', 'Értesítések kérdése'),
				sz('ertesitesMezo', 'Értesítések mezőneve', { sima: true }),
				{
					tipus: 'lista',
					kulcs: 'ertesitesek',
					cimke: 'Értesítés lehetőségek',
					elemNev: 'lehetőség',
					elem: [sz('szoveg', 'Felirat'), sz('ertek', 'Érték', { sima: true })],
					uj: () => ({ szoveg: '', ertek: '' }),
					elemCim: (e) => String(e.szoveg)
				},
				sz('celCim', 'Cél kérdése'),
				sz('celMezo', 'Cél mezőneve', { sima: true }),
				{
					tipus: 'lista',
					kulcs: 'celok',
					cimke: 'Cél lehetőségek',
					elemNev: 'lehetőség',
					elem: [sz('szoveg', 'Felirat'), sz('ertek', 'Érték', { sima: true })],
					uj: () => ({ szoveg: '', ertek: '' }),
					elemCim: (e) => String(e.szoveg)
				},
				hosszu('hozzajarulas', 'Hozzájárulás'),
				sz('gomb', 'Gomb felirata'),
				hosszu('apro', 'Apró betű')
			]
		},
		{
			tipus: 'csoport',
			cimke: 'E-mailes jelentkezés (ha nincs hírlevélküldő)',
			mezok: [
				sz('keszuloCim', 'Lista címe'),
				szovegLista('keszulo', 'Készülő anyagok', 'anyag'),
				hosszu('levelSzoveg', 'Szöveg'),
				sz('levelTargy', 'A levél tárgya', { sima: true }),
				hosszu('levelApro', 'Apró betű'),
				hosszu('nincsEmail', 'Szöveg, ha nincs e-mail cím')
			]
		}
	],
	zaro: [...fejMezok, hosszu('apro', 'Apró betű a gomb alatt')],
	szoveg: [
		...fejMezok,
		blokk('torzs', 'Szöveg'),
		kapcs('sotet', 'Sötét terrakotta háttér'),
		kapcs('foglalasGomb', 'Foglalás gomb a szöveg alatt')
	]
};

/* ——— Általános beállítások ——— */

export const alapadatokSema: Mezo[] = [
	{
		tipus: 'csoport',
		kulcs: 'tanar',
		cimke: 'Rólad',
		mezok: [
			sz('keresztnev', 'Keresztnév', { sima: true, sugo: 'A szövegekben: {keresztnev}' }),
			sz('teljesNev', 'Teljes név', { sima: true, sugo: '{teljesNev}' }),
			sz('evek', 'Tanítási évek', { sima: true, sugo: '{evek}' })
		]
	},
	{
		tipus: 'csoport',
		kulcs: 'altalanos',
		cimke: 'Elérhetőség',
		mezok: [
			sz('email', 'E-mail cím', { sima: true, sugo: '{email} — a szövegekben kattintható lesz.' }),
			lnk('uzenetLink', 'Üzenet link (hangüzenethez)', 'Pl. https://ig.me/m/felhasznalonev — a szintfelmérés és az ingyenes anyagok gombja ide visz.'),
			linkLista('kozossegi', 'Közösségi oldalak (láblécben)', 'közösségi oldal', 'Az üres linkű sorok nem jelennek meg.')
		]
	},
	{
		tipus: 'csoport',
		kulcs: 'foglalas',
		cimke: 'Foglalás',
		mezok: [
			lnk('url', 'Foglalórendszer linkje', 'Calendly, SimplyBook stb. nyilvános oldala. Ha üres, a gombok a foglalási részhez görgetnek.'),
			lnk('beagyazottUrl', 'Beágyazható naptár linkje (iframe)', 'Ha megadod, a naptár közvetlenül az oldalon jelenik meg. Csak https:// link.'),
			sz('gombSzoveg', 'A foglalás gombok felirata'),
			sz('platform', 'Online óra helye', { sugo: '{platform}' }),
			sz('fizetes', 'Fizetés módja', { sugo: '{fizetes}' }),
			sz('lemondasOrak', 'Díjmentes lemondás (óra)', { sima: true, sugo: '{lemondasOrak}' }),
			sz('berletErvenyesseg', 'Bérlet érvényessége', { sugo: '{berletErvenyesseg}' })
		]
	}
];

export const fejlecLablecSema: Mezo[] = [
	{
		tipus: 'csoport',
		kulcs: 'fejlec',
		cimke: 'Fejléc (menü)',
		mezok: [
			kep(
				'logoKep',
				'Vízszintes logó',
				'Töltsd fel a GitHub-tárolóba static/logo-hosszu.png néven — a következő kitétel után magától megjelenik. Amíg nincs meg, betűkből kirakott logó látszik.'
			),
			sz('logoAlt', 'Logó szövege (felolvasóknak)', { sima: true }),
			linkLista('menu', 'Menüpontok', 'menüpont', 'A #horgony a főoldal egy részére ugrik (a horgonyt a szakasz beállításainál látod).'),
			kapcs('mobilSav', 'Mobilon a képernyő alján végig látszó foglalás gomb')
		]
	},
	{
		tipus: 'csoport',
		kulcs: 'lablec',
		cimke: 'Lábléc',
		mezok: [
			hosszu('leiras', 'Rövid leírás a logó alatt'),
			sz('kapcsolatCim', 'Kapcsolat oszlop címe'),
			sz('tudnivalokCim', 'Tudnivalók oszlop címe'),
			linkLista('linkek', 'Tudnivalók linkjei', 'link'),
			sz('copyright', 'Szerzői jogi sor', { sugo: '{ev} = az aktuális év' }),
			sz('zaroEs', 'Spanyol zárómondat'),
			{
				tipus: 'csoport',
				kulcs: 'barion',
				cimke: 'Barion fizetés',
				sugo: 'A Barion előírja, hogy a hivatalos Barion logó látsszon a láblécben. Töltsd le a Barion logóoldaláról, és tedd a static mappába (pl. static/barion-logo.svg), vagy másold be a Barion által adott kép címét.',
				mezok: [
					kapcs('lathato', 'Barion logó a láblécben'),
					kep('kep', 'Barion logósáv képe'),
					lnk('link', 'Link'),
					sz('szoveg', 'Felirat'),
					sz('kartyak', 'Elfogadott kártyák (ha nincs kép)')
				]
			}
		]
	}
];

export const seoSema: Mezo[] = [
	{
		tipus: 'csoport',
		kulcs: 'altalanos',
		cimke: 'Kereső és megosztás',
		mezok: [
			sz('oldalCim', 'Böngészőfül és Google-találat címe', { sima: true }),
			sz('leiras', 'Keresőben megjelenő leírás', { hosszu: true, sima: true, sugo: 'Legfeljebb kb. 155 karakter.' }),
			sz('megosztasSzoveg', 'Megosztáskor megjelenő cím (Facebook, Messenger)', { sima: true }),
			kep('ogKep', 'Megosztási kép (1200 × 630)'),
			sz('ogKepAlt', 'A megosztási kép leírása', { sima: true }),
			lnk('sajatDomain', 'Saját domain', 'Pl. https://okosspanyol.hu — ha üres, a böngészőben látott cím számít.')
		]
	},
	{
		tipus: 'csoport',
		kulcs: 'hibaoldal',
		cimke: 'Hibaoldal (nem található)',
		mezok: [
			sz('elotag', 'Spanyol felirat', { sugo: '{status} = a hiba kódja, pl. 404' }),
			sz('cim', 'Cím'),
			hosszu('szoveg', 'Szöveg'),
			sz('gomb', 'Gomb felirata')
		]
	}
];

export const aloldalMezok: Mezo[] = [
	sz('utvonal', 'Cím az oldalon belül', {
		sima: true,
		sugo: 'Csak kisbetű, szám és kötőjel, pl. „aszf” → /aszf'
	}),
	sz('cim', 'Cím'),
	sz('elotag', 'Spanyol felirat a cím fölött'),
	sz('leiras', 'Leírás a keresőnek', { hosszu: true, sima: true }),
	blokk('torzs', 'Szöveg'),
	kapcs('indexelheto', 'Megjelenhet a Google-ben'),
	kapcs('foglalasGomb', 'Foglalás gomb a szöveg alatt')
];
