"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, SlidersHorizontal, Clock, Search, Share2, ArrowUpDown } from "lucide-react";
import { useQueries } from "@tanstack/react-query";
import { paradigms } from "./ParadigmData";
import { ImpactBadge } from "./ImpactBadge";

const fetchParadigmScrape = async (id) => {
  const response = await fetch(`/api/achievements/${id}`);
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};

export function AllAchievementsGrid() {
  const [paradigmFilter, setParadigmFilter] = useState(undefined);
  const [impactFilter, setImpactFilter] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest"); // 'latest' | 'alphabetical'
  const [hoveredId, setHoveredId] = useState(null);

  const results = useQueries({
    queries: paradigms.map((p) => ({
      queryKey: ["paradigm-scrape", p.id],
      queryFn: () => fetchParadigmScrape(p.id),
      staleTime: 1000 * 60 * 5,
    })),
  });

  const allAchievements = useMemo(() => {
    const list = [];
    results.forEach((res, idx) => {
      const pId = paradigms[idx].id;
      if (res.data && res.data.achievements) {
        res.data.achievements.forEach((a, aIdx) => {
          list.push({
            ...a,
            id: `${pId}-${aIdx}`,
            paradigmId: pId,
            paradigm: paradigms[idx],
            impact: aIdx === 0 ? "breakthrough" : (aIdx % 2 === 0 ? "high" : "medium"),
            category: pId === "drug-paradigm" ? "Research" : (a.category || "Achievement")
          });
        });
      }
    });
    return list;
  }, [results]);

  const filteredAndSorted = useMemo(() => {
    let result = allAchievements.filter((a) => {
      // 1. Strict category filtering: Only show "Achievement" in this grid
      if (a.category === "Research") return false;

      // 2. Placeholder removal
      const isPlaceholder = 
        a.title.toLowerCase().includes("placeholder") || 
        a.desc.toLowerCase().includes("placeholder") ||
        a.title.toLowerCase().includes("pending") ||
        a.desc.toLowerCase().includes("pending");
      
      if (isPlaceholder) return false;

      const matchesParadigm = paradigmFilter ? a.paradigmId === paradigmFilter : true;
      const matchesImpact = impactFilter ? a.impact === impactFilter : true;
      const matchesSearch = searchQuery 
        ? a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          a.desc.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesParadigm && matchesImpact && matchesSearch;
    });

    if (sortBy === "latest") {
      result.sort((a, b) => b.year.localeCompare(a.year));
    } else {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [allAchievements, paradigmFilter, impactFilter, searchQuery, sortBy]);

  const handleShare = (achievement) => {
    const text = `Check out this achievement from K-Hub: ${achievement.title}`;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: achievement.title, text, url });
    } else {
      navigator.clipboard.writeText(`${text} - ${url}`);
      alert("Link copied to clipboard!");
    }
  };

  const isLoading = results.some((r) => r.isLoading);

  return (
    <div id="all-achievements">
      {/* Search & Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-10">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-light"
            />
          </div>
          <div className="flex items-center gap-2 bg-surface border border-outline-variant/40 rounded-xl px-3 py-2 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-on-surface-variant" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-on-surface-variant focus:outline-none cursor-pointer pr-2"
            >
              <option value="latest">Sort by Latest</option>
              <option value="alphabetical">Sort by Alphabetical</option>
            </select>
          </div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-surface border border-outline-variant/50 rounded-2xl p-6 mb-10 flex flex-wrap gap-8 items-start"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[0.65rem] font-black text-on-surface-variant uppercase tracking-[0.15em]">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Paradigm
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setParadigmFilter(undefined)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${paradigmFilter === undefined ? "bg-primary text-white border-primary shadow-md shadow-primary/20" : "bg-surface-container-low border-outline-variant text-on-surface-variant hover:border-primary/40"}`}
            >All</button>
            {paradigms.map((p) => (
              <button
                key={p.id}
                onClick={() => setParadigmFilter(paradigmFilter === p.id ? undefined : p.id)}
                className="px-4 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-2"
                style={paradigmFilter === p.id 
                  ? { backgroundColor: p.color, borderColor: p.color, color: "white", boxShadow: `0 4px 12px ${p.color}33` }
                  : { background: "var(--color-surface-container-low)", borderColor: "var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}
              >
                <p.icon className="w-3 h-3" /> {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[0.65rem] font-black text-on-surface-variant uppercase tracking-[0.15em]">
            <Clock className="w-3.5 h-3.5" /> Impact Level
          </div>
          <div className="flex gap-2 flex-wrap">
            {[undefined, "breakthrough", "high", "medium", "low"].map((level) => (
              <button
                key={level ?? "all"}
                onClick={() => setImpactFilter(level)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all capitalize ${impactFilter === level ? "bg-primary text-white border-primary shadow-md shadow-primary/20" : "bg-surface-container-low border-outline-variant text-on-surface-variant hover:border-primary/40"}`}
              >
                {level ?? "All Levels"}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Results Grid */}
      <div className="min-h-[400px]">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-surface-container-low rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredAndSorted.length === 0 ? (
          <div className="text-center py-32 text-on-surface-variant">
            <Trophy className="w-16 h-16 mx-auto mb-4 opacity-10" />
            <p className="font-bold text-xl">No achievements match your search</p>
            <p className="text-sm font-light mt-2">Try different keywords or filters.</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredAndSorted.map((a) => (
                <motion.div
                  key={a.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-surface border border-outline-variant/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-default flex flex-col"
                  onMouseEnter={() => setHoveredId(a.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Top Accent */}
                  <div className="h-1.5 w-full" style={{ backgroundColor: a.paradigm.color }} />
                  
                  {/* Visual Strip */}
                  <div 
                    className="h-24 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${a.paradigm.color}22, ${a.paradigm.color}08)` }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                       <a.paradigm.icon className="w-32 h-32" />
                    </div>
                    <div className="absolute inset-0 p-4 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                         <ImpactBadge impact={a.impact} />
                         <span className="text-[10px] font-black text-on-surface/40 bg-surface/80 backdrop-blur-md px-2 py-0.5 rounded-md">{a.year}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                         <div className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center">
                           <a.paradigm.icon className="w-3 h-3" style={{ color: a.paradigm.color }} />
                         </div>
                         <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface/70">{a.paradigm.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-on-surface text-base leading-tight mb-3 group-hover:text-primary transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm font-light leading-relaxed line-clamp-3 mb-6">
                      {a.desc}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-md uppercase tracking-widest">{a.category || "Research"}</span>
                       </div>
                       <button 
                          onClick={() => handleShare(a)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-primary transition-all text-[10px] font-bold border border-transparent hover:border-outline-variant/30 shadow-sm hover:shadow-md"
                          title="Share"
                       >
                          <Share2 className="w-3 h-3" /> Share
                       </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
