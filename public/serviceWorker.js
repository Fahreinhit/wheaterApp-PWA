const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// serviceWorker Installer 
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      console.log('Opened cache');

      return cache.addAll(urlsToCache);
    })
  )
});

// fetching request file offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(() => {
        return fetch(e.request)
          .catch(() => caches.match('offline.html'))
      })
  )
});

// activate serviceWorker
self.addEventListener('activate', (e) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  e.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
      if(!cacheWhitelist.includes(cacheName)) {
      return caches.delete(cacheName);
        }
      })
    ))
  )
});