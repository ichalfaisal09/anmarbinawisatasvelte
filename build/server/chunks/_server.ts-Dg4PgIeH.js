import { a as appendEventLog } from './event-log-store-C0zSoTWZ.js';
import { j as json } from './index-Cge00w53.js';
import { randomUUID } from 'node:crypto';
import 'node:fs/promises';
import 'node:path';
import './index-DBqjc0Yf.js';

//#region src/routes/api/track/+server.ts
function sanitizePayload(value) {
	if (!value || typeof value !== "object") return {};
	const out = {};
	for (const [k, v] of Object.entries(value)) if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") out[k] = v;
	return out;
}
var POST = async ({ request }) => {
	try {
		const body = await request.json();
		const event = String(body.event ?? "").trim();
		if (!event) return json({
			ok: false,
			message: "Event kosong."
		}, { status: 400 });
		const timestampNum = Number(body.timestamp);
		const timestamp = Number.isFinite(timestampNum) ? timestampNum : Date.now();
		const pathname = String(body.pathname ?? "").trim() || "/";
		const source = String(body.source ?? "").trim() || "web";
		const payload = sanitizePayload(body.payload);
		await appendEventLog({
			id: randomUUID(),
			event,
			timestamp,
			pathname,
			source,
			payload
		});
		return json({ ok: true });
	} catch {
		return json({
			ok: false,
			message: "Gagal mencatat event."
		}, { status: 500 });
	}
};

export { POST };
//# sourceMappingURL=_server.ts-Dg4PgIeH.js.map
