"use client";

import React from "react";
import { siteContent } from "@/content/siteContent";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[#05070A] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[var(--accent-neon-cyan)]" />
            <span className="font-display font-bold text-white tracking-tight text-base sm:text-lg">
              MOHAMED ELBEEK
            </span>
            <span className="font-mono-code text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider">
              / Digital Engineering
            </span>
          </div>

          <p className="text-xs text-[var(--text-secondary)] font-sans-body mt-2 max-w-md">
            Full-Stack Developer &amp; Backend-Focused Engineer. Building complete digital products with clean architecture, data consistency, and reliable infrastructure.
          </p>

          <p className="text-xs font-mono-code text-[var(--text-muted)] mt-2">
            © 2026 Mohamed Elbeek. All rights reserved.
          </p>
        </div>

        {/* Navigation & Channels */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 text-xs font-mono-code text-[var(--text-secondary)]">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#top"
              className="hover:text-white transition-colors p-1"
            >
              Top &uarr;
            </a>
            <span className="text-[var(--border-strong)]">/</span>
            <a
              href="#work"
              className="hover:text-white transition-colors p-1"
            >
              Work
            </a>
            <span className="text-[var(--border-strong)]">/</span>
            <a
              href="#expertise"
              className="hover:text-white transition-colors p-1"
            >
              Expertise
            </a>
            <span className="text-[var(--border-strong)]">/</span>
            <a
              href="#engineering"
              className="hover:text-white transition-colors p-1"
            >
              Engineering
            </a>
            <span className="text-[var(--border-strong)]">/</span>
            <a
              href="#about"
              className="hover:text-white transition-colors p-1"
            >
              About
            </a>
          </div>

          <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-[var(--border-subtle)] pt-4 sm:pt-0 sm:pl-6">
            <a
              href={siteContent.meta.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-neon-cyan)] flex items-center gap-0.5 transition-colors p-1"
              aria-label="Mohamed Elbeek GitHub"
            >
              GitHub
              <ArrowUpRight className="w-3 h-3 text-[var(--text-tertiary)]" />
            </a>
            <span className="text-[var(--border-strong)]">·</span>
            <a
              href={siteContent.meta.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-neon-cyan)] flex items-center gap-0.5 transition-colors p-1"
              aria-label="Mohamed Elbeek LinkedIn"
            >
              LinkedIn
              <ArrowUpRight className="w-3 h-3 text-[var(--text-tertiary)]" />
            </a>
            <span className="text-[var(--border-strong)]">·</span>
            <a
              href={`mailto:${siteContent.meta.email}`}
              className="hover:text-[var(--accent-neon-cyan)] transition-colors p-1"
              aria-label="Send Email to Mohamed Elbeek"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
