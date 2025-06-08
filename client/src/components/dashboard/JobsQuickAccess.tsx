import { FC } from "react";
import GlassCard from "@/components/ui/GlassCard";

const JobsQuickAccess: FC = () => {
  // Function to navigate to Jobs page
  const goToJobs = () => {
    window.location.href = "/jobs";
  };

  return (
    <GlassCard className="p-4" data-oid="lfct2p9">
      <div className="flex justify-between items-start mb-3" data-oid="2u9jos4">
        <h3
          className="text-xl font-space font-bold text-white cursor-pointer hover:text-cyan transition-colors"
          onClick={() => (window.location.href = "/jobs")}
          data-oid="1wxmqh5"
        >
          Jobs Quick Access
        </h3>
        <span
          className="text-cyan cursor-pointer hover:text-cyan-300 transition-colors"
          title="Open Jobs Dashboard"
          onClick={() => (window.location.href = "/jobs")}
          data-oid="786var1"
        >
          <i className="fas fa-briefcase" data-oid="cz_vko."></i>
        </span>
      </div>

      {/* Direct Jobs navigation button - this will work even if the Jobs nav in BottomNav doesn't */}
      <button
        onClick={goToJobs}
        className="w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
        data-oid="2iqhxaw"
      >
        <i className="fas fa-briefcase" data-oid="2o:mxo9"></i>
        Go to Jobs Dashboard
      </button>

      {/* Jobs overview information */}
      <div className="grid grid-cols-3 gap-2 mb-4" data-oid="96s5x8t">
        <div
          className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-3 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-cyan hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          data-oid="i1f_8fn"
        >
          <div
            className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
            data-oid="p:_kz8f"
          >
            Active
          </div>
          <div
            className="text-xl font-bold text-white group-hover:text-cyan transition-colors duration-300 relative z-10"
            data-oid="5w2x-pf"
          >
            8
          </div>
        </div>

        <div
          className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-3 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-purple hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          data-oid="lm0g289"
        >
          <div
            className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
            data-oid="a5423kb"
          >
            Hours
          </div>
          <div
            className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300 relative z-10"
            data-oid="qi_snhc"
          >
            123.5
          </div>
        </div>

        <div
          className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-3 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-yellow hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          data-oid="t807tes"
        >
          <div
            className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
            data-oid="ua5mp4k"
          >
            Pending
          </div>
          <div
            className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 relative z-10"
            data-oid="g2pk_u1"
          >
            $4,785
          </div>
        </div>
      </div>

      {/* Additional functionality space - we removed the duplicate button */}

      {/* Recent projects preview */}
      <div className="mt-4" data-oid="rjgptb0">
        <div
          className="flex justify-between items-center mb-2"
          data-oid="1rvq26t"
        >
          <h4 className="text-sm font-medium text-gray-300" data-oid="je406t6">
            Recent Projects
          </h4>
          <button
            onClick={() => (window.location.href = "/jobs")}
            className="text-xs text-cyan hover:text-cyan-300 transition-colors"
            data-oid="n4g1jhy"
          >
            View All
          </button>
        </div>

        <div className="space-y-2" data-oid="rwyo0t9">
          <div
            className="p-2 bg-space-800/60 rounded-lg border border-space-700/50 hover:border-cyan/30 transition-colors cursor-pointer"
            onClick={() => (window.location.href = "/jobs")}
            data-oid="ccx5jp_"
          >
            <div className="text-sm text-white" data-oid="eck87_8">
              Papamoa Beach Deck
            </div>
            <div
              className="text-xs text-gray-400 flex items-center"
              data-oid="._iqens"
            >
              <span
                className="h-2 w-2 rounded-full bg-green-400 mr-1.5 animate-pulse"
                data-oid="8oj2aku"
              ></span>
              In Progress (80%)
            </div>
          </div>

          <div
            className="p-2 bg-space-800/60 rounded-lg border border-space-700/50 hover:border-cyan/30 transition-colors cursor-pointer"
            onClick={() => (window.location.href = "/jobs")}
            data-oid="u9uwn5g"
          >
            <div className="text-sm text-white" data-oid="d::2yo_">
              Mount Property Renovation
            </div>
            <div
              className="text-xs text-gray-400 flex items-center"
              data-oid="ffssa8."
            >
              <span
                className="h-2 w-2 rounded-full bg-green-400 mr-1.5 animate-pulse"
                data-oid="94yixss"
              ></span>
              In Progress (45%)
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default JobsQuickAccess;
