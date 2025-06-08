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

interface MeasureToolModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MeasureToolModal: FC<MeasureToolModalProps> = ({
  open,
  onOpenChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [endPoint, setEndPoint] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [distance, setDistance] = useState<number | null>(null);
  const [calibration, setCalibration] = useState<number>(1); // pixels per cm
  const [calibrating, setCalibrating] = useState(false);
  const [showingCalibrationInput, setShowingCalibrationInput] = useState(false);
  const [calibrationValue, setCalibrationValue] = useState("10"); // Default 10cm reference
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      resetTool();
    }
  }, [open]);

  const resetTool = () => {
    setDrawing(false);
    setStartPoint(null);
    setEndPoint(null);
    setDistance(null);
    setCalibrating(false);
    setShowingCalibrationInput(false);

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
  }, [open, startPoint, endPoint]);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (startPoint && endPoint) {
      // Draw the line
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.strokeStyle = "#22d3ee"; // cyan-400
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw start and end points
      drawPoint(ctx, startPoint.x, startPoint.y, "#22d3ee");
      drawPoint(ctx, endPoint.x, endPoint.y, "#22d3ee");

      // Draw the distance label
      const midX = (startPoint.x + endPoint.x) / 2;
      const midY = (startPoint.y + endPoint.y) / 2;

      const pixelDistance = Math.sqrt(
        Math.pow(endPoint.x - startPoint.x, 2) +
          Math.pow(endPoint.y - startPoint.y, 2),
      );

      const cmDistance = pixelDistance / calibration;
      setDistance(cmDistance);

      // Draw background for text
      const text = `${cmDistance.toFixed(1)} cm`;
      ctx.font = "14px Arial";
      const textWidth = ctx.measureText(text).width;

      ctx.fillStyle = "rgba(15, 23, 42, 0.75)"; // space-900 with opacity
      ctx.fillRect(midX - textWidth / 2 - 5, midY - 10, textWidth + 10, 20);

      // Draw text
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, midX, midY);
    }

    if (calibrating && startPoint && endPoint) {
      // Draw the calibration line
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.strokeStyle = "#f59e0b"; // amber-500
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw start and end points
      drawPoint(ctx, startPoint.x, startPoint.y, "#f59e0b");
      drawPoint(ctx, endPoint.x, endPoint.y, "#f59e0b");

      // Draw the label
      const midX = (startPoint.x + endPoint.x) / 2;
      const midY = (startPoint.y + endPoint.y) / 2;

      const text = "Calibration Line";
      ctx.font = "14px Arial";
      const textWidth = ctx.measureText(text).width;

      ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
      ctx.fillRect(midX - textWidth / 2 - 5, midY - 10, textWidth + 10, 20);

      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, midX, midY);
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

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        setStartPoint({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        setEndPoint(null);
        setDrawing(true);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (drawing && startPoint) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        setEndPoint({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        redrawCanvas();
      }
    }
  };

  const handleMouseUp = () => {
    setDrawing(false);

    if (calibrating && startPoint && endPoint) {
      setShowingCalibrationInput(true);
    }
  };

  const startCalibration = () => {
    resetTool();
    setCalibrating(true);
    toast({
      title: "Calibration Mode",
      description:
        "Draw a line of known length, then enter its actual measurement.",
    });
  };

  const finishCalibration = () => {
    if (startPoint && endPoint && calibrationValue) {
      const pixelDistance = Math.sqrt(
        Math.pow(endPoint.x - startPoint.x, 2) +
          Math.pow(endPoint.y - startPoint.y, 2),
      );

      const newCalibration = pixelDistance / parseFloat(calibrationValue);
      setCalibration(newCalibration);

      toast({
        title: "Calibration Complete",
        description: `Your measurements will now be more accurate.`,
      });

      setCalibrating(false);
      setShowingCalibrationInput(false);
      resetTool();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} data-oid="weru-il">
      <DialogContent
        className="bg-gradient-to-br from-space-900 via-space-950 to-space-900 border border-space-700/50 text-white max-w-4xl h-[80vh] flex flex-col p-0"
        data-oid=":wsw76t"
      >
        <div className="absolute inset-0 overflow-hidden" data-oid="-63382y">
          <div
            className="absolute -inset-[100px] bg-cyan-800/5 blur-3xl rounded-full top-0 right-0 z-0"
            data-oid="x63e5v8"
          ></div>
          <div
            className="absolute -inset-[100px] bg-blue-800/5 blur-3xl rounded-full bottom-0 left-0 z-0"
            data-oid="1e:tmvl"
          ></div>
          <div
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            data-oid="7wux-j:"
          ></div>
          <div
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            data-oid="0_:486a"
          ></div>
        </div>

        <div
          className="relative z-10 flex flex-col h-full p-6"
          data-oid="mq2:z_f"
        >
          <DialogHeader className="mb-4 flex-shrink-0" data-oid="8oxuadt">
            <DialogTitle
              className="flex items-center text-xl font-space text-cyan-400 tracking-wide"
              data-oid="lbjr946"
            >
              <i className="fas fa-ruler mr-3" data-oid="18r2p84"></i>
              <span data-oid="yo455qu">Measurement Tool</span>
            </DialogTitle>
          </DialogHeader>

          <div className="flex-grow flex flex-col mb-4" data-oid="5_6x2jv">
            <div
              className="bg-space-900/70 p-4 rounded-lg mb-4 text-sm text-gray-300"
              data-oid="6ts405f"
            >
              <p data-oid="lfxgzi-">
                Click and drag to measure distances. For accurate measurements,
                calibrate the tool first.
              </p>
              {distance !== null && (
                <div
                  className="mt-2 text-lg text-white font-medium"
                  data-oid=".f4gy7w"
                >
                  <span data-oid="0:dv63x">Measured: </span>
                  <span className="text-cyan-400" data-oid="jlq5n_.">
                    {distance.toFixed(1)} cm
                  </span>
                  <span data-oid="4:rd1:s">
                    {" "}
                    ({(distance / 100).toFixed(2)} m)
                  </span>
                </div>
              )}
            </div>

            <div
              className="flex-grow relative rounded-lg overflow-hidden border border-space-700/50"
              ref={containerRef}
              data-oid="icu1wh4"
            >
              {/* Background grid pattern */}
              <div
                className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFmMmE0NCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')]"
                data-oid="g85132q"
              ></div>

              <canvas
                ref={canvasRef}
                className="absolute inset-0 cursor-crosshair"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                data-oid="30u5sl8"
              />
            </div>
          </div>

          <DialogFooter
            className="flex-shrink-0 flex justify-between items-center"
            data-oid="vgqf2pl"
          >
            <div className="flex gap-2" data-oid="-bkwy2k">
              <Button
                variant="outline"
                className="bg-space-800 border-space-700 hover:bg-space-700 text-white"
                onClick={resetTool}
                data-oid="0q7dnm2"
              >
                <i className="fas fa-redo mr-2" data-oid="0ht7dj6"></i> Reset
              </Button>

              <Button
                variant="outline"
                className="bg-amber-900/60 border-amber-700/50 hover:bg-amber-800/60 text-white"
                onClick={startCalibration}
                data-oid="uoxkkhz"
              >
                <i
                  className="fas fa-ruler-combined mr-2"
                  data-oid="h9p7lr2"
                ></i>{" "}
                Calibrate
              </Button>
            </div>

            <Button
              onClick={() => onOpenChange(false)}
              className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white"
              data-oid="rpx.v-t"
            >
              Close
            </Button>
          </DialogFooter>
        </div>

        {showingCalibrationInput && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/60 z-30"
            data-oid=":_29ng5"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-space-800 p-6 rounded-lg max-w-md w-full mx-4 border border-space-600"
              data-oid="6:yweyz"
            >
              <h3
                className="text-xl font-medium text-white mb-4"
                data-oid="hda6cv7"
              >
                Calibration
              </h3>
              <p className="text-gray-300 mb-4" data-oid="7.21t7:">
                Enter the actual length of the line you just drew (in
                centimeters):
              </p>

              <div className="flex items-center gap-2 mb-6" data-oid="fqqdg2t">
                <input
                  type="number"
                  value={calibrationValue}
                  onChange={(e) => setCalibrationValue(e.target.value)}
                  className="bg-space-900 border border-space-600 text-white px-3 py-2 rounded-md w-full"
                  min="0.1"
                  step="0.1"
                  data-oid=".shgnz0"
                />

                <span className="text-gray-300" data-oid="b6-sv32">
                  cm
                </span>
              </div>

              <div className="flex justify-end gap-2" data-oid="ud8mh5_">
                <Button
                  variant="outline"
                  className="bg-space-900 border-space-700 hover:bg-space-700 text-white"
                  onClick={() => {
                    setShowingCalibrationInput(false);
                    setCalibrating(false);
                    resetTool();
                  }}
                  data-oid=":bo4rum"
                >
                  Cancel
                </Button>

                <Button
                  onClick={finishCalibration}
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white"
                  data-oid="asyuhzm"
                >
                  Apply Calibration
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MeasureToolModal;
