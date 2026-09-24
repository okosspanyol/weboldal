<script lang="ts">
	import { company, contact } from '$lib/config';
	import JogiOldal from '$lib/components/JogiOldal.svelte';
</script>

<JogiOldal
	cim="Impresszum"
	elotag="Aviso legal"
	leiras="Az OKOSspanyol weboldal üzemeltetőjének adatai."
>
	<ul>
		<li>Üzemeltető: {company.name}</li>
		<li>Székhely: {company.address}</li>
		<li>Adószám: {company.taxNumber}</li>
		<li>Nyilvántartási szám: {company.registration}</li>
		<li>E-mail: {contact.email}</li>
		<li>Tárhelyszolgáltató: {company.hosting}</li>
	</ul>
</JogiOldal>
