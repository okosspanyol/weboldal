// See https://svelte.dev/docs/kit/types#app.d.ts
import type { D1Database } from '@cloudflare/workers-types';
import type { Tartalom } from '$lib/tartalom/tipusok';

declare global {
	/** A `static/` mappa fájljai (pl. '/logo-hosszu.png'), felépítéskor beírva — lásd vite.config.ts. */
	const __STATIKUS_FAJLOK__: string[];

	namespace App {
		interface Locals {
			tartalom: Tartalom;
			verzio: number;
			admin: boolean;
		}
		interface Platform {
			env: {
				DB: D1Database;
				ADMIN_JELSZO?: string;
			};
		}
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
	}
}

export {};
