import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { PET_API_KEY } from '$env/static/private';

export const actions: Actions = {
	uploadPhoto: async ({ request, locals }) => {
		const test = await locals.getSession();
		test.user.id;
		const formData = await request.formData();
		const errors = [];
		const totalPhotos = Array.from(formData.entries()).length;

		for (const [key, value] of formData.entries()) {
			const { data, error } = await locals.supabase.storage
				.from('user-photos')
				.upload(`${test.user.id}/${value.name}`, value);
			if (error) {
				errors.push(value.name);
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
	},
	insertPet: async ({ request, locals }) => {
		const session = await locals.getSession();
		const formData = await request.formData();
		const pet_name = formData.get('petname');
		const pettype = formData.get('pettype');	
		const petbreed = formData.get('petbreed');
		const description = formData.get('description');

		const { data, error } = await locals.supabase
			.from('pets')
			.insert([
				{ owner_id: session.user.id, type: pettype, pet_name, breed: petbreed, description }
			]);
	}
};
