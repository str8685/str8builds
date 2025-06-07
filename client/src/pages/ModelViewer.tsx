import { FC, useState, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { toast } from "@/hooks/use-toast";
import ModelFallback from "@/components/3d/ModelFallback";

// Building component types
type BuildingComponentType =
  | "foundation"
  | "frame"
  | "roof"
  | "walls"
  | "windows"
  | "door"
  | "floor"
  | "ceiling"
  | "custom";

// Building component definition
interface BuildingComponent {
  id: string;
  name: string;
  type: BuildingComponentType;
  thumbnail?: string;
  description: string;
  material: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
}

// Building project definition
interface BuildingProject {
  id: string;
  name: string;
  description: string;
  components: BuildingComponent[];
  thumbnail?: string;
}

// Building projects will be fetched from API
const SAMPLE_PROJECTS: BuildingProject[] = [];

// Component material colors
const MATERIAL_COLORS: Record<string, string> = {
  concrete: "#cccccc",
  timber: "#a0522d",
  steel: "#71797E",
  glass: "#39c2d7",
  brick: "#b22222",
  aluminum: "#A5A5A5",
};

// 3D Model page
const ModelViewer: FC = () => {
  const [projects, setProjects] = useState<BuildingProject[]>([]);
  const [selectedProject, setSelectedProject] =
    useState<BuildingProject | null>(null);
  const [selectedComponent, setSelectedComponent] =
    useState<BuildingComponent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load projects on mount
  useEffect(() => {
    // In a real app, fetch projects from API
    setProjects(SAMPLE_PROJECTS);
    setIsLoading(false);
  }, []);

  // Handle project selection
  const handleSelectProject = (project: BuildingProject) => {
    setSelectedProject(project);
    setSelectedComponent(null);
  };

  // Handle component selection
  const handleSelectComponent = (component: BuildingComponent) => {
    setSelectedComponent(component);
  };

  // Get material color
  const getMaterialColor = (materialName: string): string => {
    return MATERIAL_COLORS[materialName] || "#cccccc";
  };

  return (
    <main
      className="container mx-auto px-4 py-8 models-section"
      data-oid="ay8gfm_"
    >
      <div
        className="flex justify-between items-center mb-6"
        data-oid="0xxgqrh"
      >
        <h1
          className="text-2xl font-space font-bold text-white"
          data-oid="m5pf9:m"
        >
          <i className="fas fa-cube mr-2" data-oid="4kbrzm6"></i>
          3D Building Components
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-oid="u5..f40">
        {/* Project List */}
        <div className="col-span-1" data-oid="tg94uz2">
          <GlassCard className="p-4 h-full" data-oid="yhmzud9">
            <h2
              className="text-lg font-space text-white mb-3"
              data-oid="8yk34di"
            >
              Building Projects
            </h2>

            {isLoading ? (
              <div
                className="h-40 flex justify-center items-center"
                data-oid="0mke2kn"
              >
                <div
                  className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan"
                  data-oid="yg93:16"
                ></div>
              </div>
            ) : (
              <div className="space-y-3" data-oid="r_bl5x4">
                {projects.length === 0 ? (
                  <div
                    className="bg-space-800/60 p-6 rounded-lg text-center"
                    data-oid="7synxg7"
                  >
                    <p className="text-gray-400" data-oid="q:mw821">
                      No projects available
                    </p>
                    <p
                      className="text-xs text-gray-500 mt-2"
                      data-oid="7uzw0-9"
                    >
                      Projects will appear here when added
                    </p>
                  </div>
                ) : (
                  projects.map((project) => (
                    <div
                      key={project.id}
                      className={`bg-space-800/60 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedProject?.id === project.id
                          ? "border-l-4 border-cyan shadow-lg shadow-cyan/20"
                          : "border-l-4 border-transparent hover:border-cyan/50"
                      }`}
                      onClick={() => handleSelectProject(project)}
                      data-oid="l7ocr5u"
                    >
                      <h3 className="text-white font-medium" data-oid="ccs4ti:">
                        {project.name}
                      </h3>
                      <p
                        className="text-gray-400 text-xs mt-1"
                        data-oid="xks7anx"
                      >
                        {project.description}
                      </p>
                      <div
                        className="flex justify-between items-center mt-2"
                        data-oid="6wpa-4_"
                      >
                        <span className="text-xs text-cyan" data-oid="aiu.suf">
                          {project.components.length} components
                        </span>
                        <span
                          className="text-xs bg-space-700 rounded-full px-2 py-0.5"
                          data-oid="zws74us"
                        >
                          {project.id}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </GlassCard>
        </div>

        {/* Component Viewer */}
        <div className="col-span-1 lg:col-span-2" data-oid="afwbxrv">
          {selectedProject ? (
            <div className="grid grid-cols-1 gap-6" data-oid="kf9jysi">
              {/* Project Details */}
              <GlassCard className="p-4" data-oid="hberae:">
                <div
                  className="flex justify-between items-start"
                  data-oid="n429.:q"
                >
                  <div data-oid="m65sdjf">
                    <h2
                      className="text-lg font-space text-white"
                      data-oid="zt.w2d6"
                    >
                      {selectedProject.name}
                    </h2>
                    <p
                      className="text-gray-400 text-sm mt-1"
                      data-oid="s0uz8oe"
                    >
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="flex gap-2" data-oid="lmqvi-6">
                    <button
                      className="text-sm bg-space-800 text-cyan px-3 py-1 rounded hover:bg-space-700"
                      onClick={() => {
                        toast({
                          title: "3D Model Exported",
                          description:
                            "Model data has been exported to your project folder.",
                        });
                      }}
                      data-oid="q5:ona1"
                    >
                      <i
                        className="fas fa-file-export mr-1"
                        data-oid="73l3:lh"
                      ></i>{" "}
                      Export
                    </button>
                    <button
                      className="text-sm bg-purple-900 text-cyan px-3 py-1 rounded hover:bg-purple-800 btn-glow btn-glow-cyan"
                      onClick={() => {
                        toast({
                          title: "Full 3D Viewer",
                          description:
                            "Coming soon! Full 3D viewing capabilities will be available in the next release.",
                        });
                      }}
                      data-oid="z888biw"
                    >
                      <i className="fas fa-cube mr-1" data-oid="e1bz6q3"></i> 3D
                      View
                    </button>
                  </div>
                </div>
              </GlassCard>

              {/* Component Visualization */}
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                data-oid="mw1_d4a"
              >
                {selectedProject.components.map((component) => (
                  <div
                    key={component.id}
                    className={`bg-space-800/60 p-3 rounded-lg cursor-pointer hover:bg-space-700/80 transition-all ${
                      selectedComponent?.id === component.id
                        ? "ring-2 ring-cyan"
                        : ""
                    }`}
                    onClick={() => handleSelectComponent(component)}
                    data-oid="j.5tj5w"
                  >
                    <div
                      className="aspect-video mb-2 rounded bg-space-900 flex items-center justify-center"
                      data-oid="ie7dy6x"
                    >
                      <div
                        className="w-16 h-16 rounded"
                        style={{
                          backgroundColor: getMaterialColor(component.material),
                        }}
                        data-oid="g1ilotk"
                      >
                        {component.type === "foundation" && (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            data-oid="rg47bro"
                          >
                            <div
                              className="w-3/4 h-1/4 bg-space-700/50"
                              data-oid="f9ixx0e"
                            ></div>
                          </div>
                        )}
                        {component.type === "frame" && (
                          <div className="w-full h-full p-2" data-oid="u2s4116">
                            <div
                              className="w-full h-full border-2 border-space-700/50"
                              data-oid="1l_5z9."
                            ></div>
                          </div>
                        )}
                        {component.type === "roof" && (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            data-oid="5elrpfv"
                          >
                            <div
                              className="w-3/4 h-1/2"
                              style={{
                                backgroundColor: getMaterialColor(
                                  component.material,
                                ),
                                clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
                              }}
                              data-oid="-hmgpd7"
                            ></div>
                          </div>
                        )}
                        {component.type === "walls" && (
                          <div className="w-full h-full p-3" data-oid="p6hr7vp">
                            <div
                              className="w-full h-full bg-space-700/50"
                              data-oid="ee8x48i"
                            ></div>
                          </div>
                        )}
                        {component.type === "windows" && (
                          <div
                            className="w-full h-full p-4 flex items-center justify-center"
                            data-oid="8.uhk-2"
                          >
                            <div
                              className="w-full h-full bg-cyan/30 border border-white/30"
                              data-oid="rv6119k"
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <h3
                      className="text-white text-sm font-medium"
                      data-oid="vry.xws"
                    >
                      {component.name}
                    </h3>
                    <p
                      className="text-gray-400 text-xs mt-1 line-clamp-2"
                      data-oid=".b8n2er"
                    >
                      {component.description}
                    </p>
                    <div
                      className="mt-2 flex justify-between"
                      data-oid="cz7bclf"
                    >
                      <span
                        className="text-xs rounded-full px-2 py-0.5"
                        style={{
                          backgroundColor: `${getMaterialColor(component.material)}30`,
                          color: getMaterialColor(component.material),
                        }}
                        data-oid="v6-xpy3"
                      >
                        {component.material}
                      </span>
                      <span
                        className="text-xs text-gray-400"
                        data-oid="ejghjuj"
                      >
                        {component.dimensions.width}m ×{" "}
                        {component.dimensions.height}m ×{" "}
                        {component.dimensions.depth}m
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Component Details */}
              {selectedComponent && (
                <GlassCard className="p-4" data-oid="mtrfau4">
                  <h3
                    className="text-lg font-space text-white mb-3"
                    data-oid="_5myayy"
                  >
                    {selectedComponent.name} Details
                  </h3>

                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    data-oid="misk0nu"
                  >
                    <div data-oid="t7szh65">
                      <div
                        className="aspect-video rounded-lg overflow-hidden bg-space-800 flex items-center justify-center mb-3"
                        data-oid=":5m2c:t"
                      >
                        <ModelFallback
                          message="3D preview will be available in the next update"
                          className="h-full w-full"
                          data-oid="4bujfwv"
                        />
                      </div>

                      <div
                        className="grid grid-cols-3 gap-2 text-sm"
                        data-oid="6lkor0a"
                      >
                        <div
                          className="bg-space-800 p-2 rounded"
                          data-oid="b55p8ll"
                        >
                          <span
                            className="block text-gray-400 text-xs"
                            data-oid="yu7_7lq"
                          >
                            Width
                          </span>
                          <span className="text-white" data-oid="349_kjj">
                            {selectedComponent.dimensions.width}m
                          </span>
                        </div>
                        <div
                          className="bg-space-800 p-2 rounded"
                          data-oid="rpd1hun"
                        >
                          <span
                            className="block text-gray-400 text-xs"
                            data-oid="sr8n.nj"
                          >
                            Height
                          </span>
                          <span className="text-white" data-oid="4v60hqh">
                            {selectedComponent.dimensions.height}m
                          </span>
                        </div>
                        <div
                          className="bg-space-800 p-2 rounded"
                          data-oid="kr4_9oa"
                        >
                          <span
                            className="block text-gray-400 text-xs"
                            data-oid="m3whmo:"
                          >
                            Depth
                          </span>
                          <span className="text-white" data-oid="o:6-1y5">
                            {selectedComponent.dimensions.depth}m
                          </span>
                        </div>
                      </div>
                    </div>

                    <div data-oid="xl6wuby">
                      <h4
                        className="text-white font-medium mb-2"
                        data-oid="s3l-d4l"
                      >
                        Description
                      </h4>
                      <p className="text-gray-300 text-sm" data-oid="8ozr1d9">
                        {selectedComponent.description}
                      </p>

                      <div className="mt-4" data-oid="tvdv.c4">
                        <h4
                          className="text-white font-medium mb-2"
                          data-oid=".e1:dag"
                        >
                          Material
                        </h4>
                        <div
                          className="bg-space-800 p-3 rounded-lg flex items-center"
                          style={{
                            borderLeft: `4px solid ${getMaterialColor(selectedComponent.material)}`,
                          }}
                          data-oid="ph.t23r"
                        >
                          <div
                            className="w-6 h-6 rounded mr-3"
                            style={{
                              backgroundColor: getMaterialColor(
                                selectedComponent.material,
                              ),
                            }}
                            data-oid="s7958.t"
                          ></div>
                          <div data-oid="aa65uo8">
                            <p
                              className="text-white capitalize"
                              data-oid=".kbqc.n"
                            >
                              {selectedComponent.material}
                            </p>
                            <p
                              className="text-xs text-gray-400"
                              data-oid="t8e8vip"
                            >
                              Standard NZ Construction Grade
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end" data-oid="39v7n0w">
                        <button
                          className="text-sm bg-purple-900 text-cyan px-3 py-1 rounded hover:bg-purple-800 btn-glow btn-glow-cyan"
                          onClick={() => {
                            toast({
                              title: "Component Specifications",
                              description:
                                "Technical specifications downloaded successfully.",
                            });
                          }}
                          data-oid="454hm_9"
                        >
                          <i
                            className="fas fa-file-pdf mr-1"
                            data-oid="iqcvyix"
                          ></i>{" "}
                          Download Specs
                        </button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              )}
            </div>
          ) : (
            <GlassCard
              className="p-6 h-full flex flex-col items-center justify-center text-center"
              data-oid="jcy-sq_"
            >
              <div className="text-6xl text-cyan mb-4" data-oid="..-rgz7">
                <i className="fas fa-cube" data-oid="1eb.kgj"></i>
              </div>
              <h2
                className="text-xl font-space text-white mb-2"
                data-oid="q63ohra"
              >
                3D Building Component Explorer
              </h2>
              <p className="text-gray-300 mb-6 max-w-lg" data-oid="9-e17g.">
                Select a project from the list to view its building components
                in detail. Explore dimensions, materials, and specifications for
                each component.
              </p>
              <p className="text-gray-400 text-sm" data-oid="nildiwk">
                STR8 BUILD's 3D visualization features allow you to better
                understand construction details, materials, and assembly
                techniques used in New Zealand construction projects.
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </main>
  );
};

export default ModelViewer;
