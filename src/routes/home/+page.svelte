<script lang="ts">
	import Layout from '../+layout.svelte';
	import Animation from '../ui/Animation.svelte';
	import type { PageData } from './$types';
	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	export let data: PageData;
</script>

<Animation>
	<h1>You are logged in as {data.session?.user.email}</h1>


	<a href="../createEntry"> <button type="button" class="btn variant-filled-primary">Create Entry</button></a>
	<a href="../joinContest"> <button type="button" class="btn variant-filled-primary">Join Contest</button></a>


</Animation>
