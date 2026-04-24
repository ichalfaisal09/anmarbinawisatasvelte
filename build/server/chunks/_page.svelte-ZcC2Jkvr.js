import { h as head, a as attr, c as ensure_array_like, d as derived, e as escape_html, f as attr_style, b as attr_class, s as stringify } from './dev-C-JwAy58.js';
import { t as toMediaUrl } from './media-url-Cdn1-NPd.js';

//#region src/lib/components/FeedPost.svelte
function FeedPost($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { title, imageUrl, waNumber = "", companyName = "", logoUrl = "", createdAt = "", expiresAt = "", officeHours = "", priorityImage = false, staggerIndex = 0 } = $$props;
		const brand = derived(() => (companyName ?? "").trim() || "Anmar Binawisata");
		const logo = derived(() => (logoUrl ?? "").trim() || "");
		const initial = derived(() => (brand().slice(0, 1) || "A").toUpperCase());
		let imageLoaded = false;
		const waClean = derived(() => String(waNumber ?? "").replace(/[^\d]/g, ""));
		const waLink = derived(() => waClean() === "" ? "#" : `https://wa.me/${waClean()}?text=${encodeURIComponent(`Halo ${brand()}, saya tertarik dengan promo: ${title}`)}`);
		const postedLabel = derived(() => {
			const d = new Date(createdAt);
			if (!Number.isFinite(d.getTime())) return "";
			return new Intl.DateTimeFormat("id-ID", {
				day: "numeric",
				month: "short",
				year: "numeric"
			}).format(d);
		});
		const isActive = derived(() => {
			const end = Date.parse(expiresAt);
			if (!Number.isFinite(end)) return false;
			return end > Date.now();
		});
		const imgAlt = derived(() => `Promo: ${title}`);
		const postImageUrl = derived(() => toMediaUrl(imageUrl));
		const brandLogoUrl = derived(() => toMediaUrl(logo()));
		$$renderer.push(`<article class="post svelte-1pqho8u"${attr_style(`--stagger:${stringify(staggerIndex)}`)}><header class="post-header svelte-1pqho8u"><div class="avatar-wrap svelte-1pqho8u" aria-hidden="true">`);
		if (logo()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<img class="avatar-img svelte-1pqho8u"${attr("src", brandLogoUrl())} alt="" width="36" height="36"/>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<span class="avatar-letter svelte-1pqho8u">${escape_html(initial())}</span>`);
		}
		$$renderer.push(`<!--]--></div> <div class="header-text svelte-1pqho8u"><div class="username svelte-1pqho8u">${escape_html(brand())}</div> <div class="meta-row svelte-1pqho8u">`);
		if (postedLabel()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<time class="posted svelte-1pqho8u"${attr("datetime", createdAt)}>${escape_html(postedLabel())}</time>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (isActive()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="badge svelte-1pqho8u">Promo aktif</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></header> <div class="media-container svelte-1pqho8u">`);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="media-skeleton svelte-1pqho8u" aria-hidden="true"></div>`);
		$$renderer.push(`<!--]--> <img${attr("src", postImageUrl())}${attr("alt", imgAlt())}${attr_class("media-img svelte-1pqho8u", void 0, { "media-img--loaded": imageLoaded })}${attr("loading", priorityImage ? "eager" : "lazy")}${attr("fetchpriority", priorityImage ? "high" : "low")} decoding="async" onload="this.__e=event" onerror="this.__e=event"/></div> <div class="post-content svelte-1pqho8u"><h2 class="title svelte-1pqho8u">${escape_html(title)}</h2> <a${attr("href", waLink())}${attr_class("btn-action svelte-1pqho8u", void 0, { "disabled": waLink() === "#" })} target="_blank" rel="noopener noreferrer"${attr("aria-disabled", waLink() === "#")}>Daftar via WhatsApp</a> `);
		if ((officeHours ?? "").trim()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="cta-note svelte-1pqho8u">Balasan chat mengikuti jam operasional kantor.</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></article>`);
	});
}
//#endregion
//#region src/lib/components/FeedWelcomeStrip.svelte
function FeedWelcomeStrip($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { brandName, postCount, activePromoCount } = $$props;
		const brand = derived(() => (brandName ?? "").trim() || "Kami");
		$$renderer.push(`<section class="welcome svelte-zrl7yu" aria-labelledby="welcome-heading"><div class="welcome-inner svelte-zrl7yu"><p class="eyebrow svelte-zrl7yu">Etalase digital</p> <h2 id="welcome-heading" class="headline svelte-zrl7yu"><span class="brand svelte-zrl7yu">${escape_html(brand())}</span> <span class="dot svelte-zrl7yu" aria-hidden="true"></span> <span class="rest svelte-zrl7yu">promo &amp; penawaran terkini</span></h2> <div class="stats svelte-zrl7yu" role="status"><span class="pill svelte-zrl7yu"><strong class="svelte-zrl7yu">${escape_html(postCount)}</strong> <span class="svelte-zrl7yu">posting</span></span> `);
		if (activePromoCount > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="pill pill--accent svelte-zrl7yu"><strong class="svelte-zrl7yu">${escape_html(activePromoCount)}</strong> <span class="svelte-zrl7yu">promo aktif</span></span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <p class="tips svelte-zrl7yu">Scroll untuk jelajahi · Tap WhatsApp untuk respon cepat · Waktu Makassar &amp; Mekkah di atas</p></div></section>`);
	});
}
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const brandTitle = derived(() => (data.company.companyName ?? "").trim() || "Anmar Binawisata");
		const logoForFeed = derived(() => data.company.logoUrl?.trim() ? data.company.logoUrl : "");
		const waClean = derived(() => String(data.company.waNumber ?? "").replace(/[^\d]/g, ""));
		const activePromoCount = derived(() => data.posts.filter((p) => {
			const end = Date.parse(p.expiresAt);
			return Number.isFinite(end) && end > Date.now();
		}).length);
		head("1uha8ag", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(brandTitle())} | Galeri promo</title>`);
			});
		});
		if (data.posts.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="feed-empty svelte-1uha8ag"><div class="feed-empty-inner svelte-1uha8ag"><div class="feed-empty-icon svelte-1uha8ag" aria-hidden="true"><svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"></rect><circle cx="8.5" cy="10" r="1.5" fill="currentColor" stroke="none"></circle><path d="M4 16l4-4 3 3 5-5 4 4" stroke-linecap="round" stroke-linejoin="round"></path></svg></div> <h1 class="feed-empty-title svelte-1uha8ag">Belum ada promo di feed</h1> <p class="feed-empty-text svelte-1uha8ag">Post promosi akan tampil di sini setelah ditambahkan dari panel admin. Periksa kembali nanti atau hubungi
				kami langsung.</p> `);
			if (waClean()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<a class="feed-empty-cta svelte-1uha8ag"${attr("href", `https://wa.me/${waClean()}`)} target="_blank" rel="noopener noreferrer">Chat WhatsApp</a>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			FeedWelcomeStrip($$renderer, {
				brandName: data.company.companyName,
				postCount: data.posts.length,
				activePromoCount: activePromoCount()
			});
			$$renderer.push(`<!----> <!--[-->`);
			const each_array = ensure_array_like(data.posts);
			for (let i = 0, $$length = each_array.length; i < $$length; i++) {
				let post = each_array[i];
				FeedPost($$renderer, {
					title: post.title,
					imageUrl: post.imageUrl,
					waNumber: data.company.waNumber,
					companyName: data.company.companyName,
					logoUrl: logoForFeed(),
					createdAt: post.createdAt,
					expiresAt: post.expiresAt,
					officeHours: data.company.officeHours,
					priorityImage: i === 0,
					staggerIndex: i
				});
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]-->`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-ZcC2Jkvr.js.map
