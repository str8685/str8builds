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
      <div className="space-y-2" data-oid="rreui1a">
        <div className="flex justify-center p-10" data-oid="h8fe_8:">
          <div
            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal"
            data-oid="zw874d9"
          ></div>
        </div>
      </div>
    );
  }

  if (typedTimeEntries.length === 0) {
    return (
      <div className="space-y-2" data-oid="liae6zc">
        <div
          className="p-6 text-center bg-space-800/50 rounded-lg"
          data-oid="703::c:"
        >
          <p className="text-gray-400" data-oid="-xt4whu">
            No time entries found.
          </p>
          <p className="text-xs text-gray-500 mt-1" data-oid=".j7jcve">
            Add a new time entry to get started.
          </p>
        </div>
      </div>
    );
  }

  // Use typed time entries array
  const displayEntries = typedTimeEntries;

  return (
    <div className="space-y-2" data-oid="x-7ss-i">
      {displayEntries.map((entry: TimeEntry) => (
        <div
          key={entry.id}
          className="flex justify-between items-center p-3 bg-space-800/50 rounded-lg hover:bg-space-800/80 transition-colors"
          data-oid="4j19r1:"
        >
          <div className="flex-1" data-oid="4him-tg">
            <div className="text-sm font-medium text-white" data-oid="jy5bens">
              {entry.projectId ? `Project #${entry.projectId}` : "No Project"}
            </div>
            <div className="text-xs text-gray-400" data-oid="734nodx">
              {formatDate(entry.startTime.toString())}
              {entry.notes &&
                ` | ${entry.notes.substring(0, 30)}${entry.notes.length > 30 ? "..." : ""}`}
            </div>
          </div>
          <div className="flex flex-col items-end" data-oid="72nnwhz">
            <div className="text-sm font-medium text-teal" data-oid="pcsz8yy">
              $
              {entry.duration && entry.hourlyRate
                ? calculateCost(entry.duration, entry.hourlyRate)
                : "0.00"}
            </div>
            <div className="text-xs text-gray-400" data-oid="hbdha2d">
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
