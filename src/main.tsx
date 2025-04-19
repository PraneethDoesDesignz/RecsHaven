import { HeroGeometric } from "@/components/ui/hero-geometric";
import { GlowingEffectDemo } from "@/components/ui/glowing-effect-demo";
import { DemoBackgroundPaths } from "@/components/ui/demo-background-paths";
import { Particles } from "@/components/ui/particles";
import { StoryExplorationSection } from "@/components/ui/story-exploration-section";
import { BackgroundBeamsDemo } from "@/components/ui/background-beams-demo";
import { createRoot } from 'react-dom/client';
import React from 'react';
import Navbar from "./components/navbar/Navbar";
import HowItWorks from "./components/ui/HowItWorks";
import { AnimatedTextCycleDemo } from "./components/ui/animated-text-demo";
import Footer from "./components/ui/Footer";
import ContactSection from "./components/ui/ContactSection";

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <>
      <Particles quantity={250} />
      <div className="relative z-10">
        <Navbar />
        <div className="relative min-h-[600px]">
          <HeroGeometric />
        </div>
        <section className="flex justify-center w-full my-12">
          <div className="w-[90%] border border-white rounded-2xl overflow-hidden bg-white dark:bg-neutral-950">
            <DemoBackgroundPaths />
          </div>
        </section>
        <div className="my-12">
          <StoryExplorationSection />
        </div>
        <div className="py-12 px-2 md:px-8 bg-background">
          <GlowingEffectDemo />
        </div>
        <HowItWorks />
        <div className="flex flex-row gap-8 items-center mt-6 justify-center">
          <div className="flex-1 flex items-center justify-center">
            <BackgroundBeamsDemo />
          </div>
          <div className="flex flex-col items-center justify-center w-1/2">
            <AnimatedTextCycleDemo />
          </div>
        </div>
        {/* Contact section above the footer */}
        <div className="py-12 px-2 md:px-8 bg-background text-white">
          <ContactSection />
        </div>
        <div className="relative w-full flex items-center justify-center ">
          {/* ViBE text behind the footer content */}
          <h1 className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full text-center text-3xl md:text-5xl lg:text-[10rem] font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white via-purple-400 to-neutral-900 select-none pointer-events-none z-0 opacity-100 drop-shadow-xl">
            ViBE
          </h1>
          <div className="relative z-10 w-full">
            <Footer />
          </div>
        </div>
      </div>
    </>
  </React.StrictMode>
);
