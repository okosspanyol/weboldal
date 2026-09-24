<!-- Böngészőfül címe, keresőbe szánt leírás és a megosztási előnézet (Facebook, Messenger). -->
<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/config';

	let {
		cim = site.title,
		leiras = site.description,
		megosztas = site.shareText,
		indexelheto = true
	}: { cim?: string; leiras?: string; megosztas?: string; indexelheto?: boolean } = $props();

	const cimLink = $derived(site.url + page.url.pathname);
	const kep = `${site.url}/og-kep.png`;
</script>

<svelte:head>
	<title>{cim}</title>
	<meta name="description" content={leiras} />
	<link rel="canonical" href={cimLink} />
	{#if !indexelheto}<meta name="robots" content="noindex" />{/if}

	<meta property="og:type" content="website" />
	<meta property="og:locale" content="hu_HU" />
	<meta property="og:site_name" content="OKOSspanyol" />
	<meta property="og:url" content={cimLink} />
	<meta property="og:title" content={megosztas} />
	<meta property="og:description" content={leiras} />
	<meta property="og:image" content={kep} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="OKOSspanyol – üzleti spanyol beszédgyakorlás online" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
