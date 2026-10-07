import React from "react";
import { siteContent } from "@/content/siteContent";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { ArrowDown, ArrowUpRight, FileText, Send } from "lucide-react";

export function Hero() {
  const { meta, hero } = siteContent;

  return (
    <section
      id="top"
      className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 border-b border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Editorial Subheader Meta Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#12151b] border border-white/[0.08] font-mono-code text-[11px] text-[#9ca3af]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-semibold text-white tracking-wider">
              {hero.badge}
            </span>
          </div>

          <span className="font-mono-code text-[11px] text-[#6b7280]">
            {meta.name}
          </span>
        </div>

        {/* Primary Editorial Headline (One H1 per page) */}
        <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#f4f4f7] leading-[1.15] max-w-4xl text-balance">
          {hero.headline}
        </h1>

        {/* Supporting Paragraph */}
        <p className="mt-6 text-base sm:text-lg text-[#9ca3af] max-w-2xl leading-relaxed font-sans-body">
          {hero.supportingText}
        </p>

        {/* Status line */}
        <div className="mt-6 flex items-center gap-2 text-xs font-mono-code text-[#6b7280]">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
          <span>{hero.statusLine}</span>
        </div>

        {/* CTA Buttons & Secondary Links */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <span>{hero.primaryCta.label}</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-[#12151b] hover:bg-[#1a202c] border border-white/[0.1] text-[#f4f4f7] text-sm font-medium transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <span>{hero.secondaryCta.label}</span>
              <Send className="w-3.5 h-3.5 text-blue-400" />
            </a>
          </div>

          <div className="hidden sm:block w-px h-7 bg-white/[0.08] mx-1" />

          {/* Secondary Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2 sm:pt-0 font-mono-code text-xs text-[#9ca3af]">
            <a
              href={meta.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white transition-colors py-2 px-1 focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
              aria-label="GitHub Profile"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-[#6b7280]" />
            </a>
            <span className="text-white/10">·</span>
            <a
              href={meta.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white transition-colors py-2 px-1 focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
              aria-label="LinkedIn Profile"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-[#6b7280]" />
            </a>
            <span className="text-white/10">·</span>
            <a
              href={meta.cvPath}
              download="Mohamed_Elbeek_CV.pdf"
              className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors py-2 px-1 focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
              aria-label="Download Mohamed Elbeek CV PDF"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        {/* Hero Visual Blueprint */}
        <HeroVisual />
      </div>
    </section>
  );
}
