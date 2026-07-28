"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { BookOpen, Copy, Check, FileDown, ExternalLink } from "lucide-react";

interface Publication {
  title: string;
  authors: string;
  conference: string;
  year: string;
  doi: string;
  doiLink: string;
  abstract: string;
  citation: string;
  pdfPath: string;
}

const PUBLICATIONS_DATA: Publication[] = [
  {
    title: "Brain Tumor Detection using Quantum Convolutional Neural Networks (QCNN)",
    authors: "S. Karthik, K. Snehanvitha, Addanki Sai Kumar",
    conference: "Proceedings of IEEE International Conference on Information Technologies and Communications (OCIT 2025)",
    year: "2025",
    doi: "10.1109/OCIT66168.2025.11400476",
    doiLink: "https://doi.org/10.1109/OCIT66168.2025.11400476",
    abstract: "Accurate and timely detection of brain tumours from MRI images is critical in medical diagnostics. Traditional machine learning and deep learning methods, like classical CNNs, require large datasets and extensive computational resources. To overcome these drawbacks, a hybrid Quantum Convolutional Neural Network (QCNN) approach is developed, combining classical preprocessing with quantum circuits for feature extraction and classification. The system preprocesses, downsamples, and encodes images using PyTorch, then processes features on a simulated 4-qubit quantum circuit with PennyLane, before final classification with classical neural layers. This hybrid QCNN achieves strong classification results and demonstrates improved generalization and efficiency, especially when working with limited data, showing clear benefits over purely classical approaches.",
    citation: 'S. Karthik, K. Snehanvitha and A. S. Kumar, "Brain Tumor Detection using Quantum Convolutional Neural Networks (QCNN)," 2025 IEEE Proceedings of OCIT, doi: 10.1109/OCIT66168.2025.11400476.',
    pdfPath: "/publications/qcnn_detection.pdf"
  },
  {
    title: "Brain Tumor Classification using Hybrid QCNN with ResNet",
    authors: "S. Karthik, Suma Dasari, Akhila Sree Menda, Chirra Venkata Rami Reddy, Sapthagiri Miriyala",
    conference: "Proceedings of IEEE IC-ICNS 2026",
    year: "2026",
    doi: "10.1109/IC-ICNS68863.2026.11537847",
    doiLink: "https://doi.org/10.1109/IC-ICNS68863.2026.11537847",
    abstract: "Brain tumor classification from MRI scans remains a challenging task due to tumor heterogeneity and subtle structural variations across tumor categories. Although deep convolutional neural networks such as ResNet provide strong spatial feature extraction, modeling higher-order feature interactions remains difficult. This work presents a hybrid Quantum Convolutional Neural Network (QCNN) framework that integrates a simulated quantum FiLM-based modulation layer before a ResNet-50 backbone. Experimental evaluation on a four-class MRI dataset demonstrates 91% classification accuracy, exceeding classical CNN and DenseNet baselines. The results indicate that quantum-inspired feature modulation improves representation quality while operating entirely under classical simulation constraints.",
    citation: 'S. Karthik et al., "Brain Tumor Classification using Hybrid QCNN with ResNet," 2026 IEEE Proceedings of IC-ICNS, doi: 10.1109/IC-ICNS68863.2026.11537847.',
    pdfPath: "/publications/qcnn_resnet.pdf"
  }
];

export const Publications: React.FC = () => {
  const { setCursorType } = usePortfolio();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // Default expand the first one

  const handleCopy = (citation: string, index: number) => {
    navigator.clipboard.writeText(citation);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleHoverStart = () => setCursorType("hover");
  const handleHoverEnd = () => setCursorType("default");

  return (
    <section id="publications" className="py-24 relative overflow-hidden bg-transparent border-t border-white/5">
      {/* Aurora glow */}
      <div className="absolute top-[40%] left-[-15%] w-[450px] h-[450px] rounded-full bg-accent-purple/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-space tracking-tight text-white mb-4">
            Research <span className="text-accent-blue">Publications</span>
          </h2>
          <p className="text-slate-400 font-light text-sm md:text-base">
            Academic research papers published in IEEE. Click an item to expand the abstract, copy index citations, or download PDF manuscripts.
          </p>
        </div>

        {/* Publications Catalog */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          {PUBLICATIONS_DATA.map((pub, index) => {
            const isExpanded = expandedIndex === index;
            const isCopied = copiedIndex === index;

            return (
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -30, filter: "blur(4px)" },
                  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } }
                }}
                key={index}
                layout
                className={`glass-panel rounded-xl overflow-hidden transition-all duration-300 border ${
                  isExpanded ? "border-accent-blue/30 shadow-lg shadow-blue-500/5" : "border-white/5 hover:border-white/10"
                }`}
              >
                {/* Header Card Area */}
                <div
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  onMouseEnter={handleHoverStart}
                  onMouseLeave={handleHoverEnd}
                  className="p-6 cursor-pointer flex justify-between items-center select-none bg-white/[0.01]"
                >
                  <div className="space-y-2 pr-4">
                    {/* Conference Tag */}
                    <div className="flex items-center gap-2">
                      <BookOpen size={14} className="text-accent-blue shrink-0" />
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none font-semibold truncate max-w-[280px] md:max-w-md">
                        {pub.conference}
                      </span>
                    </div>

                    {/* Paper Title */}
                    <h3 className="text-base md:text-xl font-space font-semibold text-white group-hover:text-accent-cyan transition-colors">
                      {pub.title}
                    </h3>

                    {/* Authors list */}
                    <p className="text-slate-400 text-xs font-light">
                      {pub.authors}
                    </p>
                  </div>

                  {/* Toggle indicator arrow */}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-2 rounded-lg border border-white/5 bg-white/[0.02] text-slate-400 hover:text-white transition-colors"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 4.5L6 8L9.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="border-t border-white/5 bg-black/40 overflow-hidden p-6 space-y-6"
                  >
                    {/* Abstract Synopsis */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Abstract</h4>
                      <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-light font-inter select-text">
                        {pub.abstract}
                      </p>
                    </div>

                    {/* Metadata footer */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                      {/* DOI & Cite */}
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                          <span className="text-slate-500">DOI:</span>
                          <a
                            href={pub.doiLink}
                            target="_blank"
                            rel="noreferrer"
                            onMouseEnter={handleHoverStart}
                            onMouseLeave={handleHoverEnd}
                            className="text-accent-cyan hover:underline inline-flex items-center gap-1"
                          >
                            {pub.doi} <ExternalLink size={12} />
                          </a>
                        </div>

                        {/* Citation block */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Citation reference</span>
                          <div className="flex items-start gap-2 bg-black/40 border border-white/5 p-3 rounded-lg text-xs text-slate-300 font-light relative select-all pr-12">
                            <span>{pub.citation}</span>
                            <button
                              onClick={() => handleCopy(pub.citation, index)}
                              onMouseEnter={handleHoverStart}
                              onMouseLeave={handleHoverEnd}
                              className="absolute top-2.5 right-2.5 p-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                              aria-label="Copy citation"
                            >
                              {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* DOI Publication Action */}
                      <div className="flex flex-col justify-end items-start md:items-end gap-3">
                        <a
                          href={pub.doiLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={handleHoverStart}
                          onMouseLeave={handleHoverEnd}
                          className="px-5 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-medium flex items-center gap-2 select-none cursor-none"
                        >
                          <ExternalLink size={14} /> View IEEE Publication
                        </a>
                        <span className="text-[10px] font-mono text-slate-500">
                          Redirects to official IEEE Xplore index library page
                        </span>
                      </div>
                    </div>

                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
