<script lang="ts">
	import FoglalasGomb from '$lib/components/FoglalasGomb.svelte';
</script>

<section class="zaro" aria-labelledby="zaro-cim">
	<div class="wrap belso">
		<p class="es elotag">¿Empezamos?</p>
		<h2 id="zaro-cim">A spanyolod megvan. <span class="kiemelt">Most beszéljünk!</span></h2>
		<FoglalasGomb />
		<p class="apro halk">30 perc · A2-es szinttől · nincs kötelező órarend</p>
	</div>
</section>

<style>
	.zaro {
		padding-block: var(--szakasz-ter);
		border-top: 1px solid var(--vonal);
		text-align: center;
	}

	.belso {
		display: grid;
		justify-items: center;
		gap: 24px;
	}

	.elotag {
		font-size: 1.25rem;
		color: var(--terrakotta-sotet);
	}

	h2 {
		font-size: clamp(2.2rem, 3.5vw + 1rem, 3.6rem);
		max-width: 18ch;
	}

	.kiemelt {
		color: var(--terrakotta);
	}
</style>
