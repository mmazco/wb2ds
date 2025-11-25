"use client";

import { useEffect, useState, useRef } from "react";
import { App, Category } from "../types";
import { useIsMobile } from "../hooks/useMediaQuery";

interface ScatterChartProps {
  apps: App[];
  onOpenModal: () => void;
  theme: "dark" | "light";
}

// Category colors
const categoryColors: Record<Category, string> = {
  "Financial & Asset Management": "#10b981", // green
  "Prediction & Data Markets": "#3b82f6", // blue
  "Gaming, Entertainment & Education": "#f59e0b", // orange
  "Social & Identity Tools": "#ec4899", // pink
  "Commerce & Attention": "#8b5cf6", // purple
};

interface TooltipData {
  x: number;
  y: number;
  name: string;
  worldID: number;
  rewards: number;
  color: string;
}

export default function ScatterChart({ apps, onOpenModal, theme }: ScatterChartProps) {
  const isMobile = useIsMobile();
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  
  const chartWidth = isMobile ? 350 : 800;
  const chartHeight = isMobile ? 400 : 600;
  const padding = isMobile ? 60 : 100;
  const innerWidth = chartWidth - padding * 2;
  const innerHeight = chartHeight - padding * 2;
  
  const isDark = theme === "dark";
  const textColor = isDark ? "#888" : "#333";
  const lineColor = isDark ? "#333" : "#ddd";
  const labelColor = isDark ? "#e5e5e5" : "#1a1a1a";
  
  // Scale functions
  // X-axis: rewards (low on left, high on right)
  const scaleX = (rewards: number) => padding + (rewards / 100) * innerWidth;
  // Y-axis: World ID (high on top, low on bottom)
  const scaleY = (worldID: number) => chartHeight - padding - (worldID / 100) * innerHeight;
  
  // Get unique categories for legend
  const categories = Array.from(new Set(apps.map(app => app.category)));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          World ID Utilization vs Rewards
        </h2>
        <button
          onClick={onOpenModal}
          className="text-sm text-accent hover:text-accent/80 underline"
        >
          What does this mean?
        </button>
      </div>
      
      {/* Chart */}
      <div 
        className="flex justify-center items-center rounded-lg p-4 md:p-10"
        style={{ 
          backgroundColor: isDark ? "#141414" : "#ffffff",
        }}
      >
        <svg 
          width={chartWidth} 
          height={chartHeight}
          style={{ overflow: "visible" }}
        >
          {/* Vertical axis line (centered at 50% rewards) */}
          <line
            x1={scaleX(50)}
            y1={padding - 20}
            x2={scaleX(50)}
            y2={chartHeight - padding + 20}
            stroke={lineColor}
            strokeWidth={1}
          />
          
          {/* Horizontal axis line (centered at 50% World ID) */}
          <line
            x1={padding - 20}
            y1={scaleY(50)}
            x2={chartWidth - padding + 20}
            y2={scaleY(50)}
            stroke={lineColor}
            strokeWidth={1}
          />
          
          {/* Axis labels */}
          {/* Top: High utilization of World ID */}
          <text
            x={chartWidth / 2}
            y={isMobile ? 25 : 40}
            textAnchor="middle"
            fill={textColor}
            fontSize={isMobile ? 11 : 14}
            fontWeight={600}
          >
            High utilization of World ID
          </text>
          
          {/* Bottom: Low utilization of World ID */}
          <text
            x={chartWidth / 2}
            y={chartHeight - (isMobile ? 10 : 25)}
            textAnchor="middle"
            fill={textColor}
            fontSize={isMobile ? 11 : 14}
            fontWeight={600}
          >
            Low utilization of World ID
          </text>
          
          {/* Left: Low rewards */}
          <text
            x={isMobile ? 15 : 40}
            y={chartHeight / 2}
            textAnchor="middle"
            fill={textColor}
            fontSize={isMobile ? 11 : 14}
            fontWeight={600}
            transform={`rotate(-90, ${isMobile ? 15 : 40}, ${chartHeight / 2})`}
          >
            Low rewards
          </text>
          
          {/* Right: High rewards */}
          <text
            x={chartWidth - (isMobile ? 15 : 40)}
            y={chartHeight / 2}
            textAnchor="middle"
            fill={textColor}
            fontSize={isMobile ? 11 : 14}
            fontWeight={600}
            transform={`rotate(90, ${chartWidth - (isMobile ? 15 : 40)}, ${chartHeight / 2})`}
          >
            High rewards
          </text>
          
          {/* Data points */}
          {apps.map(app => {
            const cx = scaleX(app.rewardsScore);
            const cy = scaleY(app.utilityScore);
            const color = categoryColors[app.category];
            const isHovered = hoveredApp === app.name;
            
            return (
              <g 
                key={app.name}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => {
                  setHoveredApp(app.name);
                  setTooltip({
                    x: cx,
                    y: cy,
                    name: app.name,
                    worldID: app.utilityScore,
                    rewards: app.rewardsScore,
                    color,
                  });
                }}
                onMouseLeave={() => {
                  setHoveredApp(null);
                  setTooltip(null);
                }}
              >
                {/* Circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? (isMobile ? 7 : 8) : (isMobile ? 5 : 6)}
                  fill={color}
                  stroke={isDark ? "#141414" : "#fff"}
                  strokeWidth={2}
                  style={{ transition: "r 0.15s ease" }}
                />
                
                {/* Label */}
                <text
                  x={cx}
                  y={cy - (isMobile ? 10 : 12)}
                  textAnchor="middle"
                  fill={isHovered ? labelColor : textColor}
                  fontSize={isHovered ? (isMobile ? 11 : 13) : (isMobile ? 9 : 11)}
                  fontWeight={isHovered ? 600 : 400}
                  style={{ transition: "all 0.15s ease" }}
                >
                  {app.name}
                </text>
              </g>
            );
          })}
          
          {/* Tooltip */}
          {tooltip && (
            <g>
              <rect
                x={tooltip.x - 70}
                y={tooltip.y + 15}
                width={140}
                height={44}
                rx={6}
                fill={isDark ? "#1f1f1f" : "#fff"}
                stroke={tooltip.color}
                strokeWidth={2}
              />
              <text
                x={tooltip.x}
                y={tooltip.y + 34}
                textAnchor="middle"
                fill={labelColor}
                fontSize={12}
              >
                World ID: {tooltip.worldID}%
              </text>
              <text
                x={tooltip.x}
                y={tooltip.y + 50}
                textAnchor="middle"
                fill={labelColor}
                fontSize={12}
              >
                Rewards: {tooltip.rewards}%
              </text>
            </g>
          )}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-5 md:gap-6 flex-wrap mt-16 md:mt-20">
        {categories.map(category => (
          <div key={category} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: categoryColors[category] }}
            />
            <span className="text-sm text-muted">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
