<script lang="ts">
	import type { ZaroAdat } from '$lib/tartalom/tipusok';
	import { oldal } from '$lib/tartalom/kontextus';
	import FoglalasGomb from '$lib/components/FoglalasGomb.svelte';

	let { adat, horgony = '' }: { adat: ZaroAdat; horgony?: string } = $props();
	const o = oldal();
</script>

<section id={horgony || undefined} class="zaro" aria-labelledby="{horgony || 'zaro'}-cim">
	<div class="wrap belso">
		{#if adat.elotag.trim()}<p class="es elotag">{@html o.sor(adat.elotag)}</p>{/if}
		<h2 id="{horgony || 'zaro'}-cim">{@html o.sor(adat.cim)}</h2>
		<FoglalasGomb />
		{#if adat.apro.trim()}<p class="apro halk">{@html o.sor(adat.apro)}</p>{/if}
	</div>
</section>

<style>
	.zaro {
		padding-block: var(--szakasz-ter);
		border-top: 1px solid var(--vonal);
		text-align: center;
	}

	.belso {
		display: grid;
		justify-items: center;
		gap: 24px;
	}

	.elotag {
		font-size: 1.25rem;
		color: var(--terrakotta-sotet);
	}

	h2 {
		font-size: clamp(2.2rem, 3.5vw + 1rem, 3.6rem);
		max-width: 18ch;
	}

	h2 :global(strong),
	h2 :global(.es) {
		color: var(--terrakotta);
		font-weight: inherit;
	}
</style>
