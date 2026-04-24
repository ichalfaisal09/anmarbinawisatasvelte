import { r as readPosts, w as writePosts } from './posts-store-BtfHtR9r.js';
import { g as getWritableUploadsDir, t as toUploadPublicUrl } from './upload-storage-BeFWmdhX.js';
import { f as fail, r as redirect } from './index-Cge00w53.js';
import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/posts/new/+page.server.ts
var MAX_IMAGE_BYTES = 6 * 1024 * 1024;
function safeExtFromType(type) {
	const t = type.toLowerCase();
	if (t === "image/jpeg") return "jpg";
	if (t === "image/png") return "png";
	if (t === "image/webp") return "webp";
	if (t === "image/gif") return "gif";
	return null;
}
async function writeUploadedImage(file, ext) {
	const uploadsDir = await getWritableUploadsDir();
	const filename = `${Date.now()}-${randomUUID()}.${ext}`;
	await writeFile(path.join(uploadsDir, filename), Buffer.from(await file.arrayBuffer()));
	return toUploadPublicUrl(filename);
}
function parseExpiresAt(value) {
	const v = (value ?? "").trim();
	if (!v) return {
		ok: false,
		message: "Tanggal berakhir wajib diisi."
	};
	const ms = Date.parse(v);
	if (!Number.isFinite(ms)) return {
		ok: false,
		message: "Tanggal berakhir tidak valid."
	};
	return {
		ok: true,
		iso: new Date(ms).toISOString()
	};
}
var actions = { default: async ({ request }) => {
	const form = await request.formData();
	const title = form.get("title")?.toString().trim() ?? "";
	const expiresAtLocal = form.get("expiresAt")?.toString() ?? "";
	const file = form.get("image");
	const repop = {
		title,
		expiresAt: expiresAtLocal
	};
	if (!title) return fail(400, {
		message: "Judul wajib diisi.",
		...repop
	});
	if (!(file instanceof File) || file.size === 0) return fail(400, {
		message: "File gambar wajib diupload.",
		...repop
	});
	const ext = safeExtFromType(file.type);
	if (!ext) return fail(400, {
		message: "Format gambar harus JPG, PNG, WEBP, atau GIF.",
		...repop
	});
	if (file.size > MAX_IMAGE_BYTES) return fail(400, {
		message: "Ukuran gambar maksimal 6MB.",
		...repop
	});
	const parsed = parseExpiresAt(expiresAtLocal);
	if (!parsed.ok) return fail(400, {
		message: parsed.message,
		...repop
	});
	const createdAt = (/* @__PURE__ */ new Date()).toISOString();
	const posts = await readPosts();
	const nextId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
	const imageUrl = await writeUploadedImage(file, ext);
	posts.unshift({
		id: nextId,
		title,
		imageUrl,
		createdAt,
		expiresAt: parsed.iso
	});
	await writePosts(posts);
	throw redirect(303, "/admin?notice=created");
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions
});

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CGEE3uW_.js')).default;
const server_id = "src/routes/admin/posts/new/+page.server.ts";
const imports = ["_app/immutable/nodes/10.B4J2vM4M.js","_app/immutable/chunks/DKj7emCc.js","_app/immutable/chunks/_CHPEwH2.js","_app/immutable/chunks/C92BYtAW.js","_app/immutable/chunks/CuyqONxg.js"];
const stylesheets = ["_app/immutable/assets/10.C7ofagwo.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-DSrynbi7.js.map
