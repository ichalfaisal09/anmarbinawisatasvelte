import { writeFile, readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

//#region src/lib/server/rekening-store.ts
var REKENING_JSON_PATH = path.resolve(process.cwd(), "data", "rekening.json");
async function readRekening() {
	try {
		const raw = await readFile(REKENING_JSON_PATH, "utf8");
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed;
	} catch {
		return [];
	}
}
async function ensureParentDir(filePath) {
	await mkdir(path.dirname(filePath), { recursive: true });
}
async function writeRekening(accounts) {
	await ensureParentDir(REKENING_JSON_PATH);
	await writeFile(REKENING_JSON_PATH, `${JSON.stringify(accounts, null, 2)}\n`, "utf8");
}

export { readRekening as r, writeRekening as w };
//# sourceMappingURL=rekening-store-m006ullS.js.map
