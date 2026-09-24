<script lang="ts">
	import { asset } from '$app/paths';
	import { teacher } from '$lib/config';
	import Boltiv from '$lib/components/Boltiv.svelte';
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	const tenyek = [`Tanítási tapasztalat: ${teacher.yearsTeaching} év`, ...teacher.facts];
</script>

<section id="rolam" class="szakasz rolam" aria-labelledby="rolam-cim">
	<div class="wrap racs">
		<div class="kep">
			<Boltiv src={teacher.photos.about && asset(teacher.photos.about)} alt="{teacher.firstName} portréja" felirat="¡Hola!" vilagos />
		</div>

		<div class="tartalom">
			<SzakaszCim id="rolam-cim" elotag="Sobre mí">
				<span class="es">¡Hola!</span>
				{teacher.firstName} vagyok.
			</SzakaszCim>

			<div class="bekezdesek olvashato">
				<p>
					Spanyoltanár vagyok, {teacher.yearsTeaching} éve tanítok, főleg 18–25 éves egyetemistákat és
					pályakezdőket. Az évek során egy dolgot láttam újra és újra: a diákjaim ismerik a szavakat és
					a nyelvtant, de amikor beszélni kell — vizsgán vagy egy állásinterjún —, megakadnak.
				</p>
				<p>
					Ezért szakosodtam az <strong>üzleti spanyolra</strong>. Kidolgoztam egy 14 témás, a BGE B2
					üzleti szaknyelvi vizsgára épülő tananyagot, az önéletrajztól a cégek felépítésén át a
					pénzügyekig.
				</p>
			</div>

			<blockquote>
				<p>
					Kevesen tanítanak élőben, kifejezetten beszédközpontúan üzleti spanyolt — én erre
					szakosodtam.
				</p>
			</blockquote>

			<p class="olvashato">
				Az óráimon nem előadást tartok. Te beszélsz, én kérdezek, javítok, és olyan helyzeteket
				gyakorolunk, amelyekkel tényleg találkozni fogsz: a vizsgabizottság előtt vagy egy spanyol cég
				HR-esével szemben.
			</p>

			<ul class="tenyek" aria-label="Rólam röviden">
				{#each tenyek as teny (teny)}
					<li>{teny}</li>
				{/each}
			</ul>

			<p class="zaro olvashato">
				Ha a spanyolod már megvan, de a beszéd még nem megy gördülékenyen, azon közösen dolgozunk.
				<span class="es">¡Nos vemos en clase!</span>
			</p>
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

	.zaro .es {
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
