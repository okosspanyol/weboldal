<script lang="ts">
	import { dev } from '$app/environment';
	import { booking, company, contact } from '$lib/config';
	import JogiOldal from '$lib/components/JogiOldal.svelte';
</script>

<JogiOldal
	cim="Adatkezelési tájékoztató"
	elotag="Protección de datos"
	leiras="Az OKOSspanyol adatkezelési tájékoztatója: milyen adatokat kezelek foglaláskor és hírlevél-feliratkozáskor, és milyen jogaid vannak."
>
	{#if dev}
		<p class="megjegyzes">
			<strong>Sablon.</strong> A [szögletes zárójeles] részeket töltsd ki, és közzététel előtt
			ellenőriztesd jogi szakemberrel vagy a könyvelőddel. (Ez a doboz csak fejlesztés közben látszik.)
		</p>
	{/if}

	<h2>1. Az adatkezelő</h2>
	<ul>
		<li>Név: {company.name}</li>
		<li>Székhely: {company.address}</li>
		<li>E-mail: {contact.email}</li>
	</ul>

	<h2>2. Milyen adatokat kezelek, és miért?</h2>
	<p>
		<strong>Időpontfoglalás.</strong> A foglaláshoz a neved, az e-mail címed és a rövid leírásod
		(vizsgára vagy munkához készülsz) szükséges. Ezekkel az adatokkal tudom visszaigazolni a
		foglalást, elküldeni az online óra linkjét és az emlékeztetőt. Jogalap: a szerződés teljesítése.
		Megőrzés: [pl. az utolsó óra után X évig, illetve a számviteli jogszabályok szerinti ideig].
	</p>
	<p>
		<strong>Hírlevél és értesítés.</strong> Ha feliratkozol, a keresztneved, az e-mail címed és a
		bejelölt érdeklődési köröd kerül tárolásra, hogy értesíthesselek az új tananyagokról, és hasznos
		tippeket küldhessek. Jogalap: a hozzájárulásod, amelyet bármikor visszavonhatsz (minden levél
		alján van leiratkozó link). Megőrzés: a leiratkozásig.
	</p>
	<p>
		<strong>Kapcsolatfelvétel.</strong> Ha e-mailben vagy közösségi médián keresztül írsz, a
		leveledben megadott adatokat csak a válaszadáshoz használom. Megőrzés: [pl. az ügy lezárásáig].
	</p>

	<h2>3. Adatfeldolgozók</h2>
	<p>Az adatokat az alábbi szolgáltatók segítségével kezelem:</p>
	<ul>
		<li>Foglalórendszer: [szolgáltató neve, székhelye]</li>
		<li>Online óra: {booking.platform}</li>
		<li>Hírlevélküldő: [szolgáltató neve, székhelye]</li>
		<li>Tárhely: {company.hosting}</li>
	</ul>

	<h2>4. Sütik</h2>
	<p>
		Ez a weboldal nem használ követő vagy hirdetési sütiket, és a betűtípusokat is saját tárhelyről
		tölti be. Ha az oldalba beágyazott foglalónaptárt használod, annak szolgáltatója saját sütiket
		helyezhet el — ezekről a szolgáltató tájékoztatója ad információt.
	</p>

	<h2>5. A jogaid</h2>
	<p>Bármikor kérheted, hogy:</p>
	<ul>
		<li>tájékoztassalak a rólad kezelt adatokról (hozzáférés),</li>
		<li>javítsam a pontatlan adatokat (helyesbítés),</li>
		<li>töröljem az adataidat (törlés),</li>
		<li>korlátozzam az adatkezelést,</li>
		<li>géppel olvasható formában kiadjam az adataidat (adathordozhatóság),</li>
		<li>és tiltakozhatsz az adatkezelés ellen, illetve visszavonhatod a hozzájárulásodat.</li>
	</ul>
	<p>
		Kérésedet a {contact.email} címre küldheted, és legkésőbb egy hónapon belül válaszolok.
	</p>

	<h2>6. Jogorvoslat</h2>
	<p>
		Ha úgy érzed, hogy megsértettem a személyes adatok védelméhez fűződő jogodat, panaszt tehetsz a
		Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH, 1055 Budapest, Falk Miksa utca
		9–11., <a href="https://naih.hu" rel="noopener">naih.hu</a>), vagy bírósághoz fordulhatsz.
	</p>

	<p class="apro halk">Hatályos: [dátum]</p>
</JogiOldal>
