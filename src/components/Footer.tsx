"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Mail, FileText, Heart } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export const Footer: React.FC = () => {
  const { setCursorType } = usePortfolio();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Publications", id: "publications" },
    { label: "Contact", id: "contact" },
  ];

  const socials = [
    { icon: <FaGithub size={15} />, href: "https://github.com/Karthik7661", label: "GitHub" },
    { icon: <FaLinkedinIn size={15} />, href: "https://www.linkedin.com/in/s-karthik-/", label: "LinkedIn" },
    { icon: <Mail size={15} />, href: "mailto:skarthik7661@gmail.com", label: "Email" },
    { icon: <FileText size={15} />, href: "https://drive.google.com/uc?export=download&id=1mgSjRQxp4ySC-boe7qYLlx51pBpMGqUx", label: "Resume" },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-transparent z-10">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
        >
          {/* Left: Identity */}
          <div className="space-y-3">
            <h3 className="text-xl font-black font-space tracking-tight">
              <span className="text-white">S </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-blue">
                Karthik
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed max-w-[200px]">
              Integrated M.Tech Software Engineering · VIT-AP University · IEEE Published Researcher
            </p>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open to Opportunities · 2026
            </div>
          </div>

          {/* Middle: Quick Nav */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Navigation</span>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  onMouseEnter={() => setCursorType("hover")}
                  onMouseLeave={() => setCursorType("default")}
                  className="text-xs text-slate-400 hover:text-white transition-colors cursor-none"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Socials */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Connect</span>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setCursorType("hover")}
                  onMouseLeave={() => setCursorType("default")}
                  aria-label={s.label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/8 bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all cursor-none"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="text-[11px] font-mono text-slate-600">
            © 2025 S Karthik · All rights reserved
          </span>
          <span className="text-[11px] font-mono text-slate-600 flex items-center gap-1">
            Built with Next.js, Three.js & <Heart size={10} className="text-accent-purple mx-0.5" /> Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
};
