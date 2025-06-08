import React from "react";

interface FontHelpIconProps {
  onClick?: () => void;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * Font-based Help Icon - An alternative to SVG that's more reliable for click handling
 * Styled to match the space theme with cyan accents
 */
const FontHelpIcon: React.FC<FontHelpIconProps> = ({
  onClick,
  color = "#4FEBFF",
  size = "md",
  className = "",
}) => {
  // Size mappings
  const sizeMap = {
    sm: "16px",
    md: "20px",
    lg: "24px",
    xl: "32px",
  };

  const fontSize = sizeMap[size];

  // Handle click reliably
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
      console.log("Help icon clicked!");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`font-help-icon ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: fontSize,
        height: fontSize,
        fontSize: fontSize,
        color: color,
        cursor: onClick ? "pointer" : "default",
        border: `2px solid ${color}`,
        borderRadius: "50%",
        backgroundColor: "transparent",
        transition: "all 0.2s ease",
        lineHeight: 1,
        fontWeight: "bold",
        userSelect: "none",
        textAlign: "center",
      }}
      role="button"
      aria-label="Help"
      tabIndex={0}
      data-oid="qikt-2j"
    >
      ?
    </div>
  );
};

export default FontHelpIcon;
