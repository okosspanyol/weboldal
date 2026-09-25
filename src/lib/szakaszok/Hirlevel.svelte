<script lang="ts">
	import type { HirlevelAdat } from '$lib/tartalom/tipusok';
	import { oldal } from '$lib/tartalom/kontextus';
	import { emailErvenyes } from '$lib/tartalom/szoveg';
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	let { adat, horgony = 'hirlevel' }: { adat: HirlevelAdat; horgony?: string } = $props();
	const o = oldal();
	const email = $derived(o.t.altalanos.email);
	const levelLink = $derived(`mailto:${email}?subject=${encodeURIComponent(o.sima(adat.levelTargy))}`);
	const action = $derived(/^https:\/\//i.test(adat.action.trim()) ? adat.action.trim() : '');
</script>

<section
	id={horgony || undefined}
	class="szakasz hirlevel"
	aria-labelledby="{horgony || 'hirlevel'}-cim"
>
	<div class="wrap racs">
		<div class="szoveg">
			<SzakaszCim id="{horgony || 'hirlevel'}-cim" elotag={adat.elotag} cim={adat.cim} />
			<p class="olvashato">{@html o.sor(adat.szoveg)}</p>
		</div>

		{#if action}
			<form method="POST" {action} class="urlap">
				<div class="mezok">
					<label>
						<span>{o.sima(adat.nevCimke)}</span>
						<input type="text" name={adat.nevMezo} autocomplete="given-name" required />
					</label>
					<label>
						<span>{o.sima(adat.emailCimke)}</span>
						<input type="email" name={adat.emailMezo} autocomplete="email" required />
					</label>
				</div>

				{#if adat.ertesitesek.length}
					<fieldset>
						<legend>{o.sima(adat.ertesitesCim)}</legend>
						{#each adat.ertesitesek as opcio, i (i)}
							<label class="jelolo">
								<input type="checkbox" name={adat.ertesitesMezo} value={opcio.ertek} />
								{o.sima(opcio.szoveg)}
							</label>
						{/each}
					</fieldset>
				{/if}

				{#if adat.celok.length}
					<fieldset>
						<legend>{o.sima(adat.celCim)}</legend>
						{#each adat.celok as opcio, i (i)}
							<label class="jelolo">
								<input type="checkbox" name={adat.celMezo} value={opcio.ertek} />
								{o.sima(opcio.szoveg)}
							</label>
						{/each}
					</fieldset>
				{/if}

				<label class="jelolo hozzajarulas">
					<input type="checkbox" name="hozzajarulas" value="igen" required />
					<span>{@html o.sor(adat.hozzajarulas)}</span>
				</label>

				<button type="submit" class="gomb gomb-masodlagos kuld">{o.sima(adat.gomb)}</button>
				<p class="apro halk">{@html o.sor(adat.apro)}</p>
			</form>
		{:else}
			<div class="urlap egyszeru">
				<p class="mi-keszul">{@html o.sor(adat.keszuloCim)}</p>
				{#if adat.keszulo.length}
					<ul class="keszulo">
						{#each adat.keszulo as elem, i (i)}
							<li>{@html o.sor(elem)}</li>
						{/each}
					</ul>
				{/if}
				{#if emailErvenyes(email)}
					<p>{@html o.sor(adat.levelSzoveg)}</p>
					<a class="gomb gomb-masodlagos" href={levelLink}>{o.sima(adat.gomb)}</a>
					<p class="apro halk">{@html o.sor(adat.levelApro)}</p>
				{:else}
					<p class="apro halk">{@html o.sor(adat.nincsEmail)}</p>
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
