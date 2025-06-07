/**
 * This is a test script to help diagnose and fix issues with timesheet entries
 */

import { getTimeEntries, saveTimeEntry, clearTimeEntries } from './timerStorage';

/**
 * Create a test entry and save it to local storage
 */
export function createTestEntry(): void {
  const testEntry = {
    id: Date.now(),
    userId: 1,
    projectId: 1,
    startTime: new Date(),
    endTime: new Date(),
    duration: 3600, // 1 hour
    notes: 'Test entry created for debugging',
    hourlyRate: '65.00'
  };
  
  saveTimeEntry(testEntry);
  console.log('Test entry created:', testEntry);
}

/**
 * View all time entries currently in local storage
 */
export function viewAllEntries(): any[] {
  const entries = getTimeEntries();
  console.log('Current time entries:', entries);
  return entries;
}

/**
 * Clear all time entries from local storage
 */
export function clearAllEntries(): void {
  clearTimeEntries();
  console.log('All time entries have been cleared');
}

// Run this to create a test entry right away
createTestEntry();

console.log('Test script has been executed. Check the browser console for results.');
