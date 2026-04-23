import { fail } from '@sveltejs/kit';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { readCompanySettings, writeCompanySettings } from '$lib/server/company-store';
import { changeAdminPassword } from '$lib/server/admin-auth';

const UPLOADS_DIR = path.resolve(process.cwd(), 'static', 'uploads');
const MAX_LOGO_BYTES = 2 * 1024 * 1024;

function safeExtFromType(type: string) {
	const t = type.toLowerCase();
	if (t === 'image/jpeg') return 'jpg';
	if (t === 'image/png') return 'png';
	if (t === 'image/webp') return 'webp';
	if (t === 'image/gif') return 'gif';
	return null;
}

async function deleteUploadIfExists(imageUrl: string | undefined) {
	if (!imageUrl?.startsWith('/uploads/')) return;
	const filename = imageUrl.slice('/uploads/'.length);
	if (!filename) return;
	const absPath = path.join(UPLOADS_DIR, filename);
	try {
		await unlink(absPath);
	} catch {
		// ignore
	}
}

async function writeCompanyLogoFile(file: File): Promise<string> {
	const ext = safeExtFromType(file.type);
	if (!ext) throw new Error('Format logo harus JPG, PNG, WEBP, atau GIF.');
	if (file.size > MAX_LOGO_BYTES) throw new Error('Ukuran logo maksimal 2MB.');

	await mkdir(UPLOADS_DIR, { recursive: true });
	const filename = `company-logo-${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
	const absPath = path.join(UPLOADS_DIR, filename);
	const buffer = Buffer.from(await file.arrayBuffer());
	await writeFile(absPath, buffer);
	return `/uploads/${filename}`;
}

export const load = async () => {
	const settings = await readCompanySettings();
	return { settings };
};

export const actions = {
	saveBrand: async ({ request }) => {
		const form = await request.formData();
		const companyName = form.get('companyName')?.toString().trim() ?? '';
		const adminSidebarSubtitle = form.get('adminSidebarSubtitle')?.toString().trim() ?? '';
		const file = form.get('logo');

		const repopBrand = { companyName, adminSidebarSubtitle };

		if (!companyName) {
			return fail(400, {
				message: 'Nama perusahaan wajib diisi.',
				scope: 'brand' as const,
				companyName: '',
				adminSidebarSubtitle
			});
		}

		const current = await readCompanySettings();
		let logoUrl = current.logoUrl || '';

		if (file instanceof File && file.size > 0) {
			try {
				const newUrl = await writeCompanyLogoFile(file);
				await deleteUploadIfExists(current.logoUrl);
				logoUrl = newUrl;
			} catch (e) {
				const msg = e instanceof Error ? e.message : 'Gagal mengunggah logo.';
				return fail(400, { message: msg, scope: 'brand' as const, ...repopBrand });
			}
		}

		await writeCompanySettings({ ...current, companyName, logoUrl, adminSidebarSubtitle });
		return { ok: true as const, message: 'Identitas perusahaan disimpan.' };
	},

	save: async ({ request }) => {
		const form = await request.formData();
		const current = await readCompanySettings();

		const waNumber = form.get('waNumber')?.toString().trim() ?? '';
		const officePhone = form.get('officePhone')?.toString().trim() ?? '';
		const email = form.get('email')?.toString().trim() ?? '';
		const address = form.get('address')?.toString().trim() ?? '';
		const officeHours = form.get('officeHours')?.toString().trim() ?? '';
		const mapsUrl = form.get('mapsUrl')?.toString().trim() ?? '';

		if (email && !email.includes('@')) {
			return fail(400, { message: 'Email tidak valid.', scope: 'contact' as const });
		}
		if (mapsUrl && !(mapsUrl.startsWith('http://') || mapsUrl.startsWith('https://'))) {
			return fail(400, { message: 'Maps URL harus diawali http:// atau https://.', scope: 'contact' as const });
		}
		await writeCompanySettings({
			...current,
			waNumber,
			officePhone,
			email,
			address,
			officeHours,
			mapsUrl
		});
		return { ok: true as const, message: 'Kontak berhasil disimpan.' };
	},

	savePassword: async ({ request }) => {
		const form = await request.formData();
		const currentPassword = form.get('currentPassword')?.toString() ?? '';
		const newPassword = form.get('newPassword')?.toString() ?? '';
		const confirmPassword = form.get('confirmPassword')?.toString() ?? '';

		if (!currentPassword || !newPassword || !confirmPassword) {
			return fail(400, { scope: 'security' as const, message: 'Semua kolom password wajib diisi.' });
		}
		if (newPassword !== confirmPassword) {
			return fail(400, { scope: 'security' as const, message: 'Konfirmasi password baru tidak sama.' });
		}

		const res = changeAdminPassword(currentPassword, newPassword);
		if (!res.ok) {
			return fail(400, { scope: 'security' as const, message: res.message });
		}

		return { ok: true as const, scope: 'security' as const, message: res.message };
	}
};
