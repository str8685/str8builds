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
    <GlassCard className="p-6" data-oid="w6q2bgt">
      <div
        className="flex justify-between items-center mb-6"
        data-oid="_.n3d2x"
      >
        <h2
          className="text-xl font-space font-bold text-white"
          data-oid="m-qjmbf"
        >
          Digital Level
        </h2>
        <div className="flex space-x-2" data-oid="s6t5.ao">
          <button
            className="text-xs bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700"
            onClick={isCalibrated ? resetCalibration : calibrate}
            data-oid="p:y1zcn"
          >
            {isCalibrated ? "Reset Calibration" : "Calibrate"}
          </button>
        </div>
      </div>

      {!isSupported ? (
        <div className="text-center p-8" data-oid="q1qa9b5">
          <div className="text-red-400 text-lg mb-2" data-oid="w1rjvqh">
            <i className="fas fa-exclamation-triangle" data-oid="t0n03pe"></i>
          </div>
          <h3
            className="text-lg font-medium text-white mb-2"
            data-oid="pkpxo2j"
          >
            Device Sensors Not Available
          </h3>
          <p className="text-gray-300 text-sm mb-4" data-oid="55t62:m">
            This tool requires device orientation sensors which are not
            available on your device or browser. Try using a mobile device or
            enabling sensors in your browser settings.
          </p>
        </div>
      ) : (
        <>
          {/* Horizontal level */}
          <div className="mb-6" data-oid="rb5ygjn">
            <div
              className="relative h-16 bg-space-900 rounded-full overflow-hidden mb-2 border border-space-800"
              data-oid="gewb1rq"
            >
              <div
                className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-600"
                data-oid="0m5ke-z"
              ></div>
              <div
                className={`absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4 rounded-full ${isLevel ? "bg-teal" : "bg-cyan"} transition-all duration-100`}
                style={getBubbleStyle()}
                data-oid="0t:f4cy"
              ></div>
            </div>
            <div
              className="flex justify-between px-2 text-xs text-gray-400"
              data-oid="p2h72g_"
            >
              <span data-oid="2pssr6b">-5°</span>
              <span data-oid=":hs:ygn">Level</span>
              <span data-oid="ke8auoc">+5°</span>
            </div>
          </div>

          {/* Angle readings */}
          <div
            className="grid grid-cols-2 gap-4 text-center"
            data-oid="oj3xi5h"
          >
            <div className="bg-space-900 rounded-lg p-4" data-oid="or.k::b">
              <div className="text-xs text-gray-400 mb-1" data-oid="a42t44p">
                X-Axis
              </div>
              <div
                className={`text-2xl font-space font-bold ${isLevel ? "text-teal" : "text-white"}`}
                data-oid="knj1.1m"
              >
                {angle.x}°
              </div>
            </div>
            <div className="bg-space-900 rounded-lg p-4" data-oid="wjfoj3i">
              <div className="text-xs text-gray-400 mb-1" data-oid="zcu84lo">
                Y-Axis
              </div>
              <div
                className={`text-2xl font-space font-bold ${isLevel ? "text-teal" : "text-white"}`}
                data-oid="pxlz1bj"
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
