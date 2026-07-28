"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Papers" },
  { id: "certifications", label: "Credentials" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

export const Navbar: React.FC = () => {
  const { setCursorType } = usePortfolio();
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 60);
      setScrollProgress(docH > 0 ? (scrollY / docH) * 100 : 0);

      const sections = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: item.id, top: rect.top };
      });

      const visible = sections.filter((s) => s.top <= 140);
      if (visible.length > 0) {
        setActiveSection(visible[visible.length - 1].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan origin-left"
          animate={{ scaleX: scrollProgress / 100 }}
          style={{ transformOrigin: "left" }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Floating Pill Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2 px-3 rounded-2xl border border-white/8 bg-[#030712]/85 backdrop-blur-xl shadow-2xl shadow-black/50"
            : "py-2 px-3 rounded-2xl border border-white/5 bg-[#030712]/40 backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => setCursorType("hover")}
                onMouseLeave={() => setCursorType("default")}
                className="relative px-3 py-1.5 rounded-xl text-[11px] font-medium font-space tracking-wide transition-all duration-200 cursor-none select-none"
              >
                {isActive && (
                  <motion.div
                    layoutId="navActiveIndicator"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 border border-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive ? "text-white" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
};
