import { r as readCompanySettings } from './company-store-CKixtk89.js';
import 'node:fs/promises';
import 'node:path';

//#region src/routes/+layout.server.ts
var load = async () => {
	return { company: await readCompanySettings() };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-cLRqpGlM.js')).default;
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/nodes/0.Bo_X1bqD.js","_app/immutable/chunks/DKj7emCc.js","_app/immutable/chunks/DZ1a1wp6.js","_app/immutable/chunks/CcMOAZLZ.js","_app/immutable/chunks/CuyqONxg.js","_app/immutable/chunks/Dnb9lm5U.js","_app/immutable/chunks/CrkmOKJn.js","_app/immutable/chunks/_EAwy5yC.js"];
const stylesheets = ["_app/immutable/assets/FeedContactCard.BwGblh1j.css","_app/immutable/assets/0.DFVmLgb0.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-CEUQ4LJ8.js.map
