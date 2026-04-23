"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const flagshipProjects = [
  {
    name: "DrugParadigm X-47",
    logo: "/logo-drugparadigm.webp",
    outcome: "2 candidate molecules shortlisted",
    detail: "Placeholder project summary and measurable research outcome.",
  },
  {
    name: "CyberParadigm Sentinel",
    logo: "/logo-cyberparadigm.webp",
    outcome: "1,200+ security drills completed",
    detail: "Placeholder project summary with benchmark and deployment context.",
  },
  {
    name: "RoboParadigm Atlas Arm",
    logo: "/logo-roboparadigm.webp",
    outcome: "3 prototype iterations validated",
    detail: "Placeholder project summary with lab-to-field conversion details.",
  },
  {
    name: "NeuroParadigm Echo",
    logo: "/logo-neuroparadigm.webp",
    outcome: "87% model reliability in pilot",
    detail: "Placeholder project summary with validation data and use case.",
  },
  {
    name: "NutraParadigm N-One",
    logo: "/logo-neutraparadigm.webp",
    outcome: "4 functional formulations tested",
    detail: "Placeholder project summary with pilot cohorts and findings.",
  },
  {
    name: "CrystalParadigm Forge",
    logo: "/logo-crystalparadigm.webp",
    outcome: "9 material candidates simulated",
    detail: "Placeholder project summary around material performance targets.",
  },
];

const evidenceBlocks = [
  { label: "Startups Launched", value: "03" },
  { label: "Publications", value: "18" },
  { label: "Mentors", value: "32" },
  { label: "Labs", value: "07" },
  { label: "Partner Institutions", value: "11" },
  { label: "Application Pathways", value: "06" },
];

const peopleBlocks = [
  {
    title: "Paradigm Leads",
    text: "Placeholder copy about domain heads, leadership roles, and how each vertical is guided.",
  },
  {
    title: "Mentor Network",
    text: "Placeholder copy describing technical mentors, founders, and research advisors.",
  },
  {
    title: "Student Builder Teams",
    text: "Placeholder copy for interdisciplinary teams, contribution model, and selection.",
  },
  {
    title: "Industry & Academic Partners",
    text: "Placeholder copy on partner institutions, lab collaborations, and project pathways.",
  },
];

function PearlProjectCard({ project, index, reduceMotion }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: reduceMotion ? 0 : 26, scale: reduceMotion ? 1 : 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.58, delay: Math.min(index * 0.08, 0.36), ease: [0.22, 1, 0.36, 1] }}
      className={`relative grid md:grid-cols-[96px_1fr] gap-4 md:gap-6 rounded-2xl border border-outline-variant/65 bg-surface-container-lowest p-5 md:p-6 shadow-[0_16px_42px_rgba(20,20,18,0.07)] ${index % 2 === 0 ? "md:mr-14" : "md:ml-14"}`}
    >
      <div aria-hidden className="hidden md:block absolute -left-8 top-1/2 h-px w-8 bg-primary/30" />

      <div className="flex items-start justify-center md:justify-start">
        <motion.div
          className="relative h-20 w-20 rounded-full border border-white/90 shadow-[0_10px_26px_rgba(10,25,20,0.2)] overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.98) 0%, rgba(235,244,240,0.94) 52%, rgba(194,217,208,0.9) 100%)",
          }}
          animate={reduceMotion ? {} : { y: [0, -3, 0] }}
          transition={reduceMotion ? {} : { duration: 2.4 + index * 0.12, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="pointer-events-none absolute left-3 top-3 h-2 w-2 rounded-full bg-white/95 z-10" />
          <div className="absolute inset-0 p-1.5">
            <div className={`w-full h-full bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden ${project.logo.includes("neutra") || project.logo.includes("nutra") ? "p-2.5" : "p-1.5"}`}>
              <Image
                src={project.logo}
                alt={project.name}
                width={56}
                height={56}
                className="h-full w-full object-contain"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div>
        <p className="text-[0.92rem] font-semibold leading-tight text-on-surface mb-2">
          {project.name}
        </p>
        <p className="text-[0.84rem] uppercase tracking-[0.11em] font-semibold text-primary mb-3">
          {project.outcome}
        </p>
        <p className="text-[0.9rem] leading-relaxed text-on-surface-variant">
          {project.detail}
        </p>
        <p className="mt-4 text-[0.7rem] uppercase tracking-[0.14em] text-on-surface-variant/75 font-semibold">
          Pearl {String(index + 1).padStart(2, "0")}
        </p>
      </div>
    </motion.article>
  );
}

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  const sectionIntro = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardReveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20, scale: reduceMotion ? 1 : 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      <Navbar />
      <main className="bg-surface text-on-surface pt-32 pb-20">
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
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
              About Us
            </motion.p>
            <motion.h1
              variants={sectionIntro}
              className="relative z-10 font-display text-[clamp(2rem,5vw,3.7rem)] leading-[1.04] tracking-tight max-w-4xl"
            >
              A Deep-Tech Hub Built to Turn Student Potential into Real Outcomes
            </motion.h1>
            <motion.p
              variants={sectionIntro}
              className="relative z-10 mt-6 max-w-3xl text-[0.97rem] leading-relaxed text-on-surface-variant"
            >
              Replace this section with your final institutional story. The design is structured for evidence-first messaging: flagship outcomes, people involved, and clear pathways from exploration to execution.
            </motion.p>
            <motion.div variants={sectionIntro} className="relative z-10 mt-9 flex flex-wrap gap-3">
              <Link
                href="/#contact"
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
        </section>

        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 mt-16 md:mt-20">
          <motion.div
            variants={sectionIntro}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-wrap items-end justify-between gap-5 mb-9"
          >
            <div>
              <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-primary mb-3">
                String of Pearls
              </p>
              <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.1] tracking-tight">
                Flagship Projects with Outcomes
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant max-w-md leading-relaxed">
              Each pearl represents one flagship initiative. Keep your final named projects, measurable outputs, and impact notes directly on each card.
            </p>
          </motion.div>

          <div className="relative">
            <div
              aria-hidden
              className="hidden md:block absolute left-8 top-3 bottom-3 w-0.5 bg-linear-to-b from-transparent via-primary/40 to-transparent"
            />

            <div className="space-y-5 md:space-y-6">
              {flagshipProjects.map((project, index) => (
                <PearlProjectCard
                  key={project.name}
                  project={project}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 mt-16">
          <motion.div
            variants={sectionIntro}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-90px" }}
            className="rounded-3xl border border-outline-variant/65 bg-surface-container-low p-7 md:p-10"
          >
            <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-primary mb-4">
              Supporting Detail
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {evidenceBlocks.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={cardReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-90px" }}
                  transition={{ delay: Math.min(index * 0.04, 0.2) }}
                  className="rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-5"
                >
                  <p className="font-display text-[1.45rem] leading-none text-on-surface mb-2">
                    {item.value}
                  </p>
                  <p className="text-[0.75rem] leading-snug uppercase tracking-[0.08em] text-on-surface-variant font-semibold">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 mt-16">
          <motion.div
            variants={sectionIntro}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-90px" }}
            className="mb-8"
          >
            <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-primary mb-3">
              People Involved
            </p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.3rem)] leading-[1.1] tracking-tight">
              The Team Behind the Work
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {peopleBlocks.map((item, index) => (
              <motion.article
                key={item.title}
                variants={cardReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-90px" }}
                transition={{ delay: Math.min(index * 0.06, 0.18) }}
                className="rounded-2xl border border-outline-variant/65 bg-surface-container-lowest p-6"
              >
                <h3 className="font-display text-[1.15rem] font-semibold mb-3 text-on-surface">
                  {item.title}
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-on-surface-variant">
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
