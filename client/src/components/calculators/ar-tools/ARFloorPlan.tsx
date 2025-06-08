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
    <div className="space-y-6" data-oid="xrj2rn:">
      <Card className="bg-space-900/50 border-cyan/20" data-oid="laojybb">
        <CardHeader data-oid="bj-s5b5">
          <div className="flex items-center justify-between" data-oid="zq8z1q9">
            <CardTitle
              className="text-white flex items-center gap-2"
              data-oid="fonj0gq"
            >
              <Square className="w-5 h-5 text-cyan-400" data-oid="9vn9j__" />
              AR Floor Plan
            </CardTitle>
            <Button
              variant={isCameraActive ? "destructive" : "outline"}
              size="sm"
              onClick={toggleCamera}
              className="gap-2"
              data-oid="2pv7r3r"
            >
              <Camera className="w-4 h-4" data-oid="sgxn82r" />
              {isCameraActive ? "Stop Camera" : "Start Camera"}
            </Button>
          </div>
          <CardDescription className="text-gray-400" data-oid="8ut7zrx">
            Design and measure floor plans with augmented reality
          </CardDescription>
        </CardHeader>

        <CardContent data-oid="5wpvgdc">
          <div className="flex flex-col lg:flex-row gap-6" data-oid="4u3kubk">
            {/* Main canvas */}
            <div
              ref={containerRef}
              className="relative w-full h-[500px] bg-space-950/50 rounded-lg border border-cyan/20 overflow-hidden"
              data-oid="2nz5:dk"
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                data-oid="owmol7u"
              />

              {isCameraActive && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                  data-oid=".4:3q9:"
                />
              )}
            </div>

            {/* Controls */}
            <div className="w-full lg:w-64 space-y-4" data-oid="pygau1c">
              <div className="space-y-2" data-oid="vec5umr">
                <Label className="text-gray-300" data-oid="ujfh2ei">
                  Room Dimensions
                </Label>
                <div className="grid grid-cols-2 gap-2" data-oid=".lbalrh">
                  <div data-oid="d1h1le9">
                    <Label className="text-xs" data-oid="-3itpt.">
                      Width ({unit})
                    </Label>
                    <Input
                      type="number"
                      value={roomWidth}
                      onChange={(e) => setRoomWidth(Number(e.target.value))}
                      className="bg-space-800 border-space-700"
                      data-oid="02egoru"
                    />
                  </div>
                  <div data-oid="nl-pmox">
                    <Label className="text-xs" data-oid="ozu6kg5">
                      Length ({unit})
                    </Label>
                    <Input
                      type="number"
                      value={roomLength}
                      onChange={(e) => setRoomLength(Number(e.target.value))}
                      className="bg-space-800 border-space-700"
                      data-oid="n0ezaa5"
                    />
                  </div>
                </div>
                <Select
                  value={unit}
                  onValueChange={(value: "m" | "ft") => setUnit(value)}
                  data-oid="-l.a1tj"
                >
                  <SelectTrigger
                    className="bg-space-800 border-space-700"
                    data-oid="i50kw6l"
                  >
                    <SelectValue placeholder="Unit" data-oid="xo55ma0" />
                  </SelectTrigger>
                  <SelectContent
                    className="bg-space-900 border-space-700"
                    data-oid="-t8t3.3"
                  >
                    <SelectItem value="m" data-oid="zvpeq.k">
                      Meters
                    </SelectItem>
                    <SelectItem value="ft" data-oid="2mlqk8t">
                      Feet
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2" data-oid="1p6afjg">
                <Label className="text-gray-300" data-oid="9d7w996">
                  Tools
                </Label>
                <div className="flex flex-wrap gap-2" data-oid="dh6zb1h">
                  <Button
                    variant={mode === "select" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setMode("select")}
                    data-oid="6hy0_zr"
                  >
                    <Move className="w-4 h-4 mr-2" data-oid="6inrrvh" />
                    Select
                  </Button>
                  <Button
                    variant={mode === "wall" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setMode("wall")}
                    data-oid="-kw54g."
                  >
                    <Ruler className="w-4 h-4 mr-2" data-oid="krd73lp" />
                    Wall
                  </Button>
                  <Button
                    variant={mode === "furniture" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setMode("furniture")}
                    data-oid="qlkj81u"
                  >
                    <Box className="w-4 h-4 mr-2" data-oid="s3dw:3n" />
                    Furniture
                  </Button>
                </div>
              </div>

              {mode === "furniture" && (
                <div className="space-y-2" data-oid="eikzjlv">
                  <Label className="text-gray-300" data-oid=":ibk2_e">
                    Furniture Type
                  </Label>
                  <div className="grid grid-cols-3 gap-2" data-oid="vgpnf0f">
                    <Button
                      variant={
                        furnitureType === "table" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setFurnitureType("table")}
                      data-oid="1f41i.g"
                    >
                      <Table className="w-4 h-4" data-oid="kki4dt_" />
                    </Button>
                    <Button
                      variant={
                        furnitureType === "armchair" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setFurnitureType("armchair")}
                      data-oid="u.zwoup"
                    >
                      <Armchair className="w-4 h-4" data-oid="sm40j5-" />
                    </Button>
                    <Button
                      variant={
                        furnitureType === "sofa" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setFurnitureType("sofa")}
                      data-oid="pr7setr"
                    >
                      <Sofa className="w-4 h-4" data-oid="90ourii" />
                    </Button>
                    <Button
                      variant={
                        furnitureType === "bed" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setFurnitureType("bed")}
                      data-oid="toaoydz"
                    >
                      <Bed className="w-4 h-4" data-oid="eg6cqvp" />
                    </Button>
                    <Button
                      variant={
                        furnitureType === "door" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setFurnitureType("door")}
                      data-oid="a5q0k7f"
                    >
                      <DoorOpen className="w-4 h-4" data-oid="mqjl78p" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-2" data-oid="83z686e">
                <Label className="text-gray-300" data-oid="i:7f71:">
                  Actions
                </Label>
                <div className="flex flex-wrap gap-2" data-oid="kqc..nw">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    data-oid="3zd2lzn"
                  >
                    <Save className="w-4 h-4" data-oid="ynectt6" />
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
                    data-oid="hxvxur-"
                  >
                    <RotateCcw className="w-4 h-4" data-oid="y2y9rta" />
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
