import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

export type CompanySettings = {
	companyName: string;
	logoUrl: string;
	/** Teks di bawah nama di sidebar admin (mis. "Admin Panel"). */
	adminSidebarSubtitle: string;
	waNumber: string;
	officePhone: string;
	email: string;
	address: string;
	officeHours: string;
	mapsUrl: string;
};

const COMPANY_JSON_PATH = path.resolve(process.cwd(), 'data', 'company.json');

const DEFAULT_SETTINGS: CompanySettings = {
	companyName: '',
	logoUrl: '',
	adminSidebarSubtitle: '',
	waNumber: '',
	officePhone: '',
	email: '',
	address: '',
	officeHours: '',
	mapsUrl: ''
};

async function ensureParentDir(filePath: string) {
	await mkdir(path.dirname(filePath), { recursive: true });
}

export async function readCompanySettings(): Promise<CompanySettings> {
	try {
		const raw = await readFile(COMPANY_JSON_PATH, 'utf8');
		const parsed = JSON.parse(raw) as Partial<CompanySettings>;
		return { ...DEFAULT_SETTINGS, ...parsed };
	} catch {
		return DEFAULT_SETTINGS;
	}
}

export async function writeCompanySettings(settings: CompanySettings) {
	await ensureParentDir(COMPANY_JSON_PATH);
	await writeFile(COMPANY_JSON_PATH, JSON.stringify(settings, null, 2) + '\n', 'utf8');
}
