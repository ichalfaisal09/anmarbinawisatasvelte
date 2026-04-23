import { fail } from '@sveltejs/kit';
import { readLegalitas, writeLegalitas } from '$lib/server/legalitas-store';
import { readRekening, writeRekening } from '$lib/server/rekening-store';

export const load = async () => {
	const [legalitas, rekening] = await Promise.all([readLegalitas(), readRekening()]);
	return { legalitas, rekening };
};

export const actions = {
	saveLegalitas: async ({ request }) => {
		const form = await request.formData();
		const ppiuLicenseNumber = form.get('ppiuLicenseNumber')?.toString().trim() ?? '';
		const ppiuValidUntil = form.get('ppiuValidUntil')?.toString().trim() ?? '';
		const pihkLicenseNumber = form.get('pihkLicenseNumber')?.toString().trim() ?? '';
		const pihkValidUntil = form.get('pihkValidUntil')?.toString().trim() ?? '';
		const docsRaw = form.get('companyDocs')?.toString().trim() ?? '';

		if (!ppiuLicenseNumber || !pihkLicenseNumber) {
			return fail(400, { scope: 'legalitas' as const, message: 'Nomor izin PPIU dan PIHK wajib diisi.' });
		}

		const companyDocs = docsRaw
			.split('\n')
			.map((v) => v.trim())
			.filter(Boolean)
			.map((name) => ({ name }));

		await writeLegalitas({
			permits: [
				{
					id: 'ppiu',
					title: 'Izin PPIU',
					subtitle: 'Penyelenggara Perjalanan Ibadah Umrah',
					licenseNumber: ppiuLicenseNumber,
					validUntil: ppiuValidUntil || '-'
				},
				{
					id: 'pihk',
					title: 'Izin PIHK',
					subtitle: 'Penyelenggara Ibadah Haji Khusus',
					licenseNumber: pihkLicenseNumber,
					validUntil: pihkValidUntil || '-'
				}
			],
			companyDocs
		});

		return { ok: true as const, scope: 'legalitas' as const, message: 'Data legalitas berhasil disimpan.' };
	},

	saveRekening: async ({ request }) => {
		const form = await request.formData();
		const accounts = [
			{
				id: 'bsi',
				bank: form.get('bsiBank')?.toString().trim() ?? '',
				branch: form.get('bsiBranch')?.toString().trim() ?? '',
				accountNumber: form.get('bsiNumber')?.toString().trim() ?? '',
				accountName: form.get('bsiName')?.toString().trim() ?? '',
				logoUrl: form.get('bsiLogoUrl')?.toString().trim() ?? '',
				logoAlt: form.get('bsiLogoAlt')?.toString().trim() ?? ''
			},
			{
				id: 'mandiri',
				bank: form.get('mandiriBank')?.toString().trim() ?? '',
				branch: form.get('mandiriBranch')?.toString().trim() ?? '',
				accountNumber: form.get('mandiriNumber')?.toString().trim() ?? '',
				accountName: form.get('mandiriName')?.toString().trim() ?? '',
				logoUrl: form.get('mandiriLogoUrl')?.toString().trim() ?? '',
				logoAlt: form.get('mandiriLogoAlt')?.toString().trim() ?? ''
			}
		];

		for (const acc of accounts) {
			if (!acc.bank || !acc.accountNumber || !acc.accountName) {
				return fail(400, {
					scope: 'rekening' as const,
					message: 'Nama bank, nomor rekening, dan atas nama wajib diisi untuk semua rekening.'
				});
			}
		}

		await writeRekening(accounts);
		return { ok: true as const, scope: 'rekening' as const, message: 'Data rekening berhasil disimpan.' };
	}
};
