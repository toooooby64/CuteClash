<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const contests = data.entry1Data;
</script>

<div class="grid grid-cols-2 gap-2">
	{#each contests as contest (contests.contest.id)}
		<div class="card p-4 m-4">
			<div class="flex justify-evenly items-center">
				<div class="flex flex-col">
					<img class="w-64" src={contest.photoUrls[0]} alt="" />
				</div>
				<div class="flex flex-col">
					<h1 class="text-2xl font-bold">Pet's Name</h1>
					<h1 class="text-xl">{contest.pet_name}</h1>
				</div>
				<div>
					<a href="/createEntry/{contest.contest_id}">
						<button class="btn variant-filled-primary">Join Contest</button>
					</a>
				</div>
			</div>
		</div>
	{/each}
</div>
