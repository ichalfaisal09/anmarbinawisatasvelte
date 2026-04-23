import { env } from '$env/dynamic/private';
import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'admin_session';

function getSecret() {
	// Backward compatible: kalau sebelumnya hanya punya ADMIN_TOKEN, itu bisa jadi secret.
	return env.ADMIN_SECRET ?? env.ADMIN_TOKEN ?? '';
}

function getUsername() {
	return env.ADMIN_USERNAME ?? 'admin';
}

function getPassword() {
	return env.ADMIN_PASSWORD ?? env.ADMIN_TOKEN ?? '';
}

function hmac(input: string) {
	return createHmac('sha256', getSecret()).update(input).digest('hex');
}

function safeEqual(a: string, b: string) {
	const aBuf = Buffer.from(a);
	const bBuf = Buffer.from(b);
	if (aBuf.length !== bBuf.length) return false;
	return timingSafeEqual(aBuf, bBuf);
}

export function getAdminCookieName() {
	return COOKIE_NAME;
}

export function canUseAdminAuth() {
	return Boolean(getSecret() && getPassword());
}

export function verifyAdminCredentials(username: string, password: string) {
	return username === getUsername() && password === getPassword();
}

export function signSession() {
	const issuedAt = Date.now().toString();
	const signature = hmac(issuedAt);
	return `${issuedAt}.${signature}`;
}

export function verifySessionCookie(value: string | undefined | null) {
	if (!value) return false;
	if (!getSecret()) return false;
	const [issuedAt, signature] = value.split('.', 2);
	if (!issuedAt || !signature) return false;
	const expected = hmac(issuedAt);
	return safeEqual(signature, expected);
}

