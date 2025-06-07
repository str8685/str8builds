import React, { useState } from "react";
import FontHelpIcon from "../icons/FontHelpIcon";

const FontIconExample: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div
      className="min-h-screen bg-space-950 text-white p-8"
      data-oid="m6fjqlq"
    >
      <h1 className="text-2xl font-bold mb-8 text-cyan-300" data-oid="l1armaj">
        Font Help Icon Examples
      </h1>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-oid="csecx5z"
      >
        {/* Basic Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="mxk_vd6"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="4qxsq0j">
            Basic Example
          </h2>
          <div className="flex items-center gap-2" data-oid="lco5jf2">
            <FontHelpIcon data-oid="0d8j6km" />
            <span data-oid="0j9r6-g">Default Help Icon</span>
          </div>
        </div>

        {/* Interactive Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="ep2wzhn"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="8wdlfgi">
            Interactive Example
          </h2>
          <div className="flex items-center gap-2" data-oid="l-2_83r">
            <FontHelpIcon
              onClick={() => alert("Help icon clicked!")}
              color="#4FEBFF"
              data-oid="7bgpmc0"
            />

            <span data-oid="nda2-gp">Click for alert</span>
          </div>
        </div>

        {/* Color Variants Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="ud.o7m7"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="32ofmv3">
            Color Variants
          </h2>
          <div className="flex flex-col gap-4" data-oid="yqdnmw2">
            <div className="flex items-center gap-2" data-oid="mwjnzw3">
              <FontHelpIcon color="#4FEBFF" data-oid="b1q7sbu" />
              <span data-oid="m74ep5u">Cyan</span>
            </div>
            <div className="flex items-center gap-2" data-oid="_u_wy79">
              <FontHelpIcon color="#6366f1" data-oid="6a1hqbj" />
              <span data-oid="jvhcfg7">Indigo</span>
            </div>
            <div className="flex items-center gap-2" data-oid="b6:cyvl">
              <FontHelpIcon color="#F471B5" data-oid="v-yqxqb" />
              <span data-oid="qa38paq">Pink</span>
            </div>
          </div>
        </div>

        {/* Sizes Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="hfp2zb7"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="uj182lr">
            Different Sizes
          </h2>
          <div className="flex items-center gap-4" data-oid=":7smbzk">
            <FontHelpIcon size="sm" data-oid="5l68ihw" />
            <FontHelpIcon size="md" data-oid="68zp.1." />
            <FontHelpIcon size="lg" data-oid="qiepjd3" />
            <FontHelpIcon size="xl" data-oid="57n.bap" />
          </div>
        </div>

        {/* Click Counter Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="1otu3.v"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="dnk9kn_">
            Click Counter
          </h2>
          <div className="flex items-center gap-3" data-oid="emo1ndx">
            <FontHelpIcon
              onClick={() => setCount((prev) => prev + 1)}
              color="#F471B5"
              size="lg"
              data-oid="azh4tw9"
            />

            <div data-oid="ab3q50y">
              <div data-oid="dirihbk">
                Count:{" "}
                <span className="text-cyan-300 font-bold" data-oid="8yyz1c2">
                  {count}
                </span>
              </div>
              <div className="text-xs text-gray-400" data-oid="1dd0y37">
                Click the icon to increment
              </div>
            </div>
          </div>
        </div>

        {/* Inside Button Example */}
        <div
          className="bg-space-900 p-6 rounded-xl border border-cyan-900/30"
          data-oid="j9wr2kj"
        >
          <h2 className="text-lg font-medium mb-4" data-oid="u5bx8az">
            In Context Example
          </h2>
          <div data-oid="d:yn2mv">
            <label
              className="block text-sm mb-1 text-gray-400"
              data-oid="s9j4zzp"
            >
              Username
            </label>
            <div className="flex items-center" data-oid="zogvolg">
              <input
                type="text"
                className="bg-space-800 border border-cyan-900/30 rounded px-3 py-2 w-full"
                placeholder="Enter username"
                data-oid="4euqes."
              />

              <FontHelpIcon
                className="ml-2"
                onClick={() => alert("Enter your username here")}
                data-oid="22_v75x"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontIconExample;
