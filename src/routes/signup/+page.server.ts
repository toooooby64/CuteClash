/*
 I feel like the
*/

import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { AuthWeakPasswordError, createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SERVICE_SUPABASE_KEY } from '$env/static/private';

export const actions: Actions = {
	checkEmail: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());
		const { email: new_email } = body;

		let { data, error } = await locals.supabase.rpc('exists_email', {
			new_email
		});
		if (error) {
			console.error(error);
			return fail(409, { body: JSON.stringify({ message: 'Email already exists' }) });
		} else if (data === true) {
			return fail(409, { body: JSON.stringify({ message: 'Email already exists' }) });
		} else {
			return;
		}
	},
	checkUsername: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());
		const { username: new_username } = body;

		let { data, error } = await locals.supabase
			.from('users')
			.select('*')
			.eq('username', new_username);
		console.log(data);
		if (error) {
			console.error(error);
			return fail(409, { body: JSON.stringify({ message: 'Username already exists' }) });
		} else if (data.length > 0) {
			return fail(409, { body: JSON.stringify({ message: 'Username already exists' }) });
		} else {
			return;
		}
	},
	/*
	* Here we use the supabase client initialized in the hook to call the signUp method. 
	* We have to create a new supabase client here because the one in the hook is 
	* initialized with the public anon key.
	* We need to use the service_role key to create a user in the public.users table.

	* There are some thing that need to be addressed here.
	* This has to been written in a way to make sure that if the user has a error creating a account
	* they will not be added to the auth table. 

	Right now if the user has a error creating a account they will still be added to the auth table.
	*/
	createUser: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());
		const { username, email, password } = body;

		let { data, error } = await locals.supabase.auth.signUp({
			email,
			password
		});
		if (error) {
			if (error instanceof AuthWeakPasswordError) {
				return fail(403, { error: 'Password is too weak' });
			}
			return fail(409, { body: JSON.stringify({ message: 'Error creating user' }) });
		}
		const supabaseServiceRole = createClient(PUBLIC_SUPABASE_URL, SERVICE_SUPABASE_KEY);
		if (data) {
			await supabaseServiceRole.from('users').insert([{ username, user_id_forgien: data.user.id }]);
		}
	}
};
