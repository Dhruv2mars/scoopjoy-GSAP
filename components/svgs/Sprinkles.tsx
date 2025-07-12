"use client";

import React from "react";

interface SprinklesProps {
  className?: string;
  count?: number;
  size?: number;
}

export const Sprinkles: React.FC<SprinklesProps> = ({ 
  className = "", 
  count = 20,
  size = 100
}) => {
  const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff"];
  
  const generateSprinkles = () => {
    const sprinkles = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * (size - 10) + 5;
      const y = Math.random() * (size - 10) + 5;
      const rotation = Math.random() * 360;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const length = Math.random() * 8 + 4; // 4-12px length
      
      sprinkles.push(
        <rect
          key={i}
          x={x}
          y={y}
          width="2"
          height={length}
          fill={color}
          transform={`rotate(${rotation} ${x + 1} ${y + length/2})`}
          rx="1"
          className="sprinkle"
        />
      );
    }
    return sprinkles;
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="sprinkleShadow">
          <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.2" />
        </filter>
      </defs>
      
      <g filter="url(#sprinkleShadow)">
        {generateSprinkles()}
      </g>
    </svg>
  );
};