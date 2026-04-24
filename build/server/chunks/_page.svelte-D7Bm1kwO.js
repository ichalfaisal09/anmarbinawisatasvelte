import { o as onDestroy } from './index-server-BisdV8Zi.js';
import { h as head, e as escape_html, a as attr } from './dev-C-JwAy58.js';
import './client-BPBJT-EO.js';
import './internal-40NkqYvR.js';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/posts/new/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { form } = $$props;
		let submitting = false;
		onDestroy(() => {
		});
		head("w7gc21", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Post Baru | Admin Panel</title>`);
			});
		});
		$$renderer.push(`<div class="wrap svelte-w7gc21"><div class="head svelte-w7gc21"><div><h1 class="svelte-w7gc21">Post Baru</h1> <p class="meta svelte-w7gc21">Upload gambar + atur tanggal berakhir promosi.</p></div> <a class="btn-ghost svelte-w7gc21" href="/admin">Batal</a></div> <form method="POST" enctype="multipart/form-data" class="card svelte-w7gc21">`);
		if (form?.message) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="banner err svelte-w7gc21" role="alert">${escape_html(form.message)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <label class="svelte-w7gc21"><span class="svelte-w7gc21">Judul</span> <input name="title" type="text" required=""${attr("value", form?.title ?? "")} class="svelte-w7gc21"/></label> <label class="svelte-w7gc21"><span class="svelte-w7gc21">Tanggal berakhir</span> <input name="expiresAt" type="datetime-local" required=""${attr("value", form?.expiresAt ?? "")} class="svelte-w7gc21"/> <p class="field-hint svelte-w7gc21">Mengikuti zona waktu peramban Anda. Post tidak tampil di feed setelah waktu ini lewat.</p></label> <label class="svelte-w7gc21"><span class="svelte-w7gc21">Gambar</span> <div class="upload svelte-w7gc21"><input id="create-image" name="image" type="file" accept="image/*" required="" class="file-native svelte-w7gc21"/> <label class="drop svelte-w7gc21" for="create-image">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<div class="drop-empty"><div class="drop-title svelte-w7gc21">Pilih gambar</div> <div class="drop-sub svelte-w7gc21">JPG / PNG / WEBP / GIF (maks 6MB)</div> <div class="drop-hint svelte-w7gc21">Klik area ini untuk memilih file</div></div>`);
		$$renderer.push(`<!--]--></label></div></label> <button type="submit"${attr("disabled", submitting, true)} class="svelte-w7gc21">${escape_html("Simpan Post")}</button></form></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D7Bm1kwO.js.map
