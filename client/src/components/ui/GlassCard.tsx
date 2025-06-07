import { FC, ReactNode, useState, useRef, useEffect } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  blur?: "sm" | "md" | "lg" | "xl";
  opacity?: "light" | "medium" | "heavy";
  border?: boolean;
  glow?: boolean;
  variant?: "cyan" | "electric" | "teal" | "purple" | "default";
  onClick?: () => void;
  title?: string;
  subtitle?: string;
  icon?: string;
  loading?: boolean;
  expandable?: boolean;
  collapsible?: boolean;
  initiallyExpanded?: boolean;
  footerContent?: ReactNode;
  minHeight?: string;
  interactive?: boolean;
  pulseBorder?: boolean;
  accentCorner?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "none";
  contentPadding?: "none" | "sm" | "md" | "lg";
}

const GlassCard: FC<GlassCardProps> = ({
  children,
  className = "",
  blur = "md",
  opacity = "medium",
  border = true,
  glow = false,
  variant = "cyan",
  onClick,
  title,
  subtitle,
  icon,
  loading = false,
  expandable = false,
  collapsible = false,
  initiallyExpanded = true,
  footerContent,
  minHeight,
  interactive = true,
  pulseBorder = false,
  accentCorner = "none",
  contentPadding = "md",
}) => {
  // State management for expandable/collapsible functionality
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const [isHovered, setIsHovered] = useState(false);
  const [rippleEffect, setRippleEffect] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });

  // Refs for ripple effect and card dimensions
  const cardRef = useRef<HTMLDivElement>(null);
  const rippleTimeoutRef = useRef<NodeJS.Timeout>();

  // Handle expand/collapse toggle
  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  // Handle ripple effect on click
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;

    // Calculate ripple position relative to card
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipplePosition({ x, y });
    setRippleEffect(true);

    // Clear previous timeout if exists
    if (rippleTimeoutRef.current) {
      clearTimeout(rippleTimeoutRef.current);
    }

    // Remove ripple effect after animation completes
    rippleTimeoutRef.current = setTimeout(() => {
      setRippleEffect(false);
    }, 600);

    // Call the original onClick handler if provided
    if (onClick) onClick();
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (rippleTimeoutRef.current) {
        clearTimeout(rippleTimeoutRef.current);
      }
    };
  }, []);
  // Generate dynamic blur class
  const blurClass = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  }[blur];

  // Generate opacity class
  const opacityClass = {
    light: "bg-space-900/20",
    medium: "bg-space-900/40",
    heavy: "bg-space-900/70",
  }[opacity];

  // Generate variant-based classes
  const variantClasses = {
    cyan: {
      border: "border border-cyan/30",
      glow: glow
        ? "shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]"
        : "",
      gradient: "bg-gradient-to-br from-space-800/60 to-space-900/60",
      highlight:
        "before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-cyan/40 before:to-transparent",
      innerGlow:
        "after:absolute after:inset-0 after:rounded-lg after:pointer-events-none after:bg-gradient-to-br after:from-cyan-500/5 after:to-transparent after:opacity-0 hover:after:opacity-100",
    },
    electric: {
      border: "border border-electric/30",
      glow: glow
        ? "shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
        : "",
      gradient: "bg-gradient-to-br from-space-800/60 to-space-900/60",
      highlight:
        "before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-electric/40 before:to-transparent",
      innerGlow:
        "after:absolute after:inset-0 after:rounded-lg after:pointer-events-none after:bg-gradient-to-br after:from-electric/5 after:to-transparent after:opacity-0 hover:after:opacity-100",
    },
    teal: {
      border: "border border-teal/30",
      glow: glow
        ? "shadow-[0_0_15px_rgba(20,184,166,0.15)] hover:shadow-[0_0_25px_rgba(20,184,166,0.3)]"
        : "",
      gradient: "bg-gradient-to-br from-space-800/60 to-space-900/60",
      highlight:
        "before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-teal/40 before:to-transparent",
      innerGlow:
        "after:absolute after:inset-0 after:rounded-lg after:pointer-events-none after:bg-gradient-to-br after:from-teal-500/5 after:to-transparent after:opacity-0 hover:after:opacity-100",
    },
    purple: {
      border: "border border-purple-800/30",
      glow: glow
        ? "shadow-[0_0_15px_rgba(43,18,74,0.15)] hover:shadow-[0_0_25px_rgba(43,18,74,0.3)]"
        : "",
      gradient: "bg-gradient-to-br from-space-800/60 to-purple-900/20",
      highlight:
        "before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-purple-800/30 before:to-transparent",
      innerGlow:
        "after:absolute after:inset-0 after:rounded-lg after:pointer-events-none after:bg-gradient-to-br after:from-purple-800/5 after:to-transparent after:opacity-0 hover:after:opacity-100",
    },
    default: {
      border: "border border-space-700/50",
      glow: glow
        ? "shadow-[0_0_15px_rgba(20,22,41,0.15)] hover:shadow-[0_0_25px_rgba(20,22,41,0.3)]"
        : "",
      gradient: "bg-gradient-to-br from-space-800/60 to-space-900/60",
      highlight: "",
      innerGlow:
        "after:absolute after:inset-0 after:rounded-lg after:pointer-events-none after:bg-gradient-to-br after:from-space-700/5 after:to-transparent after:opacity-0 hover:after:opacity-100",
    },
  }[variant];

  // Generate padding class
  const paddingClass = {
    none: "",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  }[contentPadding];

  // Generate min height style
  const heightStyle = minHeight ? { minHeight } : {};

  // Accent corner styles
  const accentCornerClass =
    accentCorner !== "none"
      ? {
          "top-left":
            "before:absolute before:top-0 before:left-0 before:w-8 before:h-8 before:bg-gradient-to-br before:from-transparent before:to-transparent before:rounded-tl-lg before:border-t-2 before:border-l-2",
          "top-right":
            "before:absolute before:top-0 before:right-0 before:w-8 before:h-8 before:bg-gradient-to-br before:from-transparent before:to-transparent before:rounded-tr-lg before:border-t-2 before:border-r-2",
          "bottom-left":
            "before:absolute before:bottom-0 before:left-0 before:w-8 before:h-8 before:bg-gradient-to-br before:from-transparent before:to-transparent before:rounded-bl-lg before:border-b-2 before:border-l-2",
          "bottom-right":
            "before:absolute before:bottom-0 before:right-0 before:w-8 before:h-8 before:bg-gradient-to-br before:from-transparent before:to-transparent before:rounded-br-lg before:border-b-2 before:border-r-2",
        }[accentCorner]
      : "";

  // Generate the accent corner border color based on variant
  const accentBorderColor = {
    cyan: "before:border-cyan-400/60",
    electric: "before:border-electric/60",
    teal: "before:border-teal-400/60",
    purple: "before:border-purple-400/60",
    default: "before:border-gray-400/60",
  }[variant];

  // Pulse border animation class
  const pulseBorderClass = pulseBorder ? `animate-pulse-border-${variant}` : "";

  // Card interaction classes
  const interactiveClass = interactive
    ? "cursor-pointer hover:scale-[1.01]"
    : "";

  // Loading overlay classes
  const loadingOverlayClass = loading ? "relative overflow-hidden" : "";

  // Animation classes
  const transitionClass = "transition-all duration-300 ease-in-out";

  return (
    <div
      ref={cardRef}
      className={`
        relative rounded-lg overflow-hidden
        ${opacityClass} ${blurClass} ${variantClasses.gradient} 
        ${border ? variantClasses.border : ""} ${pulseBorderClass}
        ${variantClasses.glow} ${variantClasses.highlight} ${variantClasses.innerGlow}
        ${transitionClass} ${interactiveClass} ${loadingOverlayClass}
        ${accentCornerClass} ${accentBorderColor} ${className}
      `}
      onClick={interactive ? handleCardClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={heightStyle}
      data-component-name="GlassCard"
      data-oid="7.rgac8"
    >
      {/* Click ripple effect */}
      {rippleEffect && interactive && (
        <div
          className={`absolute rounded-full bg-${variant === "default" ? "gray" : variant}-400/20 animate-ripple pointer-events-none`}
          style={{
            left: ripplePosition.x - 50, // 50px is half the width of the ripple
            top: ripplePosition.y - 50,
            width: "100px",
            height: "100px",
          }}
          data-oid="6_lu3vp"
        />
      )}

      {/* Loading overlay */}
      {loading && (
        <div
          className="absolute inset-0 bg-space-900/70 z-10 flex items-center justify-center backdrop-blur-sm"
          data-oid="8c.dwew"
        >
          <div
            className={`w-10 h-10 border-2 border-t-transparent rounded-full animate-spin border-${variant}-400`}
            data-oid="fwzjkwa"
          />
        </div>
      )}

      {/* Card header with title, subtitle and icon */}
      {(title || icon) && (
        <div
          className={`flex justify-between items-center ${title && subtitle ? "mb-4" : "mb-2"} ${paddingClass}`}
          data-oid="5:5goej"
        >
          <div className="flex items-center gap-2" data-oid="mhbllct">
            {icon && (
              <div className={`text-${variant}-400 text-lg`} data-oid="o3k6x0x">
                <i className={icon} data-oid="7-0063e"></i>
              </div>
            )}
            <div data-oid="fopa19c">
              {title && (
                <h3
                  className="text-md font-space text-white"
                  data-oid="23g5qim"
                >
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-gray-400" data-oid="lq88bcs">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Expandable/collapsible controls */}
          {(expandable || collapsible) && (
            <button
              onClick={handleToggleExpand}
              className={`text-xs text-${variant}-400 hover:text-${variant}-300 transition-colors`}
              aria-label={isExpanded ? "Collapse" : "Expand"}
              data-oid="upi39_y"
            >
              <i
                className={`fas fa-chevron-${isExpanded ? "up" : "down"}`}
                data-oid="o2kkf5r"
              ></i>
            </button>
          )}
        </div>
      )}

      {/* Card content */}
      <div
        className={`
        ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}
        transition-all duration-500 ease-in-out
        ${!title && !icon ? paddingClass : ""}
        ${title || icon ? paddingClass.replace("p-", "px-") : ""}
      `}
        data-oid="168sl_e"
      >
        {children}
      </div>

      {/* Card footer */}
      {footerContent && (
        <div
          className={`mt-4 pt-3 border-t border-${variant}-900/30 ${paddingClass}`}
          data-oid="hxtoo8b"
        >
          {footerContent}
        </div>
      )}

      {/* Hover highlight effect for interactive cards */}
      {interactive && isHovered && (
        <div
          className={`absolute inset-0 bg-gradient-to-b from-${variant}-500/5 to-transparent pointer-events-none opacity-30`}
          data-oid="cq:_.n."
        ></div>
      )}
    </div>
  );
};

export default GlassCard;
