import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import GlassCard from "../ui/GlassCard";
import { Search } from "lucide-react";

interface CalculatorItem {
  name: string;
  url: string;
  category: string;
}

// Category definitions
const CATEGORIES = {
  MEASUREMENT: "Measurement",
  AUTOMOTIVE: "Automotive",
  MATH: "Math & Conversion",
  LAYOUT: "Layout Tools",
  DESIGN: "Design Tools",
  WORKSHOP: "Workshop",
  MISC: "Miscellaneous",
};

const CalculatorDirectory: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // All calculators with categorization
  const calculators: CalculatorItem[] = [
    // Measurement Category
    {
      name: "Volume Calibration Templates - Metric",
      url: "https://www.blocklayer.com/volume-calibration",
      category: CATEGORIES.MEASUREMENT,
    },
    {
      name: "Volume Calibration Templates - Inch",
      url: "https://www.blocklayer.com/volume-calibrationeng",
      category: CATEGORIES.MEASUREMENT,
    },
    {
      name: "Scale From On-screen Images - Metric",
      url: "https://www.blocklayer.com/scale-calculator",
      category: CATEGORIES.MEASUREMENT,
    },
    {
      name: "Scale From Image - Metric",
      url: "https://www.blocklayer.com/scale-fixer",
      category: CATEGORIES.MEASUREMENT,
    },
    {
      name: "Scale From Image - Inch",
      url: "https://www.blocklayer.com/scale-fixereng",
      category: CATEGORIES.MEASUREMENT,
    },

    // Automotive Category
    {
      name: "Corner & Apex Angles In Race Track Design",
      url: "https://www.blocklayer.com/race-corner",
      category: CATEGORIES.AUTOMOTIVE,
    },
    {
      name: "Pulley Alignment Tool - Metric",
      url: "https://www.blocklayer.com/pulley-alignment",
      category: CATEGORIES.AUTOMOTIVE,
    },
    {
      name: "Pulley Alignment Tool - Inch",
      url: "https://www.blocklayer.com/pulley-alignmenteng",
      category: CATEGORIES.AUTOMOTIVE,
    },
    {
      name: "Fuel Consumption and Cost Calculator",
      url: "https://www.blocklayer.com/fuel-consumption",
      category: CATEGORIES.AUTOMOTIVE,
    },
    {
      name: "Fuel Consumption Calculator - Metric",
      url: "https://www.blocklayer.com/fuel-consumption-metric",
      category: CATEGORIES.AUTOMOTIVE,
    },

    // Math & Conversion Category
    {
      name: "Sine Bar Calculator - Metric",
      url: "https://www.blocklayer.com/sine-bar",
      category: CATEGORIES.MATH,
    },
    {
      name: "Sine Bar Calculator - Inch",
      url: "https://www.blocklayer.com/sine-bareng",
      category: CATEGORIES.MATH,
    },
    {
      name: "Angle Templates Metric",
      url: "https://www.blocklayer.com/angle-template",
      category: CATEGORIES.MATH,
    },
    {
      name: "Angle Template - Inch",
      url: "https://www.blocklayer.com/angle-templateeng",
      category: CATEGORIES.MATH,
    },
    {
      name: "Metric to US Standard Conversion Calculator",
      url: "https://www.blocklayer.com/MetricTo",
      category: CATEGORIES.MATH,
    },
    {
      name: "Metric to Imperial Conversion",
      url: "https://www.blocklayer.com/MetricToImperial",
      category: CATEGORIES.MATH,
    },
    {
      name: "Temperature Conversion F C R K",
      url: "https://www.blocklayer.com/temperature-conversion",
      category: CATEGORIES.MATH,
    },
    {
      name: "Blank Checks for Printing",
      url: "https://www.blocklayer.com/check-blank",
      category: CATEGORIES.MATH,
    },
    {
      name: "Time Calculator add subtract times",
      url: "https://www.blocklayer.com/time-calculator",
      category: CATEGORIES.MATH,
    },
    {
      name: "Area Calculator - Inch",
      url: "https://www.blocklayer.com/areaeng",
      category: CATEGORIES.MATH,
    },
    {
      name: "Area Calculator - Metric",
      url: "https://www.blocklayer.com/area",
      category: CATEGORIES.MATH,
    },
    {
      name: "Decimal Degrees Conversion",
      url: "https://www.blocklayer.com/decimal-degrees",
      category: CATEGORIES.MATH,
    },
    {
      name: "Volume Calculator - Metric",
      url: "https://www.blocklayer.com/volume",
      category: CATEGORIES.MATH,
    },
    {
      name: "Volume Calculator - Cubic Feet Cubic Inches",
      url: "https://www.blocklayer.com/volumeeng",
      category: CATEGORIES.MATH,
    },
    {
      name: "Pipe Volume Calculator - Imperial US Standard",
      url: "https://www.blocklayer.com/pipe-volumeeng",
      category: CATEGORIES.MATH,
    },
    {
      name: "Pipe Volume Calculator",
      url: "https://www.blocklayer.com/pipe-volume",
      category: CATEGORIES.MATH,
    },
    {
      name: "Elliptical-Oval Area Volume Calculator",
      url: "https://www.blocklayer.com/ellipse-calculator",
      category: CATEGORIES.MATH,
    },
    {
      name: "Grade to Degrees Conversion",
      url: "https://www.blocklayer.com/degrees-grade",
      category: CATEGORIES.MATH,
    },
    {
      name: "Taper to Angle Calculator - Taper per Foot",
      url: "https://www.blocklayer.com/taper-angle",
      category: CATEGORIES.MATH,
    },
    {
      name: "Taper to Angle Calculator",
      url: "https://www.blocklayer.com/taper-angle-metric",
      category: CATEGORIES.MATH,
    },
    {
      name: "Angle Finder from XY Coordinates - Metric",
      url: "https://www.blocklayer.com/angle-finder",
      category: CATEGORIES.MATH,
    },
    {
      name: "Angle Finder from XY Coordinates",
      url: "https://www.blocklayer.com/angle-findereng",
      category: CATEGORIES.MATH,
    },
    {
      name: "Angle Subtension Calculator - Metric",
      url: "https://www.blocklayer.com/subtension",
      category: CATEGORIES.MATH,
    },
    {
      name: "Angle Subtension Calculator - Inch",
      url: "https://www.blocklayer.com/subtensioneng",
      category: CATEGORIES.MATH,
    },
    {
      name: "Arc Length Area Sector Area",
      url: "https://www.blocklayer.com/arc-length",
      category: CATEGORIES.MATH,
    },
    {
      name: "Imperial to Metric Conversion",
      url: "https://www.blocklayer.com/ImperialToMetric",
      category: CATEGORIES.MATH,
    },
    {
      name: "US Standard to Metric Conversion",
      url: "https://www.blocklayer.com/ToMetric",
      category: CATEGORIES.MATH,
    },
    {
      name: "US Standard to Metric & Imperial",
      url: "https://www.blocklayer.com/USToImperialMetric",
      category: CATEGORIES.MATH,
    },
    {
      name: "Convert Decimal Hours to Hours Minutes Seconds",
      url: "https://www.blocklayer.com/hrs-min-sec",
      category: CATEGORIES.MATH,
    },
    {
      name: "Days of the Year - Day Number",
      url: "https://www.blocklayer.com/Gregorian-Day-Number",
      category: CATEGORIES.MATH,
    },
    {
      name: "ΔE Color Difference Calculator",
      url: "https://www.blocklayer.com/color-difference",
      category: CATEGORIES.MATH,
    },

    // Layout Tools Category
    {
      name: "Plumb Line Chalk Line Calculator - Metric",
      url: "https://www.blocklayer.com/plumb-line",
      category: CATEGORIES.LAYOUT,
    },
    {
      name: "Plumb Line Chalk Line Calculator - Inch",
      url: "https://www.blocklayer.com/plumb-lineeng",
      category: CATEGORIES.LAYOUT,
    },
    {
      name: "Square Layout Tool - Metric",
      url: "https://www.blocklayer.com/square-layout",
      category: CATEGORIES.LAYOUT,
    },
    {
      name: "Square Layout Tool 3 4 5 - Inch",
      url: "https://www.blocklayer.com/square-layouteng",
      category: CATEGORIES.LAYOUT,
    },
    {
      name: "Wall Stud & Plate Layout Calculator - Metric",
      url: "https://www.blocklayer.com/framing-stud-plate",
      category: CATEGORIES.LAYOUT,
    },
    {
      name: "Wall Stud & Plate Layout - Inch",
      url: "https://www.blocklayer.com/framing-stud-plateeng",
      category: CATEGORIES.LAYOUT,
    },
    {
      name: "Plant Spacing Calculator - Metric",
      url: "https://www.blocklayer.com/plant-spacing",
      category: CATEGORIES.LAYOUT,
    },
    {
      name: "Plant Spacing Calculator - Inch",
      url: "https://www.blocklayer.com/plant-spacingeng",
      category: CATEGORIES.LAYOUT,
    },
    {
      name: "Radial Centre Join Templates - Metric",
      url: "https://www.blocklayer.com/center-join-templates",
      category: CATEGORIES.LAYOUT,
    },
    {
      name: "Radial Center Join Templates - Inch",
      url: "https://www.blocklayer.com/center-join-templateseng",
      category: CATEGORIES.LAYOUT,
    },

    // Workshop Category
    {
      name: "Surface Speed SFM RPM Diameter - Metric",
      url: "https://www.blocklayer.com/surface-speed",
      category: CATEGORIES.WORKSHOP,
    },
    {
      name: "Surface Speed SFM RPM Diameter - Inch",
      url: "https://www.blocklayer.com/surface-speedeng",
      category: CATEGORIES.WORKSHOP,
    },
    {
      name: "Pulley and Belt Calculator - Metric",
      url: "https://www.blocklayer.com/pulley-belt",
      category: CATEGORIES.WORKSHOP,
    },
    {
      name: "Pulleys and Belts - Inch",
      url: "https://www.blocklayer.com/pulley-belteng",
      category: CATEGORIES.WORKSHOP,
    },
    {
      name: "Band Saw Calculator - Metric",
      url: "https://www.blocklayer.com/band-saw",
      category: CATEGORIES.WORKSHOP,
    },
    {
      name: "Band Saw Calculator SFPM - Inch",
      url: "https://www.blocklayer.com/band-saweng",
      category: CATEGORIES.WORKSHOP,
    },
    {
      name: "Timing Degree Tape - Metric",
      url: "https://www.blocklayer.com/timing-tape",
      category: CATEGORIES.WORKSHOP,
    },
    {
      name: "Timing Degree Tape - Inch",
      url: "https://www.blocklayer.com/timing-tapeeng",
      category: CATEGORIES.WORKSHOP,
    },
    {
      name: "Degree Wheel Templates Valve Timing - Metric",
      url: "https://www.blocklayer.com/degree-wheel",
      category: CATEGORIES.WORKSHOP,
    },
    {
      name: "Degree Wheel Templates Valve Timing - Inch",
      url: "https://www.blocklayer.com/degree-wheeleng",
      category: CATEGORIES.WORKSHOP,
    },
    {
      name: "Chain Sprocket Calculator RPM Chain Speeds",
      url: "https://www.blocklayer.com/chain-sprocket",
      category: CATEGORIES.WORKSHOP,
    },

    // Miscellaneous Category
    {
      name: "String Art Calculator",
      url: "https://www.blocklayer.com/string-art",
      category: CATEGORIES.MISC,
    },
    {
      name: "Text in Path Generator",
      url: "https://www.blocklayer.com/path-text",
      category: CATEGORIES.MISC,
    },
    {
      name: "Letter Spacing Calculator Kerning",
      url: "https://www.blocklayer.com/letter-spacing",
      category: CATEGORIES.MISC,
    },
    {
      name: "Text Spacing Set-Out",
      url: "https://www.blocklayer.com/text-spacing",
      category: CATEGORIES.MISC,
    },
    {
      name: "Vertical Text Generator",
      url: "https://www.blocklayer.com/vertical-text",
      category: CATEGORIES.MISC,
    },
    {
      name: "Text in a Box with Margins",
      url: "https://www.blocklayer.com/text-box",
      category: CATEGORIES.MISC,
    },
    {
      name: "Shadow Calculator - Metric",
      url: "https://www.blocklayer.com/shadow-length",
      category: CATEGORIES.MISC,
    },
    {
      name: "Shadow Calculator - Inch",
      url: "https://www.blocklayer.com/shadow-lengtheng",
      category: CATEGORIES.MISC,
    },
    {
      name: "Golden Ratio - Golden Section Calculator",
      url: "https://www.blocklayer.com/golden-ratio",
      category: CATEGORIES.MISC,
    },
    {
      name: "Bezier Curve Calculator - Metric",
      url: "https://www.blocklayer.com/bezier-curve",
      category: CATEGORIES.MISC,
    },
    {
      name: "Bezier Curve Calculator - Inch",
      url: "https://www.blocklayer.com/bezier-curveeng",
      category: CATEGORIES.MISC,
    },
    {
      name: "Fibonacci Calculator",
      url: "https://www.blocklayer.com/fibonacci",
      category: CATEGORIES.MISC,
    },
    {
      name: "Curve Planting Calculator - Metric",
      url: "https://www.blocklayer.com/curve-planting",
      category: CATEGORIES.MISC,
    },
    {
      name: "Curve Planting Calculator - Inch",
      url: "https://www.blocklayer.com/curve-plantingeng",
      category: CATEGORIES.MISC,
    },
    {
      name: "Sundial Calculator - Metric",
      url: "https://www.blocklayer.com/horizontal-sundial",
      category: CATEGORIES.MISC,
    },
    {
      name: "Sundial Calculator - Inch",
      url: "https://www.blocklayer.com/horizontal-sundialeng",
      category: CATEGORIES.MISC,
    },
  ];

  // Filter calculators based on search term and active category
  const filteredCalculators = calculators.filter((calc) => {
    // Filter by search term
    const matchesSearch = calc.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filter by category (if one is active)
    const matchesCategory = !activeCategory || calc.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories from calculator list
  const uniqueCategories = Array.from(
    new Set(calculators.map((calc) => calc.category)),
  ).sort();

  return (
    <div className="w-full" data-oid=":lczcgg">
      <GlassCard
        className="mb-6 p-6"
        variant="electric"
        glow
        data-oid="vtyzo.f"
      >
        <h1
          className="text-3xl font-bold mb-4 text-electric"
          data-oid="-.yh96p"
        >
          Calculator Directory
        </h1>
        <p className="text-gray-300 mb-6" data-oid="it4yaro">
          A comprehensive collection of professional calculators and tools for
          construction, woodworking, and design.
        </p>

        {/* Search bar */}
        <div className="relative mb-6" data-oid="b1ylgyy">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
            data-oid="fev665f"
          />

          <input
            type="text"
            placeholder="Search calculators..."
            className="w-full pl-10 py-3 bg-space-800/60 border border-electric/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric/30 transition-all text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-oid="f0wl62e"
          />
        </div>

        {/* Category filter buttons */}
        <div className="flex flex-wrap gap-2 mb-6" data-oid="9xvs98i">
          <button
            className={`px-4 py-2 rounded-full text-sm transition-all ${!activeCategory ? "bg-cyan text-black font-medium shadow-lg shadow-electric/20" : "bg-space-800/60 text-gray-300 border border-gray-700 hover:border-electric/30"}`}
            onClick={() => setActiveCategory(null)}
            data-oid="4c.huo5"
          >
            All
          </button>

          {uniqueCategories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeCategory === category
                  ? "bg-electric text-black font-medium shadow-lg shadow-electric/20"
                  : "bg-space-800/60 text-gray-300 border border-gray-700 hover:border-electric/30"
              }`}
              onClick={() => setActiveCategory(category)}
              data-oid=":2syq0d"
            >
              {category}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Display calculators */}
      {filteredCalculators.length > 0 ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible"
          data-oid="n9xk2g4"
        >
          {filteredCalculators.map((calc, index) => (
            <CalculatorCard
              key={index}
              name={calc.name}
              url={calc.url}
              category={calc.category}
              data-oid="u_df.7c"
            />
          ))}
        </div>
      ) : (
        <div
          className="col-span-2 text-center py-10 text-gray-400"
          data-oid="_meat-l"
        >
          No calculators found. Try adjusting your search.
        </div>
      )}
    </div>
  );
};

// Professional Calculator card component
const CalculatorCard: FC<{
  name: string;
  url: string;
  category: string;
}> = ({ name, url, category }) => {
  // Get a consistent color based on calculator category
  const getCategoryColor = () => {
    switch (category) {
      case CATEGORIES.MEASUREMENT:
        return "cyan";
      case CATEGORIES.AUTOMOTIVE:
        return "yellow-400";
      case CATEGORIES.MATH:
        return "electric";
      case CATEGORIES.LAYOUT:
        return "green-400";
      case CATEGORIES.DESIGN:
        return "purple-400";
      case CATEGORIES.WORKSHOP:
        return "orange-400";
      default:
        return "blue-400";
    }
  };

  const color = getCategoryColor();
  const domain = url.replace("https://www.", "").split("/")[0];

  return (
    <div
      className={`relative rounded-xl bg-space-900/80 border border-${color}/30
      transition-all duration-300 hover:scale-[1.03] group hover:shadow-lg hover:shadow-${color}/10 h-auto`}
      data-oid="0xt-c6w"
    >
      {/* Top accent line */}
      <div
        className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-${color} to-transparent`}
        data-oid=":mugfbi"
      ></div>

      {/* Category badge */}
      <div
        className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}/10 text-${color} border border-${color}/20`}
        data-oid="fspqglt"
      >
        {category}
      </div>

      <div className="p-5" data-oid="a5r0-_c">
        <div className="flex items-start mb-4" data-oid="1g6m75u">
          <div
            className={`flex items-center justify-center h-10 w-10 rounded-full mr-3
            bg-gradient-to-br from-${color}/20 to-transparent border border-${color}/30`}
            data-oid="_7bt:40"
          >
            <i className="fas fa-calculator" data-oid="s.lw5v_"></i>
          </div>
          <div data-oid="_ofdjn5">
            <h3
              className="text-lg font-medium text-white mb-1 line-clamp-2"
              data-oid="knrx2.0"
            >
              {name}
            </h3>
            <p className="text-sm text-gray-400" data-oid="qi1w5nh">
              {domain}
            </p>
          </div>
        </div>

        <div
          className="mt-6 flex justify-between items-center"
          data-oid="9ffc0-z"
        >
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-lg text-sm font-medium 
              bg-space-800 border border-${color}/30 text-${color}
              hover:bg-space-700 hover:text-white hover:border-${color}/50
              transition-all duration-300 flex items-center`}
            data-oid="4__v3vn"
          >
            <i className="fas fa-external-link-alt mr-2" data-oid="r:f_k5l"></i>
            <span data-oid="w6s04mm">Open Calculator</span>
          </a>

          <div
            className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            data-oid="0vb4.dm"
          >
            <i className="fas fa-arrow-right" data-oid="1.bgw2d"></i>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-${color}/30 via-transparent to-${color}/30`}
        data-oid="ifwyzci"
      ></div>
    </div>
  );
};

export default CalculatorDirectory;
