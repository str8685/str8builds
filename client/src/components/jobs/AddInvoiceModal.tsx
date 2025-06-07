import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInvoices } from "@/hooks/useInvoices";
import { useClients } from "@/hooks/useClients";
import { useProjects } from "@/hooks/useProjects";
import { toast } from "@/hooks/use-toast";
import { Client, Project } from "@shared/schema";

interface AddInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddInvoiceModal: FC<AddInvoiceModalProps> = ({ isOpen, onClose }) => {
  const { createInvoice, isCreating } = useInvoices();
  const { clients = [], isLoading: isLoadingClients } = useClients();
  const { projects = [], isLoading: isLoadingProjects } = useProjects();

  // Explicitly type the arrays
  const typedClients = clients as Client[];
  const typedProjects = projects as Project[];

  // Generate invoice number
  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `INV-${year}-${month}${random}`;
  };

  // Set default due date (14 days from today)
  const getDefaultDueDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    userId: 1, // Default user ID
    clientId: 0,
    projectId: 0,
    invoiceNumber: generateInvoiceNumber(),
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: getDefaultDueDate(),
    subtotal: "0.00",
    tax: "0.00",
    total: "0.00",
    status: "pending",
    notes: "",
  });

  // Reset the form when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setFormData({
        userId: 1,
        clientId: 0,
        projectId: 0,
        invoiceNumber: generateInvoiceNumber(),
        issueDate: new Date().toISOString().split("T")[0],
        dueDate: getDefaultDueDate(),
        subtotal: "0.00",
        tax: "0.00",
        total: "0.00",
        status: "pending",
        notes: "",
      });
    }
  }, [isOpen]);

  // Filter projects based on selected client
  const filteredProjects = typedProjects.filter(
    (project) =>
      formData.clientId && project.clientId === Number(formData.clientId),
  );

  // Calculate totals when subtotal or tax changes
  useEffect(() => {
    const subtotal = parseFloat(formData.subtotal) || 0;
    const tax = parseFloat(formData.tax) || 0;
    const total = (subtotal + tax).toFixed(2);

    setFormData((prev) => ({
      ...prev,
      total,
    }));
  }, [formData.subtotal, formData.tax]);

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

    try {
      // Format the data
      const invoiceData = {
        ...formData,
        // Convert string IDs to numbers
        clientId: Number(formData.clientId) || null,
        projectId: Number(formData.projectId) || null,
        // Convert string amounts to numbers
        subtotal: formData.subtotal,
        tax: formData.tax,
        total: formData.total,
        // Convert string dates to Date objects
        issueDate: new Date(formData.issueDate),
        dueDate: new Date(formData.dueDate),
      };

      console.log("Creating invoice with data:", invoiceData);
      createInvoice(invoiceData);

      // Manual close to avoid dialog issues
      setTimeout(() => {
        onClose();
      }, 100);
    } catch (error) {
      console.error("Error creating invoice:", error);
      toast({
        title: "Error",
        description: "There was a problem creating the invoice.",
        variant: "destructive",
      });
    }
  };

  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <AnimatePresence data-oid="4oldzxl">
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          data-oid="qznogwo"
        >
          <motion.div
            className="bg-gradient-to-b from-space-800 to-space-950 p-8 rounded-xl max-w-lg w-full mx-4 border border-space-700 shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            data-oid="_g.dfyl"
          >
            {/* Decorative elements */}
            <div
              className="absolute -top-24 -right-24 w-48 h-48 bg-cyan/10 rounded-full blur-3xl"
              data-oid="z28-ime"
            ></div>
            <div
              className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-900/20 rounded-full blur-3xl"
              data-oid=":alvchz"
            ></div>
            <div
              className="relative z-10 flex items-center justify-between mb-6"
              data-oid="c76m301"
            >
              <h2
                className="text-2xl font-space font-bold text-white"
                data-oid="ok2bu_s"
              >
                <span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-cyan to-blue-400"
                  data-oid="q7abhit"
                >
                  Create New Invoice
                </span>
              </h2>
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="text-gray-400 hover:text-white rounded-full p-1 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                data-oid="0e-mzw:"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="htd.zei"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    data-oid=".ysq78e"
                  />
                </svg>
              </motion.button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative z-10"
              data-oid="573oj1k"
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                data-oid="8ds-hvb"
              >
                <div data-oid="up4uetj">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="152fa57"
                  >
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleChange}
                    className="w-full bg-space-900/60 border border-space-700 rounded-lg p-3 text-sm text-white ring-offset-space-950 focus:ring-2 focus:ring-cyan/40 focus:border-cyan/70 focus:outline-none transition-all duration-200 placeholder-gray-500"
                    required
                    data-oid="6v60_cq"
                  />
                </div>

                <div data-oid="epmafxk">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="kqp331f"
                  >
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-space-900/60 border border-space-700 rounded-lg p-3 text-sm text-white ring-offset-space-950 focus:ring-2 focus:ring-cyan/40 focus:border-cyan/70 focus:outline-none transition-all duration-200 appearance-none custom-select"
                    data-oid="8vi3npz"
                  >
                    <option value="pending" data-oid="u1vr4cy">
                      Pending
                    </option>
                    <option value="sent" data-oid="meizti4">
                      Sent
                    </option>
                    <option value="paid" data-oid="1n2293g">
                      Paid
                    </option>
                    <option value="overdue" data-oid="lzrx38b">
                      Overdue
                    </option>
                  </select>
                </div>

                <div data-oid="furb6.q">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="iefx9_7"
                  >
                    Client
                  </label>
                  <select
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleChange}
                    className="w-full bg-space-900/60 border border-space-700 rounded-lg p-3 text-sm text-white ring-offset-space-950 focus:ring-2 focus:ring-cyan/40 focus:border-cyan/70 focus:outline-none transition-all duration-200 appearance-none custom-select"
                    required
                    data-oid="-zmxxnf"
                  >
                    <option value="" data-oid="nea:uni">
                      -- Select Client --
                    </option>
                    {isLoadingClients ? (
                      <option disabled data-oid="gz79aa1">
                        Loading clients...
                      </option>
                    ) : typedClients.length > 0 ? (
                      typedClients.map((client: Client) => (
                        <option
                          key={client.id}
                          value={client.id}
                          data-oid="ol9gcof"
                        >
                          {client.name}
                        </option>
                      ))
                    ) : (
                      <option disabled data-oid="d280zap">
                        No clients available
                      </option>
                    )}
                  </select>
                </div>

                <div data-oid="x86esqk">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="78qetga"
                  >
                    Project
                  </label>
                  <select
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleChange}
                    className="w-full bg-space-900/60 border border-space-700 rounded-lg p-3 text-sm text-white ring-offset-space-950 focus:ring-2 focus:ring-cyan/40 focus:border-cyan/70 focus:outline-none transition-all duration-200 appearance-none custom-select disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={!formData.clientId}
                    data-oid="7vz3rej"
                  >
                    <option value="" data-oid="7wll3gq">
                      -- Select Project --
                    </option>
                    {isLoadingProjects ? (
                      <option disabled data-oid="xdiu62:">
                        Loading projects...
                      </option>
                    ) : filteredProjects.length > 0 ? (
                      filteredProjects.map((project: Project) => (
                        <option
                          key={project.id}
                          value={project.id}
                          data-oid="hdzsw3r"
                        >
                          {project.name}
                        </option>
                      ))
                    ) : (
                      <option disabled data-oid="eiyue94">
                        No projects for this client
                      </option>
                    )}
                  </select>
                </div>

                <div data-oid="t_.xuj6">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="lv3zr00"
                  >
                    Issue Date
                  </label>
                  <input
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleChange}
                    className="w-full bg-space-900/60 border border-space-700 rounded-lg p-3 text-sm text-white ring-offset-space-950 focus:ring-2 focus:ring-cyan/40 focus:border-cyan/70 focus:outline-none transition-all duration-200 custom-date-input"
                    required
                    data-oid=":tymdzm"
                  />
                </div>

                <div data-oid="z.xqdl3">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="0vnonhp"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full bg-space-900/60 border border-space-700 rounded-lg p-3 text-sm text-white ring-offset-space-950 focus:ring-2 focus:ring-cyan/40 focus:border-cyan/70 focus:outline-none transition-all duration-200 custom-date-input"
                    required
                    data-oid="eukkn8h"
                  />
                </div>

                <div data-oid="ly6g9_y">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="34-77t:"
                  >
                    Subtotal ($)
                  </label>
                  <div className="relative" data-oid="r6wr:wc">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      data-oid="j9yvj1a"
                    >
                      $
                    </span>
                    <input
                      type="number"
                      name="subtotal"
                      value={formData.subtotal}
                      onChange={handleChange}
                      className="w-full bg-space-900/60 border border-space-700 rounded-lg p-3 pl-7 text-sm text-white ring-offset-space-950 focus:ring-2 focus:ring-cyan/40 focus:border-cyan/70 focus:outline-none transition-all duration-200"
                      step="0.01"
                      min="0"
                      required
                      data-oid="6p41z6k"
                    />
                  </div>
                </div>

                <div data-oid="p6_o3xk">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="3v1fe83"
                  >
                    Tax (GST) ($)
                  </label>
                  <div className="relative" data-oid="ryv0xif">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      data-oid="-cqu3oj"
                    >
                      $
                    </span>
                    <input
                      type="number"
                      name="tax"
                      value={formData.tax}
                      onChange={handleChange}
                      className="w-full bg-space-900/60 border border-space-700 rounded-lg p-3 pl-7 text-sm text-white ring-offset-space-950 focus:ring-2 focus:ring-cyan/40 focus:border-cyan/70 focus:outline-none transition-all duration-200"
                      step="0.01"
                      min="0"
                      data-oid="ekwyl.w"
                    />
                  </div>
                </div>

                <div className="md:col-span-2" data-oid="6cn-pih">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="5rio8.v"
                  >
                    Total ($)
                  </label>
                  <div className="relative" data-oid="y:6ka3g">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      data-oid="8a6.dj1"
                    >
                      $
                    </span>
                    <input
                      type="text"
                      name="total"
                      value={formData.total}
                      className="w-full bg-space-900/60 border border-space-700 rounded-lg p-3 pl-7 text-sm font-medium text-cyan bg-space-950/40 ring-offset-space-950 focus:ring-2 focus:ring-cyan/40 focus:border-cyan/70 focus:outline-none transition-all duration-200"
                      readOnly
                      data-oid="tzyh5wc"
                    />
                  </div>
                  <p
                    className="text-xs text-gray-400 mt-1 italic"
                    data-oid="39q-09g"
                  >
                    Total is calculated automatically
                  </p>
                </div>

                <div className="md:col-span-2" data-oid="abu0b5k">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="bt9uq7v"
                  >
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full bg-space-900/60 border border-space-700 rounded-lg p-3 text-sm text-white ring-offset-space-950 focus:ring-2 focus:ring-cyan/40 focus:border-cyan/70 focus:outline-none transition-all duration-200 resize-none"
                    rows={3}
                    placeholder="Additional information for this invoice..."
                    data-oid="p_2wvx9"
                  ></textarea>
                </div>
              </div>

              <div
                className="flex justify-end space-x-4 mt-8"
                data-oid="nn:ajn."
              >
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="bg-space-800/80 text-gray-300 px-5 py-3 rounded-lg border border-space-700 hover:bg-space-700 transition-all duration-200 text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-oid="g8st2y4"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isCreating}
                  className="bg-gradient-to-r from-purple-900 to-purple-800 text-cyan px-6 py-3 rounded-lg border border-purple-700 hover:border-cyan/30 transition-all duration-200 relative overflow-hidden shadow-lg shadow-purple-900/20 btn-glow btn-glow-cyan text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-oid="34c3x:z"
                >
                  <span className="relative z-10" data-oid="sk71ceo">
                    {isCreating ? "Creating..." : "Create Invoice"}
                  </span>
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                    data-oid="z5589xr"
                  ></span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddInvoiceModal;
