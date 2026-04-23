/** Rute publik utama — satu sumber kebenaran untuk path & pengecekan aktif. */
export const ROUTE = {
	HOME: '/',
	INFORMASI: '/informasi',
	INFORMASI_KONTAK: '/informasi/kontak'
} as const;

/** Samakan pathname (hilangkan trailing slash kecuali root). */
export function normalizePathname(pathname: string): string {
	if (pathname === '/' || pathname === '') return ROUTE.HOME;
	return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function isInformasiSection(path: string): boolean {
	return path === ROUTE.INFORMASI || path.startsWith(`${ROUTE.INFORMASI}/`);
}
