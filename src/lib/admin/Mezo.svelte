<script lang="ts">
	import { kepElerheto } from '$lib/tartalom/szoveg';
	import type { Mezo } from './semak';
	import SzovegMezo from './SzovegMezo.svelte';
	import Lista from './Lista.svelte';
	import Urlap from './Urlap.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let { mezo, obj }: { mezo: Mezo; obj: Record<string, any> } = $props();

	let csoportNyitva = $state(true);
	$effect.pre(() => {
		if (mezo.tipus === 'csoport' && mezo.csukott) csoportNyitva = false;
	});
</script>

{#if mezo.tipus === 'szoveg'}
	<SzovegMezo
		bind:ertek={obj[mezo.kulcs]}
		cimke={mezo.cimke}
		sugo={mezo.sugo}
		hosszu={mezo.hosszu}
		blokk={mezo.blokk}
		sima={mezo.sima}
	/>
{:else if mezo.tipus === 'link'}
	<SzovegMezo bind:ertek={obj[mezo.kulcs]} cimke={mezo.cimke} sugo={mezo.sugo} sima tipus="url" lista="admin-linkek" />
{:else if mezo.tipus === 'kep'}
	<div class="kep">
		<SzovegMezo bind:ertek={obj[mezo.kulcs]} cimke={mezo.cimke} sugo={mezo.sugo} sima lista="admin-kepek" />
		{#if obj[mezo.kulcs]?.trim()}
			{#if kepElerheto(obj[mezo.kulcs])}
				<div class="kep-elonezet"><img src={obj[mezo.kulcs]} alt="" /><span class="ok">✓ Megvan</span></div>
			{:else}
				<p class="figyelem">
					Ez a fájl még nincs a <code>static</code> mappában — amíg nem töltöd fel, nem jelenik meg.
				</p>
			{/if}
		{/if}
	</div>
{:else if mezo.tipus === 'szam'}
	<label class="egyszeru">
		<span>{mezo.cimke}</span>
		<input type="number" min="0" bind:value={obj[mezo.kulcs]} />
		{#if mezo.sugo}<small>{mezo.sugo}</small>{/if}
	</label>
{:else if mezo.tipus === 'kapcsolo'}
	<label class="kapcsolo">
		<input type="checkbox" bind:checked={obj[mezo.kulcs]} />
		<span class="csuszka" aria-hidden="true"></span>
		<span>{mezo.cimke}{#if mezo.sugo}<small>{mezo.sugo}</small>{/if}</span>
	</label>
{:else if mezo.tipus === 'valaszto'}
	<label class="egyszeru">
		<span>{mezo.cimke}</span>
		<select bind:value={obj[mezo.kulcs]}>
			{#each mezo.opciok as o (o.ertek)}
				<option value={o.ertek}>{o.szoveg}</option>
			{/each}
		</select>
	</label>
{:else if mezo.tipus === 'csoport'}
	<fieldset class="csoport">
		<legend>
			<button type="button" aria-expanded={csoportNyitva} onclick={() => (csoportNyitva = !csoportNyitva)}>
				<span class="nyil" class:nyitva={csoportNyitva} aria-hidden="true">›</span>
				{mezo.cimke}
			</button>
		</legend>
		{#if csoportNyitva}
			{#if mezo.sugo}<p class="sugo">{mezo.sugo}</p>{/if}
			<Urlap mezok={mezo.mezok} obj={mezo.kulcs ? obj[mezo.kulcs] : obj} />
		{/if}
	</fieldset>
{:else if mezo.tipus === 'lista'}
	<Lista {mezo} lista={obj[mezo.kulcs]} />
{/if}

<style>
	.egyszeru {
		display: grid;
		gap: 6px;
		font-size: 13px;
		font-weight: 600;
	}

	.egyszeru small {
		font-weight: 400;
		color: var(--a-halk);
	}

	.egyszeru input,
	.egyszeru select {
		padding: 9px 11px;
		border: 1px solid var(--a-vonal);
		border-radius: 7px;
		background: var(--a-feher);
		font: inherit;
		font-weight: 400;
		font-size: 14px;
		color: var(--a-szoveg);
	}

	.kapcsolo {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 14px;
		cursor: pointer;
	}

	.kapcsolo small {
		display: block;
		font-size: 12px;
		color: var(--a-halk);
	}

	.kapcsolo input {
		position: absolute;
		opacity: 0;
		width: 1px;
		height: 1px;
	}

	.csuszka {
		flex: none;
		position: relative;
		width: 36px;
		height: 20px;
		border-radius: 20px;
		background: var(--a-vonal);
		transition: background 0.15s;
	}

	.csuszka::after {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #fff;
		box-shadow: 0 1px 2px rgb(0 0 0 / 0.2);
		transition: transform 0.15s;
	}

	.kapcsolo input:checked + .csuszka {
		background: var(--a-kiemelt);
	}

	.kapcsolo input:checked + .csuszka::after {
		transform: translateX(16px);
	}

	.kapcsolo input:focus-visible + .csuszka {
		outline: 2px solid var(--a-kiemelt);
		outline-offset: 2px;
	}

	.csoport {
		margin: 0;
		padding: 0 0 4px 12px;
		border: 0;
		border-left: 2px solid var(--a-vonal);
		display: grid;
		gap: 14px;
	}

	.csoport legend {
		padding: 0;
		margin-bottom: 10px;
		margin-left: -12px;
	}

	.csoport legend button {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 2px 0;
		border: 0;
		background: none;
		font: inherit;
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--a-halk);
		cursor: pointer;
	}

	.nyil {
		display: inline-block;
		width: 12px;
		font-size: 16px;
		transition: transform 0.15s;
	}

	.nyil.nyitva {
		transform: rotate(90deg);
	}

	.sugo {
		font-size: 12px;
		color: var(--a-halk);
		line-height: 1.45;
		margin-top: -6px;
	}

	.kep {
		display: grid;
		gap: 8px;
	}

	.kep-elonezet {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 12px;
	}

	.kep-elonezet img {
		max-height: 48px;
		max-width: 160px;
		padding: 4px;
		border: 1px solid var(--a-vonal);
		border-radius: 6px;
		background: repeating-conic-gradient(#eee 0 25%, #fff 0 50%) 0 0 / 12px 12px;
	}

	.ok {
		color: var(--a-siker);
		font-weight: 600;
	}

	.figyelem {
		font-size: 12px;
		padding: 8px 10px;
		border-radius: 6px;
		background: var(--a-figyelem-hatter);
		color: var(--a-figyelem);
	}
</style>
