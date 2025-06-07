import { FC, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Ruler, Save, RotateCcw, Camera } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const ARMeasureTool: FC = () => {
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measurements, setMeasurements] = useState<
    { id: number; length: number; unit: string }[]
  >([]);
  const [currentMeasurement, setCurrentMeasurement] = useState<{
    start: { x: number; y: number } | null;
    end: { x: number; y: number } | null;
  }>({ start: null, end: null });
  const [unit, setUnit] = useState<"cm" | "in" | "m">("cm");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  // Handle camera access
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access the camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      setIsCameraActive(false);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );
        const imageDataUrl = canvasRef.current.toDataURL("image/png");
        setImage(imageDataUrl);
        setShowCamera(false);
        stopCamera();
      }
    }
  };

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Handle canvas click for measurement
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMeasuring || !image) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!currentMeasurement.start) {
      setCurrentMeasurement({ start: { x, y }, end: null });
    } else if (!currentMeasurement.end) {
      const newMeasurement = {
        start: currentMeasurement.start,
        end: { x, y },
      };

      // Calculate distance (simple pixel distance for demo)
      const dx = newMeasurement.end.x - newMeasurement.start.x;
      const dy = newMeasurement.end.y - newMeasurement.start.y;
      const pixelDistance = Math.sqrt(dx * dx + dy * dy);

      // Convert to selected unit (simplified conversion for demo)
      let convertedDistance = pixelDistance / 10; // 10 pixels = 1 unit for demo
      if (unit === "in") {
        convertedDistance = convertedDistance / 2.54; // cm to inches
      } else if (unit === "m") {
        convertedDistance = convertedDistance / 100; // cm to meters
      }

      setMeasurements((prev) => [
        ...prev,
        {
          id: Date.now(),
          length: parseFloat(convertedDistance.toFixed(2)),
          unit,
        },
      ]);

      setCurrentMeasurement({ start: null, end: null });
      setIsMeasuring(false);
    }
  };

  // Draw on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image
    const img = new Image();
    img.onload = () => {
      // Maintain aspect ratio
      const container = containerRef.current;
      if (container) {
        const containerRatio = container.clientWidth / container.clientHeight;
        const imageRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imageRatio > containerRatio) {
          // Image is wider than container
          drawWidth = container.clientWidth;
          drawHeight = container.clientWidth / imageRatio;
          offsetX = 0;
          offsetY = (container.clientHeight - drawHeight) / 2;
        } else {
          // Image is taller than container
          drawHeight = container.clientHeight;
          drawWidth = container.clientHeight * imageRatio;
          offsetX = (container.clientWidth - drawWidth) / 2;
          offsetY = 0;
        }

        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;

        // Draw image with black bars to maintain aspect ratio
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        // Draw measurements
        measurements.forEach((measurement) => {
          // In a real app, you would draw the measurement lines and labels here
          // This is a simplified version
          ctx.beginPath();
          ctx.strokeStyle = "#00f0ff";
          ctx.lineWidth = 2;
          ctx.moveTo(measurement.id % canvas.width, 0);
          ctx.lineTo(measurement.id % canvas.width, 100);
          ctx.stroke();

          ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
          ctx.fillRect(measurement.id % canvas.width, 10, 60, 20);
          ctx.fillStyle = "#fff";
          ctx.font = "12px Arial";
          ctx.fillText(
            `${measurement.length} ${measurement.unit}`,
            (measurement.id % canvas.width) + 5,
            25,
          );
        });

        // Draw current measurement in progress
        if (currentMeasurement.start) {
          ctx.beginPath();
          ctx.strokeStyle = "#ff3366";
          ctx.lineWidth = 2;
          ctx.moveTo(currentMeasurement.start.x, currentMeasurement.start.y);
          ctx.lineTo(
            currentMeasurement.end
              ? currentMeasurement.end.x
              : currentMeasurement.start.x,
            currentMeasurement.end
              ? currentMeasurement.end.y
              : currentMeasurement.start.y,
          );
          ctx.stroke();

          // Draw start and end points
          ctx.beginPath();
          ctx.fillStyle = "#ff3366";
          ctx.arc(
            currentMeasurement.start.x,
            currentMeasurement.start.y,
            5,
            0,
            Math.PI * 2,
          );
          ctx.fill();

          if (currentMeasurement.end) {
            ctx.beginPath();
            ctx.fillStyle = "#ff3366";
            ctx.arc(
              currentMeasurement.end.x,
              currentMeasurement.end.y,
              5,
              0,
              Math.PI * 2,
            );
            ctx.fill();

            // Draw measurement text
            const dx = currentMeasurement.end.x - currentMeasurement.start.x;
            const dy = currentMeasurement.end.y - currentMeasurement.start.y;
            const pixelDistance = Math.sqrt(dx * dx + dy * dy);
            let convertedDistance = pixelDistance / 10; // Simplified conversion

            if (unit === "in") {
              convertedDistance = convertedDistance / 2.54;
            } else if (unit === "m") {
              convertedDistance = convertedDistance / 100;
            }

            const text = `${convertedDistance.toFixed(2)} ${unit}`;
            const textX =
              (currentMeasurement.start.x + currentMeasurement.end.x) / 2;
            const textY =
              (currentMeasurement.start.y + currentMeasurement.end.y) / 2;

            // Text background
            const textWidth = ctx.measureText(text).width;
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(
              textX - textWidth / 2 - 5,
              textY - 15,
              textWidth + 10,
              20,
            );

            // Text
            ctx.fillStyle = "#fff";
            ctx.font = "bold 14px Arial";
            ctx.textAlign = "center";
            ctx.fillText(text, textX, textY);
          }
        }
      }
    };

    img.src = image;
  }, [image, measurements, currentMeasurement, unit]);

  const resetMeasurements = () => {
    setMeasurements([]);
    setCurrentMeasurement({ start: null, end: null });
    setIsMeasuring(false);
  };

  const saveMeasurements = () => {
    // In a real app, you would save the measurements to a database or export them
    const data = {
      image: image,
      measurements: measurements,
      date: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `measurements-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6" data-oid="4.pnik6">
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        data-oid=".kh2fvp"
      >
        <div data-oid="gn45.l:">
          <h2 className="text-2xl font-bold text-white" data-oid="piysrts">
            AR Measure Tool
          </h2>
          <p className="text-gray-400" data-oid="1dxtbum">
            Measure objects in your space using augmented reality
          </p>
        </div>
        <div className="flex gap-2" data-oid="6lg51wc">
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as "cm" | "in" | "m")}
            className="bg-space-800 border border-space-600 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            data-oid="plxiigs"
          >
            <option value="cm" data-oid="0-frhi4">
              Centimeters (cm)
            </option>
            <option value="in" data-oid="4gj8gle">
              Inches (in)
            </option>
            <option value="m" data-oid="qdtp4b3">
              Meters (m)
            </option>
          </select>

          <button
            onClick={() => setShowCamera(!showCamera)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              showCamera
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-cyan-600 hover:bg-cyan-700 text-white"
            }`}
            data-oid="lyz966h"
          >
            <Camera className="h-4 w-4" data-oid="q444bzj" />
            {showCamera ? "Close Camera" : "Open Camera"}
          </button>
        </div>
      </div>

      {showCamera && (
        <GlassCard className="p-4 mb-6" data-oid="pm7pwm4">
          <div
            className="relative w-full h-96 bg-black rounded-lg overflow-hidden"
            data-oid="3znyppi"
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-contain"
              data-oid="xdbxt5:"
            />

            <div
              className="absolute bottom-4 left-0 right-0 flex justify-center gap-4"
              data-oid="z:-bea4"
            >
              <button
                onClick={isCameraActive ? stopCamera : startCamera}
                className={`px-4 py-2 rounded-lg font-medium ${
                  isCameraActive
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
                data-oid="go41oru"
              >
                {isCameraActive ? "Stop Camera" : "Start Camera"}
              </button>
              <button
                onClick={captureImage}
                disabled={!isCameraActive}
                className={`px-4 py-2 rounded-lg font-medium ${
                  isCameraActive
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                }`}
                data-oid="pzzy:jj"
              >
                Capture Image
              </button>
            </div>
          </div>
        </GlassCard>
      )}

      {image ? (
        <div className="relative" data-oid=".cn2dzt">
          <div
            ref={containerRef}
            className="relative w-full h-[500px] bg-black rounded-xl overflow-hidden"
            data-oid=":th.r4."
          >
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="absolute inset-0 w-full h-full cursor-crosshair"
              data-oid="ry4omja"
            />

            {!isMeasuring ? (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50"
                data-oid="6fq0pxc"
              >
                <div
                  className="text-center p-6 bg-space-900/90 rounded-xl"
                  data-oid="5e:6m22"
                >
                  <Ruler
                    className="h-12 w-12 mx-auto mb-4 text-cyan-400"
                    data-oid=".e6mmjg"
                  />

                  <h3
                    className="text-xl font-bold text-white mb-2"
                    data-oid=":1.0idg"
                  >
                    Ready to Measure
                  </h3>
                  <p className="text-gray-300 mb-4" data-oid="3qgs15q">
                    Click the "Start Measuring" button to begin taking
                    measurements
                  </p>
                  <button
                    onClick={() => setIsMeasuring(true)}
                    className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                    data-oid="r_-:l:f"
                  >
                    Start Measuring
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="absolute top-4 left-4 bg-space-900/80 text-white px-4 py-2 rounded-lg"
                data-oid="afi7gym"
              >
                <p className="text-sm" data-oid=".9ohbe9">
                  Click to set start and end points
                </p>
                <p className="text-xs text-gray-400" data-oid="4y6nxgf">
                  Click again to complete the measurement
                </p>
              </div>
            )}
          </div>

          <div
            className="mt-4 flex justify-between items-center"
            data-oid="wd0u-j2"
          >
            <div className="flex gap-2" data-oid="0he_ewn">
              {isMeasuring ? (
                <button
                  onClick={() => setIsMeasuring(false)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center gap-2"
                  data-oid="_x3k_r3"
                >
                  <RotateCcw className="h-4 w-4" data-oid="j5k80eu" />
                  Cancel Measurement
                </button>
              ) : (
                <button
                  onClick={() => setIsMeasuring(true)}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium flex items-center gap-2"
                  data-oid="zeuw-ha"
                >
                  <Ruler className="h-4 w-4" data-oid="px2ly5c" />
                  New Measurement
                </button>
              )}

              <button
                onClick={resetMeasurements}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium flex items-center gap-2"
                data-oid="wq.0jfe"
              >
                <RotateCcw className="h-4 w-4" data-oid="s.vzy3." />
                Reset All
              </button>
            </div>

            <button
              onClick={saveMeasurements}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center gap-2"
              data-oid="d9vbo8w"
            >
              <Save className="h-4 w-4" data-oid="c24vc3e" />
              Save Measurements
            </button>
          </div>

          {measurements.length > 0 && (
            <div className="mt-6" data-oid="2pwdvgs">
              <h3
                className="text-lg font-semibold text-white mb-2"
                data-oid="smuez9x"
              >
                Measurements
              </h3>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                data-oid="2:3._39"
              >
                {measurements.map((measurement, index) => (
                  <div
                    key={measurement.id}
                    className="bg-space-800/50 p-4 rounded-lg border border-space-700"
                    data-oid="2j5ykkx"
                  >
                    <div
                      className="flex justify-between items-center"
                      data-oid="oku-jc3"
                    >
                      <span className="text-gray-400" data-oid="j4qzew7">
                        Measurement {index + 1}
                      </span>
                      <span
                        className="text-2xl font-bold text-cyan-400"
                        data-oid="ekvo:ao"
                      >
                        {measurement.length} {measurement.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        !showCamera && (
          <GlassCard className="p-8 text-center" data-oid="8mb5-oh">
            <div className="max-w-md mx-auto" data-oid="kx35kzh">
              <div
                className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="55hl93."
              >
                <Camera className="h-8 w-8 text-cyan-400" data-oid="fdftso8" />
              </div>
              <h3
                className="text-xl font-bold text-white mb-2"
                data-oid="ablon.0"
              >
                No Image Captured
              </h3>
              <p className="text-gray-400 mb-6" data-oid="a1pyoax">
                Use the camera to capture an image of the area you want to
                measure.
              </p>
              <button
                onClick={() => setShowCamera(true)}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
                data-oid="_zvqaq0"
              >
                <Camera className="h-5 w-5" data-oid="mcua2th" />
                Open Camera
              </button>
            </div>
          </GlassCard>
        )
      )}

      <div
        className="mt-8 bg-space-900/50 p-6 rounded-xl border border-space-700"
        data-oid=".c3y4ji"
      >
        <h3
          className="text-lg font-semibold text-white mb-3"
          data-oid="zrspu_b"
        >
          How to Use
        </h3>
        <ol className="space-y-3 text-gray-300" data-oid="vqvjrw8">
          <li className="flex items-start" data-oid="x9qus-y">
            <span
              className="bg-cyan-500/20 text-cyan-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0"
              data-oid="zvj50fh"
            >
              1
            </span>
            <span data-oid="2ktihoq">
              Click "Open Camera" and position your device to capture the area
              you want to measure.
            </span>
          </li>
          <li className="flex items-start" data-oid="uu0pimk">
            <span
              className="bg-cyan-500/20 text-cyan-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0"
              data-oid="dns6l3i"
            >
              2
            </span>
            <span data-oid="fo8-uj7">
              Tap "Capture Image" when you have a clear view of the area.
            </span>
          </li>
          <li className="flex items-start" data-oid="12rdz6g">
            <span
              className="bg-cyan-500/20 text-cyan-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0"
              data-oid="rlurclv"
            >
              3
            </span>
            <span data-oid="_qp4n4h">
              Click "Start Measuring" and tap on two points to measure the
              distance between them.
            </span>
          </li>
          <li className="flex items-start" data-oid="tcumgrd">
            <span
              className="bg-cyan-500/20 text-cyan-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0"
              data-oid="4bzmlky"
            >
              4
            </span>
            <span data-oid="xikb_hj">
              Save your measurements when you're done.
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export { ARMeasureTool };
