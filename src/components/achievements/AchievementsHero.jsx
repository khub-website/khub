"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy, FlaskConical, ArrowDown } from "lucide-react";
import Link from "next/link";

const HERO_IMAGE = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80";

export function AchievementsHero({ onSwitchTab }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="hero" 
      ref={ref} 
      className="relative overflow-hidden w-full" 
      style={{ minHeight: "100svh" }}
    >
      {/* ... (image and gradient code remains the same) */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: imgY }}
      >
        <img
          src={HERO_IMAGE}
          alt="Research hub"
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-surface" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      <motion.div 
        style={{ opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 page-container flex flex-col justify-center min-h-[100svh] py-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs font-bold tracking-[0.24em] uppercase text-primary mb-4"
        >
          Research Hub · Achievements Portal
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1.02] tracking-tight text-white max-w-4xl font-display"
        >
          Celebrating Milestones &<br />
          <span className="text-primary hero-shine-word">Applied Research Impact</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.6 }}
          className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-white/75 font-light"
        >
          A living archive of breakthroughs, research publications, and milestones across K-Hub's paradigms — from drug discovery and robotics to materials science and neural interfaces.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44, duration: 0.5 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <motion.button
            onClick={() => onSwitchTab("achievements")}
            className="flex items-center gap-2 px-7 py-4 rounded-xl bg-primary text-white text-sm font-bold shadow-xl shadow-primary/30"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Trophy className="w-4 h-4" /> Browse Achievements
          </motion.button>
          <motion.button
            onClick={() => onSwitchTab("research")}
            className="flex items-center gap-2 px-7 py-4 rounded-xl border border-white/25 bg-white/10 text-white text-sm font-bold backdrop-blur-sm transition-all hover:bg-white/20 hover:-translate-y-0.5"
          >
            <FlaskConical className="w-4 h-4" /> Research Papers
          </motion.button>
        </motion.div>

        {/* Scroll hint */}
        <motion.button
          onClick={() => scrollToSection("stats")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] tracking-[0.2em] font-bold uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </section>
  );
}
