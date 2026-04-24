import { d as deleteUploadedFile, g as getWritableUploadsDir, t as toUploadPublicUrl } from './upload-storage-BeFWmdhX.js';
import { r as readGallery, w as writeGallery } from './gallery-store-EYNdcLxo.js';
import { f as fail } from './index-Cge00w53.js';
import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/gallery/+page.server.ts
var MAX_IMAGE_BYTES = 6 * 1024 * 1024;
function safeExtFromType(type) {
	const t = type.toLowerCase();
	if (t === "image/jpeg") return "jpg";
	if (t === "image/png") return "png";
	if (t === "image/webp") return "webp";
	if (t === "image/gif") return "gif";
	return null;
}
function isGalleryUploadPath(imageUrl) {
	return imageUrl.startsWith("/uploads/gallery/");
}
async function deleteGalleryImageIfExists(imageUrl) {
	if (!isGalleryUploadPath(imageUrl)) return;
	const filename = imageUrl.slice(17);
	if (!filename) return;
	await deleteUploadedFile(`gallery/${filename}`);
}
async function writeGalleryUpload(file, ext) {
	const uploadsDir = await getWritableUploadsDir("gallery");
	const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
	await writeFile(path.join(uploadsDir, filename), Buffer.from(await file.arrayBuffer()));
	return toUploadPublicUrl(filename, "gallery");
}
var load = async () => {
	return { gallery: await readGallery() };
};
var actions = {
	add: async ({ request }) => {
		const form = await request.formData();
		const alt = form.get("alt")?.toString().trim() ?? "";
		const caption = form.get("caption")?.toString().trim() ?? "";
		const imageUrlInput = form.get("imageUrl")?.toString().trim() ?? "";
		const file = form.get("image");
		if (!alt) return fail(400, {
			scope: "add",
			message: "Alt text wajib diisi."
		});
		let imageUrl = imageUrlInput;
		if (file instanceof File && file.size > 0) {
			const ext = safeExtFromType(file.type);
			if (!ext) return fail(400, {
				scope: "add",
				message: "Format gambar harus JPG, PNG, WEBP, atau GIF."
			});
			if (file.size > MAX_IMAGE_BYTES) return fail(400, {
				scope: "add",
				message: "Ukuran gambar maksimal 6MB."
			});
			imageUrl = await writeGalleryUpload(file, ext);
		}
		if (!imageUrl) return fail(400, {
			scope: "add",
			message: "Isi Image URL atau upload file gambar."
		});
		const gallery = await readGallery();
		const item = {
			id: gallery.length ? Math.max(...gallery.map((g) => g.id)) + 1 : 1,
			imageUrl,
			alt,
			...caption ? { caption } : {}
		};
		gallery.push(item);
		await writeGallery(gallery);
		return {
			ok: true,
			message: "Foto galeri berhasil ditambahkan."
		};
	},
	update: async ({ request }) => {
		const form = await request.formData();
		const id = Number(form.get("id")?.toString() ?? "");
		const alt = form.get("alt")?.toString().trim() ?? "";
		const caption = form.get("caption")?.toString().trim() ?? "";
		const imageUrlInput = form.get("imageUrl")?.toString().trim() ?? "";
		const file = form.get("image");
		if (!Number.isFinite(id)) return fail(400, {
			scope: "update",
			message: "ID galeri tidak valid."
		});
		if (!alt) return fail(400, {
			scope: "update",
			message: "Alt text wajib diisi."
		});
		const gallery = await readGallery();
		const idx = gallery.findIndex((g) => g.id === id);
		if (idx < 0) return fail(404, {
			scope: "update",
			message: "Data galeri tidak ditemukan."
		});
		const prev = gallery[idx];
		let imageUrl = imageUrlInput || prev.imageUrl;
		if (file instanceof File && file.size > 0) {
			const ext = safeExtFromType(file.type);
			if (!ext) return fail(400, {
				scope: "update",
				message: "Format gambar harus JPG, PNG, WEBP, atau GIF."
			});
			if (file.size > MAX_IMAGE_BYTES) return fail(400, {
				scope: "update",
				message: "Ukuran gambar maksimal 6MB."
			});
			const newUrl = await writeGalleryUpload(file, ext);
			await deleteGalleryImageIfExists(prev.imageUrl);
			imageUrl = newUrl;
		}
		if (!imageUrl) return fail(400, {
			scope: "update",
			message: "Image URL tidak boleh kosong."
		});
		gallery[idx] = {
			id,
			imageUrl,
			alt,
			...caption ? { caption } : {}
		};
		await writeGallery(gallery);
		return {
			ok: true,
			message: "Data galeri berhasil diperbarui."
		};
	},
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = Number(form.get("id")?.toString() ?? "");
		if (!Number.isFinite(id)) return fail(400, {
			scope: "delete",
			message: "ID galeri tidak valid."
		});
		const gallery = await readGallery();
		const idx = gallery.findIndex((g) => g.id === id);
		if (idx < 0) return fail(404, {
			scope: "delete",
			message: "Data galeri tidak ditemukan."
		});
		const [removed] = gallery.splice(idx, 1);
		await writeGallery(gallery);
		await deleteGalleryImageIfExists(removed.imageUrl);
		return {
			ok: true,
			message: "Foto galeri berhasil dihapus."
		};
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B9hZzQd5.js')).default;
const server_id = "src/routes/admin/gallery/+page.server.ts";
const imports = ["_app/immutable/nodes/7.Dp43Kuld.js","_app/immutable/chunks/DKj7emCc.js","_app/immutable/chunks/CuyqONxg.js","_app/immutable/chunks/Ew9Mtm18.js"];
const stylesheets = ["_app/immutable/assets/7.DDTCHP0g.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-DS-HiyG6.js.map
