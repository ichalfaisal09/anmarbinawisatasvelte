import { readRekening } from '$lib/server/rekening-store';

export const load = async () => {
	const accounts = await readRekening();
	return { accounts };
};
