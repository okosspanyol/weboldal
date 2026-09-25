import { error } from '@sveltejs/kit';

export function load({ locals, params }) {
	const aloldal = locals.tartalom.aloldalak.find((a) => a.utvonal === params.oldal);
	if (!aloldal) error(404, 'Nem található');
	return { aloldal };
}
