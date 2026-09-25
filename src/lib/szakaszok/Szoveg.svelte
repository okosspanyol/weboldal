<!-- Szabadon hozzáadható szöveges szakasz (az adminban „Szöveges blokk”). -->
<script lang="ts">
	import type { SzovegAdat } from '$lib/tartalom/tipusok';
	import { oldal } from '$lib/tartalom/kontextus';
	import FoglalasGomb from '$lib/components/FoglalasGomb.svelte';
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	let { adat, horgony = '', id = '' }: { adat: SzovegAdat; horgony?: string; id?: string } =
		$props();
	const o = oldal();
	const cimId = $derived(`${horgony || id || 'szoveg'}-cim`);
</script>

<section
	id={horgony || undefined}
	class="szakasz szabad"
	class:sotet={adat.sotet}
	aria-labelledby={adat.cim.trim() ? cimId : undefined}
>
	<div class="wrap belso">
		{#if adat.cim.trim()}<SzakaszCim id={cimId} elotag={adat.elotag} cim={adat.cim} />{/if}
		<div class="torzs olvashato">{@html o.blokk(adat.torzs)}</div>
		{#if adat.foglalasGomb}<div><FoglalasGomb /></div>{/if}
	</div>
</section>

<style>
	.szabad:not(.sotet) {
		border-top: 1px solid var(--vonal);
	}

	.belso {
		display: grid;
		gap: 28px;
	}

	.torzs {
		display: grid;
		gap: 16px;
	}

	.torzs :global(h2) {
		font-size: 1.5rem;
		margin-top: 12px;
	}

	.torzs :global(h3) {
		margin-top: 8px;
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
	}

	.sotet .torzs :global(.megjegyzes) {
		background: rgb(251 241 228 / 0.1);
		border-left-color: var(--mustar);
	}
</style>
