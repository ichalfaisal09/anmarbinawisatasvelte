import { imageSize } from 'image-size';

export const MAX_IMAGE_BYTES = 6 * 1024 * 1024;
export const MAX_IMAGE_DIMENSION = 4096;

export async function validateImageUpload(file: File) {
	if (file.size > MAX_IMAGE_BYTES) {
		return { ok: false as const, message: 'Ukuran gambar maksimal 6MB.' };
	}

	try {
		const buffer = Buffer.from(await file.arrayBuffer());
		const dim = imageSize(buffer);
		const width = Number(dim.width ?? 0);
		const height = Number(dim.height ?? 0);
		if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
			return { ok: false as const, message: 'Dimensi gambar tidak dapat dibaca. Gunakan file gambar yang valid.' };
		}
		if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
			return {
				ok: false as const,
				message: `Dimensi gambar maksimal ${MAX_IMAGE_DIMENSION}x${MAX_IMAGE_DIMENSION}px.`
			};
		}
		return { ok: true as const, buffer };
	} catch {
		return { ok: false as const, message: 'Gagal membaca dimensi gambar. Coba upload file lain.' };
	}
}
