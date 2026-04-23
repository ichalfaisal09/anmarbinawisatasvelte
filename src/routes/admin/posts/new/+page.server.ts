import { fail, redirect } from '@sveltejs/kit';
import { readPosts, writePosts } from '$lib/server/posts-store';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const UPLOADS_DIR = path.resolve(process.cwd(), 'static', 'uploads');
const MAX_IMAGE_BYTES = 6 * 1024 * 1024;

function safeExtFromType(type: string) {
	const t = type.toLowerCase();
	if (t === 'image/jpeg') return 'jpg';
	if (t === 'image/png') return 'png';
	if (t === 'image/webp') return 'webp';
	if (t === 'image/gif') return 'gif';
	return null;
}

async function writeUploadedImage(file: File, ext: string) {
	await mkdir(UPLOADS_DIR, { recursive: true });
	const filename = `${Date.now()}-${randomUUID()}.${ext}`;
	const absPath = path.join(UPLOADS_DIR, filename);
	const buffer = Buffer.from(await file.arrayBuffer());
	await writeFile(absPath, buffer);
	return `/uploads/${filename}`;
}

function parseExpiresAt(value: string | undefined) {
	const v = (value ?? '').trim();
	if (!v) return { ok: false as const, message: 'Tanggal berakhir wajib diisi.' };
	const ms = Date.parse(v);
	if (!Number.isFinite(ms)) return { ok: false as const, message: 'Tanggal berakhir tidak valid.' };
	return { ok: true as const, iso: new Date(ms).toISOString() };
}

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const title = form.get('title')?.toString().trim() ?? '';
		const expiresAtLocal = form.get('expiresAt')?.toString() ?? '';
		const file = form.get('image');

		const repop = { title, expiresAt: expiresAtLocal };

		if (!title) return fail(400, { message: 'Judul wajib diisi.', ...repop });
		if (!(file instanceof File) || file.size === 0) {
			return fail(400, { message: 'File gambar wajib diupload.', ...repop });
		}

		const ext = safeExtFromType(file.type);
		if (!ext) {
			return fail(400, { message: 'Format gambar harus JPG, PNG, WEBP, atau GIF.', ...repop });
		}
		if (file.size > MAX_IMAGE_BYTES) {
			return fail(400, { message: 'Ukuran gambar maksimal 6MB.', ...repop });
		}

		const parsed = parseExpiresAt(expiresAtLocal);
		if (!parsed.ok) return fail(400, { message: parsed.message, ...repop });

		const createdAt = new Date().toISOString();

		const posts = await readPosts();
		const nextId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
		const imageUrl = await writeUploadedImage(file, ext);

		posts.unshift({ id: nextId, title, imageUrl, createdAt, expiresAt: parsed.iso });
		await writePosts(posts);

		throw redirect(303, '/admin?notice=created');
	}
};
