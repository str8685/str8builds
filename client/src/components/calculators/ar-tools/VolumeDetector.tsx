import { FC, useState, useEffect, useRef } from "react";
import { Mic, Volume2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export const VolumeDetector: FC = () => {
  const [volume, setVolume] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number>(0);

  const initAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 32;

      microphoneRef.current =
        audioContextRef.current.createMediaStreamSource(stream);
      microphoneRef.current.connect(analyserRef.current);

      setIsListening(true);
      analyzeVolume();
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setIsSupported(false);
    }
  };

  const stopAudio = () => {
    cancelAnimationFrame(animationFrameRef.current);
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
      microphoneRef.current.mediaStream
        .getTracks()
        .forEach((track) => track.stop());
    }
    setIsListening(false);
  };

  const analyzeVolume = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }

    const average = sum / dataArray.length;
    setVolume(Math.min(100, average));

    animationFrameRef.current = requestAnimationFrame(analyzeVolume);
  };

  useEffect(() => {
    return () => {
      stopAudio();
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      stopAudio();
    } else {
      initAudio();
    }
  };

  return (
    <GlassCard className="p-6" data-oid="lveofz1">
      <div
        className="flex items-center justify-between mb-4"
        data-oid="cwa3rnl"
      >
        <h2 className="text-xl font-bold text-white" data-oid="1puui1e">
          Volume Detector
        </h2>
        <Volume2 className="text-cyan-400" data-oid="haz4juq" />
      </div>

      {!isSupported ? (
        <div className="text-center py-8 text-red-400" data-oid="bcwybmd">
          Microphone access not supported or permission denied
        </div>
      ) : (
        <>
          <div
            className="relative w-full h-8 bg-space-800/50 rounded-full overflow-hidden mb-4"
            data-oid=".pqj5wf"
          >
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-cyan-600 transition-all duration-100"
              style={{ width: `${volume}%` }}
              data-oid="z6u005-"
            />

            <div
              className="absolute inset-0 flex items-center justify-center"
              data-oid="o73gwtp"
            >
              <span
                className="text-xs font-medium text-white mix-blend-overlay"
                data-oid="j93uee-"
              >
                {volume.toFixed(0)}%
              </span>
            </div>
          </div>

          <button
            onClick={toggleListening}
            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${isListening ? "bg-red-500/90 hover:bg-red-500" : "bg-cyan-500/90 hover:bg-cyan-500"}`}
            data-oid="ap5z5m1"
          >
            <Mic className="w-5 h-5" data-oid="j19lhkd" />
            {isListening ? "Stop Listening" : "Start Listening"}
          </button>

          <p
            className="text-xs text-gray-400 mt-3 text-center"
            data-oid="pvx7f5."
          >
            {isListening
              ? "Listening to microphone..."
              : "Click the button to start detecting volume levels"}
          </p>
        </>
      )}
    </GlassCard>
  );
};
