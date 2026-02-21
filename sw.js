const CACHE_NAME = 'cupra-assistant-v3';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Installation - Cache erstellen
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate - Alte Caches löschen und sofort übernehmen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch - NUR same-origin GET-Anfragen abfangen und cachen.
// Cross-origin-Anfragen (API, Markdown von GitHub) werden NICHT angefasst.
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Nur same-origin GET-Anfragen behandeln
  if (url.origin !== self.location.origin || event.request.method !== 'GET') {
    // Kein event.respondWith() -> Browser behandelt nativ
    return;
  }

  // Cache-First für statische Assets
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
