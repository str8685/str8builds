import { FC } from "react";
import GlassCard from "@/components/ui/GlassCard";

const PendingInvoices: FC = () => {
  const invoices = [
    {
      id: 1,
      number: "INV-2025-042",
      client: "Bay Builders Ltd",
      dueDate: "Due in 5 days",
      amount: 1450.0,
      overdue: false,
    },
    {
      id: 2,
      number: "INV-2025-039",
      client: "Tauranga Home Concepts",
      dueDate: "Overdue",
      amount: 2440.5,
      overdue: true,
    },
  ];

  const totalAmount = invoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0,
  );

  return (
    <GlassCard className="p-4" data-oid="d.cuiy6">
      <div className="flex justify-between items-start mb-3" data-oid="9u_f:-x">
        <h3 className="text-md font-space text-white" data-oid="_7cjgql">
          Pending Invoices
        </h3>
        <span className="text-cyan" data-oid="g4v71e5">
          <i className="fas fa-file-invoice-dollar" data-oid="j27c_p:"></i>
        </span>
      </div>

      <div
        className="text-2xl font-space font-bold text-cyan mb-2"
        data-oid="47ha9nc"
      >
        ${totalAmount.toFixed(2)}
      </div>

      <div className="space-y-1" data-oid="wyf4a08">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className={`flex justify-between items-center py-2 border-b border-gray-700 relative rounded ${
              !invoice.overdue ? "active-job-card px-2 -mx-2" : ""
            }`}
            data-oid="tgwkfjf"
          >
            <div className="text-sm" data-oid="h4mvmkh">
              <div className="flex items-center" data-oid="y:ifg61">
                {!invoice.overdue && (
                  <span
                    className="h-2 w-2 rounded-full bg-green-400 mr-1.5 animate-pulse"
                    data-oid="ofv0fa4"
                  ></span>
                )}
                <span className="text-white" data-oid="1ea226f">
                  {invoice.number}
                </span>
              </div>
              <div className="text-xs text-gray-400" data-oid="_qru3:p">
                {invoice.client} | {invoice.dueDate}
              </div>
            </div>
            <div
              className={`text-sm font-medium ${invoice.overdue ? "text-red-400" : "text-cyan"}`}
              data-oid="jkju_z:"
            >
              ${invoice.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3" data-oid=".5xu3or">
        <button
          className="text-sm text-cyan hover:text-white w-full py-2 border border-cyan/30 rounded-md btn-glow btn-glow-cyan"
          data-oid="6:4hpdt"
        >
          Create New Invoice
        </button>
      </div>
    </GlassCard>
  );
};

export default PendingInvoices;
