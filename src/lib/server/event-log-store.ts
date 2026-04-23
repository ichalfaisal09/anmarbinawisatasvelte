import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export type EventLogItem = {
	id: string;
	event: string;
	timestamp: number;
	source: string;
	pathname: string;
	payload: Record<string, string | number | boolean>;
};

const EVENT_LOG_PATH = path.resolve(process.cwd(), 'data', 'event-logs.json');
const MAX_LOG_ITEMS = 5000;

async function ensureParentDir(filePath: string) {
	await mkdir(path.dirname(filePath), { recursive: true });
}

export async function readEventLogs(): Promise<EventLogItem[]> {
	try {
		const raw = await readFile(EVENT_LOG_PATH, 'utf8');
		const parsed = JSON.parse(raw) as unknown;
		if (!Array.isArray(parsed)) return [];
		return parsed as EventLogItem[];
	} catch {
		return [];
	}
}

export async function appendEventLog(item: EventLogItem): Promise<void> {
	const existing = await readEventLogs();
	existing.push(item);
	const next = existing.slice(-MAX_LOG_ITEMS);
	await ensureParentDir(EVENT_LOG_PATH);
	await writeFile(EVENT_LOG_PATH, `${JSON.stringify(next, null, 2)}\n`, 'utf8');
}
