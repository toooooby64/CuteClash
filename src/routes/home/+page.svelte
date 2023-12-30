<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>


<h1> You are logged in as {data.session?.user.email}</h1>