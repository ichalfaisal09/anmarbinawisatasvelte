import { env } from '$env/dynamic/private';
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const COOKIE_NAME = 'admin_session';
const ADMIN_SECURITY_PATH = path.resolve(process.cwd(), 'data', 'admin-security.json');
type AdminSecurityData = { passwordHash?: string; sessionVersion?: number };

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

function readAdminSecurity(): AdminSecurityData {
	try {
		const raw = readFileSync(ADMIN_SECURITY_PATH, 'utf8');
		const parsed = JSON.parse(raw) as { passwordHash?: unknown; sessionVersion?: unknown };
		const passwordHash = String(parsed.passwordHash ?? '').trim();
		const sessionVersionNum = Number(parsed.sessionVersion);
		const sessionVersion = Number.isFinite(sessionVersionNum) && sessionVersionNum >= 1 ? sessionVersionNum : 1;
		return {
			...(passwordHash ? { passwordHash } : {}),
			sessionVersion
		};
	} catch {
		return { sessionVersion: 1 };
	}
}

function hashPassword(password: string) {
	const salt = randomBytes(16).toString('hex');
	const hashed = scryptSync(password, salt, 64).toString('hex');
	return `scrypt$${salt}$${hashed}`;
}

function verifyPasswordHash(password: string, stored: string) {
	try {
		const [algo, salt, hashed] = stored.split('$');
		if (algo !== 'scrypt' || !salt || !hashed) return false;
		const current = scryptSync(password, salt, 64).toString('hex');
		return safeEqual(current, hashed);
	} catch {
		return false;
	}
}

function writeAdminSecurity(data: AdminSecurityData) {
	mkdirSync(path.dirname(ADMIN_SECURITY_PATH), { recursive: true });
	writeFileSync(ADMIN_SECURITY_PATH, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function readStoredPasswordHash() {
	const data = readAdminSecurity();
	return String(data.passwordHash ?? '').trim();
}

function readSessionVersion() {
	const data = readAdminSecurity();
	const v = Number(data.sessionVersion);
	return Number.isFinite(v) && v >= 1 ? v : 1;
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
	return Boolean(getSecret() && (readStoredPasswordHash() || getPassword()));
}

export function verifyAdminCredentials(username: string, password: string) {
	if (username !== getUsername()) return false;
	const stored = readStoredPasswordHash();
	if (stored) return verifyPasswordHash(password, stored);
	return password === getPassword();
}

export function changeAdminPassword(currentPassword: string, nextPassword: string) {
	if (!currentPassword || !nextPassword) {
		return { ok: false as const, message: 'Password lama dan baru wajib diisi.' };
	}
	if (nextPassword.length < 10) {
		return { ok: false as const, message: 'Password baru minimal 10 karakter.' };
	}
	if (!verifyAdminCredentials(getUsername(), currentPassword)) {
		return { ok: false as const, message: 'Password lama tidak sesuai.' };
	}
	const nextSessionVersion = readSessionVersion() + 1;
	writeAdminSecurity({
		passwordHash: hashPassword(nextPassword),
		sessionVersion: nextSessionVersion
	});
	return { ok: true as const, message: 'Password admin berhasil diperbarui.' };
}

export function signSession() {
	const issuedAt = Date.now().toString();
	const version = readSessionVersion().toString();
	const signature = hmac(`${issuedAt}.${version}`);
	return `${issuedAt}.${version}.${signature}`;
}

export function verifySessionCookie(value: string | undefined | null) {
	if (!value) return false;
	if (!getSecret()) return false;
	const parts = value.split('.');
	if (parts.length < 2) return false;

	let issuedAt = '';
	let version = '1';
	let signature = '';
	if (parts.length === 2) {
		[issuedAt, signature] = parts;
	} else {
		[issuedAt, version, signature] = parts;
	}
	if (!issuedAt || !version || !signature) return false;
	if (version !== readSessionVersion().toString()) return false;
	const expected = hmac(`${issuedAt}.${version}`);
	return safeEqual(signature, expected);
}

