<script lang="ts">
	import type { FoglalasAdat } from '$lib/tartalom/tipusok';
	import { oldal } from '$lib/tartalom/kontextus';
	import FoglalasGomb from '$lib/components/FoglalasGomb.svelte';
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	let { adat, horgony = 'foglalas' }: { adat: FoglalasAdat; horgony?: string } = $props();
	const o = oldal();
	const f = $derived(o.t.foglalas);
	const beagyazott = $derived(/^https:\/\//i.test(f.beagyazottUrl.trim()) ? f.beagyazottUrl.trim() : '');
	const ketjegyu = (n: number) => String(n).padStart(2, '0');
</script>

<section
	id={horgony || undefined}
	class="szakasz sotet foglalas"
	aria-labelledby="{horgony || 'foglalas'}-cim"
>
	<div class="wrap">
		<div class="fej">
			<SzakaszCim id="{horgony || 'foglalas'}-cim" elotag={adat.elotag} cim={adat.cim} />
			{#if adat.bevezeto.trim()}
				<p class="olvashato bevezeto">{@html o.sor(adat.bevezeto)}</p>
			{/if}
		</div>

		{#if adat.lepesek.length}
			<ol class="lepesek">
				{#each adat.lepesek as lepes, i (i)}
					<li>
						<span class="szam" aria-hidden="true">{ketjegyu(i + 1)}</span>
						<h3>{@html o.sor(lepes.cim)}</h3>
						<p>{@html o.sor(lepes.szoveg)}</p>
					</li>
				{/each}
			</ol>
		{/if}

		<div class="naptar">
			{#if beagyazott}
				<iframe
					src={beagyazott}
					title="Foglalási naptár"
					loading="lazy"
					referrerpolicy="strict-origin-when-cross-origin"
				></iframe>
			{:else if f.url.trim()}
				<div class="naptar-helyett">
					<p class="es nagy">{@html o.sor(adat.vanLinkFelirat)}</p>
					<FoglalasGomb szoveg={adat.vanLinkGomb} kozvetlen />
				</div>
			{:else}
				<div class="naptar-helyett">
					<p class="es nagy">{@html o.sor(adat.nincsLinkFelirat)}</p>
					<p>{@html o.sor(adat.nincsLinkSzoveg)}</p>
				</div>
			{/if}
		</div>

		{#if adat.nemTalalsz.trim()}
			<p class="nemtalalsz">{@html o.sor(adat.nemTalalsz)}</p>
		{/if}
	</div>
</section>

<style>
	.fej {
		display: grid;
		gap: 24px;
	}

	.bevezeto {
		font-size: clamp(1.05rem, 0.3vw + 1rem, 1.2rem);
	}

	.lepesek {
		list-style: none;
		margin: clamp(40px, 5vw, 64px) 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: clamp(24px, 3vw, 40px);
	}

	.lepesek li {
		display: grid;
		gap: 10px;
		align-content: start;
		padding-top: 20px;
		border-top: 2px solid var(--mustar);
	}

	.szam {
		font-weight: 700;
		font-size: 15px;
		letter-spacing: 0.12em;
		color: var(--mustar);
	}

	.lepesek h3 {
		font-size: 1.45rem;
	}

	.naptar {
		margin-top: clamp(40px, 5vw, 64px);
		background: var(--krem);
		color: var(--barna);
		border-radius: var(--sarok);
		overflow: hidden;
	}

	.naptar p {
		font-weight: 400;
	}

	.naptar :global(a:not(.gomb)) {
		color: var(--terrakotta-sotet);
	}

	iframe {
		display: block;
		width: 100%;
		height: 720px;
		border: 0;
	}

	.naptar-helyett {
		display: grid;
		justify-items: center;
		gap: 20px;
		padding: clamp(40px, 6vw, 72px) 24px;
		text-align: center;
	}

	.nagy {
		font-weight: 600;
		font-size: clamp(1.8rem, 2vw + 1.2rem, 2.5rem);
		color: var(--terrakotta-sotet);
		line-height: 1.2;
	}

	.nemtalalsz {
		margin-top: 28px;
	}

	@media (max-width: 899px) {
		.lepesek {
			grid-template-columns: 1fr;
		}

		iframe {
			height: 820px;
		}
	}
</style>
