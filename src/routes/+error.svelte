<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Nem található | OKOSspanyol</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="wrap hiba">
	<p class="es elotag">¡Uy! Error {page.status}</p>
	<h1>Ez az oldal nem található.</h1>
	<p>Lehet, hogy elírás van a címben, vagy az oldal már nem létezik.</p>
	<a class="gomb gomb-masodlagos" href={resolve('/')}>Vissza a főoldalra</a>
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
