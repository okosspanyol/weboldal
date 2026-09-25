<!--
	Bemutatkozó YouTube-videó. Adatvédelmi okból a YouTube csak kattintásra töltődik be
	(youtube-nocookie.com); addig egy előnézeti kép és lejátszás gomb látszik.
-->
<script lang="ts">
	import type { VideoAdat } from '$lib/tartalom/tipusok';
	import { oldal } from '$lib/tartalom/kontextus';
	import { youtubeAzonosito } from '$lib/tartalom/szoveg';
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	let {
		adat,
		horgony = 'video',
		elonezet = false
	}: { adat: VideoAdat; horgony?: string; elonezet?: boolean } = $props();
	const o = oldal();
	const id = $derived(youtubeAzonosito(adat.youtube));
	const beagyazas = $derived(
		`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
	);
	let fut = $state(false);
</script>

{#if id || elonezet}
	<section id={horgony || undefined} class="szakasz video" aria-labelledby="{horgony || 'video'}-cim">
		<div class="wrap racs">
			<div class="szoveg">
				<SzakaszCim id="{horgony || 'video'}-cim" elotag={adat.elotag} cim={adat.cim} />
				{#if adat.szoveg.trim()}<p class="olvashato">{@html o.sor(adat.szoveg)}</p>{/if}
			</div>

			<div class="keret">
				{#if !id}
					<div class="ures">
						<p class="es">¡Pronto!</p>
						<p class="apro">Add meg a YouTube-videó linkjét a szerkesztőben — addig ez a rész rejtve marad.</p>
					</div>
				{:else if fut}
					<iframe
						src={beagyazas}
						title={o.sima(adat.cim)}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen
					></iframe>
				{:else}
					<a
						class="indito"
						href="https://www.youtube.com/watch?v={id}"
						data-video={beagyazas}
						data-cim={o.sima(adat.cim)}
						onclick={(e) => {
							e.preventDefault();
							fut = true;
						}}
					>
						<img
							src="https://i.ytimg.com/vi/{id}/hqdefault.jpg"
							alt=""
							loading="lazy"
							decoding="async"
						/>
						<span class="lejatszas" aria-hidden="true">
							<svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
						</span>
						<span class="felirat">{o.sima(adat.gombSzoveg)}</span>
					</a>
				{/if}
			</div>
		</div>
	</section>
{/if}

<style>
	.video {
		border-top: 1px solid var(--vonal);
	}

	.racs {
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
		gap: clamp(32px, 5vw, 72px);
		align-items: center;
	}

	.szoveg {
		display: grid;
		gap: 20px;
	}

	.keret {
		position: relative;
		aspect-ratio: 16 / 9;
		border-radius: var(--sarok);
		overflow: hidden;
		background: var(--barna);
		box-shadow: 18px 18px 0 -1px var(--krem), 18px 18px 0 0 var(--terrakotta);
	}

	iframe,
	.indito,
	.ures {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	.indito {
		display: grid;
		place-items: center;
		color: var(--krem);
		text-decoration: none !important;
	}

	.indito img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease;
	}

	.indito::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 40%, rgb(58 42 34 / 0.65));
	}

	.indito:hover img {
		transform: scale(1.03);
	}

	.lejatszas {
		position: relative;
		z-index: 1;
		display: grid;
		place-items: center;
		width: 76px;
		height: 76px;
		border-radius: 50%;
		background: var(--terrakotta);
		color: var(--krem);
		box-shadow: 0 8px 24px rgb(58 42 34 / 0.35);
		transition: transform 0.2s ease, background 0.2s ease;
	}

	.lejatszas svg {
		margin-left: 4px;
	}

	.indito:hover .lejatszas,
	.indito:focus-visible .lejatszas {
		transform: scale(1.06);
		background: var(--terrakotta-sotet);
	}

	.felirat {
		position: absolute;
		z-index: 1;
		left: 20px;
		bottom: 16px;
		font-weight: 600;
	}

	.ures {
		display: grid;
		place-content: center;
		gap: 8px;
		padding: 24px;
		text-align: center;
		color: var(--krem);
		background: linear-gradient(180deg, var(--terrakotta) 0%, var(--terrakotta-sotet) 100%);
	}

	.ures .es {
		font-size: 2rem;
		font-weight: 600;
	}

	@media (max-width: 899px) {
		.racs {
			grid-template-columns: 1fr;
		}

		.keret {
			box-shadow: 10px 10px 0 -1px var(--krem), 10px 10px 0 0 var(--terrakotta);
			margin-right: 10px;
		}
	}
</style>
