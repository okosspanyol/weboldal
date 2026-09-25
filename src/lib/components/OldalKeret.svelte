<!-- A nyilvános oldal kerete: fejléc, tartalom, lábléc, mobil foglalás sáv. -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import Fejlec from './Fejlec.svelte';
	import Lablec from './Lablec.svelte';
	import MobilFoglalasSav from './MobilFoglalasSav.svelte';

	let { children }: { children: Snippet } = $props();
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
