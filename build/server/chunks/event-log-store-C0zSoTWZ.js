import { writeFile, readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

//#region src/lib/server/event-log-store.ts
var EVENT_LOG_PATH = path.resolve(process.cwd(), "data", "event-logs.json");
async function ensureParentDir(filePath) {
	await mkdir(path.dirname(filePath), { recursive: true });
}
async function readEventLogs() {
	try {
		const raw = await readFile(EVENT_LOG_PATH, "utf8");
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed;
	} catch {
		return [];
	}
}
async function appendEventLog(item) {
	const existing = await readEventLogs();
	existing.push(item);
	const next = existing.slice(-5e3);
	await ensureParentDir(EVENT_LOG_PATH);
	await writeFile(EVENT_LOG_PATH, `${JSON.stringify(next, null, 2)}\n`, "utf8");
}

export { appendEventLog as a, readEventLogs as r };
//# sourceMappingURL=event-log-store-C0zSoTWZ.js.map
