"use client";

import React from "react";
import Link from "next/link";
import type { ProjectItem } from "@/types/project";
import { GithubIcon } from "@/components/ui/Icons";
import { ProjectVisualPreview } from "./ProjectVisualPreview";
import {
  ExternalLink,
  ArrowRight,
  ShieldAlert,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Archive,
} from "lucide-react";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalProjects?: number;
  onPreview: (project: ProjectItem) => void;
  className?: string;
}

export const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  function ProjectCard({ project, index, totalProjects = 6, onPreview, className = "" }, ref) {
    const isFlagship = project.tier === "featured";
    const isClient = project.tier === "client";

    const githubLink = project.links.find((l) => l.type === "github");
    const liveLink = project.links.find((l) => l.type === "live");
    const apiDocsLink = project.links.find((l) => l.type === "api-docs");

    return (
      <div
        ref={ref}
        data-project-index={index}
        className={`w-full will-change-transform ${className}`}
      >
        <article
          className={`relative rounded-2xl bg-[#080B12]/95 border transition-all duration-300 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between ${
            isFlagship
              ? "border-[var(--border-accent)] hover:border-[var(--accent-neon-cyan)]/80 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(37,99,235,0.18)]"
              : isClient
              ? "border-[var(--border-subtle)] hover:border-[var(--border-accent)]"
              : "border-white/10 hover:border-white/20 opacity-95"
          }`}
        >
          {/* Background Engineering Blueprint Grid */}
          <div className="absolute inset-0 engineering-grid opacity-20 pointer-events-none" />
          <div
            className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all ${
              isFlagship
                ? "bg-[var(--accent-electric)]/10"
                : isClient
                ? "bg-[var(--accent-neon-cyan)]/5"
                : "bg-slate-700/10"
            }`}
          />

          {/* Decorative Corner Accents */}
          <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-[var(--accent-neon-cyan)]/50 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-[var(--accent-neon-cyan)]/50 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-[var(--accent-neon-cyan)]/50 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-[var(--accent-neon-cyan)]/50 pointer-events-none" />

          {/* Card Inner Grid: Split Layout on Desktop, Vertical Stack on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-5 sm:p-7 lg:p-9 relative z-10 items-stretch">
            {/* Left Column: Project Editorial & Engineering Spec (lg:col-span-7) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div>
                {/* Meta Header Line */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-2.5">
                    {/* Project Number */}
                    <span className="font-mono-code text-xs font-bold text-[var(--accent-neon-cyan)] px-2.5 py-1 rounded bg-[var(--accent-neon-cyan)]/10 border border-[var(--accent-neon-cyan)]/30 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                      0{project.order} {"//"} 0{totalProjects}
                    </span>

                    {/* Category Label */}
                    <span className="font-mono-code text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isFlagship
                            ? "bg-[var(--accent-electric)]"
                            : isClient
                            ? "bg-[var(--accent-neon-cyan)]"
                            : "bg-slate-400"
                        }`}
                      />
                      <span>{project.label}</span>
                    </span>
                  </div>

                  {/* Tier Classification Badge */}
                  <div className="flex items-center gap-2">
                    {isFlagship ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono-code text-[var(--accent-neon-cyan)] bg-[var(--accent-neon-cyan)]/10 border border-[var(--accent-neon-cyan)]/30 px-2 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3" />
                        <span>FLAGSHIP PLATFORM</span>
                      </span>
                    ) : isClient ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono-code text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        <Layers className="w-3 h-3" />
                        <span>COMMISSIONED / INDEPENDENT</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono-code text-slate-300 bg-slate-500/10 border border-slate-500/30 px-2 py-0.5 rounded-full">
                        <Archive className="w-3 h-3" />
                        <span>ACADEMIC ARCHIVE</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Title & Subtitle */}
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  {project.title}
                </h3>

                {project.roleLine && (
                  <p className="text-xs sm:text-sm font-mono-code text-[var(--text-secondary)] mt-2 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[var(--accent-neon-cyan)] shrink-0" />
                    <span>{project.roleLine}</span>
                  </p>
                )}

                {/* Synthetic Data Notice for Ahmed Elbeek System */}
                {project.syntheticDataNotice && (
                  <div className="my-3.5 flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono-code">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{project.syntheticDataNotice}</span>
                  </div>
                )}

                {/* Project Description */}
                <p className="mt-3.5 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-sans-body">
                  {project.description}
                </p>

                {/* Flagship System Architecture Highlights */}
                {project.bulletHighlights && project.bulletHighlights.length > 0 && (
                  <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-[#0C1424]/70 border border-[var(--border-subtle)] space-y-2">
                    <div className="flex items-center gap-2 font-mono-code text-[11px] text-[var(--accent-neon-cyan)] font-semibold tracking-wide">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>ENGINEERING ARCHITECTURE HIGHLIGHTS</span>
                    </div>
                    {project.bulletHighlights.slice(0, 3).map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                        <span className="text-[var(--accent-neon-cyan)] font-mono-code shrink-0 mt-0.5">&gt;</span>
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technology Stack Pills */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-5">
                  {project.stack.length > 0 ? (
                    project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono-code px-2.5 py-1 rounded-md bg-[#0C1424] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-neon-cyan)]/50 hover:text-white transition-colors"
                      >
                        {tech}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs font-mono-code text-[var(--text-muted)] italic">
                      Architecture &amp; tech stack cataloging in progress
                    </span>
                  )}
                </div>
              </div>

              {/* Action Links Footer */}
              <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {githubLink && (
                    <a
                      href={githubLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="open"
                      className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#0C1424] hover:bg-[#111C33] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] text-xs font-mono-code text-[var(--text-secondary)] hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] min-h-[44px]"
                      aria-label={`GitHub source code for ${project.title}`}
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  )}

                  {liveLink && (
                    <a
                      href={liveLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="open"
                      className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-[var(--accent-electric)]/15 hover:bg-[var(--accent-electric)]/25 border border-[var(--accent-electric)]/40 text-xs font-mono-code text-[var(--accent-neon-cyan)] hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-[var(--accent-neon-cyan)] min-h-[44px]"
                      aria-label={`Live application demo for ${project.title}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}

                  {apiDocsLink && (
                    <a
                      href={apiDocsLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="open"
                      className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#0C1424] hover:bg-[#111C33] border border-[var(--border-subtle)] text-xs font-mono-code text-[var(--text-secondary)] hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] min-h-[44px]"
                      aria-label={`API documentation for ${project.title}`}
                    >
                      <Terminal className="w-4 h-4 text-[var(--accent-neon-cyan)]" />
                      <span>API Docs</span>
                    </a>
                  )}
                </div>

                {/* Case Study Deep-Dive Link */}
                <Link
                  href={`/projects/${project.slug}`}
                  data-cursor="open"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono-code text-[var(--accent-neon-cyan)] hover:text-white group/link transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent-neon-cyan)] rounded px-3 py-2.5 min-h-[44px]"
                >
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Dedicated Visual Preview (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <ProjectVisualPreview
                project={project}
                onExpand={onPreview}
              />
            </div>
          </div>
        </article>
      </div>
    );
  }
);
