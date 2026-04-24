import { h as head, c as ensure_array_like, a as attr, e as escape_html, d as derived } from './dev-C-JwAy58.js';
import { R as ROUTE } from './routes-DeQRhkG4.js';

//#region src/routes/informasi/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const brandTitle = derived(() => (data.company.companyName ?? "").trim() || "Perusahaan");
		const I = ROUTE.INFORMASI;
		const links = [
			{
				href: `${I}/tentang`,
				title: "Tentang kami",
				desc: "Profil singkat perusahaan dan visi layanan."
			},
			{
				href: `${I}/legalitas`,
				title: "Legalitas",
				desc: "Dokumen izin dan kepatuhan operasional."
			},
			{
				href: `${I}/layanan`,
				title: "Layanan",
				desc: "Ruang lingkup jasa yang kami tawarkan."
			},
			{
				href: `${I}/rekening`,
				title: "Rekening bank",
				desc: "Informasi rekening resmi pembayaran."
			},
			{
				href: ROUTE.INFORMASI_KONTAK,
				title: "Kontak",
				desc: "WhatsApp, telepon, email, dan jam operasional."
			},
			{
				href: `${I}/kantor`,
				title: "Kantor & lokasi",
				desc: "Alamat kantor dan petunjuk akses."
			},
			{
				href: `${I}/galeri`,
				title: "Galeri",
				desc: "Foto kegiatan dan dokumentasi singkat."
			}
		];
		head("w2gqzf", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Informasi | ${escape_html(brandTitle())}</title>`);
			});
			$$renderer.push(`<meta name="description" content="Tentang, legalitas, layanan, rekening, kontak, kantor, dan galeri."/>`);
		});
		$$renderer.push(`<div class="hub svelte-w2gqzf"><h1 class="title svelte-w2gqzf">Informasi</h1> <p class="lead svelte-w2gqzf">Pilih topik di bawah untuk detail. Konten pada halaman ini dapat disesuaikan setelah review.</p> <ul class="grid svelte-w2gqzf" role="list"><!--[-->`);
		const each_array = ensure_array_like(links);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<li><a class="card svelte-w2gqzf"${attr("href", item.href)}><span class="card-title svelte-w2gqzf">${escape_html(item.title)}</span> <span class="card-desc svelte-w2gqzf">${escape_html(item.desc)}</span></a></li>`);
		}
		$$renderer.push(`<!--]--></ul></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D8ePmlF0.js.map
