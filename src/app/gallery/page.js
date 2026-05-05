"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "./gallery.css";

import gallery1 from "../../../gallery_images/1.jpg";
import gallery2 from "../../../gallery_images/2.jpg";
import gallery3 from "../../../gallery_images/3.jpg";
import gallery4 from "../../../gallery_images/4.jpg";
import gallery5 from "../../../gallery_images/5.jpg";
import gallery6 from "../../../gallery_images/6.jpg";
import gallery7 from "../../../gallery_images/7.jpg";
import gallery8 from "../../../gallery_images/8.jpg";
import gallery9 from "../../../gallery_images/9.avif";

/* ─── Theme Colors Hook ─── */
function useThemeColors() {
  const [colors, setColors] = useState({
    pinPrimary: "#E74C3C",
    pinLight: "#F8B4B8",
  });
  useEffect(() => {
    const update = () => {
      const s = getComputedStyle(document.documentElement);
      setColors({
        pinPrimary: s.getPropertyValue("--gallery-pin-primary").trim() || "#E74C3C",
        pinLight: s.getPropertyValue("--gallery-pin-light").trim() || "#F8B4B8",
      });
    };
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true });
    return () => obs.disconnect();
  }, []);
  return colors;
}

/* ─── Data ─── */
const CATEGORIES = ["What We Do", "Resources", "Events", "Highlights", "Partnerships"];

const GALLERY_ITEMS = [
  { id: 1, title: "All-Hands Energy", caption: "Builders syncing ideas at full speed.", location: "K-Hub Demo Arena", date: "Innovation Day", category: "Events", detail: "A high-focus team moment captured during live founder demos, where problem statements were translated into working prototypes.", image: gallery1 },
  { id: 2, title: "Experiment Table", caption: "Sketches, screens, and rapid prototypes.", location: "Product Sprint Room", date: "Build Week", category: "Resources", detail: "Quick iterations, idea boards, and deep feedback loops helped shape feature decisions for launch-ready experiences.", image: gallery2 },
  { id: 3, title: "Afterhours Build", caption: "Late-night focus where momentum compounds.", location: "Night Lab", date: "Late Session", category: "Resources", detail: "After-hours execution where small decisions and code refinements turned experiments into stable product flows.", image: gallery3 },
  { id: 4, title: "Studio Session", caption: "Concepts shaped into product stories.", location: "Creative Studio", date: "Story Pass", category: "Resources", detail: "Cross-functional collaboration between design and engineering teams to align narrative, interface, and user impact.", image: gallery4 },
  { id: 5, title: "Mentor Rounds", caption: "Feedback loops powering sharper execution.", location: "Mentor Bay", date: "Review Round", category: "Highlights", detail: "Focused mentor critique sessions that tightened clarity, improved delivery, and accelerated go-to-market confidence.", image: gallery5 },
  { id: 6, title: "Demo Prep", caption: "Polishing details before launch day.", location: "Launch Control", date: "Final Prep", category: "Partnerships", detail: "Final QA checks, communication sync, and release readiness work to ensure a smooth and reliable public rollout.", image: gallery6 },
  { id: 7, title: "Creative Debrief", caption: "Insights pinned and shared in real-time.", location: "Collab Wall", date: "Debrief", category: "Events", detail: "Instant capture of learnings and action points, turning observations into concrete next-step execution plans.", image: gallery7 },
  { id: 8, title: "Launch Window", caption: "A final check before pushing live.", location: "Release Desk", date: "Go Live", category: "Partnerships", detail: "Critical last-mile validation to verify performance, UX consistency, and operational reliability before launch.", image: gallery8 },
  { id: 9, title: "Founder Pulse", caption: "A moment captured from the core team.", location: "Founder Circle", date: "Core Team", category: "Events", detail: "A candid founder snapshot reflecting ownership, velocity, and the collective mindset driving K-Hub initiatives.", image: gallery9 },
];

/* ─── Helpers ─── */
function getCardTilt(index) { return ((index * 37) % 7) - 3; }

/* ─── Pin SVG ─── */
function PinSVG({ colors }) {
  return (
    <svg aria-hidden viewBox="0 0 52 64" className="gallery-pin-svg">
      <ellipse cx="26" cy="14" rx="14" ry="9" fill={colors.pinPrimary} />
      <ellipse cx="24" cy="12" rx="8" ry="4" fill={colors.pinLight} opacity="0.85" />
      <rect x="21" y="16" width="10" height="18" rx="5" fill={colors.pinPrimary} transform="rotate(-8 26 24)" />
      <ellipse cx="26" cy="34" rx="12" ry="7" fill={colors.pinPrimary} />
      <ellipse cx="24" cy="32" rx="7" ry="3.5" fill={colors.pinLight} opacity="0.6" />
      <path d="M26 39 L22 58 L30 58 Z" fill="#737373" />
    </svg>
  );
}

/* ─── Gallery Card ─── */
function GalleryCard({ item, index, onSelect, colors }) {
  const rowRef = useRef(null);
  const imgRef = useRef(null);
  const polaroidRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();
  const isLeft = index % 2 === 0;
  const tilt = getCardTilt(index);

  // IntersectionObserver reveal
  useEffect(() => {
    if (reduceMotion) { setVisible(true); return; }
    const el = rowRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduceMotion]);

  // Image parallax — use rAF directly, no state updates for perf
  useEffect(() => {
    if (reduceMotion) return;
    const el = imgRef.current;
    if (!el) return;
    const img = el.querySelector("img");
    if (!img) return;
    let raf;
    function tick() {
      const rect = el.getBoundingClientRect();
      const offset = ((rect.top + rect.height / 2) - window.innerHeight / 2) * 0.04;
      const clamped = Math.max(-30, Math.min(30, offset));
      img.style.transform = `translateY(${clamped}px) scale(1.08)`;
    }
    function onScroll() { raf = requestAnimationFrame(tick); }
    window.addEventListener("scroll", onScroll, { passive: true });
    tick();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [reduceMotion]);

  return (
    <div
      ref={rowRef}
      className={`gallery-card-row ${visible ? "gallery-card-visible" : ""}`}
      style={{ flexDirection: isLeft ? "row" : "row-reverse", transitionDelay: `${index * 80}ms` }}
    >
      {/* Image Column */}
      <div className="gallery-card-image-col">
        <div ref={polaroidRef} className="gallery-polaroid" style={{ transform: `rotate(${tilt}deg)` }} onClick={() => onSelect(item, index)}>
          <div className="gallery-pin-wrapper"><PinSVG colors={colors} /></div>
          <div className="gallery-polaroid-frame">
            <div className="gallery-image-inner" ref={imgRef}>
              <Image
                src={item.image} alt={item.title} fill placeholder="blur"
                sizes="(max-width: 768px) 90vw, 45vw"
                priority={index < 2}
                className="object-cover"
                style={{ transition: "transform 0.15s linear" }}
              />
              <div className="gallery-image-overlay" />
            </div>
            <div className="gallery-reflection" aria-hidden="true" />
          </div>
          <p className="gallery-polaroid-caption">{item.caption}</p>
        </div>
      </div>

      {/* Text Column */}
      <div className="gallery-card-text-col">
        <p className="gallery-card-number">KHUB GALLERY 0{item.id}</p>
        <h3 className="gallery-card-title">{item.title}</h3>
        <p className="gallery-card-description">{item.detail}</p>
        <div className="gallery-card-meta">
          <span>{item.location}</span>
          <span>{item.date}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Lightbox ─── */
function Lightbox({ items, activeIndex, onClose, onNavigate }) {
  const touchX = useRef(0);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose, onNavigate]);

  const item = items[activeIndex];
  if (!item) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="gallery-lightbox-overlay" onClick={onClose}>
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="gallery-lightbox-content"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - touchX.current; if (d > 50) onNavigate(-1); if (d < -50) onNavigate(1); }}
      >
        <button type="button" onClick={onClose} className="gallery-lightbox-close" aria-label="Close">✕</button>
        <div className="gallery-lightbox-image-wrap">
          <Image src={item.image} alt={item.title} fill placeholder="blur" sizes="85vw" className="object-contain" />
        </div>
        <button type="button" className="gallery-lightbox-prev" onClick={(e) => { e.stopPropagation(); onNavigate(-1); }} aria-label="Previous">‹</button>
        <button type="button" className="gallery-lightbox-next" onClick={(e) => { e.stopPropagation(); onNavigate(1); }} aria-label="Next">›</button>
        <div className="gallery-lightbox-footer">
          <span className="gallery-lightbox-counter">{activeIndex + 1} / {items.length}</span>
          <span className="gallery-lightbox-title">{item.title}</span>
          <span className="gallery-lightbox-date">{item.date}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}



/* ═══════════════════════════════════════════════ */
/*                  MAIN PAGE                     */
/* ═══════════════════════════════════════════════ */

export default function GalleryPage() {
  const heroVideoRef = useRef(null);
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("What We Do");
  const [lightbox, setLightbox] = useState({ open: false, idx: 0 });
  const [scrollProg, setScrollProg] = useState(0);
  const colors = useThemeColors();

  const filtered = useMemo(() => {
    if (activeFilter === "What We Do") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((i) => i.category === activeFilter);
  }, [activeFilter]);

  // Scroll progress — rAF for perf
  useEffect(() => {
    let raf;
    function onScroll() {
      raf = requestAnimationFrame(() => {
        const c = containerRef.current;
        if (!c) return;
        const rect = c.getBoundingClientRect();
        const denom = rect.height - window.innerHeight;
        const prog = denom > 0 ? Math.min(1, Math.max(0, -rect.top / denom)) : 0;
        setScrollProg(prog);
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const openLightbox = useCallback((item, idx) => setLightbox({ open: true, idx }), []);
  const closeLightbox = useCallback(() => setLightbox({ open: false, idx: 0 }), []);
  const navLightbox = useCallback((dir) => setLightbox((p) => ({ ...p, idx: (p.idx + dir + filtered.length) % filtered.length })), [filtered.length]);

  const loopVideo = () => { const v = heroVideoRef.current; if (v && v.ended) { v.currentTime = 0; v.play(); } };

  return (
    <div className={`gallery-page-shell min-h-screen bg-surface font-body text-on-surface selection:bg-primary selection:text-white ${lightbox.open ? "gallery-lightbox-open" : ""}`}>
      <div className="gallery-page-content">
        <main className="pt-24 lg:pt-0">
        {/* ── Hero ── */}
        <section className="relative min-h-[100svh] overflow-hidden bg-on-surface">
          <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
            <video ref={heroVideoRef} className="h-full w-full object-cover" autoPlay muted playsInline preload="metadata" onTimeUpdate={loopVideo}>
              <source src="/hero_video_for_gallery.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, ease: "easeOut" }} className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.58),rgba(0,0,0,0.18)_54%,rgba(0,0,0,0.38))]" />
          <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-10 pt-28 text-white sm:px-8 sm:pb-16 md:pb-20 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/75">Gallery</p>
              <h1 className="text-4xl font-semibold leading-none tracking-tight sm:text-6xl lg:text-7xl">Moments from K-Hub.</h1>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-white/82 sm:mt-6 sm:text-lg sm:leading-7">A moving glimpse of the people, sessions, and spaces that shape the K-Hub community.</p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">Explore snapshots of people, sessions, and milestones from across the K-Hub journey.</p>
            </motion.div>
          </div>
        </section>

        {/* ── Filter Tabs ── */}
        <div className="gallery-filter-bar">
          {CATEGORIES.map((cat) => (
            <button key={cat} className={`gallery-filter-pill ${activeFilter === cat ? "active" : ""}`} onClick={() => setActiveFilter(cat)}>{cat}</button>
          ))}
        </div>

        {/* ── Gallery Section ── */}
        <section ref={containerRef} className="relative pb-40" style={{ minHeight: "50vh" }}>
          <div className="gallery-progress-bar" style={{ width: `${scrollProg * 100}%` }} />

          <div className="page-container relative z-10" style={{ paddingTop: 40 }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, height: 0, marginTop: 0, marginBottom: 0, overflow: "hidden" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <GalleryCard item={item} index={index} onSelect={openLightbox} colors={colors} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>


        </section>
        </main>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox.open && <Lightbox items={filtered} activeIndex={lightbox.idx} onClose={closeLightbox} onNavigate={navLightbox} />}
      </AnimatePresence>

    </div>
  );
}
