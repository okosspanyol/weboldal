<!-- Szöveges aloldal (adatkezelés, ÁSZF, impresszum, köszönő oldal és az adminban hozzáadott oldalak). -->
<script lang="ts">
	import type { Aloldal } from '$lib/tartalom/tipusok';
	import { oldal } from '$lib/tartalom/kontextus';
	import Fejadatok from './Fejadatok.svelte';
	import FoglalasGomb from './FoglalasGomb.svelte';

	let { aloldal }: { aloldal: Aloldal } = $props();
	const o = oldal();
</script>

<Fejadatok
	cim="{o.sima(aloldal.cim)} | OKOSspanyol"
	leiras={aloldal.leiras}
	megosztas={o.sima(aloldal.cim)}
	indexelheto={aloldal.indexelheto}
/>

<article class="wrap jogi">
	<a class="vissza apro" href="/">← Vissza a főoldalra</a>
	<header>
		{#if aloldal.elotag.trim()}<p class="es elotag">{@html o.sor(aloldal.elotag)}</p>{/if}
		<h1>{@html o.sor(aloldal.cim)}</h1>
	</header>
	<div class="torzs">
		{@html o.blokk(aloldal.torzs)}
		{#if aloldal.foglalasGomb}<div><FoglalasGomb /></div>{/if}
	</div>
</article>

<style>
	.jogi {
		padding-block: clamp(32px, 5vw, 64px) var(--szakasz-ter);
		max-width: 860px;
	}

	.vissza {
		display: inline-block;
		margin-bottom: 32px;
		font-weight: 500;
	}

	header {
		position: relative;
		padding-left: 26px;
		margin-bottom: 40px;
		display: grid;
		gap: 10px;
	}

	header::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.2em;
		bottom: 0.2em;
		width: 8px;
		background: var(--terrakotta);
	}

	h1 {
		font-size: clamp(2rem, 2.5vw + 1rem, 3rem);
	}

	.elotag {
		font-size: 1.15rem;
		color: var(--terrakotta-sotet);
	}

	.torzs {
		display: grid;
		gap: 18px;
		max-width: 70ch;
	}

	.torzs :global(h2) {
		font-size: 1.5rem;
		margin-top: 20px;
	}

	.torzs :global(h3) {
		margin-top: 12px;
	}

	.torzs :global(ul) {
		margin: 0;
		padding-left: 1.2em;
		display: grid;
		gap: 6px;
	}

	.torzs :global(.megjegyzes) {
		padding: 16px 20px;
		background: var(--krem-melyebb);
		border-left: 4px solid var(--oliva);
		border-radius: var(--sarok);
		font-size: 16px;
	}
</style>
