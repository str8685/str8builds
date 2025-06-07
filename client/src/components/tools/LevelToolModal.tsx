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
    <Dialog open={open} onOpenChange={onOpenChange} data-oid="nu5n_bc">
      <DialogContent
        className="bg-gradient-to-br from-space-900 via-space-950 to-space-900 border border-space-700/50 text-white max-w-md"
        data-oid="601i.ii"
      >
        <div className="absolute inset-0 overflow-hidden" data-oid="s1_opuv">
          <div
            className="absolute -inset-[100px] bg-cyan-800/5 blur-3xl rounded-full top-0 right-0 z-0"
            data-oid="dve8d5e"
          ></div>
          <div
            className="absolute -inset-[100px] bg-blue-800/5 blur-3xl rounded-full bottom-0 left-0 z-0"
            data-oid="r.a70fk"
          ></div>
          <div
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            data-oid="p726hhb"
          ></div>
          <div
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            data-oid="moa61um"
          ></div>
        </div>

        <div className="relative z-10" data-oid="6ciyrne">
          <DialogHeader className="mb-6" data-oid=":dieb:z">
            <DialogTitle
              className="flex items-center text-xl font-space text-cyan-400 tracking-wide"
              data-oid="rf59s-a"
            >
              <i
                className="fas fa-level-up-alt fa-rotate-90 mr-3"
                data-oid="1pjjg0j"
              ></i>
              <span data-oid="a6yoylt">Digital Level</span>
            </DialogTitle>
          </DialogHeader>

          {permissionError ? (
            <div className="p-6 text-center" data-oid="ytat173">
              <div className="text-3xl text-amber-500 mb-4" data-oid="6u:ujsq">
                <i
                  className="fas fa-exclamation-triangle"
                  data-oid="fs3mg65"
                ></i>
              </div>
              <p className="text-gray-300 mb-4" data-oid="sx5ha55">
                {permissionError}
              </p>
              <p className="text-sm text-gray-400 mb-4" data-oid="8z0lq21">
                This tool requires motion sensors that are typically available
                on mobile devices.
              </p>
              <Button
                onClick={requestPermission}
                className="bg-cyan-700 hover:bg-cyan-600 text-white"
                data-oid="f5l02xf"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className="space-y-6" data-oid="u-zllpj">
              {/* Horizontal Level */}
              <div
                className="bg-space-800/70 rounded-lg p-4 space-y-2"
                data-oid="k_bg9h5"
              >
                <h3
                  className="text-sm font-medium text-gray-300 mb-2"
                  data-oid="3muy12_"
                >
                  Horizontal Level
                </h3>
                <div
                  className="relative h-12 bg-space-900 rounded-lg overflow-hidden"
                  data-oid="_vutxf8"
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    data-oid="vuomxj8"
                  >
                    <div
                      className={`absolute h-px w-full ${isLevelHorizontal ? "bg-green-500" : "bg-gray-600"}`}
                      data-oid="rcs6jp0"
                    ></div>
                    <div
                      className="absolute h-full w-px bg-gray-600"
                      data-oid="typ-cxr"
                    ></div>
                  </div>

                  <motion.div
                    className="absolute top-0 bottom-0 w-6 bg-cyan-500 rounded mx-auto left-0 right-0"
                    style={{
                      translateX: `${rotation.gamma * 3}px`,
                      opacity: locked ? 0.7 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    data-oid="ywlfpsk"
                  />

                  <div
                    className="absolute inset-0 pointer-events-none"
                    data-oid="s2vxkm-"
                  >
                    {isLevelHorizontal && (
                      <div
                        className="absolute inset-0 bg-green-500/10 flex items-center justify-center"
                        data-oid=".cnro.:"
                      >
                        <div
                          className="text-green-500 text-xs font-medium"
                          data-oid="pi.nr2i"
                        >
                          LEVEL
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="flex justify-between text-xs"
                  data-oid="v-mna0d"
                >
                  <span className="text-gray-400" data-oid="-zl7511">
                    -5°
                  </span>
                  <span
                    className={`font-medium ${isLevelHorizontal ? "text-green-500" : "text-cyan-400"}`}
                    data-oid="9sfd1zv"
                  >
                    {rotation.gamma.toFixed(1)}°
                  </span>
                  <span className="text-gray-400" data-oid="zkzofbr">
                    +5°
                  </span>
                </div>
              </div>

              {/* Vertical Level */}
              <div
                className="bg-space-800/70 rounded-lg p-4 space-y-2"
                data-oid="75q198i"
              >
                <h3
                  className="text-sm font-medium text-gray-300 mb-2"
                  data-oid="9_12:9-"
                >
                  Vertical Level
                </h3>
                <div
                  className="relative h-36 w-12 bg-space-900 rounded-lg overflow-hidden mx-auto"
                  data-oid="vva9fm8"
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    data-oid="1wr.96v"
                  >
                    <div
                      className="absolute h-full w-px bg-gray-600"
                      data-oid="w:uw7kw"
                    ></div>
                    <div
                      className={`absolute h-px w-full ${isLevelVertical ? "bg-green-500" : "bg-gray-600"}`}
                      data-oid="fvhjw1c"
                    ></div>
                  </div>

                  <motion.div
                    className="absolute left-0 right-0 h-6 bg-cyan-500 rounded my-auto top-0 bottom-0"
                    style={{
                      translateY: `${rotation.beta * 2}px`,
                      opacity: locked ? 0.7 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    data-oid="xcdmimb"
                  />

                  <div
                    className="absolute inset-0 pointer-events-none"
                    data-oid="ud-fb.y"
                  >
                    {isLevelVertical && (
                      <div
                        className="absolute inset-0 bg-green-500/10 flex items-center justify-center"
                        data-oid="kjgs6cb"
                      >
                        <div
                          className="text-green-500 text-xs font-medium rotate-90"
                          data-oid="a8ag8ll"
                        >
                          LEVEL
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-center text-xs" data-oid="2p4-:at">
                  <span
                    className={`font-medium ${isLevelVertical ? "text-green-500" : "text-cyan-400"}`}
                    data-oid="p6du.98"
                  >
                    {rotation.beta.toFixed(1)}°
                  </span>
                </div>
              </div>

              <div className="flex justify-between" data-oid="u:._tax">
                <Button
                  variant="outline"
                  className="bg-space-800 border-space-700 hover:bg-space-700 text-white"
                  onClick={resetOrientation}
                  data-oid="4s792tu"
                >
                  <i className="fas fa-redo mr-2" data-oid=".fjlocw"></i> Reset
                </Button>

                <Button
                  variant={locked ? "default" : "outline"}
                  className={
                    locked
                      ? "bg-amber-700 hover:bg-amber-600 text-white"
                      : "bg-space-800 border-space-700 hover:bg-space-700 text-white"
                  }
                  onClick={toggleLock}
                  data-oid="dmtni7_"
                >
                  <i
                    className={`fas ${locked ? "fa-lock" : "fa-lock-open"} mr-2`}
                    data-oid="3tdi-jz"
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
