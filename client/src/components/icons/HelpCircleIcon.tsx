import React from "react";

interface HelpCircleIconProps {
  className?: string;
  onClick?: () => void;
  size?: number;
  color?: string;
}

/**
 * HelpCircleIcon - A guaranteed-clickable help circle icon using HTML button
 */
const HelpCircleIcon: React.FC<HelpCircleIconProps> = ({
  className = "",
  onClick,
  size = 24,
  color = "#4FEBFF",
}) => {
  // Use a simple button for guaranteed click functionality
  return (
    <button
      type="button"
      onClick={
        onClick
          ? (e) => {
              e.preventDefault();
              e.stopPropagation();
              onClick();
              console.log("Help icon clicked!");
            }
          : undefined
      }
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        cursor: onClick ? "pointer" : "default",
        background: "transparent",
        border: "none",
        padding: 0,
        margin: 0,
        width: size,
        height: size,
      }}
      aria-label="Help"
      data-oid="p:6gb_u"
    >
      {/* Simple SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-oid=":th2rhi"
      >
        <circle cx="12" cy="12" r="10" data-oid="iuckyzi"></circle>
        <path
          d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
          data-oid=".kefa0r"
        ></path>
        <path d="M12 17h.01" data-oid="mv90kd3"></path>
      </svg>
    </button>
  );
};

export default HelpCircleIcon;

// Add keyframe animations to global CSS if they don't exist already
if (typeof document !== "undefined") {
  // Only execute in browser environment
  const styleId = "help-circle-icon-styles";
  if (!document.getElementById(styleId)) {
    const styleEl = document.createElement("style");
    styleEl.id = styleId;
    styleEl.innerHTML = `
      @keyframes fade-in {
        from { opacity: 0; transform: translate(-50%, 10px); }
        to { opacity: 1; transform: translate(-50%, 0); }
      }
      .animate-fade-in {
        animation: fade-in 0.2s ease-out forwards;
      }
    `;
    document.head.appendChild(styleEl);
  }
}
