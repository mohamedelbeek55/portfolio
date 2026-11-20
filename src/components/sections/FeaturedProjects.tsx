"use client";

import React, { useState, useEffect, useRef } from "react";
import { projects } from "@/data/projects";
import type { ProjectItem } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectPreviewOverlay } from "@/components/projects/ProjectPreviewOverlay";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Layers,
  ArrowDown,
} from "lucide-react";

export function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleOpenPreview = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Use gsap.matchMedia for desktop stacking while leaving mobile completely natural
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (prefersReducedMotion) return;

      const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cardElements.length < 2) return;

      // For each card except the last, animate scale down and blur when next card enters
      cardElements.forEach((card, index) => {
        if (index === cardElements.length - 1) return;

        const nextCard = cardElements[index + 1];
        if (!nextCard) return;

        // When the next card arrives at the sticky top window, scale down and dim the current card
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.35,
          filter: "blur(1.5px)",
          ease: "none",
          transformOrigin: "center top",
          scrollTrigger: {
            trigger: nextCard,
            start: "top 60%",
            end: "top 120px",
            scrub: true,
          },
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-20 sm:py-28 lg:py-32 border-b border-[var(--border-subtle)] scroll-mt-20 overflow-visible"
    >
      {/* Background Lighting Accents */}
      <div className="absolute top-1/4 right-0 w-96 max-w-full h-96 bg-[var(--accent-electric)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 max-w-full h-96 bg-[var(--accent-neon-cyan)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20 pb-6 border-b border-[var(--border-subtle)]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C1424] border border-[var(--border-subtle)] font-mono-code text-xs text-[var(--accent-neon-cyan)] mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>DIGITAL ENGINEERING SHOWCASE {"//"}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              SELECTED WORK &amp; ARCHITECTURAL SPEC
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl font-sans-body">
              Production full-stack platforms, legal-tech systems, and client software emphasizing transactional integrity, security, and scalable infrastructure.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2 font-mono-code text-xs text-[var(--text-tertiary)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-neon-cyan)] animate-pulse" />
              <span className="text-white font-semibold">6 Systems Cataloged</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
              <span>Sequential Stack Flow</span>
              <ArrowDown className="w-3 h-3 text-[var(--accent-neon-cyan)] animate-bounce" />
            </div>
          </div>
        </div>

        {/* ── SEQUENTIAL STACKED CARDS SHOWCASE ─────────────────────────── */}
        {/* On desktop: sticky stacking with ScrollTrigger depth transitions */}
        {/* On mobile: clean natural single-column layout without sticky entrapment */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-24">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              data-stack-card={idx}
              className="lg:sticky lg:top-24 will-change-transform"
              style={{
                zIndex: idx + 10,
              }}
            >
              <ProjectCard
                project={project}
                index={idx}
                totalProjects={projects.length}
                onPreview={handleOpenPreview}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Global Interactive Project Preview Modal Overlay */}
      <ProjectPreviewOverlay
        project={selectedProject}
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
      />
    </section>
  );
}
