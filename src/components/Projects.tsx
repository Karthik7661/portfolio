"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { ExternalLink, X, FileText, CheckCircle2, ChevronRight, BarChart3, Database, Workflow } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

interface ProjectDetails {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  longDesc: string;
  tech: string[];
  github: string;
  live?: string;
  publication?: string;
  features: string[];
  architecture: {
    text: string;
    imagePath?: string;
    details: string[];
  };
  results: {
    stats: { label: string; value: string }[];
    text: string;
    imagePath?: string;
    imagePathExtra?: string;
  };
  lessons: string[];
}

const PROJECTS_DATA: ProjectDetails[] = [
  {
    id: "campus-food-app",
    title: "Smart Food Campus Ordering System",
    category: "Real-Time Cloud Backend & Web App",
    shortDesc: "Real-time food ordering and management platform with Firebase Firestore database sync and live order tracking.",
    longDesc: "A food ordering and management platform for campus dining. Features real-time order tracking and database synchronization using Firebase Firestore, secure user authentication, interactive menu management, and administrative control panels for tracking order workflows.",
    tech: ["JavaScript", "Firebase", "Firestore", "HTML5", "CSS3", "Vercel"],
    github: "https://github.com/Karthik7661/Campus_Food_App",
    live: "https://campus-food-app-ten.vercel.app/",
    features: [
      "Real-time order status tracking and inventory updates using Firebase Firestore listeners.",
      "Firebase Authentication integration for secure user registration and session persistence.",
      "Interactive food menu browser with dynamic cart management and order summaries.",
      "Admin management dashboard for real-time order status updates and kitchen workflow control.",
      "Fully responsive modern UI deployed on Vercel for high availability."
    ],
    architecture: {
      text: "Responsive Frontend (JS/HTML5/CSS3) -> Firebase Auth & Firestore DB -> Real-time Admin & Customer Listeners",
      details: [
        "**UI Layer**: Clean HTML5/CSS3 responsive client interface with dynamic JavaScript cart handlers.",
        "**Cloud Database**: Firebase Firestore document database supporting real-time data sync listeners.",
        "**Auth & Security**: Firebase Auth providing user identity management and Firestore security rules."
      ]
    },
    results: {
      stats: [
        { label: "Live Site", value: "Vercel" },
        { label: "Database", value: "Firestore DB" },
        { label: "Sync Speed", value: "Real-Time" },
        { label: "Auth Provider", value: "Firebase" }
      ],
      text: "Successfully deployed on Vercel with real-time order updates between customers and campus vendor admin panels."
    },
    lessons: [
      "Setting up real-time snapshot listeners in Firebase Firestore for instant status updates.",
      "Designing security rules in Firestore to restrict admin-only order modifications.",
      "Managing local cart state and synchronizing pending transactions with cloud databases."
    ]
  },
  {
    id: "devflow",
    title: "DevFlow – Multi-Tenant SaaS Agile Platform",
    category: "Enterprise Full-Stack & SaaS Architecture",
    shortDesc: "Multi-tenant SaaS platform for managing software workspaces, agile sprints, and real-time Kanban task boards.",
    longDesc: "A complete multi-tenant SaaS application engineered to manage software workspaces, projects, agile sprints, and task tracking. Built with Next.js 14 and Express.js REST APIs, featuring custom @dnd-kit interactive Kanban boards, Recharts analytics, MySQL database managed via Prisma ORM, and Firebase RBAC authentication.",
    tech: ["Next.js", "Express.js", "MySQL", "Prisma", "TypeScript", "Tailwind CSS", "Firebase", "Zustand"],
    github: "https://github.com/Karthik7661/DevFlow",
    live: "https://frontend-rosy-xi-15.vercel.app/",
    features: [
      "Multi-tenant workspace architecture supporting ADMIN, MANAGER, and DEVELOPER role permissions.",
      "Interactive drag-and-drop Kanban boards engineered with @dnd-kit for seamless task tracking.",
      "Agile sprint management with task backlog organization, subtasks, and progress indicators.",
      "Real-time analytics dashboard powered by Recharts with burndown metrics and CSV export functionality.",
      "Express.js backend with TypeScript, strict Zod payload validation, and relational MySQL schemas via Prisma ORM."
    ],
    architecture: {
      text: "Next.js 14 Frontend (Zustand, @dnd-kit) -> Express.js REST API (TypeScript) -> Prisma ORM -> MySQL Database",
      details: [
        "**Frontend Layer**: Next.js 14 App Router with Zustand global state management and @dnd-kit drag-and-drop.",
        "**Backend API**: Modular Express.js server in TypeScript with Firebase Auth token verification middleware and Zod schema validation.",
        "**Database & ORM**: MySQL database schema with relational cascade rules, indexes, and migrations managed via Prisma ORM."
      ]
    },
    results: {
      stats: [
        { label: "Architecture", value: "Multi-Tenant" },
        { label: "State Mgmt", value: "Zustand" },
        { label: "DB Engine", value: "MySQL/Prisma" },
        { label: "Auth Model", value: "Firebase RBAC" }
      ],
      text: "DevFlow provides scalable multi-tenant workspace separation, fluid drag-and-drop state updates, type-safe API controllers, and instant analytics visualization."
    },
    lessons: [
      "Designing multi-tenant relational schemas with Prisma ORM and handling cascading relationships in MySQL.",
      "Implementing optimistic UI updates for drag-and-drop Kanban boards using Zustand and @dnd-kit.",
      "Securing Express.js API endpoints with custom Firebase Admin token verification middleware."
    ]
  },
  {
    id: "qcnn-tumor",
    title: "Brain Tumor Detection using QCNN",
    category: "Applied Quantum Computing & ML",
    shortDesc: "Hybrid Quantum-Classical Neural Network leveraging simulated qubits for brain tumor detection in MRI scans.",
    longDesc: "A quantum-classical pipeline that extracts features from MRI images and inputs them into a simulated 4-qubit quantum circuit. The system uses amplitude embedding to encode classical pixels into quantum states, applies parameterized rotations and CNOT gates to extract features, and measures expectation values on Pauli-Z observables for classification.",
    tech: ["Python", "TensorFlow", "PennyLane", "PyTorch", "NumPy", "Matplotlib", "QCNN"],
    github: "https://github.com/Karthik7661/Brain-Tumor-QCNN",
    publication: "10.1109/OCIT66168.2025.11400476",
    features: [
      "Hybrid QCNN combining classical preprocessing with quantum circuit-based feature extraction.",
      "4-qubit simulated quantum circuit modeled in PennyLane using KerasLayer integrations.",
      "Amplitude embedding encoding classical image data into quantum superposition states.",
      "Entanglement representation via CNOT gates to capture complex non-linear spatial dependencies.",
      "Published IEEE conference paper showing details at IEEE OCIT 2025."
    ],
    architecture: {
      text: "Input MRI Scan -> Grayscale/Resize (16x16) -> Quantum Amplitude Encoding -> Parameterized RY/RZ Rotations -> CNOT Entanglement -> Expectation Value Measurement -> Sigmoid Activation -> Binary Classifier",
      imagePath: "/images/hybrid_architecture.png",
      details: [
        "**Input Module**: Preprocesses raw MRI images, resizing them to 16x16 pixels to fit simulator qubit limits.",
        "**Quantum Layer (PennyLane)**: Maps data onto 4 qubits. Applies parameterized rotations (theta) and entangling CNOT gates.",
        "**Measurement Layer**: Computes expectation values on Pauli-Z observables, returning a classical vector to a dense sigmoid classification layer."
      ]
    },
    results: {
      stats: [
        { label: "Classification", value: "90.0%" },
        { label: "Qubits Used", value: "4-Qubits" },
        { label: "Simulator", value: "PennyLane" },
        { label: "Loss Engine", value: "BCE Loss" }
      ],
      text: "Achieved 90% classification accuracy on binary tumor detection scans. The results validate that hybrid quantum-classical networks can generalize effectively even on smaller clinical datasets.",
      imagePath: "/images/mri_visual.png",
      imagePathExtra: "/images/mri_results.png"
    },
    lessons: [
      "Managing memory overhead when scaling simulated qubits beyond 10-qubit boundaries.",
      "Mapping and normalizing classical image pixels to fit within quantum amplitude constraints.",
      "Integrating PyTorch dataloaders with PennyLane's custom autograd wrappers."
    ]
  },
  {
    id: "qcnn-resnet",
    title: "Hybrid QCNN with ResNet-50",
    category: "Advanced Deep Learning & Feature Modulation",
    shortDesc: "State-of-the-art hybrid QCNN with ResNet-50 backbone achieving ~91% validation accuracy on multi-class brain tumor classification.",
    longDesc: "A high-performance quantum-classical neural network that integrates a Quantum Feature Modulation Unit (QFMU) with a pre-trained classical ResNet-50 backbone. Utilizes Feature-wise Linear Modulation (FiLM) layers to adjust intermediate feature maps dynamically based on quantum angle embeddings and entangling layers, resolving spatial variance and noise limits.",
    tech: ["Python", "PyTorch", "PennyLane", "ResNet-50", "FiLM Modulation", "Transfer Learning", "Matplotlib"],
    github: "https://github.com/Karthik7661/Brain-Tumor-QCNN-ResNet",
    features: [
      "Quantum Feature Modulation Unit (QFMU) preceding a pretrained ResNet-50 backbone.",
      "FiLM-based feature modulation utilizing scale (α) and shift (β) parameters computed via simulated quantum gates.",
      "Trained on 7,000+ MRI scans classifying four categories: Glioma, Meningioma, Pituitary, or No Tumor.",
      "Robust to noise modeling, showing high generalization stability under simulated quantum hardware conditions.",
      "Achieved validation accuracy of ~91% using transfer learning and regularization techniques."
    ],
    architecture: {
      text: "Input MRI Scan -> Preprocessing (224x224) -> Quantum Feature Modulation (QFMU) -> Feature Fusion (FiLM Scale/Shift) -> ResNet-50 Feature Extractor -> Dense Layer -> Softmax -> 4-Class Output",
      imagePath: "/images/final_architecture_flow.png",
      details: [
        "**Preprocessing Stage**: Resizes images to 224x224 pixels and applies data augmentation (rotation, brightness scaling).",
        "**Quantum Feature Modulation (QFMU)**: Processes classical features through a parameterized 4-qubit circuit with Angle Embedding and Entangling Layers, producing scale (α) and shift (β) variables.",
        "**ResNet-50 Backbone**: Integrates modulated feature maps via FiLM (F' = F(1+α) + β) into the deep convolutional blocks for multi-class classification."
      ]
    },
    results: {
      stats: [
        { label: "Accuracy", value: "~91.0%" },
        { label: "Precision", value: "91.2%" },
        { label: "Recall", value: "90.5%" },
        { label: "F1-Score", value: "90.8%" }
      ],
      text: "Achieved validation accuracy of ~91% on a multi-class MRI dataset (7,000+ images), showing high feature representation quality and robustness to noise and struct variance.",
      imagePath: "/images/training_plot.png",
      imagePathExtra: "/images/confusion_matrix.png"
    },
    lessons: [
      "Implementing FiLM layers in deep transfer learning backbones without breaking gradients.",
      "Developing parameterized rotation gates with simulated quantum noise models (thermal/dephasing).",
      "Evaluating feature map activations using Grad-CAM to confirm quantum alignment focus."
    ]
  }
];

export const Projects: React.FC = () => {
  const { setCursorType } = usePortfolio();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "performance">("overview");
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const project = PROJECTS_DATA.find((p) => p.id === selectedId);

  const handleHoverStart = () => setCursorType("hover");
  const handleHoverEnd = () => setCursorType("default");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-transparent border-t border-white/5">
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-accent-blue/5 blur-[90px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-space tracking-tight text-white mb-4">
            Product <span className="text-accent-cyan">Showcase</span>
          </h2>
          <p className="text-slate-400 font-light text-sm md:text-base">
            Detailed engineering archives. Click on any project card to expand it into a complete, deep-dive walkthrough.
          </p>
        </div>

        {/* Projects Grid */}
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
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {PROJECTS_DATA.map((proj, index) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
              }}
              key={proj.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onClick={() => {
                setSelectedId(proj.id);
                setActiveTab("overview");
              }}
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
              whileHover={{ y: -6 }}
              className="glass-panel hover:glass-panel-glow transition-all duration-500 rounded-xl overflow-hidden cursor-pointer group flex flex-col justify-between h-[380px] relative"
            >
              {/* Spotlight Radial Background Glow */}
              <div
                className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full w-[300px] h-[300px] bg-radial from-white/[0.04] to-transparent -translate-x-1/2 -translate-y-1/2 z-0"
                style={{
                  left: "var(--mouse-x, 0px)",
                  top: "var(--mouse-y, 0px)",
                }}
              />

              <div className="p-6 space-y-4 relative z-10">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 tracking-wider">
                  <span>{proj.category}</span>
                  {proj.publication && (
                    <span className="text-accent-cyan px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      IEEE 2025
                    </span>
                  )}
                </div>

                <h3 className="text-xl md:text-2xl font-space font-semibold text-white group-hover:text-accent-cyan transition-colors">
                  {proj.title}
                </h3>

                <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed line-clamp-4">
                  {proj.shortDesc}
                </p>
              </div>

              <div className="p-6 pt-0 space-y-4 relative z-10">
                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.slice(0, 4).map((t) => (
                    <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                      {t}
                    </span>
                  ))}
                  {proj.tech.length > 4 && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-500 border border-white/5">
                      +{proj.tech.length - 4} More
                    </span>
                  )}
                </div>

                {/* Arrow action */}
                <div className="flex items-center gap-1.5 text-xs font-mono text-accent-cyan font-medium group-hover:gap-2.5 transition-all">
                  <span>Explore Architecture</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Expansible Modal Overlay */}
        <AnimatePresence>
          {selectedId && project && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 select-text">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 30, stiffness: 350 }}
                className="w-full max-w-4xl h-[90vh] md:h-[80vh] glass-panel-glow bg-[#0b0f19] rounded-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col"
              >
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                      <span>{project.category}</span>
                      {project.publication && <span className="text-accent-cyan">• Published IEEE</span>}
                    </div>
                    <h3 className="text-xl md:text-3xl font-space font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedId(null)}
                    onMouseEnter={handleHoverStart}
                    onMouseLeave={handleHoverEnd}
                    className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Tab selectors */}
                <div className="flex border-b border-white/5 bg-[#0e1422] px-6 py-2 text-xs md:text-sm font-mono text-slate-400 gap-4">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`py-2 border-b-2 transition-all ${
                      activeTab === "overview"
                        ? "border-accent-cyan text-white"
                        : "border-transparent hover:text-slate-200"
                    }`}
                  >
                    1. Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("architecture")}
                    className={`py-2 border-b-2 transition-all ${
                      activeTab === "architecture"
                        ? "border-accent-cyan text-white"
                        : "border-transparent hover:text-slate-200"
                    }`}
                  >
                    2. Architecture
                  </button>
                  <button
                    onClick={() => setActiveTab("performance")}
                    className={`py-2 border-b-2 transition-all ${
                      activeTab === "performance"
                        ? "border-accent-cyan text-white"
                        : "border-transparent hover:text-slate-200"
                    }`}
                  >
                    3. Performance & Results
                  </button>
                </div>

                {/* Content Area */}
                <div data-lenis-prevent className="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  {/* OVERVIEW TAB */}
                  {activeTab === "overview" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                      <div className="md:col-span-2 space-y-6">
                        <div className="space-y-2">
                          <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest">Project Summary</h4>
                          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
                            {project.longDesc}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest">Key Features</h4>
                          <ul className="space-y-2">
                            {project.features.map((feat, i) => (
                              <li key={i} className="flex gap-2.5 items-start text-xs md:text-sm text-slate-300 leading-relaxed font-light">
                                <CheckCircle2 size={16} className="text-accent-cyan shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-6 border-l border-white/5 pl-0 md:pl-6">
                        <div className="space-y-3">
                          <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest">Technologies</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((t) => (
                              <span key={t} className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/5 text-slate-300">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest">Lessons Learned</h4>
                          <ul className="space-y-2 text-xs text-slate-400 space-y-1.5 font-light leading-relaxed">
                            {project.lessons.map((les, i) => (
                              <li key={i} className="flex gap-2 items-start">
                                <span className="text-accent-purple select-none shrink-0 mt-0.5">•</span>
                                <span>{les}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ARCHITECTURE TAB */}
                  {activeTab === "architecture" && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                              <Workflow size={14} className="text-accent-cyan" /> Data Flow Pipeline
                            </h4>
                            <p className="text-xs font-mono bg-black/40 border border-white/5 p-3 rounded-lg text-accent-cyan break-words">
                              {project.architecture.text}
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest">Architectural Details</h4>
                            <ul className="space-y-3">
                              {project.architecture.details.map((detail, i) => (
                                <li key={i} className="text-xs md:text-sm text-slate-300 font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: detail }} />
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Rendering mapped architecture diagram */}
                        {project.architecture.imagePath && (
                          <div className="relative w-full aspect-video md:aspect-square bg-black/40 border border-white/5 rounded-xl overflow-hidden flex items-center justify-center">
                            <Image
                              src={project.architecture.imagePath}
                              alt="Architecture Diagram"
                              fill
                              className="object-contain p-2"
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* PERFORMANCE TAB */}
                  {activeTab === "performance" && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {project.results.stats.map((stat, i) => (
                          <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg p-4 text-center">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                              {stat.label}
                            </span>
                            <span className="text-xl md:text-2xl font-space font-bold text-accent-cyan">
                              {stat.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="space-y-4">
                          <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                            <BarChart3 size={14} className="text-accent-cyan" /> Experimental Results
                          </h4>
                          <p className="text-slate-300 text-sm font-light leading-relaxed">
                            {project.results.text}
                          </p>
                        </div>

                        {/* Render real results images (e.g. training loss curve, confusion matrix) side-by-side or carousel */}
                        <div className="flex gap-4">
                          {project.results.imagePath && (
                            <div className="relative flex-1 aspect-[4/3] bg-black/40 border border-white/5 rounded-xl overflow-hidden">
                              <Image
                                src={project.results.imagePath}
                                alt="Experimental Plot"
                                fill
                                className="object-contain p-1"
                                sizes="200px"
                              />
                            </div>
                          )}
                          {project.results.imagePathExtra && (
                            <div className="relative flex-1 aspect-[4/3] bg-black/40 border border-white/5 rounded-xl overflow-hidden">
                              <Image
                                src={project.results.imagePathExtra}
                                alt="Performance Chart"
                                fill
                                className="object-contain p-1"
                                sizes="200px"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Footer Buttons */}
                <div className="p-6 bg-[#0e1422] border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={handleHoverStart}
                      onMouseLeave={handleHoverEnd}
                      className="px-4 py-2.5 rounded-lg border border-white/10 hover:bg-white/10 text-white text-xs font-medium flex items-center gap-2 transition-colors select-none"
                    >
                      <FaGithub size={14} /> Repository Link
                    </a>

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={handleHoverStart}
                        onMouseLeave={handleHoverEnd}
                        className="px-4 py-2.5 rounded-lg bg-accent-blue hover:bg-blue-600 text-white text-xs font-medium flex items-center gap-2 transition-colors select-none"
                      >
                        <ExternalLink size={14} /> Live Deployment
                      </a>
                    )}
                  </div>

                  {project.publication && (
                    <span className="text-[10px] font-mono text-slate-500">
                      DOI: {project.publication}
                    </span>
                  )}
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
