<!--
	Szakaszcím a védjegyszerű vékony függőleges vonallal a bal oldalon:
	krém alapon terrakotta, sötét alapon mustársárga.
-->
<script lang="ts">
	import { oldal } from '$lib/tartalom/kontextus';

	let {
		id,
		elotag = '',
		cim
	}: {
		/** A címsor azonosítója (a szakasz aria-labelledby-jához). */
		id?: string;
		/** Kis felirat a cím fölött — spanyolul, Lora dőlttel. */
		elotag?: string;
		/** A cím szövege (jelölésekkel). */
		cim: string;
	} = $props();

	const o = oldal();
</script>

<div class="szakaszcim">
	{#if elotag}<p class="elotag es">{@html o.sor(elotag)}</p>{/if}
	<h2 {id}>{@html o.sor(cim)}</h2>
</div>

<style>
	.szakaszcim {
		position: relative;
		padding-left: 26px;
		display: grid;
		gap: 10px;
	}

	.szakaszcim::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.2em;
		bottom: 0.2em;
		width: 8px;
		background: var(--terrakotta);
	}

	:global(.sotet) .szakaszcim::before {
		background: var(--mustar);
	}

	.elotag {
		font-size: 1.15rem;
		color: var(--terrakotta-sotet);
	}

	:global(.sotet) .elotag {
		color: var(--krem);
		font-weight: 500;
	}
</style>
