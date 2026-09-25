/**
 * Alapértelmezett tartalom: ez látszik, amíg az adminban még semmit nem mentettél,
 * és ebből kapnak értéket az új mezők, ha később bővül az oldal.
 */
import type { Aloldal, SzakaszAdatok, SzakaszTipus, Szakasz, Tartalom } from './tipusok';

export const szakaszAlapok: { [K in SzakaszTipus]: () => SzakaszAdatok[K] } = {
	nyito: () => ({
		cim: 'Beszélj üzleti _spanyolul_ — 30 percben, akkor, amikor neked jó.',
		alcim:
			'Élő, beszédközpontú online órák a BGE üzleti spanyol szóbeli vizsgára és a spanyolországi munkavállalásra. Nem nálam kell igazodnod — én igazodom a napodhoz.',
		masodikGomb: { szoveg: 'Megnézem, hogyan működik', href: '#hogyan' },
		szuro:
			'Ha már megvannak az alapjaid (legalább A2), és végre beszélni szeretnél, jó helyen jársz.',
		foto: '',
		fotoAlt: '{keresztnev}, az OKOSspanyol tanára',
		boltivFelirat: '¿Hablamos?',
		jellemzok: [
			{ cim: '30 perc', szoveg: 'Befér munka előtt, ebédszünetben vagy este.' },
			{
				cim: 'Egyeztetés nélkül',
				szoveg: 'A szabad időpontok közül te választasz, nincs kötött órarend.'
			},
			{ cim: 'Csak beszéd', szoveg: 'Nincs nyelvtanmagyarázat, az egész óra gyakorlás.' }
		]
	}),

	video: () => ({
		elotag: 'Conóceme',
		cim: 'Ismerj meg egy percben',
		szoveg:
			'Nézd meg, ki vagyok, és hogyan zajlik nálam egy óra — utána már tudni fogod, hogy neked való-e.',
		youtube: '',
		gombSzoveg: 'Videó lejátszása'
	}),

	rolam: () => ({
		elotag: 'Sobre mí',
		cim: '_¡Hola!_ {keresztnev} vagyok.',
		foto: '',
		fotoAlt: '{keresztnev} portréja',
		boltivFelirat: '¡Hola!',
		bevezeto:
			'Spanyoltanár vagyok, {evek} éve tanítok, főleg 18–25 éves egyetemistákat és pályakezdőket. Az évek során egy dolgot láttam újra és újra: a diákjaim ismerik a szavakat és a nyelvtant, de amikor beszélni kell — vizsgán vagy egy állásinterjún —, megakadnak.\n\nEzért szakosodtam az **üzleti spanyolra**. Kidolgoztam egy 14 témás, a BGE B2 üzleti szaknyelvi vizsgára épülő tananyagot, az önéletrajztól a cégek felépítésén át a pénzügyekig.',
		idezet:
			'Kevesen tanítanak élőben, kifejezetten beszédközpontúan üzleti spanyolt — én erre szakosodtam.',
		folytatas:
			'Az óráimon nem előadást tartok. Te beszélsz, én kérdezek, javítok, és olyan helyzeteket gyakorolunk, amelyekkel tényleg találkozni fogsz: a vizsgabizottság előtt vagy egy spanyol cég HR-esével szemben.',
		tenyekCim: 'Rólam röviden',
		tenyek: [
			'Tanítási tapasztalat: {evek} év',
			'[Végzettség, pl. spanyol szakos tanári diploma]',
			'[Spanyolországi tapasztalat, pl. X év kint élés vagy munka]',
			'Saját, 14 témás üzleti spanyol B2 tananyag'
		],
		zaro:
			'Ha a spanyolod már megvan, de a beszéd még nem megy gördülékenyen, azon közösen dolgozunk. _¡Nos vemos en clase!_'
	}),

	orak: () => ({
		elotag: 'Las clases',
		cim: 'Egy üzleti nyelvtudás, két cél',
		bevezeto:
			'Az üzleti spanyol két helyen nyit ajtót: a nyelvvizsgán és a spanyolországi munkahelyen. Ugyanazokkal a helyzetekkel készülsz mindkettőre — aki a szóbelin jól mutatja be a szakmai útját, az egy interjún is meg fogja állni a helyét.',
		kinekCimke: 'Neked szól, ha',
		kartyak: [
			{
				cim: 'Szóbeli vizsgafelkészítés',
				es: 'Examen oral',
				kinek: 'a BGE üzleti spanyol B2 szóbeli vizsgára készülsz.',
				pontok: [
					'Gyakoroljuk a szóbeli részeit: szakmai beszélgetés, szövegismertetés, prezentáció, szituációs társalgás.',
					'Vizsgaszerű kérdéseket kapsz a 14 üzleti témából.',
					'Megtanulod, mit mondj, ha elakadsz, és hogyan tartsd a szót.',
					'Minden óra végén rövid visszajelzést kapsz: mi ment jól, min dolgozz.'
				],
				szin: 'vizsga'
			},
			{
				cim: 'Munka Spanyolországban',
				es: 'Trabajar en España',
				kinek: 'Spanyolországban szeretnél dolgozni vagy spanyol cégnél jelentkeznél.',
				pontok: [
					'Bemutatkozás, szakmai útad és terveid elmondása magabiztosan.',
					'Állásinterjú-gyakorlás a leggyakoribb kérdésekkel.',
					'Munkahelyi helyzetek: megbeszélés, telefonhívás, ügyfélkapcsolat.',
					'Mit jelent a spanyol udvariasság és üzleti kultúra a gyakorlatban.'
				],
				szin: 'munka'
			}
		],
		miertSzam: '30',
		miertEgyseg: 'perc',
		miertCim: 'Miért 30 perc?',
		miertSzoveg:
			'Mert a rendszeresség többet ér, mint a hossz. Heti több rövid alkalom jobban rögzül, mint egyetlen hosszú óra, és könnyebb beilleszteni egy teli napba: reggel munka előtt, ebédszünetben vagy este. Te döntöd el, hányszor és mikor foglalsz.'
	}),

	oraMenete: () => ({
		elotag: 'Así es una clase',
		cim: 'Hogyan zajlik egy óra?',
		mintaCimke: 'Minta',
		lepesek: [
			{
				cim: 'Bemelegítés',
				ido: '3–5 perc',
				perc: 5,
				szoveg: 'Kötetlen beszélgetés spanyolul.',
				es: '¿Qué tal tu semana?'
			},
			{
				cim: 'Gyakorlás',
				ido: '20 perc',
				perc: 20,
				szoveg: 'Vizsgafeladat vagy munkahelyi szituáció, a te célod szerint.',
				es: 'Hablemos de tu experiencia profesional.'
			},
			{
				cim: 'Visszajelzés',
				ido: '5 perc',
				perc: 5,
				szoveg: 'A legfontosabb javítások és hasznos kifejezések, amiket használhatsz.',
				es: 'Muy bien. Prueba también así…'
			}
		]
	}),

	kinekSzol: () => ({
		elotag: '¿Es para ti?',
		cim: 'Kinek szól — és kinek nem?',
		igenCim: 'Neked való, ha…',
		igen: [
			'legalább A2-es szinten vagy,',
			'megvan az alap szókincsed és nyelvtanod,',
			'és beszédben szeretnél fejlődni.'
		],
		nemCim: 'Nem neked való, ha…',
		nem: [
			'most kezded a spanyolt,',
			'nyelvtanmagyarázatot keresel,',
			'vagy az írásbeli vizsgarészre készülnél.'
		],
		megjegyzes: 'Az órák tisztán beszédgyakorlások.'
	}),

	arak: () => ({
		elotag: 'Precios',
		cim: 'Árak',
		ajanlatCimke: 'Indulási ajánlat',
		ajanlat: '',
		csomagok: [
			{ nev: '1 alkalom', reszlet: '30 perc', ar: '[ár] Ft', cimke: '' },
			{ nev: '5 alkalmas bérlet', reszlet: '5 × 30 perc', ar: '[ár] Ft', cimke: '' },
			{ nev: '10 alkalmas bérlet', reszlet: '10 × 30 perc', ar: '[ár] Ft', cimke: '' }
		],
		megjegyzes:
			'Heti 2–3 alkalom a leghatékonyabb, de nincs kötelező ritmus. Bérlet érvényessége: {berletErvenyesseg}.'
	}),

	foglalas: () => ({
		elotag: 'Reserva tu clase',
		cim: 'Foglalj időpontot három lépésben',
		bevezeto:
			'Nem kell e-maileket váltanunk. Nézd meg a szabad időpontjaimat, és válaszd ki, ami neked jó.',
		lepesek: [
			{ cim: 'Válassz időpontot', szoveg: 'A naptárban csak a szabad 30 perces sávok látszanak.' },
			{
				cim: 'Add meg az adataidat',
				szoveg: 'Név, e-mail, és pár szóban: vizsgára vagy munkához készülsz?'
			},
			{
				cim: 'Kapsz egy visszaigazolást',
				szoveg: 'Benne az online óra linkjével. Az óra előtt emlékeztetőt is küld a rendszer.'
			}
		],
		vanLinkFelirat: '¿Cuándo te va bien?',
		vanLinkGomb: 'Megnézem a szabad időpontokat',
		nincsLinkFelirat: '¡Muy pronto!',
		nincsLinkSzoveg:
			'Az online foglalónaptár hamarosan itt lesz. Addig írj nekem, és egyeztetünk: {email}',
		nemTalalsz:
			'Nem találsz neked megfelelő időpontot? Írj nekem: {email} — igyekszem megoldani.'
	}),

	tudnivalok: () => ({
		elotag: 'Bueno saberlo',
		cim: 'Foglalási tudnivalók',
		elemek: [
			{
				cim: 'Helyszín',
				szoveg: 'Online, {platform}. Kamera és mikrofon kell, telefonról is működik.'
			},
			{ cim: 'Fizetés', szoveg: '{fizetes}.' },
			{
				cim: 'Lemondás, átfoglalás',
				szoveg:
					'Az óra előtt legkésőbb {lemondasOrak} órával díjmentesen. Későbbi lemondás vagy meg nem jelenés esetén az alkalom elvész.'
			},
			{
				cim: 'Késés',
				szoveg:
					'Az óra a lefoglalt időpontban véget ér, ezért érdemes pár perccel korábban belépni.'
			},
			{ cim: 'Bérlet érvényessége', szoveg: '{berletErvenyesseg}.' }
		]
	}),

	szintfelmero: () => ({
		kerdes: '¿Qué nivel tengo?',
		cim: 'Nem tudod, melyik szinten vagy?',
		szoveg:
			'Küldj egy rövid hangüzenetet spanyolul, és megmondom. Ha bizonytalan vagy, foglalj egy alkalmat — az első percekben kiderül.',
		gombSzoveg: 'Hangüzenetet küldök',
		gombLink: ''
	}),

	ingyenesAnyagok: () => ({
		elotag: 'Gratis para ti',
		cim: 'Ingyenes anyagok',
		bevezeto: 'Két rövid, kinyomtatható PDF, hogy már ma elkezdhesd a gyakorlást.',
		anyagok: [
			{
				cim: 'A BGE üzleti szóbeli 5 része',
				alcim: 'Egyoldalas puska',
				kulcsszo: 'ORAL',
				fajl: ''
			},
			{ cim: '20 interjúkérdés spanyolul', alcim: 'Válaszmintával', kulcsszo: 'ENTREVISTA', fajl: '' }
		],
		letoltesGomb: 'Letöltöm (PDF)',
		uzenetSzoveg: 'Írd meg Instagram-üzenetben, hogy {kulcsszo}, és elküldöm.',
		uzenetGomb: 'Kérem üzenetben',
		hamarosanSzoveg: 'Hamarosan letölthető. Instagramon kommentben írd meg, hogy {kulcsszo}, és elküldöm.'
	}),

	gyik: () => ({
		elotag: 'Preguntas frecuentes',
		cim: 'Gyakori kérdések',
		kerdesek: [
			{
				kerdes: 'Milyen szinten kell lennem?',
				valasz:
					'Legalább A2-es szinten, meglevő alap szókincscsel és nyelvtannal. Ha bizonytalan vagy, foglalj egy alkalmat, és az első percekben kiderül.',
				linkSzoveg: '',
				linkHref: ''
			},
			{
				kerdes: 'Tanítasz nyelvtant is?',
				valasz:
					'Nem. Az órák tisztán beszédgyakorlások. Ha egy hibád visszatér, megmutatom a helyes formát, de nyelvtani magyarázat nincs.',
				linkSzoveg: '',
				linkHref: ''
			},
			{
				kerdes: 'Segítesz az írásbeli vizsgarészre?',
				valasz:
					'Az órák most a szóbeli részre készítenek fel. Az írásbeli vizsgarészhez készülő tananyagom fejlesztés alatt áll — ha feliratkozol a hírlevelemre, elsőként értesülsz róla.',
				linkSzoveg: 'Feliratkozom',
				linkHref: '#hirlevel'
			},
			{
				kerdes: 'Milyen gyakran érdemes foglalni?',
				valasz:
					'Heti 2–3 alkalom a leghatékonyabb, de nincs kötelező ritmus. Foglalhatsz egy hetet sűrűbben a vizsga előtt, és kihagyhatsz egy zsúfolt hetet.',
				linkSzoveg: '',
				linkHref: ''
			},
			{
				kerdes: 'Mindig ugyanabban az időpontban kell jönnöm?',
				valasz: 'Nem. Minden alkalmat külön foglalsz, akkor, amikor neked jó.',
				linkSzoveg: '',
				linkHref: ''
			},
			{
				kerdes: 'Csak vizsgára vagy csak munkára készülhetek?',
				valasz:
					'Bármelyikre, vagy mindkettőre. Foglaláskor írd meg a célodat, és ahhoz igazítom az órát.',
				linkSzoveg: '',
				linkHref: ''
			},
			{
				kerdes: 'Mi van, ha nem tudok elmenni?',
				valasz:
					'Az óra előtt {lemondasOrak} órával díjmentesen lemondhatod vagy átteheted a visszaigazoló e-mailben lévő linkkel.',
				linkSzoveg: '',
				linkHref: ''
			}
		]
	}),

	hirlevel: () => ({
		elotag: 'Próximamente',
		cim: 'Készülsz az írásbelire is?',
		szoveg:
			'Az üzleti spanyol írásbeli vizsgarészhez is készül a tananyagom, jelenleg a fejlesztésén dolgozom. Ha szeretnéd elsőként megtudni, mikor indul, iratkozz fel a hírlevelemre. Addig is hasznos szóbeli és munkavállalási tippeket küldök.',
		action: '',
		nevCimke: 'Keresztnév',
		nevMezo: 'keresztnev',
		emailCimke: 'E-mail cím',
		emailMezo: 'email',
		ertesitesCim: 'Miről kérsz értesítést?',
		ertesitesMezo: 'ertesites',
		ertesitesek: [
			{
				szoveg: 'Letölthető BGE szóbeli anyag és nyelvtani összefoglaló',
				ertek: 'szobeli-anyag'
			},
			{
				szoveg: 'Online gyakorlófelület (írásbeli rész, feladatok, videós nyelvtan, szókártyák)',
				ertek: 'gyakorlofelulet'
			}
		],
		celCim: 'Mire készülsz?',
		celMezo: 'cel',
		celok: [
			{ szoveg: 'Vizsgára készülök', ertek: 'vizsga' },
			{ szoveg: 'Spanyolországban szeretnék dolgozni', ertek: 'munka' }
		],
		hozzajarulas:
			'Hozzájárulok, hogy e-mailben értesítést küldj. Elolvastam az [Adatkezelési tájékoztatót](/adatkezeles).',
		gomb: 'Kérem az értesítést',
		apro: 'Nem küldök kéretlen leveleket, és bármikor egy kattintással leiratkozhatsz.',
		keszuloCim: 'Min dolgozom most?',
		keszulo: [
			'Letölthető BGE szóbeli anyag és nyelvtani összefoglaló',
			'Online gyakorlófelület (írásbeli rész, feladatok, videós nyelvtan, szókártyák)'
		],
		levelSzoveg: 'Írj egy rövid levelet, és felírlak az értesítési listára.',
		levelTargy: 'Értesítést kérek az új anyagokról',
		levelApro:
			'Nem küldök kéretlen leveleket, és bármikor leiratkozhatsz. [Adatkezelési tájékoztató](/adatkezeles)',
		nincsEmail: 'A feliratkozás hamarosan indul.'
	}),

	zaro: () => ({
		elotag: '¿Empezamos?',
		cim: 'A spanyolod megvan. **Most beszéljünk!**',
		apro: '30 perc · A2-es szinttől · nincs kötelező órarend'
	}),

	szoveg: () => ({
		elotag: '',
		cim: 'Új szakasz',
		torzs: 'Ide írd a szöveget. Új bekezdéshez hagyj egy üres sort.',
		sotet: false,
		foglalasGomb: false
	})
};

/** A szakaszok alapértelmezett horgonya (a menü ezekre mutat). */
export const alapHorgonyok: Record<SzakaszTipus, string> = {
	nyito: '',
	video: 'video',
	rolam: 'rolam',
	orak: 'orak',
	oraMenete: 'hogyan',
	kinekSzol: 'kinek',
	arak: 'arak',
	foglalas: 'foglalas',
	tudnivalok: 'tudnivalok',
	szintfelmero: 'szint',
	ingyenesAnyagok: 'anyagok',
	gyik: 'gyik',
	hirlevel: 'hirlevel',
	zaro: '',
	szoveg: ''
};

export function ujSzakasz<T extends SzakaszTipus>(tipus: T, id = tipus as string): Szakasz<T> {
	return {
		id,
		tipus,
		lathato: true,
		horgony: alapHorgonyok[tipus],
		adat: szakaszAlapok[tipus]()
	} as Szakasz<T>;
}

export const alapAloldalak = (): Aloldal[] => [
	{
		utvonal: 'adatkezeles',
		cim: 'Adatkezelési tájékoztató',
		elotag: 'Protección de datos',
		leiras:
			'Az OKOSspanyol adatkezelési tájékoztatója: milyen adatokat kezelek foglaláskor, fizetéskor és hírlevél-feliratkozáskor, és milyen jogaid vannak.',
		indexelheto: true,
		foglalasGomb: false,
		torzs: `> **Sablon.** A [szögletes zárójeles] részeket töltsd ki, és közzététel előtt ellenőriztesd jogi szakemberrel vagy a könyvelőddel. Ezt a dobozt az adminban törölheted.

## 1. Az adatkezelő

- Név: [Név / vállalkozás neve]
- Székhely: [Székhely címe]
- E-mail: {email}

## 2. Milyen adatokat kezelek, és miért?

**Időpontfoglalás.** A foglaláshoz a neved, az e-mail címed és a rövid leírásod (vizsgára vagy munkához készülsz) szükséges. Ezekkel az adatokkal tudom visszaigazolni a foglalást, elküldeni az online óra linkjét és az emlékeztetőt. Jogalap: a szerződés teljesítése. Megőrzés: [pl. az utolsó óra után X évig, illetve a számviteli jogszabályok szerinti ideig].

**Online fizetés.** A bankkártyás fizetést a Barion Payment Zrt. biztonságos rendszere bonyolítja; a kártyaadataidat nem látom és nem tárolom. Tudomásul veszem, hogy a fizetéshez szükséges adataidat (név, e-mail cím, a vásárlás adatai) a Barion Payment Zrt. részére továbbítom. Az adattovábbítás célja a fizetés lebonyolítása és a csalások megelőzése. A Barion adatkezelési tájékoztatója: [barion.com](https://www.barion.com/hu/).

**Hírlevél és értesítés.** Ha feliratkozol, a keresztneved, az e-mail címed és a bejelölt érdeklődési köröd kerül tárolásra, hogy értesíthesselek az új tananyagokról, és hasznos tippeket küldhessek. Jogalap: a hozzájárulásod, amelyet bármikor visszavonhatsz (minden levél alján van leiratkozó link). Megőrzés: a leiratkozásig.

**Kapcsolatfelvétel.** Ha e-mailben vagy közösségi médián keresztül írsz, a leveledben megadott adatokat csak a válaszadáshoz használom. Megőrzés: [pl. az ügy lezárásáig].

## 3. Adatfeldolgozók

Az adatokat az alábbi szolgáltatók segítségével kezelem:

- Foglalórendszer: [szolgáltató neve, székhelye]
- Online fizetés: Barion Payment Zrt. (1117 Budapest, Irinyi József utca 4–20.)
- Online óra: {platform}
- Hírlevélküldő: [szolgáltató neve, székhelye]
- Tárhely: Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA)

## 4. Sütik és beágyazott tartalmak

Ez a weboldal nem használ követő vagy hirdetési sütiket, és a betűtípusokat is saját tárhelyről tölti be. A bemutatkozó videó csak akkor töltődik be a YouTube-ról (adatvédelmi módban), ha elindítod. Ha az oldalba beágyazott foglalónaptárt használod, annak szolgáltatója saját sütiket helyezhet el — ezekről a szolgáltató tájékoztatója ad információt.

## 5. A jogaid

Bármikor kérheted, hogy:

- tájékoztassalak a rólad kezelt adatokról (hozzáférés),
- javítsam a pontatlan adatokat (helyesbítés),
- töröljem az adataidat (törlés),
- korlátozzam az adatkezelést,
- géppel olvasható formában kiadjam az adataidat (adathordozhatóság),
- és tiltakozhatsz az adatkezelés ellen, illetve visszavonhatod a hozzájárulásodat.

Kérésedet a {email} címre küldheted, és legkésőbb egy hónapon belül válaszolok.

## 6. Jogorvoslat

Ha úgy érzed, hogy megsértettem a személyes adatok védelméhez fűződő jogodat, panaszt tehetsz a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH, 1055 Budapest, Falk Miksa utca 9–11., [naih.hu](https://naih.hu)), vagy bírósághoz fordulhatsz.

Hatályos: [dátum]`
	},
	{
		utvonal: 'aszf',
		cim: 'Általános szerződési feltételek',
		elotag: 'Condiciones generales',
		leiras:
			'Az OKOSspanyol 30 perces online üzleti spanyol óráinak foglalási, fizetési és lemondási feltételei.',
		indexelheto: true,
		foglalasGomb: false,
		torzs: `> **Sablon.** A [szögletes zárójeles] részeket töltsd ki, és közzététel előtt ellenőriztesd jogi szakemberrel vagy a könyvelőddel — különösen az elállási jogról szóló részt. Ezt a dobozt az adminban törölheted.

## 1. A szolgáltató

[Név / vállalkozás neve], székhely: [Székhely címe], adószám: [Adószám], e-mail: {email}.

## 2. A szolgáltatás

Élő, 30 perces, beszédközpontú online üzleti spanyol órák, amelyek a BGE üzleti spanyol szóbeli vizsgára és a spanyolországi munkavállalásra készítenek fel. Az órák A2-es szinttől ajánlottak, nyelvtanmagyarázatot és írásbeli felkészítést nem tartalmaznak. Helyszín: online, {platform}.

## 3. Foglalás

Az órák az online foglalónaptárban, a szabad 30 perces időpontok közül foglalhatók. A foglalás a visszaigazoló e-mail megérkezésével jön létre.

## 4. Árak és fizetés

Az aktuális árak a főoldalon láthatók. Fizetés: {fizetes}. A bankkártyás fizetés a Barion Payment Zrt. rendszerén keresztül történik. [Alanyi adómentesség / ÁFA feltüntetése.]

## 5. Lemondás, átfoglalás, késés

Az óra az időpont előtt legkésőbb {lemondasOrak} órával díjmentesen lemondható vagy áttehető a visszaigazoló e-mailben lévő linkkel. Későbbi lemondás vagy meg nem jelenés esetén az alkalom elvész. Késés esetén az óra a lefoglalt időpontban véget ér.

## 6. Bérletek

A bérletek érvényessége: {berletErvenyesseg}. [A fel nem használt alkalmak sorsa.]

## 7. Elállási jog

[A fogyasztót megillető 14 napos elállási jog és annak elvesztése, ha a szolgáltatás a kifejezett kérésére a határidő letelte előtt teljesül — szakemberrel pontosítandó.]

## 8. Panaszkezelés

Panaszodat a {email} címre küldheted, 30 napon belül írásban válaszolok. Ha nem sikerül megegyeznünk, a lakóhelyed szerint illetékes békéltető testülethez fordulhatsz.

Hatályos: [dátum]`
	},
	{
		utvonal: 'impresszum',
		cim: 'Impresszum',
		elotag: 'Aviso legal',
		leiras: 'Az OKOSspanyol weboldal üzemeltetőjének adatai.',
		indexelheto: true,
		foglalasGomb: false,
		torzs: `- Üzemeltető: [Név / vállalkozás neve]
- Székhely: [Székhely címe]
- Adószám: [Adószám]
- Nyilvántartási szám: [Nyilvántartási szám]
- E-mail: {email}
- Tárhelyszolgáltató: Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA)`
	},
	{
		utvonal: 'koszonjuk',
		cim: '_¡Gracias!_',
		elotag: '',
		leiras: 'Köszönöm a feliratkozást az OKOSspanyol hírlevelére.',
		indexelheto: false,
		foglalasGomb: true,
		torzs: `**Hamarosan jelentkezem.**

Nézd meg a postafiókodat, és erősítsd meg a feliratkozást.

Addig is: ha gyakorolnál élőben, foglalj egy 30 perces órát.`
	}
];

export const alapTartalom = (): Tartalom => ({
	altalanos: {
		oldalCim: 'Üzleti spanyol online — 30 perces beszédgyakorló órák | OKOSspanyol',
		leiras:
			'Élő, 30 perces online üzleti spanyol órák a BGE szóbeli vizsgára és a spanyolországi munkához. A2-től, egyeztetés nélkül foglalható.',
		megosztasSzoveg: 'Beszélj üzleti spanyolul — 30 percben, akkor, amikor neked jó.',
		ogKep: '/og-kep.png',
		ogKepAlt: 'OKOSspanyol – üzleti spanyol beszédgyakorlás online',
		sajatDomain: '',
		email: '[e-mail cím]',
		uzenetLink: '',
		kozossegi: [
			{ szoveg: 'Instagram', href: '' },
			{ szoveg: 'TikTok', href: '' },
			{ szoveg: 'YouTube', href: '' },
			{ szoveg: 'Facebook', href: '' }
		]
	},
	tanar: {
		keresztnev: '[Keresztneved]',
		teljesNev: '[Teljes neved]',
		evek: '[X]'
	},
	foglalas: {
		url: '',
		beagyazottUrl: '',
		gombSzoveg: 'Időpontot foglalok',
		platform: '[Zoom / Google Meet]',
		fizetes: '[pl. foglaláskor bankkártyával, a Barion rendszerén keresztül]',
		lemondasOrak: '[24]',
		berletErvenyesseg: '[pl. a vásárlástól számított 2 / 3 hónap]'
	},
	fejlec: {
		logoKep: '/logo-hosszu.png',
		logoAlt: 'OKOSspanyol',
		menu: [
			{ szoveg: 'Rólam', href: '#rolam' },
			{ szoveg: 'Az órák', href: '#orak' },
			{ szoveg: 'Hogyan foglalj', href: '#foglalas' },
			{ szoveg: 'GYIK', href: '#gyik' }
		],
		mobilSav: true
	},
	szakaszok: [
		ujSzakasz('nyito'),
		ujSzakasz('video'),
		ujSzakasz('rolam'),
		ujSzakasz('orak'),
		ujSzakasz('oraMenete'),
		ujSzakasz('kinekSzol'),
		ujSzakasz('arak'),
		ujSzakasz('foglalas'),
		ujSzakasz('tudnivalok'),
		ujSzakasz('szintfelmero'),
		ujSzakasz('ingyenesAnyagok'),
		ujSzakasz('gyik'),
		ujSzakasz('hirlevel'),
		ujSzakasz('zaro')
	],
	lablec: {
		leiras:
			'Üzleti spanyol beszédgyakorlás online — szóbeli vizsgára és spanyolországi munkához.',
		kapcsolatCim: 'Kapcsolat',
		tudnivalokCim: 'Tudnivalók',
		linkek: [
			{ szoveg: 'Adatkezelési tájékoztató', href: '/adatkezeles' },
			{ szoveg: 'ÁSZF', href: '/aszf' },
			{ szoveg: 'Impresszum', href: '/impresszum' }
		],
		copyright: '© {ev} {teljesNev} · OKOSspanyol',
		zaroEs: '¡Nos vemos en clase!',
		barion: {
			lathato: true,
			kep: '/barion-logo.svg',
			link: 'https://www.barion.com/hu/',
			szoveg: 'Biztonságos online fizetés a Barionnal',
			kartyak: 'Visa · Mastercard · Maestro · American Express'
		}
	},
	aloldalak: alapAloldalak(),
	hibaoldal: {
		elotag: '¡Uy! Error {status}',
		cim: 'Ez az oldal nem található.',
		szoveg: 'Lehet, hogy elírás van a címben, vagy az oldal már nem létezik.',
		gomb: 'Vissza a főoldalra'
	}
});
