import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { TimeEntry, InsertTimeEntry } from '@shared/schema';
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { getTimeEntries, saveTimeEntry, clearTimeEntries } from '@/lib/timerStorage';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useTimeEntries() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Get all time entries
  const { 
    data: timeEntries, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['/api/time-entries'],
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 60000, // 1 minute stale time to prevent duplicate requests
    queryFn: async () => {
      try {
        // Try to get data from API first
        const data = await apiRequest('/api/time-entries');
        // If successful, update local storage using our utility
        data.forEach((entry: any) => saveTimeEntry(entry));
        return data;
      } catch (error) {
        console.warn('Failed to fetch time entries from API, using local storage instead');
        // If API fails, use our centralized storage utility to get entries
        return getTimeEntries();
      }
    }
  });

  // Create new time entry
  const createTimeEntryMutation = useMutation({
    mutationFn: async (entry: InsertTimeEntry) => {
      try {
        // First try to save to the API
        const result = await apiRequest('/api/time-entries', {
          method: 'POST',
          body: JSON.stringify(entry)
        });
        return result;
      } catch (error) {
        // If API fails, save to local storage instead
        console.warn('API save failed, using local storage instead');
        
        // Create a new entry with a unique ID
        const newEntry = { 
          ...entry, 
          id: Date.now(),
          // Normalize dates to be Date objects or store correctly
          startTime: entry.startTime,
          endTime: entry.endTime,
          duration: typeof entry.duration === 'number' ? entry.duration : 0,
          hourlyRate: String(entry.hourlyRate || '65.00'),
          notes: entry.notes || '',
        };
        
        // Save using our centralized storage utility
        saveTimeEntry(newEntry);
        
        // Return the new entry
        return newEntry;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/time-entries'] });
      toast({
        title: "Time entry saved",
        description: "Your time entry has been saved successfully.",
        variant: "default"
      });
      setIsFormOpen(false);
    },
    onError: (error) => {
      console.error('Error creating time entry:', error);
      toast({
        title: "Error",
        description: "Failed to save time entry. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Format time entry duration for display
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Format date for display
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-NZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate cost from duration and rate
  const calculateCost = (duration: number, rate: string | number) => {
    const hours = duration / 3600;
    const rateValue = typeof rate === 'string' ? parseFloat(rate) : rate;
    return (hours * rateValue).toFixed(2);
  };
  
  // Convert HH:MM or HH:MM:SS format to seconds
  const durationToSeconds = (duration: string): number => {
    const parts = duration.split(':').map(part => parseInt(part, 10));
    if (parts.length === 2) {
      // HH:MM format
      return (parts[0] * 3600) + (parts[1] * 60);
    } else if (parts.length === 3) {
      // HH:MM:SS format
      return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
    }
    return 0;
  };

  const toggleForm = () => {
    setIsFormOpen(prev => !prev);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  // Function to clear all local time entries (useful for testing)
  const clearLocalTimeEntries = () => {
    clearTimeEntries(); // Use our centralized utility
    queryClient.invalidateQueries({ queryKey: ['/api/time-entries'] });
    toast({
      title: "Local entries cleared",
      description: "All locally stored time entries have been removed.",
      variant: "default"
    });
  };
  
  // Debug function to show what entries are currently stored
  const debugEntries = () => {
    const entries = getTimeEntries();
    console.log('Current time entries:', entries);
    return entries;
  };

  return {
    timeEntries,
    isLoading,
    error,
    isFormOpen,
    selectedDate,
    createTimeEntry: createTimeEntryMutation.mutate,
    isCreating: createTimeEntryMutation.isPending,
    toggleForm,
    closeForm,
    setSelectedDate,
    clearLocalTimeEntries,
    debugEntries, // Add the debug function
    // Helper functions
    formatDuration,
    formatDate,
    calculateCost,
    durationToSeconds
  };
}