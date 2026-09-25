<!--
	A szerkesztő jobb oldalán látható élő előnézet (iframe-ben, hogy a mobil nézet is valódi legyen).
	A tartalmat a szerkesztő küldi postMessage-dzsel; egy szakaszra kattintva a szerkesztő azt nyitja meg.
-->
<script lang="ts">
	import { onMount, tick } from 'svelte';
	import OldalKeret from '$lib/components/OldalKeret.svelte';
	import Szakaszok from '$lib/components/Szakaszok.svelte';
	import Aloldal from '$lib/components/Aloldal.svelte';
	import { szakaszInfo } from '$lib/admin/semak';
	import { osszefesul } from '$lib/tartalom/osszefesul';
	import { tartalomBeallitasa } from '$lib/tartalom/kontextus';
	import type { Tartalom } from '$lib/tartalom/tipusok';

	let tartalom = $state<Tartalom | null>(null);
	let aloldalIndex = $state<number | null>(null);
	let kivalasztott = $state<string | null>(null);

	tartalomBeallitasa(() => tartalom!);

	const aloldal = $derived(
		aloldalIndex !== null && tartalom ? (tartalom.aloldalak[aloldalIndex] ?? null) : null
	);

	function kuld(uzenet: unknown) {
		parent.postMessage(uzenet, location.origin);
	}

	async function gorget(id: string | null) {
		await tick();
		if (!id) return;
		document
			.querySelector(`[data-szakasz-id="${CSS.escape(id)}"]`)
			?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	onMount(() => {
		function uzenet(e: MessageEvent) {
			if (e.origin !== location.origin || e.source !== parent) return;
			const u = e.data;
			if (u?.tipus === 'tartalom') {
				const elso = tartalom === null;
				tartalom = osszefesul(u.tartalom);
				const ujAloldal = typeof u.aloldal === 'number' ? u.aloldal : null;
				if (ujAloldal !== aloldalIndex) {
					aloldalIndex = ujAloldal;
					scrollTo({ top: 0 });
				}
				if (elso) gorget(kivalasztott);
			} else if (u?.tipus === 'kivalaszt') {
				kivalasztott = u.id;
				if (u.gorgess) gorget(u.id);
			}
		}

		function kattintas(e: MouseEvent) {
			const cel = e.target as HTMLElement;
			const szakasz = cel.closest<HTMLElement>('[data-szakasz-id]');
			if (szakasz) {
				kivalasztott = szakasz.dataset.szakaszId!;
				kuld({ tipus: 'kattintas', id: kivalasztott });
			}

			// Az előnézetből ne navigáljunk el; a főoldalon belüli horgonyokra görgessünk.
			const a = cel.closest<HTMLAnchorElement>('a[href]');
			if (!a || a.hasAttribute('data-video')) return;
			e.preventDefault();
			const hash = new URL(a.href, location.href).hash;
			const url = new URL(a.href, location.href);
			if (url.origin === location.origin && url.pathname === '/' && hash) {
				document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' });
			}
		}

		const bekuldes = (e: SubmitEvent) => e.preventDefault();

		addEventListener('message', uzenet);
		document.addEventListener('click', kattintas, true);
		document.addEventListener('submit', bekuldes, true);
		kuld({ tipus: 'kesz' });
		return () => {
			removeEventListener('message', uzenet);
			document.removeEventListener('click', kattintas, true);
			document.removeEventListener('submit', bekuldes, true);
		};
	});
</script>

<svelte:head>
	<title>Előnézet</title>
	{#if kivalasztott}
		{@html `<style>[data-szakasz-id="${kivalasztott.replace(/[^\w-]/g, '')}"]{outline:3px solid var(--mustar);outline-offset:-3px}</style>`}
	{/if}
</svelte:head>

{#if tartalom}
	<OldalKeret>
		{#if aloldal}
			<Aloldal {aloldal} />
		{:else}
			<Szakaszok elonezet />
		{/if}
	</OldalKeret>
{:else}
	<p class="toltes">Előnézet betöltése…</p>
{/if}

<!-- A szakaszok neve rámutatáskor, hogy látszódjon, mire kattintasz. -->
{#if tartalom && !aloldal}
	{@html `<style>${tartalom.szakaszok
		.map(
			(s) =>
				`[data-szakasz-id="${s.id.replace(/[^\w-]/g, '')}"]:hover::before{content:${JSON.stringify(szakaszInfo[s.tipus].nev + ' — kattints a szerkesztéshez')}}`
		)
		.join('')}</style>`}
{/if}

<style>
	:global(.elonezet-szakasz) {
		position: relative;
		cursor: pointer;
	}

	:global(.elonezet-szakasz:hover) {
		outline: 2px dashed var(--terrakotta);
		outline-offset: -2px;
	}

	:global(.elonezet-szakasz:hover::before) {
		position: absolute;
		z-index: 30;
		top: 8px;
		left: 8px;
		padding: 4px 10px;
		border-radius: 4px;
		background: var(--barna);
		color: var(--krem);
		font: 600 12px/1.4 var(--font-sans);
		pointer-events: none;
	}

	.toltes {
		padding: 40px;
		text-align: center;
		color: var(--barna-halk);
	}
</style>
