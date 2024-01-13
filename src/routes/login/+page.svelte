<script>
	import { getStores, navigating, page, updated } from '$app/stores';

	import Layout from '../ui/Animation.svelte';
	/** @type {import('./$types').PageData} */
	export let data;

</script>

<Animation>
	<div class="w-auto">
		<div class="flex align-top justify-evenly mt-32 mx-32">
			<div class="flex-col items-start w-1/2 mr-8">
				<h1 class="text-4xl font-bold">CuteClash</h1>
				<br />
				<h2 class="h2">
					Welcome to CuteClash! Where pets from around the world engage in adorable head-to-head
					battles
				</h2>
			</div>
			<form class="w-1/2 flex justify-start" action="?/login" method="post">
				<div class="card p-4">
					<div class="p4 m-4">
						<label class="label">
							<span>Email</span>
							<input class="input" title="Email" type="text" placeholder="Email" name="email" />
						</label>
					</div>

					<div class="p4 m-4">
						<label class="label">
							<span>Password</span>
							<input
								class="input"
								title="Password"
								type="password"
								placeholder="Password"
								name="password"
							/>
						</label>
					</div>
					<div class="p-2 m-2 border-b-2">
						<button class=" w-full btn variant-filled-primary">Login</button>
					</div>
					<div class="flex justify-center">
						<a href="/signup" class="btn variant-filled-secondary"
							><button type="submit">Create a new account</button></a
						>
					</div>
				</div>
			</form>
		</div>
	</div>
</Animation>
