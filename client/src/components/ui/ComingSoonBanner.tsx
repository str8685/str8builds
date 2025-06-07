import React from "react";

interface ComingSoonBannerProps {
  className?: string;
}

const ComingSoonBanner: React.FC<ComingSoonBannerProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      data-oid="arfvqxd"
    >
      {/* Background with gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 opacity-90"
        data-oid="kblpybx"
      />

      {/* Animated starfield effect */}
      <div className="absolute inset-0 opacity-30" data-oid="kk9.jet">
        <div
          className="absolute h-1 w-1 rounded-full bg-white top-[10%] left-[20%] animate-pulse"
          style={{ animationDelay: "0.5s" }}
          data-oid="f2hw82."
        />

        <div
          className="absolute h-1 w-1 rounded-full bg-white top-[30%] left-[80%] animate-pulse"
          style={{ animationDelay: "1.2s" }}
          data-oid="ad-mi0i"
        />

        <div
          className="absolute h-1 w-1 rounded-full bg-white top-[70%] left-[10%] animate-pulse"
          style={{ animationDelay: "0.8s" }}
          data-oid="54y5rxe"
        />

        <div
          className="absolute h-1 w-1 rounded-full bg-white top-[50%] left-[60%] animate-pulse"
          style={{ animationDelay: "0.3s" }}
          data-oid="ufvm3i-"
        />

        <div
          className="absolute h-1 w-1 rounded-full bg-white top-[20%] left-[40%] animate-pulse"
          style={{ animationDelay: "1.6s" }}
          data-oid="3fi-99q"
        />

        <div
          className="absolute h-1 w-1 rounded-full bg-white top-[80%] left-[75%] animate-pulse"
          style={{ animationDelay: "0.9s" }}
          data-oid="uc31l3k"
        />
      </div>

      {/* Content */}
      <div
        className="relative px-8 py-12 flex flex-col items-center text-center z-10"
        data-oid=":w4udwq"
      >
        <div
          className="text-cyan-400 font-bold mb-1 tracking-wide"
          data-oid=":kqzo:n"
        >
          ADVANCED FEATURE
        </div>
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight"
          data-oid="-380_rg"
        >
          AI Construction{" "}
          <span className="text-cyan-400" data-oid="zrhsz1.">
            Coming Soon
          </span>
        </h2>
        <div
          className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full my-4"
          data-oid="6ovr-mp"
        ></div>
        <p className="text-gray-300 max-w-2xl mb-6" data-oid="ysob36i">
          We're building intelligent AI-powered tools to help you streamline
          your workflow. Stay tuned for revolutionary features that will
          transform your construction management experience.
        </p>

        {/* Progress indicator */}
        <div
          className="w-full max-w-md bg-gray-800 h-3 rounded-full overflow-hidden mt-2"
          data-oid="hgh371t"
        >
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[70%] animate-pulse"
            data-oid="0mitop."
          ></div>
        </div>
        <div className="text-xs text-gray-400 mt-2" data-oid="_1mci-8">
          Development in progress: 70%
        </div>
      </div>
    </div>
  );
};

export default ComingSoonBanner;
