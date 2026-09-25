<!--
	Szerkeszthető lista: új elem, másolás, törlés, mozgatás nyilakkal vagy áthúzással.
	Pl. árak: „+ Új csomag”, és a meglévőt egy kattintással le lehet másolni.
-->
<script lang="ts">
	import type { Mezo } from './semak';
	import SzovegMezo from './SzovegMezo.svelte';
	import Urlap from './Urlap.svelte';

	let {
		mezo,
		lista,
		onvalaszt
	}: {
		mezo: Extract<Mezo, { tipus: 'lista' }>;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		lista: any[];
		/** Egy elem kinyitásakor (pl. az aloldal előnézetéhez). */
		onvalaszt?: (index: number | null) => void;
	} = $props();

	const objektumok = $derived(mezo.elem !== 'szoveg');
	let nyitott = $state<number | null>(null);
	let huzott = $state<number | null>(null);
	let cel = $state<number | null>(null);

	function nyit(i: number | null) {
		nyitott = nyitott === i ? null : i;
		onvalaszt?.(nyitott);
	}

	function hozzaad() {
		lista.push(mezo.uj());
		if (objektumok) nyit(lista.length - 1);
	}

	function masol(i: number) {
		lista.splice(i + 1, 0, structuredClone($state.snapshot(lista[i])));
		if (objektumok) nyit(i + 1);
	}

	function torol(i: number) {
		const nev = objektumok ? cim(i) : String(lista[i] || '');
		if (nev.trim() && !confirm(`Biztosan törlöd: „${nev}”?`)) return;
		lista.splice(i, 1);
		if (nyitott === i) nyit(null);
		else if (nyitott !== null && nyitott > i) nyitott--;
	}

	function mozgat(honnan: number, hova: number) {
		if (hova < 0 || hova >= lista.length || honnan === hova) return;
		const [elem] = lista.splice(honnan, 1);
		lista.splice(hova, 0, elem);
		if (nyitott === honnan) nyitott = hova;
		else if (nyitott !== null) {
			if (honnan < nyitott && hova >= nyitott) nyitott--;
			else if (honnan > nyitott && hova <= nyitott) nyitott++;
		}
	}

	function cim(i: number): string {
		const e = lista[i];
		const c = mezo.elemCim ? mezo.elemCim(e) : '';
		return (c || `${mezo.elemNev} ${i + 1}`).replace(/\*\*|_/g, '');
	}
</script>

<div class="lista">
	<div class="lista-fej">
		<span class="lista-cim">{mezo.cimke}</span>
		<span class="db">{lista.length} db</span>
	</div>
	{#if mezo.sugo}<p class="sugo">{mezo.sugo}</p>{/if}

	<ol>
		{#each lista as _, i (i)}
			<li
				class:objektum={objektumok}
				class:nyitott={nyitott === i}
				class:cel={cel === i && huzott !== null && huzott !== i}
				ondragover={(e) => {
					if (huzott === null) return;
					e.preventDefault();
					cel = i;
				}}
				ondrop={(e) => {
					e.preventDefault();
					if (huzott !== null) mozgat(huzott, i);
					huzott = cel = null;
				}}
			>
				<div class="sor">
					<span
						class="fogo"
						draggable="true"
						title="Húzd a mozgatáshoz"
						aria-hidden="true"
						ondragstart={(e) => {
							huzott = i;
							e.dataTransfer?.setData('text/plain', String(i));
							if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
						}}
						ondragend={() => (huzott = cel = null)}>⠿</span
					>

					{#if objektumok}
						<button type="button" class="elem-cim" aria-expanded={nyitott === i} onclick={() => nyit(i)}>
							<span class="nyil" aria-hidden="true">›</span>
							<span class="szoveg">{cim(i)}</span>
						</button>
					{:else}
						<div class="szoveg-elem">
							<SzovegMezo bind:ertek={lista[i]} cimke="{mezo.elemNev} {i + 1}" />
						</div>
					{/if}

					<div class="muveletek">
						<button type="button" title="Feljebb" aria-label="Feljebb" disabled={i === 0} onclick={() => mozgat(i, i - 1)}>↑</button>
						<button type="button" title="Lejjebb" aria-label="Lejjebb" disabled={i === lista.length - 1} onclick={() => mozgat(i, i + 1)}>↓</button>
						<button type="button" title="Másolat" aria-label="Másolat" onclick={() => masol(i)}>⧉</button>
						<button type="button" class="torles" title="Törlés" aria-label="Törlés" onclick={() => torol(i)}>✕</button>
					</div>
				</div>

				{#if objektumok && nyitott === i && Array.isArray(mezo.elem)}
					<div class="elem-urlap">
						<Urlap mezok={mezo.elem} obj={lista[i]} />
					</div>
				{/if}
			</li>
		{/each}
	</ol>

	<button type="button" class="uj" onclick={hozzaad}>+ Új {mezo.elemNev}</button>
</div>

<style>
	.lista {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 8px;
	}

	.lista-fej {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.lista-cim {
		font-size: 13px;
		font-weight: 600;
	}

	.db {
		font-size: 12px;
		color: var(--a-halk);
	}

	.sugo {
		font-size: 12px;
		color: var(--a-halk);
		line-height: 1.45;
	}

	ol {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 6px;
	}

	li {
		min-width: 0;
		border-radius: 8px;
		transition: box-shadow 0.15s;
	}

	li.objektum {
		border: 1px solid var(--a-vonal);
		background: var(--a-feher);
	}

	li.nyitott {
		border-color: var(--a-kiemelt);
		box-shadow: 0 0 0 1px var(--a-kiemelt);
	}

	li.cel {
		box-shadow: 0 -3px 0 var(--a-kiemelt);
	}

	.sor {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	li:not(.objektum) .sor {
		align-items: end;
	}

	.fogo {
		flex: none;
		width: 22px;
		padding: 8px 0;
		text-align: center;
		color: var(--a-halk);
		cursor: grab;
		user-select: none;
	}

	.elem-cim {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 10px 4px;
		border: 0;
		background: none;
		font: inherit;
		font-size: 14px;
		font-weight: 500;
		text-align: left;
		color: var(--a-szoveg);
		cursor: pointer;
	}

	.elem-cim .szoveg {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.nyil {
		flex: none;
		width: 12px;
		transition: transform 0.15s;
	}

	.nyitott .nyil {
		transform: rotate(90deg);
	}

	.szoveg-elem {
		flex: 1;
		min-width: 0;
	}

	.muveletek {
		flex: none;
		display: flex;
		gap: 2px;
		padding-right: 6px;
	}

	li:not(.objektum) .muveletek {
		padding-bottom: 5px;
	}

	.muveletek button {
		width: 26px;
		height: 28px;
		border: 0;
		border-radius: 5px;
		background: none;
		color: var(--a-halk);
		font-size: 13px;
		cursor: pointer;
	}

	.muveletek button:hover:not(:disabled) {
		background: var(--a-halvany);
		color: var(--a-szoveg);
	}

	.muveletek button:disabled {
		opacity: 0.3;
		cursor: default;
	}

	.muveletek .torles:hover:not(:disabled) {
		color: var(--a-hiba);
	}

	.elem-urlap {
		padding: 4px 14px 16px 30px;
		border-top: 1px solid var(--a-vonal);
		padding-top: 14px;
	}

	.uj {
		justify-self: start;
		padding: 8px 14px;
		border: 1px dashed var(--a-kiemelt);
		border-radius: 7px;
		background: none;
		font: inherit;
		font-size: 13px;
		font-weight: 600;
		color: var(--a-kiemelt);
		cursor: pointer;
	}

	.uj:hover {
		background: var(--a-kiemelt-halvany);
	}
</style>
