import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { BehindInterface } from "@/components/sections/BehindInterface";
import { HowIBuild } from "@/components/sections/HowIBuild";
import { TechnicalToolkit } from "@/components/sections/TechnicalToolkit";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { SectionReveal } from "@/components/ui/SectionReveal";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#090a0d] text-[#f4f4f7]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main id="main-content" className="flex-1 w-full">
        {/* Hero Section */}
        <Hero />

        {/* Selected Work (3 Projects) */}
        <SectionReveal>
          <SelectedWork />
        </SectionReveal>

        {/* Behind the Interface (8 Areas) */}
        <SectionReveal>
          <BehindInterface />
        </SectionReveal>

        {/* How I Build (Architectural Blueprint) */}
        <SectionReveal>
          <HowIBuild />
        </SectionReveal>

        {/* Technical Toolkit */}
        <SectionReveal>
          <TechnicalToolkit />
        </SectionReveal>

        {/* About Mohamed */}
        <SectionReveal>
          <About />
        </SectionReveal>

        {/* Contact & Channels */}
        <SectionReveal>
          <Contact />
        </SectionReveal>
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
