<script lang="ts">
	import { resolve } from '$app/paths';
	import { booking } from '$lib/config';

	let {
		szoveg = 'Időpontot foglalok',
		teljes = false,
		kozvetlen = false
	}: {
		szoveg?: string;
		/** Teljes szélességű gomb (mobilon). */
		teljes?: boolean;
		/** A foglalási részen belül: mindig közvetlenül a foglalórendszerre visz, ha van. */
		kozvetlen?: boolean;
	} = $props();

	// Ha van foglalórendszer, oda visz; ha nincs, a foglalási részhez görget.
	const kulso = $derived(!!booking.url && (kozvetlen || !booking.embedUrl));
	const href = $derived(kulso ? booking.url : `${resolve('/')}#foglalas`);
</script>

<a
	class="gomb gomb-foglalas"
	class:teljes
	{href}
	target={kulso ? '_blank' : undefined}
	rel={kulso ? 'noopener' : undefined}
>
	{szoveg}
	{#if kulso}<span class="csak-felolvasonak">(új lapon nyílik meg)</span>{/if}
</a>

<style>
	.teljes {
		width: 100%;
	}
</style>
