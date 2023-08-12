// Install the service worker and cache essential assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('your-app-cache').then(cache => {
      return cache.addAll([
        'index.html',
        'main.js',
        'style.css',

        // Add other assets that you want to cache
      ]);
    })
  );
});

// Intercept fetch requests and serve cached assets when available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
