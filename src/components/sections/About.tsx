"use client";

import React from "react";
import { siteContent } from "@/content/siteContent";
import { IdentityPortrait } from "@/components/ui/IdentityPortrait";
import {
  GraduationCap,
  MapPin,
  FileText,
  Terminal,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
} from "lucide-react";

export function About() {
  const { about, meta } = siteContent;

  return (
    <section id="about" className="relative py-20 sm:py-28 lg:py-32 border-b border-[var(--border-subtle)] bg-[#080B12] overflow-hidden scroll-mt-20">
      {/* Background radial atmospheric glow */}
      <div className="absolute top-1/2 left-0 w-96 max-w-full h-96 bg-[var(--accent-electric)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 max-w-full h-96 bg-[var(--accent-neon-cyan)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Bio Dossier & Philosophy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C1424] border border-[var(--border-subtle)] font-mono-code text-xs text-[var(--accent-neon-cyan)] mb-4 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
              <Terminal className="w-3.5 h-3.5" />
              <span>ENGINEERING DOSSIER {"//"}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-[1.05]">
              MOHAMED ELBEEK
            </h2>
            <p className="font-mono-code text-sm text-[var(--accent-neon-cyan)] mt-2">
              Full-Stack Developer &amp; Backend-Focused Engineer
            </p>

            {/* Core Narrative */}
            <div className="mt-8 space-y-5 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-sans-body">
              <p>
                I build complete digital products &mdash; from engaging user interfaces to secure backend systems and reliable infrastructure.
              </p>
              <p>
                Most of my work revolves around Node.js, NestJS, TypeScript, PostgreSQL, and clean architecture. I enjoy the parts of software that users don&apos;t always see: designing resilient APIs, handling complex business logic, ensuring transactional data consistency, fortifying authentication, and writing automated test suites.
              </p>
              <p>
                Having graduated from Sinai University with a Bachelor of Science in Information Technology (GPA 3.09 / 4.0, Very Good), I focus on engineering scalable, production-grade applications where reliability and maintainability are first-class priorities.
              </p>
            </div>

            {/* Engineering Principles Grid */}
            <div className="mt-8 pt-8 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0C1424] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-[var(--accent-neon-cyan)]" />
                  <span className="font-mono-code text-xs text-[var(--accent-neon-cyan)] font-semibold">
                    01. TRANSACTIONAL INTEGRITY
                  </span>
                </div>
                <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                  Strict atomic mutations with zero data drift or concurrency overselling.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0C1424] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Cpu className="w-4 h-4 text-[var(--accent-electric-hover)]" />
                  <span className="font-mono-code text-xs text-[var(--accent-electric-hover)] font-semibold">
                    02. CLEAN ARCHITECTURE
                  </span>
                </div>
                <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                  Decoupled business logic isolated from HTTP routing and persistence drivers.
                </p>
              </div>
            </div>

            {/* Download CV Action */}
            <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex items-center gap-4">
              <a
                href={meta.cvPath}
                download="Mohamed_Elbeek_CV.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0C1424] hover:bg-[#111C33] border border-[var(--border-cyan)] text-xs sm:text-sm font-mono-code text-[var(--accent-neon-cyan)] hover:text-white transition-all shadow-[0_0_15px_rgba(56,189,248,0.12)] cursor-pointer min-h-[48px]"
                aria-label="Download Mohamed Elbeek CV PDF"
              >
                <FileText className="w-4 h-4 text-[var(--accent-neon-cyan)]" />
                <span>Download Official CV (PDF)</span>
                <span className="text-[var(--text-muted)]">·</span>
                <span className="text-[var(--text-tertiary)]">3.09 GPA</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Identity & Telemetry Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#0C1424] to-[#080B12] border border-[var(--border-medium)] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 engineering-grid opacity-30 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--border-subtle)]">
                <span className="font-mono-code text-xs uppercase tracking-wider text-[var(--accent-neon-cyan)]">
                  Academic &amp; Profile Telemetry
                </span>
                <span className="flex items-center gap-1.5 font-mono-code text-[11px] text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Verified
                </span>
              </div>

              {/* Centered Identity Portrait / Abstract Monogram Portal */}
              <div className="flex justify-center mb-8">
                <IdentityPortrait size="md" />
              </div>

              <div className="space-y-6">
                {/* Academic Degree */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-electric)]/15 border border-[var(--border-accent)] flex items-center justify-center text-[var(--accent-neon-cyan)] shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono-code text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider block">
                      Education
                    </span>
                    <h4 className="font-display text-base font-bold text-white mt-0.5">
                      {about.education.degree}
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      {about.education.university} &middot; {about.education.gradDate}
                    </p>
                    <span className="inline-block font-mono-code text-xs font-semibold text-[var(--accent-neon-cyan)] bg-[var(--accent-neon-cyan)]/10 px-2.5 py-0.5 rounded border border-[var(--accent-neon-cyan)]/25 mt-2">
                      {about.education.gpa}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 pt-5 border-t border-[var(--border-subtle)]">
                  <div className="w-10 h-10 rounded-xl bg-[#080B12] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-tertiary)] shrink-0">
                    <MapPin className="w-5 h-5 text-[var(--text-secondary)]" />
                  </div>
                  <div>
                    <span className="font-mono-code text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider block">
                      Current Location
                    </span>
                    <h4 className="font-display text-base font-bold text-white mt-0.5">
                      {meta.location}
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      Available for full-time engineering positions, hybrid/remote roles, and selective contract systems.
                    </p>
                  </div>
                </div>

                {/* Languages */}
                <div className="pt-5 border-t border-[var(--border-subtle)]">
                  <span className="font-mono-code text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider block mb-2">
                    Linguistic Capabilities
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono-code">
                    <span className="px-3 py-1 rounded bg-[#080B12] border border-[var(--border-subtle)] text-white">
                      Arabic (Native)
                    </span>
                    <span className="px-3 py-1 rounded bg-[#080B12] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                      English (Good)
                    </span>
                  </div>
                </div>

                {/* Verified Accounts */}
                <div className="pt-5 border-t border-[var(--border-subtle)]">
                  <span className="font-mono-code text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider block mb-3">
                    Connected Developer Profiles
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={meta.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-[#080B12] hover:bg-white/[0.05] border border-[var(--border-subtle)] text-xs font-mono-code text-[var(--text-secondary)] hover:text-white flex items-center justify-between transition-colors min-h-[44px]"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                    </a>
                    <a
                      href={meta.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-[#080B12] hover:bg-white/[0.05] border border-[var(--border-subtle)] text-xs font-mono-code text-[var(--text-secondary)] hover:text-white flex items-center justify-between transition-colors min-h-[44px]"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
