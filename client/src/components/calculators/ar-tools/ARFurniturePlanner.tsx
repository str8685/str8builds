import { useState, useRef, useEffect } from "react";
import {
  Camera,
  Sofa,
  Armchair,
  Table,
  Bed,
  DoorOpen,
  Move,
  RotateCcw,
  Save,
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

type FurnitureItem = {
  id: string;
  type: "sofa" | "armchair" | "table" | "bed" | "door";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  label: string;
};

const ARFurniturePlanner = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [furniture, setFurniture] = useState<FurnitureItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [mode, setMode] = useState<"select" | "place">("select");
  const [furnitureType, setFurnitureType] =
    useState<FurnitureItem["type"]>("table");
  const [roomDimensions, setRoomDimensions] = useState({ width: 5, height: 5 }); // meters

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Handle canvas click to place furniture
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mode !== "place" || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newFurniture: FurnitureItem = {
      id: `furn-${Date.now()}`,
      type: furnitureType,
      x: (x / rect.width) * roomDimensions.width,
      y: (y / rect.height) * roomDimensions.height,
      width: 1, // Default size in meters
      height: 0.5,
      rotation: 0,
      label: `${furnitureType.charAt(0).toUpperCase() + furnitureType.slice(1)} ${furniture.length + 1}`,
    };

    setFurniture([...furniture, newFurniture]);
    setSelectedItem(newFurniture.id);
    setMode("select");
  };

  // Draw AR overlay
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw room outline
    ctx.strokeStyle = "rgba(56, 189, 248, 0.8)";
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Draw grid
    ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
    ctx.lineWidth = 1;
    const gridSize = 20;
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw furniture
    furniture.forEach((item) => {
      const x = (item.x / roomDimensions.width) * (canvas.width - 40) + 20;
      const y = (item.y / roomDimensions.height) * (canvas.height - 40) + 20;
      const width = (item.width / roomDimensions.width) * (canvas.width - 40);
      const height =
        (item.height / roomDimensions.height) * (canvas.height - 40);

      // Different colors for different furniture types
      let color = "rgba(59, 130, 246, 0.7)";
      switch (item.type) {
        case "sofa":
          color = "rgba(139, 92, 246, 0.7)";
          break;
        case "armchair":
          color = "rgba(236, 72, 153, 0.7)";
          break;
        case "table":
          color = "rgba(16, 185, 129, 0.7)";
          break;
        case "bed":
          color = "rgba(245, 158, 11, 0.7)";
          break;
        case "door":
          color = "rgba(255, 255, 255, 0.7)";
          break;
      }

      // Draw furniture
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((item.rotation * Math.PI) / 180);

      ctx.fillStyle = color;
      ctx.fillRect(-width / 2, -height / 2, width, height);

      ctx.strokeStyle = item.id === selectedItem ? "#ffffff" : color;
      ctx.lineWidth = item.id === selectedItem ? 2 : 1;
      ctx.strokeRect(-width / 2, -height / 2, width, height);

      // Draw label
      ctx.fillStyle = "#ffffff";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(item.label, 0, 0);

      ctx.restore();
    });
  }, [furniture, selectedItem, roomDimensions]);

  return (
    <div className="space-y-6" data-oid="lziib4n">
      <Card className="bg-space-900/50 border-cyan/20" data-oid="6x3qhui">
        <CardHeader data-oid="py51ofa">
          <div className="flex items-center justify-between" data-oid="p0b6_52">
            <CardTitle
              className="text-white flex items-center gap-2"
              data-oid="ij3dsdd"
            >
              <Sofa className="w-5 h-5 text-cyan-400" data-oid="-v2ekdx" />
              AR Furniture Planner
            </CardTitle>
            <Button
              variant={isCameraActive ? "destructive" : "outline"}
              size="sm"
              onClick={toggleCamera}
              className="gap-2"
              data-oid="bpz4yz3"
            >
              <Camera className="w-4 h-4" data-oid="vjnbqjm" />
              {isCameraActive ? "Stop Camera" : "Start Camera"}
            </Button>
          </div>
          <CardDescription className="text-gray-400" data-oid="xhwl.iu">
            Arrange furniture in your space using augmented reality
          </CardDescription>
        </CardHeader>

        <CardContent data-oid="juvh4xd">
          <div className="flex flex-col lg:flex-row gap-6" data-oid="bdgio:z">
            {/* Main AR View */}
            <div
              ref={containerRef}
              className="relative w-full h-[500px] bg-space-950/50 rounded-lg border border-cyan/20 overflow-hidden"
              data-oid="2j2foya"
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                onClick={handleCanvasClick}
                data-oid="9qva297"
              />

              {isCameraActive && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                  data-oid="v.f:md9"
                />
              )}
            </div>

            {/* Controls */}
            <div className="w-full lg:w-64 space-y-4" data-oid="f851zos">
              <div className="space-y-2" data-oid="r--rbej">
                <Label className="text-gray-300" data-oid="1n__qas">
                  Room Dimensions (m)
                </Label>
                <div className="grid grid-cols-2 gap-2" data-oid="v.nk-rg">
                  <div data-oid="z1arxst">
                    <Label className="text-xs" data-oid="s8u_qx3">
                      Width
                    </Label>
                    <Input
                      type="number"
                      value={roomDimensions.width}
                      onChange={(e) =>
                        setRoomDimensions({
                          ...roomDimensions,
                          width: Number(e.target.value),
                        })
                      }
                      className="bg-space-800 border-space-700"
                      data-oid="36und3l"
                    />
                  </div>
                  <div data-oid="v637fw:">
                    <Label className="text-xs" data-oid="6dt3.26">
                      Length
                    </Label>
                    <Input
                      type="number"
                      value={roomDimensions.height}
                      onChange={(e) =>
                        setRoomDimensions({
                          ...roomDimensions,
                          height: Number(e.target.value),
                        })
                      }
                      className="bg-space-800 border-space-700"
                      data-oid="6y5zsmy"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2" data-oid="35ha:-d">
                <Label className="text-gray-300" data-oid="roh.44g">
                  Furniture
                </Label>
                <div className="grid grid-cols-3 gap-2" data-oid="4uwxake">
                  <Button
                    variant={
                      furnitureType === "table" ? "secondary" : "outline"
                    }
                    size="sm"
                    onClick={() => {
                      setFurnitureType("table");
                      setMode("place");
                    }}
                    data-oid="2wmxh7b"
                  >
                    <Table className="w-4 h-4" data-oid="h4-doyy" />
                  </Button>
                  <Button
                    variant={
                      furnitureType === "armchair" ? "secondary" : "outline"
                    }
                    size="sm"
                    onClick={() => {
                      setFurnitureType("armchair");
                      setMode("place");
                    }}
                    data-oid="9tx_e:a"
                  >
                    <Armchair className="w-4 h-4" data-oid="vov352t" />
                  </Button>
                  <Button
                    variant={furnitureType === "sofa" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => {
                      setFurnitureType("sofa");
                      setMode("place");
                    }}
                    data-oid="v5vzofy"
                  >
                    <Sofa className="w-4 h-4" data-oid="x61rpw8" />
                  </Button>
                  <Button
                    variant={furnitureType === "bed" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => {
                      setFurnitureType("bed");
                      setMode("place");
                    }}
                    data-oid="ak7hs2w"
                  >
                    <Bed className="w-4 h-4" data-oid="hh_1j:." />
                  </Button>
                  <Button
                    variant={furnitureType === "door" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => {
                      setFurnitureType("door");
                      setMode("place");
                    }}
                    data-oid="0.qetoa"
                  >
                    <DoorOpen className="w-4 h-4" data-oid="q29m74f" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2" data-oid="o7rz3fm">
                <Label className="text-gray-300" data-oid="ycixx0i">
                  Actions
                </Label>
                <div className="flex flex-wrap gap-2" data-oid=":cf5fnd">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    data-oid="syap8iv"
                  >
                    <Save className="w-4 h-4" data-oid="rcv2_pl" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => {
                      setFurniture([]);
                      setSelectedItem(null);
                    }}
                    data-oid="ectmjn9"
                  >
                    <RotateCcw className="w-4 h-4" data-oid="s3zrzts" />
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

export { ARFurniturePlanner };
