// CJS wrapper for LiteSpeed/cPanel compatibility
// LiteSpeed's lsnode.js uses require() which cannot load ESM with top-level await
// This wrapper uses dynamic import() to bridge CJS -> ESM
import('./build/index.js').catch((err) => {
  console.error('Failed to start SvelteKit app:', err);
  process.exit(1);
});
