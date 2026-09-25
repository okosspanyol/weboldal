<!-- Szövegmező formázó gombokkal: spanyol dőlt, kiemelés, link, változók (és hosszú szövegben cím, lista). -->
<script lang="ts">
	import { tick } from 'svelte';
	import { valtozoLeirasok } from '$lib/tartalom/szoveg';

	let {
		ertek = $bindable(''),
		cimke,
		sugo = '',
		hosszu = false,
		blokk = false,
		sima = false,
		tipus = 'text',
		lista = ''
	}: {
		ertek: string;
		cimke: string;
		sugo?: string;
		hosszu?: boolean;
		blokk?: boolean;
		sima?: boolean;
		tipus?: 'text' | 'url';
		/** datalist azonosító javaslatokhoz (linkek). */
		lista?: string;
	} = $props();

	const id = `m-${Math.random().toString(36).slice(2, 9)}`;
	let mezo = $state<HTMLInputElement | HTMLTextAreaElement>();

	async function beszur(elotte: string, utana = '', helyette = 'szöveg') {
		const el = mezo;
		if (!el) return;
		const e = el.selectionStart ?? ertek.length;
		const v = el.selectionEnd ?? ertek.length;
		const kijelolt = ertek.slice(e, v) || helyette;
		ertek = ertek.slice(0, e) + elotte + kijelolt + utana + ertek.slice(v);
		await tick();
		el.focus();
		el.setSelectionRange(e + elotte.length, e + elotte.length + kijelolt.length);
	}

	async function sorElejere(jel: string) {
		const el = mezo;
		if (!el) return;
		const e = el.selectionStart ?? 0;
		const sorEleje = ertek.lastIndexOf('\n', e - 1) + 1;
		ertek = ertek.slice(0, sorEleje) + jel + ertek.slice(sorEleje);
		await tick();
		el.focus();
		el.setSelectionRange(e + jel.length, e + jel.length);
	}

	function linkBeszurasa() {
		const cel = prompt('A link címe (pl. https://…, /aszf vagy #arak):', 'https://');
		if (cel) beszur('[', `](${cel.trim()})`, 'link szövege');
	}

	function valtozo(e: Event) {
		const s = e.currentTarget as HTMLSelectElement;
		if (s.value) beszur(`{${s.value}}`, '', '').then(() => mezo?.setSelectionRange(mezo.selectionEnd ?? 0, mezo.selectionEnd ?? 0));
		s.value = '';
	}

	function billentyu(e: KeyboardEvent) {
		if (sima || !(e.ctrlKey || e.metaKey)) return;
		if (e.key === 'b') {
			e.preventDefault();
			beszur('**', '**');
		} else if (e.key === 'i') {
			e.preventDefault();
			beszur('_', '_');
		} else if (e.key === 'k') {
			e.preventDefault();
			linkBeszurasa();
		}
	}
</script>

<div class="mezo">
	<div class="fej">
		<label for={id}>{cimke}</label>
		{#if !sima}
			<div class="eszkozok" role="toolbar" aria-label="Formázás: {cimke}">
				<button type="button" title="Spanyol szöveg (Lora dőlt) — Ctrl+I" onclick={() => beszur('_', '_')}><em>Sp</em></button>
				<button type="button" title="Kiemelés — Ctrl+B" onclick={() => beszur('**', '**')}><strong>B</strong></button>
				<button type="button" title="Link — Ctrl+K" onclick={linkBeszurasa}>🔗</button>
				{#if blokk}
					<button type="button" title="Alcím (új sor elején)" onclick={() => sorElejere('## ')}>H</button>
					<button type="button" title="Felsorolás" onclick={() => sorElejere('- ')}>•</button>
					<button type="button" title="Kiemelt doboz" onclick={() => sorElejere('> ')}>▍</button>
				{/if}
				<select title="Változó beszúrása" aria-label="Változó beszúrása" onchange={valtozo}>
					<option value="">{'{ }'}</option>
					{#each valtozoLeirasok as [nev, leiras] (nev)}
						<option value={nev}>{leiras}</option>
					{/each}
				</select>
			</div>
		{/if}
	</div>

	{#if hosszu}
		<textarea {id} bind:this={mezo} bind:value={ertek} rows={blokk ? 8 : 3} class:blokk onkeydown={billentyu}></textarea>
	{:else}
		<input
			{id}
			bind:this={mezo}
			bind:value={ertek}
			type={tipus}
			list={lista || undefined}
			spellcheck={tipus === 'url' ? false : undefined}
			autocomplete="off"
			onkeydown={billentyu}
		/>
	{/if}

	{#if sugo}<p class="sugo">{sugo}</p>{/if}
</div>

<style>
	.mezo {
		display: grid;
		gap: 6px;
	}

	.fej {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 8px;
		min-height: 28px;
	}

	label {
		font-size: 13px;
		font-weight: 600;
		color: var(--a-szoveg);
	}

	.eszkozok {
		display: flex;
		gap: 2px;
		opacity: 0.55;
		transition: opacity 0.15s;
	}

	.mezo:focus-within .eszkozok,
	.mezo:hover .eszkozok {
		opacity: 1;
	}

	.eszkozok button,
	.eszkozok select {
		height: 26px;
		min-width: 26px;
		padding: 0 6px;
		border: 1px solid var(--a-vonal);
		background: var(--a-feher);
		border-radius: 5px;
		font: inherit;
		font-size: 12px;
		color: var(--a-szoveg);
		cursor: pointer;
	}

	.eszkozok select {
		width: 44px;
		padding: 0 2px;
	}

	.eszkozok button:hover {
		background: var(--a-halvany);
	}

	.eszkozok em {
		font-family: var(--font-serif);
		font-size: 13px;
	}

	input,
	textarea {
		width: 100%;
		padding: 9px 11px;
		border: 1px solid var(--a-vonal);
		border-radius: 7px;
		background: var(--a-feher);
		font: inherit;
		font-size: 14px;
		line-height: 1.5;
		color: var(--a-szoveg);
	}

	textarea {
		resize: vertical;
		min-height: 64px;
		field-sizing: content;
		max-height: 420px;
	}

	textarea.blokk {
		min-height: 160px;
	}

	input:focus,
	textarea:focus {
		outline: 2px solid var(--a-kiemelt);
		outline-offset: -1px;
		border-color: transparent;
	}

	.sugo {
		font-size: 12px;
		color: var(--a-halk);
		line-height: 1.45;
	}
</style>
