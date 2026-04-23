import { fail } from '@sveltejs/kit';
import { readCompanySettings, writeCompanySettings } from '$lib/server/company-store';
import { readEventLogs } from '$lib/server/event-log-store';

export const load = async ({ url }) => {
	const settings = await readCompanySettings();
	const daysRaw = Number(url.searchParams.get('days') ?? '7');
	const days = Number.isFinite(daysRaw) && daysRaw > 0 ? Math.min(daysRaw, 90) : 7;
	const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;

	const logsAll = await readEventLogs();
	const logs = logsAll
		.filter((l) => Number.isFinite(l.timestamp) && l.timestamp >= cutoff)
		.sort((a, b) => b.timestamp - a.timestamp)
		.slice(0, 250);

	const eventCounts = logs.reduce<Record<string, number>>((acc, item) => {
		acc[item.event] = (acc[item.event] ?? 0) + 1;
		return acc;
	}, {});

	return { settings, logs, days, eventCounts };
};

export const actions = {
	save: async ({ request }) => {
		const form = await request.formData();
		const current = await readCompanySettings();

		const trackingEnabled = form.get('trackingEnabled') === 'on';
		const ga4MeasurementId = form.get('ga4MeasurementId')?.toString().trim() ?? '';
		const metaPixelId = form.get('metaPixelId')?.toString().trim() ?? '';

		if (ga4MeasurementId && !/^G-[A-Z0-9]+$/i.test(ga4MeasurementId)) {
			return fail(400, {
				message: 'GA4 Measurement ID tidak valid. Contoh: G-ABCDEFG123',
				scope: 'analytics' as const
			});
		}

		if (metaPixelId && !/^\d+$/.test(metaPixelId)) {
			return fail(400, {
				message: 'Meta Pixel ID harus berupa angka.',
				scope: 'analytics' as const
			});
		}

		await writeCompanySettings({
			...current,
			trackingEnabled,
			ga4MeasurementId,
			metaPixelId
		});

		return { ok: true as const, message: 'Konfigurasi analytics berhasil disimpan.' };
	}
};
