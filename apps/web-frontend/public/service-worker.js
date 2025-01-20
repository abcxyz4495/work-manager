const CACHE_NAME = 'offline-cache';
const OFFLINE_PAGE = '/offline.html';

// Files to cache, including the offline page
const assetsToCache = [
  '/index.html',
  '/assets/index-DgM1NOYE.js',
  '/assets/index-Cg63pDJ6.css',
  OFFLINE_PAGE,
];

// Install event to cache the necessary files
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Fetch event to serve the cached assets, fallback to offline page
self.addEventListener('fetch', (event) => {
  console.log('Service Worker fetch event:', event);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Serve cached assets
      }

      // If no cached response, try fetching from the network
      return fetch(event.request).catch(() => {
        // If fetch fails (offline), serve the offline page
        return caches.match(OFFLINE_PAGE);
      });
    })
  );
});

// Activate event (clean up old caches if necessary)
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});
