"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { Terminal, Cpu, Database, Settings, Code } from "lucide-react";

interface Skill {
  name: string;
  level: number; // 0-100
  years: string;
  notes: string;
}

interface SkillCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  accentColor: string; // Tailwind tint class
  skills: Skill[];
}

const SKILLS_DATA: SkillCategory[] = [
  {
    id: "programming",
    label: "Programming",
    icon: <Code size={18} />,
    accentColor: "from-accent-blue to-blue-500",
    skills: [
      { name: "Java", level: 95, years: "3+ Years", notes: "Core OOP, multithreading, Stream API, collections" },
      { name: "SQL", level: 85, years: "2+ Years", notes: "Structured queries, join optimizations, indexing" },
      { name: "Python", level: 60, years: "1.5 Years", notes: "Scripting, numpy/pandas manipulation, ML model evaluation and training pipelines" },
      { name: "JavaScript", level: 60, years: "1 Year", notes: "ES6+ syntax, async/await patterns, DOM manipulation, Node.js fundamentals" }
    ]
  },
  {
    id: "development",
    label: "Software & Core CS",
    icon: <Cpu size={18} />,
    accentColor: "from-accent-purple to-purple-500",
    skills: [
      { name: "Object-Oriented Programming", level: 90, years: "3 Years", notes: "Classes, encapsulation, inheritance, polymorphism, abstractions" },
      { name: "REST APIs", level: 85, years: "2 Years", notes: "Endpoint design, request/response models, JSON payloads, validations" },
      { name: "Data Structures & Algorithms", level: 85, years: "3 Years", notes: "Search & sort algorithms, heap allocation, linear and non-linear types" },
      { name: "Operating Systems", level: 75, years: "2 Years", notes: "Process schedulers, memory management, threads, context switching" }
    ]
  },
  {
    id: "databases",
    label: "Databases",
    icon: <Database size={18} />,
    accentColor: "from-accent-cyan to-cyan-500",
    skills: [
      { name: "MySQL", level: 85, years: "2 Years", notes: "Relational constraints, schema engineering, transaction controls" },
      { name: "MongoDB", level: 75, years: "1.5 Years", notes: "Document store collections, aggregation workflows, flexible schemas" }
    ]
  },
  {
    id: "ml",
    label: "Machine Learning",
    icon: <Terminal size={18} />,
    accentColor: "from-blue-500 to-accent-cyan",
    skills: [
      { name: "CNN & ResNet", level: 85, years: "2 Years", notes: "Convolutional neural layers, spatial feature maps, transfer learning models" },
      { name: "QCNN (Quantum CNN)", level: 80, years: "1.5 Years", notes: "Amplitude embedding circuits, parameter optimization, measurement observables" },
      { name: "TensorFlow", level: 80, years: "2 Years", notes: "Model compile pipelines, layer configurations, training and callbacks" },
      { name: "PennyLane", level: 75, years: "1.5 Years", notes: "Quantum circuit modeling, hybrid classical-quantum layer wrappers" }
    ]
  },
  {
    id: "tools",
    label: "Developer Tools",
    icon: <Settings size={18} />,
    accentColor: "from-accent-purple to-accent-blue",
    skills: [
      { name: "Git & GitHub", level: 90, years: "3+ Years", notes: "Branching workflows, pull request cycles, repository backups" },
      { name: "IntelliJ & VS Code", level: 90, years: "3+ Years", notes: "Debugging tools, editor compiler options, project setups" }
    ]
  }
];

export const SkillsViz: React.FC = () => {
  const { setCursorType } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState("programming");
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeData = SKILLS_DATA.find((c) => c.id === activeCategory)!;

  // Custom mouse Spotlight effect inside the cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleHoverStart = () => setCursorType("hover");
  const handleHoverEnd = () => setCursorType("default");

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-transparent border-t border-white/5">
      {/* Background blobs */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] rounded-full bg-accent-cyan/5 blur-[90px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-space tracking-tight text-white mb-4">
            Technical <span className="text-accent-purple">Skills</span>
          </h2>
          <p className="text-slate-400 font-light text-sm md:text-base">
            Hover over any skill block to reveal the interactive dynamic lighting spotlight and system details.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-white/5 pb-6">
          {SKILLS_DATA.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
                className="relative flex items-center gap-2 px-5 py-3 rounded-lg border border-white/5 text-xs md:text-sm font-medium tracking-wide transition-colors duration-300 select-none cursor-none overflow-hidden"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillCategory"
                    className="absolute inset-0 bg-gradient-to-r from-accent-purple/15 to-accent-blue/15 border border-accent-purple/30 rounded-lg"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className={`relative z-10 flex items-center gap-2 ${isActive ? "text-white font-medium" : "text-slate-400 hover:text-slate-200"}`}>
                  <span className={isActive ? "text-accent-purple" : "text-slate-500"}>
                    {cat.icon}
                  </span>
                  <span>{cat.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Skills list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            {activeData.skills.map((skill, index) => (
              <motion.div
                key={`${activeCategory}-${skill.name}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ 
                  scale: { type: "spring", stiffness: 300, damping: 20 },
                  y: { type: "spring", stiffness: 300, damping: 20 },
                  default: { duration: 0.4, delay: index * 0.05, ease: "easeOut" }
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                ref={(el) => { cardRefs.current[index] = el; }}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
                className="glass-panel rounded-xl p-6 relative overflow-hidden group border border-white/5 hover:border-white/15 transition-all duration-300 cursor-none"
              >
                {/* Spotlight Radial Background Glow */}
                <div
                  className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full w-[250px] h-[250px] bg-radial from-white/[0.04] to-transparent -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: "var(--mouse-x, 0px)",
                    top: "var(--mouse-y, 0px)",
                  }}
                />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-space font-semibold text-white text-base md:text-lg">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        {skill.years}
                      </span>
                    </div>
                    
                    {/* Glowing percentage badge */}
                    <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-white/5 border border-white/5 text-accent-cyan">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Note / description */}
                  <p className="text-slate-400 text-xs md:text-sm font-light mb-6">
                    {skill.notes}
                  </p>

                  {/* Progress Indicator Loader Bar */}
                  {(() => {
                    const glowColor = {
                      programming: "#3B82F6",
                      development: "#7C3AED",
                      databases: "#06B6D4",
                      ml: "#06B6D4",
                      tools: "#7C3AED"
                    }[activeCategory] || "#3B82F6";

                    return (
                      <div className="space-y-1.5">
                        <div className="w-full h-[3px] bg-white/5 rounded-full relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.0, ease: "easeOut", delay: index * 0.1 }}
                            className={`h-full bg-gradient-to-r ${activeData.accentColor} relative rounded-full`}
                          >
                            {/* Laser Spark Tip */}
                            <div 
                              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-white z-10" 
                              style={{ boxShadow: `0 0 8px #ffffff, 0 0 12px ${glowColor}` }}
                            />
                            <div 
                              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 rounded-full blur-[1px] animate-ping opacity-75" 
                              style={{ backgroundColor: glowColor }}
                            />
                          </motion.div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
