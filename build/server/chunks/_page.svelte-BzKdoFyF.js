import { h as head, c as ensure_array_like, a as attr, e as escape_html, d as derived } from './dev-C-JwAy58.js';

//#region src/routes/informasi/rekening/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const accounts = derived(() => data.accounts);
		let copiedId = null;
		head("1ap074r", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Rekening bank | Informasi</title>`);
			});
			$$renderer.push(`<meta name="description" content="Rekening resmi pembayaran Anmar Binawisata untuk transfer jamaah."/>`);
		});
		$$renderer.push(`<article class="page svelte-1ap074r"><header class="page-head svelte-1ap074r"><h1 class="svelte-1ap074r">Rekening resmi</h1> <p class="lede svelte-1ap074r">Pastikan transfer hanya ke rekening atas nama perusahaan berikut.</p></header> <div class="stack svelte-1ap074r"><!--[-->`);
		const each_array = ensure_array_like(accounts());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let account = each_array[$$index];
			$$renderer.push(`<section class="card svelte-1ap074r"${attr("aria-labelledby", `${account.id}-bank`)}><div class="head svelte-1ap074r"><div class="logo svelte-1ap074r"><img${attr("src", account.logoUrl)}${attr("alt", account.logoAlt)} loading="lazy" decoding="async" class="svelte-1ap074r"/></div> <div class="head-text svelte-1ap074r"><h2${attr("id", `${account.id}-bank`)} class="svelte-1ap074r">${escape_html(account.bank)}</h2> <p class="svelte-1ap074r">${escape_html(account.branch)}</p></div></div> <div class="meta-box svelte-1ap074r"><div class="row svelte-1ap074r"><span class="label svelte-1ap074r">No. Rekening</span> <div class="value-wrap svelte-1ap074r"><strong class="value svelte-1ap074r">${escape_html(account.accountNumber)}</strong> <button type="button" class="copy-btn svelte-1ap074r"${attr("aria-label", `Salin nomor rekening ${account.bank}`)}><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="9" y="3" width="11" height="14" rx="2" stroke-linejoin="round"></rect><path d="M5 7H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1" stroke-linecap="round"></path></svg></button></div></div> <div class="row svelte-1ap074r"><span class="label svelte-1ap074r">Atas Nama</span> <strong class="value svelte-1ap074r">${escape_html(account.accountName)}</strong></div></div> `);
			if (copiedId === account.id) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="copied svelte-1ap074r" role="status">Nomor rekening disalin.</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></section>`);
		}
		$$renderer.push(`<!--]--></div> <p class="note svelte-1ap074r">Jika ada nomor rekening berbeda atas nama pribadi, mohon verifikasi dulu melalui kontak resmi perusahaan.</p></article>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BzKdoFyF.js.map
