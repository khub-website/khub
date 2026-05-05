import { Brain, Bot, Network, Dna, Network as NetworkIcon, LineChart } from "lucide-react";

export const paradigms = [
  {
    id: "drug-paradigm",
    name: "DrugParadigm",
    url: "https://drugparadigm.com/",
    tagline: "Accelerating discovery with molecular intelligence",
    description: "Leveraging deep learning to predict protein structures and simulate molecular interactions. This paradigm reduces the search space for life-saving therapeutics from decades to days.",
    color: "#006c51", // Adjusted to match K-Hub primary
    icon: Dna,
    topics: [
      { title: "Protein Folding", desc: "Predicting 3D structures from amino acid sequences." },
      { title: "ADMET Prediction", desc: "Forecasting drug absorption, distribution, and toxicity." },
      { title: "De Novo Design", desc: "Generating entirely new molecules with specific properties." }
    ],
    achievements: [],
    photos: [
      { src: "/achievements/drug-hero.jpg", alt: "Molecular simulation" },
    ],
  },
  {
    id: "robo-paradigm",
    name: "RoboParadigm",
    url: "https://roboparadigm.com/",
    tagline: "The bridge between silicon and steel",
    description: "Integrating advanced perception with dynamic control systems. RoboParadigm focuses on embodied agents that can navigate, manipulate, and learn within complex physical environments.",
    color: "#3b82f6",
    icon: Bot,
    topics: [
      { title: "End-to-End Control", desc: "Direct mapping from camera pixels to motor torques." },
      { title: "Sim-to-Real", desc: "Bridging the gap between physics engines and hardware." },
      { title: "Collaborative Bots", desc: "Robots designed to work safely alongside human teams." }
    ],
    achievements: [],
    photos: [
      { src: "/achievements/robo-hero.jpg", alt: "Humanoid robot" },
    ],
  },
  {
    id: "cyber-paradigm",
    name: "CyberParadigm",
    url: "https://cyberparadigm.in/",
    tagline: "Autonomous defense for a digital world",
    description: "Redefining security through predictive analytics and autonomous response. CyberParadigm shifts the focus from reactive patching to proactive, self-healing network infrastructures.",
    color: "#f59e0b",
    icon: Network,
    topics: [
      { title: "Threat Hunting", desc: "Autonomous agents identifying zero-day vulnerabilities." },
      { title: "Anomaly Detection", desc: "Spotting behavioral shifts in massive telemetry data." },
      { title: "Automated Response", desc: "Neutralizing threats at wire-speed without human intervention." }
    ],
    achievements: [],
    photos: [
      { src: "/achievements/cyber-hero.jpg", alt: "Security dashboard" },
    ],
  },
  {
    id: "neuro-paradigm",
    name: "NeuroParadigm",
    url: "https://neuroparadigm.in/",
    tagline: "Connecting minds and machines",
    description: "Translating the hidden language of mind and behavior into measurable signals, NeuroParadigm powers a new era of intelligent, scalable psychiatric care.",
    color: "#8b5cf6",
    icon: Brain,
    topics: [
      { title: "Motor Decoding", desc: "Translating neural spikes into digital or physical action." },
      { title: "Neural Modulation", desc: "Targeted stimulation to treat neurological conditions." },
      { title: "BCI-LLM Bridge", desc: "Enabling direct thought-to-text communication." }
    ],
    achievements: [],
    photos: [
      { src: "/achievements/neuro-hero.jpeg", alt: "Neural interface" },
    ],
  },
  {
    id: "crystal-paradigm",
    name: "CrystalParadigm",
    url: "https://crystalparadigm.in/",
    tagline: "Architecting matter from the atom up",
    description: "Discovering high-performance materials through computational alchemy. CrystalParadigm uses generative models to explore the vast space of possible crystal structures for energy and tech.",
    color: "#06b6d4",
    icon: NetworkIcon,
    topics: [
      { title: "GNoME Project", desc: "DeepMind's discovery of 2.2 million new stable crystals." },
      { title: "Battery Innovation", desc: "Simulating solid-state electrolytes for faster charging." },
      { title: "Superconductors", desc: "Predicting materials that conduct without resistance." }
    ],
    achievements: [],
    photos: [
      { src: "/achievements/crystal-hero.png", alt: "Crystal lattice" },
    ],
  },
  {
    id: "nutra-paradigm",
    name: "NutraParadigm",
    url: null,
    tagline: "Personalizing health through precision biology",
    description: "Analyzing the complex interplay between diet, microbiome, and metabolism. NutraParadigm uses AI to design bespoke nutritional interventions for optimal human performance.",
    color: "#ec4899",
    icon: LineChart,
    topics: [
      { title: "Microbiome Analysis", desc: "Decoding the trillions of bacteria governing health." },
      { title: "Metabolic Modeling", desc: "Predicting glucose response to specific food inputs." },
      { title: "Bio-Feedback", desc: "Real-time nutritional adjustment based on wearable data." }
    ],
    achievements: [],
    photos: [
      { src: "/achievements/nutra-hero.png", alt: "Bio-data visualization" },
    ],
  },
];
