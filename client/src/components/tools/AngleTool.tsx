import { FC, useState, useRef, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";

const AngleTool: FC = () => {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [angle, setAngle] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clear the canvas and draw the angle
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the points and lines
    if (points.length > 0) {
      ctx.fillStyle = "#00b4ff"; // Electric blue color

      // Draw points
      points.forEach((point, index) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Add point labels
        ctx.fillStyle = "#ffffff";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(["A", "B", "C"][index], point.x, point.y - 15);
        ctx.fillStyle = "#00b4ff";
      });

      // Draw lines
      if (points.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(points[1].x, points[1].y);
        ctx.lineTo(points[0].x, points[0].y);
        ctx.strokeStyle = "#06f7f7"; // Cyan color
        ctx.lineWidth = 2;
        ctx.stroke();

        if (points.length >= 3) {
          ctx.beginPath();
          ctx.moveTo(points[1].x, points[1].y);
          ctx.lineTo(points[2].x, points[2].y);
          ctx.stroke();

          // Draw angle arc
          const centerPoint = points[1];
          const startAngle = Math.atan2(
            points[0].y - centerPoint.y,
            points[0].x - centerPoint.x,
          );
          const endAngle = Math.atan2(
            points[2].y - centerPoint.y,
            points[2].x - centerPoint.x,
          );

          ctx.beginPath();
          ctx.arc(centerPoint.x, centerPoint.y, 20, startAngle, endAngle);
          ctx.stroke();

          // Calculate and display the angle
          let angleDegrees = ((endAngle - startAngle) * 180) / Math.PI;

          // Ensure the angle is positive
          if (angleDegrees < 0) {
            angleDegrees += 360;
          }

          // Always show the smaller angle (≤ 180°)
          if (angleDegrees > 180) {
            angleDegrees = 360 - angleDegrees;
          }

          setAngle(angleDegrees);

          // Display the angle
          const radius = 40;
          const midAngle = (startAngle + endAngle) / 2;
          const textX = centerPoint.x + radius * Math.cos(midAngle);
          const textY = centerPoint.y + radius * Math.sin(midAngle);

          ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
          ctx.fillRect(textX - 30, textY - 15, 60, 30);

          ctx.fillStyle = "#ffffff";
          ctx.font = "12px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(`${angleDegrees.toFixed(1)}°`, textX, textY);
        }
      }
    }
  };

  useEffect(() => {
    drawCanvas();
  }, [points]);

  // Handle canvas clicks
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (points.length < 3) {
      setPoints((prev) => [...prev, { x, y }]);
    } else {
      // Start a new measurement
      setPoints([{ x, y }]);
      setAngle(null);
    }
  };

  // Reset the measurement
  const resetMeasurement = () => {
    setPoints([]);
    setAngle(null);
    drawCanvas();
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
    <GlassCard className="p-6" data-oid="wqb5q_c">
      <div
        className="flex justify-between items-center mb-6"
        data-oid="ug:gu7:"
      >
        <h2
          className="text-xl font-space font-bold text-white"
          data-oid="pg61abx"
        >
          Angle Tool
        </h2>
        <button
          className="text-xs bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700"
          onClick={resetMeasurement}
          data-oid="ban8cvi"
        >
          Reset
        </button>
      </div>

      <div
        className="text-center mb-4 text-gray-300 text-sm"
        data-oid="chmwuqy"
      >
        {points.length === 0
          ? "Tap to set point A"
          : points.length === 1
            ? "Tap to set point B (vertex)"
            : points.length === 2
              ? "Tap to set point C"
              : `Measured angle: ${angle?.toFixed(1)}°`}
      </div>

      <div
        ref={containerRef}
        className="relative h-64 bg-space-900 rounded-lg border border-space-800 overflow-hidden"
        data-oid=":ahv52-"
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="absolute inset-0 cursor-crosshair"
          data-oid=".2:sx_0"
        />
      </div>

      <div
        className="mt-4 text-xs text-gray-400 text-center"
        data-oid="sjzv0fk"
      >
        Set three points to measure the angle between two lines.
      </div>
    </GlassCard>
  );
};

export default AngleTool;
