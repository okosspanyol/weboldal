<script lang="ts">
	import type { OraMeneteAdat } from '$lib/tartalom/tipusok';
	import { oldal } from '$lib/tartalom/kontextus';
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	let { adat, horgony = 'hogyan' }: { adat: OraMeneteAdat; horgony?: string } = $props();
	const o = oldal();
	const ketjegyu = (n: number) => String(n).padStart(2, '0');
</script>

<section id={horgony || undefined} class="szakasz menete" aria-labelledby="{horgony || 'menete'}-cim">
	<div class="wrap">
		<SzakaszCim id="{horgony || 'menete'}-cim" elotag={adat.elotag} cim={adat.cim} />

		<!-- Az óra hossza arányosan -->
		<div class="idosav" aria-hidden="true">
			{#each adat.lepesek as lepes, i (i)}
				<span class="szelet s{i % 3}" style:flex-grow={Math.max(Number(lepes.perc) || 1, 1)}
					>{o.sima(lepes.ido)}</span
				>
			{/each}
		</div>

		<ol class="lepesek">
			{#each adat.lepesek as lepes, i (i)}
				<li>
					<span class="mezo" aria-hidden="true">{ketjegyu(i + 1)}</span>
					<div class="lepes-szoveg">
						<h3>
							{@html o.sor(lepes.cim)}
							{#if lepes.ido.trim()}<span class="ido">({o.sima(lepes.ido)})</span>{/if}
						</h3>
						<p>{@html o.sor(lepes.szoveg)}</p>
						{#if lepes.es.trim()}
							<p class="minta">
								<span class="cimke">{o.sima(adat.mintaCimke)}</span>
								<span class="es">{@html o.sor(lepes.es)}</span>
							</p>
						{/if}
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.menete {
		background: var(--krem-melyebb);
	}

	.idosav {
		display: flex;
		gap: 4px;
		margin: clamp(32px, 4vw, 48px) 0 24px;
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.04em;
	}

	.szelet {
		flex-basis: 0;
		min-width: 64px;
		padding: 8px 12px;
		border-radius: 2px;
		color: var(--krem);
		white-space: nowrap;
	}

	.s0 {
		background: var(--oliva);
	}

	.s1 {
		background: var(--terrakotta-sotet);
	}

	.s2 {
		background: var(--barna);
	}

	.lepesek {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: clamp(16px, 2.5vw, 28px);
	}

	.lepesek li {
		display: grid;
		gap: 20px;
		align-content: start;
		padding: clamp(24px, 2.5vw, 32px);
		background: var(--krem);
		border-radius: var(--sarok);
	}

	/* Terrakotta sorszám-mező */
	.mezo {
		display: grid;
		place-items: center;
		width: 56px;
		height: 56px;
		background: var(--terrakotta);
		color: var(--krem);
		font-weight: 700;
		font-size: 1.25rem;
		letter-spacing: 0.04em;
	}

	.lepes-szoveg {
		display: grid;
		gap: 10px;
	}

	.ido {
		font-family: var(--font-sans);
		font-size: 1rem;
		font-weight: 500;
		color: var(--barna-halk);
		white-space: nowrap;
	}

	.minta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px 10px;
		margin-top: 6px;
		padding-top: 14px;
		border-top: 1px solid var(--vonal);
	}

	.minta .es {
		color: var(--terrakotta-sotet);
		font-size: 1.05rem;
	}

	@media (max-width: 899px) {
		.lepesek {
			grid-template-columns: 1fr;
		}
	}
</style>
