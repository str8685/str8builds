import { FC, useState } from "react";
import { toast } from "@/hooks/use-toast";
import GlassCard from "@/components/ui/GlassCard";
import PageTitle from "@/components/ui/PageTitle";
import { Toaster } from "@/components/ui/toaster";
import {
  DirectTimeEntry,
  directTimeEntryStore,
} from "@/components/dashboard/DirectTimeEntryLink";

/**
 * A standalone page that creates and displays time entries
 * This bypasses all other systems for maximum reliability
 */
const TestTimesheetEntry: FC = () => {
  const [entries, setEntries] = useState<DirectTimeEntry[]>([]);

  // Create a demo time entry
  const createDemoEntry = () => {
    const entry = {
      id: Date.now(),
      userId: 1,
      projectId: 1,
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000), // 1 hour later
      duration: 3600, // 1 hour in seconds
      notes: "Demo work - created at " + new Date().toLocaleTimeString(),
      hourlyRate: "65.00",
      createdAt: new Date(),
    };

    // Add to our local state
    setEntries((prev) => [...prev, entry]);

    // Also store in localStorage
    try {
      const existingEntries = JSON.parse(
        localStorage.getItem("timeEntries") || "[]",
      );
      existingEntries.push(entry);
      localStorage.setItem("timeEntries", JSON.stringify(existingEntries));

      // Store in multiple locations for redundancy
      localStorage.setItem(`timeEntry_${entry.id}`, JSON.stringify(entry));

      // Add to the DirectTimeEntryLink store
      directTimeEntryStore.addEntry(entry);

      // Also add to window.__DIRECT_TIME_ENTRIES__ if it exists
      if (window.__DIRECT_TIME_ENTRIES__) {
        window.__DIRECT_TIME_ENTRIES__.push(entry);
      }
    } catch (e) {
      console.error("Failed to save entry to localStorage", e);
    }

    // Dispatch events to notify other components
    try {
      window.dispatchEvent(
        new CustomEvent("timeEntryAdded", { detail: entry }),
      );
      window.dispatchEvent(new CustomEvent("newTimeEntry", { detail: entry }));
      document.dispatchEvent(
        new CustomEvent("DIRECT_DOM_TIME_ENTRY", { detail: entry }),
      );
    } catch (e) {
      console.error("Failed to dispatch events", e);
    }

    toast({
      title: "Time Entry Created",
      description:
        "A new time entry has been added. Check the Timesheet page to see it.",
      variant: "default",
    });
  };

  // Format duration in seconds to hours and minutes
  const formatDuration = (seconds: number | null) => {
    const totalSeconds = seconds ?? 0;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8" data-oid="-:ixamo">
      <Toaster data-oid="t3hksfx" />

      <PageTitle
        title="Time Entry Tester"
        subtitle="Create demo time entries for testing"
        data-oid=".focter"
      />

      <div className="mb-8" data-oid="3mew9ts">
        <button
          onClick={createDemoEntry}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center"
          data-oid="l0f1y7h"
        >
          Create Demo Time Entry
        </button>
        <p className="text-gray-400 mt-2 text-sm" data-oid="1q2mjyz">
          Click the button above to create a demo time entry that will be saved
          to localStorage and dispatch the necessary events. Then go to the
          Timesheet page to see if it appears there.
        </p>
      </div>

      <h2 className="text-xl font-bold text-white mb-4" data-oid="s-9nchb">
        Demo Entries Created (Current Session)
      </h2>

      <div className="grid gap-4" data-oid="l98rzv-">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <GlassCard key={entry.id} className="p-4" data-oid="jjhr_jv">
              <div className="flex justify-between" data-oid="k7ojr0i">
                <div data-oid="zc67ba-">
                  <h3 className="font-bold text-white" data-oid="97reeo6">
                    Demo Entry
                  </h3>
                  <p className="text-gray-400 text-sm" data-oid="4uipp_g">
                    {entry.notes}
                  </p>
                </div>
                <div className="text-right" data-oid="vrx0-gl">
                  <div
                    className="text-lg font-bold text-white"
                    data-oid="e4sw202"
                  >
                    {formatDuration(entry.duration)}
                  </div>
                  <div className="text-gray-400 text-sm" data-oid="mk9w:yw">
                    {entry.startTime
                      ? new Date(entry.startTime).toLocaleTimeString()
                      : "N/A"}
                    {" - "}
                    {entry.endTime
                      ? new Date(entry.endTime).toLocaleTimeString()
                      : "In progress"}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))
        ) : (
          <p className="text-gray-400" data-oid="_o_w1ir">
            No demo entries created yet. Click the button above to create one.
          </p>
        )}
      </div>
    </div>
  );
};

// Add a global type definition for direct time entries
declare global {
  interface Window {
    __DIRECT_TIME_ENTRIES__?: DirectTimeEntry[];
  }
}

export default TestTimesheetEntry;
