// CJS entry point for cPanel LiteSpeed (lsnode.js) deployment
// 
// IMPORTANT: This file works because on the server:
// 1. "type": "module" was REMOVED from root package.json (so .js = CJS)
// 2. build/package.json was CREATED with {"type":"module"} (so build/*.js = ESM)
// 3. server.listen() is DEFERRED until ESM import completes
//    (prevents fd 0 conflict between LSAPI socket and process.stdin)
//
const http = require('http');

let svelteHandler = null;

const server = http.createServer((req, res) => {
  if (svelteHandler) {
    svelteHandler(req, res);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>SvelteKit memuat...</h1>');
  }
});

const ready = import('./build/handler.js')
  .then(({ handler }) => {
    svelteHandler = handler;
    console.error('[SvelteKit] Handler loaded OK');
  })
  .catch((err) => {
    console.error('[SvelteKit] Error:', err.stack);
  });

// Export listen so lsnode.js can call it after require()
// Deferred to avoid fd 0 conflict with ESM loader's process.stdin init
module.exports = {
  listen: function(port) {
    ready.then(() => server.listen(port));
  }
};
