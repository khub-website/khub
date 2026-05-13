"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const flagshipProjects = [
  {
    name: "Drugparadigm",
    logo: "/drugparadigm.png",
    outcome: "AI-driven drug discovery",
    detail: "",
    url: "https://drugparadigm.com/",
  },
  {
    name: "Cyberparadigm",
    logo: "/cyberparadigm.webp",
    outcome: "Indigenous Cybersecurity learning platform",
    detail: "",
    url: "https://cyberparadigm.in/",
  },
  {
    name: "Roboparadigm",
    logo: "/roboparadigm.png",
    outcome: "AI-driven robotic systems for industrial and laboratory automation",
    detail: "",
    url: "https://roboparadigm.com/",
  },
  {
    name: "Neuroparadigm",
    logo: "/neuroparadigm.webp",
    outcome: "AI-assisted clinical decsion support for psychiatry and neurodevelopment care",
    detail: "",
    url: "https://neuroparadigm.in/",
  },
  {
    name: "Nutraparadigm",
    logo: "/nutraparadigm.jpg",
    outcome: "AI-driven nutraceutical and natural drug design research ",
    detail: "",
    url: "https://nutradrug.in",
  },
  {
    name: "Crystalparadigm",
    logo: "/crystalparadigm.webp",
    outcome: " AI-driven material discovery and Energy storage materials ",
    detail: "",
    url: "https://crystalparadigm.in/",
  },
  {
    name: "Next Paradigm",
    logo: null,
    outcome: "Upcoming Domain",
    detail: "More deep-tech domains are on the way. This pearl marks the next vertical to be announced.",
    upcoming: true,
    url: null,
  },
];

const evidenceBlocks = [
  { label: "Startups Incubated", value: "09" },
  { label: "Preprints", value: "10" },
  { label: "Publications", value: "02" },
  { label: "Mentors & SMEs", value: "17" },
  { label: "Domain specific Labs", value: "02" },
  { label: "Backing Institutions", value: "04" },
  // { label: "Application Pathways", value: "06" },
];

const leadershipTeam = [
  {
    name: "Shri. Neil Gogte",
    role: "Chairman, KMIT Group of Institutions",
    bio: "Guides K-Hub strategy, partnerships, and technical direction across the cross-domain research pipelines.",
    image: "/team/leader-01.png",
  },
  {
    name: "Sudarsh Lal",
    role: "Director, K-Hub",
    bio: "Provides business development mentorship and strategic guidance for K-Hub incubated startups.",
    image: "/team/leader-02.png",
  },
  {
    name: "Venkateshwar Rao Boinapally",
    role: "Director, K-Hub",
    bio: "Provides technical mentorship and guidance in execution from idea to implementation.",
    image: "/team/leader-03.png",
  },
];

const paradigmHeads = [
  {
    name: "Sanjana Gogte",
    role: "DrugParadigm",
    bio: "Leads discovery work and translational pathways for drug innovation.",
    image: "/drugparadigm.png",
    headImage: "/team/paradigm-01.png",
    isLogo: true,
  },
  {
    name: "Sripooja Mallam",
    role: "CyberParadigm",
    bio: "Oversees secure systems research and applied security pilots.",
    image: "/cyberparadigm.webp",
    headImage: "/team/paradigm-02.png",
    isLogo: true,
  },
  {
    name: "Mahesh Kalwakurthy",
    role: "RoboParadigm",
    bio: "Guides robotics prototyping, automation, and field testing cycles.",
    image: "/roboparadigm.png",
    headImage: "/team/paradigm-03.png",
    isLogo: true,
  },
  {
    name: "Sireesha Puppala",
    role: "NeuroParadigm",
    bio: "Directs neurotech research, experimentation, and model validation.",
    image: "/neuroparadigm.webp",
    headImage: "/team/paradigm-04.png",
    isLogo: true,
  },
  {
    name: "Dr. Devika Rubi",
    role: "NutraParadigm",
    bio: "Leads nutrition science pilots and functional formulation testing.",
    image: "/nutraparadigm.jpg",
    headImage: "/team/paradigm-05.png",
    isLogo: true,
  },
  {
    name: "Dr. Shilpa Choudhary",
    role: "CrystalParadigm",
    bio: "Heads materials research and simulation-to-prototype delivery.",
    image: "/crystalparadigm.webp",
    headImage: "/team/paradigm-06.png",
    isLogo: true,
  },
];

const facilitySlides = [
  {
    label: "Deep-Tech Hub",
    title: "A Deep-Tech Hub",
    description:
      "A launchpad for applied  deep-tech research startups across various domains.",
    image: null,
    // video: "/about/khub.mp4",
    poster: "/about/khub.jpg",
    background:
      "radial-gradient(circle at 18% 24%, rgba(255,255,255,0.35), rgba(255,255,255,0) 60%), linear-gradient(135deg, #bde0fe, #ffafcc)",
  },
  {
    label: "Compute",
    title: "GPU Infrastructure at K-Hub",
    description:
      "NVIDIA A100, H100, H200 GPU Cluster for High-performance compute for model training, simulation, and intensive AI workloads.",
    image: "/about/gpu_pic.jpg",
    background:
      "radial-gradient(circle at 18% 24%, rgba(255,255,255,0.3), rgba(255,255,255,0) 60%), linear-gradient(135deg, #a3b18a, #588157)",
  },
  {
    label: "Infrastructure",
    title: "In-House Infrastructure",
    description:
      "Dedicated labs,workspaces designed for rapid iteration.",
    image: "/about/infra.jpg",
    background:
      "radial-gradient(circle at 18% 24%, rgba(255,255,255,0.3), rgba(255,255,255,0) 60%), linear-gradient(135deg, #56cfe1, #4ea8de)",
  },
  {
    label: "Campus Life",
    title: "Recreation & Cafeteria",
    description:
      "Spaces to recharge, connect, and collaborate between sprints.",
    image: "/about/cafiteria.jpg",
    background:
      "radial-gradient(circle at 18% 24%, rgba(255,255,255,0.3), rgba(255,255,255,0) 60%), linear-gradient(135deg, #ffe66d, #ff6b6b)",
  },
];

function PearlProjectCard({ project, index, reduceMotion }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: reduceMotion ? 0 : 26, scale: reduceMotion ? 1 : 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.58, delay: Math.min(index * 0.08, 0.36), ease: [0.22, 1, 0.36, 1] }}
      className={`relative grid md:grid-cols-[96px_1fr] gap-4 md:gap-6 rounded-2xl border border-outline-variant/65 bg-surface-container-lowest p-5 md:p-6 shadow-[0_16px_42px_rgba(20,20,18,0.07)] ${index % 2 === 0 ? "md:mr-14" : "md:ml-14"}`}
    >
      <div aria-hidden className="hidden md:block absolute -left-8 top-1/2 h-px w-8 bg-primary/30" />

      <div className="flex items-start justify-center md:justify-start">
        <motion.div
          className="relative h-20 w-20 rounded-full border border-white/90 p-2 shadow-[0_10px_26px_rgba(10,25,20,0.2)]"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.98) 0%, rgba(235,244,240,0.94) 52%, rgba(194,217,208,0.9) 100%)",
            cursor: project.url ? "pointer" : "default",
          }}
          animate={reduceMotion ? {} : { y: [0, -3, 0] }}
          transition={reduceMotion ? {} : { duration: 2.4 + index * 0.12, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => {
            if (project.url) {
              window.open(project.url, "_blank", "noopener,noreferrer");
            }
          }}
        >
          <span className="pointer-events-none absolute left-3 top-3 h-2 w-2 rounded-full bg-white/95" />
          {project.upcoming ? (
            <div className="h-full w-full rounded-full bg-surface-container-low border border-primary/35 flex items-center justify-center">
              <span className="text-[2rem] leading-none font-bold text-primary">?</span>
            </div>
          ) : (
            <Image
              src={project.logo}
              alt={project.name}
              width={56}
              height={56}
              className="h-full w-full object-contain rounded-full"
            />
          )}
        </motion.div>
      </div>

      <div>
        <h4
          className={`text-[0.92rem] font-semibold leading-tight text-on-surface mb-2 ${project.url ? "hover:text-primary cursor-pointer transition-colors" : ""}`}
          onClick={() => {
            if (project.url) {
              window.open(project.url, "_blank", "noopener,noreferrer");
            }
          }}
        >
          {project.name}
        </h4>
        <p className="text-[0.84rem] uppercase tracking-[0.11em] font-semibold text-primary mb-3">
          {project.outcome}
        </p>
        <p className="text-[0.9rem] leading-relaxed text-on-surface-variant">
          {project.detail}
        </p>
        {(project.upcoming || project.url === null) && (
          <p className="mt-3 text-[0.72rem] uppercase tracking-[0.14em] text-primary font-semibold">
            {project.url === null ? "Coming soon" : "More domains coming soon"}
          </p>
        )}
        <p className="mt-4 text-[0.7rem] uppercase tracking-[0.14em] text-on-surface-variant/75 font-semibold">
          Pearl {String(index + 1).padStart(2, "0")}
        </p>
      </div>
    </motion.article>
  );
}

function TeamCard({ person, reduceMotion }) {
  const logoFloat = reduceMotion || !person.isLogo ? {} : { y: [0, -6, 0] };
  const flipCard = Boolean(person.enableFlip);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouchInput, setIsTouchInput] = useState(false);
  const [headImgError, setHeadImgError] = useState(false);
  const primaryImage = person.headImage ?? person.image;

  const handlePointerDown = (event) => {
    if (event.pointerType === "touch" || event.pointerType === "pen") {
      setIsTouchInput(true);
      return;
    }

    setIsTouchInput(false);
  };

  const handleToggleFlip = () => {
    if (flipCard && isTouchInput) {
      setIsFlipped((prev) => !prev);
    }
  };

  const handleKeyDown = (event) => {
    if (!flipCard) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
      tabIndex={0}
      aria-label={`${person.name} - ${person.role}`}
      role={flipCard ? "button" : undefined}
      aria-pressed={flipCard ? isFlipped : undefined}
      className="group relative w-[230px] sm:w-[250px] md:w-[270px] shrink-0 overflow-hidden rounded-2xl border border-outline-variant/70 bg-surface-container-lowest shadow-[0_18px_40px_rgba(18,20,24,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
      onPointerDown={handlePointerDown}
      onClick={handleToggleFlip}
      onKeyDown={handleKeyDown}
    >
      {flipCard ? (
        <div className="relative h-60 md:h-64 w-full [perspective:1200px]">
          <div
            className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)] ${
              isFlipped ? "[transform:rotateY(180deg)]" : ""
            }`}
          >
            <div className="absolute inset-0 [backface-visibility:hidden]">
              <div className="relative h-full w-full bg-surface-container-low">
                <div
                  aria-hidden
                  className="absolute -top-6 right-6 h-20 w-20 rounded-full opacity-40 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(var(--color-primary-rgb),0.45) 0%, rgba(var(--color-primary-rgb),0) 70%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={logoFloat}
                    transition={reduceMotion ? {} : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex h-28 w-28 items-center justify-center rounded-full border border-white/80 bg-white/80 shadow-[0_18px_40px_rgba(15,20,25,0.18)]"
                  >
                    <Image
                      src={person.image}
                      alt={`${person.role} logo`}
                      width={96}
                      height={96}
                      className="h-16 w-16 object-contain"
                    />
                  </motion.div>
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent opacity-70"
                />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[0.95rem] font-semibold leading-tight">{person.name}</p>
                  <p className="text-[0.75rem] uppercase tracking-[0.18em] text-white/80 mt-1">
                    {person.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              {headImgError ? (
                <div className="flex h-full w-full flex-col items-center justify-center bg-surface-container-high p-6 text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-surface-container-highest border border-outline-variant/30">
                    <User className="h-10 w-10 text-on-surface-variant/40" />
                  </div>
                  <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-on-surface-variant/60">
                    Photo Coming Soon
                  </p>
                </div>
              ) : (
                <Image
                  src={person.headImage}
                  alt={`${person.name} headshot`}
                  width={320}
                  height={420}
                  className="h-full w-full object-cover"
                  onError={() => setHeadImgError(true)}
                />
              )}
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-black/75 via-black/35 to-transparent"
              />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[0.95rem] font-semibold leading-tight">{person.name}</p>
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-white/75 mt-1">
                  {person.role}
                </p>
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-white/70 mt-3">
                  About
                </p>
                <p className="text-[0.85rem] leading-relaxed text-white/90 mt-2">
                  {person.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative h-60 md:h-64 w-full overflow-hidden">
          <Image
            src={primaryImage}
            alt={person.name}
            width={320}
            height={420}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent opacity-70"
          />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-[0.95rem] font-semibold leading-tight">{person.name}</p>
            <p className="text-[0.75rem] uppercase tracking-[0.18em] text-white/80 mt-1">
              {person.role}
            </p>
          </div>
        </div>
      )}

      {!flipCard && (
        <div className="absolute inset-0 flex items-end bg-surface/95 opacity-0 translate-y-6 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
          <div className="p-5">
            <p className="text-[0.85rem] uppercase tracking-[0.18em] text-primary font-semibold mb-2">
              About
            </p>
            <p className="text-[0.9rem] leading-relaxed text-on-surface-variant">
              {person.bio}
            </p>
          </div>
        </div>
      )}
    </motion.article>
  );
}

function TeamMarquee({ title, description, people, reduceMotion, duration, loop = true, enableManualScroll = false }) {
  const shouldLoop = loop && !reduceMotion;
  const trackPeople = shouldLoop ? [...people, ...people] : people;
  const trackClassName = shouldLoop
    ? `flex gap-5${enableManualScroll ? "" : " marquee-track"}`
    : "flex flex-wrap justify-center gap-5";
  const marqueeRef = useRef(null);
  const dragStateRef = useRef({ startX: 0, scrollLeft: 0, isDragging: false });
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event) => {
    if (!enableManualScroll) {
      return;
    }

    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const container = marqueeRef.current;
    if (!container) {
      return;
    }

    const isInteractive = Boolean(event.target.closest("button, a"));
    if (isInteractive) {
      return;
    }

    dragStateRef.current = {
      startX: event.clientX,
      scrollLeft: container.scrollLeft,
      isDragging: true,
    };
    setIsDragging(true);
    container.setPointerCapture(event.pointerId);
  };

  const handleDragMove = (event) => {
    if (!enableManualScroll) {
      return;
    }

    const container = marqueeRef.current;
    if (!container || !dragStateRef.current.isDragging) {
      return;
    }

    const deltaX = event.clientX - dragStateRef.current.startX;
    container.scrollLeft = dragStateRef.current.scrollLeft - deltaX;
    if (shouldLoop) {
      const halfWidth = container.scrollWidth / 2;
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft -= halfWidth;
      } else if (container.scrollLeft < 0) {
        container.scrollLeft += halfWidth;
      }
    }
  };

  const handleDragEnd = (event) => {
    if (!enableManualScroll) {
      return;
    }

    const container = marqueeRef.current;
    if (container && dragStateRef.current.isDragging) {
      container.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current = { startX: 0, scrollLeft: 0, isDragging: false };
    setIsDragging(false);
  };

  useEffect(() => {
    if (!enableManualScroll || !shouldLoop) {
      return undefined;
    }

    const container = marqueeRef.current;
    if (!container) {
      return undefined;
    }

    let frameId;
    let lastTime = 0;
    const speed = 0.035;

    const tick = (time) => {
      if (!lastTime) {
        lastTime = time;
      }
      const delta = time - lastTime;
      lastTime = time;

      if (!dragStateRef.current.isDragging) {
        container.scrollLeft += delta * speed;
        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [enableManualScroll, shouldLoop]);

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-90px" }}
      className="marquee-pause"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-primary mb-2">
            {title}
          </p>
          <h3 className="font-display text-[clamp(1.2rem,2.5vw,1.8rem)] leading-tight">
            {description}
          </h3>
        </div>
      </div>

      <div
        ref={marqueeRef}
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragEnd}
        style={enableManualScroll ? { scrollSnapType: "x mandatory" } : undefined}
        className={`relative rounded-3xl border border-outline-variant/70 bg-surface-container-lowest px-4 py-6 ${
          enableManualScroll ? "overflow-x-auto cursor-grab active:cursor-grabbing" : "overflow-hidden"
        }`}
      >
        {shouldLoop && (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-surface-container-lowest via-surface-container-lowest/80 to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-surface-container-lowest via-surface-container-lowest/80 to-transparent"
            />
          </>
        )}

        <div
          className={trackClassName}
          style={shouldLoop ? { "--marquee-duration": duration, animationPlayState: isDragging ? "paused" : undefined } : undefined}
        >
          {trackPeople.map((person, index) => (
            <TeamCard key={`${person.name}-${index}`} person={person} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const reduceMotion = useReducedMotion();
  const [isClient, setIsClient] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const swipeStartRef = useRef({ x: 0, isInteractive: false });
  const totalSlides = facilitySlides.length;
  const activeSlideData = facilitySlides[activeSlide];
  const posterImage = activeSlideData.poster || activeSlideData.image;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (reduceMotion || activeSlideData.video) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 7000);

    return () => clearInterval(intervalId);
  }, [activeSlide, activeSlideData.video, reduceMotion, totalSlides]);

  const sectionIntro = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardReveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20, scale: reduceMotion ? 1 : 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const handleSwipeStart = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const isInteractive = Boolean(event.target.closest("button, a"));
    swipeStartRef.current = { x: event.clientX, isInteractive };
  };

  const handleSwipeEnd = (event) => {
    const { x, isInteractive } = swipeStartRef.current;
    if (!x || isInteractive) {
      swipeStartRef.current = { x: 0, isInteractive: false };
      return;
    }

    const deltaX = event.clientX - x;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      setActiveSlide((prev) => {
        if (deltaX > 0) {
          return (prev - 1 + totalSlides) % totalSlides;
        }
        return (prev + 1) % totalSlides;
      });
    }

    swipeStartRef.current = { x: 0, isInteractive: false };
  };

  return (
    <>
      <main className="bg-surface text-on-surface pt-32 pb-20">
        <section className="page-container">
          <motion.div
            variants={sectionIntro}
            initial="hidden"
            animate="show"
            onPointerDown={handleSwipeStart}
            onPointerUp={handleSwipeEnd}
            onPointerCancel={handleSwipeEnd}
            style={{ touchAction: "pan-y" }}
            className="relative overflow-hidden rounded-[28px] border border-outline-variant/70 bg-surface-container-lowest p-8 md:p-12 shadow-[0_22px_60px_rgba(20,20,18,0.1)]"
          >
            <div className="absolute inset-0">
              {activeSlideData.video && isClient ? (
                <video
                  key={activeSlideData.video}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  playsInline
                  preload="metadata"
                  poster={activeSlideData.poster}
                  onEnded={() =>
                    setActiveSlide((prev) => (prev + 1) % totalSlides)
                  }
                >
                  <source src={activeSlideData.video} type="video/mp4" />
                </video>
              ) : posterImage ? (
                <Image
                  src={posterImage}
                  alt={activeSlideData.title}
                  fill
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ background: facilitySlides[activeSlide].background }}
                  aria-hidden
                />
              )}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/15"
                aria-hidden
              />
            </div>

            <div
              className="relative z-10 flex h-full min-h-[420px] flex-col justify-between"
              role="region"
              aria-roledescription="carousel"
              aria-label="K-Hub in-house highlights"
            >
              <div className="max-w-3xl">
                <p className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-surface-container-lowest/80">
                  About Us
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={facilitySlides[activeSlide].title}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-4"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-surface-container-lowest/70 mb-3">
                      {facilitySlides[activeSlide].label}
                    </p>
                    <h1 className="font-display text-[clamp(2.1rem,5.2vw,3.9rem)] leading-[1.02] text-surface-container-lowest">
                      {facilitySlides[activeSlide].title}
                    </h1>
                    <p className="mt-6 text-[0.98rem] leading-relaxed text-surface-container-lowest/85">
                      {facilitySlides[activeSlide].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="px-5 py-3 rounded-xl bg-surface-container-lowest text-sm font-semibold tracking-tight text-primary hover:opacity-90 transition"
                  >
                    Connect With K-Hub
                  </Link>
                  <Link
                    href="/"
                    className="px-5 py-3 rounded-xl border border-surface-container-lowest/60 text-sm font-semibold text-surface-container-lowest/90 hover:text-surface-container-lowest transition"
                  >
                    Back to Home
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full border border-surface-container-lowest/60 text-surface-container-lowest hover:bg-surface-container-lowest/15 transition"
                    onClick={() =>
                      setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
                    }
                    aria-label="Previous slide"
                  >
                    &lt;
                  </button>
                  <div className="flex items-center gap-2">
                    {facilitySlides.map((_, index) => (
                      <button
                        key={`facility-dot-${index}`}
                        type="button"
                        className={`h-2.5 w-2.5 rounded-full transition ${index === activeSlide
                          ? "bg-surface-container-lowest"
                          : "bg-surface-container-lowest/40"
                          }`}
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full border border-surface-container-lowest/60 text-surface-container-lowest hover:bg-surface-container-lowest/15 transition"
                    onClick={() => setActiveSlide((prev) => (prev + 1) % totalSlides)}
                    aria-label="Next slide"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="page-container mt-16 md:mt-20">
          <motion.div
            variants={sectionIntro}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-wrap items-end justify-between gap-5 mb-9"
          >
            <div>
              <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-primary mb-3">
                String of Pearls
              </p>
              <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.1] tracking-tight">
                 Deep-Tech startups incubated at K-Hub
              </h2>
            </div>
            {/* <p className="text-sm text-on-surface-variant max-w-md leading-relaxed">
              Each pearl represents one flagship initiative. Keep your final named projects, measurable outputs, and impact notes directly on each card.
            </p> */}
          </motion.div>

          <div className="relative">
            <div
              aria-hidden
              className="hidden md:block absolute left-8 top-3 bottom-3 w-0.5 bg-linear-to-b from-transparent via-primary/40 to-transparent"
            />

            <div className="space-y-5 md:space-y-6">
              {flagshipProjects.map((project, index) => (
                <PearlProjectCard
                  key={project.name}
                  project={project}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="page-container mt-16">
          <motion.div
            variants={sectionIntro}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-90px" }}
            className="rounded-3xl border border-outline-variant/65 bg-surface-container-low p-7 md:p-10"
          >
            <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-primary mb-4">
              Supporting Detail
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {evidenceBlocks.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={cardReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-90px" }}
                  transition={{ delay: Math.min(index * 0.04, 0.2) }}
                  className="rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-5"
                >
                  <p className="font-display text-[1.45rem] leading-none text-on-surface mb-2">
                    {item.value}
                  </p>
                  <p className="text-[0.75rem] leading-snug uppercase tracking-[0.08em] text-on-surface-variant font-semibold">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="page-container mt-16 space-y-10">
          <motion.div
            variants={sectionIntro}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-90px" }}
            className="mb-4"
          >
            {/* <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-primary mb-3">
              People Involved
            </p> */}
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.3rem)] leading-[1.1] tracking-tight">
              The Team Behind the Work
            </h2>
            {/* <p className="mt-3 text-sm text-on-surface-variant max-w-2xl">
              Two focus lines: core leadership first, then the paradigm heads guiding each domain.
            </p> */}
          </motion.div>

          <TeamMarquee
            title="Leadership"
            // description="The core team steering K-Hub"
            people={leadershipTeam}
            reduceMotion={reduceMotion}
            duration="26s"
            loop={false}
          />

          <TeamMarquee
            title="Paradigm Heads"
            // description="Domain leaders keeping each vertical on pace"
            people={paradigmHeads}
            reduceMotion={reduceMotion}
            duration="32s"
            enableManualScroll
          />
        </section>
      </main>
    </>
  );
}
