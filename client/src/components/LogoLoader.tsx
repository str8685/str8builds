import { FC, memo, useState, useEffect } from "react";
import str8BuildLogo from "@/assets/str8-build-logo.png";

interface LogoLoaderProps {
  fullScreen?: boolean;
  size?: "small" | "medium" | "large";
  text?: string;
  skipDelay?: boolean;
}

// Use memo to prevent unnecessary re-renders
const LogoLoader: FC<LogoLoaderProps> = memo(
  ({
    fullScreen = false,
    size = "medium",
    text = "Loading...",
    skipDelay = false,
  }) => {
    // State to track if the loader should be visible
    // For instant performance, we start with invisible and then fade in
    const [isVisible, setIsVisible] = useState(skipDelay);

    // Fade in the loader after a tiny delay to prevent flash on fast loads
    useEffect(() => {
      if (skipDelay) return;

      // Optimization: Only show loader if loading takes more than 50ms
      // This prevents unnecessary UI flickering on fast loads
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);

      return () => clearTimeout(timer);
    }, [skipDelay]);

    // Don't render anything until the delay has passed
    if (!isVisible) return null;

    // Determine logo size based on prop - optimized with direct classes
    const logoSize =
      size === "small"
        ? "w-16 h-auto"
        : size === "large"
          ? "w-48 h-auto"
          : "w-32 h-auto"; // medium is default

    // For full screen loader with enhanced professional effects
    if (fullScreen) {
      return (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-space-950/90 backdrop-blur-sm animate-fadeIn"
          data-oid="zkei3g1"
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 bg-grid-white/[0.03] bg-[size:20px_20px] opacity-30"
            data-oid=":6jqh15"
          ></div>

          {/* Decorative elements */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-full blur-3xl opacity-50"
            data-oid="j7-.pvl"
          ></div>

          <div
            className="flex flex-col items-center relative z-10"
            data-oid="gw.vra4"
          >
            {/* Logo with enhanced effects */}
            <div className="relative" data-oid="7xf41pt">
              {/* Pulsing background glow */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-full blur-xl opacity-70 animate-pulse-slow"
                data-oid="wcn-yf9"
              ></div>

              {/* Logo image */}
              <img
                src={str8BuildLogo}
                alt="STR8 BUILD Logo"
                className={`${logoSize} relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-float-slow`}
                data-oid="8sz4_5w"
              />

              {/* Spinning outer ring */}
              <div
                className="absolute -inset-4 rounded-full border-2 border-t-transparent border-cyan-400/40 animate-spin-slow"
                data-oid="v3rznwp"
              ></div>

              {/* Second spinning ring (opposite direction) */}
              <div
                className="absolute -inset-8 rounded-full border border-b-transparent border-blue-500/30 animate-reverse-spin"
                data-oid="a2kp87t"
              ></div>

              {/* Particle effects */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400"
                  style={{
                    top: `${Math.sin((i * 60 * Math.PI) / 180) * 120 + 50}%`,
                    left: `${Math.cos((i * 60 * Math.PI) / 180) * 120 + 50}%`,
                    opacity: 0.7,
                    animation: `particle-orbit 3s linear infinite, pulse-fade 2s ease-in-out infinite ${i * 0.3}s`,
                  }}
                  data-oid="e9fvz7r"
                />
              ))}
            </div>

            {/* Loading text with gradient */}
            <p
              className="mt-6 text-xl font-space font-medium bg-gradient-to-r from-cyan-300 via-white to-blue-300 bg-clip-text text-transparent"
              data-oid="aj6gd5f"
            >
              {text}
            </p>
          </div>

          {/* Custom animation keyframes */}
          <style jsx data-oid="wncn22h">{`
            @keyframes particle-orbit {
              0% {
                transform: rotate(0deg) translateX(60px) rotate(0deg);
              }
              100% {
                transform: rotate(360deg) translateX(60px) rotate(-360deg);
              }
            }

            @keyframes pulse-fade {
              0%,
              100% {
                opacity: 0.4;
                transform: scale(1);
              }
              50% {
                opacity: 0.8;
                transform: scale(1.5);
              }
            }

            @keyframes float-slow {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }

            @keyframes spin-slow {
              to {
                transform: rotate(360deg);
              }
            }

            @keyframes reverse-spin {
              to {
                transform: rotate(-360deg);
              }
            }

            .animate-float-slow {
              animation: float-slow 3s ease-in-out infinite;
            }

            .animate-spin-slow {
              animation: spin-slow 4s linear infinite;
            }

            .animate-reverse-spin {
              animation: reverse-spin 6s linear infinite;
            }

            .animate-pulse-slow {
              animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
          `}</style>
        </div>
      );
    }

    // For inline loader - enhanced but still compact
    return (
      <div
        className="flex flex-col items-center justify-center p-4"
        data-oid="a41x5-z"
      >
        <div className="relative" data-oid="hiqw4b8">
          {/* Subtle background glow */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full blur-lg opacity-50 animate-pulse-slow"
            data-oid="6v781bw"
          ></div>

          {/* Logo image */}
          <img
            src={str8BuildLogo}
            alt="STR8 BUILD Logo"
            className={`${logoSize} relative z-10 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]`}
            data-oid="570ryry"
          />

          {/* Spinning ring */}
          <div
            className="absolute -inset-2 rounded-full border border-t-transparent border-cyan-400/50 animate-spin-slow"
            data-oid="6i0asqm"
          ></div>
        </div>

        {/* Loading text with gradient */}
        <p
          className="mt-3 text-sm font-space font-medium bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent"
          data-oid="69ib-8p"
        >
          {text}
        </p>
      </div>
    );
  },
);

export default LogoLoader;
