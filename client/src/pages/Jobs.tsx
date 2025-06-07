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
      data-oid="_01te4z"
    >
      <Toaster data-oid="jii-s0t" />

      {/* Professional animated background */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        data-oid="uk665mw"
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-space-950 via-space-900 to-space-950 opacity-50"
          data-oid="bqr_:pp"
        ></div>
        <div
          className="absolute top-0 left-0 w-2/3 h-1/3 bg-cyan/5 blur-[120px] rounded-full -translate-y-1/2"
          data-oid="0943vin"
        ></div>
        <div
          className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-purple-500/5 blur-[100px] rounded-full translate-y-1/3"
          data-oid="ie168f7"
        ></div>
      </div>

      {/* Enhanced Header with Stats Overview */}
      <div className="mb-8 animate-fadeIn" data-oid="muz5i5l">
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
          data-oid="kkc4gd:"
        >
          <div className="relative group" data-oid="sfcbn9p">
            <div
              className="absolute -inset-0.5 bg-gradient-to-r from-cyan to-purple-500 opacity-0 group-hover:opacity-30 rounded-lg blur transition duration-500"
              data-oid=":_mml7o"
            ></div>
            <div className="relative" data-oid="7y8qj7m">
              <h2
                className="text-3xl font-space font-bold bg-gradient-to-r from-white via-cyan/80 to-electric bg-clip-text text-transparent transition-all duration-300 group-hover:from-cyan group-hover:to-white"
                data-oid="l3jb006"
              >
                Jobs & Admin
              </h2>
              <p
                className="text-gray-400 mt-1 group-hover:text-cyan/80 transition-colors duration-300"
                data-oid="amaz2b4"
              >
                Manage your projects, time tracking, invoices and clients
              </p>
            </div>
          </div>

          <div
            className="flex space-x-3 animate-fadeIn animation-delay-100"
            data-oid="6oax431"
          >
            <div className="relative group" data-oid="cwjtdrk">
              <div
                className="absolute -inset-0.5 bg-gradient-to-r from-cyan/50 to-electric/50 opacity-0 group-hover:opacity-100 rounded-lg blur-sm transition duration-300"
                data-oid="0j1exuh"
              ></div>
              <div className="relative" data-oid="1w7b_2y">
                <input
                  type="text"
                  placeholder="Search projects, clients..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="bg-space-900/90 border border-space-700/50 px-4 py-2 pl-10 rounded-lg text-sm text-white w-64 focus:outline-none focus:border-cyan focus:bg-space-800/90 shadow-inner transition-all duration-300 backdrop-blur-sm"
                  data-oid="f5n.kmf"
                />

                <div
                  className="absolute left-3 top-2.5 text-gray-400 group-hover:text-cyan transition-colors duration-300"
                  data-oid="fk3:4q-"
                >
                  <i className="fas fa-search" data-oid="4g6v:y6"></i>
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
              data-oid="7ghgmrb"
            >
              <span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan/20 to-electric/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                data-oid="299o0jc"
              ></span>
              <span
                className="absolute top-0 left-0 w-full h-full bg-cyan/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                data-oid="nlk1ir5"
              ></span>
              <i
                className="fas fa-plus mr-2 text-cyan relative z-10 group-hover:text-white transition-colors duration-300"
                data-oid="wgykfmp"
              ></i>
              <span className="relative z-10" data-oid="3ma_ver">
                New Project
              </span>
            </button>

            <button
              className="relative text-sm overflow-hidden bg-gradient-to-r from-space-800 to-space-900 text-white px-4 py-2 rounded-lg hover:from-space-700 hover:to-space-800 shadow-glow-sm hover:shadow-glow-md transition-all duration-300 flex items-center group"
              onClick={() => setIsAddInvoiceModalOpen(true)}
              data-oid="r8b89iv"
            >
              <span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-electric/10 to-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                data-oid="lp6x5wy"
              ></span>
              <span
                className="absolute top-0 left-0 w-full h-full bg-electric/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                data-oid="f-9tku."
              ></span>
              <i
                className="fas fa-file-invoice-dollar mr-2 text-electric relative z-10 group-hover:text-white transition-colors duration-300"
                data-oid="luibjac"
              ></i>
              <span className="relative z-10" data-oid="cd7bi_v">
                New Invoice
              </span>
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6 animate-fadeIn animation-delay-200"
          data-oid="0y4qoxh"
        >
          <div
            className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-4 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-cyan hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            data-oid="i3ftyuq"
          >
            <div
              className="absolute inset-0 bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              data-oid="j7p82_b"
            ></div>
            <div
              className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-cyan/10 group-hover:bg-cyan/20 transition-colors duration-300"
              data-oid="u447cjy"
            ></div>
            <div
              className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
              data-oid="9aw_gyf"
            >
              Active Jobs
            </div>
            <div
              className="text-2xl font-bold text-white group-hover:text-cyan transition-colors duration-300 relative z-10"
              data-oid="zfuzowr"
            >
              {stats.activeJobs}
            </div>
            <div className="text-xs text-cyan mt-2" data-oid="nk8f:d2">
              Projects in progress
            </div>
          </div>

          <div
            className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-4 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-green hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            data-oid="xvb_vdq"
          >
            <div
              className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              data-oid="l6bcemc"
            ></div>
            <div
              className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors duration-300"
              data-oid="of.pzbq"
            ></div>
            <div
              className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
              data-oid="hstsl24"
            >
              Completed
            </div>
            <div
              className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 relative z-10"
              data-oid="d2rh-p2"
            >
              {stats.completedJobs}
            </div>
            <div className="text-xs text-green-400 mt-2" data-oid="-fze071">
              Finished projects
            </div>
          </div>

          <div
            className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-4 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-purple hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            data-oid="98478tr"
          >
            <div
              className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              data-oid="bu7b.:3"
            ></div>
            <div
              className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors duration-300"
              data-oid="4y0kd-:"
            ></div>
            <div
              className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
              data-oid="8hm5aog"
            >
              Hours This Month
            </div>
            <div
              className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300 relative z-10"
              data-oid="xt_j2a9"
            >
              {stats.totalHoursThisMonth}
            </div>
            <div className="text-xs text-purple-400 mt-2" data-oid="zh2z-fl">
              Logged time
            </div>
          </div>

          <div
            className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-4 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-green hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            data-oid="ljd748a"
          >
            <div
              className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              data-oid="op:jk1q"
            ></div>
            <div
              className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors duration-300"
              data-oid="ujly-dj"
            ></div>
            <div
              className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
              data-oid="kv5:p-s"
            >
              Total Earnings
            </div>
            <div
              className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 relative z-10"
              data-oid="5-ek28h"
            >
              ${stats.totalEarnings.toLocaleString()}
            </div>
            <div className="text-xs text-green-400 mt-2" data-oid=".:c1-lz">
              All projects
            </div>
          </div>

          <div
            className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-4 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-yellow hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            data-oid="p8esetz"
          >
            <div
              className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              data-oid="duh-vn:"
            ></div>
            <div
              className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors duration-300"
              data-oid="m6b4bhc"
            ></div>
            <div
              className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
              data-oid="eaiy0mp"
            >
              Pending Invoices
            </div>
            <div
              className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 relative z-10"
              data-oid="xzxfpl_"
            >
              {stats.pendingInvoices}
            </div>
            <div className="text-xs text-yellow-400 mt-2" data-oid="sni50:z">
              Awaiting payment
            </div>
          </div>

          <div
            className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-4 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-red hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            data-oid="iv7alil"
          >
            <div
              className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              data-oid="6d-v4ad"
            ></div>
            <div
              className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-colors duration-300"
              data-oid="tfw99vz"
            ></div>
            <div
              className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
              data-oid="953nw.m"
            >
              Unpaid Amount
            </div>
            <div
              className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 relative z-10"
              data-oid="czu1c9_"
            >
              ${stats.totalUnpaid.toLocaleString()}
            </div>
            <div className="text-xs text-red-400 mt-2" data-oid="1pu1ex-">
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
        data-oid="755lrde"
      >
        <div
          className="bg-space-900/60 backdrop-blur-xl p-2 rounded-xl inline-flex border border-space-700/50 shadow-glow-lg mb-6 overflow-hidden relative animate-fadeIn animation-delay-300 group"
          data-oid=".q3:0un"
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-cyan/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            data-oid="q77p4j."
          ></div>
          <div
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-cyan/5 opacity-30 blur-xl"
            data-oid="nbo47ib"
          ></div>
          <div
            className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-purple-500/5 opacity-30 blur-xl"
            data-oid="q::-.o4"
          ></div>

          <TabsList
            className="bg-transparent border-0 shadow-none relative z-10"
            data-oid="u3qw_p4"
          >
            <TabsTrigger
              value="jobs"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan/20 data-[state=active]:to-electric/10 
                         data-[state=active]:border-cyan/30 data-[state=active]:shadow-glow-sm 
                         rounded-lg px-5 py-2.5 transition-all duration-300 
                         hover:bg-space-800/50 hover:text-cyan group relative overflow-hidden"
              data-oid="l:z_q6s"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-electric/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 data-[state=active]:opacity-0"
                data-oid="dihoq_8"
              ></span>
              <i
                className="fas fa-briefcase mr-2 text-cyan relative z-10"
                data-oid="r::le38"
              ></i>
              <span className="relative z-10" data-oid="ylph6fi">
                Jobs
              </span>
              <span
                className="ml-2 bg-cyan/20 text-cyan text-xs px-1.5 py-0.5 rounded-full shadow-glow-sm relative z-10 animate-pulse"
                data-oid="t92f4jl"
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
              data-oid="ofso6_p"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 data-[state=active]:opacity-0"
                data-oid="9v2i6sk"
              ></span>
              <i
                className="fas fa-clock mr-2 text-purple-400 relative z-10"
                data-oid="uy_pefj"
              ></i>
              <span className="relative z-10" data-oid="s3dn359">
                Timesheet
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="invoices"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/20 data-[state=active]:to-green-900/10 
                         data-[state=active]:border-green-500/30 data-[state=active]:shadow-glow-sm 
                         rounded-lg px-5 py-2.5 transition-all duration-300 
                         hover:bg-space-800/50 hover:text-green-400 group relative overflow-hidden"
              data-oid="zq8_wu6"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 data-[state=active]:opacity-0"
                data-oid="vgqq7uq"
              ></span>
              <i
                className="fas fa-file-invoice-dollar mr-2 text-green-400 relative z-10"
                data-oid="im2qyg1"
              ></i>
              <span className="relative z-10" data-oid="4owlpa-">
                Invoices
              </span>
              {stats.pendingInvoices > 0 && (
                <span
                  className="ml-2 bg-yellow-400/20 text-yellow-400 text-xs px-1.5 py-0.5 rounded-full shadow-glow-sm relative z-10 animate-pulse"
                  data-oid="8j5:x-w"
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
              data-oid="ctlrxw:"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 data-[state=active]:opacity-0"
                data-oid="6v3t-3k"
              ></span>
              <i
                className="fas fa-users mr-2 text-blue-400 relative z-10"
                data-oid="6ou8mtz"
              ></i>
              <span className="relative z-10" data-oid="2wahzsf">
                Clients
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Jobs Tab */}
        <TabsContent value="jobs" data-oid="7xwstzv">
          {/* Jobs Filter Bar */}
          <div
            className="flex flex-wrap justify-between items-center mb-4 gap-4 animate-fadeIn animation-delay-500"
            data-oid="ma0mevx"
          >
            <div
              className="flex space-x-2 bg-space-900/60 backdrop-blur-xl p-1 rounded-lg inline-flex border border-space-700/50 shadow-glow-sm relative overflow-hidden group"
              data-oid="35w9:xr"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-cyan/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                data-oid="6bfmpn_"
              ></div>
              <div
                className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-cyan/5 opacity-30 blur-xl"
                data-oid="4czgs75"
              ></div>

              <button
                onClick={() => setJobsFilter("active")}
                className={`px-3 py-1.5 text-sm rounded-md transition-all relative overflow-hidden group/btn ${
                  jobsFilter === "active"
                    ? "bg-gradient-to-r from-cyan/20 to-electric/10 text-cyan shadow-glow-cyan"
                    : "text-gray-400 hover:text-cyan"
                }`}
                data-oid="584raxw"
              >
                <span
                  className="absolute inset-0 w-full h-full bg-cyan/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                  data-oid="9irj7ah"
                ></span>
                <i
                  className="fas fa-play-circle mr-1 relative z-10"
                  data-oid="0blhacz"
                ></i>
                <span className="relative z-10" data-oid="_-48rb2">
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
                data-oid="2ektb.5"
              >
                <span
                  className="absolute inset-0 w-full h-full bg-green-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                  data-oid="lle-ria"
                ></span>
                <i
                  className="fas fa-check-circle mr-1 relative z-10"
                  data-oid="88v9i4."
                ></i>
                <span className="relative z-10" data-oid="8nlmp1y">
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
                data-oid="6o8dls8"
              >
                <span
                  className="absolute inset-0 w-full h-full bg-purple-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                  data-oid="qgs-bcw"
                ></span>
                <i
                  className="fas fa-layer-group mr-1 relative z-10"
                  data-oid="zltnp4k"
                ></i>
                <span className="relative z-10" data-oid="lrm5ic-">
                  All Projects
                </span>
              </button>
            </div>

            <div
              className="flex space-x-2 animate-fadeIn animation-delay-600"
              data-oid="gcxjuu7"
            >
              <button
                className="text-sm bg-space-800/90 text-white px-3 py-1.5 rounded-lg hover:bg-space-700 flex items-center group relative overflow-hidden backdrop-blur-sm border border-space-700/30"
                data-oid="00os-ax"
              >
                <span
                  className="absolute inset-0 w-full h-full bg-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  data-oid="sr:e-sd"
                ></span>
                <i
                  className="fas fa-filter mr-1.5 text-cyan group-hover:text-white transition-colors duration-300 relative z-10"
                  data-oid="d_fe_pb"
                ></i>
                <span className="relative z-10" data-oid="1szorsg">
                  Filter
                </span>
              </button>

              <button
                className="text-sm bg-space-800/90 text-white px-3 py-1.5 rounded-lg hover:bg-space-700 flex items-center group relative overflow-hidden backdrop-blur-sm border border-space-700/30"
                data-oid="t554whp"
              >
                <span
                  className="absolute inset-0 w-full h-full bg-electric/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  data-oid="2rxvovn"
                ></span>
                <i
                  className="fas fa-sort mr-1.5 text-electric group-hover:text-white transition-colors duration-300 relative z-10"
                  data-oid="7ca9mc1"
                ></i>
                <span className="relative z-10" data-oid="17k2y1p">
                  Sort
                </span>
              </button>

              <div className="relative" data-oid=":1qjvad">
                <button
                  className="text-sm bg-space-800/90 text-white px-3 py-1.5 rounded-lg hover:bg-space-700 flex items-center group relative overflow-hidden backdrop-blur-sm border border-space-700/30"
                  data-oid="_y5w24r"
                >
                  <span
                    className="absolute inset-0 w-full h-full bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    data-oid="cs0cs85"
                  ></span>
                  <i
                    className="fas fa-download mr-1.5 text-purple-400 group-hover:text-white transition-colors duration-300 relative z-10"
                    data-oid="utn.gwu"
                  ></i>
                  <span className="relative z-10" data-oid="0qvt870">
                    Export
                  </span>
                </button>
              </div>
            </div>
          </div>

          <GlassCard
            className="p-6 mb-6 animate-fadeIn animation-delay-400 relative overflow-hidden"
            data-oid="zv9-fx4"
          >
            <div
              className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan/30 to-transparent opacity-50"
              data-oid="efmbebj"
            ></div>
            <div
              className="absolute -top-10 -right-10 w-40 h-40 bg-cyan/5 rounded-full blur-xl"
              data-oid="ej31ic9"
            ></div>

            <div
              className="flex justify-between items-center mb-6"
              data-oid=":s0bruc"
            >
              <h3
                className="text-xl font-space font-bold text-white flex items-center group"
                data-oid="-_2gkkf"
              >
                <span
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan/30 to-electric/20 flex items-center justify-center text-cyan mr-3 shadow-glow-sm group-hover:shadow-glow-cyan transition-all duration-300"
                  data-oid="xb1m8ff"
                >
                  <i className="fas fa-briefcase" data-oid="9cu2h8o"></i>
                </span>
                <span
                  className="bg-gradient-to-r from-white to-cyan/80 bg-clip-text text-transparent"
                  data-oid="d37r:8s"
                >
                  {jobsFilter === "active" && "Active Projects"}
                  {jobsFilter === "completed" && "Completed Projects"}
                  {jobsFilter === "all" && "All Projects"}
                </span>
                <span
                  className="ml-3 bg-cyan/10 text-cyan text-xs px-2 py-0.5 rounded-full shadow-glow-sm group-hover:shadow-glow-cyan group-hover:bg-cyan/20 transition-all duration-300"
                  data-oid="v6d:9xa"
                >
                  {stats.activeJobs}
                </span>
              </h3>

              <button
                className="relative text-sm overflow-hidden bg-gradient-to-r from-cyan to-electric text-white px-4 py-2 rounded-lg shadow-glow-md hover:shadow-glow-lg transition-all duration-300 flex items-center group"
                onClick={() => setIsAddProjectModalOpen(true)}
                data-oid="_z:koqi"
              >
                <span
                  className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  data-oid="ok1lcja"
                ></span>
                <span
                  className="absolute top-0 left-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                  data-oid="kao4y-s"
                ></span>
                <i
                  className="fas fa-plus mr-2 relative z-10"
                  data-oid="8f_srqh"
                ></i>
                <span className="relative z-10" data-oid="qv99:sa">
                  Add New Project
                </span>
              </button>
            </div>

            <div
              className="bg-space-900/40 rounded-lg p-4 backdrop-blur-sm border border-space-700/30 shadow-inner"
              data-oid="fy:9.4n"
            >
              <ProjectsList data-oid="kjny1rv" />
            </div>

            {/* Pagination Control */}
            <div
              className="flex justify-between items-center mt-6 text-sm"
              data-oid="ihx_esg"
            >
              <div className="text-gray-400 group" data-oid="41w_6u9">
                Showing{" "}
                <span
                  className="text-white font-medium bg-cyan/10 px-2 py-0.5 rounded group-hover:bg-cyan/20 transition-colors duration-300"
                  data-oid=":lhn-7c"
                >
                  {stats.activeJobs}
                </span>{" "}
                of{" "}
                <span
                  className="text-white font-medium bg-cyan/5 px-2 py-0.5 rounded group-hover:bg-cyan/10 transition-colors duration-300"
                  data-oid="3tjppff"
                >
                  {stats.activeJobs + stats.completedJobs}
                </span>{" "}
                projects
              </div>

              <div className="flex space-x-1" data-oid="11-y_oy">
                <button
                  className="px-3 py-1 rounded-lg bg-space-800 text-gray-400 hover:bg-space-700 hover:text-white disabled:opacity-50 shadow-inner transition-all duration-300 border border-space-700/30"
                  disabled
                  data-oid="i2ke.do"
                >
                  <i className="fas fa-chevron-left" data-oid="r.6_44a"></i>
                </button>
                <button
                  className="px-3 py-1 rounded-lg bg-gradient-to-r from-cyan/20 to-electric/10 text-cyan border border-cyan/20 shadow-glow-sm"
                  data-oid="gzg-wfy"
                >
                  1
                </button>
                <button
                  className="px-3 py-1 rounded-lg bg-space-800 text-gray-400 hover:bg-space-700 hover:text-white transition-all duration-300 hover:shadow-glow-sm border border-space-700/30"
                  data-oid="773gms7"
                >
                  2
                </button>
                <button
                  className="px-3 py-1 rounded-lg bg-space-800 text-gray-400 hover:bg-space-700 hover:text-white disabled:opacity-50 shadow-inner transition-all duration-300 border border-space-700/30"
                  disabled
                  data-oid="chm3n51"
                >
                  <i className="fas fa-chevron-right" data-oid="zc6.2sy"></i>
                </button>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        {/* Timesheet Tab */}
        <TabsContent value="timesheet" data-oid=".nzbo_3">
          {/* Timesheet Controls */}
          <div
            className="flex flex-wrap justify-between items-center mb-4 gap-4"
            data-oid="_3dyrba"
          >
            <div
              className="flex space-x-2 bg-space-900/50 backdrop-blur-lg p-1 rounded-lg inline-flex border border-space-700/50"
              data-oid="notrebs"
            >
              <button
                onClick={() => setTimesheetView("calendar")}
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  timesheetView === "calendar"
                    ? "bg-gradient-to-r from-purple-500/20 to-purple-700/10 text-purple-400 shadow-glow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
                data-oid="jsovqci"
              >
                <i className="fas fa-calendar-alt mr-1" data-oid="rx_wg_9"></i>{" "}
                Calendar View
              </button>
              <button
                onClick={() => setTimesheetView("list")}
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  timesheetView === "list"
                    ? "bg-gradient-to-r from-electric/20 to-cyan/10 text-cyan shadow-glow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
                data-oid="zramhvc"
              >
                <i className="fas fa-list-ul mr-1" data-oid="1e04zyx"></i> List
                View
              </button>
            </div>

            <div className="flex space-x-2" data-oid="z9z329h">
              <div className="relative" data-oid="f0ml741">
                <input
                  type="date"
                  value={selectedDate.toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="bg-space-800/80 border border-space-700/50 px-3 py-1.5 rounded text-sm text-white focus:outline-none focus:border-purple-500"
                  data-oid="pkbl.8b"
                />
              </div>

              <button
                className="text-sm bg-gradient-to-r from-purple-700 to-purple-900 text-white px-3 py-1.5 rounded shadow-glow-sm hover:shadow-glow-md transition-all duration-300 flex items-center"
                onClick={toggleForm}
                data-oid="xbfqrdc"
              >
                <i className="fas fa-plus mr-1.5" data-oid="xkz.da2"></i>{" "}
                {isFormOpen ? "Cancel" : "Log Time"}
              </button>

              <div className="relative" data-oid="z8eeyi6">
                <button
                  className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                  data-oid="::-4z_6"
                >
                  <i className="fas fa-ellipsis-v" data-oid=".2dbngl"></i>
                </button>
                {/* Menu would go here */}
              </div>
            </div>
          </div>

          <GlassCard className="p-6 mb-6" data-oid="hd_._y1">
            <div
              className="flex justify-between items-center mb-6"
              data-oid="reounl2"
            >
              <h3
                className="text-xl font-space text-white flex items-center"
                data-oid="cpytlof"
              >
                <span
                  className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mr-3"
                  data-oid="x845eit"
                >
                  <i className="fas fa-clock" data-oid="o-_p3w_"></i>
                </span>
                Time Entries
                <span className="ml-3 text-xs text-gray-400" data-oid="pq86-35">
                  {selectedDate.toLocaleDateString("en-NZ", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </h3>

              <div className="flex space-x-3" data-oid="0mjjubz">
                <button
                  className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                  data-oid="ipjds_t"
                >
                  <i
                    className="fas fa-print mr-1.5 text-purple-400"
                    data-oid="8c2xdg5"
                  ></i>{" "}
                  Print
                </button>
                <button
                  className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                  data-oid="u_qqk_0"
                >
                  <i
                    className="fas fa-file-export mr-1.5 text-cyan"
                    data-oid="j94-:v:"
                  ></i>{" "}
                  Export
                </button>
              </div>
            </div>

            {/* Timesheet Form at the top */}
            {isFormOpen && (
              <div
                className="mb-6 bg-space-800/30 rounded-lg p-4 border border-purple-500/20 shadow-glow-sm"
                data-oid="84t7hd6"
              >
                <TimeEntryForm onClose={toggleForm} data-oid="vabyklb" />
              </div>
            )}

            {/* Time Entries List with enhanced styling */}
            <div
              className="bg-space-800/30 rounded-lg border border-space-700/30 overflow-hidden"
              data-oid="vje3l:f"
            >
              <TimeEntriesList data-oid="4nl2p5g" />
            </div>

            {/* Weekly Summary */}
            <div
              className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
              data-oid="5gs_2s2"
            >
              <div
                className="bg-space-800/50 rounded-lg p-4 border border-space-700/30"
                data-oid="_58jjdg"
              >
                <div className="text-xs text-gray-400 mb-1" data-oid="-281v95">
                  Today
                </div>
                <div
                  className="text-xl font-bold text-white"
                  data-oid="sa4k.:0"
                >
                  2.5 hrs
                </div>
                <div
                  className="text-xs text-purple-400 mt-1"
                  data-oid="g39.d2i"
                >
                  $162.50
                </div>
              </div>

              <div
                className="bg-space-800/50 rounded-lg p-4 border border-space-700/30"
                data-oid="04lj-0g"
              >
                <div className="text-xs text-gray-400 mb-1" data-oid="pykb52i">
                  This Week
                </div>
                <div
                  className="text-xl font-bold text-white"
                  data-oid="s0ctb09"
                >
                  18.5 hrs
                </div>
                <div
                  className="text-xs text-purple-400 mt-1"
                  data-oid="dy_oas."
                >
                  $1,202.50
                </div>
              </div>

              <div
                className="bg-space-800/50 rounded-lg p-4 border border-space-700/30"
                data-oid="79pbli-"
              >
                <div className="text-xs text-gray-400 mb-1" data-oid=".nia-yt">
                  This Month
                </div>
                <div
                  className="text-xl font-bold text-white"
                  data-oid="p2jo1x9"
                >
                  76.0 hrs
                </div>
                <div
                  className="text-xs text-purple-400 mt-1"
                  data-oid="ef94bve"
                >
                  $4,940.00
                </div>
              </div>

              <div
                className="bg-space-800/50 rounded-lg p-4 border border-space-700/30"
                data-oid="j3z1ueu"
              >
                <div className="text-xs text-gray-400 mb-1" data-oid="2-dkyvt">
                  Unbilled Time
                </div>
                <div
                  className="text-xl font-bold text-white"
                  data-oid="uj8rv7m"
                >
                  12.5 hrs
                </div>
                <div
                  className="text-xs text-yellow-400 mt-1"
                  data-oid="sbm24.2"
                >
                  $812.50
                </div>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" data-oid="gkn_uy7">
          {/* Invoice Status Filter */}
          <div
            className="flex flex-wrap justify-between items-center mb-4 gap-4"
            data-oid="p0rqrxl"
          >
            <div
              className="flex space-x-2 bg-space-900/50 backdrop-blur-lg p-1 rounded-lg inline-flex border border-space-700/50"
              data-oid="4atkbvi"
            >
              <button
                className="px-3 py-1.5 text-sm rounded-md transition-all bg-gradient-to-r from-yellow-500/20 to-yellow-700/10 text-yellow-400 shadow-glow-sm"
                data-oid="1h51i02"
              >
                <i
                  className="fas fa-hourglass-half mr-1"
                  data-oid="hux7v8-"
                ></i>{" "}
                Pending
              </button>
              <button
                className="px-3 py-1.5 text-sm rounded-md transition-all text-gray-400 hover:text-white"
                data-oid="..4svy6"
              >
                <i className="fas fa-check-circle mr-1" data-oid="uar7bk3"></i>{" "}
                Paid
              </button>
              <button
                className="px-3 py-1.5 text-sm rounded-md transition-all text-gray-400 hover:text-white"
                data-oid=".nxnxqz"
              >
                <i
                  className="fas fa-exclamation-circle mr-1"
                  data-oid="c87hq5d"
                ></i>{" "}
                Overdue
              </button>
              <button
                className="px-3 py-1.5 text-sm rounded-md transition-all text-gray-400 hover:text-white"
                data-oid="vf_ma6u"
              >
                <i className="fas fa-layer-group mr-1" data-oid="rf1u2c3"></i>{" "}
                All
              </button>
            </div>

            <div className="flex space-x-2" data-oid="2a2dshq">
              <div className="relative" data-oid="lgm-o:9">
                <input
                  type="date"
                  placeholder="Filter by date"
                  className="bg-space-800/80 border border-space-700/50 px-3 py-1.5 rounded text-sm text-white focus:outline-none focus:border-green-500"
                  data-oid="5lzmy4s"
                />
              </div>

              <button
                className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                data-oid="57kstkn"
              >
                <i
                  className="fas fa-print mr-1.5 text-green-400"
                  data-oid="afi.mge"
                ></i>{" "}
                Print
              </button>

              <button
                className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                data-oid="h4xt9_:"
              >
                <i
                  className="fas fa-file-export mr-1.5 text-green-400"
                  data-oid="2rboofu"
                ></i>{" "}
                Export
              </button>
            </div>
          </div>

          <GlassCard className="p-6 mb-6" data-oid="2176uoy">
            <div
              className="flex justify-between items-center mb-6"
              data-oid="n_9p6jn"
            >
              <h3
                className="text-xl font-space text-white flex items-center"
                data-oid="r.ct:c5"
              >
                <span
                  className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 mr-3"
                  data-oid="2md1lgg"
                >
                  <i
                    className="fas fa-file-invoice-dollar"
                    data-oid="-z5a4g0"
                  ></i>
                </span>
                Pending Invoices
                <span
                  className="ml-3 bg-yellow-400/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full"
                  data-oid="sbslnhl"
                >
                  {stats.pendingInvoices}
                </span>
              </h3>

              <div data-oid=":gffvqc">
                <span
                  className="text-sm text-yellow-400 mr-3"
                  data-oid="c83ihap"
                >
                  <i
                    className="fas fa-circle mr-1 text-xs"
                    data-oid="ellmf-w"
                  ></i>{" "}
                  ${stats.totalUnpaid.toLocaleString()} outstanding
                </span>

                <button
                  className="text-sm bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-lg shadow-glow-md hover:shadow-glow-lg transition-all duration-300 flex items-center inline-flex"
                  onClick={() => setIsAddInvoiceModalOpen(true)}
                  data-oid="h9o-j4a"
                >
                  <i className="fas fa-plus mr-2" data-oid="3kgsd3y"></i> New
                  Invoice
                </button>
              </div>
            </div>

            {/* Invoices List with enhanced styling */}
            <div
              className="bg-space-800/30 rounded-lg border border-space-700/30 overflow-hidden"
              data-oid="-ktn0ii"
            >
              <InvoicesList data-oid="thkpy1j" />
            </div>

            {/* Quick Actions */}
            <div
              className="mt-6 flex flex-wrap justify-between items-center"
              data-oid="0ae.h6a"
            >
              <div className="flex space-x-3" data-oid="6i0ywwn">
                <button
                  className="text-sm bg-space-800 text-white px-3 py-2 rounded-lg hover:bg-space-700 flex items-center"
                  data-oid="nhf8wv9"
                >
                  <i
                    className="fas fa-paper-plane mr-1.5 text-green-400"
                    data-oid="vmwfcs5"
                  ></i>{" "}
                  Send Reminders
                </button>
                <button
                  className="text-sm bg-space-800 text-white px-3 py-2 rounded-lg hover:bg-space-700 flex items-center"
                  data-oid="5w38.4g"
                >
                  <i
                    className="fas fa-file-pdf mr-1.5 text-green-400"
                    data-oid="fo50eyl"
                  ></i>{" "}
                  Bulk Export
                </button>
              </div>

              <button
                className="text-sm bg-gradient-to-r from-green-700/80 to-green-900/80 text-white px-4 py-2 rounded-lg border border-green-600/30 hover:border-green-500/50 transition-all duration-300 flex items-center mt-3 sm:mt-0"
                onClick={() => setIsAddInvoiceModalOpen(true)}
                data-oid="jx9lb13"
              >
                <i className="fas fa-plus mr-2" data-oid="jiw-10m"></i> Create
                New Invoice
              </button>
            </div>
          </GlassCard>
        </TabsContent>

        {/* Clients Tab */}
        <TabsContent value="clients" data-oid="nzgrlr1">
          {/* Client Filter & Search */}
          <div
            className="flex flex-wrap justify-between items-center mb-4 gap-4"
            data-oid="7xbivkn"
          >
            <div className="relative" data-oid="-4vw19z">
              <input
                type="text"
                placeholder="Search clients..."
                className="bg-space-800/50 border border-space-700/50 px-4 py-2 pl-10 rounded-lg text-sm text-white w-60 md:w-80 focus:outline-none focus:border-blue-400 shadow-glow-sm"
                data-oid="x1gfdiv"
              />

              <div
                className="absolute left-3 top-2.5 text-gray-400"
                data-oid="rtgtg4j"
              >
                <i className="fas fa-search" data-oid="-ulb1v6"></i>
              </div>
            </div>

            <div className="flex space-x-2" data-oid="qqq427q">
              <button
                className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                data-oid="e49sdqf"
              >
                <i
                  className="fas fa-filter mr-1.5 text-blue-400"
                  data-oid="l9m61po"
                ></i>{" "}
                Filter
              </button>

              <button
                className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                data-oid="bvr.vi7"
              >
                <i
                  className="fas fa-sort-alpha-down mr-1.5 text-blue-400"
                  data-oid="ubbmd5-"
                ></i>{" "}
                Sort
              </button>

              <button
                className="text-sm bg-gradient-to-r from-blue-700 to-blue-900 text-white px-3 py-1.5 rounded shadow-glow-sm hover:shadow-glow-md transition-all duration-300 flex items-center"
                onClick={() => setIsAddClientModalOpen(true)}
                data-oid="m8dfai:"
              >
                <i className="fas fa-plus mr-1.5" data-oid="en0rnm."></i> New
                Client
              </button>
            </div>
          </div>

          <GlassCard className="p-6 mb-6" data-oid="9e87.ne">
            <div
              className="flex justify-between items-center mb-6"
              data-oid="t0e3hh3"
            >
              <h3
                className="text-xl font-space text-white flex items-center"
                data-oid="4le860v"
              >
                <span
                  className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3"
                  data-oid="44eqza-"
                >
                  <i className="fas fa-users" data-oid="ngbkf-0"></i>
                </span>
                Clients
              </h3>

              <div className="flex space-x-3" data-oid="0m-xh-0">
                <button
                  className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                  data-oid=":fl3l5v"
                >
                  <i
                    className="fas fa-envelope mr-1.5 text-blue-400"
                    data-oid="_l1zv2p"
                  ></i>{" "}
                  Email All
                </button>
                <button
                  className="text-sm bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 flex items-center"
                  data-oid=".gxqboy"
                >
                  <i
                    className="fas fa-file-export mr-1.5 text-blue-400"
                    data-oid="0up1lc0"
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
                  data-oid="4g1:914"
                >
                  <span
                    className="absolute inset-0 w-full h-full bg-gradient-to-tr from-electric/10 to-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    data-oid="0iwsool"
                  ></span>
                  <span
                    className="absolute top-0 left-0 w-full h-full bg-cyan/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    data-oid="-jkobpv"
                  ></span>
                  <span
                    className="relative z-10 flex items-center justify-center"
                    data-oid="tg47686"
                  >
                    <span
                      className="absolute -left-1 -top-1 w-8 h-8 rounded-full bg-gradient-to-br from-cyan/20 to-electric/10 blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      data-oid="oxoaa1b"
                    ></span>
                    <i
                      className="fas fa-user-plus mr-2 text-white relative z-20 group-hover:scale-110 transition-transform duration-300"
                      data-oid="s6e1odr"
                    ></i>
                    <span className="relative z-20" data-oid="9jcivt8">
                      Add Client
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {/* Clients List with enhanced styling */}
            <div
              className="bg-space-800/30 rounded-lg border border-space-700/30 overflow-hidden"
              data-oid="vsqr49h"
            >
              <ClientsList data-oid="8hjr409" />
            </div>

            {/* Client Stats & Quick Actions */}
            <div
              className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
              data-oid="d99fb1v"
            >
              <div
                className="bg-space-800/50 rounded-lg p-4 border border-space-700/30"
                data-oid="fzh:frc"
              >
                <div className="text-xs text-gray-400 mb-1" data-oid="n7g41ob">
                  Total Clients
                </div>
                <div
                  className="text-xl font-bold text-white"
                  data-oid="j_:h2js"
                >
                  24
                </div>
                <div className="text-xs text-blue-400 mt-1" data-oid="09rcova">
                  +3 this month
                </div>
              </div>

              <div
                className="bg-space-800/50 rounded-lg p-4 border border-space-700/30"
                data-oid="x68st3y"
              >
                <div className="text-xs text-gray-400 mb-1" data-oid="80oq9-c">
                  Active Jobs
                </div>
                <div
                  className="text-xl font-bold text-white"
                  data-oid="2htto:q"
                >
                  {stats.activeJobs}
                </div>
                <div className="text-xs text-cyan mt-1" data-oid="z-d3da9">
                  Across {Math.min(stats.activeJobs + 3, 12)} clients
                </div>
              </div>

              <div
                className="bg-space-800/50 rounded-lg p-4 border border-space-700/30"
                data-oid="af:awh1"
              >
                <div className="text-xs text-gray-400 mb-1" data-oid="s_aap0p">
                  Outstanding
                </div>
                <div
                  className="text-xl font-bold text-white"
                  data-oid="d_s988n"
                >
                  ${stats.totalUnpaid.toLocaleString()}
                </div>
                <div
                  className="text-xs text-yellow-400 mt-1"
                  data-oid="qa4j3ik"
                >
                  {stats.pendingInvoices} unpaid invoices
                </div>
              </div>

              <div
                className="bg-space-800/50 rounded-lg p-4 border border-space-700/30"
                data-oid="o0cb8z0"
              >
                <div className="text-xs text-gray-400 mb-1" data-oid="6c7ugse">
                  Client Portal
                </div>
                <button
                  className="mt-1 text-xs bg-blue-900/50 hover:bg-blue-800/70 text-blue-400 hover:text-white px-3 py-1.5 rounded-lg border border-blue-700/40 hover:border-blue-600/60 transition-all duration-300 w-full"
                  data-oid="rtc1so_"
                >
                  <i
                    className="fas fa-external-link-alt mr-1.5"
                    data-oid="5dm:87t"
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
        data-oid="rivlyzx"
      />

      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        data-oid="1-j.aod"
      />

      <AddInvoiceModal
        isOpen={isAddInvoiceModalOpen}
        onClose={() => setIsAddInvoiceModalOpen(false)}
        data-oid="u-bxmss"
      />
    </main>
  );
};

export default Jobs;
