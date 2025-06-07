import { FC, useState } from "react";
import { useLocation } from "wouter";
import GlassCard from "@/components/ui/GlassCard";

// Import all tool modals
import ProjectCamModal from "@/components/tools/ProjectCamModal";
import MeasureToolModal from "@/components/tools/MeasureToolModal";
import LevelToolModal from "@/components/tools/LevelToolModal";
import AngleToolModal from "@/components/tools/AngleToolModal";
import CalculatorToolModal from "@/components/tools/CalculatorToolModal";
import SoundMeterModal from "@/components/tools/SoundMeterModal";

const Tools: FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [highContrast, setHighContrast] = useState(false);
  const [, setLocation] = useLocation();

  // Modal states for all tools
  const [showMeasureToolModal, setShowMeasureToolModal] = useState(false);
  const [showLevelToolModal, setShowLevelToolModal] = useState(false);
  const [showAngleToolModal, setShowAngleToolModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showSoundMeterModal, setShowSoundMeterModal] = useState(false);

  const toolCategories = [
    {
      title: "Measurement Tools",
      tools: [
        {
          id: "measure",
          name: "Measure",
          icon: "fas fa-ruler",
          color: "electric",
          border: "neon-border-blue",
        },
        {
          id: "level",
          name: "Level",
          icon: "fas fa-level-up-alt fa-rotate-90",
          color: "cyan",
          border: "neon-border-cyan",
        },
        {
          id: "angle",
          name: "Angle",
          icon: "fas fa-compass",
          color: "teal",
          border: "neon-border-teal",
        },
        {
          id: "laser",
          name: "Laser Distance",
          icon: "fas fa-bullseye",
          color: "cyan",
        },
      ],
    },
    {
      title: "Calculation Tools",
      tools: [
        {
          id: "calculator",
          name: "Calculator",
          icon: "fas fa-calculator",
          color: "electric",
        },
        {
          id: "area",
          name: "Area Calc",
          icon: "fas fa-vector-square",
          color: "teal",
        },
        {
          id: "volume",
          name: "Volume Calc",
          icon: "fas fa-cube",
          color: "cyan",
        },
        {
          id: "converter",
          name: "Unit Converter",
          icon: "fas fa-exchange-alt",
          color: "electric",
        },
      ],
    },
    {
      title: "Project Tools",
      tools: [
        {
          id: "camera",
          name: "Project Cam",
          icon: "fas fa-camera",
          color: "cyan",
        },
        {
          id: "notes",
          name: "Note Taking",
          icon: "fas fa-clipboard",
          color: "electric",
        },
        {
          id: "sound",
          name: "Sound Meter",
          icon: "fas fa-volume-up",
          color: "teal",
        },
        {
          id: "planner",
          name: "Site Planner",
          icon: "fas fa-drafting-compass",
          color: "teal",
        },
      ],
    },
    {
      title: "3D Visualization",
      tools: [
        {
          id: "models",
          name: "3D Models",
          icon: "fas fa-cube",
          color: "electric",
          border: "neon-border-blue",
        },
        {
          id: "framing",
          name: "Framing Viewer",
          icon: "fas fa-cubes",
          color: "cyan",
          border: "neon-border-cyan",
        },
        {
          id: "plumbing",
          name: "Plumbing",
          icon: "fas fa-faucet",
          color: "teal",
          border: "neon-border-teal",
        },
        {
          id: "electrical",
          name: "Electrical",
          icon: "fas fa-bolt",
          color: "electric",
          border: "neon-border-blue",
        },
      ],
    },
    {
      title: "Advanced Tools",
      tools: [
        {
          id: "weather",
          name: "Weather Impact",
          icon: "fas fa-cloud-sun",
          color: "cyan",
        },
        {
          id: "schedule",
          name: "Schedule",
          icon: "fas fa-calendar-alt",
          color: "teal",
        },
        {
          id: "materials",
          name: "Materials",
          icon: "fas fa-hammer",
          color: "electric",
        },
        {
          id: "ar",
          name: "AR Preview",
          icon: "fas fa-vr-cardboard",
          color: "cyan",
        },
      ],
    },
  ];

  // All tools flattened for tool selection logic
  const tools = toolCategories.flatMap((category) => category.tools);

  const handleToolSelect = (toolId: string) => {
    // For 3D models, redirect to the dedicated page
    if (toolId === "models") {
      setLocation("/models");
      return;
    }

    // For other tools, open the appropriate modal
    switch (toolId) {
      case "measure":
        setShowMeasureToolModal(true);
        break;
      case "level":
        setShowLevelToolModal(true);
        break;
      case "angle":
        setShowAngleToolModal(true);
        break;
      case "calculator":
        setShowCalculatorModal(true);
        break;
      case "camera":
        setShowCameraModal(true);
        break;
      case "sound":
        setShowSoundMeterModal(true);
        break;
      default:
        // For other tools, set the selected tool as before
        setSelectedTool(toolId === selectedTool ? null : toolId);
    }
  };

  const renderSelectedTool = () => {
    // For tools without modals yet
    switch (selectedTool) {
      default:
        return (
          <div
            className="flex items-center justify-center p-12 bg-space-900/50 rounded-lg border border-space-700/50"
            data-oid="5.v:xq0"
          >
            <div className="text-center" data-oid="uzdn2wi">
              <div className="text-3xl text-cyan-400 mb-4" data-oid=".d455zm">
                <i className="fas fa-tools" data-oid="fv9ddc0"></i>
              </div>
              <h3 className="text-xl text-white mb-2" data-oid="hwoj15.">
                Tool Coming Soon
              </h3>
              <p className="text-gray-400" data-oid="kvjze-3">
                This tool is currently under development.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <main
      className={`container mx-auto px-4 py-4 ${highContrast ? "bg-black text-white" : ""}`}
      data-oid="q.8bicu"
    >
      {/* Tool Modals */}
      <MeasureToolModal
        open={showMeasureToolModal}
        onOpenChange={setShowMeasureToolModal}
        data-oid="ot3n_j_"
      />

      <LevelToolModal
        open={showLevelToolModal}
        onOpenChange={setShowLevelToolModal}
        data-oid="mqsx26k"
      />

      <AngleToolModal
        open={showAngleToolModal}
        onOpenChange={setShowAngleToolModal}
        data-oid="g.yrpo-"
      />

      <CalculatorToolModal
        open={showCalculatorModal}
        onOpenChange={setShowCalculatorModal}
        data-oid="upjpl_o"
      />

      <ProjectCamModal
        open={showCameraModal}
        onOpenChange={setShowCameraModal}
        data-oid="6_7mv.l"
      />

      <SoundMeterModal
        open={showSoundMeterModal}
        onOpenChange={setShowSoundMeterModal}
        data-oid="4x9:hcs"
      />

      <div
        className="flex justify-between items-center mb-6"
        data-oid="m1n_6fs"
      >
        <div data-oid=":kyfk37">
          <h2
            className="text-2xl font-space font-bold text-white"
            data-oid="3pd8:kh"
          >
            STR8 Tools & Models
          </h2>
          <p className="text-gray-400 text-sm" data-oid="xznsjjk">
            Digital tools, calculators, and 3D models for your projects
          </p>
        </div>
        {selectedTool && (
          <button
            onClick={() => setSelectedTool(null)}
            className="text-sm bg-space-800 text-cyan px-4 py-1.5 rounded-full hover:bg-space-700"
            data-oid="15fw6lm"
          >
            <i className="fas fa-arrow-left mr-1" data-oid="6rb-jxw"></i> Back
            to Tools
          </button>
        )}
      </div>

      {selectedTool ? (
        renderSelectedTool()
      ) : (
        <>
          <GlassCard className="p-4 mb-6" data-oid=":rz4x6e">
            <p className="text-gray-300 mb-4" data-oid="lnddkc5">
              Use your device's sensors to assist with construction tasks. These
              tools work offline and are designed to be used on the job site.
            </p>

            {toolCategories.map((category, index) => (
              <div
                key={category.title}
                className={`${index > 0 ? "mt-8" : ""}`}
                data-oid="ugyqyxq"
              >
                <h3
                  className="text-lg font-space font-bold text-white mb-3 flex items-center"
                  data-oid="v2vzfhi"
                >
                  <div
                    className={`w-1.5 h-5 bg-${category.tools[0].color} rounded-full mr-2`}
                    data-oid="cr3abw."
                  ></div>
                  {category.title}
                </h3>
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                  data-oid="l362cf:"
                >
                  {category.tools.map((tool) => (
                    <div
                      key={tool.id}
                      className={`aspect-square flex flex-col items-center justify-center p-4 rounded-xl bg-space-800/50 hover:bg-space-700 transition cursor-pointer relative group ${tool.border || ""}`}
                      onClick={() => handleToolSelect(tool.id)}
                      data-oid=".hxmh3l"
                    >
                      <div
                        className={`absolute inset-0 bg-${tool.color}/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        data-oid="6xogpl:"
                      ></div>
                      <div
                        className={`absolute -inset-0.5 bg-${tool.color}/20 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300`}
                        data-oid="vg:9xeo"
                      ></div>
                      <div
                        className={`text-3xl text-${tool.color} mb-3 group-hover:scale-110 transform transition duration-300`}
                        data-oid="r61m6ff"
                      >
                        <i className={tool.icon} data-oid="0xfhb-d"></i>
                      </div>
                      <div
                        className="text-sm font-medium text-center text-white"
                        data-oid=":pcvkxm"
                      >
                        {tool.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </GlassCard>

          <GlassCard className="p-4 mb-6" data-oid="909:zb7">
            <div
              className="flex justify-between items-start mb-4"
              data-oid="r4g9aco"
            >
              <h3 className="text-lg font-space text-white" data-oid="yq10n0x">
                High Contrast Mode
              </h3>
              <div
                className="relative inline-flex items-center cursor-pointer"
                data-oid="w57izw3"
              >
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={() => setHighContrast((prev) => !prev)}
                  className="sr-only peer"
                  data-oid="mf0yy.4"
                />

                <div
                  className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-electric"
                  data-oid="xw8tqds"
                ></div>
                <span
                  className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"
                  data-oid="avwpb3q"
                ></span>
              </div>
            </div>
            <p className="text-gray-300 text-sm" data-oid="60:b9f0">
              Enable high contrast mode for better visibility in bright outdoor
              conditions.
            </p>
          </GlassCard>
        </>
      )}
    </main>
  );
};

export default Tools;
