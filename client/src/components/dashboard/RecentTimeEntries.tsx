import { FC, useState, useEffect, useCallback } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { apiRequest } from "@/lib/queryClient";

// Type for a time entry
interface TimeEntry {
  id: number;
  userId: number;
  projectId: number;
  projectName?: string;
  clientName?: string;
  startTime: string;
  endTime: string;
  duration: number;
  notes: string;
  hourlyRate: string;
  createdAt: string;
}

// Recent time entries component
const RecentTimeEntries: FC = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState(0);

  // Format duration (in seconds) to HH:MM:SS
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Format date as YYYY-MM-DD HH:MM AM/PM
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Calculate estimated cost based on duration and rate
  const calculateCost = (seconds: number, rate: string) => {
    const hours = seconds / 3600;
    const total = hours * parseFloat(rate);
    return total.toFixed(2);
  };

  // Fetch time entries from API with debounce (60 second minimum between fetches)
  const fetchTimeEntries = useCallback(
    async (force = false) => {
      const now = Date.now();
      // Skip fetch if less than 60 seconds since last fetch unless forced
      if (!force && now - lastFetchTime < 60000) {
        return;
      }

      setIsLoading(true);
      setLastFetchTime(now);

      try {
        // Try to fetch from API
        const entries = await apiRequest<TimeEntry[]>("/api/time-entries");

        if (entries && entries.length > 0) {
          setTimeEntries(entries);
        } else {
          // If no entries returned or API error, use mock data for demo purposes
          const mockTimeEntries: TimeEntry[] = [];
          // Retrieve local storage time entries
          const storedEntries = localStorage.getItem("timeEntries");

          if (storedEntries) {
            const parsedEntries = JSON.parse(storedEntries);
            setTimeEntries(parsedEntries);
          } else {
            setTimeEntries(mockTimeEntries);
          }
        }
      } catch (error) {
        console.error("Error fetching time entries:", error);

        // Use local storage entries if available
        const storedEntries = localStorage.getItem("timeEntries");
        if (storedEntries) {
          setTimeEntries(JSON.parse(storedEntries));
        }
      } finally {
        setIsLoading(false);
      }
    },
    [lastFetchTime],
  );

  // Store current time entries in local storage
  useEffect(() => {
    localStorage.setItem("timeEntries", JSON.stringify(timeEntries));
  }, [timeEntries]);

  // Listen for custom event to add new time entry
  useEffect(() => {
    const handleNewTimeEntry = (event: CustomEvent) => {
      const newEntry = event.detail;

      // Create time entry object
      const timeEntry: TimeEntry = {
        id: Date.now(), // Use timestamp as ID for local entries
        userId: newEntry.userId || 1,
        projectId: newEntry.projectId || 1,
        projectName:
          newEntry.projectName || "42 Papamoa Beach Road - Deck Extension",
        clientName: newEntry.clientName || "Bay Builders Ltd",
        startTime: newEntry.startTime,
        endTime: newEntry.endTime,
        duration: newEntry.duration,
        notes: newEntry.notes || "Work completed",
        hourlyRate: newEntry.hourlyRate || "65.00",
        createdAt: new Date().toISOString(),
      };

      // Add to time entries
      setTimeEntries((prev) => [timeEntry, ...prev]);
    };

    // Create and register event listener
    window.addEventListener(
      "newTimeEntry" as any,
      handleNewTimeEntry as EventListener,
    );

    // Fetch existing time entries
    fetchTimeEntries();

    // Cleanup
    return () => {
      window.removeEventListener(
        "newTimeEntry" as any,
        handleNewTimeEntry as EventListener,
      );
    };
  }, [fetchTimeEntries]);

  return (
    <GlassCard
      className="p-5 overflow-hidden neon-border-purple"
      data-oid="nnell:8"
    >
      <div
        className="flex justify-between items-center mb-4"
        data-oid="-2wqqhq"
      >
        <h3 className="text-lg font-space text-purple-400" data-oid=".duuys1">
          Recent Time Entries
        </h3>
        <button
          className="text-xs bg-space-800 hover:bg-space-700 text-white px-3 py-1 rounded"
          onClick={() => fetchTimeEntries(true)}
          data-oid="u1o61hn"
        >
          <i className="fas fa-refresh mr-1" data-oid="tsq103d"></i> Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8" data-oid="-e:fuci">
          <div
            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-400"
            data-oid="kuo_wyy"
          ></div>
        </div>
      ) : timeEntries.length > 0 ? (
        <div className="space-y-3" data-oid="ttn253s">
          {timeEntries.map((entry, index) => (
            <div
              key={entry.id}
              className={`bg-space-900/80 rounded-lg p-3 border border-space-800 relative ${
                index === 0 ? "active-job-card" : ""
              }`}
              data-oid="v9omwo7"
            >
              <div
                className="flex flex-col md:flex-row justify-between"
                data-oid="245..o6"
              >
                <div data-oid="mfgxgbo">
                  <div className="flex items-center" data-oid="x4tttue">
                    {index === 0 && (
                      <span
                        className="h-2 w-2 rounded-full bg-green-400 mr-1.5 animate-pulse"
                        data-oid="q29m_cq"
                      ></span>
                    )}
                    <h4 className="text-white font-medium" data-oid="38ovlhi">
                      {entry.projectName || `Project #${entry.projectId}`}
                    </h4>
                  </div>
                  <p className="text-gray-400 text-xs" data-oid="1j_5vgl">
                    {entry.clientName || "Client"}
                  </p>
                  <div
                    className="flex items-center mt-1 text-xs"
                    data-oid="__jrl0g"
                  >
                    <span className="text-purple-300 mr-3" data-oid="vlwndl2">
                      <i className="fas fa-clock mr-1" data-oid="q8xbzw9"></i>
                      {formatDuration(entry.duration)}
                    </span>
                    <span className="text-gray-400" data-oid="et5wuep">
                      <i
                        className="fas fa-calendar-alt mr-1"
                        data-oid="a40r43n"
                      ></i>
                      {formatDate(entry.startTime)}
                    </span>
                  </div>
                </div>

                <div className="mt-2 md:mt-0 text-right" data-oid="x4ukaco">
                  <div className="text-teal font-medium" data-oid="2cfm1j_">
                    ${calculateCost(entry.duration, entry.hourlyRate)}
                  </div>
                  <div className="text-gray-400 text-xs" data-oid=":2vitst">
                    @${parseFloat(entry.hourlyRate).toFixed(2)}/hr
                  </div>
                </div>
              </div>

              {entry.notes && (
                <div
                  className="mt-2 text-xs text-gray-400 border-t border-gray-800 pt-2"
                  data-oid="ctzcvzp"
                >
                  {entry.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          className="bg-space-900/80 rounded-lg p-4 text-center"
          data-oid="q2d6f3d"
        >
          <p className="text-gray-400" data-oid="35wmr2r">
            No time entries yet.
          </p>
          <p className="text-xs text-gray-500 mt-1" data-oid="9twuop5">
            Use the timer above to track your time and save it.
          </p>
        </div>
      )}
    </GlassCard>
  );
};

export default RecentTimeEntries;
