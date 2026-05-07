"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VIDEO_EXTS = [".mp4", ".webm", ".mov", ".ogg"];
const isVideo = (src) => VIDEO_EXTS.some((ext) => src.toLowerCase().endsWith(ext));

/*
 * ── SLIDE DATA ──────────────────────────────────────────────
 *   Place your images in:  public/slider/
 *   Accepts any browser-supported format (jpg, png, webp).
 *   Videos also supported (mp4, webm, mov).
 *   For HEIC images → run  `python convert_heic.py`  first.
 *
 *   bg  = full-bleed background   (~1920×1080+ image or video)
 *   fg  = portrait foreground card (~800×1000+ image or video)
 * ────────────────────────────────────────────────────────────
 */
const SLIDES = [
    {
        title: "Moments",
        titleLine2: "& Milestones",
        subtitle: "Captured at K-Hub",
        bg: "/slider/slide1-bg.jpg",
        fg: "/slider/slide1-fg.jpg",
    },
    {
        title: "Inside",
        titleLine2: "the Lab",
        subtitle: "Where Research Comes Alive",
        bg: "/slider/slide2-bg.jpg",
        fg: "/slider/slide2-fg.jpg",
    },
    {
        title: "People",
        titleLine2: "& Energy",
        subtitle: "The Faces Behind the Work",
        bg: "/slider/20260430_145206.jpg",
        fg: "/slider/20260430_145930.jpg",
    },
    {
        title: "Events",
        titleLine2: "& Demos",
        subtitle: "Sessions That Shape Ideas",
        bg: "/slider/slide4-bg.mp4",
        fg: "/slider/20260430_150456 (1).jpg",
    },
];

const AUTOPLAY_MS = 6000;

/* ───── Framer Motion variants ─────────── */
const bgVariants = {
    enter: (dir) => ({
        x: dir > 0 ? "25%" : "-25%",
        opacity: 0,
        scale: 1.06,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir) => ({
        x: dir > 0 ? "-18%" : "18%",
        opacity: 0,
        scale: 0.98,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
};

const fgVariants = {
    enter: (dir) => ({
        x: dir > 0 ? "22%" : "-22%",
        opacity: 0,
        y: 20,
        scale: 0.95,
    }),
    center: {
        x: 0,
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.06 },
    },
    exit: (dir) => ({
        x: dir > 0 ? "-16%" : "16%",
        opacity: 0,
        y: 10,
        scale: 0.96,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    }),
};

const textVariants = {
    enter: { opacity: 0, y: 60, filter: "blur(10px)" },
    center: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.18 },
    },
    exit: {
        opacity: 0,
        y: -50,
        filter: "blur(8px)",
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

const counterVariants = {
    enter: { opacity: 0, y: 40, scale: 0.9 },
    center: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
    },
    exit: {
        opacity: 0,
        y: -30,
        scale: 0.9,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
};

/* ───── MAIN COMPONENT ─────────── */
export default function PhotoSlider() {
    const [[activeIndex, direction], setSlide] = useState([0, 0]);
    const [isAnimating, setIsAnimating] = useState(false);
    const autoplayRef = useRef(null);
    const sectionRef = useRef(null);

    const slide = SLIDES[activeIndex];
    const total = SLIDES.length;

    const paginate = useCallback(
        (dir) => {
            if (isAnimating) return;
            setIsAnimating(true);
            setSlide(([prev]) => {
                const next = (prev + dir + total) % total;
                return [next, dir];
            });
        },
        [isAnimating, total]
    );

    /* autoplay */
    useEffect(() => {
        autoplayRef.current = setInterval(() => paginate(1), AUTOPLAY_MS);
        return () => clearInterval(autoplayRef.current);
    }, [paginate]);

    const pauseAutoplay = () => clearInterval(autoplayRef.current);
    const resumeAutoplay = () => {
        clearInterval(autoplayRef.current);
        autoplayRef.current = setInterval(() => paginate(1), AUTOPLAY_MS);
    };

    /* keyboard */
    useEffect(() => {
        const handler = (e) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (!isVisible) return;
            if (e.key === "ArrowRight") paginate(1);
            if (e.key === "ArrowLeft") paginate(-1);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [paginate]);

    /* touch swipe */
    const touchStartX = useRef(0);
    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
        const delta = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 50) paginate(delta > 0 ? 1 : -1);
    };

    return (
        <section
            ref={sectionRef}
            id="photo-slider"
            className="ps"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-label="Photo showcase slider"
        >
            {/* ── Sidebar ── */}
            <div className="ps-sidebar" aria-hidden="true">
                <span className="ps-brand">Gallery</span>
                <div className="ps-sidebar-line" />
                <div className="ps-sidebar-socials">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </div>
            </div>

            {/* ── Viewport ── */}
            <div className="ps-viewport">
                <AnimatePresence
                    initial={false}
                    custom={direction}
                    mode="wait"
                    onExitComplete={() => setIsAnimating(false)}
                >
                    <motion.div
                        key={`slide-${activeIndex}`}
                        className="ps-slide"
                        custom={direction}
                    >
                        {/* Background */}
                        <motion.div
                            className="ps-bg"
                            custom={direction}
                            variants={bgVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            {isVideo(slide.bg) ? (
                                <video
                                    src={slide.bg}
                                    className="ps-bg-img"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    draggable={false}
                                />
                            ) : (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={slide.bg}
                                    alt=""
                                    className="ps-bg-img"
                                    draggable={false}
                                />
                            )}
                            <div className="ps-bg-overlay" />
                        </motion.div>

                        {/* Foreground card */}
                        <motion.div
                            className="ps-fg"
                            custom={direction}
                            variants={fgVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            {isVideo(slide.fg) ? (
                                <video
                                    src={slide.fg}
                                    className="ps-fg-img"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    draggable={false}
                                />
                            ) : (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={slide.fg}
                                    alt=""
                                    className="ps-fg-img"
                                    draggable={false}
                                />
                            )}
                        </motion.div>

                        {/* Text */}
                        <motion.div
                            className="ps-text"
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            <h2 className="ps-title">
                                <span className="ps-title-line">{slide.title}</span>
                                <span className="ps-title-line">{slide.titleLine2}</span>
                            </h2>
                            <p className="ps-subtitle">{slide.subtitle}</p>
                            <button className="ps-cta">
                                Discover more
                            </button>
                        </motion.div>

                        {/* Counter */}
                        <motion.div
                            className="ps-counter"
                            variants={counterVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            <span className="ps-counter-num">
                                {String(activeIndex + 1).padStart(2, "0")}
                            </span>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ── Nav arrows (matching the reference exactly) ── */}
            <div className="ps-nav">
                {activeIndex > 0 && (
                    <button
                        className="ps-arrow"
                        onClick={() => paginate(-1)}
                        aria-label="Previous slide"
                    >
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                )}
                <button
                    className="ps-arrow"
                    onClick={() => paginate(1)}
                    aria-label="Next slide"
                >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            {/* ── Dots ── */}
            <div className="ps-dots">
                {SLIDES.map((_, i) => (
                    <button
                        key={i}
                        className={`ps-dot${i === activeIndex ? " ps-dot--on" : ""}`}
                        onClick={() => {
                            if (i === activeIndex || isAnimating) return;
                            setIsAnimating(true);
                            setSlide([i, i > activeIndex ? 1 : -1]);
                        }}
                        aria-label={`Slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
