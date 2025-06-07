/**
 * Help Icon Generator - Reliable click handling through direct DOM insertion
 * 
 * This script provides a reliable way to add clickable help icons to any page
 * by directly manipulating the DOM. It avoids issues with frameworks and
 * event handling by using simple vanilla JavaScript techniques.
 */

// Function to create and insert a help icon
function createHelpIcon(targetSelector, onClick, options = {}) {
  // Default options
  const config = {
    size: options.size || 24,
    color: options.color || '#4FEBFF',
    position: options.position || 'afterend',
    title: options.title || 'Help'
  };
  
  // Find all target elements
  const targetElements = document.querySelectorAll(targetSelector);
  
  // Create icons for each target
  targetElements.forEach(targetElement => {
    // Create container element
    const container = document.createElement('span');
    container.className = 'help-icon-container';
    container.style.display = 'inline-block';
    container.style.position = 'relative';
    container.style.width = `${config.size}px`;
    container.style.height = `${config.size}px`;
    container.style.cursor = 'pointer';
    container.title = config.title;
    
    // Generate SVG content
    container.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${config.size}" height="${config.size}" viewBox="0 0 24 24" fill="none" stroke="${config.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <path d="M12 17h.01"></path>
      </svg>
    `;
    
    // Add click event listener
    container.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof onClick === 'function') {
        onClick(e);
      }
    });
    
    // Insert the icon relative to target element
    targetElement.insertAdjacentElement(config.position, container);
    
    // Add visual feedback on hover
    container.addEventListener('mouseenter', function() {
      const svgElement = container.querySelector('svg');
      if (svgElement) {
        svgElement.style.transform = 'scale(1.1)';
        svgElement.style.transition = 'transform 0.2s ease';
      }
    });
    
    container.addEventListener('mouseleave', function() {
      const svgElement = container.querySelector('svg');
      if (svgElement) {
        svgElement.style.transform = 'scale(1)';
      }
    });
    
    // Log success
    console.log(`Help icon created for ${targetSelector}`);
  });
  
  // Return count of icons created
  return targetElements.length;
}

// Usage examples:
// createHelpIcon('#username-field', () => alert('Enter your username here'));
// createHelpIcon('.help-target', showHelpModal, { color: '#F471B5', size: 20 });
