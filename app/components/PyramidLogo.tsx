"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export default function PyramidLogo() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [pupil, setPupil] = useState({ x: 90, y: 108 });

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const d = Math.min(dist, 8);
    setPupil({
      x: 90 + d * Math.cos(angle),
      y: 108 + d * Math.sin(angle),
    });
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [handleMove]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const scheduleBlink = () => {
      timeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
        scheduleBlink();
      }, Math.random() * 3000 + 2000);
    };
    scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <svg
      ref={svgRef}
      width="40"
      height="40"
      viewBox="0 0 180 180"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <defs>
        <clipPath id="triClip">
          <polygon points="90,22 162,155 18,155" />
        </clipPath>
        <clipPath id="baseClip">
          <rect x="0" y="0" width="180" height="154" />
        </clipPath>
      </defs>

      <circle
        cx="90"
        cy="108"
        r="86"
        fill={isHovered ? "#fdba74" : "#e5e5e5"}
        clipPath="url(#baseClip)"
        style={{ transition: "fill 0.2s ease" }}
      />

      <g clipPath="url(#triClip)">
        <polygon points="90,22 162,155 18,155" fill="#151515" />
        <ellipse
          cx="90"
          cy="108"
          rx="30"
          ry={isBlinking ? 2 : 19}
          fill={isHovered ? "#fdba74" : "#e5e5e5"}
          style={{ transition: "ry 0.15s ease-in-out, fill 0.2s ease" }}
        />
        <ellipse
          cx={pupil.x}
          cy={pupil.y}
          rx="10"
          ry={isBlinking ? 0 : 15}
          fill="#151515"
          style={{ transition: "ry 0.15s ease-in-out" }}
        />
      </g>
    </svg>
  );
}
