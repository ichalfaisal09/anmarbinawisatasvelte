export function toMediaUrl(input: string | null | undefined) {
	const raw = String(input ?? '').trim();
	if (!raw) return '';

	// Keep absolute/network/data/blob URLs as-is.
	if (/^(https?:)?\/\//i.test(raw) || /^(data:|blob:)/i.test(raw)) return raw;

	// Ensure local paths are root-relative (e.g. uploads/x.jpg -> /uploads/x.jpg).
	return raw.startsWith('/') ? raw : `/${raw.replace(/^\/+/, '')}`;
}
