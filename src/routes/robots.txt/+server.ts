import { site } from '$lib/config';

export const prerender = true;

export function GET() {
	return new Response(`User-agent: *\nDisallow:\n\nSitemap: ${site.url}/sitemap.xml\n`, {
		headers: { 'Content-Type': 'text/plain' }
	});
}
