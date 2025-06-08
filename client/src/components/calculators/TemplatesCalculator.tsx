import { FC, useState } from "react";
import BaseCalculator from "./BaseCalculator";
import {
  Grid3X3,
  Star,
  Circle,
  Hexagon,
  Compass,
  Gauge,
  ChevronRight,
} from "lucide-react";
import GlassCard from "../ui/GlassCard";

interface TemplateItem {
  id: string;
  name: string;
  url: string;
  description: string;
  icon: JSX.Element;
}

const TemplatesCalculator: FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(
    null,
  );

  const templates: TemplateItem[] = [
    {
      id: "star-templates",
      name: "Star Templates",
      url: "https://www.blocklayer.com/star-templates",
      description:
        "Generate precise star patterns of various sizes and points for woodworking, art, and design projects.",
      icon: <Star className="text-purple-800" data-oid="49ebk2_" />,
    },
    {
      id: "circle-templates",
      name: "Circle Templates",
      url: "https://www.blocklayer.com/circle-templates",
      description:
        "Create exact circle templates with measurement markings for a variety of applications.",
      icon: <Circle className="text-purple-800" data-oid="kpyx3yh" />,
    },
    {
      id: "polygon-templates",
      name: "Polygon Templates",
      url: "https://www.blocklayer.com/polygon-templates",
      description:
        "Generate polygon templates with precise measurements for woodworking and craft projects.",
      icon: <Hexagon className="text-purple-800" data-oid="zd0bx3p" />,
    },
    {
      id: "cone-patterns",
      name: "Cone Pattern Templates",
      url: "https://www.blocklayer.com/cone-patterns",
      description:
        "Create paper templates for building cone shapes with precise angles and dimensions.",
      icon: <Compass className="text-purple-800" data-oid="daeif6l" />,
    },
    {
      id: "gauge-templates",
      name: "Custom Gauge Face Templates",
      url: "https://www.blocklayer.com/gauge-templates",
      description:
        "Design custom gauge faces with precise calibration markings for instrumentation.",
      icon: <Gauge className="text-purple-800" data-oid="z9g0y.8" />,
    },
    {
      id: "grid-templates",
      name: "Printable Graph Paper",
      url: "https://www.blocklayer.com/graph-paper",
      description:
        "Generate custom grid patterns and graph paper for planning and design work.",
      icon: <Grid3X3 className="text-purple-800" data-oid="ptgutx5" />,
    },
  ];

  return (
    <BaseCalculator
      title="Template Generators"
      description="Professional template generators to create precise patterns for woodworking, metalworking, and crafts."
      variant="purple"
      data-oid="r8kgl29"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="n7_zw_k">
        {/* Template selection */}
        <div data-oid="b:u:ghy">
          <div
            className="bg-space-800/30 p-4 rounded-lg mb-4"
            data-oid="8g884q0"
          >
            <h3
              className="text-lg font-medium text-white mb-1"
              data-oid="hruixnn"
            >
              Choose a Template Generator
            </h3>
            <p className="text-sm text-gray-300" data-oid="jzuh046">
              Select from our collection of precision template generators for
              your projects.
            </p>
          </div>

          <div className="space-y-3" data-oid="x4hzng6">
            {templates.map((template) => (
              <GlassCard
                key={template.id}
                className={`p-4 cursor-pointer group ${selectedTemplate?.id === template.id ? "border-purple-800/70" : ""}`}
                variant="purple"
                border={true}
                glow={selectedTemplate?.id === template.id}
                onClick={() => setSelectedTemplate(template)}
                data-oid="h.a6hxu"
              >
                <div className="flex items-center" data-oid="l6gkn30">
                  <div
                    className="bg-space-900/60 p-3 rounded-lg mr-4"
                    data-oid="zf:k_a2"
                  >
                    {template.icon}
                  </div>
                  <div className="flex-grow" data-oid="y5q.l3r">
                    <h4 className="font-medium text-white" data-oid="x-_93uk">
                      {template.name}
                    </h4>
                    <p
                      className="text-xs text-gray-400 line-clamp-1"
                      data-oid="br-xael"
                    >
                      {template.description}
                    </p>
                  </div>
                  <ChevronRight
                    className="text-purple-800 opacity-0 group-hover:opacity-100 transition-opacity"
                    size={18}
                    data-oid="vrlm.if"
                  />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Template viewer */}
        <div
          className="bg-space-800/20 rounded-lg overflow-hidden"
          data-oid="ovy2hsx"
        >
          {selectedTemplate ? (
            <div className="h-full" data-oid="ttc04ui">
              <div className="bg-space-800/80 p-4" data-oid="d1viuxb">
                <h3
                  className="text-lg font-medium text-purple-800"
                  data-oid="ezerc5o"
                >
                  {selectedTemplate.name}
                </h3>
                <p className="text-sm text-gray-300" data-oid="yz71i_g">
                  {selectedTemplate.description}
                </p>
              </div>
              <iframe
                src={selectedTemplate.url}
                className="w-full h-[500px] border-0"
                title={selectedTemplate.name}
                data-oid="tyytokf"
              />
            </div>
          ) : (
            <div
              className="h-full flex items-center justify-center p-12 text-center"
              data-oid="nla9kmn"
            >
              <div data-oid="y486.if">
                <Compass
                  size={48}
                  className="text-purple-800/30 mx-auto mb-4"
                  data-oid="2etvxpu"
                />

                <h3
                  className="text-lg font-medium text-white mb-2"
                  data-oid="-dg1ie1"
                >
                  Select a Template Generator
                </h3>
                <p className="text-gray-400 text-sm" data-oid="l-divz.">
                  Choose a template generator from the list to get started with
                  your project.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </BaseCalculator>
  );
};

export default TemplatesCalculator;
