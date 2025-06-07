import { FC, useState, useEffect } from "react";
import { useClients } from "@/hooks/useClients";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddClientModal: FC<AddClientModalProps> = ({ isOpen, onClose }) => {
  const { createClient, isCreating } = useClients();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    userId: user?.id || 2, // Use authenticated user ID or fallback to demo ID
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  // Update userId if user changes (after login)
  useEffect(() => {
    if (user?.id) {
      setFormData((prev) => ({ ...prev, userId: user.id }));
    }
  }, [user?.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createClient(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="eslsc:s">
      <DialogContent
        className="bg-gradient-to-b from-space-800 via-space-900 to-space-950 border-2 border-space-600/70 shadow-xl text-white max-w-lg relative overflow-hidden rounded-xl"
        style={{
          boxShadow:
            "0 0 40px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 0, 0, 0.5), inset 0 0 1px rgba(255, 255, 255, 0.1)",
          backgroundImage: `
          radial-gradient(circle at 10% 10%, rgba(59, 130, 246, 0.05), transparent 20%), 
          radial-gradient(circle at 90% 90%, rgba(14, 165, 233, 0.05), transparent 25%)
        `,
        }}
        data-oid="tij_n9x"
      >
        {/* Decorative elements */}
        <div
          className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-cyan/20 to-transparent rounded-full blur-2xl opacity-20 pointer-events-none"
          data-oid="_klgml6"
        ></div>
        <div
          className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-purple-600/20 to-transparent rounded-full blur-2xl opacity-20 pointer-events-none"
          data-oid="0201lb7"
        ></div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden opacity-[0.03] pointer-events-none"
          data-oid="ik1bt_3"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
            data-oid="y43_u5b"
          ></div>
        </div>
        <DialogHeader className="relative z-10 mb-2" data-oid="h5xyv3o">
          <div className="flex items-center mb-1" data-oid="cg0ixbm">
            <div
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400/20 to-purple-500/20 flex items-center justify-center mr-3 border border-space-600/50"
              data-oid="q.0.fe6"
            >
              <i
                className="fas fa-building text-blue-400"
                data-oid="8ettpe-"
              ></i>
            </div>
            <DialogTitle
              className="text-xl font-space bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              data-oid="8r0ov.l"
            >
              Add New Client
            </DialogTitle>
          </div>
          <p className="text-gray-400 text-sm ml-11" data-oid="jqy245f">
            Create a new client to associate with your projects
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} data-oid="yl.am.i">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 relative z-10"
            data-oid="u90qyi0"
          >
            <div className="md:col-span-2" data-oid="6oc4v:x">
              <label
                className="block text-xs text-blue-400 font-medium mb-1.5 uppercase tracking-wide"
                data-oid="0tu3rk3"
              >
                Company Name
              </label>
              <div className="relative" data-oid="j-jmpc8">
                <div
                  className="absolute left-2.5 top-2.5 text-blue-400/70"
                  data-oid="lhuwo5_"
                >
                  <i className="fas fa-building" data-oid="n2ylh24"></i>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-space-800/90 border border-space-600/70 rounded-lg p-2.5 pl-9 text-sm text-white shadow-inner focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 focus:outline-none transition-colors duration-200"
                  placeholder="Enter company name..."
                  required
                  data-oid="oel8cac"
                />
              </div>
            </div>

            <div data-oid="izmyf00">
              <label
                className="block text-xs text-cyan font-medium mb-1.5 uppercase tracking-wide"
                data-oid=":dybqyd"
              >
                Contact Person
              </label>
              <div className="relative" data-oid=":mrov.c">
                <div
                  className="absolute left-2.5 top-2.5 text-cyan/70"
                  data-oid="zi9_fvt"
                >
                  <i className="fas fa-user" data-oid="5.9:k67"></i>
                </div>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full bg-space-800/90 border border-space-600/70 rounded-lg p-2.5 pl-9 text-sm text-white shadow-inner focus:border-cyan focus:ring-1 focus:ring-cyan/30 focus:outline-none transition-colors duration-200"
                  placeholder="Primary contact name..."
                  data-oid="t5vgxkz"
                />
              </div>
            </div>

            <div data-oid="nw.busx">
              <label
                className="block text-xs text-purple-400 font-medium mb-1.5 uppercase tracking-wide"
                data-oid="yp388lf"
              >
                Email
              </label>
              <div className="relative" data-oid="-hoikw7">
                <div
                  className="absolute left-2.5 top-2.5 text-purple-400/70"
                  data-oid="1z1__m-"
                >
                  <i className="fas fa-envelope" data-oid="sg4_.h3"></i>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-space-800/90 border border-space-600/70 rounded-lg p-2.5 pl-9 text-sm text-white shadow-inner focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 focus:outline-none transition-colors duration-200"
                  placeholder="client@example.com"
                  data-oid="zxfy575"
                />
              </div>
            </div>

            <div data-oid="_h40ci4">
              <label
                className="block text-xs text-green-400 font-medium mb-1.5 uppercase tracking-wide"
                data-oid="x1mk561"
              >
                Phone
              </label>
              <div className="relative" data-oid=":kb:6rt">
                <div
                  className="absolute left-2.5 top-2.5 text-green-400/70"
                  data-oid="op8.k-d"
                >
                  <i className="fas fa-phone" data-oid="jv9s9mr"></i>
                </div>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-space-800/90 border border-space-600/70 rounded-lg p-2.5 pl-9 text-sm text-white shadow-inner focus:border-green-400 focus:ring-1 focus:ring-green-400/30 focus:outline-none transition-colors duration-200"
                  placeholder="(555) 123-4567"
                  data-oid="u.wnh86"
                />
              </div>
            </div>

            <div className="md:col-span-2" data-oid="4yi0-mi">
              <label
                className="block text-xs text-electric font-medium mb-1.5 uppercase tracking-wide"
                data-oid="83vdcz_"
              >
                Address
              </label>
              <div className="relative" data-oid="7:yv85g">
                <div
                  className="absolute left-2.5 top-2.5 text-electric/70"
                  data-oid="p89m21v"
                >
                  <i className="fas fa-map-marker-alt" data-oid="-c..82-"></i>
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-space-800/90 border border-space-600/70 rounded-lg p-2.5 pl-9 text-sm text-white shadow-inner focus:border-electric focus:ring-1 focus:ring-electric/30 focus:outline-none transition-colors duration-200"
                  placeholder="123 Business St, City, Postal Code"
                  data-oid="rjqfmk:"
                />
              </div>
            </div>

            <div className="md:col-span-2" data-oid="c.bbbge">
              <label
                className="block text-xs text-gray-300 font-medium mb-1.5 uppercase tracking-wide"
                data-oid="bt2ggi7"
              >
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full bg-space-800/90 border border-space-600/70 rounded-lg p-3 text-sm text-white shadow-inner focus:border-gray-400 focus:ring-1 focus:ring-gray-400/30 focus:outline-none transition-colors duration-200"
                rows={3}
                placeholder="Additional information about the client..."
                data-oid="r:hi2uy"
              ></textarea>
            </div>
          </div>

          <DialogFooter
            className="relative z-10 border-t border-space-700/50 pt-4 mt-2"
            data-oid="7k_44ty"
          >
            <div className="flex space-x-3" data-oid="3w3670t">
              <button
                type="button"
                onClick={onClose}
                className="bg-space-800 text-white px-5 py-2.5 rounded-lg hover:bg-space-700 border border-space-600/50 transition-colors duration-200"
                data-oid="0vtp4bp"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="bg-gradient-to-r from-blue-500 to-cyan text-white font-medium px-5 py-2.5 rounded-lg shadow-glow-md hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center min-w-32"
                data-oid="16jo2h_"
              >
                {isCreating ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      data-oid="uk.ujt6"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        data-oid="xyg1oqn"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        data-oid="64gkqha"
                      ></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-plus mr-2" data-oid="jv2nyhk"></i>{" "}
                    Create Client
                  </>
                )}
              </button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientModal;
