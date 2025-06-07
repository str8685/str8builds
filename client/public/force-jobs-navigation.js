// force-jobs-navigation.js
// This script creates multiple ways to ensure users can navigate to the Jobs page
// It operates outside of React to prevent any event handling issues

document.addEventListener('DOMContentLoaded', function() {
  console.log('Force Jobs Navigation: Initializing...');
  
  // Create a fixed position button that will always be visible
  const jobsButton = document.createElement('a');
  jobsButton.href = '/jobs';
  jobsButton.id = 'force-jobs-button';
  jobsButton.innerHTML = '<i class="fas fa-briefcase"></i> Jobs';
  jobsButton.style.cssText = `
    position: fixed;
    bottom: 120px;
    right: 20px;
    background: linear-gradient(135deg, #0891b2 0%, #155e75 100%);
    color: white;
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(8, 145, 178, 0.5);
    z-index: 9999;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(jobsButton);
  
  // Create event listeners for all elements with text containing "Jobs"
  function addJobsClickHandlers() {
    // Get all elements that might be related to Jobs
    const jobsElements = Array.from(document.querySelectorAll('*')).filter(el => {
      // Check if element or its children contain the text "Jobs"
      return el.textContent && el.textContent.includes('Jobs');
    });
    
    // Add click handlers to all potential jobs elements
    jobsElements.forEach(el => {
      if (!el.getAttribute('data-jobs-handler-applied')) {
        el.addEventListener('click', function(e) {
          console.log('Jobs element clicked, navigating to /jobs');
          window.location.href = '/jobs';
          e.preventDefault();
          e.stopPropagation();
        });
        el.setAttribute('data-jobs-handler-applied', 'true');
        el.style.cursor = 'pointer';
      }
    });
    
    // Specifically target the bottom navigation jobs item
    const bottomNavJobsItems = Array.from(document.querySelectorAll('.bottom-nav a, .bottom-nav span')).filter(el => {
      return el.textContent && el.textContent.includes('Jobs');
    });
    
    bottomNavJobsItems.forEach(el => {
      el.style.cssText += `
        pointer-events: auto !important;
        cursor: pointer !important;
        z-index: 9999 !important;
      `;
      
      // Replace with a direct anchor if it's not already one
      if (el.tagName !== 'A') {
        const parent = el.parentElement;
        const newLink = document.createElement('a');
        newLink.href = '/jobs';
        newLink.innerHTML = el.innerHTML;
        newLink.className = el.className;
        newLink.style.cssText = el.style.cssText;
        if (parent) {
          parent.replaceChild(newLink, el);
        }
      } else {
        // If it's already an anchor, ensure it has the right href
        el.href = '/jobs';
      }
    });
  }
  
  // Run once at load and then every 2 seconds to catch dynamically loaded elements
  addJobsClickHandlers();
  setInterval(addJobsClickHandlers, 2000);
  
  // Also create a global keyboard shortcut: Alt+J to go to Jobs
  document.addEventListener('keydown', function(e) {
    if (e.altKey && e.key === 'j') {
      console.log('Jobs keyboard shortcut used');
      window.location.href = '/jobs';
    }
  });
  
  console.log('Force Jobs Navigation: Initialized. Use Alt+J keyboard shortcut or click any Jobs related element to navigate.');
});
