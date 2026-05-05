"use client";

import { Trophy, FlaskConical, Users, Zap, BookOpen } from "lucide-react";
import { StatCard } from "./StatCard";
import { paradigms } from "./ParadigmData";

export function StatsSection() {
  // Calculate stats from ParadigmData
  const totalParadigms = paradigms.length;
  // This is just a base count, actual count will be higher after API fetches, 
  // but for the overview we show a representative set.
  const totalAchievements = 42; // Mock total or sum from static data
  const totalMembers = 150;
  const breakthroughCount = 12;
  const publishedResearchCount = 28;

  return (
    <section id="stats" className="page-container py-16 -mt-8 relative z-20">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatCard 
          label="Paradigms" 
          value={totalParadigms} 
          icon={<BookOpen className="w-5 h-5" />} 
          delay={0} 
        />
        <StatCard 
          label="Achievements" 
          value={totalAchievements} 
          icon={<Trophy className="w-5 h-5" />} 
          delay={100} 
        />
        <StatCard 
          label="Active Research" 
          value={publishedResearchCount} 
          icon={<FlaskConical className="w-5 h-5" />} 
          delay={200} 
        />
        <StatCard 
          label="Lab Members" 
          value={totalMembers} 
          icon={<Users className="w-5 h-5" />} 
          delay={300} 
        />
        <StatCard 
          label="Breakthroughs" 
          value={breakthroughCount} 
          icon={<Zap className="w-5 h-5" />} 
          delay={400} 
          colorClass="text-amber-600"
        />
        <StatCard 
          label="Publications" 
          value={publishedResearchCount} 
          icon={<BookOpen className="w-5 h-5" />} 
          delay={500} 
          colorClass="text-emerald-600"
        />
      </div>
    </section>
  );
}
