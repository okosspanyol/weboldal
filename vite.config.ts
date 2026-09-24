import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { site } from './src/lib/config';

// Alútvonal a weboldal címéből: 'https://okosspanyol.github.io/weboldal' → '/weboldal', saját domainnél ''.
// Fejlesztés közben (npm run dev) mindig a gyökérből fut.
const base = (
	process.argv.includes('dev') ? '' : new URL(site.url).pathname.replace(/\/$/, '')
) as '' | `/${string}`;

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Statikus oldal: a `npm run build` után a `build/` mappa bármilyen tárhelyre feltölthető.
			adapter: adapter({ fallback: '404.html' }),

			paths: { base }
		})
	]
});
