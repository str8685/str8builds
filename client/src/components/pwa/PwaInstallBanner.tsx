import { useState, useEffect, FC } from "react";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

// Interface for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const PwaInstallBanner: FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if the app is already installed
    const isAppInstalled = window.matchMedia(
      "(display-mode: standalone)",
    ).matches;

    // Check if the user has recently dismissed the banner (within 24h)
    const lastDismissed = localStorage.getItem("pwa-install-dismissed");
    const isDismissedRecently =
      lastDismissed &&
      new Date().getTime() - parseInt(lastDismissed) < 24 * 60 * 60 * 1000;

    if (isAppInstalled || isDismissedRecently) {
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();

      // Store the event for later use
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Show the install banner
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      toast({
        title: "Installation started",
        description: `${APP_NAME} is being added to your home screen.`,
      });
    }

    // Clear the deferredPrompt variable
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleDismiss = () => {
    // Store the timestamp of dismissal
    localStorage.setItem(
      "pwa-install-dismissed",
      new Date().getTime().toString(),
    );
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6"
      data-oid="b3pi8bj"
    >
      <div className="relative mx-auto max-w-md" data-oid="jj-.m3d">
        <div
          className="bg-gradient-to-r from-gray-900 to-blue-900 border border-blue-500/30 rounded-lg shadow-xl overflow-hidden backdrop-blur-xl"
          data-oid="wzk.a:a"
        >
          <div
            className="flex items-center justify-between p-4 border-b border-blue-500/20"
            data-oid="zf:3jaa"
          >
            <h3 className="text-lg font-medium text-white" data-oid="jggztmy">
              Install App
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              className="text-gray-400 hover:text-white hover:bg-blue-800/30"
              data-oid="xtznnmv"
            >
              <X className="h-5 w-5" data-oid="2b41h97" />
            </Button>
          </div>
          <div className="p-4" data-oid="881rh88">
            <p className="text-gray-300 mb-4" data-oid="joo-x7i">
              Add {APP_NAME} to your home screen for quick access to all tools
              and features while working in the field.
            </p>
            <Button
              onClick={handleInstall}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white"
              data-oid="jqxmjvt"
            >
              <Download className="mr-2 h-4 w-4" data-oid=":ijuug." />
              Install App
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PwaInstallBanner;
