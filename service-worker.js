/* 拾字 PWA：只快取本 App 的靜態介面，不攔截或快取 Gemini API、照片或筆記資料。 */
const CACHE_NAME = 'shizi-shell-v2-multilingual';
const BASE = self.registration.scope;
const SHELL_URLS = [
  new URL('index.html', BASE).href,
  new URL('manifest.webmanifest', BASE).href,
  new URL('icon-192.png', BASE).href,
  new URL('icon-512.png', BASE).href,
  new URL('apple-touch-icon.png', BASE).href
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(SHELL_URLS);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('shizi-shell-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // 不碰跨網域請求，例如 Gemini API。
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await fetch(req);
      } catch (err) {
        const cachedIndex = await caches.match(new URL('index.html', BASE).href);
        if (cachedIndex) return cachedIndex;
        return new Response('目前離線，而且尚未快取拾字首頁。請先連上網路開啟一次。', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    const response = await fetch(req);
    if (response && response.ok && url.origin === self.location.origin) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, response.clone()).catch(() => {});
    }
    return response;
  })());
});
