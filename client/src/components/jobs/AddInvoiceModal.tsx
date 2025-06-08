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
    <AnimatePresence data-oid="v0zmeot">
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          data-oid="g.va8-k"
        >
          <motion.div
            className="bg-gradient-to-b from-space-800 to-space-950 p-8 rounded-xl max-w-lg w-full mx-4 border border-space-700 shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            data-oid="b9bvf.3"
          >
            {/* Decorative elements */}
            <div
              className="absolute -top-24 -right-24 w-48 h-48 bg-cyan/10 rounded-full blur-3xl"
              data-oid="mxi5v3t"
            ></div>
            <div
              className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-900/20 rounded-full blur-3xl"
              data-oid="mhw1au-"
            ></div>
            <div
              className="relative z-10 flex items-center justify-between mb-6"
              data-oid="za_e_b1"
            >
              <h2
                className="text-2xl font-space font-bold text-white"
                data-oid="uo75prv"
              >
                <span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-cyan to-blue-400"
                  data-oid="5..5ljs"
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
                data-oid="hbh2ik2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="d84vs5y"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    data-oid="a4is..g"
                  />
                </svg>
              </motion.button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative z-10"
              data-oid="s7we:gx"
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                data-oid="ge02jl8"
              >
                <div data-oid="wjzw0:h">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="-q-g34:"
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
                    data-oid="byxaazo"
                  />
                </div>

                <div data-oid="q65nnn3">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="c9k1e3v"
                  >
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-space-900/60 border border-space-700 rounded-lg p-3 text-sm text-white ring-offset-space-950 focus:ring-2 focus:ring-cyan/40 focus:border-cyan/70 focus:outline-none transition-all duration-200 appearance-none custom-select"
                    data-oid="cj6ki7p"
                  >
                    <option value="pending" data-oid="goe15zu">
                      Pending
                    </option>
                    <option value="sent" data-oid="hs-8tmz">
                      Sent
                    </option>
                    <option value="paid" data-oid="n3jh6jj">
                      Paid
                    </option>
                    <option value="overdue" data-oid="hat3g9y">
                      Overdue
                    </option>
                  </select>
                </div>

                <div data-oid="9_1btri">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="gbpbrtr"
                  >
                    Client
                  </label>
                  <select
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleChange}
                    className="w-full bg-space-900/60 border border-space-700 rounded-lg p-3 text-sm text-white ring-offset-space-950 focus:ring-2 focus:ring-cyan/40 focus:border-cyan/70 focus:outline-none transition-all duration-200 appearance-none custom-select"
                    required
                    data-oid="ab-zw-a"
                  >
                    <option value="" data-oid="cj2qmld">
                      -- Select Client --
                    </option>
                    {isLoadingClients ? (
                      <option disabled data-oid="4o_5d.d">
                        Loading clients...
                      </option>
                    ) : typedClients.length > 0 ? (
                      typedClients.map((client: Client) => (
                        <option
                          key={client.id}
                          value={client.id}
                          data-oid="4:6ea1b"
                        >
                          {client.name}
                        </option>
                      ))
                    ) : (
                      <option disabled data-oid="fta6eeu">
                        No clients available
                      </option>
                    )}
                  </select>
                </div>

                <div data-oid="mkbsx1k">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="37:2lci"
                  >
                    Project
                  </label>
                  <select
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleChange}
                    className="w-full bg-space-900/60 border border-space-700 rounded-lg p-3 text-sm text-white ring-offset-space-950 focus:ring-2 focus:ring-cyan/40 focus:border-cyan/70 focus:outline-none transition-all duration-200 appearance-none custom-select disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={!formData.clientId}
                    data-oid="z7:t46_"
                  >
                    <option value="" data-oid="4fwls40">
                      -- Select Project --
                    </option>
                    {isLoadingProjects ? (
                      <option disabled data-oid="v6e9:13">
                        Loading projects...
                      </option>
                    ) : filteredProjects.length > 0 ? (
                      filteredProjects.map((project: Project) => (
                        <option
                          key={project.id}
                          value={project.id}
                          data-oid="do84l1g"
                        >
                          {project.name}
                        </option>
                      ))
                    ) : (
                      <option disabled data-oid="l3353j3">
                        No projects for this client
                      </option>
                    )}
                  </select>
                </div>

                <div data-oid="lftsk_f">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="yd3zh0t"
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
                    data-oid="o6p0fg2"
                  />
                </div>

                <div data-oid="p.icbjk">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="5e4p.9a"
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
                    data-oid="nz8oocb"
                  />
                </div>

                <div data-oid="unqjktj">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="oof7-jp"
                  >
                    Subtotal ($)
                  </label>
                  <div className="relative" data-oid="sz9rzzq">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      data-oid="k-yuqw1"
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
                      data-oid="f6iw79f"
                    />
                  </div>
                </div>

                <div data-oid="fwfs6i5">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="pweu2nm"
                  >
                    Tax (GST) ($)
                  </label>
                  <div className="relative" data-oid="6l.mtwi">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      data-oid="utc4wcx"
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
                      data-oid="wbvy4.."
                    />
                  </div>
                </div>

                <div className="md:col-span-2" data-oid="si87b76">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="b73v0xr"
                  >
                    Total ($)
                  </label>
                  <div className="relative" data-oid="4:9kkll">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      data-oid="2oo1p0d"
                    >
                      $
                    </span>
                    <input
                      type="text"
                      name="total"
                      value={formData.total}
                      className="w-full bg-space-900/60 border border-space-700 rounded-lg p-3 pl-7 text-sm font-medium text-cyan bg-space-950/40 ring-offset-space-950 focus:ring-2 focus:ring-cyan/40 focus:border-cyan/70 focus:outline-none transition-all duration-200"
                      readOnly
                      data-oid="0ejm6er"
                    />
                  </div>
                  <p
                    className="text-xs text-gray-400 mt-1 italic"
                    data-oid="iqkndt9"
                  >
                    Total is calculated automatically
                  </p>
                </div>

                <div className="md:col-span-2" data-oid="so4p:bw">
                  <label
                    className="block text-xs font-medium text-cyan/80 mb-2 uppercase tracking-wider"
                    data-oid="x7uhluq"
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
                    data-oid=".mebeq_"
                  ></textarea>
                </div>
              </div>

              <div
                className="flex justify-end space-x-4 mt-8"
                data-oid="s88qxjs"
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
                  data-oid="3tklsvf"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isCreating}
                  className="bg-gradient-to-r from-purple-900 to-purple-800 text-cyan px-6 py-3 rounded-lg border border-purple-700 hover:border-cyan/30 transition-all duration-200 relative overflow-hidden shadow-lg shadow-purple-900/20 btn-glow btn-glow-cyan text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-oid="_l-6k9_"
                >
                  <span className="relative z-10" data-oid="tuusder">
                    {isCreating ? "Creating..." : "Create Invoice"}
                  </span>
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                    data-oid="a4jm42l"
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
