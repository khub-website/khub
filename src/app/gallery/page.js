"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const STOCK_COMPANIES = [
  {
    id: 1,
    name: "Drugparadigm",
    batch: "2024",
    tagline: "AI-Driven Drug Discovery.",
    leftImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop",
    rightImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Cyberparadigm",
    batch: "2025",
    tagline: "Cybersecurity Training",
    leftImage: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=600&auto=format&fit=crop",
    rightImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Roboparadigm",
    batch: "2025",
    tagline: "Robotics & Lab Automation",
    leftImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    rightImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Neuroparadigm",
    batch: "2026",
    tagline: "AI-Driven Mental Wellness",
    leftImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    rightImage: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Neutraparadigm",
    batch: "2026",
    tagline: "Functional Foods & Supplements",
    leftImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
    rightImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Crystalparadigm",
    batch: "2026",
    tagline: "Materials Science",
    leftImage: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=600&auto=format&fit=crop",
    rightImage: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function GalleryPage() {
  const [active, setActive] = useState(-1); // Start at -1 to hide assets during Hero
  const [isMounted, setIsMounted] = useState(false);
  const refs = useRef([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Intersection Observer for scroll tracking
  useEffect(() => {
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.getAttribute("data-index")));
          }
        });
      },
      { 
        threshold: 0.6, 
        rootMargin: "-20% 0px -20% 0px" // Tighter margin for precise centering detection
      }
    );

    // Also observe the Hero to reset active state
    const hero = document.querySelector("#gallery-hero");
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(-1);
      },
      { threshold: 0.5 }
    );

    if (hero) heroObserver.observe(hero);
    const currentRefs = refs.current;
    currentRefs.forEach((el) => el && observer.observe(el));
    
    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, [isMounted]);

  // Prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen selection:bg-primary selection:text-white">
      <Navbar />

      <main className="snap-y snap-mandatory pt-24 lg:pt-0">
        {/* HERO SECTION */}
        <section id="gallery-hero" className="min-h-screen flex flex-col justify-center px-[6vw] border-b border-outline-variant/10 snap-start">
          <motion.h1 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(44px,7.5vw,105px)] leading-[0.98] max-w-[950px] font-bold tracking-tight mb-8"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            The startups we run.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl leading-relaxed max-w-[750px] text-on-surface-variant font-light"
          >
            From first idea to global scale, explore our startups, innovation stories, and the builders shaping tomorrow.
          </motion.p>
        </section>

        {/* GALLERY SCROLL CONTENT */}
        <section className="max-w-[1450px] mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.1fr_1.15fr] gap-12 px-8 relative snap-start">
          
          {/* LEFT: STICKY ASSETS */}
          <div className="hidden lg:block relative">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: active >= 0 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-1/2 -translate-y-1/2 space-y-8"
            >
              <div className="relative w-full h-[300px] rounded-[32px] overflow-hidden shadow-2xl shadow-on-surface/5 ring-1 ring-on-surface/10 bg-surface-container-low">
                <Image
                  key={`left-${active}`}
                  src={STOCK_COMPANIES[active >= 0 ? active : 0].leftImage}
                  alt="Feature Context"
                  fill
                  priority
                  className="object-cover transition-opacity duration-300"
                />
              </div>

              <div className="space-y-4">
                <div className="h-px bg-outline-variant/30 w-full" />
                <div className="flex justify-between items-center px-1">
                    <span className="text-primary font-bold tracking-[0.28em] uppercase text-[0.68rem]">
                      Batch {STOCK_COMPANIES[active >= 0 ? active : 0].batch}
                    </span>
                  <div className="flex gap-1.5">
                    {STOCK_COMPANIES.map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${active === i ? 'bg-primary w-4' : 'bg-outline-variant/40'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* MIDDLE: SCROLLING TITLES with SNAPPING */}
          <div className="space-y-[10vh]">
            {/* Top Spacer to help the first item align */}
            <div className="h-[20vh]" />

            {STOCK_COMPANIES.map((company, index) => {
              const mainName = company.name.replace(/paradigm/i, "");
              return (
                <div
                  key={company.id}
                  ref={(el) => (refs.current[index] = el)}
                  data-index={index}
                  className="min-h-[100vh] flex items-center justify-center snap-center"
                >
                  <div className="text-center">
                    <h2 
                      className={`text-[clamp(68px,9vw,110px)] leading-[0.85] transition-all duration-700 ease-in-out ${
                        active === index ? "opacity-100 translate-y-0 scale-100" : "opacity-10 translate-y-8 scale-90"
                      }`}
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      <div className="font-bold tracking-tight">{mainName}</div>
                      <div className="text-[0.45em] tracking-[0.2em] text-on-surface-variant/80 font-medium mt-4">
                        PARADIGM
                      </div>
                    </h2>
                    <div className={`mt-10 overflow-hidden transition-all duration-700 delay-200 ${active === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <p className="text-on-surface-variant text-lg font-light max-w-sm mx-auto leading-relaxed">
                          {company.tagline}
                        </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* LARGE BOTTOM SPACER inside the scroller to keep the parent tall and assets sticky */}
            <div className="h-[100vh]" />
          </div>

          {/* RIGHT: HERO ASSET */}
          <div className="hidden lg:block relative">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: active >= 0 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-1/2 -translate-y-1/2"
            >
              <div className="relative w-full h-[680px] rounded-[42px] overflow-hidden shadow-2xl shadow-on-surface/10 ring-1 ring-on-surface/10 bg-surface-container-low">
                <Image
                  key={`right-${active}`}
                  src={STOCK_COMPANIES[active >= 0 ? active : 0].rightImage}
                  alt={STOCK_COMPANIES[active >= 0 ? active : 0].name}
                  fill
                  priority
                  className="object-cover transition-opacity duration-500"
                  sizes="(max-width: 1450px) 40vw, 650px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/15 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
      </section>
    </main>

      <Footer />
    </div>
  );
}
