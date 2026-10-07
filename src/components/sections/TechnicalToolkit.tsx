import React from "react";
import { siteContent } from "@/content/siteContent";

export function TechnicalToolkit() {
  const { heading, subheading, groups } = siteContent.toolkit;

  return (
    <section id="toolkit" className="py-20 sm:py-28 border-b border-white/[0.08] bg-[#07080a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono-code text-[11px] text-blue-400 font-semibold tracking-widest uppercase">
              {"// 04. STACK & TOOLS"}
            </span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f4f4f7] tracking-tight">
            {heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#9ca3af] font-sans-body leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Grouping Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => {
            const isDominant = group.isDominant;
            const isMinor = group.isMinor;

            return (
              <div
                key={group.category}
                className={`rounded-lg p-6 border transition-colors flex flex-col justify-between ${
                  isDominant
                    ? "bg-[#0e1117] border-white/[0.12] hover:border-blue-500/40"
                    : isMinor
                    ? "bg-[#0a0b0e] border-white/[0.05] opacity-80 hover:opacity-100"
                    : "bg-[#0e1117]/80 border-white/[0.07] hover:border-white/15"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
                    <h3
                      className={`font-mono-code text-xs font-semibold tracking-wider uppercase ${
                        isDominant
                          ? "text-blue-400"
                          : isMinor
                          ? "text-[#6b7280]"
                          : "text-[#cbd5e1]"
                      }`}
                    >
                      {group.category}
                    </h3>
                    {isDominant && (
                      <span className="font-mono-code text-[10px] text-blue-400/80 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        PRIMARY FOCUS
                      </span>
                    )}
                    {isMinor && (
                      <span className="font-mono-code text-[10px] text-[#6b7280]">
                        SUPPORTING
                      </span>
                    )}
                  </div>

                  {/* Skills Typography */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`font-mono-code rounded transition-colors ${
                          isDominant
                            ? "text-xs px-3 py-1.5 bg-[#141822] text-[#f4f4f7] border border-white/[0.09] font-medium"
                            : isMinor
                            ? "text-[11px] px-2.5 py-1 bg-[#101217] text-[#9ca3af] border border-white/[0.04]"
                            : "text-xs px-2.5 py-1.5 bg-[#12151b] text-[#cbd5e1] border border-white/[0.06]"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
