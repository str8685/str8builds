// This script will unregister any active service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (const registration of registrations) {
      registration.unregister();
      console.log('Service worker unregistered:', registration);
    }
    
    // Also clear any caches
    if ('caches' in window) {
      caches.keys().then(function(cacheNames) {
        cacheNames.forEach(function(cacheName) {
          caches.delete(cacheName);
          console.log('Cache deleted:', cacheName);
        });
      });
    }
  });
}