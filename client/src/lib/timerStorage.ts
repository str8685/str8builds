/**
 * Utility functions for managing time entries in local storage
 */

import { TimeEntry } from '@shared/schema';

// Keys for storing entries in localStorage
const STORAGE_KEY = 'timeEntries';
const TIMER_ENTRIES_KEY = 'timeEntries';
const DIRECT_ACCESS_KEY = 'directTimeEntries';

/**
 * Save a time entry to local storage with enhanced reliability
 */
export function saveTimeEntry(timeEntry: any): void {
  try {
    console.log('TimerStorage: Starting to save time entry', timeEntry);
    
    // Ensure the entry has all required fields for the TimesheetPage
    const entry = {
      id: timeEntry.id || Date.now(),
      userId: timeEntry.userId || 1,
      projectId: Number(timeEntry.projectId) || 1,
      startTime: timeEntry.startTime instanceof Date ? 
        timeEntry.startTime : new Date(timeEntry.startTime || Date.now()),
      endTime: timeEntry.endTime instanceof Date ?
        timeEntry.endTime : new Date(timeEntry.endTime || Date.now()),
      duration: Number(timeEntry.duration) || 0,
      notes: timeEntry.notes || 'Time entry',
      hourlyRate: String(timeEntry.hourlyRate || '65.00'),
    };

    // STORAGE METHOD 1: Standard entry storage
    // Get existing entries
    const entries = getTimeEntries();
    entries.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    
    // STORAGE METHOD 2: Direct access storage (redundant backup)
    const directEntries = JSON.parse(localStorage.getItem(DIRECT_ACCESS_KEY) || '[]');
    directEntries.push(entry);
    localStorage.setItem(DIRECT_ACCESS_KEY, JSON.stringify(directEntries));
    
    // STORAGE METHOD 3: Individual entry storage for guaranteed access
    const entryKey = `timeEntry_${entry.id}`;
    localStorage.setItem(entryKey, JSON.stringify(entry));
    
    // Store a list of all entry IDs for easy retrieval
    const entryIds = JSON.parse(localStorage.getItem('timeEntryIds') || '[]');
    if (!entryIds.includes(entry.id)) {
      entryIds.push(entry.id);
      localStorage.setItem('timeEntryIds', JSON.stringify(entryIds));
    }
    
    console.log('TimerStorage: Successfully saved time entry to all storage locations', entry);
    
    // Dispatch multiple events to ensure capture
    try {
      // Standard event
      window.dispatchEvent(new CustomEvent('timeEntryAdded', { detail: entry }));
      
      // Legacy event
      window.dispatchEvent(new CustomEvent('newTimeEntry', { detail: entry }));
      
      // Direct event with full entry data in the event name to bypass any event handling issues
      window.dispatchEvent(new CustomEvent('DIRECT_TIME_ENTRY_SAVED'));
      
      console.log('TimerStorage: All events dispatched successfully');
    } catch (error) {
      console.warn('TimerStorage: Could not dispatch all events, but entries were saved', error);
    }
  } catch (error) {
    console.error('TimerStorage: Failed to save time entry', error);
    throw error;
  }
}

/**
 * Get all time entries from all storage locations with maximum reliability
 */
export function getTimeEntries(): any[] {
  try {
    console.log('TimerStorage: Retrieving time entries from all storage locations');
    const allEntries: any[] = [];
    const seenIds = new Set<number | string>();
    
    // METHOD 1: Retrieve from primary storage
    try {
      const primaryData = localStorage.getItem(STORAGE_KEY);
      if (primaryData) {
        const primaryEntries = JSON.parse(primaryData);
        if (Array.isArray(primaryEntries)) {
          console.log(`TimerStorage: Found ${primaryEntries.length} entries in primary storage`);
          primaryEntries.forEach(entry => {
            if (!seenIds.has(entry.id)) {
              allEntries.push(normalizeTimeEntry(entry));
              seenIds.add(entry.id);
            }
          });
        }
      }
    } catch (e) {
      console.warn('TimerStorage: Error reading from primary storage', e);
    }
    
    // METHOD 2: Retrieve from direct access storage
    try {
      const directData = localStorage.getItem(DIRECT_ACCESS_KEY);
      if (directData) {
        const directEntries = JSON.parse(directData);
        if (Array.isArray(directEntries)) {
          console.log(`TimerStorage: Found ${directEntries.length} entries in direct storage`);
          directEntries.forEach(entry => {
            if (!seenIds.has(entry.id)) {
              allEntries.push(normalizeTimeEntry(entry));
              seenIds.add(entry.id);
            }
          });
        }
      }
    } catch (e) {
      console.warn('TimerStorage: Error reading from direct storage', e);
    }
    
    // METHOD 3: Retrieve from individual entry storage
    try {
      const entryIds = JSON.parse(localStorage.getItem('timeEntryIds') || '[]');
      let individualCount = 0;
      
      entryIds.forEach((id: string | number) => {
        if (!seenIds.has(id)) {
          const entryKey = `timeEntry_${id}`;
          const entryData = localStorage.getItem(entryKey);
          
          if (entryData) {
            try {
              const entry = JSON.parse(entryData);
              allEntries.push(normalizeTimeEntry(entry));
              seenIds.add(id);
              individualCount++;
            } catch (e) {
              console.warn(`TimerStorage: Error parsing individual entry ${id}`, e);
            }
          }
        }
      });
      
      console.log(`TimerStorage: Found ${individualCount} additional entries in individual storage`);
    } catch (e) {
      console.warn('TimerStorage: Error reading from individual storage', e);
    }
    
    // METHOD 4: Last resort - scan all localStorage keys for potential time entries
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('time') || key.includes('Time') || key.includes('entry') || key.includes('Entry'))) {
          try {
            const data = localStorage.getItem(key);
            if (data) {
              const parsed = JSON.parse(data);
              // Check if it looks like a time entry
              if (parsed && typeof parsed === 'object' && (parsed.duration || parsed.startTime)) {
                const entryId = parsed.id || (`recovered_${Date.now()}_${i}`);
                if (!seenIds.has(entryId)) {
                  const normalizedEntry = normalizeTimeEntry(parsed);
                  normalizedEntry.id = entryId; // Ensure it has an ID
                  allEntries.push(normalizedEntry);
                  seenIds.add(entryId);
                }
              }
            }
          } catch (e) {
            // Silently continue if we can't parse this item
          }
        }
      }
    } catch (e) {
      console.warn('TimerStorage: Error during last resort storage scan', e);
    }
    
    console.log(`TimerStorage: Retrieved ${allEntries.length} total time entries from all sources`);
    return allEntries;
  } catch (error) {
    console.error('TimerStorage: Failed to get time entries', error);
    return [];
  }
}

/**
 * Normalize a time entry to ensure it has the correct format
 */
function normalizeTimeEntry(entry: any): any {
  // Process date fields
  let startTime = new Date();
  let endTime = new Date();
  
  try {
    if (entry.startTime) {
      startTime = entry.startTime instanceof Date ? 
        entry.startTime : new Date(entry.startTime);
    }
    
    if (entry.endTime) {
      endTime = entry.endTime instanceof Date ?
        entry.endTime : new Date(entry.endTime);
    }
  } catch (e) {
    console.warn('Error parsing dates in time entry', e);
  }
  
  // Return normalized entry
  return {
    id: entry.id || Date.now(),
    userId: entry.userId || 1,
    projectId: Number(entry.projectId) || 1,
    startTime: startTime,
    endTime: endTime,
    duration: Number(entry.duration) || 0,
    notes: entry.notes || 'Time entry',
    hourlyRate: String(entry.hourlyRate || '65.00'),
  };
}

/**
 * Clear all time entries from local storage
 */
export function clearTimeEntries(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Debug function to log current time entries
 */
export function debugTimeEntries(): any[] {
  const entries = getTimeEntries();
  console.log('Current time entries in local storage:', entries);
  return entries;
}
