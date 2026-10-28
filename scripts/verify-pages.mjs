import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { preview } from 'vite';

const base = '/god-sikt-landing-page/';
const files = await readdir('dist', { recursive: true, withFileTypes: true });
// Only website output belongs in the artifact: no reports, source documents, or databases.
const allowedExtensions = /\.(html|css|js|json|webp|png|svg|jpg|jpeg|ico|woff2?)$/i;
for (const file of files) {
  assert(!file.isSymbolicLink(), `Unexpected symbolic link in dist: ${file.name}`);
  if (file.isFile()) assert(allowedExtensions.test(file.name), `Unexpected published file: ${file.name}`);
}

const server = await preview({ preview: { host: '127.0.0.1', port: 0, open: false } });
const address = server.httpServer.address();
assert(address && typeof address !== 'string');
const origin = `http://127.0.0.1:${address.port}`;
const verified = new Set();

async function verifyAsset(url) {
  assert(url.startsWith(base), `Asset escapes the repository path: ${url}`);
  if (verified.has(url)) return;
  const response = await fetch(new URL(url, origin));
  assert.equal(response.status, 200, `Asset did not load: ${url}`);
  assert(!response.headers.get('content-type')?.includes('text/html'), `Asset resolved to the HTML fallback: ${url}`);
  verified.add(url);
  if (url.endsWith('.css')) {
    const css = await response.text();
    for (const match of css.matchAll(/url\(["']?([^\s"')]+)["']?\)/g)) {
      if (!match[1].startsWith('data:')) await verifyAsset(new URL(match[1], new URL(url, origin)).pathname);
    }
  }
}

try {
  const response = await fetch(`${origin}${base}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert(html.includes('<html lang="nb">'));
  assert(!html.includes('%BASE_URL%'));
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (!/^(https?:|#)/.test(match[1])) await verifyAsset(match[1]);
  }
  for (const match of html.matchAll(/content="(https:\/\/dichino\.github\.io\/[^" ]+\.(?:png|webp))"/g)) {
    await verifyAsset(new URL(match[1]).pathname);
  }
  // Check every supplied asset, including screens loaded only after an interaction.
  for (const name of await readdir('public', { recursive: true })) {
    if (allowedExtensions.test(name)) await verifyAsset(`${base}${name.replaceAll('\\', '/')}`);
  }
  const signs = JSON.parse(await readFile('dist/assets/signs.json', 'utf8'));
  assert.equal(signs.length, 27);
  for (const sign of signs) await verifyAsset(`${base}${sign.image.replace(/^\/+/, '')}`);
  console.log(`Verified ${verified.size} production resources under ${base}; no private documents in dist.`);
} finally {
  server.httpServer.closeAllConnections();
  await new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve()));
}
