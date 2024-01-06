<script>
	import Carousels from './ui/Carousels.svelte';
	import Layout from './ui/+layout.svelte';
</script>

<Layout>
	<div class="flex w-auto items-center">
		<div class="flex w-1/3">
			<Carousels />
		</div>
		<div class="w-2/3 flex p-4 items-center">
			<h3 class="h3">
				Witness the most heart-melting battles as pets from around the world compete in head-to-head
				matchups. Will it be the purring kittens or the playful puppies that steal the spotlight? Only
				you can decide!
				<br />
				<br />
				<div class="text-center">
					<strong>Ready to make your pet a star in the PawsBattles arena? </strong> Join the fun and
					<strong>login</strong>
					or <strong>sign in</strong> now to participate, vote, and elevate your furry friend to
					cuteness glory!
					
					<div class="p-6">
						<a href="./login" class="btn variant-filled-primary mr-10">Login</a>
						<a href="./signup" class="btn variant-filled-primary">Sign Up</a>
					</div>
				</div>
			</h3>
		</div>
	</div>
</Layout>
	