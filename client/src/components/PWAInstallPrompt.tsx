import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { X } from "lucide-react";
import str8BuildLogo from "@/assets/str8-build-logo.png";

interface PWAInstallPromptProps {
  className?: string;
}

const PWAInstallPrompt: FC<PWAInstallPromptProps> = ({ className = "" }) => {
  const [showBanner, setShowBanner] = useState(false);
  const { canInstall: installable, installApp: promptInstall } =
    usePWAInstall();

  // Show the banner if the app can be installed after a short delay
  useEffect(() => {
    if (installable) {
      // Check if the user has dismissed the prompt before
      const hasPromptBeenDismissed =
        localStorage.getItem("pwaPromptDismissed") === "true";

      if (!hasPromptBeenDismissed) {
        // Show the prompt sooner on login/register pages
        const isAuthPage =
          window.location.pathname.includes("/login") ||
          window.location.pathname.includes("/register");

        const timer = setTimeout(
          () => {
            setShowBanner(true);
          },
          isAuthPage ? 1000 : 3000,
        ); // Show after 1 second on auth pages, 3 seconds elsewhere

        return () => clearTimeout(timer);
      }
    }
  }, [installable]);

  // Handle install button click
  const handleInstallClick = () => {
    promptInstall();
    setShowBanner(false);
  };

  // Close the banner
  const handleClose = () => {
    setShowBanner(false);

    // Store in localStorage so we don't show the prompt again in this session
    localStorage.setItem("pwaPromptDismissed", "true");
  };

  if (!installable || !showBanner) return null;

  return (
    <AnimatePresence data-oid="eech85d">
      {showBanner && (
        <motion.div
          className={`fixed bottom-16 left-0 right-0 z-50 mx-auto px-4 ${className}`}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          data-oid="npoqz1-"
        >
          <div
            className="max-w-md mx-auto bg-gradient-to-br from-space-800 to-space-900 rounded-xl shadow-2xl overflow-hidden border border-blue-500/30"
            data-oid="npathwi"
          >
            <div className="p-4 relative" data-oid=":2u37yi">
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white rounded-full"
                data-oid="ecw02jg"
              >
                <X size={20} data-oid="trr4ddm" />
              </button>

              <div className="flex items-center" data-oid="jk2sgpr">
                <img
                  src={str8BuildLogo}
                  alt="STR8 BUILD"
                  className="w-14 h-auto mr-4 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  data-oid="3-fydix"
                />

                <div data-oid="bk25soj">
                  <h3
                    className="text-lg font-bold text-white"
                    data-oid="fqj440_"
                  >
                    Install STR8 BUILD
                  </h3>
                  <p className="text-sm text-blue-200" data-oid="..ra-.t">
                    Add to your home screen for quick access
                  </p>
                </div>
              </div>

              <div className="mt-3 flex justify-end" data-oid="0f4jz3y">
                <button
                  onClick={handleClose}
                  className="mr-2 px-3 py-1.5 text-sm text-blue-300 hover:text-blue-100"
                  data-oid="5v4:rdk"
                >
                  Not now
                </button>
                <button
                  onClick={handleInstallClick}
                  className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  data-oid="5:331ci"
                >
                  Install
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;
