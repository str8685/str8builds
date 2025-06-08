import { FC, useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface SoundMeterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SoundMeterModal: FC<SoundMeterModalProps> = ({ open, onOpenChange }) => {
  const [decibels, setDecibels] = useState<number | null>(null);
  const [peak, setPeak] = useState<number>(0);
  const [isListening, setIsListening] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [calibration, setCalibration] = useState(1.0); // Calibration factor
  const { toast } = useToast();

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (open && !audioContextRef.current) {
      requestPermission();
    }

    return () => {
      cleanupAudio();
    };
  }, [open]);

  const cleanupAudio = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
      microphoneRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setIsListening(false);
  };

  const requestPermission = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Permission granted
      setPermissionGranted(true);
      setPermissionError(null);

      // Set up audio analysis
      setupAudioContext(stream);

      toast({
        title: "Microphone Access Granted",
        description: "Sound measurement is now available.",
      });
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setPermissionError(
        "Could not access microphone. Please ensure you have granted microphone permissions.",
      );
      setPermissionGranted(false);

      toast({
        title: "Microphone Access Denied",
        description: "Sound meter requires microphone permissions to function.",
        variant: "destructive",
      });
    }
  };

  const setupAudioContext = (stream: MediaStream) => {
    try {
      // Create audio context
      const AudioContext =
        window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContext();

      // Create analyzer
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 1024;
      analyserRef.current.smoothingTimeConstant = 0.8;

      // Connect microphone to analyzer
      microphoneRef.current =
        audioContextRef.current.createMediaStreamSource(stream);
      microphoneRef.current.connect(analyserRef.current);

      // Set up data array for frequency analysis
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      setIsListening(true);

      // Start monitoring
      startMonitoring();
    } catch (err) {
      console.error("Error setting up audio context:", err);
      setPermissionError("Error initializing sound meter. Please try again.");
    }
  };

  const startMonitoring = () => {
    const updateMeter = () => {
      if (!analyserRef.current || !dataArrayRef.current) return;

      // Get frequency data
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);

      // Calculate average volume level
      let sum = 0;
      const length = dataArrayRef.current.length;

      for (let i = 0; i < length; i++) {
        sum += dataArrayRef.current[i];
      }

      const average = sum / length;

      // Convert to decibels (approximate)
      // Normal microphone input values typically range from 0-255 in the analyser
      // We scale to a more realistic dB range (30-100 dB)
      const db = 30 + ((average * 70) / 255) * calibration;

      setDecibels(db);

      // Update peak if current value is higher
      if (db > peak) {
        setPeak(db);
      }

      // Continue monitoring
      animationFrameRef.current = requestAnimationFrame(updateMeter);
    };

    // Start the monitoring loop
    updateMeter();
  };

  const toggleMonitoring = () => {
    if (isListening) {
      // Stop monitoring
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      setIsListening(false);
    } else {
      // Resume monitoring
      setIsListening(true);
      startMonitoring();
    }
  };

  const resetPeak = () => {
    setPeak(0);
  };

  // Helper to determine the color based on decibel level
  const getDecibelColor = (db: number): string => {
    if (db < 50) return "bg-green-500"; // Safe
    if (db < 70) return "bg-yellow-500"; // Moderate
    if (db < 85) return "bg-orange-500"; // High
    if (db < 95) return "bg-red-500"; // Very high
    return "bg-purple-500"; // Dangerous
  };

  // Helper to determine the label based on decibel level
  const getDecibelLabel = (db: number): string => {
    if (db < 50) return "Safe";
    if (db < 70) return "Moderate";
    if (db < 85) return "High";
    if (db < 95) return "Very High";
    return "Dangerous";
  };

  // Round to nearest decimal place
  const roundDecibel = (db: number): number => {
    return Math.round(db * 10) / 10;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} data-oid="ks920m8">
      <DialogContent
        className="bg-gradient-to-br from-space-900 via-space-950 to-space-900 border border-space-700/50 text-white max-w-md"
        data-oid="mo6ida-"
      >
        <div className="absolute inset-0 overflow-hidden" data-oid=":xi838g">
          <div
            className="absolute -inset-[100px] bg-cyan-800/5 blur-3xl rounded-full top-0 right-0 z-0"
            data-oid="jx773ui"
          ></div>
          <div
            className="absolute -inset-[100px] bg-blue-800/5 blur-3xl rounded-full bottom-0 left-0 z-0"
            data-oid="y0avicl"
          ></div>
          <div
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            data-oid="jncy31k"
          ></div>
          <div
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            data-oid="qp0y4p8"
          ></div>
        </div>

        <div className="relative z-10" data-oid="9r2qfrh">
          <DialogHeader className="mb-6" data-oid="rqkrlz0">
            <DialogTitle
              className="flex items-center text-xl font-space text-cyan-400 tracking-wide"
              data-oid="4zp--.e"
            >
              <i className="fas fa-volume-up mr-3" data-oid="nzeewvl"></i>
              <span data-oid="qldp0pr">Sound Meter</span>
            </DialogTitle>
          </DialogHeader>

          {!permissionGranted && permissionError ? (
            <div className="p-6 text-center" data-oid="j9guz65">
              <div className="text-3xl text-amber-500 mb-4" data-oid="5jins7_">
                <i
                  className="fas fa-exclamation-triangle"
                  data-oid="9g4h0qf"
                ></i>
              </div>
              <p className="text-gray-300 mb-4" data-oid="_6his9-">
                {permissionError}
              </p>
              <Button
                onClick={requestPermission}
                className="bg-cyan-700 hover:bg-cyan-600 text-white"
                data-oid="sr-0.ps"
              >
                Grant Microphone Access
              </Button>
            </div>
          ) : (
            <div className="space-y-6" data-oid="1:8nare">
              {/* Current reading */}
              <div className="flex flex-col items-center" data-oid="8h:aq48">
                <div className="text-sm text-gray-400 mb-2" data-oid=":rv5m3h">
                  Current Level
                </div>
                <div className="text-5xl font-bold mb-3" data-oid="vbp6aqq">
                  {decibels !== null ? (
                    <span
                      className={`text-${getDecibelColor(decibels).replace("bg-", "")}`}
                      data-oid="dimcxu5"
                    >
                      {roundDecibel(decibels)}
                    </span>
                  ) : (
                    <span className="text-gray-500" data-oid="y3t4tc3">
                      --
                    </span>
                  )}
                  <span
                    className="text-xl text-gray-400 ml-1"
                    data-oid="uyytc-l"
                  >
                    dB
                  </span>
                </div>

                {decibels !== null && (
                  <div
                    className={`text-sm font-medium px-3 py-1 rounded-full ${getDecibelColor(decibels)} text-white`}
                    data-oid="l:xss.j"
                  >
                    {getDecibelLabel(decibels)}
                  </div>
                )}
              </div>

              {/* Meter visualization */}
              <div className="bg-space-800 rounded-xl p-4" data-oid="il4gy6c">
                <div
                  className="h-8 bg-space-900 rounded-lg overflow-hidden relative"
                  data-oid="bkmr27f"
                >
                  <div
                    className="absolute inset-0 flex items-center"
                    data-oid="ud32o8q"
                  >
                    <div
                      className="h-full w-1 bg-gray-800 absolute left-1/5"
                      data-oid="n-f.k.x"
                    ></div>
                    <div
                      className="h-full w-1 bg-gray-800 absolute left-2/5"
                      data-oid="g8f6k27"
                    ></div>
                    <div
                      className="h-full w-1 bg-gray-800 absolute left-3/5"
                      data-oid=":jcl82l"
                    ></div>
                    <div
                      className="h-full w-1 bg-gray-800 absolute left-4/5"
                      data-oid="w6t.k8z"
                    ></div>
                  </div>

                  <motion.div
                    className={`h-full ${decibels !== null ? getDecibelColor(decibels) : "bg-gray-700"}`}
                    initial={{ width: "0%" }}
                    animate={{
                      width:
                        decibels !== null
                          ? `${Math.min(100, decibels)}%`
                          : "0%",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    data-oid="2491njb"
                  />

                  {/* Peak marker */}
                  {peak > 0 && (
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white"
                      style={{ left: `${Math.min(100, peak)}%` }}
                      data-oid="imei2qu"
                    ></div>
                  )}
                </div>

                <div
                  className="flex justify-between text-xs text-gray-400 mt-1"
                  data-oid="vpplr3o"
                >
                  <span data-oid="r3ir140">30</span>
                  <span data-oid="g60uw6.">50</span>
                  <span data-oid="713fiz:">70</span>
                  <span data-oid="o0wy9rc">85</span>
                  <span data-oid="7yqtbjm">100 dB</span>
                </div>
              </div>

              {/* Color scale */}
              <div
                className="flex rounded-lg overflow-hidden h-2"
                data-oid="ah0qnh4"
              >
                <div className="flex-1 bg-green-500" data-oid="srdl8:-"></div>
                <div className="flex-1 bg-yellow-500" data-oid="osf-mus"></div>
                <div className="flex-1 bg-orange-500" data-oid="24g:uz_"></div>
                <div className="flex-1 bg-red-500" data-oid="_4n8fzi"></div>
                <div className="flex-1 bg-purple-500" data-oid="jky_fva"></div>
              </div>

              {/* Safety levels */}
              <div
                className="bg-space-800/70 rounded-lg p-4"
                data-oid="pe03la1"
              >
                <h3
                  className="text-sm font-medium text-gray-300 mb-3"
                  data-oid="u4._0o4"
                >
                  Safety Guidelines
                </h3>
                <div className="space-y-2 text-sm" data-oid="0q_z-e4">
                  <div className="flex justify-between" data-oid="ga-58cd">
                    <span className="text-green-500" data-oid="ifd2sf2">
                      Below 50 dB
                    </span>
                    <span className="text-gray-400" data-oid="u1arj2a">
                      Safe
                    </span>
                  </div>
                  <div className="flex justify-between" data-oid="495doky">
                    <span className="text-yellow-500" data-oid="-w10dua">
                      50-70 dB
                    </span>
                    <span className="text-gray-400" data-oid="76e0w61">
                      Moderate
                    </span>
                  </div>
                  <div className="flex justify-between" data-oid="lkrp6kk">
                    <span className="text-orange-500" data-oid="uonni0j">
                      70-85 dB
                    </span>
                    <span className="text-gray-400" data-oid="ymi-u77">
                      High
                    </span>
                  </div>
                  <div className="flex justify-between" data-oid="leyfpa2">
                    <span className="text-red-500" data-oid="x-zp:8z">
                      85-95 dB
                    </span>
                    <span className="text-gray-400" data-oid="o_lo08e">
                      Very High
                    </span>
                  </div>
                  <div className="flex justify-between" data-oid="0r4kgt6">
                    <span className="text-purple-500" data-oid=".6j_1-q">
                      Above 95 dB
                    </span>
                    <span className="text-gray-400" data-oid="n0-a4ix">
                      Dangerous
                    </span>
                  </div>
                </div>
              </div>

              {/* Peak reading */}
              <div
                className="flex justify-between items-center bg-space-800/70 rounded-lg p-4"
                data-oid="yg4_o_k"
              >
                <div data-oid="070_459">
                  <div className="text-sm text-gray-400" data-oid="uemh.ty">
                    Peak Level
                  </div>
                  <div className="text-2xl font-bold" data-oid="ls2k74j">
                    {peak > 0 ? (
                      <span
                        className={`text-${getDecibelColor(peak).replace("bg-", "")}`}
                        data-oid="nszwdkn"
                      >
                        {roundDecibel(peak)}
                      </span>
                    ) : (
                      <span className="text-gray-500" data-oid=":d1.wjs">
                        --
                      </span>
                    )}
                    <span
                      className="text-sm text-gray-400 ml-1"
                      data-oid="5z829oz"
                    >
                      dB
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="bg-space-800 border-space-700 hover:bg-space-700 text-white"
                  onClick={resetPeak}
                  data-oid="5yloccd"
                >
                  Reset Peak
                </Button>
              </div>

              <div className="flex justify-between" data-oid="9xa7iz0">
                <Button
                  variant={isListening ? "default" : "outline"}
                  className={
                    isListening
                      ? "bg-cyan-700 hover:bg-cyan-600 text-white"
                      : "bg-space-800 border-space-700 hover:bg-space-700 text-white"
                  }
                  onClick={toggleMonitoring}
                  data-oid="j:bowqx"
                >
                  <i
                    className={`fas fa-${isListening ? "pause" : "play"} mr-2`}
                    data-oid="fe9:81t"
                  ></i>
                  {isListening ? "Pause" : "Resume"}
                </Button>

                <Button
                  variant="outline"
                  className="bg-space-800 border-space-700 hover:bg-space-700 text-white"
                  onClick={() => onOpenChange(false)}
                  data-oid="g9s78m5"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SoundMeterModal;
