import { w as writeLegalitas, r as readLegalitas } from './legalitas-store-D6hanZvf.js';
import { w as writeRekening, r as readRekening } from './rekening-store-m006ullS.js';
import { f as fail } from './index-Cge00w53.js';
import 'node:fs/promises';
import 'node:path';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/informasi/+page.server.ts
var load = async () => {
	const [legalitas, rekening] = await Promise.all([readLegalitas(), readRekening()]);
	return {
		legalitas,
		rekening
	};
};
var actions = {
	saveLegalitas: async ({ request }) => {
		const form = await request.formData();
		const ppiuLicenseNumber = form.get("ppiuLicenseNumber")?.toString().trim() ?? "";
		const ppiuValidUntil = form.get("ppiuValidUntil")?.toString().trim() ?? "";
		const pihkLicenseNumber = form.get("pihkLicenseNumber")?.toString().trim() ?? "";
		const pihkValidUntil = form.get("pihkValidUntil")?.toString().trim() ?? "";
		const docsRaw = form.get("companyDocs")?.toString().trim() ?? "";
		if (!ppiuLicenseNumber || !pihkLicenseNumber) return fail(400, {
			scope: "legalitas",
			message: "Nomor izin PPIU dan PIHK wajib diisi."
		});
		const companyDocs = docsRaw.split("\n").map((v) => v.trim()).filter(Boolean).map((name) => ({ name }));
		await writeLegalitas({
			permits: [{
				id: "ppiu",
				title: "Izin PPIU",
				subtitle: "Penyelenggara Perjalanan Ibadah Umrah",
				licenseNumber: ppiuLicenseNumber,
				validUntil: ppiuValidUntil || "-"
			}, {
				id: "pihk",
				title: "Izin PIHK",
				subtitle: "Penyelenggara Ibadah Haji Khusus",
				licenseNumber: pihkLicenseNumber,
				validUntil: pihkValidUntil || "-"
			}],
			companyDocs
		});
		return {
			ok: true,
			scope: "legalitas",
			message: "Data legalitas berhasil disimpan."
		};
	},
	saveRekening: async ({ request }) => {
		const form = await request.formData();
		const accounts = [{
			id: "bsi",
			bank: form.get("bsiBank")?.toString().trim() ?? "",
			branch: form.get("bsiBranch")?.toString().trim() ?? "",
			accountNumber: form.get("bsiNumber")?.toString().trim() ?? "",
			accountName: form.get("bsiName")?.toString().trim() ?? "",
			logoUrl: form.get("bsiLogoUrl")?.toString().trim() ?? "",
			logoAlt: form.get("bsiLogoAlt")?.toString().trim() ?? ""
		}, {
			id: "mandiri",
			bank: form.get("mandiriBank")?.toString().trim() ?? "",
			branch: form.get("mandiriBranch")?.toString().trim() ?? "",
			accountNumber: form.get("mandiriNumber")?.toString().trim() ?? "",
			accountName: form.get("mandiriName")?.toString().trim() ?? "",
			logoUrl: form.get("mandiriLogoUrl")?.toString().trim() ?? "",
			logoAlt: form.get("mandiriLogoAlt")?.toString().trim() ?? ""
		}];
		for (const acc of accounts) if (!acc.bank || !acc.accountNumber || !acc.accountName) return fail(400, {
			scope: "rekening",
			message: "Nama bank, nomor rekening, dan atas nama wajib diisi untuk semua rekening."
		});
		await writeRekening(accounts);
		return {
			ok: true,
			scope: "rekening",
			message: "Data rekening berhasil disimpan."
		};
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-ydB2QwkM.js')).default;
const server_id = "src/routes/admin/informasi/+page.server.ts";
const imports = ["_app/immutable/nodes/8.BZYs7LhF.js","_app/immutable/chunks/DKj7emCc.js","_app/immutable/chunks/CuyqONxg.js"];
const stylesheets = ["_app/immutable/assets/8.DmsRYSR7.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-y0Cw88bM.js.map
