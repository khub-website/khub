"use client";

import { motion } from "framer-motion";

export default function CTA() {
    return (
        <section className="py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative bg-gradient-to-br from-on-surface to-on-surface-variant rounded-2xl px-8 py-20 md:px-16 md:py-28 text-center overflow-hidden"
                >
                    {/* Ambient glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/[0.08] rounded-full blur-3xl pointer-events-none" />

                    <p className="relative text-[0.75rem] font-body font-semibold tracking-[0.15em] uppercase text-primary mb-8">
                        Get Involved
                    </p>

                    <h2 className="relative font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-surface mb-6 max-w-2xl mx-auto">
                        Ready to Build Something
                        <br />
                        Extraordinary?
                    </h2>

                    <p className="relative text-[0.95rem] text-surface-container-lowest/70 leading-relaxed max-w-xl mx-auto mb-12 font-light">
                        Whether you&apos;re a student, researcher, or entrepreneur — K-Hub
                        offers the infrastructure, mentorship, and community to turn
                        deep-tech ideas into reality.
                    </p>

                    <motion.a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document
                                .querySelector("#contact")
                                ?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative inline-block px-10 py-4 bg-gradient-to-r from-primary to-primary-container text-surface text-sm font-semibold tracking-tight rounded-lg
                       hover:shadow-[0_20px_40px_rgba(0,108,81,0.25)] transition-all duration-300"
                    >
                        Get in Touch
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
