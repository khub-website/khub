import { NextResponse } from "next/server";

const paradigmsData = {
  "drug-paradigm": {
    achievements: [],
    photos: [
      { src: "/achievements/drug-hero.jpg", alt: "Molecular simulation" },
    ],
  },
  "robo-paradigm": {
    achievements: [],
    photos: [
      { src: "/achievements/robo-hero.jpg", alt: "Humanoid robot" },
    ],
  },
  "cyber-paradigm": {
    achievements: [],
    photos: [
      { src: "/achievements/cyber-hero.jpg", alt: "Security dashboard" },
    ],
  },
  "neuro-paradigm": {
    achievements: [],
    photos: [
      { src: "/achievements/neuro-hero.jpeg", alt: "Neural interface" },
    ],
  },
  "crystal-paradigm": {
    achievements: [],
    photos: [
      { src: "/achievements/crystal-hero.png", alt: "Crystal lattice" },
    ],
  },
  "nutra-paradigm": {
    achievements: [],
    photos: [
      { src: "/achievements/nutra-hero.png", alt: "Bio-data visualization" },
    ],
  },
};

async function getDynamicDrugAchievements() {
  try {
    const response = await fetch("https://api.drugparadigm.com/paper/all");
    if (!response.ok) throw new Error("API unreachable");
    const papers = await response.json();
    
    // Sort by date (YYYY-MM-DD) descending and take top 5
    return papers
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5)
      .map(p => {
        const [yearStr, monthStr] = p.date.split("-");
        return {
          year: yearStr,
          month: monthStr ? parseInt(monthStr, 10) : undefined,
          title: p.title.split(":")[0]?.trim() || p.title,
          desc: `Research by ${p.authors.slice(0, 2).join(", ")}${p.authors.length > 2 ? " et al." : ""}`,
          details: `${p.title}. Published on ${p.date}. Website: ${p.url}`,
          url: p.url
        };
      });
  } catch (error) {
    console.error("Scraping failed, falling back to static data:", error);
    return null;
  }
}

export async function GET(request, { params }) {
  const { id } = await params;
  const data = paradigmsData[id];

  if (!data) {
    return NextResponse.json({ message: "Paradigm not found" }, { status: 404 });
  }

  const result = { ...data, isScraped: false };

  if (id === "drug-paradigm") {
    const dynamicAchievements = await getDynamicDrugAchievements();
    if (dynamicAchievements) {
      result.achievements = dynamicAchievements;
      result.isScraped = true;
    }
    result.siteUrl = "https://drugparadigm.com/";
  } else {
    // Other paradigms don't have scrapers yet, so they remain isScraped: false
    result.siteUrl = `https://k-hub.org/paradigms/${id}`;
  }

  return NextResponse.json(result);
}

