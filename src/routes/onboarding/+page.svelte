<script lang="ts">
	/** @type {import('./$types').ActionData} */
	export let form;

	import type { PageData } from '$./types';
	export let data: PageData;
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import Layout from '../ui/+layout.svelte';
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';

	$: successfulUploads = 0;
	$: animalType = '';

	const toastStore = getToastStore();
	const createToast = (message: string) => {
		const t: ToastSettings = {
			message
		};
		toastStore.trigger(t);
		return '';
	};

	$: fileInputs = [0]; // Initialize with one file input
	$: numOfFileInputs = fileInputs.length;
	function addPhoto() {
		fileInputs.push(fileInputs.length); // Add a new file input
		fileInputs = fileInputs; // Trigger reactivity
		numOfFileInputs = fileInputs.length; // Trigger reactivity
	}

	const removePhoto = (index: number) => {
		fileInputs.splice(index, 1); // Remove the file input
		fileInputs = fileInputs; // Trigger reactivity
		numOfFileInputs = fileInputs.length; // Trigger reactivity
	};

	const uploadPhoto = async (event) => {
		const formData = new FormData(event.target);
		const totalPhotos = Array.from(formData.entries()).length;
		console.log('this?');
		console.log(totalPhotos);
		if (totalPhotos === 0) {
			return;
		}
		const response = await fetch(event.target.action, { method: 'POST', body: formData });

		const res = await response.json();
		const data = JSON.parse(res.data);
		if (data[1]) {
			createToast(data[1]);
			successfulUploads += data[2];
		} else {
			createToast('Photos uploaded successfully');
			successfulUploads += data[2];
		}
	};
</script>

<Layout>
	<div class="flex justify-center p-4 m-4 w-full">
		<div class="w-3/5">
			<Stepper buttonCompleteType="submit">
				<Step buttonNextType="submit">
					<svelte:fragment slot="header">Step 2: Enter pet information</svelte:fragment>
					<div class="flex justify-center card p-4 w-full text-token space-y-4">
						<label class="label">
							<span>Pet's name</span>
							<input class="input" type="text" placeholder="Hachi" name="pet-name" />
							<label class="label">
								<span>Type of animal</span>
								<select class="select" bind:value={animalType}>
									<option value="1">Dog</option>
									<option value="2">Cat</option>
									<option value="3">Other</option>
								</select>
							</label>
							{#if animalType === 'dog'}
								
							{/if}
							<label class="label">
								<span>Textarea</span>
								<textarea
									class="textarea"
									rows="4"
									placeholder="Akita fluffball with fur the color of sunset, eyes sparkling like melted honey..."
								/>
							</label>
						</label>
					</div>
				</Step>
				<form action="?/uploadPhoto" method="post" on:submit|preventDefault={uploadPhoto}>
					<Step buttonNextType="submit">
						<svelte:fragment slot="header">Step 1: Upload pictures of your pet!</svelte:fragment>
						{#if successfulUploads === 5}
							<div class="flex justify-center">
								<h2 class="h2">You have uploaded 5 photos.</h2>
							</div>
						{:else}
							<div class="flex flex-col justify-center">
								{#if numOfFileInputs < 5}
									<button type="button" on:click={addPhoto} class="btn variant-filled-primary"
										>Add photo</button
									>
								{:else}
									<button type="button" class="btn variant-filled-warning" disabled
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
										<button type="button" on:click={() => removePhoto(index)}>X</button>
									</div>
								{/each}
							</div>
						{/if}
					</Step>
				</form>

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
