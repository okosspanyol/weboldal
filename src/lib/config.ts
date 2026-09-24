/**
 * Az oldal minden személyes adata és beállítása itt van, egy helyen.
 *
 * A [szögletes zárójeles] értékeket írd át a saját adataidra.
 * Ha egy linket még nem tudsz (pl. foglalórendszer, hírlevél), hagyd üresen (''):
 * az oldal ilyenkor is rendesen működik, csak a hozzá tartozó rész egyszerűbb formában jelenik meg.
 */
export const site = {
	/** A weboldal végleges címe, perjel nélkül (a megosztási előnézethez és a keresőkhöz kell). */
	url: 'https://okosspanyol.hu',

	/** Böngészőfül és Google-találat címe. */
	title: 'Üzleti spanyol online — 30 perces beszédgyakorló órák | OKOSspanyol',

	/** Keresőben megjelenő leírás (legfeljebb 155 karakter). */
	description:
		'Élő, 30 perces online üzleti spanyol órák a BGE szóbeli vizsgára és a spanyolországi munkához. A2-től, egyeztetés nélkül foglalható.',

	/** Facebookon, Messengerben megosztáskor megjelenő szöveg. */
	shareText: 'Beszélj üzleti spanyolul — 30 percben, akkor, amikor neked jó.'
};

export const teacher = {
	/** Így jelenik meg: „¡Hola! [Keresztneved] vagyok.” */
	firstName: '[Keresztneved]',
	/** Teljes név a láblécben és az impresszumban. */
	fullName: '[Teljes neved]',
	/** Hány éve tanítasz (csak a szám). */
	yearsTeaching: '[X]',
	/**
	 * Bizalomerősítő tények a bemutatkozás alatt — csak azt hagyd meg, ami igaz.
	 * A tanítási évek sort automatikusan hozzáadjuk a fenti számból.
	 */
	facts: [
		'[Végzettség, pl. spanyol szakos tanári diploma]',
		'[Spanyolországi tapasztalat, pl. X év kint élés vagy munka]',
		'Saját, 14 témás üzleti spanyol B2 tananyag'
	],
	/**
	 * Saját, valódi fotók a `static/kepek/` mappából, pl. '/kepek/rolam.jpg'.
	 * Ha üres, díszített boltív jelenik meg a fotó helyén.
	 */
	photos: {
		hero: '',
		about: ''
	}
};

export const contact = {
	email: '[e-mail cím]',
	social: {
		/** Csak a felhasználónév, @ nélkül — ebből lesz a profil- és az üzenetküldő link is. */
		instagram: '',
		facebook: '',
		tiktok: '',
		youtube: ''
	}
};

export const booking = {
	/**
	 * A foglalórendszer nyilvános linkje (pl. Calendly, SimplyBook, Google Naptár foglalási oldal).
	 * Ha üres, az „Időpontot foglalok” gombok a foglalási részhez görgetnek.
	 */
	url: '',
	/**
	 * Ha a foglalórendszer ad beágyazható linket (iframe), ide másold — ekkor a naptár
	 * közvetlenül az oldalon jelenik meg. Ha üres, egy nagy foglalás gomb áll a helyén.
	 */
	embedUrl: '',
	/** Online óra helyszíne. */
	platform: '[Zoom / Google Meet]',
	payment: '[pl. foglaláskor bankkártyával / átutalással az óra előtt]',
	/** Hány órával az óra előtt lehet díjmentesen lemondani. */
	freeCancellationHours: '[24]',
	passValidity: '[pl. a vásárlástól számított 2 / 3 hónap]'
};

export const pricing = {
	packages: [
		{ name: '1 alkalom', detail: '30 perc', price: '[ár] Ft' },
		{ name: '5 alkalmas bérlet', detail: '5 × 30 perc', price: '[ár] Ft' },
		{ name: '10 alkalmas bérlet', detail: '10 × 30 perc', price: '[ár] Ft' }
	],
	/** Indulási ajánlat, pl. 'Indulási kedvezmény az első 20 foglalónak: …'. Ha nincs, hagyd üresen. */
	launchOffer: ''
};

export const freeMaterials = [
	{
		title: 'A BGE üzleti szóbeli 5 része',
		subtitle: 'Egyoldalas puska',
		keyword: 'ORAL',
		/** Ha kész a PDF, tedd a `static/anyagok/` mappába, és írd ide: '/anyagok/OKOSspanyol_bge_szobeli_puska.pdf' */
		file: ''
	},
	{
		title: '20 interjúkérdés spanyolul',
		subtitle: 'Válaszmintával',
		keyword: 'ENTREVISTA',
		file: ''
	}
];

export const newsletter = {
	/**
	 * A hírlevélküldő (pl. MailerLite, Brevo, Mailchimp) űrlapjának „action” címe.
	 * Ha üres, a feliratkozás helyett egy e-mail-cím jelenik meg.
	 * Bekötésnél a mezőnevek (name="…") igazítását lásd a README-ben.
	 */
	action: ''
};

export const company = {
	/** Impresszumhoz: név / vállalkozás neve, székhely, adószám, nyilvántartási szám. */
	name: '[Név / vállalkozás neve]',
	address: '[Székhely címe]',
	taxNumber: '[Adószám]',
	registration: '[Nyilvántartási szám]',
	hosting: '[Tárhelyszolgáltató neve, címe, e-mail címe]'
};

/** Instagram közvetlen üzenet link (hangüzenethez, kérdésekhez). */
export function instagramDmUrl(): string {
	return contact.social.instagram ? `https://ig.me/m/${contact.social.instagram}` : '';
}

export function socialLinks(): { label: string; href: string }[] {
	const s = contact.social;
	return [
		{ label: 'Instagram', href: s.instagram && `https://www.instagram.com/${s.instagram}/` },
		{ label: 'TikTok', href: s.tiktok && `https://www.tiktok.com/@${s.tiktok}` },
		{ label: 'YouTube', href: s.youtube && `https://www.youtube.com/@${s.youtube}` },
		{ label: 'Facebook', href: s.facebook && `https://www.facebook.com/${s.facebook}` }
	].filter((l) => l.href);
}

/** Igaz, ha az e-mail cím már ki van töltve (nem sablonszöveg). */
export function hasEmail(): boolean {
	return contact.email.includes('@');
}
