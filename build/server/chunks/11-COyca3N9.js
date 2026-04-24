import { r as readPosts, w as writePosts } from './posts-store-BtfHtR9r.js';
import { g as getWritableUploadsDir, t as toUploadPublicUrl, d as deleteUploadedFile } from './upload-storage-BeFWmdhX.js';
import { f as fail, r as redirect, e as error } from './index-Cge00w53.js';
import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/posts/[id]/edit/+page.server.ts
var MAX_IMAGE_BYTES = 6 * 1024 * 1024;
function safeExtFromType(type) {
	const t = type.toLowerCase();
	if (t === "image/jpeg") return "jpg";
	if (t === "image/png") return "png";
	if (t === "image/webp") return "webp";
	if (t === "image/gif") return "gif";
	return null;
}
function isUploadPath(imageUrl) {
	return imageUrl.startsWith("/uploads/");
}
async function deleteUploadFileIfExists(imageUrl) {
	if (!isUploadPath(imageUrl)) return;
	const filename = imageUrl.slice(9);
	if (!filename) return;
	await deleteUploadedFile(filename);
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
var load = async ({ params }) => {
	const id = Number(params.id);
	if (!Number.isFinite(id)) throw error(400, "ID tidak valid.");
	const post = (await readPosts()).find((p) => p.id === id);
	if (!post) throw error(404, "Post tidak ditemukan.");
	return { post };
};
var actions = { update: async ({ request, params }) => {
	const id = Number(params.id);
	if (!Number.isFinite(id)) return fail(400, { message: "ID tidak valid." });
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
	const parsed = parseExpiresAt(expiresAtLocal);
	if (!parsed.ok) return fail(400, {
		message: parsed.message,
		...repop
	});
	const posts = await readPosts();
	const idx = posts.findIndex((p) => p.id === id);
	if (idx < 0) return fail(404, {
		message: "Post tidak ditemukan.",
		...repop
	});
	let imageUrl = posts[idx].imageUrl;
	if (file instanceof File && file.size > 0) {
		const ext = safeExtFromType(file.type);
		if (!ext) return fail(400, {
			message: "Format gambar harus JPG, PNG, WEBP, atau GIF.",
			...repop
		});
		if (file.size > MAX_IMAGE_BYTES) return fail(400, {
			message: "Ukuran gambar maksimal 6MB.",
			...repop
		});
		const newImageUrl = await writeUploadedImage(file, ext);
		await deleteUploadFileIfExists(imageUrl);
		imageUrl = newImageUrl;
	}
	posts[idx] = {
		...posts[idx],
		title,
		imageUrl,
		expiresAt: parsed.iso
	};
	await writePosts(posts);
	throw redirect(303, "/admin?notice=updated");
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 11;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BGHQvN47.js')).default;
const server_id = "src/routes/admin/posts/[id]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/11.CaYwMeCN.js","_app/immutable/chunks/DKj7emCc.js","_app/immutable/chunks/BIAWU0CM.js","_app/immutable/chunks/CgC7e0Kz.js","_app/immutable/chunks/CuyqONxg.js"];
const stylesheets = ["_app/immutable/assets/11.D1CulCUC.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=11-COyca3N9.js.map
