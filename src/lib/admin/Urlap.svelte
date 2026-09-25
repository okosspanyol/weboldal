<script lang="ts">
	import type { Mezo as MezoTipus } from './semak';
	import Mezo from './Mezo.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let { mezok, obj }: { mezok: MezoTipus[]; obj: Record<string, any> } = $props();
</script>

<div class="urlap">
	{#each mezok as mezo, i (i)}
		<Mezo {mezo} {obj} />
	{/each}
</div>

<style>
	.urlap {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 16px;
	}
</style>
