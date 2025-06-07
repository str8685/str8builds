import React, { useState } from "react";
import HelpCircleIcon from "../icons/HelpCircleIcon";

const IconExample: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-space-950 text-white p-8"
      data-oid="o__7ru:"
    >
      <h1 className="text-2xl font-bold mb-8 text-cyan-300" data-oid="u0f3md.">
        Help Circle Icon Examples
      </h1>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-oid="9tend4."
      >
        {/* Basic Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="m0o-rna"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="dm0riqq">
            Basic Example
          </h2>
          <div className="flex items-center gap-2" data-oid="h:ngc93">
            <HelpCircleIcon data-oid="59ud-v2" />
            <span data-oid="qvda43-">Default Help Icon</span>
          </div>
        </div>

        {/* Interactive Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="q8947kf"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="s8rgz--">
            Interactive Example
          </h2>
          <div className="flex flex-col gap-4" data-oid="4tdwau.">
            <div className="flex items-center gap-2" data-oid="cwvp-t0">
              <HelpCircleIcon
                onClick={() => alert("Help icon clicked!")}
                color="#4FEBFF"
                data-oid="edqmck3"
              />

              <span data-oid="fjiqfuo">Click for alert</span>
            </div>

            {/* Click counter example */}
            <ClickCounter data-oid="c5gv4y-" />
          </div>
        </div>

        {/* Color Variants Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid=".iee_tz"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="ieab9d6">
            Color Variants
          </h2>
          <div className="flex flex-col gap-4" data-oid="q4jpii:">
            <div className="flex items-center gap-2" data-oid="a9f832r">
              <HelpCircleIcon color="#4FEBFF" data-oid="db-gudy" />
              <span data-oid="jbf5:92">Cyan</span>
            </div>
            <div className="flex items-center gap-2" data-oid="n_k_cah">
              <HelpCircleIcon color="#6366f1" data-oid="kebyqlp" />
              <span data-oid="d48nkm-">Indigo</span>
            </div>
            <div className="flex items-center gap-2" data-oid="2w44tun">
              <HelpCircleIcon color="#F471B5" data-oid="rcdnbv." />
              <span data-oid=".5vj2.8">Pink</span>
            </div>
          </div>
        </div>

        {/* Sizes Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid=":v2id6c"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="b1d3_pg">
            Different Sizes
          </h2>
          <div className="flex items-center gap-4" data-oid="v7ezsys">
            <HelpCircleIcon size={16} data-oid="6.r0lys" />
            <HelpCircleIcon size={24} data-oid="i_ohv2j" />
            <HelpCircleIcon size={32} data-oid="n4qe-ik" />
            <HelpCircleIcon size={40} data-oid="sczgs89" />
          </div>
        </div>

        {/* Interactive Icons */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="b-7ua09"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="ma0g8pu">
            Click Test
          </h2>
          <div className="flex flex-col gap-4" data-oid="h5d4nah">
            <div className="flex items-center gap-4" data-oid="idvqqv5">
              <HelpCircleIcon
                onClick={() => alert("Icon 1 clicked!")}
                color="#4FEBFF"
                size={24}
                data-oid="ppu.7zw"
              />

              <HelpCircleIcon
                onClick={() => alert("Icon 2 clicked!")}
                color="#6366f1"
                size={24}
                data-oid="eivfwca"
              />

              <HelpCircleIcon
                onClick={() => alert("Icon 3 clicked!")}
                color="#F471B5"
                size={24}
                data-oid="zt-qbwo"
              />
            </div>
            <div className="text-xs text-gray-400 mt-2" data-oid="nf1sgjc">
              Click any icon above to trigger an alert
            </div>

            {/* Guaranteed clickable fallback */}
            <div
              className="mt-4 p-3 bg-space-800 rounded-lg"
              data-oid="kafodc1"
            >
              <h3 className="text-sm font-medium mb-2" data-oid="hfjh1br">
                Fallback Click Test
              </h3>
              <div className="flex items-center gap-2" data-oid="wl3wnkt">
                <button
                  className="px-3 py-1 bg-cyan-900/50 hover:bg-cyan-800/50 rounded-md text-sm flex items-center gap-2"
                  onClick={() => alert("Regular HTML button clicked!")}
                  data-oid="szli5sh"
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
                    data-oid="9pz.xvo"
                  >
                    <circle cx="12" cy="12" r="10" data-oid="zg.oi91"></circle>
                    <path
                      d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
                      data-oid="_ntqrje"
                    ></path>
                    <path d="M12 17h.01" data-oid="wycl-o_"></path>
                  </svg>
                  <span data-oid="r.b5os6">Plain HTML Button</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="hbcczct"
        >
          <h2 className="text-lg font-medium mb-4" data-oid=".xx1paw">
            In Button Example
          </h2>
          <div className="flex items-center gap-2" data-oid="kmm3vf8">
            <button
              className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 hover:from-cyan-800/50 hover:to-blue-800/50 px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 border border-cyan-700/30"
              onClick={() => alert("Button with icon clicked!")}
              data-oid="id0s0hn"
            >
              <span data-oid="_u8itdy">Need Help?</span>
              <HelpCircleIcon size={20} data-oid="_e18hnd" />
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
      data-oid="jlj7w7e"
    >
      <div className="flex items-center gap-2" data-oid="7ycm.zy">
        <HelpCircleIcon
          onClick={() => setCount((prev) => prev + 1)}
          color="#F471B5"
          size={24}
          data-oid="aw7fi3g"
        />

        <div className="flex flex-col" data-oid=".4ue4:o">
          <span data-oid="stcj8lh">
            Click counter:{" "}
            <strong className="text-cyan-300" data-oid="29siy9j">
              {count}
            </strong>
          </span>
          <span className="text-xs text-gray-400" data-oid="_:rpf8h">
            Click the icon to increment
          </span>
        </div>
      </div>

      {/* Regular button for comparison */}
      <button
        className="ml-auto px-3 py-1 bg-cyan-900/50 hover:bg-cyan-800/50 rounded-md text-sm"
        onClick={() => setCount(0)}
        data-oid="h1n1z3i"
      >
        Reset
      </button>
    </div>
  );
};

export default IconExample;
