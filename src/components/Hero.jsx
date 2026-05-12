"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

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

const WORD_SWITCH_MS = 2200;
const WORD_TRANSITION_SECONDS = 0.4;

const HERO_TAG = "Student-led applied research, built on campus.";

export default function Hero() {
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
        }, WORD_SWITCH_MS);
        return () => clearInterval(interval);
    }, []);

    const scrollTo = (id) => {
        const el = document.querySelector(id);
        if (!el) return;

        const nav = document.querySelector("nav");
        const navHeight = nav ? nav.getBoundingClientRect().height : 76;
        const offset = navHeight - 65;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    };

    return (
        <section className="relative h-dvh w-screen overflow-hidden pt-16">
            <div className="absolute inset-0">
                <video
                    className="h-full w-full object-cover object-center"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="K-Hub campus innovation video"
                >
                    <source src="/khub.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.72)_40%,rgba(0,0,0,0.35)_100%)]" />
            </div>

            <div className="relative z-10 h-full w-full page-container flex items-center">
                <div className="max-w-2xl text-white">
                    <p className="text-[0.72rem] font-body font-semibold tracking-[0.18em] uppercase text-white/80 mb-5">
                        Deep-Tech Innovation Hub
                    </p>

                    <h1
                        className="font-display font-bold tracking-tight text-white mb-3"
                        style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", lineHeight: 1.12 }}
                    >
                        <span className="block">Building the Future Through</span>
                        <span className="block overflow-hidden h-[1.2em] pb-[0.06em] relative">
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
                        {HERO_TAG}
                    </p>

                    <div className="flex items-center gap-5 flex-wrap">
                        <button
                            onClick={() => scrollTo("#domains")}
                            className="px-8 py-3.5 text-surface text-sm font-semibold tracking-tight rounded-lg bg-(--hero-cta-from) hover:brightness-95 hover:shadow-[0_20px_40px_rgba(var(--color-primary-rgb),0.24)] transition-all duration-300"
                        >
                            Explore Our Work
                        </button>
                        <button
                            onClick={() => scrollTo("#about")}
                            className="px-8 py-3.5 text-sm font-medium tracking-tight text-(--hero-secondary-text) bg-(--hero-secondary-bg) hover:bg-(--hero-secondary-bg-hover) transition-all duration-300 rounded-lg"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
