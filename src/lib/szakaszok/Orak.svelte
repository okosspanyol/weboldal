<script lang="ts">
	import type { OrakAdat } from '$lib/tartalom/tipusok';
	import { oldal } from '$lib/tartalom/kontextus';
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	let { adat, horgony = 'orak' }: { adat: OrakAdat; horgony?: string } = $props();
	const o = oldal();
	const h = $derived(horgony || 'orak');
	const ketjegyu = (n: number) => String(n).padStart(2, '0');
</script>

<section id={horgony || undefined} class="szakasz orak" aria-labelledby="{h}-cim">
	<div class="wrap">
		<div class="fej">
			<SzakaszCim id="{h}-cim" elotag={adat.elotag} cim={adat.cim} />
			{#if adat.bevezeto.trim()}
				<p class="olvashato bevezeto">{@html o.sor(adat.bevezeto)}</p>
			{/if}
		</div>

		{#if adat.kartyak.length}
			<div class="kartyak">
				{#each adat.kartyak as szal, i (i)}
					<article class="kartya {szal.szin === 'munka' ? 'munka' : 'vizsga'}" aria-labelledby="{h}-szal-{i}">
						<div class="kartya-fej">
							<span class="sorszam">{ketjegyu(i + 1)} / {ketjegyu(adat.kartyak.length)}</span>
							<span class="es szal-es">{@html o.sor(szal.es)}</span>
						</div>
						<h3 id="{h}-szal-{i}">{@html o.sor(szal.cim)}</h3>
						{#if szal.kinek.trim()}
							<p class="kinek"><strong>{o.sima(adat.kinekCimke)}</strong> {@html o.sor(szal.kinek)}</p>
						{/if}
						<ul>
							{#each szal.pontok as pont, j (j)}
								<li>{@html o.sor(pont)}</li>
							{/each}
						</ul>
					</article>
				{/each}
			</div>
		{/if}

		{#if adat.miertCim.trim() || adat.miertSzoveg.trim()}
			<div class="miert">
				<p class="harminc" aria-hidden="true">
					<span class="szam">{o.sima(adat.miertSzam)}</span>
					<span class="perc">{o.sima(adat.miertEgyseg)}</span>
				</p>
				<div class="miert-szoveg">
					<h3>{@html o.sor(adat.miertCim)}</h3>
					<p class="olvashato">{@html o.sor(adat.miertSzoveg)}</p>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.orak {
		border-top: 1px solid var(--vonal);
	}

	.fej {
		display: grid;
		gap: 24px;
		margin-bottom: clamp(40px, 5vw, 64px);
	}

	.bevezeto {
		font-size: clamp(1.05rem, 0.3vw + 1rem, 1.15rem);
	}

	.kartyak {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(20px, 3vw, 32px);
	}

	.kartya {
		--kiemeles: var(--terrakotta);
		display: grid;
		gap: 16px;
		align-content: start;
		padding: clamp(24px, 3vw, 40px);
		background: rgb(255 255 255 / 0.5);
		border: 1px solid var(--vonal);
		border-top: 6px solid var(--kiemeles);
		border-radius: var(--sarok);
	}

	/* Vizsga: terrakotta · Munka: sötét terrakotta — ugyanúgy, mint a posztokon */
	.kartya.munka {
		--kiemeles: var(--terrakotta-sotet);
	}

	.kartya-fej {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 12px;
	}

	.szal-es {
		color: var(--kiemeles);
		font-size: 1.05rem;
	}

	.kartya.vizsga .szal-es {
		color: var(--terrakotta-sotet);
	}

	h3 {
		font-size: clamp(1.5rem, 1vw + 1.2rem, 1.9rem);
	}

	.kinek strong {
		font-weight: 600;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 12px;
	}

	li {
		position: relative;
		padding-left: 24px;
	}

	li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.62em;
		width: 9px;
		height: 9px;
		background: var(--kiemeles);
	}

	.miert {
		margin-top: clamp(48px, 6vw, 80px);
		display: grid;
		grid-template-columns: auto 1fr;
		gap: clamp(24px, 5vw, 64px);
		align-items: center;
	}

	.harminc {
		display: flex;
		align-items: baseline;
		gap: 10px;
		font-family: var(--font-serif);
		color: var(--terrakotta);
		line-height: 0.9;
	}

	.szam {
		font-weight: 600;
		font-size: clamp(5rem, 10vw, 8.5rem);
	}

	.perc {
		font-style: italic;
		font-size: clamp(1.5rem, 2vw, 2rem);
		color: var(--terrakotta-sotet);
	}

	.miert-szoveg {
		display: grid;
		gap: 12px;
	}

	@media (max-width: 899px) {
		.kartyak {
			grid-template-columns: 1fr;
		}

		.miert {
			grid-template-columns: 1fr;
			gap: 8px;
		}
	}
</style>
