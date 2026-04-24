import { h as head, e as escape_html, c as ensure_array_like, a as attr, d as derived } from './dev-C-JwAy58.js';

//#region src/routes/informasi/legalitas/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const ppiu = derived(() => data.permits.find((p) => p.id === "ppiu"));
		const pihk = derived(() => data.permits.find((p) => p.id === "pihk"));
		head("e0sxns", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Legalitas | Informasi</title>`);
			});
			$$renderer.push(`<meta name="description" content="Legalitas Anmar Binawisata: izin PPIU, izin PIHK, dan dokumen perusahaan."/>`);
		});
		$$renderer.push(`<article class="page svelte-e0sxns"><header class="page-head svelte-e0sxns"><h1 class="svelte-e0sxns">Legalitas</h1> <p class="lede svelte-e0sxns">Informasi izin operasional dan dokumen legal perusahaan.</p></header> <section class="card svelte-e0sxns" aria-labelledby="ppiu-heading"><div class="head-row svelte-e0sxns"><div class="badge svelte-e0sxns" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="6"></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M5 19l2-2" stroke-linecap="round"></path></svg></div> <div class="head-text svelte-e0sxns"><h2 id="ppiu-heading" class="svelte-e0sxns">${escape_html(ppiu()?.title ?? "Izin PPIU")}</h2> <p class="sub svelte-e0sxns">${escape_html(ppiu()?.subtitle ?? "Penyelenggara Perjalanan Ibadah Umrah")}</p></div></div> <div class="meta-box svelte-e0sxns"><div class="meta-row svelte-e0sxns"><span class="key svelte-e0sxns">Nomor izin</span> <strong class="value svelte-e0sxns">${escape_html(ppiu()?.licenseNumber ?? "-")}</strong></div> <div class="meta-row svelte-e0sxns"><span class="key svelte-e0sxns">Berlaku hingga</span> <span class="value muted svelte-e0sxns">${escape_html(ppiu()?.validUntil ?? "-")}</span></div></div></section> <section class="card svelte-e0sxns" aria-labelledby="pihk-heading"><div class="head-row svelte-e0sxns"><div class="badge svelte-e0sxns" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M2 14h7l3-4 3 4h7" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 10h3M18 10h1" stroke-linecap="round"></path><path d="M7 14v5M17 14v5" stroke-linecap="round"></path></svg></div> <div class="head-text svelte-e0sxns"><h2 id="pihk-heading" class="svelte-e0sxns">${escape_html(pihk()?.title ?? "Izin PIHK")}</h2> <p class="sub svelte-e0sxns">${escape_html(pihk()?.subtitle ?? "Penyelenggara Ibadah Haji Khusus")}</p></div></div> <div class="meta-box svelte-e0sxns"><div class="meta-row svelte-e0sxns"><span class="key svelte-e0sxns">Nomor izin</span> <strong class="value svelte-e0sxns">${escape_html(pihk()?.licenseNumber ?? "-")}</strong></div> <div class="meta-row svelte-e0sxns"><span class="key svelte-e0sxns">Berlaku hingga</span> <span class="value muted svelte-e0sxns">${escape_html(pihk()?.validUntil ?? "-")}</span></div></div></section> <section class="card svelte-e0sxns" aria-labelledby="doc-heading"><div class="head-row svelte-e0sxns"><div class="badge svelte-e0sxns" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke-linejoin="round"></path><path d="M14 3v4h4M9 11h6M9 15h6" stroke-linecap="round"></path></svg></div> <div class="head-text svelte-e0sxns"><h2 id="doc-heading" class="svelte-e0sxns">Dokumen Perusahaan</h2> <p class="sub svelte-e0sxns">Legalitas badan usaha</p></div></div> <ul class="doc-list svelte-e0sxns" role="list"><!--[-->`);
		const each_array = ensure_array_like(data.companyDocs);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let doc = each_array[$$index];
			$$renderer.push(`<li class="doc-item svelte-e0sxns"><span>${escape_html(doc.name)}</span> <span class="ok svelte-e0sxns"${attr("aria-label", `${doc.name} tersedia`)}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"></circle><path d="M8.5 12.2 11 14.7l4.8-4.9" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></li>`);
		}
		$$renderer.push(`<!--]--></ul></section></article>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BmOCGGoe.js.map
