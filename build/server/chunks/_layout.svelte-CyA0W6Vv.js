import { h as head, d as derived, a as attr, e as escape_html, b as attr_class } from './dev-C-JwAy58.js';
import { p as page } from './state-4eu3BbAE.js';
import { F as FeedContactCard, I as IconDocumentLines, a as IconHomeFilled, b as IconHomeStroke, c as IconWhatsApp } from './FeedContactCard-BLP-oI_c.js';
import { R as ROUTE, n as normalizePathname, i as isInformasiSection } from './routes-DeQRhkG4.js';
import './client-C3ctDXRa.js';
import './index-server-BisdV8Zi.js';
import './internal-CY9qb-nT.js';
import './index-DBqjc0Yf.js';

//#region src/lib/components/FeedHeader.svelte
function FeedHeader($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { companyName = "", logoUrl = "/logo.svg" } = $$props;
		const displayName = derived(() => (companyName ?? "").trim() || "Anmar Binawisata");
		const displayLogo = derived(() => (logoUrl ?? "").trim() || "/logo.svg");
		const path = derived(() => normalizePathname(page.url.pathname));
		const isHome = derived(() => path() === ROUTE.HOME);
		$$renderer.push(`<header class="header svelte-19pdv3z"><div class="header-inner svelte-19pdv3z"><a class="brand svelte-19pdv3z"${attr("href", ROUTE.HOME)}${attr("aria-label", displayName())}><img class="brand-logo svelte-19pdv3z"${attr("src", displayLogo())} alt="" width="28" height="28"/> <span class="brand-name svelte-19pdv3z">${escape_html(displayName())}</span></a> <div class="nav-minimal">`);
		if (isHome()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<a class="nav-ic svelte-19pdv3z"${attr("href", ROUTE.INFORMASI)} aria-label="Informasi">`);
			IconDocumentLines($$renderer, { size: 24 });
			$$renderer.push(`<!----></a>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<a class="nav-ic svelte-19pdv3z"${attr("href", ROUTE.HOME)} aria-label="Beranda — galeri promo">`);
			IconHomeFilled($$renderer, { size: 24 });
			$$renderer.push(`<!----></a>`);
		}
		$$renderer.push(`<!--]--></div></div></header>`);
	});
}
//#endregion
//#region src/lib/components/FeedHomeAmbience.svelte
function FeedHomeAmbience($$renderer) {
	$$renderer.push(`<div class="ambience svelte-qaog5l" aria-hidden="true"><div class="blob b1 svelte-qaog5l"></div> <div class="blob b2 svelte-qaog5l"></div> <div class="blob b3 svelte-qaog5l"></div> <div class="grain svelte-qaog5l"></div></div>`);
}
//#endregion
//#region src/lib/components/FeedWorldClocks.svelte
function FeedWorldClocks($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section class="strip svelte-63nt8f" aria-labelledby="tz-heading"><div class="strip-head svelte-63nt8f"><h2 id="tz-heading" class="strip-title svelte-63nt8f">Referensi waktu</h2> <p class="strip-lede svelte-63nt8f">Makassar (Masehi, WITA). Mekkah: jam AST + tanggal <strong class="svelte-63nt8f">Hijriah</strong> (Umm al-Qura).</p></div> <div class="strip-grid svelte-63nt8f"><div class="cell svelte-63nt8f"><h3 class="cell-label svelte-63nt8f">Makassar</h3> <p class="cell-meta svelte-63nt8f">Masehi · WITA</p> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<p class="cell-skel svelte-63nt8f">Memuat…</p>`);
		$$renderer.push(`<!--]--></div> <div class="cell-divider svelte-63nt8f" aria-hidden="true"></div> <div class="cell svelte-63nt8f"><h3 class="cell-label svelte-63nt8f">Mekkah</h3> <p class="cell-meta svelte-63nt8f">Hijriah · AST</p> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<p class="cell-skel svelte-63nt8f">Memuat…</p>`);
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/PublicBottomNav.svelte
function PublicBottomNav($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { company } = $$props;
		const path = derived(() => normalizePathname(page.url.pathname));
		const homeActive = derived(() => path() === ROUTE.HOME);
		const infoActive = derived(() => isInformasiSection(path()));
		const waClean = derived(() => String(company.waNumber ?? "").replace(/[^\d]/g, ""));
		const waHref = derived(() => waClean() ? `https://wa.me/${waClean()}` : "");
		$$renderer.push(`<nav class="bottom-nav svelte-4hsoov" aria-label="Navigasi utama"><a${attr_class("tab svelte-4hsoov", void 0, { "active": homeActive() })}${attr("href", ROUTE.HOME)}${attr("aria-current", homeActive() ? "page" : void 0)}><span class="icon svelte-4hsoov" aria-hidden="true">`);
		IconHomeStroke($$renderer, {});
		$$renderer.push(`<!----></span> <span class="label svelte-4hsoov">Beranda</span></a> <a${attr_class("tab svelte-4hsoov", void 0, { "active": infoActive() })}${attr("href", ROUTE.INFORMASI)}${attr("aria-current", infoActive() ? "page" : void 0)}><span class="icon svelte-4hsoov" aria-hidden="true">`);
		IconDocumentLines($$renderer, {});
		$$renderer.push(`<!----></span> <span class="label svelte-4hsoov">Informasi</span></a> `);
		if (waHref()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<a class="tab wa svelte-4hsoov"${attr("href", waHref())} target="_blank" rel="noopener noreferrer"><span class="icon svelte-4hsoov" aria-hidden="true">`);
			IconWhatsApp($$renderer, {});
			$$renderer.push(`<!----></span> <span class="label svelte-4hsoov">WhatsApp</span></a>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<button type="button" class="tab wa svelte-4hsoov" disabled="" title="Nomor WhatsApp belum diatur" aria-label="WhatsApp belum diatur"><span class="icon svelte-4hsoov" aria-hidden="true">`);
			IconWhatsApp($$renderer, { muted: true });
			$$renderer.push(`<!----></span> <span class="label svelte-4hsoov">WhatsApp</span></button>`);
		}
		$$renderer.push(`<!--]--></nav>`);
	});
}
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children, data } = $$props;
		const isAdminRoute = derived(() => page.url.pathname.startsWith("/admin"));
		const isHomeFeed = derived(() => normalizePathname(page.url.pathname) === ROUTE.HOME);
		const siteTitle = derived(() => (data.company.companyName ?? "").trim() || "Anmar Binawisata");
		const siteDescription = derived(() => `Travel haji umrah Makassar terpercaya bersama ${siteTitle()}. Program umrah, haji khusus, informasi legalitas, rekening resmi, dan galeri kegiatan jamaah.`);
		const logoUrl = derived(() => data.company.logoUrl?.trim() ? data.company.logoUrl : "/logo.svg");
		const ogImage = derived(() => logoUrl().startsWith("http") ? logoUrl() : `${page.url.origin}${logoUrl()}`);
		const ga4MeasurementId = derived(() => (data.company.ga4MeasurementId ?? "").trim().toUpperCase());
		const metaPixelId = derived(() => (data.company.metaPixelId ?? "").trim());
		const trackingEnabled = derived(() => Boolean(data.company.trackingEnabled));
		head("12qhfyh", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(siteTitle())}</title>`);
			});
			$$renderer.push(`<meta name="description"${attr("content", siteDescription())}/> <meta property="og:type" content="website"/> <meta property="og:title"${attr("content", siteTitle())}/> <meta property="og:description"${attr("content", siteDescription())}/> <meta property="og:url"${attr("content", page.url.href)}/> <meta property="og:image"${attr("content", ogImage())}/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"${attr("content", siteTitle())}/> <meta name="twitter:description"${attr("content", siteDescription())}/> <meta name="twitter:image"${attr("content", ogImage())}/> `);
			if (!isAdminRoute()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<script>
			{\`window.__trackingEnabled = \${trackingEnabled ? 'true' : 'false'};\`}
		<\/script>`);
				$$renderer.push(`<!---->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (!isAdminRoute() && trackingEnabled() && ga4MeasurementId()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<script async=""${attr("src", `https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId()}`)}><\/script>`);
				$$renderer.push(` `);
				$$renderer.push(`<script>
			{\`
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
window.gtag('js', new Date());
window.gtag('config', '\${ga4MeasurementId}');
			\`}
		<\/script>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (!isAdminRoute() && trackingEnabled() && metaPixelId()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<script>
			{\`
!function(f,b,e,v,n,t,s){
if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
window.fbq = window.fbq || fbq;
window.fbq('init', '\${metaPixelId}');
window.fbq('track', 'PageView');
			\`}
		<\/script>`);
				$$renderer.push(` <noscript><img height="1" width="1" style="display:none" alt=""${attr("src", `https://www.facebook.com/tr?id=${metaPixelId()}&ev=PageView&noscript=1`)}/></noscript>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		});
		if (!isAdminRoute()) {
			$$renderer.push("<!--[0-->");
			FeedHeader($$renderer, {
				companyName: data.company.companyName,
				logoUrl: data.company.logoUrl?.trim() ? data.company.logoUrl : "/logo.svg"
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (isAdminRoute()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<main class="admin-main svelte-12qhfyh">`);
			children($$renderer);
			$$renderer.push(`<!----></main>`);
		} else if (isHomeFeed()) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<main class="container public-shell home-feed svelte-12qhfyh">`);
			FeedHomeAmbience($$renderer);
			$$renderer.push(`<!----> <div class="feed-container svelte-12qhfyh">`);
			FeedWorldClocks($$renderer);
			$$renderer.push(`<!----> `);
			children($$renderer);
			$$renderer.push(`<!----> `);
			FeedContactCard($$renderer, { company: data.company });
			$$renderer.push(`<!----></div> `);
			PublicBottomNav($$renderer, { company: data.company });
			$$renderer.push(`<!----></main>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<main class="container public-shell svelte-12qhfyh"><div class="public-page-stack svelte-12qhfyh">`);
			children($$renderer);
			$$renderer.push(`<!----></div> `);
			PublicBottomNav($$renderer, { company: data.company });
			$$renderer.push(`<!----></main>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-CyA0W6Vv.js.map
