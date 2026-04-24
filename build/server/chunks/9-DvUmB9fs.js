import { b as private_env } from './shared-server-9-2j12mp.js';
import { a as verifyAdminCredentials, g as getAdminCookieName, s as signSession, v as verifySessionCookie } from './admin-auth-B3kpOIuR.js';
import { f as fail, r as redirect } from './index-Cge00w53.js';
import 'node:crypto';
import 'node:path';
import 'node:fs';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/login/+page.server.ts
var MAX_FAILED_ATTEMPTS = 5;
var COOLDOWN_MS = 600 * 1e3;
var failedAttemptsByIp = /* @__PURE__ */ new Map();
function getClientIpOrFallback(getClientAddress) {
	try {
		return getClientAddress() || "unknown";
	} catch {
		return "unknown";
	}
}
var load = async ({ cookies }) => {
	if (verifySessionCookie(cookies.get(getAdminCookieName()))) throw redirect(303, "/admin");
	return {};
};
var actions = { default: async ({ request, cookies, getClientAddress }) => {
	const form = await request.formData();
	const username = form.get("username")?.toString().trim() ?? "";
	const password = form.get("password")?.toString() ?? "";
	const ip = getClientIpOrFallback(getClientAddress);
	const now = Date.now();
	const lockState = failedAttemptsByIp.get(ip);
	if (lockState && lockState.lockedUntil > now) return fail(429, {
		message: `Terlalu banyak percobaan gagal. Coba lagi dalam ${Math.max(1, Math.ceil((lockState.lockedUntil - now) / 6e4))} menit.`,
		username
	});
	if (!username || !password) return fail(400, {
		message: "Username dan password wajib diisi.",
		username
	});
	if (!verifyAdminCredentials(username, password)) {
		const nextCount = (failedAttemptsByIp.get(ip)?.count ?? 0) + 1;
		if (nextCount >= MAX_FAILED_ATTEMPTS) {
			failedAttemptsByIp.set(ip, {
				count: nextCount,
				lockedUntil: now + COOLDOWN_MS
			});
			return fail(429, {
				message: "Terlalu banyak percobaan gagal. Login dikunci 10 menit.",
				username
			});
		}
		failedAttemptsByIp.set(ip, {
			count: nextCount,
			lockedUntil: 0
		});
		return fail(401, {
			message: "Username atau password salah.",
			username
		});
	}
	failedAttemptsByIp.delete(ip);
	cookies.set(getAdminCookieName(), signSession(), {
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		secure: private_env.NODE_ENV === "production",
		maxAge: 3600 * 24 * 30
	});
	throw redirect(303, "/admin");
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-By4tOMXm.js')).default;
const server_id = "src/routes/admin/login/+page.server.ts";
const imports = ["_app/immutable/nodes/9.BOXN4oXb.js","_app/immutable/chunks/DKj7emCc.js","_app/immutable/chunks/B6e86xqY.js","_app/immutable/chunks/Bdssw1Kk.js","_app/immutable/chunks/CuyqONxg.js"];
const stylesheets = ["_app/immutable/assets/9.CyL5M71t.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=9-DvUmB9fs.js.map
