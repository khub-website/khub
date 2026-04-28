"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import gallery1 from "../../../gallery_images/1.jpg";
import gallery2 from "../../../gallery_images/2.jpg";
import gallery3 from "../../../gallery_images/3.jpg";
import gallery4 from "../../../gallery_images/4.jpg";
import gallery5 from "../../../gallery_images/5.jpg";
import gallery6 from "../../../gallery_images/6.jpg";
import gallery7 from "../../../gallery_images/7.jpg";
import gallery8 from "../../../gallery_images/8.jpg";
import gallery9 from "../../../gallery_images/9.avif";

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "All-Hands Energy",
    caption: "Builders syncing ideas at full speed.",
    location: "K-Hub Demo Arena",
    date: "Innovation Day",
    detail:
      "A high-focus team moment captured during live founder demos, where problem statements were translated into working prototypes.",
    image: gallery1,
    frame: "w-[min(90vw,320px)] aspect-[3/4]",
    flow: "md:-translate-x-20",
    entryRotate: -8,
  },
  {
    id: 2,
    title: "Experiment Table",
    caption: "Sketches, screens, and rapid prototypes.",
    location: "Product Sprint Room",
    date: "Build Week",
    detail:
      "Quick iterations, idea boards, and deep feedback loops helped shape feature decisions for launch-ready experiences.",
    image: gallery2,
    frame: "w-[min(92vw,400px)] aspect-[4/3]",
    flow: "md:translate-x-20",
    entryRotate: 6,
  },
  {
    id: 3,
    title: "Afterhours Build",
    caption: "Late-night focus where momentum compounds.",
    location: "Night Lab",
    date: "Late Session",
    detail:
      "After-hours execution where small decisions and code refinements turned experiments into stable product flows.",
    image: gallery3,
    frame: "w-[min(90vw,300px)] aspect-square",
    flow: "md:-translate-x-28",
    entryRotate: -5,
  },
  {
    id: 4,
    title: "Studio Session",
    caption: "Concepts shaped into product stories.",
    location: "Creative Studio",
    date: "Story Pass",
    detail:
      "Cross-functional collaboration between design and engineering teams to align narrative, interface, and user impact.",
    image: gallery4,
    frame: "w-[min(92vw,430px)] aspect-[5/4]",
    flow: "md:translate-x-12",
    entryRotate: 4,
  },
  {
    id: 5,
    title: "Mentor Rounds",
    caption: "Feedback loops powering sharper execution.",
    location: "Mentor Bay",
    date: "Review Round",
    detail:
      "Focused mentor critique sessions that tightened clarity, improved delivery, and accelerated go-to-market confidence.",
    image: gallery5,
    frame: "w-[min(88vw,290px)] aspect-[3/4]",
    flow: "md:-translate-x-10",
    entryRotate: -7,
  },
  {
    id: 6,
    title: "Demo Prep",
    caption: "Polishing details before launch day.",
    location: "Launch Control",
    date: "Final Prep",
    detail:
      "Final QA checks, communication sync, and release readiness work to ensure a smooth and reliable public rollout.",
    image: gallery6,
    frame: "w-[min(92vw,390px)] aspect-[4/3]",
    flow: "md:translate-x-24",
    entryRotate: 5,
  },
  {
    id: 7,
    title: "Creative Debrief",
    caption: "Insights pinned and shared in real-time.",
    location: "Collab Wall",
    date: "Debrief",
    detail:
      "Instant capture of learnings and action points, turning observations into concrete next-step execution plans.",
    image: gallery7,
    frame: "w-[min(89vw,310px)] aspect-square",
    flow: "md:-translate-x-24",
    entryRotate: -4,
  },
  {
    id: 8,
    title: "Launch Window",
    caption: "A final check before pushing live.",
    location: "Release Desk",
    date: "Go Live",
    detail:
      "Critical last-mile validation to verify performance, UX consistency, and operational reliability before launch.",
    image: gallery8,
    frame: "w-[min(93vw,440px)] aspect-[16/10]",
    flow: "md:translate-x-16",
    entryRotate: 7,
  },
  {
    id: 9,
    title: "Founder Pulse",
    caption: "A moment captured from the core team.",
    location: "Founder Circle",
    date: "Core Team",
    detail:
      "A candid founder snapshot reflecting ownership, velocity, and the collective mindset driving K-Hub initiatives.",
    image: gallery9,
    frame: "w-[min(88vw,300px)] aspect-[3/4]",
    flow: "md:-translate-x-16",
    entryRotate: -6,
  },
];

function ThreadPhotoCard({ item, index, reducedMotion, onSelect }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 93%", "center 58%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.25,
  });

  const y = useTransform(progress, [0, 1], [150, 0]);
  const opacity = useTransform(progress, [0, 1], [0.2, 1]);
  const scale = useTransform(progress, [0, 1], [0.86, 1]);
  const rotate = useTransform(progress, [0, 1], [item.entryRotate, item.entryRotate * 0.15]);
  const pinPop = useTransform(progress, [0, 1], [0.5, 1]);

  const echoY = useTransform(progress, [0, 1], [90, 0]);
  const echoOpacity = useTransform(progress, [0, 1], [0, 0.95]);
  const echoScale = useTransform(progress, [0, 1], [0.78, 1]);

  return (
    <div className={`relative flex min-h-[54vh] items-end ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
      <motion.article
        ref={cardRef}
        style={
          reducedMotion
            ? undefined
            : {
                y,
                opacity,
                scale,
                rotate,
              }
        }
        className={`group relative ${item.flow} ${item.frame} cursor-pointer`}
        onClick={() => onSelect(item)}
      >
        <motion.div
          style={reducedMotion ? undefined : { scale: pinPop }}
          className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-[58%]"
        >
          <svg
            aria-hidden
            viewBox="0 0 52 64"
            className="h-8 w-8 drop-shadow-[0_6px_10px_rgba(0,0,0,0.28)] md:h-10 md:w-10"
          >
            <ellipse cx="26" cy="14" rx="14" ry="9" fill="#dc2626" />
            <ellipse cx="24" cy="12" rx="8" ry="4" fill="#fca5a5" opacity="0.85" />
            <rect x="21" y="16" width="10" height="18" rx="5" fill="#ef4444" transform="rotate(-8 26 24)" />
            <ellipse cx="26" cy="34" rx="12" ry="7" fill="#dc2626" />
            <ellipse cx="24" cy="32" rx="7" ry="3.5" fill="#fca5a5" opacity="0.6" />
            <path d="M26 39 L22 58 L30 58 Z" fill="#737373" />
          </svg>
        </motion.div>

        <motion.div className="relative h-full w-full rounded-[24px] border border-on-surface/20 bg-surface-container-lowest p-3 shadow-[0_26px_60px_rgba(0,0,0,0.22)] transition-transform duration-500 ease-out group-hover:scale-[1.12]">
          <div className="relative h-full w-full rounded-[16px] border border-on-surface/10">
            <Image
              src={item.image}
              alt={item.title}
              fill
              placeholder="blur"
              sizes="(max-width: 768px) 88vw, (max-width: 1200px) 44vw, 420px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <p className="text-xs uppercase tracking-[0.22em] opacity-80">KHUB GALLERY 0{item.id}</p>
              <h3 className="mt-1 text-[clamp(1rem,2.2vw,1.35rem)] font-semibold leading-tight">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/85">{item.caption}</p>
            </div>
          </div>
        </motion.div>
      </motion.article>

      <motion.div
        style={reducedMotion ? undefined : { y: echoY, opacity: echoOpacity, scale: echoScale }}
        className={`group absolute top-[26%] z-20 hidden h-36 w-28 overflow-hidden rounded-2xl border border-white/45 bg-white/80 p-1 shadow-[0_20px_40px_rgba(0,0,0,0.26)] backdrop-blur-sm transition-transform duration-500 ease-out hover:scale-[1.12] md:block ${index % 2 === 0 ? "left-[44%]" : "right-[44%]"}`}
        onClick={() => onSelect(item)}
      >
        <div className="relative h-full w-full rounded-xl">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="120px"
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function GalleryPage() {
  const sectionRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.38,
  });

  // Snake timeline:
  // 0-2%: hidden and waiting for scroll start
  // 2-52%: fast draw + fast travel to right
  // 52-80%: stays off/right
  // 80-100%: reappears on right side
  const threadShiftX = useTransform(smoothProgress, [0, 0.02, 0.52, 0.8, 1], [-260, -240, 560, 590, 170]);
  const threadShiftXMobile = useTransform(smoothProgress, [0, 0.02, 0.52, 0.8, 1], [-140, -120, 245, 265, 55]);
  const threadDraw = useTransform(smoothProgress, [0, 0.02, 0.52, 0.8, 1], [0, 0, 1, 1, 1]);
  const threadGlow = useTransform(smoothProgress, [0, 0.08, 0.52, 1], [0, 0.48, 0.86, 0.9]);
  const snakeVisibility = useTransform(
    smoothProgress,
    [0, 0.018, 0.04, 0.55, 0.79, 0.82, 1],
    [0, 0, 1, 1, 0, 1, 1]
  );

  useEffect(() => {
    if (!selectedItem) return undefined;
    const onEsc = (event) => {
      if (event.key === "Escape") setSelectedItem(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEsc);
    };
  }, [selectedItem]);

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface selection:bg-primary selection:text-white">
      <Navbar />

      <main className="pt-24 lg:pt-0">
        <section className="relative overflow-hidden px-[6vw] pb-32 pt-10 lg:pb-40 lg:pt-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(var(--color-primary-rgb),0.18),transparent_42%),radial-gradient(circle_at_90%_10%,rgba(var(--color-primary-rgb),0.12),transparent_35%)]" />
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-[1000px] text-[clamp(44px,8.5vw,110px)] font-semibold leading-[0.92] tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Gallery stories, pinned to motion.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-8 max-w-[720px] text-lg leading-relaxed text-on-surface-variant md:text-2xl"
          >
            Scroll to pull each memory from the thread. Every image rises from below, pinned like a notice board and connected by one cinematic curve.
          </motion.p>
        </section>

        <section ref={sectionRef} className="relative mx-auto max-w-[1320px] px-[5vw] pb-40">
          <motion.svg
            aria-hidden
            viewBox="0 0 900 2100"
            preserveAspectRatio="none"
            style={reduceMotion ? undefined : { x: threadShiftXMobile, opacity: snakeVisibility }}
            className="pointer-events-none absolute -top-14 left-[-68vw] z-0 h-[2200px] w-[188vw] opacity-95 md:hidden"
          >
            <motion.path
              d="M36 90 C 210 30, 430 34, 620 120 C 800 202, 870 340, 780 468 C 662 638, 392 620, 252 758 C 134 872, 154 1045, 346 1148 C 536 1250, 760 1216, 828 1360 C 892 1492, 764 1642, 580 1716 C 390 1792, 344 1928, 492 2010 C 616 2082, 748 2058, 828 1968"
              fill="none"
              stroke="rgba(28,98,255,0.9)"
              strokeWidth="30"
              strokeLinecap="round"
              style={reduceMotion ? undefined : { pathLength: threadDraw }}
            />
            <motion.path
              d="M36 90 C 210 30, 430 34, 620 120 C 800 202, 870 340, 780 468 C 662 638, 392 620, 252 758 C 134 872, 154 1045, 346 1148 C 536 1250, 760 1216, 828 1360 C 892 1492, 764 1642, 580 1716 C 390 1792, 344 1928, 492 2010 C 616 2082, 748 2058, 828 1968"
              fill="none"
              stroke="rgba(116,199,255,0.9)"
              strokeWidth="10"
              strokeLinecap="round"
              style={reduceMotion ? { opacity: 0.3 } : { pathLength: threadDraw, opacity: threadGlow }}
            />
          </motion.svg>

          <motion.svg
            aria-hidden
            viewBox="0 0 1400 2500"
            preserveAspectRatio="none"
            style={reduceMotion ? undefined : { x: threadShiftX, opacity: snakeVisibility }}
            className="pointer-events-none absolute -top-24 left-[-15vw] z-0 hidden h-[2550px] w-[1380px] opacity-95 md:block"
          >
            <motion.path
              d="M40 120 C 300 22, 620 24, 900 130 C 1140 220, 1290 360, 1210 520 C 1120 700, 780 680, 520 770 C 250 865, 180 1030, 360 1160 C 590 1325, 1040 1250, 1215 1425 C 1330 1540, 1240 1705, 980 1800 C 730 1890, 640 2040, 860 2140 C 1010 2210, 1160 2260, 1260 2220 C 1350 2180, 1320 2070, 1210 1970"
              fill="none"
              stroke="rgba(28,98,255,0.88)"
              strokeWidth="40"
              strokeLinecap="round"
              style={reduceMotion ? undefined : { pathLength: threadDraw }}
            />
            <motion.path
              d="M40 120 C 300 22, 620 24, 900 130 C 1140 220, 1290 360, 1210 520 C 1120 700, 780 680, 520 770 C 250 865, 180 1030, 360 1160 C 590 1325, 1040 1250, 1215 1425 C 1330 1540, 1240 1705, 980 1800 C 730 1890, 640 2040, 860 2140 C 1010 2210, 1160 2260, 1260 2220 C 1350 2180, 1320 2070, 1210 1970"
              fill="none"
              stroke="rgba(116,199,255,0.85)"
              strokeWidth="12"
              strokeLinecap="round"
              style={reduceMotion ? { opacity: 0.2 } : { pathLength: threadDraw, opacity: threadGlow }}
            />
          </motion.svg>

          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_24%,rgba(28,98,255,0.2),transparent_46%),radial-gradient(circle_at_88%_62%,rgba(89,189,255,0.14),transparent_46%)] blur-3xl" />

          <div className="relative z-10 space-y-7 lg:space-y-2">
            {GALLERY_ITEMS.map((item, index) => (
              <ThreadPhotoCard
                key={item.id}
                item={item}
                index={index}
                reducedMotion={Boolean(reduceMotion)}
                onSelect={setSelectedItem}
              />
            ))}
          </div>

          <div className="mt-20 border-t border-on-surface/12 pt-12">
            <p className="max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
              A stitched archive of moments from Khub. The thread, pins, and staggered parallax are designed to make the gallery feel alive while you scroll.
            </p>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedItem(null)}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(47,122,255,0.4),transparent_42%),radial-gradient(circle_at_86%_86%,rgba(95,208,255,0.22),transparent_45%),rgba(8,14,28,0.62)] backdrop-blur-md" />

            <motion.article
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/28 bg-white/10 shadow-[0_30px_80px_rgba(0,26,84,0.45)] backdrop-blur-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 z-20 rounded-full border border-white/40 bg-black/30 px-3 py-1 text-sm text-white transition hover:bg-black/45"
              >
                Close
              </button>

              <div className="grid grid-cols-1 md:grid-cols-[1.06fr_0.94fr]">
                <div className="relative min-h-[300px] p-3 md:min-h-[560px] md:p-4">
                  <div className="relative h-full w-full overflow-hidden rounded-[20px] border border-white/40 bg-white/10 p-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-sm">
                    <Image
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      fill
                      placeholder="blur"
                      sizes="(max-width: 768px) 100vw, 56vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
                  </div>
                </div>

                <div className="relative m-3 overflow-hidden rounded-[20px] border border-white/40 bg-white/10 p-6 text-slate-900 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-sm md:m-4 md:p-10">
                  <div className="mb-4 inline-flex rounded-full border border-slate-300/80 bg-white/70 px-4 py-1 text-xs uppercase tracking-[0.2em] text-slate-700">
                    KHUB GALLERY 0{selectedItem.id}
                  </div>
                  <h3 className="text-3xl font-semibold leading-tight md:text-4xl">{selectedItem.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-800 md:text-lg">{selectedItem.caption}</p>
                  <p className="mt-6 text-sm leading-relaxed text-slate-700 md:text-base">{selectedItem.detail}</p>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-300/75 bg-white/70 px-4 py-3">
                      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">Location</p>
                      <p className="mt-1 text-sm font-medium text-slate-900">{selectedItem.location}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-300/75 bg-white/70 px-4 py-3">
                      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">Moment</p>
                      <p className="mt-1 text-sm font-medium text-slate-900">{selectedItem.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
