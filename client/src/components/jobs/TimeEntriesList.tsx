import { FC } from "react";
import { useTimeEntries } from "@/hooks/useTimeEntries";
import { TimeEntry } from "@shared/schema";

const TimeEntriesList: FC = () => {
  const {
    timeEntries = [],
    isLoading,
    formatDuration,
    formatDate,
    calculateCost,
  } = useTimeEntries();

  // Explicitly type the time entries array
  const typedTimeEntries = timeEntries as TimeEntry[];

  if (isLoading) {
    return (
      <div className="space-y-2" data-oid="tll-xh_">
        <div className="flex justify-center p-10" data-oid="hkqtwli">
          <div
            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal"
            data-oid="-dc6h5a"
          ></div>
        </div>
      </div>
    );
  }

  if (typedTimeEntries.length === 0) {
    return (
      <div className="space-y-2" data-oid="uvq-7hb">
        <div
          className="p-6 text-center bg-space-800/50 rounded-lg"
          data-oid="wdp7iwl"
        >
          <p className="text-gray-400" data-oid="u0pr14b">
            No time entries found.
          </p>
          <p className="text-xs text-gray-500 mt-1" data-oid="s9ya5qc">
            Add a new time entry to get started.
          </p>
        </div>
      </div>
    );
  }

  // Use typed time entries array
  const displayEntries = typedTimeEntries;

  return (
    <div className="space-y-2" data-oid="gn8f7_c">
      {displayEntries.map((entry: TimeEntry) => (
        <div
          key={entry.id}
          className="flex justify-between items-center p-3 bg-space-800/50 rounded-lg hover:bg-space-800/80 transition-colors"
          data-oid="kaf6ni5"
        >
          <div className="flex-1" data-oid="50kusa1">
            <div className="text-sm font-medium text-white" data-oid="uwog93g">
              {entry.projectId ? `Project #${entry.projectId}` : "No Project"}
            </div>
            <div className="text-xs text-gray-400" data-oid="0:m4fm1">
              {formatDate(entry.startTime.toString())}
              {entry.notes &&
                ` | ${entry.notes.substring(0, 30)}${entry.notes.length > 30 ? "..." : ""}`}
            </div>
          </div>
          <div className="flex flex-col items-end" data-oid=".21w60:">
            <div className="text-sm font-medium text-teal" data-oid="urin.9z">
              $
              {entry.duration && entry.hourlyRate
                ? calculateCost(entry.duration, entry.hourlyRate)
                : "0.00"}
            </div>
            <div className="text-xs text-gray-400" data-oid="5qvte5.">
              {entry.duration ? formatDuration(entry.duration) : "0:00"} @ $
              {entry.hourlyRate
                ? parseFloat(entry.hourlyRate.toString()).toFixed(2)
                : "0.00"}
              /hr
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeEntriesList;
