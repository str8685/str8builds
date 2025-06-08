import { FC, useState, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";

const LevelTool: FC = () => {
  const [angle, setAngle] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [calibrationOffset, setCalibrationOffset] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  // Check if device orientation is supported
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if DeviceOrientationEvent is supported
    if (!window.DeviceOrientationEvent) {
      setIsSupported(false);
      return;
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null) {
        setIsSupported(false);
        return;
      }

      // Apply calibration offset
      const x = Math.round(event.gamma - calibrationOffset.x);
      const y = Math.round(event.beta - calibrationOffset.y);

      setAngle({ x, y });
    };

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [calibrationOffset]);

  const calibrate = () => {
    setCalibrationOffset({ x: angle.x, y: angle.y });
    setIsCalibrated(true);
  };

  const resetCalibration = () => {
    setCalibrationOffset({ x: 0, y: 0 });
    setIsCalibrated(false);
  };

  // Calculate bubble position
  const getBubbleStyle = () => {
    // Constrain the bubble movement to the container
    const maxOffset = 40; // Maximum distance the bubble can move
    const xOffset = Math.min(Math.max(angle.x * -1.5, -maxOffset), maxOffset);
    const yOffset = Math.min(Math.max(angle.y * 1.5, -maxOffset), maxOffset);

    return {
      transform: `translate(${xOffset}px, ${yOffset}px)`,
    };
  };

  // Determine if level is within 1 degree of level
  const isLevel = Math.abs(angle.x) <= 1 && Math.abs(angle.y) <= 1;

  return (
    <GlassCard className="p-6" data-oid="g:.357k">
      <div
        className="flex justify-between items-center mb-6"
        data-oid="9qybrn5"
      >
        <h2
          className="text-xl font-space font-bold text-white"
          data-oid="f9fcwev"
        >
          Digital Level
        </h2>
        <div className="flex space-x-2" data-oid="wn:r-j.">
          <button
            className="text-xs bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700"
            onClick={isCalibrated ? resetCalibration : calibrate}
            data-oid="g7_buyh"
          >
            {isCalibrated ? "Reset Calibration" : "Calibrate"}
          </button>
        </div>
      </div>

      {!isSupported ? (
        <div className="text-center p-8" data-oid=".vj6bgs">
          <div className="text-red-400 text-lg mb-2" data-oid="sfozao.">
            <i className="fas fa-exclamation-triangle" data-oid="cevx46x"></i>
          </div>
          <h3
            className="text-lg font-medium text-white mb-2"
            data-oid="k8j6vpq"
          >
            Device Sensors Not Available
          </h3>
          <p className="text-gray-300 text-sm mb-4" data-oid="czm.4yk">
            This tool requires device orientation sensors which are not
            available on your device or browser. Try using a mobile device or
            enabling sensors in your browser settings.
          </p>
        </div>
      ) : (
        <>
          {/* Horizontal level */}
          <div className="mb-6" data-oid="o2ztol4">
            <div
              className="relative h-16 bg-space-900 rounded-full overflow-hidden mb-2 border border-space-800"
              data-oid="ol3edz8"
            >
              <div
                className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-600"
                data-oid=":w10:nm"
              ></div>
              <div
                className={`absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4 rounded-full ${isLevel ? "bg-teal" : "bg-cyan"} transition-all duration-100`}
                style={getBubbleStyle()}
                data-oid="36tvtoo"
              ></div>
            </div>
            <div
              className="flex justify-between px-2 text-xs text-gray-400"
              data-oid="myliwtw"
            >
              <span data-oid="zgvfb-8">-5°</span>
              <span data-oid="--hv:a:">Level</span>
              <span data-oid="moh0xe4">+5°</span>
            </div>
          </div>

          {/* Angle readings */}
          <div
            className="grid grid-cols-2 gap-4 text-center"
            data-oid="4u-m21z"
          >
            <div className="bg-space-900 rounded-lg p-4" data-oid="uskbekm">
              <div className="text-xs text-gray-400 mb-1" data-oid="5o7u_7-">
                X-Axis
              </div>
              <div
                className={`text-2xl font-space font-bold ${isLevel ? "text-teal" : "text-white"}`}
                data-oid="u6ih9f8"
              >
                {angle.x}°
              </div>
            </div>
            <div className="bg-space-900 rounded-lg p-4" data-oid="1ueicf-">
              <div className="text-xs text-gray-400 mb-1" data-oid="ohq7y95">
                Y-Axis
              </div>
              <div
                className={`text-2xl font-space font-bold ${isLevel ? "text-teal" : "text-white"}`}
                data-oid="drlwq94"
              >
                {angle.y}°
              </div>
            </div>
          </div>
        </>
      )}
    </GlassCard>
  );
};

export default LevelTool;
