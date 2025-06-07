/**
 * Direct time entry link between JobTimer and TimesheetPage
 * This bypasses all other mechanisms and provides a direct, synchronous connection
 */

// Define the time entry interface to match TimeEntry in the application
export interface DirectTimeEntry {
  id: number | string;
  userId: number;
  projectId: number | null;
  startTime: Date;
  endTime: Date | null;
  duration: number | null;
  notes: string | null;
  hourlyRate: string | null;
  createdAt: Date | null; // Required by TimesheetPage
}

// Create a singleton class to store and manage time entries
class DirectTimeEntryStore {
  private static instance: DirectTimeEntryStore;
  private entries: DirectTimeEntry[] = [];
  private subscribers: ((entries: DirectTimeEntry[]) => void)[] = [];

  private constructor() {
    // Private constructor to prevent direct instantiation
    console.log('DirectTimeEntryStore: Initialized');
  }

  public static getInstance(): DirectTimeEntryStore {
    if (!DirectTimeEntryStore.instance) {
      DirectTimeEntryStore.instance = new DirectTimeEntryStore();
    }
    return DirectTimeEntryStore.instance;
  }

  // Add a time entry to the store
  public addEntry(entry: DirectTimeEntry): void {
    console.log('DirectTimeEntryStore: Adding entry', entry);
    this.entries.push(entry);
    this.notifySubscribers();
    
    // Also add to window object for direct access
    if (!window.__DIRECT_TIME_ENTRIES__) {
      window.__DIRECT_TIME_ENTRIES__ = [];
    }
    window.__DIRECT_TIME_ENTRIES__.push(entry);
  }

  // Get all time entries
  public getEntries(): DirectTimeEntry[] {
    return [...this.entries];
  }

  // Subscribe to changes
  public subscribe(callback: (entries: DirectTimeEntry[]) => void): () => void {
    this.subscribers.push(callback);
    
    // Call immediately with current entries
    callback(this.getEntries());
    
    // Return unsubscribe function
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  // Notify all subscribers of changes
  private notifySubscribers(): void {
    this.subscribers.forEach(callback => {
      callback(this.getEntries());
    });
  }
}

// Extend window interface to hold direct time entries
declare global {
  interface Window {
    __DIRECT_TIME_ENTRIES__?: DirectTimeEntry[];
  }
}

// Export singleton instance
export const directTimeEntryStore = DirectTimeEntryStore.getInstance();

// Export convenience functions
export function addDirectTimeEntry(entry: DirectTimeEntry): void {
  directTimeEntryStore.addEntry(entry);
}

export function getDirectTimeEntries(): DirectTimeEntry[] {
  return directTimeEntryStore.getEntries();
}

export function subscribeToDirectTimeEntries(callback: (entries: DirectTimeEntry[]) => void): () => void {
  return directTimeEntryStore.subscribe(callback);
}
