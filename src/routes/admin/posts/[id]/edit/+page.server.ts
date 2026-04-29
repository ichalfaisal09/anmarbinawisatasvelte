import { error, fail, redirect } from '@sveltejs/kit';
import { readPosts, writePosts } from '$lib/server/posts-store';
import { deleteUploadedFile, getWritableUploadsDir, toUploadPublicUrl } from '$lib/server/upload-storage';
import { validateImageUpload } from '$lib/server/image-validation';
import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

function safeExtFromType(type: string) {
	const t = type.toLowerCase();
	if (t === 'image/jpeg') return 'jpg';
	if (t === 'image/png') return 'png';
	if (t === 'image/webp') return 'webp';
	if (t === 'image/gif') return 'gif';
	return null;
}

function isUploadPath(imageUrl: string) {
	return imageUrl.startsWith('/uploads/');
}

async function deleteUploadFileIfExists(imageUrl: string) {
	if (!isUploadPath(imageUrl)) return;
	const filename = imageUrl.slice('/uploads/'.length);
	if (!filename) return;
	await deleteUploadedFile(filename);
}

async function writeUploadedImage(buffer: Buffer, ext: string) {
	const uploadsDir = await getWritableUploadsDir();
	const filename = `${Date.now()}-${randomUUID()}.${ext}`;
	const absPath = path.join(uploadsDir, filename);
	await writeFile(absPath, buffer);
	return toUploadPublicUrl(filename);
}

function parseExpiresAt(value: string | undefined) {
	const v = (value ?? '').trim();
	if (!v) return { ok: false as const, message: 'Tanggal berakhir wajib diisi.' };
	const ms = Date.parse(v);
	if (!Number.isFinite(ms)) return { ok: false as const, message: 'Tanggal berakhir tidak valid.' };
	return { ok: true as const, iso: new Date(ms).toISOString() };
}

export const load = async ({ params }) => {
	const id = Number(params.id);
	if (!Number.isFinite(id)) throw error(400, 'ID tidak valid.');

	const posts = await readPosts();
	const post = posts.find((p) => p.id === id);
	if (!post) throw error(404, 'Post tidak ditemukan.');

	return { post };
};

export const actions = {
	update: async ({ request, params }) => {
		const id = Number(params.id);
		if (!Number.isFinite(id)) return fail(400, { message: 'ID tidak valid.' });

		const form = await request.formData();
		const title = form.get('title')?.toString().trim() ?? '';
		const expiresAtLocal = form.get('expiresAt')?.toString() ?? '';
		const file = form.get('image');

		const repop = { title, expiresAt: expiresAtLocal };

		if (!title) return fail(400, { message: 'Judul wajib diisi.', ...repop });

		const parsed = parseExpiresAt(expiresAtLocal);
		if (!parsed.ok) return fail(400, { message: parsed.message, ...repop });

		const posts = await readPosts();
		const idx = posts.findIndex((p) => p.id === id);
		if (idx < 0) return fail(404, { message: 'Post tidak ditemukan.', ...repop });

		let imageUrl = posts[idx].imageUrl;
		if (file instanceof File && file.size > 0) {
			const ext = safeExtFromType(file.type);
			if (!ext) {
				return fail(400, { message: 'Format gambar harus JPG, PNG, WEBP, atau GIF.', ...repop });
			}
			const imageCheck = await validateImageUpload(file);
			if (!imageCheck.ok) return fail(400, { message: imageCheck.message, ...repop });
			const newImageUrl = await writeUploadedImage(imageCheck.buffer, ext);
			await deleteUploadFileIfExists(imageUrl);
			imageUrl = newImageUrl;
		}

		posts[idx] = { ...posts[idx], title, imageUrl, expiresAt: parsed.iso };
		await writePosts(posts);

		throw redirect(303, '/admin?notice=updated');
	}
};
