import React, { useState, useEffect } from "react";

interface AnimatedIconProps {
  animationKey: string;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({ animationKey }) => {
  const [animationFrame, setAnimationFrame] = useState(0);

  // Trigger animation frames
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame((prev) => (prev + 1) % 60); // 60 frames for animation cycle
    }, 50); // 50ms per frame for smooth animation

    return () => clearInterval(interval);
  }, []);

  // Reset animation when key changes
  useEffect(() => {
    setAnimationFrame(0);
  }, [animationKey]);

  // Set icon size
  const size = 80;

  // Render the appropriate animation based on the key
  switch (animationKey) {
    case "welcome":
      return (
        <WelcomeAnimation
          size={size}
          frame={animationFrame}
          data-oid="h8mauq2"
        />
      );

    case "dashboard":
      return (
        <DashboardAnimation
          size={size}
          frame={animationFrame}
          data-oid="flp1usb"
        />
      );

    case "calculators":
      return (
        <CalculatorsAnimation
          size={size}
          frame={animationFrame}
          data-oid="-3g1umg"
        />
      );

    case "weather":
      return (
        <WeatherAnimation
          size={size}
          frame={animationFrame}
          data-oid="749el.o"
        />
      );

    case "timer":
      return (
        <TimerAnimation size={size} frame={animationFrame} data-oid="s3p11dg" />
      );

    case "models":
      return (
        <ModelsAnimation
          size={size}
          frame={animationFrame}
          data-oid="z_c_446"
        />
      );

    case "completed":
      return (
        <CompletedAnimation
          size={size}
          frame={animationFrame}
          data-oid="sl6s:5q"
        />
      );

    default:
      return (
        <DefaultAnimation
          size={size}
          frame={animationFrame}
          data-oid="o1xhqs6"
        />
      );
  }
};

// Welcome animation (building construction)
const WelcomeAnimation: React.FC<{ size: number; frame: number }> = ({
  size,
  frame,
}) => {
  // Animation progress from 0 to 1
  const progress = Math.min(1, frame / 30);

  // Building height grows with progress
  const buildingHeight = size * 0.6 * progress;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      data-oid="mxp9le5"
    >
      {/* Base */}
      <rect
        x={size * 0.2}
        y={size * 0.8}
        width={size * 0.6}
        height={size * 0.1}
        fill="#333"
        data-oid="mol34cp"
      />

      {/* Building */}
      <rect
        x={size * 0.25}
        y={size * 0.8 - buildingHeight}
        width={size * 0.5}
        height={buildingHeight}
        fill="#00e6ff"
        fillOpacity="0.3"
        stroke="#00e6ff"
        strokeWidth="2"
        data-oid=".4wxfcq"
      />

      {/* Windows (appear as building grows) */}
      {progress > 0.3 && (
        <>
          <rect
            x={size * 0.3}
            y={size * 0.75 - buildingHeight * 0.8}
            width={size * 0.1}
            height={size * 0.08}
            fill="#ffffff"
            fillOpacity="0.8"
            data-oid="lt4ene."
          />

          <rect
            x={size * 0.6}
            y={size * 0.75 - buildingHeight * 0.8}
            width={size * 0.1}
            height={size * 0.08}
            fill="#ffffff"
            fillOpacity="0.8"
            data-oid="y2zjfaj"
          />
        </>
      )}

      {progress > 0.6 && (
        <>
          <rect
            x={size * 0.3}
            y={size * 0.55 - buildingHeight * 0.5}
            width={size * 0.1}
            height={size * 0.08}
            fill="#ffffff"
            fillOpacity="0.8"
            data-oid="3par70n"
          />

          <rect
            x={size * 0.6}
            y={size * 0.55 - buildingHeight * 0.5}
            width={size * 0.1}
            height={size * 0.08}
            fill="#ffffff"
            fillOpacity="0.8"
            data-oid="_zg8.lm"
          />
        </>
      )}

      {/* Construction crane (rotates) */}
      <g
        transform={`translate(${size * 0.7}, ${size * 0.3}) rotate(${10 * Math.sin(frame * 0.1)})`}
        data-oid="zsrulaq"
      >
        <rect
          x={-2}
          y={0}
          width={4}
          height={size * 0.4}
          fill="#FFA500"
          data-oid="24nc5od"
        />

        <rect
          x={-size * 0.3}
          y={-2}
          width={size * 0.3}
          height={4}
          fill="#FFA500"
          data-oid="d5dcmko"
        />

        <circle cx={0} cy={0} r={4} fill="#FF0000" data-oid="61l:8_h" />

        {/* Crane cable */}
        <line
          x1={-size * 0.2}
          y1={0}
          x2={-size * 0.2}
          y2={size * 0.2 + 5 * Math.sin(frame * 0.2)}
          stroke="#444"
          strokeWidth="1"
          data-oid="3hk7wv8"
        />

        {/* Crane hook */}
        <circle
          cx={-size * 0.2}
          cy={size * 0.2 + 5 * Math.sin(frame * 0.2)}
          r={3}
          fill="#999"
          data-oid="_a3ksf5"
        />
      </g>
    </svg>
  );
};

// Dashboard animation
const DashboardAnimation: React.FC<{ size: number; frame: number }> = ({
  size,
  frame,
}) => {
  // Animation progress controls appearance of dashboard elements
  const progress = Math.min(1, frame / 30);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      data-oid="up4b5t2"
    >
      {/* Dashboard frame */}
      <rect
        x={size * 0.1}
        y={size * 0.1}
        width={size * 0.8}
        height={size * 0.8}
        rx={size * 0.05}
        fill="#141629"
        stroke="#00e6ff"
        strokeWidth="2"
        strokeOpacity={progress}
        data-oid="y7q7ant"
      />

      {/* Header bar */}
      {progress > 0.2 && (
        <rect
          x={size * 0.1}
          y={size * 0.1}
          width={size * 0.8}
          height={size * 0.15}
          rx={size * 0.05}
          fill="#0c0e1a"
          data-oid="2hph_-5"
        />
      )}

      {/* Chart */}
      {progress > 0.4 && (
        <g data-oid="-j_m..4">
          <rect
            x={size * 0.2}
            y={size * 0.35}
            width={size * 0.25}
            height={size * 0.4}
            rx={3}
            fill="#0c0e1a"
            data-oid="soow9_h"
          />

          {/* Chart bars */}
          <rect
            x={size * 0.23}
            y={size * 0.45}
            width={size * 0.05}
            height={size * 0.2}
            fill="#00e6ff"
            fillOpacity="0.7"
            data-oid="3.e4jz0"
          />

          <rect
            x={size * 0.31}
            y={size * 0.4}
            width={size * 0.05}
            height={size * 0.25}
            fill="#00f0c8"
            fillOpacity="0.7"
            data-oid="zk17qo4"
          />

          <rect
            x={size * 0.39}
            y={size * 0.5}
            width={size * 0.05}
            height={size * 0.15}
            fill="#00b4ff"
            fillOpacity="0.7"
            data-oid="5:xj-yy"
          />
        </g>
      )}

      {/* Weather widget */}
      {progress > 0.6 && (
        <g data-oid="0hd:9:j">
          <rect
            x={size * 0.55}
            y={size * 0.35}
            width={size * 0.25}
            height={size * 0.25}
            rx={3}
            fill="#0c0e1a"
            data-oid="hv0h_xs"
          />

          {/* Sun icon */}
          <circle
            cx={size * 0.63}
            cy={size * 0.45}
            r={size * 0.06}
            fill="#FFD700"
            data-oid="1jzp9wh"
          />

          {/* Animated cloud */}
          <ellipse
            cx={size * 0.73 - 2 * Math.sin(frame * 0.1)}
            cy={size * 0.45}
            rx={size * 0.07}
            ry={size * 0.04}
            fill="#FFFFFF"
            fillOpacity="0.7"
            data-oid="wq-2_gm"
          />
        </g>
      )}

      {/* Stats cards */}
      {progress > 0.8 && (
        <g data-oid="3phwimd">
          <rect
            x={size * 0.55}
            y={size * 0.65}
            width={size * 0.11}
            height={size * 0.1}
            rx={3}
            fill="#0c0e1a"
            data-oid="0x:.cqr"
          />

          <rect
            x={size * 0.69}
            y={size * 0.65}
            width={size * 0.11}
            height={size * 0.1}
            rx={3}
            fill="#0c0e1a"
            data-oid="_qf82e:"
          />
        </g>
      )}
    </svg>
  );
};

// Calculators animation
const CalculatorsAnimation: React.FC<{ size: number; frame: number }> = ({
  size,
  frame,
}) => {
  // Animation for calculator buttons
  const buttonPress = (buttonIndex: number) => {
    return Math.sin(frame * 0.2 + buttonIndex) > 0.8 ? 2 : 0;
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      data-oid="sxha6px"
    >
      {/* Calculator body */}
      <rect
        x={size * 0.2}
        y={size * 0.1}
        width={size * 0.6}
        height={size * 0.8}
        rx={5}
        fill="#0c0e1a"
        stroke="#00e6ff"
        strokeWidth="2"
        data-oid="umn9rhp"
      />

      {/* Calculator screen */}
      <rect
        x={size * 0.25}
        y={size * 0.15}
        width={size * 0.5}
        height={size * 0.15}
        rx={3}
        fill="#141629"
        data-oid="h16oyxd"
      />

      {/* Screen text (animated to show calculation) */}
      <text
        x={size * 0.7}
        y={size * 0.25}
        fontFamily="monospace"
        fontSize={size * 0.1}
        textAnchor="end"
        fill="#00e6ff"
        data-oid="57cd0wt"
      >
        {(123 + (Math.floor(frame / 10) % 10)).toString()}
      </text>

      {/* Calculator buttons */}
      <g data-oid="qws7jwe">
        {/* Row 1 */}
        <rect
          x={size * 0.25}
          y={size * 0.35}
          width={size * 0.1}
          height={size * 0.1}
          rx={3}
          fill="#141629"
          strokeWidth="1"
          stroke="#333"
          transform={`translate(0,${buttonPress(0)})`}
          data-oid="qwwkc_5"
        />

        <rect
          x={size * 0.38}
          y={size * 0.35}
          width={size * 0.1}
          height={size * 0.1}
          rx={3}
          fill="#141629"
          strokeWidth="1"
          stroke="#333"
          transform={`translate(0,${buttonPress(1)})`}
          data-oid="-:awk2n"
        />

        <rect
          x={size * 0.51}
          y={size * 0.35}
          width={size * 0.1}
          height={size * 0.1}
          rx={3}
          fill="#141629"
          strokeWidth="1"
          stroke="#333"
          transform={`translate(0,${buttonPress(2)})`}
          data-oid="09-04j-"
        />

        <rect
          x={size * 0.64}
          y={size * 0.35}
          width={size * 0.1}
          height={size * 0.1}
          rx={3}
          fill="#00b4ff"
          strokeWidth="1"
          stroke="#333"
          transform={`translate(0,${buttonPress(3)})`}
          data-oid="hgdtt13"
        />

        {/* Row 2 */}
        <rect
          x={size * 0.25}
          y={size * 0.48}
          width={size * 0.1}
          height={size * 0.1}
          rx={3}
          fill="#141629"
          strokeWidth="1"
          stroke="#333"
          transform={`translate(0,${buttonPress(4)})`}
          data-oid="mecjne3"
        />

        <rect
          x={size * 0.38}
          y={size * 0.48}
          width={size * 0.1}
          height={size * 0.1}
          rx={3}
          fill="#141629"
          strokeWidth="1"
          stroke="#333"
          transform={`translate(0,${buttonPress(5)})`}
          data-oid="--v6txr"
        />

        <rect
          x={size * 0.51}
          y={size * 0.48}
          width={size * 0.1}
          height={size * 0.1}
          rx={3}
          fill="#141629"
          strokeWidth="1"
          stroke="#333"
          transform={`translate(0,${buttonPress(6)})`}
          data-oid="ltlhgi5"
        />

        <rect
          x={size * 0.64}
          y={size * 0.48}
          width={size * 0.1}
          height={size * 0.1}
          rx={3}
          fill="#00b4ff"
          strokeWidth="1"
          stroke="#333"
          transform={`translate(0,${buttonPress(7)})`}
          data-oid="8o_tra3"
        />

        {/* Row 3 */}
        <rect
          x={size * 0.25}
          y={size * 0.61}
          width={size * 0.1}
          height={size * 0.1}
          rx={3}
          fill="#141629"
          strokeWidth="1"
          stroke="#333"
          transform={`translate(0,${buttonPress(8)})`}
          data-oid="578-waq"
        />

        <rect
          x={size * 0.38}
          y={size * 0.61}
          width={size * 0.1}
          height={size * 0.1}
          rx={3}
          fill="#141629"
          strokeWidth="1"
          stroke="#333"
          transform={`translate(0,${buttonPress(9)})`}
          data-oid="w5ynuhr"
        />

        <rect
          x={size * 0.51}
          y={size * 0.61}
          width={size * 0.1}
          height={size * 0.1}
          rx={3}
          fill="#141629"
          strokeWidth="1"
          stroke="#333"
          transform={`translate(0,${buttonPress(10)})`}
          data-oid="xtc:n96"
        />

        <rect
          x={size * 0.64}
          y={size * 0.61}
          width={size * 0.1}
          height={size * 0.1}
          rx={3}
          fill="#00b4ff"
          strokeWidth="1"
          stroke="#333"
          transform={`translate(0,${buttonPress(11)})`}
          data-oid="00gouoh"
        />

        {/* Row 4 - Equal button */}
        <rect
          x={size * 0.25}
          y={size * 0.74}
          width={size * 0.49}
          height={size * 0.1}
          rx={3}
          fill="#00e6ff"
          strokeWidth="1"
          stroke="#333"
          transform={`translate(0,${buttonPress(12)})`}
          data-oid="kkq8c_f"
        />
      </g>
    </svg>
  );
};

// Weather animation
const WeatherAnimation: React.FC<{ size: number; frame: number }> = ({
  size,
  frame,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      data-oid="jo4suoe"
    >
      {/* Sky background */}
      <rect
        x={0}
        y={0}
        width={size}
        height={size}
        rx={10}
        fill="#0c0e1a"
        data-oid="w5jpa6y"
      />

      {/* Sun with rays */}
      <g
        transform={`translate(${size * 0.3}, ${size * 0.35})`}
        data-oid="5ss7bp4"
      >
        <circle
          cx={0}
          cy={0}
          r={size * 0.12}
          fill="#FFD700"
          filter="drop-shadow(0 0 5px #FFD700)"
          data-oid="vi-00o2"
        />

        {/* Sun rays (animated) */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={angle}
            x1={0}
            y1={0}
            x2={
              (size * 0.15 + 3 * Math.sin(frame * 0.1)) *
              Math.cos((angle * Math.PI) / 180)
            }
            y2={
              (size * 0.15 + 3 * Math.sin(frame * 0.1)) *
              Math.sin((angle * Math.PI) / 180)
            }
            stroke="#FFD700"
            strokeWidth="2"
            strokeOpacity={0.6 + 0.4 * Math.sin(frame * 0.1 + i)}
            data-oid="8zmumnc"
          />
        ))}
      </g>

      {/* Cloud (animated) */}
      <g
        transform={`translate(${size * 0.6 + 3 * Math.sin(frame * 0.05)}, ${size * 0.4})`}
        data-oid="4vd2qn8"
      >
        <ellipse
          cx={0}
          cy={0}
          rx={size * 0.15}
          ry={size * 0.08}
          fill="white"
          fillOpacity="0.8"
          data-oid="id5.w.v"
        />

        <ellipse
          cx={size * 0.1}
          cy={-size * 0.03}
          rx={size * 0.1}
          ry={size * 0.06}
          fill="white"
          fillOpacity="0.8"
          data-oid="6fifsm_"
        />

        <ellipse
          cx={-size * 0.08}
          cy={-size * 0.02}
          rx={size * 0.1}
          ry={size * 0.05}
          fill="white"
          fillOpacity="0.8"
          data-oid="2ep0tja"
        />
      </g>

      {/* Rain drops (animated) */}
      {[...Array(6)].map((_, i) => {
        const startX = size * 0.5 + (i % 3) * 10;
        const startY = size * 0.5 + Math.floor(i / 3) * 15;
        const offset = (frame + i * 10) % 30;
        return (
          <line
            key={i}
            x1={startX}
            y1={startY + offset}
            x2={startX + 3}
            y2={startY + offset + 8}
            stroke="#00e6ff"
            strokeWidth="2"
            strokeOpacity={offset > 25 ? 0 : 1}
            data-oid="b..qlbs"
          />
        );
      })}

      {/* Construction element */}
      <g
        transform={`translate(${size * 0.25}, ${size * 0.7})`}
        data-oid="-e9mtt2"
      >
        <rect
          x={0}
          y={0}
          width={size * 0.5}
          height={size * 0.1}
          fill="#8B4513"
          data-oid="7mdot.1"
        />

        <rect
          x={size * 0.15}
          y={-size * 0.2}
          width={size * 0.05}
          height={size * 0.2}
          fill="#A0522D"
          data-oid="p.milzk"
        />

        <rect
          x={size * 0.35}
          y={-size * 0.15}
          width={size * 0.05}
          height={size * 0.15}
          fill="#A0522D"
          data-oid="_65-1.t"
        />

        <rect
          x={size * 0.1}
          y={-size * 0.25}
          width={size * 0.3}
          height={size * 0.05}
          fill="#A0522D"
          data-oid="il7eh6s"
        />

        {/* Construction warning sign (blinking) */}
        <g opacity={0.5 + 0.5 * Math.sin(frame * 0.2)} data-oid="zet7xjx">
          <polygon
            points={`${size * 0.25},${-size * 0.3} ${size * 0.2},${-size * 0.25} ${size * 0.3},${-size * 0.25}`}
            fill="yellow"
            data-oid="mracfxu"
          />

          <text
            x={size * 0.25}
            y={-size * 0.27}
            fontSize="8"
            textAnchor="middle"
            fill="black"
            data-oid="no5jepv"
          >
            !
          </text>
        </g>
      </g>

      {/* Weather impact text */}
      <text
        x={size * 0.5}
        y={size * 0.9}
        fontFamily="Arial"
        fontSize={size * 0.06}
        textAnchor="middle"
        fill="#00e6ff"
        opacity={0.5 + 0.5 * Math.sin(frame * 0.1)}
        data-oid="d8dgn6p"
      >
        IMPACT
      </text>
    </svg>
  );
};

// Timer animation
const TimerAnimation: React.FC<{ size: number; frame: number }> = ({
  size,
  frame,
}) => {
  // Animate timer digits
  const timeDisplay = () => {
    const hours = Math.floor(frame / 60) % 24;
    const minutes = frame % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  // Animate indicator pulse
  const indicatorOpacity = 0.5 + 0.5 * Math.sin(frame * 0.2);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      data-oid="xk0me8m"
    >
      {/* Timer outer circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size * 0.4}
        fill="none"
        stroke="#00e6ff"
        strokeWidth="3"
        data-oid="bcsaba2"
      />

      {/* Timer face */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size * 0.35}
        fill="#0c0e1a"
        data-oid=":lkx9gq"
      />

      {/* Timer digital display */}
      <rect
        x={size * 0.3}
        y={size * 0.4}
        width={size * 0.4}
        height={size * 0.2}
        rx={3}
        fill="#141629"
        data-oid="v-4nk5n"
      />

      {/* Digital time */}
      <text
        x={size / 2}
        y={size * 0.55}
        fontFamily="monospace"
        fontSize={size * 0.13}
        textAnchor="middle"
        fill="#00e6ff"
        data-oid="baj0fno"
      >
        {timeDisplay()}
      </text>

      {/* Start/stop button */}
      <circle
        cx={size / 2}
        cy={size * 0.75}
        r={size * 0.08}
        fill={frame % 120 < 60 ? "#00e6ff" : "#ff3464"}
        opacity={indicatorOpacity}
        data-oid="bed9ikp"
      />

      {/* Play/stop icon */}
      {frame % 120 < 60 ? (
        <polygon
          points={`${size * 0.46},${size * 0.72} ${size * 0.46},${size * 0.78} ${size * 0.54},${size * 0.75}`}
          fill="#0c0e1a"
          data-oid="ae_ub37"
        />
      ) : (
        <rect
          x={size * 0.45}
          y={size * 0.72}
          width={size * 0.1}
          height={size * 0.06}
          fill="#0c0e1a"
          data-oid="r_haj1d"
        />
      )}

      {/* Recording indicator */}
      <circle
        cx={size * 0.8}
        cy={size * 0.2}
        r={size * 0.04}
        fill="#ff3464"
        opacity={indicatorOpacity}
        data-oid="98i6_iw"
      />

      {/* Timer label */}
      <text
        x={size / 2}
        y={size * 0.3}
        fontFamily="Arial"
        fontSize={size * 0.06}
        textAnchor="middle"
        fill="white"
        data-oid="30--yo4"
      >
        JOB TIMER
      </text>
    </svg>
  );
};

// 3D Models animation
const ModelsAnimation: React.FC<{ size: number; frame: number }> = ({
  size,
  frame,
}) => {
  // Animation progress (0 to 1)
  const progress = frame / 60;

  // Rotation for 3D effect
  const rotateX = 40 + 10 * Math.sin(frame * 0.05);
  const rotateY = 30 * Math.sin(frame * 0.03);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      data-oid="bw.exry"
    >
      {/* Background */}
      <rect
        x={0}
        y={0}
        width={size}
        height={size}
        rx={10}
        fill="#0c0e1a"
        data-oid="k2anzed"
      />

      {/* 3D Cube */}
      <g
        transform={`translate(${size / 2}, ${size / 2}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`}
        data-oid="esck.eh"
      >
        {/* Front face */}
        <polygon
          points={`${-size * 0.2},${-size * 0.2} ${size * 0.2},${-size * 0.2} ${size * 0.2},${size * 0.2} ${-size * 0.2},${size * 0.2}`}
          fill="#00e6ff"
          fillOpacity="0.3"
          stroke="#00e6ff"
          strokeWidth="2"
          data-oid="zm8k228"
        />

        {/* Top face */}
        <polygon
          points={`${-size * 0.2},${-size * 0.2} ${size * 0.2},${-size * 0.2} ${size * 0.1},${-size * 0.3} ${-size * 0.3},${-size * 0.3}`}
          fill="#00b4ff"
          fillOpacity="0.3"
          stroke="#00b4ff"
          strokeWidth="2"
          data-oid="yzxezkc"
        />

        {/* Right face */}
        <polygon
          points={`${size * 0.2},${-size * 0.2} ${size * 0.1},${-size * 0.3} ${size * 0.1},${size * 0.1} ${size * 0.2},${size * 0.2}`}
          fill="#00f0c8"
          fillOpacity="0.3"
          stroke="#00f0c8"
          strokeWidth="2"
          data-oid="891uh:8"
        />
      </g>

      {/* 3D wireframe grid */}
      <g transform={`translate(${size / 2}, ${size / 2})`} data-oid="1grt:dk">
        {/* Grid lines */}
        {[...Array(5)].map((_, i) => (
          <g key={i} data-oid="s4gd:l4">
            <line
              x1={-size * 0.3 + i * size * 0.15}
              y1={-size * 0.3}
              x2={-size * 0.3 + i * size * 0.15}
              y2={size * 0.3}
              stroke="#00e6ff"
              strokeOpacity="0.2"
              strokeWidth="1"
              data-oid="j84n:9z"
            />

            <line
              x1={-size * 0.3}
              y1={-size * 0.3 + i * size * 0.15}
              x2={size * 0.3}
              y2={-size * 0.3 + i * size * 0.15}
              stroke="#00e6ff"
              strokeOpacity="0.2"
              strokeWidth="1"
              data-oid="ro17vd4"
            />
          </g>
        ))}
      </g>

      {/* Measurement dimension lines */}
      <g data-oid="k8rs0xr">
        <line
          x1={size * 0.2}
          y1={size * 0.8}
          x2={size * 0.8}
          y2={size * 0.8}
          stroke="#00f0c8"
          strokeWidth="1"
          strokeDasharray="4,2"
          data-oid="1yyzkoi"
        />

        <line
          x1={size * 0.2}
          y1={size * 0.78}
          x2={size * 0.2}
          y2={size * 0.82}
          stroke="#00f0c8"
          strokeWidth="1"
          data-oid="eqg373a"
        />

        <line
          x1={size * 0.8}
          y1={size * 0.78}
          x2={size * 0.8}
          y2={size * 0.82}
          stroke="#00f0c8"
          strokeWidth="1"
          data-oid="b1782tk"
        />

        <text
          x={size * 0.5}
          y={size * 0.77}
          fontFamily="monospace"
          fontSize={size * 0.04}
          textAnchor="middle"
          fill="#00f0c8"
          data-oid="p1q7y4a"
        >
          600mm
        </text>
      </g>

      {/* 3D label */}
      <text
        x={size / 2}
        y={size * 0.15}
        fontFamily="Arial"
        fontSize={size * 0.07}
        textAnchor="middle"
        fill="white"
        fontWeight="bold"
        data-oid="r0uliwt"
      >
        3D MODEL
      </text>
    </svg>
  );
};

// Completed animation
const CompletedAnimation: React.FC<{ size: number; frame: number }> = ({
  size,
  frame,
}) => {
  // Checkmark animation
  const checkmarkLength = 60; // Total length of the checkmark path
  const drawLength = Math.min(checkmarkLength, frame * 2); // Control animation speed

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      data-oid="5rutbu."
    >
      {/* Circle background */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size * 0.35}
        fill="none"
        stroke="#00e6ff"
        strokeWidth="3"
        strokeDasharray={`${2 * Math.PI * size * 0.35}`}
        strokeDashoffset={`${2 * Math.PI * size * 0.35 * (1 - Math.min(1, frame / 30))}`}
        data-oid="axy9.pr"
      />

      {/* Checkmark */}
      <path
        d={`M${size * 0.3},${size * 0.5} L${size * 0.45},${size * 0.65} L${size * 0.7},${size * 0.35}`}
        fill="none"
        stroke="#00f0c8"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={`${checkmarkLength}`}
        strokeDashoffset={`${checkmarkLength - drawLength}`}
        data-oid="rlde1la"
      />

      {/* Particles effect */}
      {frame > 30 &&
        [...Array(12)].map((_, i) => {
          const angle = (i / 12) * 2 * Math.PI;
          const distance = size * 0.2 * Math.min(1, (frame - 30) / 15);
          return (
            <circle
              key={i}
              cx={size / 2 + distance * Math.cos(angle)}
              cy={size / 2 + distance * Math.sin(angle)}
              r={size * 0.02}
              fill="#00e6ff"
              opacity={(60 - frame) / 30}
              data-oid="27qk4_q"
            />
          );
        })}

      {/* Success text */}
      <text
        x={size / 2}
        y={size * 0.85}
        fontFamily="Arial"
        fontSize={size * 0.07}
        textAnchor="middle"
        fill="white"
        opacity={Math.min(1, Math.max(0, (frame - 40) / 10))}
        data-oid="v7_ps:w"
      >
        COMPLETE!
      </text>
    </svg>
  );
};

// Default animation (fallback)
const DefaultAnimation: React.FC<{ size: number; frame: number }> = ({
  size,
  frame,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      data-oid="w.nccf2"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size * 0.3 + size * 0.05 * Math.sin(frame * 0.1)}
        fill="none"
        stroke="#00e6ff"
        strokeWidth="3"
        data-oid="8hfwjzp"
      />

      <text
        x={size / 2}
        y={size / 2}
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#00e6ff"
        fontSize={size * 0.2}
        data-oid="lzr4bpc"
      >
        STR8
      </text>
      <text
        x={size / 2}
        y={size * 0.62}
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#00f0c8"
        fontSize={size * 0.1}
        data-oid="whwja0h"
      >
        BUILD
      </text>
    </svg>
  );
};
