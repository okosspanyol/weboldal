<script lang="ts">
	import type { ArakAdat } from '$lib/tartalom/tipusok';
	import { oldal } from '$lib/tartalom/kontextus';
	import FoglalasGomb from '$lib/components/FoglalasGomb.svelte';
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	let { adat, horgony = 'arak' }: { adat: ArakAdat; horgony?: string } = $props();
	const o = oldal();
	const ketjegyu = (n: number) => String(n).padStart(2, '0');
</script>

<section id={horgony || undefined} class="szakasz arak" aria-labelledby="{horgony || 'arak'}-cim">
	<div class="wrap">
		<SzakaszCim id="{horgony || 'arak'}-cim" elotag={adat.elotag} cim={adat.cim} />

		{#if adat.ajanlat.trim()}
			<p class="ajanlat">
				{#if adat.ajanlatCimke}<span class="cimke">{o.sima(adat.ajanlatCimke)}</span>{/if}
				<span>{@html o.sor(adat.ajanlat)}</span>
			</p>
		{/if}

		<ul class="csomagok">
			{#each adat.csomagok as csomag, i (i)}
				<li class="csomag" class:kiemelt={!!csomag.cimke.trim()}>
					<div class="csomag-fej">
						<span class="sorszam">{ketjegyu(i + 1)} / {ketjegyu(adat.csomagok.length)}</span>
						{#if csomag.cimke.trim()}<span class="cimke">{o.sima(csomag.cimke)}</span>{/if}
					</div>
					<h3>{@html o.sor(csomag.nev)}</h3>
					<p class="halk">{@html o.sor(csomag.reszlet)}</p>
					<p class="ar">{@html o.sor(csomag.ar)}</p>
				</li>
			{/each}
		</ul>

		<div class="lab">
			<FoglalasGomb />
			{#if adat.megjegyzes.trim()}<p class="apro halk">{@html o.sor(adat.megjegyzes)}</p>{/if}
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
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
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

	.csomag.kiemelt {
		border-color: var(--terrakotta);
		box-shadow: inset 0 4px 0 var(--terrakotta);
	}

	.csomag-fej {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
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
