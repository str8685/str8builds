import { FC, useState, useRef } from "react";
import PageTitle from "@/components/ui/PageTitle";
import GlassCard from "@/components/ui/GlassCard";
import { useInvoices } from "@/hooks/useInvoices";
import { useClients } from "@/hooks/useClients";
import { Invoice, Client } from "@shared/schema";
import { toast } from "@/hooks/use-toast";
import { generateInvoicePdf, savePdf } from "@/lib/pdfUtils";
import { generateInvoiceCSV, saveCSV } from "@/lib/csvUtils";
import { apiRequest } from "@/lib/queryClient";

const InvoicesPage: FC = () => {
  const {
    invoices = [],
    isLoading,
    formatCurrency,
    getStatusText,
    openDetailModal,
    isModalOpen,
    closeModal,
    selectedInvoice,
    createInvoice,
  } = useInvoices();

  const { clients = [] } = useClients();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Get client name from ID
  const getClientName = (clientId: number | null): string => {
    if (!clientId) return "No Client";
    const client = clients.find((c: Client) => c.id === clientId);
    return client ? client.name : `Client #${clientId}`;
  };

  // Filter invoices based on active tab and search term
  const filteredInvoices = invoices.filter((invoice: Invoice) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "draft" && invoice.status === "draft") ||
      (activeTab === "pending" && invoice.status === "pending") ||
      (activeTab === "paid" && invoice.status === "paid") ||
      (activeTab === "overdue" &&
        invoice.status === "pending" &&
        new Date(invoice.dueDate) < new Date());

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      invoice.invoiceNumber.toLowerCase().includes(searchLower) ||
      getClientName(invoice.clientId).toLowerCase().includes(searchLower);

    return matchesTab && matchesSearch;
  });

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

  // Calculate the totals for the statistics cards
  const stats = {
    total: filteredInvoices.reduce(
      (sum: number, inv: Invoice) => sum + parseFloat(inv.total.toString()),
      0,
    ),
    paid: filteredInvoices
      .filter((inv: Invoice) => inv.status === "paid")
      .reduce(
        (sum: number, inv: Invoice) =>
          sum + parseFloat(inv.total.toString()),
        0,
      ),
    pending: filteredInvoices
      .filter((inv: Invoice) => inv.status === "pending")
      .reduce(
        (sum: number, inv: Invoice) =>
          sum + parseFloat(inv.total.toString()),
        0,
      ),
    overdue: filteredInvoices
      .filter(
        (inv: Invoice) =>
          inv.status === "pending" && new Date(inv.dueDate) < new Date(),
      )
      .reduce(
        (sum: number, inv: Invoice) =>
          sum + parseFloat(inv.total.toString()),
        0,
      ),
  };

  const buildExportData = () => {
    if (!selectedInvoice) {
      toast({
        title: "Select an invoice",
        description: "Choose an invoice before exporting or emailing.",
        variant: "destructive",
      });
      return null;
    }

    const invoiceForExport = selectedInvoice;

    const fallbackClient: Client = {
      id: invoiceForExport.clientId ?? 0,
      userId: invoiceForExport.userId,
      name: invoiceForExport.clientId
        ? `Client #${invoiceForExport.clientId}`
        : "No client assigned",
      contact: null,
      email: null,
      phone: null,
      address: null,
      notes: null,
      createdAt: new Date(),
    };

    const client =
      clients.find((clientItem: Client) => clientItem.id === invoiceForExport.clientId) ??
      fallbackClient;

    const totalValue = Number(invoiceForExport.total ?? 0);
    const serviceAmount = Number((totalValue * 0.8).toFixed(2));
    const materialsAmount = Number((totalValue * 0.2).toFixed(2));

    const items = [
      {
        description: "Construction Services",
        quantity: 1,
        rate: serviceAmount,
        amount: serviceAmount,
      },
      {
        description: "Materials",
        quantity: 1,
        rate: materialsAmount,
        amount: materialsAmount,
      },
    ];

    return { invoiceForExport, client, items };
  };

  // Handle export to PDF
  const handleExportPdf = async () => {
    try {
      toast({
        title: "Export started",
        description: "Your invoice is being prepared as PDF.",
        variant: "default",
      });

      const exportData = buildExportData();
      if (!exportData) {
        return;
      }

      const { invoiceForExport, client, items } = exportData;

      const blob = await generateInvoicePdf(invoiceForExport, client, items);

      // Save the PDF locally
      savePdf(blob, `Invoice-${invoiceForExport.invoiceNumber}.pdf`);

      toast({
        title: "PDF exported",
        description: "Your invoice has been exported as PDF.",
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
        description: "Your invoice is being prepared as CSV.",
        variant: "default",
      });

      const exportData = buildExportData();
      if (!exportData) {
        return;
      }

      const { invoiceForExport, client, items } = exportData;

      const csvData = generateInvoiceCSV(invoiceForExport, client, items);

      // Save the CSV locally
      saveCSV(csvData, `Invoice-${invoiceForExport.invoiceNumber}.csv`);

      toast({
        title: "CSV exported",
        description: "Your invoice has been exported as CSV.",
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

  // Handle email invoice
  const handleEmailInvoice = async () => {
    try {
      toast({
        title: "Preparing email",
        description: "Your invoice is being prepared for email.",
        variant: "default",
      });

      // Get email from prompt
      const email = prompt("Enter the email address to send the invoice to:");
      if (!email) return;

      const exportData = buildExportData();
      if (!exportData) {
        return;
      }

      const { invoiceForExport, client, items } = exportData;

      const blob = await generateInvoicePdf(invoiceForExport, client, items);

      // Since we're having server issues, let's just download the PDF instead
      savePdf(blob, `Invoice-${invoiceForExport.invoiceNumber}.pdf`);

      toast({
        title: "Email simulation",
        description: `In a production environment, this would email the invoice to ${email}. The PDF has been downloaded instead.`,
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
          const response = await apiRequest('/api/email/invoice', {
            method: 'POST',
            body: JSON.stringify({
              to: email,
              invoiceNumber: invoiceForExport.invoiceNumber,
              clientName: client.name,
              amount: `$${invoiceForExport.total}`,
              pdfBuffer
            })
          });
           if (response.success) {
            toast({
              title: "Email sent",
              description: `Invoice has been sent to ${email}.`,
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

  return (
    <div
      className="container mx-auto max-w-6xl px-4 pb-24 pt-8"
      data-oid="1_mntci"
    >
      <PageTitle
        title="Professional Invoices"
        subtitle="Create and manage professional invoices for your clients"
        icon="fa-file-invoice-dollar"
        data-oid="32tctmw"
      />

      {/* Statistics Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"
        data-oid="5:873hu"
      >
        <GlassCard className="p-5" data-oid="_p3725p">
          <div className="text-xs text-gray-400 mb-1" data-oid=":e.tu3x">
            Total Value
          </div>
          <div className="text-2xl font-bold text-white" data-oid=":dstko3">
            ${formatCurrency(stats.total)}
          </div>
          <div className="text-xs text-gray-400 mt-2" data-oid="raqise-">
            {filteredInvoices.length} invoices
          </div>
        </GlassCard>

        <GlassCard className="p-5" data-oid="smvsfrl">
          <div className="text-xs text-gray-400 mb-1" data-oid="3jimey7">
            Paid
          </div>
          <div className="text-2xl font-bold text-green-400" data-oid="to7:.lb">
            ${formatCurrency(stats.paid)}
          </div>
          <div className="text-xs text-gray-400 mt-2" data-oid=".e-7k.i">
            {
              filteredInvoices.filter((inv: Invoice) => inv.status === "paid")
                .length
            }{" "}
            invoices
          </div>
        </GlassCard>

        <GlassCard className="p-5" data-oid="-9zj8q3">
          <div className="text-xs text-gray-400 mb-1" data-oid="0x5rt27">
            Pending
          </div>
          <div className="text-2xl font-bold text-blue-400" data-oid=":otzzdh">
            ${formatCurrency(stats.pending)}
          </div>
          <div className="text-xs text-gray-400 mt-2" data-oid="-nuzty6">
            {
              filteredInvoices.filter(
                (inv: Invoice) => inv.status === "pending",
              ).length
            }{" "}
            invoices
          </div>
        </GlassCard>

        <GlassCard className="p-5" data-oid="tu4bj9s">
          <div className="text-xs text-gray-400 mb-1" data-oid="3hpeddk">
            Overdue
          </div>
          <div className="text-2xl font-bold text-red-400" data-oid="tmir:mc">
            ${formatCurrency(stats.overdue)}
          </div>
          <div className="text-xs text-gray-400 mt-2" data-oid="y.p.lf_">
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

      {/* Main Content */}
      <GlassCard className="p-5" data-oid="r5_5q1c">
        {/* Top Action Bar */}
        <div
          className="flex flex-wrap justify-between items-center mb-6 gap-4"
          data-oid="sj_o4a5"
        >
          <div className="flex space-x-1" data-oid="xt.dsqr">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 text-sm rounded-md ${
                activeTab === "all"
                  ? "bg-electric/20 text-electric"
                  : "text-gray-400 hover:bg-space-800/50"
              }`}
              data-oid="3dv87if"
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("draft")}
              className={`px-4 py-2 text-sm rounded-md ${
                activeTab === "draft"
                  ? "bg-gray-500/20 text-gray-400"
                  : "text-gray-400 hover:bg-space-800/50"
              }`}
              data-oid="mfofuyc"
            >
              Draft
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2 text-sm rounded-md ${
                activeTab === "pending"
                  ? "bg-blue-500/20 text-blue-400"
                  : "text-gray-400 hover:bg-space-800/50"
              }`}
              data-oid="cn77f1i"
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab("paid")}
              className={`px-4 py-2 text-sm rounded-md ${
                activeTab === "paid"
                  ? "bg-green-500/20 text-green-400"
                  : "text-gray-400 hover:bg-space-800/50"
              }`}
              data-oid="__yv.-6"
            >
              Paid
            </button>
            <button
              onClick={() => setActiveTab("overdue")}
              className={`px-4 py-2 text-sm rounded-md ${
                activeTab === "overdue"
                  ? "bg-red-500/20 text-red-400"
                  : "text-gray-400 hover:bg-space-800/50"
              }`}
              data-oid="9g6j9i8"
            >
              Overdue
            </button>
          </div>

          <div className="flex space-x-2" data-oid="zgw3xk0">
            <div className="relative" data-oid="zgt5p49">
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-space-800/50 border border-space-700 px-3 py-2 rounded-md text-sm text-white w-60 focus:outline-none focus:border-electric"
                data-oid="ec.nd7a"
              />

              <div
                className="absolute right-3 top-2.5 text-gray-400"
                data-oid="tje7c6b"
              >
                <i className="fas fa-search" data-oid=":g2mpxx"></i>
              </div>
            </div>
            <div className="dropdown dropdown-end" data-oid="nf97b4c">
              <button
                className="bg-space-800/50 border border-space-700 px-3 py-2 rounded-md text-sm text-white"
                data-oid="cwp3_kz"
              >
                <i className="fas fa-ellipsis-v" data-oid="kpj5a0x"></i>
              </button>
              <div
                className="dropdown-content bg-space-800 border border-space-700 rounded-md p-2 w-40 right-0 mt-1"
                data-oid="3v9p7zt"
              >
                <button
                  onClick={handleExportPdf}
                  className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-space-700 rounded"
                  data-oid="mqt7bt:"
                >
                  <i className="fas fa-file-pdf mr-2" data-oid="0-xlk0w"></i>{" "}
                  Export PDF
                </button>
                <button
                  onClick={handleExportCsv}
                  className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-space-700 rounded"
                  data-oid="bq.9mn1"
                >
                  <i className="fas fa-file-csv mr-2" data-oid=".ixls.e"></i>{" "}
                  Export CSV
                </button>
                <button
                  onClick={handleEmailInvoice}
                  className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-space-700 rounded"
                  data-oid="8-lapki"
                >
                  <i className="fas fa-envelope mr-2" data-oid="ekww11k"></i>{" "}
                  Email Invoice
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                /* TODO: Add new invoice */
              }}
              className="bg-electric/80 hover:bg-electric text-white px-4 py-2 text-sm rounded-md font-medium"
              data-oid="-ip5gzp"
            >
              <i className="fas fa-plus mr-1" data-oid="zreyz9v"></i> New
              Invoice
            </button>
          </div>
        </div>

        {/* Invoice List */}
        {isLoading ? (
          <div className="space-y-3" data-oid="wll:qp9">
            <div className="flex justify-center p-10" data-oid=".87ay8p">
              <div
                className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan"
                data-oid="qf0nlox"
              ></div>
            </div>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="space-y-2" data-oid="raikdk5">
            <div className="p-6 text-center" data-oid="81wzq81">
              <p className="text-gray-400" data-oid="noptyhb">
                No invoices found matching your criteria.
              </p>
              <p className="text-xs text-gray-500 mt-1" data-oid="a2thq8n">
                Try changing your filters or create a new invoice.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto" data-oid="tmwwl5i">
            <table className="w-full" data-oid="4e-:h:h">
              <thead className="text-left" data-oid="uot810y">
                <tr className="border-b border-gray-700/50" data-oid=".ohxp4_">
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium"
                    data-oid="4phyfq3"
                  >
                    INVOICE #
                  </th>
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium"
                    data-oid="gctfcc1"
                  >
                    CLIENT
                  </th>
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium"
                    data-oid=".0ea0y2"
                  >
                    ISSUE DATE
                  </th>
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium"
                    data-oid="ej005p2"
                  >
                    DUE DATE
                  </th>
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium"
                    data-oid=".n9asvx"
                  >
                    STATUS
                  </th>
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium text-right"
                    data-oid="piugk5h"
                  >
                    AMOUNT
                  </th>
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium text-right"
                    data-oid="gd0:le2"
                  >
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody data-oid="wws4j.i">
                {filteredInvoices.map((invoice: Invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-gray-700/30 hover:bg-space-800/50 transition-colors"
                    data-oid="r.vriwf"
                  >
                    <td
                      className="px-4 py-3 text-sm text-white font-medium"
                      data-oid="7-1bzf."
                    >
                      {invoice.invoiceNumber}
                    </td>
                    <td
                      className="px-4 py-3 text-sm text-white"
                      data-oid="c_8-hqf"
                    >
                      {getClientName(invoice.clientId)}
                    </td>
                    <td
                      className="px-4 py-3 text-sm text-gray-400"
                      data-oid="3nao4k7"
                    >
                      {new Date(invoice.issueDate).toLocaleDateString()}
                    </td>
                    <td
                      className="px-4 py-3 text-sm text-gray-400"
                      data-oid="-5jmehc"
                    >
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3" data-oid="lyxc3f9">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded ${getStatusClass(
                          invoice.status || "pending",
                          invoice.dueDate.toString(),
                        )}`}
                        data-oid="nwewt:k"
                      >
                        {getStatusText(invoice)}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 text-sm text-white text-right font-medium"
                      data-oid="omnu3:k"
                    >
                      ${formatCurrency(invoice.total)}
                    </td>
                    <td className="px-4 py-3 text-right" data-oid="_gqo_si">
                      <div
                        className="flex space-x-1 justify-end"
                        data-oid="t_:o0.0"
                      >
                        <button
                          className="p-1 text-electric hover:text-cyan"
                          onClick={() => openDetailModal(invoice)}
                          title="View"
                          data-oid="ua9k6w-"
                        >
                          <i className="fas fa-eye" data-oid="p-uh2b1"></i>
                        </button>
                        <button
                          className="p-1 text-electric hover:text-cyan"
                          onClick={() =>
                            console.log("Edit invoice", invoice.id)
                          }
                          title="Edit"
                          data-oid="8zviv3t"
                        >
                          <i className="fas fa-edit" data-oid="au2bitx"></i>
                        </button>
                        <button
                          className="p-1 text-electric hover:text-cyan"
                          onClick={() =>
                            console.log("Send invoice", invoice.id)
                          }
                          title="Send"
                          data-oid="2he3n:."
                        >
                          <i
                            className="fas fa-paper-plane"
                            data-oid="j8powfa"
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
      </GlassCard>
    </div>
  );
};

export default InvoicesPage;
