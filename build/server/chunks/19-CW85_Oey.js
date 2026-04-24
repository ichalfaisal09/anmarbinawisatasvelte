import { r as readRekening } from './rekening-store-m006ullS.js';
import 'node:fs/promises';
import 'node:path';

//#region src/routes/informasi/rekening/+page.server.ts
var load = async () => {
	return { accounts: await readRekening() };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 19;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BzKdoFyF.js')).default;
const server_id = "src/routes/informasi/rekening/+page.server.ts";
const imports = ["_app/immutable/nodes/19.Ckl_SKyX.js","_app/immutable/chunks/DKj7emCc.js","_app/immutable/chunks/CuyqONxg.js","_app/immutable/chunks/_EAwy5yC.js"];
const stylesheets = ["_app/immutable/assets/19.DOGHvDvI.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=19-CW85_Oey.js.map
