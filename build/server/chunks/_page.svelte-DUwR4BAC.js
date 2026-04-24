import { h as head, e as escape_html, a as attr, d as derived } from './dev-C-JwAy58.js';

//#region src/routes/informasi/kantor/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const maps = derived(() => (data.company.mapsUrl ?? "").trim());
		const address = derived(() => (data.company.address ?? "").trim());
		head("1s9gqp3", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Kantor &amp; lokasi | Informasi</title>`);
			});
		});
		$$renderer.push(`<article class="page svelte-1s9gqp3"><h1 class="svelte-1s9gqp3">Kantor &amp; lokasi</h1> `);
		if (address()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<section class="block svelte-1s9gqp3"><h2 class="svelte-1s9gqp3">Alamat</h2> <p>${escape_html(address())}</p></section>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<p class="muted svelte-1s9gqp3">Alamat belum diisi di pengaturan perusahaan.</p>`);
		}
		$$renderer.push(`<!--]--> `);
		if (maps()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<a class="cta svelte-1s9gqp3"${attr("href", maps())} target="_blank" rel="noopener noreferrer">Buka di Google Maps</a>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <p class="note svelte-1s9gqp3">Jam kunjungan mengikuti jam operasional yang tercantum di halaman kontak.</p></article>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DUwR4BAC.js.map
