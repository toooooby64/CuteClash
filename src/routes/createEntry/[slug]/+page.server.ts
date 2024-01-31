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
	joinContest: async ({ request, params, locals }) => {
		console.log(params.slug);
		const entry = await createEntry({ request, locals });
		console.log(entry)
		const { data, error } = await locals.supabase
			.from('contests')
			.update({
				entry_2: entry
			})
			.eq('contest_id', params.slug)
			.select();
		console.log(data,error);	
	}
};

const createEntry = async ({ request, locals }) => {
	const session = await locals.getSession();
	const formData = await request.formData();
	const petInfo = await getPetInfo(locals);
	const petId = petInfo.body.data[0].pet_id;
	const ownerId = session.user.id;
	let { data, error } = await locals.supabase
		.from('entries')
		.insert([
			{
				pet_id: petId,
				owner_id: ownerId
			}
		])
		.select('entry_id');
	const entryId = data[0].entry_id;
	return entryId;
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
