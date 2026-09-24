import { site } from '$lib/config';

export const prerender = true;

const oldalak = ['/', '/adatkezeles', '/aszf', '/impresszum'];

export function GET() {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${oldalak.map((o) => `	<url><loc>${site.url}${o}</loc></url>`).join('\n')}
</urlset>
`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
