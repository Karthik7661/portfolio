"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface PortfolioContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  percent: number;
  setPercent: (percent: number) => void;
  cursorType: "default" | "hover" | "magnetic" | "text" | "hidden";
  setCursorType: (type: "default" | "hover" | "magnetic" | "text" | "hidden") => void;
  magneticElement: HTMLElement | null;
  setMagneticElement: (element: HTMLElement | null) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "magnetic" | "text" | "hidden">("default");
  const [magneticElement, setMagneticElement] = useState<HTMLElement | null>(null);

  // Simple loading simulator that finishes whenThree.js model finishes compile,
  // but handles fallback timer just in case.
  useEffect(() => {
    if (!isLoading) return;

    let current = 0;
    const interval = setInterval(() => {
      // Fast start, slow tail until asset loaded resolves
      if (current < 90) {
        current += Math.floor(Math.random() * 5) + 1;
        setPercent(Math.min(current, 90));
      }
    }, 120);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <PortfolioContext.Provider
      value={{
        isLoading,
        setIsLoading,
        percent,
        setPercent,
        cursorType,
        setCursorType,
        magneticElement,
        setMagneticElement,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
