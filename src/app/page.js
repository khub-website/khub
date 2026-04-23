import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Domains from "@/components/Domains";
import Programs from "@/components/Programs";
import Impact from "@/components/Impact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { ElectricPointer } from "@/components/ElectricPointer";

export default function Home() {
  return (
    <>
      <ElectricPointer />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Domains />
        <Programs />
        <Impact />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
