import { constants } from 'node:fs';
import { access, mkdir, unlink } from 'node:fs/promises';
import path from 'node:path';

const STATIC_UPLOADS_ROOT = path.resolve(process.cwd(), 'static', 'uploads');
const BUILT_UPLOADS_ROOT = path.resolve(process.cwd(), 'build', 'client', 'uploads');
const DATA_UPLOADS_ROOT = path.resolve(process.cwd(), 'data', 'uploads');

async function exists(absPath: string) {
	try {
		await access(absPath);
		return true;
	} catch {
		return false;
	}
}

function normalizeRelativePath(relativePath: string) {
	return relativePath.replace(/^[/\\]+/, '').replace(/\\/g, '/');
}

async function ensureWritable(absDir: string) {
	try {
		await mkdir(absDir, { recursive: true });
		await access(absDir, constants.W_OK);
		return true;
	} catch {
		return false;
	}
}

export async function getWritableUploadsDir(subdir = '') {
	const buildClientDir = path.resolve(process.cwd(), 'build', 'client');
	const roots = (await exists(buildClientDir))
		? [BUILT_UPLOADS_ROOT, STATIC_UPLOADS_ROOT, DATA_UPLOADS_ROOT]
		: [STATIC_UPLOADS_ROOT, DATA_UPLOADS_ROOT];

	for (const root of roots) {
		const absDir = subdir ? path.join(root, subdir) : root;
		if (await ensureWritable(absDir)) return absDir;
	}

	throw new Error('Tidak ada direktori uploads yang writable di server.');
}

export function toUploadPublicUrl(filename: string, subdir = '') {
	const cleanSubdir = normalizeRelativePath(subdir);
	return cleanSubdir ? `/uploads/${cleanSubdir}/${filename}` : `/uploads/${filename}`;
}

export async function deleteUploadedFile(relativePath: string) {
	const clean = normalizeRelativePath(relativePath);
	if (!clean || clean.startsWith('..')) return;

	const targets = [
		path.join(STATIC_UPLOADS_ROOT, clean),
		path.join(BUILT_UPLOADS_ROOT, clean),
		path.join(DATA_UPLOADS_ROOT, clean)
	];
	await Promise.all(
		targets.map(async (absPath) => {
			try {
				await unlink(absPath);
			} catch {
				// ignore if missing
			}
		})
	);
}
