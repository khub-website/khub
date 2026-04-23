import { motion } from "framer-motion";
import { Award } from "lucide-react";

export function AchievementsHero() {
  return (
    <section className="relative min-h-[85dvh] flex items-center overflow-hidden py-24 bg-surface">
      {/* Subtle warm gradient — mirrors K-Hub's clean off-white bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,108,81,0.05)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(28,28,25,0.02)_0%,transparent_50%)]" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-3xl">
          {/* K-Hub-style small green uppercase label */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[0.72rem] font-body font-semibold tracking-[0.18em] uppercase text-primary mb-6"
          >
            Deep-Tech Innovation Hub
          </motion.p>

          {/* Large serif heading like K-Hub's "Building the Future Through" */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight text-on-surface leading-[1.1] mb-6"
          >
            Celebrating Our{" "}
            <br />
            Milestones
          </motion.h1>

          {/* Body text in Inter — editorial style */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl mb-10 font-light"
          >
            K-Hub is the deep-tech incubator of KMIT Group of Institutions,
            empowering students to work on cutting-edge applied research in
            drug discovery, cybersecurity, robotics, and beyond.
          </motion.p>


        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}
