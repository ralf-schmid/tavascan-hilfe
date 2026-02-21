const CACHE_NAME = 'cupra-assistant-v2';
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

// Fetch - nur statische Assets cachen, alles andere direkt durchleiten
self.addEventListener('fetch', event => {
  // Alle Nicht-GET-Anfragen (z.B. API POST) direkt durchleiten
  if (event.request.method !== 'GET') {
    event.respondWith(fetch(event.request));
    return;
  }

  // Externe API-Aufrufe direkt durchleiten
  if (event.request.url.startsWith('https://api.anthropic.com')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Cache-First für statische Assets
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
