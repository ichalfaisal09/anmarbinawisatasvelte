import { fail } from '@sveltejs/kit';
import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { readGallery, writeGallery } from '$lib/server/gallery-store';
import { deleteUploadedFile, getWritableUploadsDir, toUploadPublicUrl } from '$lib/server/upload-storage';
import { validateImageUpload } from '$lib/server/image-validation';

function safeExtFromType(type: string) {
	const t = type.toLowerCase();
	if (t === 'image/jpeg') return 'jpg';
	if (t === 'image/png') return 'png';
	if (t === 'image/webp') return 'webp';
	if (t === 'image/gif') return 'gif';
	return null;
}

function isGalleryUploadPath(imageUrl: string) {
	return imageUrl.startsWith('/uploads/gallery/');
}

async function deleteGalleryImageIfExists(imageUrl: string) {
	if (!isGalleryUploadPath(imageUrl)) return;
	const filename = imageUrl.slice('/uploads/gallery/'.length);
	if (!filename) return;
	await deleteUploadedFile(`gallery/${filename}`);
}

async function writeGalleryUpload(buffer: Buffer, ext: string) {
	const uploadsDir = await getWritableUploadsDir('gallery');
	const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
	const absPath = path.join(uploadsDir, filename);
	await writeFile(absPath, buffer);
	return toUploadPublicUrl(filename, 'gallery');
}

export const load = async () => {
	const gallery = await readGallery();
	return { gallery };
};

export const actions = {
	add: async ({ request }) => {
		const form = await request.formData();
		const alt = form.get('alt')?.toString().trim() ?? '';
		const caption = form.get('caption')?.toString().trim() ?? '';
		const imageUrlInput = form.get('imageUrl')?.toString().trim() ?? '';
		const file = form.get('image');

		if (!alt) {
			return fail(400, { scope: 'add' as const, message: 'Alt text wajib diisi.' });
		}

		let imageUrl = imageUrlInput;
		if (file instanceof File && file.size > 0) {
			const ext = safeExtFromType(file.type);
			if (!ext) {
				return fail(400, { scope: 'add' as const, message: 'Format gambar harus JPG, PNG, WEBP, atau GIF.' });
			}
			const imageCheck = await validateImageUpload(file);
			if (!imageCheck.ok) return fail(400, { scope: 'add' as const, message: imageCheck.message });
			imageUrl = await writeGalleryUpload(imageCheck.buffer, ext);
		}

		if (!imageUrl) {
			return fail(400, { scope: 'add' as const, message: 'Isi Image URL atau upload file gambar.' });
		}

		const gallery = await readGallery();
		const nextId = gallery.length ? Math.max(...gallery.map((g) => g.id)) + 1 : 1;
		const item = { id: nextId, imageUrl, alt, ...(caption ? { caption } : {}) };
		gallery.push(item);
		await writeGallery(gallery);
		return { ok: true as const, message: 'Foto galeri berhasil ditambahkan.' };
	},

	update: async ({ request }) => {
		const form = await request.formData();
		const id = Number(form.get('id')?.toString() ?? '');
		const alt = form.get('alt')?.toString().trim() ?? '';
		const caption = form.get('caption')?.toString().trim() ?? '';
		const imageUrlInput = form.get('imageUrl')?.toString().trim() ?? '';
		const file = form.get('image');

		if (!Number.isFinite(id)) {
			return fail(400, { scope: 'update' as const, message: 'ID galeri tidak valid.' });
		}
		if (!alt) {
			return fail(400, { scope: 'update' as const, message: 'Alt text wajib diisi.' });
		}

		const gallery = await readGallery();
		const idx = gallery.findIndex((g) => g.id === id);
		if (idx < 0) {
			return fail(404, { scope: 'update' as const, message: 'Data galeri tidak ditemukan.' });
		}

		const prev = gallery[idx];
		let imageUrl = imageUrlInput || prev.imageUrl;

		if (file instanceof File && file.size > 0) {
			const ext = safeExtFromType(file.type);
			if (!ext) {
				return fail(400, { scope: 'update' as const, message: 'Format gambar harus JPG, PNG, WEBP, atau GIF.' });
			}
			const imageCheck = await validateImageUpload(file);
			if (!imageCheck.ok) return fail(400, { scope: 'update' as const, message: imageCheck.message });
			const newUrl = await writeGalleryUpload(imageCheck.buffer, ext);
			await deleteGalleryImageIfExists(prev.imageUrl);
			imageUrl = newUrl;
		}

		if (!imageUrl) {
			return fail(400, { scope: 'update' as const, message: 'Image URL tidak boleh kosong.' });
		}

		gallery[idx] = { id, imageUrl, alt, ...(caption ? { caption } : {}) };
		await writeGallery(gallery);
		return { ok: true as const, message: 'Data galeri berhasil diperbarui.' };
	},

	delete: async ({ request }) => {
		const form = await request.formData();
		const id = Number(form.get('id')?.toString() ?? '');
		if (!Number.isFinite(id)) {
			return fail(400, { scope: 'delete' as const, message: 'ID galeri tidak valid.' });
		}

		const gallery = await readGallery();
		const idx = gallery.findIndex((g) => g.id === id);
		if (idx < 0) {
			return fail(404, { scope: 'delete' as const, message: 'Data galeri tidak ditemukan.' });
		}

		const [removed] = gallery.splice(idx, 1);
		await writeGallery(gallery);
		await deleteGalleryImageIfExists(removed.imageUrl);
		return { ok: true as const, message: 'Foto galeri berhasil dihapus.' };
	}
};
