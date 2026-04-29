"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import OrbitRing from "./OrbitRing";

const CYCLING_WORDS = [
    "Deep Tech",
    "Drug Discovery",
    "Cybersecurity",
    "Robotics",
    "Neuroscience",
    "Neutraceuticals",
    "AI Research",
    "Innovation",
];

const THEMES = ["theme-1", "theme-3", "theme-4", "theme-7", "theme-8"];
const WORD_SWITCH_MS = 2200;
const WORD_TRANSITION_SECONDS = 0.4;

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
    const [wordIndex, setWordIndex] = useState(0);
    const [themeIndex, setThemeIndex] = useState(0);

    useEffect(() => {
        const saved = window.localStorage.getItem("khub-theme-index");
        if (saved !== null) {
            const parsed = Number(saved);
            if (Number.isInteger(parsed) && parsed >= 0 && parsed < THEMES.length) {
                setThemeIndex(parsed);
            }
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
        }, WORD_SWITCH_MS);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const theme = THEMES[themeIndex];
        document.documentElement.setAttribute("data-theme", theme);
        window.localStorage.setItem("khub-theme-index", String(themeIndex));
    }, [themeIndex]);

    const scrollTo = (id) => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const cycleTheme = () => {
        setThemeIndex((prev) => (prev + 1) % THEMES.length);
    };

    return (
        <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-16">
            <div className="absolute top-24 right-[5%] w-80 h-80 bg-primary/[0.05] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 left-[4%] w-72 h-72 bg-primary/[0.04] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full page-container flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex-1 flex flex-col items-start text-left max-w-lg"
                >
                    <motion.button
                        variants={fadeUp}
                        onClick={cycleTheme}
                        className="mb-5 h-8 px-3 rounded-full border border-primary/30 bg-surface-container-low text-primary text-[0.65rem] font-semibold tracking-[0.12em] uppercase hover:bg-surface-container-lowest transition-all duration-300"
                        aria-label="Switch website theme"
                    >
                        {`Theme-${themeIndex + 1}`}
                    </motion.button>

                    <motion.p
                        variants={fadeUp}
                        className="text-[0.72rem] font-body font-semibold tracking-[0.18em] uppercase text-primary mb-5"
                    >
                        Deep-Tech Innovation Hub
                    </motion.p>

                    <motion.h1
                        variants={fadeUp}
                        className="font-display font-bold tracking-tight text-on-surface mb-6"
                        style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", lineHeight: 1.12 }}
                    >
                        <span className="block">Building the Future</span>
                        <span className="block">Through</span>
                        <span className="block overflow-hidden" style={{ height: "1.12em", position: "relative" }}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={wordIndex}
                                    initial={{ opacity: 0, y: "100%", filter: "blur(6px)" }}
                                    animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: "-100%", filter: "blur(6px)" }}
                                    transition={{ duration: WORD_TRANSITION_SECONDS, ease: [0.22, 1, 0.36, 1] }}
                                    className="hero-shine-word absolute inset-0 whitespace-nowrap"
                                    style={{ "--hero-word-cycle-ms": `${WORD_SWITCH_MS}ms` }}
                                >
                                    {CYCLING_WORDS[wordIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="text-base md:text-lg text-on-surface-variant leading-relaxed mb-9 font-light"
                    >
                        K-Hub is the deep-tech incubator of KMIT Group of Institutions,
                        empowering students to work on cutting-edge applied research in drug
                        discovery, cybersecurity, robotics, and beyond.
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex items-center gap-5 flex-wrap">
                        <button
                            onClick={() => scrollTo("#domains")}
                            className="px-8 py-3.5 text-surface text-sm font-semibold tracking-tight rounded-lg bg-[var(--hero-cta-from)] hover:brightness-95 hover:shadow-[0_20px_40px_rgba(var(--color-primary-rgb),0.24)] transition-all duration-300"
                        >
                            Explore Our Work
                        </button>
                        <button
                            onClick={() => scrollTo("#about")}
                            className="px-8 py-3.5 text-sm font-medium tracking-tight text-[var(--hero-secondary-text)] bg-[var(--hero-secondary-bg)] hover:bg-[var(--hero-secondary-bg-hover)] transition-all duration-300 rounded-lg"
                        >
                            Learn More
                        </button>
                    </motion.div>
                </motion.div>

                <div className="flex-[1.3] flex items-center justify-center lg:justify-end lg:pr-0">
                    <OrbitRing />
                </div>
            </div>
        </section>
    );
}
