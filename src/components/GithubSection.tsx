"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { Star, GitFork, Search, BookOpen, Layers, ExternalLink } from "lucide-react";

interface Repository {
  name: string;
  desc: string;
  lang: "Java" | "Python" | "TypeScript" | "SQL";
  langColor: string; // Tailind tint class
  stars: number;
  forks: number;
  url: string;
}

const REPOSITORIES_DATA: Repository[] = [
  {
    name: "Brain-Tumor-QCNN",
    desc: "Hybrid Quantum–Classical Neural Network (QCNN) for automated brain tumour detection using MRI images. Combines EfficientNet-B0 feature extraction with a 4-qubit PennyLane quantum layer.",
    lang: "Python",
    langColor: "bg-blue-500",
    stars: 1,
    forks: 0,
    url: "https://github.com/Karthik7661/Brain-Tumor-QCNN"
  },
  {
    name: "Brain-Tumor-QCNN-ResNet",
    desc: "Hybrid Quantum–Classical model for brain tumor classification using Quantum FiLM modulation and ResNet-18. Supports multi-class MRI tumor detection with quantum circuit integration.",
    lang: "Python",
    langColor: "bg-blue-500",
    stars: 1,
    forks: 0,
    url: "https://github.com/Karthik7661/Brain-Tumor-QCNN-ResNet"
  },
  {
    name: "Task-Management",
    desc: "Task dashboard website built with a React frontend, custom Next.js serverless REST API endpoints, and MongoDB Atlas database persistence.",
    lang: "TypeScript",
    langColor: "bg-accent-purple",
    stars: 1,
    forks: 0,
    url: "https://github.com/Karthik7661/Task-Management"
  },
  {
    name: "Rervestion_system",
    desc: "Reservation system website built with Next.js, React, and Tailwind CSS.",
    lang: "TypeScript",
    langColor: "bg-accent-purple",
    stars: 0,
    forks: 0,
    url: "https://github.com/Karthik7661/Rervestion_system"
  }
];



export const GithubSection: React.FC = () => {
  const { setCursorType } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRepos = REPOSITORIES_DATA.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.lang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleHoverStart = () => setCursorType("hover");
  const handleHoverEnd = () => setCursorType("default");

  return (
    <section id="github" className="py-24 relative overflow-hidden bg-[#030712] border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-accent-purple/5 blur-[90px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-space tracking-tight text-white mb-4">
            GitHub <span className="text-accent-blue">Dashboard</span>
          </h2>
          <p className="text-slate-400 font-light text-sm md:text-base">
            Dynamic repository directory and contribution commit log tracked directly from git history metrics.
          </p>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Left Block: Stats, Languages & Heatmap */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Profile Summary */}
            <div className="glass-panel rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center font-bold text-lg font-space text-white">
                  SK
                </div>
                <div>
                  <h3 className="font-space font-semibold text-white">Karthik7661</h3>
                  <a
                    href="https://github.com/Karthik7661"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={handleHoverStart}
                    onMouseLeave={handleHoverEnd}
                    className="text-[10px] font-mono text-accent-cyan hover:underline flex items-center gap-1"
                  >
                    github.com/Karthik7661 <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-2 text-center border-t border-white/5 pt-4">
                <div>
                  <span className="text-xl font-bold text-white font-space">4</span>
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">Repositories</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-white font-space">61</span>
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">Contributions</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-white font-space">3</span>
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">Followers</span>
                </div>
              </div>
            </div>

            {/* Language Breakdown */}
            <div className="glass-panel rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <Layers size={14} className="text-accent-blue" /> Language Distribution
              </h4>
              
              <div className="space-y-3 pt-2">
                {[
                  { name: "Python", pct: 50, color: "bg-blue-500" },
                  { name: "TypeScript", pct: 50, color: "bg-accent-purple" }
                ].map((lang) => (
                  <div key={lang.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-light">
                      <span className="text-slate-300">{lang.name}</span>
                      <span className="text-slate-400 font-mono">{lang.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${lang.color} rounded-full`} style={{ width: `${lang.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Block: Repository Search & List */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="text"
                placeholder="Search repositories by name, descriptions, or languages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/[0.02] border border-white/5 hover:border-white/10 focus:border-accent-blue/30 focus:outline-none rounded-xl text-xs md:text-sm text-white placeholder-slate-500 transition-all font-light"
              />
            </div>

            {/* Repository Cards list */}
            <div data-lenis-prevent className="h-[380px] overflow-y-auto pr-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredRepos.length > 0 ? (
                  filteredRepos.map((repo) => (
                    <motion.div
                      layout
                      key={repo.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="glass-panel hover:border-white/10 rounded-xl p-5 space-y-3 relative group"
                    >
                      <div className="flex justify-between items-start">
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          onMouseEnter={handleHoverStart}
                          onMouseLeave={handleHoverEnd}
                          className="font-space font-semibold text-white hover:text-accent-blue transition-colors flex items-center gap-1.5 text-sm md:text-base select-none"
                        >
                          <BookOpen size={14} className="text-slate-400" />
                          {repo.name}
                        </a>
                        
                        {/* Stars & Forks */}
                        <div className="flex items-center gap-3 text-xs font-mono text-slate-500 select-none">
                          <span className="flex items-center gap-1">
                            <Star size={12} className="text-yellow-500/80" /> {repo.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={12} /> {repo.forks}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-400 text-xs font-light leading-relaxed">
                        {repo.desc}
                      </p>

                      {/* Language Dot indicator */}
                      <div className="flex items-center gap-2 pt-2 text-[10px] font-mono text-slate-500 select-none">
                        <span className={`w-2 h-2 rounded-full ${repo.langColor}`} />
                        <span>{repo.lang}</span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500 text-xs font-mono">
                    No repositories matching search criteria found.
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>



      </div>
    </section>
  );
};
