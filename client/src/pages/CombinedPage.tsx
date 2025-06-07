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
      data-oid="jtz1e7l"
    >
      <PageTitle
        title="Financial Management"
        subtitle="Manage your invoices and time entries in one place"
        icon="fa-money-bill-wave"
        data-oid="gs3zgtk"
      />

      {/* Main section toggle */}
      <div className="flex justify-center mb-8" data-oid="fn64pae">
        <div
          className="bg-gradient-to-r from-space-900/80 to-space-800/80 backdrop-blur-lg p-1.5 rounded-full inline-flex border border-space-700/50 shadow-glow-lg"
          data-oid="6ep:a8u"
        >
          <button
            onClick={() => setActiveSection("invoices")}
            className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
              activeSection === "invoices"
                ? "bg-gradient-to-r from-electric to-cyan text-white shadow-glow-md"
                : "text-gray-300 hover:text-white hover:bg-space-800/50"
            }`}
            data-oid=":feeaao"
          >
            <i
              className={`fas fa-file-invoice-dollar mr-2 ${activeSection === "invoices" ? "text-white" : ""}`}
              data-oid="8bgbky:"
            ></i>
            <span className="font-semibold" data-oid="tqu4rh6">
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
            data-oid="d47x7dm"
          >
            <i
              className={`fas fa-clock mr-2 ${activeSection === "timesheet" ? "text-white" : ""}`}
              data-oid="v6x15ag"
            ></i>
            <span className="font-semibold" data-oid="rijv76r">
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
            data-oid="r_c2ppx"
          >
            <GlassCard className="p-6" data-oid="f31g:ol">
              <div
                className="text-sm uppercase tracking-wider text-gray-400 mb-2 font-medium"
                data-oid="5sbv62r"
              >
                Total Value
              </div>
              <div
                className="text-3xl font-bold text-white mb-1"
                data-oid="3:5cj2w"
              >
                ${invoiceStats.total.toFixed(2)}
              </div>
              <div className="text-sm text-gray-400" data-oid="g39h.qs">
                {filteredInvoices.length} invoices
              </div>
            </GlassCard>

            <GlassCard className="p-6" data-oid="_:7lnyw">
              <div
                className="text-sm uppercase tracking-wider text-gray-400 mb-2 font-medium"
                data-oid="14t62h."
              >
                Paid
              </div>
              <div
                className="text-3xl font-bold text-green-400 mb-1"
                data-oid=":pxah2o"
              >
                ${invoiceStats.paid.toFixed(2)}
              </div>
              <div className="text-sm text-gray-400" data-oid="_k41nhy">
                {
                  filteredInvoices.filter(
                    (inv: Invoice) => inv.status === "paid",
                  ).length
                }{" "}
                invoices
              </div>
            </GlassCard>

            <GlassCard className="p-6" data-oid="7533hqc">
              <div
                className="text-sm uppercase tracking-wider text-gray-400 mb-2 font-medium"
                data-oid="45--yfm"
              >
                Pending
              </div>
              <div
                className="text-3xl font-bold text-blue-400 mb-1"
                data-oid=".2wmoos"
              >
                ${invoiceStats.pending.toFixed(2)}
              </div>
              <div className="text-sm text-gray-400" data-oid="--b-.v4">
                {
                  filteredInvoices.filter(
                    (inv: Invoice) => inv.status === "pending",
                  ).length
                }{" "}
                invoices
              </div>
            </GlassCard>

            <GlassCard className="p-6" data-oid="5uhl6-h">
              <div
                className="text-sm uppercase tracking-wider text-gray-400 mb-2 font-medium"
                data-oid="8a7occa"
              >
                Overdue
              </div>
              <div
                className="text-3xl font-bold text-red-400 mb-1"
                data-oid="xtn-7m-"
              >
                ${invoiceStats.overdue.toFixed(2)}
              </div>
              <div className="text-sm text-gray-400" data-oid="916p1sa">
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
          <GlassCard className="p-5" data-oid="g2yxl5b">
            <div
              className="flex flex-wrap justify-between items-center mb-6 gap-4"
              data-oid="c30znd1"
            >
              <div
                className="flex space-x-1 bg-space-800/50 rounded-lg p-1 shadow-inner"
                data-oid="kg64ruu"
              >
                <button
                  onClick={() => setInvoiceTab("all")}
                  className={`px-5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    invoiceTab === "all"
                      ? "bg-electric text-white shadow-md"
                      : "text-gray-300 hover:bg-space-700/70 hover:text-white"
                  }`}
                  data-oid="r5ldsng"
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
                  data-oid="l5u289i"
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
                  data-oid="mnx7257"
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
                  data-oid="sm:pzoq"
                >
                  Paid
                </button>
              </div>

              <div className="flex space-x-3" data-oid="6k:2ldz">
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={invoiceSearchTerm}
                  onChange={(e) => setInvoiceSearchTerm(e.target.value)}
                  className="bg-space-800/80 backdrop-blur-sm border border-space-700 px-4 py-2.5 rounded-lg text-sm text-white w-72 focus:outline-none focus:border-electric"
                  data-oid="1urg26e"
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
                  data-oid="43.hjio"
                >
                  <i className="fas fa-plus mr-2" data-oid="m8wgb.q"></i>
                  New Invoice
                </button>
              </div>
            </div>

            {/* Invoice List */}
            {invoicesLoading ? (
              <div className="flex justify-center p-10" data-oid="8engmhv">
                <div
                  className="animate-spin rounded-full h-12 w-12 border-t-2 border-r-2 border-electric"
                  data-oid="dhk7lej"
                ></div>
              </div>
            ) : filteredInvoices.length === 0 ? (
              <div className="py-12 px-6 text-center" data-oid="9zbmi4j">
                <h3
                  className="text-lg font-medium text-white mb-2"
                  data-oid="gczeg4f"
                >
                  No invoices found
                </h3>
                <p className="text-gray-400" data-oid="wz7ovkc">
                  No invoices match your current filters or search criteria.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg" data-oid="e7mxty4">
                <table className="w-full" data-oid="d5z1bw3">
                  <thead
                    className="text-left bg-space-800/70"
                    data-oid="beovu-q"
                  >
                    <tr data-oid="g:u:aqo">
                      <th
                        className="px-4 py-3 text-xs text-gray-300 font-medium tracking-wider uppercase"
                        data-oid="du0.-9v"
                      >
                        Invoice #
                      </th>
                      <th
                        className="px-4 py-3 text-xs text-gray-300 font-medium tracking-wider uppercase"
                        data-oid="51or4d6"
                      >
                        Client
                      </th>
                      <th
                        className="px-4 py-3 text-xs text-gray-300 font-medium tracking-wider uppercase"
                        data-oid="b79vksg"
                      >
                        Issue Date
                      </th>
                      <th
                        className="px-4 py-3 text-xs text-gray-300 font-medium tracking-wider uppercase"
                        data-oid="y8:fq-b"
                      >
                        Due Date
                      </th>
                      <th
                        className="px-4 py-3 text-xs text-gray-300 font-medium tracking-wider uppercase"
                        data-oid="iw1oeu4"
                      >
                        Status
                      </th>
                      <th
                        className="px-4 py-3 text-xs text-gray-300 font-medium tracking-wider uppercase text-right"
                        data-oid="y:tiabk"
                      >
                        Amount
                      </th>
                      <th
                        className="px-4 py-3 text-xs text-gray-300 font-medium tracking-wider uppercase text-center"
                        data-oid="hofsul5"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="divide-y divide-gray-700/30"
                    data-oid="g9lvr.7"
                  >
                    {filteredInvoices.map((invoice: Invoice) => (
                      <tr
                        key={invoice.id}
                        className="hover:bg-space-800/50 transition-all duration-150 group"
                        data-oid="b8yv6t4"
                      >
                        <td
                          className="px-4 py-4 text-sm text-white font-medium"
                          data-oid="3u4pjyd"
                        >
                          {invoice.invoiceNumber}
                        </td>
                        <td className="px-4 py-4 text-sm" data-oid="5:jmf3m">
                          <div
                            className="font-medium text-white"
                            data-oid="p21i1-s"
                          >
                            {getClientName(invoice.clientId)}
                          </div>
                        </td>
                        <td
                          className="px-4 py-4 text-sm text-gray-300"
                          data-oid="d5pc5f-"
                        >
                          {new Date(invoice.issueDate).toLocaleDateString()}
                        </td>
                        <td
                          className="px-4 py-4 text-sm text-gray-300"
                          data-oid="rb4a8w8"
                        >
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4" data-oid="rb87jh1">
                          <span
                            className={`inline-block px-3 py-1 text-xs rounded-full ${getStatusClass(
                              invoice.status || "pending",
                              invoice.dueDate.toString(),
                            )}`}
                            data-oid="3ie1co2"
                          >
                            {getStatusText(invoice.status || "pending")}
                          </span>
                        </td>
                        <td
                          className="px-4 py-4 text-sm text-white text-right font-medium"
                          data-oid="ysar..1"
                        >
                          ${parseFloat(invoice.total.toString()).toFixed(2)}
                        </td>
                        <td className="px-4 py-4" data-oid="mziy8e4">
                          <div
                            className="flex space-x-2 justify-center"
                            data-oid="71ct09s"
                          >
                            <button
                              className="w-8 h-8 rounded-full bg-space-800/80 hover:bg-space-700 flex items-center justify-center text-electric hover:text-cyan"
                              onClick={() => openDetailModal(invoice)}
                              title="View"
                              data-oid="mfnp3t7"
                            >
                              <i className="fas fa-eye" data-oid="rd..yo0"></i>
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
            data-oid="gzndiud"
          >
            <GlassCard className="p-5" data-oid="pnp7fkw">
              <div className="text-xs text-gray-400 mb-1" data-oid="vxdeok0">
                Total Hours
              </div>
              <div className="text-2xl font-bold text-white" data-oid="3yqt:4h">
                {timeStats.totalHours.toFixed(1)} hrs
              </div>
              <div className="text-xs text-gray-400 mt-2" data-oid=":haftir">
                {(timeEntries as TimeEntry[]).length} time entries
              </div>
            </GlassCard>

            <GlassCard className="p-5" data-oid="wclto-0">
              <div className="text-xs text-gray-400 mb-1" data-oid="dphrb2:">
                Total Earnings
              </div>
              <div
                className="text-2xl font-bold text-green-400"
                data-oid="cke2.gp"
              >
                ${timeStats.totalEarnings.toFixed(2)}
              </div>
              <div className="text-xs text-gray-400 mt-2" data-oid="1f2o09q">
                Based on hourly rates
              </div>
            </GlassCard>

            <GlassCard className="p-5" data-oid="710pu-m">
              <div className="text-xs text-gray-400 mb-1" data-oid="35p38zx">
                This Week
              </div>
              <div className="text-2xl font-bold text-cyan" data-oid="slbfq8l">
                {timeStats.thisWeekHours.toFixed(1)} hrs
              </div>
              <div className="text-xs text-gray-400 mt-2" data-oid="0pei44z">
                Since Sunday
              </div>
            </GlassCard>

            <GlassCard className="p-5" data-oid="01:_4:6">
              <div className="text-xs text-gray-400 mb-1" data-oid="60z_utc">
                This Month
              </div>
              <div
                className="text-2xl font-bold text-purple-400"
                data-oid="wg7t1yg"
              >
                {timeStats.thisMonthHours.toFixed(1)} hrs
              </div>
              <div className="text-xs text-gray-400 mt-2" data-oid=":l730vo">
                {new Date().toLocaleString("default", { month: "long" })}
              </div>
            </GlassCard>
          </div>

          {/* Timesheet Content */}
          <GlassCard className="p-5" data-oid="m0:074f">
            <div
              className="flex flex-wrap justify-between items-center mb-6 gap-4"
              data-oid="nh5tvt-"
            >
              <div className="flex space-x-1" data-oid="5lyjjcq">
                <button
                  onClick={() => setTimeView("list")}
                  className={`px-4 py-2 text-sm rounded-md ${
                    timeView === "list"
                      ? "bg-electric/20 text-electric"
                      : "text-gray-400 hover:bg-space-800/50"
                  }`}
                  data-oid="9_9t:g0"
                >
                  <i className="fas fa-list-ul mr-2" data-oid="xtugsz8"></i>
                  List View
                </button>
              </div>

              <div className="flex space-x-2" data-oid="tltt0wy">
                <input
                  type="text"
                  placeholder="Search time entries..."
                  value={timeSearchTerm}
                  onChange={(e) => setTimeSearchTerm(e.target.value)}
                  className="bg-space-800/50 border border-space-700 px-3 py-2 rounded-md text-sm text-white w-60 focus:outline-none focus:border-electric"
                  data-oid="3f:gj3:"
                />

                <button
                  onClick={() => toggleForm()}
                  className="bg-electric/80 hover:bg-electric text-white px-4 py-2 text-sm rounded-md font-medium"
                  data-oid="18l1m0y"
                >
                  <i className="fas fa-plus mr-1" data-oid="yc75_ds"></i> Add
                  Time
                </button>
              </div>
            </div>

            {/* Add Time Entry Form */}
            {isFormOpen && (
              <form
                onSubmit={handleSubmit}
                className="bg-space-800/50 rounded-lg p-4 mb-4"
                data-oid="gggymcc"
              >
                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
                  data-oid="wufsi.y"
                >
                  <div data-oid="z9ukkn8">
                    <label
                      className="block text-xs text-gray-400 mb-1"
                      data-oid="yv9_zjf"
                    >
                      Project
                    </label>
                    <select
                      name="projectId"
                      value={formData.projectId}
                      onChange={handleChange}
                      className="w-full bg-space-800 border border-gray-700 rounded p-2 text-sm text-white"
                      data-oid="lm_m.13"
                    >
                      {Array.isArray(projects) && projects.length > 0 ? (
                        projects.map((project: Project) => (
                          <option
                            key={project.id}
                            value={project.id}
                            data-oid="gh5pyy."
                          >
                            {project.name}
                          </option>
                        ))
                      ) : (
                        <option value="1" data-oid="dnokv6v">
                          Default Project
                        </option>
                      )}
                    </select>
                  </div>
                  <div data-oid="mxx5:.r">
                    <label
                      className="block text-xs text-gray-400 mb-1"
                      data-oid="1o54k5y"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-space-800 border border-gray-700 rounded p-2 text-sm text-white"
                      data-oid="3nrwwd3"
                    />
                  </div>
                  <div data-oid="0dmn5kg">
                    <label
                      className="block text-xs text-gray-400 mb-1"
                      data-oid="54fo2b3"
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
                      data-oid="0oblpsz"
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
                  data-oid=".g3i-wp"
                ></textarea>

                <div className="flex space-x-2 justify-end" data-oid="5gcup1_">
                  <button
                    type="button"
                    onClick={() => toggleForm()}
                    className="bg-space-800 text-white px-4 py-2 rounded hover:bg-space-700"
                    data-oid="w9i9bgl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-electric text-white px-4 py-2 rounded hover:bg-electric/80"
                    data-oid="b6938me"
                  >
                    Add Time Entry
                  </button>
                </div>
              </form>
            )}

            {/* Time Entries List View */}
            {timeEntriesLoading ? (
              <div className="flex justify-center p-10" data-oid="ql03q8e">
                <div
                  className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan"
                  data-oid="g74-jz8"
                ></div>
              </div>
            ) : filteredEntries.length === 0 ? (
              <div className="p-6 text-center" data-oid=":k:w1q7">
                <p className="text-gray-400" data-oid="z4mt1of">
                  No time entries found matching your criteria.
                </p>
                <p className="text-xs text-gray-500 mt-1" data-oid="37xbtqq">
                  Try changing your search or add a new time entry.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto" data-oid="ufkcyjr">
                <table className="w-full" data-oid="3e5173z">
                  <thead className="text-left" data-oid="9z8gb1h">
                    <tr
                      className="border-b border-gray-700/50"
                      data-oid=":ln77qx"
                    >
                      <th
                        className="px-4 py-2 text-xs text-gray-400 font-medium"
                        data-oid="wozeqh4"
                      >
                        DATE
                      </th>
                      <th
                        className="px-4 py-2 text-xs text-gray-400 font-medium"
                        data-oid="gxmzck4"
                      >
                        PROJECT
                      </th>
                      <th
                        className="px-4 py-2 text-xs text-gray-400 font-medium"
                        data-oid="gkuuvmc"
                      >
                        DESCRIPTION
                      </th>
                      <th
                        className="px-4 py-2 text-xs text-gray-400 font-medium"
                        data-oid="tsam.dt"
                      >
                        DURATION
                      </th>
                      <th
                        className="px-4 py-2 text-xs text-gray-400 font-medium"
                        data-oid="oks8m8j"
                      >
                        RATE
                      </th>
                      <th
                        className="px-4 py-2 text-xs text-gray-400 font-medium text-right"
                        data-oid="th6zbg4"
                      >
                        COST
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="divide-y divide-gray-700/30"
                    data-oid="63.ha::"
                  >
                    {filteredEntries.map((entry: TimeEntry) => (
                      <tr
                        key={entry.id}
                        className="hover:bg-space-800/50 transition-colors"
                        data-oid="c3wfy5t"
                      >
                        <td
                          className="px-4 py-3 text-sm text-gray-300"
                          data-oid="m:3mx_g"
                        >
                          {formatDate
                            ? formatDate(entry.startTime.toISOString())
                            : new Date(entry.startTime).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm" data-oid="1ko4xkg">
                          <div
                            className="font-medium text-white"
                            data-oid="8jq0i.i"
                          >
                            {getProjectName(entry.projectId)}
                          </div>
                        </td>
                        <td
                          className="px-4 py-3 text-sm text-gray-300"
                          data-oid="k:4k.u0"
                        >
                          {entry.notes || "No description"}
                        </td>
                        <td
                          className="px-4 py-3 text-sm text-white"
                          data-oid="yoq.ref"
                        >
                          {formatDuration
                            ? formatDuration(entry.duration || 0)
                            : `${((entry.duration || 0) / 3600).toFixed(1)}h`}
                        </td>
                        <td
                          className="px-4 py-3 text-sm text-gray-300"
                          data-oid="-r6e:6n"
                        >
                          $
                          {entry.hourlyRate
                            ? parseFloat(entry.hourlyRate.toString()).toFixed(2)
                            : "0.00"}
                          /hr
                        </td>
                        <td
                          className="px-4 py-3 text-sm text-white text-right font-medium"
                          data-oid="4:87wq3"
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
