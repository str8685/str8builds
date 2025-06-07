import React, { FC } from "react";

interface ConstructionLoaderProps {
  message?: string;
  size?: "small" | "medium" | "large";
  fullScreen?: boolean;
}

const ConstructionLoader: FC<ConstructionLoaderProps> = ({
  message = "Building in progress...",
  size = "medium",
  fullScreen = false,
}) => {
  // Determine size classes
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-16 h-16";
      case "large":
        return "w-32 h-32";
      case "medium":
      default:
        return "w-24 h-24";
    }
  };

  // Get text size based on loader size
  const getTextSize = () => {
    switch (size) {
      case "small":
        return "text-xs";
      case "large":
        return "text-lg";
      case "medium":
      default:
        return "text-sm";
    }
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 flex flex-col items-center justify-center z-50 bg-space-950/90"
    : "flex flex-col items-center justify-center";

  return (
    <div className={containerClasses} data-oid="kifq4rz">
      <div className={`relative ${getSizeClasses()}`} data-oid="5iqs229">
        {/* Construction Site Animation */}
        <div
          className="absolute inset-0 flex flex-col items-center"
          data-oid="u:ggxiu"
        >
          {/* Crane Arm */}
          <div
            className="w-1 h-16 bg-yellow-500 origin-bottom animate-[swing_4s_ease-in-out_infinite] absolute top-0 left-1/2 transform -translate-x-1/2"
            data-oid="wf3.fx6"
          >
            <div
              className="w-12 h-1 bg-yellow-500 absolute top-0 left-0 transform -translate-x-1/2"
              data-oid="xuiwz8r"
            ></div>
            <div
              className="w-3 h-3 rounded-full bg-red-500 absolute -top-1.5 -right-1.5 animate-pulse"
              data-oid="j0il7o8"
            ></div>
            <div
              className="w-2 h-6 bg-gray-300 absolute top-0 right-0 transform translate-x-full animate-[lower_4s_ease-in-out_infinite]"
              data-oid="9:ljvq_"
            ></div>
          </div>

          {/* Building Base */}
          <div
            className="w-20 h-8 bg-teal-900/30 backdrop-blur-sm rounded-md border border-teal-500/30 absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-end justify-center overflow-hidden"
            data-oid="ei_g:ex"
          >
            <div
              className="absolute bottom-0 left-0 w-full h-full flex items-end"
              data-oid="ktr8yv5"
            >
              <div
                className="h-4 w-full bg-cyan-500/20 border-t border-cyan-500/40 relative animate-[build_8s_ease-in-out_infinite]"
                data-oid="3o-vdwg"
              >
                <div
                  className="absolute top-0 left-0 w-full h-full grid grid-cols-4 gap-px"
                  data-oid="6cdxs01"
                >
                  <div className="bg-cyan-500/20" data-oid="63oytlt"></div>
                  <div className="bg-cyan-500/20" data-oid="wo:s9p8"></div>
                  <div className="bg-cyan-500/20" data-oid="qgn1d3-"></div>
                  <div className="bg-cyan-500/20" data-oid="b3d1oj8"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Construction Worker */}
          <div
            className="absolute bottom-8 right-0 animate-[walk_8s_linear_infinite]"
            data-oid="a1j237z"
          >
            <div
              className="w-3 h-4 bg-orange-500 rounded-t-full relative flex flex-col items-center"
              data-oid="nf-w6qt"
            >
              <div
                className="w-2 h-1 bg-yellow-300 absolute -top-1 rounded-full"
                data-oid="-ggzha."
              ></div>{" "}
              {/* Helmet */}
              <div
                className="w-4 h-2 bg-blue-600 absolute top-4"
                data-oid="4j8_5v2"
              ></div>{" "}
              {/* Body */}
              <div
                className="w-1 h-2 bg-blue-600 absolute top-6 left-0.5 animate-[legMove_0.6s_ease-in-out_infinite]"
                data-oid="t6jzt21"
              ></div>{" "}
              {/* Left Leg */}
              <div
                className="w-1 h-2 bg-blue-600 absolute top-6 right-0.5 animate-[legMove_0.6s_ease-in-out_infinite_0.3s]"
                data-oid="6hzp72u"
              ></div>{" "}
              {/* Right Leg */}
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`mt-4 text-cyan-400 font-medium ${getTextSize()} text-center flex items-center space-x-1`}
          data-oid="tlb5sr8"
        >
          <span className="animate-pulse" data-oid="z2oo1.t">
            {message}
          </span>
          <span
            className="animate-[ellipsis_1.5s_steps(4,end)_infinite] inline-block overflow-hidden w-4"
            data-oid="j9hpsc9"
          >
            ...
          </span>
        </div>
      )}
    </div>
  );
};

export default ConstructionLoader;
