const CACHE_NAME = 'deeply-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './romantic.json',
  './sad.json',
  'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css',
  'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,700;1,400&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(response => {
        return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
        });
    }).catch(() => {
        return caches.match(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
