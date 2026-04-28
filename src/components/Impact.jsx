"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Impact() {
    return (
        <section className="py-20 md:py-28 bg-surface-container-low">
            <div className="page-container">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-[0.75rem] font-body font-semibold tracking-[0.15em] uppercase text-primary mb-6">
                            Latest Newsletter
                        </p>
                        <h2 className="font-display text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.08] tracking-tight text-on-surface mb-6">
                            Paradigm
                            <span className="text-primary"> Chronicles</span>
                        </h2>
                        <p className="text-[0.95rem] text-on-surface-variant leading-relaxed mb-8 font-light max-w-xl">
                            Stay updated with the latest developments from our deep-tech verticals.
                            Each issue covers research progress, technical insights, and key updates
                            across Drug, Cyber, Robo, Neuro, Nutra, and Crystal paradigms.
                        </p>

                        <div className="rounded-2xl border border-primary/15 bg-surface-container-lowest px-6 py-5 shadow-[0_12px_28px_rgba(var(--color-primary-rgb),0.14)] mb-7">
                            <div className="flex items-center gap-4 mb-3">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                <span className="text-sm font-semibold text-on-surface">Issue #1</span>
                                <span className="text-sm text-on-surface-variant">2025-12-17</span>
                            </div>
                            <p className="text-sm text-on-surface-variant leading-relaxed font-light mb-3">
                                Introducing K-Hub's deep-tech verticals: AI-led drug discovery, Let Us Hack
                                cybersecurity training, and lab automation innovations from Roboparadigm.
                            </p>
                            <div className="flex items-center gap-2 text-xs font-medium">
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">Drug</span>
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">Cyber</span>
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">Robo</span>
                            </div>
                        </div>

                        <a
                            href="https://newsletters.k-hub.org.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-7 py-3.5 bg-gradient-to-r from-primary to-primary-container text-surface text-sm font-semibold tracking-tight rounded-lg hover:shadow-[0_18px_34px_rgba(var(--color-primary-rgb),0.24)] transition-all duration-300"
                        >
                            Read Newsletter
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <div className="absolute -inset-6 bg-primary/10 rounded-[2rem] blur-2xl" aria-hidden />
                        <article className="relative overflow-hidden rounded-[1.4rem] border border-primary/20 bg-surface-container-lowest shadow-[0_20px_50px_rgba(17,20,30,0.12)] min-h-[560px]">
                            <div className="absolute left-0 right-0 top-[32%] h-[44%] bg-gradient-to-r from-cyan-300/35 via-pink-300/35 to-orange-300/35 blur-2xl" aria-hidden />
                            <div className="absolute inset-0" aria-hidden>
                                {Array.from({ length: 14 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className="absolute top-[24%] w-[2px] bg-primary/20"
                                        style={{
                                            left: `${6 + i * 6.5}%`,
                                            height: `${36 + ((i * 9) % 38)}%`,
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="relative z-10 p-8 md:p-10">
                                <div className="mb-8">
                                    <Image src="/logo-khub.png" alt="K-Hub" width={84} height={32} style={{ width: "auto", height: "auto" }} />
                                </div>

                                <h3 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] font-bold text-on-surface mb-1">
                                    PARADIGM
                                </h3>
                                <p className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] text-on-surface-variant mb-12">
                                    CHRONICLES
                                </p>

                                <div className="pt-56 flex items-end justify-between text-on-surface-variant">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.12em] mb-1">Issue - 01</p>
                                        <p className="font-display text-2xl font-bold text-on-surface leading-none">
                                            Paradigm Chronicles
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs uppercase tracking-[0.12em] mb-1">Published</p>
                                        <p className="font-semibold text-on-surface">17 Dec 2025</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
