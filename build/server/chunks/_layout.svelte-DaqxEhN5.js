import { a as attr, d as derived } from './dev-C-JwAy58.js';
import { p as page } from './state-jJVrakuR.js';
import { R as ROUTE, n as normalizePathname } from './routes-DeQRhkG4.js';
import './client-B7B_6LIP.js';
import './index-server-BisdV8Zi.js';
import './internal-yD_0jMic.js';
import './index-DBqjc0Yf.js';

//#region src/routes/informasi/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children } = $$props;
		const path = derived(() => normalizePathname(page.url.pathname));
		const isHub = derived(() => path() === ROUTE.INFORMASI);
		$$renderer.push(`<div class="info-layout svelte-1j50mse">`);
		if (!isHub()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<a class="back-hub svelte-1j50mse"${attr("href", ROUTE.INFORMASI)}>← Daftar informasi</a>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		children($$renderer);
		$$renderer.push(`<!----></div>`);
	});
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-DaqxEhN5.js.map
