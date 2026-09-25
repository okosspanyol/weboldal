<!--
	Vízszintes OKOSspanyol logó. Ha a `static/` mappában van logo-hosszu.png (vagy az adminban
	megadott másik kép), azt mutatja; ha nincs, betűkből rakja ki.
-->
<script lang="ts">
	import { oldal } from '$lib/tartalom/kontextus';
	import { kepElerheto } from '$lib/tartalom/szoveg';

	let { meret = 'normal', csakBetu = false }: { meret?: 'normal' | 'nagy'; csakBetu?: boolean } =
		$props();

	const o = oldal();
	const kep = $derived(!csakBetu && kepElerheto(o.t.fejlec.logoKep) ? o.t.fejlec.logoKep : '');
</script>

{#if kep}
	<img class="logo-kep {meret}" src={kep} alt={o.t.fejlec.logoAlt || 'OKOSspanyol'} />
{:else}
	<span class="logo {meret}" role="img" aria-label={o.t.fejlec.logoAlt || 'OKOSspanyol'}>
		<span class="okos" aria-hidden="true">OKOS</span><span class="spanyol" aria-hidden="true"
			>spanyol</span
		>
	</span>
{/if}

<style>
	.logo-kep {
		display: block;
		height: 44px;
		width: auto;
		max-width: min(240px, 55vw);
		object-fit: contain;
		object-position: left center;
	}

	.logo-kep.nagy {
		height: 52px;
	}

	.logo {
		display: inline-flex;
		align-items: baseline;
		line-height: 1;
		white-space: nowrap;
		font-size: 26px;
	}

	.nagy {
		font-size: 32px;
	}

	.okos {
		font-family: var(--font-sans);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--barna);
	}

	.spanyol {
		font-family: var(--font-serif);
		font-style: italic;
		font-weight: 600;
		color: var(--terrakotta);
		margin-left: 0.04em;
		font-size: 1.08em;
	}
</style>
