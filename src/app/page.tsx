import Particles from "@/shared/ui/backgrounds/Particles";
import HeroSection from "./components/Hero";
import ProjectSection from "./components/Project";
import SkillSetSection from "./components/Skillset";
import ContactSection from "./components/Contact";

export default function Home() {
  return (
    <section className="relative w-full flex flex-col min-h-screen bg-[#0a0a0a] text-white text-center overflow-x-hidden">
      <div className="absolute w-full h-screen">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={1000}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="flex w-full h-full flex-col items-center justify-center mt-[100px] gap-y-48">
        <HeroSection />
        <ProjectSection />
        <SkillSetSection />
        <ContactSection />
      </div>
    </section>
  );
}
