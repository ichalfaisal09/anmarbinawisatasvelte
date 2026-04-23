import { redirect, type Handle } from '@sveltejs/kit';
import { canUseAdminAuth, getAdminCookieName, verifySessionCookie } from '$lib/server/admin-auth';

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	if (pathname.startsWith('/admin')) {
		if (!canUseAdminAuth()) {
			// Fail fast with a clear error (rather than looping redirects)
			throw new Error(
				'Admin auth belum dikonfigurasi. Set .env: ADMIN_SECRET dan ADMIN_PASSWORD (atau minimal ADMIN_TOKEN).'
			);
		}

		const isLoginPage = pathname === '/admin/login';
		const isAuthed = verifySessionCookie(event.cookies.get(getAdminCookieName()));

		event.locals.isAdmin = isAuthed;

		if (!isLoginPage && !isAuthed) {
			throw redirect(303, '/admin/login');
		}

		if (isLoginPage && isAuthed) {
			throw redirect(303, '/admin');
		}
	}

	return resolve(event);
};

