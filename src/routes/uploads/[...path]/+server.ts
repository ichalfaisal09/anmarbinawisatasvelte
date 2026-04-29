import { error } from '@sveltejs/kit';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const STATIC_UPLOADS_ROOT = path.resolve(process.cwd(), 'static', 'uploads');
const BUILT_UPLOADS_ROOT = path.resolve(process.cwd(), 'build', 'client', 'uploads');
const DATA_UPLOADS_ROOT = path.resolve(process.cwd(), 'data', 'uploads');

const CONTENT_TYPES: Record<string, string> = {
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml'
};

function safeRelativePath(value: string) {
	const normalized = value.replace(/\\/g, '/').replace(/^\/+/, '');
	if (!normalized || normalized.includes('\0')) return null;
	const parts = normalized.split('/').filter(Boolean);
	if (parts.some((p) => p === '.' || p === '..')) return null;
	return parts.join('/');
}

async function findFile(relativePath: string) {
	const candidates = [
		path.join(BUILT_UPLOADS_ROOT, relativePath),
		path.join(STATIC_UPLOADS_ROOT, relativePath),
		path.join(DATA_UPLOADS_ROOT, relativePath)
	];

	for (const absPath of candidates) {
		try {
			await access(absPath);
			return absPath;
		} catch {
			// try next candidate
		}
	}
	return null;
}

export const GET = async ({ params }) => {
	const requested = safeRelativePath(params.path ?? '');
	if (!requested) throw error(404, 'Not found');

	const absPath = await findFile(requested);
	if (!absPath) throw error(404, 'Not found');

	const ext = path.extname(absPath).toLowerCase();
	const contentType = CONTENT_TYPES[ext] ?? 'application/octet-stream';
	const body = await readFile(absPath);

	return new Response(body, {
		headers: {
			'content-type': contentType,
			'cache-control': 'public, max-age=3600'
		}
	});
};
