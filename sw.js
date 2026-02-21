// CACHE_NAME-Versionsänderung löscht den alten Cache und zwingt den Browser,
// diesen SW neu zu installieren (einmalige Migration von Cache-first → Network-first).
const CACHE_NAME = 'cupra-assistant-v4';

// Nur statische Assets im SW cachen – index.html NICHT (Network-first).
const STATIC_ASSETS = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Installation – statische Assets vorab cachen, SW sofort aktivieren
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// Aktivierung – alte Caches löschen, offene Tabs sofort übernehmen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(
        names
          .filter(n => n !== CACHE_NAME)
          .map(n => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch-Handler
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Nur same-origin GET-Anfragen abfangen
  if (url.origin !== self.location.origin || event.request.method !== 'GET') {
    return;
  }

  const path = url.pathname;
  // HTML-Anfragen: Pfad endet mit .html, ist / oder hat keine Dateiendung
  const isHTML = path.endsWith('.html') || path.endsWith('/') || !path.includes('.');

  if (isHTML) {
    // ── Network-first für HTML ───────────────────────────────────────────
    // Online: immer frisch vom Server (Updates kommen automatisch an).
    // Offline: Fallback auf gecachte Version.
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Erfolgreiche Netzwerkantwort → Cache für Offline-Fallback aktualisieren
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // ── Cache-first für statische Assets (Icons, Manifest, version.json) ─
    // Schnell und offline-fähig; Icons ändern sich praktisch nie.
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request))
    );
  }
});
