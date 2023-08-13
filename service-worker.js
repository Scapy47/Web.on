/*
// The service worker file should be named `serviceworker.js`

// Import the ServiceWorkerRegistration API
import { ServiceWorkerRegistration } from 'serviceworker-registration';

// Define the service worker
const sw = new ServiceWorkerRegistration('service-worker.js');

// Listen for the install event
sw.addEventListener('install', async (event) => {
  // Cache all the necessary files for offline usage
  const cache = await sw.caches.open('my-pwa-cache');
  await cache.addAll([
    'index.html',
    'styles.css',
    'scripts.js',
    'images/logo.png',
  ]);
});

// Listen for the activate event
sw.addEventListener('activate', (event) => {
  // Clear the old cache
  event.waitUntil(sw.caches.delete('old-cache'));
});

// Listen for the fetch event
sw.addEventListener('fetch', async (event) => {
  // Check if the request is for a cached file
  const cachedResponse = await sw.caches.match(event.request);

  // If the request is for a cached file, return the cached response
  if (cachedResponse) {
    event.respondWith(cachedResponse);
  } else {
    // If the request is not for a cached file, fetch the resource from the network
    event.respondWith(await fetch(event.request));
  }
});
*/



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


//installation prompt 
function handleInstall() {
  const prompt = window.prompt("Would you like to install this PWA?", "Install");

  if (prompt === "Install") {
    // Prompt the user to install the PWA.
    navigator.serviceWorker.promptInstall();
  }
}
