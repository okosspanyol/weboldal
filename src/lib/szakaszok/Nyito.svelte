<script lang="ts">
	import { asset } from '$app/paths';
	import { teacher } from '$lib/config';
	import Boltiv from '$lib/components/Boltiv.svelte';
	import FoglalasGomb from '$lib/components/FoglalasGomb.svelte';

	const jellemzok = [
		{ cim: '30 perc', szoveg: 'Befér munka előtt, ebédszünetben vagy este.' },
		{
			cim: 'Egyeztetés nélkül',
			szoveg: 'A szabad időpontok közül te választasz, nincs kötött órarend.'
		},
		{ cim: 'Csak beszéd', szoveg: 'Nincs nyelvtanmagyarázat, az egész óra gyakorlás.' }
	];
</script>

<section class="nyito" aria-labelledby="focim">
	<div class="wrap racs">
		<div class="szoveg">
			<h1 id="focim">
				Beszélj üzleti <span class="es kiemelt">spanyolul</span> — 30 percben, akkor, amikor neked
				jó.
			</h1>
			<p class="alcim olvashato">
				Élő, beszédközpontú online órák a BGE üzleti spanyol szóbeli vizsgára és a spanyolországi
				munkavállalásra. Nem nálam kell igazodnod — én igazodom a napodhoz.
			</p>
			<div class="gombok">
				<FoglalasGomb />
				<a class="mukodes" href="#hogyan">Megnézem, hogyan működik</a>
			</div>
			<p class="szuro apro halk">
				Ha már megvannak az alapjaid (legalább A2), és végre beszélni szeretnél, jó helyen jársz.
			</p>
		</div>

		<div class="kep">
			<Boltiv
				src={teacher.photos.hero && asset(teacher.photos.hero)}
				alt="{teacher.firstName}, az OKOSspanyol tanára"
				felirat="¿Hablamos?"
				kiemelt
			/>
		</div>
	</div>

	<div class="wrap">
		<ul class="jellemzok">
			{#each jellemzok as j, i (j.cim)}
				<li>
					<span class="sorszam">0{i + 1} / 0{jellemzok.length}</span>
					<h2 class="jcim">{j.cim}</h2>
					<p>{j.szoveg}</p>
				</li>
			{/each}
		</ul>
	</div>
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

	.kiemelt {
		color: var(--terrakotta);
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
