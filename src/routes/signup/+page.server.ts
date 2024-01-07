
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { AuthWeakPasswordError, createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SERVICE_SUPABASE_KEY } from '$env/static/private';
import type { UUID } from 'crypto';

const existsEmail = async (formData: FormData, locals) => {
	const new_email = formData.get('email');
	let { data, error } = await locals.supabase.rpc('exists_email', {
		new_email
	});
	if (error) {
		return fail(500, { error: true });
	}
	if (data) {
		return fail(409, { username: formData.get('username'), emailExists: true });
	}
};

const existsUsername = async (formData: FormData, locals) => {
	const new_username = formData.get('username');
	let { data, error } = await locals.supabase
		.from('users')
		.select('*')
		.eq('username', new_username);

	if (error) {
		return fail(500, { error: true });
	}
	if (data.length > 0) {
		return fail(409, { email: formData.get('email'), userNameExists: true });
	}
};

const validPassword = async (formData: FormData, locals) => {
	const password = formData.get('password')?.toString();

	if (password.length < 6) {
		return fail(400, {
			email: formData.get('email'),
			username: formData.get('username'),
			passwordTooShort: true
		});
	}
};

const addUserToDatabase = async (username:FormDataEntryValue, userId: UUID) => {
	const supabaseServiceRole = createClient(PUBLIC_SUPABASE_URL, SERVICE_SUPABASE_KEY);
	let { data, error } = await supabaseServiceRole
		.from('users')
		.insert([{ username, user_id_forgien: userId }]);
	if (error) {
		return fail(500, { error: true });
	}
};
/** @type {import('./$types').Actions} */
export const actions: Actions = {
	register: async ({ request, locals }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const email = formData.get('email');
		const password = formData.get('password');

		if (!email || !password || !username) {
			return fail(400, { missing: true });
		}
		const emailExists = await existsEmail(formData, locals);
		if (emailExists && emailExists.status === 409) {
			return emailExists;
		}
		const usernameExists = await existsUsername(formData, locals);
		if (usernameExists && usernameExists.status === 409) {
			return usernameExists;
		}
		const passwordValid = await validPassword(formData, locals);
		if (passwordValid && passwordValid.status === 400) {
			return passwordValid;
		}

		let { data, error } = await locals.supabase.auth.signUp({
			email,
			password
		});
		if (error) {
			return fail(500, { error: true });
		}
		if (data) {
			addUserToDatabase(username, data.user.id);
			redirect(303,'../login');
		}
	}
};
