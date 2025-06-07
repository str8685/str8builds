import { useState, useEffect, useCallback } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { toast } from '@/hooks/use-toast';
import { useQuery, useMutation } from '@tanstack/react-query';
import { saveTimeEntry as saveTimeEntryToStorage } from '@/lib/timerStorage';
import { addDirectTimeEntry } from '@/components/dashboard/DirectTimeEntryLink';

// Helper to load saved timer state from localStorage
const loadSavedTimerState = () => {
  try {
    const savedState = localStorage.getItem('jobTimerState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      
      // Verify the parsed state has the expected structure
      if (
        typeof parsedState.seconds === 'number' && 
        typeof parsedState.status === 'string' &&
        typeof parsedState.startTime === 'string' &&
        typeof parsedState.hourlyRate === 'number'
      ) {
        return {
          seconds: parsedState.seconds,
          status: parsedState.status as 'RUNNING' | 'PAUSED' | 'STOPPED',
          startTimeDate: new Date(parsedState.startTime),
          hourlyRate: parsedState.hourlyRate,
          timesheetSaved: parsedState.timesheetSaved || false
        };
      }
    }
  } catch (error) {
    console.error('Error loading saved timer state:', error);
  }
  
  // Return default values if no saved state or error occurred
  return {
    seconds: 0, // Start with 0 seconds (00:00:00)
    status: 'STOPPED' as const, // Start in stopped state instead of running
    startTimeDate: new Date(),
    hourlyRate: 65.00,
    timesheetSaved: false
  };
};

export function useJobTimer() {
  // Load initial state from localStorage or use defaults
  const savedState = loadSavedTimerState();
  
  const [seconds, setSeconds] = useState(savedState.seconds);
  const [status, setStatus] = useState<'RUNNING' | 'PAUSED' | 'STOPPED'>(savedState.status);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [startTimeDate, setStartTimeDate] = useState(savedState.startTimeDate);
  const [timesheetSaved, setTimesheetSaved] = useState(savedState.timesheetSaved);
  const [hourlyRate, setHourlyRate] = useState(savedState.hourlyRate);
  const [isEditingRate, setIsEditingRate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentJob = {
    id: '', // No default project ID
    name: 'No active job', 
    client: 'No client selected',
    clientId: null 
  };
  
  // Format time as HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate estimated total from seconds and hourly rate
  const calculateTotal = (totalSeconds: number, rate: number) => {
    const totalHours = totalSeconds / 3600;
    return (totalHours * rate).toFixed(2);
  };
  
  // Format current time as HH:MM AM/PM
  const formatStartTime = () => {
    return startTimeDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };
  
  // Reset the timer
  const resetTimer = () => {
    setSeconds(0);
    setStatus('PAUSED');
    setStartTimeDate(new Date());
    setTimesheetSaved(false);
  };
  
  // Initialize timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (status === 'RUNNING') {
        setSeconds((prevSeconds: number) => prevSeconds + 1);
      }
    }, 1000);
    
    setTimerInterval(interval);
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status]);
  
  // Persist timer state to localStorage whenever relevant state changes
  useEffect(() => {
    try {
      // Don't save if timer is stopped and timesheet is saved
      if (status === 'STOPPED' && timesheetSaved) {
        // Clear any existing state
        localStorage.removeItem('jobTimerState');
        return;
      }
      
      // Save current state to localStorage
      const stateToSave = {
        seconds,
        status,
        startTime: startTimeDate.toISOString(),
        hourlyRate,
        timesheetSaved
      };
      
      localStorage.setItem('jobTimerState', JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Error saving timer state to localStorage:', error);
    }
  }, [seconds, status, startTimeDate, hourlyRate, timesheetSaved]);
  
  // Toggle timer between running and paused
  const toggleTimer = () => {
    if (status === 'RUNNING') {
      setStatus('PAUSED');
    } else {
      setStatus('RUNNING');
    }
  };
  
  // Create a mutation for saving time entries
  const timeEntryMutation = useMutation({
    mutationFn: async (entryData: any) => {
      return await apiRequest('/api/time-entries', {
        method: 'POST',
        body: JSON.stringify(entryData)
      });
    },
    onSuccess: (data) => {
      console.log('Time entry saved to API:', data);
      
      toast({
        title: "Time entry saved",
        description: `${formatTime(seconds)} has been added to your timesheet.`,
        variant: "default",
      });
      
      setTimesheetSaved(true);
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error('API error when saving time entry:', error);
      
      // Fall back to local storage but still mark as saved
      saveTimeEntryLocally();
      
      // Show a warning instead of an error since we saved locally
      toast({
        title: "Time entry saved locally",
        description: "Could not save to cloud, but your time entry was saved locally.",
        variant: "destructive",
      });
      
      setTimesheetSaved(true);
      setIsSubmitting(false);
    }
  });
  
  // Save time entry locally when API fails
  const saveTimeEntryLocally = useCallback(() => {
    try {
      // Get proper formatted dates
      const startDate = new Date(startTimeDate);
      const endDate = new Date();
      
      // Handle empty or invalid job data with defaults
      const projectId = currentJob?.id || '';
      const projectName = currentJob?.name || 'No active job';
      const clientName = (currentJob?.client || 'No client selected').replace('Client: ', '');
      
      // Create a standardized time entry for local storage
      const fallbackTimeEntry = {
        id: Date.now(), // Generate a unique ID
        userId: 1,
        projectId: projectId,
        projectName: projectName,
        clientName: clientName,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        duration: seconds,
        notes: `Work on ${projectName}`,
        hourlyRate: hourlyRate.toString(),
      };
      
      // Save to local storage with proper error handling
      let existingEntries = [];
      try {
        const storedData = localStorage.getItem('timeEntries');
        existingEntries = storedData ? JSON.parse(storedData) : [];
        if (!Array.isArray(existingEntries)) existingEntries = [];
      } catch (parseError) {
        console.error('Error parsing existing entries, starting fresh:', parseError);
        existingEntries = [];
      }
      
      existingEntries.push(fallbackTimeEntry);
      localStorage.setItem('timeEntries', JSON.stringify(existingEntries));
      
      // Dispatch event to update UI
      try {
        const fallbackEvent = new CustomEvent('newTimeEntry', { 
          detail: fallbackTimeEntry 
        });
        window.dispatchEvent(fallbackEvent);
      } catch (eventError) {
        console.warn('Could not dispatch event, but entry was saved:', eventError);
      }
      
      console.log('Time entry saved locally:', fallbackTimeEntry);
      
    } catch (error) {
      console.error('Failed to save time entry locally:', error);
      
      toast({
        title: "Error",
        description: "Failed to save time entry. Please try again.",
        variant: "destructive",
      });
    }
  }, [currentJob, seconds, hourlyRate, startTimeDate]);
  
  // No initialization needed for direct time entry link
  
  // Save time entry to timesheet - using multiple approaches to ensure reliability
  const saveTimeEntry = () => {
    // Don't try to save if timer is at 00:00:00
    if (seconds <= 0) {
      toast({
        title: "Nothing to save",
        description: "You haven't tracked any time yet.",
        variant: "default",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("JobTimer: Starting to save time entry");
      
      // Get proper formatted dates
      const startDate = new Date(startTimeDate);
      const endDate = new Date();
      
      // Handle empty or invalid job data with defaults
      const projectId = currentJob?.id || '';
      const projectName = currentJob?.name || 'No active job';
      
      // Create a time entry object with all required fields
      const timeEntry = {
        id: Date.now(),
        userId: 1,
        projectId: Number(projectId) || 1, // Ensure this is a number
        startTime: startDate,
        endTime: endDate,
        duration: seconds,
        notes: `Work on ${projectName}`,
        hourlyRate: hourlyRate.toString(),
        createdAt: new Date(), // Add the createdAt field required by TimesheetPage
      };
      
      console.log("JobTimer: Time entry to save:", timeEntry);
      
      // APPROACH 1: Use the centralized utility to save the entry in localStorage
      saveTimeEntryToStorage(timeEntry);
      
      // APPROACH 2: Add the entry to our direct time entry link for guaranteed component connection
      addDirectTimeEntry(timeEntry);
      console.log("JobTimer: Added time entry to direct link system for guaranteed access");
      
      // APPROACH 3: Manually trigger refresh of timesheet data through events
      try {
        console.log("JobTimer: Manually dispatching events to update timesheet");
        
        // Dispatch multiple events for maximum compatibility
        window.dispatchEvent(new CustomEvent('timeEntryAdded', { detail: timeEntry }));
        window.dispatchEvent(new CustomEvent('newTimeEntry', { detail: timeEntry }));
        document.dispatchEvent(new CustomEvent('DIRECT_DOM_TIME_ENTRY', { detail: timeEntry }));
        
        // APPROACH 4: Force localStorage update with multiple keys
        // This is a direct attempt to ensure the data is properly saved
        const currentEntries = JSON.parse(localStorage.getItem('timeEntries') || '[]');
        currentEntries.push(timeEntry);
        localStorage.setItem('timeEntries', JSON.stringify(currentEntries));
        
        // Save to additional localStorage keys for redundancy
        localStorage.setItem('latestTimeEntry', JSON.stringify(timeEntry));
        localStorage.setItem(`timeEntry_${timeEntry.id}`, JSON.stringify(timeEntry));
        
        // APPROACH 5: Set a global variable that will be checked by polling in the timesheet
        window.__LATEST_TIME_ENTRY__ = timeEntry;
        
        console.log("JobTimer: All storage approaches complete");
      } catch (eventError) {
        console.error("Error in storage approaches:", eventError);
      }
      
      // Update UI state
      setTimesheetSaved(true);
      
      // Show success message
      toast({
        title: "Time entry saved",
        description: `${formatTime(seconds)} has been added to your timesheet.`,
        variant: "default",
      });
      
    } catch (error) {
      console.error('Failed to save time entry:', error);
      toast({
        title: "Save failed",
        description: "Could not save your time entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      // Always make sure to reset the submitting state
      setIsSubmitting(false);
    }
  };
  
  // Stop the timer and save to timesheet
  const stopTimer = async () => {
    setStatus('STOPPED');
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    
    if (seconds > 0 && !timesheetSaved) {
      await saveTimeEntry();
    }
  };
  
  // Update the hourly rate
  const updateHourlyRate = (newRate: number) => {
    if (newRate > 0) {
      setHourlyRate(newRate);
      toast({
        title: "Hourly Rate Updated",
        description: `Your hourly rate has been updated to $${newRate.toFixed(2)}/hr.`,
        variant: "default",
      });
    }
  };

  // Toggle edit mode for the hourly rate
  const toggleEditRate = () => {
    setIsEditingRate(!isEditingRate);
  };

  return {
    time: formatTime(seconds),
    status,
    currentJob,
    startTime: formatStartTime(),
    hourlyRate,
    estimatedTotal: calculateTotal(seconds, hourlyRate),
    toggleTimer,
    stopTimer,
    resetTimer,
    saveTimeEntry, // Export the saveTimeEntry function
    isRunning: status === 'RUNNING',
    isPaused: status === 'PAUSED',
    timesheetSaved,
    isEditingRate,
    toggleEditRate,
    updateHourlyRate,
    isSubmitting
  };
}
