<script lang="ts">
	import type { TudnivalokAdat } from '$lib/tartalom/tipusok';
	import { oldal } from '$lib/tartalom/kontextus';
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	let { adat, horgony = 'tudnivalok' }: { adat: TudnivalokAdat; horgony?: string } = $props();
	const o = oldal();
</script>

<section
	id={horgony || undefined}
	class="szakasz tudnivalok"
	aria-labelledby="{horgony || 'tudnivalok'}-cim"
>
	<div class="wrap">
		<SzakaszCim id="{horgony || 'tudnivalok'}-cim" elotag={adat.elotag} cim={adat.cim} />

		<dl>
			{#each adat.elemek as elem, i (i)}
				<div class="elem">
					<dt>{@html o.sor(elem.cim)}</dt>
					<dd>{@html o.sor(elem.szoveg)}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<style>
	dl {
		margin: clamp(32px, 4vw, 48px) 0 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
		gap: 0 clamp(24px, 4vw, 56px);
	}

	.elem {
		padding: 20px 0;
		border-top: 1px solid var(--vonal);
		display: grid;
		gap: 6px;
		align-content: start;
	}

	dt {
		font-weight: 600;
	}

	dd {
		margin: 0;
	}

	/* A szöveg első betűje nagybetű, ha a beállításban kisbetűvel kezdődik */
	dd::first-letter {
		text-transform: uppercase;
	}
</style>
