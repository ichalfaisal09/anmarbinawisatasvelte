import { fail } from '@sveltejs/kit';
import { readPosts, writePosts } from '$lib/server/posts-store';
import { getAdminCookieName } from '$lib/server/admin-auth';
import { deleteUploadedFile } from '$lib/server/upload-storage';

function isUploadPath(imageUrl: string) {
	return imageUrl.startsWith('/uploads/');
}

async function deleteUploadFileIfExists(imageUrl: string) {
	if (!isUploadPath(imageUrl)) return;
	const filename = imageUrl.slice('/uploads/'.length);
	if (!filename) return;
	await deleteUploadedFile(filename);
}

export const load = async ({ url }) => {
	const posts = await readPosts();
	const n = url.searchParams.get('notice');
	const notice = n === 'created' || n === 'updated' ? (n as 'created' | 'updated') : null;
	return { postsCount: posts.length, posts, notice };
};

export const actions = {
	logout: async ({ cookies }) => {
		cookies.delete(getAdminCookieName(), { path: '/' });
		return { ok: true };
	},
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = Number(form.get('id')?.toString() ?? '');
		if (!Number.isFinite(id)) return fail(400, { message: 'ID post tidak valid.' });

		const posts = await readPosts();
		const idx = posts.findIndex((p) => p.id === id);
		if (idx < 0) return fail(404, { message: 'Post tidak ditemukan.' });

		const [removed] = posts.splice(idx, 1);
		await writePosts(posts);
		await deleteUploadFileIfExists(removed.imageUrl);
		return {
			success: true as const,
			message: `Post “${removed.title}” berhasil dihapus.`
		};
	}
};

