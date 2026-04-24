import { c as canUseAdminAuth, v as verifySessionCookie, g as getAdminCookieName } from './admin-auth-B3kpOIuR.js';
import { r as redirect } from './index-Cge00w53.js';
import './shared-server-9-2j12mp.js';
import 'node:crypto';
import 'node:path';
import 'node:fs';
import './index-DBqjc0Yf.js';

//#region src/hooks.server.ts
var handle = async ({ event, resolve }) => {
	const { pathname } = event.url;
	if (pathname.startsWith("/admin")) {
		if (!canUseAdminAuth()) throw new Error("Admin auth belum dikonfigurasi. Set .env: ADMIN_SECRET dan ADMIN_PASSWORD (atau minimal ADMIN_TOKEN).");
		const isLoginPage = pathname === "/admin/login";
		const isAuthed = verifySessionCookie(event.cookies.get(getAdminCookieName()));
		event.locals.isAdmin = isAuthed;
		if (!isLoginPage && !isAuthed) throw redirect(303, "/admin/login");
		if (isLoginPage && isAuthed) throw redirect(303, "/admin");
	}
	return resolve(event);
};

export { handle };
//# sourceMappingURL=hooks.server-CEDL2ly9.js.map
