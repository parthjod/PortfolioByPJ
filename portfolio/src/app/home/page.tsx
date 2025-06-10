import DigitalSerenity from "@/components/digital-serenity-animated-landing-page";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import { Footerdemo } from "@/components/ui/footer-section";

export default function Home() {
  return (
    <main>
      <DigitalSerenity />

      <div className="h-24" />

      <About />

      <div className="h-24" />

      <Projects />

      <div className="h-24" />

      <Experience />
      <Footerdemo/>  
    </main>
  );
}
