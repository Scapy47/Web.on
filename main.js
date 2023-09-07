function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(reg => {
      console.log('Registration successful', reg);
    })
      .catch(e => console.error('Error during service worker registration:', e));
  } else {
    console.warn('Service Worker is not supported');
  }
}
