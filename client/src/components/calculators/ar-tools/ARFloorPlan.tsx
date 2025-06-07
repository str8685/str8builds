import { useState, useRef, useEffect } from "react";
import {
  Camera,
  Ruler,
  Save,
  Move,
  RotateCcw,
  Box,
  Sofa,
  Armchair,
  Table,
  Bed,
  DoorOpen,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Wall = {
  id: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
  thickness: number;
};

type Furniture = {
  id: string;
  type: "sofa" | "armchair" | "table" | "bed" | "door" | "window" | "custom";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  label: string;
};

const ARFloorPlan = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [mode, setMode] = useState<"wall" | "furniture" | "select">("select");
  const [walls, setWalls] = useState<Wall[]>([]);
  const [furniture, setFurniture] = useState<Furniture[]>([]);
  const [selectedItem, setSelectedItem] = useState<{
    type: "wall" | "furniture";
    id: string;
  } | null>(null);
  const [roomWidth, setRoomWidth] = useState(5); // meters
  const [roomLength, setRoomLength] = useState(5); // meters
  const [unit, setUnit] = useState<"m" | "ft">("m");
  const [furnitureType, setFurnitureType] =
    useState<Furniture["type"]>("table");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentWall, setCurrentWall] = useState<{
    start: { x: number; y: number };
  } | null>(null);

  // Initialize camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access the camera. Please check your permissions.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  // Toggle camera
  const toggleCamera = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // Handle canvas mouse down
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mode === "wall") {
      setCurrentWall({ start: { x, y } });
    } else if (mode === "furniture") {
      const newFurniture: Furniture = {
        id: `furn-${Date.now()}`,
        type: furnitureType,
        x,
        y,
        width: 50, // pixels
        height: 50,
        rotation: 0,
        label: `${furnitureType} ${furniture.length + 1}`,
      };
      setFurniture([...furniture, newFurniture]);
      setSelectedItem({ type: "furniture", id: newFurniture.id });
    }
  };

  // Handle canvas mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!currentWall || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Draw temporary wall
    drawFloorPlan(currentWall.start, { x, y });
  };

  // Handle canvas mouse up
  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!currentWall || !canvasRef.current) {
      setCurrentWall(null);
      return;
    }

    const rect = canvasRef.current.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    // Add the new wall
    const newWall: Wall = {
      id: `wall-${Date.now()}`,
      start: currentWall.start,
      end: { x: endX, y: endY },
      thickness: 10, // pixels
    };

    setWalls([...walls, newWall]);
    setSelectedItem({ type: "wall", id: newWall.id });
    setCurrentWall(null);

    // Redraw the floor plan
    drawFloorPlan();
  };

  // Draw the floor plan
  const drawFloorPlan = (
    tempStart?: { x: number; y: number },
    tempEnd?: { x: number; y: number },
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid(ctx, canvas.width, canvas.height);

    // Draw walls
    walls.forEach((wall) => {
      drawWall(ctx, wall.start, wall.end, wall.thickness);
    });

    // Draw temporary wall while drawing
    if (tempStart && tempEnd) {
      drawWall(ctx, tempStart, tempEnd, 10, "#3b82f6");
    }

    // Draw furniture
    furniture.forEach((item) => {
      drawFurniture(ctx, item);
    });
  };

  // Draw grid
  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    const gridSize = 20; // pixels
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  // Draw a wall
  const drawWall = (
    ctx: CanvasRenderingContext2D,
    start: { x: number; y: number },
    end: { x: number; y: number },
    thickness: number,
    color: string = "#ffffff",
  ) => {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.stroke();
  };

  // Draw furniture
  const drawFurniture = (ctx: CanvasRenderingContext2D, item: Furniture) => {
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate((item.rotation * Math.PI) / 180);

    // Different colors for different furniture types
    let color = "#3b82f6";
    switch (item.type) {
      case "sofa":
        color = "#8b5cf6";
        break;
      case "armchair":
        color = "#ec4899";
        break;
      case "table":
        color = "#10b981";
        break;
      case "bed":
        color = "#f59e0b";
        break;
      case "door":
        color = "#ffffff";
        break;
      case "window":
        color = "#60a5fa";
        break;
    }

    // Draw furniture
    ctx.fillStyle = color + "80"; // 50% opacity
    ctx.fillRect(-item.width / 2, -item.height / 2, item.width, item.height);

    // Draw border
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(-item.width / 2, -item.height / 2, item.width, item.height);

    // Draw label
    ctx.fillStyle = "#ffffff";
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(item.label, 0, 0);

    ctx.restore();
  };

  // Initialize canvas
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Set canvas dimensions
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Draw initial floor plan
    drawFloorPlan();
  }, []);

  // Redraw when walls or furniture change
  useEffect(() => {
    drawFloorPlan();
  }, [walls, furniture]);

  return (
    <div className="space-y-6" data-oid="t-yp2gs">
      <Card className="bg-space-900/50 border-cyan/20" data-oid="i_7q3zp">
        <CardHeader data-oid="k2:o172">
          <div className="flex items-center justify-between" data-oid="7a7h7h2">
            <CardTitle
              className="text-white flex items-center gap-2"
              data-oid="mcshk_c"
            >
              <Square className="w-5 h-5 text-cyan-400" data-oid="vdoy.0e" />
              AR Floor Plan
            </CardTitle>
            <Button
              variant={isCameraActive ? "destructive" : "outline"}
              size="sm"
              onClick={toggleCamera}
              className="gap-2"
              data-oid="9o9p:z0"
            >
              <Camera className="w-4 h-4" data-oid="t0pyzjv" />
              {isCameraActive ? "Stop Camera" : "Start Camera"}
            </Button>
          </div>
          <CardDescription className="text-gray-400" data-oid="8byzcjt">
            Design and measure floor plans with augmented reality
          </CardDescription>
        </CardHeader>

        <CardContent data-oid="3hvy7b0">
          <div className="flex flex-col lg:flex-row gap-6" data-oid="pw9688c">
            {/* Main canvas */}
            <div
              ref={containerRef}
              className="relative w-full h-[500px] bg-space-950/50 rounded-lg border border-cyan/20 overflow-hidden"
              data-oid="bopkyuh"
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                data-oid="fti:f0d"
              />

              {isCameraActive && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                  data-oid="cy3v:p7"
                />
              )}
            </div>

            {/* Controls */}
            <div className="w-full lg:w-64 space-y-4" data-oid="bu051mu">
              <div className="space-y-2" data-oid="-y8erf.">
                <Label className="text-gray-300" data-oid="_.bo:2g">
                  Room Dimensions
                </Label>
                <div className="grid grid-cols-2 gap-2" data-oid="8a7az-m">
                  <div data-oid="78f__qc">
                    <Label className="text-xs" data-oid=":.hyf09">
                      Width ({unit})
                    </Label>
                    <Input
                      type="number"
                      value={roomWidth}
                      onChange={(e) => setRoomWidth(Number(e.target.value))}
                      className="bg-space-800 border-space-700"
                      data-oid="95-q6yr"
                    />
                  </div>
                  <div data-oid="v6fm1:2">
                    <Label className="text-xs" data-oid="x13akk4">
                      Length ({unit})
                    </Label>
                    <Input
                      type="number"
                      value={roomLength}
                      onChange={(e) => setRoomLength(Number(e.target.value))}
                      className="bg-space-800 border-space-700"
                      data-oid="54mg.ez"
                    />
                  </div>
                </div>
                <Select
                  value={unit}
                  onValueChange={(value: "m" | "ft") => setUnit(value)}
                  data-oid="8vgqtcg"
                >
                  <SelectTrigger
                    className="bg-space-800 border-space-700"
                    data-oid="ssm-pfe"
                  >
                    <SelectValue placeholder="Unit" data-oid="0c6j8yj" />
                  </SelectTrigger>
                  <SelectContent
                    className="bg-space-900 border-space-700"
                    data-oid="js:a1z:"
                  >
                    <SelectItem value="m" data-oid="aafc0xv">
                      Meters
                    </SelectItem>
                    <SelectItem value="ft" data-oid="h:lhg.v">
                      Feet
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2" data-oid="qil9677">
                <Label className="text-gray-300" data-oid="pl7qarg">
                  Tools
                </Label>
                <div className="flex flex-wrap gap-2" data-oid="y0ga83e">
                  <Button
                    variant={mode === "select" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setMode("select")}
                    data-oid="p.9p.1n"
                  >
                    <Move className="w-4 h-4 mr-2" data-oid="0qlxguo" />
                    Select
                  </Button>
                  <Button
                    variant={mode === "wall" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setMode("wall")}
                    data-oid="z7c2v.-"
                  >
                    <Ruler className="w-4 h-4 mr-2" data-oid="ymnb4s5" />
                    Wall
                  </Button>
                  <Button
                    variant={mode === "furniture" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setMode("furniture")}
                    data-oid="7p6m6rf"
                  >
                    <Box className="w-4 h-4 mr-2" data-oid="-0nbhvq" />
                    Furniture
                  </Button>
                </div>
              </div>

              {mode === "furniture" && (
                <div className="space-y-2" data-oid="fz-kye0">
                  <Label className="text-gray-300" data-oid="mf_9kf_">
                    Furniture Type
                  </Label>
                  <div className="grid grid-cols-3 gap-2" data-oid="m:3viva">
                    <Button
                      variant={
                        furnitureType === "table" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setFurnitureType("table")}
                      data-oid="vg-hq:-"
                    >
                      <Table className="w-4 h-4" data-oid="t_9kg-i" />
                    </Button>
                    <Button
                      variant={
                        furnitureType === "armchair" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setFurnitureType("armchair")}
                      data-oid="-yx5kd7"
                    >
                      <Armchair className="w-4 h-4" data-oid="bjb67_j" />
                    </Button>
                    <Button
                      variant={
                        furnitureType === "sofa" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setFurnitureType("sofa")}
                      data-oid="drfgl2c"
                    >
                      <Sofa className="w-4 h-4" data-oid="pmds8ck" />
                    </Button>
                    <Button
                      variant={
                        furnitureType === "bed" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setFurnitureType("bed")}
                      data-oid="4n:ht7z"
                    >
                      <Bed className="w-4 h-4" data-oid=".i3ko.5" />
                    </Button>
                    <Button
                      variant={
                        furnitureType === "door" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setFurnitureType("door")}
                      data-oid="lpydhyo"
                    >
                      <DoorOpen className="w-4 h-4" data-oid="h.rjtqn" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-2" data-oid="dxapi0z">
                <Label className="text-gray-300" data-oid="hx0w._c">
                  Actions
                </Label>
                <div className="flex flex-wrap gap-2" data-oid="2q4zmmm">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    data-oid="5-a72pk"
                  >
                    <Save className="w-4 h-4" data-oid="2o7qece" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => {
                      setWalls([]);
                      setFurniture([]);
                      setSelectedItem(null);
                      drawFloorPlan();
                    }}
                    data-oid="j1uki2:"
                  >
                    <RotateCcw className="w-4 h-4" data-oid="nf53wjo" />
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ARFloorPlan };
