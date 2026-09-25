<script lang="ts">
	import Aloldal from '$lib/components/Aloldal.svelte';

	let { data } = $props();
</script>

<Aloldal aloldal={data.aloldal} />
