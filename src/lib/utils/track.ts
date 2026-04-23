type TrackPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
		fbq?: (...args: unknown[]) => void;
		dataLayer?: Array<Record<string, unknown>>;
		__trackingEnabled?: boolean;
	}
}

function toAnalyticsPayload(payload: TrackPayload): Record<string, string | number | boolean> {
	const out: Record<string, string | number | boolean> = {};
	for (const [k, v] of Object.entries(payload)) {
		if (v === null || v === undefined) continue;
		if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
			out[k] = v;
		}
	}
	return out;
}

export function trackUiEvent(eventName: string, payload: TrackPayload = {}) {
	if (typeof window === 'undefined') return;
	if (window.__trackingEnabled === false) return;

	const cleanPayload = toAnalyticsPayload(payload);
	const eventData = {
		event: eventName,
		...cleanPayload,
		timestamp: Date.now()
	};

	if (Array.isArray(window.dataLayer)) {
		window.dataLayer.push(eventData);
	}

	if (typeof window.gtag === 'function') {
		window.gtag('event', eventName, cleanPayload);
	}

	if (typeof window.fbq === 'function') {
		window.fbq('trackCustom', eventName, cleanPayload);
	}

	// Internal event log for admin analytics panel.
	try {
		void fetch('/api/track', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				event: eventName,
				timestamp: eventData.timestamp,
				pathname: window.location.pathname,
				source: 'web',
				payload: cleanPayload
			}),
			keepalive: true
		});
	} catch {
		// ignore network errors, tracking is best-effort
	}

	if (import.meta.env.DEV) {
		console.info('[track]', eventData);
	}
}
