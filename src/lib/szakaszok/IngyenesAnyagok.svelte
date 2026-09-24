<script lang="ts">
	import { asset } from '$app/paths';
	import { freeMaterials, instagramDmUrl } from '$lib/config';
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	const dm = instagramDmUrl();
</script>

<section id="anyagok" class="szakasz anyagok" aria-labelledby="anyagok-cim">
	<div class="wrap">
		<SzakaszCim id="anyagok-cim" elotag="Gratis para ti">Ingyenes anyagok</SzakaszCim>
		<p class="olvashato bevezeto">
			Két rövid, kinyomtatható PDF, hogy már ma elkezdhesd a gyakorlást.
		</p>

		<ul class="anyaglista">
			{#each freeMaterials as anyag, i (anyag.title)}
				<li class="anyag">
					<!-- Kicsinyített PDF-címlap az arculat szerint: sötét terrakotta felső harmad, krém alsó rész -->
					<div class="borito" aria-hidden="true">
						<div class="borito-fent">
							<span class="borito-szam">0{i + 1}</span>
							<span class="borito-cim">{anyag.title}</span>
						</div>
						<div class="borito-lent">
							<span class="vonal"></span>
							<span class="vonal rovid"></span>
							<span class="vonal"></span>
							<span class="borito-logo">OKOS<em>spanyol</em></span>
						</div>
					</div>

					<div class="anyag-szoveg">
						<h3>{anyag.title}</h3>
						<p class="halk">{anyag.subtitle}</p>
						{#if anyag.file}
							<a class="gomb gomb-masodlagos" href={asset(anyag.file)} download>Letöltöm (PDF)</a>
						{:else if dm}
							<p>
								Írd meg Instagram-üzenetben, hogy <strong class="es kulcsszo">{anyag.keyword}</strong>,
								és elküldöm.
							</p>
							<a class="gomb gomb-masodlagos" href={dm} target="_blank" rel="noopener">
								Kérem üzenetben
							</a>
						{:else}
							<p>
								Hamarosan letölthető. Instagramon kommentben írd meg, hogy
								<strong class="es kulcsszo">{anyag.keyword}</strong>, és elküldöm.
							</p>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.anyagok {
		background: var(--krem-melyebb);
	}

	.bevezeto {
		margin-top: 20px;
	}

	.anyaglista {
		list-style: none;
		margin: clamp(32px, 4vw, 48px) 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(20px, 3vw, 32px);
	}

	.anyag {
		display: grid;
		grid-template-columns: 150px 1fr;
		gap: clamp(20px, 3vw, 32px);
		align-items: start;
		padding: clamp(20px, 2.5vw, 28px);
		background: var(--krem);
		border-radius: var(--sarok);
	}

	.borito {
		aspect-ratio: 210 / 297;
		display: grid;
		grid-template-rows: 1fr 2fr;
		border-radius: 2px;
		overflow: hidden;
		box-shadow:
			0 1px 2px rgb(58 42 34 / 0.12),
			0 8px 24px rgb(58 42 34 / 0.1);
		background: var(--krem);
	}

	.borito-fent {
		background: var(--terrakotta-sotet);
		color: var(--krem);
		padding: 10px;
		display: grid;
		align-content: space-between;
	}

	.borito-szam {
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: var(--mustar);
	}

	.borito-cim {
		font-family: var(--font-serif);
		font-weight: 600;
		font-size: 11px;
		line-height: 1.2;
	}

	.borito-lent {
		padding: 12px 10px 8px;
		display: grid;
		gap: 6px;
		align-content: start;
		position: relative;
	}

	.vonal {
		height: 3px;
		background: var(--vonal);
		border-radius: 1px;
	}

	.vonal.rovid {
		width: 60%;
	}

	.borito-logo {
		position: absolute;
		left: 10px;
		bottom: 8px;
		font-size: 8px;
		font-weight: 700;
	}

	.borito-logo em {
		font-family: var(--font-serif);
		color: var(--terrakotta);
		font-weight: 600;
	}

	.anyag-szoveg {
		display: grid;
		gap: 10px;
		justify-items: start;
	}

	.anyag-szoveg .gomb {
		margin-top: 6px;
	}

	.kulcsszo {
		color: var(--terrakotta-sotet);
		font-weight: 600;
		letter-spacing: 0.04em;
	}

	@media (max-width: 999px) {
		.anyaglista {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 480px) {
		.anyag {
			grid-template-columns: 1fr;
		}

		.borito {
			width: 130px;
		}
	}
</style>
