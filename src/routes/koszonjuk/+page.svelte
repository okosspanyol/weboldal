<!--
	Köszönő oldal a hírlevél-feliratkozás után.
	A hírlevélküldőben ezt a címet add meg átirányításnak: https://okosspanyol.hu/koszonjuk
-->
<script lang="ts">
	import JogiOldal from '$lib/components/JogiOldal.svelte';
	import FoglalasGomb from '$lib/components/FoglalasGomb.svelte';
</script>

<JogiOldal
	cim="¡Gracias!"
	leiras="Köszönöm a feliratkozást az OKOSspanyol hírlevelére."
	indexelheto={false}
>
	<p class="nagy">Hamarosan jelentkezem.</p>
	<p>Nézd meg a postafiókodat, és erősítsd meg a feliratkozást.</p>
	<p>Addig is: ha gyakorolnál élőben, foglalj egy 30 perces órát.</p>
	<div><FoglalasGomb /></div>
</JogiOldal>

<style>
	.nagy {
		font-family: var(--font-serif);
		font-weight: 600;
		font-size: 1.5rem;
	}
</style>
