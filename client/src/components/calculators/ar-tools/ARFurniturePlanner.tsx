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
    <div className="space-y-6" data-oid="6e_lxuf">
      <Card className="bg-space-900/50 border-cyan/20" data-oid="3sy2h8q">
        <CardHeader data-oid="4x-lyis">
          <div className="flex items-center justify-between" data-oid="g5e-qd6">
            <CardTitle
              className="text-white flex items-center gap-2"
              data-oid="lx4054l"
            >
              <Sofa className="w-5 h-5 text-cyan-400" data-oid="jmcf-c-" />
              AR Furniture Planner
            </CardTitle>
            <Button
              variant={isCameraActive ? "destructive" : "outline"}
              size="sm"
              onClick={toggleCamera}
              className="gap-2"
              data-oid="hys86sz"
            >
              <Camera className="w-4 h-4" data-oid="ecnw690" />
              {isCameraActive ? "Stop Camera" : "Start Camera"}
            </Button>
          </div>
          <CardDescription className="text-gray-400" data-oid="zkq3e7u">
            Arrange furniture in your space using augmented reality
          </CardDescription>
        </CardHeader>

        <CardContent data-oid=":niu55f">
          <div className="flex flex-col lg:flex-row gap-6" data-oid="ceh1056">
            {/* Main AR View */}
            <div
              ref={containerRef}
              className="relative w-full h-[500px] bg-space-950/50 rounded-lg border border-cyan/20 overflow-hidden"
              data-oid="jyh7:.p"
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                onClick={handleCanvasClick}
                data-oid=".bvt9z8"
              />

              {isCameraActive && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                  data-oid="o:tzhq5"
                />
              )}
            </div>

            {/* Controls */}
            <div className="w-full lg:w-64 space-y-4" data-oid="p-0rjn6">
              <div className="space-y-2" data-oid="wya_zc:">
                <Label className="text-gray-300" data-oid="qxo2boj">
                  Room Dimensions (m)
                </Label>
                <div className="grid grid-cols-2 gap-2" data-oid="e-t.98x">
                  <div data-oid=".xf59r4">
                    <Label className="text-xs" data-oid="u-2mr.5">
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
                      data-oid="3g-56an"
                    />
                  </div>
                  <div data-oid="zzgr0pw">
                    <Label className="text-xs" data-oid="2hxalx4">
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
                      data-oid="y191.dd"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2" data-oid="3:nn1se">
                <Label className="text-gray-300" data-oid="dkbqwab">
                  Furniture
                </Label>
                <div className="grid grid-cols-3 gap-2" data-oid="pudwehv">
                  <Button
                    variant={
                      furnitureType === "table" ? "secondary" : "outline"
                    }
                    size="sm"
                    onClick={() => {
                      setFurnitureType("table");
                      setMode("place");
                    }}
                    data-oid="hr.l0dk"
                  >
                    <Table className="w-4 h-4" data-oid="pouuruo" />
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
                    data-oid="phaeg_l"
                  >
                    <Armchair className="w-4 h-4" data-oid="ix:6hhd" />
                  </Button>
                  <Button
                    variant={furnitureType === "sofa" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => {
                      setFurnitureType("sofa");
                      setMode("place");
                    }}
                    data-oid="h_vvcn-"
                  >
                    <Sofa className="w-4 h-4" data-oid="a:tgaow" />
                  </Button>
                  <Button
                    variant={furnitureType === "bed" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => {
                      setFurnitureType("bed");
                      setMode("place");
                    }}
                    data-oid="k4f26cz"
                  >
                    <Bed className="w-4 h-4" data-oid="d:1m7gn" />
                  </Button>
                  <Button
                    variant={furnitureType === "door" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => {
                      setFurnitureType("door");
                      setMode("place");
                    }}
                    data-oid="wk37h0a"
                  >
                    <DoorOpen className="w-4 h-4" data-oid="k4m7s0g" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2" data-oid="yoty25:">
                <Label className="text-gray-300" data-oid="yjn5ocj">
                  Actions
                </Label>
                <div className="flex flex-wrap gap-2" data-oid="1mdo5zo">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    data-oid="r7fi:jd"
                  >
                    <Save className="w-4 h-4" data-oid="8oprqzx" />
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
                    data-oid="iap2ca1"
                  >
                    <RotateCcw className="w-4 h-4" data-oid="da798-y" />
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
