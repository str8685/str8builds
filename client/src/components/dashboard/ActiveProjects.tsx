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
    <GlassCard className="p-4" data-oid="omv_m:l">
      <div className="flex justify-between items-start mb-3" data-oid="wp7arj5">
        <h3 className="text-md font-space text-white" data-oid="3srn8ml">
          Active Projects
        </h3>
        <span className="text-electric" data-oid="e4wkjrx">
          <i className="fas fa-project-diagram" data-oid="zflvoq3"></i>
        </span>
      </div>

      <div
        className="text-2xl font-space font-bold text-electric mb-2"
        data-oid="f7mepfo"
      >
        {projects.length}
      </div>

      <div className="space-y-1" data-oid="64qx.w9">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`flex justify-between items-center py-2 border-b border-gray-700 relative rounded ${
              project.status === "In Progress"
                ? "active-job-card px-2 -mx-2"
                : ""
            }`}
            data-oid="qbns6th"
          >
            <div className="text-sm" data-oid="32i25:h">
              <div className="text-white" data-oid="mt0lmvy">
                {project.name}
              </div>
              <div className="flex items-center" data-oid="ch:5fgb">
                {project.status === "In Progress" && (
                  <span
                    className="h-2 w-2 rounded-full bg-green-400 mr-1.5 animate-pulse"
                    data-oid="6s4y.a."
                  ></span>
                )}
                <span className="text-xs text-gray-400" data-oid="bimvh8w">
                  {project.status} ({project.progress}%)
                </span>
              </div>
            </div>
            <div data-oid="q:0oijr">
              <button
                className="text-xs text-electric hover:text-cyan"
                data-oid="8ghkaee"
              >
                <i className="fas fa-arrow-right" data-oid="ofr5:ym"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default ActiveProjects;
