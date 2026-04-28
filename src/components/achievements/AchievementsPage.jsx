import { useRouter } from "next/navigation";
import { AchievementsHero } from "./AchievementsHero";
import { ParadigmSection } from "./ParadigmSection";
import { PearlNav } from "./PearlNav";
import { paradigms } from "./ParadigmData";

export function AchievementsPage() {
  const router = useRouter();

  const handleContactClick = (e) => {
    e.preventDefault();
    router.push("/");
    const scrollAfterNav = () => {
      const el = document.querySelector("#contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        requestAnimationFrame(scrollAfterNav);
      }
    };
    setTimeout(scrollAfterNav, 400);
  };

  return (
    <main className="bg-surface min-h-screen text-on-surface">
      <AchievementsHero />
      
      <div className="relative">
        {paradigms.map((paradigm) => (
          <ParadigmSection 
            key={paradigm.id} 
            paradigm={paradigm} 
          />
        ))}
      </div>

      <footer className="py-24 text-center border-t border-surface-container-low relative overflow-hidden bg-surface-container-lowest">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,108,81,0.03)_0%,transparent_60%)] pointer-events-none" />
        <div className="page-container relative z-10">
          <h2
            className="font-display text-2xl md:text-3xl font-bold mb-4 text-on-surface"
          >
            Achievements Portal
          </h2>
          <p className="text-on-surface-variant mb-8 max-w-md mx-auto text-sm leading-relaxed font-light">
            A comprehensive archive of AI paradigms and their defining milestones across the decade.
          </p>
          <a
            href="/#contact"
            onClick={handleContactClick}
            className="inline-block px-10 py-3.5 rounded-lg bg-primary text-surface text-sm font-semibold tracking-tight shadow-lg shadow-primary/20 transition-all hover:brightness-95 hover:shadow-primary/30 hover:-translate-y-0.5 mb-10"
          >
            Get In Touch
          </a>

          <div className="flex justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/10" />
          </div>
        </div>
      </footer>

      <PearlNav />
    </main>
  );
}
