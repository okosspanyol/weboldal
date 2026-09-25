<script lang="ts">
	import { oldal } from '$lib/tartalom/kontextus';
	import { emailErvenyes, kepElerheto, link, kulsoLink } from '$lib/tartalom/szoveg';
	import Logo from './Logo.svelte';

	const o = oldal();
	const t = $derived(o.t);
	const kozossegi = $derived(t.altalanos.kozossegi.filter((l) => l.szoveg.trim() && l.href.trim()));
	const linkek = $derived(t.lablec.linkek.filter((l) => l.szoveg.trim() && l.href.trim()));
	const hosszuLogo = $derived(kepElerheto(t.fejlec.logoKep));
	const barion = $derived(t.lablec.barion);
	const barionKep = $derived(kepElerheto(barion.kep) ? barion.kep : '');
</script>

<footer class="sotet">
	<div class="wrap racs">
		<div class="marka">
			<a class="logo-alap" href="/" aria-label="OKOSspanyol – főoldal">
				{#if !hosszuLogo}<img src="/logo-kor.png" alt="" width="44" height="44" />{/if}
				<Logo />
			</a>
			<p>{@html o.sor(t.lablec.leiras)}</p>
		</div>

		<div class="oszlop">
			<h2 class="oszlopcim">{o.sima(t.lablec.kapcsolatCim)}</h2>
			<ul>
				<li>
					{#if emailErvenyes(t.altalanos.email)}
						<a href="mailto:{t.altalanos.email}">{t.altalanos.email}</a>
					{:else}
						{t.altalanos.email}
					{/if}
				</li>
				{#each kozossegi as l, i (i)}
					<li><a href={link(l.href)} rel="noopener" target="_blank">{o.sima(l.szoveg)}</a></li>
				{/each}
			</ul>
		</div>

		<div class="oszlop">
			<h2 class="oszlopcim">{o.sima(t.lablec.tudnivalokCim)}</h2>
			<ul>
				{#each linkek as l, i (i)}
					<li>
						<a
							href={link(l.href)}
							target={kulsoLink(l.href) ? '_blank' : undefined}
							rel={kulsoLink(l.href) ? 'noopener' : undefined}>{o.sima(l.szoveg)}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	{#if barion.lathato}
		<div class="wrap">
			<!-- A Barion előírása: a hivatalos Barion logó a lábléceben, a barion.com-ra mutatva. -->
			<a
				class="barion"
				href={link(barion.link) || 'https://www.barion.com/hu/'}
				target="_blank"
				rel="noopener"
				aria-label="{o.sima(barion.szoveg)} (új lapon nyílik meg)"
			>
				{#if barionKep}
					<img src={barionKep} alt="Barion – {o.sima(barion.kartyak)}" loading="lazy" />
				{:else}
					<span class="barion-szoveg">
						<span class="barion-nev">Barion</span>
						<span class="barion-kartyak">{o.sima(barion.kartyak)}</span>
					</span>
				{/if}
				<span class="barion-leiras apro">{o.sima(barion.szoveg)}</span>
			</a>
		</div>
	{/if}

	<div class="wrap">
		<div class="also">
			<p class="apro">{@html o.sor(t.lablec.copyright)}</p>
			<p class="apro es">{@html o.sor(t.lablec.zaroEs)}</p>
		</div>
	</div>
</footer>

<style>
	footer {
		padding-block: 64px 32px;
	}

	.racs {
		display: grid;
		grid-template-columns: 1.6fr 1fr 1fr;
		gap: 40px;
	}

	.marka {
		display: grid;
		gap: 20px;
		align-content: start;
		max-width: 38ch;
	}

	/* A vízszintes logó sötét háttéren krém alapra kerül */
	.logo-alap {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		justify-self: start;
		padding: 10px 18px 10px 10px;
		background: var(--krem);
		border-radius: var(--sarok);
		text-decoration: none !important;
	}

	.oszlopcim {
		font-family: var(--font-sans);
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--mustar);
		margin-bottom: 14px;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 8px;
	}

	.oszlop a {
		text-decoration: none;
	}

	.oszlop a:hover {
		text-decoration: underline;
	}

	.barion {
		margin-top: 40px;
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px 20px;
		text-decoration: none !important;
		color: inherit;
	}

	/* A Barion logósávja fehér alapon a legolvashatóbb */
	.barion img,
	.barion-szoveg {
		display: block;
		height: 44px;
		width: auto;
		max-width: min(100%, 420px);
		padding: 6px 12px;
		background: #fff;
		border-radius: var(--sarok);
		object-fit: contain;
	}

	.barion-szoveg {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 2px 12px;
		height: auto;
		min-height: 44px;
		color: #1a1a1a;
		font-size: 14px;
		line-height: 1.3;
	}

	.barion-nev {
		font-weight: 700;
		font-size: 18px;
		letter-spacing: -0.01em;
		color: #0097db;
	}

	.barion-leiras {
		opacity: 0.85;
	}

	.barion:hover .barion-leiras {
		text-decoration: underline;
	}

	.also {
		margin-top: 32px;
		padding-top: 20px;
		border-top: 1px solid rgb(251 241 228 / 0.25);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 8px 24px;
	}

	/* Mobilon a képernyő alján végig látszó foglalás sáv ne takarja el a lábléc alját */
	@media (max-width: 899px) {
		footer {
			padding-bottom: calc(32px + var(--mobil-sav, 0px) + env(safe-area-inset-bottom, 0px));
		}
	}

	@media (max-width: 760px) {
		.racs {
			grid-template-columns: 1fr;
			gap: 32px;
		}
	}
</style>
