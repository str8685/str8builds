import { FC, useState } from "react";
import BaseCalculator from "./BaseCalculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import GlassCard from "../ui/GlassCard";
import { ArrowRight } from "lucide-react";

const WoodworkingCalculator: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("kerf-spacing");

  const calculators = [
    {
      id: "kerf-spacing",
      name: "Kerf Spacing",
      url: "https://www.blocklayer.com/kerf-spacing",
      description:
        "Calculate kerf spacing for bending wood with precision for curved projects.",
    },
    {
      id: "crown-molding",
      name: "Crown Molding",
      url: "https://www.blocklayer.com/crown-molding",
      description:
        "Calculate angles for crown molding installation with precise cuts.",
    },
    {
      id: "miter-angles",
      name: "Miter Angles",
      url: "https://www.blocklayer.com/miter-angles",
      description: "Calculate exact miter angles for perfect corner joints.",
    },
    {
      id: "compound-miter",
      name: "Compound Miter",
      url: "https://www.blocklayer.com/compoundmiter",
      description:
        "Calculate compound miter angles for complex woodworking joints.",
    },
  ];

  const relatedTools = [
    {
      name: "Shelf & Drawer Spacing Calculator",
      url: "https://www.blocklayer.com/shelf-spacing",
    },
    {
      name: "Lumber Linear Ft to Square Ft",
      url: "https://www.blocklayer.com/linear-squareeng",
    },
    {
      name: "Wainscoting Design Tool",
      url: "https://www.blocklayer.com/wainscoting",
    },
    {
      name: "Segmented Turning Calculator",
      url: "https://www.blocklayer.com/woodturning-segments",
    },
  ];

  return (
    <div className="space-y-6" data-oid="4bs_88h">
      <BaseCalculator
        title="Woodworking Calculators"
        description="Professional calculators for precision woodworking, joinery, and furniture making."
        variant="teal"
        data-oid="fj2fy3-"
      >
        <Tabs
          defaultValue="kerf-spacing"
          onValueChange={setActiveTab}
          data-oid="rskq81b"
        >
          <TabsList
            className="grid grid-cols-4 bg-space-800/60 p-1 rounded-xl mb-6"
            data-oid="yu47ubi"
          >
            {calculators.map((calc) => (
              <TabsTrigger
                key={calc.id}
                value={calc.id}
                className="data-[state=active]:bg-teal data-[state=active]:text-black"
                data-oid="87y-mh_"
              >
                {calc.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {calculators.map((calc) => (
            <TabsContent
              key={calc.id}
              value={calc.id}
              className="border-0"
              data-oid="sj5kf-t"
            >
              <div
                className="bg-space-800/30 p-4 rounded-lg mb-6"
                data-oid="1fi64ip"
              >
                <h3
                  className="text-lg font-medium text-white mb-1"
                  data-oid="crmnzrs"
                >
                  {calc.name}
                </h3>
                <p className="text-sm text-gray-300" data-oid="gfh:exb">
                  {calc.description}
                </p>
              </div>

              <iframe
                src={calc.url}
                className="w-full border-0 rounded-lg min-h-[600px]"
                title={calc.name}
                data-oid="gqj1r1l"
              />
            </TabsContent>
          ))}
        </Tabs>
      </BaseCalculator>

      {/* Related Tools */}
      <GlassCard className="p-6" variant="teal" blur="sm" data-oid="3q7k0u8">
        <h3 className="text-lg font-medium text-teal mb-4" data-oid="bitjpec">
          Related Woodworking Tools
        </h3>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          data-oid="3ynw4o4"
        >
          {relatedTools.map((tool, index) => (
            <a
              key={index}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-space-800/40 rounded-lg hover:bg-space-800/60 transition-all group"
              data-oid="vvfwbqi"
            >
              <span className="text-white" data-oid="2-sltwp">
                {tool.name}
              </span>
              <ArrowRight
                size={18}
                className="text-teal opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all"
                data-oid="91u9fyv"
              />
            </a>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default WoodworkingCalculator;
