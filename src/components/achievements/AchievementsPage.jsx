"use client";

import { useState, useRef } from "react";
import { AchievementsHero } from "./AchievementsHero";
import { StatsSection } from "./StatsSection";
import { ParadigmSection } from "./ParadigmSection";
import { AllAchievementsGrid } from "./AllAchievementsGrid";
import { ResearchSection } from "./ResearchSection";
import { paradigms } from "./ParadigmData";
import { FloatingNav } from "./FloatingNav";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, BookOpen } from "lucide-react";
import Link from "next/link";

export function AchievementsPage() {
  const [activeTab, setActiveTab] = useState("achievements"); // "achievements" | "research"
  const libraryRef = useRef(null);

  const switchToTab = (tab) => {
    setActiveTab(tab);
    if (libraryRef.current) {
      libraryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="bg-surface min-h-screen text-on-surface">
      <FloatingNav />

      {/* 1. Parallax Hero Section */}
      <section id="hero">
        <AchievementsHero onSwitchTab={switchToTab} />
      </section>

      {/* 2. Interactive Stats Section */}
      <StatsSection />

      {/* 3. Detailed Paradigm Sections (Scroll View) */}
      <div id="paradigms" className="relative">
        <div className="page-container pt-20 pb-8 text-center">
          <h2 className="text-xs font-black tracking-[0.3em] uppercase text-primary/60 mb-3">Domain Deep-Dive</h2>
          <h3 className="text-3xl md:text-4xl font-bold font-display">Explore Our Paradigms</h3>
          <div className="mt-4 h-1 w-20 bg-primary/20 mx-auto rounded-full" />
        </div>
        {paradigms.map((paradigm) => (
          <ParadigmSection
            key={paradigm.id}
            paradigm={paradigm}
          />
        ))}
      </div>

      {/* 4. Filterable Global Grid with Tab Switcher */}
      <section id="library" ref={libraryRef} className="py-24 border-t border-outline-variant/30 bg-surface-container-lowest">
        <div className="page-container">
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-xs font-black tracking-[0.3em] uppercase text-primary/60 mb-4">Discovery Library</h2>
            <div className="inline-flex p-1 bg-surface-container-low rounded-2xl border border-outline-variant/40 shadow-inner">
              <button
                onClick={() => setActiveTab("achievements")}
                className={`flex items-center gap-2.5 px-8 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "achievements"
                    ? "bg-surface text-primary shadow-lg border border-outline-variant/20"
                    : "text-on-surface-variant hover:text-on-surface"
                  }`}
              >
                <Trophy className={`w-4 h-4 ${activeTab === "achievements" ? "text-primary" : "text-on-surface-variant"}`} />
                Achievements
              </button>
              <button
                onClick={() => setActiveTab("research")}
                className={`flex items-center gap-2.5 px-8 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "research"
                    ? "bg-surface text-primary shadow-lg border border-outline-variant/20"
                    : "text-on-surface-variant hover:text-on-surface"
                  }`}
              >
                <BookOpen className={`w-4 h-4 ${activeTab === "research" ? "text-primary" : "text-on-surface-variant"}`} />
                Research
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "achievements" ? (
                <AllAchievementsGrid />
              ) : (
                <ResearchSection />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 5. Footer CTA */}
      <footer className="py-32 text-center border-t border-outline-variant/30 relative overflow-hidden bg-surface-container-lowest">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,119,182,0.04)_0%,transparent_60%)] pointer-events-none" />
        <div className="page-container relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8 group hover:scale-110 transition-transform">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-on-surface">
            Innovate With <span className="text-primary">K-Hub</span>
          </h2>
          <p className="text-on-surface-variant mb-10 max-w-lg mx-auto text-base font-light leading-relaxed">
            Join the frontier of deep-tech research. Whether you're a student, researcher, or partner, let's build the future together.
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-4 rounded-xl bg-primary text-white text-sm font-bold tracking-tight shadow-xl shadow-primary/20 transition-all hover:brightness-110 hover:shadow-primary/40 hover:-translate-y-1"
          >
            Start a Conversation
          </Link>

          <div className="flex justify-center gap-3 mt-16">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
          </div>
        </div>
      </footer>
    </main>
  );
}
