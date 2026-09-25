export function GET({ locals, url }) {
	const t = locals.tartalom;
	const gyoker = (t.altalanos.sajatDomain.trim() || url.origin).replace(/\/$/, '');
	const oldalak = ['/', ...t.aloldalak.filter((a) => a.indexelheto).map((a) => `/${a.utvonal}`)];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${oldalak.map((o) => `	<url><loc>${gyoker}${o}</loc></url>`).join('\n')}
</urlset>
`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
