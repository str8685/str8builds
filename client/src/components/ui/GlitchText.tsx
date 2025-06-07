import { FC, useEffect, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: "low" | "medium" | "high";
  fontSize?: string;
  glitchInterval?: number;
}

/**
 * A component that renders text with a cyberpunk-style glitch effect
 */
const GlitchText: FC<GlitchTextProps> = ({
  text,
  className = "",
  intensity = "medium",
  fontSize = "2rem",
  glitchInterval = 3000,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  // Set up random glitching effect
  useEffect(() => {
    // Initial glitch on mount
    const initialDelay = setTimeout(() => {
      triggerGlitch();
    }, 500);

    // Set up interval for random glitches
    const interval = setInterval(() => {
      // Only glitch sometimes for a more realistic effect
      if (Math.random() > 0.6) {
        triggerGlitch();
      }
    }, glitchInterval);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [glitchInterval]);

  const triggerGlitch = () => {
    setIsGlitching(true);

    // Stop glitching after a short duration
    setTimeout(() => {
      setIsGlitching(false);
    }, 200);
  };

  // Determine intensity-based class names
  const intensityClasses = {
    low: "after:left-[1px] before:left-[-1px] after:top-0 before:bottom-0",
    medium:
      "after:left-[2px] before:left-[-2px] after:top-0 before:bottom-[2px]",
    high: "after:left-[3px] before:left-[-3px] after:top-[2px] before:bottom-[-2px]",
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ fontSize }}
      onMouseEnter={triggerGlitch}
      data-oid="hd64j9y"
    >
      <span
        className={`
          relative inline-block font-bold z-10
          ${isGlitching ? "animate-glitch" : ""}
        `}
        data-oid="7vpti11"
      >
        {text}
      </span>

      {/* Red-channel clone */}
      <span
        className={`
          absolute top-0 left-0 w-full h-full font-bold
          text-transparent z-[1] bg-clip-text
          before:content-[attr(data-text)]
          before:absolute before:top-0 before:w-full before:h-full
          before:text-white/80 before:bg-gradient-to-r before:from-red-500/70 before:to-red-500/70
          before:bg-clip-text
          before:animate-pulse-slow
          ${isGlitching ? "before:animate-glitch-1" : ""}
          ${isGlitching ? intensityClasses[intensity] : ""}
        `}
        data-text={text}
        data-oid="2_vdm9b"
      />

      {/* Blue-channel clone */}
      <span
        className={`
          absolute top-0 left-0 w-full h-full font-bold
          text-transparent z-[2] bg-clip-text
          after:content-[attr(data-text)]
          after:absolute after:top-0 after:w-full after:h-full
          after:text-white/80 after:bg-gradient-to-r after:from-blue-500/70 after:to-blue-500/70
          after:bg-clip-text
          after:animate-pulse-slow
          ${isGlitching ? "after:animate-glitch-2" : ""}
          ${isGlitching ? intensityClasses[intensity] : ""}
        `}
        data-text={text}
        data-oid="7o5r0qp"
      />
    </div>
  );
};

export default GlitchText;
