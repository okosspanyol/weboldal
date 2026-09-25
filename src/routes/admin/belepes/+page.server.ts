import { fail, redirect } from '@sveltejs/kit';
import { belepteto, jelszoHelyes } from '$lib/server/azonositas';

export function load({ locals, platform }) {
	if (locals.admin) redirect(303, '/admin');
	return { vanJelszo: !!platform?.env?.ADMIN_JELSZO };
}

export const actions = {
	default: async ({ request, cookies, platform, url }) => {
		const jelszo = platform?.env?.ADMIN_JELSZO;
		const megadott = String((await request.formData()).get('jelszo') ?? '');

		if (!(await jelszoHelyes(jelszo, megadott))) {
			// Kis várakozás, hogy a jelszó találgatása lassú legyen.
			await new Promise((r) => setTimeout(r, 800));
			return fail(400, { hiba: true });
		}

		await belepteto(cookies, jelszo!, url.protocol === 'https:');
		redirect(303, '/admin');
	}
};
