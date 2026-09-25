<!-- A főoldal szakaszai az adminban beállított sorrendben. -->
<script lang="ts">
	import { szakaszKomponensek } from '$lib/szakaszok';
	import { oldal } from '$lib/tartalom/kontextus';

	let { elonezet = false }: { elonezet?: boolean } = $props();
	const o = oldal();
	const lathatok = $derived(o.t.szakaszok.filter((s) => s.lathato));
</script>

{#each lathatok as sz (sz.id)}
	{@const Komponens = szakaszKomponensek[sz.tipus]}
	{#if elonezet}
		<div class="elonezet-szakasz" data-szakasz-id={sz.id}>
			<Komponens adat={sz.adat} horgony={sz.horgony} id={sz.id} elonezet />
		</div>
	{:else}
		<Komponens adat={sz.adat} horgony={sz.horgony} id={sz.id} />
	{/if}
{/each}
