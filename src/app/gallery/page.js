"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "./gallery.css";

// Events images
import eventImg1 from "../../../gallery_images/events/1.jpg";
import eventImg2 from "../../../gallery_images/events/3.jpg";
import eventImg3 from "../../../gallery_images/events/5.jpg";
import eventImg4 from "../../../gallery_images/events/7.jpg";
import eventImg5 from "../../../gallery_images/events/8.jpg";
import eventImg6 from "../../../gallery_images/events/DOC-20260218-WA0006.jpg";
import eventImg7 from "../../../gallery_images/events/IMG_9798.jpg";

// Resources images
import resourceImg1 from "../../../gallery_images/resources/20260430_144001.webp";
import resourceImg2 from "../../../gallery_images/resources/20260430_144233.webp";
import resourceImg3 from "../../../gallery_images/resources/20260430_152715.webp";
import resourceImg4 from "../../../gallery_images/resources/IMG_2719.webp";
import resourceImg5 from "../../../gallery_images/resources/IMG_2721.webp";
import resourceImg6 from "../../../gallery_images/resources/IMG_2722.webp";
import resourceImg7 from "../../../gallery_images/resources/IMG_2725.webp";
import resourceImg8 from "../../../gallery_images/resources/IMG_2734.webp";
import resourceImg9 from "../../../gallery_images/resources/IMG_2737.webp";

// What We Do images
import whatWeDoImg1 from "../../../gallery_images/what_we_do/20260430_144656.webp";
import whatWeDoImg2 from "../../../gallery_images/what_we_do/20260430_145206.webp";
import whatWeDoImg3 from "../../../gallery_images/what_we_do/20260430_145459.webp";
import whatWeDoImg4 from "../../../gallery_images/what_we_do/20260430_145932.webp";
import whatWeDoImg5 from "../../../gallery_images/what_we_do/20260430_150438.webp";
import whatWeDoImg6 from "../../../gallery_images/what_we_do/20260430_150516.webp";
import whatWeDoImg7 from "../../../gallery_images/what_we_do/20260430_150556.webp";
import whatWeDoImg8 from "../../../gallery_images/what_we_do/20260430_150742.webp";
import whatWeDoImg9 from "../../../gallery_images/what_we_do/20260430_150849.webp";
import whatWeDoImg10 from "../../../gallery_images/what_we_do/20260430_151844.webp";
import whatWeDoImg11 from "../../../gallery_images/what_we_do/20260430_162310.webp";
import whatWeDoImg12 from "../../../gallery_images/what_we_do/IMG_2721.webp";
import whatWeDoImg13 from "../../../gallery_images/what_we_do/IMG_2722.webp";
import whatWeDoImg14 from "../../../gallery_images/what_we_do/IMG_2725.webp";

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

// Events items
const eventsData = [
  { title: "All-Hands Energy", caption: "Builders syncing ideas at full speed.", location: "K-Hub Demo Arena", date: "Innovation Day", detail: "A high-focus team moment captured during live founder demos, where problem statements were translated into working prototypes.", image: eventImg1 },
  { title: "Team Collaboration", caption: "Synergy in motion across teams.", location: "Collab Space", date: "Build Week", detail: "Cross-team alignment sessions that drove clarity, improved coordination, and accelerated project delivery timelines.", image: eventImg2 },
  { title: "Focused Execution", caption: "Deep work sessions for real impact.", location: "Work Studio", date: "Sprint Session", detail: "Concentrated effort where team members channeled energy into solving complex problems and shipping features.", image: eventImg3 },
  { title: "Mentorship Moment", caption: "Guidance shaping future builders.", location: "Mentor Hub", date: "Feedback Round", detail: "One-on-one mentorship sessions that provided clarity, accelerated growth, and refined execution strategies.", image: eventImg4 },
  { title: "Launch Readiness", caption: "Final preparations for release.", location: "Launch Control", date: "Go Live", detail: "Last-mile quality checks and operational validation ensuring smooth and reliable public rollout.", image: eventImg5 },
  { title: "Community Moment", caption: "K-Hub in motion and energy.", location: "Main Venue", date: "Community Event", detail: "A snapshot of the collective energy, collaboration, and shared mission driving K-Hub forward.", image: eventImg6 },
  { title: "Team Pulse", caption: "The heartbeat of K-Hub culture.", location: "Core Circle", date: "Team Sync", detail: "A candid moment reflecting the ownership, momentum, and collaborative spirit defining K-Hub initiatives.", image: eventImg7 },
];

// Resources items
const resourcesData = [
  { title: "Deep Learning Session", caption: "Knowledge exchange in motion.", location: "Learning Hub", date: "Skill Build", detail: "Immersive learning moments where teams acquired new skills and strengthened their technical capabilities.", image: resourceImg1 },
  { title: "Workshop Moments", caption: "Hands-on creation and learning.", location: "Workshop Area", date: "Build Sprint", detail: "Interactive sessions where team members applied concepts and built solutions from scratch.", image: resourceImg2 },
  { title: "Brainstorm Session", caption: "Ideas taking shape collaboratively.", location: "Innovation Lab", date: "Ideation Round", detail: "Creative brainstorming sessions where diverse perspectives converged into actionable project plans.", image: resourceImg3 },
  { title: "Design Sprint", caption: "Prototyping ideas at speed.", location: "Design Studio", date: "Fast Build", detail: "Rapid prototyping sessions where concepts transformed into tangible, testable products.", image: resourceImg4 },
  { title: "Team Sync", caption: "Alignment and momentum building.", location: "Core Room", date: "Status Check", detail: "Regular synchronization ensuring all team members stayed aligned and moving in the same direction.", image: resourceImg5 },
  { title: "Code Review Session", caption: "Quality assurance in practice.", location: "Dev Lab", date: "Quality Pass", detail: "Collaborative code review sessions ensuring high standards of code quality and best practices.", image: resourceImg6 },
  { title: "Testing & QA", caption: "Excellence through rigor.", location: "QA Lab", date: "Testing Phase", detail: "Comprehensive testing processes ensuring products met the highest standards before launch.", image: resourceImg7 },
  { title: "Knowledge Sharing", caption: "Elevating collective expertise.", location: "Learning Arena", date: "Knowledge Base", detail: "Sessions where team members shared expertise and documented learnings for the broader community.", image: resourceImg8 },
  { title: "Collaboration Tools", caption: "Technology enabling teamwork.", location: "Tech Hub", date: "Infrastructure", detail: "Setup and optimization of collaboration tools that enhanced team productivity and communication.", image: resourceImg9 },
];

// What We Do items
const whatWeDoData = [
  { title: "Initiative Overview", caption: "What We Do - Vision in action.", location: "Strategy Room", date: "Planning Phase", detail: "Strategic overview of K-Hub's core initiatives and the impact-driven approach that guides every project.", image: whatWeDoImg1 },
  { title: "Core Team Alignment", caption: "Strategic sync for execution.", location: "War Room", date: "Strategy Sync", detail: "Deep-dive alignment sessions ensuring all initiatives are coordinated and moving toward shared goals.", image: whatWeDoImg2 },
  { title: "Community Impact", caption: "Serving the broader ecosystem.", location: "Community Center", date: "Outreach Day", detail: "K-Hub's commitment to community building and creating meaningful impact beyond the walls.", image: whatWeDoImg3 },
  { title: "Market Research", caption: "Understanding the landscape.", location: "Research Lab", date: "Data Gathering", detail: "In-depth market analysis and user research that informed strategic direction and product decisions.", image: whatWeDoImg4 },
  { title: "Product Development", caption: "Building solutions that matter.", location: "Dev Center", date: "Build Cycle", detail: "End-to-end product development showcasing K-Hub's commitment to quality and innovation.", image: whatWeDoImg5 },
  { title: "Strategic Planning", caption: "Mapping the future path.", location: "Strategy Hub", date: "Long-term Vision", detail: "Forward-looking planning sessions that shaped K-Hub's strategic initiatives and long-term vision.", image: whatWeDoImg6 },
  { title: "User Feedback Loop", caption: "Learning from our community.", location: "Feedback Hub", date: "User Testing", detail: "Active engagement with users to gather feedback and continuously improve offerings.", image: whatWeDoImg7 },
  { title: "Portfolio Growth", caption: "Expanding our impact reach.", location: "Portfolio Hub", date: "Growth Track", detail: "Tracking and celebrating the expanding portfolio of successful projects and initiatives.", image: whatWeDoImg8 },
  { title: "Project Showcase", caption: "Celebrating shipped work.", location: "Showcase Stage", date: "Demo Day", detail: "Showcasing completed projects and the positive impact created through K-Hub initiatives.", image: whatWeDoImg9 },
  { title: "Growth Milestone", caption: "Tracking progress and momentum.", location: "Growth Center", date: "Milestone Check", detail: "Regular milestone reviews tracking progress toward major goals and celebrating achievements.", image: whatWeDoImg10 },
  { title: "Creative Insights", caption: "Collaborative discovery sessions.", location: "Innovation Lab", date: "Workshop", detail: "Workshops focused on creative problem-solving and innovative approaches to challenges.", image: whatWeDoImg11 },
  { title: "Team Connection", caption: "Strengthening bonds and partnerships.", location: "Partnership Desk", date: "Collaboration", detail: "Meetings with partners and stakeholders exploring opportunities for mutual growth and collaboration.", image: whatWeDoImg12 },
  { title: "Excellence Culture", caption: "Building standards that matter.", location: "Excellence Hub", date: "Culture Building", detail: "Fostering a culture of excellence where quality and impact are non-negotiable standards.", image: whatWeDoImg13 },
  { title: "Future Vision", caption: "Tomorrow starts with today's choices.", location: "Vision Room", date: "Future Planning", detail: "Visionary sessions imagining K-Hub's future and planning initiatives to bring that vision to life.", image: whatWeDoImg14 },
];

// Build gallery items in original order (no shuffling)
const buildGalleryItems = () => {
  const events = eventsData.map((item, idx) => ({ id: idx + 1, category: "Events", ...item }));
  const resources = resourcesData.map((item, idx) => ({ id: idx + 8, category: "Resources", ...item }));
  const whatWeDo = whatWeDoData.map((item, idx) => ({ id: idx + 17, category: "What We Do", ...item }));
  return [...events, ...resources, ...whatWeDo];
};

const GALLERY_ITEMS = buildGalleryItems();

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
      { threshold: 0, rootMargin: "0px 0px 300px 0px" }
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
      style={{ flexDirection: isLeft ? "row" : "row-reverse", transitionDelay: `${index * 20}ms` }}
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
                priority={index < 6}
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
