import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
export const actions: Actions = {
	uploadPhoto: async ({ request, locals }) => {
		const test = await locals.getSession();
		const formData = await request.formData();
		const errors = [];
		for (const [key, value] of formData.entries()) {
			const { data, error } = await locals.supabase.storage
				.from('user-photo')
				.upload(`${test.user.id}/${value.name}`, value);
			if (error) {
				errors.push(
					`There was a error uploading ${value.name} please try again later.`
				);
			}
		}
		if (errors.length > 0) {
			return fail(500, { errors });
		}
	}
};
