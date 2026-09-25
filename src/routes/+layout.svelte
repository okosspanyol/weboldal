<script lang="ts">
	// Betűk saját tárhelyről (nem a Google szervereiről) — gyorsabb, és nem küld adatot harmadik félnek.
	import '@fontsource/lora/400.css';
	import '@fontsource/lora/400-italic.css';
	import '@fontsource/lora/600.css';
	import '@fontsource/lora/600-italic.css';
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/500.css';
	import '@fontsource/poppins/600.css';
	import '@fontsource/poppins/700.css';
	import '../app.css';

	import { page } from '$app/state';
	import OldalKeret from '$lib/components/OldalKeret.svelte';
	import { alapTartalom } from '$lib/tartalom/alap';
	import { tartalomBeallitasa } from '$lib/tartalom/kontextus';

	let { data, children } = $props();

	const admin = $derived(page.route.id?.startsWith('/admin') ?? false);
	const tartalom = $derived(data.tartalom ?? alapTartalom());
	tartalomBeallitasa(() => tartalom);
</script>

<svelte:head>
	{#if !admin}<script src="/oldal.js" defer></script>{/if}
</svelte:head>

{#if admin}
	{@render children()}
{:else}
	<OldalKeret>
		{@render children()}
	</OldalKeret>
{/if}
