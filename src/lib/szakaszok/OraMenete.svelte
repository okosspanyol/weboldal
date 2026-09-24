<script lang="ts">
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	const lepesek = [
		{
			cim: 'Bemelegítés',
			ido: '3–5 perc',
			perc: 5,
			szoveg: 'Kötetlen beszélgetés spanyolul.',
			es: '¿Qué tal tu semana?'
		},
		{
			cim: 'Gyakorlás',
			ido: '20 perc',
			perc: 20,
			szoveg: 'Vizsgafeladat vagy munkahelyi szituáció, a te célod szerint.',
			es: 'Hablemos de tu experiencia profesional.'
		},
		{
			cim: 'Visszajelzés',
			ido: '5 perc',
			perc: 5,
			szoveg: 'A legfontosabb javítások és hasznos kifejezések, amiket használhatsz.',
			es: 'Muy bien. Prueba también así…'
		}
	];
</script>

<section id="hogyan" class="szakasz menete" aria-labelledby="menete-cim">
	<div class="wrap">
		<SzakaszCim id="menete-cim" elotag="Así es una clase">Hogyan zajlik egy óra?</SzakaszCim>

		<!-- Az óra 30 perce arányosan -->
		<div class="idosav" aria-hidden="true">
			{#each lepesek as lepes, i (lepes.cim)}
				<span class="szelet s{i}" style:flex-grow={lepes.perc}>{lepes.ido}</span>
			{/each}
		</div>

		<ol class="lepesek">
			{#each lepesek as lepes, i (lepes.cim)}
				<li>
					<span class="mezo" aria-hidden="true">0{i + 1}</span>
					<div class="lepes-szoveg">
						<h3>{lepes.cim} <span class="ido">({lepes.ido})</span></h3>
						<p>{lepes.szoveg}</p>
						<p class="minta">
							<span class="cimke">Minta</span>
							<span class="es">{lepes.es}</span>
						</p>
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
