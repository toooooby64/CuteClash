import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());
		const { email, password } = body;
		
		let { data, error } = await locals.supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) {
			console.error(error);
			return fail(401, { body: JSON.stringify({ message: 'Email or password is incorrect' }) });
		} else{
			redirect(303,'/home');
		}
	}	
};
