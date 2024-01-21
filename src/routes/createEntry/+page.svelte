<script lang="ts">
	import type { PageData } from '../createEnty/$types';
	import Animation from '../ui/Animation.svelte';

	export let data: PageData;

	const urls = data.body.urls.body.urls;
	const petName = data.body.petInfo.body.data[0].pet_name;
	const breed = data.body.petInfo.body.data[0].breed;
	const description = data.body.petInfo.body.data[0].description;
</script>

<Animation>
	<form class="flex mt-10 justify-center" action="?/createEntry" method="post">
		<div class="card p-4 w-2/3">
			<h3 class="h3 m-4">
				Select which photos you would like to use, and verify pet information is correct.
			</h3>
			<div class="flex justify-evenly flex-row">
				{#each urls as url, index}
					<label class="flex items-center space-x-2">
						<input
							class="checkbox"
							type="checkbox"
							checked
							name={`file-${index}`}
							value={url.data.publicUrl}
						/>
						<label for={`file-${index}`}>
							<img class="object-contian h-56" src={url.data.publicUrl} alt="" />
						</label>
					</label>
				{/each}
			</div>

			<div class="w-auto flex justify-center">
				<div class="p4 m-4 w-2/5">
					<label class="label">
						<span>Pet's Name</span>
						<input
							class="input"
							title="Pet's Name"
							type="text"
							value={petName}
							name="petname"
							disabled
						/>
					</label>
				</div>
			</div>

			<div class="w-auto flex justify-center">
				<div class="p4 m-4 w-2/5">
					<label class="label">
						<span>Breed</span>
						<input
							class="input"
							title="Pet's Name"
							type="text"
							value={breed}
							name="breed"
							disabled
						/>
					</label>
				</div>
			</div>
			<div class="w-auto flex justify-center">
				<div class="p4 m-4 w-2/5">
					<label class="label">
						<span>Description</span>
						<textarea class="textarea" rows="4" value={description} name="description" disabled />
					</label>
				</div>
			</div>
			<div class="p-2 m-2">
				<button class=" w-full btn variant-filled-primary">Create Entry</button>
			</div>
		</div>
	</form>
</Animation>
