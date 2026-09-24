<script lang="ts">
	import { resolve } from '$app/paths';
	import { contact, hasEmail, newsletter } from '$lib/config';
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	const levelLink = `mailto:${contact.email}?subject=${encodeURIComponent('Értesítést kérek az új anyagokról')}`;
</script>

<section id="hirlevel" class="szakasz hirlevel" aria-labelledby="hirlevel-cim">
	<div class="wrap racs">
		<div class="szoveg">
			<SzakaszCim id="hirlevel-cim" elotag="Próximamente">Készülsz az írásbelire is?</SzakaszCim>
			<p class="olvashato">
				Az üzleti spanyol írásbeli vizsgarészhez is készül a tananyagom, jelenleg a fejlesztésén
				dolgozom. Ha szeretnéd elsőként megtudni, mikor indul, iratkozz fel a hírlevelemre. Addig is
				hasznos szóbeli és munkavállalási tippeket küldök.
			</p>
		</div>

		{#if newsletter.action}
			<form method="POST" action={newsletter.action} class="urlap">
				<div class="mezok">
					<label>
						<span>Keresztnév</span>
						<input type="text" name="keresztnev" autocomplete="given-name" required />
					</label>
					<label>
						<span>E-mail cím</span>
						<input type="email" name="email" autocomplete="email" required />
					</label>
				</div>

				<fieldset>
					<legend>Miről kérsz értesítést?</legend>
					<label class="jelolo">
						<input type="checkbox" name="ertesites" value="szobeli-anyag" />
						Letölthető BGE szóbeli anyag és nyelvtani összefoglaló
					</label>
					<label class="jelolo">
						<input type="checkbox" name="ertesites" value="gyakorlofelulet" />
						Online gyakorlófelület (írásbeli rész, feladatok, videós nyelvtan, szókártyák)
					</label>
				</fieldset>

				<fieldset>
					<legend>Mire készülsz?</legend>
					<label class="jelolo">
						<input type="checkbox" name="cel" value="vizsga" />
						Vizsgára készülök
					</label>
					<label class="jelolo">
						<input type="checkbox" name="cel" value="munka" />
						Spanyolországban szeretnék dolgozni
					</label>
				</fieldset>

				<label class="jelolo hozzajarulas">
					<input type="checkbox" name="hozzajarulas" value="igen" required />
					<span>
						Hozzájárulok, hogy e-mailben értesítést küldj. Elolvastam az
						<a href={resolve('/adatkezeles')}>Adatkezelési tájékoztatót</a>.
					</span>
				</label>

				<button type="submit" class="gomb gomb-masodlagos kuld">Kérem az értesítést</button>
				<p class="apro halk">
					Nem küldök kéretlen leveleket, és bármikor egy kattintással leiratkozhatsz.
				</p>
			</form>
		{:else}
			<div class="urlap egyszeru">
				<p class="mi-keszul">Min dolgozom most?</p>
				<ul class="keszulo">
					<li>Letölthető BGE szóbeli anyag és nyelvtani összefoglaló</li>
					<li>Online gyakorlófelület (írásbeli rész, feladatok, videós nyelvtan, szókártyák)</li>
				</ul>
				{#if hasEmail()}
					<p>Írj egy rövid levelet, és felírlak az értesítési listára.</p>
					<a class="gomb gomb-masodlagos" href={levelLink}>Kérem az értesítést</a>
					<p class="apro halk">
						Nem küldök kéretlen leveleket, és bármikor leiratkozhatsz.
						<a href={resolve('/adatkezeles')}>Adatkezelési tájékoztató</a>
					</p>
				{:else}
					<p class="apro halk">A feliratkozás hamarosan indul.</p>
				{/if}
			</div>
		{/if}
	</div>
</section>

<style>
	.hirlevel {
		border-top: 1px solid var(--vonal);
	}

	.racs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(32px, 5vw, 80px);
		align-items: start;
	}

	.szoveg {
		display: grid;
		gap: 24px;
	}

	.urlap {
		display: grid;
		gap: 22px;
		padding: clamp(24px, 3vw, 40px);
		background: rgb(255 255 255 / 0.55);
		border: 1px solid var(--vonal);
		border-radius: var(--sarok);
	}

	.urlap.egyszeru {
		justify-items: start;
		gap: 16px;
	}

	.mi-keszul {
		font-family: var(--font-serif);
		font-weight: 600;
		font-size: 1.3rem;
	}

	.keszulo {
		list-style: none;
		margin: 0 0 8px;
		padding: 0;
		display: grid;
		gap: 10px;
	}

	.keszulo li {
		position: relative;
		padding-left: 24px;
	}

	.keszulo li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.62em;
		width: 9px;
		height: 9px;
		background: var(--terrakotta);
	}

	.mezok {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	label > span:first-child {
		display: block;
		font-weight: 500;
		font-size: 15px;
		margin-bottom: 6px;
	}

	input[type='text'],
	input[type='email'] {
		width: 100%;
		min-height: 50px;
		padding: 10px 14px;
		font: inherit;
		color: var(--barna);
		background: var(--krem);
		border: 1.5px solid #d9c2a8;
		border-radius: var(--sarok);
	}

	input[type='text']:focus,
	input[type='email']:focus {
		outline: none;
		border-color: var(--terrakotta);
		box-shadow: 0 0 0 3px rgb(242 165 65 / 0.45);
	}

	fieldset {
		margin: 0;
		padding: 0;
		border: 0;
		display: grid;
		gap: 10px;
	}

	legend {
		font-weight: 600;
		margin-bottom: 10px;
		padding: 0;
	}

	.jelolo {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		font-size: 16px;
		line-height: 1.45;
		cursor: pointer;
	}

	.jelolo input {
		flex: none;
		width: 20px;
		height: 20px;
		margin: 1px 0 0;
		accent-color: var(--terrakotta-sotet);
	}

	.hozzajarulas {
		padding-top: 18px;
		border-top: 1px solid var(--vonal);
	}

	.kuld {
		justify-self: start;
	}

	@media (max-width: 899px) {
		.racs {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 520px) {
		.mezok {
			grid-template-columns: 1fr;
		}
	}
</style>
