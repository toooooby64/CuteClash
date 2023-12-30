<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full flex justify-center">
	<div class="flex flex-row align-top justify-center mt-32 w-1/2">
		<div>
			<h1 class="text-4xl font-bold">CuteClash</h1>
			<h2 class="h2">
				Welcome to CuteClash! Where pets from around the world engage in adorable head-to-head
				battles
			</h2>
		</div>
		<div class="w-full">
			<div class="card p-4">
				<div class="p4 m-4">
					<label class="label">
						<span>Email</span>
						<input class="input" title="Email" type="text" placeholder="Email" />
					</label>
				</div>

				<div class="p4 m-4">
					<label class="label">
						<span>Password</span>
						<input class="input" title="Password" type="password" placeholder="Password" />
					</label>
				</div>
				<div class="p-2 m-2 border-b-2">
					<button class=" w-full btn variant-filled-primary">Login</button>
				</div>
				<div class="flex justify-center">
					<a href="/signup" class="btn variant-filled-secondary">Create a new account</a>
				</div>
			</div>
		</div>
	</div>
</div>
