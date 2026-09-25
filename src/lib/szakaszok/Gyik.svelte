<script lang="ts">
	import type { GyikAdat } from '$lib/tartalom/tipusok';
	import { oldal } from '$lib/tartalom/kontextus';
	import { link, kulsoLink } from '$lib/tartalom/szoveg';
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	let { adat, horgony = 'gyik' }: { adat: GyikAdat; horgony?: string } = $props();
	const o = oldal();
</script>

<section id={horgony || undefined} class="szakasz gyik" aria-labelledby="{horgony || 'gyik'}-cim">
	<div class="wrap racs">
		<div class="bal">
			<SzakaszCim id="{horgony || 'gyik'}-cim" elotag={adat.elotag} cim={adat.cim} />
		</div>

		<div class="lista">
			{#each adat.kerdesek as kerdes, i (i)}
				<details open={i === 0}>
					<summary>
						<span>{@html o.sor(kerdes.kerdes)}</span>
						<span class="jel" aria-hidden="true"></span>
					</summary>
					<div class="valasz">
						<p>{@html o.sor(kerdes.valasz)}</p>
						{#if kerdes.linkSzoveg.trim() && kerdes.linkHref.trim()}
							<a
								href={link(kerdes.linkHref)}
								target={kulsoLink(kerdes.linkHref) ? '_blank' : undefined}
								rel={kulsoLink(kerdes.linkHref) ? 'noopener' : undefined}
								>{o.sima(kerdes.linkSzoveg)} →</a
							>
						{/if}
					</div>
				</details>
			{/each}
		</div>
	</div>
</section>

<style>
	.gyik {
		border-top: 1px solid var(--vonal);
	}

	.racs {
		display: grid;
		grid-template-columns: 0.8fr 1.2fr;
		gap: clamp(32px, 5vw, 80px);
		align-items: start;
	}

	.bal {
		position: sticky;
		top: calc(var(--fejlec-magassag) + 32px);
	}

	details {
		border-bottom: 1px solid var(--vonal);
	}

	details:first-child {
		border-top: 1px solid var(--vonal);
	}

	summary {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		padding: 22px 0;
		cursor: pointer;
		list-style: none;
		font-weight: 600;
		font-size: 1.05em;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary:hover {
		color: var(--terrakotta-sotet);
	}

	/* Plusz / mínusz jel */
	.jel {
		flex: none;
		position: relative;
		width: 32px;
		height: 32px;
		border: 1.5px solid var(--terrakotta);
		border-radius: var(--sarok);
	}

	.jel::before,
	.jel::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		width: 12px;
		height: 2px;
		background: var(--terrakotta-sotet);
		transform: translate(-50%, -50%);
		transition: transform 0.2s ease;
	}

	.jel::after {
		transform: translate(-50%, -50%) rotate(90deg);
	}

	details[open] .jel::after {
		transform: translate(-50%, -50%) rotate(0deg);
	}

	.valasz {
		display: grid;
		gap: 10px;
		justify-items: start;
		padding: 0 52px 24px 0;
		max-width: 68ch;
	}

	.valasz :global(a) {
		font-weight: 600;
	}

	@media (max-width: 899px) {
		.racs {
			grid-template-columns: 1fr;
		}

		.bal {
			position: static;
		}

		.valasz {
			padding-right: 0;
		}
	}
</style>
