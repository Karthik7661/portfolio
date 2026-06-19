"use client";

import React, { useEffect } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { Hero } from "@/components/Hero";
import { AboutTimeline } from "@/components/AboutTimeline";
import { SkillsViz } from "@/components/SkillsViz";
import { Projects } from "@/components/Projects";
import { Publications } from "@/components/Publications";
import { Certifications } from "@/components/Certifications";
import { GithubSection } from "@/components/GithubSection";
import { ContactForm } from "@/components/ContactForm";
import Lenis from "lenis";

export default function Home() {
  useEffect(() => {
    // Initialize Lenis smooth scroll on desktop clients
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      syncTouch: false,
    });

    let frameId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full flex flex-col z-10">
      {/* Global Interactive Overlays */}
      <CustomCursor />

      {/* Main Sections */}
      <Hero />
      <AboutTimeline />
      <SkillsViz />
      <Projects />
      <Publications />
      <Certifications />
      <GithubSection />
      <ContactForm />
    </main>
  );
}
