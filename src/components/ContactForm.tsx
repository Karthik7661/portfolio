"use client";

import React, { useState, useRef } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, FileText, CheckCircle2 } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export const ContactForm: React.FC = () => {
  const { setCursorType, setMagneticElement } = usePortfolio();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const handleHoverStart = (type: "hover" | "magnetic", el?: any) => {
    setCursorType(type);
    if (el) setMagneticElement(el);
  };

  const handleHoverEnd = () => {
    setCursorType("default");
    setMagneticElement(null);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#030712] border-t border-white/5 flex flex-col justify-between min-h-[90vh]">
      {/* Background glowing elements */}
      <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] rounded-full bg-accent-blue/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-accent-purple/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex-1 flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-space tracking-tight text-white mb-4">
            Get In <span className="text-accent-purple">Touch</span>
          </h2>
          <p className="text-slate-400 font-light text-sm md:text-base">
            Reach out via the secure message box below or connect directly through email, phone, or LinkedIn networks.
          </p>
        </div>

        {/* Form and info split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto w-full items-start">
          
          {/* Left: Contact Info Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              
              {/* Email channel */}
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 text-accent-blue flex items-center justify-center shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-0.5">Email</span>
                  <a
                    href="mailto:skarthik7661@gmail.com"
                    onMouseEnter={() => handleHoverStart("hover")}
                    onMouseLeave={handleHoverEnd}
                    className="text-white hover:text-accent-blue transition-colors text-sm md:text-base font-light"
                  >
                    skarthik7661@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone channel */}
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 text-accent-purple flex items-center justify-center shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-0.5">Phone</span>
                  <a
                    href="tel:+916300215873"
                    onMouseEnter={() => handleHoverStart("hover")}
                    onMouseLeave={handleHoverEnd}
                    className="text-white hover:text-accent-purple transition-colors text-sm md:text-base font-light"
                  >
                    +91 6300215873
                  </a>
                </div>
              </div>

              {/* Location channel */}
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-accent-cyan flex items-center justify-center shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-0.5">Location</span>
                  <span className="text-white text-sm md:text-base font-light">
                    Chittoor, India
                  </span>
                </div>
              </div>

            </div>

            {/* Quick connection buttons */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Channels</span>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/Karthik7661"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => handleHoverStart("hover")}
                  onMouseLeave={handleHoverEnd}
                  className="p-3 rounded-lg border border-white/5 hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.04] text-slate-400 hover:text-white transition-colors"
                  aria-label="GitHub Link"
                >
                  <FaGithub size={16} />
                </a>
                 <a
                  href="https://www.linkedin.com/in/s-karthik-/"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => handleHoverStart("hover")}
                  onMouseLeave={handleHoverEnd}
                  className="p-3 rounded-lg border border-white/5 hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.04] text-slate-400 hover:text-white transition-colors"
                  aria-label="LinkedIn Link"
                >
                  <FaLinkedinIn size={16} />
                </a>
                <a
                  href="https://drive.google.com/uc?export=download&id=1a_hHzzzRlMDvpViGft_0ktssrgbDv-uc"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => handleHoverStart("hover")}
                  onMouseLeave={handleHoverEnd}
                  className="p-3 rounded-lg border border-white/5 hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.04] text-slate-400 hover:text-white transition-colors"
                  aria-label="Resume Download Link"
                >
                  <FileText size={16} />
                </a>
              </div>
            </div>

          </div>

          {/* Right: Glassmorphism Message Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 md:p-8 space-y-5 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name-input" className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                    Full Name
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/5 hover:border-white/10 focus:border-accent-purple/30 focus:outline-none rounded-lg px-4 py-3 text-xs md:text-sm text-white placeholder-slate-600 transition-all font-light"
                    placeholder="Enter name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email-input" className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                    Email Address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/5 hover:border-white/10 focus:border-accent-purple/30 focus:outline-none rounded-lg px-4 py-3 text-xs md:text-sm text-white placeholder-slate-600 transition-all font-light"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="subject-input" className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                  Subject
                </label>
                <input
                  id="subject-input"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/5 hover:border-white/10 focus:border-accent-purple/30 focus:outline-none rounded-lg px-4 py-3 text-xs md:text-sm text-white placeholder-slate-600 transition-all font-light"
                  placeholder="Inquiry / Opportunities"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message-input" className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                  Message Details
                </label>
                <textarea
                  id="message-input"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/5 hover:border-white/10 focus:border-accent-purple/30 focus:outline-none rounded-lg px-4 py-3 text-xs md:text-sm text-white placeholder-slate-600 transition-all font-light resize-none"
                  placeholder="Outline message requirements..."
                />
              </div>

              {/* Submit Button */}
              <button
                ref={submitBtnRef}
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => handleHoverStart("magnetic", submitBtnRef.current)}
                onMouseLeave={handleHoverEnd}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-accent-purple to-accent-blue text-white text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-all select-none duration-300"
              >
                {isSubmitting ? (
                  <span>Dispatching Message...</span>
                ) : (
                  <>
                    <span>Submit Message</span> <Send size={14} />
                  </>
                )}
              </button>

              {/* Submission Success Notice Overlay */}
              {submitted && (
                <div className="absolute inset-0 bg-[#0d1222]/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center text-center p-6 space-y-3 z-20">
                  <CheckCircle2 size={44} className="text-green-500" />
                  <h3 className="font-space font-bold text-white text-lg md:text-xl">
                    Secure Dispatch Succeeded
                  </h3>
                  <p className="text-slate-400 text-xs md:text-sm max-w-xs font-light">
                    Your message has been processed successfully. S Karthik will respond shortly.
                  </p>
                </div>
              )}

            </form>
          </div>

        </div>

      </div>

      {/* Minimal Footer */}
      <footer className="w-full mt-24 border-t border-white/5 py-8 select-none bg-white/[0.005]">
        <div className="container mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-slate-500 gap-4">
          <p>
            Designed & Developed by{" "}
            <span className="text-slate-300 hover:text-accent-blue transition-colors duration-300">
              S Karthik
            </span>
          </p>
          <p>© {new Date().getFullYear()} S Karthik. All Rights Reserved.</p>
        </div>
      </footer>
    </section>
  );
};
