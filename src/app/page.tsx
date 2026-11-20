import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { TechnicalToolkit } from "@/components/sections/TechnicalToolkit";
import { EngineeringPlayground } from "@/components/sections/EngineeringPlayground";
import { EngineeringWorkflow } from "@/components/sections/EngineeringWorkflow";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="relative flex flex-col min-h-screen bg-[var(--bg-deep-black)] text-[var(--text-primary)]">
        {/* Cinematic Navigation Floating Dock */}
        <Navbar />

        {/* Main Content Sections */}
        <main id="main-content" className="flex-1 w-full">
          {/* Section B: Cinematic Hero with 3D Digital Engineering Core */}
          <Hero />

          {/* Section C: Featured Projects Sequential Stacking Showcase */}
          <FeaturedProjects />

          {/* Section E: Interactive Technical Toolkit */}
          <SectionReveal>
            <TechnicalToolkit />
          </SectionReveal>

          {/* Section F: Interactive Engineering Playground */}
          <SectionReveal>
            <EngineeringPlayground />
          </SectionReveal>

          {/* Section G: Engineering Workflow (How I Build) */}
          <SectionReveal>
            <EngineeringWorkflow />
          </SectionReveal>

          {/* Section H: About Dossier */}
          <SectionReveal>
            <About />
          </SectionReveal>

          {/* Section I: Contact Terminal */}
          <SectionReveal>
            <Contact />
          </SectionReveal>
        </main>

        {/* Section J: Minimal Engineering Footer */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
