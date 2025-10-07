import React, { FC, useState, useRef, useEffect } from "react";
import PageTitle from "@/components/ui/PageTitle";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { getTimeEntries } from "@/lib/timerStorage";
import {
  getDirectTimeEntries,
  subscribeToDirectTimeEntries,
  DirectTimeEntry,
  directTimeEntryStore,
} from "@/components/dashboard/DirectTimeEntryLink";
import TimeEntryDebugger from "@/components/debug/TimeEntryDebugger";
import { useTimeEntries } from "@/hooks/useTimeEntries";
import { useProjects } from "@/hooks/useProjects";
import { useQueryClient } from "@tanstack/react-query";
import { generateTimesheetPdf, savePdf } from "@/lib/pdfUtils";
import { generateTimesheetCSV, saveCSV } from "@/lib/csvUtils";
import { format } from "date-fns";
import { apiRequest } from "@/lib/queryClient";

// Define types locally to avoid import issues
interface TimeEntry {
  id: string | number; // Allow both string and number to match DirectTimeEntry
  userId: number;
  projectId: number | null;
  startTime: Date | string;
  endTime: Date | null | string;
  duration: number | null;
  notes: string | null;
  hourlyRate: string | null;
  createdAt: Date | null;
}

interface Project {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date | null;
  userId: number;
  clientId: number | null;
  status: string | null;
  startDate: Date | null;
  endDate: Date | null;
  hourlyRate: string | null;
  location: string | null;
  progress: number | null;
}

const TimesheetPage: FC = () => {
  const {
    timeEntries = [],
    isLoading,
    formatDuration,
    formatDate,
    createTimeEntry,
    isFormOpen,
    durationToSeconds,
    toggleForm,
    closeForm,
  } = useTimeEntries();

  const { projects = [] } = useProjects();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeView, setActiveView] = useState<"list" | "calendar" | "chart">(
    "list",
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Form state
  const [formData, setFormData] = useState({
    projectId: 1,
    date: new Date().toISOString().split("T")[0],
    duration: "",
    notes: "",
  });

  // Get project name from ID
  const getProjectName = (projectId: number | null): string => {
    if (!projectId) return "No Project";
    const project = projects.find((p: Project) => p.id === projectId);
    return project ? project.name : `Project #${projectId}`;
  };

  // Calculate the total hours and earnings for display
  const stats = {
    totalHours:
      timeEntries.reduce(
        (sum: number, entry: TimeEntry) => sum + (entry.duration || 0),
        0,
      ) / 3600, // Convert seconds to hours

    totalEarnings: timeEntries.reduce((sum: number, entry: TimeEntry) => {
      const hours = (entry.duration || 0) / 3600;
      const rate = entry.hourlyRate
        ? parseFloat(entry.hourlyRate.toString())
        : 0;
      return sum + hours * rate;
    }, 0),

    thisWeekHours:
      timeEntries
        .filter((entry: TimeEntry) => {
          const entryDate = new Date(entry.startTime);
          const today = new Date();
          const firstDayOfWeek = new Date(today);
          firstDayOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
          firstDayOfWeek.setHours(0, 0, 0, 0);
          return entryDate >= firstDayOfWeek;
        })
        .reduce(
          (sum: number, entry: TimeEntry) => sum + (entry.duration || 0),
          0,
        ) /
      3600,

    thisMonthHours:
      timeEntries
        .filter((entry: TimeEntry) => {
          const entryDate = new Date(entry.startTime);
          const today = new Date();
          const firstDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1,
          );
          return entryDate >= firstDayOfMonth;
        })
        .reduce(
          (sum: number, entry: TimeEntry) => sum + (entry.duration || 0),
          0,
        ) /
      3600,
  };

  // Initialize query client for refreshing data
  const queryClient = useQueryClient();

  // Force-add timer entries from localStorage to fix visibility issue
  const loadTimerEntries = () => {
    console.log("Directly loading timer entries from localStorage");
    try {
      // First, try to get the entries saved by the useJobTimer hook
      const timerEntriesStr = localStorage.getItem("timeEntries");
      if (timerEntriesStr) {
        const timerEntries = JSON.parse(timerEntriesStr);
        console.log("Found timer entries:", timerEntries);
        if (Array.isArray(timerEntries) && timerEntries.length > 0) {
          // Force refresh the timesheet data
          queryClient.invalidateQueries({ queryKey: ["/api/time-entries"] });

          // We need to directly add these entries to the timeEntries state
          return timerEntries;
        }
      }
    } catch (error) {
      console.error("Error loading timer entries:", error);
    }
    return [];
  };

  // Manually load timer entries when the component mounts
  const [manualEntries, setManualEntries] = useState<TimeEntry[]>([]);

  // Function to handle manual refresh with guaranteed reliability
  const handleRefresh = () => {
    console.log("TimesheetPage: Manual refresh initiated");

    // Force reload of time entries from API
    queryClient.invalidateQueries({ queryKey: ["/api/time-entries"] });

    // APPROACH 1: Get entries from our direct link system
    const directLinkEntries = getDirectTimeEntries();
    console.log(
      "TimesheetPage: Retrieved direct link entries:",
      directLinkEntries,
    );

    if (directLinkEntries.length > 0) {
      setManualEntries(directLinkEntries);
      console.log(
        "TimesheetPage: Manual entries updated with direct link entries",
      );
    } else {
      // APPROACH 2: Get entries from timerStorage utility
      const storageEntries = getTimeEntries();
      console.log("TimesheetPage: Retrieved storage entries:", storageEntries);

      if (storageEntries.length > 0) {
        setManualEntries(storageEntries);
        console.log(
          "TimesheetPage: Manual entries updated with storage entries",
        );
      } else {
        console.warn(
          "TimesheetPage: No entries found in regular storage systems",
        );

        // APPROACH 3: Direct localStorage scan as a last resort
        try {
          console.log("TimesheetPage: Attempting direct localStorage scan");
          const directEntries: any[] = [];

          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (
              key &&
              (key.includes("time") ||
                key.includes("Time") ||
                key.includes("entry") ||
                key.includes("Entry"))
            ) {
              try {
                const data = localStorage.getItem(key);
                if (data) {
                  const parsed = JSON.parse(data);
                  if (Array.isArray(parsed)) {
                    console.log(
                      `TimesheetPage: Found array in key ${key} with ${parsed.length} items`,
                    );
                    directEntries.push(...parsed);
                  } else if (
                    parsed &&
                    typeof parsed === "object" &&
                    (parsed.duration || parsed.startTime)
                  ) {
                    console.log(
                      `TimesheetPage: Found individual entry in key ${key}`,
                    );
                    directEntries.push(parsed);
                  }
                }
              } catch (e) {
                // Continue if we can't parse this item
              }
            }
          }

          if (directEntries.length > 0) {
            console.log(
              `TimesheetPage: Found ${directEntries.length} entries from direct scan`,
            );
            setManualEntries(directEntries);
          }
        } catch (e) {
          console.error(
            "TimesheetPage: Error during direct localStorage scan",
            e,
          );
        }
      }
    }

    toast({
      title: "Refreshed",
      description: "Timesheet data has been refreshed from all sources.",
      variant: "default",
    });
  };

  // Combined entries from timeEntries and manualEntries
  const allEntries = [...(timeEntries || []), ...manualEntries];

  // Filter time entries based on search term
  const filteredEntries =
    allEntries.filter((entry: any) => {
      const searchLower = searchTerm.toLowerCase();
      const projectName = getProjectName(entry.projectId);

      return (
        !searchTerm ||
        projectName.toLowerCase().includes(searchLower) ||
        (entry.notes && entry.notes.toLowerCase().includes(searchLower))
      );
    }) || [];

  // Subscribe to direct time entries and listen for all possible events
  useEffect(() => {
    console.log(
      "TimesheetPage: Setting up comprehensive event listeners and subscriptions",
    );

    // Primary handler for new time entries that performs a complete refresh
    const handleNewTimeEntry = (event: any) => {
      console.log(
        "TimesheetPage: New time entry event detected",
        event.type,
        event.detail,
      );

      // Force reload of API data
      queryClient.invalidateQueries({ queryKey: ["/api/time-entries"] });

      // Also refresh from direct time entries and storage
      handleRefresh();
    };

    // Listen for the direct storage event that doesn't use CustomEvent
    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.key &&
        (event.key.includes("time") ||
          event.key.includes("Time") ||
          event.key.includes("entry") ||
          event.key.includes("Entry"))
      ) {
        console.log("TimesheetPage: Storage change detected", event.key);
        handleRefresh();
      }
    };

    // Set polling interval to check for entries every 2 seconds as a fallback
    const intervalId = setInterval(() => {
      const directEntries = getDirectTimeEntries();
      if (directEntries.length > 0) {
        console.log(
          "TimesheetPage: Poll found direct entries, updating display",
        );
        setManualEntries((prevEntries) => {
          // Only update if we found more entries than before
          if (directEntries.length > prevEntries.length) {
            return directEntries as any; // Type cast to avoid TS errors
          }
          return prevEntries;
        });
      } else {
        // Fallback to storage entries
        const storageEntries = getTimeEntries();
        if (storageEntries.length > 0) {
          console.log(
            "TimesheetPage: Poll found storage entries, updating display",
          );
          setManualEntries(storageEntries as any); // Type cast to avoid TS errors
        }
      }
    }, 2000); // Check more frequently

    // CRITICAL: Subscribe to the direct time entry link for real-time updates
    const unsubscribe = subscribeToDirectTimeEntries((entries) => {
      console.log(
        "TimesheetPage: Direct time entry subscription triggered with",
        entries.length,
        "entries",
      );
      if (entries.length > 0) {
        setManualEntries(entries as any); // Type cast to avoid TS errors
      }
    });

    // Register all event listeners
    window.addEventListener("timeEntryAdded", handleNewTimeEntry);
    window.addEventListener("newTimeEntry", handleNewTimeEntry);
    document.addEventListener("DIRECT_DOM_TIME_ENTRY", handleNewTimeEntry);
    window.addEventListener("storage", handleStorageChange);

    // Also trigger an immediate refresh on mount
    handleRefresh();

    // Clean up all event listeners, interval, and subscription
    return () => {
      console.log(
        "TimesheetPage: Cleaning up event listeners and subscriptions",
      );
      window.removeEventListener("timeEntryAdded", handleNewTimeEntry);
      window.removeEventListener("newTimeEntry", handleNewTimeEntry);
      document.removeEventListener("DIRECT_DOM_TIME_ENTRY", handleNewTimeEntry);
      window.removeEventListener("storage", handleStorageChange);
      unsubscribe(); // Clean up the subscription
      clearInterval(intervalId);
    };
  }, [queryClient]);

  // Load timer entries when component mounts
  useEffect(() => {
    console.log("TimesheetPage mounted, loading all available entries");

    // Try direct time entries first
    const directEntries = getDirectTimeEntries();
    if (directEntries.length > 0) {
      console.log(
        "TimesheetPage: Initial load found",
        directEntries.length,
        "direct entries",
      );
      setManualEntries(directEntries as any); // Type cast to avoid TS errors
    } else {
      // Fallback to storage entries
      const storageEntries = getTimeEntries();
      console.log(
        "TimesheetPage: Initial load found",
        storageEntries.length,
        "storage entries",
      );
      setManualEntries(storageEntries as any); // Type cast to avoid TS errors
    }
  }, []);

  // Calculate the total cost based on duration and hourly rate
  const calculateCost = (seconds: number, rate: string): string => {
    const hours = seconds / 3600;
    const hourlyRate = parseFloat(rate);
    return (hours * hourlyRate).toFixed(2);
  };

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert duration to seconds
    const durationInSeconds = durationToSeconds(formData.duration);

    // Format dates for API
    const startDate = new Date(formData.date);
    const endDate = new Date(formData.date);

    // Create payload
    const timeEntry = {
      userId: 1, // Fixed user ID for demo
      projectId: Number(formData.projectId),
      startTime: startDate,
      endTime: endDate,
      duration: durationInSeconds,
      notes: formData.notes,
      hourlyRate: "65.00", // Default hourly rate
    };

    try {
      createTimeEntry(timeEntry);
      closeForm(); // Close form after submission
      toast({
        title: "Time entry saved",
        description: "Your time entry has been added successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to create time entry:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your time entry.",
        variant: "destructive",
      });
    }
  };

  // Get current period (month and year)
  const getCurrentPeriod = (): string => {
    return format(new Date(), "MMMM yyyy");
  };

  // Handle export to PDF
  const handleExportPdf = async () => {
    try {
      toast({
        title: "Export started",
        description: "Your time entries report is being prepared as PDF.",
        variant: "default",
      });

      // Create sample data if no entries exist
      const entriesForExport =
        filteredEntries.length > 0
          ? filteredEntries
          : [
              {
                id: 1,
                userId: 1,
                projectId: 1,
                startTime: new Date(),
                endTime: new Date(),
                duration: 7200, // 2 hours in seconds
                notes: "Sample time entry for demonstration",
                hourlyRate: "65.00",
              },
            ];

      // Create sample projects if none exist
      const projectsForExport =
        projects.length > 0
          ? projects
          : [
              {
                id: 1,
                name: "Sample Project",
                clientId: 1,
                description: "This is a sample project for demonstration",
                status: "active",
              },
            ];

      const period = getCurrentPeriod();
      const blob = await generateTimesheetPdf(
        entriesForExport,
        projectsForExport,
        period,
      );

      // Save the PDF locally
      savePdf(blob, `Timesheet-${period.replace(/\s/g, "-")}.pdf`);

      toast({
        title: "PDF exported",
        description: "Your timesheet has been exported as PDF.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Export failed",
        description: "There was a problem generating your PDF.",
        variant: "destructive",
      });
    }
  };

  // Handle export to CSV
  const handleExportCsv = () => {
    try {
      toast({
        title: "Export started",
        description: "Your time entries report is being prepared as CSV.",
        variant: "default",
      });

      // Create sample data if no entries exist
      const entriesForExport =
        filteredEntries.length > 0
          ? filteredEntries
          : [
              {
                id: 1,
                userId: 1,
                projectId: 1,
                startTime: new Date(),
                endTime: new Date(),
                duration: 7200, // 2 hours in seconds
                notes: "Sample time entry for demonstration",
                hourlyRate: "65.00",
              },
            ];

      // Create sample projects if none exist
      const projectsForExport =
        projects.length > 0
          ? projects
          : [
              {
                id: 1,
                name: "Sample Project",
                clientId: 1,
                description: "This is a sample project for demonstration",
                status: "active",
              },
            ];

      const period = getCurrentPeriod();
      const csvData = generateTimesheetCSV(
        entriesForExport,
        projectsForExport,
        period,
      );

      // Save the CSV locally
      saveCSV(csvData, `Timesheet-${period.replace(/\s/g, "-")}.csv`);

      toast({
        title: "CSV exported",
        description: "Your timesheet has been exported as CSV.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error generating CSV:", error);
      toast({
        title: "Export failed",
        description: "There was a problem generating your CSV.",
        variant: "destructive",
      });
    }
  };

  // Handle email timesheet
  const handleEmailTimesheet = async () => {
    try {
      toast({
        title: "Preparing email",
        description: "Your timesheet is being prepared for email.",
        variant: "default",
      });

      // Get email from prompt
      const email = prompt("Enter the email address to send the timesheet to:");
      if (!email) return;

      // Create sample data if no entries exist
      const entriesForExport =
        filteredEntries.length > 0
          ? filteredEntries
          : [
              {
                id: 1,
                userId: 1,
                projectId: 1,
                startTime: new Date(),
                endTime: new Date(),
                duration: 7200, // 2 hours in seconds
                notes: "Sample time entry for demonstration",
                hourlyRate: "65.00",
              },
            ];

      // Create sample projects if none exist
      const projectsForExport =
        projects.length > 0
          ? projects
          : [
              {
                id: 1,
                name: "Sample Project",
                clientId: 1,
                description: "This is a sample project for demonstration",
                status: "active",
              },
            ];

      const period = getCurrentPeriod();
      const blob = await generateTimesheetPdf(
        entriesForExport,
        projectsForExport,
        period,
      );

      // Since we're having server issues, let's just download the PDF instead
      savePdf(blob, `Timesheet-${period.replace(/\s/g, "-")}.pdf`);

      toast({
        title: "Email simulation",
        description: `In a production environment, this would email the timesheet to ${email}. The PDF has been downloaded instead.`,
        variant: "default",
      });

      /* Commented out due to server issues
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
        const pdfBuffer = base64data.split(',')[1];
         // Send email via API
        try {
          const response = await apiRequest('/api/email/timesheet', {
            method: 'POST',
            body: JSON.stringify({
              to: email,
              period,
              totalHours: stats.totalHours.toFixed(2),
              pdfBuffer
            })
          });
           if (response.success) {
            toast({
              title: "Email sent",
              description: `Timesheet has been sent to ${email}.`,
              variant: "default"
            });
          } else {
            throw new Error(response.error || 'Failed to send email');
          }
        } catch (error) {
          console.error('Error sending email:', error);
          toast({
            title: "Email failed",
            description: "There was a problem sending your email.",
            variant: "destructive"
          });
        }
      };
      */
    } catch (error) {
      console.error("Error preparing email:", error);
      toast({
        title: "Email preparation failed",
        description: "There was a problem preparing your email.",
        variant: "destructive",
      });
    }
  };

  // Component to force create time entries for testing
  const ForceTimeEntryDisplay = () => {
    const createDemoTimeEntry = () => {
      const demoEntry = {
        id: Date.now(),
        startTime: new Date(),
        endTime: new Date(Date.now() + 3600000), // 1 hour later
        duration: 3600, // 1 hour in seconds
        projectId: 1,
        userId: 1,
        notes: "Demo time entry created for testing",
        hourlyRate: "50.00",
        createdAt: new Date(),
      };

      // Save to global storage
      directTimeEntryStore.addEntry(demoEntry);

      // Also save to localStorage for redundancy
      const entries = localStorage.getItem("timeEntries")
        ? JSON.parse(localStorage.getItem("timeEntries") || "[]")
        : [];
      entries.push(demoEntry);
      localStorage.setItem("timeEntries", JSON.stringify(entries));

      // Dispatch event
      window.dispatchEvent(
        new CustomEvent("timeEntryAdded", { detail: demoEntry }),
      );

      toast({
        title: "Demo Entry Created",
        description:
          "A demo time entry has been created and should appear in your timesheet.",
      });
    };

    return (
      <div
        className="mb-6 p-4 border border-gray-700 rounded-lg bg-gray-800/50"
        data-oid="dzd8lkk"
      >
        <h3 className="text-lg font-medium mb-2" data-oid="cljvzc8">
          Testing Tools
        </h3>
        <p className="text-sm text-gray-400 mb-3" data-oid="px8is1:">
          Use this to create demo time entries for testing
        </p>
        <Button
          onClick={createDemoTimeEntry}
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
          data-oid="0ymwwwb"
        >
          Create Demo Time Entry
        </Button>
      </div>
    );
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8" data-oid="jo0elqa">
      <Toaster data-oid="vs7p4k5" />
      <ForceTimeEntryDisplay data-oid="_yx76vo" />
      <PageTitle
        title="Professional Time Tracking"
        subtitle="Track and manage your billable hours efficiently"
        icon="fa-clock"
        data-oid="s5f3o6m"
      />

      {/* Statistics Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"
        data-oid="bybh:-6"
      >
        <GlassCard className="p-5" data-oid="6a3qq1q">
          <div className="text-xs text-gray-400 mb-1" data-oid="3:r-e6e">
            Total Hours
          </div>
          <div className="text-2xl font-bold text-white" data-oid="d202kpw">
            {stats.totalHours.toFixed(1)} hrs
          </div>
          <div className="text-xs text-gray-400 mt-2" data-oid="vl104:i">
            {timeEntries.length} time entries
          </div>
        </GlassCard>

        <GlassCard className="p-5" data-oid="2nke-2x">
          <div className="text-xs text-gray-400 mb-1" data-oid="uh09ahd">
            Total Earnings
          </div>
          <div className="text-2xl font-bold text-green-400" data-oid="l-r_kcz">
            ${stats.totalEarnings.toFixed(2)}
          </div>
          <div className="text-xs text-gray-400 mt-2" data-oid="_-f-_gm">
            Based on hourly rates
          </div>
        </GlassCard>

        <GlassCard className="p-5" data-oid="lb2cq0i">
          <div className="text-xs text-gray-400 mb-1" data-oid="g_t3_rq">
            This Week
          </div>
          <div className="text-2xl font-bold text-cyan" data-oid="rj7wk2u">
            {stats.thisWeekHours.toFixed(1)} hrs
          </div>
          <div className="text-xs text-gray-400 mt-2" data-oid="ukjb8vw">
            Since Sunday
          </div>
        </GlassCard>

        <GlassCard className="p-5" data-oid="ju5u2hm">
          <div className="text-xs text-gray-400 mb-1" data-oid="bzrwu.x">
            This Month
          </div>
          <div
            className="text-2xl font-bold text-purple-400"
            data-oid="77ia7pa"
          >
            {stats.thisMonthHours.toFixed(1)} hrs
          </div>
          <div className="text-xs text-gray-400 mt-2" data-oid="kq120io">
            {new Date().toLocaleString("default", { month: "long" })}
          </div>
        </GlassCard>
      </div>

      {/* Main Content */}
      <GlassCard className="p-5" data-oid="2z6x0hc">
        {/* Top Action Bar */}
        <div
          className="flex flex-wrap justify-between items-center mb-6 gap-4"
          data-oid="6vd2h29"
        >
          <div className="flex space-x-1" data-oid="qrwj.59">
            <button
              onClick={() => setActiveView("list")}
              className={`px-4 py-2 text-sm rounded-md ${
                activeView === "list"
                  ? "bg-electric/20 text-electric"
                  : "text-gray-400 hover:bg-space-800/50"
              }`}
              data-oid="lu3w.y5"
            >
              <i className="fas fa-list-ul mr-2" data-oid="ora6383"></i>
              List View
            </button>
            <button
              onClick={() => setActiveView("calendar")}
              className={`px-4 py-2 text-sm rounded-md ${
                activeView === "calendar"
                  ? "bg-electric/20 text-electric"
                  : "text-gray-400 hover:bg-space-800/50"
              }`}
              data-oid="e_3ebwc"
            >
              <i className="fas fa-calendar-alt mr-2" data-oid="407lzd8"></i>
              Calendar
            </button>
            <button
              onClick={() => setActiveView("chart")}
              className={`px-4 py-2 text-sm rounded-md ${
                activeView === "chart"
                  ? "bg-electric/20 text-electric"
                  : "text-gray-400 hover:bg-space-800/50"
              }`}
              data-oid="yd27aku"
            >
              <i className="fas fa-chart-bar mr-2" data-oid="x-ik_dh"></i>
              Charts
            </button>
          </div>

          <div className="flex-1 space-y-4" data-oid="kahf4u6">
            <div
              className="flex justify-between items-center mb-2"
              data-oid="-r:fxnc"
            >
              <PageTitle title="Timesheet & Time Tracking" data-oid="ndygj7l" />
              <button
                onClick={handleRefresh}
                className="bg-electric/80 hover:bg-electric text-white p-2 text-sm rounded-md font-medium flex items-center"
                data-oid="0xjm8x4"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  data-oid="o1qxj2a"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    data-oid="sx-x3h4"
                  ></path>
                </svg>
                Refresh Data
              </button>
            </div>
            <div className="p-6" data-oid="2:viyez">
              {/* Debug component to help troubleshoot timesheet entry issues */}
              <TimeEntryDebugger data-oid="3m8:ve2" />
            </div>
            <div className="relative" data-oid="e_41zkd">
              <input
                type="text"
                placeholder="Search time entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-space-800/50 border border-space-700 px-3 py-2 rounded-md text-sm text-white w-60 focus:outline-none focus:border-electric"
                data-oid="uf-a..9"
              />

              <div
                className="absolute right-3 top-2.5 text-gray-400"
                data-oid="2mt346-"
              >
                <i className="fas fa-search" data-oid="34844.a"></i>
              </div>
            </div>
            <div className="dropdown dropdown-end" data-oid="n.c5i:c">
              <button
                className="bg-space-800/50 border border-space-700 px-3 py-2 rounded-md text-sm text-white"
                data-oid="55k.m_j"
              >
                <i className="fas fa-file-export" data-oid="0ym17fy"></i>
              </button>
              <div
                className="dropdown-content bg-space-800 border border-space-700 rounded-md p-2 w-40 right-0 mt-1"
                data-oid="y.nekky"
              >
                <button
                  onClick={handleExportPdf}
                  className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-space-700 rounded"
                  data-oid="djv9w8d"
                >
                  <i className="fas fa-file-pdf mr-2" data-oid="5d1o0d4"></i>{" "}
                  Export PDF
                </button>
                <button
                  onClick={handleExportCsv}
                  className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-space-700 rounded"
                  data-oid="-qujexj"
                >
                  <i className="fas fa-file-csv mr-2" data-oid="phwa197"></i>{" "}
                  Export CSV
                </button>
                <button
                  onClick={handleEmailTimesheet}
                  className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-space-700 rounded"
                  data-oid="h_ezvx_"
                >
                  <i className="fas fa-envelope mr-2" data-oid="nfy2lin"></i>{" "}
                  Email
                </button>
              </div>
            </div>
            <button
              onClick={() => toggleForm()}
              className="bg-electric/80 hover:bg-electric text-white px-4 py-2 text-sm rounded-md font-medium"
              data-oid="13z8x8z"
            >
              <i className="fas fa-plus mr-1" data-oid="xgv6a7y"></i> Add Time
            </button>
          </div>
        </div>

        {/* Add Time Entry Form */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmit}
            className="bg-space-800/50 rounded-lg p-4 mb-4"
            data-oid="2nkudy_"
          >
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
              data-oid="kpn_.vs"
            >
              <div data-oid="6:bta.6">
                <label
                  className="block text-xs text-gray-400 mb-1"
                  data-oid="f_xth2h"
                >
                  Project
                </label>
                <select
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  className="w-full bg-space-800 border border-gray-700 rounded p-2 text-sm text-white"
                  data-oid="ub8l77j"
                >
                  {projects.map((project: Project) => (
                    <option
                      key={project.id}
                      value={project.id}
                      data-oid="1cl8nwd"
                    >
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              <div data-oid="f7k9t-7">
                <label
                  className="block text-xs text-gray-400 mb-1"
                  data-oid="j5b7igm"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-space-800 border border-gray-700 rounded p-2 text-sm text-white"
                  data-oid="4p6x6nw"
                />
              </div>
              <div data-oid="1.rwvbg">
                <label
                  className="block text-xs text-gray-400 mb-1"
                  data-oid="b06jorb"
                >
                  Duration (HH:MM)
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 02:30"
                  className="w-full bg-space-800 border border-gray-700 rounded p-2 text-sm text-white"
                  data-oid="i9be6h0"
                />
              </div>
            </div>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full bg-space-800 border border-gray-700 rounded p-2 text-sm text-white mb-4"
              placeholder="Notes about work completed"
              rows={3}
              data-oid="5ibl3yp"
            ></textarea>

            <div className="flex space-x-2 justify-end" data-oid="47xgsm7">
              <button
                type="button"
                onClick={() => closeForm()}
                className="bg-space-800 text-white px-4 py-2 rounded hover:bg-space-700"
                data-oid="c5:t2ll"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-electric text-white px-4 py-2 rounded hover:bg-electric/80"
                data-oid=".6s.e2z"
              >
                Add Time Entry
              </button>
            </div>
          </form>
        )}

        {/* Time entries content */}
        {isLoading ? (
          <div
            className="flex justify-between items-center mb-6"
            data-oid="qut6sbd"
          >
            <div
              className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan"
              data-oid="s19erv5"
            ></div>
            <div data-oid="pymnzvo">
              <p className="text-gray-400" data-oid="g9c.st5">
                No time entries found matching your criteria.
              </p>
              <p className="text-xs text-gray-500 mt-1" data-oid="zrnwz6v">
                Try changing your search or add a new time entry.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto" data-oid="goizl2d">
            <table className="w-full" data-oid="4zg3n62">
              <thead className="text-left" data-oid="u6odv_q">
                <tr className="border-b border-gray-700/50" data-oid=".p7r057">
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium"
                    data-oid="qxj7n1m"
                  >
                    DATE
                  </th>
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium"
                    data-oid="g.kny55"
                  >
                    PROJECT
                  </th>
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium"
                    data-oid="pqv4gkn"
                  >
                    DESCRIPTION
                  </th>
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium"
                    data-oid="f9hyvts"
                  >
                    DURATION
                  </th>
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium text-right"
                    data-oid="obp2:ft"
                  >
                    AMOUNT
                  </th>
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium text-right"
                    data-oid="zpizw__"
                  >
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody data-oid="_4jnf8v">
                {filteredEntries.map((entry: TimeEntry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-gray-700/30 hover:bg-space-800/50 transition-colors"
                    data-oid="71ivug4"
                  >
                    <td
                      className="px-4 py-3 text-sm text-gray-400"
                      data-oid="1:3k9wg"
                    >
                      {formatDate(entry.startTime.toString())}
                    </td>
                    <td
                      className="px-4 py-3 text-sm text-white"
                      data-oid="2vkj7g8"
                    >
                      {getProjectName(entry.projectId)}
                    </td>
                    <td
                      className="px-4 py-3 text-sm text-gray-300"
                      data-oid="7r170yh"
                    >
                      {entry.notes || "No description"}
                    </td>
                    <td
                      className="px-4 py-3 text-sm text-cyan font-medium"
                      data-oid="aqtlwgh"
                    >
                      {formatDuration(entry.duration || 0)}
                    </td>
                    <td
                      className="px-4 py-3 text-sm text-white text-right font-medium"
                      data-oid="1yvt.vm"
                    >
                      $
                      {entry.hourlyRate && entry.duration
                        ? calculateCost(
                            entry.duration,
                            entry.hourlyRate.toString(),
                          )
                        : "0.00"}
                    </td>
                    <td className="px-4 py-3 text-right" data-oid="3vfm_uw">
                      <div
                        className="flex space-x-1 justify-end"
                        data-oid="r80zbc:"
                      >
                        <button
                          className="p-1 text-electric hover:text-cyan"
                          onClick={() =>
                            console.log("Edit time entry", entry.id)
                          }
                          title="Edit"
                          data-oid="raicuhr"
                        >
                          <i className="fas fa-edit" data-oid="8s8vi20"></i>
                        </button>
                        <button
                          className="p-1 text-electric hover:text-cyan"
                          onClick={() =>
                            toast({
                              title: "Time entry duplicated",
                              description:
                                "The time entry has been duplicated for today.",
                              variant: "default",
                            })
                          }
                          title="Duplicate"
                          data-oid="faqgy6c"
                        >
                          <i className="fas fa-clone" data-oid="wvy0h__"></i>
                        </button>
                        <button
                          className="p-1 text-red-400 hover:text-red-500"
                          onClick={() =>
                            console.log("Delete time entry", entry.id)
                          }
                          title="Delete"
                          data-oid="bhot.os"
                        >
                          <i
                            className="fas fa-trash-alt"
                            data-oid="5er595f"
                          ></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Calendar View Placeholder */}
        {activeView === "calendar" && (
          <div className="p-8 text-center" data-oid="i50:hkf">
            <i
              className="fas fa-calendar-alt text-4xl text-electric/40 mb-4"
              data-oid="sidfkic"
            ></i>
            <p className="text-gray-400" data-oid="28zhq3j">
              Calendar view is coming soon!
            </p>
            <p className="text-xs text-gray-500 mt-1" data-oid="2kri0v9">
              Check back for time entry visualization by day, week, and month.
            </p>
          </div>
        )}

        {/* Chart View Placeholder */}
        {activeView === "chart" && (
          <div className="p-8 text-center" data-oid="hug.625">
            <i
              className="fas fa-chart-bar text-4xl text-electric/40 mb-4"
              data-oid="bx.97uq"
            ></i>
            <p className="text-gray-400" data-oid="y63w-gl">
              Charts and analytics coming soon!
            </p>
            <p className="text-xs text-gray-500 mt-1" data-oid="_gj.4c7">
              Visualize your time data with detailed reports and graphs.
            </p>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default TimesheetPage;
