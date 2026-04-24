import { h as head, b as attr_class, e as escape_html, c as ensure_array_like, a as attr } from './dev-C-JwAy58.js';
import { t as toMediaUrl } from './media-url-Cdn1-NPd.js';

//#region src/routes/admin/gallery/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		head("c0xo81", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Galeri | Admin Panel</title>`);
			});
		});
		$$renderer.push(`<div class="wrap svelte-c0xo81"><header class="head svelte-c0xo81"><h1 class="svelte-c0xo81">Galeri</h1> <p class="meta svelte-c0xo81">Kelola foto galeri publik: tambah, edit, dan hapus.</p></header> `);
		if (form?.message) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class("banner svelte-c0xo81", void 0, {
				"err": form?.ok !== true,
				"ok": form?.ok === true
			})} role="status">${escape_html(form.message)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <section class="card svelte-c0xo81"><h2 class="svelte-c0xo81">Tambah foto</h2> <form method="POST" action="?/add" enctype="multipart/form-data" class="stack svelte-c0xo81"><div class="grid svelte-c0xo81"><label class="svelte-c0xo81"><span class="svelte-c0xo81">Alt text *</span> <input name="alt" type="text" required="" placeholder="Contoh: Jamaah umrah di Masjidil Haram" class="svelte-c0xo81"/></label> <label class="svelte-c0xo81"><span class="svelte-c0xo81">Caption (opsional)</span> <input name="caption" type="text" placeholder="Contoh: Dokumentasi umrah Ramadhan" class="svelte-c0xo81"/></label></div> <div class="grid svelte-c0xo81"><label class="svelte-c0xo81"><span class="svelte-c0xo81">Image URL (opsional)</span> <input name="imageUrl" type="text" placeholder="/uploads/gallery/nama-file.webp" class="svelte-c0xo81"/></label> <label class="svelte-c0xo81"><span class="svelte-c0xo81">Upload file (opsional)</span> <input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" class="svelte-c0xo81"/></label></div> <p class="hint svelte-c0xo81">Isi salah satu: URL gambar atau upload file baru (maks 6MB).</p> <button type="submit" class="btn-primary svelte-c0xo81">Tambah foto</button></form></section> <section class="card svelte-c0xo81"><h2 class="svelte-c0xo81">Daftar foto (${escape_html(data.gallery.length)})</h2> `);
		if (data.gallery.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="empty svelte-c0xo81"><div class="empty-icon svelte-c0xo81" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 16l4.5-4.5a2 2 0 0 1 2.8 0l2.2 2.2 2.4-2.4a2 2 0 0 1 2.8 0L20 12.6"></path><rect x="3" y="5" width="18" height="14" rx="2"></rect><circle cx="8.5" cy="9.5" r="1.2" fill="currentColor" stroke="none"></circle></svg></div> <div><p class="empty-title svelte-c0xo81">Belum ada data galeri.</p> <p class="empty-lede svelte-c0xo81">Tambahkan foto pertama untuk mulai menampilkan dokumentasi di halaman publik.</p></div></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="list svelte-c0xo81"><!--[-->`);
			const each_array = ensure_array_like(data.gallery);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let item = each_array[$$index];
				$$renderer.push(`<article class="item svelte-c0xo81"><div class="preview svelte-c0xo81"><img${attr("src", toMediaUrl(item.imageUrl))}${attr("alt", item.alt)} loading="lazy" class="svelte-c0xo81"/></div> <form method="POST" action="?/update" enctype="multipart/form-data" class="item-form svelte-c0xo81"><input type="hidden" name="id"${attr("value", item.id)} class="svelte-c0xo81"/> <div class="grid svelte-c0xo81"><label class="svelte-c0xo81"><span class="svelte-c0xo81">Alt text *</span> <input name="alt" type="text" required=""${attr("value", item.alt)} class="svelte-c0xo81"/></label> <label class="svelte-c0xo81"><span class="svelte-c0xo81">Caption</span> <input name="caption" type="text"${attr("value", item.caption ?? "")} class="svelte-c0xo81"/></label></div> <div class="grid svelte-c0xo81"><label class="svelte-c0xo81"><span class="svelte-c0xo81">Image URL</span> <input name="imageUrl" type="text"${attr("value", item.imageUrl)} class="svelte-c0xo81"/></label> <label class="svelte-c0xo81"><span class="svelte-c0xo81">Ganti file (opsional)</span> <input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" class="svelte-c0xo81"/></label></div> <div class="actions svelte-c0xo81"><button type="submit" class="btn-secondary svelte-c0xo81">Simpan perubahan</button></div></form> <form method="POST" action="?/delete" class="delete-form svelte-c0xo81"><input type="hidden" name="id"${attr("value", item.id)} class="svelte-c0xo81"/> <button type="submit" class="btn-danger svelte-c0xo81">Hapus</button></form></article>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></section></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B9hZzQd5.js.map
