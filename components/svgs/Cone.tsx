"use client";

import React from "react";

interface ConeProps {
  className?: string;
  color?: string;
  size?: number;
}

export const Cone: React.FC<ConeProps> = ({ 
  className = "", 
  color = "#D2691E", 
  size = 100 
}) => {
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 100 150"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cone gradient definition */}
      <defs>
        <linearGradient id="coneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="50%" stopColor="#CD853F" />
          <stop offset="100%" stopColor="#A0522D" />
        </linearGradient>
        <pattern id="waffle" patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="8" fill={color} />
          <path d="M0,8 L8,0 M-2,2 L2,-2 M6,10 L10,6" stroke="#A0522D" strokeWidth="1" />
        </pattern>
      </defs>
      
      {/* Main cone shape */}
      <path
        d="M20 30 L50 140 L80 30 Z"
        fill="url(#coneGradient)"
        stroke="#A0522D"
        strokeWidth="1"
      />
      
      {/* Waffle texture lines */}
      <g stroke="#A0522D" strokeWidth="0.5" opacity="0.7">
        <line x1="25" y1="40" x2="75" y2="40" />
        <line x1="28" y1="50" x2="72" y2="50" />
        <line x1="31" y1="60" x2="69" y2="60" />
        <line x1="34" y1="70" x2="66" y2="70" />
        <line x1="37" y1="80" x2="63" y2="80" />
        <line x1="40" y1="90" x2="60" y2="90" />
        <line x1="43" y1="100" x2="57" y2="100" />
        <line x1="46" y1="110" x2="54" y2="110" />
        <line x1="48" y1="120" x2="52" y2="120" />
        <line x1="49" y1="130" x2="51" y2="130" />
        
        {/* Diagonal lines for waffle pattern */}
        <line x1="20" y1="30" x2="35" y2="70" />
        <line x1="30" y1="30" x2="45" y2="90" />
        <line x1="40" y1="30" x2="50" y2="110" />
        <line x1="50" y1="30" x2="50" y2="130" />
        <line x1="60" y1="30" x2="50" y2="110" />
        <line x1="70" y1="30" x2="55" y2="90" />
        <line x1="80" y1="30" x2="65" y2="70" />
      </g>
      
      {/* Cone rim */}
      <ellipse
        cx="50"
        cy="30"
        rx="30"
        ry="5"
        fill="#F4A460"
        stroke="#A0522D"
        strokeWidth="1"
      />
    </svg>
  );
};