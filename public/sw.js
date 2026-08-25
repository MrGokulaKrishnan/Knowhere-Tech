// Knowhere Tech Service Worker — v3 (network-first, localhost-safe)
const CACHE_VERSION = 'knowhere-v3';
const STATIC_CACHE = `${CACHE_VERSION}-static`;

// Only cache static assets — NOT html/js/css (those must always be fresh)
const PRECACHE_ASSETS = [
  '/logo.png',
  '/favicon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      // Cache only icons/manifests — NOT index.html or JS bundles
      return cache.addAll(PRECACHE_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => !key.startsWith(CACHE_VERSION))
          .map((key) => caches.delete(key)) // Delete ALL old versioned caches
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET and non-http(s) requests
  if (event.request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // ALWAYS network-first for HTML and JS/CSS bundles — no caching
  // This prevents the black screen from stale cached bundles
  const isAppShell = event.request.headers.get('accept')?.includes('text/html');
  const isBundle = url.pathname.match(/\.(js|css|tsx?|jsx?)($|\?)/);
  if (isAppShell || isBundle) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Cache-first only for static assets (images, fonts, icons)
  const isStatic = url.pathname.match(/\.(png|jpg|jpeg|svg|webp|ico|woff2?|ttf)$/);
  if (isStatic) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((res) => {
          const clone = res.clone();
          caches.open(STATIC_CACHE).then((c) => c.put(event.request, clone));
          return res;
        });
      })
    );
    return;
  }

  // Everything else: network with cache fallback
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
