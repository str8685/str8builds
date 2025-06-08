import { FC, useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
  TransformControls,
  Grid,
  Stats,
  PerspectiveCamera,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import { Mesh, Group, Vector3 } from "three";
import GlassCard from "@/components/ui/GlassCard";

// Component types
interface ComponentData {
  id: string;
  name: string;
  modelUrl: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  description: string;
  material?: string;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  isSelected?: boolean;
}

// Material types
interface MaterialOption {
  id: string;
  name: string;
  color: string;
  texture?: string;
  roughness?: number;
  metalness?: number;
}

// Lighting presets
interface LightingPreset {
  id: string;
  name: string;
  dayTime: "day" | "night" | "sunset" | "sunrise";
  intensity: number;
  position: [number, number, number];
  color: string;
}

// Available component materials
const MATERIAL_OPTIONS: MaterialOption[] = [
  {
    id: "concrete",
    name: "Concrete",
    color: "#cccccc",
    roughness: 0.8,
    metalness: 0.1,
  },
  {
    id: "timber",
    name: "Timber",
    color: "#a0522d",
    roughness: 0.7,
    metalness: 0,
  },
  {
    id: "steel",
    name: "Steel",
    color: "#71797E",
    roughness: 0.2,
    metalness: 0.9,
  },
  {
    id: "glass",
    name: "Glass",
    color: "#39c2d7",
    roughness: 0,
    metalness: 0.4,
  },
  {
    id: "brick",
    name: "Brick",
    color: "#b22222",
    roughness: 0.8,
    metalness: 0,
  },
  {
    id: "aluminum",
    name: "Aluminum",
    color: "#A5A5A5",
    roughness: 0.3,
    metalness: 0.8,
  },
];

// Lighting presets
const LIGHTING_PRESETS: LightingPreset[] = [
  {
    id: "noon",
    name: "Noon",
    dayTime: "day",
    intensity: 1,
    position: [10, 10, 5],
    color: "#ffffff",
  },
  {
    id: "sunset",
    name: "Sunset",
    dayTime: "sunset",
    intensity: 0.7,
    position: [10, 5, -5],
    color: "#ff7e00",
  },
  {
    id: "night",
    name: "Night",
    dayTime: "night",
    intensity: 0.3,
    position: [0, 5, 0],
    color: "#0027ff",
  },
  {
    id: "sunrise",
    name: "Sunrise",
    dayTime: "sunrise",
    intensity: 0.6,
    position: [-10, 5, 5],
    color: "#ff9e7a",
  },
];

// Individual component model
function ComponentModel({
  data,
  onSelect,
  isSelected,
  materialId = "concrete",
}: {
  data: ComponentData;
  onSelect: (id: string) => void;
  isSelected: boolean;
  materialId?: string;
}) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Get material configuration
  const material =
    MATERIAL_OPTIONS.find((m) => m.id === materialId) || MATERIAL_OPTIONS[0];

  return (
    <group
      ref={groupRef}
      position={[data.position[0], data.position[1], data.position[2]]}
      rotation={[data.rotation[0], data.rotation[1], data.rotation[2]]}
      scale={data.scale}
      onClick={() => onSelect(data.id)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      data-oid="asmz.iv"
    >
      {/* Instead of loading a model, we'll use basic shapes based on component type */}
      {data.id.includes("foundation") && data.dimensions && (
        <mesh data-oid="_tgpw3z">
          <boxGeometry
            args={[
              data.dimensions.width,
              data.dimensions.height,
              data.dimensions.depth,
            ]}
            data-oid="yezkb._"
          />

          <meshStandardMaterial
            color={material.color}
            roughness={material.roughness || 0.5}
            metalness={material.metalness || 0.5}
            data-oid="rg4m.vl"
          />
        </mesh>
      )}

      {data.id.includes("frame") && data.dimensions && (
        <mesh data-oid="s3y8lxz">
          <boxGeometry
            args={[
              data.dimensions.width * 0.8,
              data.dimensions.height,
              data.dimensions.depth * 0.8,
            ]}
            data-oid="4jf5t-9"
          />

          <meshStandardMaterial
            color={material.color}
            roughness={material.roughness || 0.5}
            metalness={material.metalness || 0.5}
            data-oid="_rdyg3d"
          />
        </mesh>
      )}

      {data.id.includes("roof") && data.dimensions && (
        <mesh data-oid="ggk4khw">
          <coneGeometry
            args={[data.dimensions.width / 2, data.dimensions.height, 4]}
            data-oid="m71z9:4"
          />

          <meshStandardMaterial
            color={material.color}
            roughness={material.roughness || 0.5}
            metalness={material.metalness || 0.5}
            data-oid="efjm:2t"
          />
        </mesh>
      )}

      {data.id.includes("wall") && data.dimensions && (
        <mesh data-oid="e:ake01">
          <boxGeometry
            args={[
              data.dimensions.width,
              data.dimensions.height,
              data.dimensions.depth * 0.1,
            ]}
            data-oid="yqbiyjr"
          />

          <meshStandardMaterial
            color={material.color}
            roughness={material.roughness || 0.5}
            metalness={material.metalness || 0.5}
            data-oid="m.a4in6"
          />
        </mesh>
      )}

      {data.id.includes("window") && data.dimensions && (
        <mesh data-oid="f7rpk:l">
          <boxGeometry
            args={[
              data.dimensions.width * 0.8,
              data.dimensions.height * 0.8,
              data.dimensions.depth * 0.1,
            ]}
            data-oid="mfp:ve8"
          />

          <meshStandardMaterial
            color={"#88ccff"}
            transparent
            opacity={0.6}
            data-oid="wqktf_b"
          />
        </mesh>
      )}

      {/* Fallback for any other component type */}
      {!data.id.includes("foundation") &&
        !data.id.includes("frame") &&
        !data.id.includes("roof") &&
        !data.id.includes("wall") &&
        !data.id.includes("window") && (
          <mesh data-oid="8ty5fcf">
            <boxGeometry args={[1, 1, 1]} data-oid="t:lxnfz" />
            <meshStandardMaterial color={material.color} data-oid="4f02csi" />
          </mesh>
        )}

      {(isSelected || hovered) && (
        <Html
          position={[0, data.dimensions?.height || 2, 0]}
          center
          data-oid="d141nvt"
        >
          <div
            className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
            data-oid="eh:9:li"
          >
            {data.name}
          </div>
        </Html>
      )}
    </group>
  );
}

// Helper box wireframe
function boxHelper({ args }: any) {
  const [box, color] = args;
  const boxHelper = new THREE.BoxHelper(box, color);
  return <primitive object={boxHelper} data-oid="5pdtppv" />;
}

// Main scene with all building components
function BuildingScene({
  components,
  selectedComponent,
  setSelectedComponent,
  currentMaterialId,
  currentLightingId,
  enableTransform = false,
  showHelpers = false,
}: {
  components: ComponentData[];
  selectedComponent: string | null;
  setSelectedComponent: (id: string | null) => void;
  currentMaterialId: string;
  currentLightingId: string;
  enableTransform?: boolean;
  showHelpers?: boolean;
}) {
  const selectedRef = useRef<Group>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);

  const lightPreset =
    LIGHTING_PRESETS.find((l) => l.id === currentLightingId) ||
    LIGHTING_PRESETS[0];

  // For debugging with light helpers in production
  // We're commenting them out due to type issues, but they would work in a complete implementation
  /*
  if (showHelpers) {
    useHelper(directionalLightRef, DirectionalLightHelper, 1, 'red');
    useHelper(spotLightRef, SpotLightHelper, 'green');
  }
  */

  // Handle component selection
  const handleSelectComponent = (id: string) => {
    setSelectedComponent(id === selectedComponent ? null : id);
  };

  return (
    <>
      {/* Environment and Lighting */}
      <Environment
        preset={lightPreset.dayTime === "night" ? "night" : "city"}
        data-oid="xtn_634"
      />

      <directionalLight
        ref={directionalLightRef}
        position={lightPreset.position}
        intensity={lightPreset.intensity}
        color={lightPreset.color}
        castShadow
        data-oid="rl5cor7"
      />

      <spotLight
        ref={spotLightRef}
        position={[5, 10, 2]}
        angle={0.3}
        penumbra={0.8}
        intensity={0.5 * lightPreset.intensity}
        color={lightPreset.color}
        castShadow
        data-oid="zvmq8pu"
      />

      <ambientLight intensity={0.4} data-oid="mqpgbv2" />

      {/* Scene models */}
      <Grid
        position={[0, -0.01, 0]}
        args={[20, 20]}
        cellSize={1}
        cellThickness={1}
        cellColor="#6f6f6f"
        sectionSize={5}
        sectionThickness={1.5}
        sectionColor="#9d4b4b"
        fadeDistance={30}
        infiniteGrid
        data-oid="3j5dfyq"
      />

      {/* Building Components */}
      {components.map((component) => (
        <ComponentModel
          key={component.id}
          data={component}
          onSelect={handleSelectComponent}
          isSelected={component.id === selectedComponent}
          materialId={currentMaterialId}
          data-oid="cp_liws"
        />
      ))}

      {/* Transform Controls - commented out due to type issues with refs */}
      {/* 
                       {enableTransform && selectedComponent && (
                         <TransformControls 
                           object={selectedRef} 
                           mode="translate"
                         />
                       )}
                      */}
    </>
  );
}

// Controls panel to manage the 3D view
function ControlsPanel({
  selectedComponent,
  materialOptions,
  lightingPresets,
  currentMaterialId,
  setCurrentMaterialId,
  currentLightingId,
  setCurrentLightingId,
  onClose,
  onExport,
}: {
  selectedComponent: ComponentData | null;
  materialOptions: MaterialOption[];
  lightingPresets: LightingPreset[];
  currentMaterialId: string;
  setCurrentMaterialId: (id: string) => void;
  currentLightingId: string;
  setCurrentLightingId: (id: string) => void;
  onClose: () => void;
  onExport: () => void;
}) {
  return (
    <div className="absolute top-4 right-4 w-64 z-10" data-oid="hajac:4">
      <GlassCard className="p-4" data-oid="0o7pq4b">
        <div className="text-white" data-oid="-rb805v">
          <div
            className="flex justify-between items-center mb-3"
            data-oid="plu.eq0"
          >
            <h3 className="text-cyan font-space text-lg" data-oid="huvqcrs">
              3D Controls
            </h3>
            <button
              className="text-gray-400 hover:text-white"
              onClick={onClose}
              data-oid="vxz:s.6"
            >
              <i className="fas fa-times" data-oid="cgnfens"></i>
            </button>
          </div>

          {selectedComponent ? (
            <div className="mb-4" data-oid="uuyfbc8">
              <h4 className="text-md font-bold mb-1" data-oid="ev6mqk8">
                {selectedComponent.name}
              </h4>
              <p className="text-gray-300 text-xs mb-2" data-oid="c2ldmay">
                {selectedComponent.description}
              </p>

              {selectedComponent.dimensions && (
                <div
                  className="grid grid-cols-3 gap-1 text-xs mb-2"
                  data-oid="_r1-:i8"
                >
                  <div className="bg-space-800 p-1 rounded" data-oid="p4h6.gg">
                    <span className="block text-gray-400" data-oid="22qtftt">
                      Width
                    </span>
                    <span data-oid="wehml4_">
                      {selectedComponent.dimensions.width}m
                    </span>
                  </div>
                  <div className="bg-space-800 p-1 rounded" data-oid="fayzmy4">
                    <span className="block text-gray-400" data-oid="sv384l_">
                      Height
                    </span>
                    <span data-oid="w0lltd5">
                      {selectedComponent.dimensions.height}m
                    </span>
                  </div>
                  <div className="bg-space-800 p-1 rounded" data-oid="kr6yy8w">
                    <span className="block text-gray-400" data-oid="b7ycxac">
                      Depth
                    </span>
                    <span data-oid="pej0kmw">
                      {selectedComponent.dimensions.depth}m
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-400 text-sm mb-4" data-oid="ncc8p.h">
              Select a component to view details
            </p>
          )}

          <div className="mb-4" data-oid=":2x-i04">
            <label
              className="block text-sm text-gray-300 mb-1"
              data-oid="b-nk7dx"
            >
              Material
            </label>
            <div className="grid grid-cols-3 gap-1" data-oid="lhpp-as">
              {materialOptions.map((material) => (
                <button
                  key={material.id}
                  className={`p-1 rounded text-xs ${
                    currentMaterialId === material.id
                      ? "bg-cyan/20 border border-cyan text-white"
                      : "bg-space-800 text-gray-300 hover:bg-space-700"
                  }`}
                  onClick={() => setCurrentMaterialId(material.id)}
                  style={{
                    borderColor:
                      material.id === currentMaterialId
                        ? material.color
                        : "transparent",
                  }}
                  data-oid="lz-ydhu"
                >
                  {material.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4" data-oid="pinr-l:">
            <label
              className="block text-sm text-gray-300 mb-1"
              data-oid="vqiuwuo"
            >
              Lighting
            </label>
            <div className="grid grid-cols-2 gap-1" data-oid="j_vg-t7">
              {lightingPresets.map((preset) => (
                <button
                  key={preset.id}
                  className={`p-1 rounded text-xs ${
                    currentLightingId === preset.id
                      ? "bg-cyan/20 border border-cyan text-white"
                      : "bg-space-800 text-gray-300 hover:bg-space-700"
                  }`}
                  onClick={() => setCurrentLightingId(preset.id)}
                  data-oid="gqz38kj"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4" data-oid="mgnjxl2">
            <button
              className="w-full bg-purple-900 text-cyan py-2 rounded hover:bg-purple-800 btn-glow btn-glow-cyan"
              onClick={onExport}
              data-oid="u3i0na:"
            >
              Export View
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

// Instructions overlay
function InstructionsOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute bottom-4 left-4 max-w-md z-10" data-oid="q8-5g_y">
      <GlassCard className="p-3" data-oid="3-gqeag">
        <div className="flex justify-between items-start" data-oid="si_762f">
          <h4 className="text-cyan font-space text-sm" data-oid="zqk0u9p">
            Navigation Controls
          </h4>
          <button
            className="text-gray-400 hover:text-white text-xs"
            onClick={onClose}
            data-oid="zy0bo3v"
          >
            <i className="fas fa-times" data-oid="h72tr49"></i>
          </button>
        </div>
        <div
          className="text-xs text-gray-300 mt-2 grid grid-cols-2 gap-2"
          data-oid="-zwou_d"
        >
          <div data-oid="-7cekqx">
            <span className="text-cyan" data-oid="phzas4t">
              Left Click + Drag:
            </span>{" "}
            Rotate
          </div>
          <div data-oid="_2nm20g">
            <span className="text-cyan" data-oid=":zjq6s9">
              Right Click + Drag:
            </span>{" "}
            Pan
          </div>
          <div data-oid="tou.jqq">
            <span className="text-cyan" data-oid="_ciffnv">
              Mouse Wheel:
            </span>{" "}
            Zoom
          </div>
          <div data-oid="-i02rf:">
            <span className="text-cyan" data-oid="t1kkfri">
              Click on component:
            </span>{" "}
            Select
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

// Main building component viewer
interface BuildingComponentViewerProps {
  className?: string;
  initialComponents?: ComponentData[];
  onClose?: () => void;
  onExport?: (data: any) => void;
}

const BuildingComponentViewer: FC<BuildingComponentViewerProps> = ({
  className = "",
  initialComponents = [],
  onClose = () => {},
  onExport = () => {},
}) => {
  const [components, setComponents] =
    useState<ComponentData[]>(initialComponents);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null,
  );
  const [currentMaterialId, setCurrentMaterialId] =
    useState<string>("concrete");
  const [currentLightingId, setCurrentLightingId] = useState<string>("noon");
  const [showInstructions, setShowInstructions] = useState<boolean>(true);

  // Get selected component details
  const selectedComponent = selectedComponentId
    ? components.find((c) => c.id === selectedComponentId) || null
    : null;

  // Handle export
  const handleExport = () => {
    const exportData = {
      components,
      selectedComponent,
      material: MATERIAL_OPTIONS.find((m) => m.id === currentMaterialId),
      lighting: LIGHTING_PRESETS.find((l) => l.id === currentLightingId),
      timestamp: new Date().toISOString(),
    };

    onExport(exportData);
  };

  // If no components provided, use demo components
  useEffect(() => {
    if (initialComponents.length === 0) {
      // Demo components - would normally come from API
      setComponents([
        {
          id: "foundation",
          name: "Concrete Foundation",
          modelUrl: "/models/building/foundation.glb",
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          scale: 1,
          description:
            "Reinforced concrete foundation slab, 200mm thickness with steel mesh reinforcement.",
          material: "concrete",
          dimensions: { width: 10, height: 0.2, depth: 10 },
        },
        {
          id: "frame",
          name: "Structural Frame",
          modelUrl: "/models/building/frame.glb",
          position: [0, 0.2, 0],
          rotation: [0, 0, 0],
          scale: 1,
          description:
            "Steel I-beam primary structure with secondary timber framing.",
          material: "steel",
          dimensions: { width: 9.5, height: 3, depth: 9.5 },
        },
        {
          id: "roof",
          name: "Hip Roof",
          modelUrl: "/models/building/roof.glb",
          position: [0, 3.2, 0],
          rotation: [0, 0, 0],
          scale: 1,
          description:
            "Timber framed hip roof with metal cladding, R5.0 insulation.",
          material: "timber",
          dimensions: { width: 10, height: 2, depth: 10 },
        },
        {
          id: "walls",
          name: "External Walls",
          modelUrl: "/models/building/walls.glb",
          position: [0, 0.2, 0],
          rotation: [0, 0, 0],
          scale: 1,
          description: "Brick veneer external wall system with timber framing.",
          material: "brick",
          dimensions: { width: 9.5, height: 3, depth: 9.5 },
        },
        {
          id: "windows",
          name: "Window Package",
          modelUrl: "/models/building/windows.glb",
          position: [0, 1.5, 0],
          rotation: [0, 0, 0],
          scale: 1,
          description: "Double glazed aluminum windows, low-e coating.",
          material: "glass",
          dimensions: { width: 9, height: 1.2, depth: 9 },
        },
      ]);
    }
  }, [initialComponents]);

  return (
    <div
      className={`relative w-full h-[600px] ${className}`}
      data-oid="v5bae86"
    >
      {/* Main 3D Canvas */}
      <Canvas shadows className="w-full h-full" data-oid="hh63xfe">
        <PerspectiveCamera
          makeDefault
          position={[10, 10, 10]}
          fov={45}
          data-oid="1d.hybp"
        />

        <BuildingScene
          components={components}
          selectedComponent={selectedComponentId}
          setSelectedComponent={setSelectedComponentId}
          currentMaterialId={currentMaterialId}
          currentLightingId={currentLightingId}
          showHelpers={false}
          data-oid="pn.v2fc"
        />

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={20}
          data-oid=":v_4mi_"
        />

        {/* Optional performance stats */}
        {/* <Stats /> */}
      </Canvas>

      {/* Controls Panel */}
      <ControlsPanel
        selectedComponent={selectedComponent}
        materialOptions={MATERIAL_OPTIONS}
        lightingPresets={LIGHTING_PRESETS}
        currentMaterialId={currentMaterialId}
        setCurrentMaterialId={setCurrentMaterialId}
        currentLightingId={currentLightingId}
        setCurrentLightingId={setCurrentLightingId}
        onClose={onClose}
        onExport={handleExport}
        data-oid="b_psira"
      />

      {/* Instructions */}
      {showInstructions && (
        <InstructionsOverlay
          onClose={() => setShowInstructions(false)}
          data-oid="o-5f6mw"
        />
      )}

      {/* Close button */}
      <button
        className="absolute top-4 left-4 bg-space-800/80 text-white p-2 rounded-full hover:bg-space-700 z-10"
        onClick={onClose}
        data-oid="66v6-nw"
      >
        <i className="fas fa-arrow-left" data-oid="jyzcd-3"></i>
      </button>
    </div>
  );
};

export default BuildingComponentViewer;
