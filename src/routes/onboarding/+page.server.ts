import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async ({ request, resolve }) => {
	   const { TheCatAPI } = require('@thatapicompany/thecatapi');

}

export const actions: Actions = {
	uploadPhoto: async ({ request, locals }) => {
		const test = await locals.getSession();
		const formData = await request.formData();
		const errors = [];
		const totalPhotos = Array.from(formData.entries()).length;

		for (const [key, value] of formData.entries()) {
			const { data, error } = await locals.supabase.storage
				.from('user-photos')
				.upload(`${test.user.id}/${value.name}`, value);
			if (error) {
				console.log(value);
				errors.push(value.name);
				console.log(errors);
			}
		}
		let totalErrors: number = errors.length;

		if (errors.length > 0) {
			if (totalErrors === totalPhotos) {
				return fail(500, {
					message: 'There was a problem uploading your photos. Please try again.',
					sucessfulUploads: totalPhotos - totalErrors
				});
			}
			return fail(500, {
				message: `${totalErrors}/${totalPhotos} photos failed to upload. \n There was a problem with ${errors} please try again.`,
				sucessfulUploads: totalPhotos - totalErrors
			});
		}
		return { success: true, sucessfulUploads: totalPhotos - totalErrors };
	}
};
