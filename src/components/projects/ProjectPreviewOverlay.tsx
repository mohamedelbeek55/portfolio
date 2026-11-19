"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import type { ProjectItem } from "@/types/project";
import { GithubIcon } from "@/components/ui/Icons";
import {
  X,
  ExternalLink,
  BookOpen,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

interface ProjectPreviewOverlayProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectPreviewOverlay({
  project,
  isOpen,
  onClose,
}: ProjectPreviewOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape & handle focus management
  useEffect(() => {
    if (!isOpen || !project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, project, onClose]);

  if (!isOpen || !project) return null;

  const githubLink = project.links.find((l) => l.type === "github");
  const liveLink = project.links.find((l) => l.type === "live");
  const apiDocsLink = project.links.find((l) => l.type === "api-docs");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-overlay-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#080B12]/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={overlayRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-b from-[#0C1424] to-[#080B12] border border-[var(--border-strong)] rounded-2xl overflow-y-auto shadow-2xl shadow-black/90 flex flex-col focus:outline-none"
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0C1424]/90 backdrop-blur-md border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs text-[var(--accent-neon-cyan)] px-2.5 py-1 rounded bg-[var(--accent-neon-cyan)]/10 border border-[var(--accent-neon-cyan)]/30 font-semibold">
              PROJECT 0{project.order}
            </span>
            <span className="font-mono-code text-xs text-[var(--text-tertiary)] uppercase hidden sm:inline-block">
              {project.label}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 text-[var(--text-secondary)] hover:text-white rounded-lg hover:bg-white/[0.08] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)]"
            aria-label="Close preview overlay"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Visual Cover Area */}
          <div className="relative w-full h-48 sm:h-64 rounded-xl bg-gradient-to-br from-[#111C33] via-[#0C1424] to-[#080B12] border border-[var(--border-medium)] p-6 flex flex-col justify-between overflow-hidden shadow-inner">
            <div className="absolute inset-0 engineering-grid-dense opacity-40 pointer-events-none" />
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-[var(--accent-electric)]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="font-mono-code text-xs text-[var(--accent-neon-cyan)]">
                System Blueprint Preview {"//"}
              </span>
              {project.isPlaceholder && (
                <span className="text-[10px] font-mono-code text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full">
                  Placeholder Preview
                </span>
              )}
            </div>

            <div className="relative z-10">
              <h2
                id="preview-overlay-title"
                className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight"
              >
                {project.title}
              </h2>
              {project.roleLine && (
                <p className="text-xs sm:text-sm font-mono-code text-[var(--text-secondary)] mt-1">
                  {project.roleLine}
                </p>
              )}
            </div>

            <div className="relative z-10 flex flex-wrap gap-2">
              {project.stack.length > 0 ? (
                project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono-code px-2.5 py-1 rounded bg-[#080B12]/80 text-[var(--accent-neon-cyan)] border border-[var(--border-cyan)]"
                  >
                    {tech}
                  </span>
                ))
              ) : (
                <span className="text-xs font-mono-code text-[var(--text-muted)] italic">
                  Tech stack details will be added in upcoming phase
                </span>
              )}
            </div>
          </div>

          {/* Synthetic Data Notice if applicable */}
          {project.syntheticDataNotice && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
              <div className="text-xs sm:text-sm leading-relaxed">
                <span className="font-semibold block font-mono-code mb-0.5">
                  CONFIDENTIALITY & SYNTHETIC DATA NOTICE
                </span>
                {project.syntheticDataNotice}
              </div>
            </div>
          )}

          {/* Detailed Overview */}
          <div>
            <h3 className="font-mono-code text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
              Architecture & Overview
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-sans-body">
              {project.description}
            </p>
          </div>

          {/* Highlight Concepts / Bullet Highlights */}
          {project.bulletHighlights && project.bulletHighlights.length > 0 && (
            <div>
              <h3 className="font-mono-code text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                Technical Highlights
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.bulletHighlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 p-3 rounded-lg bg-[#0C1424] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]"
                  >
                    <span className="text-[var(--accent-neon-cyan)] font-mono-code">&gt;</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.notes && (
            <div className="p-3 rounded-lg bg-[#0C1424]/60 border border-[var(--border-subtle)] text-xs font-mono-code text-[var(--text-tertiary)]">
              Note: {project.notes}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#0C1424]/95 backdrop-blur-md border-t border-[var(--border-subtle)]">
          <div className="flex flex-wrap items-center gap-2">
            {githubLink && (
              <a
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#080B12] hover:bg-white/[0.06] border border-[var(--border-medium)] text-xs font-mono-code text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>{githubLink.label}</span>
                <ExternalLink className="w-3 h-3 text-[var(--text-tertiary)]" />
              </a>
            )}

            {liveLink && (
              <a
                href={liveLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#080B12] hover:bg-white/[0.06] border border-[var(--border-medium)] text-xs font-mono-code text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                <span>{liveLink.label}</span>
                <ExternalLink className="w-3 h-3 text-[var(--text-tertiary)]" />
              </a>
            )}

            {apiDocsLink && (
              <a
                href={apiDocsLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#080B12] hover:bg-white/[0.06] border border-[var(--border-medium)] text-xs font-mono-code text-[var(--accent-neon-cyan)] hover:text-white transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{apiDocsLink.label}</span>
                <ExternalLink className="w-3 h-3 text-[var(--text-tertiary)]" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/projects/${project.slug}`}
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-electric)] hover:bg-[var(--accent-electric-hover)] text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
              <span>Explore Case Study</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
