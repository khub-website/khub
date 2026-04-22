"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// Helper function to render text with clickable links
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
  
  const { data: scraped, isLoading } = useQuery({
    queryKey: ["paradigm-scrape", paradigm.id],
    queryFn: () => fetchParadigmScrape(paradigm.id),
  });

  const achievements = scraped?.achievements ?? paradigm.achievements ?? [];
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
        className="relative mx-3 sm:mx-6 lg:mx-16 rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-14 shadow-lg sm:shadow-2xl shadow-primary/5 border border-on-surface/5"
        style={{ minHeight: "clamp(200px, 40vw, 380px)" }}
      >
        {isLoading ? (
          <Skeleton className="absolute inset-0 w-full h-full" />
        ) : hero ? (
          <img
            src={hero.src}
            alt={hero.alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
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
          <a
            href={scraped?.siteUrl ?? paradigm.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 sm:mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            Visit paradigm site
            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden />
          </a>
        </div>
      </motion.div>

      <div className="mx-3 sm:mx-6 lg:mx-16 flex justify-center">
        {/* ── Achievements timeline ── */}
        <div className="w-full max-w-2xl">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-widest uppercase mb-6 sm:mb-8"
            style={{ color: paradigm.color }}
          >
            Key Achievements
          </motion.h3>
          <div className="relative">
            {/* Vertical timeline line — pinned to the dot column (20px from left) */}
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
              ) : achievements.length > 0 ? (
                achievements.map((a, i) => {
                  const key = `${paradigm.id}-${i}`;
                  const showHoverPreview = hoveredAchievementKey === key;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
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
                          {a.year.slice(2)}
                        </div>
                      </div>
                      <motion.div
                        key={i}
                        role="button"
                        tabIndex={0}
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        onMouseEnter={() => setHoveredAchievementKey(key)}
                        onMouseLeave={() => setHoveredAchievementKey(null)}
                        onFocus={() => setHoveredAchievementKey(key)}
                        onBlur={() => setHoveredAchievementKey(null)}
                        onClick={() => {
                          if (a.url) {
                            window.open(a.url, '_blank');
                          }
                        }}
                        onKeyDown={(e) => {
                          if ((e.key === 'Enter' || e.key === ' ') && a.url) {
                            e.preventDefault();
                            window.open(a.url, '_blank');
                          }
                        }}
                        className="flex-1 min-w-0 rounded-2xl border p-3 sm:p-5 text-left shadow-sm backdrop-blur-sm transition-all hover:shadow-md h-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 cursor-pointer"
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
                        </div>
                        <h4 className="text-on-surface font-semibold text-sm sm:text-base leading-snug">{a.title}</h4>
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
                })
              ) : (
                <p className="text-xs text-on-surface-variant ml-14 sm:ml-16 italic font-light">No achievements found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div
        className="mx-3 sm:mx-6 lg:mx-16 mt-12 sm:mt-24 h-px opacity-10"
        style={{ background: `linear-gradient(to right, transparent, ${paradigm.color}, transparent)` }}
      />
    </section>
  );
}
