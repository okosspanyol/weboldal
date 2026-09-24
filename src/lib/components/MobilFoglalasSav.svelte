<!-- Mobilon a foglalás gomb a képernyő alján végig látszik. -->
<script lang="ts">
	import FoglalasGomb from './FoglalasGomb.svelte';
</script>

<div class="sav">
	<FoglalasGomb teljes />
</div>

<style>
	.sav {
		display: none;
	}

	@media (max-width: 899px) {
		.sav {
			display: block;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 40;
			padding: 10px 16px calc(10px + env(safe-area-inset-bottom, 0px));
			background: rgb(251 241 228 / 0.94);
			backdrop-filter: blur(8px);
			-webkit-backdrop-filter: blur(8px);
			border-top: 1px solid var(--vonal);
		}
	}
</style>
