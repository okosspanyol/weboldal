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

	import Fejlec from '$lib/components/Fejlec.svelte';
	import Lablec from '$lib/components/Lablec.svelte';
	import MobilFoglalasSav from '$lib/components/MobilFoglalasSav.svelte';

	let { children } = $props();
</script>

<a class="ugras" href="#tartalom">Ugrás a tartalomra</a>

<Fejlec />

<main id="tartalom">
	{@render children()}
</main>

<Lablec />
<MobilFoglalasSav />

<style>
	.ugras {
		position: absolute;
		left: 16px;
		top: -100px;
		z-index: 100;
		padding: 12px 18px;
		background: var(--barna);
		color: var(--krem);
		border-radius: var(--sarok);
	}

	.ugras:focus {
		top: 16px;
	}
</style>
