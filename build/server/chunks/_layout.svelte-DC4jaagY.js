import { b as attr_class, a as attr, e as escape_html, d as derived } from './dev-C-JwAy58.js';
import { p as page } from './state-HMZ3rBxU.js';
import './client-BPBJT-EO.js';
import './index-server-BisdV8Zi.js';
import './internal-40NkqYvR.js';
import './index-DBqjc0Yf.js';

//#region src/routes/admin/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children, data } = $$props;
		let sidebarOpen = false;
		const pathname = derived(() => page.url.pathname);
		const isLoginRoute = derived(() => pathname() === "/admin/login");
		const isPostsNavActive = derived(() => pathname() === "/admin" || pathname().startsWith("/admin/posts"));
		const isGalleryNavActive = derived(() => pathname() === "/admin/gallery");
		const isInformasiNavActive = derived(() => pathname() === "/admin/informasi");
		const isSettingsNavActive = derived(() => pathname() === "/admin/settings");
		const isAnalyticsNavActive = derived(() => pathname() === "/admin/analytics");
		const displayCompanyName = derived(() => (data.company.companyName ?? "").trim() || "Anmar Binawisata");
		const displayLogo = derived(() => data.company.logoUrl?.trim() ? data.company.logoUrl : "/logo.svg");
		const displayAdminSubtitle = derived(() => (data.company.adminSidebarSubtitle ?? "").trim() || "Admin Panel");
		if (isLoginRoute()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<main class="login-only svelte-1qg5d05">`);
			children($$renderer);
			$$renderer.push(`<!----></main>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="admin svelte-1qg5d05"><button type="button"${attr_class("mobile-backdrop svelte-1qg5d05", void 0, { "show": sidebarOpen })} aria-label="Tutup menu"></button> <aside${attr_class("sidebar svelte-1qg5d05", void 0, { "open": sidebarOpen })} aria-label="Admin navigation"><a class="brand svelte-1qg5d05" href="/admin" aria-label="Admin dashboard"><img class="logo svelte-1qg5d05"${attr("src", displayLogo())} alt="" width="32" height="32"/> <div class="brand-text svelte-1qg5d05"><div class="brand-name svelte-1qg5d05">${escape_html(displayCompanyName())}</div> <div class="brand-sub svelte-1qg5d05">${escape_html(displayAdminSubtitle())}</div></div></a> <nav class="nav svelte-1qg5d05"><a href="/admin"${attr_class("svelte-1qg5d05", void 0, { "active": isPostsNavActive() })}>Posts</a> <a href="/admin/gallery"${attr_class("svelte-1qg5d05", void 0, { "active": isGalleryNavActive() })}>Galeri</a> <a href="/admin/informasi"${attr_class("svelte-1qg5d05", void 0, { "active": isInformasiNavActive() })}>Informasi</a> <a href="/admin/settings"${attr_class("svelte-1qg5d05", void 0, { "active": isSettingsNavActive() })}>Settings</a> <a href="/admin/analytics"${attr_class("svelte-1qg5d05", void 0, { "active": isAnalyticsNavActive() })}>Analytics</a></nav> <div class="spacer svelte-1qg5d05"></div> <form method="POST" action="/admin?/logout" class="logout svelte-1qg5d05"><button type="submit" class="svelte-1qg5d05">Logout</button></form></aside> <div class="main svelte-1qg5d05"><header class="topbar svelte-1qg5d05"><button type="button" class="icon-btn svelte-1qg5d05"${attr("aria-label", "Buka menu")}><svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z"></path></svg></button> <div class="crumb svelte-1qg5d05">`);
			if (pathname() === "/admin") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`Posts`);
			} else if (pathname().startsWith("/admin/posts/") && pathname().endsWith("/edit")) {
				$$renderer.push("<!--[1-->");
				$$renderer.push(`Edit Post`);
			} else if (pathname().startsWith("/admin/posts/new")) {
				$$renderer.push("<!--[2-->");
				$$renderer.push(`Post Baru`);
			} else if (pathname() === "/admin/gallery") {
				$$renderer.push("<!--[3-->");
				$$renderer.push(`Galeri`);
			} else if (pathname() === "/admin/informasi") {
				$$renderer.push("<!--[4-->");
				$$renderer.push(`Informasi`);
			} else if (pathname() === "/admin/settings") {
				$$renderer.push("<!--[5-->");
				$$renderer.push(`Settings`);
			} else if (pathname() === "/admin/analytics") {
				$$renderer.push("<!--[6-->");
				$$renderer.push(`Analytics`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`Admin`);
			}
			$$renderer.push(`<!--]--></div> <div class="topbar-right svelte-1qg5d05"><a class="chip svelte-1qg5d05" href="/" target="_blank" rel="noopener noreferrer">Lihat Website</a></div></header> <div class="content svelte-1qg5d05">`);
			children($$renderer);
			$$renderer.push(`<!----></div></div></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-DC4jaagY.js.map
