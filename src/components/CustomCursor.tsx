"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const { cursorType, magneticElement } = usePortfolio();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Position of mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Physics config for smooth trail
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const innerX = useSpring(mouseX, { damping: 50, stiffness: 800 });
  const innerY = useSpring(mouseY, { damping: 50, stiffness: 800 });

  useEffect(() => {
    // Check if device is desktop
    const checkDevice = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
      setIsMobile(isTouch);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      setIsVisible(true);

      if (cursorType === "magnetic" && magneticElement) {
        const rect = magneticElement.getBoundingClientRect();
        // Calculate center of element
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center to snap slightly towards it
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        if (dist < 60) {
          // Snap slightly
          mouseX.set(centerX + (e.clientX - centerX) * 0.35);
          mouseY.set(centerY + (e.clientY - centerY) * 0.35);
        } else {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
        }
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isMobile, cursorType, magneticElement, mouseX, mouseY]);

  if (isMobile || !isVisible || cursorType === "hidden") return null;

  // Compute cursor variants
  let cursorSize = 32;
  let glowOpacity = 0.15;
  let borderColor = "rgba(59, 130, 246, 0.4)"; // Accent Blue
  let innerBg = "rgba(59, 130, 246, 1)";

  if (cursorType === "hover") {
    cursorSize = 54;
    glowOpacity = 0.3;
    borderColor = "rgba(124, 58, 237, 0.6)"; // Accent Purple
  } else if (cursorType === "magnetic") {
    cursorSize = 64;
    glowOpacity = 0.4;
    borderColor = "rgba(6, 182, 212, 0.7)"; // Accent Cyan
    innerBg = "rgba(6, 182, 212, 1)";
  } else if (cursorType === "text") {
    cursorSize = 16;
    glowOpacity = 0.1;
    borderColor = "rgba(255, 255, 255, 0.6)";
    innerBg = "rgba(255, 255, 255, 0.9)";
  }

  return (
    <>
      {/* Outer Glowing Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-solid transition-[width,height,border-color,background-color,box-shadow] duration-300 ease-out"
        style={{
          x: cursorX,
          y: cursorY,
          width: cursorSize,
          height: cursorSize,
          borderColor: borderColor,
          boxShadow: `0 0 30px rgba(59, 130, 246, ${glowOpacity})`,
          backgroundColor: cursorType === "hover" ? "rgba(124, 58, 237, 0.03)" : "transparent",
        }}
      />
      {/* Inner Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[background-color] duration-300 ease-out"
        style={{
          x: innerX,
          y: innerY,
          backgroundColor: innerBg,
        }}
      />
    </>
  );
};
