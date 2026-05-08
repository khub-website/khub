"use client";

import Image from "next/image";
import {
    AnimatePresence,
    motion,
    useAnimationFrame,
    useMotionTemplate,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import OrbitRing from "./OrbitRing";

const domains = [
    {
        name: "K-Hub",
        tagline: "Deep-Tech Innovation Hub",
        description:
            "The student-led deep-tech incubator and venture studio of KMIT Group of Institutions - accelerating research across drug, cyber, neuro, robo, nutra, and crystal domains.",
        logo: "/logo-khub.png",
        accent: "237, 91, 0",
        secondaryAccent: "27, 126, 135",
        labelColor: "#ed5b00",
        gradientFrom: "#ed5b00",
        gradientTo: "#1b7e87",
        corner: "khub",
        url: null,
    },
    {
        name: "Drugparadigm",
        tagline: "AI-Driven Drug Discovery",
        description:
            "Using generative models to design new molecules and accelerate pharmaceutical research.",
        logo: "/drugparadigm.png",
        accent: "117, 78, 173",
        secondaryAccent: "120, 163, 255",
        labelColor: "#ed5b00",
        gradientFrom: "#6f3ca6",
        gradientTo: "#2d7dca",
        corner: "drug",
        url: "https://drugparadigm.com/",
    },
    {
        name: "Cyberparadigm",
        tagline: "Cybersecurity Training",
        description:
            'Hands-on cybersecurity challenges through "Let Us Hack" - a dedicated training platform.',
        logo: "/cyberparadigm.webp",
        accent: "23, 194, 89",
        secondaryAccent: "0, 255, 65",
        labelColor: "#ed5b00",
        gradientFrom: "#05201a",
        gradientTo: "#0a3b34",
        corner: "cyber",
        url: "https://cyberparadigm.in/",
    },
    {
        name: "Neuroparadigm",
        tagline: "AI-Driven Mental Wellness",
        description:
            "Developing digital therapeutics and AI tools for mental health support.",
        logo: "/neuroparadigm.webp",
        accent: "236, 126, 64",
        secondaryAccent: "151, 88, 214",
        labelColor: "#d8ad2d",
        gradientFrom: "#df6b45",
        gradientTo: "#8d55dc",
        corner: "neuro",
        url: "https://neuroparadigm.in/",
    },
    {
        name: "Roboparadigm",
        tagline: "Robotics & Lab Automation",
        description:
            "Building robotic systems and lab automation for deep-tech verticals.",
        logo: "/roboparadigm.png",
        accent: "80, 129, 162",
        secondaryAccent: "142, 195, 237",
        labelColor: "#ed5b00",
        gradientFrom: "#44627f",
        gradientTo: "#6a9cd1",
        corner: "robo",
        url: "https://roboparadigm.com/",
    },
    {
        name: "Nutraparadigm",
        tagline: "Functional Foods & Supplements",
        description:
            "Researching nutrition science and functional food development.",
        logo: "/nutraparadigm.jpg",
        accent: "45, 132, 65",
        secondaryAccent: "110, 178, 97",
        labelColor: "#207443",
        gradientFrom: "#2b6c44",
        gradientTo: "#7cb467",
        corner: "nutra",
        url: "https://nutradrug.in/",
    },
    {
        name: "Crystalparadigm",
        tagline: "Materials Science",
        description:
            "Exploring crystallography and advanced materials for next-gen applications.",
        logo: "/crystalparadigm.webp",
        accent: "62, 173, 248",
        secondaryAccent: "142, 209, 255",
        labelColor: "#ed5b00",
        gradientFrom: "#4aa4de",
        gradientTo: "#8be7ef",
        corner: "crystal",
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
    const cardScale = useSpring(isHovering ? 1.018 : 1, {
        stiffness: 200,
        damping: 14,
        mass: 0.4,
    });
    const raiseY = useTransform(cardScale, [1, 1.018], [0, -6]);
    const cardX = useTransform(() => jitterX.get());
    const cardY = useTransform(() => raiseY.get() + jitterY.get());
    const cardRotateZ = useTransform(() => jitterRotateZ.get());
    const glow = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(${domain.accent}, 0.34), rgba(${domain.accent}, 0.1) 28%, rgba(255,255,255,0.03) 57%, rgba(255,255,255,0) 71%)`;
    const edgeTint = useMotionTemplate`linear-gradient(140deg, rgba(${domain.accent}, 0.32), rgba(255,255,255,0.46))`;
    const chromaGlow = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(${domain.secondaryAccent}, 0.24), rgba(${domain.accent}, 0.18) 34%, rgba(${domain.accent}, 0.1) 58%, rgba(255,255,255,0) 78%)`;

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
            onMouseMove={handleMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleLeave}
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
                background: `linear-gradient(145deg, ${domain.gradientFrom}1e, ${domain.gradientTo}1f)`,
            }}
            className="group relative min-h-[314px] overflow-hidden rounded-2xl border border-white/45 bg-white/35 p-7 backdrop-blur-xl shadow-[0_20px_45px_rgba(26,24,20,0.15)] will-change-transform"
        >
            <motion.div
                aria-hidden
                style={{ backgroundImage: edgeTint }}
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-40"
            />
            <motion.div
                aria-hidden
                style={{ backgroundImage: chromaGlow }}
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
            <motion.div
                aria-hidden
                style={{ x: jitterOverlayX, y: jitterOverlayY }}
                className="pointer-events-none absolute inset-0 rounded-2xl border border-white/25 mix-blend-screen opacity-0 transition-opacity duration-200 group-hover:opacity-70"
            />

            <div className="relative z-10 flex h-full flex-col">
                <div className="mb-6 flex items-center gap-4">
                    <div
                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-white"
                        style={{
                            boxShadow: "0 10px 24px rgba(18,18,18,0.12), inset 0 1px 3px rgba(0,0,0,0.08)",
                            border: "1px solid rgba(255,255,255,0.68)",
                        }}
                    >
                        <Image
                            src={domain.logo}
                            alt={`${domain.name} logo`}
                            fill
                            sizes="80px"
                            className={domain.name.toLowerCase().includes("nutra") || domain.name === "K-Hub" ? "object-contain p-1.5" : "object-cover"}
                            style={{
                                transform: domain.name.toLowerCase().includes("nutra")
                                    ? "scale(1)"
                                    : domain.name === "K-Hub"
                                        ? "scale(0.84)"
                                    : domain.name === "Drugparadigm" || domain.name === "Roboparadigm"
                                        ? "scale(0.94)"
                                        : "scale(1.12)",
                                filter: "contrast(1.02) brightness(0.98)",
                            }}
                        />
                    </div>
                    <div>
                        <h3 className="font-display text-[1.22rem] font-bold tracking-tight text-[#2c2019]">
                            {domain.name}
                        </h3>
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em]" style={{ color: domain.labelColor }}>
                            {domain.tagline}
                        </p>
                        {!domain.url && domain.name !== "K-Hub" && (
                            <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-primary">
                                Coming Soon
                            </span>
                        )}
                    </div>
                </div>

                <div className="rounded-xl border border-white/45 bg-white/38 p-5 grow">
                    <p className="text-sm font-light leading-relaxed text-[#744f3f]">
                        {domain.description}
                    </p>
                </div>
            </div>

        </motion.article>
    );
}

export default function Domains() {
    const khubIndex = domains.findIndex((domain) => domain.name === "K-Hub");
    const [activeIndex, setActiveIndex] = useState(khubIndex >= 0 ? khubIndex : 0);
    const [isPaused, setIsPaused] = useState(false);
    const [autoRotateStarted, setAutoRotateStarted] = useState(false);
    const orbitOrder = ["Drugparadigm", "Cyberparadigm", "Neuroparadigm", "Roboparadigm", "Nutraparadigm", "Crystalparadigm"];

    useEffect(() => {
        if (isPaused || !autoRotateStarted) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % domains.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isPaused, autoRotateStarted]);

    const goToDomain = (nextIndex, fromUser = false) => {
        if (fromUser) setAutoRotateStarted(true);
        setActiveIndex((nextIndex + domains.length) % domains.length);
    };

    const handleNodeSelect = (index, nodeName) => {
        const normalized = (nodeName || "").replace(/\s+/g, "").toLowerCase();
        const direct = domains.findIndex((domain) => domain.name.toLowerCase() === normalized);
        if (direct >= 0) {
            goToDomain(direct, true);
            return;
        }
        const fallbackName = orbitOrder[index];
        const fallback = domains.findIndex((domain) => domain.name === fallbackName);
        if (fallback >= 0) goToDomain(fallback, true);
    };

    const activeOrbitIndex = orbitOrder.findIndex((name) => name === domains[activeIndex].name);
    const isKhubActive = domains[activeIndex].name === "K-Hub";

    return (
        <section id="domains" className="scroll-mt-28 bg-surface-container-low py-16 md:py-22">
            <div className="page-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-10 md:mb-14"
                >
                    <p className="mb-6 text-[0.75rem] font-body font-semibold uppercase tracking-[0.15em] text-primary">
                        Paradigms
                    </p>
                    <h2 className="max-w-2xl font-display text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-tight text-on-surface">
                        Many Verticals.
                        <br />
                        <span className="text-on-surface-variant">One Mission.</span>
                    </h2>
                </motion.div>

                <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,520px)_1fr] lg:gap-12">
                    <div
                        className="[perspective:1200px] w-full max-w-[520px]"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={domains[activeIndex].name}
                                initial={{ opacity: 0, x: 28 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -28 }}
                                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <ParadigmCard domain={domains[activeIndex]} index={activeIndex} />
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-5 flex items-center justify-center gap-5 md:gap-8">
                            <button
                                type="button"
                                aria-label="Previous domain"
                                onClick={() => goToDomain(activeIndex - 1, true)}
                                className="h-11 w-11 rounded-full bg-primary/15 text-2xl text-on-surface transition-colors hover:bg-primary/25"
                            >
                                &#8249;
                            </button>
                            <div className="flex min-w-[132px] items-center justify-center gap-2">
                                {domains.map((domain, index) => (
                                    <button
                                        key={domain.name}
                                        type="button"
                                        aria-label={`Go to ${domain.name}`}
                                        onClick={() => goToDomain(index, true)}
                                        className={`h-3 w-3 rounded-full transition-all ${activeIndex === index ? "scale-110 bg-primary" : "bg-primary/35 hover:bg-primary/60"}`}
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                aria-label="Next domain"
                                onClick={() => goToDomain(activeIndex + 1, true)}
                                className="h-11 w-11 rounded-full bg-primary/15 text-2xl text-on-surface transition-colors hover:bg-primary/25"
                            >
                                &#8250;
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center lg:justify-end">
                        <OrbitRing
                            onNodeSelect={handleNodeSelect}
                            onCenterSelect={() => {
                                const khubIndex = domains.findIndex((domain) => domain.name === "K-Hub");
                                if (khubIndex >= 0) goToDomain(khubIndex, true);
                            }}
                            activeIndex={activeOrbitIndex}
                            isCenterActive={isKhubActive}
                            suppressNavigation
                            sizeMultiplier={0.85}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
