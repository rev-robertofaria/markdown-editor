"use strict";
// Service worker: torna o app instalável e o faz funcionar sem internet.
// - Página e manifesto: rede primeiro (versão nova sempre que houver internet), cache como reserva.
// - lib/ e icons/: cache primeiro (arquivos com versão fixa; mudam só junto com CACHE).
// Ao mudar qualquer arquivo de lib/, suba o número de CACHE.
const CACHE = 'markdown-md-v9';
const SHELL = ['./', 'index.html', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-192.png', 'icons/maskable-512.png', 'icons/favicon-64.png'];
const LIBS = [
  'lib/marked.min.js', 'lib/purify.min.js', 'lib/mermaid.min.js',
  'lib/hljs/highlight.min.js', 'lib/hljs/github.min.css', 'lib/hljs/github-dark.min.css',
  'lib/katex/katex.min.js', 'lib/katex/katex.min.css',
  ...['AMS-Regular', 'Caligraphic-Bold', 'Caligraphic-Regular', 'Fraktur-Bold', 'Fraktur-Regular',
      'Main-Bold', 'Main-BoldItalic', 'Main-Italic', 'Main-Regular', 'Math-BoldItalic', 'Math-Italic',
      'SansSerif-Bold', 'SansSerif-Italic', 'SansSerif-Regular', 'Script-Regular',
      'Size1-Regular', 'Size2-Regular', 'Size3-Regular', 'Size4-Regular', 'Typewriter-Regular']
     .map(f => `lib/katex/fonts/KaTeX_${f}.woff2`)
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll([...SHELL, ...LIBS])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  const path = url.pathname.slice(new URL(self.registration.scope).pathname.length);
  if (/^(lib|icons)\//.test(path)) {
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(r => r || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    })));
    return;
  }
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./')))
  );
});
