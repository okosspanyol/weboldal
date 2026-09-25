/**
 * Az adminban írt szövegek biztonságos HTML-lé alakítása.
 *
 * Soron belül:
 *   _spanyol szöveg_        → Lora dőlt (az arculat szerint minden spanyol így jelenik meg)
 *   **kiemelés**            → félkövér / terrakotta kiemelés címekben
 *   [link szövege](cím)     → link
 *   {keresztnev}, {email} … → változók (lásd `valtozok`)
 *   e-mail címek             → magától kattintható
 *
 * Hosszabb szövegben (aloldalak, „szöveg” szakasz) még:
 *   ## Cím, ### Alcím, „- ” kezdetű sorok listaként, „> ” kezdetű sor kiemelt dobozként,
 *   üres sor = új bekezdés.
 */
import type { Tartalom } from './tipusok';

export type Valtozok = Record<string, string>;

export function valtozok(t: Tartalom, extra: Valtozok = {}): Valtozok {
	return {
		keresztnev: t.tanar.keresztnev,
		teljesNev: t.tanar.teljesNev,
		evek: t.tanar.evek,
		email: t.altalanos.email,
		platform: t.foglalas.platform,
		fizetes: t.foglalas.fizetes,
		lemondasOrak: t.foglalas.lemondasOrak,
		berletErvenyesseg: t.foglalas.berletErvenyesseg,
		ev: String(new Date().getFullYear()),
		...extra
	};
}

/** A szerkesztő súgójához. */
export const valtozoLeirasok: [string, string][] = [
	['keresztnev', 'keresztneved'],
	['teljesNev', 'teljes neved'],
	['evek', 'tanítási évek'],
	['email', 'e-mail címed (kattintható)'],
	['platform', 'online óra helye'],
	['fizetes', 'fizetés módja'],
	['lemondasOrak', 'lemondási határidő (óra)'],
	['berletErvenyesseg', 'bérlet érvényessége'],
	['ev', 'aktuális év']
];

const ESCAPE: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;'
};

export const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ESCAPE[c]);

const visszaalakit = (s: string) =>
	s.replace(/&(amp|lt|gt|quot|#39);/g, (e) => Object.keys(ESCAPE).find((k) => ESCAPE[k] === e) ?? e);

export function csere(szoveg: string, v: Valtozok): string {
	return (szoveg ?? '').replace(/\{(\w+)\}/g, (egesz, nev: string) => (nev in v ? v[nev] : egesz));
}

/**
 * Csak biztonságos linkek: http(s), mailto, tel, oldalon belüli (/…, #…). Minden más → '#'.
 * A „#valami” horgonyt a főoldalra irányítja, így aloldalról is működik.
 */
export function link(href: string): string {
	const h = (href ?? '').trim();
	if (!h) return '';
	if (h.startsWith('#')) return '/' + h;
	if (/^(https?:|mailto:|tel:)/i.test(h) || (h.startsWith('/') && !h.startsWith('//'))) return h;
	if (/^[\w.-]+\.[a-z]{2,}(\/|$)/i.test(h)) return 'https://' + h;
	return '#';
}

export const kulsoLink = (href: string) => /^https?:/i.test(href);

export const emailErvenyes = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? '');

const MINTA =
	/\[([^\]]+)\]\(([^)\s]+)\)|\*\*(.+?)\*\*|(?<![\p{L}\p{N}])_(?=\S)(.+?)(?<=\S)_(?![\p{L}\p{N}])|([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/gu;

/** Már escape-elt szövegen dolgozik. */
function jelolesek(s: string, linkben = false): string {
	return s.replace(MINTA, (egesz, lSzoveg, lCim, felkover, dolt, email) => {
		if (lSzoveg !== undefined) {
			if (linkben) return egesz;
			const cel = link(visszaalakit(lCim));
			const kulso = kulsoLink(cel);
			return `<a href="${escape(cel)}"${kulso ? ' target="_blank" rel="noopener"' : ''}>${jelolesek(lSzoveg, true)}</a>`;
		}
		if (felkover !== undefined) return `<strong>${jelolesek(felkover, linkben)}</strong>`;
		if (dolt !== undefined) return `<span class="es">${jelolesek(dolt, linkben)}</span>`;
		if (email !== undefined && !linkben) return `<a href="mailto:${email}">${email}</a>`;
		return egesz;
	});
}

/** Egysoros szöveg (cím, bekezdés) HTML-je. */
export function sor(szoveg: string, v: Valtozok): string {
	return jelolesek(escape(csere(szoveg, v))).replace(/\n/g, '<br>');
}

/** Sima szöveg jelölések nélkül (pl. alt, title, meta). */
export function sima(szoveg: string, v: Valtozok): string {
	return csere(szoveg, v)
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/\*\*(.+?)\*\*/g, '$1')
		.replace(/(?<![\p{L}\p{N}])_(?=\S)(.+?)(?<=\S)_(?![\p{L}\p{N}])/gu, '$1');
}

/** Többbekezdéses szöveg HTML-je. */
export function blokk(szoveg: string, v: Valtozok): string {
	return (szoveg ?? '')
		.replace(/\r\n/g, '\n')
		.split(/\n\s*\n/)
		.map((b) => b.trim())
		.filter(Boolean)
		.map((b) => {
			const sorok = b.split('\n');
			if (sorok.every((s) => /^\s*[-•]\s+/.test(s))) {
				return `<ul>${sorok.map((s) => `<li>${sor(s.replace(/^\s*[-•]\s+/, ''), v)}</li>`).join('')}</ul>`;
			}
			const cim = /^(#{2,3})\s+(.*)$/.exec(b);
			if (cim && sorok.length === 1) {
				const h = cim[1].length === 2 ? 'h2' : 'h3';
				return `<${h}>${sor(cim[2], v)}</${h}>`;
			}
			if (sorok.every((s) => s.startsWith('>'))) {
				return `<p class="megjegyzes">${sor(sorok.map((s) => s.replace(/^>\s?/, '')).join('\n'), v)}</p>`;
			}
			return `<p>${sor(b, v)}</p>`;
		})
		.join('\n');
}

/** YouTube-azonosító bármilyen szokásos linkből (watch, youtu.be, shorts, embed, live) vagy magából az azonosítóból. */
export function youtubeAzonosito(bemenet: string): string {
	const s = (bemenet ?? '').trim();
	if (/^[\w-]{11}$/.test(s)) return s;
	const m =
		/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([\w-]{11})/.exec(
			s
		);
	return m ? m[1] : '';
}

/** A foglalás gomb célja: a foglalórendszer, vagy ha nincs (vagy a naptár be van ágyazva), a foglalási rész. */
export function foglalasCel(t: Tartalom, kozvetlen = false): { href: string; kulso: boolean } {
	const url = t.foglalas.url.trim();
	const kulso = !!url && (kozvetlen || !t.foglalas.beagyazottUrl.trim());
	return kulso ? { href: link(url), kulso: kulsoLink(link(url)) } : { href: '/#foglalas', kulso: false };
}

/** Az oldal egy statikus fájlja létezik-e (a `static/` mappa tartalma felépítéskor kerül be). */
export function kepElerheto(src: string): boolean {
	const s = (src ?? '').trim();
	if (!s) return false;
	if (/^https?:\/\//i.test(s)) return true;
	return __STATIKUS_FAJLOK__.includes(s.split(/[?#]/)[0]);
}
