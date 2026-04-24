import { h as head, e as escape_html, a as attr } from './dev-C-JwAy58.js';
import './client-BPBJT-EO.js';
import './index-server-BisdV8Zi.js';
import './internal-40NkqYvR.js';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/login/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { form } = $$props;
		let submitting = false;
		head("18c6u1m", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Admin Login | Anmar Binawisata</title>`);
			});
		});
		$$renderer.push(`<div class="shell svelte-18c6u1m" aria-label="Halaman masuk admin"><section class="hero svelte-18c6u1m"><div class="hero-top svelte-18c6u1m"><div class="hero-mark svelte-18c6u1m"><img class="hero-logo svelte-18c6u1m" src="/logo.svg" alt="" width="48" height="48"/></div> <p class="hero-kicker svelte-18c6u1m">Anmar Binawisata</p></div> <div class="hero-body svelte-18c6u1m"><h1 class="hero-title svelte-18c6u1m">Kelola konten &amp; promo dari satu tempat.</h1> <p class="hero-lede svelte-18c6u1m">Panel ini untuk tim internal. Pastikan Anda memakai kredensial yang diberikan administrator.</p></div> <p class="hero-foot svelte-18c6u1m">Akses terbatas · Sesi aman dengan cookie httpOnly</p></section> <section class="panel svelte-18c6u1m"><div class="panel-inner svelte-18c6u1m"><header class="panel-head svelte-18c6u1m"><h2 class="panel-title svelte-18c6u1m">Masuk</h2> <p class="panel-sub svelte-18c6u1m">Gunakan username dan password admin Anda.</p></header> <form method="POST" class="card svelte-18c6u1m">`);
		if (form?.message) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="form-alert svelte-18c6u1m" role="alert">${escape_html(form.message)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <label class="svelte-18c6u1m"><span class="svelte-18c6u1m">Username</span> <input name="username" type="text" autocomplete="username" required=""${attr("value", form?.username ?? "")} class="svelte-18c6u1m"/></label> <label class="svelte-18c6u1m"><span class="svelte-18c6u1m">Password</span> <div class="password-row svelte-18c6u1m"><input name="password"${attr("type", "password")} autocomplete="current-password" required="" class="svelte-18c6u1m"/> <button type="button" class="toggle svelte-18c6u1m"${attr("aria-label", "Tampilkan password")}>`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 5c-5.05 0-9.27 3.11-11 7 1.73 3.89 5.95 7 11 7s9.27-3.11 11-7c-1.73-3.89-5.95-7-11-7Zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path></svg>`);
		$$renderer.push(`<!--]--></button></div></label> <button type="submit" class="submit svelte-18c6u1m"${attr("disabled", submitting, true)}>${escape_html("Masuk ke panel")}</button></form> <p class="back svelte-18c6u1m"><a href="/" class="svelte-18c6u1m">← Kembali ke website</a></p></div></section></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Cn2bbfCX.js.map
