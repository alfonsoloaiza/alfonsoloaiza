const CACHE_NAME = 'portfolio-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './locales/es.json',
  './locales/en.json',
  './images/assets/icons/man.svg'
];

// 1. Instalación y Precaché
self.addEventListener('install', (e) => {
  // Fuerza al Service Worker activo a reemplazarse inmediatamente por el nuevo
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 2. Activación: Limpieza de cachés antiguas al actualizar versión
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim()) // Toma control inmediato de todas las pestañas abiertas
  );
});

// 3. Intercepción de peticiones (Cache-First con respaldo a Network)
self.addEventListener('fetch', (e) => {
  // Ignora peticiones que no sean GET (ej. POST, PUT)
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).catch(() => {
        // Opcional: Retornar un fallback offline en caso de fallo total
      });
    })
  );
});
