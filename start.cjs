// CJS wrapper for LiteSpeed/cPanel compatibility
// LiteSpeed's lsnode.js uses require() and intercepts http.createServer()
// We must create the server SYNCHRONOUSLY, then load SvelteKit handler ASYNC
const http = require('node:http');

let svelteHandler = null;

// Create server synchronously so LiteSpeed can intercept it via LSAPI
const server = http.createServer((req, res) => {
  if (svelteHandler) {
    svelteHandler(req, res);
  } else {
    res.writeHead(503, { 'Content-Type': 'text/html' });
    res.end('<h1>Memuat aplikasi...</h1><p>Silakan refresh dalam beberapa detik.</p>');
  }
});

// Load SvelteKit handler asynchronously (ESM with top-level await)
import('./build/env.js')
  .then(() => import('./build/handler.js'))
  .then(({ handler }) => {
    svelteHandler = handler;
    console.log('[SvelteKit] Handler loaded successfully');
  })
  .catch((err) => {
    console.error('[SvelteKit] Failed to load handler:', err);
  });

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`[SvelteKit] Server listening on port ${port}`);
});
