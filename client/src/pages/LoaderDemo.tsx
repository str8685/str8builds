import React, { useState } from "react";
import ConstructionLoader from "@/components/loaders/ConstructionLoader";
import GlassCard from "@/components/ui/GlassCard";

const LoaderDemo = () => {
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [message, setMessage] = useState("Building in progress...");
  const [fullScreen, setFullScreen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <main className="flex flex-col p-6 min-h-screen" data-oid="_zf.c75">
      <h1
        className="text-2xl md:text-3xl font-bold text-white mb-6"
        data-oid="kje96v9"
      >
        Construction Loader Demo
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-oid="je3t3yt">
        <GlassCard
          className="p-6 h-[400px] flex items-center justify-center"
          data-oid="dj.6f:5"
        >
          {isVisible && (
            <ConstructionLoader
              size={size}
              message={message}
              fullScreen={fullScreen}
              data-oid="35yr3ws"
            />
          )}
        </GlassCard>

        <GlassCard className="p-6" data-oid="0ydt0g7">
          <h2 className="text-xl font-bold text-white mb-4" data-oid="tryrxit">
            Loader Settings
          </h2>

          <div className="space-y-4" data-oid="sd2bcd-">
            <div data-oid="v0pl6qp">
              <label
                className="block text-sm text-gray-400 mb-1"
                data-oid="kr-7fg:"
              >
                Size
              </label>
              <div className="flex space-x-2" data-oid="akk9s5f">
                <button
                  className={`px-4 py-2 rounded ${size === "small" ? "bg-electric text-white" : "bg-space-800 text-gray-300"}`}
                  onClick={() => setSize("small")}
                  data-oid=".yc-9:-"
                >
                  Small
                </button>
                <button
                  className={`px-4 py-2 rounded ${size === "medium" ? "bg-electric text-white" : "bg-space-800 text-gray-300"}`}
                  onClick={() => setSize("medium")}
                  data-oid="rti8akf"
                >
                  Medium
                </button>
                <button
                  className={`px-4 py-2 rounded ${size === "large" ? "bg-electric text-white" : "bg-space-800 text-gray-300"}`}
                  onClick={() => setSize("large")}
                  data-oid="63g_om:"
                >
                  Large
                </button>
              </div>
            </div>

            <div data-oid="deezj7i">
              <label
                className="block text-sm text-gray-400 mb-1"
                data-oid=".cl2utl"
              >
                Message
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-space-800 border border-gray-700 rounded-md p-2 text-white"
                data-oid="sp8wrsp"
              />
            </div>

            <div className="flex items-center space-x-2" data-oid="akojvt9">
              <input
                type="checkbox"
                id="fullscreen"
                checked={fullScreen}
                onChange={(e) => setFullScreen(e.target.checked)}
                className="h-4 w-4 bg-space-800 border border-gray-700 rounded"
                data-oid="ax9dknd"
              />

              <label
                htmlFor="fullscreen"
                className="text-gray-300"
                data-oid="48f.l3o"
              >
                Fullscreen Mode
              </label>
            </div>

            <div className="flex items-center space-x-2" data-oid="a_815jq">
              <input
                type="checkbox"
                id="visible"
                checked={isVisible}
                onChange={(e) => setIsVisible(e.target.checked)}
                className="h-4 w-4 bg-space-800 border border-gray-700 rounded"
                data-oid="52ych9v"
              />

              <label
                htmlFor="visible"
                className="text-gray-300"
                data-oid="74pbmyi"
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
              data-oid="vpr5cxu"
            >
              Show Fullscreen for 3 seconds
            </button>
          </div>
        </GlassCard>
      </div>

      <div className="mt-6" data-oid="v.8h-15">
        <GlassCard className="p-6" data-oid="ea837n2">
          <h2 className="text-xl font-bold text-white mb-4" data-oid="35zmkfy">
            Usage Example
          </h2>
          <pre
            className="bg-space-900 p-4 rounded-md overflow-x-auto text-cyan-400"
            data-oid="bd5gtna"
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
