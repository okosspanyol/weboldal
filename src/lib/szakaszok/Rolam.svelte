<script lang="ts">
	import type { RolamAdat } from '$lib/tartalom/tipusok';
	import { oldal } from '$lib/tartalom/kontextus';
	import Boltiv from '$lib/components/Boltiv.svelte';
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	let { adat, horgony = 'rolam' }: { adat: RolamAdat; horgony?: string } = $props();
	const o = oldal();
	const tenyek = $derived(adat.tenyek.filter((t) => t.trim()));
</script>

<section id={horgony || undefined} class="szakasz rolam" aria-labelledby="{horgony || 'rolam'}-cim">
	<div class="wrap racs">
		<div class="kep">
			<Boltiv
				src={adat.foto.trim()}
				alt={o.sima(adat.fotoAlt)}
				felirat={o.sima(adat.boltivFelirat)}
				vilagos
			/>
		</div>

		<div class="tartalom">
			<SzakaszCim id="{horgony || 'rolam'}-cim" elotag={adat.elotag} cim={adat.cim} />

			{#if adat.bevezeto.trim()}
				<div class="bekezdesek olvashato">{@html o.blokk(adat.bevezeto)}</div>
			{/if}

			{#if adat.idezet.trim()}
				<blockquote>
					<p>{@html o.sor(adat.idezet)}</p>
				</blockquote>
			{/if}

			{#if adat.folytatas.trim()}
				<div class="bekezdesek olvashato">{@html o.blokk(adat.folytatas)}</div>
			{/if}

			{#if tenyek.length}
				<ul class="tenyek" aria-label={o.sima(adat.tenyekCim)}>
					{#each tenyek as teny, i (i)}
						<li>{@html o.sor(teny)}</li>
					{/each}
				</ul>
			{/if}

			{#if adat.zaro.trim()}
				<p class="zaro olvashato">{@html o.sor(adat.zaro)}</p>
			{/if}
		</div>
	</div>
</section>

<style>
	.rolam {
		border-top: 1px solid var(--vonal);
	}

	.racs {
		display: grid;
		grid-template-columns: 0.8fr 1.2fr;
		gap: clamp(40px, 7vw, 104px);
		align-items: start;
	}

	.kep {
		position: sticky;
		top: calc(var(--fejlec-magassag) + 32px);
		padding-right: 18px;
	}

	.tartalom {
		display: grid;
		gap: 24px;
	}

	.bekezdesek {
		display: grid;
		gap: 16px;
	}

	blockquote {
		margin: 8px 0;
		padding: 4px 0 4px 26px;
		border-left: 3px solid var(--terrakotta);
		max-width: 40ch;
	}

	blockquote p {
		font-family: var(--font-serif);
		font-weight: 600;
		font-size: clamp(1.3rem, 0.8vw + 1.05rem, 1.6rem);
		line-height: 1.3;
		color: var(--terrakotta-sotet);
	}

	.tenyek {
		list-style: none;
		margin: 8px 0 0;
		padding: 20px 0 0;
		border-top: 1px solid var(--vonal);
		display: grid;
		gap: 10px;
	}

	.tenyek li {
		position: relative;
		padding-left: 24px;
		font-weight: 500;
	}

	/* Kis terrakotta négyzet a pontok előtt */
	.tenyek li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.6em;
		width: 9px;
		height: 9px;
		background: var(--terrakotta);
	}

	.zaro :global(.es) {
		color: var(--terrakotta-sotet);
		font-weight: 600;
		white-space: nowrap;
	}

	@media (max-width: 899px) {
		.racs {
			grid-template-columns: 1fr;
		}

		.kep {
			position: static;
			max-width: 320px;
			width: 100%;
			justify-self: center;
		}
	}
</style>
