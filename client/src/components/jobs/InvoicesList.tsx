import { FC } from "react";
import { useInvoices } from "@/hooks/useInvoices";
import { Invoice } from "@shared/schema";

const InvoicesList: FC = () => {
  const {
    invoices = [],
    isLoading,
    formatCurrency,
    getStatusText,
    openDetailModal,
  } = useInvoices();

  // Explicitly type the invoices array
  const typedInvoices = invoices as Invoice[];

  // Determine status class for styling
  const getStatusClass = (status: string, dueDate: string): string => {
    if (status === "paid") return "text-green-400";

    const daysRemaining = getDaysRemaining(dueDate);
    if (daysRemaining < 0) return "text-red-400";
    if (daysRemaining < 3) return "text-yellow-400";
    return "text-cyan";
  };

  // Calculate days remaining until due date
  const getDaysRemaining = (dueDate: string): number => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (isLoading) {
    return (
      <div className="space-y-3" data-oid="8l1p_zy">
        <div className="flex justify-center p-10" data-oid="fs2gx:7">
          <div
            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan"
            data-oid="_dsh6hw"
          ></div>
        </div>
      </div>
    );
  }

  // Use typed invoices array
  const displayInvoices = typedInvoices;

  if (displayInvoices.length === 0) {
    return (
      <div className="space-y-2" data-oid="e1v:sv:">
        <div
          className="p-6 text-center bg-space-800/50 rounded-lg"
          data-oid=":z5c:23"
        >
          <p className="text-gray-400" data-oid="u7xpqo0">
            No invoices found.
          </p>
          <p className="text-xs text-gray-500 mt-1" data-oid="qwasp7_">
            Add a new invoice to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-oid="63_njsr">
      {displayInvoices.map((invoice: Invoice) => (
        <div
          key={invoice.id}
          className="flex justify-between items-center p-3 bg-space-800/50 rounded-lg hover:bg-space-800/80 transition-colors"
          data-oid="dccjao9"
        >
          <div className="flex-1" data-oid="w9xxixp">
            <div className="text-sm font-medium text-white" data-oid="6jbdji3">
              {invoice.invoiceNumber}
            </div>
            <div className="text-xs text-gray-400" data-oid="u4t04w2">
              {`Client #${invoice.clientId || "Unknown"}`} |{" "}
              {getStatusText(invoice)}
            </div>
          </div>
          <div className="text-right" data-oid="jvufh8s">
            <div
              className={`text-sm font-medium ${getStatusClass(invoice.status || "pending", invoice.dueDate.toString())}`}
              data-oid="cyusps_"
            >
              ${formatCurrency(invoice.total)}
            </div>
            <div className="flex space-x-2 mt-1" data-oid="x1on1i6">
              <button
                className="text-xs text-electric hover:text-cyan"
                onClick={() => openDetailModal(invoice)}
                title="View"
                data-oid="76kwt6d"
              >
                <i className="fas fa-eye" data-oid="tz73rkj"></i>
              </button>
              <button
                className="text-xs text-electric hover:text-cyan"
                onClick={() => console.log("Edit invoice", invoice.id)}
                title="Edit"
                data-oid="acrs-k2"
              >
                <i className="fas fa-edit" data-oid="-.6udba"></i>
              </button>
              <button
                className="text-xs text-electric hover:text-cyan"
                onClick={() => console.log("Send invoice", invoice.id)}
                title="Send"
                data-oid="pi:ejdp"
              >
                <i className="fas fa-paper-plane" data-oid="6jar77w"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoicesList;
