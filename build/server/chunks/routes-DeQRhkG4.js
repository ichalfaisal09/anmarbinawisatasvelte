//#region src/lib/routes.ts
/** Rute publik utama — satu sumber kebenaran untuk path & pengecekan aktif. */
var ROUTE = {
	HOME: "/",
	INFORMASI: "/informasi",
	INFORMASI_KONTAK: "/informasi/kontak"
};
/** Samakan pathname (hilangkan trailing slash kecuali root). */
function normalizePathname(pathname) {
	if (pathname === "/" || pathname === "") return ROUTE.HOME;
	return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}
function isInformasiSection(path) {
	return path === ROUTE.INFORMASI || path.startsWith(`${ROUTE.INFORMASI}/`);
}

export { ROUTE as R, isInformasiSection as i, normalizePathname as n };
//# sourceMappingURL=routes-DeQRhkG4.js.map
