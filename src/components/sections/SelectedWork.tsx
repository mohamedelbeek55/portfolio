import React from "react";
import Link from "next/link";
import { siteContent } from "@/content/siteContent";
import { ArrowUpRight, ArrowRight, CheckCircle2 } from "lucide-react";

export function SelectedWork() {
  const { heading, subheading, projects } = siteContent.projectsSection;
  const project1 = projects[0];
  const project2 = projects[1];
  const project3 = projects[2];

  return (
    <section id="work" className="py-20 sm:py-28 border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono-code text-[11px] text-blue-400 font-semibold tracking-widest uppercase">
              {"// 01. WORK"}
            </span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f4f4f7] tracking-tight">
            {heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#9ca3af] font-sans-body leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Project 01 — Flagship / Primary Card */}
        <div className="mb-10 rounded-xl bg-[#0e1117] border border-white/[0.1] hover:border-blue-500/30 transition-all duration-300 overflow-hidden relative group">
          {/* Subtle blueprint accent line */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600/20" />

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Top Meta Line */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <span className="font-mono-code text-sm font-semibold text-blue-400">
                  {project1.number}
                </span>
                <span className="text-white/20">/</span>
                <span className="font-mono-code text-[11px] tracking-wider uppercase px-2.5 py-0.5 rounded bg-white/[0.05] text-[#9ca3af] border border-white/[0.05]">
                  {project1.label}
                </span>
              </div>
              <span className="font-mono-code text-[11px] text-[#6b7280]">
                FLAGSHIP BACKEND SYSTEM
              </span>
            </div>

            {/* Title & Core Stack */}
            <div className="mt-6">
              <h3 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl text-white font-medium tracking-tight">
                {project1.title}
              </h3>

              {/* Stack Pills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project1.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono-code text-xs px-2.5 py-1 rounded bg-[#161a22] text-[#d1d5db] border border-white/[0.08]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="mt-5 text-[#9ca3af] text-base sm:text-lg leading-relaxed max-w-3xl">
                {project1.description}
              </p>

              {/* Highlighted Concepts Grid (Exact six concepts) */}
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <h4 className="font-mono-code text-[11px] uppercase tracking-wider text-[#6b7280] mb-4">
                  Core Backend Pillars:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project1.highlightConcepts?.map((concept) => (
                    <div
                      key={concept}
                      className="flex items-center gap-2 p-2.5 rounded bg-[#12151b] border border-white/[0.05] text-xs text-[#e2e8f0]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="font-medium">{concept}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-3">
                {project1.links.map((link) => {
                  if (link.isPrimary) {
                    return (
                      <Link
                        key={link.label}
                        href={link.url}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-blue-400"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#161a22] hover:bg-[#1f2530] border border-white/[0.08] hover:border-white/20 text-xs font-mono-code text-[#d1d5db] hover:text-white transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#6b7280]" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Project 02 — Medium Weight (LexaGuide Graduation Team Project) */}
        <div className="mb-10 rounded-xl bg-[#0e1117] border border-white/[0.08] hover:border-white/15 transition-all duration-200 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <span className="font-mono-code text-sm font-semibold text-[#9ca3af]">
                {project2.number}
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono-code text-[11px] tracking-wider uppercase px-2.5 py-0.5 rounded bg-white/[0.05] text-[#9ca3af] border border-white/[0.05]">
                {project2.label}
              </span>
            </div>

            {/* Mandatory Role Line */}
            <span className="font-mono-code text-xs text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">
              {project2.roleLine}
            </span>
          </div>

          <div className="mt-5">
            <h3 className="font-serif-heading text-2xl sm:text-3xl text-white font-medium tracking-tight">
              {project2.title}
            </h3>

            {/* Stack Pills */}
            <div className="mt-3 flex flex-wrap gap-2">
              {project2.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono-code text-xs px-2.5 py-0.5 rounded bg-[#161a22] text-[#9ca3af] border border-white/[0.06]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="mt-4 text-[#9ca3af] text-sm sm:text-base leading-relaxed">
              {project2.description}
            </p>

            {/* Bullet Highlights from CV */}
            <div className="mt-6 pt-5 border-t border-white/[0.06]">
              <h4 className="font-mono-code text-[11px] uppercase tracking-wider text-[#6b7280] mb-3">
                Key Backend Engineering Contributions:
              </h4>
              <ul className="space-y-2">
                {project2.bulletHighlights?.map((point) => (
                  <li
                    key={point}
                    className="text-xs sm:text-sm text-[#cbd5e1] flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-wrap items-center gap-3">
              {project2.links.map((link) => {
                const isPrimaryRepo = link.isPrimary;
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded text-xs font-mono-code transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-blue-400 ${
                      isPrimaryRepo
                        ? "bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30"
                        : "bg-[#161a22] border border-white/[0.08] text-[#9ca3af] hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Project 03 — Small Compact Row (Tech E-Commerce Web App) */}
        <div className="rounded-xl bg-[#0a0c10] border border-white/[0.06] p-5 sm:p-6 opacity-90 hover:opacity-100 transition-opacity">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.05]">
            <div className="flex items-center gap-3">
              <span className="font-mono-code text-xs text-[#6b7280]">
                {project3.number}
              </span>
              <span className="text-white/20">/</span>
              <h3 className="font-serif-heading text-lg sm:text-xl text-[#f4f4f7] font-medium">
                {project3.title}
              </h3>
              <span className="font-mono-code text-[10px] uppercase px-2 py-0.5 rounded bg-white/[0.04] text-[#6b7280] border border-white/[0.04]">
                {project3.label}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project3.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono-code text-[11px] px-2 py-0.5 rounded bg-[#12151b] text-[#6b7280] border border-white/[0.04]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-[#9ca3af] max-w-2xl font-sans-body">
              {project3.description}
            </p>

            {project3.links.length > 0 && (
              <div className="shrink-0">
                {project3.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-code text-[11px] text-[#6b7280] hover:text-blue-400 flex items-center gap-1 transition-colors min-h-[44px]"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
