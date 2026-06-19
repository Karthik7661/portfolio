"use client";

import React from "react";
import { motion } from "framer-motion";

export const Monogram: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.0, ease: "easeOut", delay: 0.5 }}
        className="w-[90%] max-w-[700px] aspect-square relative flex items-center justify-center opacity-10"
      >
        {/* Outer radial glow */}
        <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-accent-blue/20 via-accent-purple/20 to-accent-cyan/10 blur-[120px] animate-pulse-slow" />
        
        {/* SVG Monogram SK */}
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full text-white/5 drop-shadow-[0_0_80px_rgba(59,130,246,0.15)]"
          style={{ filter: "drop-shadow(0px 0px 50px rgba(124, 58, 237, 0.2))" }}
        >
          <defs>
            <linearGradient id="monogram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* Path for 'S' */}
          <motion.path
            d="M 220 180 C 220 145, 195 140, 170 140 C 110 140, 110 215, 170 235 C 230 255, 230 330, 170 330 C 120 330, 100 315, 100 280"
            fill="none"
            stroke="url(#monogram-gradient)"
            strokeWidth="32"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.8 }}
          />
          {/* Path for 'K' */}
          <motion.path
            d="M 230 120 L 230 360"
            fill="none"
            stroke="url(#monogram-gradient)"
            strokeWidth="32"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.0, ease: "easeInOut", delay: 1.0 }}
          />
          <motion.path
            d="M 350 120 L 235 240 L 350 360"
            fill="none"
            stroke="url(#monogram-gradient)"
            strokeWidth="32"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.3, ease: "easeInOut", delay: 1.2 }}
          />
        </svg>
      </motion.div>
    </div>
  );
};
