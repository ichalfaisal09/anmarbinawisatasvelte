import { e as error } from './index-Cge00w53.js';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import './index-DBqjc0Yf.js';

//#region src/routes/uploads/[...path]/+server.ts
var STATIC_UPLOADS_ROOT = path.resolve(process.cwd(), "static", "uploads");
var BUILT_UPLOADS_ROOT = path.resolve(process.cwd(), "build", "client", "uploads");
var CONTENT_TYPES = {
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".png": "image/png",
	".webp": "image/webp",
	".gif": "image/gif",
	".svg": "image/svg+xml"
};
function safeRelativePath(value) {
	const normalized = value.replace(/\\/g, "/").replace(/^\/+/, "");
	if (!normalized || normalized.includes("\0")) return null;
	const parts = normalized.split("/").filter(Boolean);
	if (parts.some((p) => p === "." || p === "..")) return null;
	return parts.join("/");
}
async function findFile(relativePath) {
	const candidates = [path.join(BUILT_UPLOADS_ROOT, relativePath), path.join(STATIC_UPLOADS_ROOT, relativePath)];
	for (const absPath of candidates) try {
		await access(absPath);
		return absPath;
	} catch {}
	return null;
}
var GET = async ({ params }) => {
	const requested = safeRelativePath(params.path ?? "");
	if (!requested) throw error(404, "Not found");
	const absPath = await findFile(requested);
	if (!absPath) throw error(404, "Not found");
	const contentType = CONTENT_TYPES[path.extname(absPath).toLowerCase()] ?? "application/octet-stream";
	const body = await readFile(absPath);
	return new Response(body, { headers: {
		"content-type": contentType,
		"cache-control": "public, max-age=3600"
	} });
};

export { GET };
//# sourceMappingURL=_server.ts-BHi9_Ua5.js.map
