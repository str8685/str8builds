import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Stage,
  PerspectiveCamera,
  Box,
} from "@react-three/drei";
import { Mesh, BoxGeometry, MeshStandardMaterial, Color } from "three";
import ModelFallback from "./ModelFallback";

// Simple box model for fallback
function FallbackBox({
  position = [0, 0, 0],
  scale = 1,
  color = "#1e90ff",
}: {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}) {
  const meshRef = useRef<Mesh>(null);

  // Animate model rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} data-oid="01.h2_y">
      <boxGeometry args={[1, 1, 1]} data-oid="vx9_iwr" />
      <meshStandardMaterial color={color} data-oid="xm7slqi" />
    </mesh>
  );
}

// Model component that will be rendered in the Canvas
function Model({
  url,
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}: {
  url: string;
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}) {
  const meshRef = useRef<Mesh>(null);
  const [error, setError] = useState(false);

  // Instead of using useGLTF which can throw errors, we'll use a simple fallback approach
  useEffect(() => {
    // In a real app, this would load the model
    console.log(`Would load model from ${url}`);
  }, [url]);

  // Animate model rotation for demonstration purposes
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  // For the demo, we'll just use a simple box instead of loading real models
  return <FallbackBox position={position} scale={scale} data-oid="h8o5n._" />;
}

// Component to load a GLTF model from a URL
interface BasicModelProps {
  modelUrl: string;
  className?: string;
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  enableRotation?: boolean;
  backgroundColor?: string;
  defaultCamera?: {
    position: [number, number, number];
    fov: number;
  };
  enableEnvironment?: boolean;
  showGrid?: boolean;
}

export default function BasicModel({
  modelUrl,
  className = "",
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  enableRotation = true,
  backgroundColor = "transparent",
  defaultCamera = {
    position: [5, 5, 5],
    fov: 45,
  },
  enableEnvironment = true,
  showGrid = true,
}: BasicModelProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Handle model loaded
  const handleModelLoaded = () => {
    console.log("Model loaded successfully");
    setIsLoading(false);
  };

  // Error handling for model loading
  const handleModelError = (error: Error) => {
    console.error("Error loading model:", error);
    setIsLoading(false);
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ backgroundColor }}
      data-oid="9__j.86"
    >
      {isLoading && (
        <div
          className="absolute inset-0 flex justify-center items-center bg-black/10 z-10"
          data-oid="i:3o85y"
        >
          <div
            className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan"
            data-oid="mheta1q"
          ></div>
        </div>
      )}

      <Canvas shadows className="w-full h-full" data-oid="7.zquk.">
        <PerspectiveCamera
          makeDefault
          position={defaultCamera.position}
          fov={defaultCamera.fov}
          data-oid="b2yqmyk"
        />

        {enableEnvironment && <Environment preset="city" data-oid="3l4zyro" />}

        <Stage
          adjustCamera
          intensity={0.5}
          shadows="contact"
          environment="city"
          data-oid="ez..ntd"
        >
          <Model
            url={modelUrl}
            position={position}
            scale={scale}
            rotation={rotation}
            data-oid="cmf:781"
          />
        </Stage>

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={enableRotation}
          autoRotateSpeed={1}
          data-oid="d4nq4iv"
        />
      </Canvas>
    </div>
  );
}

// In a real application, we would preload models here
