"use client";

import React from "react";

interface ScoopProps {
  className?: string;
  color?: string;
  size?: number;
  flavor?: string;
}

export const Scoop: React.FC<ScoopProps> = ({ 
  className = "", 
  color = "#ff9999", 
  size = 80,
  flavor = "strawberry"
}) => {
  const getScoopTexture = (flavor: string) => {
    switch (flavor) {
      case "mint":
        return (
          <g>
            <circle cx="40" cy="35" r="2" fill="#006400" opacity="0.6" />
            <circle cx="55" cy="45" r="1.5" fill="#006400" opacity="0.6" />
            <circle cx="30" cy="50" r="1" fill="#006400" opacity="0.6" />
          </g>
        );
      case "chocolate":
        return (
          <g>
            <rect x="35" y="30" width="3" height="3" fill="#4A4A4A" opacity="0.8" />
            <rect x="50" y="40" width="2" height="2" fill="#4A4A4A" opacity="0.8" />
            <rect x="25" y="45" width="2.5" height="2.5" fill="#4A4A4A" opacity="0.8" />
          </g>
        );
      case "vanilla":
        return (
          <g>
            <circle cx="45" cy="35" r="0.5" fill="#8B4513" opacity="0.8" />
            <circle cx="35" cy="45" r="0.5" fill="#8B4513" opacity="0.8" />
            <circle cx="55" cy="50" r="0.5" fill="#8B4513" opacity="0.8" />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`scoopGradient-${flavor}`} cx="30%" cy="30%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="70%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.8" />
        </radialGradient>
        <filter id="scoopShadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
        </filter>
      </defs>
      
      {/* Main scoop shape */}
      <circle
        cx="40"
        cy="40"
        r="35"
        fill={`url(#scoopGradient-${flavor})`}
        filter="url(#scoopShadow)"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.95"
      />
      
      {/* Highlight for 3D effect */}
      <ellipse
        cx="30"
        cy="25"
        rx="12"
        ry="8"
        fill="#ffffff"
        opacity="0.4"
      />
      
      {/* Flavor-specific texture */}
      {getScoopTexture(flavor)}
      
      {/* Additional surface details */}
      <circle cx="50" cy="55" r="1" fill="#ffffff" opacity="0.3" />
      <circle cx="25" cy="35" r="0.8" fill="#ffffff" opacity="0.2" />
    </svg>
  );
};