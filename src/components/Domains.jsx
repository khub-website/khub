"use client";

import Image from "next/image";
import {
    useAnimationFrame,
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { useState } from "react";
// Removed old logo imports and switched to public paths in domains array

const domains = [
    {
        name: "Drugparadigm",
        tagline: "AI-Driven Drug Discovery",
        description:
            "Using generative models to design new molecules and accelerate pharmaceutical research.",
        logo: "/logo-drugparadigm.webp",
        accent: "117, 78, 173",
        secondaryAccent: "224, 168, 255",
        labelColor: "#ed5b00",
        url: "https://drugparadigm.com/",
    },
    {
        name: "Cyberparadigm",
        tagline: "Cybersecurity Training",
        description:
            'Hands-on cybersecurity challenges through "Let Us Hack" - a dedicated training platform.',
        logo: "/logo-cyberparadigm.webp",
        accent: "87, 201, 70",
        secondaryAccent: "151, 230, 112",
        labelColor: "#ed5b00",
        url: "https://cyberparadigm.in/",
    },
    {
        name: "Roboparadigm",
        tagline: "Robotics & Lab Automation",
        description:
            "Building robotic systems and lab automation for deep-tech verticals.",
        logo: "/logo-roboparadigm.webp",
        accent: "204, 137, 63",
        secondaryAccent: "237, 184, 108",
        labelColor: "#ed5b00",
        url: "https://roboparadigm.com/",
    },
    {
        name: "Neuroparadigm",
        tagline: "AI-Driven Mental Wellness",
        description:
            "Developing digital therapeutics and AI tools for mental health support.",
        logo: "/logo-neuroparadigm.webp",
        accent: "228, 194, 72",
        secondaryAccent: "151, 88, 214",
        labelColor: "#d8ad2d",
        url: "https://neuroparadigm.in/",
    },
    {
        name: "Neutraparadigm",
        tagline: "Functional Foods & Supplements",
        description:
            "Researching nutrition science and functional food development.",
        logo: "/logo-neutraparadigm.webp",
        accent: "34, 114, 61",
        secondaryAccent: "70, 157, 89",
        labelColor: "#207443",
        url: null,
    },
    {
        name: "Crystalparadigm",
        tagline: "Materials Science",
        description:
            "Exploring crystallography and advanced materials for next-gen applications.",
        logo: "/logo-crystalparadigm.webp",
        accent: "62, 173, 248",
        secondaryAccent: "142, 209, 255",
        labelColor: "#ed5b00",
        url: "https://crystalparadigm.in/",
    },
];

function ParadigmCard({ domain, index }) {
    const mouseX = useMotionValue(50);
    const mouseY = useMotionValue(50);
    const rotateXRaw = useMotionValue(0);
    const rotateYRaw = useMotionValue(0);
    const jitterX = useMotionValue(0);
    const jitterY = useMotionValue(0);
    const jitterRotateZ = useMotionValue(0);
    const jitterOverlayX = useTransform(() => jitterX.get() * -0.6);
    const jitterOverlayY = useTransform(() => jitterY.get() * 0.6);
    const [isHovering, setIsHovering] = useState(false);

    const rotateX = useSpring(rotateXRaw, { stiffness: 170, damping: 16, mass: 0.35 });
    const rotateY = useSpring(rotateYRaw, { stiffness: 170, damping: 16, mass: 0.35 });
    const cardScale = useSpring(isHovering ? 1.02 : 1, {
        stiffness: 200,
        damping: 14,
        mass: 0.4,
    });
    const raiseY = useTransform(cardScale, [1, 1.02], [0, -8]);
    const cardX = useTransform(() => jitterX.get());
    const cardY = useTransform(() => raiseY.get() + jitterY.get());
    const cardRotateZ = useTransform(() => jitterRotateZ.get());
    const glow = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(${domain.accent}, 0.32), rgba(${domain.accent}, 0.12) 26%, rgba(255,255,255,0.04) 56%, rgba(255,255,255,0) 70%)`;
    const edgeTint = useMotionTemplate`linear-gradient(140deg, rgba(${domain.accent}, 0.45), rgba(255,255,255,0.42))`;
    const chromaGlow = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(${domain.secondaryAccent}, 0.22), rgba(${domain.accent}, 0.2) 32%, rgba(${domain.accent}, 0.14) 56%, rgba(255,255,255,0) 78%)`;

    useAnimationFrame((time) => {
        if (!isHovering) {
            jitterX.set(jitterX.get() * 0.75);
            jitterY.set(jitterY.get() * 0.75);
            jitterRotateZ.set(jitterRotateZ.get() * 0.75);
            return;
        }

        const t = time / 1000;
        const seed = index * 0.97;
        const freq = 8.5;
        const highFreq = 18.2;

        jitterX.set(
            Math.sin((t + seed) * freq) * 1.1 +
                Math.cos((t + seed * 0.7) * highFreq) * 0.55
        );
        jitterY.set(
            Math.cos((t + seed) * (freq + 2.1)) * 0.95 +
                Math.sin((t + seed * 0.35) * (highFreq - 3.4)) * 0.45
        );
        jitterRotateZ.set(Math.sin((t + seed * 0.5) * 15.2) * 0.22);
    });

    const handleMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = ((event.clientX - rect.left) / rect.width) * 100;
        const py = ((event.clientY - rect.top) / rect.height) * 100;

        mouseX.set(px);
        mouseY.set(py);

        rotateXRaw.set(((py - 50) / 50) * -8);
        rotateYRaw.set(((px - 50) / 50) * 8);
    };

    const handleLeave = () => {
        setIsHovering(false);
        rotateXRaw.set(0);
        rotateYRaw.set(0);
        mouseX.set(50);
        mouseY.set(50);
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 44, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{
                delay: index * 0.08,
                duration: 0.75,
                ease: [0.19, 1, 0.22, 1],
            }}
            onMouseMove={handleMove}
            onMouseEnter={() => setIsHovering(true)}
            onClick={() => {
                if (domain.url) {
                    window.open(domain.url, "_blank", "noopener,noreferrer");
                }
            }}
            style={{
                rotateX,
                rotateY,
                x: cardX,
                y: cardY,
                scale: cardScale,
                rotateZ: cardRotateZ,
                transformStyle: "preserve-3d",
                backgroundImage: glow,
                cursor: domain.url ? "pointer" : "default",
            }}
            className="group relative overflow-hidden rounded-2xl border border-white/45 bg-white/35 p-7 backdrop-blur-xl shadow-[0_20px_45px_rgba(26,24,20,0.15)] will-change-transform"
        >
            <motion.div
                aria-hidden
                style={{ backgroundImage: edgeTint }}
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-45"
            />
            <motion.div
                aria-hidden
                style={{ backgroundImage: chromaGlow }}
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            />
            <motion.div
                aria-hidden
                style={{ x: jitterOverlayX, y: jitterOverlayY }}
                className="pointer-events-none absolute inset-0 rounded-2xl border border-white/25 mix-blend-screen opacity-0 transition-opacity duration-150 group-hover:opacity-70"
            />
            <div className="relative z-10">
                <div className="mb-6 flex items-center gap-4">
                    <div 
                        className="relative h-20 w-20 shrink-0 rounded-full bg-white overflow-hidden" 
                        style={{ 
                            boxShadow: "0 10px 24px rgba(18,18,18,0.1), inset 0 1px 3px rgba(0,0,0,0.08)",
                            border: "1px solid rgba(255,255,255,0.65)"
                        }}
                    >
                        <Image
                            src={domain.logo}
                            alt={`${domain.name} logo`}
                            fill
                            sizes="80px"
                            className={domain.name.toLowerCase().includes("neutra") ? "object-contain p-1" : "object-cover"}
                            style={{ 
                                transform: domain.name.toLowerCase().includes("neutra") ? "none" : 
                                           (domain.name.toLowerCase().includes("drug") || domain.name.toLowerCase().includes("robo")) ? "scale(1.02)" : "scale(1.12)",
                                filter: "contrast(1.02) brightness(0.98)"
                            }}
                        />
                    </div>
                    <div>
                        <h3 className="font-display text-[1.15rem] font-bold tracking-tight text-[#2c2019]">
                            {domain.name}
                        </h3>
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em]" style={{ color: domain.labelColor }}>
                            {domain.tagline}
                        </p>
                        {!domain.url && (
                            <span className="mt-1 inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[0.6rem] font-bold uppercase tracking-wider">
                                Coming Soon
                            </span>
                        )}
                    </div>
                </div>

                <div className="rounded-xl border border-white/45 bg-white/35 p-5">
                    <p className="text-sm text-[#8d6654] leading-relaxed font-light">
                        {domain.description}
                    </p>
                </div>
            </div>
        </motion.article>
    );
}

export default function Domains() {
    return (
        <section id="domains" className="py-20 md:py-28 bg-surface-container-low">
            <div className="page-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16 md:mb-20"
                >
                    <p className="text-[0.75rem] font-body font-semibold tracking-[0.15em] uppercase text-primary mb-6">
                        Paradigms
                    </p>
                    <h2 className="font-display text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-tight text-on-surface max-w-2xl">
                        Many Verticals.
                        <br />
                        <span className="text-on-surface-variant">One Mission.</span>
                    </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 [perspective:1200px]">
                    {domains.map((domain, i) => (
                        <ParadigmCard key={domain.name} domain={domain} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
