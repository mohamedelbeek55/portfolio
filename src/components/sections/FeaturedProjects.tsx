"use client";

import React, { useState } from "react";
import {
  featuredProjects,
  clientProjects,
  archiveProjects,
} from "@/data/projects";
import type { ProjectItem } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectPreviewOverlay } from "@/components/projects/ProjectPreviewOverlay";
import {
  Layers,
  ChevronDown,
  ChevronUp,
  FolderArchive,
} from "lucide-react";

export function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  const handleOpenPreview = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="work" className="relative py-20 sm:py-28 lg:py-32 border-b border-[var(--border-subtle)]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[var(--accent-electric)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[var(--accent-neon-cyan)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C1424] border border-[var(--border-subtle)] font-mono-code text-xs text-[var(--accent-neon-cyan)] mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>PROJECT SHOWCASE {"//"}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              SELECTED WORK &amp; ENGINEERING
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl font-sans-body">
              Production systems, client software, and architectural projects emphasizing data consistency, security, and scalable infrastructure.
            </p>
          </div>

          <div className="font-mono-code text-xs text-[var(--text-tertiary)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-neon-cyan)]" />
            <span>6 total projects cataloged</span>
          </div>
        </div>

        {/* ── TIER 1: FEATURED ENGINEERING PROJECTS ────────────────────── */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-6 pb-2 border-b border-[var(--border-subtle)]">
            <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-[var(--accent-neon-cyan)]">
              [01] Featured Engineering Platforms
            </span>
            <span className="text-[11px] font-mono-code text-[var(--text-muted)]">
              Flagship Full-Stack &amp; Graduation Work
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onPreview={handleOpenPreview}
                variant="flagship"
              />
            ))}
          </div>
        </div>

        {/* ── TIER 2: CLIENT & INDEPENDENT WORK ────────────────────────── */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center justify-between gap-4 mb-6 pb-2 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-[var(--accent-electric-hover)]">
                [02] Client &amp; Independent Systems
              </span>
              <span className="text-[11px] font-mono-code text-[var(--text-muted)] hidden sm:inline-block">
                Commissioned business systems &amp; products
              </span>
            </div>
            <span className="text-[11px] font-mono-code text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/25">
              Synthetic Data Safeguards
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clientProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onPreview={handleOpenPreview}
                variant="grid"
              />
            ))}
          </div>
        </div>

        {/* ── TIER 3: EARLIER WORK ARCHIVE ─────────────────────────────── */}
        <div>
          <button
            type="button"
            onClick={() => setShowArchive(!showArchive)}
            className="w-full flex items-center justify-between p-4 sm:p-5 rounded-xl bg-[#0C1424]/60 hover:bg-[#0C1424] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all group"
            aria-expanded={showArchive}
          >
            <div className="flex items-center gap-3">
              <FolderArchive className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--accent-neon-cyan)] transition-colors" />
              <span className="font-mono-code text-xs sm:text-sm font-medium text-[var(--text-secondary)] group-hover:text-white transition-colors">
                [03] Earlier Foundations &amp; Academic Archive ({archiveProjects.length} Project)
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono-code text-xs text-[var(--text-tertiary)]">
              <span>{showArchive ? "Collapse" : "Expand Archive"}</span>
              {showArchive ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </button>

          {showArchive && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
              {archiveProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onPreview={handleOpenPreview}
                  variant="compact"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Global Project Preview Modal Overlay */}
      <ProjectPreviewOverlay
        project={selectedProject}
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
      />
    </section>
  );
}
