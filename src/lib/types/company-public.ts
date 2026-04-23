/**
 * Bentuk perusahaan di UI publik (selaras `data/company.json`).
 * Jangan impor modul server (`company-store`) dari komponen klien.
 */
export type CompanyPublic = {
	companyName: string;
	logoUrl: string;
	adminSidebarSubtitle?: string;
	ga4MeasurementId?: string;
	metaPixelId?: string;
	trackingEnabled?: boolean;
	waNumber: string;
	officePhone: string;
	email: string;
	address: string;
	officeHours: string;
	mapsUrl: string;
};
