import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { readdirSync } from 'node:fs';
import { defineConfig } from 'vite';

/** A `static/` mappa fájljainak listája — ebből tudja az oldal, hogy feltöltötted-e pl. a logo-hosszu.png-t. */
function statikusFajlok(mappa = 'static', elotag = ''): string[] {
	return readdirSync(mappa, { withFileTypes: true }).flatMap((f) =>
		f.isDirectory()
			? statikusFajlok(`${mappa}/${f.name}`, `${elotag}/${f.name}`)
			: [`${elotag}/${f.name}`]
	);
}

export default defineConfig({
	define: {
		__STATIKUS_FAJLOK__: JSON.stringify(statikusFajlok())
	},
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Cloudflare Worker (statikus fájlokkal) — beállítás: wrangler.jsonc
			adapter: adapter()
		})
	]
});
