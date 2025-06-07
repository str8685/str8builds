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
      (sum, inv: Invoice) => sum + parseFloat(inv.total.toString()),
      0,
    ),
    paid: filteredInvoices
      .filter((inv: Invoice) => inv.status === "paid")
      .reduce((sum, inv: Invoice) => sum + parseFloat(inv.total.toString()), 0),
    pending: filteredInvoices
      .filter((inv: Invoice) => inv.status === "pending")
      .reduce((sum, inv: Invoice) => sum + parseFloat(inv.total.toString()), 0),
    overdue: filteredInvoices
      .filter(
        (inv: Invoice) =>
          inv.status === "pending" && new Date(inv.dueDate) < new Date(),
      )
      .reduce((sum, inv: Invoice) => sum + parseFloat(inv.total.toString()), 0),
  };

  // Handle export to PDF
  const handleExportPdf = async () => {
    try {
      toast({
        title: "Export started",
        description: "Your invoice is being prepared as PDF.",
        variant: "default",
      });

      // Create a sample invoice if none is selected
      const invoiceForExport = selectedInvoice || {
        id: 1,
        invoiceNumber: "INV-2023-001",
        clientId: 1,
        issueDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        subtotal: 1000,
        tax: 150,
        total: 1150,
        status: "pending",
        createdAt: new Date(),
      };

      // Create a sample client
      const client = {
        id: 1,
        name: "Sample Client",
        email: "client@example.com",
        phone: "021 123 4567",
        address: "123 Main Street, Auckland",
      };

      // Mock invoice items
      const items = [
        {
          description: "Construction Services",
          quantity: 1,
          rate: invoiceForExport.total * 0.8, // Mock calculation
          amount: invoiceForExport.total * 0.8,
        },
        {
          description: "Materials",
          quantity: 1,
          rate: invoiceForExport.total * 0.2, // Mock calculation
          amount: invoiceForExport.total * 0.2,
        },
      ];

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

      // Create a sample invoice if none is selected
      const invoiceForExport = selectedInvoice || {
        id: 1,
        invoiceNumber: "INV-2023-001",
        clientId: 1,
        issueDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        subtotal: 1000,
        tax: 150,
        total: 1150,
        status: "pending",
        createdAt: new Date(),
      };

      // Create a sample client
      const client = {
        id: 1,
        name: "Sample Client",
        email: "client@example.com",
        phone: "021 123 4567",
        address: "123 Main Street, Auckland",
      };

      // Mock invoice items
      const items = [
        {
          description: "Construction Services",
          quantity: 1,
          rate: invoiceForExport.total * 0.8, // Mock calculation
          amount: invoiceForExport.total * 0.8,
        },
        {
          description: "Materials",
          quantity: 1,
          rate: invoiceForExport.total * 0.2, // Mock calculation
          amount: invoiceForExport.total * 0.2,
        },
      ];

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

      // Create a sample invoice if none is selected
      const invoiceForExport = selectedInvoice || {
        id: 1,
        invoiceNumber: "INV-2023-001",
        clientId: 1,
        issueDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        subtotal: 1000,
        tax: 150,
        total: 1150,
        status: "pending",
        createdAt: new Date(),
      };

      // Create a sample client
      const client = {
        id: 1,
        name: "Sample Client",
        email: "client@example.com",
        phone: "021 123 4567",
        address: "123 Main Street, Auckland",
      };

      // Mock invoice items
      const items = [
        {
          description: "Construction Services",
          quantity: 1,
          rate: invoiceForExport.total * 0.8, // Mock calculation
          amount: invoiceForExport.total * 0.8,
        },
        {
          description: "Materials",
          quantity: 1,
          rate: invoiceForExport.total * 0.2, // Mock calculation
          amount: invoiceForExport.total * 0.2,
        },
      ];

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
      data-oid="_pal3h6"
    >
      <PageTitle
        title="Professional Invoices"
        subtitle="Create and manage professional invoices for your clients"
        icon="fa-file-invoice-dollar"
        data-oid="1j0:ptp"
      />

      {/* Statistics Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"
        data-oid="d9joxc0"
      >
        <GlassCard className="p-5" data-oid="71q-9t4">
          <div className="text-xs text-gray-400 mb-1" data-oid="0rpc5um">
            Total Value
          </div>
          <div className="text-2xl font-bold text-white" data-oid="0ho._06">
            ${formatCurrency(stats.total)}
          </div>
          <div className="text-xs text-gray-400 mt-2" data-oid="3kk5qpb">
            {filteredInvoices.length} invoices
          </div>
        </GlassCard>

        <GlassCard className="p-5" data-oid=".-y3zl0">
          <div className="text-xs text-gray-400 mb-1" data-oid="4bz19w6">
            Paid
          </div>
          <div className="text-2xl font-bold text-green-400" data-oid="bh.h_kj">
            ${formatCurrency(stats.paid)}
          </div>
          <div className="text-xs text-gray-400 mt-2" data-oid="q0l5msj">
            {
              filteredInvoices.filter((inv: Invoice) => inv.status === "paid")
                .length
            }{" "}
            invoices
          </div>
        </GlassCard>

        <GlassCard className="p-5" data-oid="x303_7d">
          <div className="text-xs text-gray-400 mb-1" data-oid="-k_jt4t">
            Pending
          </div>
          <div className="text-2xl font-bold text-blue-400" data-oid="gtrvfq2">
            ${formatCurrency(stats.pending)}
          </div>
          <div className="text-xs text-gray-400 mt-2" data-oid="72pnt_l">
            {
              filteredInvoices.filter(
                (inv: Invoice) => inv.status === "pending",
              ).length
            }{" "}
            invoices
          </div>
        </GlassCard>

        <GlassCard className="p-5" data-oid="vqr6mac">
          <div className="text-xs text-gray-400 mb-1" data-oid="y0jt6o0">
            Overdue
          </div>
          <div className="text-2xl font-bold text-red-400" data-oid="d2jensr">
            ${formatCurrency(stats.overdue)}
          </div>
          <div className="text-xs text-gray-400 mt-2" data-oid="o1gfp7q">
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
      <GlassCard className="p-5" data-oid="ncqqk49">
        {/* Top Action Bar */}
        <div
          className="flex flex-wrap justify-between items-center mb-6 gap-4"
          data-oid="y3_850n"
        >
          <div className="flex space-x-1" data-oid="cgeoib3">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 text-sm rounded-md ${
                activeTab === "all"
                  ? "bg-electric/20 text-electric"
                  : "text-gray-400 hover:bg-space-800/50"
              }`}
              data-oid="0yp359:"
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
              data-oid="r891zjr"
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
              data-oid="rrp74xo"
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
              data-oid="5cq8zb9"
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
              data-oid="8sr1n1r"
            >
              Overdue
            </button>
          </div>

          <div className="flex space-x-2" data-oid="go0jw4h">
            <div className="relative" data-oid=".a5japc">
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-space-800/50 border border-space-700 px-3 py-2 rounded-md text-sm text-white w-60 focus:outline-none focus:border-electric"
                data-oid="goc.y::"
              />

              <div
                className="absolute right-3 top-2.5 text-gray-400"
                data-oid="e9noocy"
              >
                <i className="fas fa-search" data-oid=".15vfds"></i>
              </div>
            </div>
            <div className="dropdown dropdown-end" data-oid="bj2y8g8">
              <button
                className="bg-space-800/50 border border-space-700 px-3 py-2 rounded-md text-sm text-white"
                data-oid="6ut02.5"
              >
                <i className="fas fa-ellipsis-v" data-oid="9q4z16l"></i>
              </button>
              <div
                className="dropdown-content bg-space-800 border border-space-700 rounded-md p-2 w-40 right-0 mt-1"
                data-oid="85tj:m1"
              >
                <button
                  onClick={handleExportPdf}
                  className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-space-700 rounded"
                  data-oid="txd9xnr"
                >
                  <i className="fas fa-file-pdf mr-2" data-oid="o8n.dds"></i>{" "}
                  Export PDF
                </button>
                <button
                  onClick={handleExportCsv}
                  className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-space-700 rounded"
                  data-oid="-80b8x4"
                >
                  <i className="fas fa-file-csv mr-2" data-oid="wv-r447"></i>{" "}
                  Export CSV
                </button>
                <button
                  onClick={handleEmailInvoice}
                  className="block px-4 py-2 text-sm text-white w-full text-left hover:bg-space-700 rounded"
                  data-oid="-m3dchk"
                >
                  <i className="fas fa-envelope mr-2" data-oid="2hwste5"></i>{" "}
                  Email Invoice
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                /* TODO: Add new invoice */
              }}
              className="bg-electric/80 hover:bg-electric text-white px-4 py-2 text-sm rounded-md font-medium"
              data-oid="k6p21-:"
            >
              <i className="fas fa-plus mr-1" data-oid="-wy2fl1"></i> New
              Invoice
            </button>
          </div>
        </div>

        {/* Invoice List */}
        {isLoading ? (
          <div className="space-y-3" data-oid="15d8n9i">
            <div className="flex justify-center p-10" data-oid="ab:txdc">
              <div
                className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan"
                data-oid="yfq6jn:"
              ></div>
            </div>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="space-y-2" data-oid="7upwjsa">
            <div className="p-6 text-center" data-oid="hjwun3z">
              <p className="text-gray-400" data-oid="ylclg2c">
                No invoices found matching your criteria.
              </p>
              <p className="text-xs text-gray-500 mt-1" data-oid="lc7958r">
                Try changing your filters or create a new invoice.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto" data-oid="93jsf5k">
            <table className="w-full" data-oid="wmpplv4">
              <thead className="text-left" data-oid="5ppefb2">
                <tr className="border-b border-gray-700/50" data-oid="zhlzo-d">
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium"
                    data-oid="_3wmhrw"
                  >
                    INVOICE #
                  </th>
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium"
                    data-oid="am22v:h"
                  >
                    CLIENT
                  </th>
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium"
                    data-oid="5s_moyv"
                  >
                    ISSUE DATE
                  </th>
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium"
                    data-oid="msthfr2"
                  >
                    DUE DATE
                  </th>
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium"
                    data-oid="o-bywq-"
                  >
                    STATUS
                  </th>
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium text-right"
                    data-oid="rjkoc.v"
                  >
                    AMOUNT
                  </th>
                  <th
                    className="px-4 py-2 text-xs text-gray-400 font-medium text-right"
                    data-oid="sqbrmp7"
                  >
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody data-oid="rj7jj9:">
                {filteredInvoices.map((invoice: Invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-gray-700/30 hover:bg-space-800/50 transition-colors"
                    data-oid="w84nmvt"
                  >
                    <td
                      className="px-4 py-3 text-sm text-white font-medium"
                      data-oid="u.razd3"
                    >
                      {invoice.invoiceNumber}
                    </td>
                    <td
                      className="px-4 py-3 text-sm text-white"
                      data-oid="gu1c..1"
                    >
                      {getClientName(invoice.clientId)}
                    </td>
                    <td
                      className="px-4 py-3 text-sm text-gray-400"
                      data-oid="ecnsz55"
                    >
                      {new Date(invoice.issueDate).toLocaleDateString()}
                    </td>
                    <td
                      className="px-4 py-3 text-sm text-gray-400"
                      data-oid="5tifxew"
                    >
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3" data-oid=".7lp1no">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded ${getStatusClass(
                          invoice.status || "pending",
                          invoice.dueDate.toString(),
                        )}`}
                        data-oid="-vva8au"
                      >
                        {getStatusText(invoice)}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 text-sm text-white text-right font-medium"
                      data-oid="3i_gc0o"
                    >
                      ${formatCurrency(invoice.total)}
                    </td>
                    <td className="px-4 py-3 text-right" data-oid="chi154q">
                      <div
                        className="flex space-x-1 justify-end"
                        data-oid="wqnryl-"
                      >
                        <button
                          className="p-1 text-electric hover:text-cyan"
                          onClick={() => openDetailModal(invoice)}
                          title="View"
                          data-oid="0oj6efj"
                        >
                          <i className="fas fa-eye" data-oid="k1cz-qk"></i>
                        </button>
                        <button
                          className="p-1 text-electric hover:text-cyan"
                          onClick={() =>
                            console.log("Edit invoice", invoice.id)
                          }
                          title="Edit"
                          data-oid="ml6hwca"
                        >
                          <i className="fas fa-edit" data-oid="anj75pd"></i>
                        </button>
                        <button
                          className="p-1 text-electric hover:text-cyan"
                          onClick={() =>
                            console.log("Send invoice", invoice.id)
                          }
                          title="Send"
                          data-oid="wo2sfa9"
                        >
                          <i
                            className="fas fa-paper-plane"
                            data-oid="l_98jcn"
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
