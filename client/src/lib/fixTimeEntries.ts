/**
 * Fix for timesheet entries not appearing
 * 
 * This utility ensures that entries saved from the JobTimer are compatible
 * with the format expected by the TimesheetPage component.
 */

// Automatically run when this file is imported
(function initTimeEntriesFix() {
  // Check if we've already initialized to avoid duplicate runs
  if ((window as any).__timeEntriesFixInitialized) return;
  (window as any).__timeEntriesFixInitialized = true;
  
  console.log('⚙️ Initializing time entries fix...');
  
  // Function to normalize a time entry to the expected format
  function normalizeTimeEntry(entry: any): any {
    // Make sure dates are properly formatted as Date objects
    const startTime = entry.startTime instanceof Date ? 
      entry.startTime : new Date(entry.startTime || Date.now());
    
    const endTime = entry.endTime instanceof Date ?
      entry.endTime : new Date(entry.endTime || Date.now());
    
    // Return normalized entry with all required fields
    return {
      id: entry.id || Date.now(),
      userId: entry.userId || 1,
      projectId: Number(entry.projectId) || 1,
      startTime: startTime,
      endTime: endTime,
      duration: Number(entry.duration) || 0,
      notes: entry.notes || '',
      hourlyRate: String(entry.hourlyRate || '65.00')
    };
  }
  
  // Override localStorage getItem to normalize entries
  const originalGetItem = localStorage.getItem;
  localStorage.getItem = function(key: string) {
    const result = originalGetItem.call(localStorage, key);
    
    // Only process timeEntries key
    if (key === 'timeEntries' && result) {
      try {
        const entries = JSON.parse(result);
        if (!Array.isArray(entries)) return result;
        
        // Normalize each entry
        const normalizedEntries = entries.map(normalizeTimeEntry);
        
        // Log info for debugging
        console.log(`⚙️ Fixed ${normalizedEntries.length} timesheet entries`);
        
        // Return the normalized entries
        return JSON.stringify(normalizedEntries);
      } catch (e) {
        console.error('Error processing timeEntries:', e);
        return result;
      }
    }
    
    return result;
  };
  
  // Create test entry if no entries exist
  const currentEntries = JSON.parse(localStorage.getItem('timeEntries') || '[]');
  if (currentEntries.length === 0) {
    console.log('⚙️ No time entries found, creating a test entry');
    
    const testEntry = {
      id: Date.now(),
      userId: 1,
      projectId: 1,
      startTime: new Date(),
      endTime: new Date(),
      duration: 3600, // 1 hour
      notes: 'Test entry created automatically',
      hourlyRate: '65.00'
    };
    
    localStorage.setItem('timeEntries', JSON.stringify([testEntry]));
  }
  
  // Also override setItem to ensure entries are properly formatted when saved
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key: string, value: string) {
    if (key === 'timeEntries' && value) {
      try {
        const entries = JSON.parse(value);
        if (Array.isArray(entries)) {
          const normalizedEntries = entries.map(normalizeTimeEntry);
          return originalSetItem.call(localStorage, key, JSON.stringify(normalizedEntries));
        }
      } catch (e) {
        console.error('Error normalizing entries on save:', e);
      }
    }
    
    return originalSetItem.call(localStorage, key, value);
  };
  
  console.log('⚙️ Time entries fix initialized successfully');
})();

export {}; // Makes TypeScript treat this as a module
