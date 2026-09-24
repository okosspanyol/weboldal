<script lang="ts">
	import { contact, hasEmail, instagramDmUrl } from '$lib/config';

	const dm = instagramDmUrl();
	const href = dm || (hasEmail() ? `mailto:${contact.email}?subject=Szintfelmérés` : '');
</script>

<section class="szint" aria-labelledby="szint-cim">
	<div class="wrap">
		<div class="doboz">
			<p class="es kerdes" aria-hidden="true">¿Qué nivel tengo?</p>
			<div class="szoveg">
				<h2 id="szint-cim">Nem tudod, melyik szinten vagy?</h2>
				<p>
					{#if dm}
						Küldj egy rövid hangüzenetet spanyolul Instagramon, és megmondom.
					{:else}
						Küldj egy rövid hangüzenetet vagy pár mondatot spanyolul, és megmondom.
					{/if}
					Ha bizonytalan vagy, foglalj egy alkalmat — az első percekben kiderül.
				</p>
			</div>
			{#if href}
				<a class="gomb gomb-masodlagos" {href} target={dm ? '_blank' : undefined} rel="noopener">
					{dm ? 'Hangüzenetet küldök' : 'Írok neked'}
				</a>
			{/if}
		</div>
	</div>
</section>

<style>
	.szint {
		padding-block: 0 var(--szakasz-ter);
	}

	.doboz {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 24px clamp(24px, 4vw, 56px);
		padding: clamp(28px, 4vw, 48px);
		background: var(--krem-melyebb);
		border-left: 8px solid var(--oliva);
		border-radius: var(--sarok);
	}

	.kerdes {
		font-weight: 600;
		font-size: clamp(1.6rem, 2vw + 1rem, 2.3rem);
		color: var(--oliva);
		line-height: 1.15;
		max-width: 7em;
	}

	.szoveg {
		display: grid;
		gap: 8px;
	}

	h2 {
		font-size: clamp(1.35rem, 0.8vw + 1.1rem, 1.7rem);
	}

	@media (max-width: 899px) {
		.doboz {
			grid-template-columns: 1fr;
			justify-items: start;
		}

		.kerdes {
			max-width: none;
		}
	}
</style>
