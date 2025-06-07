import { FC, useState, useRef, useEffect } from "react";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface ProjectCameraProps {
  project?: Project;
  onClose: () => void;
}

const ProjectCamera: FC<ProjectCameraProps> = ({ project, onClose }) => {
  const { updateProject } = useProjects();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);

  // Start camera
  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: isFrontCamera ? "user" : "environment",
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } else {
        toast({
          title: "Error",
          description: "Camera not supported on this device",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Error",
        description: "Failed to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  // Switch camera (front/back)
  const switchCamera = async () => {
    // Stop current camera
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }

    // Toggle camera mode
    setIsFrontCamera((prev) => !prev);

    // Restart with new camera
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: !isFrontCamera ? "user" : "environment" },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error switching camera:", error);
      toast({
        title: "Error",
        description: "Failed to switch camera",
        variant: "destructive",
      });
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  // Capture photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        // Set canvas dimensions to match video
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // Draw video frame to canvas
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );

        // Convert canvas to data URL
        const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
        setCapturedImage(imageDataUrl);

        // Stop camera after capturing
        stopCamera();
      }
    }
  };

  // Retake photo
  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  // Save project photo and note
  const saveProjectPhoto = async () => {
    if (!project || !capturedImage) return;

    setIsSaving(true);

    try {
      // Create photo entry with timestamp, image data, and note
      const timestamp = new Date().toISOString();
      const photoEntry = {
        timestamp,
        imageData: capturedImage,
        note,
      };

      // Get existing photos or initialize empty array
      const existingPhotos = project.photos
        ? JSON.parse(project.photos as string)
        : [];

      // Add new photo to array
      const updatedPhotos = [...existingPhotos, photoEntry];

      // Update project with new photos array
      await updateProject({
        id: project.id,
        project: {
          photos: JSON.stringify(updatedPhotos),
        },
      });

      toast({
        title: "Photo saved",
        description: "Project photo and note have been saved successfully.",
        variant: "default",
      });

      // Close camera
      onClose();
    } catch (error) {
      console.error("Error saving project photo:", error);
      toast({
        title: "Error",
        description: "Failed to save project photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Start camera when component mounts
  useEffect(() => {
    startCamera();

    // Clean up when component unmounts
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div
      className="bg-space-900 rounded-lg p-4 w-full max-w-lg mx-auto overflow-hidden"
      data-oid="4kptw7p"
    >
      <div
        className="flex justify-between items-center mb-4"
        data-oid="q-9aijw"
      >
        <h3 className="text-white text-lg font-medium" data-oid=":k6sjtl">
          Project Camera
        </h3>
        <button
          className="text-gray-400 hover:text-white"
          onClick={onClose}
          data-oid="ujxk-2s"
        >
          <i className="fas fa-times" data-oid="yoy5qny"></i>
        </button>
      </div>

      <div
        className="rounded-lg overflow-hidden bg-space-800 relative"
        data-oid="8yflysm"
      >
        {!capturedImage ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-64 object-cover"
              data-oid="v-nky25"
            />

            {cameraActive && (
              <div
                className="absolute bottom-3 left-0 right-0 flex justify-center space-x-3"
                data-oid="42cvsuu"
              >
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={switchCamera}
                  className="rounded-full h-10 w-10 bg-space-700/50 hover:bg-space-700"
                  data-oid="4mss1u:"
                >
                  <i className="fas fa-sync" data-oid="8f0j8kn"></i>
                </Button>
                <Button
                  variant="default"
                  size="icon"
                  onClick={capturePhoto}
                  className="rounded-full h-14 w-14 bg-purple-600/70 hover:bg-purple-600 btn-glow btn-glow-cyan"
                  data-oid="i--kgtn"
                >
                  <i className="fas fa-camera" data-oid="00g87_u"></i>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="relative" data-oid="7.wy0my">
            <img
              src={capturedImage}
              alt="Captured project"
              className="w-full h-64 object-contain"
              data-oid="w_ouoj3"
            />

            <Button
              variant="secondary"
              size="sm"
              onClick={retakePhoto}
              className="absolute top-2 right-2 bg-space-700/70 hover:bg-space-700"
              data-oid="o0pqdos"
            >
              <i className="fas fa-redo mr-1" data-oid="msv2r4f"></i> Retake
            </Button>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" data-oid="0zycus5" />

      {capturedImage && (
        <div className="mt-4 space-y-3" data-oid="71tk-_b">
          <div data-oid="s6s4fcr">
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-300 mb-1"
              data-oid="l_oof7d"
            >
              Add a note about this photo
            </label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Describe what's in this photo..."
              className="bg-space-800 border-space-700 text-white"
              rows={3}
              data-oid="8fr4l:6"
            />
          </div>

          <div className="flex justify-end space-x-2" data-oid="mv-ur8m">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-space-700 text-gray-300 hover:bg-space-800"
              data-oid="8ff8-9."
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={saveProjectPhoto}
              disabled={isSaving}
              className="bg-purple-900 text-cyan hover:bg-purple-800 btn-glow btn-glow-cyan"
              data-oid="v4:6cdo"
            >
              {isSaving ? (
                <>
                  <div
                    className="h-4 w-4 border-2 border-t-transparent border-cyan rounded-full animate-spin mr-2"
                    data-oid="fyjqpkw"
                  ></div>
                  Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-save mr-1" data-oid="wrby2a7"></i> Save
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCamera;
