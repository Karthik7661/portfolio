"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { GraduationCap, Code, BookOpen, Cpu } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "2019 - 2020",
    title: "Secondary Education",
    subtitle: "Z P High School",
    description: "Completed secondary school board examinations, establishing a strong academic foundation. Graduated with a board score of 96.3%.",
    icon: <GraduationCap size={18} />,
    tags: ["Board of Secondary Education", "Mathematics", "Science"],
  },
  {
    year: "2020 - 2022",
    title: "Intermediate Board (MPC)",
    subtitle: "Sri Vivekananda Jr College",
    description: "Studied Mathematics, Physics, and Chemistry (MPC) during pre-university board intermediate education, graduating with a score of 71.3%.",
    icon: <GraduationCap size={18} />,
    tags: ["Board of Intermediate Education", "Mathematics", "Physics", "Chemistry"],
  },
  {
    year: "2022 - 2027",
    title: "Integrated M.Tech in Software Engineering",
    subtitle: "VIT-AP University",
    description: "Enrolled in the 5-year integrated post-graduate software engineering program. Focused on data structures, database designs, OOP, and system algorithms. Maintained a CGPA of 8.58/10.0.",
    icon: <GraduationCap size={18} />,
    tags: ["Software Engineering", "VIT-AP University", "Core Computer Science"],
  },
  {
    year: "2023 - 2024",
    title: "Brain Tumor Detection using QCNN",
    subtitle: "Quantum Machine Learning Research",
    description: "Conducted medical computer-vision research. Designed hybrid deep learning systems using pre-trained convolutional features and parameterized quantum circuits (QCNN) in PennyLane/TensorFlow to classify MRI brain scans, publishing two IEEE conference papers.",
    icon: <BookOpen size={18} />,
    tags: ["QCNN", "PennyLane", "TensorFlow", "MRI Preprocessing", "IEEE Publication"],
  },
  {
    year: "2024 - 2025",
    title: "Hybrid QCNN with ResNet-50",
    subtitle: "Advanced Deep Learning & Feature Modulation",
    description: "Designed a high-performance hybrid quantum-classical neural network integrating a Quantum Feature Modulation Unit (QFMU) with a pre-trained ResNet-50 backbone to adjust intermediate feature maps dynamically.",
    icon: <Cpu size={18} />,
    tags: ["ResNet-50", "FiLM Modulation", "Transfer Learning", "PennyLane"],
  },
  {
    year: "2025 - 2026",
    title: "Full-Stack Development & Task Management",
    subtitle: "Web Application Project Phase",
    description: "Engineered and deployed a Task Management System. Built a responsive React dashboard, designed custom serverless REST API endpoints in Next.js, and integrated MongoDB Atlas for cloud document persistence.",
    icon: <Code size={18} />,
    tags: ["Next.js", "React", "MongoDB", "REST APIs", "Vercel Deployment"],
  },
];

export const AboutTimeline: React.FC = () => {
  const { setCursorType } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use scroll position to animate the central vertical line height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleHoverStart = () => setCursorType("hover");
  const handleHoverEnd = () => setCursorType("default");

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#030712]">
      {/* Glow spots */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-accent-blue/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-accent-purple/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <h2 className="text-3xl md:text-5xl font-bold font-space tracking-tight text-white mb-4">
            My <span className="text-accent-blue">Timeline</span>
          </h2>
          <p className="text-slate-400 font-light text-sm md:text-base">
            An interactive walk through my academic background, technical phases, publication landmarks, and current engineering milestones.
          </p>
        </div>

        {/* Timeline Path */}
        <div ref={containerRef} className="relative w-full max-w-4xl mx-auto pl-8 md:pl-0">
          
          {/* Vertical central bar (dashed background, solid animated glow overlay) */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2" />
          <motion.div 
            className="absolute left-[20px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-accent-blue via-accent-purple via-accent-cyan to-accent-blue animate-flow-line origin-top -translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            style={{ scaleY: lineHeight, height: "100%" }}
          />

          {/* Timeline Nodes */}
          <div className="space-y-16">
            {TIMELINE_DATA.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index}
                  className={`flex flex-col md:flex-row relative items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Glowing Node Dot on Central Line */}
                  <div className="absolute left-[20px] md:left-1/2 top-3 md:top-auto w-10 h-10 -translate-x-1/2 rounded-full border border-white/10 bg-bg-dark flex items-center justify-center z-20 shadow-lg">
                    <motion.div 
                      whileInView={{ scale: [1, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                      className="w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                    />
                  </div>

                  {/* Left spacer / right spacer block on large screens */}
                  <div className="w-full md:w-1/2" />

                  {/* Glassmorphism Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      scale: { type: "spring", stiffness: 300, damping: 20 },
                      y: { type: "spring", stiffness: 300, damping: 20 },
                      default: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
                    }}
                    onMouseEnter={handleHoverStart}
                    onMouseLeave={handleHoverEnd}
                    className="w-full md:w-[45%] pr-0 md:pr-4 pl-4 md:pl-0 z-10 group cursor-none"
                  >
                    <div className="glass-panel group-hover:glass-panel-glow transition-all duration-500 rounded-xl p-6 relative">
                      
                      {/* Tech Icon and Year tag */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-accent-blue group-hover:text-accent-cyan transition-colors">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-space font-semibold text-white group-hover:text-accent-blue transition-colors text-base md:text-lg">
                              {item.title}
                            </h3>
                            <p className="text-slate-400 text-xs font-light">{item.subtitle}</p>
                          </div>
                        </div>
                        <span className="font-mono text-xs md:text-sm font-semibold tracking-wider px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/90">
                          {item.year}
                        </span>
                      </div>

                      {/* Description text */}
                      <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-4 font-light">
                        {item.description}
                      </p>

                      {/* Tag list */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                        {item.tags.map((tag, tIndex) => (
                          <span 
                            key={tIndex} 
                            className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
