// Run this in the browser console to check your current time entries
function debugTimeEntries() {
  const entries = JSON.parse(localStorage.getItem('timeEntries') || '[]');
  console.log('Current time entries:', entries);
  console.log(`Found ${entries.length} entries`);
  return entries;
}

// Add a test entry directly to localStorage
function addTestEntry() {
  const testEntry = {
    id: Date.now(),
    userId: 1,
    projectId: 1,
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    duration: 3600, // 1 hour
    notes: 'Test entry created via console',
    hourlyRate: '65.00'
  };
  
  const entries = JSON.parse(localStorage.getItem('timeEntries') || '[]');
  entries.push(testEntry);
  localStorage.setItem('timeEntries', JSON.stringify(entries));
  console.log('Test entry added:', testEntry);
  console.log('Now refresh the page to see if it appears');
  return testEntry;
}

// Clear all entries
function clearEntries() {
  localStorage.removeItem('timeEntries');
  console.log('All entries cleared');
}

console.log('Debug functions loaded! Run these in the console:');
console.log('- debugTimeEntries() - View current entries');
console.log('- addTestEntry() - Add a test entry');
console.log('- clearEntries() - Clear all entries');

// Execute debug function immediately
debugTimeEntries();
