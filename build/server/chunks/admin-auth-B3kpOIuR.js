import { b as private_env } from './shared-server-9-2j12mp.js';
import { createHmac, timingSafeEqual, scryptSync, randomBytes } from 'node:crypto';
import path from 'node:path';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';

//#region src/lib/server/admin-auth.ts
var COOKIE_NAME = "admin_session";
var ADMIN_SECURITY_PATH = path.resolve(process.cwd(), "data", "admin-security.json");
function getSecret() {
	return private_env.ADMIN_SECRET ?? private_env.ADMIN_TOKEN ?? "";
}
function getUsername() {
	return private_env.ADMIN_USERNAME ?? "admin";
}
function getPassword() {
	return private_env.ADMIN_PASSWORD ?? private_env.ADMIN_TOKEN ?? "";
}
function readAdminSecurity() {
	try {
		const raw = readFileSync(ADMIN_SECURITY_PATH, "utf8");
		const parsed = JSON.parse(raw);
		const passwordHash = String(parsed.passwordHash ?? "").trim();
		const sessionVersionNum = Number(parsed.sessionVersion);
		const sessionVersion = Number.isFinite(sessionVersionNum) && sessionVersionNum >= 1 ? sessionVersionNum : 1;
		return {
			...passwordHash ? { passwordHash } : {},
			sessionVersion
		};
	} catch {
		return { sessionVersion: 1 };
	}
}
function hashPassword(password) {
	const salt = randomBytes(16).toString("hex");
	return `scrypt$${salt}$${scryptSync(password, salt, 64).toString("hex")}`;
}
function verifyPasswordHash(password, stored) {
	try {
		const [algo, salt, hashed] = stored.split("$");
		if (algo !== "scrypt" || !salt || !hashed) return false;
		return safeEqual(scryptSync(password, salt, 64).toString("hex"), hashed);
	} catch {
		return false;
	}
}
function writeAdminSecurity(data) {
	mkdirSync(path.dirname(ADMIN_SECURITY_PATH), { recursive: true });
	writeFileSync(ADMIN_SECURITY_PATH, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}
function readStoredPasswordHash() {
	const data = readAdminSecurity();
	return String(data.passwordHash ?? "").trim();
}
function readSessionVersion() {
	const data = readAdminSecurity();
	const v = Number(data.sessionVersion);
	return Number.isFinite(v) && v >= 1 ? v : 1;
}
function hmac(input) {
	return createHmac("sha256", getSecret()).update(input).digest("hex");
}
function safeEqual(a, b) {
	const aBuf = Buffer.from(a);
	const bBuf = Buffer.from(b);
	if (aBuf.length !== bBuf.length) return false;
	return timingSafeEqual(aBuf, bBuf);
}
function getAdminCookieName() {
	return COOKIE_NAME;
}
function canUseAdminAuth() {
	return Boolean(getSecret() && (readStoredPasswordHash() || getPassword()));
}
function verifyAdminCredentials(username, password) {
	if (username !== getUsername()) return false;
	const stored = readStoredPasswordHash();
	if (stored) return verifyPasswordHash(password, stored);
	return password === getPassword();
}
function changeAdminPassword(currentPassword, nextPassword) {
	if (!currentPassword || !nextPassword) return {
		ok: false,
		message: "Password lama dan baru wajib diisi."
	};
	if (nextPassword.length < 10) return {
		ok: false,
		message: "Password baru minimal 10 karakter."
	};
	if (!verifyAdminCredentials(getUsername(), currentPassword)) return {
		ok: false,
		message: "Password lama tidak sesuai."
	};
	const nextSessionVersion = readSessionVersion() + 1;
	writeAdminSecurity({
		passwordHash: hashPassword(nextPassword),
		sessionVersion: nextSessionVersion
	});
	return {
		ok: true,
		message: "Password admin berhasil diperbarui."
	};
}
function signSession() {
	const issuedAt = Date.now().toString();
	const version = readSessionVersion().toString();
	return `${issuedAt}.${version}.${hmac(`${issuedAt}.${version}`)}`;
}
function verifySessionCookie(value) {
	if (!value) return false;
	if (!getSecret()) return false;
	const parts = value.split(".");
	if (parts.length < 2) return false;
	let issuedAt = "";
	let version = "1";
	let signature = "";
	if (parts.length === 2) [issuedAt, signature] = parts;
	else [issuedAt, version, signature] = parts;
	if (!issuedAt || !version || !signature) return false;
	if (version !== readSessionVersion().toString()) return false;
	const expected = hmac(`${issuedAt}.${version}`);
	return safeEqual(signature, expected);
}

export { verifyAdminCredentials as a, changeAdminPassword as b, canUseAdminAuth as c, getAdminCookieName as g, signSession as s, verifySessionCookie as v };
//# sourceMappingURL=admin-auth-B3kpOIuR.js.map
