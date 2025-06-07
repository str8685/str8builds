import { FC, useState, useEffect } from "react";
import { Project } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ProjectPhoto {
  id: string;
  projectId: number;
  name: string;
  description?: string;
  imageUrl: string;
  createdAt: string;
}

interface ProjectPhotosProps {
  project: Project;
}

const ProjectPhotos: FC<ProjectPhotosProps> = ({ project }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<ProjectPhoto | null>(null);
  const [photos, setPhotos] = useState<ProjectPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load photos from localStorage
  useEffect(() => {
    try {
      // Get photos from localStorage
      const allPhotos: ProjectPhoto[] = JSON.parse(
        localStorage.getItem("projectPhotos") || "[]",
      );

      // Filter photos for this project
      const projectPhotos = allPhotos.filter(
        (photo) => photo.projectId === project.id,
      );

      // Sort by date (newest first)
      projectPhotos.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setPhotos(projectPhotos);
    } catch (error) {
      console.error("Error loading photos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [project.id]);

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    try {
      return format(new Date(timestamp), "MMM d, yyyy h:mm a");
    } catch (e) {
      return "Unknown date";
    }
  };

  const deletePhoto = (photoId: string) => {
    try {
      // Get all photos
      const allPhotos: ProjectPhoto[] = JSON.parse(
        localStorage.getItem("projectPhotos") || "[]",
      );

      // Filter out the one to delete
      const updatedPhotos = allPhotos.filter((photo) => photo.id !== photoId);

      // Save back to localStorage
      localStorage.setItem("projectPhotos", JSON.stringify(updatedPhotos));

      // Update state
      setPhotos(photos.filter((photo) => photo.id !== photoId));

      // Close dialog if the deleted photo was selected
      if (selectedPhoto?.id === photoId) {
        setSelectedPhoto(null);
      }

      toast({
        title: "Photo Deleted",
        description: "Project photo has been removed.",
      });
    } catch (error) {
      console.error("Error deleting photo:", error);
      toast({
        title: "Error",
        description: "Could not delete photo.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div
        className="p-6 text-center bg-space-800/50 rounded-lg flex flex-col items-center justify-center h-48"
        data-oid="46kpf88"
      >
        <div
          className="animate-spin text-cyan-400 text-2xl mb-3"
          data-oid="6t1x7wb"
        >
          <i className="fas fa-circle-notch" data-oid="h8gy5ii"></i>
        </div>
        <div className="text-gray-400" data-oid="7jwkipf">
          Loading project photos...
        </div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div
        className="p-6 text-center bg-space-800/50 rounded-lg h-48 flex flex-col items-center justify-center"
        data-oid="icm2u0:"
      >
        <div className="text-gray-400 mb-2" data-oid=".gysvl9">
          <i
            className="fas fa-camera text-2xl mb-3 text-gray-500"
            data-oid="qrqd4pm"
          ></i>
          <div data-oid="le1-gnf">No photos yet</div>
        </div>
        <p className="text-xs text-gray-500" data-oid="xwb.p4a">
          Use the Project Camera tool to take photos
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-oid="t5l_rrm">
      <div className="grid grid-cols-2 gap-3" data-oid="lf50-4i">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-b from-space-800 to-space-900 rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 border border-space-700/30"
            onClick={() => setSelectedPhoto(photo)}
            whileHover={{ y: -5 }}
            data-oid="rce39-e"
          >
            <div className="relative h-40" data-oid=".nbz8zz">
              <img
                src={photo.imageUrl}
                alt={photo.name || "Project photo"}
                className="w-full h-full object-cover"
                data-oid="uqsa9ul"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-space-900/90 via-space-900/30 to-transparent pointer-events-none"
                data-oid="tqb6._f"
              ></div>
              <div
                className="absolute bottom-0 left-0 right-0 p-3"
                data-oid="jos4f97"
              >
                <div
                  className="text-xs font-medium text-white"
                  data-oid=":7qdtwb"
                >
                  {photo.name}
                </div>
                <div className="text-xs text-gray-300" data-oid="5ko-b8v">
                  {formatTimestamp(photo.createdAt)}
                </div>
              </div>
              <div
                className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                data-oid="9azkqpt"
              ></div>
            </div>
            {photo.description && (
              <div className="p-3" data-oid="1bahygz">
                <p
                  className="text-xs text-gray-400 line-clamp-2"
                  data-oid="i99wx5g"
                >
                  {photo.description}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Photo Detail Dialog */}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={(open) => !open && setSelectedPhoto(null)}
        data-oid="w-z2:0b"
      >
        <DialogContent
          className="bg-gradient-to-br from-space-900 via-space-950 to-space-900 border border-space-700/50 text-white max-w-2xl overflow-hidden p-0"
          data-oid="zectjft"
        >
          <div className="absolute inset-0 overflow-hidden" data-oid=".9ofu6.">
            <div
              className="absolute -inset-[100px] bg-cyan-800/5 blur-3xl rounded-full top-0 right-0 z-0"
              data-oid="n8lgw8x"
            ></div>
            <div
              className="absolute -inset-[100px] bg-blue-800/5 blur-3xl rounded-full bottom-0 left-0 z-0"
              data-oid=":gx_:eu"
            ></div>
            <div
              className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
              data-oid="d-qcrw-"
            ></div>
            <div
              className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
              data-oid="nohz7yt"
            ></div>
          </div>

          <div className="relative z-10 p-6" data-oid="0y:ib1z">
            <DialogHeader className="mb-4" data-oid="595pyb0">
              <DialogTitle
                className="flex items-center text-xl font-space text-cyan-400 tracking-wide"
                data-oid="c_7ady3"
              >
                <div
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-cyan-900/50 mr-3"
                  data-oid="g.niy0v"
                >
                  <i className="fas fa-image" data-oid="ddnap-_"></i>
                </div>
                <span data-oid="55v9rs9">
                  {selectedPhoto?.name || "Project Photo"}
                </span>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6" data-oid="qx4i2ni">
              <div
                className="rounded-xl overflow-hidden shadow-2xl border border-space-700/50"
                data-oid="aw9swn_"
              >
                <img
                  src={selectedPhoto?.imageUrl}
                  alt={selectedPhoto?.name || "Project photo"}
                  className="w-full object-contain max-h-[60vh] bg-gradient-to-b from-space-800 to-space-900"
                  data-oid="6b:5pu6"
                />
              </div>

              <div className="space-y-4" data-oid="3z24.p0">
                <div
                  className="flex justify-between items-center"
                  data-oid="6uwt7xv"
                >
                  <div className="text-sm text-gray-300" data-oid="9hu4qbz">
                    {selectedPhoto && formatTimestamp(selectedPhoto.createdAt)}
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      selectedPhoto && deletePhoto(selectedPhoto.id)
                    }
                    className="bg-red-900/70 hover:bg-red-800 text-white border-red-700/30"
                    data-oid="cv0k2d7"
                  >
                    <i className="fas fa-trash-alt mr-2" data-oid="383nmis"></i>{" "}
                    Delete
                  </Button>
                </div>

                {selectedPhoto?.description && (
                  <div
                    className="bg-space-800/70 backdrop-blur-sm rounded-xl p-4 border border-space-700/30"
                    data-oid="8qr0fd7"
                  >
                    <h4
                      className="text-sm font-medium text-gray-300 mb-2"
                      data-oid="8:xz3ab"
                    >
                      Description
                    </h4>
                    <p className="text-gray-200" data-oid="-h4257j">
                      {selectedPhoto.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectPhotos;
