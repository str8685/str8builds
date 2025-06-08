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
        data-oid="xlcd9ku"
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
      data-oid="gf.j51a"
    >
      {/* Header */}
      <div
        className="flex justify-between items-center px-5 py-3 border-b border-electric/20"
        data-oid="92qg2to"
      >
        <div className="flex items-center" data-oid="4dyp2m9">
          <i
            className="fas fa-cloud-sun-rain mr-2 text-electric"
            data-oid="apfl2_k"
          ></i>
          <h3 className="text-lg font-space text-white" data-oid="v3jcykq">
            Weather Impact Analyzer
          </h3>
          <div
            className="ml-2 px-2 py-1 bg-space-900/40 rounded-md"
            data-oid="j0lrxno"
          >
            <span className="text-xs text-gray-300" data-oid="mkh5-ev">
              {location}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2" data-oid="6yhewmf">
          <span
            className={`text-lg ${getWeatherTrendIcon().split(" ")[1]}`}
            data-oid="b2m5kgd"
          >
            <i
              className={`fas ${getWeatherTrendIcon().split(" ")[0]}`}
              data-oid="oi7zobk"
            ></i>
          </span>
          <div className="text-2xl font-medium text-white" data-oid="hl7h-u9">
            {currentWeather.temp}°C
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex border-b border-space-700/30 px-5 bg-space-900/30"
        data-oid="webz4vq"
      >
        <button
          className={`px-4 py-2.5 text-sm font-medium relative ${activeTab === "impact" ? "text-electric" : "text-gray-400 hover:text-gray-300"}`}
          onClick={() => setActiveTab("impact")}
          data-oid="06p2c_8"
        >
          <i
            className="fas fa-exclamation-triangle mr-1.5"
            data-oid="qfmql.0"
          ></i>
          Impact Analysis
          {activeTab === "impact" && (
            <span
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric"
              data-oid="aw-4y6d"
            ></span>
          )}
        </button>
        <button
          className={`px-4 py-2.5 text-sm font-medium relative ${activeTab === "material" ? "text-electric" : "text-gray-400 hover:text-gray-300"}`}
          onClick={() => setActiveTab("material")}
          data-oid=".c_k:38"
        >
          <i className="fas fa-cubes mr-1.5" data-oid="xhz147a"></i>
          Material Advisory
          {activeTab === "material" && (
            <span
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric"
              data-oid="q-.9b4t"
            ></span>
          )}
        </button>
        <button
          className={`px-4 py-2.5 text-sm font-medium relative ${activeTab === "forecast" ? "text-electric" : "text-gray-400 hover:text-gray-300"}`}
          onClick={() => setActiveTab("forecast")}
          data-oid="rs3r0v-"
        >
          <i className="fas fa-chart-line mr-1.5" data-oid="cux0orr"></i>
          Forecast Impact
          {activeTab === "forecast" && (
            <span
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric"
              data-oid="sj0na19"
            ></span>
          )}
        </button>
      </div>

      {/* Main content area */}
      <div className="p-5" data-oid="3_7wgc-">
        {/* Impact Analysis Tab */}
        {activeTab === "impact" && (
          <div data-oid="p85zik_">
            {/* Overall risk meter */}
            <div className="mb-5" data-oid="1g8axwm">
              <div
                className="flex justify-between items-center mb-2"
                data-oid="n8h.mgf"
              >
                <h4
                  className="text-sm font-medium text-white"
                  data-oid="q_5fghl"
                >
                  Overall Project Risk
                </h4>
                <span
                  className={`text-sm font-medium ${overallRisk.color}`}
                  data-oid="24na8xg"
                >
                  {overallRisk.level} Risk
                </span>
              </div>
              <div
                className="w-full h-2 bg-space-800 rounded-full overflow-hidden"
                data-oid="yuslclz"
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
                  data-oid="5d5mi0m"
                ></div>
              </div>
            </div>

            {/* Impact categories */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
              data-oid=":edprg_"
            >
              {impactRisks.map((impact, index) => (
                <div
                  key={index}
                  className="bg-space-900/40 rounded-lg p-3"
                  data-oid="uckdrli"
                >
                  <div
                    className="flex justify-between items-start mb-2"
                    data-oid="87vl1r8"
                  >
                    <div className="flex items-center" data-oid="jw7stu1">
                      <div
                        className={`w-8 h-8 rounded-full bg-space-800 flex items-center justify-center ${impact.color} mr-2`}
                        data-oid="rgw:t_l"
                      >
                        <i
                          className={`fas ${impact.icon}`}
                          data-oid="0r_-tef"
                        ></i>
                      </div>
                      <div data-oid="i3cq93f">
                        <h5
                          className="text-sm font-medium text-white"
                          data-oid="svr:4v_"
                        >
                          {impact.category}
                        </h5>
                        <div
                          className="text-xs text-gray-400"
                          data-oid="8761puz"
                        >
                          Risk Level:{" "}
                          <RiskBadge risk={impact.risk} data-oid="zne4pmb" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-white mb-1" data-oid="yrocw38">
                    {impact.impact}
                  </p>
                  <p className="text-xs text-cyan-400" data-oid="1n0yosr">
                    <i className="fas fa-lightbulb mr-1" data-oid="ib9cdrl"></i>{" "}
                    {impact.recommendation}
                  </p>
                </div>
              ))}
            </div>

            {/* Trade Selection Box */}
            <div
              className="mt-5 mb-5 bg-space-800/80 rounded-lg p-4 border border-electric/30"
              data-oid="rk_-ga5"
            >
              <div
                className="flex justify-between items-center mb-3"
                data-oid="xoo:9.t"
              >
                <h4
                  className="text-sm font-medium text-white"
                  data-oid="0ouie9e"
                >
                  <i
                    className="fas fa-hard-hat mr-1.5 text-electric"
                    data-oid="j:at9.p"
                  ></i>
                  Trade-Specific Weather Impact
                </h4>
                <div className="relative" data-oid="asiv5bc">
                  <button
                    onClick={() => setShowTradeSelector(!showTradeSelector)}
                    className="bg-space-900/70 hover:bg-space-900 text-white px-3 py-1.5 rounded-md text-xs flex items-center transition-colors"
                    data-oid="ubv4.i8"
                  >
                    <i
                      className={`fas ${TRADES.find((t) => t.id === selectedTrade)?.icon || "fa-hammer"} mr-1.5`}
                      data-oid="8pkzcqa"
                    ></i>
                    {TRADES.find((t) => t.id === selectedTrade)?.name ||
                      "Select Trade"}
                    <i
                      className={`fas fa-chevron-${showTradeSelector ? "up" : "down"} ml-2 text-gray-400`}
                      data-oid="oa-bt59"
                    ></i>
                  </button>

                  {showTradeSelector && (
                    <div
                      className="absolute right-0 mt-1 w-64 bg-space-900 rounded-lg shadow-lg border border-electric/20 z-10 max-h-72 overflow-y-auto"
                      data-oid="jsaijmx"
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
                          data-oid=".fvnj9n"
                        >
                          <i
                            className={`fas ${trade.icon} w-5 mr-2`}
                            data-oid="kza9pvo"
                          ></i>
                          {trade.name}
                          {selectedTrade === trade.id && (
                            <i
                              className="fas fa-check ml-auto"
                              data-oid="c7osfci"
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
                  data-oid="mq03pj9"
                >
                  <div
                    className="animate-spin h-5 w-5 border-2 border-electric border-t-transparent rounded-full mr-2"
                    data-oid=".oq_d57"
                  ></div>
                  <span className="text-sm text-gray-300" data-oid="i0-zyzy">
                    Analyzing impact for{" "}
                    {TRADES.find((t) => t.id === selectedTrade)?.name}...
                  </span>
                </div>
              ) : (
                <div className="space-y-3" data-oid="8d85ohq">
                  {/* Trade-specific impact */}
                  {selectedTrade === "painting" && (
                    <div data-oid="5k-0joc">
                      <div className="flex items-start mb-2" data-oid="djwn-o4">
                        <div
                          className="h-6 w-6 rounded-full bg-space-900 flex items-center justify-center text-red-400 mr-2"
                          data-oid="gc2q5m7"
                        >
                          <i
                            className="fas fa-exclamation-triangle text-xs"
                            data-oid="q147-9i"
                          ></i>
                        </div>
                        <p className="text-sm text-white" data-oid="osaov6x">
                          Painting operations severely affected by current
                          weather conditions.
                        </p>
                      </div>
                      <ul
                        className="pl-8 text-sm space-y-1.5"
                        data-oid="ym2datu"
                      >
                        <li className="text-gray-300" data-oid="9etbq.m">
                          <span className="text-red-400" data-oid="f2r2jr5">
                            •
                          </span>{" "}
                          Exterior painting should be postponed (humidity above
                          70%)
                        </li>
                        <li className="text-gray-300" data-oid="nw_ykpk">
                          <span className="text-yellow-400" data-oid=":bjgy3b">
                            •
                          </span>{" "}
                          Interior painting possible with proper ventilation
                        </li>
                        <li className="text-gray-300" data-oid="2cghgaf">
                          <span className="text-green-400" data-oid="wq9.74f">
                            •
                          </span>{" "}
                          Recommend scheduling exterior work for Friday (optimal
                          conditions)
                        </li>
                      </ul>
                    </div>
                  )}

                  {selectedTrade === "electrical" && (
                    <div data-oid="1myapnq">
                      <div className="flex items-start mb-2" data-oid="qdxmfg5">
                        <div
                          className="h-6 w-6 rounded-full bg-space-900 flex items-center justify-center text-yellow-400 mr-2"
                          data-oid="qovnqxl"
                        >
                          <i
                            className="fas fa-bolt text-xs"
                            data-oid="eu10a1n"
                          ></i>
                        </div>
                        <p className="text-sm text-white" data-oid="k49hc.:">
                          Electrical work partially affected by current weather
                          conditions.
                        </p>
                      </div>
                      <ul
                        className="pl-8 text-sm space-y-1.5"
                        data-oid="n3pnav."
                      >
                        <li className="text-gray-300" data-oid="3r8icrn">
                          <span className="text-yellow-400" data-oid="k6dx_4i">
                            •
                          </span>{" "}
                          Outdoor electrical installations should use
                          weather-proof equipment
                        </li>
                        <li className="text-gray-300" data-oid="afwhe7d">
                          <span className="text-green-400" data-oid="7s0t.jx">
                            •
                          </span>{" "}
                          Indoor electrical work can proceed as normal
                        </li>
                        <li className="text-gray-300" data-oid="osmxlw2">
                          <span className="text-yellow-400" data-oid="n02mjpd">
                            •
                          </span>{" "}
                          Extra care needed with temporary power connections
                        </li>
                      </ul>
                    </div>
                  )}

                  {selectedTrade === "roofing" && (
                    <div data-oid="mqy3_j5">
                      <div className="flex items-start mb-2" data-oid="ojb:fj0">
                        <div
                          className="h-6 w-6 rounded-full bg-space-900 flex items-center justify-center text-red-400 mr-2"
                          data-oid="z3r.odt"
                        >
                          <i
                            className="fas fa-exclamation-circle text-xs"
                            data-oid="_w.slm-"
                          ></i>
                        </div>
                        <p className="text-sm text-white" data-oid="nv2_pj8">
                          Roofing operations severely affected by current
                          weather conditions.
                        </p>
                      </div>
                      <ul
                        className="pl-8 text-sm space-y-1.5"
                        data-oid="-z_1z-o"
                      >
                        <li className="text-gray-300" data-oid="j41ffq_">
                          <span className="text-red-400" data-oid="86-1g6q">
                            •
                          </span>{" "}
                          All roofing installation should be postponed due to
                          safety concerns
                        </li>
                        <li className="text-gray-300" data-oid="y92zske">
                          <span className="text-red-400" data-oid="_81tifv">
                            •
                          </span>{" "}
                          High risk of water infiltration and material damage
                        </li>
                        <li className="text-gray-300" data-oid="h2oc_zx">
                          <span className="text-yellow-400" data-oid="_jl8jo5">
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
                      <div data-oid="byzffoy">
                        <div
                          className="flex items-start mb-2"
                          data-oid="beqrxwl"
                        >
                          <div
                            className="h-6 w-6 rounded-full bg-space-900 flex items-center justify-center text-yellow-400 mr-2"
                            data-oid="g1k1pfq"
                          >
                            <i
                              className={`fas ${TRADES.find((t) => t.id === selectedTrade)?.icon || "fa-hard-hat"} text-xs`}
                              data-oid="rbb_047"
                            ></i>
                          </div>
                          <p className="text-sm text-white" data-oid="c41:2xz">
                            {TRADES.find((t) => t.id === selectedTrade)?.name ||
                              "Selected trade"}{" "}
                            operations moderately affected by current weather.
                          </p>
                        </div>
                        <ul
                          className="pl-8 text-sm space-y-1.5"
                          data-oid="r:sbh6n"
                        >
                          <li className="text-gray-300" data-oid="7ayjn7i">
                            <span
                              className="text-yellow-400"
                              data-oid="-p-s8mg"
                            >
                              •
                            </span>{" "}
                            Consider adjusting outdoor work schedule due to rain
                          </li>
                          <li className="text-gray-300" data-oid="4v_pq71">
                            <span className="text-green-400" data-oid="m-8b3.2">
                              •
                            </span>{" "}
                            Indoor operations can continue as scheduled
                          </li>
                          <li className="text-gray-300" data-oid="-3k5oda">
                            <span
                              className="text-yellow-400"
                              data-oid="2m:hs1h"
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
                    data-oid="2mjflz7"
                  >
                    <h5
                      className="text-xs font-medium text-electric mb-1.5"
                      data-oid="75k9pz2"
                    >
                      Productivity Impact Analysis
                    </h5>
                    <div
                      className="flex justify-between items-center mb-1.5"
                      data-oid="qv:s2h_"
                    >
                      <span className="text-xs text-white" data-oid="2a8h.21">
                        Estimated productivity impact:
                      </span>
                      <span
                        className="text-xs font-medium text-yellow-400"
                        data-oid="mqc2y3f"
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
                      data-oid="en9o5x3"
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
                        data-oid="y8c_at."
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div
                className="mt-3 flex justify-between items-center"
                data-oid="fvsq3jl"
              >
                <span className="text-xs text-gray-400" data-oid="sevvi.x">
                  <i className="fas fa-clock mr-1" data-oid="zvuxqhs"></i>{" "}
                  Updated just now
                </span>
                <button
                  className="text-xs bg-electric/20 hover:bg-electric/30 text-electric hover:text-white px-2.5 py-1 rounded transition-colors"
                  data-oid="x3n3:7x"
                >
                  <i
                    className="fas fa-file-download mr-1"
                    data-oid="cibn8g."
                  ></i>{" "}
                  Export Report
                </button>
              </div>
            </div>

            {/* Current job impact */}
            <div
              className="mt-5 bg-space-800/60 rounded-lg p-4 border-l-4 border-electric"
              data-oid="y7490.h"
            >
              <h4
                className="text-sm font-medium text-white mb-2"
                data-oid="x34de12"
              >
                Current Job Impact: {currentJob.name}
              </h4>
              <p className="text-sm text-gray-300" data-oid="djl8xs_">
                {detailedImpact.summary}. Consider adjusting the schedule to
                account for weather conditions.
              </p>
              <div className="mt-3 flex justify-between" data-oid="zfc4m34">
                <span className="text-xs text-gray-400" data-oid="qs2bhg1">
                  <i className="fas fa-clock mr-1" data-oid="33yng.z"></i>{" "}
                  Updated 10 mins ago
                </span>
                <button
                  className="text-xs text-electric hover:text-cyan-400 transition-colors"
                  data-oid="ui.9e.g"
                >
                  View detailed report{" "}
                  <i
                    className="fas fa-chevron-right ml-1"
                    data-oid="jh962p-"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Material Advisory Tab */}
        {activeTab === "material" && (
          <div data-oid="mzog80d">
            <div className="grid grid-cols-1 gap-3" data-oid="qnw:58q">
              {materialImpacts.map((material, index) => (
                <div
                  key={index}
                  className="bg-space-900/40 rounded-lg p-3 flex items-start"
                  data-oid="brll6b3"
                >
                  <div
                    className="w-10 h-10 rounded-full bg-space-800 flex items-center justify-center text-electric mr-3 mt-1"
                    data-oid="dn-iddg"
                  >
                    <i
                      className={`fas ${material.icon}`}
                      data-oid="341qs.s"
                    ></i>
                  </div>
                  <div className="flex-1" data-oid="tcmkj.w">
                    <h5
                      className="text-sm font-medium text-white"
                      data-oid="8tzw2u."
                    >
                      {material.material}
                    </h5>
                    <p
                      className="text-xs text-gray-300 mb-1"
                      data-oid="v7:_.oj"
                    >
                      {material.impact}
                    </p>
                    <div
                      className="bg-electric/10 rounded-lg p-2 border-l-2 border-electric/50"
                      data-oid="zorw-zy"
                    >
                      <p className="text-xs text-electric" data-oid="pvxpb:q">
                        <strong data-oid="1v-rypb">Mitigation:</strong>{" "}
                        {material.mitigationStrategy}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-4 p-3 bg-space-900/40 rounded-lg"
              data-oid="32yr_zg"
            >
              <h4
                className="text-sm font-medium text-white mb-2"
                data-oid="_ldr9rj"
              >
                Material Delivery Advisory
              </h4>
              <p className="text-xs text-gray-300" data-oid="x:2t8xl">
                <i
                  className="fas fa-truck mr-1 text-yellow-400"
                  data-oid="7xf0cu1"
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
          <div data-oid="u:r25ct">
            <div className="grid grid-cols-5 gap-2 mb-4" data-oid="tfbk1wq">
              {forecast.map((day, index) => (
                <div
                  key={index}
                  className={`bg-space-900/40 rounded-lg p-2 text-center ${index === 0 ? "border border-electric/40" : ""}`}
                  data-oid="e.:73-2"
                >
                  <div className="text-xs text-gray-400" data-oid="g5.azzc">
                    {day.day}
                  </div>
                  <div className="my-1" data-oid="-:l1ndw">
                    <i
                      className={`fas ${day.icon} ${day.icon.includes("sun") ? "text-yellow-400" : day.icon.includes("rain") ? "text-blue-400" : "text-gray-400"}`}
                      data-oid="t1ql597"
                    ></i>
                  </div>
                  <div
                    className="text-sm font-medium text-white"
                    data-oid="b7oprmy"
                  >
                    {day.temp}°C
                  </div>
                  <div
                    className="text-xs text-gray-500 mt-1"
                    data-oid="cfkfd6:"
                  >
                    {day.conditions}
                  </div>
                  <div
                    className={`text-xs mt-1 ${day.conditions.toLowerCase().includes("rain") ? "text-red-400" : "text-green-400"}`}
                    data-oid="bblbz4_"
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
              data-oid="3c2tha1"
            >
              <h4
                className="text-sm font-medium text-white mb-2"
                data-oid="-lfsr57"
              >
                5-Day Construction Outlook
              </h4>
              <div
                className="text-xs text-gray-300 space-y-1"
                data-oid="_81pqjy"
              >
                <div data-oid="ki8o:e3">
                  <strong data-oid="-10idok">Today:</strong> Delay exterior work
                  until afternoon when rain subsides
                </div>
                <div data-oid="qph_y_q">
                  <strong data-oid="bw5ek:7">Tomorrow:</strong> Optimal
                  conditions for all work types
                </div>
                <div data-oid="lziss.d">
                  <strong data-oid="t4nthk9">Friday:</strong> Schedule exterior
                  painting and concrete pours
                </div>
                <div data-oid="3hsu595">
                  <strong data-oid="ozt08y4">Saturday:</strong> Normal
                  operations with minor wind concerns
                </div>
                <div data-oid="rbx:is5">
                  <strong data-oid="pr4oj5.">Sunday:</strong> Plan for indoor
                  work only - severe weather expected
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-space-900/40 rounded-lg p-3" data-oid="f-wrjq-">
              <div
                className="flex justify-between items-center mb-2"
                data-oid="e_fxggb"
              >
                <h4
                  className="text-sm font-medium text-white"
                  data-oid=".c5y7hr"
                >
                  Weather Alerts
                </h4>
                <span className="text-xs text-gray-400" data-oid="qpuq4g9">
                  {notifications.length} new
                </span>
              </div>
              <div
                className="space-y-2 max-h-32 overflow-y-auto"
                data-oid="6c-ktvc"
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
                    data-oid="_s4i__z"
                  >
                    <div data-oid="p0qgyri">
                      <i
                        className={`fas ${
                          notification.type === "alert"
                            ? "fa-exclamation-circle text-red-500"
                            : notification.type === "warning"
                              ? "fa-exclamation-triangle text-yellow-500"
                              : "fa-info-circle text-blue-500"
                        } mr-1.5`}
                        data-oid="lungha-"
                      ></i>
                      {notification.message}
                    </div>
                    <div className="text-gray-400 ml-2" data-oid="8su-20s">
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
        data-oid="h81hp_8"
      >
        <div className="text-xs text-gray-400" data-oid="k4lfzm8">
          <i
            className="fas fa-sync fa-spin text-electric mr-1.5"
            data-oid="_1z2vru"
          ></i>
          Auto-refreshing every 30 minutes
        </div>
        <button
          className="bg-electric/20 hover:bg-electric/30 text-electric hover:text-white px-3 py-1 rounded-md text-xs transition-all duration-200"
          data-oid="m1ic1bi"
        >
          <i className="fas fa-bolt mr-1.5" data-oid="yv8ynvz"></i>
          Generate Mitigation Plan
        </button>
      </div>
    </GlassCard>
  );
};

export default WeatherImpactor;
