// Absolute Jobs Navigation Fix
// This script creates a direct navigation button that bypasses React entirely

document.addEventListener('DOMContentLoaded', function() {
  console.log('Absolute Jobs Fix - Loading');
  
  // Create a standalone button element
  const jobsButton = document.createElement('a');
  jobsButton.id = 'standalone-jobs-button';
  jobsButton.href = '/jobs';
  jobsButton.innerHTML = '<i class="fas fa-briefcase" style="margin-right: 8px;"></i>Jobs';
  
  // Style it to match the professional space/cyan theme from the memories
  jobsButton.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(to right, #0891b2, #0e7490);
    color: white;
    padding: 8px 20px;
    border-radius: 30px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: bold;
    font-size: 14px;
    box-shadow: 0 0 15px rgba(8, 145, 178, 0.5);
    border: 1px solid rgba(8, 145, 178, 0.3);
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    backdrop-filter: blur(5px);
    transition: all 0.3s ease;
  `;
  
  // Add hover effect
  jobsButton.onmouseover = function() {
    this.style.boxShadow = '0 0 20px rgba(8, 145, 178, 0.7)';
    this.style.transform = 'translateX(-50%) scale(1.05)';
  };
  
  jobsButton.onmouseout = function() {
    this.style.boxShadow = '0 0 15px rgba(8, 145, 178, 0.5)';
    this.style.transform = 'translateX(-50%)';
  };
  
  // Direct click handler that bypasses React's event system
  jobsButton.onclick = function(e) {
    e.preventDefault();
    console.log('Standalone Jobs button clicked - navigating...');
    window.location.href = '/jobs';
    return false;
  };
  
  // Add the button to the body
  document.body.appendChild(jobsButton);
  console.log('Standalone Jobs button added to page');
});

// Also run the script after a delay to ensure it works even if the DOMContentLoaded event has already fired
setTimeout(function() {
  if (!document.getElementById('standalone-jobs-button')) {
    console.log('Delayed execution of Absolute Jobs Fix');
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  }
}, 1000);
