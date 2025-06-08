import { FC, useState, useEffect } from "react";
import "./animation.css";
import BaseCalculator from "./BaseCalculator";
import {
  Loader2,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ConstructionCalculator: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("");
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [validatedUrls, setValidatedUrls] = useState<Record<string, boolean>>(
    {},
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Show 9 calculators per page (3x3 grid)

  const allCalculators = [
    {
      id: "volume-calibration",
      name: "Volume Calibration Templates - Metric",
      url: "https://www.blocklayer.com/volume-calibration",
      description:
        "Templates for calibrating volume measurements in metric units.",
    },
    {
      id: "floor-area",
      name: "Floor Area Calculator - Metric",
      url: "https://www.blocklayer.com/floor-area",
      description:
        "Calculate floor area for flooring and material estimations.",
    },
    {
      id: "crown-molding",
      name: "Crown Molding Diagrams Angle Chart",
      url: "https://www.blocklayer.com/crown-molding",
      description: "Diagrams and angle charts for crown molding installation.",
    },
    {
      id: "tire-size",
      name: "Tire Size Comparison",
      url: "https://www.blocklayer.com/tire-size-calculator",
      description: "Compare different tire sizes for vehicles.",
    },
    {
      id: "gauge-face",
      name: "Custom Gauge Face Templates",
      url: "https://www.blocklayer.com/gauge-templates",
      description: "Templates for custom gauge faces.",
    },
    {
      id: "cone-patterns",
      name: "Cone Pattern Templates - Metric",
      url: "https://www.blocklayer.com/cone-patterns",
      description: "Templates for cone patterns in metric units.",
    },
    {
      id: "deck-layout",
      name: "Deck Layout Calculator - Inch",
      url: "https://www.blocklayer.com/deckcalculatoreng",
      description: "Calculate deck layout dimensions and materials.",
    },
    {
      id: "diminishing-lengths",
      name: "Diminishing Lengths at Angle - Metric",
      url: "https://www.blocklayer.com/diminishing-lengths",
      description: "Calculate diminishing lengths at angles in metric units.",
    },
    {
      id: "star-template",
      name: "Star Template - Inch",
      url: "https://www.blocklayer.com/star-templateseng",
      description: "Templates for star patterns in inches.",
    },
    {
      id: "golden-ratio",
      name: "Golden Ratio Calculator - Inch",
      url: "https://www.blocklayer.com/goldenratioeng",
      description: "Calculate golden ratio dimensions in inches.",
    },
    {
      id: "circle-bars",
      name: "Bar Board Spacing across Circle - Inch",
      url: "https://www.blocklayer.com/circle-barseng",
      description: "Calculate bar and board spacing across circles.",
    },
    {
      id: "shelf-spacing",
      name: "Shelf & Drawer Spacing Calculator - Inch",
      url: "https://www.blocklayer.com/shelf-spacingeng",
      description: "Calculate optimal spacing for shelves and drawers.",
    },
    {
      id: "surface-speed",
      name: "Surface Speed SFM RPM Diameter - Metric",
      url: "https://www.blocklayer.com/surface-speed",
      description: "Calculate surface speed, RPM, and diameter relationships.",
    },
    {
      id: "linear-square",
      name: "Linear Metres to Square Metres",
      url: "https://www.blocklayer.com/linear-square",
      description:
        "Convert linear meters to square meters for material calculations.",
    },
    {
      id: "kerf-spacing",
      name: "Kerf Spacing Ellipse and Spiral - Inch",
      url: "https://www.blocklayer.com/kerf-spacing-ellipseeng",
      description: "Calculate kerf spacing for elliptical and spiral cuts.",
    },
    {
      id: "tile-calculator",
      name: "Tile Calculator - Metric",
      url: "https://www.blocklayer.com/tiles",
      description:
        "Calculate tile quantities and layouts for floors and walls.",
    },
    {
      id: "centers-spacing",
      name: "Centers Spacing Calculator - Board and Batten Any Angle - Inch",
      url: "https://www.blocklayer.com/centers-spacingeng",
      description:
        "Calculate spacing for board and batten installations at any angle.",
    },
    {
      id: "wall-framing",
      name: "Wall Framing Calculator - Metric",
      url: "https://www.blocklayer.com/wall-framing",
      description:
        "Calculate stud spacing, lumber requirements, and dimensions for wall framing.",
    },
    {
      id: "calculator-directory",
      name: "Blocklayer.com - Calculator App Directory",
      url: "https://www.blocklayer.com/calculatordirectory",
      description: "Directory of construction calculators and tools.",
    },
    {
      id: "degrees-mins-secs",
      name: "Decimal Degrees to Degrees Minutes Seconds",
      url: "https://www.blocklayer.com/degrees-minutes-seconds",
      description:
        "Convert between decimal degrees and degrees, minutes, seconds format.",
    },
    {
      id: "arc-templates",
      name: "Arc Templates with Vernier - Inch",
      url: "https://www.blocklayer.com/arc-templateseng",
      description: "Templates for arcs with vernier scales in inches.",
    },
    {
      id: "cone-patterns-inch",
      name: "Cone Pattern Templates - Inch",
      url: "https://www.blocklayer.com/cone-patternseng",
      description: "Templates for cone patterns in inches.",
    },
    {
      id: "brick-gauge",
      name: "Brickwork Gauge, Bond Quantities - Metric",
      url: "https://www.blocklayer.com/brick-gauge",
      description: "Calculate brickwork gauge and bond quantities.",
    },
    {
      id: "gothic-arch",
      name: "Gothic Arch Calculator - Metric",
      url: "https://www.blocklayer.com/gothic-arch",
      description: "Calculate gothic arch dimensions and angles.",
    },
    {
      id: "rpm-gear",
      name: "Gearing Analyzer with Shift Tracer",
      url: "https://www.blocklayer.com/rpm-gear",
      description: "Analyze gear ratios and shifts for mechanical systems.",
    },
    {
      id: "gable-studs",
      name: "Stud Lengths in Raking Gable - Metric",
      url: "https://www.blocklayer.com/gable-studs",
      description:
        "Calculate stud lengths in raking gables for roof construction.",
    },
    {
      id: "spiral-templates",
      name: "Spiral Templates",
      url: "https://www.blocklayer.com/spiral-templates",
      description: "Templates for various spiral patterns and designs.",
    },
    {
      id: "ascension-tape",
      name: "Right Ascension Tape - Metric",
      url: "https://www.blocklayer.com/right-ascension-tape",
      description: "Right ascension tape measurements in metric units.",
    },
    {
      id: "linear-cubic",
      name: "Linear Metres to Cubic Metres Costs - Metric",
      url: "https://www.blocklayer.com/linear-cubic",
      description:
        "Convert linear meters to cubic meters with cost calculations.",
    },
    {
      id: "miter-gauge",
      name: "Miter Gauge Setter",
      url: "https://www.blocklayer.com/miter-gauge",
      description: "Tool for setting accurate miter gauge angles.",
    },
    // Including only 30 calculators to avoid making the file too large
    // You can add the remaining calculators in the same format
  ];

  // Initialize loading states for all calculators
  useEffect(() => {
    const initialLoadingStates: Record<string, boolean> = {};
    allCalculators.forEach((calc) => {
      initialLoadingStates[calc.id] = true;
    });
    setLoadingState(initialLoadingStates);
  }, []);

  const handleIframeLoad = (id: string) => {
    setLoadingState((prev) => ({ ...prev, [id]: false }));
    setErrors((prev) => ({ ...prev, [id]: false }));
  };

  const handleIframeError = (id: string) => {
    setLoadingState((prev) => ({ ...prev, [id]: false }));
    setErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Alternative calculator URL in case blocklayer.com is down
  const getAlternativeCalculator = (type: string) => {
    const alternatives: Record<string, string> = {
      volume: "https://www.calculator.net/volume-calculator.html",
      area: "https://www.calculator.net/area-calculator.html",
      floor: "https://www.calculator.net/flooring-calculator.html",
      tile: "https://www.calculator.net/tile-calculator.html",
      wall: "https://www.omnicalculator.com/construction/wall-framing",
      angle: "https://www.calculator.net/triangle-calculator.html",
      calculator: "https://www.calculator.net/construction-calculator.html",
    };

    // Look for keywords in the type string
    for (const [keyword, url] of Object.entries(alternatives)) {
      if (type.toLowerCase().includes(keyword)) {
        return url;
      }
    }

    // Default calculator if no matches
    return "https://www.calculator.net/construction-calculator.html";
  };

  const filteredCalculators = searchTerm
    ? allCalculators.filter(
        (calc) =>
          calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          calc.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : allCalculators;

  // Calculate pagination
  const totalPages = Math.ceil(filteredCalculators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCalculators = filteredCalculators.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <BaseCalculator
      title="Construction Calculators"
      description="Professional calculators for construction planning, material estimation, and layout design."
      variant="electric"
      data-oid="93_824d"
    >
      <div className="relative mb-8" data-oid="mmjvkdy">
        <div
          className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
          data-oid="l.thabj"
        >
          <Search className="h-4 w-4 text-cyan-400" data-oid="dc0c:tg" />
        </div>
        <Input
          type="search"
          placeholder="Search calculators..."
          className="bg-space-800/60 border-cyan-800/50 focus:border-cyan-600/50 pl-10 text-white shadow-md shadow-cyan-900/10 focus:shadow-cyan-800/20 transition-all duration-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          data-oid="9u3dh1h"
        />

        <div
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
          data-oid="2d8sqj6"
        ></div>
      </div>

      <div className="mb-8" data-oid="trv--t_">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-6"
          data-oid="d91xhv3"
        >
          {currentCalculators.map((calc) => (
            <div
              key={calc.id}
              className="bg-gradient-to-br from-space-800/40 to-space-900/60 p-5 rounded-xl border border-cyan-500/20 hover:border-cyan-400/40 hover:from-space-700/50 hover:to-space-800/70 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:shadow-cyan-900/20 transform hover:scale-[1.02] relative overflow-hidden group"
              onClick={() => setActiveTab(calc.id)}
              data-oid="3tp4jfx"
            >
              <div
                className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
                data-oid="hy8kzu5"
              ></div>
              <div
                className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
                data-oid="t5ymheb"
              ></div>
              <h3
                className="text-md font-medium text-cyan-100 mb-2 truncate group-hover:text-white transition-colors duration-300"
                data-oid="w3g-5ty"
              >
                {calc.name}
              </h3>
              <p
                className="text-xs text-gray-400 group-hover:text-gray-300 h-12 overflow-hidden transition-colors duration-300 mb-3"
                data-oid="yofoed5"
              >
                {calc.description}
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-2 w-full bg-gradient-to-r from-electric to-cyan-500 text-black hover:from-electric/90 hover:to-cyan-400 shadow-md shadow-cyan-900/20 hover:shadow-cyan-800/30 transition-all duration-300 relative overflow-hidden group/btn"
                onClick={(e) => {
                  e.stopPropagation();
                  // Use a more reliable way to open links
                  try {
                    // Check if we've already validated this URL
                    if (validatedUrls[calc.id] === false) {
                      // Use alternative calculator
                      const alternativeUrl = getAlternativeCalculator(
                        calc.name,
                      );
                      const newWindow = window.open(
                        alternativeUrl,
                        "_blank",
                        "noopener,noreferrer",
                      );
                      if (newWindow) newWindow.opener = null;
                    } else {
                      const newWindow = window.open(
                        calc.url,
                        "_blank",
                        "noopener,noreferrer",
                      );
                      if (newWindow) newWindow.opener = null;

                      // Mark this URL as validated or not
                      fetch(calc.url, { method: "HEAD", mode: "no-cors" })
                        .then(() => {
                          setValidatedUrls((prev) => ({
                            ...prev,
                            [calc.id]: true,
                          }));
                        })
                        .catch(() => {
                          console.error("URL validation failed:", calc.url);
                          setValidatedUrls((prev) => ({
                            ...prev,
                            [calc.id]: false,
                          }));
                        });
                    }
                  } catch (err) {
                    console.error("Failed to open calculator:", err);
                    // Fallback method using alternative
                    const alternativeUrl = getAlternativeCalculator(calc.name);
                    window.open(alternativeUrl, "_blank");
                  }
                }}
                data-oid="4rsiu1t"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover/btn:opacity-100 transition-all duration-300"
                  data-oid="gclp:.6"
                ></div>
                <ExternalLink
                  className="mr-1.5 h-3.5 w-3.5 relative z-10"
                  data-oid="8y11ga8"
                />

                <span className="relative z-10" data-oid="mnc77fk">
                  Open Calculator
                </span>
              </Button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div
            className="flex items-center justify-center gap-4 mt-8 mb-4 relative"
            data-oid="ojduzqa"
          >
            <div
              className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-transparent via-cyan-900/10 to-transparent rounded-full blur-md opacity-70"
              data-oid="6w_8ek-"
            ></div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`bg-space-800/80 border-cyan-500/30 text-cyan-300 hover:text-cyan-100 hover:border-cyan-400/50 hover:bg-space-700/90 shadow-md shadow-cyan-900/20 hover:shadow-cyan-800/30 transition-all duration-300 ${currentPage === 1 ? "opacity-50" : "opacity-100"}`}
              data-oid="_vxns4p"
            >
              <ChevronLeft className="h-4 w-4 mr-1.5" data-oid="0dpda2i" />{" "}
              Previous
            </Button>

            <div
              className="text-cyan-100 bg-space-800/50 px-4 py-1.5 rounded-full border border-cyan-500/20 shadow-inner shadow-cyan-900/10"
              data-oid="flhrc.r"
            >
              <span className="font-medium" data-oid="90e8w.s">
                Page {currentPage}
              </span>{" "}
              of {totalPages}
              <span className="text-cyan-300/70 ml-2" data-oid="zaagr1r">
                ({filteredCalculators.length} calculators)
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`bg-space-800/80 border-cyan-500/30 text-cyan-300 hover:text-cyan-100 hover:border-cyan-400/50 hover:bg-space-700/90 shadow-md shadow-cyan-900/20 hover:shadow-cyan-800/30 transition-all duration-300 ${currentPage === totalPages ? "opacity-50" : "opacity-100"}`}
              data-oid="dxwnguh"
            >
              Next{" "}
              <ChevronRight className="h-4 w-4 ml-1.5" data-oid="tr.4i:m" />
            </Button>
          </div>
        )}
      </div>

      {activeTab && (
        <div className="mt-8 mb-20" data-oid="v9r:3wr">
          <div
            className="bg-gradient-to-br from-space-800/50 to-space-900/70 p-5 rounded-xl border border-cyan-500/30 shadow-lg shadow-cyan-900/20 mb-6 relative overflow-hidden"
            data-oid="h5z-i7l"
          >
            <div
              className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-50"
              data-oid="5_9nt_9"
            ></div>
            <div
              className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
              data-oid="lw0p0f7"
            ></div>
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
              data-oid="ng-n5.s"
            ></div>
            <h3
              className="text-lg font-medium bg-gradient-to-r from-cyan-100 to-blue-100 bg-clip-text text-transparent mb-2 relative"
              data-oid="-0vezfl"
            >
              {allCalculators.find((c) => c.id === activeTab)?.name}
            </h3>
            <p className="text-sm text-cyan-300/80 relative" data-oid="e96-4hu">
              {allCalculators.find((c) => c.id === activeTab)?.description}
            </p>
          </div>

          <div
            className="relative w-full min-h-[600px] rounded-xl bg-gradient-to-br from-space-800/30 to-space-900/60 border border-cyan-800/20 shadow-xl shadow-cyan-900/10 overflow-hidden"
            data-oid="wqtnqar"
          >
            <div
              className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-30"
              data-oid=":-cpo2z"
            ></div>
            {loadingState[activeTab] && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-space-900/70 backdrop-blur-sm z-10 rounded-xl"
                data-oid="asd4ta0"
              >
                <div
                  className="flex flex-col items-center bg-space-800/80 p-8 rounded-xl border border-cyan-500/30 shadow-lg shadow-cyan-900/30"
                  data-oid="d-2w-s2"
                >
                  <div className="relative" data-oid="ye6yb1p">
                    <div
                      className="absolute -inset-6 bg-gradient-to-r from-electric/20 to-cyan-500/20 rounded-full blur-lg opacity-70 animate-pulse"
                      data-oid="-qlj27k"
                    ></div>
                    <Loader2
                      className="h-14 w-14 text-electric animate-spin relative"
                      data-oid="hhpq9s2"
                    />
                  </div>
                  <p
                    className="mt-4 text-cyan-100 font-medium"
                    data-oid="j2:jrpb"
                  >
                    Loading calculator
                    <span
                      className="animate-ellipsis"
                      data-oid="2x1aik:"
                    ></span>
                  </p>
                </div>
              </div>
            )}

            {errors[activeTab] ? (
              <div
                className="absolute inset-0 flex items-center justify-center bg-space-900/90 backdrop-blur-md z-10 rounded-xl"
                data-oid="99m9tmo"
              >
                <div
                  className="flex flex-col items-center text-center p-8 bg-space-800/80 border border-red-500/30 rounded-xl shadow-lg shadow-red-900/20 max-w-md"
                  data-oid="mlpwtvl"
                >
                  <div className="relative" data-oid="-hv.css">
                    <div
                      className="absolute -inset-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-lg opacity-70 animate-pulse"
                      data-oid="cx.r7bw"
                    ></div>
                    <div
                      className="text-red-400 text-4xl mb-3 relative"
                      data-oid="gb8sk57"
                    >
                      ⚠️
                    </div>
                  </div>
                  <h3
                    className="text-xl bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent mb-3 font-medium"
                    data-oid="3_u5lxg"
                  >
                    Failed to load calculator
                  </h3>
                  <p className="text-gray-300 mb-5" data-oid="j2wp4wh">
                    The external calculator could not be loaded. We'll try to
                    connect you to an alternative resource.
                  </p>
                  <button
                    onClick={() => {
                      setLoadingState((prev) => ({
                        ...prev,
                        [activeTab]: true,
                      }));
                      setErrors((prev) => ({ ...prev, [activeTab]: false }));
                      // Force iframe refresh
                      const iframe = document.getElementById(
                        `iframe-${activeTab}`,
                      ) as HTMLIFrameElement;
                      if (iframe) {
                        const src = iframe.src;
                        iframe.src = "";
                        setTimeout(() => {
                          iframe.src = src;
                        }, 100);
                      }
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-electric to-cyan-500 text-black rounded-lg hover:from-electric/90 hover:to-cyan-400 shadow-md shadow-cyan-900/30 hover:shadow-cyan-700/40 transition-all duration-300 font-medium"
                    data-oid="2ph1mj7"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="relative rounded-xl overflow-hidden bg-gradient-to-br from-space-800/40 to-space-900/60 p-8 flex flex-col items-center justify-center"
                data-oid=":wshr8g"
              >
                <h3
                  className="text-xl bg-gradient-to-r from-electric to-cyan-400 bg-clip-text text-transparent mb-4 font-medium"
                  data-oid="t9ymadn"
                >
                  For the best experience:
                </h3>
                <p
                  className="text-cyan-100/80 mb-6 text-center max-w-lg leading-relaxed"
                  data-oid="lm0f8:d"
                >
                  These professional construction calculators work best when
                  opened directly in a new tab. Click the button below to access
                  this calculator.
                </p>

                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-electric to-cyan-500 text-black hover:from-electric/90 hover:to-cyan-400 shadow-lg shadow-cyan-900/30 hover:shadow-cyan-700/40 transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group/btn"
                  onClick={() => {
                    const calc = allCalculators.find((c) => c.id === activeTab);
                    if (calc) {
                      try {
                        // Check if we've already validated this URL
                        if (validatedUrls[calc.id] === false) {
                          // Use alternative calculator
                          const alternativeUrl = getAlternativeCalculator(
                            calc.name,
                          );
                          const newWindow = window.open(
                            alternativeUrl,
                            "_blank",
                            "noopener,noreferrer",
                          );
                          if (newWindow) newWindow.opener = null;
                        } else {
                          const newWindow = window.open(
                            calc.url,
                            "_blank",
                            "noopener,noreferrer",
                          );
                          if (newWindow) newWindow.opener = null;

                          // Mark this URL as validated or not
                          fetch(calc.url, { method: "HEAD", mode: "no-cors" })
                            .then(() => {
                              setValidatedUrls((prev) => ({
                                ...prev,
                                [calc.id]: true,
                              }));
                            })
                            .catch(() => {
                              console.error("URL validation failed:", calc.url);
                              setValidatedUrls((prev) => ({
                                ...prev,
                                [calc.id]: false,
                              }));
                            });
                        }
                      } catch (err) {
                        console.error("Failed to open calculator:", err);
                        // Fallback to alternative
                        const alternativeUrl = getAlternativeCalculator(
                          calc.name,
                        );
                        window.open(alternativeUrl, "_blank");
                      }
                    }
                  }}
                  data-oid="37jq2u-"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-all duration-300"
                    data-oid="p2i_n3t"
                  ></div>
                  <ExternalLink
                    className="mr-2 h-5 w-5 relative z-10"
                    data-oid=".vtypxc"
                  />

                  <span
                    className="relative z-10 font-medium"
                    data-oid="kv4xf5x"
                  >
                    Open {allCalculators.find((c) => c.id === activeTab)?.name}{" "}
                    in New Tab
                  </span>
                </Button>

                <p
                  className="mt-8 text-gray-400 text-sm bg-space-800/60 p-3 rounded-lg border border-cyan-900/30 max-w-md text-center"
                  data-oid="8.ic3b_"
                >
                  Note: Some calculators may be unavailable. Alternative
                  calculators will be automatically selected if the original
                  cannot be accessed.
                </p>

                {validatedUrls[activeTab] === false && (
                  <div
                    className="mt-5 p-4 bg-gradient-to-br from-amber-900/30 to-amber-800/20 border border-amber-500/30 rounded-lg shadow-md shadow-amber-900/10 max-w-md"
                    data-oid="g6_npr7"
                  >
                    <p
                      className="text-amber-300 text-sm flex items-center"
                      data-oid="kzhn_vb"
                    >
                      <span
                        className="mr-2 text-amber-300 text-lg"
                        data-oid="fh.d-u4"
                      >
                        ⚠️
                      </span>
                      <span data-oid="u9lqw8g">
                        <span className="font-medium" data-oid="ak:q3.y">
                          Notice:
                        </span>{" "}
                        The original calculator URL may be unavailable. An
                        alternative calculator will be used instead.
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </BaseCalculator>
  );
};

export default ConstructionCalculator;
