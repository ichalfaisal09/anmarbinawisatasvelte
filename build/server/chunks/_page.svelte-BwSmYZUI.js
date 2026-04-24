import { h as head, e as escape_html, a as attr, c as ensure_array_like } from './dev-C-JwAy58.js';
import './client-B7B_6LIP.js';
import './index-server-BisdV8Zi.js';
import './internal-yD_0jMic.js';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/analytics/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let submitting = false;
		const dt = new Intl.DateTimeFormat("id-ID", {
			year: "numeric",
			month: "short",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit"
		});
		head("h1vjnr", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Analytics | Admin Panel</title>`);
			});
		});
		$$renderer.push(`<div class="wrap svelte-h1vjnr">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="head svelte-h1vjnr"><h1 class="svelte-h1vjnr">Analytics</h1> <p class="meta svelte-h1vjnr">Kelola integrasi analytics dan pantau event pengunjung secara real-time ringan.</p></div> <form method="POST" action="?/save" class="card svelte-h1vjnr"><div class="card-head svelte-h1vjnr"><h2 class="svelte-h1vjnr">Konfigurasi Integrasi</h2> <p class="lede svelte-h1vjnr">Kelola GA4 dan Meta Pixel dari satu tempat terpisah.</p></div> `);
		if (form?.scope === "analytics" && form.message) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="banner err svelte-h1vjnr" role="alert">${escape_html(form.message)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <label class="toggle svelte-h1vjnr"><div class="toggle-top svelte-h1vjnr"><span class="svelte-h1vjnr">Tracking analytics aktif</span> <input name="trackingEnabled" type="checkbox"${attr("checked", Boolean(data.settings.trackingEnabled), true)} class="svelte-h1vjnr"/></div> <p class="hint svelte-h1vjnr">Jika dimatikan, script analytics tidak dimuat dan event tidak dikirim.</p></label> <div class="grid svelte-h1vjnr"><label class="svelte-h1vjnr"><span class="svelte-h1vjnr">GA4 Measurement ID</span> <input name="ga4MeasurementId" type="text"${attr("value", data.settings.ga4MeasurementId)} placeholder="G-XXXXXXXXXX" autocomplete="off" class="svelte-h1vjnr"/></label> <label class="svelte-h1vjnr"><span class="svelte-h1vjnr">Meta Pixel ID</span> <input name="metaPixelId" type="text"${attr("value", data.settings.metaPixelId)} placeholder="123456789012345" autocomplete="off" class="svelte-h1vjnr"/></label></div> <button type="submit" class="btn-submit svelte-h1vjnr"${attr("disabled", submitting, true)}>${escape_html("Simpan analytics")}</button></form> <div class="card logs-card svelte-h1vjnr"><div class="logs-head svelte-h1vjnr"><div><h2 class="svelte-h1vjnr">Event log internal</h2> <p class="lede svelte-h1vjnr">Menampilkan event ${escape_html(data.days)} hari terakhir (maks 250 baris terbaru).</p></div> <form method="GET" class="days-filter svelte-h1vjnr"><label class="svelte-h1vjnr"><span class="svelte-h1vjnr">Periode</span> <select name="days" class="svelte-h1vjnr">`);
		$$renderer.option({
			value: "7",
			selected: String(data.days) === "7"
		}, ($$renderer) => {
			$$renderer.push(`7 hari`);
		});
		$$renderer.option({
			value: "14",
			selected: String(data.days) === "14"
		}, ($$renderer) => {
			$$renderer.push(`14 hari`);
		});
		$$renderer.option({
			value: "30",
			selected: String(data.days) === "30"
		}, ($$renderer) => {
			$$renderer.push(`30 hari`);
		});
		$$renderer.push(`</select></label></form></div> `);
		if (Object.keys(data.eventCounts).length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="chips svelte-h1vjnr"><!--[-->`);
			const each_array = ensure_array_like(Object.entries(data.eventCounts));
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let [name, count] = each_array[$$index];
				$$renderer.push(`<span class="chip svelte-h1vjnr">${escape_html(name)}: <strong>${escape_html(count)}</strong></span>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.logs.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="empty svelte-h1vjnr"><div class="empty-icon svelte-h1vjnr" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12h4l2-5 4 10 2-5h6" stroke-linecap="round" stroke-linejoin="round"></path></svg></div> <div><p class="empty-title svelte-h1vjnr">Belum ada event dalam periode ini.</p> <p class="empty-lede svelte-h1vjnr">Coba trigger dari halaman publik: klik WhatsApp, copy rekening, atau buka galeri.</p></div></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="table-wrap svelte-h1vjnr"><table class="svelte-h1vjnr"><thead><tr><th class="svelte-h1vjnr">Waktu</th><th class="svelte-h1vjnr">Event</th><th class="svelte-h1vjnr">Path</th><th class="svelte-h1vjnr">Payload</th></tr></thead><tbody class="svelte-h1vjnr"><!--[-->`);
			const each_array_1 = ensure_array_like(data.logs);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let item = each_array_1[$$index_1];
				$$renderer.push(`<tr class="svelte-h1vjnr"><td class="svelte-h1vjnr">${escape_html(dt.format(new Date(item.timestamp)))}</td><td class="svelte-h1vjnr"><code>${escape_html(item.event)}</code></td><td class="svelte-h1vjnr"><code>${escape_html(item.pathname)}</code></td><td class="payload svelte-h1vjnr"><code class="svelte-h1vjnr">${escape_html(JSON.stringify(item.payload))}</code></td></tr>`);
			}
			$$renderer.push(`<!--]--></tbody></table></div>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BwSmYZUI.js.map
