import { h as head, b as attr_class, e as escape_html, a as attr, d as derived } from './dev-C-JwAy58.js';

//#region src/routes/admin/informasi/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		const ppiu = derived(() => data.legalitas.permits.find((p) => p.id === "ppiu"));
		const pihk = derived(() => data.legalitas.permits.find((p) => p.id === "pihk"));
		const bsi = derived(() => data.rekening.find((r) => r.id === "bsi"));
		const mandiri = derived(() => data.rekening.find((r) => r.id === "mandiri"));
		const docsText = derived(() => data.legalitas.companyDocs.map((d) => d.name).join("\n"));
		head("fwrfof", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Informasi | Admin Panel</title>`);
			});
		});
		$$renderer.push(`<div class="wrap svelte-fwrfof"><header class="head svelte-fwrfof"><h1 class="svelte-fwrfof">Informasi</h1> <p class="meta svelte-fwrfof">Kelola konten legalitas dan rekening untuk halaman informasi publik.</p></header> `);
		if (form?.message) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class("banner svelte-fwrfof", void 0, {
				"ok": form?.ok === true,
				"err": form?.ok !== true
			})} role="status">${escape_html(form.message)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <section class="card svelte-fwrfof"><h2 class="svelte-fwrfof">Legalitas</h2> <form method="POST" action="?/saveLegalitas" class="stack svelte-fwrfof"><div class="grid svelte-fwrfof"><label class="svelte-fwrfof"><span class="svelte-fwrfof">Nomor izin PPIU *</span> <input name="ppiuLicenseNumber" type="text" required=""${attr("value", ppiu()?.licenseNumber ?? "")} class="svelte-fwrfof"/></label> <label class="svelte-fwrfof"><span class="svelte-fwrfof">Berlaku hingga PPIU</span> <input name="ppiuValidUntil" type="text"${attr("value", ppiu()?.validUntil ?? "-")} class="svelte-fwrfof"/></label></div> <div class="grid svelte-fwrfof"><label class="svelte-fwrfof"><span class="svelte-fwrfof">Nomor izin PIHK *</span> <input name="pihkLicenseNumber" type="text" required=""${attr("value", pihk()?.licenseNumber ?? "")} class="svelte-fwrfof"/></label> <label class="svelte-fwrfof"><span class="svelte-fwrfof">Berlaku hingga PIHK</span> <input name="pihkValidUntil" type="text"${attr("value", pihk()?.validUntil ?? "-")} class="svelte-fwrfof"/></label></div> <label class="svelte-fwrfof"><span class="svelte-fwrfof">Dokumen perusahaan (1 baris = 1 dokumen)</span> <textarea name="companyDocs" rows="4" class="svelte-fwrfof">`);
		const $$body = escape_html(docsText());
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea></label> <button type="submit" class="btn-primary svelte-fwrfof">Simpan legalitas</button></form></section> <section class="card svelte-fwrfof"><h2 class="svelte-fwrfof">Rekening bank</h2> <form method="POST" action="?/saveRekening" class="stack svelte-fwrfof"><h3 class="svelte-fwrfof">Bank BSI</h3> <div class="grid svelte-fwrfof"><label class="svelte-fwrfof"><span class="svelte-fwrfof">Nama bank *</span><input name="bsiBank" type="text" required=""${attr("value", bsi()?.bank ?? "")} class="svelte-fwrfof"/></label> <label class="svelte-fwrfof"><span class="svelte-fwrfof">Cabang</span><input name="bsiBranch" type="text"${attr("value", bsi()?.branch ?? "")} class="svelte-fwrfof"/></label> <label class="svelte-fwrfof"><span class="svelte-fwrfof">No rekening *</span><input name="bsiNumber" type="text" required=""${attr("value", bsi()?.accountNumber ?? "")} class="svelte-fwrfof"/></label> <label class="svelte-fwrfof"><span class="svelte-fwrfof">Atas nama *</span><input name="bsiName" type="text" required=""${attr("value", bsi()?.accountName ?? "")} class="svelte-fwrfof"/></label> <label class="svelte-fwrfof"><span class="svelte-fwrfof">Logo URL</span><input name="bsiLogoUrl" type="text"${attr("value", bsi()?.logoUrl ?? "")} class="svelte-fwrfof"/></label> <label class="svelte-fwrfof"><span class="svelte-fwrfof">Logo alt</span><input name="bsiLogoAlt" type="text"${attr("value", bsi()?.logoAlt ?? "")} class="svelte-fwrfof"/></label></div> <h3 class="svelte-fwrfof">Bank Mandiri</h3> <div class="grid svelte-fwrfof"><label class="svelte-fwrfof"><span class="svelte-fwrfof">Nama bank *</span><input name="mandiriBank" type="text" required=""${attr("value", mandiri()?.bank ?? "")} class="svelte-fwrfof"/></label> <label class="svelte-fwrfof"><span class="svelte-fwrfof">Cabang</span><input name="mandiriBranch" type="text"${attr("value", mandiri()?.branch ?? "")} class="svelte-fwrfof"/></label> <label class="svelte-fwrfof"><span class="svelte-fwrfof">No rekening *</span><input name="mandiriNumber" type="text" required=""${attr("value", mandiri()?.accountNumber ?? "")} class="svelte-fwrfof"/></label> <label class="svelte-fwrfof"><span class="svelte-fwrfof">Atas nama *</span><input name="mandiriName" type="text" required=""${attr("value", mandiri()?.accountName ?? "")} class="svelte-fwrfof"/></label> <label class="svelte-fwrfof"><span class="svelte-fwrfof">Logo URL</span><input name="mandiriLogoUrl" type="text"${attr("value", mandiri()?.logoUrl ?? "")} class="svelte-fwrfof"/></label> <label class="svelte-fwrfof"><span class="svelte-fwrfof">Logo alt</span><input name="mandiriLogoAlt" type="text"${attr("value", mandiri()?.logoAlt ?? "")} class="svelte-fwrfof"/></label></div> <button type="submit" class="btn-primary svelte-fwrfof">Simpan rekening</button></form></section></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-ydB2QwkM.js.map
