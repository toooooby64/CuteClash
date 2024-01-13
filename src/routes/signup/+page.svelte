<!-- This has to do
	with the fact that lockedState variable is not being set 
	back to true after the first step is completed. 
-->
<script lang="ts">
	import Animation from '../ui/Animation.svelte';
	/** @type {import('./$types').ActionData} */
	export let form;
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	const createToast = (message: string) => {
		const t: ToastSettings = {
			message
		};
		toastStore.trigger(t);
	};
	console.log(form);
	if (form?.missing) {
		createToast('All fields are required');
	}

	if (form?.emailExists) {
		createToast('Email already in use. Please login or use another email.');
	}
	if (form?.userNameExists) {
		createToast('Oh no! That username is already taken. Please try another.');
	}
	if (form?.passwordTooShort) {
		createToast('Passwords must be at least 6 characters long.');
	}
	if (form?.error) {
		
		createToast('Internal server error. Please try again later.');
	}
</script>

<Animation>
	<form class="flex mt-32 justify-center" action="?/register" method="post">
		<div class="card p-4">
			<div class="p4 m-4">
				<label class="label">
					<span>Email</span>
					<input
						class="input"
						title="Email"
						placeholder="johndoe@email.com"
						name="email"
						type="email"
						value={form?.email ?? ''}
					/>
				</label>
			</div>

			<div class="p4 m-4">
				<label class="label">
					<span>Username</span>
					<input
						class="input"
						title="text"
						type="text"
						placeholder="Toooooby"
						name="username"
						value={form?.username ?? ''}
					/>
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
</Animation>
