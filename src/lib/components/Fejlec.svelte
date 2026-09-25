<script lang="ts">
	import { oldal } from '$lib/tartalom/kontextus';
	import { link, kulsoLink } from '$lib/tartalom/szoveg';
	import Logo from './Logo.svelte';
	import FoglalasGomb from './FoglalasGomb.svelte';

	const o = oldal();
	const menu = $derived(
		o.t.fejlec.menu
			.filter((m) => m.szoveg.trim() && m.href.trim())
			.map((m) => ({ szoveg: o.sima(m.szoveg), href: link(m.href), kulso: kulsoLink(m.href) }))
	);

	// Az élő oldalon nincs Svelte a böngészőben: a menüt és a görgetést a /oldal.js kezeli.
	// Az admin előnézetében ugyanezt ezek az állapotok végzik.
	let nyitva = $state(false);
	let gorgetett = $state(false);

	function bezar() {
		nyitva = false;
	}
</script>

<svelte:window
	onscroll={() => (gorgetett = window.scrollY > 8)}
	onkeydown={(e) => e.key === 'Escape' && bezar()}
/>

<header class:gorgetett data-fejlec>
	<div class="wrap sor">
		<a class="logo-link" href="/" aria-label="OKOSspanyol – főoldal" onclick={bezar}>
			<Logo />
		</a>

		<nav aria-label="Főmenü" class="asztali">
			<ul>
				{#each menu as pont, i (i)}
					<li>
						<a
							href={pont.href}
							target={pont.kulso ? '_blank' : undefined}
							rel={pont.kulso ? 'noopener' : undefined}>{pont.szoveg}</a
						>
					</li>
				{/each}
			</ul>
			<FoglalasGomb />
		</nav>

		<button
			class="menugomb"
			aria-expanded={nyitva}
			aria-controls="mobilmenu"
			data-menugomb
			onclick={() => (nyitva = !nyitva)}
		>
			<span class="csak-felolvasonak" data-nyit="Menü megnyitása" data-zar="Menü bezárása"
				>{nyitva ? 'Menü bezárása' : 'Menü megnyitása'}</span
			>
			<span class="vonalak" class:nyitva aria-hidden="true"><span></span></span>
		</button>
	</div>

	<nav id="mobilmenu" class="mobil" class:nyitva aria-label="Mobil menü" hidden={!nyitva}>
		<ul class="wrap">
			{#each menu as pont, i (i)}
				<li>
					<a
						href={pont.href}
						onclick={bezar}
						target={pont.kulso ? '_blank' : undefined}
						rel={pont.kulso ? 'noopener' : undefined}>{pont.szoveg}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: var(--krem);
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s ease;
	}

	header.gorgetett {
		border-bottom-color: var(--vonal);
	}

	.sor {
		height: var(--fejlec-magassag);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
	}

	.logo-link {
		text-decoration: none;
	}

	.asztali {
		display: flex;
		align-items: center;
		gap: clamp(20px, 3vw, 40px);
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.asztali ul {
		display: flex;
		gap: clamp(18px, 2.4vw, 32px);
	}

	.asztali a:not(:global(.gomb)) {
		color: var(--barna);
		font-weight: 500;
		font-size: 16px;
	}

	.asztali a:not(:global(.gomb)):hover {
		color: var(--terrakotta-sotet);
	}

	.menugomb {
		display: none;
		width: 48px;
		height: 48px;
		margin-right: -8px;
		border: 0;
		background: transparent;
		color: var(--barna);
		cursor: pointer;
		border-radius: var(--sarok);
	}

	.vonalak,
	.vonalak::before,
	.vonalak::after,
	.vonalak span {
		display: block;
		width: 24px;
		height: 2px;
		background: currentColor;
		transition: transform 0.2s ease, opacity 0.2s ease;
	}

	.vonalak {
		position: relative;
		margin-inline: auto;
		background: transparent;
	}

	.vonalak::before,
	.vonalak::after {
		content: '';
		position: absolute;
		left: 0;
	}

	.vonalak::before {
		top: -7px;
	}

	.vonalak::after {
		top: 7px;
	}

	.vonalak.nyitva span {
		opacity: 0;
	}

	.vonalak.nyitva::before {
		transform: translateY(7px) rotate(45deg);
	}

	.vonalak.nyitva::after {
		transform: translateY(-7px) rotate(-45deg);
	}

	.mobil {
		display: none;
	}

	@media (max-width: 899px) {
		.asztali {
			display: none;
		}

		.menugomb {
			display: grid;
			place-items: center;
		}

		.mobil.nyitva {
			display: block;
			border-top: 1px solid var(--vonal);
			border-bottom: 1px solid var(--vonal);
			background: var(--krem);
		}

		.mobil ul {
			display: grid;
			padding: 8px var(--oldalter) 16px;
		}

		.mobil a {
			display: block;
			padding: 14px 0;
			font-family: var(--font-serif);
			font-weight: 600;
			font-size: 1.35rem;
			color: var(--barna);
			border-bottom: 1px solid var(--vonal);
		}

		.mobil li:last-child a {
			border-bottom: 0;
		}
	}
</style>
