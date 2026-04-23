import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export type BankAccount = {
	id: string;
	bank: string;
	branch: string;
	accountNumber: string;
	accountName: string;
	logoUrl: string;
	logoAlt: string;
};

const REKENING_JSON_PATH = path.resolve(process.cwd(), 'data', 'rekening.json');

export async function readRekening(): Promise<BankAccount[]> {
	try {
		const raw = await readFile(REKENING_JSON_PATH, 'utf8');
		const parsed = JSON.parse(raw) as unknown;
		if (!Array.isArray(parsed)) return [];
		return parsed as BankAccount[];
	} catch {
		return [];
	}
}

async function ensureParentDir(filePath: string) {
	await mkdir(path.dirname(filePath), { recursive: true });
}

export async function writeRekening(accounts: BankAccount[]): Promise<void> {
	await ensureParentDir(REKENING_JSON_PATH);
	await writeFile(REKENING_JSON_PATH, `${JSON.stringify(accounts, null, 2)}\n`, 'utf8');
}
