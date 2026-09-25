<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Belépés | OKOSspanyol admin</title>
</svelte:head>

<main class="belepes">
	<form method="POST" class="doboz">
		<p class="logo">OKOS<em>spanyol</em> <span>admin</span></p>
		{#if !data.vanJelszo}
			<p class="uzenet hiba">
				Még nincs beállítva az admin jelszó. Add meg a Cloudflare-en a Worker <code>ADMIN_JELSZO</code>
				titkos változójában (vagy GitHub Secretként, lásd README).
			</p>
		{/if}
		<label>
			<span>Jelszó</span>
			<!-- svelte-ignore a11y_autofocus -->
			<input type="password" name="jelszo" autocomplete="current-password" required autofocus />
		</label>
		{#if form?.hiba}<p class="uzenet hiba" role="alert">Hibás jelszó.</p>{/if}
		<button type="submit" class="a-gomb elsodleges">Belépés</button>
		<a href="/" class="vissza">← Vissza a weboldalra</a>
	</form>
</main>

<style>
	.belepes {
		min-height: 100vh;
		display: grid;
		place-items: center;
		padding: 16px;
		background: var(--krem);
	}

	.doboz {
		width: min(100%, 380px);
		display: grid;
		gap: 18px;
		padding: 32px;
		background: #fff;
		border-radius: 14px;
		box-shadow: 0 12px 40px rgb(58 42 34 / 0.12);
	}

	.logo {
		font-weight: 700;
		font-size: 24px;
		letter-spacing: -0.02em;
	}

	.logo em {
		font-family: var(--font-serif);
		color: var(--terrakotta);
		font-weight: 600;
	}

	.logo span {
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--a-halk);
		margin-left: 6px;
	}

	label {
		display: grid;
		gap: 6px;
		font-size: 14px;
		font-weight: 600;
	}

	input {
		padding: 11px 12px;
		border: 1px solid var(--a-vonal);
		border-radius: 8px;
		font: inherit;
	}

	.uzenet {
		font-size: 14px;
		padding: 10px 12px;
		border-radius: 8px;
	}

	.vissza {
		font-size: 13px;
		justify-self: center;
	}
</style>
