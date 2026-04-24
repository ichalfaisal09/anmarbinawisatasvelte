import { unlink, mkdir, access } from 'node:fs/promises';
import path from 'node:path';

//#region src/lib/server/upload-storage.ts
var STATIC_UPLOADS_ROOT = path.resolve(process.cwd(), "static", "uploads");
var BUILT_UPLOADS_ROOT = path.resolve(process.cwd(), "build", "client", "uploads");
async function exists(absPath) {
	try {
		await access(absPath);
		return true;
	} catch {
		return false;
	}
}
function normalizeRelativePath(relativePath) {
	return relativePath.replace(/^[/\\]+/, "").replace(/\\/g, "/");
}
async function getWritableUploadsDir(subdir = "") {
	const root = await exists(path.resolve(process.cwd(), "build", "client")) ? BUILT_UPLOADS_ROOT : STATIC_UPLOADS_ROOT;
	const absDir = subdir ? path.join(root, subdir) : root;
	await mkdir(absDir, { recursive: true });
	return absDir;
}
function toUploadPublicUrl(filename, subdir = "") {
	const cleanSubdir = normalizeRelativePath(subdir);
	return cleanSubdir ? `/uploads/${cleanSubdir}/${filename}` : `/uploads/${filename}`;
}
async function deleteUploadedFile(relativePath) {
	const clean = normalizeRelativePath(relativePath);
	if (!clean || clean.startsWith("..")) return;
	const targets = [path.join(STATIC_UPLOADS_ROOT, clean), path.join(BUILT_UPLOADS_ROOT, clean)];
	await Promise.all(targets.map(async (absPath) => {
		try {
			await unlink(absPath);
		} catch {}
	}));
}

export { deleteUploadedFile as d, getWritableUploadsDir as g, toUploadPublicUrl as t };
//# sourceMappingURL=upload-storage-BeFWmdhX.js.map
