import { FC, useState, useEffect } from "react";
import PageTitle from "@/components/ui/PageTitle";
import GlassCard from "@/components/ui/GlassCard";
import { useInvoices } from "@/hooks/useInvoices";
import { useClients } from "@/hooks/useClients";
import { useTimeEntries } from "@/hooks/useTimeEntries";
import { useProjects } from "@/hooks/useProjects";
import { Invoice, Client, TimeEntry, Project } from "@shared/schema";
import { toast } from "@/hooks/use-toast";

const CombinedPage: FC = () => {
  // Tab state for switching between invoices and timesheets
  const [activeSection, setActiveSection] = useState<"invoices" | "timesheet">(
    "invoices",
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Effect to handle clicking outside of the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(".dropdown");
      if (
        dropdown &&
        !dropdown.contains(event.target as Node) &&
        isDropdownOpen
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // === INVOICES SECTION ===
  const {
    invoices = [],
    isLoading: invoicesLoading,
    createInvoice,
    isModalOpen,
    closeModal,
    selectedInvoice,
    openCreateModal,
    openDetailModal,
  } = useInvoices();

  // Helper function to format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Helper function to get status text
  const getStatusText = (status: string): string => {
    switch (status) {
      case "draft":
        return "Draft";
      case "sent":
        return "Sent";
      case "paid":
        return "Paid";
      case "overdue":
        return "Overdue";
      default:
        return status;
    }
  };

  const { clients = [] } = useClients() as { clients: Client[] };
  const { projects = [] } = useProjects() as { projects: Project[] };
  const [invoiceTab, setInvoiceTab] = useState<string>("all");
  const [invoiceSearchTerm, setInvoiceSearchTerm] = useState<string>("");

  // Get client name from ID
  const getClientName = (clientId: number | null): string => {
    if (!clientId) return "No Client";
    const client = clients.find((c: Client) => c.id === clientId);
    return client ? client.name : `Client #${clientId}`;
  };

  // Filter invoices based on active tab and search term
  const filteredInvoices = (invoices as Invoice[]).filter(
    (invoice: Invoice) => {
      const matchesTab =
        invoiceTab === "all" ||
        (invoiceTab === "draft" && invoice.status === "draft") ||
        (invoiceTab === "pending" && invoice.status === "pending") ||
        (invoiceTab === "paid" && invoice.status === "paid") ||
        (invoiceTab === "overdue" &&
          invoice.status === "pending" &&
          new Date(invoice.dueDate) < new Date());

      const searchLower = invoiceSearchTerm.toLowerCase();
      const matchesSearch =
        !invoiceSearchTerm ||
        invoice.invoiceNumber.toLowerCase().includes(searchLower) ||
        getClientName(invoice.clientId).toLowerCase().includes(searchLower);

      return matchesTab && matchesSearch;
    },
  );

  // Determine status class for styling
  const getStatusClass = (status: string, dueDate: string): string => {
    if (status === "paid") return "bg-green-500/20 text-green-400";
    if (status === "draft") return "bg-gray-500/20 text-gray-400";

    const due = new Date(dueDate);
    const today = new Date();
    if (due < today) return "bg-red-500/20 text-red-400";

    const daysRemaining = Math.ceil(
      (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (daysRemaining < 3) return "bg-yellow-500/20 text-yellow-400";
    return "bg-blue-500/20 text-blue-400";
  };

  // Calculate the totals for the invoice statistics cards
  const invoiceStats = {
    total: filteredInvoices.reduce(
      (sum: number, inv: Invoice) => sum + parseFloat(inv.total.toString()),
      0,
    ),
    paid: filteredInvoices
      .filter((inv: Invoice) => inv.status === "paid")
      .reduce(
        (sum: number, inv: Invoice) => sum + parseFloat(inv.total.toString()),
        0,
      ),
    pending: filteredInvoices
      .filter((inv: Invoice) => inv.status === "pending")
      .reduce(
        (sum: number, inv: Invoice) => sum + parseFloat(inv.total.toString()),
        0,
      ),
    overdue: filteredInvoices
      .filter(
        (inv: Invoice) =>
          inv.status === "pending" && new Date(inv.dueDate) < new Date(),
      )
      .reduce(
        (sum: number, inv: Invoice) => sum + parseFloat(inv.total.toString()),
        0,
      ),
  };

  // === TIMESHEET SECTION ===
  const {
    timeEntries = [] as TimeEntry[],
    isLoading: timeEntriesLoading,
    formatDuration,
    formatDate,
    createTimeEntry,
    isFormOpen,
    toggleForm,
  } = useTimeEntries();

  // Timesheet state variables
  const [timeView, setTimeView] = useState<
    "weekly" | "list" | "calendar" | "chart"
  >("list");
  const [timeSearchTerm, setTimeSearchTerm] = useState<string>("");
  const [formData, setFormData] = useState({
    projectId: "1",
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
  const timeStats = {
    totalHours:
      (timeEntries as TimeEntry[]).reduce(
        (sum: number, entry: TimeEntry) => sum + (entry.duration || 0),
        0,
      ) / 3600,

    totalEarnings: (timeEntries as TimeEntry[]).reduce(
      (sum: number, entry: TimeEntry) => {
        const hours = (entry.duration || 0) / 3600;
        const rate = entry.hourlyRate
          ? parseFloat(entry.hourlyRate.toString())
          : 0;
        return sum + hours * rate;
      },
      0,
    ),

    thisWeekHours:
      (timeEntries as TimeEntry[])
        .filter((entry: TimeEntry) => {
          const entryDate = new Date(entry.startTime);
          const today = new Date();
          const firstDayOfWeek = new Date(today);
          firstDayOfWeek.setDate(today.getDate() - today.getDay());
          firstDayOfWeek.setHours(0, 0, 0, 0);
          return entryDate >= firstDayOfWeek;
        })
        .reduce(
          (sum: number, entry: TimeEntry) => sum + (entry.duration || 0),
          0,
        ) / 3600,

    thisMonthHours:
      (timeEntries as TimeEntry[])
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
        ) / 3600,
  };

  // Filter time entries based on search term
  const filteredEntries = (timeEntries as TimeEntry[]).filter(
    (entry: TimeEntry) => {
      const searchLower = timeSearchTerm.toLowerCase();
      const projectName = getProjectName(entry.projectId);

      return (
        !timeSearchTerm ||
        projectName.toLowerCase().includes(searchLower) ||
        (entry.notes && entry.notes.toLowerCase().includes(searchLower))
      );
    },
  );

  // Calculate the total cost based on duration and hourly rate
  const calculateCost = (seconds: number, rate: string): string => {
    const hours = seconds / 3600;
    const hourlyRate = parseFloat(rate);
    return (hours * hourlyRate).toFixed(2);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const startTime = new Date(formData.date + "T09:00:00");
    const endTime = new Date(formData.date + "T17:00:00");

    const durationParts = formData.duration.split(":");
    const hours = parseInt(durationParts[0] || "0");
    const minutes = parseInt(durationParts[1] || "0");
    const durationInSeconds = hours * 3600 + minutes * 60;

    const timeEntry = {
      userId: 1,
      projectId: Number(formData.projectId),
      startTime: startTime,
      endTime: endTime,
      duration: durationInSeconds,
      notes: formData.notes || "",
      hourlyRate: "65.00",
    };

    createTimeEntry(timeEntry, {
      onSuccess: () => {
        toggleForm();
        setFormData({
          projectId: "1",
          date: new Date().toISOString().split("T")[0],
          duration: "",
          notes: "",
        });
        toast({
          title: "Time entry saved",
          description: "Your time entry has been added successfully.",
          variant: "default",
        });
      },
      onError: (error: any) => {
        console.error("Failed to create time entry:", error);
        toast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "There was a problem saving your time entry.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div
      className="container mx-auto max-w-6xl px-4 pb-24 pt-8"
      data-oid="3xu_xmj"
    >
      <PageTitle
        title="Financial Management"
        subtitle="Manage your invoices and time entries in one place"
        icon="fa-money-bill-wave"
        data-oid="l_16gf5"
      />

      {/* Main section toggle */}
      <div className="flex justify-center mb-8" data-oid="1sxvae5">
        <div
          className="bg-gradient-to-r from-space-900/80 to-space-800/80 backdrop-blur-lg p-1.5 rounded-full inline-flex border border-space-700/50 shadow-glow-lg"
          data-oid="-2h::ro"
        >
          <button
            onClick={() => setActiveSection("invoices")}
            className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
              activeSection === "invoices"
                ? "bg-gradient-to-r from-electric to-cyan text-white shadow-glow-md"
                : "text-gray-300 hover:text-white hover:bg-space-800/50"
            }`}
            data-oid="gn6y90i"
          >
            <i
              className={`fas fa-file-invoice-dollar mr-2 ${activeSection === "invoices" ? "text-white" : ""}`}
              data-oid="4x:q5rv"
            ></i>
            <span className="font-semibold" data-oid="dd2w-ix">
              Invoices
            </span>
          </button>
          <button
            onClick={() => setActiveSection("timesheet")}
            className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
              activeSection === "timesheet"
                ? "bg-gradient-to-r from-electric to-cyan text-white shadow-glow-md"
                : "text-gray-300 hover:text-white hover:bg-space-800/50"
            }`}
            data-oid="zjw3drd"
          >
            <i
              className={`fas fa-clock mr-2 ${activeSection === "timesheet" ? "text-white" : ""}`}
              data-oid="4rj1631"
            ></i>
            <span className="font-semibold" data-oid="klxi37d">
              Timesheets
            </span>
          </button>
        </div>
      </div>

      {/* INVOICES SECTION */}
      {activeSection === "invoices" && (
        <>
          {/* Invoice Statistics Cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
            data-oid="5eymm82"
          >
            <GlassCard className="p-6" data-oid=".vj0840">
              <div
                className="text-sm uppercase tracking-wider text-gray-400 mb-2 font-medium"
                data-oid="l_vbfs6"
              >
                Total Value
              </div>
              <div
                className="text-3xl font-bold text-white mb-1"
                data-oid="so:ckze"
              >
                ${invoiceStats.total.toFixed(2)}
              </div>
              <div className="text-sm text-gray-400" data-oid="y:.e.ga">
                {filteredInvoices.length} invoices
              </div>
            </GlassCard>

            <GlassCard className="p-6" data-oid="xwvakqf">
              <div
                className="text-sm uppercase tracking-wider text-gray-400 mb-2 font-medium"
                data-oid="vz56yac"
              >
                Paid
              </div>
              <div
                className="text-3xl font-bold text-green-400 mb-1"
                data-oid="g5ngm0y"
              >
                ${invoiceStats.paid.toFixed(2)}
              </div>
              <div className="text-sm text-gray-400" data-oid="7pn7tlg">
                {
                  filteredInvoices.filter(
                    (inv: Invoice) => inv.status === "paid",
                  ).length
                }{" "}
                invoices
              </div>
            </GlassCard>

            <GlassCard className="p-6" data-oid="3klm7t:">
              <div
                className="text-sm uppercase tracking-wider text-gray-400 mb-2 font-medium"
                data-oid="3hpdtsq"
              >
                Pending
              </div>
              <div
                className="text-3xl font-bold text-blue-400 mb-1"
                data-oid="05e3bhl"
              >
                ${invoiceStats.pending.toFixed(2)}
              </div>
              <div className="text-sm text-gray-400" data-oid="06j0hc_">
                {
                  filteredInvoices.filter(
                    (inv: Invoice) => inv.status === "pending",
                  ).length
                }{" "}
                invoices
              </div>
            </GlassCard>

            <GlassCard className="p-6" data-oid=":s-_k4m">
              <div
                className="text-sm uppercase tracking-wider text-gray-400 mb-2 font-medium"
                data-oid="y69yuwx"
              >
                Overdue
              </div>
              <div
                className="text-3xl font-bold text-red-400 mb-1"
                data-oid="fsq7oh5"
              >
                ${invoiceStats.overdue.toFixed(2)}
              </div>
              <div className="text-sm text-gray-400" data-oid="ut:z6em">
                {
                  filteredInvoices.filter(
                    (inv: Invoice) =>
                      inv.status === "pending" &&
                      new Date(inv.dueDate) < new Date(),
                  ).length
                }{" "}
                invoices
              </div>
            </GlassCard>
          </div>

          {/* Invoice Content */}
          <GlassCard className="p-5" data-oid="3ylo5u.">
            <div
              className="flex flex-wrap justify-between items-center mb-6 gap-4"
              data-oid=".-ddf92"
            >
              <div
                className="flex space-x-1 bg-space-800/50 rounded-lg p-1 shadow-inner"
                data-oid="k1ymgu:"
              >
                <button
                  onClick={() => setInvoiceTab("all")}
                  className={`px-5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    invoiceTab === "all"
                      ? "bg-electric text-white shadow-md"
                      : "text-gray-300 hover:bg-space-700/70 hover:text-white"
                  }`}
                  data-oid="2y2u4kk"
                >
                  All
                </button>
                <button
                  onClick={() => setInvoiceTab("draft")}
                  className={`px-5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    invoiceTab === "draft"
                      ? "bg-gray-500/30 text-gray-300 shadow-md"
                      : "text-gray-300 hover:bg-space-700/70 hover:text-white"
                  }`}
                  data-oid="ly7-fag"
                >
                  Draft
                </button>
                <button
                  onClick={() => setInvoiceTab("pending")}
                  className={`px-5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    invoiceTab === "pending"
                      ? "bg-blue-500/30 text-blue-400 shadow-md"
                      : "text-gray-300 hover:bg-space-700/70 hover:text-white"
                  }`}
                  data-oid="lz8_-:t"
                >
                  Pending
                </button>
                <button
                  onClick={() => setInvoiceTab("paid")}
                  className={`px-5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    invoiceTab === "paid"
                      ? "bg-green-500/30 text-green-400 shadow-md"
                      : "text-gray-300 hover:bg-space-700/70 hover:text-white"
                  }`}
                  data-oid="u1k.6:b"
                >
                  Paid
                </button>
              </div>

              <div className="flex space-x-3" data-oid="zg2:w64">
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={invoiceSearchTerm}
                  onChange={(e) => setInvoiceSearchTerm(e.target.value)}
                  className="bg-space-800/80 backdrop-blur-sm border border-space-700 px-4 py-2.5 rounded-lg text-sm text-white w-72 focus:outline-none focus:border-electric"
                  data-oid="-l-wgej"
                />

                <button
                  onClick={() => {
                    openCreateModal();
                    toast({
                      title: "New Invoice",
                      description:
                        "Please enter the invoice details in the form.",
                      variant: "default",
                    });
                  }}
                  className="bg-gradient-to-r from-electric to-cyan text-white px-6 py-2.5 text-sm rounded-lg font-medium"
                  data-oid="bd-sdw-"
                >
                  <i className="fas fa-plus mr-2" data-oid="zar0087"></i>
                  New Invoice
                </button>
              </div>
            </div>

            {/* Invoice List */}
            {invoicesLoading ? (
              <div className="flex justify-center p-10" data-oid="9e:8wh7">
                <div
                  className="animate-spin rounded-full h-12 w-12 border-t-2 border-r-2 border-electric"
                  data-oid="3bc2gvq"
                ></div>
              </div>
            ) : filteredInvoices.length === 0 ? (
              <div className="py-12 px-6 text-center" data-oid="twxnrt8">
                <h3
                  className="text-lg font-medium text-white mb-2"
                  data-oid="msy-95:"
                >
                  No invoices found
                </h3>
                <p className="text-gray-400" data-oid="_0cd0h4">
                  No invoices match your current filters or search criteria.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg" data-oid="rb6dhdj">
                <table className="w-full" data-oid="1sfdm2j">
                  <thead
                    className="text-left bg-space-800/70"
                    data-oid="-46ykpl"
                  >
                    <tr data-oid="2ij.rw:">
                      <th
                        className="px-4 py-3 text-xs text-gray-300 font-medium tracking-wider uppercase"
                        data-oid="lilmat:"
                      >
                        Invoice #
                      </th>
                      <th
                        className="px-4 py-3 text-xs text-gray-300 font-medium tracking-wider uppercase"
                        data-oid="e3m9d8o"
                      >
                        Client
                      </th>
                      <th
                        className="px-4 py-3 text-xs text-gray-300 font-medium tracking-wider uppercase"
                        data-oid="8pofy53"
                      >
                        Issue Date
                      </th>
                      <th
                        className="px-4 py-3 text-xs text-gray-300 font-medium tracking-wider uppercase"
                        data-oid="vqykl:c"
                      >
                        Due Date
                      </th>
                      <th
                        className="px-4 py-3 text-xs text-gray-300 font-medium tracking-wider uppercase"
                        data-oid="y39tq-k"
                      >
                        Status
                      </th>
                      <th
                        className="px-4 py-3 text-xs text-gray-300 font-medium tracking-wider uppercase text-right"
                        data-oid="v42vohb"
                      >
                        Amount
                      </th>
                      <th
                        className="px-4 py-3 text-xs text-gray-300 font-medium tracking-wider uppercase text-center"
                        data-oid="ommi5vd"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="divide-y divide-gray-700/30"
                    data-oid="nxb-6g5"
                  >
                    {filteredInvoices.map((invoice: Invoice) => (
                      <tr
                        key={invoice.id}
                        className="hover:bg-space-800/50 transition-all duration-150 group"
                        data-oid="12wqth5"
                      >
                        <td
                          className="px-4 py-4 text-sm text-white font-medium"
                          data-oid="ram5sku"
                        >
                          {invoice.invoiceNumber}
                        </td>
                        <td className="px-4 py-4 text-sm" data-oid="w0dwfel">
                          <div
                            className="font-medium text-white"
                            data-oid="99do4iw"
                          >
                            {getClientName(invoice.clientId)}
                          </div>
                        </td>
                        <td
                          className="px-4 py-4 text-sm text-gray-300"
                          data-oid="j.0513q"
                        >
                          {new Date(invoice.issueDate).toLocaleDateString()}
                        </td>
                        <td
                          className="px-4 py-4 text-sm text-gray-300"
                          data-oid="otplj2o"
                        >
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4" data-oid="o.y:hlp">
                          <span
                            className={`inline-block px-3 py-1 text-xs rounded-full ${getStatusClass(
                              invoice.status || "pending",
                              invoice.dueDate.toString(),
                            )}`}
                            data-oid="6jbz94_"
                          >
                            {getStatusText(invoice.status || "pending")}
                          </span>
                        </td>
                        <td
                          className="px-4 py-4 text-sm text-white text-right font-medium"
                          data-oid="b:_.uh:"
                        >
                          ${parseFloat(invoice.total.toString()).toFixed(2)}
                        </td>
                        <td className="px-4 py-4" data-oid="---xdc:">
                          <div
                            className="flex space-x-2 justify-center"
                            data-oid="1a932f_"
                          >
                            <button
                              className="w-8 h-8 rounded-full bg-space-800/80 hover:bg-space-700 flex items-center justify-center text-electric hover:text-cyan"
                              onClick={() => openDetailModal(invoice)}
                              title="View"
                              data-oid="u1sto4s"
                            >
                              <i className="fas fa-eye" data-oid="x535_ov"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </GlassCard>
        </>
      )}

      {/* TIMESHEET SECTION */}
      {activeSection === "timesheet" && (
        <>
          {/* Timesheet Statistics Cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"
            data-oid="e50wqxh"
          >
            <GlassCard className="p-5" data-oid="x:6-pkd">
              <div className="text-xs text-gray-400 mb-1" data-oid="xzr149l">
                Total Hours
              </div>
              <div className="text-2xl font-bold text-white" data-oid="ub73e4.">
                {timeStats.totalHours.toFixed(1)} hrs
              </div>
              <div className="text-xs text-gray-400 mt-2" data-oid="_o4:qxt">
                {(timeEntries as TimeEntry[]).length} time entries
              </div>
            </GlassCard>

            <GlassCard className="p-5" data-oid="aq2u5d3">
              <div className="text-xs text-gray-400 mb-1" data-oid="nypgv91">
                Total Earnings
              </div>
              <div
                className="text-2xl font-bold text-green-400"
                data-oid="w:jhtu9"
              >
                ${timeStats.totalEarnings.toFixed(2)}
              </div>
              <div className="text-xs text-gray-400 mt-2" data-oid="15s.qcu">
                Based on hourly rates
              </div>
            </GlassCard>

            <GlassCard className="p-5" data-oid="mxlp71r">
              <div className="text-xs text-gray-400 mb-1" data-oid="wbg3_.2">
                This Week
              </div>
              <div className="text-2xl font-bold text-cyan" data-oid="1q7.hlf">
                {timeStats.thisWeekHours.toFixed(1)} hrs
              </div>
              <div className="text-xs text-gray-400 mt-2" data-oid="uxuenwm">
                Since Sunday
              </div>
            </GlassCard>

            <GlassCard className="p-5" data-oid="bw2z-3j">
              <div className="text-xs text-gray-400 mb-1" data-oid="p065e-x">
                This Month
              </div>
              <div
                className="text-2xl font-bold text-purple-400"
                data-oid="21tuws."
              >
                {timeStats.thisMonthHours.toFixed(1)} hrs
              </div>
              <div className="text-xs text-gray-400 mt-2" data-oid="y_gem.e">
                {new Date().toLocaleString("default", { month: "long" })}
              </div>
            </GlassCard>
          </div>

          {/* Timesheet Content */}
          <GlassCard className="p-5" data-oid="j.at1bm">
            <div
              className="flex flex-wrap justify-between items-center mb-6 gap-4"
              data-oid="jhh_hjx"
            >
              <div className="flex space-x-1" data-oid="0kyfmb7">
                <button
                  onClick={() => setTimeView("list")}
                  className={`px-4 py-2 text-sm rounded-md ${
                    timeView === "list"
                      ? "bg-electric/20 text-electric"
                      : "text-gray-400 hover:bg-space-800/50"
                  }`}
                  data-oid="so2ns.z"
                >
                  <i className="fas fa-list-ul mr-2" data-oid="vns:khm"></i>
                  List View
                </button>
              </div>

              <div className="flex space-x-2" data-oid="fjvuoa:">
                <input
                  type="text"
                  placeholder="Search time entries..."
                  value={timeSearchTerm}
                  onChange={(e) => setTimeSearchTerm(e.target.value)}
                  className="bg-space-800/50 border border-space-700 px-3 py-2 rounded-md text-sm text-white w-60 focus:outline-none focus:border-electric"
                  data-oid="kir1ovf"
                />

                <button
                  onClick={() => toggleForm()}
                  className="bg-electric/80 hover:bg-electric text-white px-4 py-2 text-sm rounded-md font-medium"
                  data-oid="jajgoi8"
                >
                  <i className="fas fa-plus mr-1" data-oid="wsukn9:"></i> Add
                  Time
                </button>
              </div>
            </div>

            {/* Add Time Entry Form */}
            {isFormOpen && (
              <form
                onSubmit={handleSubmit}
                className="bg-space-800/50 rounded-lg p-4 mb-4"
                data-oid="hs1s8mq"
              >
                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
                  data-oid="74enlmd"
                >
                  <div data-oid="7obwpiq">
                    <label
                      className="block text-xs text-gray-400 mb-1"
                      data-oid="njvq-ag"
                    >
                      Project
                    </label>
                    <select
                      name="projectId"
                      value={formData.projectId}
                      onChange={handleChange}
                      className="w-full bg-space-800 border border-gray-700 rounded p-2 text-sm text-white"
                      data-oid="wteuo-l"
                    >
                      {Array.isArray(projects) && projects.length > 0 ? (
                        projects.map((project: Project) => (
                          <option
                            key={project.id}
                            value={project.id}
                            data-oid=".39n6dq"
                          >
                            {project.name}
                          </option>
                        ))
                      ) : (
                        <option value="1" data-oid="t96t848">
                          Default Project
                        </option>
                      )}
                    </select>
                  </div>
                  <div data-oid=".0hcg0m">
                    <label
                      className="block text-xs text-gray-400 mb-1"
                      data-oid="0gskhc3"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-space-800 border border-gray-700 rounded p-2 text-sm text-white"
                      data-oid="ywwf.jk"
                    />
                  </div>
                  <div data-oid="azz0-i3">
                    <label
                      className="block text-xs text-gray-400 mb-1"
                      data-oid="rf6w2jz"
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
                      data-oid="1m-lz6p"
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
                  data-oid="_g4zcr-"
                ></textarea>

                <div className="flex space-x-2 justify-end" data-oid="3y83g2b">
                  <button
                    type="button"
                    onClick={() => toggleForm()}
                    className="bg-space-800 text-white px-4 py-2 rounded hover:bg-space-700"
                    data-oid="doh42e4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-electric text-white px-4 py-2 rounded hover:bg-electric/80"
                    data-oid="_6l82ph"
                  >
                    Add Time Entry
                  </button>
                </div>
              </form>
            )}

            {/* Time Entries List View */}
            {timeEntriesLoading ? (
              <div className="flex justify-center p-10" data-oid="u3zfjnz">
                <div
                  className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan"
                  data-oid="i_9.fow"
                ></div>
              </div>
            ) : filteredEntries.length === 0 ? (
              <div className="p-6 text-center" data-oid="j07i02z">
                <p className="text-gray-400" data-oid="du2.has">
                  No time entries found matching your criteria.
                </p>
                <p className="text-xs text-gray-500 mt-1" data-oid="0md8v.l">
                  Try changing your search or add a new time entry.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto" data-oid="49.2fwf">
                <table className="w-full" data-oid="uo67-:8">
                  <thead className="text-left" data-oid="thooybq">
                    <tr
                      className="border-b border-gray-700/50"
                      data-oid="a0icu7l"
                    >
                      <th
                        className="px-4 py-2 text-xs text-gray-400 font-medium"
                        data-oid="xt_cbr."
                      >
                        DATE
                      </th>
                      <th
                        className="px-4 py-2 text-xs text-gray-400 font-medium"
                        data-oid="aboyg9u"
                      >
                        PROJECT
                      </th>
                      <th
                        className="px-4 py-2 text-xs text-gray-400 font-medium"
                        data-oid=".rq0-zx"
                      >
                        DESCRIPTION
                      </th>
                      <th
                        className="px-4 py-2 text-xs text-gray-400 font-medium"
                        data-oid="l026_.3"
                      >
                        DURATION
                      </th>
                      <th
                        className="px-4 py-2 text-xs text-gray-400 font-medium"
                        data-oid="zyy4it."
                      >
                        RATE
                      </th>
                      <th
                        className="px-4 py-2 text-xs text-gray-400 font-medium text-right"
                        data-oid="u-on58q"
                      >
                        COST
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="divide-y divide-gray-700/30"
                    data-oid="c:6soed"
                  >
                    {filteredEntries.map((entry: TimeEntry) => (
                      <tr
                        key={entry.id}
                        className="hover:bg-space-800/50 transition-colors"
                        data-oid="qfqyot2"
                      >
                        <td
                          className="px-4 py-3 text-sm text-gray-300"
                          data-oid="k64kc6_"
                        >
                          {formatDate
                            ? formatDate(entry.startTime.toISOString())
                            : new Date(entry.startTime).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm" data-oid="g3q:9s8">
                          <div
                            className="font-medium text-white"
                            data-oid="iz3l1l1"
                          >
                            {getProjectName(entry.projectId)}
                          </div>
                        </td>
                        <td
                          className="px-4 py-3 text-sm text-gray-300"
                          data-oid=".yc_9.4"
                        >
                          {entry.notes || "No description"}
                        </td>
                        <td
                          className="px-4 py-3 text-sm text-white"
                          data-oid="a2itiro"
                        >
                          {formatDuration
                            ? formatDuration(entry.duration || 0)
                            : `${((entry.duration || 0) / 3600).toFixed(1)}h`}
                        </td>
                        <td
                          className="px-4 py-3 text-sm text-gray-300"
                          data-oid="761c6.0"
                        >
                          $
                          {entry.hourlyRate
                            ? parseFloat(entry.hourlyRate.toString()).toFixed(2)
                            : "0.00"}
                          /hr
                        </td>
                        <td
                          className="px-4 py-3 text-sm text-white text-right font-medium"
                          data-oid="fw1cuc8"
                        >
                          $
                          {calculateCost(
                            entry.duration || 0,
                            entry.hourlyRate?.toString() || "0",
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </GlassCard>
        </>
      )}
    </div>
  );
};

export default CombinedPage;
