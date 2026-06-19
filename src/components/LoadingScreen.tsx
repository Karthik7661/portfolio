"use client";

import React, { useEffect, useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Terminal } from "lucide-react";

const BOOT_LOGS = [
  { text: "Initializing Portfolio Core...", delay: 200, percent: 10 },
  { text: "Resolving environment modules: Integrated M.Tech Systems...", delay: 500, percent: 25 },
  { text: "Loading Project Archives: TaskManager, QCNN Simulator...", delay: 900, percent: 45 },
  { text: "Syncing Publications: IEEE OCIT 2025 Brain Tumor QCNN (DOI: 10.1109/OCIT66168.2025.11400476)...", delay: 1400, percent: 65 },
  { text: "Importing Core Assets: 3D character mesh loader & lighting maps...", delay: 1800, percent: 85 },
  { text: "Establishing secure SSL connection to skarthik7661@gmail.com...", delay: 2100, percent: 95 },
  { text: "Ready. Access Granted. Welcome S Karthik.", delay: 2500, percent: 100 }
];

export const LoadingScreen: React.FC = () => {
  const { percent, isLoading, setIsLoading, setPercent } = usePortfolio();
  const [logs, setLogs] = useState<string[]>([]);
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (activeLogIndex < BOOT_LOGS.length) {
      const log = BOOT_LOGS[activeLogIndex];
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, log.text]);
        setPercent(log.percent);
        setActiveLogIndex((prev) => prev + 1);
      }, log.delay - (activeLogIndex > 0 ? BOOT_LOGS[activeLogIndex - 1].delay : 0));

      return () => clearTimeout(timer);
    } else {
      // Finished all logs. Now smoothly fade out and hide loading screen
      const hideTimer = setTimeout(() => {
        setFadeOut(true);
        const exitTimer = setTimeout(() => {
          setIsLoading(false);
        }, 800); // match transition-duration
        return () => clearTimeout(exitTimer);
      }, 1000);
      return () => clearTimeout(hideTimer);
    }
  }, [activeLogIndex, setIsLoading, setPercent]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] transition-all duration-700 ease-in-out ${
        fadeOut ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-2xl px-6 font-mono text-xs md:text-sm">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-3 rounded-t-lg backdrop-blur-md">
          <div className="flex items-center gap-2 text-white/40">
            <Terminal size={14} className="text-accent-blue" />
            <span>sys_boot_seq.sh</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/30 border border-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 border border-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/30 border border-green-500/50" />
          </div>
        </div>

        {/* Terminal Body */}
        <div className="min-h-[260px] border-x border-b border-white/10 bg-black/60 p-5 rounded-b-lg backdrop-blur-md shadow-2xl flex flex-col justify-between">
          <div data-lenis-prevent className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
            {logs.map((log, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-accent-cyan select-none">$</span>
                <span
                  className={
                    index === BOOT_LOGS.length - 1
                      ? "text-accent-blue font-semibold glow-text"
                      : "text-white/80"
                  }
                >
                  {log}
                </span>
              </div>
            ))}
            {activeLogIndex < BOOT_LOGS.length && (
              <div className="flex gap-2 items-center">
                <span className="text-accent-cyan select-none">$</span>
                <span className="w-1.5 h-4 bg-white/70 animate-pulse" />
              </div>
            )}
          </div>

          {/* Progress Section */}
          <div className="mt-8 pt-4 border-t border-white/5 space-y-2">
            <div className="flex justify-between text-white/50 text-[10px]">
              <span>LOADING SYSTEM ENVIRONMENT</span>
              <span>{percent}%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan transition-all duration-300 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
