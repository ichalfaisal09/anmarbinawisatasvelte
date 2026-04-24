import { r as readPosts } from './posts-store-BtfHtR9r.js';
import 'node:fs/promises';
import 'node:path';

//#region src/routes/+page.server.ts
var load = async () => {
	const postsAll = await readPosts();
	const now = Date.now();
	return { posts: postsAll.filter((p) => Date.parse(p.expiresAt) > now) };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-ZcC2Jkvr.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/4.C5NsToew.js","_app/immutable/chunks/DKj7emCc.js","_app/immutable/chunks/CuyqONxg.js","_app/immutable/chunks/Ew9Mtm18.js"];
const stylesheets = ["_app/immutable/assets/4.S6jMulby.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-DJFAat-P.js.map
