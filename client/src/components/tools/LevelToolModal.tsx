import { FC, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface LevelToolModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LevelToolModal: FC<LevelToolModalProps> = ({ open, onOpenChange }) => {
  const [rotation, setRotation] = useState({ beta: 0, gamma: 0 });
  const [locked, setLocked] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      requestPermission();
    } else {
      // Clean up event listeners when modal is closed
      window.removeEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [open]);

  const requestPermission = async () => {
    try {
      // Check if DeviceOrientationEvent is available and if requestPermission exists
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        // @ts-ignore - TypeScript doesn't know about this API yet
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        try {
          // @ts-ignore
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === "granted") {
            setPermissionGranted(true);
            window.addEventListener("deviceorientation", handleOrientation);

            toast({
              title: "Motion Access Granted",
              description: "Device orientation sensors are now accessible.",
            });
          } else {
            setPermissionError(
              "Permission to access motion sensors was denied.",
            );
            toast({
              title: "Access Denied",
              description:
                "Cannot access motion sensors. Try on a mobile device.",
              variant: "destructive",
            });
          }
        } catch (err) {
          console.error("Error requesting device orientation permission:", err);
          setPermissionError(
            "Could not request motion sensor permission. Try on a mobile device.",
          );

          // For desktop browsers that don't support device orientation
          simulateOrientationForDesktop();
        }
      } else {
        // For browsers that support deviceorientation but don't need permission
        setPermissionGranted(true);
        window.addEventListener("deviceorientation", handleOrientation);

        // For desktop browsers that don't support device orientation
        simulateOrientationForDesktop();
      }
    } catch (error) {
      console.error("Error setting up device orientation:", error);
      setPermissionError(
        "Error accessing device sensors. Try on a mobile device with motion sensors.",
      );

      // For desktop browsers that don't support device orientation
      simulateOrientationForDesktop();
    }
  };

  const simulateOrientationForDesktop = () => {
    // For desktop testing purposes, allow mouse movement to simulate tilt
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!locked) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate tilt based on mouse position relative to center
        const beta = ((e.clientY - centerY) / centerY) * 90;
        const gamma = ((e.clientX - centerX) / centerX) * 90;

        setRotation({
          beta: Math.min(Math.max(beta, -90), 90),
          gamma: Math.min(Math.max(gamma, -90), 90),
        });

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Clean up this event listener when component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (!locked) {
      setRotation({
        beta: event.beta || 0,
        gamma: event.gamma || 0,
      });
    }
  };

  const toggleLock = () => {
    setLocked(!locked);
    if (!locked) {
      toast({
        title: "Level Locked",
        description: "Current orientation has been locked.",
      });
    } else {
      toast({
        title: "Level Unlocked",
        description: "Level is now responding to device movement.",
      });
    }
  };

  const resetOrientation = () => {
    setLocked(false);
    setRotation({ beta: 0, gamma: 0 });
  };

  // Calculate if the device is level within a tolerance
  const isLevelHorizontal = Math.abs(rotation.beta) < 0.5;
  const isLevelVertical = Math.abs(rotation.gamma) < 0.5;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} data-oid="l-fjgri">
      <DialogContent
        className="bg-gradient-to-br from-space-900 via-space-950 to-space-900 border border-space-700/50 text-white max-w-md"
        data-oid="vb_-o8d"
      >
        <div className="absolute inset-0 overflow-hidden" data-oid="0r.4qwn">
          <div
            className="absolute -inset-[100px] bg-cyan-800/5 blur-3xl rounded-full top-0 right-0 z-0"
            data-oid="4kuldrs"
          ></div>
          <div
            className="absolute -inset-[100px] bg-blue-800/5 blur-3xl rounded-full bottom-0 left-0 z-0"
            data-oid="qn2:spn"
          ></div>
          <div
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            data-oid="67fxhd8"
          ></div>
          <div
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            data-oid="bu7-5rk"
          ></div>
        </div>

        <div className="relative z-10" data-oid="15a5s32">
          <DialogHeader className="mb-6" data-oid="y0qcb-_">
            <DialogTitle
              className="flex items-center text-xl font-space text-cyan-400 tracking-wide"
              data-oid="llx:bdm"
            >
              <i
                className="fas fa-level-up-alt fa-rotate-90 mr-3"
                data-oid="-4cnlbs"
              ></i>
              <span data-oid="w2sc0qi">Digital Level</span>
            </DialogTitle>
          </DialogHeader>

          {permissionError ? (
            <div className="p-6 text-center" data-oid="igtaodd">
              <div className="text-3xl text-amber-500 mb-4" data-oid="kq3t9nz">
                <i
                  className="fas fa-exclamation-triangle"
                  data-oid="pz1j48s"
                ></i>
              </div>
              <p className="text-gray-300 mb-4" data-oid="qnxprx1">
                {permissionError}
              </p>
              <p className="text-sm text-gray-400 mb-4" data-oid="zi53jag">
                This tool requires motion sensors that are typically available
                on mobile devices.
              </p>
              <Button
                onClick={requestPermission}
                className="bg-cyan-700 hover:bg-cyan-600 text-white"
                data-oid="s0xkf.:"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className="space-y-6" data-oid="ganx7yg">
              {/* Horizontal Level */}
              <div
                className="bg-space-800/70 rounded-lg p-4 space-y-2"
                data-oid="x2ac2xe"
              >
                <h3
                  className="text-sm font-medium text-gray-300 mb-2"
                  data-oid="avrjt_a"
                >
                  Horizontal Level
                </h3>
                <div
                  className="relative h-12 bg-space-900 rounded-lg overflow-hidden"
                  data-oid="0n31a9-"
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    data-oid=".rwurwj"
                  >
                    <div
                      className={`absolute h-px w-full ${isLevelHorizontal ? "bg-green-500" : "bg-gray-600"}`}
                      data-oid="w3uqc.5"
                    ></div>
                    <div
                      className="absolute h-full w-px bg-gray-600"
                      data-oid="wcq8:v-"
                    ></div>
                  </div>

                  <motion.div
                    className="absolute top-0 bottom-0 w-6 bg-cyan-500 rounded mx-auto left-0 right-0"
                    style={{
                      translateX: `${rotation.gamma * 3}px`,
                      opacity: locked ? 0.7 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    data-oid="icjjmkp"
                  />

                  <div
                    className="absolute inset-0 pointer-events-none"
                    data-oid="9dhe_97"
                  >
                    {isLevelHorizontal && (
                      <div
                        className="absolute inset-0 bg-green-500/10 flex items-center justify-center"
                        data-oid="c115mpu"
                      >
                        <div
                          className="text-green-500 text-xs font-medium"
                          data-oid="2_:tc4-"
                        >
                          LEVEL
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="flex justify-between text-xs"
                  data-oid="ej7zg8u"
                >
                  <span className="text-gray-400" data-oid="qo:qm_-">
                    -5°
                  </span>
                  <span
                    className={`font-medium ${isLevelHorizontal ? "text-green-500" : "text-cyan-400"}`}
                    data-oid=".1x9_lg"
                  >
                    {rotation.gamma.toFixed(1)}°
                  </span>
                  <span className="text-gray-400" data-oid="jbers44">
                    +5°
                  </span>
                </div>
              </div>

              {/* Vertical Level */}
              <div
                className="bg-space-800/70 rounded-lg p-4 space-y-2"
                data-oid="d_dknls"
              >
                <h3
                  className="text-sm font-medium text-gray-300 mb-2"
                  data-oid="1:tp3om"
                >
                  Vertical Level
                </h3>
                <div
                  className="relative h-36 w-12 bg-space-900 rounded-lg overflow-hidden mx-auto"
                  data-oid=".h.-ltx"
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    data-oid="8torzrk"
                  >
                    <div
                      className="absolute h-full w-px bg-gray-600"
                      data-oid="h79z08q"
                    ></div>
                    <div
                      className={`absolute h-px w-full ${isLevelVertical ? "bg-green-500" : "bg-gray-600"}`}
                      data-oid="bmjiuwr"
                    ></div>
                  </div>

                  <motion.div
                    className="absolute left-0 right-0 h-6 bg-cyan-500 rounded my-auto top-0 bottom-0"
                    style={{
                      translateY: `${rotation.beta * 2}px`,
                      opacity: locked ? 0.7 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    data-oid="0ncyxpm"
                  />

                  <div
                    className="absolute inset-0 pointer-events-none"
                    data-oid="hsz63_a"
                  >
                    {isLevelVertical && (
                      <div
                        className="absolute inset-0 bg-green-500/10 flex items-center justify-center"
                        data-oid="90gzdf4"
                      >
                        <div
                          className="text-green-500 text-xs font-medium rotate-90"
                          data-oid="fnzjs-y"
                        >
                          LEVEL
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-center text-xs" data-oid="evk3xge">
                  <span
                    className={`font-medium ${isLevelVertical ? "text-green-500" : "text-cyan-400"}`}
                    data-oid="4cs-u::"
                  >
                    {rotation.beta.toFixed(1)}°
                  </span>
                </div>
              </div>

              <div className="flex justify-between" data-oid="h8pt9ug">
                <Button
                  variant="outline"
                  className="bg-space-800 border-space-700 hover:bg-space-700 text-white"
                  onClick={resetOrientation}
                  data-oid="ruu8cg7"
                >
                  <i className="fas fa-redo mr-2" data-oid="am7omqj"></i> Reset
                </Button>

                <Button
                  variant={locked ? "default" : "outline"}
                  className={
                    locked
                      ? "bg-amber-700 hover:bg-amber-600 text-white"
                      : "bg-space-800 border-space-700 hover:bg-space-700 text-white"
                  }
                  onClick={toggleLock}
                  data-oid="_o6:tne"
                >
                  <i
                    className={`fas ${locked ? "fa-lock" : "fa-lock-open"} mr-2`}
                    data-oid="xhgrk-q"
                  ></i>
                  {locked ? "Unlock" : "Lock"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LevelToolModal;
