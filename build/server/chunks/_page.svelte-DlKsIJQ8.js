import { h as head, c as ensure_array_like, a as attr, s as stringify, e as escape_html } from './dev-C-JwAy58.js';

//#region src/routes/informasi/layanan/+page.svelte
function _page($$renderer) {
	const programs = [{
		id: "umrah",
		title: "Umrah Regular",
		description: "Program umrah dengan pelayanan terbaik dan pembimbing berpengalaman.",
		tags: [
			"9 Hari",
			"Hotel *4",
			"Visa Umrah"
		]
	}, {
		id: "haji",
		title: "Haji Khusus",
		description: "Program haji khusus dengan fasilitas premium dan pendampingan penuh.",
		tags: [
			"25 Hari",
			"Hotel *5",
			"Visa Haji"
		]
	}];
	const extras = [
		{
			id: "visa",
			title: "Proses Visa",
			description: "Pengurusan visa cepat dan aman",
			icon: "passport"
		},
		{
			id: "hotel",
			title: "Hotel",
			description: "Akomodasi nyaman & strategis",
			icon: "hotel"
		},
		{
			id: "transport",
			title: "Transportasi",
			description: "Armada modern & nyaman",
			icon: "bus"
		},
		{
			id: "muthowif",
			title: "Muthowif",
			description: "Pembimbing berpengalaman",
			icon: "guide"
		}
	];
	head("1nhw9xa", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Layanan | Informasi</title>`);
		});
		$$renderer.push(`<meta name="description" content="Program Umrah Regular, Haji Khusus, dan layanan tambahan: visa, hotel, transportasi, muthowif — Anmar Binawisata."/>`);
	});
	$$renderer.push(`<article class="page svelte-1nhw9xa"><header class="page-head svelte-1nhw9xa"><h1 class="svelte-1nhw9xa">Layanan</h1> <p class="lede svelte-1nhw9xa">Paket ibadah dan pendukung perjalanan jamaah umrah &amp; haji.</p></header> <div class="programs svelte-1nhw9xa"><!--[-->`);
	const each_array = ensure_array_like(programs);
	for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
		let p = each_array[$$index_1];
		$$renderer.push(`<section class="card card--program svelte-1nhw9xa"${attr("aria-labelledby", `prog-${stringify(p.id)}`)}><div class="badge badge--lg svelte-1nhw9xa" aria-hidden="true">`);
		if (p.id === "umrah") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2.5 5.5 6v12L12 21.5 18.5 18V6L12 2.5Z" stroke-linejoin="round"></path><path d="M5.5 6 12 9.5 18.5 6M12 9.5V21.5" stroke-linecap="round"></path><path d="M9 12h6M9 15h6" stroke-linecap="round"></path></svg>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 21h16M8 21V12l2-1V8h4v3l2 1v9" stroke-linejoin="round"></path><path d="M8 12c0-3 2.5-5 4-6.5 1.5 1.5 4 3.5 4 6.5" stroke-linecap="round"></path><path d="M11 16h2" stroke-linecap="round"></path></svg>`);
		}
		$$renderer.push(`<!--]--></div> <div class="program-body svelte-1nhw9xa"><h2${attr("id", `prog-${stringify(p.id)}`)} class="svelte-1nhw9xa">${escape_html(p.title)}</h2> <p class="desc svelte-1nhw9xa">${escape_html(p.description)}</p> <ul class="tags svelte-1nhw9xa" aria-label="Ringkasan paket"><!--[-->`);
		const each_array_1 = ensure_array_like(p.tags);
		for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
			let tag = each_array_1[$$index];
			$$renderer.push(`<li class="tag svelte-1nhw9xa">${escape_html(tag)}</li>`);
		}
		$$renderer.push(`<!--]--></ul></div></section>`);
	}
	$$renderer.push(`<!--]--></div> <section class="extra-section svelte-1nhw9xa" aria-labelledby="extra-heading"><h2 id="extra-heading" class="section-title svelte-1nhw9xa">Layanan tambahan</h2> <div class="extra-grid svelte-1nhw9xa"><!--[-->`);
	const each_array_2 = ensure_array_like(extras);
	for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
		let x = each_array_2[$$index_2];
		$$renderer.push(`<div class="card card--extra svelte-1nhw9xa"><div class="badge badge--sm svelte-1nhw9xa" aria-hidden="true">`);
		if (x.icon === "passport") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="5" y="4" width="14" height="16" rx="2" stroke-linejoin="round"></rect><circle cx="12" cy="10" r="2"></circle><path d="M8 16h8" stroke-linecap="round"></path></svg>`);
		} else if (x.icon === "hotel") {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 21V8l4-2v15M4 12h16v9M8 21V12h8v9" stroke-linejoin="round"></path><path d="M12 8V4h8v17" stroke-linejoin="round"></path></svg>`);
		} else if (x.icon === "bus") {
			$$renderer.push("<!--[2-->");
			$$renderer.push(`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M5 17h14v2a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2Z" stroke-linejoin="round"></path><path d="M5 17V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9" stroke-linejoin="round"></path><path d="M7 10h10M7 13h5" stroke-linecap="round"></path></svg>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="8" r="3"></circle><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke-linejoin="round"></path></svg>`);
		}
		$$renderer.push(`<!--]--></div> <h3 class="svelte-1nhw9xa">${escape_html(x.title)}</h3> <p class="extra-desc svelte-1nhw9xa">${escape_html(x.description)}</p></div>`);
	}
	$$renderer.push(`<!--]--></div></section></article>`);
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DlKsIJQ8.js.map
