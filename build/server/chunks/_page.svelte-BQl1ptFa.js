import { o as onDestroy } from './index-server-BisdV8Zi.js';
import { h as head, e as escape_html, a as attr, d as derived } from './dev-C-JwAy58.js';
import './client-B7B_6LIP.js';
import './internal-yD_0jMic.js';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/settings/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let submittingBrand = false;
		let submittingContact = false;
		let submittingSecurity = false;
		let logoPreview = null;
		let logoFileName = "";
		const logoDisplay = derived(() => logoPreview ?? (data.settings.logoUrl?.trim() || "/logo.svg"));
		function revokePreview() {
			if (logoPreview) try {
				URL.revokeObjectURL(logoPreview);
			} catch {}
			logoPreview = null;
			logoFileName = "";
		}
		onDestroy(() => {
			revokePreview();
		});
		head("1gjcsm", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Settings | Admin Panel</title>`);
			});
		});
		$$renderer.push(`<div class="wrap svelte-1gjcsm">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="head svelte-1gjcsm"><div><h1 class="svelte-1gjcsm">Settings</h1> <p class="meta svelte-1gjcsm">Atur identitas perusahaan, logo, dan kontak untuk dipakai di website.</p></div></div> <div class="cards svelte-1gjcsm"><form method="POST" action="?/saveBrand" enctype="multipart/form-data" class="card svelte-1gjcsm"><div class="card-head svelte-1gjcsm"><h2 class="card-title svelte-1gjcsm">Identitas perusahaan</h2> <p class="card-sub svelte-1gjcsm">Nama dan logo tampil di header website.</p></div> `);
		if (form?.scope === "brand" && form.message) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="banner err svelte-1gjcsm" role="alert">${escape_html(form.message)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <label class="svelte-1gjcsm"><span class="svelte-1gjcsm">Nama perusahaan</span> <input name="companyName" type="text" required="" placeholder="Contoh: Anmar Binawisata"${attr("value", "scope" in (form ?? {}) && form?.scope === "brand" && form && "companyName" in form ? String(form.companyName ?? "") : data.settings.companyName)} class="svelte-1gjcsm"/></label> <label class="svelte-1gjcsm"><span class="svelte-1gjcsm">Subtitle sidebar admin</span> <input name="adminSidebarSubtitle" type="text" maxlength="80" placeholder="Admin Panel"${attr("value", "scope" in (form ?? {}) && form?.scope === "brand" && form && "adminSidebarSubtitle" in form ? String(form.adminSidebarSubtitle ?? "") : data.settings.adminSidebarSubtitle)} class="svelte-1gjcsm"/> <p class="field-hint svelte-1gjcsm">Tampil di bawah nama perusahaan pada menu kiri panel admin.</p></label> <div class="logo-block svelte-1gjcsm"><span class="logo-label svelte-1gjcsm">Logo</span> <div class="logo-row svelte-1gjcsm"><div class="logo-preview-wrap svelte-1gjcsm"><img class="logo-preview svelte-1gjcsm"${attr("src", logoDisplay())} alt="" width="80" height="80"/></div> <div class="logo-upload svelte-1gjcsm"><input id="company-logo" name="logo" type="file" accept="image/jpeg,image/png,image/webp,image/gif" class="file-native svelte-1gjcsm"/> <label class="drop svelte-1gjcsm" for="company-logo"><span class="drop-title svelte-1gjcsm">${escape_html(logoFileName || "Klik untuk pilih logo")}</span> <span class="drop-sub svelte-1gjcsm">JPG / PNG / WEBP / GIF, maks 2MB. Biarkan kosong untuk mempertahankan logo saat ini.</span></label></div></div></div> <button type="submit" class="btn-submit svelte-1gjcsm"${attr("disabled", submittingBrand, true)}>${escape_html("Simpan identitas")}</button></form> <form method="POST" action="?/save" class="card svelte-1gjcsm"><div class="card-head svelte-1gjcsm"><h2 class="card-title svelte-1gjcsm">Kontak &amp; lokasi</h2> <p class="card-sub svelte-1gjcsm">Nomor WhatsApp, telepon, email, dan tautan peta.</p></div> `);
		if (form?.scope === "contact" && form.message) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="banner err svelte-1gjcsm" role="alert">${escape_html(form.message)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="grid svelte-1gjcsm"><label class="svelte-1gjcsm"><span class="svelte-1gjcsm">Nomor WhatsApp (contoh: 62812xxxx)</span> <input name="waNumber" type="text"${attr("value", data.settings.waNumber)} class="svelte-1gjcsm"/></label> <label class="svelte-1gjcsm"><span class="svelte-1gjcsm">Telepon Kantor</span> <input name="officePhone" type="text"${attr("value", data.settings.officePhone)} class="svelte-1gjcsm"/></label> <label class="svelte-1gjcsm"><span class="svelte-1gjcsm">Email</span> <input name="email" type="email"${attr("value", data.settings.email)} class="svelte-1gjcsm"/></label> <label class="svelte-1gjcsm"><span class="svelte-1gjcsm">Jam Kantor</span> <input id="office-hours" name="officeHours" type="text"${attr("value", data.settings.officeHours)} maxlength="240" placeholder="Senin–Jumat: 09.00–17.00 WIB" aria-describedby="office-hours-hint" autocomplete="off" class="svelte-1gjcsm"/> <p id="office-hours-hint" class="field-hint svelte-1gjcsm">Satu baris ringkas + zona waktu (mis. <strong>WIB</strong>). Contoh lain: <span class="mono svelte-1gjcsm">Senin–Jumat 09.00–17.00 · Sabtu 09.00–12.00 · Minggu libur</span>. Teks ini tampil di halaman utama bawah feed.</p></label></div> <label class="svelte-1gjcsm"><span class="svelte-1gjcsm">Alamat</span> <textarea name="address" rows="3" class="svelte-1gjcsm">`);
		const $$body = escape_html(data.settings.address);
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea></label> <label class="svelte-1gjcsm"><span class="svelte-1gjcsm">Link Google Maps</span> <input name="mapsUrl" type="url"${attr("value", data.settings.mapsUrl)} class="svelte-1gjcsm"/></label> <button type="submit" class="btn-submit svelte-1gjcsm"${attr("disabled", submittingContact, true)}>${escape_html("Simpan kontak")}</button></form> <form method="POST" action="?/savePassword" class="card svelte-1gjcsm"><div class="card-head svelte-1gjcsm"><h2 class="card-title svelte-1gjcsm">Keamanan admin</h2> <p class="card-sub svelte-1gjcsm">Ganti password login panel admin.</p></div> `);
		if (form?.scope === "security" && form.message) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="banner err svelte-1gjcsm" role="alert">${escape_html(form.message)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="grid svelte-1gjcsm"><label class="svelte-1gjcsm"><span class="svelte-1gjcsm">Password lama</span> <input name="currentPassword" type="password" autocomplete="current-password" required="" class="svelte-1gjcsm"/></label> <label class="svelte-1gjcsm"><span class="svelte-1gjcsm">Password baru (minimal 10 karakter)</span> <input name="newPassword" type="password" autocomplete="new-password" minlength="10" required="" class="svelte-1gjcsm"/></label> <label class="svelte-1gjcsm"><span class="svelte-1gjcsm">Konfirmasi password baru</span> <input name="confirmPassword" type="password" autocomplete="new-password" minlength="10" required="" class="svelte-1gjcsm"/></label></div> <button type="submit" class="btn-submit svelte-1gjcsm"${attr("disabled", submittingSecurity, true)}>${escape_html("Simpan password")}</button></form></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BQl1ptFa.js.map
