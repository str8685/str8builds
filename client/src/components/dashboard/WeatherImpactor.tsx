import { FC, useState, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { useWeather } from "@/hooks/useWeather";
import { useJobTimer } from "@/hooks/useJobTimer";

// List of construction trades
const TRADES = [
  { id: "general", name: "General Construction", icon: "fa-hammer" },
  { id: "carpentry", name: "Carpentry", icon: "fa-screwdriver" },
  { id: "electrical", name: "Electrical", icon: "fa-bolt" },
  { id: "plumbing", name: "Plumbing", icon: "fa-faucet" },
  { id: "masonry", name: "Masonry", icon: "fa-cubes" },
  { id: "roofing", name: "Roofing", icon: "fa-home" },
  { id: "painting", name: "Painting", icon: "fa-paint-roller" },
  { id: "excavation", name: "Excavation", icon: "fa-truck-monster" },
  { id: "hvac", name: "HVAC", icon: "fa-temperature-high" },
  { id: "flooring", name: "Flooring", icon: "fa-border-all" },
  { id: "landscaping", name: "Landscaping", icon: "fa-leaf" },
];

interface ImpactRisk {
  category: string;
  risk: "low" | "medium" | "high" | "critical";
  color: string;
  icon: string;
  impact: string;
  recommendation: string;
}

interface MaterialImpact {
  material: string;
  impact: string;
  mitigationStrategy: string;
  icon: string;
}

interface Notification {
  type: "alert" | "warning" | "info";
  message: string;
  time: string;
}

const WeatherImpactor: FC = () => {
  const { currentWeather, forecast, location, detailedImpact } = useWeather();

  const { currentJob } = useJobTimer();

  const [activeTab, setActiveTab] = useState<
    "impact" | "material" | "forecast"
  >("impact");
  const [selectedTrade, setSelectedTrade] = useState(TRADES[0].id);
  const [showTradeSelector, setShowTradeSelector] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      type: "alert",
      message: "Critical: High winds expected tomorrow - secure all materials",
      time: "10:15 AM",
    },
    {
      type: "warning",
      message: "Rain may delay concrete curing at Mount site",
      time: "Yesterday",
    },
    {
      type: "info",
      message: "Weather clearing on Friday - optimal for exterior painting",
      time: "Yesterday",
    },
  ]);

  // Calculate impact risks based on current weather and forecast
  const [impactRisks, setImpactRisks] = useState<ImpactRisk[]>([
    {
      category: "Schedule",
      risk: "medium",
      color: "text-yellow-400",
      icon: "fa-calendar-alt",
      impact: "Expected 1-2 day delay due to rain",
      recommendation: "Adjust timeline and notify clients of potential delays",
    },
    {
      category: "Safety",
      risk: "high",
      color: "text-red-500",
      icon: "fa-hard-hat",
      impact: "Slippery conditions and reduced visibility",
      recommendation: "Implement enhanced safety protocols and briefings",
    },
    {
      category: "Equipment",
      risk: "low",
      color: "text-green-400",
      icon: "fa-tools",
      impact: "Minor impact on electrical equipment",
      recommendation:
        "Ensure proper covering and storage of sensitive equipment",
    },
    {
      category: "Quality",
      risk: "medium",
      color: "text-yellow-400",
      icon: "fa-check-circle",
      impact: "Moisture may affect material performance",
      recommendation: "Increase quality checks and adjust material application",
    },
  ]);

  // Material impacts
  const [materialImpacts, setMaterialImpacts] = useState<MaterialImpact[]>([
    {
      material: "Concrete",
      impact: "Slower curing time, potential surface defects",
      mitigationStrategy:
        "Use tarps and accelerants, reschedule pours if possible",
      icon: "fa-cubes",
    },
    {
      material: "Paint",
      impact: "Longer drying time, potential runoff issues",
      mitigationStrategy:
        "Use quick-dry formulations, avoid application 24h before rain",
      icon: "fa-fill-drip",
    },
    {
      material: "Lumber",
      impact: "Increased moisture content, potential warping",
      mitigationStrategy: "Store properly under cover, allow extra drying time",
      icon: "fa-wood",
    },
    {
      material: "Roofing",
      impact: "Unsafe installation conditions, adhesive issues",
      mitigationStrategy: "Postpone installation, use mechanical fasteners",
      icon: "fa-home",
    },
  ]);

  // Calculate overall project risk
  const calculateOverallRisk = (): {
    level: string;
    color: string;
    percentage: number;
  } => {
    const riskMap = { low: 1, medium: 2, high: 3, critical: 4 };
    const totalRisk = impactRisks.reduce(
      (acc, risk) => acc + riskMap[risk.risk],
      0,
    );
    const maxPossibleRisk = impactRisks.length * 4; // maximum possible risk score
    const riskPercentage = (totalRisk / maxPossibleRisk) * 100;

    if (riskPercentage >= 75)
      return {
        level: "Critical",
        color: "text-red-500",
        percentage: riskPercentage,
      };
    if (riskPercentage >= 50)
      return {
        level: "High",
        color: "text-orange-500",
        percentage: riskPercentage,
      };
    if (riskPercentage >= 25)
      return {
        level: "Medium",
        color: "text-yellow-400",
        percentage: riskPercentage,
      };
    return {
      level: "Low",
      color: "text-green-400",
      percentage: riskPercentage,
    };
  };

  const overallRisk = calculateOverallRisk();

  // Risk level badge component
  const RiskBadge: FC<{ risk: "low" | "medium" | "high" | "critical" }> = ({
    risk,
  }) => {
    const colors = {
      low: "bg-green-900/30 text-green-400",
      medium: "bg-yellow-900/30 text-yellow-400",
      high: "bg-orange-900/30 text-orange-400",
      critical: "bg-red-900/30 text-red-400",
    };

    return (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[risk]}`}
        data-oid="b02cgnk"
      >
        {risk.charAt(0).toUpperCase() + risk.slice(1)}
      </span>
    );
  };

  const getWeatherTrendIcon = () => {
    // Compare today's temperature with tomorrow's to determine trend
    if (forecast.length >= 2) {
      const todayTemp = forecast[0].temp;
      const tomorrowTemp = forecast[1].temp;

      if (tomorrowTemp > todayTemp + 2) return "fa-temperature-up text-red-400";
      if (tomorrowTemp < todayTemp - 2)
        return "fa-temperature-down text-blue-400";
    }
    return "fa-temperature-half text-gray-400";
  };

  return (
    <GlassCard
      className="rounded-xl mb-6 overflow-hidden p-0"
      variant="electric"
      glow={true}
      data-oid="ajm-2t2"
    >
      {/* Header */}
      <div
        className="flex justify-between items-center px-5 py-3 border-b border-electric/20"
        data-oid="1l:d:f8"
      >
        <div className="flex items-center" data-oid="43ydcx-">
          <i
            className="fas fa-cloud-sun-rain mr-2 text-electric"
            data-oid="m_teug5"
          ></i>
          <h3 className="text-lg font-space text-white" data-oid="439rni8">
            Weather Impact Analyzer
          </h3>
          <div
            className="ml-2 px-2 py-1 bg-space-900/40 rounded-md"
            data-oid="5_rz1ie"
          >
            <span className="text-xs text-gray-300" data-oid="vy-ft.q">
              {location}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2" data-oid="bkw77al">
          <span
            className={`text-lg ${getWeatherTrendIcon().split(" ")[1]}`}
            data-oid="t56ls:k"
          >
            <i
              className={`fas ${getWeatherTrendIcon().split(" ")[0]}`}
              data-oid="mk-zu-x"
            ></i>
          </span>
          <div className="text-2xl font-medium text-white" data-oid="5qnrwak">
            {currentWeather.temp}°C
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex border-b border-space-700/30 px-5 bg-space-900/30"
        data-oid="5yan0ba"
      >
        <button
          className={`px-4 py-2.5 text-sm font-medium relative ${activeTab === "impact" ? "text-electric" : "text-gray-400 hover:text-gray-300"}`}
          onClick={() => setActiveTab("impact")}
          data-oid="uox3a:b"
        >
          <i
            className="fas fa-exclamation-triangle mr-1.5"
            data-oid="5gclz.p"
          ></i>
          Impact Analysis
          {activeTab === "impact" && (
            <span
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric"
              data-oid="379eodu"
            ></span>
          )}
        </button>
        <button
          className={`px-4 py-2.5 text-sm font-medium relative ${activeTab === "material" ? "text-electric" : "text-gray-400 hover:text-gray-300"}`}
          onClick={() => setActiveTab("material")}
          data-oid="qevj6lq"
        >
          <i className="fas fa-cubes mr-1.5" data-oid="mhgu21r"></i>
          Material Advisory
          {activeTab === "material" && (
            <span
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric"
              data-oid="7mdk9yc"
            ></span>
          )}
        </button>
        <button
          className={`px-4 py-2.5 text-sm font-medium relative ${activeTab === "forecast" ? "text-electric" : "text-gray-400 hover:text-gray-300"}`}
          onClick={() => setActiveTab("forecast")}
          data-oid="7i915ko"
        >
          <i className="fas fa-chart-line mr-1.5" data-oid="09bs3hu"></i>
          Forecast Impact
          {activeTab === "forecast" && (
            <span
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric"
              data-oid=":ya-vr_"
            ></span>
          )}
        </button>
      </div>

      {/* Main content area */}
      <div className="p-5" data-oid="zz3gbui">
        {/* Impact Analysis Tab */}
        {activeTab === "impact" && (
          <div data-oid="rdc:z7p">
            {/* Overall risk meter */}
            <div className="mb-5" data-oid="ex3.p07">
              <div
                className="flex justify-between items-center mb-2"
                data-oid="apxmwlq"
              >
                <h4
                  className="text-sm font-medium text-white"
                  data-oid="8yrhk.f"
                >
                  Overall Project Risk
                </h4>
                <span
                  className={`text-sm font-medium ${overallRisk.color}`}
                  data-oid="1005b6-"
                >
                  {overallRisk.level} Risk
                </span>
              </div>
              <div
                className="w-full h-2 bg-space-800 rounded-full overflow-hidden"
                data-oid="muw24d3"
              >
                <div
                  className={`h-full transition-all duration-1000 ease-out ${
                    overallRisk.level === "Low"
                      ? "bg-gradient-to-r from-green-500/70 to-green-400"
                      : overallRisk.level === "Medium"
                        ? "bg-gradient-to-r from-yellow-500/70 to-yellow-400"
                        : overallRisk.level === "High"
                          ? "bg-gradient-to-r from-orange-500/70 to-orange-400"
                          : "bg-gradient-to-r from-red-600/70 to-red-500"
                  }`}
                  style={{ width: `${overallRisk.percentage}%` }}
                  data-oid="2jzixyy"
                ></div>
              </div>
            </div>

            {/* Impact categories */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
              data-oid="h98t2yh"
            >
              {impactRisks.map((impact, index) => (
                <div
                  key={index}
                  className="bg-space-900/40 rounded-lg p-3"
                  data-oid="o1xdp-1"
                >
                  <div
                    className="flex justify-between items-start mb-2"
                    data-oid="xydt97-"
                  >
                    <div className="flex items-center" data-oid="gy0-e--">
                      <div
                        className={`w-8 h-8 rounded-full bg-space-800 flex items-center justify-center ${impact.color} mr-2`}
                        data-oid="makir2u"
                      >
                        <i
                          className={`fas ${impact.icon}`}
                          data-oid="ihzn-x8"
                        ></i>
                      </div>
                      <div data-oid="dthtdtw">
                        <h5
                          className="text-sm font-medium text-white"
                          data-oid="kl4ij9u"
                        >
                          {impact.category}
                        </h5>
                        <div
                          className="text-xs text-gray-400"
                          data-oid="8zapqpi"
                        >
                          Risk Level:{" "}
                          <RiskBadge risk={impact.risk} data-oid="yo3jpee" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-white mb-1" data-oid="2:b82si">
                    {impact.impact}
                  </p>
                  <p className="text-xs text-cyan-400" data-oid="_otgnsv">
                    <i className="fas fa-lightbulb mr-1" data-oid="ibegl52"></i>{" "}
                    {impact.recommendation}
                  </p>
                </div>
              ))}
            </div>

            {/* Trade Selection Box */}
            <div
              className="mt-5 mb-5 bg-space-800/80 rounded-lg p-4 border border-electric/30"
              data-oid="r.jk7f1"
            >
              <div
                className="flex justify-between items-center mb-3"
                data-oid="rd:wc8a"
              >
                <h4
                  className="text-sm font-medium text-white"
                  data-oid="5az6.5n"
                >
                  <i
                    className="fas fa-hard-hat mr-1.5 text-electric"
                    data-oid="eo6oakc"
                  ></i>
                  Trade-Specific Weather Impact
                </h4>
                <div className="relative" data-oid="wevb_34">
                  <button
                    onClick={() => setShowTradeSelector(!showTradeSelector)}
                    className="bg-space-900/70 hover:bg-space-900 text-white px-3 py-1.5 rounded-md text-xs flex items-center transition-colors"
                    data-oid="31nl_i."
                  >
                    <i
                      className={`fas ${TRADES.find((t) => t.id === selectedTrade)?.icon || "fa-hammer"} mr-1.5`}
                      data-oid="w.blzl_"
                    ></i>
                    {TRADES.find((t) => t.id === selectedTrade)?.name ||
                      "Select Trade"}
                    <i
                      className={`fas fa-chevron-${showTradeSelector ? "up" : "down"} ml-2 text-gray-400`}
                      data-oid="2rz-u_9"
                    ></i>
                  </button>

                  {showTradeSelector && (
                    <div
                      className="absolute right-0 mt-1 w-64 bg-space-900 rounded-lg shadow-lg border border-electric/20 z-10 max-h-72 overflow-y-auto"
                      data-oid=".pmetvi"
                    >
                      {TRADES.map((trade) => (
                        <button
                          key={trade.id}
                          className={`w-full text-left px-3 py-2.5 text-sm flex items-center hover:bg-space-800 transition-colors ${
                            selectedTrade === trade.id
                              ? "bg-electric/10 text-electric"
                              : "text-white"
                          }`}
                          onClick={() => {
                            setSelectedTrade(trade.id);
                            setShowTradeSelector(false);
                            setIsAnalyzing(true);
                            // Simulate analysis delay
                            setTimeout(() => setIsAnalyzing(false), 800);
                          }}
                          data-oid="m.o1ja8"
                        >
                          <i
                            className={`fas ${trade.icon} w-5 mr-2`}
                            data-oid="bs-h-:r"
                          ></i>
                          {trade.name}
                          {selectedTrade === trade.id && (
                            <i
                              className="fas fa-check ml-auto"
                              data-oid="q8i5:wx"
                            ></i>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {isAnalyzing ? (
                <div
                  className="flex items-center justify-center py-6"
                  data-oid="s7k.dn1"
                >
                  <div
                    className="animate-spin h-5 w-5 border-2 border-electric border-t-transparent rounded-full mr-2"
                    data-oid="336lqk1"
                  ></div>
                  <span className="text-sm text-gray-300" data-oid="2ijxwpz">
                    Analyzing impact for{" "}
                    {TRADES.find((t) => t.id === selectedTrade)?.name}...
                  </span>
                </div>
              ) : (
                <div className="space-y-3" data-oid="eqafnje">
                  {/* Trade-specific impact */}
                  {selectedTrade === "painting" && (
                    <div data-oid="4a3824o">
                      <div className="flex items-start mb-2" data-oid="1jiqggb">
                        <div
                          className="h-6 w-6 rounded-full bg-space-900 flex items-center justify-center text-red-400 mr-2"
                          data-oid="223c1ac"
                        >
                          <i
                            className="fas fa-exclamation-triangle text-xs"
                            data-oid="5lee3ye"
                          ></i>
                        </div>
                        <p className="text-sm text-white" data-oid="prhd1os">
                          Painting operations severely affected by current
                          weather conditions.
                        </p>
                      </div>
                      <ul
                        className="pl-8 text-sm space-y-1.5"
                        data-oid="k6mecx1"
                      >
                        <li className="text-gray-300" data-oid=":5w3-za">
                          <span className="text-red-400" data-oid="5jlc5fa">
                            •
                          </span>{" "}
                          Exterior painting should be postponed (humidity above
                          70%)
                        </li>
                        <li className="text-gray-300" data-oid=".p318qp">
                          <span className="text-yellow-400" data-oid="fubtrcy">
                            •
                          </span>{" "}
                          Interior painting possible with proper ventilation
                        </li>
                        <li className="text-gray-300" data-oid="r58g:9k">
                          <span className="text-green-400" data-oid="5jbppf_">
                            •
                          </span>{" "}
                          Recommend scheduling exterior work for Friday (optimal
                          conditions)
                        </li>
                      </ul>
                    </div>
                  )}

                  {selectedTrade === "electrical" && (
                    <div data-oid="imq0iyc">
                      <div className="flex items-start mb-2" data-oid="kuu2.04">
                        <div
                          className="h-6 w-6 rounded-full bg-space-900 flex items-center justify-center text-yellow-400 mr-2"
                          data-oid="91s:pk6"
                        >
                          <i
                            className="fas fa-bolt text-xs"
                            data-oid="2lmmgop"
                          ></i>
                        </div>
                        <p className="text-sm text-white" data-oid="m7ng2i8">
                          Electrical work partially affected by current weather
                          conditions.
                        </p>
                      </div>
                      <ul
                        className="pl-8 text-sm space-y-1.5"
                        data-oid="_r2o6sq"
                      >
                        <li className="text-gray-300" data-oid="kv2ytyd">
                          <span className="text-yellow-400" data-oid="eik:p-0">
                            •
                          </span>{" "}
                          Outdoor electrical installations should use
                          weather-proof equipment
                        </li>
                        <li className="text-gray-300" data-oid="ecxcqo6">
                          <span className="text-green-400" data-oid="5lz2qgb">
                            •
                          </span>{" "}
                          Indoor electrical work can proceed as normal
                        </li>
                        <li className="text-gray-300" data-oid="y0ps3xj">
                          <span className="text-yellow-400" data-oid="a8jv55v">
                            •
                          </span>{" "}
                          Extra care needed with temporary power connections
                        </li>
                      </ul>
                    </div>
                  )}

                  {selectedTrade === "roofing" && (
                    <div data-oid="_a6z:0r">
                      <div className="flex items-start mb-2" data-oid="gwlocn5">
                        <div
                          className="h-6 w-6 rounded-full bg-space-900 flex items-center justify-center text-red-400 mr-2"
                          data-oid="j32uma."
                        >
                          <i
                            className="fas fa-exclamation-circle text-xs"
                            data-oid="2m.dhi_"
                          ></i>
                        </div>
                        <p className="text-sm text-white" data-oid="43l0lhl">
                          Roofing operations severely affected by current
                          weather conditions.
                        </p>
                      </div>
                      <ul
                        className="pl-8 text-sm space-y-1.5"
                        data-oid="djw4o9:"
                      >
                        <li className="text-gray-300" data-oid="l6dj6yg">
                          <span className="text-red-400" data-oid="rk7bg29">
                            •
                          </span>{" "}
                          All roofing installation should be postponed due to
                          safety concerns
                        </li>
                        <li className="text-gray-300" data-oid="9z1r8:d">
                          <span className="text-red-400" data-oid="r2zd._a">
                            •
                          </span>{" "}
                          High risk of water infiltration and material damage
                        </li>
                        <li className="text-gray-300" data-oid="9b:ixjt">
                          <span className="text-yellow-400" data-oid="kngmcuu">
                            •
                          </span>{" "}
                          Ensure temporary coverings are secure with additional
                          fasteners
                        </li>
                      </ul>
                    </div>
                  )}

                  {selectedTrade !== "painting" &&
                    selectedTrade !== "electrical" &&
                    selectedTrade !== "roofing" && (
                      <div data-oid="3q5zi9l">
                        <div
                          className="flex items-start mb-2"
                          data-oid="9jm:d7-"
                        >
                          <div
                            className="h-6 w-6 rounded-full bg-space-900 flex items-center justify-center text-yellow-400 mr-2"
                            data-oid="d8js86l"
                          >
                            <i
                              className={`fas ${TRADES.find((t) => t.id === selectedTrade)?.icon || "fa-hard-hat"} text-xs`}
                              data-oid="8_z8u4v"
                            ></i>
                          </div>
                          <p className="text-sm text-white" data-oid="z1ldi6u">
                            {TRADES.find((t) => t.id === selectedTrade)?.name ||
                              "Selected trade"}{" "}
                            operations moderately affected by current weather.
                          </p>
                        </div>
                        <ul
                          className="pl-8 text-sm space-y-1.5"
                          data-oid="4vs3t15"
                        >
                          <li className="text-gray-300" data-oid="5.n6.h8">
                            <span
                              className="text-yellow-400"
                              data-oid="8gelzdn"
                            >
                              •
                            </span>{" "}
                            Consider adjusting outdoor work schedule due to rain
                          </li>
                          <li className="text-gray-300" data-oid="agi:1io">
                            <span className="text-green-400" data-oid="e8jwib0">
                              •
                            </span>{" "}
                            Indoor operations can continue as scheduled
                          </li>
                          <li className="text-gray-300" data-oid="otr:rcl">
                            <span
                              className="text-yellow-400"
                              data-oid="o:93245"
                            >
                              •
                            </span>{" "}
                            Monitor weather changes throughout the day for safer
                            operations
                          </li>
                        </ul>
                      </div>
                    )}

                  <div
                    className="bg-electric/10 rounded-lg p-2.5 mt-3"
                    data-oid="boo.86b"
                  >
                    <h5
                      className="text-xs font-medium text-electric mb-1.5"
                      data-oid="qogv0uy"
                    >
                      Productivity Impact Analysis
                    </h5>
                    <div
                      className="flex justify-between items-center mb-1.5"
                      data-oid="5ilt9ca"
                    >
                      <span className="text-xs text-white" data-oid="f5oec7m">
                        Estimated productivity impact:
                      </span>
                      <span
                        className="text-xs font-medium text-yellow-400"
                        data-oid="kzetl:w"
                      >
                        {selectedTrade === "roofing" ||
                        selectedTrade === "painting"
                          ? "Severe (-40-60%)"
                          : selectedTrade === "electrical"
                            ? "Moderate (-15-25%)"
                            : "Moderate (-20-30%)"}
                      </span>
                    </div>
                    <div
                      className="w-full h-1.5 bg-space-900 rounded-full overflow-hidden"
                      data-oid="h9.48cl"
                    >
                      <div
                        className={`h-full ${
                          selectedTrade === "roofing" ||
                          selectedTrade === "painting"
                            ? "bg-red-500 w-[55%]"
                            : selectedTrade === "electrical"
                              ? "bg-yellow-500 w-[20%]"
                              : "bg-yellow-500 w-[25%]"
                        }`}
                        data-oid="twk0-uu"
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div
                className="mt-3 flex justify-between items-center"
                data-oid="_e188h2"
              >
                <span className="text-xs text-gray-400" data-oid="m1gs:e.">
                  <i className="fas fa-clock mr-1" data-oid="71_.jsu"></i>{" "}
                  Updated just now
                </span>
                <button
                  className="text-xs bg-electric/20 hover:bg-electric/30 text-electric hover:text-white px-2.5 py-1 rounded transition-colors"
                  data-oid="poz2_zt"
                >
                  <i
                    className="fas fa-file-download mr-1"
                    data-oid="g_ihfvv"
                  ></i>{" "}
                  Export Report
                </button>
              </div>
            </div>

            {/* Current job impact */}
            <div
              className="mt-5 bg-space-800/60 rounded-lg p-4 border-l-4 border-electric"
              data-oid="2-4ecn7"
            >
              <h4
                className="text-sm font-medium text-white mb-2"
                data-oid="s5fpkdp"
              >
                Current Job Impact: {currentJob.name}
              </h4>
              <p className="text-sm text-gray-300" data-oid="rc8cj7v">
                {detailedImpact.summary}. Consider adjusting the schedule to
                account for weather conditions.
              </p>
              <div className="mt-3 flex justify-between" data-oid="o_dgm4t">
                <span className="text-xs text-gray-400" data-oid="tgvuoeq">
                  <i className="fas fa-clock mr-1" data-oid="5qix578"></i>{" "}
                  Updated 10 mins ago
                </span>
                <button
                  className="text-xs text-electric hover:text-cyan-400 transition-colors"
                  data-oid="nu7v-:o"
                >
                  View detailed report{" "}
                  <i
                    className="fas fa-chevron-right ml-1"
                    data-oid="9cxx4o8"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Material Advisory Tab */}
        {activeTab === "material" && (
          <div data-oid="4wz6s7i">
            <div className="grid grid-cols-1 gap-3" data-oid="rs7jjps">
              {materialImpacts.map((material, index) => (
                <div
                  key={index}
                  className="bg-space-900/40 rounded-lg p-3 flex items-start"
                  data-oid=":qxelw7"
                >
                  <div
                    className="w-10 h-10 rounded-full bg-space-800 flex items-center justify-center text-electric mr-3 mt-1"
                    data-oid="skv4qw8"
                  >
                    <i
                      className={`fas ${material.icon}`}
                      data-oid=".-3i74l"
                    ></i>
                  </div>
                  <div className="flex-1" data-oid="5rr5od_">
                    <h5
                      className="text-sm font-medium text-white"
                      data-oid="cqp4f3u"
                    >
                      {material.material}
                    </h5>
                    <p
                      className="text-xs text-gray-300 mb-1"
                      data-oid="_km_5dc"
                    >
                      {material.impact}
                    </p>
                    <div
                      className="bg-electric/10 rounded-lg p-2 border-l-2 border-electric/50"
                      data-oid="n28:3f6"
                    >
                      <p className="text-xs text-electric" data-oid="sjvc3mv">
                        <strong data-oid="3:6ti6t">Mitigation:</strong>{" "}
                        {material.mitigationStrategy}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-4 p-3 bg-space-900/40 rounded-lg"
              data-oid="wr2-ygm"
            >
              <h4
                className="text-sm font-medium text-white mb-2"
                data-oid="g4-ua_j"
              >
                Material Delivery Advisory
              </h4>
              <p className="text-xs text-gray-300" data-oid="6vygsw.">
                <i
                  className="fas fa-truck mr-1 text-yellow-400"
                  data-oid="-m2:30q"
                ></i>{" "}
                Potential delivery delays for cement and aggregates due to road
                conditions. Consider scheduling deliveries 1-2 days earlier than
                needed.
              </p>
            </div>
          </div>
        )}

        {/* Forecast Impact Tab */}
        {activeTab === "forecast" && (
          <div data-oid="4qh38k0">
            <div className="grid grid-cols-5 gap-2 mb-4" data-oid="fw_q6hb">
              {forecast.map((day, index) => (
                <div
                  key={index}
                  className={`bg-space-900/40 rounded-lg p-2 text-center ${index === 0 ? "border border-electric/40" : ""}`}
                  data-oid="bqrzncv"
                >
                  <div className="text-xs text-gray-400" data-oid="bs2ckye">
                    {day.day}
                  </div>
                  <div className="my-1" data-oid="f71nyhu">
                    <i
                      className={`fas ${day.icon} ${day.icon.includes("sun") ? "text-yellow-400" : day.icon.includes("rain") ? "text-blue-400" : "text-gray-400"}`}
                      data-oid="oq:_y42"
                    ></i>
                  </div>
                  <div
                    className="text-sm font-medium text-white"
                    data-oid="d1j2n.8"
                  >
                    {day.temp}°C
                  </div>
                  <div
                    className="text-xs text-gray-500 mt-1"
                    data-oid="5tfpib4"
                  >
                    {day.conditions}
                  </div>
                  <div
                    className={`text-xs mt-1 ${day.conditions.toLowerCase().includes("rain") ? "text-red-400" : "text-green-400"}`}
                    data-oid="3tp:_5t"
                  >
                    {day.conditions.toLowerCase().includes("rain")
                      ? "High Impact"
                      : "Low Impact"}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="bg-space-900/40 rounded-lg p-3 mb-3"
              data-oid="89qinm0"
            >
              <h4
                className="text-sm font-medium text-white mb-2"
                data-oid="kqe:.w6"
              >
                5-Day Construction Outlook
              </h4>
              <div
                className="text-xs text-gray-300 space-y-1"
                data-oid="rm903e0"
              >
                <div data-oid=":9qg5sf">
                  <strong data-oid=":0k_p7x">Today:</strong> Delay exterior work
                  until afternoon when rain subsides
                </div>
                <div data-oid="5t5s51d">
                  <strong data-oid="jxxel9-">Tomorrow:</strong> Optimal
                  conditions for all work types
                </div>
                <div data-oid="437xjv8">
                  <strong data-oid="_dfxdaf">Friday:</strong> Schedule exterior
                  painting and concrete pours
                </div>
                <div data-oid="woj4ypn">
                  <strong data-oid="o.haafs">Saturday:</strong> Normal
                  operations with minor wind concerns
                </div>
                <div data-oid="e4-61ak">
                  <strong data-oid="ra1rvdn">Sunday:</strong> Plan for indoor
                  work only - severe weather expected
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-space-900/40 rounded-lg p-3" data-oid="zziggc4">
              <div
                className="flex justify-between items-center mb-2"
                data-oid="8ylzuwn"
              >
                <h4
                  className="text-sm font-medium text-white"
                  data-oid="c-y:qny"
                >
                  Weather Alerts
                </h4>
                <span className="text-xs text-gray-400" data-oid="0kvooy2">
                  {notifications.length} new
                </span>
              </div>
              <div
                className="space-y-2 max-h-32 overflow-y-auto"
                data-oid="qt4hosc"
              >
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className={`text-xs p-2 rounded-lg flex justify-between items-start ${
                      notification.type === "alert"
                        ? "bg-red-900/20 border-l-2 border-red-500"
                        : notification.type === "warning"
                          ? "bg-yellow-900/20 border-l-2 border-yellow-500"
                          : "bg-blue-900/20 border-l-2 border-blue-500"
                    }`}
                    data-oid="nqhjrq2"
                  >
                    <div data-oid="we-k7zx">
                      <i
                        className={`fas ${
                          notification.type === "alert"
                            ? "fa-exclamation-circle text-red-500"
                            : notification.type === "warning"
                              ? "fa-exclamation-triangle text-yellow-500"
                              : "fa-info-circle text-blue-500"
                        } mr-1.5`}
                        data-oid="wsv3l08"
                      ></i>
                      {notification.message}
                    </div>
                    <div className="text-gray-400 ml-2" data-oid="zkltg:g">
                      {notification.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="bg-space-900/80 px-5 py-3 flex justify-between items-center border-t border-electric/10"
        data-oid="xlf9n0g"
      >
        <div className="text-xs text-gray-400" data-oid="vkj:mn6">
          <i
            className="fas fa-sync fa-spin text-electric mr-1.5"
            data-oid="5a3p:qc"
          ></i>
          Auto-refreshing every 30 minutes
        </div>
        <button
          className="bg-electric/20 hover:bg-electric/30 text-electric hover:text-white px-3 py-1 rounded-md text-xs transition-all duration-200"
          data-oid="u5g0p5p"
        >
          <i className="fas fa-bolt mr-1.5" data-oid="5ovwsb."></i>
          Generate Mitigation Plan
        </button>
      </div>
    </GlassCard>
  );
};

export default WeatherImpactor;
