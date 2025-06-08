import { FC } from "react";
import GlassCard from "@/components/ui/GlassCard";

const ActiveProjects: FC = () => {
  const projects = [
    { id: 1, name: "Papamoa Beach Deck", status: "In Progress", progress: 80 },
    {
      id: 2,
      name: "Mount Property Renovation",
      status: "In Progress",
      progress: 45,
    },
    {
      id: 3,
      name: "Te Puke Stairs Installation",
      status: "On Hold",
      progress: 25,
    },
  ];

  return (
    <GlassCard className="p-4" data-oid=".yptaii">
      <div className="flex justify-between items-start mb-3" data-oid="fod4xe8">
        <h3 className="text-md font-space text-white" data-oid="-avt2ft">
          Active Projects
        </h3>
        <span className="text-electric" data-oid="_yt2c:2">
          <i className="fas fa-project-diagram" data-oid="rz86dm1"></i>
        </span>
      </div>

      <div
        className="text-2xl font-space font-bold text-electric mb-2"
        data-oid="95z_8xg"
      >
        {projects.length}
      </div>

      <div className="space-y-1" data-oid="bgee7n1">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`flex justify-between items-center py-2 border-b border-gray-700 relative rounded ${
              project.status === "In Progress"
                ? "active-job-card px-2 -mx-2"
                : ""
            }`}
            data-oid="p_ldeb8"
          >
            <div className="text-sm" data-oid="_6tmwd8">
              <div className="text-white" data-oid="cfadn_g">
                {project.name}
              </div>
              <div className="flex items-center" data-oid="h2q1qan">
                {project.status === "In Progress" && (
                  <span
                    className="h-2 w-2 rounded-full bg-green-400 mr-1.5 animate-pulse"
                    data-oid="kkqv5vz"
                  ></span>
                )}
                <span className="text-xs text-gray-400" data-oid="3nxe7y8">
                  {project.status} ({project.progress}%)
                </span>
              </div>
            </div>
            <div data-oid="zit9d5.">
              <button
                className="text-xs text-electric hover:text-cyan"
                data-oid="gx6i6x."
              >
                <i className="fas fa-arrow-right" data-oid="qm7rm5q"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default ActiveProjects;
