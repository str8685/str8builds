/**
 * Service Worker Registration Script for STR8 BUILD
 * This script should be included in your index.html
 */

// Only register service worker in production to avoid caching issues during development
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
        
        // Check for updates every hour
        setInterval(() => {
          registration.update();
        }, 3600000); // 1 hour
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Add to home screen prompt handler
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default prompt
  e.preventDefault();
  
  // Store the event for later use
  deferredPrompt = e;
  
  // Show your custom "Add to Home Screen" button or banner
  const installBanner = document.getElementById('install-banner');
  if (installBanner) {
    installBanner.classList.remove('hidden');
    
    // Add click handler to install button
    const installButton = document.getElementById('install-button');
    if (installButton) {
      installButton.addEventListener('click', () => {
        // Hide the banner
        installBanner.classList.add('hidden');
        
        // Show the install prompt
        deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          
          // Clear the deferred prompt
          deferredPrompt = null;
        });
      });
    }
  }
});
