import { error, json } from '@sveltejs/kit';
import { osszefesul } from '$lib/tartalom/osszefesul';
import { tartalomMentese, Utkozes } from '$lib/server/tarolo';

const MAX_MERET = 1_500_000;
const FOGLALT = new Set(['admin', 'sitemap.xml', 'robots.txt', 'oldal.js', '_app']);

export async function POST({ request, platform, url }) {
	// Csak a saját adminból lehet menteni.
	if (request.headers.get('origin') !== url.origin) error(403, 'Tiltott kérés.');

	const nyers = await request.text();
	if (nyers.length > MAX_MERET) error(413, 'A tartalom túl nagy.');

	let bemenet: { tartalom?: unknown; verzio?: unknown };
	try {
		bemenet = JSON.parse(nyers);
	} catch {
		error(400, 'Hibás adat.');
	}

	const tartalom = osszefesul(bemenet.tartalom);

	const utvonalak = new Set<string>();
	for (const a of tartalom.aloldalak) {
		a.utvonal = a.utvonal.trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(a.utvonal)) {
			return json({ hiba: `Az aloldal címe csak kisbetű, szám és kötőjel lehet: „${a.utvonal}”.` }, { status: 422 });
		}
		if (FOGLALT.has(a.utvonal) || utvonalak.has(a.utvonal)) {
			return json({ hiba: `Ez az aloldal cím foglalt vagy kétszer szerepel: „${a.utvonal}”.` }, { status: 422 });
		}
		utvonalak.add(a.utvonal);
	}

	try {
		const eredmeny = await tartalomMentese(platform, tartalom, Number(bemenet.verzio) || 0);
		return json({ verzio: eredmeny.verzio, frissitve: eredmeny.frissitve, tartalom });
	} catch (hiba) {
		if (hiba instanceof Utkozes) {
			return json(
				{ hiba: 'Közben egy másik lapon vagy eszközön is mentettél. Töltsd újra az oldalt, hogy a legfrissebb változatot szerkeszd.' },
				{ status: 409 }
			);
		}
		throw hiba;
	}
}
