import { writeFile, readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

//#region src/lib/server/legalitas-store.ts
var LEGALITAS_JSON_PATH = path.resolve(process.cwd(), "data", "legalitas.json");
var DEFAULT_LEGALITAS = {
	permits: [],
	companyDocs: []
};
async function readLegalitas() {
	try {
		const raw = await readFile(LEGALITAS_JSON_PATH, "utf8");
		const parsed = JSON.parse(raw);
		return {
			permits: Array.isArray(parsed.permits) ? parsed.permits : [],
			companyDocs: Array.isArray(parsed.companyDocs) ? parsed.companyDocs : []
		};
	} catch {
		return DEFAULT_LEGALITAS;
	}
}
async function ensureParentDir(filePath) {
	await mkdir(path.dirname(filePath), { recursive: true });
}
async function writeLegalitas(data) {
	await ensureParentDir(LEGALITAS_JSON_PATH);
	await writeFile(LEGALITAS_JSON_PATH, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export { readLegalitas as r, writeLegalitas as w };
//# sourceMappingURL=legalitas-store-D6hanZvf.js.map
