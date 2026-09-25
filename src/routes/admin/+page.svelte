<!--
	Vizuális szerkesztő: bal oldalt a szakaszok és beállítások, jobb oldalt az élő előnézet.
	Minden gépelés azonnal látszik az előnézetben; a weboldalon a „Mentés” után jelenik meg.
-->
<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { ujSzakasz, szakaszAlapok } from '$lib/tartalom/alap';
	import { osszefesul } from '$lib/tartalom/osszefesul';
	import { sima, valtozok } from '$lib/tartalom/szoveg';
	import type { Aloldal, SzakaszTipus, Tartalom } from '$lib/tartalom/tipusok';
	import {
		aloldalMezok,
		alapadatokSema,
		fejlecLablecSema,
		seoSema,
		szakaszInfo,
		szakaszSemak,
		type Mezo
	} from '$lib/admin/semak';
	import Urlap from '$lib/admin/Urlap.svelte';
	import Lista from '$lib/admin/Lista.svelte';
	import SzovegMezo from '$lib/admin/SzovegMezo.svelte';

	let { data } = $props();

	// A szerkesztett (még nem mentett) tartalom és az utoljára mentett állapot.
	// Az oldal betöltésekor egyszer vesszük át; utána a szerkesztő maga kezeli.
	/* svelte-ignore state_referenced_locally */
	let tartalom = $state<Tartalom>(structuredClone(data.tartalom));
	/* svelte-ignore state_referenced_locally */
	let mentettJson = $state(JSON.stringify(data.tartalom));
	/* svelte-ignore state_referenced_locally */
	let verzio = $state(data.verzio);
	/* svelte-ignore state_referenced_locally */
	let frissitve = $state(data.frissitve);
	/* svelte-ignore state_referenced_locally */
	let vanElozo = $state(data.vanElozo);

	const piszkos = $derived(JSON.stringify(tartalom) !== mentettJson);

	type Ful = 'oldal' | 'alapadatok' | 'fejlec' | 'aloldalak' | 'seo';
	const fulek: { id: Ful; nev: string }[] = [
		{ id: 'oldal', nev: 'Főoldal' },
		{ id: 'alapadatok', nev: 'Alapadatok' },
		{ id: 'fejlec', nev: 'Menü, lábléc' },
		{ id: 'aloldalak', nev: 'Aloldalak' },
		{ id: 'seo', nev: 'Kereső' }
	];
	let ful = $state<Ful>('oldal');
	let kivalasztott = $state<string | null>(null);
	let aloldalIndex = $state<number | null>(null);
	let ujSzakaszValaszto = $state(false);

	let eszkoz = $state<'asztali' | 'tablet' | 'mobil'>('asztali');
	let mobilNezet = $state<'szerkeszto' | 'elonezet'>('szerkeszto');
	let menuNyitva = $state(false);

	let mentes = $state(false);
	let uzenet = $state<{ szoveg: string; tipus: 'ok' | 'hiba' } | null>(null);
	let uzenetIdozito: ReturnType<typeof setTimeout>;

	let iframe = $state<HTMLIFrameElement>();
	let panel = $state<HTMLElement>();
	let importMezo = $state<HTMLInputElement>();

	const v = $derived(valtozok(tartalom));
	const elonezetAloldal = $derived(ful === 'aloldalak' ? aloldalIndex : null);

	/* ——— Előnézet ——— */

	function kuld(u: unknown) {
		iframe?.contentWindow?.postMessage(u, location.origin);
	}

	function tartalomKuldese() {
		kuld({ tipus: 'tartalom', tartalom: $state.snapshot(tartalom), aloldal: elonezetAloldal });
	}

	$effect(() => {
		// Minden változásra (kis késleltetéssel, hogy gépelés közben ne akadjon)
		JSON.stringify(tartalom);
		void elonezetAloldal;
		const t = setTimeout(tartalomKuldese, 90);
		return () => clearTimeout(t);
	});

	$effect(() => {
		kuld({ tipus: 'kivalaszt', id: kivalasztott, gorgess: false });
	});

	async function valaszt(id: string | null, gorgessElonezet = true, gorgessPanel = false) {
		kivalasztott = id;
		ful = 'oldal';
		ujSzakaszValaszto = false;
		kuld({ tipus: 'kivalaszt', id, gorgess: gorgessElonezet });
		if (gorgessPanel && id) {
			await tick();
			panel
				?.querySelector(`[data-kartya="${CSS.escape(id)}"]`)
				?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	onMount(() => {
		function fogad(e: MessageEvent) {
			if (e.origin !== location.origin || e.source !== iframe?.contentWindow) return;
			if (e.data?.tipus === 'kesz') {
				tartalomKuldese();
				kuld({ tipus: 'kivalaszt', id: kivalasztott, gorgess: true });
			} else if (e.data?.tipus === 'kattintas') {
				if (matchMedia('(max-width: 860px)').matches) mobilNezet = 'szerkeszto';
				if (kivalasztott !== e.data.id) valaszt(e.data.id, false, true);
			}
		}
		function billentyu(e: KeyboardEvent) {
			if ((e.ctrlKey || e.metaKey) && e.key === 's') {
				e.preventDefault();
				ment();
			}
		}
		function elhagyas(e: BeforeUnloadEvent) {
			if (piszkos) e.preventDefault();
		}
		addEventListener('message', fogad);
		addEventListener('keydown', billentyu);
		addEventListener('beforeunload', elhagyas);
		return () => {
			removeEventListener('message', fogad);
			removeEventListener('keydown', billentyu);
			removeEventListener('beforeunload', elhagyas);
		};
	});

	/* ——— Szakaszok ——— */

	function szakaszCim(i: number): string {
		const s = tartalom.szakaszok[i];
		const a = s.adat as unknown as Record<string, unknown>;
		const cim = typeof a.cim === 'string' ? a.cim : '';
		return sima(cim, v).slice(0, 70);
	}

	function hozzaad(tipus: SzakaszTipus) {
		const s = ujSzakasz(tipus, `${tipus}-${Date.now().toString(36)}`);
		// Ha a horgony már foglalt, ne legyen két egyforma
		if (s.horgony && tartalom.szakaszok.some((x) => x.horgony === s.horgony)) s.horgony += '-2';
		const hova = kivalasztott ? tartalom.szakaszok.findIndex((x) => x.id === kivalasztott) + 1 : tartalom.szakaszok.length;
		tartalom.szakaszok.splice(hova, 0, s);
		valaszt(s.id, true, true);
	}

	function masol(i: number) {
		const s = structuredClone($state.snapshot(tartalom.szakaszok[i]));
		s.id = `${s.tipus}-${Date.now().toString(36)}`;
		if (s.horgony) s.horgony += '-2';
		tartalom.szakaszok.splice(i + 1, 0, s);
		valaszt(s.id, true, true);
	}

	function torol(i: number) {
		const s = tartalom.szakaszok[i];
		if (!confirm(`Biztosan törlöd ezt a szakaszt: „${szakaszInfo[s.tipus].nev}”?\n(Ha csak elrejtenéd, használd a szem ikont.)`)) return;
		tartalom.szakaszok.splice(i, 1);
		if (kivalasztott === s.id) kivalasztott = null;
	}

	function mozgat(honnan: number, hova: number) {
		if (hova < 0 || hova >= tartalom.szakaszok.length || honnan === hova) return;
		const [s] = tartalom.szakaszok.splice(honnan, 1);
		tartalom.szakaszok.splice(hova, 0, s);
		kuld({ tipus: 'kivalaszt', id: s.id, gorgess: true });
	}

	function alapra(i: number) {
		const s = tartalom.szakaszok[i];
		if (!confirm('Visszaállítod ennek a szakasznak az összes szövegét az eredetire?')) return;
		(s as { adat: unknown }).adat = szakaszAlapok[s.tipus]();
	}

	let huzott = $state<number | null>(null);
	let cel = $state<number | null>(null);

	const horgonyok = $derived(tartalom.szakaszok.map((s) => s.horgony).filter(Boolean));
	const dupla = (h: string) => !!h && horgonyok.filter((x) => x === h).length > 1;

	/* ——— Mentés ——— */

	function jelez(szoveg: string, tipus: 'ok' | 'hiba' = 'ok') {
		uzenet = { szoveg, tipus };
		clearTimeout(uzenetIdozito);
		uzenetIdozito = setTimeout(() => (uzenet = null), tipus === 'ok' ? 3000 : 9000);
	}

	async function ment() {
		if (mentes || !piszkos) return;
		mentes = true;
		try {
			const snap = $state.snapshot(tartalom);
			const valasz = await fetch('/admin/api/mentes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ tartalom: snap, verzio })
			});
			const eredmeny = await valasz.json().catch(() => ({}));
			if (valasz.status === 401) {
				jelez('Lejárt a belépés. Jelentkezz be újra egy új lapon, majd mentsd el ismét.', 'hiba');
			} else if (!valasz.ok) {
				jelez(eredmeny.hiba ?? eredmeny.message ?? `Hiba történt a mentésnél (${valasz.status}).`, 'hiba');
			} else {
				verzio = eredmeny.verzio;
				frissitve = eredmeny.frissitve;
				vanElozo = verzio > 1;
				// A szerver által rendbe tett változat (pl. aloldal címek) legyen az új alap
				const ujJson = JSON.stringify(eredmeny.tartalom);
				if (ujJson !== JSON.stringify(snap)) tartalom = eredmeny.tartalom;
				mentettJson = ujJson;
				jelez('Mentve — a weboldalon is frissült.');
			}
		} catch {
			jelez('Nem sikerült elérni a szervert. Ellenőrizd az internetkapcsolatot.', 'hiba');
		} finally {
			mentes = false;
		}
	}

	function elvet() {
		if (!confirm('Elveted a nem mentett módosításokat?')) return;
		tartalom = JSON.parse(mentettJson);
	}

	async function elozoVissza() {
		menuNyitva = false;
		if (!confirm('Visszaállítod az előző mentést? (A mostani mentett változat lesz az „előző”, így ez is visszavonható.)')) return;
		const valasz = await fetch('/admin/api/visszaallitas', { method: 'POST' });
		const eredmeny = await valasz.json().catch(() => ({}));
		if (!valasz.ok) return jelez(eredmeny.hiba ?? 'Nem sikerült.', 'hiba');
		tartalom = eredmeny.tartalom;
		mentettJson = JSON.stringify(eredmeny.tartalom);
		verzio = eredmeny.verzio;
		frissitve = eredmeny.frissitve;
		jelez('Az előző mentés visszaállítva.');
	}

	function exportalas() {
		menuNyitva = false;
		const blob = new Blob([JSON.stringify($state.snapshot(tartalom), null, '\t')], { type: 'application/json' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = `okosspanyol-tartalom-${new Date().toISOString().slice(0, 10)}.json`;
		a.click();
		URL.revokeObjectURL(a.href);
	}

	async function importalas(e: Event) {
		const fajl = (e.currentTarget as HTMLInputElement).files?.[0];
		(e.currentTarget as HTMLInputElement).value = '';
		menuNyitva = false;
		if (!fajl) return;
		try {
			const beolvasott = osszefesul(JSON.parse(await fajl.text()));
			if (!confirm('Betöltöd ezt a mentést a szerkesztőbe? (A weboldalon csak a „Mentés” után jelenik meg.)')) return;
			tartalom = beolvasott;
			jelez('Betöltve. Nézd át, és ha jó, mentsd el.');
		} catch {
			jelez('Ez nem egy érvényes tartalom-mentés (JSON).', 'hiba');
		}
	}

	const frissitveSzoveg = $derived(
		frissitve
			? new Date(frissitve).toLocaleString('hu-HU', { dateStyle: 'medium', timeStyle: 'short' })
			: 'még nincs mentés'
	);

	/* ——— Javaslatok a link- és képmezőkhöz ——— */

	const kepek = __STATIKUS_FAJLOK__.filter((f) => /\.(png|jpe?g|webp|avif|svg|gif)$/i.test(f));
	const fajlok = __STATIKUS_FAJLOK__.filter((f) => /\.pdf$/i.test(f));

	const aloldalLista: Extract<Mezo, { tipus: 'lista' }> = {
		tipus: 'lista',
		kulcs: 'aloldalak',
		cimke: 'Aloldalak',
		sugo: 'Nyiss ki egy aloldalt, és az előnézetben azt látod. Új aloldal linkjét a „Menü és lábléc” fülön add hozzá a láblécehez.',
		elem: aloldalMezok,
		elemNev: 'aloldal',
		uj: (): Aloldal => ({
			utvonal: `uj-oldal-${tartalom.aloldalak.length + 1}`,
			cim: 'Új oldal',
			elotag: '',
			leiras: '',
			torzs: 'Ide írd az oldal szövegét.',
			indexelheto: true,
			foglalasGomb: false
		}),
		elemCim: (e) => `/${e.utvonal} · ${sima(String(e.cim), v)}`
	};

	const szelesseg = { asztali: '100%', tablet: '820px', mobil: '390px' };
</script>

<svelte:head>
	<title>{piszkos ? '● ' : ''}Szerkesztő | OKOSspanyol admin</title>
</svelte:head>

<datalist id="admin-linkek">
	{#each tartalom.szakaszok.filter((s) => s.horgony) as s (s.id)}
		<option value="#{s.horgony}">{szakaszInfo[s.tipus].nev}</option>
	{/each}
	{#each tartalom.aloldalak as a (a.utvonal)}
		<option value="/{a.utvonal}">{sima(a.cim, v)}</option>
	{/each}
	{#each fajlok as f (f)}<option value={f}></option>{/each}
	<option value="/">Főoldal</option>
</datalist>
<datalist id="admin-kepek">
	{#each kepek as f (f)}<option value={f}></option>{/each}
</datalist>

<div class="admin" data-mobil={mobilNezet}>
	<header class="felso">
		<a class="marka" href="/" target="_blank" rel="noopener" title="A weboldal megnyitása új lapon">
			OKOS<em>spanyol</em> <span>szerkesztő</span>
		</a>

		<div class="allapot" aria-live="polite">
			{#if mentes}
				<span class="pont folyamatban"></span> Mentés…
			{:else if piszkos}
				<span class="pont piszkos"></span> Nem mentett módosítások
			{:else}
				<span class="pont kesz"></span> Mentve · {frissitveSzoveg}
			{/if}
		</div>

		<div class="eszkozok" role="group" aria-label="Előnézet mérete">
			{#each [['asztali', 'Asztali', '▭'], ['tablet', 'Tablet', '▯'], ['mobil', 'Mobil', '▮']] as [id, nev, ikon] (id)}
				<button
					type="button"
					class:aktiv={eszkoz === id}
					aria-pressed={eszkoz === id}
					title={nev}
					onclick={() => (eszkoz = id as typeof eszkoz)}><span aria-hidden="true">{ikon}</span> <span class="felirat">{nev}</span></button
				>
			{/each}
		</div>

		<div class="jobb">
			<button type="button" class="a-gomb mobil-valto" onclick={() => (mobilNezet = mobilNezet === 'szerkeszto' ? 'elonezet' : 'szerkeszto')}>
				{mobilNezet === 'szerkeszto' ? 'Előnézet' : 'Szerkesztés'}
			</button>
			{#if piszkos}
				<button type="button" class="a-gomb elvet" onclick={elvet}>Elvetés</button>
			{/if}
			<button type="button" class="a-gomb elsodleges" disabled={!piszkos || mentes || !data.vanAdatbazis} onclick={ment} title="Ctrl+S">
				{mentes ? 'Mentés…' : 'Mentés'}
			</button>
			<div class="menu">
				<button type="button" class="a-gomb" aria-expanded={menuNyitva} aria-label="További lehetőségek" onclick={() => (menuNyitva = !menuNyitva)}>⋯</button>
				{#if menuNyitva}
					<div class="menu-lista" role="menu">
						<a role="menuitem" href="/" target="_blank" rel="noopener">Weboldal megnyitása ↗</a>
						<button role="menuitem" type="button" onclick={exportalas}>Biztonsági mentés letöltése (JSON)</button>
						<button role="menuitem" type="button" onclick={() => importMezo?.click()}>Biztonsági mentés betöltése…</button>
						<button role="menuitem" type="button" disabled={!vanElozo} onclick={elozoVissza}>Előző mentés visszaállítása</button>
						<form method="POST" action="/admin/kilepes">
							<button role="menuitem" type="submit">Kilépés</button>
						</form>
					</div>
				{/if}
				<input bind:this={importMezo} type="file" accept="application/json,.json" hidden onchange={importalas} />
			</div>
		</div>
	</header>

	{#if !data.vanAdatbazis}
		<p class="savos-uzenet">
			Nincs adatbázis a Workerhez kötve (DB), ezért most nem lehet menteni. Helyben: <code>npm run db:helyi</code>, élesben a
			GitHub Action beállítja (lásd README).
		</p>
	{/if}

	<div class="test">
		<aside class="panel" bind:this={panel}>
			<nav class="fulek" aria-label="Szerkesztő részei">
				{#each fulek as f (f.id)}
					<button
						type="button"
						class:aktiv={ful === f.id}
						aria-current={ful === f.id ? 'page' : undefined}
						onclick={() => {
							ful = f.id;
							ujSzakaszValaszto = false;
						}}>{f.nev}</button
					>
				{/each}
			</nav>

			<div class="panel-tartalom">
				{#if ful === 'oldal'}
					<p class="bevezeto">
						Kattints egy szakaszra itt vagy az előnézetben a szerkesztéshez. Húzással vagy a nyilakkal átrendezheted,
						a szem ikonnal elrejtheted.
					</p>

					<ol class="szakaszok">
						{#each tartalom.szakaszok as sz, i (sz.id)}
							<li
								class="kartya"
								class:kivalasztott={kivalasztott === sz.id}
								class:rejtett={!sz.lathato}
								class:cel={cel === i && huzott !== null && huzott !== i}
								data-kartya={sz.id}
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
								<div class="kartya-fej">
									<span
										class="fogo"
										draggable="true"
										title="Húzd a mozgatáshoz"
										aria-hidden="true"
										ondragstart={(e) => {
											huzott = i;
											e.dataTransfer?.setData('text/plain', sz.id);
										}}
										ondragend={() => (huzott = cel = null)}>⠿</span
									>
									<button
										type="button"
										class="kartya-gomb"
										aria-expanded={kivalasztott === sz.id}
										onclick={() => valaszt(kivalasztott === sz.id ? null : sz.id)}
									>
										<span class="ikon" aria-hidden="true">{szakaszInfo[sz.tipus].ikon}</span>
										<span class="nevek">
											<span class="nev">{szakaszInfo[sz.tipus].nev}</span>
											<span class="alcim">{szakaszCim(i) || szakaszInfo[sz.tipus].leiras}</span>
										</span>
									</button>
									<button
										type="button"
										class="ikon-gomb"
										title={sz.lathato ? 'Elrejtés' : 'Megjelenítés'}
										aria-label={sz.lathato ? 'Elrejtés' : 'Megjelenítés'}
										aria-pressed={!sz.lathato}
										onclick={() => (sz.lathato = !sz.lathato)}>{sz.lathato ? '👁' : '⊘'}</button
									>
								</div>

								{#if kivalasztott === sz.id}
									<div class="kartya-test">
										<div class="kartya-muveletek">
											<button type="button" class="a-gomb kicsi" disabled={i === 0} onclick={() => mozgat(i, i - 1)}>↑ Feljebb</button>
											<button type="button" class="a-gomb kicsi" disabled={i === tartalom.szakaszok.length - 1} onclick={() => mozgat(i, i + 1)}>↓ Lejjebb</button>
											<button type="button" class="a-gomb kicsi" onclick={() => masol(i)}>⧉ Másolat</button>
											<button type="button" class="a-gomb kicsi" onclick={() => alapra(i)}>↺ Eredeti szöveg</button>
											<button type="button" class="a-gomb kicsi torles" onclick={() => torol(i)}>✕ Törlés</button>
										</div>

										{#if sz.tipus !== 'nyito' && sz.tipus !== 'zaro'}
											<SzovegMezo
												bind:ertek={sz.horgony}
												cimke="Horgony (link erre a részre)"
												sugo={sz.horgony
													? `A menüben így hivatkozhatsz rá: #${sz.horgony}${dupla(sz.horgony) ? ' — ⚠ ez a horgony kétszer szerepel!' : ''}`
													: 'Ha megadsz egy rövid nevet (pl. arak), a menüből ide lehet ugrani.'}
												sima
											/>
										{/if}

										<Urlap mezok={szakaszSemak[sz.tipus]} obj={sz.adat} />
									</div>
								{/if}
							</li>
						{/each}
					</ol>

					{#if ujSzakaszValaszto}
						<div class="valaszto">
							<div class="valaszto-fej">
								<strong>Új szakasz {kivalasztott ? 'a kiválasztott után' : 'az oldal végére'}</strong>
								<button type="button" class="ikon-gomb" aria-label="Bezárás" onclick={() => (ujSzakaszValaszto = false)}>✕</button>
							</div>
							<div class="tipusok">
								{#each Object.entries(szakaszInfo) as [tipus, info] (tipus)}
									<button type="button" class="tipus" onclick={() => hozzaad(tipus as SzakaszTipus)}>
										<span class="ikon" aria-hidden="true">{info.ikon}</span>
										<span><strong>{info.nev}</strong><small>{info.leiras}</small></span>
									</button>
								{/each}
							</div>
						</div>
					{:else}
						<button type="button" class="uj-szakasz" onclick={() => (ujSzakaszValaszto = true)}>+ Szakasz hozzáadása</button>
					{/if}

					<details class="sugo-doboz">
						<summary>Formázás a szövegekben</summary>
						<ul>
							<li><code>_¡Hola!_</code> → spanyol szöveg Lora dőlttel (az arculat szerint)</li>
							<li><code>**kiemelés**</code> → félkövér; címekben terrakotta</li>
							<li><code>[felirat](https://…)</code> → link (<code>#arak</code> a főoldal egy részére ugrik)</li>
							<li><code>{'{keresztnev}'}</code>, <code>{'{email}'}</code>… → az Alapadatok fülön megadott értékek</li>
							<li>Hosszú szövegben: <code>## Cím</code>, <code>- lista</code>, <code>&gt; kiemelt doboz</code>, üres sor = új bekezdés</li>
						</ul>
					</details>
				{:else if ful === 'alapadatok'}
					<p class="bevezeto">Ezek az adatok az egész oldalon megjelennek (a szövegekben változóként is használhatók).</p>
					<Urlap mezok={alapadatokSema} obj={tartalom} />
				{:else if ful === 'fejlec'}
					<Urlap mezok={fejlecLablecSema} obj={tartalom} />
				{:else if ful === 'aloldalak'}
					<Lista mezo={aloldalLista} lista={tartalom.aloldalak} onvalaszt={(i) => (aloldalIndex = i)} />
				{:else if ful === 'seo'}
					<Urlap mezok={seoSema} obj={tartalom} />
				{/if}
			</div>
		</aside>

		<section class="elonezet-terulet" aria-label="Élő előnézet">
			<div class="keret" style:width={szelesseg[eszkoz]} class:keretes={eszkoz !== 'asztali'}>
				<iframe bind:this={iframe} src="/admin/elonezet" title="A weboldal élő előnézete"></iframe>
			</div>
		</section>
	</div>

	{#if uzenet}
		<div class="toast {uzenet.tipus}" role={uzenet.tipus === 'hiba' ? 'alert' : 'status'}>
			{uzenet.szoveg}
			<button type="button" aria-label="Bezárás" onclick={() => (uzenet = null)}>✕</button>
		</div>
	{/if}
</div>

<svelte:window onclick={(e) => menuNyitva && !(e.target as HTMLElement).closest('.menu') && (menuNyitva = false)} />

<style>
	.admin {
		--felso: 60px;
		height: 100dvh;
		display: grid;
		grid-template-rows: auto auto 1fr;
		background: var(--a-hatter);
		color: var(--a-szoveg);
		font-family: var(--font-sans);
		font-size: 14px;
		line-height: 1.5;
	}

	/* ——— Felső sáv ——— */

	.felso {
		height: var(--felso);
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 0 16px;
		background: var(--a-feher);
		border-bottom: 1px solid var(--a-vonal);
	}

	.marka {
		font-weight: 700;
		font-size: 18px;
		letter-spacing: -0.02em;
		color: var(--a-szoveg);
		white-space: nowrap;
		text-decoration: none !important;
	}

	.marka em {
		font-family: var(--font-serif);
		color: var(--terrakotta);
		font-weight: 600;
	}

	.marka span {
		font-size: 13px;
		font-weight: 500;
		letter-spacing: 0;
		color: var(--a-halk);
		margin-left: 4px;
	}

	.allapot {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		color: var(--a-halk);
		min-width: 0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.pont {
		flex: none;
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.pont.kesz {
		background: var(--a-siker);
	}

	.pont.piszkos {
		background: var(--mustar);
	}

	.pont.folyamatban {
		background: var(--a-kiemelt);
		animation: pulzal 0.8s infinite alternate;
	}

	@keyframes pulzal {
		to {
			opacity: 0.3;
		}
	}

	.eszkozok {
		margin-left: auto;
		display: flex;
		padding: 3px;
		border-radius: 9px;
		background: var(--a-halvany);
	}

	.eszkozok button {
		padding: 5px 10px;
		border: 0;
		border-radius: 7px;
		background: none;
		font: inherit;
		font-size: 13px;
		color: var(--a-halk);
		cursor: pointer;
	}

	.eszkozok button.aktiv {
		background: var(--a-feher);
		color: var(--a-szoveg);
		box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
	}

	.jobb {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.mobil-valto {
		display: none;
	}

	.menu {
		position: relative;
	}

	.menu-lista {
		position: absolute;
		right: 0;
		top: calc(100% + 6px);
		z-index: 20;
		min-width: 280px;
		display: grid;
		padding: 6px;
		background: var(--a-feher);
		border: 1px solid var(--a-vonal);
		border-radius: 10px;
		box-shadow: 0 12px 32px rgb(0 0 0 / 0.12);
	}

	.menu-lista a,
	.menu-lista button {
		display: block;
		width: 100%;
		padding: 9px 12px;
		border: 0;
		border-radius: 6px;
		background: none;
		font: inherit;
		text-align: left;
		color: var(--a-szoveg);
		text-decoration: none !important;
		cursor: pointer;
	}

	.menu-lista :is(a, button):hover:not(:disabled) {
		background: var(--a-halvany);
	}

	.menu-lista button:disabled {
		opacity: 0.4;
		cursor: default;
	}

	.savos-uzenet {
		padding: 10px 16px;
		background: var(--a-figyelem-hatter);
		color: var(--a-figyelem);
		font-size: 13px;
	}

	/* ——— Test ——— */

	.test {
		min-height: 0;
		display: grid;
		grid-template-columns: minmax(360px, 440px) 1fr;
	}

	.panel {
		min-height: 0;
		display: grid;
		grid-template-rows: auto 1fr;
		background: var(--a-feher);
		border-right: 1px solid var(--a-vonal);
	}

	.fulek {
		display: flex;
		gap: 2px;
		padding: 8px 10px 0;
		border-bottom: 1px solid var(--a-vonal);
		overflow-x: auto;
		scrollbar-width: none;
	}

	.fulek button {
		flex: none;
		padding: 9px 8px 11px;
		border: 0;
		border-bottom: 2px solid transparent;
		background: none;
		font: inherit;
		font-size: 13px;
		font-weight: 600;
		color: var(--a-halk);
		cursor: pointer;
	}

	.fulek button.aktiv {
		color: var(--a-kiemelt);
		border-bottom-color: var(--a-kiemelt);
	}

	.panel-tartalom {
		min-height: 0;
		overflow-y: auto;
		padding: 16px 16px 80px;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		align-content: start;
		gap: 16px;
		scroll-padding-top: 12px;
	}

	.bevezeto {
		font-size: 13px;
		color: var(--a-halk);
	}

	/* Szakasz kártyák */

	.szakaszok {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 8px;
	}

	.kartya {
		border: 1px solid var(--a-vonal);
		border-radius: 10px;
		background: var(--a-feher);
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}

	.kartya:hover {
		border-color: #d6c7b8;
	}

	.kartya.kivalasztott {
		border-color: var(--a-kiemelt);
		box-shadow: 0 0 0 1px var(--a-kiemelt);
	}

	.kartya.rejtett .kartya-gomb {
		opacity: 0.45;
	}

	.kartya.cel {
		box-shadow: 0 -3px 0 var(--a-kiemelt);
	}

	.kartya-fej {
		display: flex;
		align-items: center;
		gap: 2px;
		padding-right: 6px;
	}

	.fogo {
		flex: none;
		width: 26px;
		padding: 14px 0;
		text-align: center;
		color: var(--a-halk);
		cursor: grab;
		user-select: none;
	}

	.kartya-gomb {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 4px;
		border: 0;
		background: none;
		font: inherit;
		text-align: left;
		color: inherit;
		cursor: pointer;
	}

	.ikon {
		flex: none;
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border-radius: 8px;
		background: var(--a-kiemelt-halvany);
		color: var(--a-kiemelt);
		font-size: 14px;
		font-weight: 700;
	}

	.nevek {
		min-width: 0;
		display: grid;
	}

	.nev {
		font-weight: 600;
	}

	.alcim {
		font-size: 12px;
		color: var(--a-halk);
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.ikon-gomb {
		flex: none;
		width: 32px;
		height: 32px;
		border: 0;
		border-radius: 7px;
		background: none;
		font-size: 15px;
		color: var(--a-halk);
		cursor: pointer;
	}

	.ikon-gomb:hover {
		background: var(--a-halvany);
	}

	.kartya-test {
		display: grid;
		gap: 16px;
		padding: 4px 16px 18px;
		border-top: 1px solid var(--a-vonal);
		padding-top: 14px;
	}

	.kartya-muveletek {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	:global(.a-gomb.kicsi) {
		min-height: 30px;
		padding: 0 10px;
		font-size: 12px;
	}

	.torles:hover {
		color: var(--a-hiba);
		border-color: var(--a-hiba);
	}

	.uj-szakasz {
		padding: 14px;
		border: 1.5px dashed var(--a-kiemelt);
		border-radius: 10px;
		background: none;
		font: inherit;
		font-weight: 600;
		color: var(--a-kiemelt);
		cursor: pointer;
	}

	.uj-szakasz:hover {
		background: var(--a-kiemelt-halvany);
	}

	.valaszto {
		display: grid;
		gap: 10px;
		padding: 14px;
		border: 1px solid var(--a-kiemelt);
		border-radius: 10px;
		background: var(--a-kiemelt-halvany);
	}

	.valaszto-fej {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tipusok {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 6px;
	}

	.tipus {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px;
		border: 1px solid var(--a-vonal);
		border-radius: 8px;
		background: var(--a-feher);
		font: inherit;
		text-align: left;
		color: inherit;
		cursor: pointer;
	}

	.tipus:hover {
		border-color: var(--a-kiemelt);
	}

	.tipus strong {
		display: block;
		font-size: 13px;
	}

	.tipus small {
		display: block;
		font-size: 11px;
		line-height: 1.35;
		color: var(--a-halk);
	}

	.sugo-doboz {
		font-size: 13px;
		padding: 12px 14px;
		border-radius: 10px;
		background: var(--a-halvany);
	}

	.sugo-doboz summary {
		font-weight: 600;
		cursor: pointer;
	}

	.sugo-doboz ul {
		margin: 10px 0 0;
		padding-left: 18px;
		display: grid;
		gap: 6px;
	}

	.sugo-doboz code {
		padding: 1px 5px;
		border-radius: 4px;
		background: var(--a-feher);
		font-size: 12px;
	}

	/* ——— Előnézet ——— */

	.elonezet-terulet {
		min-height: 0;
		display: grid;
		justify-items: center;
		padding: 16px;
		overflow: auto;
	}

	.keret {
		max-width: 100%;
		height: 100%;
		border-radius: 10px;
		overflow: hidden;
		background: var(--krem);
		box-shadow:
			0 0 0 1px var(--a-vonal),
			0 8px 30px rgb(58 42 34 / 0.08);
		transition: width 0.25s ease;
	}

	.keret.keretes {
		border-radius: 22px;
		box-shadow:
			0 0 0 8px #2f241e,
			0 16px 40px rgb(0 0 0 / 0.2);
		margin: 8px;
		height: calc(100% - 16px);
	}

	iframe {
		display: block;
		width: 100%;
		height: 100%;
		border: 0;
	}

	.toast {
		position: fixed;
		left: 50%;
		bottom: 24px;
		z-index: 100;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		gap: 12px;
		max-width: min(560px, calc(100vw - 32px));
		padding: 12px 12px 12px 18px;
		border-radius: 10px;
		background: var(--a-szoveg);
		color: #fff;
		font-weight: 500;
		box-shadow: 0 12px 32px rgb(0 0 0 / 0.2);
	}

	.toast.hiba {
		background: var(--a-hiba);
	}

	.toast button {
		border: 0;
		background: none;
		color: inherit;
		cursor: pointer;
		opacity: 0.8;
	}

	/* ——— Keskeny képernyő: szerkesztő és előnézet váltogatva ——— */

	@media (max-width: 1100px) {
		.eszkozok .felirat {
			display: none;
		}
	}

	@media (max-width: 860px) {
		.test {
			grid-template-columns: 1fr;
		}

		.admin[data-mobil='szerkeszto'] .elonezet-terulet,
		.admin[data-mobil='elonezet'] .panel {
			display: none;
		}

		.mobil-valto {
			display: inline-flex;
		}

		.allapot,
		.eszkozok,
		.elvet {
			display: none;
		}

		.jobb {
			margin-left: auto;
		}

		.marka span {
			display: none;
		}

		.elonezet-terulet {
			padding: 0;
		}

		.keret {
			width: 100% !important;
			border-radius: 0;
		}

		.tipusok {
			grid-template-columns: 1fr;
		}
	}
</style>
