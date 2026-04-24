import { a as attr, e as escape_html, b as attr_class, Z as clsx$1, d as derived } from './dev-C-JwAy58.js';
import { R as ROUTE } from './routes-DeQRhkG4.js';

//#region src/lib/components/icons/IconClock.svelte
function IconClock($$renderer, $$props) {
	let { size = 18, class: className = "" } = $$props;
	$$renderer.push(`<svg${attr_class(clsx$1(className || void 0))} viewBox="0 0 24 24"${attr("width", size)}${attr("height", size)} fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v6l3 2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
}
//#endregion
//#region src/lib/components/icons/IconDocumentLines.svelte
function IconDocumentLines($$renderer, $$props) {
	let { size = 22, class: className = "" } = $$props;
	$$renderer.push(`<svg${attr_class(clsx$1(className || void 0))} viewBox="0 0 24 24"${attr("width", size)}${attr("height", size)} fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M7 3h8l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke-linejoin="round"></path><path d="M9 9h6M9 13h6M9 17h4" stroke-linecap="round"></path></svg>`);
}
//#endregion
//#region src/lib/components/icons/IconEnvelope.svelte
function IconEnvelope($$renderer, $$props) {
	let { size = 22, class: className = "" } = $$props;
	$$renderer.push(`<svg${attr_class(clsx$1(className || void 0))} viewBox="0 0 24 24"${attr("width", size)}${attr("height", size)} fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
}
//#endregion
//#region src/lib/components/icons/IconHomeFilled.svelte
function IconHomeFilled($$renderer, $$props) {
	let { size = 24, class: className = "" } = $$props;
	$$renderer.push(`<svg${attr_class(clsx$1(className || void 0))} viewBox="0 0 24 24"${attr("width", size)}${attr("height", size)} fill="currentColor" aria-hidden="true"><path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.657a2.346 2.346 0 0 0-2.344-2.343h-.621A2.346 2.346 0 0 0 9.69 16.343V22a1 1 0 0 1-1 1H2.69a1 1 0 0 1-1-1V10.735a1 1 0 0 1 .43-.822L11.061 2.97a1.583 1.583 0 0 1 1.878 0l8.941 6.943a1 1 0 0 1 .43.822V22a1 1 0 0 1-1 1Z"></path></svg>`);
}
//#endregion
//#region src/lib/components/icons/IconHomeStroke.svelte
function IconHomeStroke($$renderer, $$props) {
	let { size = 22, class: className = "" } = $$props;
	$$renderer.push(`<svg${attr_class(clsx$1(className || void 0))} viewBox="0 0 24 24"${attr("width", size)}${attr("height", size)} fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10.5Z" stroke-linejoin="round"></path></svg>`);
}
//#endregion
//#region src/lib/components/icons/IconMapPin.svelte
function IconMapPin($$renderer, $$props) {
	let { size = 22, class: className = "" } = $$props;
	$$renderer.push(`<svg${attr_class(clsx$1(className || void 0))} viewBox="0 0 24 24"${attr("width", size)}${attr("height", size)} fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z" stroke-linejoin="round"></path><circle cx="12" cy="11" r="2.25"></circle></svg>`);
}
//#endregion
//#region src/lib/components/icons/IconPhone.svelte
function IconPhone($$renderer, $$props) {
	let { size = 22, class: className = "" } = $$props;
	$$renderer.push(`<svg${attr_class(clsx$1(className || void 0))} viewBox="0 0 24 24"${attr("width", size)}${attr("height", size)} fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M6.5 4.5h3l1.5 4.5-2 1.2a8.1 8.1 0 0 0 3.8 3.8l1.2-2 4.5 1.5v3a1.5 1.5 0 0 1-1.6 1.5A17 17 0 0 1 3 6.1 1.5 1.5 0 0 1 4.5 4.5Z" stroke-linejoin="round"></path></svg>`);
}
//#endregion
//#region src/lib/components/icons/IconWhatsApp.svelte
function IconWhatsApp($$renderer, $$props) {
	const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";
	let { size = 22, muted = false, class: className = "" } = $$props;
	$$renderer.push(`<svg${attr_class(clsx$1(className || void 0))} viewBox="0 0 24 24"${attr("width", size)}${attr("height", size)} fill="currentColor" aria-hidden="true"${attr("opacity", muted ? .35 : void 0)}><path${attr("d", WA_PATH)}></path></svg>`);
}
//#endregion
//#region src/lib/components/FeedContactCard.svelte
function FeedContactCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		function nonEmpty(s) {
			return String(s ?? "").trim().length > 0;
		}
		let { company, showFullContactLink = true } = $$props;
		const waClean = derived(() => String(company.waNumber ?? "").replace(/[^\d]/g, ""));
		const telHref = derived(() => `tel:${(company.officePhone ?? "").replace(/\s/g, "")}`);
		const mapsUrl = derived(() => (company.mapsUrl ?? "").trim());
		const emailTrim = derived(() => (company.email ?? "").trim());
		const hoursTrim = derived(() => (company.officeHours ?? "").trim());
		const addressTrim = derived(() => (company.address ?? "").trim());
		const phoneTrim = derived(() => (company.officePhone ?? "").trim());
		const has = derived(() => waClean().length > 0 || nonEmpty(company.officeHours) || nonEmpty(company.address) || nonEmpty(company.officePhone) || nonEmpty(company.email) || nonEmpty(company.mapsUrl));
		const hasDetails = derived(() => hoursTrim().length > 0 || addressTrim().length > 0);
		const hasQuickActions = derived(() => waClean().length > 0 || phoneTrim().length > 0 || emailTrim().length > 0 || mapsUrl().length > 0);
		if (has()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<section class="contact-card svelte-klsnsi" aria-labelledby="contact-heading"><header class="head svelte-klsnsi"><h2 id="contact-heading" class="title svelte-klsnsi">Hubungi kami</h2> <p class="lede svelte-klsnsi">`);
			if (hasQuickActions()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`Pilih cara yang paling nyaman — jam &amp; alamat panjang disembunyikan di bawah agar feed
					tetap ringkas.`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`Lihat jam kantor dan alamat di bagian yang bisa dibuka.`);
			}
			$$renderer.push(`<!--]--></p></header> `);
			if (hasQuickActions()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="actions svelte-klsnsi" role="group" aria-label="Tindakan kontak cepat">`);
				if (waClean()) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<a class="act act--wa svelte-klsnsi"${attr("href", `https://wa.me/${waClean()}`)} target="_blank" rel="noopener noreferrer"><span class="act-ic svelte-klsnsi" aria-hidden="true">`);
					IconWhatsApp($$renderer, {});
					$$renderer.push(`<!----></span> <span class="act-txt svelte-klsnsi">WhatsApp</span></a>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (phoneTrim()) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<a class="act act--tel svelte-klsnsi"${attr("href", telHref())}><span class="act-ic svelte-klsnsi" aria-hidden="true">`);
					IconPhone($$renderer, {});
					$$renderer.push(`<!----></span> <span class="act-txt svelte-klsnsi">Telepon</span></a>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (emailTrim()) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<a class="act act--mail svelte-klsnsi"${attr("href", `mailto:${emailTrim()}`)}><span class="act-ic svelte-klsnsi" aria-hidden="true">`);
					IconEnvelope($$renderer, {});
					$$renderer.push(`<!----></span> <span class="act-txt svelte-klsnsi">Email</span></a>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (mapsUrl()) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<a class="act act--map svelte-klsnsi"${attr("href", mapsUrl())} target="_blank" rel="noopener noreferrer"><span class="act-ic svelte-klsnsi" aria-hidden="true">`);
					IconMapPin($$renderer, {});
					$$renderer.push(`<!----></span> <span class="act-txt svelte-klsnsi">Maps</span></a>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (hasDetails()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<details class="more svelte-klsnsi"><summary class="more-sum svelte-klsnsi"><span class="more-sum-ic svelte-klsnsi" aria-hidden="true">`);
				IconClock($$renderer, {});
				$$renderer.push(`<!----></span> Jam kantor &amp; alamat lengkap</summary> <div class="more-body svelte-klsnsi">`);
				if (hoursTrim()) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="detail"><span class="detail-label svelte-klsnsi">Jam operasional</span> <p class="detail-text hours svelte-klsnsi">${escape_html(hoursTrim())}</p></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (addressTrim()) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="detail"><span class="detail-label svelte-klsnsi">Alamat</span> <p class="detail-text svelte-klsnsi">${escape_html(addressTrim())}</p></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></details>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (showFullContactLink) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<a class="info-link svelte-klsnsi"${attr("href", ROUTE.INFORMASI_KONTAK)}>Halaman kontak lengkap</a>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></section>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}

export { FeedContactCard as F, IconDocumentLines as I, IconHomeFilled as a, IconHomeStroke as b, IconWhatsApp as c };
//# sourceMappingURL=FeedContactCard-BLP-oI_c.js.map
