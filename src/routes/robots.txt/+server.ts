export function GET({ locals, url }) {
	const gyoker = (locals.tartalom.altalanos.sajatDomain.trim() || url.origin).replace(/\/$/, '');
	return new Response(`User-agent: *\nDisallow: /admin\n\nSitemap: ${gyoker}/sitemap.xml\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
