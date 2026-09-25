<!-- Böngészőfül címe, keresőbe szánt leírás és a megosztási előnézet (Facebook, Messenger). -->
<script lang="ts">
	import { page } from '$app/state';
	import { oldal } from '$lib/tartalom/kontextus';

	let {
		cim = '',
		leiras = '',
		megosztas = '',
		indexelheto = true
	}: { cim?: string; leiras?: string; megosztas?: string; indexelheto?: boolean } = $props();

	const o = oldal();
	const a = $derived(o.t.altalanos);
	const gyoker = $derived((a.sajatDomain.trim() || page.url.origin).replace(/\/$/, ''));
	const cimLink = $derived(gyoker + page.url.pathname);
	const kep = $derived(/^https?:/.test(a.ogKep) ? a.ogKep : gyoker + a.ogKep);
	const leirasSzoveg = $derived(o.sima(leiras || a.leiras));
</script>

<svelte:head>
	<title>{o.sima(cim || a.oldalCim)}</title>
	<meta name="description" content={leirasSzoveg} />
	<link rel="canonical" href={cimLink} />
	{#if !indexelheto}<meta name="robots" content="noindex" />{/if}

	<meta property="og:type" content="website" />
	<meta property="og:locale" content="hu_HU" />
	<meta property="og:site_name" content="OKOSspanyol" />
	<meta property="og:url" content={cimLink} />
	<meta property="og:title" content={o.sima(megosztas || a.megosztasSzoveg)} />
	<meta property="og:description" content={leirasSzoveg} />
	{#if a.ogKep}
		<meta property="og:image" content={kep} />
		<meta property="og:image:alt" content={o.sima(a.ogKepAlt)} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
