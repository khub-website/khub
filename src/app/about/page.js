"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
  {
    name: "Next Paradigm",
    logo: null,
    outcome: "Upcoming Domain",
    detail: "More deep-tech domains are on the way. This pearl marks the next vertical to be announced.",
    upcoming: true,
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

const leadershipTeam = [
  {
    name: "K-Hub Lead 01",
    role: "Executive Director",
    bio: "Guides K-Hub strategy, partnerships, and the cross-domain research pipeline.",
    image: "/team/leader-01.png",
  },
  {
    name: "K-Hub Lead 02",
    role: "Program Director",
    bio: "Shapes the program cadence, mentor network, and founder readiness milestones.",
    image: "/team/leader-02.png",
  },
  {
    name: "K-Hub Lead 03",
    role: "Research Operations",
    bio: "Keeps lab pipelines, grants, and student teams moving from idea to demo.",
    image: "/team/leader-03.png",
  },
];

const paradigmHeads = [
  {
    name: "Paradigm Head 01",
    role: "DrugParadigm",
    bio: "Leads discovery work and translational pathways for drug innovation.",
    image: "/team/paradigm-01.png",
  },
  {
    name: "Paradigm Head 02",
    role: "CyberParadigm",
    bio: "Oversees secure systems research and applied security pilots.",
    image: "/team/paradigm-02.png",
  },
  {
    name: "Paradigm Head 03",
    role: "RoboParadigm",
    bio: "Guides robotics prototyping, automation, and field testing cycles.",
    image: "/team/paradigm-03.png",
  },
  {
    name: "Paradigm Head 04",
    role: "NeuroParadigm",
    bio: "Directs neurotech research, experimentation, and model validation.",
    image: "/team/paradigm-04.png",
  },
  {
    name: "Paradigm Head 05",
    role: "NutraParadigm",
    bio: "Leads nutrition science pilots and functional formulation testing.",
    image: "/team/paradigm-05.png",
  },
  {
    name: "Paradigm Head 06",
    role: "CrystalParadigm",
    bio: "Heads materials research and simulation-to-prototype delivery.",
    image: "/team/paradigm-06.png",
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
          className="relative h-20 w-20 rounded-full border border-white/90 p-2 shadow-[0_10px_26px_rgba(10,25,20,0.2)]"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.98) 0%, rgba(235,244,240,0.94) 52%, rgba(194,217,208,0.9) 100%)",
          }}
          animate={reduceMotion ? {} : { y: [0, -3, 0] }}
          transition={reduceMotion ? {} : { duration: 2.4 + index * 0.12, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="pointer-events-none absolute left-3 top-3 h-2 w-2 rounded-full bg-white/95" />
          {project.upcoming ? (
            <div className="h-full w-full rounded-full bg-surface-container-low border border-primary/35 flex items-center justify-center">
              <span className="text-[2rem] leading-none font-bold text-primary">?</span>
            </div>
          ) : (
            <Image
              src={project.logo}
              alt={project.name}
              width={56}
              height={56}
              className="h-full w-full object-contain rounded-full"
            />
          )}
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
        {project.upcoming && (
          <p className="mt-3 text-[0.72rem] uppercase tracking-[0.14em] text-primary font-semibold">
            More domains coming soon
          </p>
        )}
        <p className="mt-4 text-[0.7rem] uppercase tracking-[0.14em] text-on-surface-variant/75 font-semibold">
          Pearl {String(index + 1).padStart(2, "0")}
        </p>
      </div>
    </motion.article>
  );
}

function TeamCard({ person, isActive }) {
  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
      tabIndex={isActive ? 0 : -1}
      aria-label={`${person.name} - ${person.role}`}
      aria-hidden={!isActive}
      className="group relative w-[230px] sm:w-[250px] md:w-[270px] overflow-hidden rounded-2xl border border-outline-variant/70 bg-surface-container-lowest shadow-[0_18px_40px_rgba(18,20,24,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
    >
      <div className="relative h-60 md:h-64 w-full overflow-hidden">
        <Image
          src={person.image}
          alt={person.name}
          width={320}
          height={420}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent opacity-70"
        />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-[0.95rem] font-semibold leading-tight">{person.name}</p>
          <p className="text-[0.75rem] uppercase tracking-[0.18em] text-white/80 mt-1">
            {person.role}
          </p>
        </div>
      </div>

      <div className="absolute inset-0 flex items-end bg-surface/95 opacity-0 translate-y-6 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
        <div className="p-5">
          <p className="text-[0.85rem] uppercase tracking-[0.18em] text-primary font-semibold mb-2">
            About
          </p>
          <p className="text-[0.9rem] leading-relaxed text-on-surface-variant">
            {person.bio}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function TeamSlider({ title, description, people, reduceMotion }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setActiveIndex((current) => (current + 1) % people.length);
    }, 4200);

    return () => clearInterval(intervalId);
  }, [reduceMotion, people.length]);

  const visibleOffsets = useMemo(() => [-2, -1, 0, 1, 2], []);
  const shiftStyle = { "--card-shift": "clamp(140px, 22vw, 210px)" };

  const handlePrev = () =>
    setActiveIndex((current) => (current - 1 + people.length) % people.length);
  const handleNext = () => setActiveIndex((current) => (current + 1) % people.length);

  const activePerson = people[activeIndex];

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-90px" }}
      className="rounded-3xl border border-outline-variant/70 bg-surface-container-lowest p-6 md:p-8 shadow-[0_24px_60px_rgba(20,20,18,0.12)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-primary mb-2">
            {title}
          </p>
          <h3 className="font-display text-[clamp(1.2rem,2.5vw,1.8rem)] leading-tight">
            {description}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="h-9 w-9 rounded-full border border-outline-variant/70 bg-surface text-on-surface-variant transition hover:text-primary"
            aria-label="Show previous"
          >
            &#8592;
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="h-9 w-9 rounded-full border border-outline-variant/70 bg-surface text-on-surface-variant transition hover:text-primary"
            aria-label="Show next"
          >
            &#8594;
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-surface px-4 py-8 sm:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 left-1/2 h-28 w-56 -translate-x-1/2 rounded-full blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(var(--color-primary-rgb),0.35) 0%, rgba(var(--color-primary-rgb),0) 70%)",
          }}
        />

        <div className="relative h-[360px] sm:h-[400px] md:h-[440px]" style={shiftStyle}>
          <div className="absolute inset-0 flex items-center justify-center">
            {visibleOffsets.map((offset) => {
              const index = (activeIndex + offset + people.length) % people.length;
              const person = people[index];
              const distance = Math.abs(offset);
              const scale = distance === 0 ? 1 : distance === 1 ? 0.88 : 0.78;
              const opacity = distance === 2 ? 0.35 : distance === 1 ? 0.7 : 1;

              return (
                <motion.div
                  key={`${person.name}-${offset}`}
                  initial={false}
                  animate={{
                    x: `calc(${offset} * var(--card-shift))`,
                    scale,
                    opacity,
                    zIndex: 10 - distance,
                  }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute"
                  style={{ pointerEvents: offset === 0 ? "auto" : "none" }}
                >
                  <TeamCard person={person} isActive={offset === 0} />
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-on-surface-variant">
          <p className="font-semibold text-on-surface">{activePerson.name}</p>
          <div className="flex items-center gap-2">
            {people.map((person, index) => (
              <button
                key={person.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeIndex ? "bg-primary" : "bg-outline-variant"
                }`}
                aria-label={`Go to ${person.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
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
        <section className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
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

        <section className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 mt-16 md:mt-20">
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

        <section className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 mt-16">
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

        <section className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 mt-16 space-y-10">
          <motion.div
            variants={sectionIntro}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-90px" }}
            className="mb-4"
          >
            <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-primary mb-3">
              People Involved
            </p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.3rem)] leading-[1.1] tracking-tight">
              The Team Behind the Work
            </h2>
            <p className="mt-3 text-sm text-on-surface-variant max-w-2xl">
              Two focus lines: core leadership first, then the paradigm heads guiding each domain.
            </p>
          </motion.div>

          <TeamSlider
            title="Leadership"
            description="The core team steering K-Hub"
            people={leadershipTeam}
            reduceMotion={reduceMotion}
          />

          <TeamSlider
            title="Paradigm Heads"
            description="Domain leaders keeping each vertical on pace"
            people={paradigmHeads}
            reduceMotion={reduceMotion}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
