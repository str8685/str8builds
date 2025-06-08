import { FC, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { useWeather } from "@/hooks/useWeather";

// Project types for weather impact analysis
const projectTypes = [
  "Residential New Build",
  "Commercial Construction",
  "Road Construction",
  "Exterior Painting",
  "Roofing",
  "Concrete Pouring",
];

const WeatherWidget: FC = () => {
  const {
    currentWeather,
    forecast,
    location,
    weatherImpact,
    detailedImpact,
    availableLocations,
    isLoading,
    updateLocation,
    generateWeatherImpactAnalysis,
  } = useWeather();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showAnalysisOptions, setShowAnalysisOptions] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState(
    projectTypes[0],
  );
  const [analysisResult, setAnalysisResult] = useState("");

  const handleLocationChange = (newLocation: string) => {
    updateLocation(newLocation);
    setShowLocationDropdown(false);
  };

  const handleGenerateAnalysis = async () => {
    const result = await generateWeatherImpactAnalysis(selectedProjectType);
    setAnalysisResult(result);
    setShowAnalysisOptions(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-800/50 text-green-400";
      case "medium":
        return "bg-yellow-800/50 text-yellow-400";
      case "high":
        return "bg-red-800/50 text-red-400";
      default:
        return "bg-cyan-800/50 text-cyan-400";
    }
  };

  return (
    <GlassCard
      className={`p-4 transition-all duration-300 weather-widget ${isExpanded ? "col-span-2 row-span-2" : ""}`}
      data-oid="rzuwd5n"
    >
      <div className="flex justify-between items-start mb-3" data-oid="ugr:7r8">
        <h3 className="text-md font-space text-white" data-oid="ji3.djv">
          Weather Impact
        </h3>
        <div className="flex gap-2" data-oid="7:crnpe">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-teal hover:text-cyan transition-colors"
            data-oid="7m0v1nj"
          >
            <i
              className={`fas ${isExpanded ? "fa-compress-alt" : "fa-expand-alt"}`}
              data-oid="gzknata"
            ></i>
          </button>
          <span className="text-teal" data-oid="w5qiqy3">
            <i className="fas fa-cloud-sun" data-oid="oj:e6g4"></i>
          </span>
        </div>
      </div>

      <div className="relative" data-oid="8kwd_ev">
        <div
          className="flex items-center mb-3 cursor-pointer"
          onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          data-oid="ycpbim5"
        >
          <div className="text-4xl text-teal mr-3" data-oid="5tf-la5">
            <i className={`fas ${currentWeather.icon}`} data-oid="bmec5h8"></i>
          </div>
          <div className="flex-1" data-oid="crsg1_b">
            <div
              className="text-xl font-medium text-white flex items-center"
              data-oid="546pewe"
            >
              {location}
              <i
                className="fas fa-caret-down ml-2 text-sm text-gray-400"
                data-oid="6ez0p16"
              ></i>
            </div>
            <div className="text-sm text-gray-400" data-oid="1g8wetd">
              {currentWeather.description}
            </div>
          </div>
          <div className="text-2xl font-medium text-white" data-oid="garw8cq">
            {currentWeather.temp}°C
          </div>
        </div>

        {showLocationDropdown && (
          <div
            className="absolute left-0 right-0 mt-1 z-10 bg-space-800 border border-gray-700 rounded-md shadow-lg max-h-48 overflow-y-auto"
            data-oid="eb2h-fj"
          >
            {availableLocations.map((loc) => (
              <div
                key={loc}
                className="px-3 py-2 hover:bg-space-700 cursor-pointer text-white text-sm"
                onClick={() => handleLocationChange(loc)}
                data-oid=".t_ccda"
              >
                {loc}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Current Weather Details */}
      {isExpanded && (
        <div className="grid grid-cols-3 gap-2 mb-3" data-oid="yl:bn8e">
          <div
            className="bg-space-900/50 rounded-lg p-2 text-center"
            data-oid="fvnfv3c"
          >
            <div className="text-xs text-gray-400" data-oid="0c4028s">
              Humidity
            </div>
            <div className="text-sm text-white" data-oid="8wlnrgb">
              {currentWeather.humidity}%
            </div>
          </div>
          <div
            className="bg-space-900/50 rounded-lg p-2 text-center"
            data-oid="jkltmnd"
          >
            <div className="text-xs text-gray-400" data-oid="gudthzs">
              Wind
            </div>
            <div className="text-sm text-white" data-oid="49mhgip">
              {currentWeather.windSpeed} km/h {currentWeather.windDirection}
            </div>
          </div>
          <div
            className="bg-space-900/50 rounded-lg p-2 text-center"
            data-oid="-g8tyst"
          >
            <div className="text-xs text-gray-400" data-oid="k6::9n7">
              UV Index
            </div>
            <div className="text-sm text-white" data-oid="mtnifvr">
              {currentWeather.uvIndex}
            </div>
          </div>
        </div>
      )}

      {/* Weather Impact */}
      <div
        className={`py-2 px-3 mb-3 ${getSeverityColor(detailedImpact.severity)} rounded-lg cursor-pointer`}
        onClick={() => setShowAnalysisOptions(!showAnalysisOptions)}
        data-oid="rskew-v"
      >
        <div className="flex justify-between items-center" data-oid="ygu6bb8">
          <div className="text-sm font-medium mb-1" data-oid="_nw.kaw">
            Site Work Impact
          </div>
          <div
            className="text-xs rounded px-2 py-0.5 bg-space-900/80"
            data-oid="a7df.-8"
          >
            {detailedImpact.severity.toUpperCase()}
          </div>
        </div>
        <div className="text-sm text-white" data-oid="cp9:-v0">
          {weatherImpact}
        </div>

        {isExpanded && (
          <div className="mt-2 text-xs text-white/80" data-oid="cm2kiv8">
            <div className="font-medium mb-1" data-oid="wvgw6s2">
              Affected Sites:
            </div>
            <ul className="list-disc list-inside" data-oid="mrs3dzw">
              {detailedImpact.affectedSites.map((site, idx) => (
                <li key={idx} data-oid="k.fa4u:">
                  {site}
                </li>
              ))}
            </ul>

            <div className="font-medium mt-2 mb-1" data-oid="l5hc_z.">
              Material Impacts:
            </div>
            <div className="grid grid-cols-2 gap-1" data-oid="mbc:b_g">
              {detailedImpact.materialImpacts.map((impact, idx) => (
                <div
                  key={idx}
                  className="bg-space-900/30 rounded p-1"
                  data-oid="qm81:mu"
                >
                  <span className="font-medium" data-oid="6-1l6vk">
                    {impact.type}:
                  </span>{" "}
                  {impact.effect}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Analysis Options */}
      {showAnalysisOptions && (
        <div className="mb-3 p-3 bg-space-900/50 rounded-lg" data-oid="sgngefj">
          <div
            className="text-sm font-medium text-white mb-2"
            data-oid="6-kzdf1"
          >
            Generate Impact Analysis
          </div>
          <div className="flex flex-col space-y-2" data-oid="i-5ikt8">
            <select
              value={selectedProjectType}
              onChange={(e) => setSelectedProjectType(e.target.value)}
              className="w-full bg-space-800 text-white border border-gray-700 rounded p-2 text-sm"
              data-oid="la-hkth"
            >
              {projectTypes.map((type) => (
                <option key={type} value={type} data-oid="7mo-i4i">
                  {type}
                </option>
              ))}
            </select>
            <button
              onClick={handleGenerateAnalysis}
              disabled={isLoading}
              className="w-full bg-purple-900 text-cyan py-1.5 px-3 rounded hover:bg-purple-800 text-sm"
              data-oid="n9sq_0h"
            >
              {isLoading ? "Generating..." : "Analyze Weather Impact"}
            </button>
          </div>
        </div>
      )}

      {/* Analysis Result */}
      {analysisResult && isExpanded && (
        <div
          className="mb-3 p-3 bg-space-900/50 rounded-lg max-h-40 overflow-y-auto"
          data-oid="jcsn-d1"
        >
          <div
            className="text-sm font-medium text-cyan mb-1"
            data-oid="7vnsd9q"
          >
            Weather Impact Analysis
          </div>
          <div
            className="text-xs text-white whitespace-pre-line"
            data-oid="cwn:kk5"
          >
            {analysisResult}
          </div>
        </div>
      )}

      {/* Forecast */}
      <div className="flex justify-between overflow-x-auto" data-oid="n7mw5cm">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="text-center flex-1 min-w-[60px]"
            data-oid="pv3izs5"
          >
            <div className="text-xs text-gray-400" data-oid="nj58ykv">
              {day.day}
            </div>
            <div className="text-lg text-white" data-oid="9o1tj4g">
              {day.temp}°C
            </div>
            <div className="text-xs" data-oid="s2vpqo7">
              <i className={`fas ${day.icon}`} data-oid="6e-in:5"></i>
            </div>
            {isExpanded && (
              <>
                <div className="text-xs text-gray-400 mt-1" data-oid="snhablq">
                  {day.conditions}
                </div>
                <div className="text-xs text-gray-400" data-oid="4upqlhd">
                  {day.windSpeed} km/h
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default WeatherWidget;
