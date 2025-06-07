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
      icon: <Star className="text-purple-800" data-oid="fjglcze" />,
    },
    {
      id: "circle-templates",
      name: "Circle Templates",
      url: "https://www.blocklayer.com/circle-templates",
      description:
        "Create exact circle templates with measurement markings for a variety of applications.",
      icon: <Circle className="text-purple-800" data-oid="h17_nqi" />,
    },
    {
      id: "polygon-templates",
      name: "Polygon Templates",
      url: "https://www.blocklayer.com/polygon-templates",
      description:
        "Generate polygon templates with precise measurements for woodworking and craft projects.",
      icon: <Hexagon className="text-purple-800" data-oid="rfnmq2d" />,
    },
    {
      id: "cone-patterns",
      name: "Cone Pattern Templates",
      url: "https://www.blocklayer.com/cone-patterns",
      description:
        "Create paper templates for building cone shapes with precise angles and dimensions.",
      icon: <Compass className="text-purple-800" data-oid="lda.ude" />,
    },
    {
      id: "gauge-templates",
      name: "Custom Gauge Face Templates",
      url: "https://www.blocklayer.com/gauge-templates",
      description:
        "Design custom gauge faces with precise calibration markings for instrumentation.",
      icon: <Gauge className="text-purple-800" data-oid="e0stj8:" />,
    },
    {
      id: "grid-templates",
      name: "Printable Graph Paper",
      url: "https://www.blocklayer.com/graph-paper",
      description:
        "Generate custom grid patterns and graph paper for planning and design work.",
      icon: <Grid3X3 className="text-purple-800" data-oid="g_xa9uq" />,
    },
  ];

  return (
    <BaseCalculator
      title="Template Generators"
      description="Professional template generators to create precise patterns for woodworking, metalworking, and crafts."
      variant="purple"
      data-oid="2vb37_c"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="6f_fl-h">
        {/* Template selection */}
        <div data-oid="q1hs0aj">
          <div
            className="bg-space-800/30 p-4 rounded-lg mb-4"
            data-oid="so6-9w9"
          >
            <h3
              className="text-lg font-medium text-white mb-1"
              data-oid="w5v6:c."
            >
              Choose a Template Generator
            </h3>
            <p className="text-sm text-gray-300" data-oid="h.gklkx">
              Select from our collection of precision template generators for
              your projects.
            </p>
          </div>

          <div className="space-y-3" data-oid="t871lce">
            {templates.map((template) => (
              <GlassCard
                key={template.id}
                className={`p-4 cursor-pointer group ${selectedTemplate?.id === template.id ? "border-purple-800/70" : ""}`}
                variant="purple"
                border={true}
                glow={selectedTemplate?.id === template.id}
                onClick={() => setSelectedTemplate(template)}
                data-oid="tgn67x4"
              >
                <div className="flex items-center" data-oid="m8vc6qc">
                  <div
                    className="bg-space-900/60 p-3 rounded-lg mr-4"
                    data-oid="bmyp0y7"
                  >
                    {template.icon}
                  </div>
                  <div className="flex-grow" data-oid="kx1a43t">
                    <h4 className="font-medium text-white" data-oid="zs0q0kn">
                      {template.name}
                    </h4>
                    <p
                      className="text-xs text-gray-400 line-clamp-1"
                      data-oid="eg-d0:_"
                    >
                      {template.description}
                    </p>
                  </div>
                  <ChevronRight
                    className="text-purple-800 opacity-0 group-hover:opacity-100 transition-opacity"
                    size={18}
                    data-oid="rdbnbtg"
                  />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Template viewer */}
        <div
          className="bg-space-800/20 rounded-lg overflow-hidden"
          data-oid="w483ki_"
        >
          {selectedTemplate ? (
            <div className="h-full" data-oid="nylmze1">
              <div className="bg-space-800/80 p-4" data-oid="beie708">
                <h3
                  className="text-lg font-medium text-purple-800"
                  data-oid="gc6sxpc"
                >
                  {selectedTemplate.name}
                </h3>
                <p className="text-sm text-gray-300" data-oid="76_m3kh">
                  {selectedTemplate.description}
                </p>
              </div>
              <iframe
                src={selectedTemplate.url}
                className="w-full h-[500px] border-0"
                title={selectedTemplate.name}
                data-oid="-4wdlo9"
              />
            </div>
          ) : (
            <div
              className="h-full flex items-center justify-center p-12 text-center"
              data-oid="jby4pht"
            >
              <div data-oid="0-i_-a9">
                <Compass
                  size={48}
                  className="text-purple-800/30 mx-auto mb-4"
                  data-oid="1ndsu4u"
                />

                <h3
                  className="text-lg font-medium text-white mb-2"
                  data-oid="2novak5"
                >
                  Select a Template Generator
                </h3>
                <p className="text-gray-400 text-sm" data-oid="81i3..w">
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
