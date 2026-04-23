import { json } from '@sveltejs/kit';
import { randomUUID } from 'node:crypto';
import { appendEventLog } from '$lib/server/event-log-store';

type IncomingTrackBody = {
	event?: unknown;
	timestamp?: unknown;
	pathname?: unknown;
	source?: unknown;
	payload?: unknown;
};

function sanitizePayload(value: unknown): Record<string, string | number | boolean> {
	if (!value || typeof value !== 'object') return {};
	const out: Record<string, string | number | boolean> = {};
	for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
		if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
			out[k] = v;
		}
	}
	return out;
}

export const POST = async ({ request }) => {
	try {
		const body = (await request.json()) as IncomingTrackBody;
		const event = String(body.event ?? '').trim();
		if (!event) return json({ ok: false, message: 'Event kosong.' }, { status: 400 });

		const timestampNum = Number(body.timestamp);
		const timestamp = Number.isFinite(timestampNum) ? timestampNum : Date.now();
		const pathname = String(body.pathname ?? '').trim() || '/';
		const source = String(body.source ?? '').trim() || 'web';
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
		return json({ ok: false, message: 'Gagal mencatat event.' }, { status: 500 });
	}
};
