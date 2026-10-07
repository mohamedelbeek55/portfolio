"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { ecommerceCaseStudy } from "@/content/ecommerceCaseStudy";
import { siteContent } from "@/content/siteContent";

export function EcommerceCaseStudyView() {
  const {
    meta,
    factsStrip,
    links,
    tableOfContents,
    architecture,
    security,
    concurrency,
    payments,
    testingAndDeployment,
    reflection,
  } = ecommerceCaseStudy;

  const [activeSection, setActiveSection] = useState("overview");

  // Track active section for table of contents
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = tableOfContents.length - 1; i >= 0; i--) {
        const element = document.getElementById(tableOfContents[i].id);
        if (element && element.offsetTop <= scrollPos) {
          setActiveSection(tableOfContents[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tableOfContents]);

  return (
    <div className="min-h-screen bg-[#090a0d] text-[#f4f4f7] selection:bg-blue-500/30 selection:text-white flex flex-col justify-between">
      {/* Top Header / Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#090a0d]/90 backdrop-blur-md border-b border-white/[0.08] py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-xs font-mono-code text-[#9ca3af] hover:text-white transition-colors p-1.5 -ml-1.5 rounded focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Back to Selected Work on Home Page"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Work</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="font-mono-code text-[11px] text-[#6b7280] hidden sm:inline-block">
              ENGINEERING CASE STUDY
            </span>
            <span className="hidden sm:inline-block text-white/10">·</span>
            <div className="flex items-center gap-2">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-code text-xs text-[#cbd5e1] hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-[#12151b] border border-white/[0.08] hover:border-white/20 transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-[#6b7280]" />
              </a>
              <a
                href={links.liveApp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-code text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
              >
                <span>Live App</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Page Layout */}
      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Desktop Left Sidebar: Sticky Section Index / TOC */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24">
            <div className="p-4 rounded-lg bg-[#0e1117]/80 border border-white/[0.07]">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="font-mono-code text-[11px] uppercase tracking-wider text-[#9ca3af]">
                  Section Index
                </span>
              </div>
              <nav aria-label="Case Study Table of Contents" className="space-y-1">
                {tableOfContents.map((item) => {
                  const isCurrent = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`flex items-center justify-between text-xs px-2.5 py-2 rounded transition-colors ${
                        isCurrent
                          ? "bg-blue-500/15 text-blue-300 font-medium border border-blue-500/30"
                          : "text-[#9ca3af] hover:text-[#f4f4f7] hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className="truncate">{item.title}</span>
                      <span className="font-mono-code text-[10px] text-[#6b7280] ml-2 shrink-0">
                        {item.number}
                      </span>
                    </a>
                  );
                })}
              </nav>

              {/* Quick links in sidebar */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] space-y-2 font-mono-code text-xs">
                <a
                  href={links.swagger}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-[#9ca3af] hover:text-blue-400 p-1 transition-colors"
                >
                  <span>Swagger API Docs</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-[#9ca3af] hover:text-white p-1 transition-colors"
                >
                  <span>Backend Repo</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </aside>

          {/* Main Case Study Article (Readable Column) */}
          <article className="lg:col-span-9 max-w-3xl space-y-20">
            {/* 01 — OVERVIEW */}
            <section id="overview" className="scroll-mt-28">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-mono-code text-xs text-blue-400 font-semibold tracking-wider">
                  PROJECT {meta.number}
                </span>
                <span className="text-white/20">/</span>
                <span className="font-mono-code text-[11px] uppercase tracking-wider text-[#9ca3af] px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.05]">
                  {meta.label}
                </span>
              </div>

              <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight">
                {meta.title}
              </h1>

              {/* Facts Strip */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 sm:p-5 rounded-lg bg-[#0e1117] border border-white/[0.08]">
                {factsStrip.map((fact) => (
                  <div key={fact.label} className="flex flex-col">
                    <span className="font-mono-code text-[10px] uppercase tracking-wider text-[#6b7280]">
                      {fact.label}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#e2e8f0] mt-0.5">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Main Summary */}
              <div className="mt-6 text-base sm:text-lg text-[#9ca3af] leading-relaxed font-sans-body space-y-4">
                <p>{meta.summary}</p>
              </div>

              {/* Visible Placeholder */}
              <div className="mt-6 p-4 rounded-md bg-[#12151b] border border-blue-500/20 text-xs font-mono-code text-blue-300/90 leading-relaxed">
                <div className="flex items-center gap-2 mb-1 text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="uppercase tracking-wider text-[10px] font-semibold">
                    Project Motivation Note
                  </span>
                </div>
                {meta.whyBuiltPlaceholder}
              </div>
            </section>

            {/* 02 — ARCHITECTURE */}
            <section id="architecture" className="scroll-mt-28 pt-8 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono-code text-xs text-blue-400 font-semibold tracking-wider">
                  {"// 02. ARCHITECTURE"}
                </span>
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-3xl text-white font-medium tracking-tight">
                {architecture.title}
              </h2>

              <p className="mt-4 text-base text-[#9ca3af] leading-relaxed font-sans-body">
                {architecture.description}
              </p>

              {/* Architectural Flow Diagram */}
              <div className="mt-8 p-6 rounded-lg bg-[#0e1117] border border-white/[0.08] engineering-grid">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.06]">
                  <span className="font-mono-code text-[11px] uppercase tracking-wider text-[#9ca3af]">
                    Layered Dependency Flow
                  </span>
                  <span className="font-mono-code text-[10px] text-[#6b7280]">
                    UNIDIRECTIONAL DECOUPLING
                  </span>
                </div>

                {/* Flow Diagram (Horizontal on Desktop, Vertical on Mobile) */}
                <div className="space-y-3">
                  {architecture.layers.map((layer) => (
                    <div
                      key={layer.name}
                      className="p-3.5 rounded bg-[#12151b] border border-white/[0.06] hover:border-blue-500/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono-code text-xs font-semibold text-blue-400 shrink-0">
                          {layer.step}
                        </span>
                        <h3 className="text-sm font-semibold text-white tracking-tight">
                          {layer.name}
                        </h3>
                      </div>
                      <p className="font-mono-code text-xs text-[#9ca3af] sm:text-right pl-7 sm:pl-0">
                        {layer.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Example Placeholder */}
              <div className="mt-6 p-4 rounded-md bg-[#12151b] border border-blue-500/20 text-xs font-mono-code text-blue-300/90 leading-relaxed">
                <div className="flex items-center gap-2 mb-1 text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="uppercase tracking-wider text-[10px] font-semibold">
                    Module Layer Example
                  </span>
                </div>
                {architecture.moduleExamplePlaceholder}
              </div>
            </section>

            {/* 03 — AUTHENTICATION & SECURITY */}
            <section id="authentication" className="scroll-mt-28 pt-8 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono-code text-xs text-blue-400 font-semibold tracking-wider">
                  {"// 03. AUTH & SECURITY"}
                </span>
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-3xl text-white font-medium tracking-tight">
                {security.title}
              </h2>

              <div className="mt-6 divide-y divide-white/[0.06] border-y border-white/[0.06]">
                {security.items.map((item, idx) => (
                  <div key={idx} className="py-3.5 flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-[#cbd5e1] leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Rotation Placeholder */}
              <div className="mt-6 p-4 rounded-md bg-[#12151b] border border-blue-500/20 text-xs font-mono-code text-blue-300/90 leading-relaxed">
                <div className="flex items-center gap-2 mb-1 text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="uppercase tracking-wider text-[10px] font-semibold">
                    Token Rotation Mechanics
                  </span>
                </div>
                {security.rotationPlaceholder}
              </div>
            </section>

            {/* 04 — INVENTORY & CONCURRENCY */}
            <section id="inventory" className="scroll-mt-28 pt-8 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono-code text-xs text-blue-400 font-semibold tracking-wider">
                  {"// 04. CONCURRENCY"}
                </span>
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-3xl text-white font-medium tracking-tight">
                Inventory Consistency & Race Conditions
              </h2>

              {/* Problem / Approach / Result Triad */}
              <div className="mt-6 space-y-4">
                {/* The Problem */}
                <div className="p-5 rounded-lg bg-[#0e1117] border border-red-500/20">
                  <span className="font-mono-code text-[11px] uppercase tracking-wider text-red-400 font-semibold block mb-1.5">
                    THE PROBLEM
                  </span>
                  <p className="text-sm sm:text-base text-[#f4f4f7] leading-relaxed">
                    &ldquo;{concurrency.problem}&rdquo;
                  </p>
                </div>

                {/* The Approach */}
                <div className="p-5 rounded-lg bg-[#0e1117] border border-blue-500/30">
                  <span className="font-mono-code text-[11px] uppercase tracking-wider text-blue-400 font-semibold block mb-1.5">
                    THE APPROACH
                  </span>
                  <p className="text-sm sm:text-base text-[#f4f4f7] leading-relaxed">
                    &ldquo;{concurrency.approach}&rdquo;
                  </p>
                </div>

                {/* The Result */}
                <div className="p-5 rounded-lg bg-[#0e1117] border border-emerald-500/20">
                  <span className="font-mono-code text-[11px] uppercase tracking-wider text-emerald-400 font-semibold block mb-1.5">
                    THE RESULT
                  </span>
                  <p className="text-sm sm:text-base text-[#f4f4f7] leading-relaxed">
                    &ldquo;{concurrency.result}&rdquo;
                  </p>
                </div>
              </div>

              {/* Concurrency Test Placeholder */}
              <div className="mt-6 p-4 rounded-md bg-[#12151b] border border-blue-500/20 text-xs font-mono-code text-blue-300/90 leading-relaxed">
                <div className="flex items-center gap-2 mb-1 text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="uppercase tracking-wider text-[10px] font-semibold">
                    Concurrency Test Strategy
                  </span>
                </div>
                {concurrency.placeholderTest}
              </div>
            </section>

            {/* 05 — PAYMENTS */}
            <section id="payments" className="scroll-mt-28 pt-8 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono-code text-xs text-blue-400 font-semibold tracking-wider">
                  {"// 05. PAYMENTS"}
                </span>
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-3xl text-white font-medium tracking-tight">
                {payments.title}
              </h2>

              <p className="mt-4 text-base text-[#9ca3af] leading-relaxed font-sans-body">
                {payments.description}
              </p>

              {/* Webhook Order Lifecycle Placeholder */}
              <div className="mt-6 p-4 rounded-md bg-[#12151b] border border-blue-500/20 text-xs font-mono-code text-blue-300/90 leading-relaxed">
                <div className="flex items-center gap-2 mb-1 text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="uppercase tracking-wider text-[10px] font-semibold">
                    Webhook Order Lifecycle
                  </span>
                </div>
                {payments.webhookStatePlaceholder}
              </div>
            </section>

            {/* 06 — TESTING & DEPLOYMENT */}
            <section id="testing" className="scroll-mt-28 pt-8 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono-code text-xs text-blue-400 font-semibold tracking-wider">
                  {"// 06. VERIFICATION & INFRA"}
                </span>
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-3xl text-white font-medium tracking-tight">
                {testingAndDeployment.title}
              </h2>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {testingAndDeployment.items.map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-lg bg-[#0e1117] border border-white/[0.07] flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-white tracking-tight flex items-center justify-between">
                        <span>{item.label}</span>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono-code text-blue-400 hover:text-blue-300 inline-flex items-center gap-0.5"
                          >
                            <span>Open Docs</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                      </h3>
                      <p className="text-xs text-[#9ca3af] mt-2 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 07 — REFLECTION / CLOSING BLOCK */}
            <section id="next-steps" className="scroll-mt-28 pt-8 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono-code text-xs text-blue-400 font-semibold tracking-wider">
                  {"// 07. POST-MORTEM & NEXT ITERATION"}
                </span>
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-3xl text-white font-medium tracking-tight">
                {reflection.title}
              </h2>

              <p className="mt-3 text-sm text-[#9ca3af] leading-relaxed">
                {reflection.intro}
              </p>

              {/* Reflection Placeholder */}
              <div className="mt-4 p-4 rounded-md bg-[#12151b] border border-blue-500/20 text-xs font-mono-code text-blue-300/90 leading-relaxed">
                <div className="flex items-center gap-2 mb-1 text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="uppercase tracking-wider text-[10px] font-semibold">
                    Roadmap & Improvements Placeholder
                  </span>
                </div>
                {reflection.placeholderImprovements}
              </div>

              {/* CTA Action Bar */}
              <div className="mt-10 p-6 rounded-xl bg-[#0e1117] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-medium text-white">
                    Explore Codebase or Connect
                  </h3>
                  <p className="text-xs text-[#9ca3af] mt-0.5">
                    Review repository branches or discuss backend opportunities.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono-code transition-colors min-h-[44px]"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={links.liveApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-[#161a22] border border-white/[0.08] text-xs font-mono-code text-[#f4f4f7] hover:border-white/20 transition-colors min-h-[44px]"
                  >
                    <span>Live App</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#6b7280]" />
                  </a>
                  <a
                    href={links.swagger}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-[#161a22] border border-white/[0.08] text-xs font-mono-code text-[#f4f4f7] hover:border-white/20 transition-colors min-h-[44px]"
                  >
                    <span>Swagger</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#6b7280]" />
                  </a>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-[#161a22] border border-white/[0.08] text-xs font-mono-code text-blue-400 hover:border-blue-500/40 transition-colors min-h-[44px]"
                  >
                    <span>Contact</span>
                  </Link>
                </div>
              </div>

              {/* Next Project Link */}
              <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
                <Link
                  href="/#work"
                  className="group inline-flex items-center gap-2 text-xs font-mono-code text-[#9ca3af] hover:text-white transition-colors min-h-[44px]"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>Return to Selected Work</span>
                </Link>

                <Link
                  href={links.nextProject.href}
                  className="group inline-flex items-center gap-2 text-xs font-mono-code text-blue-400 hover:text-blue-300 transition-colors min-h-[44px]"
                >
                  <span className="text-right">
                    <span className="text-[#6b7280] block text-[10px]">
                      {links.nextProject.label}
                    </span>
                    <span>{links.nextProject.title}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-8 px-4 sm:px-6 bg-[#07080a] text-center text-xs font-mono-code text-[#6b7280]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>{siteContent.footer.author} — {siteContent.footer.role}</span>
          <Link href="/" className="hover:text-white transition-colors underline">
            Return to Portfolio Home
          </Link>
          <span>{siteContent.footer.copyright}</span>
        </div>
      </footer>
    </div>
  );
}
