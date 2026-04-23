"use client";

import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const logos = [
    { src: "/logo-drugparadigm.webp", name: "Drug paradigm" },
    { src: "/logo-cyberparadigm.webp", name: "Cyber paradigm" },
    { src: "/logo-neuroparadigm.webp", name: "Neuro paradigm" },
    { src: "/logo-roboparadigm.webp", name: "Robo paradigm" },
    { src: "/logo-neutraparadigm.webp", name: "Neutra paradigm" },
    { src: "/logo-crystalparadigm.webp", name: "Crystal paradigm" },
];

const NORMAL_DURATION = 28;
const SLOW_DURATION = 120;

export default function OrbitRing() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isOrbitHovered, setIsOrbitHovered] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(1200);
    const orbitAngle = useMotionValue(0);
    const counterAngle = useTransform(orbitAngle, (v) => -v);

    useEffect(() => {
        const updateWidth = () => setViewportWidth(window.innerWidth);
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const {
        radius,
        logoSize,
        centerSize,
        centerLogoSize,
        outerRingInset,
        containerSize,
        hoverScale,
        tooltipOffset,
    } = useMemo(() => {
        const isMobile = viewportWidth < 640;
        const safeWidth = isMobile ? Math.max(300, Math.min(viewportWidth - 22, 370)) : 740;
        const calcLogoSize = isMobile ? 78 : 132;
        const calcPadding = isMobile ? 10 : 48;
        const calcRadius = Math.max(120, (safeWidth - calcLogoSize - calcPadding) / 2.5);
        const calcCenterSize = isMobile ? 96 : 146;
        const calcCenterLogoSize = isMobile ? 70 : 96;

        return {
            radius: calcRadius,
            logoSize: calcLogoSize,
            centerSize: calcCenterSize,
            centerLogoSize: calcCenterLogoSize,
            outerRingInset: isMobile ? 36 : 64,
            containerSize: calcRadius * 2 + calcLogoSize + calcPadding,
            hoverScale: isMobile ? 1.2 : 1.28,
            tooltipOffset: isMobile ? -36 : -44,
        };
    }, [viewportWidth]);

    useAnimationFrame((_, delta) => {
        const duration = isOrbitHovered ? SLOW_DURATION : NORMAL_DURATION;
        const degPerSecond = 360 / duration;
        const next = orbitAngle.get() + (delta / 1000) * degPerSecond;
        orbitAngle.set(next % 360);
    });

    return (
        <div
            className="relative flex items-center justify-center select-none"
            style={{ width: containerSize, height: containerSize }}
            onMouseEnter={() => setIsOrbitHovered(true)}
            onMouseLeave={() => {
                setIsOrbitHovered(false);
                setHoveredIndex(null);
            }}
            onTouchStart={() => setIsOrbitHovered(true)}
            onTouchEnd={() => {
                setIsOrbitHovered(false);
                setHoveredIndex(null);
            }}
        >
            <div
                className="absolute rounded-full border border-dashed border-outline-variant/10"
                style={{ width: radius * 2 + outerRingInset, height: radius * 2 + outerRingInset }}
            />

            <div
                className="absolute rounded-full border border-dashed border-outline-variant/22"
                style={{ width: radius * 2, height: radius * 2 }}
            />

            {[0, 90, 180, 270].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                const x = radius * Math.cos(rad);
                const y = radius * Math.sin(rad);
                return (
                    <div
                        key={angle}
                        className="absolute rounded-full bg-primary/25"
                        style={{ width: 5, height: 5, transform: `translate(${x - 2.5}px, ${y - 2.5}px)` }}
                    />
                );
            })}

            <div className="absolute rounded-full bg-primary/[0.07] blur-3xl pointer-events-none" style={{ width: radius, height: radius }} />

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.3 }}
                style={{ position: "absolute", zIndex: 20 }}
            >
                <motion.div
                    animate={isOrbitHovered ? { scale: 1.08 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    style={{
                        width: centerSize,
                        height: centerSize,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.97)",
                        border: isOrbitHovered
                            ? "2px solid rgba(var(--color-primary-rgb),0.32)"
                            : "1.5px solid rgba(var(--color-primary-rgb),0.18)",
                        boxShadow: isOrbitHovered
                            ? "0 8px 40px rgba(var(--color-primary-rgb),0.2), 0 2px 12px rgba(0,0,0,0.09)"
                            : "0 6px 32px rgba(0,0,0,0.09), 0 1.5px 6px rgba(var(--color-primary-rgb),0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(8px)",
                        transition: "border 0.3s ease, box-shadow 0.3s ease",
                    }}
                >
                    <Image src="/logo-khub.png" alt="K-Hub" width={centerLogoSize} height={centerLogoSize} priority style={{ objectFit: "contain" }} />
                </motion.div>
            </motion.div>

            <motion.div style={{ position: "absolute", width: radius * 2, height: radius * 2, rotate: orbitAngle }}>
                {logos.map((logo, i) => {
                    const angle = (i * 360) / logos.length - 90;
                    const rad = (angle * Math.PI) / 180;
                    const cx = radius + radius * Math.cos(rad) - logoSize / 2;
                    const cy = radius + radius * Math.sin(rad) - logoSize / 2;
                    const isHovered = hoveredIndex === i;

                    return (
                        <motion.div
                            key={logo.name}
                            style={{ position: "absolute", left: cx, top: cy, width: logoSize, height: logoSize, rotate: counterAngle }}
                        >
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.5 + i * 0.1 }}
                                style={{ width: logoSize, height: logoSize, cursor: "pointer" }}
                                onHoverStart={() => setHoveredIndex(i)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                onTouchStart={() => setHoveredIndex(i)}
                                onTouchEnd={() => setHoveredIndex(null)}
                            >
                                <motion.div
                                    animate={isHovered ? { scale: hoverScale } : { scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    style={{
                                        width: logoSize,
                                        height: logoSize,
                                        borderRadius: "50%",
                                        background: "rgba(255,255,255,0.95)",
                                        border: isHovered
                                            ? "2px solid rgba(var(--color-primary-rgb),0.5)"
                                            : "1.5px solid rgba(var(--color-primary-rgb),0.16)",
                                        boxShadow: isHovered
                                            ? "0 8px 40px rgba(var(--color-primary-rgb),0.24), 0 2px 12px rgba(0,0,0,0.1), inset 0 1px 3px rgba(0,0,0,0.1)"
                                            : "0 4px 24px rgba(0,0,0,0.07), inset 0 1px 2px rgba(0,0,0,0.05)",
                                        overflow: "hidden",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backdropFilter: "blur(4px)",
                                        position: "relative",
                                        zIndex: isHovered ? 20 : 1,
                                        transition: "border 0.2s ease, box-shadow 0.2s ease",
                                    }}
                                >
                                    <Image
                                        src={logo.src}
                                        alt={logo.name}
                                        width={logoSize}
                                        height={logoSize}
                                        priority={true}
                                        style={{
                                            objectFit: logo.name.toLowerCase().includes("eutra") ? "contain" : "cover",
                                            width: "100%",
                                            height: "100%",
                                            transform: logo.name.toLowerCase().includes("eutra") ? "scale(0.82)" :
                                                (logo.name.toLowerCase().includes("drug") || logo.name.toLowerCase().includes("robo")) ? "scale(1.02)" : "scale(1.15)",
                                        }}
                                    />
                                </motion.div>

                                {isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.18 }}
                                        style={{
                                            position: "absolute",
                                            bottom: tooltipOffset,
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            whiteSpace: "nowrap",
                                            fontSize: "0.7rem",
                                            fontWeight: 600,
                                            letterSpacing: "0.06em",
                                            color: "rgba(var(--color-primary-rgb),0.9)",
                                            background: "rgba(255,255,255,0.92)",
                                            border: "1px solid rgba(var(--color-primary-rgb),0.22)",
                                            borderRadius: 6,
                                            padding: "4px 10px",
                                            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                                            zIndex: 40,
                                            pointerEvents: "none",
                                        }}
                                    >
                                        {logo.name}
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
