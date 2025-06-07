import { FC, useState, FormEvent } from "react";
import { useTimeEntries } from "@/hooks/useTimeEntries";
import { useProjects } from "@/hooks/useProjects";
import { toast } from "@/hooks/use-toast";
import { Project } from "@shared/schema";

interface TimeEntryFormProps {
  onClose: () => void;
}

const TimeEntryForm: FC<TimeEntryFormProps> = ({ onClose }) => {
  const { createTimeEntry, isCreating, durationToSeconds } = useTimeEntries();
  const { projects = [], isLoading: isLoadingProjects } = useProjects();

  // Explicitly type the projects array
  const typedProjects = projects as Project[];

  const [formData, setFormData] = useState({
    projectId: 1,
    date: new Date().toISOString().split("T")[0],
    duration: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
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
      startTime: startDate, // Send Date object directly
      endTime: endDate, // Send Date object directly
      duration: durationInSeconds,
      notes: formData.notes,
      hourlyRate: "65.00", // Default hourly rate
    };

    try {
      createTimeEntry(timeEntry);
    } catch (error) {
      console.error("Failed to create time entry:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your time entry.",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-space-900 rounded-lg p-4 mb-4"
      data-oid="mwv_ua-"
    >
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
        data-oid="bcscukx"
      >
        <div data-oid="l13:7v_">
          <label
            className="block text-xs text-gray-400 mb-1"
            data-oid="uez8grp"
          >
            Project
          </label>
          <select
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            className="w-full bg-space-800 border border-gray-700 rounded p-2 text-sm text-white"
            disabled={isLoadingProjects}
            data-oid="b82_5dy"
          >
            {isLoadingProjects ? (
              <option data-oid=":nux3jw">Loading projects...</option>
            ) : typedProjects.length > 0 ? (
              typedProjects.map((project: Project) => (
                <option key={project.id} value={project.id} data-oid="3_0l0e2">
                  {project.name}
                </option>
              ))
            ) : (
              <option disabled data-oid="un1y83q">
                No projects available
              </option>
            )}
          </select>
        </div>
        <div data-oid="uvaelm5">
          <label
            className="block text-xs text-gray-400 mb-1"
            data-oid="7bxnoug"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-space-800 border border-gray-700 rounded p-2 text-sm text-white"
            data-oid="10hh6v3"
          />
        </div>
        <div data-oid="lu:oqyy">
          <label
            className="block text-xs text-gray-400 mb-1"
            data-oid="2th3ljm"
          >
            Duration (HH:MM or HH:MM:SS)
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="HH:MM"
            className="w-full bg-space-800 border border-gray-700 rounded p-2 text-sm text-white"
            data-oid="edunfk."
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
        data-oid="sdv_z9z"
      ></textarea>

      <div className="flex space-x-2 justify-end" data-oid="ev:zfo2">
        <button
          type="button"
          onClick={onClose}
          className="bg-space-800 text-white px-4 py-2 rounded hover:bg-space-700"
          data-oid="5bbjjil"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isCreating}
          className="bg-purple-900 text-cyan px-4 py-2 rounded hover:bg-purple-800 btn-glow btn-glow-cyan"
          data-oid="ko2n95p"
        >
          {isCreating ? "Saving..." : "Add Time Entry"}
        </button>
      </div>
    </form>
  );
};

export default TimeEntryForm;
