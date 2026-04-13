"use client";

import { motion } from "framer-motion";

const programs = [
    {
        title: "The Homebrew",
        description:
            "A collaborative experiment and prototype space where students explore ideas hands-on.",
        number: "01",
    },
    {
        title: "Cohorts",
        description:
            "Structured learning and project groups that guide students through deep-tech domains.",
        number: "02",
    },
    {
        title: "Imagineering School",
        description:
            "Creative problem-solving programs that blend imagination with engineering rigor.",
        number: "03",
    },
    {
        title: "Startup Incubation",
        description:
            "Full-stack startup support — from ideation to market, with mentorship and resources.",
        number: "04",
    },
];

export default function Programs() {
    return (
        <section id="programs" className="py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16 md:mb-20"
                >
                    <p className="text-[0.75rem] font-body font-semibold tracking-[0.15em] uppercase text-primary mb-6">
                        Programs
                    </p>
                    <h2 className="font-display text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-tight text-on-surface max-w-2xl">
                        How We
                        <br />
                        <span className="text-on-surface-variant">Build & Learn</span>
                    </h2>
                </motion.div>

                {/* Program pillars */}
                <div className="grid md:grid-cols-2 gap-8">
                    {programs.map((program, i) => (
                        <motion.div
                            key={program.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                                delay: i * 0.1,
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="group relative bg-surface-container-lowest rounded-lg p-10
                         hover:shadow-[0_20px_40px_rgba(0,108,81,0.08)] transition-all duration-400"
                        >
                            {/* Number */}
                            <span className="inline-block text-[0.75rem] font-body font-semibold tracking-[0.1em] text-primary/40 group-hover:text-primary/60 transition-colors duration-300 mb-6">
                                {program.number}
                            </span>

                            <h3 className="font-display text-2xl md:text-[1.625rem] font-bold tracking-tight text-on-surface mb-4">
                                {program.title}
                            </h3>

                            <p className="text-[0.95rem] text-on-surface-variant leading-relaxed font-light">
                                {program.description}
                            </p>

                            {/* Accent pip */}
                            <div className="absolute left-0 top-10 w-[3px] h-3 bg-primary rounded-full group-hover:h-6 transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>

                {/* Additional programs (smaller) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
                >
                    {[
                        { title: "Workrooms", desc: "Dedicated research spaces" },
                        { title: "Founders' Brunch", desc: "Networking with entrepreneurs" },
                        { title: "DeepTech Starter Kits", desc: "Curated toolkits to begin" },
                        { title: "Curated Events", desc: "Talks, workshops & demos" },
                    ].map((item, i) => (
                        <div
                            key={item.title}
                            className="bg-surface-container-low rounded-lg px-6 py-5
                         hover:shadow-[0_10px_20px_rgba(0,108,81,0.05)] transition-all duration-300"
                        >
                            <p className="text-sm font-semibold text-on-surface mb-1">
                                {item.title}
                            </p>
                            <p className="text-xs text-on-surface-variant font-light">{item.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
