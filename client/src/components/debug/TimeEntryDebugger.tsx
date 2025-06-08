import React from "react";
import { toast } from "@/hooks/use-toast";
import {
  getTimeEntries,
  saveTimeEntry,
  clearTimeEntries,
} from "@/lib/timerStorage";
import { useQueryClient } from "@tanstack/react-query";

/**
 * A debugging component to help troubleshoot timesheet entry issues
 */
const TimeEntryDebugger: React.FC = () => {
  const queryClient = useQueryClient();

  const handleCheckEntries = () => {
    const entries = getTimeEntries();
    console.log("Current timesheet entries:", entries);
    // Force a refresh
    queryClient.invalidateQueries({ queryKey: ["/api/time-entries"] });
    toast({
      title: "Debug info",
      description: `Found ${entries.length} entries in local storage. Check console for details.`,
      variant: "default",
    });
  };

  const handleCreateTestEntry = () => {
    // Create a sample entry for testing
    const testEntry = {
      id: Date.now(),
      userId: 1,
      projectId: 1,
      startTime: new Date(),
      endTime: new Date(),
      duration: 3600, // 1 hour
      notes: "Test entry created for debugging",
      hourlyRate: "65.00",
    };
    saveTimeEntry(testEntry);
    queryClient.invalidateQueries({ queryKey: ["/api/time-entries"] });
    toast({
      title: "Test entry created",
      description:
        "A sample time entry has been created and should appear in the list.",
      variant: "default",
    });
  };

  const handleClearEntries = () => {
    clearTimeEntries();
    queryClient.invalidateQueries({ queryKey: ["/api/time-entries"] });
    toast({
      title: "Entries cleared",
      description: "All time entries have been removed from local storage.",
      variant: "default",
    });
  };

  return (
    <div
      className="bg-red-500/10 p-3 mb-4 rounded-md border border-red-500/20"
      data-oid="9-dk76."
    >
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        data-oid="rfy3r2o"
      >
        <div className="mb-3 sm:mb-0" data-oid="xel:22_">
          <h3 className="text-sm font-bold text-red-400" data-oid=":h_kqks">
            Timesheet Debug
          </h3>
          <p className="text-xs text-gray-400 mt-1" data-oid="cfpceq7">
            This section will help diagnose why entries aren't showing up
          </p>
        </div>
        <div className="flex flex-wrap gap-2" data-oid=".tlkz.e">
          <button
            onClick={handleCheckEntries}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs px-3 py-1 rounded"
            data-oid="hf36miz"
          >
            Check Entries
          </button>
          <button
            onClick={handleCreateTestEntry}
            className="bg-green-500/20 hover:bg-green-500/30 text-green-300 text-xs px-3 py-1 rounded"
            data-oid="31._7r-"
          >
            Create Test Entry
          </button>
          <button
            onClick={handleClearEntries}
            className="bg-red-900/20 hover:bg-red-900/30 text-red-300 text-xs px-3 py-1 rounded"
            data-oid="7re0mg-"
          >
            Clear Entries
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeEntryDebugger;
