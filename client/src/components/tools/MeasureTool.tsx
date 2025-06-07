import { FC, useState, useRef, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";

const MeasureTool: FC = () => {
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const [pixelRatio, setPixelRatio] = useState<number>(0);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [endPoint, setEndPoint] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [distance, setDistance] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate the device's pixel ratio for accurate measurements
  useEffect(() => {
    if (window.devicePixelRatio) {
      setPixelRatio(window.devicePixelRatio);
    } else {
      // Default to 1 if not available
      setPixelRatio(1);
    }
  }, []);

  // Clear the canvas and draw the measurement line
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the line if we have both points
    if (startPoint && endPoint) {
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.strokeStyle = "#06f7f7"; // Cyan color
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw points
      ctx.fillStyle = "#00b4ff"; // Electric blue color

      // Start point
      ctx.beginPath();
      ctx.arc(startPoint.x, startPoint.y, 5, 0, Math.PI * 2);
      ctx.fill();

      // End point
      ctx.beginPath();
      ctx.arc(endPoint.x, endPoint.y, 5, 0, Math.PI * 2);
      ctx.fill();

      // Calculate and display the distance
      const dx = endPoint.x - startPoint.x;
      const dy = endPoint.y - startPoint.y;
      const pixelDistance = Math.sqrt(dx * dx + dy * dy);

      // Convert to real-world units based on device pixel ratio
      // This is approximate and would need calibration for accuracy
      // For a real application, you would need to calibrate based on a known reference
      const inchDistance = pixelDistance / (96 * pixelRatio); // 96 DPI is common
      const cmDistance = inchDistance * 2.54;

      setDistance(unit === "cm" ? cmDistance : inchDistance);

      // Display the measurement on the line
      const midX = (startPoint.x + endPoint.x) / 2;
      const midY = (startPoint.y + endPoint.y) / 2;

      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(midX - 40, midY - 15, 80, 30);

      ctx.fillStyle = "#ffffff";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${distance.toFixed(1)} ${unit}`, midX, midY);
    }
  };

  useEffect(() => {
    drawCanvas();
  }, [startPoint, endPoint, unit, pixelRatio]);

  // Handle canvas clicks
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!startPoint || (startPoint && endPoint)) {
      // Start a new measurement
      setStartPoint({ x, y });
      setEndPoint(null);
    } else {
      // Complete the measurement
      setEndPoint({ x, y });
    }
  };

  // Reset the measurement
  const resetMeasurement = () => {
    setStartPoint(null);
    setEndPoint(null);
    setDistance(0);
    drawCanvas();
  };

  // Toggle between cm and inches
  const toggleUnit = () => {
    setUnit((prev) => (prev === "cm" ? "in" : "cm"));
  };

  // Update canvas dimensions on mount and on window resize
  useEffect(() => {
    const updateCanvasDimensions = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;

      if (canvas && container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        drawCanvas();
      }
    };

    window.addEventListener("resize", updateCanvasDimensions);
    updateCanvasDimensions();

    return () => {
      window.removeEventListener("resize", updateCanvasDimensions);
    };
  }, []);

  return (
    <GlassCard className="p-6" data-oid="jq-1osv">
      <div
        className="flex justify-between items-center mb-6"
        data-oid="mxtwf7j"
      >
        <h2
          className="text-xl font-space font-bold text-white"
          data-oid="vbh52jx"
        >
          Measurement Tool
        </h2>
        <div className="flex space-x-2" data-oid="3u0_yuy">
          <button
            className="text-xs bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700"
            onClick={toggleUnit}
            data-oid="5_beep0"
          >
            {unit.toUpperCase()}
          </button>
          <button
            className="text-xs bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700"
            onClick={resetMeasurement}
            data-oid="8y2cy5w"
          >
            Reset
          </button>
        </div>
      </div>

      <div
        className="text-center mb-4 text-gray-300 text-sm"
        data-oid="qh4glvg"
      >
        {!startPoint
          ? "Tap to set the start point"
          : !endPoint
            ? "Tap to set the end point"
            : `Measured: ${distance.toFixed(1)} ${unit}`}
      </div>

      <div
        ref={containerRef}
        className="relative h-64 bg-space-900 rounded-lg border border-space-800 overflow-hidden"
        data-oid="9bjbpza"
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="absolute inset-0 cursor-crosshair"
          data-oid="x0p0azj"
        />
      </div>

      <div
        className="mt-4 text-xs text-gray-400 text-center"
        data-oid="3e83wqp"
      >
        Note: For accurate measurements, you may need to calibrate the tool
        against a known reference.
      </div>
    </GlassCard>
  );
};

export default MeasureTool;
