<script lang="ts">
	import { booking } from '$lib/config';
	import SzakaszCim from '$lib/components/SzakaszCim.svelte';

	const tudnivalok = [
		{
			cim: 'Helyszín',
			szoveg: `Online, ${booking.platform}. Kamera és mikrofon kell, telefonról is működik.`
		},
		{ cim: 'Fizetés', szoveg: `${booking.payment}.` },
		{
			cim: 'Lemondás, átfoglalás',
			szoveg: `Az óra előtt legkésőbb ${booking.freeCancellationHours} órával díjmentesen. Későbbi lemondás vagy meg nem jelenés esetén az alkalom elvész.`
		},
		{
			cim: 'Késés',
			szoveg:
				'Az óra a lefoglalt időpontban véget ér, ezért érdemes pár perccel korábban belépni.'
		},
		{ cim: 'Bérlet érvényessége', szoveg: `${booking.passValidity}.` }
	];
</script>

<section class="szakasz tudnivalok" aria-labelledby="tudnivalok-cim">
	<div class="wrap">
		<SzakaszCim id="tudnivalok-cim" elotag="Bueno saberlo">Foglalási tudnivalók</SzakaszCim>

		<dl>
			{#each tudnivalok as t (t.cim)}
				<div class="elem">
					<dt>{t.cim}</dt>
					<dd>{t.szoveg}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<style>
	dl {
		margin: clamp(32px, 4vw, 48px) 0 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
		gap: 0 clamp(24px, 4vw, 56px);
	}

	.elem {
		padding: 20px 0;
		border-top: 1px solid var(--vonal);
		display: grid;
		gap: 6px;
		align-content: start;
	}

	dt {
		font-weight: 600;
	}

	dd {
		margin: 0;
	}

	/* A szöveg első betűje nagybetű, ha a beállításban kisbetűvel kezdődik */
	dd::first-letter {
		text-transform: uppercase;
	}
</style>
