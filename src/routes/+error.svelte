<script lang="ts">
	import { page } from '$app/state';
	import { oldal } from '$lib/tartalom/kontextus';

	const o = oldal();
	const h = $derived(o.t.hibaoldal);
	const v = $derived({ status: String(page.status) });
</script>

<svelte:head>
	<title>{o.sima(h.cim, v)} | OKOSspanyol</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="wrap hiba">
	<p class="es elotag">{@html o.sor(h.elotag, v)}</p>
	<h1>{@html o.sor(h.cim, v)}</h1>
	<p>{@html o.sor(h.szoveg, v)}</p>
	<a class="gomb gomb-masodlagos" href="/">{o.sima(h.gomb, v)}</a>
</section>

<style>
	.hiba {
		padding-block: var(--szakasz-ter);
		display: grid;
		gap: 20px;
		justify-items: start;
		max-width: 760px;
	}

	.elotag {
		font-size: 1.25rem;
		color: var(--terrakotta-sotet);
	}
</style>
