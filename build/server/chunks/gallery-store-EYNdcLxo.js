import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

//#region src/lib/server/gallery-store.ts
var GALLERY_JSON_PATH = path.resolve(process.cwd(), "data", "gallery.json");
async function ensureParentDir(filePath) {
	await mkdir(path.dirname(filePath), { recursive: true });
}
function normalizeItem(raw) {
	if (!raw || typeof raw !== "object") return null;
	const o = raw;
	const id = Number(o.id);
	const imageUrl = String(o.imageUrl ?? "").trim();
	const alt = String(o.alt ?? "").trim();
	if (!Number.isFinite(id) || !imageUrl || !alt) return null;
	const caption = String(o.caption ?? "").trim();
	return {
		id,
		imageUrl,
		alt,
		...caption ? { caption } : {}
	};
}
async function readGallery() {
	try {
		const raw = await readFile(GALLERY_JSON_PATH, "utf8");
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		const out = [];
		for (let i = 0; i < parsed.length; i++) {
			const item = normalizeItem(parsed[i]);
			if (item) out.push(item);
		}
		return out.sort((a, b) => a.id - b.id);
	} catch {
		return [];
	}
}
async function writeGallery(items) {
	await ensureParentDir(GALLERY_JSON_PATH);
	await writeFile(GALLERY_JSON_PATH, `${JSON.stringify(items, null, 2)}\n`, "utf8");
}

export { readGallery as r, writeGallery as w };
//# sourceMappingURL=gallery-store-EYNdcLxo.js.map
