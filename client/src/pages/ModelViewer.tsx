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
      data-oid="57k_iqd"
    >
      <div
        className="flex justify-between items-center mb-6"
        data-oid="hfwqjxh"
      >
        <h1
          className="text-2xl font-space font-bold text-white"
          data-oid="y5af_7w"
        >
          <i className="fas fa-cube mr-2" data-oid="at2nl32"></i>
          3D Building Components
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-oid="ju6vcma">
        {/* Project List */}
        <div className="col-span-1" data-oid="1etf290">
          <GlassCard className="p-4 h-full" data-oid="tgykxkm">
            <h2
              className="text-lg font-space text-white mb-3"
              data-oid="6v.n-jh"
            >
              Building Projects
            </h2>

            {isLoading ? (
              <div
                className="h-40 flex justify-center items-center"
                data-oid="x2q133f"
              >
                <div
                  className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan"
                  data-oid="bgjf2kl"
                ></div>
              </div>
            ) : (
              <div className="space-y-3" data-oid="rgs2cik">
                {projects.length === 0 ? (
                  <div
                    className="bg-space-800/60 p-6 rounded-lg text-center"
                    data-oid="gcq89qa"
                  >
                    <p className="text-gray-400" data-oid="fc.99qu">
                      No projects available
                    </p>
                    <p
                      className="text-xs text-gray-500 mt-2"
                      data-oid="_tmlsof"
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
                      data-oid="_l7lwn1"
                    >
                      <h3 className="text-white font-medium" data-oid="c8::2of">
                        {project.name}
                      </h3>
                      <p
                        className="text-gray-400 text-xs mt-1"
                        data-oid="0c6tm6c"
                      >
                        {project.description}
                      </p>
                      <div
                        className="flex justify-between items-center mt-2"
                        data-oid="lm8ct72"
                      >
                        <span className="text-xs text-cyan" data-oid="95xz1py">
                          {project.components.length} components
                        </span>
                        <span
                          className="text-xs bg-space-700 rounded-full px-2 py-0.5"
                          data-oid="_0uu8wy"
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
        <div className="col-span-1 lg:col-span-2" data-oid="4v3pmci">
          {selectedProject ? (
            <div className="grid grid-cols-1 gap-6" data-oid="_kn6-1x">
              {/* Project Details */}
              <GlassCard className="p-4" data-oid="sq10-b7">
                <div
                  className="flex justify-between items-start"
                  data-oid="0lp0vwo"
                >
                  <div data-oid="8j-wtso">
                    <h2
                      className="text-lg font-space text-white"
                      data-oid="wugr7ro"
                    >
                      {selectedProject.name}
                    </h2>
                    <p
                      className="text-gray-400 text-sm mt-1"
                      data-oid="hi5f-np"
                    >
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="flex gap-2" data-oid=".xiybgi">
                    <button
                      className="text-sm bg-space-800 text-cyan px-3 py-1 rounded hover:bg-space-700"
                      onClick={() => {
                        toast({
                          title: "3D Model Exported",
                          description:
                            "Model data has been exported to your project folder.",
                        });
                      }}
                      data-oid="nx52e9m"
                    >
                      <i
                        className="fas fa-file-export mr-1"
                        data-oid="fuv_k.l"
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
                      data-oid="ry3b-jl"
                    >
                      <i className="fas fa-cube mr-1" data-oid="30a73gc"></i> 3D
                      View
                    </button>
                  </div>
                </div>
              </GlassCard>

              {/* Component Visualization */}
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                data-oid="ez.r866"
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
                    data-oid="8fviw6s"
                  >
                    <div
                      className="aspect-video mb-2 rounded bg-space-900 flex items-center justify-center"
                      data-oid="wlt9wdg"
                    >
                      <div
                        className="w-16 h-16 rounded"
                        style={{
                          backgroundColor: getMaterialColor(component.material),
                        }}
                        data-oid="qtd4nw."
                      >
                        {component.type === "foundation" && (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            data-oid="-phdexl"
                          >
                            <div
                              className="w-3/4 h-1/4 bg-space-700/50"
                              data-oid="7ryj-p4"
                            ></div>
                          </div>
                        )}
                        {component.type === "frame" && (
                          <div className="w-full h-full p-2" data-oid="zuqh.pz">
                            <div
                              className="w-full h-full border-2 border-space-700/50"
                              data-oid="rt1gyal"
                            ></div>
                          </div>
                        )}
                        {component.type === "roof" && (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            data-oid="jeuk7wh"
                          >
                            <div
                              className="w-3/4 h-1/2"
                              style={{
                                backgroundColor: getMaterialColor(
                                  component.material,
                                ),
                                clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
                              }}
                              data-oid="s_x2s:h"
                            ></div>
                          </div>
                        )}
                        {component.type === "walls" && (
                          <div className="w-full h-full p-3" data-oid="idb4e8l">
                            <div
                              className="w-full h-full bg-space-700/50"
                              data-oid="m-t:bu6"
                            ></div>
                          </div>
                        )}
                        {component.type === "windows" && (
                          <div
                            className="w-full h-full p-4 flex items-center justify-center"
                            data-oid="..hp223"
                          >
                            <div
                              className="w-full h-full bg-cyan/30 border border-white/30"
                              data-oid="_6pg_v:"
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <h3
                      className="text-white text-sm font-medium"
                      data-oid="p:ja7a."
                    >
                      {component.name}
                    </h3>
                    <p
                      className="text-gray-400 text-xs mt-1 line-clamp-2"
                      data-oid="2qwgit2"
                    >
                      {component.description}
                    </p>
                    <div
                      className="mt-2 flex justify-between"
                      data-oid="9zudcc2"
                    >
                      <span
                        className="text-xs rounded-full px-2 py-0.5"
                        style={{
                          backgroundColor: `${getMaterialColor(component.material)}30`,
                          color: getMaterialColor(component.material),
                        }}
                        data-oid="_h26v_7"
                      >
                        {component.material}
                      </span>
                      <span
                        className="text-xs text-gray-400"
                        data-oid="u80-2z."
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
                <GlassCard className="p-4" data-oid="gkbrldr">
                  <h3
                    className="text-lg font-space text-white mb-3"
                    data-oid="0qt3j2u"
                  >
                    {selectedComponent.name} Details
                  </h3>

                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    data-oid="zmqrkb1"
                  >
                    <div data-oid="birpin5">
                      <div
                        className="aspect-video rounded-lg overflow-hidden bg-space-800 flex items-center justify-center mb-3"
                        data-oid="7rd6yyy"
                      >
                        <ModelFallback
                          message="3D preview will be available in the next update"
                          className="h-full w-full"
                          data-oid=".sp.0bc"
                        />
                      </div>

                      <div
                        className="grid grid-cols-3 gap-2 text-sm"
                        data-oid="j91ahq4"
                      >
                        <div
                          className="bg-space-800 p-2 rounded"
                          data-oid="j__tg_-"
                        >
                          <span
                            className="block text-gray-400 text-xs"
                            data-oid="iwuiasl"
                          >
                            Width
                          </span>
                          <span className="text-white" data-oid=":8_sqiy">
                            {selectedComponent.dimensions.width}m
                          </span>
                        </div>
                        <div
                          className="bg-space-800 p-2 rounded"
                          data-oid="3bjw0cb"
                        >
                          <span
                            className="block text-gray-400 text-xs"
                            data-oid="te9r5aa"
                          >
                            Height
                          </span>
                          <span className="text-white" data-oid="d.86bai">
                            {selectedComponent.dimensions.height}m
                          </span>
                        </div>
                        <div
                          className="bg-space-800 p-2 rounded"
                          data-oid="g5ns1oe"
                        >
                          <span
                            className="block text-gray-400 text-xs"
                            data-oid="8aerur4"
                          >
                            Depth
                          </span>
                          <span className="text-white" data-oid="0g:zlp3">
                            {selectedComponent.dimensions.depth}m
                          </span>
                        </div>
                      </div>
                    </div>

                    <div data-oid="e1a6v71">
                      <h4
                        className="text-white font-medium mb-2"
                        data-oid="-aiu9x_"
                      >
                        Description
                      </h4>
                      <p className="text-gray-300 text-sm" data-oid=":0.u7jn">
                        {selectedComponent.description}
                      </p>

                      <div className="mt-4" data-oid="93kxv9_">
                        <h4
                          className="text-white font-medium mb-2"
                          data-oid="9:2z5:k"
                        >
                          Material
                        </h4>
                        <div
                          className="bg-space-800 p-3 rounded-lg flex items-center"
                          style={{
                            borderLeft: `4px solid ${getMaterialColor(selectedComponent.material)}`,
                          }}
                          data-oid="8hh2b3n"
                        >
                          <div
                            className="w-6 h-6 rounded mr-3"
                            style={{
                              backgroundColor: getMaterialColor(
                                selectedComponent.material,
                              ),
                            }}
                            data-oid="t5:7r42"
                          ></div>
                          <div data-oid="-9ey4db">
                            <p
                              className="text-white capitalize"
                              data-oid="gsk:6g3"
                            >
                              {selectedComponent.material}
                            </p>
                            <p
                              className="text-xs text-gray-400"
                              data-oid="0q51slh"
                            >
                              Standard NZ Construction Grade
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end" data-oid="-fsxrbw">
                        <button
                          className="text-sm bg-purple-900 text-cyan px-3 py-1 rounded hover:bg-purple-800 btn-glow btn-glow-cyan"
                          onClick={() => {
                            toast({
                              title: "Component Specifications",
                              description:
                                "Technical specifications downloaded successfully.",
                            });
                          }}
                          data-oid="_pjhy25"
                        >
                          <i
                            className="fas fa-file-pdf mr-1"
                            data-oid="26r4kg0"
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
              data-oid="y:sz2b8"
            >
              <div className="text-6xl text-cyan mb-4" data-oid="f9b.zzk">
                <i className="fas fa-cube" data-oid="i__7.hz"></i>
              </div>
              <h2
                className="text-xl font-space text-white mb-2"
                data-oid="uhxi3ka"
              >
                3D Building Component Explorer
              </h2>
              <p className="text-gray-300 mb-6 max-w-lg" data-oid="ym0iiz7">
                Select a project from the list to view its building components
                in detail. Explore dimensions, materials, and specifications for
                each component.
              </p>
              <p className="text-gray-400 text-sm" data-oid="rfu-de3">
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
