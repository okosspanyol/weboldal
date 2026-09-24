<!-- Közös keret a jogi és egyéb szöveges aloldalakhoz. -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';
	import Fejadatok from './Fejadatok.svelte';

	let {
		cim,
		elotag = '',
		leiras,
		indexelheto = true,
		children
	}: {
		cim: string;
		elotag?: string;
		leiras: string;
		indexelheto?: boolean;
		children: Snippet;
	} = $props();
</script>

<Fejadatok cim="{cim} | OKOSspanyol" {leiras} megosztas={cim} {indexelheto} />

<article class="wrap jogi">
	<a class="vissza apro" href={resolve('/')}>← Vissza a főoldalra</a>
	<header>
		{#if elotag}<p class="es elotag">{elotag}</p>{/if}
		<h1>{cim}</h1>
	</header>
	<div class="torzs">
		{@render children()}
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
