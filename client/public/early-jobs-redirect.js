// Early Jobs Redirect - Runs before React initializes
// This script injects a direct HTML button that's styled to match your professional space/cyan theme

(function() {
  // Create the button immediately
  const button = document.createElement('div');
  button.id = 'direct-jobs-button';
  
  // Style it to match your professional cyan/space theme with appropriate effects
  button.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, rgba(8, 145, 178, 0.9), rgba(14, 116, 144, 0.9));
    color: white;
    padding: 10px 25px;
    border-radius: 30px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 16px;
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.6);
    border: 1px solid rgba(6, 182, 212, 0.4);
    z-index: 999999;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    backdrop-filter: blur(8px);
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  `;
  
  // Add text with icon
  button.innerHTML = '<i class="fas fa-briefcase" style="color: #38bdf8;"></i> Go to Jobs';
  
  // Add direct click handler
  button.onclick = function() {
    window.location.href = '/jobs';
  };
  
  // Add button to document as early as possible
  if (document.body) {
    document.body.appendChild(button);
  } else {
    // If body isn't available yet, wait for it
    window.addEventListener('DOMContentLoaded', function() {
      document.body.appendChild(button);
    });
  }
  
  // Add an unload listener to clean up
  window.addEventListener('beforeunload', function() {
    const button = document.getElementById('direct-jobs-button');
    if (button) button.remove();
  });
})();
