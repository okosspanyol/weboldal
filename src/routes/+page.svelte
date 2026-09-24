<script lang="ts">
	import Fejadatok from '$lib/components/Fejadatok.svelte';
	import Nyito from '$lib/szakaszok/Nyito.svelte';
	import Rolam from '$lib/szakaszok/Rolam.svelte';
	import Orak from '$lib/szakaszok/Orak.svelte';
	import OraMenete from '$lib/szakaszok/OraMenete.svelte';
	import KinekSzol from '$lib/szakaszok/KinekSzol.svelte';
	import Arak from '$lib/szakaszok/Arak.svelte';
	import Foglalas from '$lib/szakaszok/Foglalas.svelte';
	import Tudnivalok from '$lib/szakaszok/Tudnivalok.svelte';
	import Szintfelmero from '$lib/szakaszok/Szintfelmero.svelte';
	import IngyenesAnyagok from '$lib/szakaszok/IngyenesAnyagok.svelte';
	import Gyik from '$lib/szakaszok/Gyik.svelte';
	import Hirlevel from '$lib/szakaszok/Hirlevel.svelte';
	import ZaroFelhivas from '$lib/szakaszok/ZaroFelhivas.svelte';
</script>

<Fejadatok />

<!-- Egyetlen görgethető oldal, a szakaszok sorrendje itt változtatható. -->
<Nyito />
<Rolam />
<Orak />
<OraMenete />
<KinekSzol />
<Arak />
<Foglalas />
<Tudnivalok />
<Szintfelmero />
<IngyenesAnyagok />
<Gyik />
<Hirlevel />
<ZaroFelhivas />
