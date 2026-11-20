"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import type { ProjectItem } from "@/types/project";
import { GithubIcon } from "@/components/ui/Icons";
import {
  ExternalLink,
  ArrowRight,
  ShieldAlert,
  Maximize2,
  Terminal,
  Cpu,
} from "lucide-react";

interface ProjectCardProps {
  project: ProjectItem;
  onPreview: (project: ProjectItem) => void;
  variant?: "flagship" | "compact" | "grid";
}

export function ProjectCard({
  project,
  onPreview,
  variant = "grid",
}: ProjectCardProps) {
  const isFlagship = variant === "flagship";
  const cardRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, sheenX: 50, sheenY: 50, isHovered: false });

  const githubLink = project.links.find((l) => l.type === "github");
  const liveLink = project.links.find((l) => l.type === "live");
  const apiDocsLink = project.links.find((l) => l.type === "api-docs");

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const sheenX = ((e.clientX - rect.left) / rect.width) * 100;
    const sheenY = ((e.clientY - rect.top) / rect.height) * 100;

    setTilt({
      x: y * -10, // rotateX
      y: x * 10,  // rotateY
      sheenX,
      sheenY,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, sheenX: 50, sheenY: 50, isHovered: false });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl bg-[#080B12] transition-transform duration-200 ease-out flex flex-col justify-between overflow-hidden border ${
        isFlagship
          ? "border-[var(--border-accent)] hover:border-[var(--accent-neon-cyan)] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(37,99,235,0.18)]"
          : "border-[var(--border-subtle)] hover:border-[var(--border-accent)] p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
      }`}
      style={{
        transform: tilt.isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
      }}
    >
      {/* Dynamic Cursor Light Sheen */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: tilt.isHovered ? 1 : 0,
          background: `radial-gradient(circle 350px at ${tilt.sheenX}% ${tilt.sheenY}%, rgba(56, 189, 248, 0.12), transparent 70%)`,
        }}
      />

      {/* Background Engineering Blueprint Grid */}
      <div className="absolute inset-0 engineering-grid opacity-20 group-hover:opacity-35 transition-opacity pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-electric)]/5 group-hover:bg-[var(--accent-electric)]/12 rounded-full blur-3xl transition-all pointer-events-none" />

      {/* Architectural Corner Accents (Active on Hover) */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[var(--accent-neon-cyan)] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[var(--accent-neon-cyan)] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[var(--accent-neon-cyan)] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[var(--accent-neon-cyan)] opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Top Meta Line: Order, Label, Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="font-mono-code text-xs font-bold text-[var(--accent-neon-cyan)] px-2.5 py-1 rounded bg-[var(--accent-neon-cyan)]/10 border border-[var(--accent-neon-cyan)]/30 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
              0{project.order}
            </span>
            <span className="font-mono-code text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-electric)]" />
              <span>{project.label}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.isPlaceholder && (
              <span className="text-[10px] font-mono-code text-amber-400/90 bg-amber-400/10 border border-amber-400/25 px-2 py-0.5 rounded-full">
                Placeholder
              </span>
            )}
            <button
              type="button"
              onClick={() => onPreview(project)}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono-code text-[var(--text-tertiary)] hover:text-white px-2.5 py-1.5 rounded hover:bg-white/[0.08] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] cursor-pointer min-h-[44px] sm:min-h-0"
              aria-label={`Preview ${project.title} modal`}
            >
              <Maximize2 className="w-3.5 h-3.5 text-[var(--accent-neon-cyan)]" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Title & Architectural Role */}
        <div className="relative z-10">
          <h3
            className={`font-display font-bold text-white tracking-tight ${
              isFlagship ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
            }`}
          >
            {project.title}
          </h3>
          {project.roleLine && (
            <p className="text-xs font-mono-code text-[var(--text-secondary)] mt-1.5 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[var(--accent-neon-cyan)] shrink-0" />
              <span>{project.roleLine}</span>
            </p>
          )}
        </div>

        {/* Synthetic Data Alert for Ahmed Elbeek System */}
        {project.syntheticDataNotice && (
          <div className="my-3.5 flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300/90 text-xs font-mono-code relative z-10">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{project.syntheticDataNotice}</span>
          </div>
        )}

        {/* Description */}
        <p className="mt-3.5 text-sm text-[var(--text-secondary)] leading-relaxed font-sans-body relative z-10">
          {project.description}
        </p>

        {/* Flagship Technical Architecture Highlights */}
        {isFlagship && project.bulletHighlights && (
          <div className="mt-4 p-3.5 rounded-xl bg-[#0C1424]/70 border border-[var(--border-subtle)] space-y-2 relative z-10">
            <div className="flex items-center gap-2 font-mono-code text-[11px] text-[var(--accent-neon-cyan)] font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>SYSTEM ARCHITECTURE HIGHLIGHTS</span>
            </div>
            {project.bulletHighlights.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                <span className="text-[var(--accent-neon-cyan)] font-mono-code shrink-0">&gt;</span>
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mt-5 relative z-10">
          {project.stack.length > 0 ? (
            project.stack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-[#0C1424] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-colors"
              >
                {tech}
              </span>
            ))
          ) : (
            <span className="text-[11px] font-mono-code text-[var(--text-muted)] italic">
              Stack details pending confirmation
            </span>
          )}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex flex-wrap items-center gap-2">
          {githubLink && (
            <a
              href={githubLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0C1424] hover:bg-[#111C33] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] text-xs font-mono-code text-[var(--text-secondary)] hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] min-h-[44px] sm:min-h-0"
              aria-label={`GitHub repo for ${project.title}`}
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Code</span>
            </a>
          )}

          {liveLink && (
            <a
              href={liveLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--accent-electric)]/15 hover:bg-[var(--accent-electric)]/25 border border-[var(--accent-electric)]/40 text-xs font-mono-code text-[var(--accent-neon-cyan)] hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-[var(--accent-neon-cyan)] min-h-[44px] sm:min-h-0"
              aria-label={`Live demo for ${project.title}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          )}

          {apiDocsLink && (
            <a
              href={apiDocsLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0C1424] hover:bg-[#111C33] border border-[var(--border-subtle)] text-xs font-mono-code text-[var(--text-secondary)] hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] min-h-[44px] sm:min-h-0"
              aria-label={`API Docs for ${project.title}`}
            >
              <Terminal className="w-3.5 h-3.5 text-[var(--accent-neon-cyan)]" />
              <span>API Docs</span>
            </a>
          )}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono-code text-[var(--accent-neon-cyan)] hover:text-white group/link transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent-neon-cyan)] rounded px-2 py-2 min-h-[44px] sm:min-h-0 sm:px-1 sm:py-0.5"
        >
          <span>Deep-Dive Spec</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
