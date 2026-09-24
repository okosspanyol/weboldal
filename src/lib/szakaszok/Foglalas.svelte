<script lang="ts">
	import { booking, contact, hasEmail } from '$lib/config';
	import FoglalasGomb from '$lib/components/FoglalasGomb.svelte';
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	const lepesek = [
		{ cim: 'Válassz időpontot', szoveg: 'A naptárban csak a szabad 30 perces sávok látszanak.' },
		{
			cim: 'Add meg az adataidat',
			szoveg: 'Név, e-mail, és pár szóban: vizsgára vagy munkához készülsz?'
		},
		{
			cim: 'Kapsz egy visszaigazolást',
			szoveg: 'Benne az online óra linkjével. Az óra előtt emlékeztetőt is küld a rendszer.'
		}
	];
</script>

<section id="foglalas" class="szakasz sotet foglalas" aria-labelledby="foglalas-cim">
	<div class="wrap">
		<div class="fej">
			<SzakaszCim id="foglalas-cim" elotag="Reserva tu clase">
				Foglalj időpontot három lépésben
			</SzakaszCim>
			<p class="olvashato bevezeto">
				Nem kell e-maileket váltanunk. Nézd meg a szabad időpontjaimat, és válaszd ki, ami neked jó.
			</p>
		</div>

		<ol class="lepesek">
			{#each lepesek as lepes, i (lepes.cim)}
				<li>
					<span class="szam" aria-hidden="true">0{i + 1}</span>
					<h3>{lepes.cim}</h3>
					<p>{lepes.szoveg}</p>
				</li>
			{/each}
		</ol>

		<div class="naptar">
			{#if booking.embedUrl}
				<iframe
					src={booking.embedUrl}
					title="Foglalási naptár"
					loading="lazy"
					referrerpolicy="strict-origin-when-cross-origin"
				></iframe>
			{:else if booking.url}
				<div class="naptar-helyett">
					<p class="es nagy">¿Cuándo te va bien?</p>
					<FoglalasGomb szoveg="Megnézem a szabad időpontokat" kozvetlen />
				</div>
			{:else}
				<div class="naptar-helyett">
					<p class="es nagy">¡Muy pronto!</p>
					<p>
						Az online foglalónaptár hamarosan itt lesz.
						{#if hasEmail()}
							Addig írj nekem, és egyeztetünk: <a href="mailto:{contact.email}">{contact.email}</a>
						{:else}
							Addig írj nekem: {contact.email}
						{/if}
					</p>
				</div>
			{/if}
		</div>

		<p class="nemtalalsz">
			Nem találsz neked megfelelő időpontot? Írj nekem:
			{#if hasEmail()}
				<a href="mailto:{contact.email}">{contact.email}</a>
			{:else}
				{contact.email}
			{/if}
			— igyekszem megoldani.
		</p>
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

	.naptar a {
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
