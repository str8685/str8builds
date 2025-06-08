import React, { useState } from "react";
import FontHelpIcon from "../icons/FontHelpIcon";

const FontIconExample: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div
      className="min-h-screen bg-space-950 text-white p-8"
      data-oid="pfg1ero"
    >
      <h1 className="text-2xl font-bold mb-8 text-cyan-300" data-oid="t38ey-k">
        Font Help Icon Examples
      </h1>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-oid="mzq.9fz"
      >
        {/* Basic Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="e5g2i6m"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="3_08oee">
            Basic Example
          </h2>
          <div className="flex items-center gap-2" data-oid="x.xfp0m">
            <FontHelpIcon data-oid="x:2k9ou" />
            <span data-oid="-0u4hzv">Default Help Icon</span>
          </div>
        </div>

        {/* Interactive Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="2vm2lpm"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="vrwks:f">
            Interactive Example
          </h2>
          <div className="flex items-center gap-2" data-oid="pykebc.">
            <FontHelpIcon
              onClick={() => alert("Help icon clicked!")}
              color="#4FEBFF"
              data-oid="0_c8yam"
            />

            <span data-oid="vl1:e4e">Click for alert</span>
          </div>
        </div>

        {/* Color Variants Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="2q12ld."
        >
          <h2 className="text-lg font-medium mb-4" data-oid="ylbkf0n">
            Color Variants
          </h2>
          <div className="flex flex-col gap-4" data-oid=":c1hupj">
            <div className="flex items-center gap-2" data-oid="rfr1_u8">
              <FontHelpIcon color="#4FEBFF" data-oid="c-3q526" />
              <span data-oid="-_jzab3">Cyan</span>
            </div>
            <div className="flex items-center gap-2" data-oid="t2m7_2_">
              <FontHelpIcon color="#6366f1" data-oid="_x3cs98" />
              <span data-oid="-g5f_0t">Indigo</span>
            </div>
            <div className="flex items-center gap-2" data-oid="dmiec3q">
              <FontHelpIcon color="#F471B5" data-oid="we-fx1k" />
              <span data-oid="1_8p70c">Pink</span>
            </div>
          </div>
        </div>

        {/* Sizes Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="t-fmzw2"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="91p4hge">
            Different Sizes
          </h2>
          <div className="flex items-center gap-4" data-oid="imoecqn">
            <FontHelpIcon size="sm" data-oid="1c9z4fq" />
            <FontHelpIcon size="md" data-oid="hba3398" />
            <FontHelpIcon size="lg" data-oid="7g4ekzw" />
            <FontHelpIcon size="xl" data-oid="wh-58i-" />
          </div>
        </div>

        {/* Click Counter Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="qkfv89l"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="rzns2qr">
            Click Counter
          </h2>
          <div className="flex items-center gap-3" data-oid="pov680s">
            <FontHelpIcon
              onClick={() => setCount((prev) => prev + 1)}
              color="#F471B5"
              size="lg"
              data-oid="8vjj203"
            />

            <div data-oid="fmlktxh">
              <div data-oid="vn8n3.j">
                Count:{" "}
                <span className="text-cyan-300 font-bold" data-oid="a0vwfef">
                  {count}
                </span>
              </div>
              <div className="text-xs text-gray-400" data-oid="o:a1rft">
                Click the icon to increment
              </div>
            </div>
          </div>
        </div>

        {/* Inside Button Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="hy220pm"
        >
          <h2 className="text-lg font-medium mb-4" data-oid=".bqd5nv">
            In Context Example
          </h2>
          <div data-oid="q_19x_r">
            <label
              className="block text-sm mb-1 text-gray-400"
              data-oid="fcjmd_a"
            >
              Username
            </label>
            <div className="flex items-center" data-oid="gulfoh5">
              <input
                type="text"
                className="bg-space-800 border border-cyan-900/30 rounded px-3 py-2 w-full"
                placeholder="Enter username"
                data-oid=":ly0n48"
              />

              <FontHelpIcon
                className="ml-2"
                onClick={() => alert("Enter your username here")}
                data-oid="m12ax7y"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontIconExample;
