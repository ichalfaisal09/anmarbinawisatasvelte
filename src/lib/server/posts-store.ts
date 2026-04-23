import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

export type FeedPostItem = {
	id: number;
	title: string;
	imageUrl: string;
	createdAt: string;
	expiresAt: string;
};

const POSTS_JSON_PATH = path.resolve(process.cwd(), 'data', 'posts.json');

async function ensureParentDir(filePath: string) {
	await mkdir(path.dirname(filePath), { recursive: true });
}

export async function readPosts(): Promise<FeedPostItem[]> {
	try {
		const raw = await readFile(POSTS_JSON_PATH, 'utf8');
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];

		// Backward compatible: older items might include `waLink`.
		return parsed
			.map((p) => {
				const id = Number(p?.id);
				const title = String(p?.title ?? '').trim();
				const imageUrl = String(p?.imageUrl ?? '').trim();
				const createdAtRaw = p?.createdAt ? String(p.createdAt) : '';
				const expiresAtRaw = p?.expiresAt ? String(p.expiresAt) : '';

				let createdAt = createdAtRaw;
				let expiresAt = expiresAtRaw;

				// If missing dates, infer sensible defaults without breaking old data.
				if (!createdAt) createdAt = new Date().toISOString();
				if (!expiresAt) {
					const base = Date.parse(createdAt);
					const d = Number.isFinite(base) ? new Date(base) : new Date();
					d.setDate(d.getDate() + 30);
					expiresAt = d.toISOString();
				}

				return { id, title, imageUrl, createdAt, expiresAt };
			})
			.filter((p) => Number.isFinite(p.id) && p.title && p.imageUrl);
	} catch {
		return [];
	}
}

export async function writePosts(posts: FeedPostItem[]) {
	await ensureParentDir(POSTS_JSON_PATH);
	await writeFile(POSTS_JSON_PATH, JSON.stringify(posts, null, 2) + '\n', 'utf8');
}

