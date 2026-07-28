"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { Monogram } from "./Monogram";
import { FileText, ArrowRight, Mail, Award, Zap } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

// Typewriter hook
function useTypewriter(words: string[], speed = 90, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

import { QcnnVisualizer } from "./QcnnVisualizer";

// High-end 3D-tilting portrait card showcasing the user's real face
const PortraitCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { setCursorType } = usePortfolio();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (centerY - y) / 18; // Max 10 deg rotation
    const rotateY = (x - centerX) / 18;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className="relative group">
      {/* Holographic Ripple Glow */}
      <div className="absolute -inset-4 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-accent-blue/25 to-accent-purple/25 z-0 animate-pulse pointer-events-none" />
      
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setCursorType("hover")}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-[300px] md:w-[350px] aspect-square rounded-full overflow-hidden border border-white/10 bg-slate-950/80 shadow-[0_0_50px_rgba(59,130,246,0.25)] transition-all duration-200 ease-out cursor-none z-10"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated Rotating Border Glow */}
        <div className="absolute inset-0 rounded-full p-[1.5px] overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan animate-[spin_6s_linear_infinite] opacity-80" />
          <div className="absolute inset-[1.5px] bg-slate-950 rounded-full" />
        </div>

        {/* Dynamic glow overlay */}
        <div className="absolute inset-[1.5px] rounded-full bg-gradient-to-tr from-accent-blue/15 via-transparent to-accent-purple/15 opacity-60 z-0 pointer-events-none" />

        {/* Real Headshot Portrait - cropped circularly with cache bypass version */}
        <img
          src="/images/profile_styled.jpg?v=1781731505"
          alt="S Karthik Portrait"
          className="w-full h-full object-cover object-[center_22%] relative z-10 rounded-full transition-transform duration-700 group-hover:scale-[1.05]"
        />
      </motion.div>
    </div>
  );
};

// High-end staggered spring reveal for S Karthik title
const AnimatedTitle: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(" ");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: "blur(10px)",
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100,
      }
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-5xl sm:text-6xl md:text-8xl font-black font-space tracking-tight flex flex-wrap gap-x-5 select-none"
    >
      {words.map((word, wIdx) => {
        const isGradientWord = wIdx === 1; // "Karthik" is the second word
        return (
          <motion.span
            key={wIdx}
            variants={wordVariants}
            className={
              isGradientWord
                ? "text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#d946ef] to-[#8b5cf6] drop-shadow-[0_0_35px_rgba(217,70,239,0.55)] py-1"
                : "text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            }
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h1>
  );
};

// Typewriter role component
const TypewriterRole: React.FC = () => {
  const text = useTypewriter([
    "Integrated M.Tech Student",
    "Full-Stack Engineer",
    "Quantum ML Researcher",
    "SaaS Builder",
  ], 80, 2200);

  return (
    <span className="min-w-[220px] inline-block">
      {text}
      <span className="inline-block w-0.5 h-5 bg-accent-cyan ml-0.5 animate-pulse align-middle" />
    </span>
  );
};

export const Hero: React.FC = () => {
  const { setCursorType, setMagneticElement } = usePortfolio();
  const [activeTab, setActiveTab] = useState<"portrait" | "qcnn">("portrait");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const projectsBtnRef = useRef<HTMLButtonElement>(null);
  const resumeBtnRef = useRef<HTMLAnchorElement>(null);

  // Mouse move callback to create layered background parallax
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / 25;
    const y = (clientY - window.innerHeight / 2) / 25;
    setMousePos({ x, y });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // High-end staggered blur & slide-up animation
  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const handleHoverStart = (type: "hover" | "magnetic", el?: any) => {
    setCursorType(type);
    if (el) setMagneticElement(el);
  };

  const handleHoverEnd = () => {
    setCursorType("default");
    setMagneticElement(null);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const tabs = [
    { id: "portrait", label: "Real Portrait", icon: "👤" },
    { id: "qcnn", label: "QCNN Simulator", icon: "⚛️" }
  ];

  return (
    <section
      id="hero"
      onMouseMove={handleHeroMouseMove}
      className="relative w-full min-h-screen flex items-center pt-24 pb-12 md:py-0 overflow-hidden"
    >
      {/* Background aurora gradients shifting with mouse */}
      <motion.div
        animate={{ x: -mousePos.x * 0.4, y: -mousePos.y * 0.4 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
        className="absolute inset-0 aurora-bg opacity-70 z-0 pointer-events-none"
      />
      <motion.div
        animate={{ x: -mousePos.x * 0.15, y: -mousePos.y * 0.15 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
        className="absolute inset-0 grid-mesh z-0 pointer-events-none"
      />

      {/* Giant Background Monogram */}
      <Monogram />

      {/* Floating light rays shifting with mouse */}
      <motion.div
        animate={{ x: mousePos.x * 0.7, y: mousePos.y * 0.7 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
        className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-accent-blue/5 blur-[90px] pointer-events-none"
      />
      <motion.div
        animate={{ x: -mousePos.x * 0.7, y: -mousePos.y * 0.7 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
        className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-accent-purple/5 blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Identity text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status badges row */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
              {/* Open to hire badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/8 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Open to Opportunities · M.Tech 2026
                </span>
              </div>
              {/* IEEE Published */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/5 backdrop-blur-md">
                <Award size={11} className="text-accent-cyan" />
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-accent-cyan font-medium">
                  IEEE Published Author
                </span>
              </div>
            </motion.div>

            <div className="space-y-2">
              <AnimatedTitle text="S Karthik" />
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 font-space text-lg md:text-2xl font-light text-slate-400">
                <TypewriterRole />
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan font-medium">
                  Software Engineering
                </span>
              </motion.div>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl font-inter font-light"
            >
              I engineer software that bridges AI research and real-world production — from IEEE-published quantum neural networks for medical imaging to full-stack multi-tenant SaaS platforms. M.Tech Integrated student at VIT-AP building systems that matter.
            </motion.p>

            {/* Actions & Links */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-4">
              <button
                ref={projectsBtnRef}
                onClick={() => scrollToSection("projects")}
                onMouseEnter={() => handleHoverStart("magnetic", projectsBtnRef.current)}
                onMouseLeave={handleHoverEnd}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs md:text-sm font-medium flex items-center gap-2 shadow-lg shadow-blue-500/10 hover:shadow-purple-500/20 transition-all duration-300 select-none cursor-none"
              >
                View Projects <ArrowRight size={16} />
              </button>

              <a
                ref={resumeBtnRef}
                href="https://drive.google.com/uc?export=download&id=1mgSjRQxp4ySC-boe7qYLlx51pBpMGqUx"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => handleHoverStart("magnetic", resumeBtnRef.current)}
                onMouseLeave={handleHoverEnd}
                className="px-6 py-3 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-white text-xs md:text-sm font-medium flex items-center gap-2 backdrop-blur-md transition-all duration-300 cursor-none"
              >
                Download Resume <FileText size={16} />
              </a>
            </motion.div>

            {/* Social media connections */}
            <motion.div variants={itemVariants} className="flex items-center gap-5 pt-8 border-t border-white/5 max-w-md">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Connect</span>
              
              <div className="flex gap-4">
                <a
                  href="https://github.com/Karthik7661"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => handleHoverStart("hover")}
                  onMouseLeave={handleHoverEnd}
                  className="text-slate-400 hover:text-white transition-colors cursor-none"
                  aria-label="GitHub Profile"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/s-karthik-/"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => handleHoverStart("hover")}
                  onMouseLeave={handleHoverEnd}
                  className="text-slate-400 hover:text-white transition-colors cursor-none"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedinIn size={18} />
                </a>
                <a
                  href="mailto:skarthik7661@gmail.com"
                  onMouseEnter={() => handleHoverStart("hover")}
                  onMouseLeave={handleHoverEnd}
                  className="text-slate-400 hover:text-white transition-colors cursor-none"
                  aria-label="Email Contact"
                >
                  <Mail size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Toggle Switch and Dynamic View (R3F Canvas or Real Portrait Card) */}
          <div className="lg:col-span-5 min-h-[460px] md:min-h-[580px] lg:min-h-[660px] w-full flex flex-col items-center justify-center relative select-none">
            
            {/* Sliding Pill Tab Switcher */}
            <div className="absolute top-0 right-0 z-20 flex items-center gap-1 p-1 rounded-full border border-white/5 bg-slate-950/40 backdrop-blur-md">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "portrait" | "qcnn")}
                  onMouseEnter={() => handleHoverStart("hover")}
                  onMouseLeave={handleHoverEnd}
                  className="relative px-3.5 py-1.5 rounded-full text-[10px] md:text-xs font-medium font-space tracking-wide transition-colors duration-300 select-none cursor-none"
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="heroActiveTab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-1.5 ${activeTab === tab.id ? "text-white" : "text-slate-400 hover:text-white"}`}>
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Soft glowing rim behind model/card */}
            <div className="absolute w-[260px] md:w-[320px] aspect-square rounded-full border border-blue-500/10 bg-gradient-to-tr from-accent-blue/5 to-accent-cyan/5 blur-2xl z-0 pointer-events-none" />
            
            {/* View Container */}
            <div className="w-full h-[400px] md:h-[550px] lg:h-[600px] flex items-center justify-center mt-12 lg:mt-0">
              <AnimatePresence mode="wait">
                {activeTab === "portrait" ? (
                  <motion.div
                    key="portrait"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex items-center justify-center"
                  >
                    <PortraitCard />
                  </motion.div>
                ) : (
                  <motion.div
                    key="qcnn"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full flex items-center justify-center animate-fadeIn"
                  >
                    <QcnnVisualizer />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
