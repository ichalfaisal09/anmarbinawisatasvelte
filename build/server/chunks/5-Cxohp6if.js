import { r as readPosts, w as writePosts } from './posts-store-BtfHtR9r.js';
import { g as getAdminCookieName } from './admin-auth-B3kpOIuR.js';
import { d as deleteUploadedFile } from './upload-storage-BeFWmdhX.js';
import { f as fail } from './index-Cge00w53.js';
import 'node:fs/promises';
import 'node:path';
import './shared-server-9-2j12mp.js';
import 'node:crypto';
import 'node:fs';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/+page.server.ts
function isUploadPath(imageUrl) {
	return imageUrl.startsWith("/uploads/");
}
async function deleteUploadFileIfExists(imageUrl) {
	if (!isUploadPath(imageUrl)) return;
	const filename = imageUrl.slice(9);
	if (!filename) return;
	await deleteUploadedFile(filename);
}
var load = async ({ url }) => {
	const posts = await readPosts();
	const n = url.searchParams.get("notice");
	const notice = n === "created" || n === "updated" ? n : null;
	return {
		postsCount: posts.length,
		posts,
		notice
	};
};
var actions = {
	logout: async ({ cookies }) => {
		cookies.delete(getAdminCookieName(), { path: "/" });
		return { ok: true };
	},
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = Number(form.get("id")?.toString() ?? "");
		if (!Number.isFinite(id)) return fail(400, { message: "ID post tidak valid." });
		const posts = await readPosts();
		const idx = posts.findIndex((p) => p.id === id);
		if (idx < 0) return fail(404, { message: "Post tidak ditemukan." });
		const [removed] = posts.splice(idx, 1);
		await writePosts(posts);
		await deleteUploadFileIfExists(removed.imageUrl);
		return {
			success: true,
			message: `Post “${removed.title}” berhasil dihapus.`
		};
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CDZcwNMN.js')).default;
const server_id = "src/routes/admin/+page.server.ts";
const imports = ["_app/immutable/nodes/5.BzoTpB0U.js","_app/immutable/chunks/DKj7emCc.js","_app/immutable/chunks/C92BYtAW.js","_app/immutable/chunks/_CHPEwH2.js","_app/immutable/chunks/CuyqONxg.js"];
const stylesheets = ["_app/immutable/assets/5.DeK7NDt1.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-Cxohp6if.js.map
