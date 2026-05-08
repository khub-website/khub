"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stats = [
    { number: 400, suffix: "+", label: "Trained Learners" },
    { number: 6, suffix: "", label: "Deep-Tech Paradigms" },
    { number: 4, suffix: "", label: "Campus Partners" },
    { number: 9, suffix: "", label: "Programs" },
];
const campusPartners = ["KMIT", "NGIT", "KMEC", "KMCE"];

export default function About() {
    const [theme, setTheme] = useState("theme-1");
    const [hasAnimated, setHasAnimated] = useState(false);
    const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));
    const statsRef = useRef(null);

    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "theme-1";
        setTheme(currentTheme);
        
        const observer = new MutationObserver(() => {
            const newTheme = document.documentElement.getAttribute("data-theme") || "theme-1";
            setTheme(newTheme);
        });
        
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const node = statsRef.current;
        if (!node || hasAnimated) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setHasAnimated(true);
                observer.disconnect();
            },
            { threshold: 0.35 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [hasAnimated]);

    useEffect(() => {
        if (!hasAnimated) return;

        const durationMs = 1400;
        const start = performance.now();

        const tick = (now) => {
            setAnimatedValues(
                stats.map((stat, i) => {
                    const staggerMs = i * 100;
                    const localProgress = Math.min(Math.max((now - start - staggerMs) / durationMs, 0), 1);
                    const eased = 1 - Math.pow(1 - localProgress, 3);
                    return Math.round(stat.number * eased);
                })
            );
            if (now - start < durationMs + stats.length * 100) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }, [hasAnimated]);

    return (
        <section id="about" className="py-20 md:py-28 bg-surface">
            <div className="page-container">
                <div className="grid md:grid-cols-2 gap-20 md:gap-28 items-center">
                    <div>
                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                            className="text-[0.75rem] font-body font-semibold tracking-[0.15em] uppercase text-primary mb-6"
                        >
                            What is K-Hub
                        </motion.p>

                        <motion.h2
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                            className="font-display text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-tight text-on-surface mb-8"
                        >
                            A Venture Studio for
                            <br />
                            <span className="text-on-surface-variant">Deep-Tech Research</span>
                        </motion.h2>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                            className="space-y-6 text-on-surface-variant leading-[1.7] text-[0.95rem] font-light"
                        >
                            <p>
                                K-Hub is the deep-tech incubator and venture studio of KMIT
                                Group of Institutions. It incubates teams working across
                                multiple domains - drug discovery, cybersecurity, robotics,
                                materials science, and more.
                            </p>
                            <p>
                                By providing structured access to GPU infrastructure, technical
                                mentorship, business guidance, and continuous support, K-Hub
                                gives students early exposure to deep-tech research and a
                                startup-style working environment while they are still in their
                                second and third years.
                            </p>
                            <p className="text-on-surface font-medium">
                                The philosophy is simple: learning by doing - applying computer
                                science across multiple domains.
                            </p>
                        </motion.div>
                    </div>

                    <div ref={statsRef}>
                        <div className="grid grid-cols-2 gap-8">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{
                                        delay: i * 0.1,
                                        duration: 0.6,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="bg-surface-container-lowest rounded-lg p-8 hover:shadow-[0_20px_40px_rgba(28,28,25,0.05)] transition-all duration-400"
                                >
                                    <p 
                                        className={`font-display text-[clamp(2rem,4vw,2.8rem)] font-bold leading-none mb-3 ${
                                            theme === "theme-4" ? "" : "text-on-surface-variant"
                                        }`}
                                        style={theme === "theme-4" ? { color: '#F3722C' } : {}}
                                    >
                                        {animatedValues[i]}{stat.suffix}
                                    </p>
                                    <p className="text-[0.8rem] text-on-surface-variant font-medium tracking-tight uppercase leading-tight">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="mt-8"
                        >
                            <p className="text-[0.78rem] text-on-surface-variant font-semibold tracking-[0.12em] uppercase mb-4 text-center">
                                Campus Partners
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {campusPartners.map((partner) => (
                                    <span
                                        key={partner}
                                        className="px-5 py-2.5 rounded-lg border border-outline-variant/45 bg-surface-container-lowest text-on-surface-variant text-sm font-semibold"
                                    >
                                        {partner}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="mt-10 flex justify-end">
                    <Link
                        href="/about"
                        className="inline-flex items-center rounded-full border border-primary/35 bg-gradient-to-r from-primary/12 to-primary/6 px-5 py-2.5 text-sm font-semibold text-primary shadow-[0_0_0_1px_rgba(var(--color-primary-rgb),0.2),0_0_24px_rgba(var(--color-primary-rgb),0.3),0_8px_20px_rgba(var(--color-primary-rgb),0.16)] transition-all duration-300 hover:from-primary/20 hover:to-primary/10 hover:shadow-[0_0_0_1px_rgba(var(--color-primary-rgb),0.34),0_0_36px_rgba(var(--color-primary-rgb),0.42),0_14px_26px_rgba(var(--color-primary-rgb),0.22)]"
                    >
                        Learn More &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
}
