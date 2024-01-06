<!-- This has to do
	with the fact that lockedState variable is not being set 
	back to true after the first step is completed. 
-->
<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
	$: lockedState = true;
	let email: string = '';
	let username: string = '';

	function debounce(func, wait) {
		let timeout;
		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}

	const unlockEmailStep = debounce(async () => {
		lockedState = true;
		// Regular expression for email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		// Validate the email format
		if (!emailRegex.test(email)) {
			lockedState = true;
			return;
		}
		const formData = new FormData();
		formData.append('email', email.trimEnd());
		const res = await fetch('?/checkEmail', {
			method: 'POST',
			body: formData
		});

		const data = await res.json();
		if (data.status === 204) {
			lockedState = false;
		} else {
			const t: ToastSettings = {
				message: 'That email is already in use. Please sign in or use a different email.'
			};
			toastStore.trigger(t);
		}
	}, 500);

	const unlockUserNameStep = debounce(async () => {
		const formData = new FormData();
		formData.append('username', username.trimEnd());
		const res = await fetch('?/checkUsername', {
			method: 'POST',
			body: formData
		});

		const data = await res.json();
		if (data.status === 204) {
			lockedState = false;
		} else {
			const t: ToastSettings = {
				message: 'Uh oh! That username is taken.'
			};
			toastStore.trigger(t);
		}
	}, 500);

	const handleSubmit = async (event) => {
		const form = event.target;
		const password = form.elements.password.value;

		const formData = new FormData();
		formData.append('email', email);
		formData.append('username', username);
		formData.append('password', password);

		const res = await fetch('?/createUser', {
			method: 'POST',
			body: formData
		});

		const data = await res.json();
		console.log(data);
		if (data.status === 403) {
			const t: ToastSettings = {
				message: 'Password must be at least 6 characters long.'
			};
			toastStore.trigger(t);
		}
		if (data.status === 204) {
			const t: ToastSettings = {
				message: 'Account created successfully! You will now be redirected to sign in page.'
			};
			toastStore.trigger(t);
			setTimeout(() => {
				window.location.href = '/login';
			}, 1000);
		}
	};

	const nextStep = debounce(async () => {
		if (email === '' || username === '') {
			lockedState = true;
		}
	}, 10);
	const prevStep = debounce(async () => {
		lockedState = false;
	}, 10);
</script>

<div class="flex justify-center p-4 m-4 w-full">
	<div class="w-3/5">
		<Stepper buttonCompleteType="submit" on:next={nextStep} on:back={prevStep}>
			<Step locked={lockedState} buttonNextType="submit">
				<svelte:fragment slot="header">Step 1: Enter a valid Email</svelte:fragment>
				<div class="flex justify-center">
					<label class="label">
						<span>Email</span>
						<input
							on:input={unlockEmailStep}
							bind:value={email}
							class="input"
							type="Email"
							placeholder="Type here"
							name="email"
						/>
					</label>
				</div>
			</Step>

			<Step locked={lockedState} buttonNextType="submit">
				<svelte:fragment slot="header">Step 2: Enter a user name</svelte:fragment>
				<div class="flex justify-center">
					<label class="label">
						<span>User name</span>
						<input
							on:input={unlockUserNameStep}
							bind:value={username}
							class="input"
							type="text"
							placeholder="Type here"
							name="username"
						/>
					</label>
				</div>
			</Step>

			<form action="?/createUser" method="post" on:submit|preventDefault={handleSubmit}>
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
