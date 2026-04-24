import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

//#region src/lib/server/company-store.ts
var COMPANY_JSON_PATH = path.resolve(process.cwd(), "data", "company.json");
var DEFAULT_SETTINGS = {
	companyName: "",
	logoUrl: "",
	adminSidebarSubtitle: "",
	ga4MeasurementId: "",
	metaPixelId: "",
	trackingEnabled: false,
	waNumber: "",
	officePhone: "",
	email: "",
	address: "",
	officeHours: "",
	mapsUrl: ""
};
async function ensureParentDir(filePath) {
	await mkdir(path.dirname(filePath), { recursive: true });
}
async function readCompanySettings() {
	try {
		const raw = await readFile(COMPANY_JSON_PATH, "utf8");
		const parsed = JSON.parse(raw);
		return {
			...DEFAULT_SETTINGS,
			...parsed
		};
	} catch {
		return DEFAULT_SETTINGS;
	}
}
async function writeCompanySettings(settings) {
	await ensureParentDir(COMPANY_JSON_PATH);
	await writeFile(COMPANY_JSON_PATH, JSON.stringify(settings, null, 2) + "\n", "utf8");
}

export { readCompanySettings as r, writeCompanySettings as w };
//# sourceMappingURL=company-store-CKixtk89.js.map
