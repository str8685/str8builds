import { FC, useState, useEffect } from "react";
import { useProjects } from "@/hooks/useProjects";
import { useClients } from "@/hooks/useClients";
import { Client } from "@shared/schema";
import { createPortal } from "react-dom";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProjectModal: FC<AddProjectModalProps> = ({ isOpen, onClose }) => {
  const { createProject, isCreating } = useProjects();
  const { clients = [], isLoading: isLoadingClients } = useClients();

  // Explicitly type the clients array
  const typedClients = clients as Client[];

  const [formData, setFormData] = useState({
    userId: 1, // Default user ID
    clientId: 0,
    name: "",
    description: "",
    location: "",
    progress: 0,
    status: "active",
    hourlyRate: "65.00",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
  });

  // Debug log when modal state changes
  useEffect(() => {
    console.log("AddProjectModal isOpen state changed to:", isOpen);
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format the data
    const projectData = {
      ...formData,
      // Convert string fields to proper types
      clientId: formData.clientId
        ? parseInt(formData.clientId.toString())
        : null,
      progress: parseInt(formData.progress.toString()),
      hourlyRate: formData.hourlyRate,
      startDate: formData.startDate ? new Date(formData.startDate) : undefined,
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
    };

    createProject(projectData);
    onClose(); // Close modal after submission
  };

  // If not open, don't render anything
  if (!isOpen) return null;

  // Create portal for the modal
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      data-oid="qlfe:w-"
    >
      {/* Backdrop with blur effect */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        data-oid="1:tjv3k"
      ></div>

      {/* Modal Content */}
      <div
        className="bg-gradient-to-b from-space-800 via-space-900 to-space-950 border-2 border-space-600/70 shadow-xl text-white max-w-lg relative overflow-hidden rounded-xl"
        style={{
          boxShadow:
            "0 0 40px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 0, 0, 0.5), inset 0 0 1px rgba(255, 255, 255, 0.1)",
          backgroundImage: `
            radial-gradient(circle at 10% 10%, rgba(59, 130, 246, 0.05), transparent 20%), 
            radial-gradient(circle at 90% 90%, rgba(14, 165, 233, 0.05), transparent 25%)
          `,
        }}
        data-oid=":eezvnb"
      >
        {/* Decorative elements */}
        <div
          className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-cyan/20 to-transparent rounded-full blur-2xl opacity-20 pointer-events-none"
          data-oid="sprkk_x"
        ></div>
        <div
          className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-purple-600/20 to-transparent rounded-full blur-2xl opacity-20 pointer-events-none"
          data-oid="19954bo"
        ></div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden opacity-[0.03] pointer-events-none"
          data-oid="-doel_5"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
            data-oid="9.63:l0"
          ></div>
        </div>

        {/* Header */}
        <div className="relative z-10 mb-2 p-6 pb-0" data-oid="nr4hdym">
          <div className="flex items-center mb-1" data-oid="p_2hrwh">
            <div
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan/20 to-purple-500/20 flex items-center justify-center mr-3 border border-space-600/50"
              data-oid="0v0gsa1"
            >
              <i className="fas fa-briefcase text-cyan" data-oid="2oj7iey"></i>
            </div>
            <h2
              className="text-xl font-space bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              data-oid=".xhh0oa"
            >
              Add New Project
            </h2>
          </div>
          <p className="text-gray-400 text-sm ml-11" data-oid="4wc:ph4">
            Create a new job to track time and expenses
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-4" data-oid="s5zutt2">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 relative z-10"
            data-oid="kw318f:"
          >
            <div className="md:col-span-2" data-oid="2t3o0r4">
              <label
                className="block text-xs text-cyan font-medium mb-1.5 uppercase tracking-wide"
                data-oid="ifxrb5w"
              >
                Project Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-space-800/90 border border-space-600/70 rounded-lg p-2.5 text-sm text-white shadow-inner focus:border-cyan focus:ring-1 focus:ring-cyan/30 focus:outline-none transition-colors duration-200"
                placeholder="Enter project name..."
                required
                data-oid="1bj1scz"
              />
            </div>

            <div className="md:col-span-2" data-oid="ifko_w5">
              <label
                className="block text-xs text-blue-400 font-medium mb-1.5 uppercase tracking-wide"
                data-oid="e9ri32q"
              >
                Client
              </label>
              <select
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                className="w-full bg-space-800/90 border border-space-600/70 rounded-lg p-2.5 text-sm text-white shadow-inner focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 focus:outline-none transition-colors duration-200"
                data-oid="lnxecr9"
              >
                <option value="0" data-oid="iyndhms">
                  -- Select Client --
                </option>
                {isLoadingClients ? (
                  <option disabled data-oid="2sjyig2">
                    Loading clients...
                  </option>
                ) : typedClients.length > 0 ? (
                  typedClients.map((client: Client) => (
                    <option
                      key={client.id}
                      value={client.id}
                      data-oid="1zw-rd4"
                    >
                      {client.name}
                    </option>
                  ))
                ) : (
                  <option disabled data-oid="3qi6ukv">
                    No clients available
                  </option>
                )}
              </select>
            </div>

            <div data-oid="0a5o51_">
              <label
                className="block text-xs text-purple-400 font-medium mb-1.5 uppercase tracking-wide"
                data-oid="-ualnfh"
              >
                Location
              </label>
              <div className="relative" data-oid="krs4p0s">
                <div
                  className="absolute left-2.5 top-2.5 text-purple-400/70"
                  data-oid="lr..515"
                >
                  <i className="fas fa-map-marker-alt" data-oid="s_f7keo"></i>
                </div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-space-800/90 border border-space-600/70 rounded-lg p-2.5 pl-9 text-sm text-white shadow-inner focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 focus:outline-none transition-colors duration-200"
                  placeholder="Project location..."
                  data-oid="owjf7_u"
                />
              </div>
            </div>

            <div data-oid="_:7zv8y">
              <label
                className="block text-xs text-green-400 font-medium mb-1.5 uppercase tracking-wide"
                data-oid="re69cpn"
              >
                Hourly Rate ($)
              </label>
              <div className="relative" data-oid="u:e1ixc">
                <div
                  className="absolute left-2.5 top-2.5 text-green-400/70"
                  data-oid="_rxd9.g"
                >
                  <i className="fas fa-dollar-sign" data-oid="7hvi.z."></i>
                </div>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  className="w-full bg-space-800/90 border border-space-600/70 rounded-lg p-2.5 pl-9 text-sm text-white shadow-inner focus:border-green-400 focus:ring-1 focus:ring-green-400/30 focus:outline-none transition-colors duration-200"
                  step="0.01"
                  min="0"
                  placeholder="65.00"
                  data-oid=":m:muex"
                />
              </div>
            </div>

            <div data-oid="y973e1_">
              <label
                className="block text-xs text-cyan font-medium mb-1.5 uppercase tracking-wide"
                data-oid="1scakq3"
              >
                Start Date
              </label>
              <div className="relative" data-oid="60bphe_">
                <div
                  className="absolute left-2.5 top-2.5 text-cyan/70"
                  data-oid="uafq1d7"
                >
                  <i className="fas fa-calendar-day" data-oid="b999gvr"></i>
                </div>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full bg-space-800/90 border border-space-600/70 rounded-lg p-2.5 pl-9 text-sm text-white shadow-inner focus:border-cyan focus:ring-1 focus:ring-cyan/30 focus:outline-none transition-colors duration-200"
                  data-oid=":7j0g.o"
                />
              </div>
            </div>

            <div data-oid="trg:yn_">
              <label
                className="block text-xs text-electric font-medium mb-1.5 uppercase tracking-wide"
                data-oid="na8ted3"
              >
                End Date{" "}
                <span className="text-gray-500 normal-case" data-oid="76tsuw2">
                  (Optional)
                </span>
              </label>
              <div className="relative" data-oid="99z5tbo">
                <div
                  className="absolute left-2.5 top-2.5 text-electric/70"
                  data-oid="i1q7x.0"
                >
                  <i className="fas fa-calendar-check" data-oid="k43asz7"></i>
                </div>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full bg-space-800/90 border border-space-600/70 rounded-lg p-2.5 pl-9 text-sm text-white shadow-inner focus:border-electric focus:ring-1 focus:ring-electric/30 focus:outline-none transition-colors duration-200"
                  data-oid="8khtb8_"
                />
              </div>
            </div>

            <div className="md:col-span-2 mt-2" data-oid="fyg9ndq">
              <div
                className="flex justify-between items-center mb-1.5"
                data-oid="32yh0hq"
              >
                <label
                  className="block text-xs text-purple-400 font-medium uppercase tracking-wide"
                  data-oid="t2.4kl_"
                >
                  Progress
                </label>
                <span
                  className="text-sm font-medium px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400"
                  data-oid="c3lz7:s"
                >
                  {formData.progress}%
                </span>
              </div>
              <div className="relative" data-oid="_n40ed0">
                <input
                  type="range"
                  name="progress"
                  value={formData.progress}
                  onChange={handleChange}
                  className="w-full h-2 bg-space-800/90 rounded-lg appearance-none cursor-pointer accent-purple-500 opacity-80 hover:opacity-100 transition-opacity"
                  min="0"
                  max="100"
                  step="5"
                  data-oid="f1blld:"
                />

                <div
                  className="absolute left-0 bottom-0 h-2 bg-gradient-to-r from-purple-500 to-cyan rounded-lg"
                  style={{ width: `${formData.progress}%` }}
                  data-oid="9vpd8mv"
                ></div>
              </div>
              <div
                className="flex justify-between text-xs text-gray-500 mt-1.5"
                data-oid="jmywdn6"
              >
                <span data-oid="c_j8y7a">Not Started</span>
                <span data-oid="0ww-k4y">In Progress</span>
                <span data-oid="fwgec6a">Complete</span>
              </div>
            </div>

            <div className="md:col-span-2" data-oid="1havykd">
              <label
                className="block text-xs text-gray-300 font-medium mb-1.5 uppercase tracking-wide"
                data-oid="yih92vt"
              >
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-space-800/90 border border-space-600/70 rounded-lg p-3 text-sm text-white shadow-inner focus:border-gray-400 focus:ring-1 focus:ring-gray-400/30 focus:outline-none transition-colors duration-200"
                rows={3}
                placeholder="Describe the project and scope of work..."
                data-oid="06_vquq"
              ></textarea>
            </div>
          </div>

          <div
            className="relative z-10 border-t border-space-700/50 pt-4 mt-2 flex justify-end"
            data-oid="2fzqmpc"
          >
            <div className="flex space-x-3" data-oid="kxh5g54">
              <button
                type="button"
                onClick={onClose}
                className="bg-space-800 text-white px-5 py-2.5 rounded-lg hover:bg-space-700 border border-space-600/50 transition-colors duration-200"
                data-oid="sk_amdv"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="bg-gradient-to-r from-cyan to-purple-600 text-white font-medium px-5 py-2.5 rounded-lg shadow-glow-md hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center min-w-32"
                data-oid="x65b9mj"
              >
                {isCreating ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      data-oid="6.0zdo:"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        data-oid="uey-5n5"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        data-oid="t20_s12"
                      ></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-plus mr-2" data-oid="78rff5x"></i>{" "}
                    Create Project
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default AddProjectModal;
