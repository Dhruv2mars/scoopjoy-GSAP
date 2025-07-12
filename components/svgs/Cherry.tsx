"use client";

import React from "react";

interface CherryProps {
  className?: string;
  size?: number;
}

export const Cherry: React.FC<CherryProps> = ({ 
  className = "", 
  size = 40
}) => {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 40 48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="cherryGradient" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="70%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </radialGradient>
        <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <filter id="cherryShadow">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>
      
      {/* Cherry stem */}
      <path
        d="M20 5 Q18 10 20 15"
        stroke="url(#stemGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Small leaf */}
      <ellipse
        cx="18"
        cy="8"
        rx="3"
        ry="1.5"
        fill="#22c55e"
        transform="rotate(-30 18 8)"
      />
      
      {/* Main cherry body */}
      <circle
        cx="20"
        cy="30"
        r="15"
        fill="url(#cherryGradient)"
        filter="url(#cherryShadow)"
      />
      
      {/* Cherry highlight */}
      <ellipse
        cx="15"
        cy="25"
        rx="5"
        ry="3"
        fill="#ff9999"
        opacity="0.6"
      />
      
      {/* Small reflection */}
      <circle
        cx="25"
        cy="35"
        r="2"
        fill="#ffffff"
        opacity="0.4"
      />
    </svg>
  );
};