const CACHE_NAME = 'portfolio-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './locales/es.json', // Muy importante para tu función setLanguage
  './locales/en.json',
  './images/assets/icons/man.svg'
];

// Instalación: Guardamos los recursos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Intercepción: Aquí es donde el SW ayuda a tu código de traducciones
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});