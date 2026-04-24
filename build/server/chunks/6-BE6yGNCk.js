import { r as readEventLogs } from './event-log-store-C0zSoTWZ.js';
import { r as readCompanySettings, w as writeCompanySettings } from './company-store-CKixtk89.js';
import { f as fail } from './index-Cge00w53.js';
import 'node:fs/promises';
import 'node:path';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/analytics/+page.server.ts
var load = async ({ url }) => {
	const settings = await readCompanySettings();
	const daysRaw = Number(url.searchParams.get("days") ?? "7");
	const days = Number.isFinite(daysRaw) && daysRaw > 0 ? Math.min(daysRaw, 90) : 7;
	const cutoff = Date.now() - days * 24 * 60 * 60 * 1e3;
	const logs = (await readEventLogs()).filter((l) => Number.isFinite(l.timestamp) && l.timestamp >= cutoff).sort((a, b) => b.timestamp - a.timestamp).slice(0, 250);
	return {
		settings,
		logs,
		days,
		eventCounts: logs.reduce((acc, item) => {
			acc[item.event] = (acc[item.event] ?? 0) + 1;
			return acc;
		}, {})
	};
};
var actions = { save: async ({ request }) => {
	const form = await request.formData();
	const current = await readCompanySettings();
	const trackingEnabled = form.get("trackingEnabled") === "on";
	const ga4MeasurementId = form.get("ga4MeasurementId")?.toString().trim() ?? "";
	const metaPixelId = form.get("metaPixelId")?.toString().trim() ?? "";
	if (ga4MeasurementId && !/^G-[A-Z0-9]+$/i.test(ga4MeasurementId)) return fail(400, {
		message: "GA4 Measurement ID tidak valid. Contoh: G-ABCDEFG123",
		scope: "analytics"
	});
	if (metaPixelId && !/^\d+$/.test(metaPixelId)) return fail(400, {
		message: "Meta Pixel ID harus berupa angka.",
		scope: "analytics"
	});
	await writeCompanySettings({
		...current,
		trackingEnabled,
		ga4MeasurementId,
		metaPixelId
	});
	return {
		ok: true,
		message: "Konfigurasi analytics berhasil disimpan."
	};
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CYay1aJW.js')).default;
const server_id = "src/routes/admin/analytics/+page.server.ts";
const imports = ["_app/immutable/nodes/6.Crptgpfr.js","_app/immutable/chunks/DKj7emCc.js","_app/immutable/chunks/gS-uQ4e-.js","_app/immutable/chunks/CcMOAZLZ.js","_app/immutable/chunks/CuyqONxg.js"];
const stylesheets = ["_app/immutable/assets/6.BR0eNVlh.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-BE6yGNCk.js.map
