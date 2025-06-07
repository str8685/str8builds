// This is a simple script to ensure the Jobs navigation item is clickable
// It adds a global event listener to detect clicks on elements with data-component-name="Jobs"

document.addEventListener('DOMContentLoaded', function() {
  console.log('JobsNavFix script loaded');
  
  // Add a global click event listener
  document.addEventListener('click', function(event) {
    // Check if the clicked element or any of its parents have data-component-name="Jobs"
    let target = event.target;
    while (target != null) {
      if (target.dataset && target.dataset.componentName === 'Jobs') {
        console.log('Jobs navigation item clicked');
        event.preventDefault();
        event.stopPropagation();
        
        // Navigate to the Jobs page
        window.location.href = '/jobs';
        return;
      }
      target = target.parentElement;
    }
  }, true); // Use capture phase to ensure our handler runs first
  
  // Also add a specific handler for the bottom nav Jobs item
  setInterval(function() {
    const jobsNavItems = document.querySelectorAll('[data-component-name="Jobs"]');
    if (jobsNavItems.length > 0) {
      jobsNavItems.forEach(item => {
        // Only add the handler if it doesn't already have one
        if (!item._hasJobsClickHandler) {
          item._hasJobsClickHandler = true;
          
          // Make sure the element and its parent are visible and clickable
          item.style.opacity = '1';
          item.style.pointerEvents = 'auto';
          item.style.cursor = 'pointer';
          item.style.zIndex = '9999';
          
          if (item.parentElement) {
            item.parentElement.style.cursor = 'pointer';
            item.parentElement.style.pointerEvents = 'auto';
          }
          
          // Add direct click handler
          item.addEventListener('click', function(e) {
            console.log('Direct Jobs item click');
            e.preventDefault();
            e.stopPropagation();
            window.location.href = '/jobs';
          }, true);
          
          console.log('Added click handler to Jobs item', item);
        }
      });
    }
  }, 1000); // Check every second for new elements
});
