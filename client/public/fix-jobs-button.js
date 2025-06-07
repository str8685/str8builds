// fix-jobs-button.js - Direct fix for any button with data-component-name="Jobs"
// This script guarantees that any button with data-component-name="Jobs" navigates to /jobs

document.addEventListener('DOMContentLoaded', function() {
  console.log('Jobs Button Fix: Initializing...');
  
  function fixJobsButtons() {
    // Find all elements with data-component-name="Jobs"
    const jobsElements = document.querySelectorAll('[data-component-name="Jobs"]');
    
    jobsElements.forEach(element => {
      if (!element.getAttribute('data-fix-applied')) {
        console.log('Found Jobs element, applying direct fix:', element);
        
        // Add styles to ensure the element is clickable
        element.style.opacity = '1';
        element.style.pointerEvents = 'auto';
        element.style.cursor = 'pointer';
        element.style.zIndex = '9999';
        
        // Remove any existing event listeners
        const newElement = element.cloneNode(true);
        if (element.parentNode) {
          element.parentNode.replaceChild(newElement, element);
        }
        
        // Add a direct click handler
        newElement.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          console.log('Jobs button clicked - navigating directly to /jobs');
          
          // Try multiple navigation methods to ensure it works
          try {
            window.location.href = '/jobs';
            
            // Fallbacks
            setTimeout(function() {
              window.location.assign('/jobs');
              
              setTimeout(function() {
                window.open('/jobs', '_self');
              }, 100);
            }, 100);
          } catch (err) {
            console.error('Navigation error:', err);
          }
          
          return false;
        });
        
        // Mark as fixed
        newElement.setAttribute('data-fix-applied', 'true');
        
        // Add visual feedback on hover
        newElement.addEventListener('mouseenter', function() {
          this.style.transform = 'scale(1.05)';
          if (this.classList.contains('shadow-glow-sm')) {
            this.classList.remove('shadow-glow-sm');
            this.classList.add('shadow-glow-md');
          }
        });
        
        newElement.addEventListener('mouseleave', function() {
          this.style.transform = 'scale(1)';
          if (this.classList.contains('shadow-glow-md') && !this.classList.contains('hover:shadow-glow-md')) {
            this.classList.remove('shadow-glow-md');
            this.classList.add('shadow-glow-sm');
          }
        });
      }
    });
  }
  
  // Run immediately and then periodically to catch any dynamically added elements
  fixJobsButtons();
  setInterval(fixJobsButtons, 1000);
  
  // Also create a global keyboard shortcut: Alt+J to go to Jobs
  document.addEventListener('keydown', function(e) {
    if ((e.altKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
      console.log('Jobs keyboard shortcut used');
      window.location.href = '/jobs';
    }
  });
  
  console.log('Jobs Button Fix: Initialized. Use Alt+J keyboard shortcut or click any Jobs button to navigate.');
});
