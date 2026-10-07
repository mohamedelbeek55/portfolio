"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();

  const pipeline = [
    { label: "Request", sub: "HTTP request", code: "01" },
    { label: "Controller", sub: "HTTP handling", code: "02" },
    { label: "Business Logic", sub: "Business rules & transactions", code: "03" },
    { label: "Repository", sub: "Data access abstraction", code: "04" },
    { label: "Database", sub: "PostgreSQL / MongoDB", code: "05" },
  ];

  const supportingPillars = [
    { name: "Auth", tag: "JWT & RBAC" },
    { name: "Validation", tag: "Input validation (Zod)" },
    { name: "Payments", tag: "Stripe PaymentIntents" },
    { name: "Testing", tag: "Jest & Supertest" },
    { name: "Deployment", tag: "Docker / Railway / Vercel" },
  ];

  return (
    <div className="w-full mt-10 lg:mt-14 p-4 sm:p-6 rounded-lg bg-[#0e1117]/80 border border-white/[0.08] engineering-grid relative overflow-hidden">
      {/* Blueprint Header Label */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-sm bg-blue-500/80" />
          <span className="font-mono-code text-[11px] uppercase tracking-wider text-[#9ca3af]">
            Architecture Pipeline Blueprint
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono-code text-[10px] text-[#6b7280]">
          <span>SPEC v1.2</span>
          <span>·</span>
          <span>STATELESS EXECUTION</span>
        </div>
      </div>

      {/* Main Flow: Responsive Horizontal (Desktop) / Vertical (Mobile) */}
      <div className="hidden md:grid md:grid-cols-5 gap-2 items-center relative py-2">
        {pipeline.map((step, idx) => (
          <React.Fragment key={step.label}>
            <div className="relative group">
              <motion.div
                initial={false}
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        borderColor: [
                          "rgba(255, 255, 255, 0.08)",
                          "rgba(59, 130, 246, 0.4)",
                          "rgba(255, 255, 255, 0.08)",
                        ],
                      }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: idx * 0.8,
                  ease: "easeInOut",
                }}
                className="bg-[#12151b] border border-white/[0.08] hover:border-blue-500/30 rounded p-3 text-left transition-all relative overflow-hidden"
              >
                {/* Active pulse bar */}
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500/50"
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: idx * 0.8,
                    }}
                  />
                )}

                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono-code text-[10px] text-blue-400/90 font-medium">
                    STEP {step.code}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-[#f4f4f7] tracking-tight">
                  {step.label}
                </h4>
                <p className="font-mono-code text-[10px] text-[#9ca3af] mt-0.5">
                  {step.sub}
                </p>
              </motion.div>
            </div>
            {/* Connector arrow between items (handled in grid) */}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Vertical Flow */}
      <div className="md:hidden flex flex-col gap-2 py-1">
        {pipeline.map((step, idx) => (
          <React.Fragment key={step.label}>
            <div className="bg-[#12151b] border border-white/[0.08] rounded p-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-[10px] text-blue-400">
                    {step.code}
                  </span>
                  <h4 className="text-xs font-semibold text-[#f4f4f7]">
                    {step.label}
                  </h4>
                </div>
                <p className="font-mono-code text-[10px] text-[#9ca3af] mt-0.5 pl-5">
                  {step.sub}
                </p>
              </div>
            </div>
            {idx < pipeline.length - 1 && (
              <div className="flex justify-center -my-1 text-white/20">
                <ArrowDown className="w-3.5 h-3.5" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Supporting Cross-cutting Layers */}
      <div className="mt-4 pt-4 border-t border-white/[0.06]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <span className="font-mono-code text-[10px] uppercase tracking-wider text-[#6b7280]">
            Cross-Cutting Concerns:
          </span>
          <div className="flex flex-wrap gap-2">
            {supportingPillars.map((pillar) => (
              <div
                key={pillar.name}
                className="font-mono-code text-[10px] px-2 py-1 rounded bg-[#161a22] border border-white/[0.06] text-[#9ca3af] flex items-center gap-1.5"
              >
                <span className="w-1 h-1 rounded-full bg-blue-400/80" />
                <span className="text-[#e2e8f0] font-medium">{pillar.name}</span>
                <span className="text-[#6b7280] hidden sm:inline">
                  ({pillar.tag})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
