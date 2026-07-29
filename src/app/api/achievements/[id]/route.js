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
    achievements: [
      {
        year: "2026",
        month: 2,
        title: "Dual Patent Publication by Indian Patent Office in AI-Driven Behavioral & Gait Diagnostics",
        desc: "Published IP covering child-adaptive gaze tracking & multimodal browser-based skeletal gait acquisition.",
        details: "NeuroParadigm announces the publication of two key patent applications by the Indian Patent Office, advancing clinical-grade digital phenotyping:\n\n• Privacy-Preserving Child-Adaptive Eye Tracking: Webcam-based gaze estimation with structured data export for neurodevelopmental assessment.\n• Real-Time Multimodal Skeletal Gait Acquisition: Browser-based posture & movement analysis for remote clinical rehabilitation monitoring.",
        category: "Patent",
        url: "https://www.linkedin.com/posts/neuroparadigmpvtltd_neuroparadigm-patentpublication-artificialintelligence-activity-7486374864669437952-xi4t?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF8tv-8BR5B7FLMTiAyxMELRKKjVVbg9rT8"
      },
      {
        year: "2026",
        month: 1,
        title: "Strategic MoU Executed with Total Solution Rehabilitation Society (TSRS)",
        desc: "Translating computational neuroscience & skeletal AI research into clinical rehabilitation workflows.",
        details: "NeuroParadigm has formally executed a Memorandum of Understanding (MoU) with the Total Solution Rehabilitation Society (TSRS). This strategic collaboration bridges theoretical AI research and applied clinical practice, establishing real-world validation frameworks for intelligent rehabilitation tech.",
        category: "MoU",
        url: "https://www.linkedin.com/posts/neuroparadigmpvtltd_neuroparadigm-khub-artificialintelligence-activity-7485558064096526337-vKs6?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF8tv-8BR5B7FLMTiAyxMELRKKjVVbg9rT8"
      }
    ],
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

  const result = { ...data, isScraped: data.achievements && data.achievements.length > 0 };

  if (id === "drug-paradigm") {
    const dynamicAchievements = await getDynamicDrugAchievements();
    if (dynamicAchievements) {
      result.achievements = dynamicAchievements;
      result.isScraped = true;
    }
    result.siteUrl = "https://drugparadigm.com/";
  } else {
    result.siteUrl = `https://k-hub.org/paradigms/${id}`;
  }

  return NextResponse.json(result);
}

