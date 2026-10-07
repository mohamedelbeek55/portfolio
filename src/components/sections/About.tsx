import React from "react";
import { siteContent } from "@/content/siteContent";
import { FileText, GraduationCap, MapPin } from "lucide-react";

export function About() {
  const { about, meta } = siteContent;

  return (
    <section id="about" className="py-20 sm:py-28 border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading and Story */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono-code text-[11px] text-blue-400 font-semibold tracking-widest uppercase">
                {"// 05. BACKGROUND"}
              </span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f4f4f7] tracking-tight">
              {about.title}
            </h2>

            <div className="mt-6 space-y-4 text-base sm:text-lg text-[#9ca3af] leading-relaxed font-sans-body">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Quiet Download CV link */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <a
                href={meta.cvPath}
                download="Mohamed_Elbeek_CV.pdf"
                className="inline-flex items-center gap-2 font-mono-code text-xs text-blue-400 hover:text-blue-300 transition-colors p-2 -ml-2 rounded hover:bg-white/[0.03] focus-visible:ring-2 focus-visible:ring-blue-400 min-h-[44px]"
                aria-label="Download CV (PDF)"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Download CV (PDF)</span>
                <span className="text-[#6b7280]">·</span>
                <span className="text-[#6b7280]">PDF document</span>
              </a>
            </div>
          </div>

          {/* Right Column: Verified Facts Box */}
          <div className="lg:col-span-5 bg-[#0e1117] border border-white/[0.08] rounded-xl p-6 sm:p-8">
            <div className="pb-4 mb-6 border-b border-white/[0.06] flex items-center justify-between">
              <h3 className="font-mono-code text-xs font-semibold tracking-wider uppercase text-[#cbd5e1]">
                Academic & Profile Facts
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
            </div>

            <div className="space-y-6">
              {/* Degree */}
              <div className="flex items-start gap-3.5">
                <GraduationCap className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-[#f4f4f7]">
                    {about.education.degree}
                  </h4>
                  <p className="text-xs text-[#9ca3af] mt-0.5">
                    {about.education.university} · Graduated {about.education.gradDate}
                  </p>
                  <p className="font-mono-code text-xs text-blue-400 mt-1">
                    {about.education.gpa}
                  </p>
                </div>
              </div>

              {/* Location & Status */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-white/[0.05]">
                <MapPin className="w-5 h-5 text-[#6b7280] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-[#f4f4f7]">
                    {meta.location}
                  </h4>
                  <p className="text-xs text-[#9ca3af] mt-0.5">
                    Open to backend-focused software engineering roles and selected freelance projects
                  </p>
                </div>
              </div>

              {/* Languages */}
              <div className="pt-4 border-t border-white/[0.05]">
                <h4 className="font-mono-code text-[11px] uppercase tracking-wider text-[#6b7280] mb-2">
                  Languages
                </h4>
                <div className="flex items-center gap-4 text-xs font-mono-code text-[#cbd5e1]">
                  <span>Arabic (Native)</span>
                  <span className="text-white/20">·</span>
                  <span>English (Good)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
