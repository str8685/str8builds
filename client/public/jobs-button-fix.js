// Jobs Button Direct Fix - Final Solution
// This script creates a completely new clickable button instead of trying to fix the existing one

(function() {
  console.log("Jobs Button Direct Fix - Loading");
  
  // Create a direct, visible Jobs button that will definitely work
  function createJobsButton() {
    console.log("Creating direct Jobs button");
    
    // Create a button element that's always visible and clickable
    const button = document.createElement('a');
    button.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center;">
        <i class="fas fa-briefcase" style="margin-right: 5px;"></i>
        Jobs
      </div>
    `;
    
    // Style the button to be prominent but professional
    button.style.position = 'fixed';
    button.style.bottom = '80px';
    button.style.left = '50%';
    button.style.transform = 'translateX(-50%)';
    button.style.backgroundColor = 'rgba(8, 145, 178, 0.9)'; // Cyan color matching the theme
    button.style.color = 'white';
    button.style.padding = '8px 16px';
    button.style.borderRadius = '20px';
    button.style.textDecoration = 'none';
    button.style.fontFamily = 'Arial, sans-serif';
    button.style.fontSize = '14px';
    button.style.fontWeight = 'bold';
    button.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.5)';
    button.style.zIndex = '10001'; // Super high z-index to ensure it's on top
    button.style.border = '1px solid rgba(8, 145, 178, 0.4)';
    button.style.cursor = 'pointer';
    
    // Add a direct href and click handler
    button.href = '/jobs';
    button.addEventListener('click', function(e) {
      e.preventDefault();
      console.log("Direct Jobs button clicked!");
      window.location.href = '/jobs';
    });
    
    // Add the button to the body
    document.body.appendChild(button);
    console.log("Direct Jobs button added to page");
    
    // Add a close button option
    const closeButton = document.createElement('div');
    closeButton.innerHTML = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '-8px';
    closeButton.style.right = '-8px';
    closeButton.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    closeButton.style.color = 'white';
    closeButton.style.borderRadius = '50%';
    closeButton.style.width = '20px';
    closeButton.style.height = '20px';
    closeButton.style.display = 'flex';
    closeButton.style.alignItems = 'center';
    closeButton.style.justifyContent = 'center';
    closeButton.style.fontSize = '14px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = '10002';
    
    closeButton.addEventListener('click', function(e) {
      e.stopPropagation();
      button.style.display = 'none';
      localStorage.setItem('jobs-button-closed', 'true');
    });
    
    button.style.position = 'relative';
    button.appendChild(closeButton);
    
    // Don't show if previously closed
    if (localStorage.getItem('jobs-button-closed') === 'true') {
      button.style.display = 'none';
    }
  }
  
  // Run our solution after a slight delay to ensure the page is loaded
  setTimeout(createJobsButton, 1000);
})();
