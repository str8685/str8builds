import { FC, useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@shared/schema";
import ProjectCamera from "./ProjectCamera";
import ProjectPhotos from "./ProjectPhotos";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ProjectsList: FC = () => {
  const { projects = [], isLoading, openEditModal } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photosOpen, setPhotosOpen] = useState(false);

  // Explicitly type the projects array
  const typedProjects = projects as Project[];

  // Format date for better display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate days since last activity
  const getLastActiveText = (date?: string): string => {
    if (!date) return "No activity";

    const lastActive = new Date(date);
    const today = new Date();
    const diffTime = today.getTime() - lastActive.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4" data-oid="r8_s56_">
        <div className="flex justify-center p-10" data-oid="g.ap.5o">
          <div
            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-electric"
            data-oid="424er_k"
          ></div>
        </div>
      </div>
    );
  }

  // Use typed projects array
  const displayProjects = typedProjects;

  if (displayProjects.length === 0) {
    return (
      <div className="space-y-2" data-oid="0c9u3-t">
        <div
          className="p-6 text-center bg-space-800/50 rounded-lg"
          data-oid="qhxpekm"
        >
          <p className="text-gray-400" data-oid="zzhnm_u">
            No projects found.
          </p>
          <p className="text-xs text-gray-500 mt-1" data-oid="38am_re">
            Add a new project to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-oid="bh_rzv6">
      {/* Project Camera Dialog */}
      <Dialog open={cameraOpen} onOpenChange={setCameraOpen} data-oid="w2r53jv">
        <DialogContent
          className="bg-space-900 border-space-700 p-0 max-w-lg overflow-hidden"
          data-oid="czpbwtk"
        >
          <ProjectCamera
            project={selectedProject || undefined}
            onClose={() => setCameraOpen(false)}
            data-oid="oef7zph"
          />
        </DialogContent>
      </Dialog>

      {/* Project Photos Dialog */}
      <Dialog open={photosOpen} onOpenChange={setPhotosOpen} data-oid="_io_sn-">
        <DialogContent
          className="bg-space-900 border-space-700 p-6 max-w-2xl"
          data-oid="asmuse8"
        >
          <h3
            className="text-white text-lg font-medium mb-4"
            data-oid="dw27wam"
          >
            Project Photos
          </h3>
          {selectedProject && (
            <ProjectPhotos project={selectedProject} data-oid="piqaya5" />
          )}
        </DialogContent>
      </Dialog>

      {displayProjects.map((project: Project) => (
        <div
          key={project.id}
          className="bg-space-900 rounded-lg p-4"
          data-oid="xhbix0p"
        >
          <div
            className="flex justify-between items-start mb-2"
            data-oid="oi:g34a"
          >
            <div data-oid="i0tiwya">
              <h4 className="text-white font-medium" data-oid="lmf0l:f">
                {project.name}
              </h4>
              <p className="text-sm text-gray-400" data-oid="98bgd7c">
                {project.clientId ? `Client #${project.clientId}` : "No client"}
              </p>
            </div>
            <span
              className="text-xs bg-space-800 px-2 py-1 rounded-md text-cyan"
              data-oid="e9dwhvr"
            >
              {getLastActiveText(
                project.createdAt ? project.createdAt.toString() : undefined,
              )}
            </span>
          </div>

          <div className="mt-4" data-oid="r6oeth6">
            <div
              className="flex justify-between text-xs text-gray-400 mb-1"
              data-oid="wi:-js:"
            >
              <span data-oid="0qx5wgr">Progress</span>
              <span data-oid="5h:3j3l">{project.progress || 0}%</span>
            </div>
            <div
              className="w-full bg-space-800 rounded-full h-2.5"
              data-oid="14dgm4o"
            >
              <div
                className="bg-electric h-2.5 rounded-full"
                style={{ width: `${project.progress || 0}%` }}
                data-oid="jaqgvgs"
              ></div>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2" data-oid="h95plf1">
            <button
              className="text-xs bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 transition-all duration-300"
              onClick={() => console.log("Edit project", project.id)}
              data-oid="exzt59p"
            >
              <i className="fas fa-pencil-alt mr-1" data-oid="3titx_o"></i> Edit
            </button>
            <button
              className="text-xs bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 transition-all duration-300"
              onClick={() => console.log("Track time for project", project.id)}
              data-oid="q-weguu"
            >
              <i className="fas fa-clock mr-1" data-oid="ey.w8fg"></i> Time
            </button>
            <button
              className="text-xs bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 transition-all duration-300 group"
              onClick={() => {
                setSelectedProject(project);
                setPhotosOpen(true);
              }}
              data-oid="0wleuv7"
            >
              <i
                className="fas fa-images mr-1 group-hover:text-cyan transition-colors duration-300"
                data-oid="0l7vv.9"
              ></i>{" "}
              Photos
            </button>
            <button
              className="text-xs bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 transition-all duration-300 group"
              onClick={() => {
                setSelectedProject(project);
                setCameraOpen(true);
              }}
              data-oid="a3tawdj"
            >
              <i
                className="fas fa-camera mr-1 group-hover:text-cyan transition-colors duration-300"
                data-oid=":gmkzr2"
              ></i>{" "}
              Camera
            </button>
            <button
              className="text-xs bg-purple-900 text-cyan px-3 py-1.5 rounded hover:bg-purple-800 btn-glow btn-glow-cyan transition-all duration-300"
              onClick={() => openEditModal(project)}
              data-oid="2o0-z1g"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;
