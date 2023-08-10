// This is a basic service worker that caches the index.html page and all of its resources.

// The scope of the service worker is the root directory of the PWA.
self.scope = '/';

// The install handler is called when the service worker is first registered.
self.addEventListener('install', function(event) {
  // Cache the index.html page.
  event.waitUntil(caches.open('index').then(function(cache) {
    return cache.add('/index.html');
  }));

  // Cache all of the resources that are required by the index.html page.
  var resources = [
    'style.css',
    'script.js',
    'image.png'
  ];
  return Promise.all(resources.map(function(resource) {
    return caches.open('resources').then(function(cache) {
      return cache.add(resource);
    });
  }));
});

// The activate handler is called when the service worker becomes active.
self.addEventListener('activate', function(event) {
  // Delete any old caches that are no longer needed.
  var oldCaches = ['index', 'resources'];
  return Promise.all(oldCaches.map(function(cacheName) {
    return caches.delete(cacheName);
  }));
});

// The fetch handler is called when the browser makes a request to a resource that is controlled by the service worker.
self.addEventListener('fetch', function(event) {
  // If the resource is in the cache, then return the cached version of the resource.
  event.respondWith(caches.match(event.request));
});
    
