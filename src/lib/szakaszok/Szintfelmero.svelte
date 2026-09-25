<script lang="ts">
	import type { SzintfelmeroAdat } from '$lib/tartalom/tipusok';
	import { oldal } from '$lib/tartalom/kontextus';
	import { emailErvenyes, kulsoLink, link } from '$lib/tartalom/szoveg';

	let { adat, horgony = 'szint' }: { adat: SzintfelmeroAdat; horgony?: string } = $props();
	const o = oldal();
	const a = $derived(o.t.altalanos);
	// Saját link → üzenet link (pl. Instagram) → e-mail
	const href = $derived(
		link(adat.gombLink) ||
			link(a.uzenetLink) ||
			(emailErvenyes(a.email) ? `mailto:${a.email}?subject=${encodeURIComponent('Szintfelmérés')}` : '')
	);
</script>

<section id={horgony || undefined} class="szint" aria-labelledby="{horgony || 'szint'}-cim">
	<div class="wrap">
		<div class="doboz">
			<p class="es kerdes" aria-hidden="true">{@html o.sor(adat.kerdes)}</p>
			<div class="szoveg">
				<h2 id="{horgony || 'szint'}-cim">{@html o.sor(adat.cim)}</h2>
				<p>{@html o.sor(adat.szoveg)}</p>
			</div>
			{#if href && adat.gombSzoveg.trim()}
				<a
					class="gomb gomb-masodlagos"
					{href}
					target={kulsoLink(href) ? '_blank' : undefined}
					rel={kulsoLink(href) ? 'noopener' : undefined}
				>
					{o.sima(adat.gombSzoveg)}
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
