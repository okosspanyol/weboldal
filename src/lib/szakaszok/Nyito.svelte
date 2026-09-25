<script lang="ts">
	import type { NyitoAdat } from '$lib/tartalom/tipusok';
	import { oldal } from '$lib/tartalom/kontextus';
	import { link, kulsoLink } from '$lib/tartalom/szoveg';
	import Boltiv from '$lib/components/Boltiv.svelte';
	import FoglalasGomb from '$lib/components/FoglalasGomb.svelte';

	let { adat, horgony = '' }: { adat: NyitoAdat; horgony?: string } = $props();
	const o = oldal();
	const ketjegyu = (n: number) => String(n).padStart(2, '0');
</script>

<section id={horgony || undefined} class="nyito" aria-labelledby="focim">
	<div class="wrap racs">
		<div class="szoveg">
			<h1 id="focim">{@html o.sor(adat.cim)}</h1>
			{#if adat.alcim.trim()}<p class="alcim olvashato">{@html o.sor(adat.alcim)}</p>{/if}
			<div class="gombok">
				<FoglalasGomb />
				{#if adat.masodikGomb.szoveg.trim() && adat.masodikGomb.href.trim()}
					<a
						class="mukodes"
						href={link(adat.masodikGomb.href)}
						target={kulsoLink(adat.masodikGomb.href) ? '_blank' : undefined}
						rel={kulsoLink(adat.masodikGomb.href) ? 'noopener' : undefined}
						>{o.sima(adat.masodikGomb.szoveg)}</a
					>
				{/if}
			</div>
			{#if adat.szuro.trim()}<p class="szuro apro halk">{@html o.sor(adat.szuro)}</p>{/if}
		</div>

		<div class="kep">
			<Boltiv
				src={adat.foto.trim()}
				alt={o.sima(adat.fotoAlt)}
				felirat={o.sima(adat.boltivFelirat)}
				kiemelt
			/>
		</div>
	</div>

	{#if adat.jellemzok.length}
		<div class="wrap">
			<ul class="jellemzok">
				{#each adat.jellemzok as j, i (i)}
					<li>
						<span class="sorszam">{ketjegyu(i + 1)} / {ketjegyu(adat.jellemzok.length)}</span>
						<h2 class="jcim">{@html o.sor(j.cim)}</h2>
						<p>{@html o.sor(j.szoveg)}</p>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</section>

<style>
	.nyito {
		padding-block: clamp(32px, 6vw, 80px) clamp(56px, 8vw, 96px);
	}

	.racs {
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		align-items: center;
		gap: clamp(40px, 6vw, 88px);
	}

	.szoveg {
		display: grid;
		gap: 28px;
		justify-items: start;
	}

	h1 :global(.es),
	h1 :global(strong) {
		color: var(--terrakotta);
		font-weight: inherit;
	}

	.alcim {
		font-size: clamp(1.1rem, 0.4vw + 1rem, 1.25rem);
	}

	.gombok {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 16px 28px;
	}

	.mukodes {
		font-weight: 500;
		text-decoration: underline;
		text-decoration-color: rgb(156 65 40 / 0.35);
	}

	.mukodes:hover {
		text-decoration-color: currentColor;
	}

	.szuro {
		max-width: 46ch;
	}

	.kep {
		padding-right: 18px;
	}

	.jellemzok {
		list-style: none;
		margin: clamp(56px, 8vw, 96px) 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		border-top: 1px solid var(--vonal);
	}

	.jellemzok li {
		display: grid;
		gap: 6px;
		align-content: start;
		padding: 28px 28px 0 0;
	}

	.jellemzok li + li {
		padding-left: 28px;
		border-left: 1px solid var(--vonal);
	}

	.jcim {
		font-size: 1.4rem;
		margin-top: 4px;
	}

	@media (max-width: 899px) {
		.racs {
			grid-template-columns: 1fr;
		}

		.kep {
			max-width: 300px;
			width: 100%;
			justify-self: center;
		}

		.jellemzok {
			grid-template-columns: 1fr;
			border-top: 0;
		}

		.jellemzok li,
		.jellemzok li + li {
			padding: 20px 0;
			border-left: 0;
			border-top: 1px solid var(--vonal);
		}
	}
</style>
