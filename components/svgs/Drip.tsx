"use client";

import React from "react";

interface DripProps {
  className?: string;
  color?: string;
  size?: number;
  direction?: "down" | "left" | "right";
}

export const Drip: React.FC<DripProps> = ({ 
  className = "", 
  color = "#ff9999",
  size = 60,
  direction = "down"
}) => {
  const getDripPath = () => {
    switch (direction) {
      case "left":
        return "M40 10 Q35 15 30 20 Q25 25 20 30 Q15 35 10 40 Q8 42 10 44 Q12 42 15 40 Q20 35 25 30 Q30 25 35 20 Q40 15 45 10";
      case "right":
        return "M10 10 Q15 15 20 20 Q25 25 30 30 Q35 35 40 40 Q42 42 40 44 Q38 42 35 40 Q30 35 25 30 Q20 25 15 20 Q10 15 5 10";
      default: // down
        return "M20 5 Q22 10 24 15 Q26 20 28 25 Q30 30 32 35 Q34 40 36 45 Q38 50 36 52 Q34 50 32 45 Q30 40 28 35 Q26 30 24 25 Q22 20 20 15 Q18 10 16 5";
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 60"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`dripGradient-${direction}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.6" />
        </linearGradient>
        <filter id="dripShadow">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.2" />
        </filter>
      </defs>
      
      {/* Main drip path */}
      <path
        d={getDripPath()}
        fill="none"
        stroke={`url(#dripGradient-${direction})`}
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#dripShadow)"
        className="drip-path"
      />
      
      {/* Drip droplet at the end */}
      <circle
        cx={direction === "left" ? "10" : direction === "right" ? "40" : "36"}
        cy={direction === "down" ? "52" : "44"}
        r="3"
        fill={color}
        filter="url(#dripShadow)"
        className="drip-droplet"
      />
      
      {/* Small highlight on droplet */}
      <circle
        cx={direction === "left" ? "9" : direction === "right" ? "39" : "35"}
        cy={direction === "down" ? "51" : "43"}
        r="1"
        fill="#ffffff"
        opacity="0.6"
      />
    </svg>
  );
};