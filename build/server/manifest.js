const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["bank-logos/bsi.png","bank-logos/mandiri.png","logo.svg","robots.txt","uploads/.gitkeep","uploads/1777036930474-e1a55e71-2f05-4d8d-9196-8b257e500c1e.webp","uploads/company-logo-1776907363674-4f3aa5e8.png","uploads/gallery/travel-haji-khusus-makassar-jabal-rahmah.png","uploads/gallery/travel-haji-khusus-makassar-jamaah-area-bukit.png","uploads/gallery/travel-haji-umrah-makassar-jamaah-hotel.png","uploads/gallery/travel-haji-umrah-makassar-jamaah-ihram-masjidil-haram.png","uploads/gallery/travel-haji-umrah-makassar-jamaah-kaabah-malam.png","uploads/gallery/travel-haji-umrah-makassar-kebersamaan-jamaah-madinah.png","uploads/gallery/travel-haji-umrah-makassar-ziarah-masjidil-haram.png","uploads/gallery/travel-umrah-makassar-jamaah-bandara-keberangkatan.png","uploads/gallery/travel-umrah-makassar-jamaah-masjid-nabawi-payung.png","uploads/gallery/travel-umrah-makassar-jamaah-pelataran-masjid-nabawi.png","uploads/gallery/travel-umrah-makassar-rombongan-kota-suci.png","uploads/gallery/travel-umrah-makassar-rombongan-spanduk-madinah.png","uploads/gallery/travel-umrah-makassar-ziarah-jamaah-depan-masjid.png"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".txt":"text/plain",".webp":"image/webp"},
	_: {
		client: {start:"_app/immutable/entry/start.C4sxUWBJ.js",app:"_app/immutable/entry/app.CtYyRi4E.js",imports:["_app/immutable/entry/start.C4sxUWBJ.js","_app/immutable/chunks/Bdssw1Kk.js","_app/immutable/chunks/DKj7emCc.js","_app/immutable/entry/app.CtYyRi4E.js","_app/immutable/chunks/DKj7emCc.js","_app/immutable/chunks/CItELRlb.js","_app/immutable/chunks/CuyqONxg.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BU6S-C0Z.js')),
			__memo(() => import('./chunks/1-BxDjPnTH.js')),
			__memo(() => import('./chunks/2-DxkTuFzp.js')),
			__memo(() => import('./chunks/3-iZV86MlI.js')),
			__memo(() => import('./chunks/4-CsoNkSUJ.js')),
			__memo(() => import('./chunks/5-CkwUlZYJ.js')),
			__memo(() => import('./chunks/6-CmTbnWTz.js')),
			__memo(() => import('./chunks/7-C1vlCFEK.js')),
			__memo(() => import('./chunks/8-y0Cw88bM.js')),
			__memo(() => import('./chunks/9-DvUmB9fs.js')),
			__memo(() => import('./chunks/10-KFFOv1F_.js')),
			__memo(() => import('./chunks/11-BRRyQKKA.js')),
			__memo(() => import('./chunks/12-DBQEkU9E.js')),
			__memo(() => import('./chunks/13-C930qV3_.js')),
			__memo(() => import('./chunks/14-CmNe0UqY.js')),
			__memo(() => import('./chunks/15-CDWvJ1eQ.js')),
			__memo(() => import('./chunks/16-Dl1h4lhF.js')),
			__memo(() => import('./chunks/17-DOTUJ6zL.js')),
			__memo(() => import('./chunks/18-BCjskdxE.js')),
			__memo(() => import('./chunks/19-CW85_Oey.js')),
			__memo(() => import('./chunks/20-CL5Ul85g.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin/analytics",
				pattern: /^\/admin\/analytics\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/gallery",
				pattern: /^\/admin\/gallery\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/admin/informasi",
				pattern: /^\/admin\/informasi\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/admin/login",
				pattern: /^\/admin\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/admin/posts/new",
				pattern: /^\/admin\/posts\/new\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/admin/posts/[id]/edit",
				pattern: /^\/admin\/posts\/([^/]+?)\/edit\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/admin/settings",
				pattern: /^\/admin\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/api/track",
				pattern: /^\/api\/track\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-Dg4PgIeH.js'))
			},
			{
				id: "/informasi",
				pattern: /^\/informasi\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/informasi/galeri",
				pattern: /^\/informasi\/galeri\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/informasi/kantor",
				pattern: /^\/informasi\/kantor\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/informasi/kontak",
				pattern: /^\/informasi\/kontak\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/informasi/layanan",
				pattern: /^\/informasi\/layanan\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/informasi/legalitas",
				pattern: /^\/informasi\/legalitas\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/informasi/rekening",
				pattern: /^\/informasi\/rekening\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/informasi/tentang",
				pattern: /^\/informasi\/tentang\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/uploads/[...path]",
				pattern: /^\/uploads(?:\/([^]*))?\/?$/,
				params: [{"name":"path","optional":false,"rest":true,"chained":true}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BHi9_Ua5.js'))
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
