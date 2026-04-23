import { readGallery } from '$lib/server/gallery-store';

export const load = async () => {
	const gallery = await readGallery();
	return { gallery };
};
