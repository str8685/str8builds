// ultimate-jobs-fix.js - The most aggressive solution to make Jobs navigation work
// This script replaces all Jobs-related elements with plain HTML and adds multiple methods to ensure navigation

document.addEventListener('DOMContentLoaded', function() {
  console.log('Ultimate Jobs Fix: Initializing...');
  
  // 1. Create a permanent Jobs button that floats on the screen
  const floatingJobsButton = document.createElement('a');
  floatingJobsButton.href = '/jobs';
  floatingJobsButton.id = 'ultimate-jobs-button';
  floatingJobsButton.innerHTML = '<i class="fas fa-briefcase"></i>';
  floatingJobsButton.setAttribute('title', 'Go to Jobs');
  floatingJobsButton.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    background: linear-gradient(135deg, #0891b2 0%, #155e75 100%);
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(8, 145, 178, 0.5);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 20px;
    transition: all 0.3s ease;
    border: 2px solid rgba(8, 145, 178, 0.3);
  `;
  
  // Add hover effects
  floatingJobsButton.addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 0 20px rgba(8, 145, 178, 0.8)';
  });
  
  floatingJobsButton.addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 0 15px rgba(8, 145, 178, 0.5)';
  });
  
  document.body.appendChild(floatingJobsButton);
  
  // 2. Force override of all links containing "Jobs" text
  function enhanceJobsLinks() {
    // Find all link-like elements
    const potentialJobsElements = [
      ...document.querySelectorAll('a'),
      ...document.querySelectorAll('button'),
      ...document.querySelectorAll('div'),
      ...document.querySelectorAll('span'),
      ...document.querySelectorAll('[class*="jobs"]'),
      ...document.querySelectorAll('[id*="jobs"]'),
      ...document.querySelectorAll('[class*="nav"]'),
    ];
    
    potentialJobsElements.forEach(el => {
      // Skip if already processed
      if (el.getAttribute('data-ultimate-jobs-fix')) return;
      
      // Check if element might be related to Jobs navigation
      const hasJobsText = el.textContent && el.textContent.toLowerCase().includes('job');
      const hasJobsClass = el.className && el.className.toLowerCase().includes('job');
      const hasJobsId = el.id && el.id.toLowerCase().includes('job');
      const isInNavigation = el.closest('nav') !== null;
      
      if (hasJobsText || hasJobsClass || hasJobsId) {
        // Mark as processed
        el.setAttribute('data-ultimate-jobs-fix', 'true');
        
        // Style to ensure it's visible and clickable
        el.style.cssText += `
          pointer-events: auto !important;
          cursor: pointer !important;
          z-index: 999 !important;
          position: relative !important;
          opacity: 1 !important;
          visibility: visible !important;
        `;
        
        // Add direct click handler
        el.addEventListener('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          console.log('Jobs element clicked via ultimate-jobs-fix');
          window.location.href = '/jobs';
          return false;
        }, true);
        
        // If it's in the bottom navigation, make it extra interactive
        if (isInNavigation) {
          // Apply cyan glow effect when hovering
          el.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 10px rgba(8, 145, 178, 0.8)';
          });
          
          el.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
          });
        }
      }
    });
    
    // 3. Specifically handle the Jobs item in BottomNav
    const jobsNavItems = Array.from(document.querySelectorAll('.jobs-nav-item, [class*="nav"] [class*="item"]'))
      .filter(el => el.textContent && el.textContent.includes('Job'));
    
    jobsNavItems.forEach(navItem => {
      // Replace with a completely new element
      const newJobsItem = document.createElement('a');
      newJobsItem.href = '/jobs';
      newJobsItem.className = navItem.className + ' ultimate-jobs-nav-fix';
      newJobsItem.innerHTML = navItem.innerHTML;
      newJobsItem.style.cssText = navItem.style.cssText + `
        pointer-events: auto !important;
        cursor: pointer !important;
        z-index: 9999 !important;
        opacity: 1 !important;
      `;
      
      // Add the click handler
      newJobsItem.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = '/jobs';
        return false;
      };
      
      // Replace the original element
      if (navItem.parentNode) {
        navItem.parentNode.replaceChild(newJobsItem, navItem);
      }
    });
  }
  
  // 4. Add keyboard shortcuts for Jobs navigation
  document.addEventListener('keydown', function(e) {
    // Alt+J or Ctrl+J to navigate to Jobs
    if ((e.altKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
      console.log('Jobs keyboard shortcut used');
      window.location.href = '/jobs';
    }
  });
  
  // Run enhancement functions immediately and periodically
  enhanceJobsLinks();
  setInterval(enhanceJobsLinks, 1000); // Check every second for new elements
  
  // 5. Add a notice about keyboard shortcuts
  setTimeout(function() {
    const shortcutNotice = document.createElement('div');
    shortcutNotice.innerHTML = 'Press Alt+J or Ctrl+J for Jobs';
    shortcutNotice.style.cssText = `
      position: fixed;
      bottom: 65px;
      right: 80px;
      background: rgba(15, 23, 42, 0.8);
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(shortcutNotice);
    
    // Show briefly then fade out
    setTimeout(() => { shortcutNotice.style.opacity = '1'; }, 1000);
    setTimeout(() => { shortcutNotice.style.opacity = '0'; }, 5000);
  }, 2000);
  
  console.log('Ultimate Jobs Fix: Initialized. Use the floating button, keyboard shortcuts, or click any Jobs-related element.');
});
