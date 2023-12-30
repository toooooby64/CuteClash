<script lang="ts">
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
		<form class="w-full" action="?/login" method="post">
			<div class="card p-4">
				<div class="p4 m-4">
					<label class="label">
						<span>Email</span>
						<input class="input" title="Email" type="text" placeholder="Email" name="email"/>
					</label>
				</div>

				<div class="p4 m-4">
					<label class="label">
						<span>Password</span>
						<input class="input" title="Password" type="password" placeholder="Password" name="password"/>
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
