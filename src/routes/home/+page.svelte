<script lang="ts">
	import Layout from '../+layout.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Layout>
	<h1>You are logged in as {data.session?.user.email}</h1>
</Layout>
