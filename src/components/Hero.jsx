"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

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

const HERO_SLIDES = [
    {
        title: "K-Hub Deep-Tech Innovation Hub",
        tag: "Student-led applied research, built on campus.",
        image: "/achievements/drug-hero.jpg",
    },
    {
        title: "Research and Innovation at Scale",
        tag: "From idea to experiments, fast and rigorous.",
        image: "/achievements/cyber-hero.jpg",
    },
    {
        title: "Student Venture Studio Momentum",
        tag: "Engineering founders through execution.",
        image: "/achievements/robo-hero.jpg",
    },
    {
        title: "One Campus, Multiple Paradigms",
        tag: "A connected ecosystem for deep-tech progress.",
        image: "/achievements/crystal-hero.jpg",
    },
];

const SLIDE_SWITCH_MS = 6000;

export default function Hero() {
    const [wordIndex, setWordIndex] = useState(0);
    const [themeIndex, setThemeIndex] = useState(0);
    const [slideIndex, setSlideIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const activeSlide = useMemo(() => HERO_SLIDES[slideIndex], [slideIndex]);

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
        if (isPaused) return;
        const interval = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
        }, SLIDE_SWITCH_MS);
        return () => clearInterval(interval);
    }, [isPaused]);

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

    const goToSlide = (nextIndex) => {
        const safeIndex = (nextIndex + HERO_SLIDES.length) % HERO_SLIDES.length;
        setSlideIndex(safeIndex);
    };

    return (
        <section
            className="relative h-[100dvh] w-[100vw] overflow-hidden pt-16"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSlide.image}
                    initial={{ opacity: 0.2, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.2 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                >
                    <Image src={activeSlide.image} alt={activeSlide.title} fill priority sizes="100vw" className="object-cover object-center" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.72)_40%,rgba(0,0,0,0.35)_100%)]" />
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 h-full w-full page-container flex items-center">
                <div className="max-w-2xl text-white">
                    <motion.button
                        onClick={cycleTheme}
                        className="mb-5 h-8 px-3 rounded-full border border-white/35 bg-white/10 text-white text-[0.65rem] font-semibold tracking-[0.12em] uppercase hover:bg-white/20 transition-all duration-300"
                        aria-label="Switch website theme"
                    >
                        {`Theme-${themeIndex + 1}`}
                    </motion.button>

                    <p className="text-[0.72rem] font-body font-semibold tracking-[0.18em] uppercase text-white/80 mb-5">
                        Deep-Tech Innovation Hub
                    </p>

                    <h1
                        className="font-display font-bold tracking-tight text-white mb-3"
                        style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", lineHeight: 1.12 }}
                    >
                        <span className="block">Building the Future Through</span>
                        <span className="block overflow-hidden h-[1.12em] relative">
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
                    </h1>
                    <p className="text-base md:text-lg text-white/80 leading-relaxed mb-9 font-light">
                        {activeSlide.tag}
                    </p>

                    <div className="flex items-center gap-5 flex-wrap">
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
                    </div>
                </div>
            </div>

            <button
                onClick={() => goToSlide(slideIndex - 1)}
                aria-label="Previous slide"
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 md:h-12 md:w-12 rounded-full bg-black/30 text-white text-2xl leading-none hover:bg-black/45 transition-colors"
            >
                &#8249;
            </button>
            <button
                onClick={() => goToSlide(slideIndex + 1)}
                aria-label="Next slide"
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 md:h-12 md:w-12 rounded-full bg-black/30 text-white text-2xl leading-none hover:bg-black/45 transition-colors"
            >
                &#8250;
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {HERO_SLIDES.map((slide, index) => (
                    <button
                        key={slide.title}
                        type="button"
                        aria-label={`Go to slide ${index + 1}`}
                        onClick={() => goToSlide(index)}
                        className={`h-3 w-3 rounded-full transition-all ${slideIndex === index ? "bg-white" : "bg-white/40 hover:bg-white/65"}`}
                    />
                ))}
            </div>

        </section>
    );
}
