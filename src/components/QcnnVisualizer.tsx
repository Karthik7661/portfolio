"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Cpu, Play, RefreshCw, Sliders, Activity, HelpCircle } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

// Input MRI slice options
const MRI_SLICES = [
  { id: "glioma", name: "Slice #401 (Glioma)", type: "Glioma Tumor", prob: 0.942, color: "from-red-500/20 to-red-500/5", textColor: "text-red-400", borderColor: "border-red-500/30" },
  { id: "meningioma", name: "Slice #102 (Meningioma)", type: "Meningioma Tumor", prob: 0.897, color: "from-purple-500/20 to-purple-500/5", textColor: "text-purple-400", borderColor: "border-purple-500/30" },
  { id: "healthy", name: "Slice #789 (Normal)", type: "Normal Tissue", prob: 0.984, color: "from-green-500/20 to-green-500/5", textColor: "text-green-400", borderColor: "border-green-500/30" }
];

export const QcnnVisualizer: React.FC = () => {
  const { setCursorType } = usePortfolio();
  const [selectedSlice, setSelectedSlice] = useState(MRI_SLICES[0]);
  const [theta, setTheta] = useState(60); // Degrees: 0 to 180
  const [phiPhase, setPhiPhase] = useState(0); // Rads, continuous precession
  const [isSimulating, setIsSimulating] = useState(false);
  const [measureCount, setMeasureCount] = useState(0);
  
  // Simulated probabilities for states |00>, |01>, |10>, |11>
  const [probabilities, setProbabilities] = useState([0.65, 0.20, 0.10, 0.05]);

  // Request Animation Frame reference for Bloch Sphere spin precession
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const animatePhi = () => {
      setPhiPhase((prev) => (prev + 0.02) % (2 * Math.PI));
      requestRef.current = requestAnimationFrame(animatePhi);
    };
    requestRef.current = requestAnimationFrame(animatePhi);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Update output state probabilities dynamically based on Ry gate angle (theta) and selected slice
  useEffect(() => {
    const rad = (theta * Math.PI) / 180;
    const cos2 = Math.pow(Math.cos(rad / 2), 2);
    const sin2 = Math.pow(Math.sin(rad / 2), 2);

    let p00, p01, p10, p11;
    if (selectedSlice.id === "glioma") {
      p00 = cos2 * 0.8 + 0.05;
      p01 = sin2 * 0.7 + 0.05;
      p10 = (1 - cos2) * 0.1 + 0.05;
      p11 = 1 - (p00 + p01 + p10);
    } else if (selectedSlice.id === "meningioma") {
      p00 = cos2 * 0.1 + 0.05;
      p01 = sin2 * 0.8 + 0.05;
      p10 = (1 - sin2) * 0.75 + 0.05;
      p11 = 1 - (p00 + p01 + p10);
    } else {
      p00 = cos2 * 0.05 + 0.02;
      p01 = sin2 * 0.05 + 0.03;
      p10 = cos2 * 0.85 + 0.05;
      p11 = 1 - (p00 + p01 + p10);
    }

    // Normalize
    const sum = p00 + p01 + p10 + p11;
    setProbabilities([p00 / sum, p01 / sum, p10 / sum, p11 / sum]);
  }, [theta, selectedSlice]);

  const handleSimulate = () => {
    setIsSimulating(true);
    setCursorType("default");
    setTimeout(() => {
      setIsSimulating(false);
      setMeasureCount((c) => c + 1);
    }, 1500);
  };

  // Calculate Bloch Sphere coordinates for 2D visual projection
  const getBlochCoords = () => {
    const radius = 55;
    const center = 75;
    const radTheta = (theta * Math.PI) / 180;
    
    // 3D coordinates on unit sphere
    const x = Math.sin(radTheta) * Math.cos(phiPhase);
    const y = Math.sin(radTheta) * Math.sin(phiPhase);
    const z = Math.cos(radTheta);
    
    // 2D Perspective Projection
    const screenX = center + radius * x;
    const screenY = center - radius * z + radius * 0.25 * y;
    
    return { x: screenX, y: screenY };
  };

  const blochPos = getBlochCoords();

  // Wave equations terms
  const coeff0 = Math.cos((theta * Math.PI) / 360).toFixed(2);
  const coeff1 = Math.sin((theta * Math.PI) / 360).toFixed(2);

  return (
    <div className="w-full max-w-lg glass-panel bg-slate-950/80 rounded-2xl border border-white/10 p-5 space-y-6 shadow-2xl relative overflow-hidden select-none">
      
      {/* Background soft grid lines */}
      <div className="absolute inset-0 bg-grid-mesh opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-cyan border border-accent-blue/20">
            <Activity size={16} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-space font-bold text-white tracking-wide uppercase">QCNN Inference Simulator</h3>
            <p className="text-[10px] font-mono text-slate-500">PennyLane Hybrid Quantum Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5 text-slate-400">
          <Cpu size={10} /> Active State
        </div>
      </div>

      {/* Selector: MRI Input Slices */}
      <div className="space-y-2 relative z-10">
        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <Brain size={12} className="text-accent-cyan" /> 1. Select Classical MRI Feature Input
        </label>
        <div className="grid grid-cols-3 gap-2">
          {MRI_SLICES.map((slice) => {
            const isSelected = selectedSlice.id === slice.id;
            return (
              <button
                key={slice.id}
                onClick={() => setSelectedSlice(slice)}
                onMouseEnter={() => setCursorType("hover")}
                onMouseLeave={() => setCursorType("default")}
                className={`p-2 rounded-xl text-left border transition-all duration-300 relative cursor-none overflow-hidden ${
                  isSelected
                    ? `bg-gradient-to-br ${slice.color} border-accent-blue/50 shadow-md shadow-blue-500/5`
                    : "bg-white/[0.01] hover:bg-white/[0.04] border-white/5"
                }`}
              >
                <div className="text-[9px] font-mono text-slate-400 truncate">{slice.name}</div>
                <div className={`text-[10px] font-semibold mt-1 font-space ${slice.textColor}`}>
                  {slice.type.split(" ")[0]}
                </div>
                {isSelected && (
                  <motion.div
                    layoutId="activeSliceBorder"
                    className="absolute inset-0 border border-accent-blue/50 rounded-xl pointer-events-none"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Quantum Circuit Area */}
      <div className="space-y-2 relative z-10">
        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
          2. Quantum Convolutional Circuit
        </label>
        <div className="relative w-full aspect-[21/8] bg-black/40 border border-white/5 rounded-xl flex flex-col justify-between p-3.5 font-mono text-[9px] overflow-hidden">
          
          {/* Animated signal pulse along wires */}
          <div className="absolute inset-0 pointer-events-none">
            {[0, 1, 2, 3].map((wireIdx) => (
              <svg key={wireIdx} className="absolute w-full h-full" style={{ top: 0, left: 0 }}>
                <path
                  d={`M 35,${18 + wireIdx * 24} L 450,${18 + wireIdx * 24}`}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="2"
                  className="relative"
                />
                <motion.circle
                  r="2.5"
                  fill="#00f0ff"
                  className="shadow-[0_0_8px_#00f0ff]"
                  animate={{
                    cx: [35, 450],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: wireIdx * 0.6,
                  }}
                />
              </svg>
            ))}
          </div>

          {/* Wire 0 */}
          <div className="flex items-center justify-between relative z-10 h-6">
            <span className="text-slate-500 font-bold select-none text-[8px] w-6">|q₀⟩</span>
            <div className="w-full h-[1px] bg-slate-800 mx-2 relative flex items-center justify-around">
              <span className="px-1.5 py-0.5 bg-accent-blue/20 border border-accent-blue/40 text-accent-cyan rounded text-[8px] font-bold shadow-sm select-none">H</span>
              <span className="px-1 py-0.5 bg-accent-purple/20 border border-accent-purple/40 text-accent-purple rounded text-[7px] font-bold shadow-sm select-none">R_y(θ)</span>
              <span className="w-3 h-3 rounded-full border border-slate-600 bg-slate-950 flex items-center justify-center font-bold text-[7px] select-none text-slate-400">●</span>
            </div>
            <span className="text-slate-600 text-[8px] w-8 text-right">Meas.</span>
          </div>

          {/* Wire 1 */}
          <div className="flex items-center justify-between relative z-10 h-6">
            <span className="text-slate-500 font-bold select-none text-[8px] w-6">|q₁⟩</span>
            <div className="w-full h-[1px] bg-slate-800 mx-2 relative flex items-center justify-around">
              <span className="px-1.5 py-0.5 bg-accent-blue/20 border border-accent-blue/40 text-accent-cyan rounded text-[8px] font-bold shadow-sm select-none">H</span>
              <span className="w-3.5 h-3.5 rounded-full border border-accent-blue/30 bg-accent-blue/10 flex items-center justify-center font-bold text-[9px] select-none text-accent-cyan shadow-sm">+</span>
              <span className="w-3.5 h-3.5 rounded-full border border-accent-purple/30 bg-accent-purple/10 flex items-center justify-center font-bold text-[9px] select-none text-accent-purple shadow-sm">+</span>
            </div>
            <span className="text-slate-600 text-[8px] w-8 text-right">Meas.</span>
          </div>

          {/* Wire 2 */}
          <div className="flex items-center justify-between relative z-10 h-6">
            <span className="text-slate-500 font-bold select-none text-[8px] w-6">|q₂⟩</span>
            <div className="w-full h-[1px] bg-slate-800 mx-2 relative flex items-center justify-around">
              <span className="px-1.5 py-0.5 bg-accent-blue/20 border border-accent-blue/40 text-accent-cyan rounded text-[8px] font-bold shadow-sm select-none">H</span>
              <span className="w-3 h-3 rounded-full border border-slate-600 bg-slate-950 flex items-center justify-center font-bold text-[7px] select-none text-slate-400">●</span>
              <span className="px-1 py-0.5 bg-accent-cyan/15 border border-accent-cyan/30 text-accent-cyan rounded text-[7px] font-bold select-none">Pool</span>
            </div>
            <span className="text-slate-600 text-[8px] w-8 text-right">Meas.</span>
          </div>

          {/* Wire 3 */}
          <div className="flex items-center justify-between relative z-10 h-6">
            <span className="text-slate-500 font-bold select-none text-[8px] w-6">|q₃⟩</span>
            <div className="w-full h-[1px] bg-slate-800 mx-2 relative flex items-center justify-around">
              <span className="px-1.5 py-0.5 bg-accent-blue/20 border border-accent-blue/40 text-accent-cyan rounded text-[8px] font-bold shadow-sm select-none">H</span>
              <span className="w-3.5 h-3.5 rounded-full border border-accent-blue/30 bg-accent-blue/10 flex items-center justify-center font-bold text-[9px] select-none text-accent-cyan shadow-sm">+</span>
              <span className="px-1 py-0.5 bg-slate-800/80 border border-slate-700 text-slate-400 rounded text-[7px] font-bold select-none">Meas</span>
            </div>
            <span className="text-slate-600 text-[8px] w-8 text-right">Output</span>
          </div>

        </div>
      </div>

      {/* Split layout: Slider/Bloch Sphere & Probability chart */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 relative z-10">
        
        {/* Left Side: Parameters Ry Angle & Bloch Sphere Projection */}
        <div className="md:col-span-6 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-slate-400">Parameter (θ Angle)</span>
              <span className="text-accent-purple font-semibold">{theta}° / 180°</span>
            </div>
            <div className="flex items-center gap-3">
              <Sliders size={12} className="text-slate-500" />
              <input
                type="range"
                min="0"
                max="180"
                value={theta}
                onChange={(e) => setTheta(Number(e.target.value))}
                onMouseEnter={() => setCursorType("hover")}
                onMouseLeave={() => setCursorType("default")}
                className="w-full accent-accent-purple bg-white/5 h-1 rounded-lg cursor-none"
              />
            </div>
          </div>

          {/* Bloch Sphere SVG */}
          <div className="flex flex-col items-center justify-center border border-white/5 bg-black/35 rounded-xl p-2.5 space-y-1">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wide">Qubit state vector |ψ⟩ projection</span>
            
            <div className="relative">
              <svg className="w-[150px] h-[150px]" viewBox="0 0 150 150">
                {/* Outer Circle Sphere */}
                <circle cx="75" cy="75" r="55" fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="3,3" />
                
                {/* Equator Ellipse */}
                <ellipse cx="75" cy="75" rx="55" ry="18" fill="none" stroke="rgba(255,255,255,0.04)" />
                
                {/* Vertical Z axis */}
                <line x1="75" y1="15" x2="75" y2="135" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                {/* Horizontal X axis */}
                <line x1="15" y1="75" x2="135" y2="75" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                
                {/* Sphere Axis Labels */}
                <text x="71" y="11" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">|+z⟩ (|0⟩)</text>
                <text x="71" y="145" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">|-z⟩ (|1⟩)</text>
                
                {/* Origin Point */}
                <circle cx="75" cy="75" r="1.5" fill="#fff" />
                
                {/* Animated Rotated State Vector Arrow */}
                <line
                  x1="75"
                  y1="75"
                  x2={blochPos.x}
                  y2={blochPos.y}
                  stroke="#a855f7"
                  strokeWidth="2.2"
                  className="drop-shadow-[0_0_4px_#a855f7]"
                />
                
                {/* Arrowhead endpoint */}
                <circle cx={blochPos.x} cy={blochPos.y} r="3" fill="#00f0ff" className="drop-shadow-[0_0_6px_#00f0ff]" />
              </svg>
            </div>
            
            <div className="text-[8px] font-mono text-slate-400 select-all">
              |ψ⟩ = {coeff0}|0⟩ + ({coeff1}e<sup>iφ</sup>)|1⟩
            </div>
          </div>

        </div>

        {/* Right Side: Probabilities Graph & Prediction Results */}
        <div className="md:col-span-6 flex flex-col justify-between space-y-4">
          
          {/* State Probabilities Chart */}
          <div className="bg-black/35 border border-white/5 rounded-xl p-3.5 space-y-2">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wide block">
              Quantum State Probabilities
            </span>
            
            <div className="space-y-2">
              {["|00⟩", "|01⟩", "|10⟩", "|11⟩"].map((state, sIdx) => {
                const prob = probabilities[sIdx];
                return (
                  <div key={state} className="space-y-0.5">
                    <div className="flex justify-between text-[8px] font-mono text-slate-400">
                      <span>{state}</span>
                      <span>{(prob * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full"
                        animate={{ width: `${prob * 100}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Classification Result Display */}
          <div className="bg-slate-900/60 border border-white/5 rounded-xl p-3 flex flex-col justify-between items-stretch">
            <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
              <span>Classifier output:</span>
              <span className="text-[8px] text-slate-500">Meas. count: {measureCount}</span>
            </div>
            
            <div className="my-2 text-center py-1">
              <AnimatePresence mode="wait">
                {isSimulating ? (
                  <motion.div
                    key="simulating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center space-y-1"
                  >
                    <RefreshCw className="animate-spin text-accent-cyan" size={16} />
                    <span className="text-[10px] font-mono text-accent-cyan animate-pulse">Running Quantum Circuit...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-0.5"
                  >
                    <div className={`text-base font-space font-bold uppercase tracking-wider ${selectedSlice.textColor} drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]`}>
                      {selectedSlice.type}
                    </div>
                    <div className="text-[10px] font-mono text-slate-300">
                      Prediction confidence: <span className="font-bold font-space text-white">{(selectedSlice.prob * 100).toFixed(1)}%</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
              className={`w-full py-2.5 rounded-lg text-xs font-semibold font-space tracking-wide flex items-center justify-center gap-1.5 shadow transition-all duration-300 cursor-none ${
                isSimulating
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5"
                  : "bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan text-white hover:brightness-110 shadow-lg shadow-blue-500/10"
              }`}
            >
              <Play size={12} className={isSimulating ? "animate-pulse" : ""} />
              {isSimulating ? "Processing..." : "Run Quantum Circuit"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
