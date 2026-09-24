<script lang="ts">
	import { booking } from '$lib/config';
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	const kerdesek = [
		{
			k: 'Milyen szinten kell lennem?',
			v: 'Legalább A2-es szinten, meglevő alap szókincscsel és nyelvtannal. Ha bizonytalan vagy, foglalj egy alkalmat, és az első percekben kiderül.'
		},
		{
			k: 'Tanítasz nyelvtant is?',
			v: 'Nem. Az órák tisztán beszédgyakorlások. Ha egy hibád visszatér, megmutatom a helyes formát, de nyelvtani magyarázat nincs.'
		},
		{
			k: 'Segítesz az írásbeli vizsgarészre?',
			v: 'Az órák most a szóbeli részre készítenek fel. Az írásbeli vizsgarészhez készülő tananyagom fejlesztés alatt áll — ha feliratkozol a hírlevelemre, elsőként értesülsz róla.',
			link: { href: '#hirlevel', szoveg: 'Feliratkozom' }
		},
		{
			k: 'Milyen gyakran érdemes foglalni?',
			v: 'Heti 2–3 alkalom a leghatékonyabb, de nincs kötelező ritmus. Foglalhatsz egy hetet sűrűbben a vizsga előtt, és kihagyhatsz egy zsúfolt hetet.'
		},
		{
			k: 'Mindig ugyanabban az időpontban kell jönnöm?',
			v: 'Nem. Minden alkalmat külön foglalsz, akkor, amikor neked jó.'
		},
		{
			k: 'Csak vizsgára vagy csak munkára készülhetek?',
			v: 'Bármelyikre, vagy mindkettőre. Foglaláskor írd meg a célodat, és ahhoz igazítom az órát.'
		},
		{
			k: 'Mi van, ha nem tudok elmenni?',
			v: `Az óra előtt ${booking.freeCancellationHours} órával díjmentesen lemondhatod vagy átteheted a visszaigazoló e-mailben lévő linkkel.`
		}
	];
</script>

<section id="gyik" class="szakasz gyik" aria-labelledby="gyik-cim">
	<div class="wrap racs">
		<div class="bal">
			<SzakaszCim id="gyik-cim" elotag="Preguntas frecuentes">Gyakori kérdések</SzakaszCim>
		</div>

		<div class="lista">
			{#each kerdesek as kerdes, i (kerdes.k)}
				<details open={i === 0}>
					<summary>
						<span>{kerdes.k}</span>
						<span class="jel" aria-hidden="true"></span>
					</summary>
					<div class="valasz">
						<p>{kerdes.v}</p>
						{#if kerdes.link}
							<a href={kerdes.link.href}>{kerdes.link.szoveg} →</a>
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

	.valasz a {
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
