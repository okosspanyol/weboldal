<script lang="ts">
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	const szalak = [
		{
			cim: 'Szóbeli vizsgafelkészítés',
			es: 'Examen oral',
			kinek: 'a BGE üzleti spanyol B2 szóbeli vizsgára készülsz.',
			pontok: [
				'Gyakoroljuk a szóbeli részeit: szakmai beszélgetés, szövegismertetés, prezentáció, szituációs társalgás.',
				'Vizsgaszerű kérdéseket kapsz a 14 üzleti témából.',
				'Megtanulod, mit mondj, ha elakadsz, és hogyan tartsd a szót.',
				'Minden óra végén rövid visszajelzést kapsz: mi ment jól, min dolgozz.'
			],
			szin: 'vizsga'
		},
		{
			cim: 'Munka Spanyolországban',
			es: 'Trabajar en España',
			kinek: 'Spanyolországban szeretnél dolgozni vagy spanyol cégnél jelentkeznél.',
			pontok: [
				'Bemutatkozás, szakmai útad és terveid elmondása magabiztosan.',
				'Állásinterjú-gyakorlás a leggyakoribb kérdésekkel.',
				'Munkahelyi helyzetek: megbeszélés, telefonhívás, ügyfélkapcsolat.',
				'Mit jelent a spanyol udvariasság és üzleti kultúra a gyakorlatban.'
			],
			szin: 'munka'
		}
	];
</script>

<section id="orak" class="szakasz orak" aria-labelledby="orak-cim">
	<div class="wrap">
		<div class="fej">
			<SzakaszCim id="orak-cim" elotag="Las clases">Egy üzleti nyelvtudás, két cél</SzakaszCim>
			<p class="olvashato bevezeto">
				Az üzleti spanyol két helyen nyit ajtót: a nyelvvizsgán és a spanyolországi munkahelyen.
				Ugyanazokkal a helyzetekkel készülsz mindkettőre — aki a szóbelin jól mutatja be a szakmai
				útját, az egy interjún is meg fogja állni a helyét.
			</p>
		</div>

		<div class="kartyak">
			{#each szalak as szal, i (szal.cim)}
				<article class="kartya {szal.szin}" aria-labelledby="szal-{i}">
					<div class="kartya-fej">
						<span class="sorszam">0{i + 1} / 0{szalak.length}</span>
						<span class="es szal-es">{szal.es}</span>
					</div>
					<h3 id="szal-{i}">{szal.cim}</h3>
					<p class="kinek"><strong>Neked szól, ha</strong> {szal.kinek}</p>
					<ul>
						{#each szal.pontok as pont (pont)}
							<li>{pont}</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>

		<div class="miert">
			<p class="harminc" aria-hidden="true">
				<span class="szam">30</span>
				<span class="perc">perc</span>
			</p>
			<div class="miert-szoveg">
				<h3>Miért 30 perc?</h3>
				<p class="olvashato">
					Mert a rendszeresség többet ér, mint a hossz. Heti több rövid alkalom jobban rögzül, mint
					egyetlen hosszú óra, és könnyebb beilleszteni egy teli napba: reggel munka előtt,
					ebédszünetben vagy este. Te döntöd el, hányszor és mikor foglalsz.
				</p>
			</div>
		</div>
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
