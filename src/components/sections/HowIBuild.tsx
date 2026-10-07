"use client";

import React, { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { siteContent } from "@/content/siteContent";
import { ArrowDown } from "lucide-react";

export function HowIBuild() {
  const { heading, subheading, flowTitle, flow, crossCutting } =
    siteContent.howIBuild;
  const shouldReduceMotion = useReducedMotion();

  // Active step index for single-pass calm visualization
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flow.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [shouldReduceMotion, flow.length]);

  return (
    <section id="architecture" className="py-20 sm:py-28 border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono-code text-[11px] text-blue-400 font-semibold tracking-widest uppercase">
              {"// 03. ARCHITECTURE"}
            </span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f4f4f7] tracking-tight">
            {heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#9ca3af] font-sans-body leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Blueprint Container */}
        <div className="rounded-xl bg-[#0e1117] border border-white/[0.08] engineering-grid p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          {/* Schematic Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-sm bg-blue-500" />
              <h3 className="font-mono-code text-xs font-semibold tracking-widest uppercase text-[#e2e8f0]">
                {flowTitle}
              </h3>
            </div>
            <div className="font-mono-code text-[11px] text-[#6b7280] flex items-center gap-3">
              <span>CLEAN ARCHITECTURE</span>
              <span>·</span>
              <span>REPOSITORY PATTERN</span>
            </div>
          </div>

          {/* Desktop Flow: 6 Consecutive Stages */}
          <div className="hidden lg:grid lg:grid-cols-6 gap-3 relative py-4">
            {flow.map((stage, idx) => {
              const isActive = activeStep === idx && !shouldReduceMotion;
              return (
                <div key={stage.step} className="relative">
                  <div
                    className={`rounded-lg p-4 transition-all duration-300 h-full flex flex-col justify-between border ${
                      isActive
                        ? "bg-[#181d26] border-blue-500/50 shadow-md shadow-blue-500/10"
                        : "bg-[#12151b] border-white/[0.07] hover:border-white/[0.15]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`font-mono-code text-[11px] font-semibold ${
                            isActive ? "text-blue-400" : "text-[#6b7280]"
                          }`}
                        >
                          {stage.step}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-[#f4f4f7] tracking-tight">
                        {stage.name}
                      </h4>
                    </div>

                    <p className="font-mono-code text-[11px] text-[#9ca3af] mt-4 pt-3 border-t border-white/[0.05]">
                      {stage.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tablet Flow (2x3 Grid) */}
          <div className="hidden sm:grid lg:hidden grid-cols-2 md:grid-cols-3 gap-3 py-2">
            {flow.map((stage, idx) => {
              const isActive = activeStep === idx && !shouldReduceMotion;
              return (
                <div
                  key={stage.step}
                  className={`rounded-lg p-4 transition-all border ${
                    isActive
                      ? "bg-[#181d26] border-blue-500/50"
                      : "bg-[#12151b] border-white/[0.07]"
                  }`}
                >
                  <span className="font-mono-code text-[11px] text-blue-400 font-semibold">
                    {stage.step}
                  </span>
                  <h4 className="text-sm font-semibold text-[#f4f4f7] mt-1">
                    {stage.name}
                  </h4>
                  <p className="font-mono-code text-[11px] text-[#9ca3af] mt-2">
                    {stage.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mobile Flow (Vertical List) */}
          <div className="sm:hidden flex flex-col gap-2.5 py-1">
            {flow.map((stage, idx) => (
              <React.Fragment key={stage.step}>
                <div className="bg-[#12151b] border border-white/[0.08] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono-code text-xs text-blue-400 font-semibold">
                      {stage.step}
                    </span>
                    <h4 className="text-sm font-semibold text-[#f4f4f7]">
                      {stage.name}
                    </h4>
                  </div>
                  <p className="font-mono-code text-xs text-[#9ca3af] pl-6">
                    {stage.detail}
                  </p>
                </div>
                {idx < flow.length - 1 && (
                  <div className="flex justify-center -my-1 text-white/20">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Supporting Cross-Cutting Layers Alongside */}
          <div className="mt-8 pt-6 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-sm bg-[#6b7280]" />
              <h4 className="font-mono-code text-[11px] uppercase tracking-wider text-[#9ca3af]">
                Supporting Cross-Cutting Concerns
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {crossCutting.map((item) => (
                <div
                  key={item.name}
                  className="bg-[#12151b]/80 border border-white/[0.06] rounded p-3 text-left"
                >
                  <p className="text-xs font-semibold text-[#f4f4f7] flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-blue-400" />
                    {item.name}
                  </p>
                  <p className="font-mono-code text-[10px] text-[#9ca3af] mt-1.5 leading-tight">
                    {item.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
