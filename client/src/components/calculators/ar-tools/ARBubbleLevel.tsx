import { FC, useState, useEffect } from "react";
import { Move3D, Rotate3D } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export const ARBubbleLevel: FC = () => {
  const [orientation, setOrientation] = useState<{
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
  }>({ alpha: null, beta: null, gamma: null });

  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!window.DeviceOrientationEvent) {
      setIsSupported(false);
      return;
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      });
    };

    window.addEventListener("deviceorientation", handleOrientation, true);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const getBubblePosition = () => {
    if (orientation.beta === null || orientation.gamma === null)
      return { x: 50, y: 50 };

    // Normalize values to bubble position (0-100)
    const x = 50 + orientation.gamma / 1.8;
    const y = 50 + orientation.beta / 1.8;

    return {
      x: Math.min(90, Math.max(10, x)),
      y: Math.min(90, Math.max(10, y)),
    };
  };

  const bubblePosition = getBubblePosition();
  const isLevel =
    Math.abs(bubblePosition.x - 50) < 5 && Math.abs(bubblePosition.y - 50) < 5;

  return (
    <GlassCard className="p-6" data-oid="vyq4kxt">
      <div
        className="flex items-center justify-between mb-4"
        data-oid="td7hq0i"
      >
        <h2 className="text-xl font-bold text-white" data-oid="u6.e2w6">
          Bubble Level
        </h2>
        <div className="flex items-center gap-2" data-oid="x7v81oy">
          <Move3D className="text-cyan-400" data-oid="g4zpd6b" />
          <Rotate3D className="text-cyan-400" data-oid="04xwhqw" />
        </div>
      </div>

      {!isSupported ? (
        <div className="text-center py-8 text-red-400" data-oid="mmo83w2">
          Device orientation not supported on this device
        </div>
      ) : (
        <div
          className="relative w-full aspect-square bg-space-800/50 rounded-xl overflow-hidden"
          data-oid="o3aw8le"
        >
          {/* Level container */}
          <div
            className="absolute inset-4 border-2 border-cyan-400/30 rounded-lg"
            data-oid="npaf-k:"
          >
            {/* Center crosshair */}
            <div
              className="absolute top-1/2 left-0 right-0 h-px bg-cyan-400/50 transform -translate-y-1/2"
              data-oid=".q:1xhx"
            />

            <div
              className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-400/50 transform -translate-x-1/2"
              data-oid="5a2di8w"
            />

            {/* Bubble */}
            <div
              className="absolute w-8 h-8 bg-cyan-400/90 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 shadow-lg"
              style={{
                left: `${bubblePosition.x}%`,
                top: `${bubblePosition.y}%`,
                boxShadow: isLevel ? "0 0 15px #22d3ee" : "none",
              }}
              data-oid="u2211w1"
            />
          </div>

          <div
            className="absolute bottom-4 left-0 right-0 text-center"
            data-oid="ty9kc6l"
          >
            <p className="text-sm text-gray-300" data-oid="ysedy5b">
              {isLevel ? "LEVEL!" : "Tilt your device to move the bubble"}
            </p>
            <p className="text-xs text-gray-400 mt-1" data-oid="4z.7h7b">
              X: {orientation.gamma?.toFixed(1) ?? "--"}° | Y:{" "}
              {orientation.beta?.toFixed(1) ?? "--"}°
            </p>
          </div>
        </div>
      )}
    </GlassCard>
  );
};
