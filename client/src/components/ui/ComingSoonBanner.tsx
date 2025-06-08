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
      data-oid="47u445u"
    >
      {/* Background with gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 opacity-90"
        data-oid="l8-i75h"
      />

      {/* Animated starfield effect */}
      <div className="absolute inset-0 opacity-30" data-oid="a4i96dg">
        <div
          className="absolute h-1 w-1 rounded-full bg-white top-[10%] left-[20%] animate-pulse"
          style={{ animationDelay: "0.5s" }}
          data-oid="2zulw1b"
        />

        <div
          className="absolute h-1 w-1 rounded-full bg-white top-[30%] left-[80%] animate-pulse"
          style={{ animationDelay: "1.2s" }}
          data-oid="5zs:d5p"
        />

        <div
          className="absolute h-1 w-1 rounded-full bg-white top-[70%] left-[10%] animate-pulse"
          style={{ animationDelay: "0.8s" }}
          data-oid="u_p1-65"
        />

        <div
          className="absolute h-1 w-1 rounded-full bg-white top-[50%] left-[60%] animate-pulse"
          style={{ animationDelay: "0.3s" }}
          data-oid="qj-a73x"
        />

        <div
          className="absolute h-1 w-1 rounded-full bg-white top-[20%] left-[40%] animate-pulse"
          style={{ animationDelay: "1.6s" }}
          data-oid="ozjyu.v"
        />

        <div
          className="absolute h-1 w-1 rounded-full bg-white top-[80%] left-[75%] animate-pulse"
          style={{ animationDelay: "0.9s" }}
          data-oid="ok7vaz3"
        />
      </div>

      {/* Content */}
      <div
        className="relative px-8 py-12 flex flex-col items-center text-center z-10"
        data-oid="syx72wj"
      >
        <div
          className="text-cyan-400 font-bold mb-1 tracking-wide"
          data-oid="4m8guf:"
        >
          ADVANCED FEATURE
        </div>
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight"
          data-oid="94sl.l0"
        >
          AI Construction{" "}
          <span className="text-cyan-400" data-oid="3u8wnp8">
            Coming Soon
          </span>
        </h2>
        <div
          className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full my-4"
          data-oid="x7-:zsi"
        ></div>
        <p className="text-gray-300 max-w-2xl mb-6" data-oid="17j32dn">
          We're building intelligent AI-powered tools to help you streamline
          your workflow. Stay tuned for revolutionary features that will
          transform your construction management experience.
        </p>

        {/* Progress indicator */}
        <div
          className="w-full max-w-md bg-gray-800 h-3 rounded-full overflow-hidden mt-2"
          data-oid="dz6o7b0"
        >
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[70%] animate-pulse"
            data-oid="bwy-12y"
          ></div>
        </div>
        <div className="text-xs text-gray-400 mt-2" data-oid="74a865l">
          Development in progress: 70%
        </div>
      </div>
    </div>
  );
};

export default ComingSoonBanner;
