<script lang="ts">
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	const igen = [
		'legalább A2-es szinten vagy,',
		'megvan az alap szókincsed és nyelvtanod,',
		'és beszédben szeretnél fejlődni.'
	];

	const nem = [
		'most kezded a spanyolt,',
		'nyelvtanmagyarázatot keresel,',
		'vagy az írásbeli vizsgarészre készülnél.'
	];
</script>

<section class="szakasz kinek" aria-labelledby="kinek-cim">
	<div class="wrap">
		<SzakaszCim id="kinek-cim" elotag="¿Es para ti?">Kinek szól — és kinek nem?</SzakaszCim>

		<div class="oszlopok">
			<div class="oszlop igen">
				<h3>Neked való, ha…</h3>
				<ul>
					{#each igen as sor (sor)}
						<li><span class="jel" aria-hidden="true">✓</span>{sor}</li>
					{/each}
				</ul>
			</div>

			<div class="oszlop nem">
				<h3>Nem neked való, ha…</h3>
				<ul>
					{#each nem as sor (sor)}
						<li><span class="jel" aria-hidden="true">✕</span>{sor}</li>
					{/each}
				</ul>
				<p class="apro halk">Az órák tisztán beszédgyakorlások.</p>
			</div>
		</div>
	</div>
</section>

<style>
	.oszlopok {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(32px, 5vw, 72px);
		margin-top: clamp(32px, 4vw, 48px);
	}

	.oszlop {
		display: grid;
		gap: 18px;
		align-content: start;
		padding-top: 24px;
		border-top: 2px solid var(--oliva);
	}

	.oszlop.nem {
		border-top-color: var(--terrakotta);
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 12px;
	}

	li {
		display: flex;
		gap: 14px;
		align-items: baseline;
		font-size: 1.05em;
	}

	.jel {
		flex: none;
		display: inline-grid;
		place-items: center;
		width: 26px;
		height: 26px;
		font-size: 14px;
		font-weight: 700;
		color: var(--krem);
		background: var(--oliva);
		transform: translateY(2px);
	}

	.nem .jel {
		background: var(--terrakotta-sotet);
	}

	@media (max-width: 760px) {
		.oszlopok {
			grid-template-columns: 1fr;
		}
	}
</style>
