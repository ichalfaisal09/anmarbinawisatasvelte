import { o as onDestroy } from './index-server-BisdV8Zi.js';
import { h as head, e as escape_html, a as attr, d as derived } from './dev-C-JwAy58.js';
import './client-B7B_6LIP.js';
import './internal-yD_0jMic.js';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/posts/[id]/edit/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let submitting = false;
		const repop = derived(() => form);
		function toDatetimeLocalValue(iso) {
			const d = new Date(iso);
			if (!Number.isFinite(d.getTime())) return "";
			const pad = (n) => String(n).padStart(2, "0");
			return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
		}
		onDestroy(() => {
		});
		head("11pfc6v", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Edit Post | Admin Panel</title>`);
			});
		});
		$$renderer.push(`<div class="wrap svelte-11pfc6v"><div class="head svelte-11pfc6v"><div><h1 class="svelte-11pfc6v">Edit Post</h1> <p class="meta svelte-11pfc6v">Ubah judul, masa tayang, dan gambar (opsional).</p></div> <a class="btn-ghost svelte-11pfc6v" href="/admin">Kembali</a></div> <form method="POST" action="?/update" enctype="multipart/form-data" class="card svelte-11pfc6v">`);
		if (repop()?.message) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="banner err svelte-11pfc6v" role="alert">${escape_html(repop().message)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <label class="svelte-11pfc6v"><span class="svelte-11pfc6v">Judul</span> <input name="title" type="text"${attr("value", repop()?.title ?? data.post.title)} required="" class="svelte-11pfc6v"/></label> <label class="svelte-11pfc6v"><span class="svelte-11pfc6v">Tanggal berakhir</span> <!---->`);
		$$renderer.push(`<input name="expiresAt" type="datetime-local"${attr("value", repop()?.expiresAt ?? toDatetimeLocalValue(data.post.expiresAt))} required="" class="svelte-11pfc6v"/>`);
		$$renderer.push(`<!----> <p class="field-hint svelte-11pfc6v">Mengikuti zona waktu peramban Anda. Post tidak tampil di feed setelah waktu ini lewat.</p></label> <label class="svelte-11pfc6v"><span class="svelte-11pfc6v">Gambar</span> <div class="upload svelte-11pfc6v"><input id="edit-image" name="image" type="file" accept="image/*" class="file-native svelte-11pfc6v"/> <label class="drop svelte-11pfc6v" for="edit-image">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<img class="preview svelte-11pfc6v"${attr("src", data.post.imageUrl)} alt="Gambar saat ini"/> <div class="drop-meta svelte-11pfc6v"><div class="drop-title svelte-11pfc6v">Gambar saat ini</div> <div class="drop-sub svelte-11pfc6v">Klik area ini untuk ganti gambar (opsional)</div></div>`);
		$$renderer.push(`<!--]--></label></div></label> <button type="submit"${attr("disabled", submitting, true)} class="svelte-11pfc6v">${escape_html("Simpan Perubahan")}</button></form></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-hlOdvCV-.js.map
