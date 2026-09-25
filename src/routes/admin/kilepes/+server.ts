import { redirect } from '@sveltejs/kit';
import { kileptetes } from '$lib/server/azonositas';

export function POST({ cookies }) {
	kileptetes(cookies);
	redirect(303, '/admin/belepes');
}
