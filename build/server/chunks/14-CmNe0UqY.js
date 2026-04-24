import { r as readGallery } from './gallery-store-EYNdcLxo.js';
import 'node:fs/promises';
import 'node:path';

//#region src/routes/informasi/galeri/+page.server.ts
var load = async () => {
	return { gallery: await readGallery() };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 14;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C4Uus12P.js')).default;
const server_id = "src/routes/informasi/galeri/+page.server.ts";
const imports = ["_app/immutable/nodes/14.CettXKpw.js","_app/immutable/chunks/DKj7emCc.js","_app/immutable/chunks/CuyqONxg.js","_app/immutable/chunks/_EAwy5yC.js"];
const stylesheets = ["_app/immutable/assets/14.DHrIJxJa.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=14-CmNe0UqY.js.map
