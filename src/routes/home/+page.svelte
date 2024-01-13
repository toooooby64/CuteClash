<script lang="ts">
	import Layout from '../+layout.svelte';
	import Animation from '../ui/Animation.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>
	<Animation>

		<h1>You are logged in as {data.session?.user.email}</h1>
	</Animation>
