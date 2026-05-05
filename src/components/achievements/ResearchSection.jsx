"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, ChevronDown, Tag, User, Calendar, ExternalLink } from "lucide-react";
import { useQueries } from "@tanstack/react-query";
import { paradigms } from "./ParadigmData";
import { StatusBadge } from "./StatusBadge";

const fetchParadigmScrape = async (id) => {
  const response = await fetch(`/api/achievements/${id}`);
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};

export function ResearchSection() {
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [activeTag, setActiveTag] = useState(undefined);

  const results = useQueries({
    queries: paradigms.map((p) => ({
      queryKey: ["paradigm-scrape", p.id],
      queryFn: () => fetchParadigmScrape(p.id),
      staleTime: 1000 * 60 * 10,
    })),
  });

  const researchItems = useMemo(() => {
    const list = [];
    results.forEach((res, idx) => {
      if (res.data && res.data.achievements) {
        const pId = paradigms[idx].id;
        const isScraped = res.data.isScraped;

        res.data.achievements.forEach((a, aIdx) => {
          // Identify as research if:
          // 1. Specifically labeled as Research
          // 2. In DrugParadigm (as per user rule)
          // 3. Has a URL (likely a paper)
          const isResearch = 
            pId === "drug-paradigm" || 
            a.category === "Research" || 
            a.url || 
            (isScraped && a.desc?.toLowerCase().includes("research"));

          if (isResearch) {
            // Remove placeholders from Research too
            const isPlaceholder = 
              a.title.toLowerCase().includes("placeholder") || 
              a.desc.toLowerCase().includes("placeholder") ||
              a.title.toLowerCase().includes("pending");
            
            if (isPlaceholder) return;

            list.push({
              ...a,
              id: `research-${pId}-${aIdx}`,
              paradigmId: pId,
              paradigm: paradigms[idx],
              status: aIdx === 0 ? "published" : "peer-review",
              authors: a.desc?.includes("Research by") ? a.desc.replace("Research by ", "").split(", ") : ["K-Hub Research Team"],
              abstract: a.details || "Abstract pending publication review.",
              tags: [paradigms[idx].name, "Applied AI", aIdx % 2 === 0 ? "Deep Learning" : "Neural Systems"],
              publishedYear: a.year
            });
          }
        });
      }
    });
    return list;
  }, [results]);

  const toggle = (id) => {
    setExpandedIds((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id); else s.add(id);
      return s;
    });
  };

  const allTags = [...new Set(researchItems.flatMap((r) => r.tags))].sort();
  const filtered = researchItems.filter((r) => (!activeTag || r.tags.includes(activeTag)));
  const isLoading = results.some(r => r.isLoading);

  if (!isLoading && researchItems.length === 0) return null;

  return (
    <div id="research">
      {/* Tags Filter */}
      <div className="flex items-center gap-3 flex-wrap mb-10">
        <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest flex items-center gap-1.5 mr-2">
          <Tag className="w-3.5 h-3.5" /> Filter Tags:
        </span>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? undefined : tag)}
            className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${activeTag === tag ? "bg-primary text-white border-primary shadow-md" : "bg-surface border-outline-variant text-on-surface-variant hover:border-primary/40"}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {isLoading ? (
          [...Array(3)].map((_, i) => <div key={i} className="h-24 bg-surface-container-low rounded-2xl animate-pulse" />)
        ) : filtered.map((r) => {
          const isExpanded = expandedIds.has(r.id);
          return (
            <motion.div
              key={r.id}
              layout
              className="bg-surface border border-outline-variant/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button 
                className="w-full text-left p-6 sm:p-8 hover:bg-primary/[0.02] transition-colors"
                onClick={() => toggle(r.id)}
              >
                <div className="flex items-start gap-6 justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <StatusBadge status={r.status} />
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-on-surface/60 bg-surface-container-low px-2 py-0.5 rounded-md">
                        <r.paradigm.icon className="w-3 h-3" /> {r.paradigm.name}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                        <Calendar className="w-3 h-3" /> {r.publishedYear}
                      </span>
                    </div>
                    <h3 className="font-bold text-on-surface text-base sm:text-lg leading-tight group-hover:text-primary">{r.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <User className="w-3 h-3 text-on-surface-variant" />
                      <p className="text-[11px] text-on-surface-variant font-medium">{r.authors.join(", ")}</p>
                    </div>
                  </div>
                  <motion.div 
                    animate={{ rotate: isExpanded ? 180 : 0 }} 
                    className="text-on-surface-variant shrink-0 mt-2"
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                </div>
              </button>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-8 pb-8 pt-0 border-t border-outline-variant/20">
                      <div className="mt-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-primary mb-3">Abstract</h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed font-light">{r.abstract}</p>
                      </div>
                      
                      <div className="mt-8 flex flex-wrap gap-2 items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {r.tags.map(tag => (
                            <span key={tag} className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-surface-container-low text-on-surface/60">#{tag}</span>
                          ))}
                        </div>
                        {r.url && (
                          <a 
                            href={r.url} 
                            target="_blank" 
                            className="flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                          >
                            Read Full Paper <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Add useMemo to imports
import { useMemo } from "react";
