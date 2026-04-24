import { h as head, e as escape_html, a as attr, b as attr_class, c as ensure_array_like, d as derived } from './dev-C-JwAy58.js';
import './client-Do-DxbTc.js';
import { t as toMediaUrl } from './media-url-Cdn1-NPd.js';
import './index-server-BisdV8Zi.js';
import './internal-DNcO0KO2.js';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let filter = "active";
		function noticeLabel() {
			if (data.notice === "created") return "Post baru berhasil dibuat.";
			if (data.notice === "updated") return "Perubahan berhasil disimpan.";
			return "";
		}
		const dt = new Intl.DateTimeFormat("id-ID", {
			year: "numeric",
			month: "short",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit"
		});
		function formatDateTime(iso) {
			const d = new Date(iso);
			if (!Number.isFinite(d.getTime())) return "-";
			return dt.format(d);
		}
		const counts = derived(() => {
			const now = Date.now();
			let active = 0;
			let expired = 0;
			for (const p of data.posts) if (Date.parse(p.expiresAt) > now) active += 1;
			else expired += 1;
			return {
				active,
				expired,
				all: data.posts.length
			};
		});
		const visiblePosts = derived(() => {
			const now = Date.now();
			return data.posts.filter((p) => Date.parse(p.expiresAt) > now);
		});
		function isExpired(iso) {
			return Date.parse(iso) <= Date.now();
		}
		head("1jef3w8", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Posts | Admin Panel</title>`);
			});
		});
		$$renderer.push(`<div class="wrap svelte-1jef3w8">`);
		if (data.notice) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="notice svelte-1jef3w8" role="status"><p class="notice-text svelte-1jef3w8">${escape_html(noticeLabel())}</p> <button type="button" class="notice-dismiss svelte-1jef3w8">Tutup</button></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="head svelte-1jef3w8"><div><h1 class="svelte-1jef3w8">Posts</h1> <p class="meta svelte-1jef3w8">Daftar post feed + kontrol masa tayang.</p></div> <div class="head-right svelte-1jef3w8"><div class="stat svelte-1jef3w8"><span>Aktif <strong>${escape_html(counts().active)}</strong></span> <span class="dot svelte-1jef3w8">•</span> <span>Expired <strong>${escape_html(counts().expired)}</strong></span> <span class="dot svelte-1jef3w8">•</span> <span>Total <strong>${escape_html(counts().all)}</strong></span></div> <a class="btn-primary svelte-1jef3w8" href="/admin/posts/new">Post Baru</a></div></div> <div class="card svelte-1jef3w8">`);
		if (data.posts.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="empty-hero svelte-1jef3w8"><div class="empty-icon svelte-1jef3w8" aria-hidden="true"><svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"></path><rect x="3" y="5" width="18" height="14" rx="2"></rect><circle cx="8.5" cy="10" r="1.5" fill="currentColor" stroke="none"></circle></svg></div> <h2 class="empty-title svelte-1jef3w8">Belum ada post di feed</h2> <p class="empty-lede svelte-1jef3w8">Buat post pertama untuk mulai menampilkan promo di halaman utama.</p> <a class="btn-primary empty-cta svelte-1jef3w8" href="/admin/posts/new">Post Baru</a></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="tabs svelte-1jef3w8" role="tablist" aria-label="Filter post"><button type="button" role="tab"${attr("aria-selected", filter === "active")}${attr_class("svelte-1jef3w8", void 0, { "active": filter === "active" })}>Aktif <span class="tab-count svelte-1jef3w8">(${escape_html(counts().active)})</span></button> <button type="button" role="tab"${attr("aria-selected", filter === "expired")}${attr_class("svelte-1jef3w8", void 0, { "active": filter === "expired" })}>Expired <span class="tab-count svelte-1jef3w8">(${escape_html(counts().expired)})</span></button> <button type="button" role="tab"${attr("aria-selected", filter === "all")}${attr_class("svelte-1jef3w8", void 0, { "active": filter === "all" })}>Semua <span class="tab-count svelte-1jef3w8">(${escape_html(counts().all)})</span></button></div> `);
			if (visiblePosts().length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="empty svelte-1jef3w8">Tidak ada post di filter ini. Coba pilih tab <strong>Semua</strong>.</p>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="table-wrap svelte-1jef3w8"><table class="table svelte-1jef3w8"><thead class="svelte-1jef3w8"><tr><th class="th-thumb svelte-1jef3w8">Thumbnail</th><th class="svelte-1jef3w8">Judul</th><th class="th-date svelte-1jef3w8">Tanggal post</th><th class="th-date svelte-1jef3w8">Tanggal berakhir</th><th class="th-actions svelte-1jef3w8">Aksi</th></tr></thead><tbody class="svelte-1jef3w8"><!--[-->`);
				const each_array = ensure_array_like(visiblePosts());
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let post = each_array[$$index];
					$$renderer.push(`<tr class="svelte-1jef3w8"><td class="td-thumb svelte-1jef3w8"><div class="thumb-wrap svelte-1jef3w8"><img class="thumb svelte-1jef3w8"${attr("src", toMediaUrl(post.imageUrl))}${attr("alt", post.title)} loading="lazy"/></div></td><td class="td-title svelte-1jef3w8"><div class="title-row svelte-1jef3w8"><span${attr_class("badge svelte-1jef3w8", void 0, { "bad": isExpired(post.expiresAt) })}>${escape_html(isExpired(post.expiresAt) ? "Expired" : "Aktif")}</span></div> <div class="title-text svelte-1jef3w8">${escape_html(post.title)}</div></td><td class="td-muted svelte-1jef3w8">${escape_html(formatDateTime(post.createdAt))}</td><td class="td-muted svelte-1jef3w8">${escape_html(formatDateTime(post.expiresAt))}</td><td class="td-actions svelte-1jef3w8"><div class="actions svelte-1jef3w8"><a class="link-edit svelte-1jef3w8"${attr("href", `/admin/posts/${post.id}/edit`)}>Edit</a> <button type="button" class="btn-del svelte-1jef3w8">Hapus</button></div></td></tr>`);
				}
				$$renderer.push(`<!--]--></tbody></table></div>`);
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></div> <p class="hint svelte-1jef3w8">Upload gambar disimpan di <code class="svelte-1jef3w8">static/uploads</code>.</p></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-8QFpd3mU.js.map
