<script lang="ts">
	import { oldal } from '$lib/tartalom/kontextus';
	import { foglalasCel } from '$lib/tartalom/szoveg';

	let {
		szoveg = '',
		teljes = false,
		kozvetlen = false
	}: {
		/** Ha üres, az adminban megadott gombszöveg. */
		szoveg?: string;
		/** Teljes szélességű gomb (mobilon). */
		teljes?: boolean;
		/** A foglalási részen belül: mindig közvetlenül a foglalórendszerre visz, ha van. */
		kozvetlen?: boolean;
	} = $props();

	const o = oldal();
	// Ha van foglalórendszer, oda visz; ha nincs, a foglalási részhez görget.
	const cel = $derived(foglalasCel(o.t, kozvetlen));
</script>

<a
	class="gomb gomb-foglalas"
	class:teljes
	href={cel.href}
	target={cel.kulso ? '_blank' : undefined}
	rel={cel.kulso ? 'noopener' : undefined}
>
	{o.sima(szoveg || o.t.foglalas.gombSzoveg)}
	{#if cel.kulso}<span class="csak-felolvasonak">(új lapon nyílik meg)</span>{/if}
</a>

<style>
	.teljes {
		width: 100%;
	}
</style>
