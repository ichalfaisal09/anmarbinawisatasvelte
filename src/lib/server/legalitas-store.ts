import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export type LegalPermit = {
	id: string;
	title: string;
	subtitle: string;
	licenseNumber: string;
	validUntil: string;
};

export type CompanyDoc = {
	name: string;
};

type LegalitasData = {
	permits: LegalPermit[];
	companyDocs: CompanyDoc[];
};

const LEGALITAS_JSON_PATH = path.resolve(process.cwd(), 'data', 'legalitas.json');

const DEFAULT_LEGALITAS: LegalitasData = {
	permits: [],
	companyDocs: []
};

export async function readLegalitas(): Promise<LegalitasData> {
	try {
		const raw = await readFile(LEGALITAS_JSON_PATH, 'utf8');
		const parsed = JSON.parse(raw) as Partial<LegalitasData>;
		return {
			permits: Array.isArray(parsed.permits) ? parsed.permits : [],
			companyDocs: Array.isArray(parsed.companyDocs) ? parsed.companyDocs : []
		};
	} catch {
		return DEFAULT_LEGALITAS;
	}
}

async function ensureParentDir(filePath: string) {
	await mkdir(path.dirname(filePath), { recursive: true });
}

export async function writeLegalitas(data: LegalitasData): Promise<void> {
	await ensureParentDir(LEGALITAS_JSON_PATH);
	await writeFile(LEGALITAS_JSON_PATH, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}
