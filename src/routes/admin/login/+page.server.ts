import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import {
	getAdminCookieName,
	signSession,
	verifyAdminCredentials,
	verifySessionCookie
} from '$lib/server/admin-auth';

const MAX_FAILED_ATTEMPTS = 5;
const COOLDOWN_MS = 10 * 60 * 1000;
const failedAttemptsByIp = new Map<string, { count: number; lockedUntil: number }>();

function getClientIpOrFallback(getClientAddress: () => string) {
	try {
		return getClientAddress() || 'unknown';
	} catch {
		return 'unknown';
	}
}

export const load = async ({ cookies }) => {
	const isAuthed = verifySessionCookie(cookies.get(getAdminCookieName()));
	if (isAuthed) throw redirect(303, '/admin');
	return {};
};

export const actions = {
	default: async ({ request, cookies, getClientAddress }) => {
		const form = await request.formData();
		const username = form.get('username')?.toString().trim() ?? '';
		const password = form.get('password')?.toString() ?? '';
		const ip = getClientIpOrFallback(getClientAddress);
		const now = Date.now();
		const lockState = failedAttemptsByIp.get(ip);

		if (lockState && lockState.lockedUntil > now) {
			const minutesLeft = Math.max(1, Math.ceil((lockState.lockedUntil - now) / 60000));
			return fail(429, {
				message: `Terlalu banyak percobaan gagal. Coba lagi dalam ${minutesLeft} menit.`,
				username
			});
		}

		if (!username || !password) {
			return fail(400, { message: 'Username dan password wajib diisi.', username });
		}
		if (!verifyAdminCredentials(username, password)) {
			const prev = failedAttemptsByIp.get(ip);
			const nextCount = (prev?.count ?? 0) + 1;
			if (nextCount >= MAX_FAILED_ATTEMPTS) {
				failedAttemptsByIp.set(ip, { count: nextCount, lockedUntil: now + COOLDOWN_MS });
				return fail(429, {
					message: 'Terlalu banyak percobaan gagal. Login dikunci 10 menit.',
					username
				});
			}
			failedAttemptsByIp.set(ip, { count: nextCount, lockedUntil: 0 });
			return fail(401, { message: 'Username atau password salah.', username });
		}
		failedAttemptsByIp.delete(ip);

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

