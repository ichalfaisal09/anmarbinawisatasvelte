import { h as head } from './dev-C-JwAy58.js';
import { F as FeedContactCard } from './FeedContactCard-BLP-oI_c.js';
import './routes-DeQRhkG4.js';

//#region src/routes/informasi/kontak/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		head("86or16", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Kontak | Informasi</title>`);
			});
		});
		$$renderer.push(`<article class="page svelte-86or16"><h1 class="svelte-86or16">Kontak</h1> <p class="lead svelte-86or16">Ringkasan kontak resmi. Data diambil dari pengaturan perusahaan di admin.</p> `);
		FeedContactCard($$renderer, {
			company: data.company,
			showFullContactLink: false
		});
		$$renderer.push(`<!----></article>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BA4giTBO.js.map
