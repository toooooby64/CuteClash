import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const urls = await getPublicUrl(locals);
	const petInfo = await getPetInfo(locals);
	if (urls.status === 200 && petInfo.status === 200) {
		return {
			status: 200,
			body: {
				urls,
				petInfo
			}
		};
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	createEntry: async ({ request, locals }) => {
		const session = await locals.getSession();
		const formData = await request.formData();
		console.log(formData);
		for (const entry of formData.entries()) {
			console.log(entry[1].slice);
		}
	}

};

const getPublicUrl = async (locals) => {
	const session = await locals.getSession();
	const files = await locals.supabase.storage.from('user-photos').list(session.user.id);
	const fileNames = [];
	for (const file of files.data) {
		fileNames.push(file.name);
	}

	const urls = [];
	for (const fileName of fileNames) {
		urls.push(
			await locals.supabase.storage
				.from('user-photos')
				.getPublicUrl(`${session.user.id}/${fileName}`)
		);
	}

	if (!session) {
		return {
			status: 401,
			body: 'Unauthorized'
		};
	} else {
		return {
			status: 200,
			body: {
				urls
			}
		};
	}
};

const getPetInfo = async (locals) => {
	const session = await locals.getSession();
	const { data, error } = await locals.supabase
		.from('pets')
		.select('*')
		.eq('owner_id', session.user.id);
	if (!session) {
		return {
			status: 401,
			body: 'Unauthorized'
		};
	} else {
		return {
			status: 200,
			body: {
				data
			}
		};
	}
};
