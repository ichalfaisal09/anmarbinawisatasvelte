import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import {
	getAdminCookieName,
	signSession,
	verifyAdminCredentials,
	verifySessionCookie
} from '$lib/server/admin-auth';

export const load = async ({ cookies }) => {
	const isAuthed = verifySessionCookie(cookies.get(getAdminCookieName()));
	if (isAuthed) throw redirect(303, '/admin');
	return {};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const username = form.get('username')?.toString().trim() ?? '';
		const password = form.get('password')?.toString() ?? '';

		if (!username || !password) {
			return fail(400, { message: 'Username dan password wajib diisi.', username });
		}
		if (!verifyAdminCredentials(username, password)) {
			return fail(401, { message: 'Username atau password salah.', username });
		}

		cookies.set(getAdminCookieName(), signSession(), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 30 // 30 hari
		});

		throw redirect(303, '/admin');
	}
};

