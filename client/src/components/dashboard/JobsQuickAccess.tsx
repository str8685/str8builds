import { FC } from "react";
import GlassCard from "@/components/ui/GlassCard";

const JobsQuickAccess: FC = () => {
  // Function to navigate to Jobs page
  const goToJobs = () => {
    window.location.href = "/jobs";
  };

  return (
    <GlassCard className="p-4" data-oid="r:349lp">
      <div className="flex justify-between items-start mb-3" data-oid="qw:qnom">
        <h3
          className="text-xl font-space font-bold text-white cursor-pointer hover:text-cyan transition-colors"
          onClick={() => (window.location.href = "/jobs")}
          data-oid="pwr-eht"
        >
          Jobs Quick Access
        </h3>
        <span
          className="text-cyan cursor-pointer hover:text-cyan-300 transition-colors"
          title="Open Jobs Dashboard"
          onClick={() => (window.location.href = "/jobs")}
          data-oid="w59v1.3"
        >
          <i className="fas fa-briefcase" data-oid="wahfqj_"></i>
        </span>
      </div>

      {/* Direct Jobs navigation button - this will work even if the Jobs nav in BottomNav doesn't */}
      <button
        onClick={goToJobs}
        className="w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
        data-oid="eq6iso9"
      >
        <i className="fas fa-briefcase" data-oid="c9frsh-"></i>
        Go to Jobs Dashboard
      </button>

      {/* Jobs overview information */}
      <div className="grid grid-cols-3 gap-2 mb-4" data-oid="-fjtxv0">
        <div
          className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-3 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-cyan hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          data-oid="se1is0i"
        >
          <div
            className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
            data-oid="36w19:q"
          >
            Active
          </div>
          <div
            className="text-xl font-bold text-white group-hover:text-cyan transition-colors duration-300 relative z-10"
            data-oid="i4vgwpw"
          >
            8
          </div>
        </div>

        <div
          className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-3 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-purple hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          data-oid="sm_qu3m"
        >
          <div
            className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
            data-oid="_1vm1i2"
          >
            Hours
          </div>
          <div
            className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300 relative z-10"
            data-oid="puw.cjj"
          >
            123.5
          </div>
        </div>

        <div
          className="bg-gradient-to-br from-space-800/70 to-space-900/70 backdrop-blur-md p-3 rounded-lg border border-space-700/50 shadow-glow-sm hover:shadow-glow-yellow hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          data-oid="mdi3asb"
        >
          <div
            className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300"
            data-oid="5:z3y:y"
          >
            Pending
          </div>
          <div
            className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 relative z-10"
            data-oid=".8tnlfc"
          >
            $4,785
          </div>
        </div>
      </div>

      {/* Additional functionality space - we removed the duplicate button */}

      {/* Recent projects preview */}
      <div className="mt-4" data-oid="y3p7w:l">
        <div
          className="flex justify-between items-center mb-2"
          data-oid="rqr3:j8"
        >
          <h4 className="text-sm font-medium text-gray-300" data-oid="u-igbhy">
            Recent Projects
          </h4>
          <button
            onClick={() => (window.location.href = "/jobs")}
            className="text-xs text-cyan hover:text-cyan-300 transition-colors"
            data-oid="h_h7zcl"
          >
            View All
          </button>
        </div>

        <div className="space-y-2" data-oid="lg1u2bx">
          <div
            className="p-2 bg-space-800/60 rounded-lg border border-space-700/50 hover:border-cyan/30 transition-colors cursor-pointer"
            onClick={() => (window.location.href = "/jobs")}
            data-oid="fz_:b8d"
          >
            <div className="text-sm text-white" data-oid="_fl602.">
              Papamoa Beach Deck
            </div>
            <div
              className="text-xs text-gray-400 flex items-center"
              data-oid="tf0ygfy"
            >
              <span
                className="h-2 w-2 rounded-full bg-green-400 mr-1.5 animate-pulse"
                data-oid="-.1cmfr"
              ></span>
              In Progress (80%)
            </div>
          </div>

          <div
            className="p-2 bg-space-800/60 rounded-lg border border-space-700/50 hover:border-cyan/30 transition-colors cursor-pointer"
            onClick={() => (window.location.href = "/jobs")}
            data-oid="4xi3h_6"
          >
            <div className="text-sm text-white" data-oid="e.h4_4_">
              Mount Property Renovation
            </div>
            <div
              className="text-xs text-gray-400 flex items-center"
              data-oid="uypmn:u"
            >
              <span
                className="h-2 w-2 rounded-full bg-green-400 mr-1.5 animate-pulse"
                data-oid="s1f4.9y"
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
