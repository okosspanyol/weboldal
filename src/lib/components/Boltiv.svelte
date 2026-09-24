<!--
	Boltíves képkeret — az arculat védjegyszerű formája.
	Csak a nyitó szakasz és a bemutatkozás fotóján használjuk, minden más szögletes.
-->
<script lang="ts">
	let {
		src = '',
		alt = '',
		felirat = '¡Hola!',
		kiemelt = false,
		vilagos = false
	}: {
		/** Saját fotó útvonala. Ha üres, díszített boltív jelenik meg. */
		src?: string;
		alt?: string;
		/** Spanyol felirat a fotó nélküli boltívben. */
		felirat?: string;
		/** A nyitó szakasz képe: azonnal töltődjön be. */
		kiemelt?: boolean;
		/** Világos, krém alapú díszítés (hogy két boltív ne legyen egyforma). */
		vilagos?: boolean;
	} = $props();
</script>

<figure class="boltiv" class:vilagos>
	<div class="keret" aria-hidden="true"></div>
	<div class="kep">
		{#if src}
			<img
				{src}
				{alt}
				loading={kiemelt ? 'eager' : 'lazy'}
				fetchpriority={kiemelt ? 'high' : undefined}
				decoding="async"
			/>
		{:else}
			<div class="disz" role="presentation">
				<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
					{#each [0, 1, 2, 3, 4, 5] as i (i)}
						<path
							d="M {40 + i * 28} 500 V {230 + i * 22} A {160 - i * 28} {160 - i * 28} 0 0 1 {360 -
								i * 28} {230 + i * 22} V 500"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
						/>
					{/each}
				</svg>
				<span class="es felirat">{felirat}</span>
			</div>
		{/if}
	</div>
</figure>

<style>
	.boltiv {
		position: relative;
		margin: 0;
		width: 100%;
		max-width: 460px;
		aspect-ratio: 4 / 5;
		margin-inline: auto;
	}

	.kep,
	.keret {
		position: absolute;
		inset: 0;
		border-radius: 999px 999px 0 0;
	}

	/* Vékony, eltolt körvonal a boltív mögött */
	.keret {
		border: 1.5px solid var(--terrakotta);
		transform: translate(18px, 18px);
	}

	.kep {
		overflow: hidden;
		background: var(--terrakotta);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.disz {
		position: relative;
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		background:
			radial-gradient(120% 80% at 50% 0%, #d4694f 0%, transparent 60%),
			linear-gradient(180deg, var(--terrakotta) 0%, var(--terrakotta-sotet) 100%);
		color: rgb(251 241 228 / 0.28);
	}

	svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.vilagos .kep {
		background: var(--krem-melyebb);
	}

	.vilagos .disz {
		background: linear-gradient(180deg, #f8e9d7 0%, var(--krem-melyebb) 100%);
		color: rgb(200 85 61 / 0.35);
	}

	.vilagos .felirat {
		color: var(--terrakotta-sotet);
	}

	.felirat {
		position: relative;
		font-weight: 600;
		font-size: clamp(2.5rem, 6vw, 4rem);
		color: var(--krem);
		margin-top: 18%;
	}
</style>
