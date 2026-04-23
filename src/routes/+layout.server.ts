import { readCompanySettings } from '$lib/server/company-store';

export const load = async () => {
	const company = await readCompanySettings();
	return { company };
};
