// Fix for Jobs navigation click issues
// This script runs immediately when loaded to fix the Jobs navigation
(function() {
  console.log('Jobs Navigation Fix Script loaded');
  
  // Function to fix the Jobs elements
  function fixJobsNavigation() {
    // Find all elements with data-component-name="Jobs"
    const jobsElements = document.querySelectorAll('[data-component-name="Jobs"]');
    console.log('Found Jobs elements:', jobsElements.length);
    
    // Process each Jobs element
    jobsElements.forEach(element => {
      // Make sure the element is visible and clickable
      element.style.opacity = '1 !important';
      element.style.cursor = 'pointer';
      element.style.pointerEvents = 'auto';
      element.style.zIndex = '999';
      
      // Add a direct click handler that captures and overrides any existing handlers
      element.addEventListener('click', function(e) {
        console.log('Jobs element clicked!');
        e.stopPropagation();
        e.preventDefault();
        window.location.href = '/jobs';
      }, true);
      
      // Also try adding onclick attribute directly
      element.setAttribute('onclick', "window.location.href='/jobs'; return false;");
      
      console.log('Fixed Jobs element:', element);
    });
    
    // Also fix any parent with class "group" that might be preventing clicks
    const groupElements = document.querySelectorAll('.group');
    groupElements.forEach(group => {
      const jobsChild = group.querySelector('[data-component-name="Jobs"]');
      if (jobsChild) {
        group.style.cursor = 'pointer';
        group.style.pointerEvents = 'auto';
        
        group.addEventListener('click', function(e) {
          console.log('Jobs parent group clicked!');
          window.location.href = '/jobs';
        });
        
        console.log('Fixed Jobs parent group:', group);
      }
    });
  }
  
  // Run the fix function immediately
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // Document already loaded
    fixJobsNavigation();
  } else {
    // Wait for the document to load
    document.addEventListener('DOMContentLoaded', fixJobsNavigation);
  }
  
  // Also set up a recurring check to fix any dynamically added elements
  setInterval(fixJobsNavigation, 1000);
})();
