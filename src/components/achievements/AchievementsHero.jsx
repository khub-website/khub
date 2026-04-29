import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export function AchievementsHero() {
  const reduceMotion = useReducedMotion();

  const sectionIntro = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="bg-surface pt-32 pb-16">
      <div className="page-container">
        <motion.div
          variants={sectionIntro}
          initial="hidden"
          animate="show"
          className="relative overflow-hidden rounded-[28px] border border-outline-variant/70 bg-surface-container-lowest p-8 md:p-12 shadow-[0_22px_60px_rgba(20,20,18,0.1)]"
        >
          <div
            aria-hidden
            className="absolute -top-24 -right-16 h-56 w-56 rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(var(--color-primary-rgb),0.42) 0%, rgba(var(--color-primary-rgb),0) 72%)",
            }}
          />
          <div
            aria-hidden
            className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full blur-3xl opacity-35"
            style={{
              background:
                "radial-gradient(circle, rgba(var(--color-primary-container-rgb),0.42) 0%, rgba(var(--color-primary-container-rgb),0) 72%)",
            }}
          />

          <motion.p
            variants={sectionIntro}
            className="relative z-10 text-[0.74rem] font-semibold tracking-[0.16em] uppercase text-primary mb-4"
          >
            Our Achievements
          </motion.p>
          <motion.h1
            variants={sectionIntro}
            className="relative z-10 font-display text-[clamp(2rem,5vw,3.7rem)] leading-[1.04] tracking-tight max-w-4xl"
          >
            Celebrating Our Milestones & Applied Research Impact
          </motion.h1>
          <motion.p
            variants={sectionIntro}
            className="relative z-10 mt-6 max-w-3xl text-[0.97rem] leading-relaxed text-on-surface-variant"
          >
            K-Hub is the deep-tech incubator of KMIT Group of Institutions,
            empowering students to work on cutting-edge applied research in
            drug discovery, cybersecurity, robotics, and beyond. This portal
            documents our journey and the tangible outcomes of our focus paradigms.
          </motion.p>
          <motion.div variants={sectionIntro} className="relative z-10 mt-9 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="px-5 py-3 rounded-xl bg-primary text-surface-container-lowest text-sm font-semibold tracking-tight hover:opacity-90 transition"
            >
              Connect With K-Hub
            </Link>
            <Link
              href="/"
              className="px-5 py-3 rounded-xl border border-outline-variant/70 bg-surface text-sm font-semibold text-on-surface-variant hover:text-primary transition"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
