import { r as readLegalitas } from './legalitas-store-D6hanZvf.js';
import 'node:fs/promises';
import 'node:path';

//#region src/routes/informasi/legalitas/+page.server.ts
var load = async () => {
	return await readLegalitas();
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 18;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BmOCGGoe.js')).default;
const server_id = "src/routes/informasi/legalitas/+page.server.ts";
const imports = ["_app/immutable/nodes/18.bYEvN6gs.js","_app/immutable/chunks/DKj7emCc.js","_app/immutable/chunks/CuyqONxg.js"];
const stylesheets = ["_app/immutable/assets/18.BMZuM1gp.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=18-BCjskdxE.js.map
