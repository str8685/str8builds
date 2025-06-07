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
    <GlassCard className="p-4" data-oid=":ys8rpe">
      <div className="flex justify-between items-start mb-4" data-oid="l4uahi2">
        <h3 className="text-md font-space text-white" data-oid="sgk255x">
          NZ Building Resources
        </h3>
        <Link
          href="/resources"
          className="text-xs text-electric hover:text-cyan"
          data-oid="cyyi_4u"
        >
          View All
        </Link>
      </div>

      <div className="space-y-3" data-oid="659kv6b">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="flex items-center p-2 hover:bg-space-800/50 rounded-lg transition"
            data-oid="5fchmrf"
          >
            <div
              className={`w-10 h-10 rounded-lg bg-purple-900 flex items-center justify-center text-${resource.color} mr-3`}
              data-oid="phaebv-"
            >
              <i className={resource.icon} data-oid="u:hmcxf"></i>
            </div>
            <div className="flex-1" data-oid="6w7n:xp">
              <div
                className="text-sm font-medium text-white"
                data-oid="eyoj869"
              >
                {resource.name}
              </div>
              <div className="text-xs text-gray-400" data-oid="_k.ytaz">
                {resource.updated}
              </div>
            </div>
            <div data-oid="7kd_ki0">
              <button
                className="text-electric hover:text-cyan"
                data-oid="wmxgb1z"
              >
                <i className="fas fa-arrow-right" data-oid="mqhswhz"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default ResourcesWidget;
