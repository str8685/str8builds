// jobs-direct-link.js
// This script creates a highly targeted, direct link specifically placed over the Jobs span
// It uses DOM positioning to align perfectly with the Jobs element

document.addEventListener('DOMContentLoaded', function() {
  console.log('Jobs Direct Link: Initializing...');
  
  function createJobsDirectLink() {
    // Find the Jobs span by its data attribute
    const jobsSpan = document.querySelector('[data-component-name="Jobs"]');
    
    if (jobsSpan) {
      console.log('Jobs span found, creating direct link overlay');
      
      // Get the exact position and dimensions of the Jobs span
      const rect = jobsSpan.getBoundingClientRect();
      
      // Create a direct link element that will be positioned exactly over the Jobs span
      const directLink = document.createElement('a');
      directLink.href = '/jobs';
      directLink.id = 'jobs-direct-link';
      directLink.textContent = ''; // Empty text to be invisible
      
      // Apply professional cyan theme styling consistent with the app design
      directLink.style.cssText = `
        position: fixed;
        top: ${rect.top}px;
        left: ${rect.left}px;
        width: ${rect.width}px;
        height: ${rect.height}px;
        background-color: rgba(6, 182, 212, 0.2);
        border-radius: ${getComputedStyle(jobsSpan).borderRadius};
        z-index: 99999;
        cursor: pointer;
        pointer-events: auto;
        display: block;
        text-decoration: none;
      `;
      
      // Add hover effects that match the professional space/cyan theme
      directLink.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(6, 182, 212, 0.4)';
        this.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.5)';
      });
      
      directLink.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'rgba(6, 182, 212, 0.2)';
        this.style.boxShadow = 'none';
      });
      
      // Ensure the link navigates directly without any event bubbling
      directLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Jobs direct link clicked - navigating...');
        
        // Try multiple navigation methods to ensure it works
        try {
          window.location.href = '/jobs';
          
          // Fallbacks if the first method doesn't work
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
      
      // Add to the document
      document.body.appendChild(directLink);
      console.log('Jobs direct link added successfully');
      
      // Reposition on resize to ensure it stays aligned
      window.addEventListener('resize', function() {
        const updatedRect = jobsSpan.getBoundingClientRect();
        directLink.style.top = `${updatedRect.top}px`;
        directLink.style.left = `${updatedRect.left}px`;
        directLink.style.width = `${updatedRect.width}px`;
        directLink.style.height = `${updatedRect.height}px`;
      });
      
      // Also reposition on scroll
      window.addEventListener('scroll', function() {
        const updatedRect = jobsSpan.getBoundingClientRect();
        directLink.style.top = `${updatedRect.top}px`;
        directLink.style.left = `${updatedRect.left}px`;
      });
    } else {
      console.log('Jobs span not found, will retry...');
    }
  }
  
  // Try immediately and then periodically until successful
  createJobsDirectLink();
  
  // Try again after a delay to ensure the React app has fully rendered
  const checkInterval = setInterval(function() {
    if (document.querySelector('[data-component-name="Jobs"]')) {
      createJobsDirectLink();
      clearInterval(checkInterval);
    }
  }, 1000);
});
