<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { contact, hasEmail, socialLinks, teacher } from '$lib/config';
	import Logo from './Logo.svelte';

	const kozossegi = socialLinks();
	const ev = new Date().getFullYear();
</script>

<footer class="sotet">
	<div class="wrap racs">
		<div class="marka">
			<a class="logo-alap" href={resolve('/')} aria-label="OKOSspanyol – főoldal">
				<img src={asset('/logo-kor.png')} alt="" width="44" height="44" />
				<Logo />
			</a>
			<p>
				Üzleti spanyol beszédgyakorlás online — szóbeli vizsgára és spanyolországi munkához.
			</p>
		</div>

		<div class="oszlop">
			<h2 class="oszlopcim">Kapcsolat</h2>
			<ul>
				<li>
					{#if hasEmail()}
						<a href="mailto:{contact.email}">{contact.email}</a>
					{:else}
						{contact.email}
					{/if}
				</li>
				{#each kozossegi as link (link.label)}
					<li><a href={link.href} rel="noopener" target="_blank">{link.label}</a></li>
				{/each}
			</ul>
		</div>

		<div class="oszlop">
			<h2 class="oszlopcim">Tudnivalók</h2>
			<ul>
				<li><a href={resolve('/adatkezeles')}>Adatkezelési tájékoztató</a></li>
				<li><a href={resolve('/aszf')}>ÁSZF</a></li>
				<li><a href={resolve('/impresszum')}>Impresszum</a></li>
			</ul>
		</div>
	</div>

	<div class="wrap">
		<div class="also">
			<p class="apro">© {ev} {teacher.fullName} · OKOSspanyol</p>
			<p class="apro es">¡Nos vemos en clase!</p>
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

	.also {
		margin-top: 48px;
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
			padding-bottom: calc(32px + 76px + env(safe-area-inset-bottom, 0px));
		}
	}

	@media (max-width: 760px) {
		.racs {
			grid-template-columns: 1fr;
			gap: 32px;
		}
	}
</style>
