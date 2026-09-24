<script lang="ts">
	import { booking, pricing } from '$lib/config';
	import FoglalasGomb from '$lib/components/FoglalasGomb.svelte';
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';
</script>

<section id="arak" class="szakasz arak" aria-labelledby="arak-cim">
	<div class="wrap">
		<SzakaszCim id="arak-cim" elotag="Precios">Árak</SzakaszCim>

		{#if pricing.launchOffer}
			<p class="ajanlat"><span class="cimke">Indulási ajánlat</span> {pricing.launchOffer}</p>
		{/if}

		<ul class="csomagok">
			{#each pricing.packages as csomag, i (csomag.name)}
				<li class="csomag">
					<span class="sorszam">0{i + 1} / 0{pricing.packages.length}</span>
					<h3>{csomag.name}</h3>
					<p class="halk">{csomag.detail}</p>
					<p class="ar">{csomag.price}</p>
				</li>
			{/each}
		</ul>

		<div class="lab">
			<FoglalasGomb />
			<p class="apro halk">
				Heti 2–3 alkalom a leghatékonyabb, de nincs kötelező ritmus. Bérlet érvényessége: {booking.passValidity}.
			</p>
		</div>
	</div>
</section>

<style>
	.arak {
		border-top: 1px solid var(--vonal);
	}

	.ajanlat {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px 14px;
		margin-top: 28px;
		font-weight: 500;
	}

	.csomagok {
		list-style: none;
		margin: clamp(32px, 4vw, 48px) 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: clamp(16px, 2.5vw, 28px);
	}

	.csomag {
		display: grid;
		gap: 8px;
		align-content: start;
		padding: clamp(24px, 2.5vw, 32px);
		border: 1px solid var(--vonal);
		border-radius: var(--sarok);
		background: rgb(255 255 255 / 0.5);
	}

	.csomag h3 {
		margin-top: 8px;
	}

	.ar {
		margin-top: 16px;
		padding-top: 16px;
		border-top: 1px solid var(--vonal);
		font-family: var(--font-serif);
		font-weight: 600;
		font-size: clamp(1.6rem, 1.2vw + 1.2rem, 2rem);
		color: var(--terrakotta-sotet);
	}

	.lab {
		margin-top: clamp(32px, 4vw, 48px);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 16px 28px;
	}

	.lab p {
		max-width: 52ch;
	}

	@media (max-width: 899px) {
		.csomagok {
			grid-template-columns: 1fr;
		}
	}
</style>
