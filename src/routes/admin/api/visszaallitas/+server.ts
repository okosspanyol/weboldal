import { error, json } from '@sveltejs/kit';
import { elozoVisszaallitasa } from '$lib/server/tarolo';

export async function POST({ request, platform, url }) {
	if (request.headers.get('origin') !== url.origin) error(403, 'Tiltott kérés.');
	try {
		return json(await elozoVisszaallitasa(platform));
	} catch (hiba) {
		return json({ hiba: hiba instanceof Error ? hiba.message : String(hiba) }, { status: 400 });
	}
}
