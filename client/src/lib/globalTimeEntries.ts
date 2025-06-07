/**
 * Global time entries storage that can be accessed directly by any component
 * This bypasses events, localStorage, and other indirect mechanisms
 */

// Define type for time entries
export interface GlobalTimeEntry {
  id: number | string;
  userId: number;
  projectId: number;
  startTime: Date;
  endTime: Date;
  duration: number;
  notes: string;
  hourlyRate: string;
}

// Create a global object to store time entries
declare global {
  interface Window {
    __GLOBAL_TIME_ENTRIES__: GlobalTimeEntry[];
    __ADD_TIME_ENTRY__: (entry: GlobalTimeEntry) => void;
    __GET_TIME_ENTRIES__: () => GlobalTimeEntry[];
    __LATEST_TIME_ENTRY__: GlobalTimeEntry | null;
  }
}

// Initialize the global storage if it doesn't exist
export function initializeGlobalTimeEntries(): void {
  if (!window.__GLOBAL_TIME_ENTRIES__) {
    window.__GLOBAL_TIME_ENTRIES__ = [];
    
    // Add method to add a time entry
    window.__ADD_TIME_ENTRY__ = (entry: GlobalTimeEntry) => {
      console.log('GLOBAL: Adding time entry directly to global storage', entry);
      window.__GLOBAL_TIME_ENTRIES__.push(entry);
      // Also force a direct DOM event to alert any listeners
      document.dispatchEvent(new CustomEvent('GLOBAL_TIME_ENTRY_ADDED', { detail: entry }));
    };
    
    // Add method to get all time entries
    window.__GET_TIME_ENTRIES__ = (): GlobalTimeEntry[] => {
      console.log('GLOBAL: Retrieving all time entries from global storage');
      return [...window.__GLOBAL_TIME_ENTRIES__];
    };
    
    console.log('GLOBAL: Global time entries storage initialized');
  }
}

// Add a time entry to the global storage
export function addGlobalTimeEntry(entry: GlobalTimeEntry): void {
  initializeGlobalTimeEntries();
  window.__ADD_TIME_ENTRY__(entry);
}

// Get all time entries from the global storage
export function getGlobalTimeEntries(): GlobalTimeEntry[] {
  initializeGlobalTimeEntries();
  return window.__GET_TIME_ENTRIES__();
}
