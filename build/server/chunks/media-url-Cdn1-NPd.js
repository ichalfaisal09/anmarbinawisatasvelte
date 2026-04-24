//#region src/lib/media-url.ts
function toMediaUrl(input) {
	const raw = String(input ?? "").trim();
	if (!raw) return "";
	if (/^(https?:)?\/\//i.test(raw) || /^(data:|blob:)/i.test(raw)) return raw;
	return raw.startsWith("/") ? raw : `/${raw.replace(/^\/+/, "")}`;
}

export { toMediaUrl as t };
//# sourceMappingURL=media-url-Cdn1-NPd.js.map
