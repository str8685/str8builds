import { FC, useState, useEffect, useCallback } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface VoiceCommandListenerProps {
  isActive: boolean;
  onToggle: () => void;
}

// Define the voice command response interface
interface VoiceCommandResponse {
  intent: string;
  action: string;
  parameters: Record<string, any>;
}

const VoiceCommandListener: FC<VoiceCommandListenerProps> = ({
  isActive,
  onToggle,
}) => {
  const [, navigate] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Start/stop listening based on isActive prop
  useEffect(() => {
    if (isActive && !listening && browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true });
    } else if (!isActive && listening) {
      SpeechRecognition.stopListening();
      resetTranscript();
    }

    return () => {
      if (listening) {
        SpeechRecognition.stopListening();
      }
    };
  }, [isActive, listening, browserSupportsSpeechRecognition, resetTranscript]);

  // Process the voice command with our Gemini API
  const processCommand = useCallback(
    async (command: string) => {
      try {
        setIsProcessing(true);

        // Send the command to our AI processing endpoint
        const response = await apiRequest<VoiceCommandResponse>(
          "/api/ai/voice-command",
          {
            method: "POST",
            body: JSON.stringify({ command }),
          },
        );

        // Handle the intent and perform the appropriate action
        handleCommandResponse(response);

        // Reset the transcript after processing
        resetTranscript();
      } catch (error) {
        console.error("Error processing voice command:", error);
        toast({
          title: "Command Error",
          description:
            "Unable to process your voice command. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    },
    [resetTranscript, toast],
  );

  // Check for transcript changes and process if needed
  useEffect(() => {
    // Only process if the transcript is not empty, not currently processing,
    // and the transcript hasn't changed in 1.5 seconds
    if (transcript && !isProcessing && transcript.length > 5) {
      const timer = setTimeout(() => {
        processCommand(transcript);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [transcript, isProcessing, processCommand]);

  // Handle the command response based on intent
  const handleCommandResponse = (response: VoiceCommandResponse) => {
    const { intent, action, parameters } = response;

    switch (intent) {
      case "navigation":
        handleNavigationIntent(action, parameters);
        break;
      case "timer":
        handleTimerIntent(action, parameters);
        break;
      case "calculation":
        handleCalculationIntent(action, parameters);
        break;
      case "project":
        handleProjectIntent(action, parameters);
        break;
      case "weather":
        handleWeatherIntent(action, parameters);
        break;
      default:
        toast({
          title: "Command Received",
          description: `Processing: "${transcript}"`,
        });
    }
  };

  // Navigation intent handler
  const handleNavigationIntent = (
    action: string,
    parameters: Record<string, any>,
  ) => {
    if (action === "navigate" && parameters.destination) {
      const destination = parameters.destination.toLowerCase();

      switch (destination) {
        case "dashboard":
          navigate("/");
          toast({ title: "Navigating", description: "Going to Dashboard" });
          break;
        case "jobs":
          navigate("/jobs");
          toast({ title: "Navigating", description: "Going to Jobs" });
          break;
        case "tools":
          navigate("/tools");
          toast({ title: "Navigating", description: "Going to Tools" });
          break;
        case "resources":
          navigate("/resources");
          toast({ title: "Navigating", description: "Going to Resources" });
          break;
        case "calculators":
          navigate("/calculators");
          toast({ title: "Navigating", description: "Going to Calculators" });
          break;
        default:
          toast({
            title: "Navigation Error",
            description: `Unknown destination: ${destination}`,
            variant: "destructive",
          });
      }
    }
  };

  // Timer intent handler
  const handleTimerIntent = (
    action: string,
    parameters: Record<string, any>,
  ) => {
    if (action === "start") {
      const project = parameters.project || "current project";
      toast({
        title: "Timer Started",
        description: `Started timer for ${project}`,
      });
      // Here we would trigger the actual timer functionality
    } else if (action === "stop") {
      toast({
        title: "Timer Stopped",
        description: "Stopped current timer",
      });
      // Here we would stop the timer
    }
  };

  // Calculation intent handler
  const handleCalculationIntent = (
    action: string,
    parameters: Record<string, any>,
  ) => {
    toast({
      title: "Calculation",
      description: `Performing ${action} calculation`,
    });
    // Navigate to calculators and set up the calculation
    navigate("/calculators");
  };

  // Project intent handler
  const handleProjectIntent = (
    action: string,
    parameters: Record<string, any>,
  ) => {
    if (action === "create") {
      toast({
        title: "Create Project",
        description: "Creating a new project",
      });
      navigate("/jobs");
      // Here we would open the create project form
    } else if (action === "find") {
      const projectName = parameters.name || "";
      toast({
        title: "Find Project",
        description: `Searching for project: ${projectName}`,
      });
      navigate("/jobs");
      // Here we would search for the project
    }
  };

  // Weather intent handler
  const handleWeatherIntent = (
    action: string,
    parameters: Record<string, any>,
  ) => {
    toast({
      title: "Weather Information",
      description: "Checking weather conditions",
    });
    navigate("/");
    // Here we would show the weather widget
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div
        className="text-red-500 p-4 border border-red-400 rounded mb-4"
        data-oid="2cxvqb3"
      >
        Your browser does not support speech recognition.
      </div>
    );
  }

  return (
    <div
      className={`fixed right-4 bottom-20 z-40 ${isActive ? "scale-100" : "scale-0 opacity-0"} transition-all duration-300`}
      data-oid="r4tg46j"
    >
      <div className="relative" data-oid="f_zpm9q">
        <div
          className={`bg-space-900 border ${listening ? "border-cyan animate-pulse" : "border-white/10"} rounded-full p-4 shadow-lg glass-card mb-2`}
          data-oid="bf:-:uo"
        >
          <div
            className="w-16 h-16 flex items-center justify-center relative"
            data-oid="_nu76fc"
          >
            {/* Animated waves when listening */}
            {listening && (
              <>
                <div
                  className="absolute inset-0 rounded-full bg-cyan opacity-20 animate-ping"
                  data-oid="qqn9u.w"
                ></div>
                <div
                  className="absolute inset-2 rounded-full bg-cyan opacity-10 animate-ping animation-delay-300"
                  data-oid="fet9a2t"
                ></div>
                <div
                  className="absolute inset-4 rounded-full bg-cyan opacity-5 animate-ping animation-delay-600"
                  data-oid="9h7c927"
                ></div>
              </>
            )}

            {/* Microphone Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-10 w-10 ${listening ? "text-cyan" : "text-gray-400"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              data-oid="6cke5pm"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                data-oid="1-n.htq"
              />
            </svg>
          </div>
        </div>

        {/* Transcript display */}
        {listening && transcript && (
          <div
            className="absolute -top-16 right-0 bg-space-900 text-white p-3 rounded-lg shadow-lg border border-white/10 min-w-[200px] max-w-[300px]"
            data-oid="-h_f6t3"
          >
            <p
              className="text-sm text-cyan font-semibold mb-1"
              data-oid="gww7hy8"
            >
              Listening...
            </p>
            <p className="text-xs line-clamp-2" data-oid="05i2onn">
              {transcript}
            </p>
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={onToggle}
          className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-purple-800 text-white text-xs py-1 px-3 rounded-full shadow-lg ${isActive ? "bg-red-600" : ""}`}
          data-oid="88qdo4s"
        >
          {isActive ? "Stop Listening" : "Voice Commands"}
        </button>
      </div>
    </div>
  );
};

export default VoiceCommandListener;
