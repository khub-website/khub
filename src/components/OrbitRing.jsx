"use client";

import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const logos = [
    { src: "/drugparadigm.png", name: "Drug paradigm", url: "https://drugparadigm.com/" },
    { src: "/cyberparadigm.webp", name: "Cyber paradigm", url: "https://cyberparadigm.in/" },
    { src: "/neuroparadigm.webp", name: "Neuro paradigm", url: "https://neuroparadigm.in/" },
    { src: "/roboparadigm.png", name: "Robo paradigm", url: "https://roboparadigm.com/" },
    { src: "/nutraparadigm.jpg", name: "Nutra paradigm", url: null },
    { src: "/crystalparadigm.webp", name: "Crystal paradigm", url: "https://crystalparadigm.in/" },
];

const NORMAL_DURATION = 28;
const SLOW_DURATION = 120;

export default function OrbitRing({
    onNodeSelect,
    onCenterSelect,
    activeIndex = null,
    isCenterActive = false,
    suppressNavigation = false,
    sizeMultiplier = 1,
}) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isOrbitHovered, setIsOrbitHovered] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(1200);
    const orbitAngle = useMotionValue(0);
    const counterAngle = useTransform(orbitAngle, (v) => -v);
    const [canAnimate, setCanAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setCanAnimate(true), 1500);
        return () => clearTimeout(timer);
    }, []);

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
        const safeWidthBase = isMobile ? Math.max(280, Math.min(viewportWidth - 32, 370)) : 740;
        const safeWidth = safeWidthBase * sizeMultiplier;
        const calcLogoSize = (isMobile ? (viewportWidth < 360 ? 64 : 78) : 132) * sizeMultiplier;
        const calcPadding = (isMobile ? 8 : 48) * sizeMultiplier;
        const calcRadius = isMobile
            ? Math.max(100, (safeWidth - calcLogoSize - calcPadding) / 2.2)
            : Math.max(120, (safeWidth - calcLogoSize - calcPadding) / 2.5);
        const calcCenterSize = (isMobile ? 86 : 116) * sizeMultiplier;
        const calcCenterLogoSize = (isMobile ? 62 : 86) * sizeMultiplier;

        return {
            radius: calcRadius,
            logoSize: calcLogoSize,
            centerSize: calcCenterSize,
            centerLogoSize: calcCenterLogoSize,
            outerRingInset: (isMobile ? 32 : 64) * sizeMultiplier,
            containerSize: Math.min(viewportWidth - 16, calcRadius * 2 + calcLogoSize + calcPadding),
            hoverScale: isMobile ? 1.06 : 1.1,
            tooltipOffset: isMobile ? -32 : -44,
        };
    }, [viewportWidth, sizeMultiplier]);

    useAnimationFrame((_, delta) => {
        if (!canAnimate) return;
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
                <motion.button
                    type="button"
                    aria-label="Select K-Hub paradigm"
                    onClick={() => {
                        if (onCenterSelect) onCenterSelect();
                    }}
                    animate={isOrbitHovered || isCenterActive ? { scale: 1.08 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    style={{
                        width: centerSize,
                        height: centerSize,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.97)",
                        border: isOrbitHovered || isCenterActive
                            ? "2px solid rgba(var(--color-primary-rgb),0.5)"
                            : "1.5px solid rgba(var(--color-primary-rgb),0.18)",
                        boxShadow: isOrbitHovered || isCenterActive
                            ? "0 8px 40px rgba(var(--color-primary-rgb),0.2), 0 2px 12px rgba(0,0,0,0.09)"
                            : "0 6px 32px rgba(0,0,0,0.09), 0 1.5px 6px rgba(var(--color-primary-rgb),0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(8px)",
                        transition: "border 0.3s ease, box-shadow 0.3s ease",
                        overflow: "hidden",
                        cursor: "pointer",
                    }}
                >
                    <Image
                        src="/logo-khub.png"
                        alt="K-Hub"
                        width={centerLogoSize}
                        height={centerLogoSize}
                        priority
                        style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                            transform: "scale(0.84)",
                            backgroundColor: "#fff",
                        }}
                    />
                </motion.button>
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
                                style={{ width: logoSize, height: logoSize, cursor: logo.url ? "pointer" : "default" }}
                                onHoverStart={() => setHoveredIndex(i)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                onTouchStart={() => setHoveredIndex(i)}
                                onTouchEnd={() => setHoveredIndex(null)}
                                onClick={() => {
                                    if (onNodeSelect) onNodeSelect(i, logo.name);
                                    if (logo.url) {
                                        if (!suppressNavigation) {
                                            window.open(logo.url, "_blank", "noopener,noreferrer");
                                        }
                                    }
                                }}
                            >
                                <motion.div
                                    animate={isHovered || activeIndex === i ? { scale: hoverScale } : { scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    style={{
                                        width: logoSize,
                                        height: logoSize,
                                        borderRadius: "50%",
                                        background: "rgba(255,255,255,0.95)",
                                        border: isHovered || activeIndex === i
                                            ? "2px solid rgba(var(--color-primary-rgb),0.5)"
                                            : "1.5px solid rgba(var(--color-primary-rgb),0.16)",
                                        boxShadow: isHovered || activeIndex === i
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
                                            objectFit: logo.name === "Nutra paradigm" ? "contain" : "cover",
                                            width: "100%",
                                            height: "100%",
                                            transform: logo.name === "Nutra paradigm" ? "scale(1)" :
                                                (logo.name === "Drug paradigm" || logo.name === "Robo paradigm") ? "scale(0.94)" : "scale(1.12)",
                                            filter: "contrast(1.02) brightness(0.98)",
                                            backgroundColor: "#fff",
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
                                        {logo.name === "Nutra paradigm" ? "Nutra paradigm (Coming Soon)" : logo.name}
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
