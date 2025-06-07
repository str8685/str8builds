import { FC, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import {
  CalculatorDirectory,
  MaterialCalculator,
} from "@/components/calculators";
import {
  ARMeasureTool,
  ARFloorPlan,
  ARFurniturePlanner,
  ARBubbleLevel,
  VolumeDetector,
} from "@/components/calculators/ar-tools";

const Calculators: FC = () => {
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(
    "directory",
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const calculatorCategories = [
    {
      id: "main",
      name: "Calculators",
      calculators: [
        {
          id: "directory",
          name: "All Calculators",
          icon: "fas fa-calculator",
          color: "cyan",
        },
      ],
    },
    {
      id: "ar-tools",
      name: "AR Tools",
      calculators: [
        {
          id: "ar-measure",
          name: "AR Measure Tool",
          icon: "fas fa-ruler",
          color: "pink",
        },
        {
          id: "ar-floorplan",
          name: "AR Floor Plan",
          icon: "fas fa-vector-square",
          color: "purple",
        },
        {
          id: "ar-furniture",
          name: "AR Furniture Planner",
          icon: "fas fa-couch",
          color: "teal",
        },
        {
          id: "ar-bubble",
          name: "Bubble Level",
          icon: "fas fa-level-up-alt",
          color: "blue",
        },
        {
          id: "ar-volume",
          name: "Volume Detector",
          icon: "fas fa-volume-up",
          color: "orange",
        },
      ],
    },
    {
      id: "construction",
      name: "Construction",
      calculators: [
        {
          id: "materials",
          name: "Material Estimator",
          icon: "fas fa-hammer",
          color: "electric",
        },
      ],
    },
  ];

  // Flattened calculator list for when a calculator is selected
  const allCalculators = calculatorCategories.flatMap((category) =>
    category.calculators.map((calc) => ({
      ...calc,
      category: category.name,
    })),
  );

  // Find selected calculator from flattened list with enhanced error handling
  const getSelectedCalculatorObject = () => {
    // Check if we have a valid selectedCalculator value
    if (!selectedCalculator) {
      return null;
    }

    const found = allCalculators.find((calc) => calc.id === selectedCalculator);

    // Debug only if calculator not found
    if (!found) {
      console.warn(`Calculator with ID "${selectedCalculator}" not found.`);
      console.debug(
        "Available calculator IDs:",
        allCalculators.map((c) => c.id).join(", "),
      );
    }

    return found;
  };

  // Render specific calculator component based on selection
  const renderCalculator = () => {
    switch (selectedCalculator) {
      case "materials":
        return <MaterialCalculator data-oid="6.ado83" />;
      case "ar-measure":
        return <ARMeasureTool data-oid="vfw5606" />;
      case "ar-floorplan":
        return <ARFloorPlan data-oid="wsd-vcu" />;
      case "ar-furniture":
        return <ARFurniturePlanner data-oid="_a9nyde" />;
      case "ar-bubble":
        return <ARBubbleLevel data-oid="lapxifu" />;
      case "ar-volume":
        return <VolumeDetector data-oid="rp_yu1j" />;
      case "directory":
      default:
        return <CalculatorDirectory data-oid="pmx72u-" />;
    }
  };

  return (
    <main
      className="container mx-auto px-6 py-8"
      data-component-name="Calculators"
      data-oid="z78vp15"
    >
      <div
        className="flex justify-between items-center mb-8 border-b border-cyan/20 pb-4"
        data-oid="22ps-2k"
      >
        <h2
          className="text-3xl font-space font-bold text-white relative"
          data-oid="eap7qnf"
        >
          <span className="inline-block relative" data-oid=".-q4vc6">
            <span className="relative z-10" data-oid="jzpg2t2">
              STR8 Calculators
            </span>
            <span
              className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan to-transparent opacity-70"
              data-oid="cxkmz4_"
            ></span>
          </span>
          <span
            className="ml-3 text-lg font-normal text-cyan/70"
            data-oid="_4vx_sh"
          >
            Pro Tools
          </span>
        </h2>
        <div
          className="bg-space-800/80 rounded-full px-4 py-2 text-cyan/80 text-sm backdrop-blur-sm border border-cyan/20"
          data-oid="4dbx6z6"
        >
          <i className="fas fa-lightbulb mr-2" data-oid="0w_9uhj"></i>
          Professional Calculators
        </div>
      </div>

      {/* Category selection tabs */}
      <div className="mb-6 overflow-x-auto" data-oid="1_lda3l">
        <div className="flex space-x-3 pb-2" data-oid="o.jyqll">
          <button
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
              selectedCategory === null
                ? "bg-gradient-to-r from-cyan/80 to-electric/80 text-space-900 shadow-lg shadow-cyan/20 border border-cyan/30 transform scale-105"
                : "bg-space-800/80 text-gray-300 hover:bg-space-700/80 border border-space-700/50 hover:border-cyan/30"
            } whitespace-nowrap`}
            onClick={() => setSelectedCategory(null)}
            data-oid="r9e8ljh"
          >
            <i className="fas fa-th-large mr-2" data-oid="ykk0gpu"></i>
            All Categories
          </button>

          {calculatorCategories.map((category) => (
            <button
              key={category.id}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-cyan/80 to-electric/80 text-space-900 shadow-lg shadow-cyan/20 border border-cyan/30 transform scale-105"
                  : "bg-space-800/80 text-gray-300 hover:bg-space-700/80 border border-space-700/50 hover:border-cyan/30"
              } whitespace-nowrap`}
              onClick={() => setSelectedCategory(category.id)}
              data-oid="2l0lbtu"
            >
              <i className="fas fa-calculator mr-2" data-oid="3orhf9c"></i>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected category description and main content */}
      <GlassCard
        className="p-6 mb-8 shadow-lg shadow-cyan/5 border-cyan/30 backdrop-blur-xl"
        data-oid="my3jbxw"
      >
        <div className="flex items-center mb-6" data-oid="75t0ush">
          <div
            className="h-10 w-1 bg-gradient-to-b from-cyan via-electric to-transparent rounded-full mr-3"
            data-oid="b6xu-59"
          ></div>
          <p className="text-gray-200 text-lg font-light" data-oid="f-dp4b:">
            {selectedCategory === null
              ? "Professional calculators engineered for maximum precision and efficiency."
              : `${calculatorCategories.find((c) => c.id === selectedCategory)?.name} - 
                Advanced tools designed for construction professionals.`}
          </p>
        </div>

        {selectedCalculator === null ? (
          // Show calculator options with enhanced grid
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
            data-oid="vmgkml0"
          >
            {allCalculators.map((calc) => (
              <div
                key={calc.id}
                className={`aspect-square flex flex-col items-center justify-center p-6 rounded-xl
                  bg-gradient-to-br from-space-800 to-space-900 hover:from-space-700 hover:to-space-800
                  border border-${calc.color}/20 shadow-lg hover:shadow-xl shadow-${calc.color}/10 hover:shadow-${calc.color}/20
                  transition-all duration-300 cursor-pointer relative group overflow-hidden`}
                onClick={() => {
                  console.log("Selecting calculator by id:", calc.id);
                  setSelectedCalculator(calc.id);
                }}
                data-oid="e:836xw"
              >
                {/* Ambient glow effects */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${calc.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  data-oid="yh20yma"
                ></div>
                <div
                  className={`absolute -inset-1 bg-${calc.color}/10 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`}
                  data-oid="hd.kz-7"
                ></div>
                <div
                  className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan/30 to-transparent"
                  data-oid=":c0guzl"
                ></div>

                {/* Animated icon container */}
                <div
                  className={`relative z-10 flex items-center justify-center h-20 w-20 rounded-full
                  bg-gradient-to-br from-space-800/90 to-space-900/90 border border-${calc.color}/30
                  group-hover:scale-110 group-hover:rotate-3 transform transition-all duration-300 ease-out`}
                  data-oid="h7sn8j4"
                >
                  <i
                    className={`${calc.icon} text-4xl text-${calc.color} group-hover:text-white`}
                    data-oid=":ag9eim"
                  ></i>
                </div>

                {/* Name with highlight effect */}
                <div
                  className="relative z-10 mt-4 text-base font-medium text-center text-white"
                  data-oid=".vduxu."
                >
                  <span className="relative" data-oid="aygp._x">
                    <span className="relative z-10" data-oid="pjmu:tg">
                      {calc.name}
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] bg-${calc.color}/50
                      transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out`}
                      data-oid="uy5hw8c"
                    ></span>
                  </span>
                </div>

                {/* Subtle indicator */}
                <div
                  className="absolute bottom-2 right-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  data-oid="e_9_u0."
                >
                  <i className="fas fa-arrow-right" data-oid="7g1uz6v"></i>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Show selected calculator with enhanced styling
          <div className="w-full" data-oid="tgax3u8">
            <div
              className="flex justify-between items-center mb-6 pb-3 border-b border-space-700"
              data-oid="nkzezv1"
            >
              <h3
                className="text-xl font-space font-semibold text-white flex items-center"
                data-oid="t1pst51"
              >
                <div
                  className={`flex items-center justify-center h-10 w-10 rounded-full mr-3
                  bg-gradient-to-br from-${getSelectedCalculatorObject()?.color || "cyan"}/20 to-transparent
                  border border-${getSelectedCalculatorObject()?.color || "cyan"}/30`}
                  data-oid="-77p.ek"
                >
                  <i
                    className={`${getSelectedCalculatorObject()?.icon || "fas fa-calculator"} text-${getSelectedCalculatorObject()?.color || "cyan"}`}
                    data-oid="b:q41ny"
                  ></i>
                </div>
                <span data-oid=".04umce">
                  {getSelectedCalculatorObject()?.name || selectedCalculator}
                </span>
                <span
                  className="ml-2 text-gray-400 font-normal text-base"
                  data-oid="xxfh_t6"
                >
                  Calculator
                </span>
              </h3>

              <button
                onClick={() => setSelectedCalculator(null)}
                className="px-4 py-2 rounded-lg bg-space-800/80 text-cyan border border-cyan/30
                  hover:bg-space-700/80 hover:text-white transition-all duration-300 flex items-center"
                data-oid="fky61d9"
              >
                <i className="fas fa-chevron-left mr-2" data-oid="pydem_a"></i>
                <span data-oid=".6ns1d9">Back to All</span>
              </button>
            </div>

            <div
              className="bg-space-800/30 rounded-xl p-6 border border-space-700/50 shadow-inner"
              data-oid="dnsh0s-"
            >
              {renderCalculator()}
            </div>
          </div>
        )}
      </GlassCard>
    </main>
  );
};

export default Calculators;
