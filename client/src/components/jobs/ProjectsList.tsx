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
      <div className="space-y-4" data-oid="5t.c7de">
        <div className="flex justify-center p-10" data-oid="nybwhf2">
          <div
            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-electric"
            data-oid="45l.uiq"
          ></div>
        </div>
      </div>
    );
  }

  // Use typed projects array
  const displayProjects = typedProjects;

  if (displayProjects.length === 0) {
    return (
      <div className="space-y-2" data-oid="2dc8uyf">
        <div
          className="p-6 text-center bg-space-800/50 rounded-lg"
          data-oid="ur:no6v"
        >
          <p className="text-gray-400" data-oid="y.i98vd">
            No projects found.
          </p>
          <p className="text-xs text-gray-500 mt-1" data-oid="vobg-4h">
            Add a new project to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-oid="bcaxzg9">
      {/* Project Camera Dialog */}
      <Dialog open={cameraOpen} onOpenChange={setCameraOpen} data-oid="cta8bz0">
        <DialogContent
          className="bg-space-900 border-space-700 p-0 max-w-lg overflow-hidden"
          data-oid="r:i28jv"
        >
          <ProjectCamera
            project={selectedProject || undefined}
            onClose={() => setCameraOpen(false)}
            data-oid="84j0.ii"
          />
        </DialogContent>
      </Dialog>

      {/* Project Photos Dialog */}
      <Dialog open={photosOpen} onOpenChange={setPhotosOpen} data-oid="7te1a3.">
        <DialogContent
          className="bg-space-900 border-space-700 p-6 max-w-2xl"
          data-oid="t_e5w07"
        >
          <h3
            className="text-white text-lg font-medium mb-4"
            data-oid="yi1bp6x"
          >
            Project Photos
          </h3>
          {selectedProject && (
            <ProjectPhotos project={selectedProject} data-oid="bplyrx4" />
          )}
        </DialogContent>
      </Dialog>

      {displayProjects.map((project: Project) => (
        <div
          key={project.id}
          className="bg-space-900 rounded-lg p-4"
          data-oid="f4h4i4:"
        >
          <div
            className="flex justify-between items-start mb-2"
            data-oid="7i5g.xy"
          >
            <div data-oid="ukkp6fg">
              <h4 className="text-white font-medium" data-oid="z8td1nh">
                {project.name}
              </h4>
              <p className="text-sm text-gray-400" data-oid="x5omog9">
                {project.clientId ? `Client #${project.clientId}` : "No client"}
              </p>
            </div>
            <span
              className="text-xs bg-space-800 px-2 py-1 rounded-md text-cyan"
              data-oid="vqa:jxy"
            >
              {getLastActiveText(
                project.createdAt ? project.createdAt.toString() : undefined,
              )}
            </span>
          </div>

          <div className="mt-4" data-oid="_u5tvr.">
            <div
              className="flex justify-between text-xs text-gray-400 mb-1"
              data-oid=".6dkwev"
            >
              <span data-oid="dnbq94c">Progress</span>
              <span data-oid="5.0g1cr">{project.progress || 0}%</span>
            </div>
            <div
              className="w-full bg-space-800 rounded-full h-2.5"
              data-oid="-hvbhiw"
            >
              <div
                className="bg-electric h-2.5 rounded-full"
                style={{ width: `${project.progress || 0}%` }}
                data-oid="fuq4322"
              ></div>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2" data-oid="lypy46l">
            <button
              className="text-xs bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 transition-all duration-300"
              onClick={() => console.log("Edit project", project.id)}
              data-oid="xsc02fy"
            >
              <i className="fas fa-pencil-alt mr-1" data-oid="ngaxph:"></i> Edit
            </button>
            <button
              className="text-xs bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 transition-all duration-300"
              onClick={() => console.log("Track time for project", project.id)}
              data-oid="1oj2fer"
            >
              <i className="fas fa-clock mr-1" data-oid="bnllzu7"></i> Time
            </button>
            <button
              className="text-xs bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 transition-all duration-300 group"
              onClick={() => {
                setSelectedProject(project);
                setPhotosOpen(true);
              }}
              data-oid="xblcx86"
            >
              <i
                className="fas fa-images mr-1 group-hover:text-cyan transition-colors duration-300"
                data-oid="xqyl:m1"
              ></i>{" "}
              Photos
            </button>
            <button
              className="text-xs bg-space-800 text-white px-3 py-1.5 rounded hover:bg-space-700 transition-all duration-300 group"
              onClick={() => {
                setSelectedProject(project);
                setCameraOpen(true);
              }}
              data-oid=":8vszob"
            >
              <i
                className="fas fa-camera mr-1 group-hover:text-cyan transition-colors duration-300"
                data-oid="88puky2"
              ></i>{" "}
              Camera
            </button>
            <button
              className="text-xs bg-purple-900 text-cyan px-3 py-1.5 rounded hover:bg-purple-800 btn-glow btn-glow-cyan transition-all duration-300"
              onClick={() => openEditModal(project)}
              data-oid="w32mist"
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
