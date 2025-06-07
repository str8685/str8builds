// Global Click Interceptor for Jobs Navigation
// This script captures clicks globally and checks if they were intended for the Jobs element

(function() {
  console.log('Global Click Interceptor - Loading');
  
  // Track mouse position to detect if clicks are near the Jobs element
  let lastMouseX = 0;
  let lastMouseY = 0;
  
  // Track mouse movement
  document.addEventListener('mousemove', function(e) {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  }, true);
  
  // Global click handler to intercept all clicks
  document.addEventListener('click', function(e) {
    // Get all elements at the click position
    const elements = document.elementsFromPoint(lastMouseX, lastMouseY);
    
    // Check if any of the elements or their parents are related to Jobs
    for (const el of elements) {
      if (checkIfJobsRelated(el)) {
        console.log('Intercepted click on Jobs-related element!');
        e.stopPropagation();
        e.preventDefault();
        
        // Navigate to Jobs
        window.location.href = '/jobs';
        return;
      }
    }
  }, true); // Use capture phase to ensure we get the click first
  
  // Function to check if an element is Jobs-related
  function checkIfJobsRelated(element) {
    // Check if this is the Jobs span or any relevant parent
    if (element.dataset && element.dataset.componentName === 'Jobs') {
      return true;
    }
    
    // Check for other identifying characteristics of the Jobs element
    if (element.classList && 
        element.classList.contains('absolute') && 
        element.classList.contains('inset-0') &&
        element.classList.contains('group-hover:opacity-100')) {
      return true;
    }
    
    // Check if it's the briefcase icon or Jobs text
    if ((element.tagName === 'I' && element.classList.contains('fa-briefcase')) ||
        (element.textContent === 'Jobs' && element.closest('.group'))) {
      
      // Additional check to ensure we're dealing with the navigation item
      const parent = element.closest('.group');
      if (parent && parent.parentNode && parent.parentNode.classList.contains('flex')) {
        return true;
      }
    }
    
    return false;
  }
  
  // Fallback: Create a semi-transparent overlay specifically behind the bottom navigation
  function createBottomNavOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'jobs-nav-overlay';
    overlay.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 70px; /* Approximate height of bottom nav */
      z-index: 9998; /* Just below our targeted element */
      pointer-events: auto;
    `;
    
    // Create 5 equally spaced clickable areas for each nav item
    for (let i = 0; i < 5; i++) {
      const navItem = document.createElement('div');
      navItem.style.cssText = `
        position: absolute;
        bottom: 0;
        width: 20%;
        height: 100%;
        left: ${i * 20}%;
      `;
      
      // Make the 5th item (index 4) the Jobs clickable area
      if (i === 4) {
        navItem.style.cursor = 'pointer';
        navItem.addEventListener('click', function() {
          console.log('Jobs nav overlay clicked');
          window.location.href = '/jobs';
        });
      }
      
      overlay.appendChild(navItem);
    }
    
    document.body.appendChild(overlay);
    console.log('Added Jobs nav overlay');
  }
  
  // Add the overlay after a delay to ensure the DOM is ready
  setTimeout(createBottomNavOverlay, 1000);
})();
