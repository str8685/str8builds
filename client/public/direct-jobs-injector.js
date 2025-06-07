// Direct Jobs Element Fix
// This script targets the exact span element that isn't responding to clicks

(function() {
  console.log("Direct Jobs Element Fix - Loading");
  
  // Function to fix the specific Jobs span element
  function fixJobsElement() {
    // Target the exact element we need to fix
    const jobsSpans = document.querySelectorAll('span[data-component-name="Jobs"]');
    
    if (jobsSpans.length === 0) {
      console.log("No Jobs spans found yet, will retry");
      return;
    }
    
    console.log(`Found ${jobsSpans.length} Jobs spans to fix`);
    
    jobsSpans.forEach((span, index) => {
      console.log(`Fixing Jobs span #${index + 1}`);
      
      // Instead of trying to make the existing element work, let's create a new button
      // that overlays on top of it with absolute positioning
      
      // First, get the position of the span
      const rect = span.getBoundingClientRect();
      const parentElement = span.parentElement;
      
      // Create a new button element that will actually work
      const jobsButton = document.createElement('button');
      jobsButton.innerText = ''; // No text, just a clickable area
      jobsButton.style.position = 'absolute';
      jobsButton.style.top = '0';
      jobsButton.style.left = '0';
      jobsButton.style.width = '100%';
      jobsButton.style.height = '100%';
      jobsButton.style.backgroundColor = 'transparent';
      jobsButton.style.border = 'none';
      jobsButton.style.zIndex = '10000';
      jobsButton.style.cursor = 'pointer';
      
      // Add a strong click handler
      jobsButton.addEventListener('click', function(e) {
        console.log("Jobs button clicked!");
        e.stopPropagation();
        e.preventDefault();
        
        // Force navigation to Jobs page
        window.location.href = '/jobs';
      });
      
      // Add button to parent element
      if (parentElement) {
        parentElement.style.position = 'relative'; // Ensure parent can handle absolute positioning
        parentElement.appendChild(jobsButton);
        console.log("Added clickable button overlay to Jobs element");
      } else {
        console.log("Could not find parent element for Jobs span");
      }
      
      // Also try to make the original span work by enhancing its click capability
      span.style.opacity = '1';
      span.style.pointerEvents = 'auto';
      span.style.cursor = 'pointer';
      span.style.zIndex = '9999';
      
      // Add an onclick attribute directly (belt and suspenders approach)
      span.setAttribute('onclick', "event.stopPropagation(); window.location.href='/jobs'; return false;");
      
      // Also add a click event listener
      span.addEventListener('click', function(e) {
        console.log("Original Jobs span clicked!");
        e.stopPropagation();
        e.preventDefault();
        window.location.href = '/jobs';
      }, true);
    });
  }
  
  // Run our fix immediately if document is already loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(fixJobsElement, 500); // slight delay to ensure DOM is ready
  } else {
    // Otherwise wait for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(fixJobsElement, 500);
    });
  }
  
  // Also set up recurring checks to catch dynamically added elements
  setInterval(fixJobsElement, 2000);
  
  // Add a visible Jobs button to the page as a last resort
  function addVisibleJobsButton() {
    const button = document.createElement('button');
    button.innerText = 'Go to Jobs';
    button.style.position = 'fixed';
    button.style.bottom = '80px';
    button.style.right = '20px';
    button.style.zIndex = '10001';
    button.style.backgroundColor = 'rgba(6, 182, 212, 0.9)';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '20px';
    button.style.padding = '8px 15px';
    button.style.fontWeight = 'bold';
    button.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
    button.style.cursor = 'pointer';
    
    button.addEventListener('click', function() {
      window.location.href = '/jobs';
    });
    
    document.body.appendChild(button);
    console.log("Added visible Jobs button as fallback");
  }
  
  // Add the visible button after a delay
  setTimeout(addVisibleJobsButton, 2000);
})();
