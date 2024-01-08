<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import Layout from '../ui/+layout.svelte';
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	const createToast = (message: string) => {
		const t: ToastSettings = {
			message
		};
		toastStore.trigger(t);
	};
	$: fileInputs = [0]; // Initialize with one file input
	$: numOfFileInputs = fileInputs.length;
	function addPhoto() {
		fileInputs.push(fileInputs.length); // Add a new file input
		fileInputs = fileInputs; // Trigger reactivity
		numOfFileInputs = fileInputs.length; // Trigger reactivity
	}
</script>

<Layout>
	<div class="flex justify-center p-4 m-4 w-full">
		<div class="w-3/5">
			<Stepper buttonCompleteType="submit">
				<Step buttonNextType="submit">
					<svelte:fragment slot="header">Step 1: Upload pictures of your pet!</svelte:fragment>
					<div class="flex flex-col justify-center">
						{#if numOfFileInputs < 5}
							<button type="button" on:click={addPhoto} class="btn variant-filled-primary"
								>Add photo</button
							>
						{:else}
							<button type="button" on:click={addPhoto} class="btn variant-filled-warning" disabled
								>Add photo</button
							>
							{createToast('Only 5 photos are allowed')}
						{/if}

						{#each fileInputs as _, index}
							<div class="flex justify-between">
								<input
									class=" m-1 w-1/2 input"
									type="file"
									id={`file-${index}`}
									name={`file-${index}`}
								/>
								<button>X</button>
							</div>
						{/each}
					</div>
				</Step>

				<Step buttonNextType="submit">
					<svelte:fragment slot="header">Step 2: Enter a user name</svelte:fragment>
					<div class="flex justify-center">
						<label class="label">
							<span>User name</span>
							<input class="input" type="text" placeholder="Type here" name="username" />
						</label>
					</div>
				</Step>

				<form action="?/createUser" method="post">
					<Step buttonBackType="submit">
						<svelte:fragment slot="header">Step 3: Enter your password</svelte:fragment>
						<div class="flex justify-center">
							<label class="label">
								<span>Password</span>
								<input class="input" type="password" placeholder="Type here" name="password" />
							</label>
						</div>
					</Step>
				</form>
			</Stepper>
		</div>
	</div>
</Layout>
