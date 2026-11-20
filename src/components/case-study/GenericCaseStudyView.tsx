"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { ProjectItem } from "@/types/project";
import { projects } from "@/data/projects";
import { GithubIcon } from "@/components/ui/Icons";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  BookOpen,
  ShieldAlert,
  Layers,
  Terminal,
  CheckCircle2,
  FileCode2,
} from "lucide-react";

interface GenericCaseStudyViewProps {
  project: ProjectItem;
}

export function GenericCaseStudyView({ project }: GenericCaseStudyViewProps) {
  const [activeTab, setActiveTab] = useState<"architecture" | "decisions" | "features">("architecture");

  // Determine previous and next projects
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const githubLink = project.links.find((l) => l.type === "github");
  const liveLink = project.links.find((l) => l.type === "live");
  const apiDocsLink = project.links.find((l) => l.type === "api-docs");
  const frontendLink = project.links.find((l) => l.type === "frontend-repo");

  return (
    <div className="min-h-screen bg-[var(--bg-deep-black)] text-[var(--text-primary)]">
      {/* ── Top Navigation Bar ────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#080B12]/90 backdrop-blur-xl border-b border-[var(--border-subtle)] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono-code text-[var(--text-secondary)] hover:text-white transition-colors px-2.5 py-2 -ml-1 rounded-lg focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4 text-[var(--accent-neon-cyan)]" />
            <span>&larr; Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs text-[var(--accent-neon-cyan)] bg-[var(--accent-neon-cyan)]/10 px-2.5 py-1 rounded border border-[var(--accent-neon-cyan)]/25">
              CASE STUDY // 0{project.order}
            </span>
            <span className="text-xs font-mono-code text-[var(--text-tertiary)] hidden sm:inline-block">
              {project.label}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* ── 1. Hero Section ─────────────────────────────────────────── */}
        <div className="mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-mono-code text-xs text-[var(--accent-neon-cyan)]">
              SYSTEM ARCHITECTURE DOSSIER
            </span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="font-mono-code text-xs text-[var(--text-secondary)] uppercase">
              {project.category}
            </span>
            {project.isPlaceholder && (
              <span className="ml-2 text-[10px] font-mono-code text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full">
                Preliminary Specification
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
            {project.title}
          </h1>

          {project.roleLine && (
            <p className="mt-3 font-mono-code text-sm sm:text-base text-[var(--accent-neon-cyan)]">
              Role: {project.roleLine}
            </p>
          )}

          <p className="mt-6 text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed font-sans-body">
            {project.description}
          </p>

          {/* Synthetic Data Alert for confidential client projects */}
          {project.syntheticDataNotice && (
            <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-mono-code flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">SYNTHETIC DEMONSTRATION NOTICE</span>
                {project.syntheticDataNotice}
              </div>
            </div>
          )}

          {/* Links Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--border-subtle)]">
            {githubLink && (
              <a
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0C1424] hover:bg-[#111C33] border border-[var(--border-medium)] text-xs font-mono-code text-white transition-all shadow-sm"
              >
                <GithubIcon className="w-4 h-4 text-[var(--accent-neon-cyan)]" />
                <span>{githubLink.label}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
              </a>
            )}

            {liveLink && (
              <a
                href={liveLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent-electric)] hover:bg-[var(--accent-electric-hover)] text-white text-xs font-mono-code transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
              >
                <span>{liveLink.label}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {apiDocsLink && (
              <a
                href={apiDocsLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0C1424] hover:bg-[#111C33] border border-[var(--border-cyan)] text-xs font-mono-code text-[var(--accent-neon-cyan)] transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>{apiDocsLink.label}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {frontendLink && (
              <a
                href={frontendLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0C1424] hover:bg-[#111C33] border border-[var(--border-subtle)] text-xs font-mono-code text-[var(--text-secondary)] hover:text-white transition-all"
              >
                <FileCode2 className="w-4 h-4" />
                <span>{frontendLink.label}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
              </a>
            )}
          </div>
        </div>

        {/* ── 2. Interactive Architectural Matrix ─────────────────────── */}
        <div className="mb-16 rounded-2xl bg-[#0C1424]/70 border border-[var(--border-medium)] p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 engineering-grid opacity-30 pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--border-subtle)] relative z-10">
            <span className="font-mono-code text-xs text-[var(--accent-neon-cyan)] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Architectural Layers &amp; Decisions
            </span>

            <div className="flex items-center gap-1 bg-[#080B12] p-1 rounded-lg border border-[var(--border-subtle)]">
              <button
                type="button"
                onClick={() => setActiveTab("architecture")}
                className={`px-3.5 py-2 sm:py-1 rounded text-xs font-mono-code transition-colors min-h-[40px] sm:min-h-0 ${
                  activeTab === "architecture"
                    ? "bg-[var(--accent-electric)] text-white font-medium"
                    : "text-[var(--text-tertiary)] hover:text-white"
                }`}
              >
                Stack Matrix
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("decisions")}
                className={`px-3.5 py-2 sm:py-1 rounded text-xs font-mono-code transition-colors min-h-[40px] sm:min-h-0 ${
                  activeTab === "decisions"
                    ? "bg-[var(--accent-electric)] text-white font-medium"
                    : "text-[var(--text-tertiary)] hover:text-white"
                }`}
              >
                Key Highlights
              </button>
            </div>
          </div>

          {activeTab === "architecture" ? (
            <div className="space-y-6 relative z-10">
              <div>
                <h3 className="font-mono-code text-xs uppercase text-[var(--text-tertiary)] mb-3">
                  Technologies Deployed:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.length > 0 ? (
                    project.stack.map((item) => (
                      <span
                        key={item}
                        className="font-mono-code text-xs px-3 py-1.5 rounded-lg bg-[#080B12] text-[var(--accent-neon-cyan)] border border-[var(--border-cyan)]"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs font-mono-code text-[var(--text-muted)] italic">
                      Tech stack details will be populated in next phase
                    </span>
                  )}
                </div>
              </div>

              {project.highlightConcepts && (
                <div>
                  <h3 className="font-mono-code text-xs uppercase text-[var(--text-tertiary)] mb-3">
                    Architectural Tenets:
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {project.highlightConcepts.map((concept) => (
                      <div
                        key={concept}
                        className="p-3 rounded-lg bg-[#080B12] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-neon-cyan)] shrink-0" />
                        <span className="truncate">{concept}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 relative z-10">
              {project.bulletHighlights && project.bulletHighlights.length > 0 ? (
                <ul className="space-y-2.5">
                  {project.bulletHighlights.map((hl, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-3.5 rounded-lg bg-[#080B12] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-secondary)]"
                    >
                      <span className="font-mono-code text-[var(--accent-neon-cyan)] font-bold">
                        0{i + 1} {"//"}
                      </span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs font-mono-code text-[var(--text-tertiary)] italic p-4 bg-[#080B12] rounded-lg">
                  Engineering decision records and benchmark metrics will be documented during the dedicated content refinement phase.
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── 3. Visual Gallery / System Mockup Blueprint ──────────────── */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono-code text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
              System Interface &amp; Diagram Blueprint
            </span>
            <span className="text-[11px] font-mono-code text-[var(--accent-neon-cyan)]">
              Interactive Wireframe Preview
            </span>
          </div>

          <div className="h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-[#0C1424] via-[#111C33] to-[#080B12] border border-[var(--border-medium)] p-8 flex flex-col justify-between relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 engineering-grid-dense opacity-30 pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <span className="font-mono-code text-xs text-[var(--accent-neon-cyan)]">
                {project.title} {"//"} Blueprint Canvas
              </span>
              <span className="text-xs font-mono-code text-[var(--text-tertiary)]">
                Resolution: 1920x1080 Scaled
              </span>
            </div>

            <div className="text-center relative z-10 max-w-md mx-auto">
              <Terminal className="w-8 h-8 text-[var(--accent-neon-cyan)] mx-auto mb-2 opacity-80" />
              <p className="font-display text-lg font-semibold text-white">
                Interactive Engineering System
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1 font-mono-code">
                Verified screenshots, workflow diagrams, and architecture traces will be linked here in the content phase.
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono-code text-[var(--text-muted)] relative z-10">
              <span>Status: Registered &amp; Verified</span>
              <span>Slug: /projects/{project.slug}</span>
            </div>
          </div>
        </div>

        {/* ── 4. Next / Prev Project Navigation ────────────────────────── */}
        <div className="pt-10 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group p-5 rounded-xl bg-[#0C1424] hover:bg-[#111C33] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all flex flex-col justify-between min-h-[100px]"
          >
            <span className="text-[11px] font-mono-code text-[var(--text-tertiary)] flex items-center gap-1 group-hover:text-[var(--accent-neon-cyan)] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Previous Project
            </span>
            <span className="font-display text-base font-semibold text-white group-hover:text-[var(--accent-neon-cyan)] transition-colors truncate">
              {prevProject.title}
            </span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group p-5 rounded-xl bg-[#0C1424] hover:bg-[#111C33] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all flex flex-col justify-between text-right min-h-[100px]"
          >
            <span className="text-[11px] font-mono-code text-[var(--text-tertiary)] flex items-center justify-end gap-1 group-hover:text-[var(--accent-neon-cyan)] transition-colors">
              Next Project <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span className="font-display text-base font-semibold text-white group-hover:text-[var(--accent-neon-cyan)] transition-colors truncate">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}
