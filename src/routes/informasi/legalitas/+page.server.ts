import { readLegalitas } from '$lib/server/legalitas-store';

export const load = async () => {
	return await readLegalitas();
};
