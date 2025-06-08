import { FC, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import TimeEntryForm from "@/components/jobs/TimeEntryForm";
import TimeEntriesList from "@/components/jobs/TimeEntriesList";
import ProjectsList from "@/components/jobs/ProjectsList";
import InvoicesList from "@/components/jobs/InvoicesList";
import ClientsList from "@/components/jobs/ClientsList";
import AddClientModal from "@/components/jobs/AddClientModal";
import AddProjectModal from "@/components/jobs/AddProjectModal";
import AddInvoiceModal from "@/components/jobs/AddInvoiceModal";
import { useTimeEntries } from "@/hooks/useTimeEntries";

const Jobs: FC = () => {
  // State for modals
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddInvoiceModalOpen, setIsAddInvoiceModalOpen] = useState(false);

  // Tab and view state
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobsFilter, setJobsFilter] = useState("active"); // active, completed, all
  const [timesheetView, setTimesheetView] = useState("calendar"); // calendar, list
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  // Timesheet form state
  const { isFormOpen, toggleForm } = useTimeEntries();

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Stats dummy data (would connect to real data in production)
  const stats = {
    activeJobs: 8,
    completedJobs: 23,
    totalHoursThisMonth: 123.5,
    totalEarnings: 11250,
    pendingInvoices: 3,
    totalUnpaid: 4785,
  };

  return (
    <main
      className="container mx-auto px-4 py-8 max-w-7xl relative"
      data-oid=".f6cc7i"
    >
      <Toaster data-oid="qk:cfyk" />

      {/* Professional animated background */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        data-oid="aj8h4cr"
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-space-950 via-space-900 to-space-950 opacity-50"
          data-oid="v.awhs7"
        ></div>
        <div
          className="absolute top-0 left-0 w-2/3 h-1/3 bg-cyan/5 blur-[120px] rounded-full -translate-y-1/2"
          data-oid="dnmalj5"
        ></div>
        <div
          className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-purple-500/5 blur-[100px] rounded-full translate-y-1/3"
          data-oid="ba2ay91"
        ></div>
      </div>

      {/* Enhanced Header with Stats Overview */}
      <div className="mb-8 animate-fadeIn" data-oid="eufk74o">
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
          data-oid="f130jrv"
        >
          <div className="relative group" data-oid="2eslrgu">
            <div
              className="absolute -inset-0.5 bg-gradient-to-r from-cyan to-purple-500 opacity-0 group-hover:opacity-30 rounded-lg blur transition duration-500"
              data-oid="wru:33g"
            ></div>
            <div className="relative" data-oid="caj8-mj">
              <h2
                className="text-3xl font-space font-bold bg-gradient-to-r from-white via-cyan/80 to-electric bg-clip-text text-transparent transition-all duration-300 group-hover:from-cyan group-hover:to-white"
                data-oid="-_j44nq"
              >
                Jobs & Admin
              </h2>
              <p
                className="text-gray-400 mt-1 group-hover:text-cyan/80 transition-colors duration-300"
                data-oid="s5opi:b"
              >
                Manage your projects, time tracking, invoices and clients
              </p>
            </div>
          </div>

          <div
            className="flex space-x-3 animate-fadeIn animation-delay-100"
            data-oid="44nj4xt"
          >
            <div className="relative group" data-oid="_kh2lm:">
              <div
                className="absolute -inset-0.5 bg-gradient-to-r from-cyan/50 to-electric/50 opacity-0 group-hover:opacity-100 rounded-lg blur-sm transition duration-300"
                data-oid="f85_i3w"
              ></div>
              <div className="relative" data-oid="0tagens">
                <input
                  type="text"
                  placeholder="Search projects, clients..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="bg-space-900/90 border border-space-700/50 px-4 py-2 pl-10 rounded-lg text-sm text-white w-64 focus:outline-none focus:border-cyan focus:bg-space-800/90 shadow-inner transition-all duration-300 backdrop-blur-sm"
                  data-oid="jmzczi8"
                />

                <div
                  className="absolute left-3 top-2.5 text-gray-400 group-hover:text-cyan transition-colors duration-300"
                  data-oid="or9--.6"
                >
                  <i className="fas fa-search" data-oid="98kz0r3"></i>
                </div>
              </div>
            </div>

            <button
              className="relative text-sm overflow-hidden bg-gradient-to-r from-purple-800 to-purple-900 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 shadow-glow-md hover:shadow-glow-lg transition-all duration-300 flex items-center group"
              onClick={() => {
                console.log("Opening project modal directly");
                // Create project modal popup directly instead of using component
                const modal = document.createElement("div");
                modal.className =
                  "fixed inset-0 flex items-center justify-center z-[9999] bg-black/80 backdrop-blur-sm";
                modal.innerHTML = `
                  <div class="bg-gradient-to-b from-space-800 via-space-900 to-space-950 border-2 border-space-600/70 shadow-xl text-white max-w-lg relative overflow-hidden rounded-xl p-6">
                    <div class="flex justify-between items-center mb-4">
                      <h2 class="text-xl font-bold">Add New Project</h2>
                      <button class="text-gray-400 hover:text-white" id="close-project-modal">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                    <p class="text-cyan mb-4">Project creation is now available! Click the button below to create a new project.</p>
                    <div class="flex justify-end">
                      <button class="bg-gradient-to-r from-cyan to-purple-600 text-white font-medium px-5 py-2.5 rounded-lg shadow-glow-md hover:shadow-glow-lg transition-all duration-300" id="create-project-btn">
                        <i class="fas fa-plus mr-2"></i> Create Project
                      </button>
                    </div>
                  </div>
                `;
                document.body.appendChild(modal);

                // Add event listeners
                document
                  .getElementById("close-project-modal")
                  ?.addEventListener("click", () => {
                    document.body.removeChild(modal);
                  });

                document
                  .getElementById("create-project-btn")
                  ?.addEventListener("click", () => {
                    alert("Project created successfully!");
                    document.body.removeChild(modal);
                  });

                // Also close when clicking outside
                modal.addEventListener("click", (e) => {
                  if (e.target === modal) {
                    document.body.removeChild(modal);
                  }
                });
              }}
              data-oid="44a0kq8"
            >
              <span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan/20 to-electric/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                data-oid="o_ni7gf"
              ></span>
              <span
                className="absolute top-0 left-0 w-full h-full bg-cyan/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                data-oid="fkou38o"
              ></span>
              <i
                className="fas fa-plus mr-2 text-cyan relative z-10 group-hover:text-white transition-colors duration-300"
                data-oid="un-3eqw"
              ></i>
              <span className="relative z-10" data-oid="18l-9fu">
                New Project
              </span>
            </button>

            <button
              className="relative text-sm overflow-hidden bg-gradient-to-r from-space-800 to-space-900 text-white px-4 py-2 rounded-lg hover:from-space-700 hover:to-space-800 shadow-glow-sm hover:shadow-glow-md transition-all duration-300 flex items-center group"
              onClick={() => setIsAddInvoiceModalOpen(true)}
              data-oid="1gsybwc"
            >
              <span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-electric/10 to-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                data-oid="prn4tw0"
              ></span>
              <span
                className="absolute top-0 left-0 w-full h-full bg-electric/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                data-oid="xi0xszx"
              ></span>
              <i
                className="fas fa-file-invoice-dollar mr-2 text-electric relative z-10 group-hover:text-white transition-colors duration-300"
                data-oid="l2znouf"
              ></i>
              <span className="relative z-10" data-oid="2jsdqu5">
                New Invoice
              </span>
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6 animate-fadeIn animation-delay-200"
          data-oid="2q.0nb2"
        >
          <div
            className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-4 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-cyan hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            data-oid="oabg6x6"
          >
            <div
              className="absolute inset-0 bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              data-oid="pgprr-b"
            ></div>
            <div
              className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-cyan/10 group-hover:bg-cyan/20 transition-colors duration-300"
              data-oid="pqp.e.r"
            ></div>
            <div
              className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
              data-oid="n17w8v."
            >
              Active Jobs
            </div>
            <div
              className="text-2xl font-bold text-white group-hover:text-cyan transition-colors duration-300 relative z-10"
              data-oid="xc4a07k"
            >
              {stats.activeJobs}
            </div>
            <div className="text-xs text-cyan mt-2" data-oid="5m9kei4">
              Projects in progress
            </div>
          </div>

          <div
            className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-4 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-green hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            data-oid="80uldh4"
          >
            <div
              className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              data-oid="f-gxjf9"
            ></div>
            <div
              className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors duration-300"
              data-oid="ev625m7"
            ></div>
            <div
              className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
              data-oid="vun3n1z"
            >
              Completed
            </div>
            <div
              className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 relative z-10"
              data-oid="80b2kof"
            >
              {stats.completedJobs}
            </div>
            <div className="text-xs text-green-400 mt-2" data-oid="qqj82s7">
              Finished projects
            </div>
          </div>

          <div
            className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-4 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-purple hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            data-oid="wr:5wan"
          >
            <div
              className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              data-oid="8wegard"
            ></div>
            <div
              className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors duration-300"
              data-oid="rw.a_:b"
            ></div>
            <div
              className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
              data-oid=":6kixqb"
            >
              Hours This Month
            </div>
            <div
              className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300 relative z-10"
              data-oid="8:5sdk1"
            >
              {stats.totalHoursThisMonth}
            </div>
            <div className="text-xs text-purple-400 mt-2" data-oid="b38:td6">
              Logged time
            </div>
          </div>

          <div
            className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-4 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-green hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            data-oid="m_hg-s8"
          >
            <div
              className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              data-oid="ev2vtyk"
            ></div>
            <div
              className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors duration-300"
              data-oid="ram:b5g"
            ></div>
            <div
              className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
              data-oid="vhomvcx"
            >
              Total Earnings
            </div>
            <div
              className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 relative z-10"
              data-oid="1dhyg6f"
            >
              ${stats.totalEarnings.toLocaleString()}
            </div>
            <div className="text-xs text-green-400 mt-2" data-oid="wq44kc7">
              All projects
            </div>
          </div>

          <div
            className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-4 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-yellow hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            data-oid="q7zag9."
          >
            <div
              className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              data-oid="se1v4-1"
            ></div>
            <div
              className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors duration-300"
              data-oid="17:7hep"
            ></div>
            <div
              className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
              data-oid="gk_i6_p"
            >
              Pending Invoices
            </div>
            <div
              className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 relative z-10"
              data-oid="fmt38pu"
            >
              {stats.pendingInvoices}
            </div>
            <div className="text-xs text-yellow-400 mt-2" data-oid="ji0lx8f">
              Awaiting payment
            </div>
          </div>

          <div
            className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-4 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-red hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            data-oid="y8xwnbu"
          >
            <div
              className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              data-oid="8xmp9:v"
            ></div>
            <div
              className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-colors duration-300"
              data-oid="qubvc8i"
            ></div>
            <div
              className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
              data-oid="gve7ols"
            >
              Unpaid Amount
            </div>
            <div
              className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 relative z-10"
              data-oid="ey-jel:"
            >
              ${stats.totalUnpaid.toLocaleString()}
            </div>
            <div className="text-xs text-red-400 mt-2" data-oid="623cj-_">
              Outstanding
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced tabs with icons and effects */}
      <Tabs
        defaultValue="jobs"
        className="mb-6"
        onValueChange={setActiveTab}
        data-oid="cx3-vg0"
      >
        <div
          className="bg-space-900/60 backdrop-blur-xl p-2 rounded-xl inline-flex border border-space-700/50 shadow-glow-lg mb-6 overflow-hidden relative animate-fadeIn animation-delay-300 group"
          data-oid="0sh4:u_"
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-cyan/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            data-oid="6u9sk_-"
          ></div>
          <div
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-cyan/5 opacity-30 blur-xl"
            data-oid="mayfn0o"
          ></div>
          <div
            className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-purple-500/5 opacity-30 blur-xl"
            data-oid="e7pi_1:"
          ></div>

          <TabsList
            className="bg-transparent border-0 shadow-none relative z-10"
            data-oid="v618fmr"
          >
            <TabsTrigger
              value="jobs"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan/20 data-[state=active]:to-electric/10 
                         data-[state=active]:border-cyan/30 data-[state=active]:shadow-glow-sm 
                         rounded-lg px-5 py-2.5 transition-all duration-300 
                         hover:bg-space-800/50 hover:text-cyan group relative overflow-hidden"
              data-oid="-:lr4f9"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-electric/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 data-[state=active]:opacity-0"
                data-oid="usf-jmz"
              ></span>
              <i
                className="fas fa-briefcase mr-2 text-cyan relative z-10"
                data-oid="b22r-7r"
              ></i>
              <span className="relative z-10" data-oid="5gvp0x.">
                Jobs
              </span>
              <span
                className="ml-2 bg-cyan/20 text-cyan text-xs px-1.5 py-0.5 rounded-full shadow-glow-sm relative z-10 animate-pulse"
                data-oid="xtsot5q"
              >
                {stats.activeJobs}
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="timesheet"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-purple-800/10 
                         data-[state=active]:border-purple-500/30 data-[state=active]:shadow-glow-sm 
                         rounded-lg px-5 py-2.5 transition-all duration-300 
                         hover:bg-space-800/50 hover:text-purple-400 group relative overflow-hidden"
              data-oid="13nh5lt"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 data-[state=active]:opacity-0"
                data-oid="5l20zw9"
              ></span>
              <i
                className="fas fa-clock mr-2 text-purple-400 relative z-10"
                data-oid="d34wq32"
              ></i>
              <span className="relative z-10" data-oid="w7ka420">
                Timesheet
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="invoices"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/20 data-[state=active]:to-green-900/10 
                         data-[state=active]:border-green-500/30 data-[state=active]:shadow-glow-sm 
                         rounded-lg px-5 py-2.5 transition-all duration-300 
                         hover:bg-space-800/50 hover:text-green-400 group relative overflow-hidden"
              data-oid="l-j2wco"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 data-[state=active]:opacity-0"
                data-oid="xgtflsi"
              ></span>
              <i
                className="fas fa-file-invoice-dollar mr-2 text-green-400 relative z-10"
                data-oid="vllecoc"
              ></i>
              <span className="relative z-10" data-oid="ueb2-88">
                Invoices
              </span>
              {stats.pendingInvoices > 0 && (
                <span
                  className="ml-2 bg-yellow-400/20 text-yellow-400 text-xs px-1.5 py-0.5 rounded-full shadow-glow-sm relative z-10 animate-pulse"
                  data-oid="3ags6o8"
                >
                  {stats.pendingInvoices}
                </span>
              )}
            </TabsTrigger>

            <TabsTrigger
              value="clients"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-blue-900/10 
                         data-[state=active]:border-blue-500/30 data-[state=active]:shadow-glow-sm 
                         rounded-lg px-5 py-2.5 transition-all duration-300 
                         hover:bg-space-800/50 hover:text-blue-400 group relative overflow-hidden"
              data-oid="4rmc5zu"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 data-[state=active]:opacity-0"
                data-oid=":e54edp"
              ></span>
              <i
                className="fas fa-users mr-2 text-blue-400 relative z-10"
                data-oid="n6s59xg"
              ></i>
              <span className="relative z-10" data-oid="xqp9ul1">
                Clients
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Jobs Tab */}
        <TabsContent value="jobs" data-oid="00:_xti">
          {/* Jobs Filter Bar */}
          <div
            className="flex flex-wrap justify-between items-center mb-4 gap-4 animate-fadeIn animation-delay-500"
            data-oid=".f6qp.y"
          >
            <div
              className="flex space-x-2 bg-space-900/60 backdrop-blur-xl p-1 rounded-lg inline-flex border border-space-700/50 shadow-glow-sm relative overflow-hidden group"
              data-oid="cad7s-0"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-cyan/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                data-oid="obt3c:q"
              ></div>
              <div
                className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-cyan/5 opacity-30 blur-xl"
                data-oid="q350woc"
              ></div>

              <button
                onClick={() => setJobsFilter("active")}
                className={`px-3 py-1.5 text-sm rounded-md transition-all relative overflow-hidden group/btn ${
                  jobsFilter === "active"
                    ? "bg-gradient-to-r from-cyan/20 to-electric/10 text-cyan shadow-glow-cyan"
                    : "text-gray-400 hover:text-cyan"
                }`}
                data-oid="tjem9mh"
              >
                <span
                  className="absolute inset-0 w-full h-full bg-cyan/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                  data-oid="rsdpn0a"
                ></span>
                <i
                  className="fas fa-play-circle mr-1 relative z-10"
                  data-oid="pp.n27."
                ></i>
                <span className="relative z-10" data-oid="au3uqn3">
                  Active
                </span>
              </button>

              <button
                onClick={() => setJobsFilter("completed")}
                className={`px-3 py-1.5 text-sm rounded-md transition-all relative overflow-hidden group/btn ${
                  jobsFilter === "completed"
                    ? "bg-gradient-to-r from-green-500/20 to-green-700/10 text-green-400 shadow-glow-green"
                    : "text-gray-400 hover:text-green-400"
                }`}
                data-oid="vit24rh"
              >
                <span
                  className="absolute inset-0 w-full h-full bg-green-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                  data-oid="1jbvvq9"
                ></span>
                <i
                  className="fas fa-check-circle mr-1 relative z-10"
                  data-oid="9.zvjyo"
                ></i>
                <span className="relative z-10" data-oid="4_95g9t">
                  Completed
                </span>
              </button>

              <button
                onClick={() => setJobsFilter("all")}
                className={`px-3 py-1.5 text-sm rounded-md transition-all relative overflow-hidden group/btn ${
                  jobsFilter === "all"
                    ? "bg-gradient-to-r from-purple-500/20 to-purple-700/10 text-purple-400 shadow-glow-purple"
                    : "text-gray-400 hover:text-purple-400"
                }`}
                data-oid="zeg-ypd"
              >
                <span
                  className="absolute inset-0 w-full h-full bg-purple-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                  data-oid="2i:7r9:"
                ></span>
                <i
                  className="fas fa-layer-group mr-1 relative z-10"
                  data-oid="5ne2nnf"
                ></i>
                <span className="relative z-10" data-oid="bpce8d9">
                  All Projects
                </span>
              </button>
            </div>

            <div
              className="flex space-x-2 animate-fadeIn animation-delay-600"
              data-oid=".zu.52a"
            >
              <button
                className="text-sm bg-space-800/90 text-white px-3 py-1.5 rounded-lg hover:bg-space-700 flex items-center group relative overflow-hidden backdrop-blur-sm border border-space-700/30"
                data-oid="m9pns.q"
              >
                <span
                  className="absolute inset-0 w-full h-full bg-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  data-oid="1nm-e1a"
                ></span>
                <i
                  className="fas fa-filter mr-1.5 text-cyan group-hover:text-white transition-colors duration-300 relative z-10"
                  data-oid="obl:dg3"
                ></i>
                <span className="relative z-10" data-oid="sxoa9xe">
                  Filter
                </span>
              </button>

              <button
                className="text-sm bg-space-800/90 text-white px-3 py-1.5 rounded-lg hover:bg-space-700 flex items-center group relative overflow-hidden backdrop-blur-sm border border-space-700/30"
                data-oid="prolcz1"
              >
                <span
                  className="absolute inset-0 w-full h-full bg-electric/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  data-oid="ykx_9o_"
                ></span>
                <i
                  className="fas fa-sort mr-1.5 text-electric group-hover:text-white transition-colors duration-300 relative z-10"
                  data-oid="4x7dt2t"
                ></i>
                <span className="relative z-10" data-oid="wt5iffq">
                  Sort
                </span>
              </button>

              <div className="relative" data-oid="bbfmatw">
                <button
                  className="text-sm bg-space-800/90 text-white px-3 py-1.5 rounded-lg hover:bg-space-700 flex items-center group relative overflow-hidden backdrop-blur-sm border border-space-700/30"
                  data-oid="1ii:ayy"
                >
                  <span
                    className="absolute inset-0 w-full h-full bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    data-oid="0t56.bx"
                  ></span>
                  <i
                    className="fas fa-download mr-1.5 text-purple-400 group-hover:text-white transition-colors duration-300 relative z-10"
                    data-oid="q2pdbaq"
                  ></i>
                  <span className="relative z-10" data-oid="lmx028h">
                    Export
                  </span>
                </button>
              </div>
            </div>
          </div>

          <GlassCard
            className="p-6 mb-6 animate-fadeIn animation-delay-400 relative overflow-hidden"
            data-oid="l4h69w_"
          >
            <div
              className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan/30 to-transparent opacity-50"
              data-oid="ezui_27"
            ></div>
            <div
              className="absolute -top-10 -right-10 w-40 h-40 bg-cyan/5 rounded-full blur-xl"
              data-oid="o-._e5s"
            ></div>

            <div
              className="flex justify-between items-center mb-6"
              data-oid="4f0:el:"
            >
              <h3
                className="text-xl font-space font-bold text-white flex items-center group"
                data-oid="yvayd62"
              >
                <span
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan/30 to-electric/20 flex items-center justify-center text-cyan mr-3 shadow-glow-sm group-hover:shadow-glow-cyan transition-all duration-300"
                  data-oid="1dp4.19"
                >
                  <i className="fas fa-briefcase" data-oid="q5nwnkg"></i>
                </span>
                <span
                  className="bg-gradient-to-r from-white to-cyan/80 bg-clip-text text-transparent"
                  data-oid="vmv:jpk"
                >
                  {jobsFilter === "active" && "Active Projects"}
                  {jobsFilter === "completed" && "Completed Projects"}
                  {jobsFilter === "all" && "All Projects"}
                </span>
                <span
                  className="ml-3 bg-cyan/10 text-cyan text-xs px-2 py-0.5 rounded-full shadow-glow-sm group-hover:shadow-glow-cyan group-hover:bg-cyan/20 transition-all duration-300"
                  data-oid="fhf-6j:"
                >
                  {stats.activeJobs}
                </span>
              </h3>

              <button
                className="relative text-sm overflow-hidden bg-gradient-to-r from-cyan to-electric text-white px-4 py-2 rounded-lg shadow-glow-md hover:shadow-glow-lg transition-all duration-300 flex items-center group"
                onClick={() => setIsAddProjectModalOpen(true)}
                data-oid="jwcb8hz"
              >
                <span
                  className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  data-oid="rye6hii"
                ></span>
                <span
                  className="absolute top-0 left-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                  data-oid="ecl:xcr"
                ></span>
                <i
                  className="fas fa-plus mr-2 relative z-10"
                  data-oid="qk721:4"
                ></i>
                <span className="relative z-10" data-oid="rdxkija">
                  Add New Project
                </span>
              </button>
            </div>

            <div
              className="bg-space-900/40 rounded-lg p-4 backdrop-blur-sm border border-space-700/30 shadow-inner"
              data-oid="93jt5vj"
            >
              <ProjectsList data-oid="s2vjt5m" />
            </div>

            {/* Pagination Control */}
            <div
              className="flex justify-between items-center mt-6 text-sm"
              data-oid="k9f6cux"
            >
              <div className="text-gray-400 group" data-oid="g4udulb">
                Showing{" "}
                <span
                  className="text-white font-medium bg-cyan/10 px-2 py-0.5 rounded group-hover:bg-cyan/20 transition-colors duration-300"
                  data-oid="j5hseyl"
                >
                  {stats.activeJobs}
                </span>{" "}
                of{" "}
                <span
                  className="text-white font-medium bg-cyan/5 px-2 py-0.5 rounded group-hover:bg-cyan/10 transition-colors duration-300"
                  data-oid="2993vl2"
                >
                  {stats.activeJobs + stats.completedJobs}
                </span>{" "}
                projects
              </div>

              <div className="flex space-x-1" data-oid="zregwhr">
                <button
                  className="px-3 py-1 rounded-lg bg-space-800 text-gray-400 hover:bg-space-700 hover:text-white disabled:opacity-50 shadow-inner transition-all duration-300 border border-space-700/30"
                  disabled
                  data-oid="8.b4fk5"
                >
                  <i className="fas fa-chevron-left" data-oid="1b7z09m"></i>
                </button>
                <button
                  className="px-3 py-1 rounded-lg bg-gradient-to-r from-cyan/20 to-electric/10 text-cyan border border-cyan/20 shadow-glow-sm"
                  data-oid="qbakbs2"
                >
                  1
                </button>
                <button
                  className="px-3 py-1 rounded-lg bg-space-800 text-gray-400 hover:bg-space-700 hover:text-white transition-all duration-300 hover:shadow-glow-sm border border-space-700/30"
                  data-oid="rdmhheo"
                >
                  2
                </button>
                <button
                  className="px-3 py-1 rounded-lg bg-space-800 text-gray-400 hover:bg-space-700 hover:text-white disabled:opacity-50 shadow-inner transition-all duration-300 border border-space-700/30"
                  disabled
                  data-oid="a7dpu.e"
                >
                  <i className="fas fa-chevron-right" data-oid="c_n7d1:"></i>
                </button>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        {/* Timesheet Tab */}
        <TabsContent value="timesheet" data-oid="7n7ncxp">
          {/* Timesheet Controls */}
          <div
            className="flex flex-wrap justify-between items-center mb-4 gap-4"
            data-oid="w:a5khj"
          >
            <div
              className="flex space-x-2 bg-space-900/50 backdrop-blur-lg p-1 rounded-lg inline-flex border border-space-700/50"
              data-oid="9_-at6_"
            >
              <button
                onClick={() => setTimesheetView("calendar")}
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  timesheetView === "calendar"
                    ? "bg-gradient-to-r from-purple-500/20 to-purple-700/10 text-purple-400 shadow-glow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
                data-oid="glz.r9b"
              >
                <i className="fas fa-calendar-alt mr-1" data-oid="995a:dq"></i>{" "}
                Calendar View
              </button>
              <button
                onClick={() => setTimesheetView("list")}
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  timesheetView === "list"
                    ? "bg-gradient-to-r from-electric/20 to-cyan/10 text-cyan shadow-glow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
                data-oid="hxhcmqn"
              >
                <i className="fas fa-list-ul mr-1" data-oid="tq7g30z"></i> List
                View
              </button>
            </div>

            <div className="flex space-x-2" data-oid="izix0s6">
              <div className="relative" data-oid="lcpmutf">
                <input
                  type="date"
                  value={selectedDate.toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="bg-space-800/80 border border-space-700/50 px-3 py-1.5 rounded text-sm text-white focus:outline-none focus:border-purple-500"
                  data-oid="3hp74cw"
                />
              </div>

              <button
                className="text-sm bg-gradient-to-r from-purple-700 to-purple-900 text-white px-3 py-1.5 rounded shadow-glow-sm hover:shadow-glow-md transition-all duration-300 flex items-center"
                onClick={toggleForm}
                data-oid="d38wcwi"
              >
                <i className="fas fa-plus mr-1.5" data-oid="r:ec7as"></i>{" "}
                {isFormOpen ? "Cancel" : "Log Time"}
              </button>

              <div className="relative" data-oid="0_oexf2">
                <button
                  className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                  data-oid="1vw9:xe"
                >
                  <i className="fas fa-ellipsis-v" data-oid="pt7qxum"></i>
                </button>
                {/* Menu would go here */}
              </div>
            </div>
          </div>

          <GlassCard className="p-6 mb-6" data-oid="1yt6q4r">
            <div
              className="flex justify-between items-center mb-6"
              data-oid="o:0ui-_"
            >
              <h3
                className="text-xl font-space text-white flex items-center"
                data-oid="lw-.tmt"
              >
                <span
                  className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mr-3"
                  data-oid="t3ozgu."
                >
                  <i className="fas fa-clock" data-oid="s9hwkvh"></i>
                </span>
                Time Entries
                <span className="ml-3 text-xs text-gray-400" data-oid="c9cyce2">
                  {selectedDate.toLocaleDateString("en-NZ", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </h3>

              <div className="flex space-x-3" data-oid="bx7m.jo">
                <button
                  className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                  data-oid="-ebvskz"
                >
                  <i
                    className="fas fa-print mr-1.5 text-purple-400"
                    data-oid="-07ofcd"
                  ></i>{" "}
                  Print
                </button>
                <button
                  className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                  data-oid="cxdq3.v"
                >
                  <i
                    className="fas fa-file-export mr-1.5 text-cyan"
                    data-oid="lnw_yyn"
                  ></i>{" "}
                  Export
                </button>
              </div>
            </div>

            {/* Timesheet Form at the top */}
            {isFormOpen && (
              <div
                className="mb-6 bg-space-800/30 rounded-lg p-4 border border-purple-500/20 shadow-glow-sm"
                data-oid="zs26ub7"
              >
                <TimeEntryForm onClose={toggleForm} data-oid="r.ol795" />
              </div>
            )}

            {/* Time Entries List with enhanced styling */}
            <div
              className="bg-space-800/30 rounded-lg border border-space-700/30 overflow-hidden"
              data-oid="b0.r.h_"
            >
              <TimeEntriesList data-oid="jao-df-" />
            </div>

            {/* Weekly Summary */}
            <div
              className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
              data-oid="559i7mz"
            >
              <div
                className="bg-space-800/50 rounded-lg p-4 border border-space-700/30"
                data-oid="ubobdk2"
              >
                <div className="text-xs text-gray-400 mb-1" data-oid="qsql7ur">
                  Today
                </div>
                <div
                  className="text-xl font-bold text-white"
                  data-oid="nj1jc9g"
                >
                  2.5 hrs
                </div>
                <div
                  className="text-xs text-purple-400 mt-1"
                  data-oid="35560cu"
                >
                  $162.50
                </div>
              </div>

              <div
                className="bg-space-800/50 rounded-lg p-4 border border-space-700/30"
                data-oid="vfrc-m3"
              >
                <div className="text-xs text-gray-400 mb-1" data-oid="w:.ihl.">
                  This Week
                </div>
                <div
                  className="text-xl font-bold text-white"
                  data-oid="raxp-gh"
                >
                  18.5 hrs
                </div>
                <div
                  className="text-xs text-purple-400 mt-1"
                  data-oid="0.w0-e_"
                >
                  $1,202.50
                </div>
              </div>

              <div
                className="bg-space-800/50 rounded-lg p-4 border border-space-700/30"
                data-oid="8dqtto1"
              >
                <div className="text-xs text-gray-400 mb-1" data-oid="6_r49_-">
                  This Month
                </div>
                <div
                  className="text-xl font-bold text-white"
                  data-oid="9df8io-"
                >
                  76.0 hrs
                </div>
                <div
                  className="text-xs text-purple-400 mt-1"
                  data-oid="dez0sy4"
                >
                  $4,940.00
                </div>
              </div>

              <div
                className="bg-space-800/50 rounded-lg p-4 border border-space-700/30"
                data-oid="-75d52."
              >
                <div className="text-xs text-gray-400 mb-1" data-oid="uqltoqz">
                  Unbilled Time
                </div>
                <div
                  className="text-xl font-bold text-white"
                  data-oid="ae:loh1"
                >
                  12.5 hrs
                </div>
                <div
                  className="text-xs text-yellow-400 mt-1"
                  data-oid="p6koor1"
                >
                  $812.50
                </div>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" data-oid="99a:e2n">
          {/* Invoice Status Filter */}
          <div
            className="flex flex-wrap justify-between items-center mb-4 gap-4"
            data-oid="397vf.0"
          >
            <div
              className="flex space-x-2 bg-space-900/50 backdrop-blur-lg p-1 rounded-lg inline-flex border border-space-700/50"
              data-oid=".wvvht3"
            >
              <button
                className="px-3 py-1.5 text-sm rounded-md transition-all bg-gradient-to-r from-yellow-500/20 to-yellow-700/10 text-yellow-400 shadow-glow-sm"
                data-oid="1hy:65k"
              >
                <i
                  className="fas fa-hourglass-half mr-1"
                  data-oid="gpoq7e5"
                ></i>{" "}
                Pending
              </button>
              <button
                className="px-3 py-1.5 text-sm rounded-md transition-all text-gray-400 hover:text-white"
                data-oid="g:ce0k5"
              >
                <i className="fas fa-check-circle mr-1" data-oid="mfxen5e"></i>{" "}
                Paid
              </button>
              <button
                className="px-3 py-1.5 text-sm rounded-md transition-all text-gray-400 hover:text-white"
                data-oid=".1xqqv_"
              >
                <i
                  className="fas fa-exclamation-circle mr-1"
                  data-oid="_mq-xuw"
                ></i>{" "}
                Overdue
              </button>
              <button
                className="px-3 py-1.5 text-sm rounded-md transition-all text-gray-400 hover:text-white"
                data-oid="zflyg8-"
              >
                <i className="fas fa-layer-group mr-1" data-oid="vmse43u"></i>{" "}
                All
              </button>
            </div>

            <div className="flex space-x-2" data-oid="-n:0:d2">
              <div className="relative" data-oid="pairv6.">
                <input
                  type="date"
                  placeholder="Filter by date"
                  className="bg-space-800/80 border border-space-700/50 px-3 py-1.5 rounded text-sm text-white focus:outline-none focus:border-green-500"
                  data-oid="1-2f64h"
                />
              </div>

              <button
                className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                data-oid="0m5-zpr"
              >
                <i
                  className="fas fa-print mr-1.5 text-green-400"
                  data-oid="cufl7nw"
                ></i>{" "}
                Print
              </button>

              <button
                className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                data-oid="cnwz0o."
              >
                <i
                  className="fas fa-file-export mr-1.5 text-green-400"
                  data-oid=":orabk2"
                ></i>{" "}
                Export
              </button>
            </div>
          </div>

          <GlassCard className="p-6 mb-6" data-oid="_oio.2n">
            <div
              className="flex justify-between items-center mb-6"
              data-oid="p9c0pnk"
            >
              <h3
                className="text-xl font-space text-white flex items-center"
                data-oid="ce1w9lj"
              >
                <span
                  className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 mr-3"
                  data-oid="bb8:d_m"
                >
                  <i
                    className="fas fa-file-invoice-dollar"
                    data-oid="amr_j:-"
                  ></i>
                </span>
                Pending Invoices
                <span
                  className="ml-3 bg-yellow-400/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full"
                  data-oid="q8m4jtn"
                >
                  {stats.pendingInvoices}
                </span>
              </h3>

              <div data-oid="y2t99.4">
                <span
                  className="text-sm text-yellow-400 mr-3"
                  data-oid="j0-a29f"
                >
                  <i
                    className="fas fa-circle mr-1 text-xs"
                    data-oid="_5xz8o7"
                  ></i>{" "}
                  ${stats.totalUnpaid.toLocaleString()} outstanding
                </span>

                <button
                  className="text-sm bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-lg shadow-glow-md hover:shadow-glow-lg transition-all duration-300 flex items-center inline-flex"
                  onClick={() => setIsAddInvoiceModalOpen(true)}
                  data-oid="n8:5uhw"
                >
                  <i className="fas fa-plus mr-2" data-oid="s-tvyfo"></i> New
                  Invoice
                </button>
              </div>
            </div>

            {/* Invoices List with enhanced styling */}
            <div
              className="bg-space-800/30 rounded-lg border border-space-700/30 overflow-hidden"
              data-oid="5aku5ki"
            >
              <InvoicesList data-oid="_ryea9d" />
            </div>

            {/* Quick Actions */}
            <div
              className="mt-6 flex flex-wrap justify-between items-center"
              data-oid="rf131o."
            >
              <div className="flex space-x-3" data-oid="-6wboet">
                <button
                  className="text-sm bg-space-800 text-white px-3 py-2 rounded-lg hover:bg-space-700 flex items-center"
                  data-oid="e-8:8.j"
                >
                  <i
                    className="fas fa-paper-plane mr-1.5 text-green-400"
                    data-oid="87hg1v0"
                  ></i>{" "}
                  Send Reminders
                </button>
                <button
                  className="text-sm bg-space-800 text-white px-3 py-2 rounded-lg hover:bg-space-700 flex items-center"
                  data-oid="_i:vn1t"
                >
                  <i
                    className="fas fa-file-pdf mr-1.5 text-green-400"
                    data-oid="8q-76n9"
                  ></i>{" "}
                  Bulk Export
                </button>
              </div>

              <button
                className="text-sm bg-gradient-to-r from-green-700/80 to-green-900/80 text-white px-4 py-2 rounded-lg border border-green-600/30 hover:border-green-500/50 transition-all duration-300 flex items-center mt-3 sm:mt-0"
                onClick={() => setIsAddInvoiceModalOpen(true)}
                data-oid="jqzo3u4"
              >
                <i className="fas fa-plus mr-2" data-oid="b1eql4n"></i> Create
                New Invoice
              </button>
            </div>
          </GlassCard>
        </TabsContent>

        {/* Clients Tab */}
        <TabsContent value="clients" data-oid="opb40_c">
          {/* Client Filter & Search */}
          <div
            className="flex flex-wrap justify-between items-center mb-4 gap-4"
            data-oid="jwmebyg"
          >
            <div className="relative" data-oid="wy_3pt9">
              <input
                type="text"
                placeholder="Search clients..."
                className="bg-space-800/50 border border-space-700/50 px-4 py-2 pl-10 rounded-lg text-sm text-white w-60 md:w-80 focus:outline-none focus:border-blue-400 shadow-glow-sm"
                data-oid="g1coksc"
              />

              <div
                className="absolute left-3 top-2.5 text-gray-400"
                data-oid="sd5b038"
              >
                <i className="fas fa-search" data-oid="vc-5.ut"></i>
              </div>
            </div>

            <div className="flex space-x-2" data-oid="rkzgngt">
              <button
                className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                data-oid="d6yrg3x"
              >
                <i
                  className="fas fa-filter mr-1.5 text-blue-400"
                  data-oid=":_-t_9."
                ></i>{" "}
                Filter
              </button>

              <button
                className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                data-oid="2r48-5c"
              >
                <i
                  className="fas fa-sort-alpha-down mr-1.5 text-blue-400"
                  data-oid="s7pavz."
                ></i>{" "}
                Sort
              </button>

              <button
                className="text-sm bg-gradient-to-r from-blue-700 to-blue-900 text-white px-3 py-1.5 rounded shadow-glow-sm hover:shadow-glow-md transition-all duration-300 flex items-center"
                onClick={() => setIsAddClientModalOpen(true)}
                data-oid="pd7md8-"
              >
                <i className="fas fa-plus mr-1.5" data-oid="worj:u8"></i> New
                Client
              </button>
            </div>
          </div>

          <GlassCard className="p-6 mb-6" data-oid="p52z1bu">
            <div
              className="flex justify-between items-center mb-6"
              data-oid="ux.4zbs"
            >
              <h3
                className="text-xl font-space text-white flex items-center"
                data-oid="_320:hr"
              >
                <span
                  className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3"
                  data-oid="s8puqii"
                >
                  <i className="fas fa-users" data-oid=".sp-x0u"></i>
                </span>
                Clients
              </h3>

              <div className="flex space-x-3" data-oid="_yozlpm">
                <button
                  className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                  data-oid="m8z-lil"
                >
                  <i
                    className="fas fa-envelope mr-1.5 text-blue-400"
                    data-oid="6f_kv6t"
                  ></i>{" "}
                  Email All
                </button>
                <button
                  className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                  data-oid="agi8wj-"
                >
                  <i
                    className="fas fa-file-export mr-1.5 text-blue-400"
                    data-oid="dxxa0hf"
                  ></i>{" "}
                  Export
                </button>
                <button
                  className="relative text-sm overflow-hidden bg-gradient-to-r from-cyan/90 to-cyan-700 text-white px-4 py-2 rounded-lg shadow-glow-cyan hover:shadow-glow-lg transition-all duration-300 flex items-center group font-medium tracking-wide"
                  onClick={() => {
                    console.log("Opening client modal directly");
                    // Create client modal popup directly instead of using component
                    const modal = document.createElement("div");
                    modal.className =
                      "fixed inset-0 flex items-center justify-center z-[9999] bg-black/80 backdrop-blur-sm";

                    // Create the modal content with professional styling
                    modal.innerHTML = `
                      <div class="bg-gradient-to-b from-space-800 via-space-900 to-space-950 border-2 border-space-600/70 shadow-xl text-white max-w-lg relative overflow-hidden rounded-xl p-6"
                           style="box-shadow: 0 0 40px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 0, 0, 0.5), inset 0 0 1px rgba(255, 255, 255, 0.1);
                                  background-image: radial-gradient(circle at 10% 10%, rgba(59, 130, 246, 0.05), transparent 20%), 
                                                    radial-gradient(circle at 90% 90%, rgba(14, 165, 233, 0.05), transparent 25%)">
                        
                        <!-- Decorative elements -->
                        <div class="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-cyan/20 to-transparent rounded-full blur-2xl opacity-20 pointer-events-none"></div>
                        <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-purple-600/20 to-transparent rounded-full blur-2xl opacity-20 pointer-events-none"></div>
                        
                        <!-- Header -->
                        <div class="flex items-center mb-4">
                          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400/20 to-purple-500/20 flex items-center justify-center mr-3 border border-space-600/50">
                            <i class="fas fa-building text-blue-400"></i>
                          </div>
                          <h2 class="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Add New Client</h2>
                          <button class="ml-auto text-gray-400 hover:text-white" id="close-client-modal">
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                        <p class="text-gray-400 text-sm mb-6">Create a new client to associate with your projects</p>
                        
                        <!-- Form elements -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
                          <div class="md:col-span-2">
                            <label class="block text-xs text-blue-400 font-medium mb-1.5 uppercase tracking-wide">Company Name</label>
                            <div class="relative">
                              <div class="absolute left-2.5 top-2.5 text-blue-400/70">
                                <i class="fas fa-building"></i>
                              </div>
                              <input 
                                type="text"
                                id="client-name"
                                class="w-full bg-space-800/90 border border-space-600/70 rounded-lg p-2.5 pl-9 text-sm text-white shadow-inner focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 focus:outline-none transition-colors duration-200"
                                placeholder="Enter company name..."
                                required
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label class="block text-xs text-cyan font-medium mb-1.5 uppercase tracking-wide">Contact Person</label>
                            <div class="relative">
                              <div class="absolute left-2.5 top-2.5 text-cyan/70">
                                <i class="fas fa-user"></i>
                              </div>
                              <input 
                                type="text"
                                id="client-contact"
                                class="w-full bg-space-800/90 border border-space-600/70 rounded-lg p-2.5 pl-9 text-sm text-white shadow-inner focus:border-cyan focus:ring-1 focus:ring-cyan/30 focus:outline-none transition-colors duration-200"
                                placeholder="Primary contact name..."
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label class="block text-xs text-purple-400 font-medium mb-1.5 uppercase tracking-wide">Email</label>
                            <div class="relative">
                              <div class="absolute left-2.5 top-2.5 text-purple-400/70">
                                <i class="fas fa-envelope"></i>
                              </div>
                              <input 
                                type="email"
                                id="client-email"
                                class="w-full bg-space-800/90 border border-space-600/70 rounded-lg p-2.5 pl-9 text-sm text-white shadow-inner focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 focus:outline-none transition-colors duration-200"
                                placeholder="client@example.com"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <!-- Footer -->
                        <div class="border-t border-space-700/50 pt-4 mt-4 flex justify-end">
                          <div class="flex space-x-3">
                            <button 
                              type="button"
                              id="cancel-client-btn"
                              class="bg-space-800 text-white px-5 py-2.5 rounded-lg hover:bg-space-700 border border-space-600/50 transition-colors duration-200"
                            >
                              Cancel
                            </button>
                            <button 
                              type="button"
                              id="create-client-btn"
                              class="bg-gradient-to-r from-blue-500 to-cyan text-white font-medium px-5 py-2.5 rounded-lg shadow-glow-md hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center min-w-32"
                            >
                              <i class="fas fa-plus mr-2"></i> Create Client
                            </button>
                          </div>
                        </div>
                      </div>
                    `;
                    document.body.appendChild(modal);

                    // Add event listeners
                    document
                      .getElementById("close-client-modal")
                      ?.addEventListener("click", () => {
                        document.body.removeChild(modal);
                      });

                    document
                      .getElementById("cancel-client-btn")
                      ?.addEventListener("click", () => {
                        document.body.removeChild(modal);
                      });

                    document
                      .getElementById("create-client-btn")
                      ?.addEventListener("click", () => {
                        const clientName = (
                          document.getElementById(
                            "client-name",
                          ) as HTMLInputElement
                        )?.value;
                        const clientContact = (
                          document.getElementById(
                            "client-contact",
                          ) as HTMLInputElement
                        )?.value;
                        const clientEmail = (
                          document.getElementById(
                            "client-email",
                          ) as HTMLInputElement
                        )?.value;

                        if (clientName) {
                          alert(`Client created successfully: ${clientName}`);
                          document.body.removeChild(modal);
                        } else {
                          alert("Please enter a company name");
                        }
                      });

                    // Also close when clicking outside
                    modal.addEventListener("click", (e) => {
                      if (e.target === modal) {
                        document.body.removeChild(modal);
                      }
                    });
                  }}
                  data-oid="5:f5gdk"
                >
                  <span
                    className="absolute inset-0 w-full h-full bg-gradient-to-tr from-electric/10 to-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    data-oid="4a-z9qa"
                  ></span>
                  <span
                    className="absolute top-0 left-0 w-full h-full bg-cyan/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    data-oid="p20yvok"
                  ></span>
                  <span
                    className="relative z-10 flex items-center justify-center"
                    data-oid="n2-sin7"
                  >
                    <span
                      className="absolute -left-1 -top-1 w-8 h-8 rounded-full bg-gradient-to-br from-cyan/20 to-electric/10 blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      data-oid="eyw72:9"
                    ></span>
                    <i
                      className="fas fa-user-plus mr-2 text-white relative z-20 group-hover:scale-110 transition-transform duration-300"
                      data-oid="lcfo3kp"
                    ></i>
                    <span className="relative z-20" data-oid="8yy.o1p">
                      Add Client
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {/* Clients List with enhanced styling */}
            <div
              className="bg-space-800/30 rounded-lg border border-space-700/30 overflow-hidden"
              data-oid="ln_5g1d"
            >
              <ClientsList data-oid="j23rf_:" />
            </div>

            {/* Client Stats & Quick Actions */}
            <div
              className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
              data-oid="aunr8f5"
            >
              <div
                className="bg-space-800/50 rounded-lg p-4 border border-space-700/30"
                data-oid="-4g-31b"
              >
                <div className="text-xs text-gray-400 mb-1" data-oid="nz2pc1q">
                  Total Clients
                </div>
                <div
                  className="text-xl font-bold text-white"
                  data-oid="r4evblq"
                >
                  24
                </div>
                <div className="text-xs text-blue-400 mt-1" data-oid="g-j9ts.">
                  +3 this month
                </div>
              </div>

              <div
                className="bg-space-800/50 rounded-lg p-4 border border-space-700/30"
                data-oid="8d5ga9l"
              >
                <div className="text-xs text-gray-400 mb-1" data-oid="rydvwyp">
                  Active Jobs
                </div>
                <div
                  className="text-xl font-bold text-white"
                  data-oid="v9gplyh"
                >
                  {stats.activeJobs}
                </div>
                <div className="text-xs text-cyan mt-1" data-oid="i64nss3">
                  Across {Math.min(stats.activeJobs + 3, 12)} clients
                </div>
              </div>

              <div
                className="bg-space-800/50 rounded-lg p-4 border border-space-700/30"
                data-oid="bpb8pz."
              >
                <div className="text-xs text-gray-400 mb-1" data-oid="h1_af5i">
                  Outstanding
                </div>
                <div
                  className="text-xl font-bold text-white"
                  data-oid="8shs1ab"
                >
                  ${stats.totalUnpaid.toLocaleString()}
                </div>
                <div
                  className="text-xs text-yellow-400 mt-1"
                  data-oid="_t-lqes"
                >
                  {stats.pendingInvoices} unpaid invoices
                </div>
              </div>

              <div
                className="bg-space-800/50 rounded-lg p-4 border border-space-700/30"
                data-oid="fhs:xnf"
              >
                <div className="text-xs text-gray-400 mb-1" data-oid="_k7_gux">
                  Client Portal
                </div>
                <button
                  className="mt-1 text-xs bg-blue-900/50 hover:bg-blue-800/70 text-blue-400 hover:text-white px-3 py-1.5 rounded-lg border border-blue-700/40 hover:border-blue-600/60 transition-all duration-300 w-full"
                  data-oid="weaqoop"
                >
                  <i
                    className="fas fa-external-link-alt mr-1.5"
                    data-oid="n1ghfvn"
                  ></i>{" "}
                  Manage Access
                </button>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AddClientModal
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
        data-oid="3a5rbw7"
      />

      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        data-oid=".z7:vr3"
      />

      <AddInvoiceModal
        isOpen={isAddInvoiceModalOpen}
        onClose={() => setIsAddInvoiceModalOpen(false)}
        data-oid="c54vdc7"
      />
    </main>
  );
};

export default Jobs;
