<!--
	Vízszintes OKOSspanyol logó betűkből.
	Ha elkészül a vízszintes logó képfájlként, tedd a `static/` mappába,
	és ezt a komponenst cseréld egy <img src="/logo-vizszintes.svg" alt="OKOSspanyol" />-ra.
-->
<script lang="ts">
	let { meret = 'normal' }: { meret?: 'normal' | 'nagy' } = $props();
</script>

<span class="logo {meret}" aria-label="OKOSspanyol">
	<span class="okos" aria-hidden="true">OKOS</span><span class="spanyol" aria-hidden="true"
		>spanyol</span
	>
</span>

<style>
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
