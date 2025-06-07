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
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8" data-oid="zn7yk:l">
      <Toaster data-oid="rx63riz" />

      <PageTitle
        title="Time Entry Tester"
        subtitle="Create demo time entries for testing"
        data-oid="b:b3w6q"
      />

      <div className="mb-8" data-oid="ejvdlr4">
        <button
          onClick={createDemoEntry}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center"
          data-oid=".5q8s2z"
        >
          Create Demo Time Entry
        </button>
        <p className="text-gray-400 mt-2 text-sm" data-oid="-f9_yrh">
          Click the button above to create a demo time entry that will be saved
          to localStorage and dispatch the necessary events. Then go to the
          Timesheet page to see if it appears there.
        </p>
      </div>

      <h2 className="text-xl font-bold text-white mb-4" data-oid="8kaummr">
        Demo Entries Created (Current Session)
      </h2>

      <div className="grid gap-4" data-oid="qvko1az">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <GlassCard key={entry.id} className="p-4" data-oid="f1t5-kn">
              <div className="flex justify-between" data-oid="71mke1g">
                <div data-oid="ef.l7v5">
                  <h3 className="font-bold text-white" data-oid="6ap91d-">
                    Demo Entry
                  </h3>
                  <p className="text-gray-400 text-sm" data-oid="dsr0pa5">
                    {entry.notes}
                  </p>
                </div>
                <div className="text-right" data-oid="clc5mp.">
                  <div
                    className="text-lg font-bold text-white"
                    data-oid="3_:i_2u"
                  >
                    {formatDuration(entry.duration)}
                  </div>
                  <div className="text-gray-400 text-sm" data-oid="af_nlvs">
                    {new Date(entry.startTime).toLocaleTimeString()} -{" "}
                    {new Date(entry.endTime).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))
        ) : (
          <p className="text-gray-400" data-oid="cjt13ph">
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
