import { FC, useEffect, useRef, useState } from "react";

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: FC<AnimatedBackgroundProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  // Button hover state for enhanced interactions
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Function to toggle performance mode
  const togglePerformanceMode = () => {
    setIsLowPowerMode((prev) => !prev);
    localStorage.setItem(
      "str8-build-low-power-mode",
      (!isLowPowerMode).toString(),
    );
  };

  useEffect(() => {
    // Check if low power mode is enabled in local storage
    const savedMode = localStorage.getItem("str8-build-low-power-mode");
    if (savedMode) {
      setIsLowPowerMode(savedMode === "true");
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    // Call initially and on resize
    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Adjust particle count based on screen size and performance mode
    const screenArea = window.innerWidth * window.innerHeight;
    const baseCount = Math.min(Math.floor(screenArea / 15000), 150);
    const particleCount = isLowPowerMode
      ? Math.floor(baseCount / 2)
      : baseCount;

    const particles: Particle[] = [];

    // Grid lines configuration
    const gridSize = isLowPowerMode ? 70 : 40;
    const gridOpacity = isLowPowerMode ? 0.08 : 0.12; // Increased opacity for better visibility

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5 + 1.5, // Increased particle size
        color: getRandomColor(),
        velocity: {
          x: (Math.random() - 0.5) * (isLowPowerMode ? 0.3 : 0.5),
          y: (Math.random() - 0.5) * (isLowPowerMode ? 0.3 : 0.5),
        },
      });
    }

    // Add some special larger particles
    if (!isLowPowerMode) {
      for (let i = 0; i < 8; i++) {
        // More special particles
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3.5 + 3.0, // Even larger special particles
          color: "#06f7f7",
          velocity: {
            x: (Math.random() - 0.5) * 0.3,
            y: (Math.random() - 0.5) * 0.3,
          },
        });
      }
    }

    // Animation variables
    let animationFrameId: number;
    let lastFrameTime = 0;
    const targetFPS = isLowPowerMode ? 20 : 30;
    const frameDelay = 1000 / targetFPS;

    // Animation loop
    const render = (currentTime: number) => {
      // Throttle FPS
      if (currentTime - lastFrameTime < frameDelay) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = currentTime;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines with perspective effect
      drawGrid(ctx, canvas.width, canvas.height, gridSize, gridOpacity);

      // Update and draw particles
      for (const particle of particles) {
        // Update position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with glow effect for larger particles
        ctx.beginPath();

        if (particle.radius > 2) {
          // Add glow effect for special particles
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.radius * 3,
          );
          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(1, "rgba(6, 247, 247, 0)");

          ctx.fillStyle = gradient;
          ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = particle.color;
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        }

        ctx.fill();
      }

      // Connect nearby particles with lines (skip in low power mode or limit connections)
      if (!isLowPowerMode) {
        const connectionDistance = 150;
        const connectionLimit = 5; // Maximum connections per particle

        for (let i = 0; i < particles.length; i++) {
          let connections = 0;
          for (
            let j = i + 1;
            j < particles.length && connections < connectionLimit;
            j++
          ) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              const opacity = (1 - distance / connectionDistance) * 0.2;

              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);

              // Use gradient for connections
              const gradient = ctx.createLinearGradient(
                particles[i].x,
                particles[i].y,
                particles[j].x,
                particles[j].y,
              );

              // Safely parse the colors for the gradient
              const color1 = particles[i].color.includes("rgba")
                ? particles[i].color.replace(
                    /rgba\((.*?),(.*?),(.*?),(.*?)\)/,
                    (_, r, g, b) => `rgba(${r},${g},${b},${opacity})`,
                  )
                : `rgba(102, 204, 255, ${opacity})`;

              const color2 = particles[j].color.includes("rgba")
                ? particles[j].color.replace(
                    /rgba\((.*?),(.*?),(.*?),(.*?)\)/,
                    (_, r, g, b) => `rgba(${r},${g},${b},${opacity})`,
                  )
                : `rgba(102, 204, 255, ${opacity})`;

              gradient.addColorStop(0, color1);
              gradient.addColorStop(1, color2);

              ctx.strokeStyle = gradient;
              ctx.lineWidth = 0.5;
              ctx.stroke();

              connections++;
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Start animation
    animationFrameId = requestAnimationFrame(render);

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLowPowerMode, className]);

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-space-950 z-[-1]"
        data-oid="rge-7me"
      >
        <canvas
          ref={canvasRef}
          className={`absolute top-0 left-0 w-full h-full ${className}`}
          style={{ zIndex: 0 }}
          data-oid="r-1rq3j"
        />

        {/* Overlay gradient for better visibility */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-space-950/50 to-space-950/80"
          style={{ zIndex: 1 }}
          data-oid="wu2ketc"
        ></div>
      </div>

      {/* Performance mode toggle button with professional styling */}
      <button
        className={`
          fixed right-3 top-16 z-50 
          flex items-center justify-center gap-1.5
          px-3 py-2 rounded-lg 
          font-medium text-xs tracking-wide
          transition-all duration-300
          backdrop-blur-lg shadow-lg
          ${
            isLowPowerMode
              ? "bg-gradient-to-r from-green-900/20 to-space-900/40 text-green-400 border border-green-900/40"
              : "bg-gradient-to-r from-cyan-900/20 to-space-900/40 text-cyan-300 border border-cyan-900/40"
          }
          ${isButtonHovered ? "translate-y-[-2px]" : ""}
        `}
        onClick={togglePerformanceMode}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        title={
          isLowPowerMode
            ? "Switch to full graphics mode"
            : "Switch to power saving mode"
        }
        data-component-name="AnimatedBackground"
        data-oid="r-8x:rb"
      >
        {/* Glow effect for button */}
        {isButtonHovered && (
          <div
            className={`
            absolute inset-0 -z-10 rounded-lg blur-md opacity-30
            ${isLowPowerMode ? "bg-green-500/20" : "bg-cyan-500/20"}
          `}
            data-oid="-1h.wtu"
          ></div>
        )}

        {/* Icon with subtle animation on hover */}
        <div
          className={`
          flex items-center justify-center 
          ${isButtonHovered ? "scale-110" : ""}
          transition-transform duration-300
        `}
          data-oid="8sklpoa"
        >
          <i
            className={`
            fas 
            ${
              isLowPowerMode
                ? "fa-leaf text-green-400"
                : "fa-bolt text-yellow-400"
            } 
            text-base
            ${isButtonHovered ? "animate-pulse" : ""}
          `}
            data-oid="3z-.5s3"
          ></i>
        </div>

        {/* Mode Label */}
        <span data-oid="c29yrrk">
          {isLowPowerMode ? "Eco Mode" : "Full Graphics"}
        </span>

        {/* Active indicator dot */}
        <span
          className={`
          ml-1 h-1.5 w-1.5 rounded-full 
          ${
            isLowPowerMode
              ? "bg-green-400 animate-pulse"
              : "bg-cyan-400 animate-pulse"
          }
        `}
          data-oid=":cj8bdb"
        ></span>
      </button>
    </>
  );
};

// Helper functions
function getRandomColor() {
  const colors = [
    "rgba(0, 180, 255, 0.9)", // Bright Cyan/blue
    "rgba(30, 220, 255, 0.9)", // Electric blue
    "rgba(170, 120, 255, 0.9)", // Bright purple
    "rgba(0, 255, 230, 0.9)", // Bright teal
    "rgba(230, 120, 255, 0.9)", // Bright pink
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  gridSize: number,
  opacity: number,
) {
  const horizonY = height * 0.6; // Horizon point

  // Draw main grid lines (thicker)
  const mainGridSize = gridSize * 4;
  ctx.strokeStyle = `rgba(0, 220, 255, ${opacity * 2})`; // Brighter color for main grid
  ctx.lineWidth = 1.0; // Thicker lines

  // Draw horizontal main grid lines with perspective
  for (let y = 0; y < height; y += mainGridSize) {
    const perspectiveY =
      y > horizonY
        ? horizonY + (y - horizonY) * 0.5 // Squeeze lines together below horizon
        : y;

    ctx.beginPath();
    ctx.moveTo(0, perspectiveY);
    ctx.lineTo(width, perspectiveY);
    ctx.stroke();
  }

  // Draw vertical main grid lines with perspective
  for (let x = 0; x < width; x += mainGridSize) {
    ctx.beginPath();

    // Create a slight curve for vertical lines (more pronounced for main grid)
    const centerX = width / 2;
    const distFromCenter = Math.abs(x - centerX);
    const curveStrength = 0.0001 * distFromCenter * distFromCenter;

    if (x < centerX) {
      // Left side curves right
      ctx.moveTo(x, 0);
      ctx.quadraticCurveTo(x + curveStrength * width, height / 2, x, height);
    } else {
      // Right side curves left
      ctx.moveTo(x, 0);
      ctx.quadraticCurveTo(x - curveStrength * width, height / 2, x, height);
    }

    ctx.stroke();
  }

  // Draw minor grid lines (regular)
  ctx.strokeStyle = `rgba(0, 180, 255, ${opacity})`;
  ctx.lineWidth = 0.7;

  // Draw horizontal lines with perspective
  for (let y = 0; y < height; y += gridSize) {
    // Skip if this is a major grid line
    if (y % mainGridSize === 0) continue;

    const perspectiveY = y > horizonY ? horizonY + (y - horizonY) * 0.5 : y;

    ctx.beginPath();
    ctx.moveTo(0, perspectiveY);
    ctx.lineTo(width, perspectiveY);
    ctx.stroke();
  }

  // Draw vertical lines with slight curve for perspective
  for (let x = 0; x < width; x += gridSize) {
    // Skip if this is a major grid line
    if (x % mainGridSize === 0) continue;

    ctx.beginPath();
    ctx.moveTo(x, 0);

    // Create a slight curve for vertical lines
    const centerX = width / 2;
    const distFromCenter = Math.abs(x - centerX);
    const curveStrength = 0.00005 * distFromCenter * distFromCenter;

    if (x < centerX) {
      // Left side curves right
      ctx.quadraticCurveTo(x + curveStrength * width, height / 2, x, height);
    } else {
      // Right side curves left
      ctx.quadraticCurveTo(x - curveStrength * width, height / 2, x, height);
    }

    ctx.stroke();
  }
}

// Particle type
interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
}

export default AnimatedBackground;
