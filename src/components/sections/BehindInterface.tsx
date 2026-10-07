import React from "react";
import { siteContent } from "@/content/siteContent";

export function BehindInterface() {
  const { heading, intro, areas } = siteContent.behindInterface;

  return (
    <section className="py-20 sm:py-28 border-b border-white/[0.08] bg-[#07080a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono-code text-[11px] text-blue-400 font-semibold tracking-widest uppercase">
              {"// 02. PERSPECTIVE"}
            </span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f4f4f7] tracking-tight">
            {heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9ca3af] font-sans-body leading-relaxed">
            {intro}
          </p>
        </div>

        {/* 8 Architectural Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {areas.map((area, idx) => {
            const indexStr = String(idx + 1).padStart(2, "0");
            return (
              <div
                key={area.title}
                className="bg-[#0e1117] border border-white/[0.08] hover:border-blue-500/30 p-5 rounded-lg transition-colors group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.05]">
                    <span className="font-mono-code text-xs text-blue-400 font-semibold">
                      {indexStr}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-base font-medium text-[#f4f4f7] mb-2 tracking-tight">
                    {area.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
