import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

export type GalleryItem = {
	id: number;
	imageUrl: string;
	/** Teks alternatif untuk aksesibilitas (wajib diisi). */
	alt: string;
	/** Keterangan singkat opsional di bawah foto. */
	caption?: string;
};

const GALLERY_JSON_PATH = path.resolve(process.cwd(), 'data', 'gallery.json');

async function ensureParentDir(filePath: string) {
	await mkdir(path.dirname(filePath), { recursive: true });
}

function normalizeItem(raw: unknown): GalleryItem | null {
	if (!raw || typeof raw !== 'object') return null;
	const o = raw as Record<string, unknown>;
	const id = Number(o.id);
	const imageUrl = String(o.imageUrl ?? '').trim();
	const alt = String(o.alt ?? '').trim();
	if (!Number.isFinite(id) || !imageUrl || !alt) return null;
	const caption = String(o.caption ?? '').trim();
	return {
		id,
		imageUrl,
		alt,
		...(caption ? { caption } : {})
	};
}

export async function readGallery(): Promise<GalleryItem[]> {
	try {
		const raw = await readFile(GALLERY_JSON_PATH, 'utf8');
		const parsed = JSON.parse(raw) as unknown;
		if (!Array.isArray(parsed)) return [];

		const out: GalleryItem[] = [];
		for (let i = 0; i < parsed.length; i++) {
			const item = normalizeItem(parsed[i]);
			if (item) out.push(item);
		}
		return out.sort((a, b) => a.id - b.id);
	} catch {
		return [];
	}
}

export async function writeGallery(items: GalleryItem[]): Promise<void> {
	await ensureParentDir(GALLERY_JSON_PATH);
	const body = `${JSON.stringify(items, null, 2)}\n`;
	await writeFile(GALLERY_JSON_PATH, body, 'utf8');
}
