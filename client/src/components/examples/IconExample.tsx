import React, { useState } from "react";
import HelpCircleIcon from "../icons/HelpCircleIcon";

const IconExample: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-space-950 text-white p-8"
      data-oid="zy.o_r0"
    >
      <h1 className="text-2xl font-bold mb-8 text-cyan-300" data-oid="ve9erho">
        Help Circle Icon Examples
      </h1>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-oid="e.2i_g5"
      >
        {/* Basic Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="z.676mh"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="g8zhwqo">
            Basic Example
          </h2>
          <div className="flex items-center gap-2" data-oid="0ot_rz0">
            <HelpCircleIcon data-oid="58:wwh5" />
            <span data-oid="c10wh4r">Default Help Icon</span>
          </div>
        </div>

        {/* Interactive Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid=".cfs:kb"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="5tu8yjr">
            Interactive Example
          </h2>
          <div className="flex flex-col gap-4" data-oid="3atwiq4">
            <div className="flex items-center gap-2" data-oid="t7ejfio">
              <HelpCircleIcon
                onClick={() => alert("Help icon clicked!")}
                color="#4FEBFF"
                data-oid="umwy-ri"
              />

              <span data-oid="btd:1.z">Click for alert</span>
            </div>

            {/* Click counter example */}
            <ClickCounter data-oid="nsy4::-" />
          </div>
        </div>

        {/* Color Variants Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="w8tayel"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="kuplj:.">
            Color Variants
          </h2>
          <div className="flex flex-col gap-4" data-oid="xu7y:o1">
            <div className="flex items-center gap-2" data-oid="fg3vkw-">
              <HelpCircleIcon color="#4FEBFF" data-oid="3z6knm2" />
              <span data-oid="ox3iwuh">Cyan</span>
            </div>
            <div className="flex items-center gap-2" data-oid=".8-bjdf">
              <HelpCircleIcon color="#6366f1" data-oid="vynosx." />
              <span data-oid="db8e.82">Indigo</span>
            </div>
            <div className="flex items-center gap-2" data-oid="nq_mch:">
              <HelpCircleIcon color="#F471B5" data-oid="oyqcqek" />
              <span data-oid="v76kgm4">Pink</span>
            </div>
          </div>
        </div>

        {/* Sizes Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="e9zzt.c"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="8yyjs4q">
            Different Sizes
          </h2>
          <div className="flex items-center gap-4" data-oid="0bjmsjh">
            <HelpCircleIcon size={16} data-oid="q9.vguw" />
            <HelpCircleIcon size={24} data-oid="9t8f_30" />
            <HelpCircleIcon size={32} data-oid="atwq:77" />
            <HelpCircleIcon size={40} data-oid="7i23zyh" />
          </div>
        </div>

        {/* Interactive Icons */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="u97w6ho"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="uoc_0gm">
            Click Test
          </h2>
          <div className="flex flex-col gap-4" data-oid=".p03:47">
            <div className="flex items-center gap-4" data-oid="k:ejih4">
              <HelpCircleIcon
                onClick={() => alert("Icon 1 clicked!")}
                color="#4FEBFF"
                size={24}
                data-oid="lo497fi"
              />

              <HelpCircleIcon
                onClick={() => alert("Icon 2 clicked!")}
                color="#6366f1"
                size={24}
                data-oid="x72ve2j"
              />

              <HelpCircleIcon
                onClick={() => alert("Icon 3 clicked!")}
                color="#F471B5"
                size={24}
                data-oid="r7qgbt8"
              />
            </div>
            <div className="text-xs text-gray-400 mt-2" data-oid="1hx7h_9">
              Click any icon above to trigger an alert
            </div>

            {/* Guaranteed clickable fallback */}
            <div
              className="mt-4 p-3 bg-space-800 rounded-lg"
              data-oid="i2e2hc8"
            >
              <h3 className="text-sm font-medium mb-2" data-oid="zh05t3:">
                Fallback Click Test
              </h3>
              <div className="flex items-center gap-2" data-oid="o0kdd2t">
                <button
                  className="px-3 py-1 bg-cyan-900/50 hover:bg-cyan-800/50 rounded-md text-sm flex items-center gap-2"
                  onClick={() => alert("Regular HTML button clicked!")}
                  data-oid="ozmwoua"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4FEBFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    data-oid="a95o_h5"
                  >
                    <circle cx="12" cy="12" r="10" data-oid="p2v8jo9"></circle>
                    <path
                      d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
                      data-oid="6a6--wt"
                    ></path>
                    <path d="M12 17h.01" data-oid="y0o45f7"></path>
                  </svg>
                  <span data-oid=".g.2caq">Plain HTML Button</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="o9nn-j4"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="he41os1">
            In Button Example
          </h2>
          <div className="flex items-center gap-2" data-oid="8886rjq">
            <button
              className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 hover:from-cyan-800/50 hover:to-blue-800/50 px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 border border-cyan-700/30"
              onClick={() => alert("Button with icon clicked!")}
              data-oid="l:wulok"
            >
              <span data-oid=".i-.kt9">Need Help?</span>
              <HelpCircleIcon size={20} data-oid="0ofl319" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Interactive click counter component to demonstrate click functionality
const ClickCounter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div
      className="flex items-center gap-2 mt-4 p-3 bg-space-800 rounded-lg"
      data-oid="v1oxr8r"
    >
      <div className="flex items-center gap-2" data-oid="m:x_kr0">
        <HelpCircleIcon
          onClick={() => setCount((prev) => prev + 1)}
          color="#F471B5"
          size={24}
          data-oid="msjf2m6"
        />

        <div className="flex flex-col" data-oid="ieooxjo">
          <span data-oid="m534ykg">
            Click counter:{" "}
            <strong className="text-cyan-300" data-oid="_vbasq:">
              {count}
            </strong>
          </span>
          <span className="text-xs text-gray-400" data-oid="f9hu4.v">
            Click the icon to increment
          </span>
        </div>
      </div>

      {/* Regular button for comparison */}
      <button
        className="ml-auto px-3 py-1 bg-cyan-900/50 hover:bg-cyan-800/50 rounded-md text-sm"
        onClick={() => setCount(0)}
        data-oid="i77-v8d"
      >
        Reset
      </button>
    </div>
  );
};

export default IconExample;
