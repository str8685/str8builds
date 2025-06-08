import { FC } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { Link } from "wouter";

const ResourcesWidget: FC = () => {
  const resources = [
    {
      id: 1,
      name: "NZ Stair Guidelines",
      updated: "May 2025",
      icon: "fas fa-stairs",
      color: "electric",
    },
    {
      id: 2,
      name: "GIB® Fixing Guide",
      updated: "March 2025",
      icon: "fas fa-home",
      color: "cyan",
    },
    {
      id: 3,
      name: "Deck Construction Standards",
      updated: "NZ Building Code Compliant",
      icon: "fas fa-ruler-combined",
      color: "teal",
    },
  ];

  return (
    <GlassCard className="p-4" data-oid="mxggjti">
      <div className="flex justify-between items-start mb-4" data-oid="dnbjzh_">
        <h3 className="text-md font-space text-white" data-oid="lztocda">
          NZ Building Resources
        </h3>
        <Link
          href="/resources"
          className="text-xs text-electric hover:text-cyan"
          data-oid="uvpl85p"
        >
          View All
        </Link>
      </div>

      <div className="space-y-3" data-oid="0fv9k-s">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="flex items-center p-2 hover:bg-space-800/50 rounded-lg transition"
            data-oid="y.vm2h_"
          >
            <div
              className={`w-10 h-10 rounded-lg bg-purple-900 flex items-center justify-center text-${resource.color} mr-3`}
              data-oid="tpwi30v"
            >
              <i className={resource.icon} data-oid="sb78d1o"></i>
            </div>
            <div className="flex-1" data-oid="z:s6qzk">
              <div
                className="text-sm font-medium text-white"
                data-oid="e9qbjoe"
              >
                {resource.name}
              </div>
              <div className="text-xs text-gray-400" data-oid="oburwlw">
                {resource.updated}
              </div>
            </div>
            <div data-oid="t5f.4yi">
              <button
                className="text-electric hover:text-cyan"
                data-oid="v_8i4w4"
              >
                <i className="fas fa-arrow-right" data-oid="3g6rrn2"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default ResourcesWidget;
