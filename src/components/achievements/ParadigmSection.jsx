"use client";

import * as React from "react";
import Image from "next/image";
import { ExternalLink, FlaskConical } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function renderDetailsWithLinks(text) {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  const parts = text.split(urlRegex);
  
  return parts.map((part, idx) => {
    if (urlRegex.test(part)) {
      const url = part.startsWith('http') ? part : `https://${part}`;
      return (
        <a
          key={idx}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
        >
          {part} <ExternalLink className="w-3 h-3 inline" />
        </a>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

async function fetchParadigmScrape(id) {
  const response = await fetch(`/api/achievements/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch paradigm data");
  }
  return response.json();
}

export function ParadigmSection({ paradigm }) {
  const Icon = paradigm.icon;
  const [view, setView] = useState("achievements"); // "achievements" | "research"
  
  const { data: scraped, isLoading } = useQuery({
    queryKey: ["paradigm-scrape", paradigm.id],
    queryFn: () => fetchParadigmScrape(paradigm.id),
  });

  const achievements = scraped?.isScraped ? (scraped.achievements ?? []) : [];
  const isDrugParadigm = paradigm.id === "drug-paradigm";

  // Logic for filtering top 5
  const displayItems = React.useMemo(() => {
    const filterPlaceholders = (items) => items.filter(a => 
      !a.title?.toLowerCase().includes("placeholder") && 
      !a.details?.toLowerCase().includes("placeholder") &&
      !a.title?.toLowerCase().includes("pending")
    );

    if (view === "achievements") {
      // For Drug Paradigm, all items are research, so achievements view should be empty
      if (isDrugParadigm) return [];
      
      const filtered = achievements.filter(a => a.category !== "Research" && !a.url);
      return filterPlaceholders(filtered).slice(0, 5);
    } else {
      // For research, prioritize items with URLs or "paper" keywords
      const research = isDrugParadigm 
        ? achievements 
        : achievements.filter(a => 
            a.category === "Research" ||
            a.url || 
            a.details?.toLowerCase().includes("paper") || 
            a.details?.toLowerCase().includes("research") ||
            a.title?.toLowerCase().includes("study")
          );
      return filterPlaceholders(research).slice(0, 5);
    }
  }, [achievements, view, isDrugParadigm]);

  // Default to research for Drug Paradigm on load
  useEffect(() => {
    if (isDrugParadigm) {
      setView("research");
    }
  }, [isDrugParadigm]);
  const photos = scraped?.photos ?? paradigm.photos ?? [];
  const hero = photos[0];

  const [hoveredAchievementKey, setHoveredAchievementKey] = React.useState(null);

  return (
    <section
      id={paradigm.id}
      className="relative py-12 sm:py-24"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, ${paradigm.color}08 0%, transparent 60%)`
      }}
    >
      {/* ── Hero banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative page-container rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-14 shadow-lg sm:shadow-2xl shadow-primary/5 border border-on-surface/5"
        style={{ minHeight: "clamp(200px, 40vw, 380px)" }}
      >
        {isLoading ? (
          <Skeleton className="absolute inset-0 w-full h-full" />
        ) : hero ? (
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            className="object-cover"
            priority={paradigm.id === "drug-paradigm"}
          />
        ) : (
          <div className="absolute inset-0 bg-primary/5" />
        )}
        {/* Theme-aware gradient over image */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(120deg, var(--color-on-surface) 0%, var(--color-on-surface)/0.6 50%, ${paradigm.color}33 100%)`,
            mixBlendMode: 'multiply',
            opacity: 0.85
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(120deg, rgba(0,0,0,0.4) 0%, transparent 100%)`
          }}
        />
        {/* Accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-3xl"
          style={{ background: paradigm.color }}
        />
        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8 lg:p-12">
          <div
            className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border mb-2 sm:mb-4 self-start backdrop-blur-md"
            style={{ borderColor: `${paradigm.color}60`, background: `${paradigm.color}22` }}
          >
            <Icon className="w-3 sm:w-4 h-3 sm:h-4" style={{ color: paradigm.color }} />
            <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase" style={{ color: paradigm.color }}>
              {paradigm.name}
            </span>
          </div>
          <h2 className="font-display text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-1.5 sm:mb-3">
            {paradigm.tagline}
          </h2>
          <p className="text-white/80 max-w-xl text-xs sm:text-base leading-relaxed font-light line-clamp-3 sm:line-clamp-none">
            {paradigm.description}
          </p>
          { (scraped?.url ?? paradigm.url) ? (
            <a
              href={scraped?.url ?? paradigm.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 sm:mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 cursor-pointer"
            >
              Visit paradigm site
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden />
            </a>
          ) : (
            <div className="mt-3 sm:mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white/50 backdrop-blur-md cursor-default">
              Coming soon
            </div>
          )}
        </div>
      </motion.div>

      <div className="page-container flex justify-center">
        {/* ── Content Section with Toggle ── */}
        <div className="w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-black tracking-[0.2em] uppercase"
              style={{ color: paradigm.color }}
            >
              {view === "achievements" ? "Key Achievements" : "Research Highlights"}
            </motion.h3>

            <div className="flex p-1 bg-surface-container-low rounded-xl border border-outline-variant/40 shadow-inner w-fit">
              <button
                onClick={() => setView("achievements")}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                  view === "achievements"
                    ? "bg-surface shadow-sm border border-outline-variant/20"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
                style={view === "achievements" ? { color: paradigm.color } : {}}
              >
                Top 5 Milestones
              </button>
              <button
                onClick={() => setView("research")}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                  view === "research"
                    ? "bg-surface shadow-sm border border-outline-variant/20"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
                style={view === "research" ? { color: paradigm.color } : {}}
              >
                Latest 5 Research
              </button>
            </div>
          </div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div
              className="absolute top-2 bottom-2 w-px"
              style={{
                left: 20,
                background: `linear-gradient(to bottom, ${paradigm.color}60, transparent)`
              }}
            />
            <div className="space-y-4 sm:space-y-6">
              {isLoading ? (
                Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex gap-3 sm:gap-5">
                    <div className="flex-shrink-0 mt-1 relative z-10">
                      <Skeleton className="w-10 h-10 rounded-full" />
                    </div>
                    <Skeleton className="flex-1 h-24 rounded-2xl" />
                  </div>
                ))
              ) : (scraped?.isScraped && displayItems.length > 0) ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={view}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    {displayItems.map((a, i) => {
                      const key = `${paradigm.id}-${view}-${i}`;
                      const showHoverPreview = hoveredAchievementKey === key;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="flex gap-3 sm:gap-5"
                        >
                          {/* Dot */}
                          <div className="flex-shrink-0 mt-1 relative z-10">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-black shadow-lg"
                              style={{
                                background: `var(--color-surface)`,
                                border: `2px solid ${paradigm.color}`,
                                color: paradigm.color,
                              }}
                            >
                              {view === "achievements" ? a.year.slice(2) : <FlaskConical className="w-4 h-4" />}
                            </div>
                          </div>
                          <motion.div
                            role="button"
                            tabIndex={0}
                            onMouseEnter={() => setHoveredAchievementKey(key)}
                            onMouseLeave={() => setHoveredAchievementKey(null)}
                            onFocus={() => setHoveredAchievementKey(key)}
                            onBlur={() => setHoveredAchievementKey(null)}
                            onClick={() => {
                              if (a.url) {
                                window.open(a.url, '_blank');
                              }
                            }}
                            className="flex-1 min-w-0 rounded-2xl border p-3 sm:p-5 text-left shadow-sm backdrop-blur-sm transition-all hover:shadow-md h-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 cursor-pointer group"
                            style={{
                              background: "color-mix(in oklab, var(--color-surface-container-low) 50%, transparent)",
                              borderColor: showHoverPreview ? `${paradigm.color}40` : "var(--color-surface-container-high)",
                            }}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className="text-[9px] sm:text-[10px] font-bold tracking-widest"
                                style={{ color: paradigm.color }}
                              >
                                {a.month ? `${MONTHS[a.month - 1]} ${a.year}` : a.year}
                              </span>
                              {view === "research" && (
                                <span className="text-[8px] font-black uppercase tracking-tighter bg-primary/10 text-primary px-1.5 py-0.5 rounded-sm">Paper</span>
                              )}
                            </div>
                            <h4 className="text-on-surface font-semibold text-sm sm:text-base leading-snug group-hover:text-primary transition-colors">{a.title}</h4>
                            <AnimatePresence initial={false}>
                              {showHoverPreview && (
                                <motion.div
                                  key="preview"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2, ease: "easeOut" }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed font-light">
                                    <div className="details-text break-words">{renderDetailsWithLinks(a.details)}</div>
                                    {a.url && (
                                      <div
                                        role="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          window.open(a.url, '_blank');
                                        }}
                                        className="mt-2 inline-flex items-center gap-1 text-primary font-semibold hover:underline cursor-pointer"
                                      >
                                        Visit Source <ExternalLink className="w-3 h-3" />
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div 
                  className="ml-14 sm:ml-16 p-6 rounded-2xl border border-dashed border-on-surface/10 bg-on-surface/[0.02] flex flex-col items-center justify-center text-center group"
                >
                  <div 
                    className="w-12 h-12 rounded-full mb-4 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity"
                    style={{ backgroundColor: paradigm.color }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-on-surface/60 mb-1">Coming Soon</p>
                  <p className="text-xs text-on-surface-variant max-w-[240px] leading-relaxed">
                    Achievements and live data for {paradigm.name} are currently being aggregated.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Section divider */}
      <div
        className="page-container mt-12 sm:mt-24 h-px opacity-10"
        style={{ background: `linear-gradient(to right, transparent, ${paradigm.color}, transparent)` }}
      />
    </section>
  );
}
