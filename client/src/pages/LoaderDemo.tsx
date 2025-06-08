import React, { useState } from "react";
import ConstructionLoader from "@/components/loaders/ConstructionLoader";
import GlassCard from "@/components/ui/GlassCard";

const LoaderDemo = () => {
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [message, setMessage] = useState("Building in progress...");
  const [fullScreen, setFullScreen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <main className="flex flex-col p-6 min-h-screen" data-oid="6n592-s">
      <h1
        className="text-2xl md:text-3xl font-bold text-white mb-6"
        data-oid="_sfudp:"
      >
        Construction Loader Demo
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-oid="j1-y10m">
        <GlassCard
          className="p-6 h-[400px] flex items-center justify-center"
          data-oid="7wvz2cj"
        >
          {isVisible && (
            <ConstructionLoader
              size={size}
              message={message}
              fullScreen={fullScreen}
              data-oid="1:9oi4z"
            />
          )}
        </GlassCard>

        <GlassCard className="p-6" data-oid="_duoltg">
          <h2 className="text-xl font-bold text-white mb-4" data-oid="0vcy.gp">
            Loader Settings
          </h2>

          <div className="space-y-4" data-oid="e9m4mtl">
            <div data-oid="4a4.p2g">
              <label
                className="block text-sm text-gray-400 mb-1"
                data-oid="qnabbtb"
              >
                Size
              </label>
              <div className="flex space-x-2" data-oid="lbv.dal">
                <button
                  className={`px-4 py-2 rounded ${size === "small" ? "bg-electric text-white" : "bg-space-800 text-gray-300"}`}
                  onClick={() => setSize("small")}
                  data-oid="x2qtquq"
                >
                  Small
                </button>
                <button
                  className={`px-4 py-2 rounded ${size === "medium" ? "bg-electric text-white" : "bg-space-800 text-gray-300"}`}
                  onClick={() => setSize("medium")}
                  data-oid=":4hjfb1"
                >
                  Medium
                </button>
                <button
                  className={`px-4 py-2 rounded ${size === "large" ? "bg-electric text-white" : "bg-space-800 text-gray-300"}`}
                  onClick={() => setSize("large")}
                  data-oid="onjm3ub"
                >
                  Large
                </button>
              </div>
            </div>

            <div data-oid="y0be4np">
              <label
                className="block text-sm text-gray-400 mb-1"
                data-oid="3h85z8b"
              >
                Message
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-space-800 border border-gray-700 rounded-md p-2 text-white"
                data-oid="53uzt.e"
              />
            </div>

            <div className="flex items-center space-x-2" data-oid="p7yk4c1">
              <input
                type="checkbox"
                id="fullscreen"
                checked={fullScreen}
                onChange={(e) => setFullScreen(e.target.checked)}
                className="h-4 w-4 bg-space-800 border border-gray-700 rounded"
                data-oid="-kuh7:l"
              />

              <label
                htmlFor="fullscreen"
                className="text-gray-300"
                data-oid="8rfbbrz"
              >
                Fullscreen Mode
              </label>
            </div>

            <div className="flex items-center space-x-2" data-oid="q-:9er4">
              <input
                type="checkbox"
                id="visible"
                checked={isVisible}
                onChange={(e) => setIsVisible(e.target.checked)}
                className="h-4 w-4 bg-space-800 border border-gray-700 rounded"
                data-oid="gwk5stc"
              />

              <label
                htmlFor="visible"
                className="text-gray-300"
                data-oid="w3b4yco"
              >
                Show Loader
              </label>
            </div>

            <button
              className="mt-4 w-full py-2 rounded-md bg-electric text-white btn-glow btn-glow-cyan"
              onClick={() => {
                setFullScreen(true);
                setTimeout(() => setFullScreen(false), 3000);
              }}
              data-oid="i1f5t97"
            >
              Show Fullscreen for 3 seconds
            </button>
          </div>
        </GlassCard>
      </div>

      <div className="mt-6" data-oid="gns.:uo">
        <GlassCard className="p-6" data-oid="ekia7h_">
          <h2 className="text-xl font-bold text-white mb-4" data-oid="axq7ok3">
            Usage Example
          </h2>
          <pre
            className="bg-space-900 p-4 rounded-md overflow-x-auto text-cyan-400"
            data-oid="3fm:enx"
          >
            {`// Import the component
import ConstructionLoader from '@/components/loaders/ConstructionLoader';

// Use in loading state
{isLoading && (
  <ConstructionLoader 
    size="medium"
    message="Building your project..." 
    fullScreen={true}
  />
)}`}
          </pre>
        </GlassCard>
      </div>
    </main>
  );
};

export default LoaderDemo;
