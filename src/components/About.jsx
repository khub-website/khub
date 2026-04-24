"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stats = [
    { number: "400+", label: "Trained Learners" },
    { number: "6", label: "Deep-Tech Paradigms" },
    { number: "4", label: "Campus Partners" },
    { number: "9", label: "Programs" },
];
const campusPartners = ["KMIT", "NGIT", "KMEC", "KMCE"];

export default function About() {
    const router = useRouter();

    const openAboutPage = () => {
        router.push("/about");
    };

    return (
        <section
            id="about"
            role="link"
            tabIndex={0}
            onClick={openAboutPage}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openAboutPage();
                }
            }}
            className="py-20 md:py-28 bg-surface cursor-pointer"
            aria-label="Open full About Us page"
        >
            <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-outline-variant/60 bg-surface-container-lowest px-4 py-2 text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-primary">
                    About Us Preview
                    <span className="text-on-surface-variant">Open full page</span>
                </div>
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

                    <div>
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
                                    <p className="font-display text-[clamp(2rem,4vw,2.8rem)] text-primary font-bold leading-none mb-3">
                                        {stat.number}
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
                                        className="px-5 py-2.5 rounded-lg border border-outline-variant/45 bg-surface-container-lowest text-primary text-sm font-semibold"
                                    >
                                        {partner}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
