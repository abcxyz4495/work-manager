const CACHE_NAME = "my-app-cache-v1";
const OFFLINE_PAGE = "/offline.html";

// Files to cache during the installation phase
const urlsToCache = [
  "/",
  OFFLINE_PAGE,
  "/index.html", // Ensure to cache the main HTML file
  "/assets/index-CpbETj9y.css", // Replace with your CSS and JS assets
  "/assets/index-ClOxDWDy.js",
  // Add any other important static files (like images, fonts, etc.)
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service worker: opened cache and caching files");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - serve from cache if available, otherwise fetch from the network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if found
      if (cachedResponse) {
        return cachedResponse;
      }

      // Fetch from network if not found in the cache
      return fetch(event.request).catch(() => {
        // Serve the offline page if offline (when navigating)
        if (event.request.mode === "navigate") {
          return caches.match(OFFLINE_PAGE);
        }
      });
    })
  );
});

// Activate event - clean up old caches that are no longer needed
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`Service worker: deleting outdated cache ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
