import { r as readCompanySettings, w as writeCompanySettings } from './company-store-CKixtk89.js';
import { b as changeAdminPassword } from './admin-auth-B3kpOIuR.js';
import { g as getWritableUploadsDir, t as toUploadPublicUrl, d as deleteUploadedFile } from './upload-storage-BeFWmdhX.js';
import { f as fail } from './index-Cge00w53.js';
import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import './shared-server-9-2j12mp.js';
import 'node:fs';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/settings/+page.server.ts
var MAX_LOGO_BYTES = 2 * 1024 * 1024;
function safeExtFromType(type) {
	const t = type.toLowerCase();
	if (t === "image/jpeg") return "jpg";
	if (t === "image/png") return "png";
	if (t === "image/webp") return "webp";
	if (t === "image/gif") return "gif";
	return null;
}
async function deleteUploadIfExists(imageUrl) {
	if (!imageUrl?.startsWith("/uploads/")) return;
	const filename = imageUrl.slice(9);
	if (!filename) return;
	await deleteUploadedFile(filename);
}
async function writeCompanyLogoFile(file) {
	const ext = safeExtFromType(file.type);
	if (!ext) throw new Error("Format logo harus JPG, PNG, WEBP, atau GIF.");
	if (file.size > MAX_LOGO_BYTES) throw new Error("Ukuran logo maksimal 2MB.");
	const uploadsDir = await getWritableUploadsDir();
	const filename = `company-logo-${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
	await writeFile(path.join(uploadsDir, filename), Buffer.from(await file.arrayBuffer()));
	return toUploadPublicUrl(filename);
}
var load = async () => {
	return { settings: await readCompanySettings() };
};
var actions = {
	saveBrand: async ({ request }) => {
		const form = await request.formData();
		const companyName = form.get("companyName")?.toString().trim() ?? "";
		const adminSidebarSubtitle = form.get("adminSidebarSubtitle")?.toString().trim() ?? "";
		const file = form.get("logo");
		const repopBrand = {
			companyName,
			adminSidebarSubtitle
		};
		if (!companyName) return fail(400, {
			message: "Nama perusahaan wajib diisi.",
			scope: "brand",
			companyName: "",
			adminSidebarSubtitle
		});
		const current = await readCompanySettings();
		let logoUrl = current.logoUrl || "";
		if (file instanceof File && file.size > 0) try {
			const newUrl = await writeCompanyLogoFile(file);
			await deleteUploadIfExists(current.logoUrl);
			logoUrl = newUrl;
		} catch (e) {
			return fail(400, {
				message: e instanceof Error ? e.message : "Gagal mengunggah logo.",
				scope: "brand",
				...repopBrand
			});
		}
		await writeCompanySettings({
			...current,
			companyName,
			logoUrl,
			adminSidebarSubtitle
		});
		return {
			ok: true,
			message: "Identitas perusahaan disimpan."
		};
	},
	save: async ({ request }) => {
		const form = await request.formData();
		const current = await readCompanySettings();
		const waNumber = form.get("waNumber")?.toString().trim() ?? "";
		const officePhone = form.get("officePhone")?.toString().trim() ?? "";
		const email = form.get("email")?.toString().trim() ?? "";
		const address = form.get("address")?.toString().trim() ?? "";
		const officeHours = form.get("officeHours")?.toString().trim() ?? "";
		const mapsUrl = form.get("mapsUrl")?.toString().trim() ?? "";
		if (email && !email.includes("@")) return fail(400, {
			message: "Email tidak valid.",
			scope: "contact"
		});
		if (mapsUrl && !(mapsUrl.startsWith("http://") || mapsUrl.startsWith("https://"))) return fail(400, {
			message: "Maps URL harus diawali http:// atau https://.",
			scope: "contact"
		});
		await writeCompanySettings({
			...current,
			waNumber,
			officePhone,
			email,
			address,
			officeHours,
			mapsUrl
		});
		return {
			ok: true,
			message: "Kontak berhasil disimpan."
		};
	},
	savePassword: async ({ request }) => {
		const form = await request.formData();
		const currentPassword = form.get("currentPassword")?.toString() ?? "";
		const newPassword = form.get("newPassword")?.toString() ?? "";
		const confirmPassword = form.get("confirmPassword")?.toString() ?? "";
		if (!currentPassword || !newPassword || !confirmPassword) return fail(400, {
			scope: "security",
			message: "Semua kolom password wajib diisi."
		});
		if (newPassword !== confirmPassword) return fail(400, {
			scope: "security",
			message: "Konfirmasi password baru tidak sama."
		});
		const res = changeAdminPassword(currentPassword, newPassword);
		if (!res.ok) return fail(400, {
			scope: "security",
			message: res.message
		});
		return {
			ok: true,
			scope: "security",
			message: res.message
		};
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BziG74DI.js')).default;
const server_id = "src/routes/admin/settings/+page.server.ts";
const imports = ["_app/immutable/nodes/12.CiPPnOu7.js","_app/immutable/chunks/DKj7emCc.js","_app/immutable/chunks/_CHPEwH2.js","_app/immutable/chunks/C92BYtAW.js","_app/immutable/chunks/CuyqONxg.js"];
const stylesheets = ["_app/immutable/assets/12.n3iocnYM.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-wNlSIOuE.js.map
