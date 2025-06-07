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
      data-oid="5m3zyp-"
    >
      <div className="flex justify-between items-start mb-3" data-oid="j8o_nk.">
        <h3 className="text-md font-space text-white" data-oid="egyjd7q">
          Weather Impact
        </h3>
        <div className="flex gap-2" data-oid="euoucha">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-teal hover:text-cyan transition-colors"
            data-oid="p0nb3gv"
          >
            <i
              className={`fas ${isExpanded ? "fa-compress-alt" : "fa-expand-alt"}`}
              data-oid="08qj._o"
            ></i>
          </button>
          <span className="text-teal" data-oid="cig9pk5">
            <i className="fas fa-cloud-sun" data-oid="re00:b_"></i>
          </span>
        </div>
      </div>

      <div className="relative" data-oid="45pkm4.">
        <div
          className="flex items-center mb-3 cursor-pointer"
          onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          data-oid="f0aq_05"
        >
          <div className="text-4xl text-teal mr-3" data-oid="4mzc7ae">
            <i className={`fas ${currentWeather.icon}`} data-oid="wkn:1nk"></i>
          </div>
          <div className="flex-1" data-oid="vpggbrq">
            <div
              className="text-xl font-medium text-white flex items-center"
              data-oid="g4yc2a3"
            >
              {location}
              <i
                className="fas fa-caret-down ml-2 text-sm text-gray-400"
                data-oid="axindr2"
              ></i>
            </div>
            <div className="text-sm text-gray-400" data-oid="q:0o17t">
              {currentWeather.description}
            </div>
          </div>
          <div className="text-2xl font-medium text-white" data-oid="a3fqoz:">
            {currentWeather.temp}°C
          </div>
        </div>

        {showLocationDropdown && (
          <div
            className="absolute left-0 right-0 mt-1 z-10 bg-space-800 border border-gray-700 rounded-md shadow-lg max-h-48 overflow-y-auto"
            data-oid="2ezen:y"
          >
            {availableLocations.map((loc) => (
              <div
                key={loc}
                className="px-3 py-2 hover:bg-space-700 cursor-pointer text-white text-sm"
                onClick={() => handleLocationChange(loc)}
                data-oid="41vz4-k"
              >
                {loc}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Current Weather Details */}
      {isExpanded && (
        <div className="grid grid-cols-3 gap-2 mb-3" data-oid="pl_vys3">
          <div
            className="bg-space-900/50 rounded-lg p-2 text-center"
            data-oid="qu3.gwp"
          >
            <div className="text-xs text-gray-400" data-oid="vxb4t29">
              Humidity
            </div>
            <div className="text-sm text-white" data-oid="-al2itv">
              {currentWeather.humidity}%
            </div>
          </div>
          <div
            className="bg-space-900/50 rounded-lg p-2 text-center"
            data-oid="jiukytv"
          >
            <div className="text-xs text-gray-400" data-oid="xfp-niw">
              Wind
            </div>
            <div className="text-sm text-white" data-oid="ccwbry9">
              {currentWeather.windSpeed} km/h {currentWeather.windDirection}
            </div>
          </div>
          <div
            className="bg-space-900/50 rounded-lg p-2 text-center"
            data-oid="4nwsa7u"
          >
            <div className="text-xs text-gray-400" data-oid="mut2cnq">
              UV Index
            </div>
            <div className="text-sm text-white" data-oid="wry9yo6">
              {currentWeather.uvIndex}
            </div>
          </div>
        </div>
      )}

      {/* Weather Impact */}
      <div
        className={`py-2 px-3 mb-3 ${getSeverityColor(detailedImpact.severity)} rounded-lg cursor-pointer`}
        onClick={() => setShowAnalysisOptions(!showAnalysisOptions)}
        data-oid="mcihlus"
      >
        <div className="flex justify-between items-center" data-oid="n5tsa85">
          <div className="text-sm font-medium mb-1" data-oid="dipzc04">
            Site Work Impact
          </div>
          <div
            className="text-xs rounded px-2 py-0.5 bg-space-900/80"
            data-oid="33yhk8q"
          >
            {detailedImpact.severity.toUpperCase()}
          </div>
        </div>
        <div className="text-sm text-white" data-oid="a919:o4">
          {weatherImpact}
        </div>

        {isExpanded && (
          <div className="mt-2 text-xs text-white/80" data-oid="1auy5vu">
            <div className="font-medium mb-1" data-oid="eg9.gsu">
              Affected Sites:
            </div>
            <ul className="list-disc list-inside" data-oid="t5h5df0">
              {detailedImpact.affectedSites.map((site, idx) => (
                <li key={idx} data-oid="xo5_9z0">
                  {site}
                </li>
              ))}
            </ul>

            <div className="font-medium mt-2 mb-1" data-oid="h-u3jx0">
              Material Impacts:
            </div>
            <div className="grid grid-cols-2 gap-1" data-oid="plwqv:x">
              {detailedImpact.materialImpacts.map((impact, idx) => (
                <div
                  key={idx}
                  className="bg-space-900/30 rounded p-1"
                  data-oid="r16xrc5"
                >
                  <span className="font-medium" data-oid="d3g4hb1">
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
        <div className="mb-3 p-3 bg-space-900/50 rounded-lg" data-oid="61kjh83">
          <div
            className="text-sm font-medium text-white mb-2"
            data-oid="lixq9tk"
          >
            Generate Impact Analysis
          </div>
          <div className="flex flex-col space-y-2" data-oid="0r-nhvg">
            <select
              value={selectedProjectType}
              onChange={(e) => setSelectedProjectType(e.target.value)}
              className="w-full bg-space-800 text-white border border-gray-700 rounded p-2 text-sm"
              data-oid="sz-4ls1"
            >
              {projectTypes.map((type) => (
                <option key={type} value={type} data-oid="yhlo::m">
                  {type}
                </option>
              ))}
            </select>
            <button
              onClick={handleGenerateAnalysis}
              disabled={isLoading}
              className="w-full bg-purple-900 text-cyan py-1.5 px-3 rounded hover:bg-purple-800 text-sm"
              data-oid="p:zazp9"
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
          data-oid="b-i:uw:"
        >
          <div
            className="text-sm font-medium text-cyan mb-1"
            data-oid="p6gb4y1"
          >
            Weather Impact Analysis
          </div>
          <div
            className="text-xs text-white whitespace-pre-line"
            data-oid="u2e2gm4"
          >
            {analysisResult}
          </div>
        </div>
      )}

      {/* Forecast */}
      <div className="flex justify-between overflow-x-auto" data-oid="si8b060">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="text-center flex-1 min-w-[60px]"
            data-oid="6gvjs38"
          >
            <div className="text-xs text-gray-400" data-oid="cdfm5ou">
              {day.day}
            </div>
            <div className="text-lg text-white" data-oid="lo4xdhm">
              {day.temp}°C
            </div>
            <div className="text-xs" data-oid="5s734e5">
              <i className={`fas ${day.icon}`} data-oid="z:ttw2b"></i>
            </div>
            {isExpanded && (
              <>
                <div className="text-xs text-gray-400 mt-1" data-oid="coq.glb">
                  {day.conditions}
                </div>
                <div className="text-xs text-gray-400" data-oid="bp.:xvs">
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
