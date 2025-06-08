import { useState, useEffect } from "react";
// DEBUG MODE - Set to true to always show the prompt for testing
const DEBUG_MODE = true;
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ArrowRight } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface InstallPromptProps {
  forceShow?: boolean;
}

const InstallPrompt = ({ forceShow = false }: InstallPromptProps) => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Force show or DEBUG MODE - Always show prompt for testing
    if (forceShow || DEBUG_MODE) {
      console.log(
        "InstallPrompt: FORCE SHOW or DEBUG MODE ENABLED - Always showing prompt",
      );
      setShowPrompt(true);
      return;
    }

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Show prompt after a delay to allow page to load fully
      setTimeout(() => {
        console.log(
          "InstallPrompt: Showing prompt after beforeinstallprompt event",
        );
        setShowPrompt(true);
      }, 2000);
    };

    console.log("InstallPrompt: Setting up beforeinstallprompt listener");
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Clean up event listener
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  // Listen for successful install
  useEffect(() => {
    const handleAppInstalled = () => {
      setInstalled(true);
      setShowPrompt(false);
      setShowAnimation(true);

      // Hide success animation after a few seconds
      setTimeout(() => {
        setShowAnimation(false);
      }, 3000);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (DEBUG_MODE) {
      console.log("InstallPrompt: DEBUG MODE - Install button clicked");
      // Show success animation in debug mode
      setInstalled(true);
      setShowPrompt(false);
      setShowAnimation(true);

      // Hide success animation after a few seconds
      setTimeout(() => {
        setShowAnimation(false);
      }, 3000);
      return;
    }

    if (!deferredPrompt) {
      console.log("InstallPrompt: No deferred prompt available");
      return;
    }

    // Show the install prompt
    console.log("InstallPrompt: Showing browser install prompt");
    await deferredPrompt.prompt();

    // Wait for user choice
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt");
      setInstalled(true);
    } else {
      console.log("User dismissed the install prompt");
    }

    // Clear the deferred prompt variable
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
  };

  if (installed && !showAnimation) return null;

  return (
    <AnimatePresence data-oid="umka9ma">
      {showPrompt && !installed && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-80 bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-400/30 rounded-lg shadow-lg shadow-cyan-500/20 p-4 z-50"
          data-oid="z1h2p97"
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-lg backdrop-blur-sm -z-10"
            data-oid="z9:::xx"
          ></div>
          <button
            onClick={dismissPrompt}
            className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Dismiss"
            data-oid="4sl3myc"
          >
            <X size={18} data-oid="5ft:vg7" />
          </button>

          <div className="flex items-center" data-oid="t292kz0">
            <div
              className="mr-4 bg-gradient-to-tr from-cyan-500 to-blue-600 p-2 rounded-lg shadow-lg shadow-cyan-500/30"
              data-oid="qnli20z"
            >
              <Download size={24} className="text-white" data-oid="5687.6x" />
            </div>
            <div data-oid="vbcq2e0">
              <h3
                className="text-white font-semibold text-lg"
                data-oid="p4r:345"
              >
                Install STR8 BUILD
              </h3>
              <p className="text-gray-300 text-sm mt-1" data-oid="rr0txbu">
                Add to your home screen for easier access
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-end" data-oid=".m25uyb">
            <button
              onClick={handleInstall}
              className="group flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-lg shadow-cyan-500/20 font-medium transition-all duration-300 transform hover:scale-105"
              data-oid="0byjphe"
            >
              Install Now
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
                data-oid="acs.98k"
              />
            </button>
          </div>
        </motion.div>
      )}

      {showAnimation && installed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-4 right-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg shadow-green-500/20 p-4 z-50"
          data-oid="s:mmwre"
        >
          <div className="flex items-center" data-oid="dvf_jws">
            <div className="mr-3" data-oid="0ixcsyk">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                data-oid="p-50325"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                  data-oid="pxwgaxg"
                />
              </svg>
            </div>
            <p className="text-white font-medium" data-oid="xrg83r3">
              Successfully installed!
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPrompt;
