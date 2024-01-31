import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.getSession();
	let owner_id;
	let contest_id;
	const { data, error } = await locals.supabase
		.from('contests')
		.select('*')
		.is('entry_2', null)
		.neq('user_who_started', session.user.id);
	const entry1Data = await Promise.all(
		data.map(async (element) => {
			const { data: entryData, error: entryError } = await locals.supabase
				.from('entries')
				.select('pet_id, owner_id')
				.eq('entry_id', element.entry_1);
			if (entryData && entryData[0]) {
				const { data: petData, error: petError } = await locals.supabase
					.from('pets')
					.select('*')
					.eq('pet_id', entryData[0].pet_id);
				if (petData) {
					const owner_id = entryData[0].owner_id;
					const { data: photoData, error: photoError } = await locals.supabase.storage
						.from('user-photos')
						.list(owner_id);
					const photoUrls = photoData.map((photo) => {
						const { data: publicURL, error } = locals.supabase.storage
							.from('user-photos')
							.getPublicUrl(`${owner_id}/${photo.name}`);
						if (error) {
							console.error('Error getting public URL:', error);
							return null;
						}
						return publicURL.publicUrl;
					});

					return { ...petData[0], photoUrls, contest_id: element.contest_id };
				}
			}
			return null;
		})
	);
	return { entry1Data };
}) satisfies PageServerLoad;

export const actions: Actions = {
	joinContest: async ({ request, locals }) => {
		const session = await locals.getSession();
		const formData = await request.formData();


	}
};
