import { FC, useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useProjects } from "@/hooks/useProjects";

interface ProjectCamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ProjectPhoto {
  id: string;
  projectId: number;
  name: string;
  description?: string;
  imageUrl: string;
  createdAt: string;
}

const ProjectCamModal: FC<ProjectCamModalProps> = ({ open, onOpenChange }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [photoName, setPhotoName] = useState("");
  const [photoDescription, setPhotoDescription] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  const { projects, isLoading: projectsLoading } = useProjects();
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [open]);

  const startCamera = async () => {
    setLoading(true);
    setError(null);
    setCapturedImage(null);

    try {
      // Try with more explicit constraints to ensure compatibility
      const constraints = {
        audio: false,
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      console.log("Requesting camera access with constraints:", constraints);
      const mediaStream =
        await navigator.mediaDevices.getUserMedia(constraints);

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          console.log("Video metadata loaded, playing video");
          videoRef.current?.play().catch((e) => {
            console.error("Error playing video:", e);
          });
        };
      }

      console.log(
        "Camera access granted, stream tracks:",
        mediaStream.getTracks().map((t) => t.kind),
      );
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        `Could not access camera: ${err instanceof Error ? err.message : "Unknown error"}. Please ensure you have granted camera permissions.`,
      );
      toast({
        title: "Camera Error",
        description:
          "Could not access your camera. Check permissions and try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame to the canvas
    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to image URL
      const imageDataUrl = canvas.toDataURL("image/png");
      setCapturedImage(imageDataUrl);

      toast({
        title: "Image Captured",
        description: "Project photo has been saved to your gallery.",
      });
    }
  };

  // Save the photo to the project
  const saveImage = async () => {
    if (!capturedImage || !selectedProjectId) return;

    setSaveLoading(true);

    try {
      // In a real implementation, you would upload the image to your server
      // For now, we'll simulate saving to local storage

      const projectPhotos: ProjectPhoto[] = JSON.parse(
        localStorage.getItem("projectPhotos") || "[]",
      );

      const newPhoto: ProjectPhoto = {
        id: `photo_${Date.now()}`,
        projectId: parseInt(selectedProjectId),
        name: photoName || `Project Photo ${new Date().toLocaleDateString()}`,
        description: photoDescription,
        imageUrl: capturedImage,
        createdAt: new Date().toISOString(),
      };

      projectPhotos.push(newPhoto);
      localStorage.setItem("projectPhotos", JSON.stringify(projectPhotos));

      // Also save a copy as a download
      const a = document.createElement("a");
      a.href = capturedImage;
      a.download = `${photoName.replace(/\s+/g, "-").toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast({
        title: "Project Photo Saved",
        description: `Photo added to project ${projects.find((p) => p.id === parseInt(selectedProjectId))?.name || "Unknown"}`,
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error saving photo:", error);
      toast({
        title: "Save Error",
        description: "Could not save the project photo.",
        variant: "destructive",
      });
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} data-oid="gqot_rf">
      <DialogContent
        className="sm:max-w-lg bg-gradient-to-br from-space-900 via-space-950 to-space-900 border border-cyan-800/30 text-white shadow-glow-lg overflow-hidden p-0"
        data-oid=":8eg._o"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden" data-oid="3tefl1-">
          <div
            className="absolute -inset-[100px] bg-cyan-800/5 blur-3xl rounded-full top-0 right-0 z-0"
            data-oid="o0cldce"
          ></div>
          <div
            className="absolute -inset-[100px] bg-blue-800/5 blur-3xl rounded-full bottom-0 left-0 z-0"
            data-oid="jek89ak"
          ></div>
          <div
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            data-oid=":cq1j8n"
          ></div>
          <div
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            data-oid="eeczhi1"
          ></div>
          <div
            className="absolute grid grid-cols-6 grid-rows-6 h-full w-full"
            data-oid="nqyjj-b"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-cyan-500/5 h-1 w-1 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  opacity: [0.1, 0.5, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                data-oid="x-b4k-i"
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 p-6" data-oid="_tmcr:2">
          <DialogHeader className="mb-4" data-oid="i-2e3_-">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              data-oid="inkvy0d"
            >
              <DialogTitle
                className="flex items-center text-xl font-space text-cyan-400 tracking-wide"
                data-oid="4d-q6x5"
              >
                <div
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-cyan-900/50 mr-3"
                  data-oid="j:_mppt"
                >
                  <i className="fas fa-camera" data-oid="8fl9m8r"></i>
                </div>
                <span data-oid="m-spd3i">Project Camera</span>
              </DialogTitle>
            </motion.div>
          </DialogHeader>

          <div className="space-y-6" data-oid="rtyelkv">
            <AnimatePresence mode="wait" data-oid="4its5s9">
              {error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gradient-to-r from-red-900/40 to-red-950/40 border border-red-700/50 rounded-xl p-4 text-sm shadow-lg flex items-center"
                  data-oid="j6xcql5"
                >
                  <div
                    className="bg-red-700/30 h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                    data-oid="9u1t0s5"
                  >
                    <i
                      className="fas fa-exclamation-triangle"
                      data-oid=":op.ua8"
                    ></i>
                  </div>
                  <p data-oid="l7e1tvc">{error}</p>
                </motion.div>
              ) : loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-[350px] flex items-center justify-center bg-gradient-to-b from-space-800/80 to-space-900/80 rounded-xl backdrop-blur-sm border border-space-700/30 shadow-inner"
                  data-oid=".f9hmbt"
                >
                  <div
                    className="flex flex-col items-center"
                    data-oid="y9-jr93"
                  >
                    <div className="relative" data-oid="581sjka">
                      <div
                        className="absolute inset-0 rounded-full animate-ping bg-cyan-500/10"
                        data-oid="achh1c5"
                      ></div>
                      <div
                        className="animate-spin text-cyan-400 text-2xl mb-3 drop-shadow-glow-sm"
                        data-oid="7kqmxks"
                      >
                        <i
                          className="fas fa-circle-notch"
                          data-oid="-1.62i8"
                        ></i>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300" data-oid="5ntyqa4">
                      Accessing camera...
                    </p>
                  </div>
                </motion.div>
              ) : capturedImage ? (
                <motion.div
                  key="captured"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                  data-oid="z.s5d1d"
                >
                  <div
                    className="relative rounded-xl overflow-hidden shadow-2xl border border-space-700/50"
                    data-oid="d._1pm_"
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-space-950/80 via-transparent to-transparent z-10 pointer-events-none"
                      data-oid="729yfui"
                    ></div>
                    <img
                      src={capturedImage}
                      alt="Captured project"
                      className="max-h-[250px] w-full object-contain bg-gradient-to-b from-space-800 to-space-900"
                      data-oid="o.t1ogq"
                    />

                    <div
                      className="absolute top-3 right-3 z-20"
                      data-oid="ioxtfy2"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-space-800/90 hover:bg-space-700/90 text-white border-space-600/50 rounded-full h-9 w-9 p-0 shadow-lg"
                        onClick={() => setCapturedImage(null)}
                        data-oid="wsjrxh-"
                      >
                        <i className="fas fa-redo" data-oid="y-nolx."></i>
                      </Button>
                    </div>
                  </div>

                  {/* Project Photo Details Form */}
                  <div
                    className="space-y-3 bg-space-900/50 p-4 rounded-xl border border-space-700/30"
                    data-oid=":-d.-kc"
                  >
                    <h3
                      className="text-sm font-medium text-cyan-400"
                      data-oid="cw5.lqz"
                    >
                      Photo Details
                    </h3>

                    <div className="space-y-2" data-oid="0sl:y7i">
                      <Label
                        htmlFor="project"
                        className="text-gray-300 text-sm"
                        data-oid="svym:1g"
                      >
                        Project
                      </Label>
                      <Select
                        value={selectedProjectId}
                        onValueChange={setSelectedProjectId}
                        data-oid="jyf:qyy"
                      >
                        <SelectTrigger
                          className="bg-space-800 border-space-700 text-white"
                          data-oid="rdo9uwu"
                        >
                          <SelectValue
                            placeholder="Select project"
                            data-oid=":044cbc"
                          />
                        </SelectTrigger>
                        <SelectContent
                          className="bg-space-800 border-space-700 text-white"
                          data-oid="e2v7s4b"
                        >
                          {projectsLoading ? (
                            <SelectItem
                              value="loading"
                              disabled
                              data-oid="9q5h1ae"
                            >
                              Loading projects...
                            </SelectItem>
                          ) : projects && projects.length > 0 ? (
                            projects.map((project) => (
                              <SelectItem
                                key={project.id}
                                value={String(project.id)}
                                data-oid="cpcez0w"
                              >
                                {project.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem
                              value="none"
                              disabled
                              data-oid="92_ce25"
                            >
                              No projects available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2" data-oid="s:b7at9">
                      <Label
                        htmlFor="photoName"
                        className="text-gray-300 text-sm"
                        data-oid="i9jbef-"
                      >
                        Photo Name
                      </Label>
                      <Input
                        id="photoName"
                        value={photoName}
                        onChange={(e) => setPhotoName(e.target.value)}
                        className="bg-space-800 border-space-700 text-white"
                        placeholder="Enter photo name"
                        data-oid="6.ip4-8"
                      />
                    </div>

                    <div className="space-y-2" data-oid=":7vhwlp">
                      <Label
                        htmlFor="photoDescription"
                        className="text-gray-300 text-sm"
                        data-oid="t1j.026"
                      >
                        Description (optional)
                      </Label>
                      <Input
                        id="photoDescription"
                        value={photoDescription}
                        onChange={(e) => setPhotoDescription(e.target.value)}
                        className="bg-space-800 border-space-700 text-white"
                        placeholder="Describe what's in this photo"
                        data-oid="2ukx_ip"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="camera"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative bg-black rounded-xl overflow-hidden shadow-2xl border border-space-700/50 aspect-video"
                  data-oid="x:hq0j3"
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                    data-oid="1fq-vlr"
                  />

                  <div
                    className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"
                    data-oid="t4mg94o"
                  ></div>
                  <div
                    className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"
                    data-oid="0h9-33m"
                  ></div>

                  <div
                    className="absolute top-3 left-3 flex items-center space-x-2 text-white/70 text-xs"
                    data-oid="wq:qs-e"
                  >
                    <div className="flex items-center" data-oid="lkwbudo">
                      <div
                        className="h-2 w-2 rounded-full bg-red-500 animate-pulse mr-1"
                        data-oid="lkxa771"
                      ></div>
                      <span data-oid="ed6:f.s">REC</span>
                    </div>
                    <span data-oid="s_i1qpu">|</span>
                    <span data-oid="i9cloq4">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>

                  <div
                    className="absolute bottom-6 left-0 right-0 flex justify-center"
                    data-oid="c_ljzqx"
                  >
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={captureImage}
                      className="rounded-full h-14 w-14 bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center p-0 border-2 border-cyan-500/80 shadow-glow-sm"
                      aria-label="Take photo"
                      data-oid="f4y6rkt"
                    >
                      <div
                        className="rounded-full h-10 w-10 border-3 border-cyan-400 shadow-inner"
                        data-oid=".35ecuy"
                      ></div>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hidden canvas for image capture */}
            <canvas ref={canvasRef} className="hidden" data-oid="x2keuv-" />
          </div>

          <div className="relative z-10 mt-4 px-6 pb-6" data-oid="he9o7dv">
            <div
              className="flex justify-between items-center"
              data-oid="wavmh6h"
            >
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-space-700/50 bg-space-800/50 hover:bg-space-700/70 text-gray-300 hover:text-white transition-all duration-300"
                data-oid="b4src12"
              >
                Cancel
              </Button>

              {capturedImage && (
                <div className="flex gap-3" data-oid="-_jjuc8">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex-grow"
                    data-oid=":y6xciz"
                  >
                    <Button
                      onClick={saveImage}
                      disabled={!selectedProjectId || saveLoading}
                      className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white border-none shadow-glow-sm w-full"
                      data-oid="jyrabqa"
                    >
                      {saveLoading ? (
                        <>
                          <i
                            className="fas fa-circle-notch fa-spin mr-2"
                            data-oid="a7o2xtj"
                          ></i>{" "}
                          Saving...
                        </>
                      ) : (
                        <>
                          <i
                            className="fas fa-save mr-2"
                            data-oid="vzwrpgp"
                          ></i>{" "}
                          Save to Project
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCamModal;
