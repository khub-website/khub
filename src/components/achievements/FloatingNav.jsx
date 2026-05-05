"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  Layers, 
  Database, 
  Target,
  X,
  Menu,
  Navigation
} from "lucide-react";

const sections = [
  { id: "hero", label: "Overview", icon: Target },
  { id: "stats", label: "Statistics", icon: BarChart3 },
  { id: "paradigms", label: "Domains", icon: Layers },
  { id: "library", label: "Library", icon: Database },
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed right-6 bottom-8 z-[70] flex flex-col items-end gap-4">
      {/* ── Navigation Options ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="flex flex-col items-end gap-3 mb-2"
          >
            {sections.map((section, idx) => {
              const isActive = activeSection === section.id;
              const Icon = section.icon;

              return (
                <motion.div 
                  key={section.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (sections.length - idx) * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`px-3 py-1.5 rounded-lg text-[0.65rem] font-black tracking-[0.2em] uppercase transition-all shadow-lg border ${
                      isActive 
                        ? "bg-primary text-white border-primary" 
                        : "bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:text-primary hover:border-primary"
                    }`}
                  >
                    {section.label}
                  </button>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border shadow-xl ${
                      isActive 
                        ? "bg-primary text-white border-primary scale-110" 
                        : "bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary/50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Toggle Trigger ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative w-16 h-16 rounded-[24px] flex items-center justify-center transition-all duration-500 shadow-[0_12px_40px_rgba(var(--color-primary-rgb),0.25)] border ${
          isOpen 
            ? "bg-surface text-primary border-primary/20 rotate-90" 
            : "bg-primary text-white border-primary hover:scale-105 active:scale-95"
        }`}
      >
        <div className="absolute inset-0 rounded-[24px] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <Menu className="w-8 h-8" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulse effect when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-[24px] border border-primary animate-ping opacity-20 pointer-events-none" />
        )}
      </button>
    </div>
  );
}
