import { FC, ReactNode, useState, useEffect } from "react";
import Header from "@/components/Header";
import AISearchBar from "@/components/AISearchBar";
import BottomNav from "@/components/BottomNav";
import PwaInstallBanner from "@/components/pwa/PwaInstallBanner";
import { useLocation } from "wouter";
import VoiceCommandListener from "@/components/VoiceCommandListener";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { useToast } from "@/hooks/use-toast";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const [location] = useLocation();
  const [voiceCommandActive, setVoiceCommandActive] = useState(false);
  const [showVoiceButton, setShowVoiceButton] = useState(false);
  const { toast } = useToast();

  // Toggle voice command activation
  const toggleVoiceCommand = () => {
    setVoiceCommandActive(!voiceCommandActive);
  };

  // Handle keyboard shortcut to show voice button (Alt+V)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+V to show/hide the voice button
      if (e.altKey && e.key === "v") {
        setShowVoiceButton((prev) => !prev);
      }

      // Escape key to hide the voice button
      if (e.key === "Escape") {
        setShowVoiceButton(false);
      }
    };

    // Display keyboard shortcut information on first load
    // Using sessionStorage to only show once per browser session
    const hasSeenShortcutInfo = sessionStorage.getItem(
      "hasSeenVoiceShortcutInfo",
    );
    if (!hasSeenShortcutInfo) {
      // Wait a bit to allow page to load first
      setTimeout(() => {
        toast({
          title: "Voice Commands Available",
          description: "Press Alt+V to show/hide the voice command button",
          variant: "default",
          duration: 5000,
        });
        sessionStorage.setItem("hasSeenVoiceShortcutInfo", "true");
      }, 2000);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toast]);

  return (
    <div
      className="bg-space-900 text-gray-100 min-h-screen overflow-x-hidden pb-20 relative"
      data-oid="qgshk1t"
    >
      {/* Animated Background */}
      <AnimatedBackground data-oid="12tirh2" />

      {/* Main Content */}
      <div className="relative z-10 max-w-full" data-oid="esw3ahd">
        <Header data-oid="6b1dld8" />
        <div
          className="px-2 sm:px-4 md:px-6 max-w-7xl mx-auto"
          data-oid="0a:5s7t"
        >
          {children}
        </div>
        <BottomNav data-oid="lfwklsj" />
        <PwaInstallBanner data-oid="8.ju71z" />
      </div>

      {/* Voice Command Listener */}
      <VoiceCommandListener
        isActive={voiceCommandActive}
        onToggle={toggleVoiceCommand}
        data-oid="lxx3po0"
      />

      {/* Microphone button for voice commands - hidden by default, shown with Alt+V */}
      {showVoiceButton && !voiceCommandActive && (
        <button
          onClick={toggleVoiceCommand}
          className="fixed right-4 bottom-20 z-40 bg-purple-800 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg btn-glow btn-glow-cyan transition-all duration-300"
          aria-label="Voice Commands"
          title="Press Alt+V to show/hide this button (Voice Commands)"
          data-oid="-avqm15"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            data-oid="pc2jf-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              data-oid="agkdmct"
            />
          </svg>
        </button>
      )}

      {/* Add FontAwesome from CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        data-oid="bo.vdph"
      />
    </div>
  );
};

// Add default export to support both named and default imports
export default AppLayout;
