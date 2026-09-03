import Hero from "../components/sections/Hero";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import AiSection from "../components/sections/AiSection";
import SurfacesTeaser from "../components/sections/SurfacesTeaser";
import CtaBand from "../components/sections/CtaBand";
import Marquee from "../components/ui/Marquee";

const TICKER = [
  "React",
  "TypeScript",
  "Java",
  "Spring Boot",
  "TailwindCSS",
  "Astro",
  "Svelte",
  "Motion",
  "Design systems",
  "AI-assisted engineering",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="mt-24 border-y border-space-700/60">
        <Marquee items={TICKER} />
      </div>
      <AboutSection />
      <SkillsSection />
      <AiSection />
      <SurfacesTeaser />
      <CtaBand />
    </>
  );
}
