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

function decodeJavaScriptString(doubleQuoted, singleQuoted) {
  if (doubleQuoted !== undefined) {
    return JSON.parse(`"${doubleQuoted}"`);
  }

  return JSON.parse(`"${singleQuoted.replace(/"/g, '\\"').replace(/\\'/g, "'")}"`);
}

async function getDynamicNeuroAchievements() {
  try {
    const siteUrl = "https://neuroparadigm.in/";
    const siteResponse = await fetch(siteUrl, { next: { revalidate: 3600 } });
    if (!siteResponse.ok) throw new Error(`NeuroParadigm site returned ${siteResponse.status}`);

    const html = await siteResponse.text();
    const scriptPath = html.match(/<script\b[^>]*\bsrc=["']([^"']+\.js(?:\?[^"']*)?)["'][^>]*>/i)?.[1];
    if (!scriptPath) throw new Error("NeuroParadigm achievement script was not found");

    const scriptUrl = new URL(scriptPath, siteUrl);
    if (scriptUrl.origin !== new URL(siteUrl).origin) {
      throw new Error("NeuroParadigm achievement script is hosted on an unexpected origin");
    }

    const scriptResponse = await fetch(scriptUrl, { next: { revalidate: 3600 } });
    if (!scriptResponse.ok) throw new Error(`NeuroParadigm script returned ${scriptResponse.status}`);

    const script = await scriptResponse.text();
    const achievementPattern = /\{date:(?:"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'),title:(?:"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'),description:(?:"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)')\}/g;
    const achievements = Array.from(script.matchAll(achievementPattern), (match) => {
      const date = decodeJavaScriptString(match[1], match[2]);
      const title = decodeJavaScriptString(match[3], match[4]);
      const description = decodeJavaScriptString(match[5], match[6]);

      if (!/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/.test(date) || !title || !description) {
        return null;
      }

      return {
        year: date.slice(0, 4),
        title,
        desc: description,
        details: `${description} Source: ${siteUrl}#achievements`,
        category: "Achievement",
        url: `${siteUrl}#achievements`,
      };
    }).filter(Boolean);

    if (achievements.length === 0) {
      throw new Error("No NeuroParadigm achievement records were found");
    }

    return achievements;
  } catch (error) {
    console.error("NeuroParadigm achievements fetch failed:", error);
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
  } else if (id === "neuro-paradigm") {
    const dynamicAchievements = await getDynamicNeuroAchievements();
    if (dynamicAchievements) {
      result.achievements = dynamicAchievements;
      result.isScraped = true;
    }
    result.siteUrl = "https://neuroparadigm.in/";
  } else {
    // Other paradigms don't have scrapers yet, so they remain isScraped: false
    result.siteUrl = `https://k-hub.org/paradigms/${id}`;
  }

  return NextResponse.json(result);
}

