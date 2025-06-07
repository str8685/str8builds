import { FC, useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Import all tool modals
import ProjectCamModal from "@/components/tools/ProjectCamModal";
import MeasureToolModal from "@/components/tools/MeasureToolModal";
import LevelToolModal from "@/components/tools/LevelToolModal";
import AngleToolModal from "@/components/tools/AngleToolModal";
import CalculatorToolModal from "@/components/tools/CalculatorToolModal";
import SoundMeterModal from "@/components/tools/SoundMeterModal";

// TypeScript declaration for the Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface ToolsWidgetProps {
  className?: string;
}

const ToolsWidget: FC<ToolsWidgetProps> = ({ className }) => {
  const [activeToolId, setActiveToolId] = useState<number | null>(null);

  // Modal states for all tools
  const [showMeasureToolModal, setShowMeasureToolModal] = useState(false);
  const [showLevelToolModal, setShowLevelToolModal] = useState(false);
  const [showAngleToolModal, setShowAngleToolModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showSoundMeterModal, setShowSoundMeterModal] = useState(false);

  // Voice command states
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [voiceCommandTooltip, setVoiceCommandTooltip] = useState(
    "Start voice commands",
  );
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  const { toast } = useToast();

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports speech recognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      // Use type assertion to handle TypeScript issues
      const SpeechRecognitionAPI =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setTranscript(transcript);
        processVoiceCommand(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setVoiceCommandTooltip("Start voice commands");
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        setVoiceCommandTooltip("Start voice commands");

        if (event.error === "not-allowed") {
          toast({
            title: "Microphone Access Denied",
            description: "Please allow microphone access for voice commands.",
            variant: "destructive",
          });
        }
      };
    } else {
      setRecognitionSupported(false);
    }

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        stopListening();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionSupported) {
      toast({
        title: "Voice Commands Not Supported",
        description:
          "Your browser doesn't support voice commands. Try using Chrome or Edge.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    try {
      recognitionRef.current.start();
      setIsListening(true);
      setVoiceCommandTooltip("Listening... say a tool name");

      toast({
        title: "Voice Command Active",
        description:
          "Say a tool name: measure, level, angle, calculator, camera, or sound",
      });
    } catch (error) {
      console.error("Error starting speech recognition:", error);
    }
  };

  const stopListening = () => {
    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setVoiceCommandTooltip("Start voice commands");
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
    }
  };

  const processVoiceCommand = (command: string) => {
    console.log("Processing voice command:", command);

    // Look for tool names in the command
    if (command.includes("measure")) {
      setShowMeasureToolModal(true);
      toast({ title: "Opening Measure Tool" });
    } else if (command.includes("level")) {
      setShowLevelToolModal(true);
      toast({ title: "Opening Level Tool" });
    } else if (command.includes("angle")) {
      setShowAngleToolModal(true);
      toast({ title: "Opening Angle Tool" });
    } else if (command.includes("calculator") || command.includes("calc")) {
      setShowCalculatorModal(true);
      toast({ title: "Opening Calculator Tool" });
    } else if (command.includes("camera") || command.includes("cam")) {
      setShowCameraModal(true);
      toast({ title: "Opening Camera Tool" });
    } else if (command.includes("sound") || command.includes("meter")) {
      setShowSoundMeterModal(true);
      toast({ title: "Opening Sound Meter Tool" });
    } else {
      toast({
        title: "Command Not Recognized",
        description:
          "Try saying: measure, level, angle, calculator, camera, or sound",
        variant: "destructive",
      });
    }
  };

  const tools = [
    {
      id: 1,
      name: "Measure",
      description: "Precision measurement tool for construction projects",
      icon: "fas fa-ruler",
      color: "electric",
      border: "neon-border-blue",
      gradient: "from-blue-600/20 to-blue-500/5",
    },
    {
      id: 2,
      name: "Level",
      description: "Digital bubble level for perfect horizontal alignment",
      icon: "fas fa-level-up-alt fa-rotate-90",
      color: "cyan",
      border: "neon-border-cyan",
      gradient: "from-cyan-600/20 to-cyan-500/5",
    },
    {
      id: 3,
      name: "Angle",
      description: "Measures angles for precise construction work",
      icon: "fas fa-compass",
      color: "teal",
      border: "neon-border-teal",
      gradient: "from-teal-600/20 to-teal-500/5",
    },
    {
      id: 4,
      name: "Calculate",
      description: "Construction-specific calculator for material estimates",
      icon: "fas fa-calculator",
      color: "electric",
      gradient: "from-blue-600/20 to-blue-500/5",
    },
    {
      id: 5,
      name: "Project Cam",
      description: "Document project progress with integrated camera",
      icon: "fas fa-camera",
      color: "cyan",
      gradient: "from-cyan-600/20 to-cyan-500/5",
    },
    {
      id: 6,
      name: "Sound Meter",
      description: "Measure job site noise levels for safety compliance",
      icon: "fas fa-volume-up",
      color: "teal",
      gradient: "from-teal-600/20 to-teal-500/5",
    },
  ];

  const handleToolClick = (toolId: number) => {
    setActiveToolId(toolId);
    const tool = tools.find((t) => t.id === toolId);

    toast({
      title: `${tool?.name} Tool`,
      description: `Launching ${tool?.name.toLowerCase()} tool...`,
      duration: 2000,
    });

    // Handle specific tool actions based on ID
    switch (toolId) {
      case 1: // Measure
        setShowMeasureToolModal(true);
        break;
      case 2: // Level
        setShowLevelToolModal(true);
        break;
      case 3: // Angle
        setShowAngleToolModal(true);
        break;
      case 4: // Calculator
        setShowCalculatorModal(true);
        break;
      case 5: // Project Cam
        setShowCameraModal(true);
        break;
      case 6: // Sound Meter
        setShowSoundMeterModal(true);
        break;
    }

    // Reset active state after a short delay
    setTimeout(() => setActiveToolId(null), 500);
  };

  return (
    <>
      {/* Tool Modals */}
      <MeasureToolModal
        open={showMeasureToolModal}
        onOpenChange={setShowMeasureToolModal}
        data-oid="rk-tk_2"
      />

      <LevelToolModal
        open={showLevelToolModal}
        onOpenChange={setShowLevelToolModal}
        data-oid="mm.qo:b"
      />

      <AngleToolModal
        open={showAngleToolModal}
        onOpenChange={setShowAngleToolModal}
        data-oid="7w-4qql"
      />

      <CalculatorToolModal
        open={showCalculatorModal}
        onOpenChange={setShowCalculatorModal}
        data-oid="pch-w_7"
      />

      <ProjectCamModal
        open={showCameraModal}
        onOpenChange={setShowCameraModal}
        data-oid="lbimrf9"
      />

      <SoundMeterModal
        open={showSoundMeterModal}
        onOpenChange={setShowSoundMeterModal}
        data-oid="q14ay9p"
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-space-950/80 backdrop-blur-sm border-2 border-cyan-600/50",
          "shadow-xl shadow-cyan-500/10 transition-all duration-300",
          "pb-1", // Extra padding for mobile
          className,
        )}
        data-component-name="ToolsWidget"
        data-oid="aau:dyv"
      >
        {/* Subtle gradient background with animation */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-blue-900/10 to-cyan-900/20 z-0 animate-gradient-x"
          data-oid="_rv8wey"
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          data-oid="4f:fo7l"
        ></div>
        <div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
          data-oid="aeij6dj"
        ></div>

        <div
          className="relative z-10 py-2 sm:py-3 px-3 sm:px-4"
          data-oid="ugnurl."
        >
          <div
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0"
            data-oid="-3izwki"
          >
            <div
              className="flex items-center gap-2 justify-between sm:justify-start"
              data-oid="zj.sw7n"
            >
              {/* Professional Tools label */}
              <div
                className="flex-shrink-0 flex items-center"
                data-oid=":zxzt_3"
              >
                <motion.div
                  initial={{ rotateZ: 0 }}
                  animate={{ rotateZ: [0, 15, -5, 0] }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 5,
                  }}
                  className="mr-2"
                  data-oid="l0x58u."
                >
                  <i
                    className="fas fa-tools text-cyan-400"
                    data-oid="ypq89nn"
                  ></i>
                </motion.div>
                <span
                  className="text-sm font-medium text-gray-300"
                  data-oid="jenzo5-"
                >
                  Professional
                </span>
              </div>

              {/* Voice command button */}
              <TooltipProvider data-oid="i0olcw3">
                <Tooltip delayDuration={300} data-oid="lo:ps2_">
                  <TooltipTrigger asChild data-oid="guao0vc">
                    <motion.button
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center",
                        isListening
                          ? "bg-red-500/70 text-white border border-red-400/70 shadow-sm shadow-red-500/30"
                          : "bg-blue-600/20 text-cyan-400 border border-blue-500/30 hover:bg-blue-600/30",
                      )}
                      onClick={toggleListening}
                      whileTap={{ scale: 0.9 }}
                      animate={
                        isListening
                          ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }
                          : {}
                      }
                      transition={
                        isListening ? { repeat: Infinity, duration: 1.5 } : {}
                      }
                      data-oid="t1m89mi"
                    >
                      <i
                        className={`fas ${isListening ? "fa-microphone-alt" : "fa-microphone"}`}
                        data-oid="wsz2t3d"
                      ></i>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="bg-space-900/95 border border-space-700 text-white p-2"
                    data-oid="51nw-_b"
                  >
                    <p data-oid="0gymkjz">{voiceCommandTooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Mobile "All Tools" link */}
              <div className="block sm:hidden" data-oid="q6.kuad">
                <Link
                  href="/tools"
                  className="flex items-center bg-blue-600/20 border border-blue-500/40 px-2 py-1 rounded-md text-xs font-medium text-white group transition-all duration-300"
                  data-oid="efll2kg"
                >
                  <span className="mr-1" data-oid="ws9xi5f">
                    All
                  </span>
                  <i
                    className="fas fa-arrow-right text-xs transform group-hover:translate-x-1 transition-transform"
                    data-oid="u:8:er8"
                  ></i>
                </Link>
              </div>
            </div>

            {/* Horizontal tools list - scrollable on mobile */}
            <div
              className="flex-grow overflow-x-auto pb-1 -mx-3 px-3 sm:mx-0 sm:px-0 sm:overflow-hidden"
              data-oid="az9j6sg"
            >
              <div
                className="flex space-x-2 justify-start sm:justify-end min-w-max"
                data-oid="a504sl2"
              >
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    className="relative flex-shrink-0"
                    data-oid="9dj2p4v"
                  >
                    <TooltipProvider data-oid="90vzmp5">
                      <Tooltip delayDuration={300} data-oid="oo1tmw7">
                        <TooltipTrigger asChild data-oid="c4c7utg">
                          <motion.div
                            className={cn(
                              "relative flex flex-col items-center justify-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg",
                              "bg-gradient-to-b from-" +
                                tool.color +
                                "-950/30 to-space-950 border-2 border-" +
                                tool.color +
                                "-600/30",
                              "hover:border-" +
                                tool.color +
                                "-500/70 hover:shadow-md hover:shadow-" +
                                tool.color +
                                "-500/30",
                              "transition-all duration-300 cursor-pointer h-16 w-16 sm:h-20 sm:w-20 overflow-hidden",
                              activeToolId === tool.id
                                ? "scale-95 border-" +
                                    tool.color +
                                    "-500/90 bg-" +
                                    tool.color +
                                    "-900/30"
                                : "scale-100",
                            )}
                            initial={{ opacity: 1 }}
                            whileHover={{
                              borderColor: `rgba(var(--${tool.color}-rgb), 0.8)`,
                              boxShadow: `0 0 15px rgba(var(--${tool.color}-rgb), 0.5)`,
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleToolClick(tool.id)}
                            data-oid="a-lc-:3"
                          >
                            {/* Background glow effect */}
                            <motion.div
                              className={`absolute inset-0 bg-gradient-to-br from-${tool.color}-500/5 to-transparent rounded-lg opacity-0`}
                              animate={{
                                opacity:
                                  activeToolId === tool.id ? [0, 0.8, 0] : 0,
                              }}
                              transition={{
                                duration: 2,
                                repeat: activeToolId === tool.id ? Infinity : 0,
                                repeatType: "loop",
                              }}
                              data-oid="_5824rr"
                            />

                            {/* Animated border glow */}
                            <div
                              className="absolute inset-0 rounded-lg overflow-hidden"
                              data-oid="4cqh7r3"
                            >
                              <div
                                className={`absolute inset-0 ${activeToolId === tool.id ? tool.border || "" : ""}`}
                                data-oid=":-80z_u"
                              ></div>
                            </div>

                            {/* Icon with pulse effect for active tools */}
                            <div className="relative" data-oid="_7:h6x1">
                              <motion.div
                                className={`text-xl sm:text-2xl text-${tool.color}-400 z-10 relative`}
                                whileHover={{
                                  scale: 1.3,
                                  rotate: [0, -5, 5, 0],
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 10,
                                }}
                                data-oid="0ekx:gu"
                              >
                                <i className={tool.icon} data-oid="23f4sd5"></i>
                              </motion.div>

                              {/* Active tool indicator */}
                              {activeToolId === tool.id && (
                                <motion.div
                                  className="absolute -inset-4 rounded-full"
                                  animate={{
                                    boxShadow: [
                                      `0 0 0 rgba(var(--${tool.color === "electric" ? "blue" : tool.color}-rgb), 0)`,
                                      `0 0 10px rgba(var(--${tool.color === "electric" ? "blue" : tool.color}-rgb), 0.5)`,
                                      `0 0 0 rgba(var(--${tool.color === "electric" ? "blue" : tool.color}-rgb), 0)`,
                                    ],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                  }}
                                  data-oid="2dcq-:a"
                                />
                              )}
                            </div>

                            <div
                              className="text-[10px] sm:text-xs font-bold text-center text-white mt-1 sm:mt-2 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent py-0.5 sm:py-1 px-2 sm:px-3 rounded-full"
                              data-oid="lzs.br3"
                            >
                              {tool.name}
                            </div>

                            {/* Status indicator */}
                            {tool.id === 5 && (
                              <div
                                className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500 animate-pulse"
                                data-oid="r_egup0"
                              ></div>
                            )}
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          className="bg-space-900/95 border border-space-700 text-white"
                          data-oid="aa4d14h"
                        >
                          <p data-oid="jxouvs3">{tool.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop "All Tools" link */}
            <div
              className="flex-shrink-0 ml-3 hidden sm:block"
              data-oid="xo5nqx5"
            >
              <Link
                href="/tools"
                className="flex items-center bg-blue-600/20 border-2 border-blue-500/40 px-3 py-1.5 rounded-md hover:bg-blue-600/30 text-xs font-bold text-white group transition-all duration-300 shadow-md shadow-blue-500/10"
                data-oid="5qhuzh:"
              >
                <span className="mr-2" data-oid="hk.1bwi">
                  All Tools
                </span>
                <i
                  className="fas fa-arrow-right transform group-hover:translate-x-2 transition-transform"
                  data-oid="qgo0.55"
                ></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolsWidget;
