<script lang="ts">
	import { dev } from '$app/environment';
	import { booking, company, contact } from '$lib/config';
	import JogiOldal from '$lib/components/JogiOldal.svelte';
</script>

<JogiOldal
	cim="Általános szerződési feltételek"
	elotag="Condiciones generales"
	leiras="Az OKOSspanyol 30 perces online üzleti spanyol óráinak foglalási, fizetési és lemondási feltételei."
>
	{#if dev}
		<p class="megjegyzes">
			<strong>Sablon.</strong> A [szögletes zárójeles] részeket töltsd ki, és közzététel előtt
			ellenőriztesd jogi szakemberrel vagy a könyvelőddel — különösen az elállási jogról szóló részt.
			(Ez a doboz csak fejlesztés közben látszik.)
		</p>
	{/if}

	<h2>1. A szolgáltató</h2>
	<p>
		{company.name}, székhely: {company.address}, adószám: {company.taxNumber}, e-mail:
		{contact.email}.
	</p>

	<h2>2. A szolgáltatás</h2>
	<p>
		Élő, 30 perces, beszédközpontú online üzleti spanyol órák, amelyek a BGE üzleti spanyol szóbeli
		vizsgára és a spanyolországi munkavállalásra készítenek fel. Az órák A2-es szinttől ajánlottak,
		nyelvtanmagyarázatot és írásbeli felkészítést nem tartalmaznak. Helyszín: online,
		{booking.platform}.
	</p>

	<h2>3. Foglalás</h2>
	<p>
		Az órák az online foglalónaptárban, a szabad 30 perces időpontok közül foglalhatók. A foglalás
		a visszaigazoló e-mail megérkezésével jön létre.
	</p>

	<h2>4. Árak és fizetés</h2>
	<p>
		Az aktuális árak a főoldalon láthatók. Fizetés: {booking.payment}. [Alanyi adómentesség / ÁFA
		feltüntetése.]
	</p>

	<h2>5. Lemondás, átfoglalás, késés</h2>
	<p>
		Az óra az időpont előtt legkésőbb {booking.freeCancellationHours} órával díjmentesen lemondható vagy
		áttehető a visszaigazoló e-mailben lévő linkkel. Későbbi lemondás vagy meg nem jelenés esetén az
		alkalom elvész. Késés esetén az óra a lefoglalt időpontban véget ér.
	</p>

	<h2>6. Bérletek</h2>
	<p>A bérletek érvényessége: {booking.passValidity}. [A fel nem használt alkalmak sorsa.]</p>

	<h2>7. Elállási jog</h2>
	<p>
		[A fogyasztót megillető 14 napos elállási jog és annak elvesztése, ha a szolgáltatás a
		kifejezett kérésére a határidő letelte előtt teljesül — szakemberrel pontosítandó.]
	</p>

	<h2>8. Panaszkezelés</h2>
	<p>
		Panaszodat a {contact.email} címre küldheted, 30 napon belül írásban válaszolok. Ha nem sikerül
		megegyeznünk, a lakóhelyed szerint illetékes békéltető testülethez fordulhatsz.
	</p>

	<p class="apro halk">Hatályos: [dátum]</p>
</JogiOldal>
