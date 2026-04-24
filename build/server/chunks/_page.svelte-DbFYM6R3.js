import { o as onDestroy } from './index-server-BisdV8Zi.js';
import { h as head, c as ensure_array_like, a as attr, e as escape_html, d as derived } from './dev-C-JwAy58.js';
import { t as toMediaUrl } from './media-url-Cdn1-NPd.js';

//#region src/routes/informasi/galeri/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let brokenImageIds = [];
		const activeItem = derived(() => null );
		onDestroy(() => {
			document.body.style.overflow = "";
		});
		head("naetws", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Galeri | Informasi</title>`);
			});
			$$renderer.push(`<meta name="description" content="Galeri foto travel haji umrah Makassar Anmar Binawisata: kegiatan jamaah, ziarah, dan dokumentasi perjalanan."/>`);
		});
		$$renderer.push(`<article class="page svelte-naetws"><header class="page-head svelte-naetws"><h1 class="svelte-naetws">Galeri</h1> <p class="lede svelte-naetws">Cuplikan dokumentasi travel haji umrah Makassar dan kegiatan jamaah.</p></header> `);
		if (data.gallery.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="empty svelte-naetws" role="status"><div class="empty-icon svelte-naetws" aria-hidden="true"><svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"></rect><circle cx="8.5" cy="10" r="1.5" fill="currentColor" stroke="none"></circle><path d="M4 16l4-4 3 3 5-5 4 4" stroke-linecap="round" stroke-linejoin="round"></path></svg></div> <p class="empty-title svelte-naetws">Belum ada foto</p> <p class="empty-text svelte-naetws">Album akan tampil di sini setelah daftar foto ditambahkan di data proyek. Anda juga bisa memakai foto
				promo dari feed sebagai sumber yang sama.</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<ul class="grid svelte-naetws" role="list"><!--[-->`);
			const each_array = ensure_array_like(data.gallery);
			for (let i = 0, $$length = each_array.length; i < $$length; i++) {
				let item = each_array[i];
				$$renderer.push(`<li class="cell svelte-naetws"><figure class="fig svelte-naetws"><button type="button" class="thumb-link svelte-naetws"${attr("aria-label", `Buka gambar fullscreen: ${item.alt}`)}>`);
				if (brokenImageIds.includes(item.id)) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="thumb-fallback svelte-naetws" role="img"${attr("aria-label", `Gambar tidak tersedia: ${item.alt}`)}>Gambar tidak tersedia</span>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<img class="thumb svelte-naetws"${attr("src", toMediaUrl(item.imageUrl))}${attr("alt", item.alt)} loading="lazy" decoding="async" onerror="this.__e=event"/>`);
				}
				$$renderer.push(`<!--]--></button> `);
				if ((item.caption ?? "").trim()) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<figcaption class="cap svelte-naetws">${escape_html((item.caption ?? "").trim())}</figcaption>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></figure></li>`);
			}
			$$renderer.push(`<!--]--></ul>`);
		}
		$$renderer.push(`<!--]--></article> `);
		if (activeItem()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="lightbox svelte-naetws" role="dialog" aria-modal="true" aria-label="Pratinjau foto galeri" tabindex="-1"><button type="button" class="lightbox-backdrop svelte-naetws" aria-label="Tutup pratinjau galeri"></button> <div class="lightbox-inner svelte-naetws"><div class="lightbox-top svelte-naetws"><p class="lightbox-counter svelte-naetws">${escape_html((0) + 1)} / ${escape_html(data.gallery.length)}</p> <button type="button" class="lightbox-close svelte-naetws" aria-label="Tutup galeri">×</button></div> <div class="lightbox-frame svelte-naetws"><button type="button" class="nav prev svelte-naetws" aria-label="Foto sebelumnya">‹</button> `);
			if (brokenImageIds.includes(activeItem().id)) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="lightbox-fallback svelte-naetws">Gambar tidak tersedia</div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<img class="lightbox-img svelte-naetws"${attr("src", toMediaUrl(activeItem().imageUrl))}${attr("alt", activeItem().alt)} loading="eager" decoding="async" onerror="this.__e=event"/>`);
			}
			$$renderer.push(`<!--]--> <button type="button" class="nav next svelte-naetws" aria-label="Foto berikutnya">›</button></div> `);
			if ((activeItem().caption ?? "").trim()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="lightbox-cap svelte-naetws">${escape_html((activeItem().caption ?? "").trim())}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DbFYM6R3.js.map
