import Hero from "@/components/Hero";
import About from "@/components/About";
import Domains from "@/components/Domains";
import Programs from "@/components/Programs";
import Impact from "@/components/Impact";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main className="overflow-x-hidden [text-shadow:none]">
      <Hero />
      <About />
      <Domains />
      <Programs />
      <Impact />
      <CTA />
    </main>
  );
}
