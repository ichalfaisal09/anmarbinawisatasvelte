import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

//#region src/lib/server/posts-store.ts
var POSTS_JSON_PATH = path.resolve(process.cwd(), "data", "posts.json");
async function ensureParentDir(filePath) {
	await mkdir(path.dirname(filePath), { recursive: true });
}
async function readPosts() {
	try {
		const raw = await readFile(POSTS_JSON_PATH, "utf8");
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.map((p) => {
			const id = Number(p?.id);
			const title = String(p?.title ?? "").trim();
			const imageUrl = String(p?.imageUrl ?? "").trim();
			const createdAtRaw = p?.createdAt ? String(p.createdAt) : "";
			const expiresAtRaw = p?.expiresAt ? String(p.expiresAt) : "";
			let createdAt = createdAtRaw;
			let expiresAt = expiresAtRaw;
			if (!createdAt) createdAt = (/* @__PURE__ */ new Date()).toISOString();
			if (!expiresAt) {
				const base = Date.parse(createdAt);
				const d = Number.isFinite(base) ? new Date(base) : /* @__PURE__ */ new Date();
				d.setDate(d.getDate() + 30);
				expiresAt = d.toISOString();
			}
			return {
				id,
				title,
				imageUrl,
				createdAt,
				expiresAt
			};
		}).filter((p) => Number.isFinite(p.id) && p.title && p.imageUrl);
	} catch {
		return [];
	}
}
async function writePosts(posts) {
	await ensureParentDir(POSTS_JSON_PATH);
	await writeFile(POSTS_JSON_PATH, JSON.stringify(posts, null, 2) + "\n", "utf8");
}

export { readPosts as r, writePosts as w };
//# sourceMappingURL=posts-store-BtfHtR9r.js.map
