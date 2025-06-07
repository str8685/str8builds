import { FC, useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AngleToolModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AngleToolModal: FC<AngleToolModalProps> = ({ open, onOpenChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [centerPoint, setCenterPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [endPoint, setEndPoint] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [angle, setAngle] = useState<number | null>(null);
  const [stage, setStage] = useState<"center" | "start" | "end">("center");
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      resetTool();
    }
  }, [open]);

  const resetTool = () => {
    setCenterPoint(null);
    setStartPoint(null);
    setEndPoint(null);
    setAngle(null);
    setStage("center");

    // Clear canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
        redrawCanvas();
      }
    };

    window.addEventListener("resize", handleResize);

    if (open && containerRef.current && canvasRef.current) {
      setTimeout(() => {
        handleResize();
      }, 100);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open, centerPoint, startPoint, endPoint]);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = "rgba(31, 41, 55, 0.5)"; // gray-800 with opacity
    ctx.lineWidth = 1;

    // Draw center point
    if (centerPoint) {
      // Draw center point
      drawPoint(ctx, centerPoint.x, centerPoint.y, "#22d3ee"); // cyan-400

      // Draw start line
      if (startPoint) {
        ctx.beginPath();
        ctx.moveTo(centerPoint.x, centerPoint.y);
        ctx.lineTo(startPoint.x, startPoint.y);
        ctx.strokeStyle = "#22d3ee"; // cyan-400
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw start point
        drawPoint(ctx, startPoint.x, startPoint.y, "#22d3ee"); // cyan-400

        // Draw end line
        if (endPoint) {
          ctx.beginPath();
          ctx.moveTo(centerPoint.x, centerPoint.y);
          ctx.lineTo(endPoint.x, endPoint.y);
          ctx.strokeStyle = "#22d3ee"; // cyan-400
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw end point
          drawPoint(ctx, endPoint.x, endPoint.y, "#22d3ee"); // cyan-400

          // Draw angle arc
          const startAngle = Math.atan2(
            startPoint.y - centerPoint.y,
            startPoint.x - centerPoint.x,
          );
          const endAngle = Math.atan2(
            endPoint.y - centerPoint.y,
            endPoint.x - centerPoint.x,
          );

          // Calculate angle between the two lines
          let angleDiff = (endAngle - startAngle) * (180 / Math.PI);

          // Normalize angle to 0-360
          if (angleDiff < 0) {
            angleDiff += 360;
          }

          // Use smaller angle (always <= 180)
          if (angleDiff > 180) {
            angleDiff = 360 - angleDiff;
          }

          setAngle(angleDiff);

          // Draw arc
          ctx.beginPath();
          ctx.arc(
            centerPoint.x,
            centerPoint.y,
            30, // radius
            startAngle,
            endAngle,
            startAngle > endAngle,
          );
          ctx.strokeStyle = "#f59e0b"; // amber-500
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw angle text
          const midAngle = (startAngle + endAngle) / 2;
          const textX = centerPoint.x + Math.cos(midAngle) * 50;
          const textY = centerPoint.y + Math.sin(midAngle) * 50;

          const text = `${angleDiff.toFixed(1)}°`;
          ctx.font = "16px Arial";
          const textWidth = ctx.measureText(text).width;

          // Draw background for text
          ctx.fillStyle = "rgba(15, 23, 42, 0.75)"; // space-900 with opacity
          ctx.fillRect(
            textX - textWidth / 2 - 5,
            textY - 10,
            textWidth + 10,
            20,
          );

          // Draw text
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(text, textX, textY);
        }
      }
    }
  };

  const drawPoint = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
  ) => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (stage === "center") {
      setCenterPoint({ x, y });
      setStage("start");
      toast({
        title: "Center Point Set",
        description: "Now click to place the first angle line.",
      });
    } else if (stage === "start") {
      setStartPoint({ x, y });
      setStage("end");
      toast({
        title: "First Line Set",
        description: "Now click to place the second angle line.",
      });
    } else if (stage === "end") {
      setEndPoint({ x, y });
      toast({
        title: "Angle Measured",
        description: "You can reset or adjust your measurement.",
      });
    }

    redrawCanvas();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} data-oid=".voij9z">
      <DialogContent
        className="bg-gradient-to-br from-space-900 via-space-950 to-space-900 border border-space-700/50 text-white max-w-4xl h-[80vh] flex flex-col p-0"
        data-oid="b7bcm7f"
      >
        <div className="absolute inset-0 overflow-hidden" data-oid="lj1w.__">
          <div
            className="absolute -inset-[100px] bg-cyan-800/5 blur-3xl rounded-full top-0 right-0 z-0"
            data-oid="3qilek5"
          ></div>
          <div
            className="absolute -inset-[100px] bg-blue-800/5 blur-3xl rounded-full bottom-0 left-0 z-0"
            data-oid="zw2:p3-"
          ></div>
          <div
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            data-oid="m39_kgr"
          ></div>
          <div
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            data-oid="4mo0rqt"
          ></div>
        </div>

        <div
          className="relative z-10 flex flex-col h-full p-6"
          data-oid="fty15-q"
        >
          <DialogHeader className="mb-4 flex-shrink-0" data-oid=":2:55a1">
            <DialogTitle
              className="flex items-center text-xl font-space text-cyan-400 tracking-wide"
              data-oid="_2x7udt"
            >
              <i className="fas fa-compass mr-3" data-oid="t2b:bv2"></i>
              <span data-oid="j:6dj_y">Angle Measurement Tool</span>
            </DialogTitle>
          </DialogHeader>

          <div className="flex-grow flex flex-col mb-4" data-oid="k7w_qcm">
            <div
              className="bg-space-900/70 p-4 rounded-lg mb-4 text-sm text-gray-300"
              data-oid="1wv2qwq"
            >
              <p data-oid="8:pwkxx">
                {stage === "center" &&
                  "Click to place the center point of your angle."}
                {stage === "start" &&
                  "Click to place the first line of your angle."}
                {stage === "end" &&
                  "Click to place the second line of your angle."}
              </p>
              {angle !== null && (
                <div
                  className="mt-2 text-lg text-white font-medium"
                  data-oid="62g-w8h"
                >
                  <span data-oid=":d7.q8v">Measured Angle: </span>
                  <span className="text-cyan-400" data-oid="q3o26xz">
                    {angle.toFixed(1)}°
                  </span>
                </div>
              )}
            </div>

            <div
              className="flex-grow relative rounded-lg overflow-hidden border border-space-700/50"
              ref={containerRef}
              data-oid="e35z_g3"
            >
              {/* Background grid pattern */}
              <div
                className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFmMmE0NCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')]"
                data-oid="lo-7_7:"
              ></div>

              <canvas
                ref={canvasRef}
                className="absolute inset-0 cursor-crosshair"
                onClick={handleCanvasClick}
                data-oid="qhyn-79"
              />
            </div>
          </div>

          <DialogFooter
            className="flex-shrink-0 flex justify-between items-center"
            data-oid=".fers.8"
          >
            <Button
              variant="outline"
              className="bg-space-800 border-space-700 hover:bg-space-700 text-white"
              onClick={resetTool}
              data-oid="ejjbnn2"
            >
              <i className="fas fa-redo mr-2" data-oid="p7gigdm"></i> Reset
            </Button>

            <Button
              onClick={() => onOpenChange(false)}
              className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white"
              data-oid="xyt0sg7"
            >
              Close
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AngleToolModal;
