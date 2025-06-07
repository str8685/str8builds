// Jobs Navigation Patch - Final Solution
(function() {
  console.log("Jobs Navigation Patch - Loading");
  
  // Replace the problematic span with a guaranteed working version
  function patchJobsSpan() {
    // Target the exact element by its properties
    const targetSpans = Array.from(document.querySelectorAll('span')).filter(span => {
      return span.dataset.componentName === "Jobs" && 
             span.classList.contains("absolute") &&
             span.classList.contains("inset-0");
    });
    
    if (!targetSpans.length) {
      console.log("Jobs span not found yet, will retry");
      return;
    }
    
    console.log(`Found ${targetSpans.length} Jobs spans to patch`);
    
    targetSpans.forEach(span => {
      // Get the parent element to work with
      const parent = span.parentElement;
      if (!parent) return;
      
      // Create a completely new element to replace the problematic one
      const newElement = document.createElement('a');
      newElement.href = '/jobs';
      newElement.setAttribute('data-component-name', 'Jobs');
      newElement.className = span.className;
      newElement.style.cssText = `
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.1);
        opacity: 1 !important;
        cursor: pointer;
        z-index: 9999;
        display: block;
      `;
      
      // Set up strong click handlers
      newElement.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Jobs element clicked!");
        window.location.href = '/jobs';
        return false;
      };
      
      // Replace the original span with our new element
      parent.replaceChild(newElement, span);
      console.log("Replaced Jobs span with functioning element");
      
      // Also make the parent element clickable as a fallback
      parent.style.cursor = 'pointer';
      parent.style.position = 'relative';
      parent.addEventListener('click', function() {
        window.location.href = '/jobs';
      });
    });
  }
  
  // Run the patch after a delay and periodically check
  setTimeout(patchJobsSpan, 500);
  setInterval(patchJobsSpan, 1500);
  
  // Backup solution - keyboard shortcut
  document.addEventListener('keydown', function(e) {
    // Alt+J keyboard shortcut for Jobs
    if (e.altKey && e.key === 'j') {
      console.log("Jobs keyboard shortcut triggered");
      window.location.href = '/jobs';
    }
  });
  
  // Inject minimal floating button (styled to match the space/cyan theme)
  function addFloatingButton() {
    if (document.getElementById('jobs-floating-button')) return;
    
    const button = document.createElement('a');
    button.id = 'jobs-floating-button';
    button.href = '/jobs';
    button.innerHTML = '<i class="fas fa-briefcase"></i>';
    
    button.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 15px;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0891b2, #0e7490);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
      border: 1px solid rgba(6, 182, 212, 0.3);
      z-index: 10000;
      cursor: pointer;
      font-size: 16px;
      text-decoration: none;
    `;
    
    button.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '/jobs';
    });
    
    document.body.appendChild(button);
    console.log("Added floating Jobs button");
  }
  
  // Add floating button after delay
  setTimeout(addFloatingButton, 1000);
})();
