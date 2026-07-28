"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { Award, ExternalLink } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  pdfPath: string; // Direct link
  color: string; // Gradient class
}

const CERTIFICATES_DATA: Certificate[] = [
  {
    title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    issuer: "Oracle University",
    date: "2025",
    pdfPath: "https://drive.google.com/file/d/14zf0-NWtofIczdFCWkgOpdvlfaLgItx8/view",
    color: "from-amber-500/20 via-orange-500/10 to-transparent"
  },
  {
    title: "Fundamentals of Digital Marketing",
    issuer: "Google Digital Garage",
    date: "2024",
    pdfPath: "https://drive.google.com/file/d/1rljADXylWMavkY37OAz8hjj2brsFYOUV/view",
    color: "from-red-500/20 via-yellow-500/10 to-transparent"
  },
  {
    title: "HTML & CSS for Web Development",
    issuer: "Certification Provider",
    date: "2022",
    pdfPath: "https://drive.google.com/file/d/1tEU8WgkqjEKT4GexlsZ8RFQYSD7OPnFq/view",
    color: "from-green-500/20 via-emerald-500/10 to-transparent"
  }
];

// Interactive 3D Card Tilt Component
const TiltCard: React.FC<{ cert: Certificate; onClick: () => void }> = ({ cert, onClick }) => {
  const { setCursorType } = usePortfolio();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates (0 to width/height)
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation (-15 to 15 degrees)
    const rX = ((y - height / 2) / (height / 2)) * -12;
    const rY = ((x - width / 2) / (width / 2)) * 12;

    // Calculate glare position in percent
    const gX = (x / width) * 100;
    const gY = (y / height) * 100;

    setRotateX(rX);
    setRotateY(rY);
    setGlareX(gX);
    setGlareY(gY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursorType("magnetic");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setCursorType("default");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? "none" : "transform 0.5s ease-out",
      }}
      className="glass-panel relative w-full h-[220px] rounded-xl overflow-hidden cursor-pointer select-none group border border-white/5 hover:border-white/20 transition-colors shadow-lg"
    >
      {/* Glare Sheet */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
        }}
      />

      {/* Decorative colored glow base */}
      <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} z-0 pointer-events-none`} />

      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/60 group-hover:text-white transition-colors">
            <Award size={18} />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-slate-400 font-semibold px-2 py-0.5 rounded bg-black/40 border border-white/5 uppercase">
              {cert.date}
            </span>
            <ExternalLink size={12} className="text-slate-500 group-hover:text-white transition-colors" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-base md:text-lg font-space font-semibold text-white leading-snug group-hover:text-accent-cyan transition-colors line-clamp-2">
            {cert.title}
          </h3>
          <p className="text-slate-400 text-xs font-light">{cert.issuer}</p>
        </div>
      </div>
    </div>
  );
};

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-transparent border-t border-white/5">
      {/* Background visual light elements */}
      <div className="absolute top-[20%] right-[-15%] w-[450px] h-[450px] rounded-full bg-accent-blue/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-space tracking-tight text-white mb-4">
            Professional <span className="text-accent-cyan">Credentials</span>
          </h2>
          <p className="text-slate-400 font-light text-sm md:text-base">
            Hover to tilt and reveal the 3D glare dynamics. Click cards to view the verified credentials online.
          </p>
        </div>

        {/* Credentials Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {CERTIFICATES_DATA.map((cert, index) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
              }}
              key={index}
            >
              <TiltCard
                cert={cert}
                onClick={() => {
                  window.open(cert.pdfPath, "_blank");
                }}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
