<!-- This has to do
	with the fact that lockedState variable is not being set 
	back to true after the first step is completed. 
-->
<script lang="ts">
	import Layout from '../ui/+layout.svelte';
</script>

<Layout>
	<form class="flex mt-32 justify-center" action="" method="post">
		<div class="card p-4">
			<div class="p4 m-4">
				<label class="label">
					<span>Email</span>
					<input class="input" title="Email" type="text" placeholder="johndoe@email.com" name="email" />
				</label>
			</div>

			<div class="p4 m-4">
				<label class="label">
					<span>Username</span>
					<input class="input" title="text" type="text" placeholder="Toooooby" name="username" />
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
				<button class=" w-full btn variant-filled-primary">Create Account</button>
			</div>
			<div class="flex justify-center">
				<a href="/signup" class="btn variant-filled-secondary"
					><button type="submit">Login</button></a
				>
			</div>
		</div>
	</form>
</Layout>
