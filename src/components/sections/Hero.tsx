"use client";

import React, { useEffect, useRef, useSyncExternalStore, useCallback } from "react";
import { siteContent } from "@/content/siteContent";
import { Scene3D } from "@/components/hero/Scene3D";
import {
  ArrowDown,
  ArrowUpRight,
  FileText,
  Layers,
  Sparkles,
  Terminal,
  Activity,
  Cpu,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Hero() {
  const { meta } = siteContent;
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);

  // Direct DOM refs for 60fps scroll updates with ZERO React re-renders
  const stageARef = useRef<HTMLDivElement>(null);
  const stageBRef = useRef<HTMLDivElement>(null);
  const stageCRef = useRef<HTMLDivElement>(null);
  const stageDRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const cameraStageTextRef = useRef<HTMLSpanElement>(null);
  const pipelinePercentTextRef = useRef<HTMLSpanElement>(null);

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  // Direct DOM updater bypassing React reconciliation entirely
  const updateDomOverlays = useCallback((p: number) => {
    // Stage A: 0.00 - 0.25 (Close-up)
    const opA = p < 0.2 ? 1 - p / 0.2 : 0;
    if (stageARef.current) {
      stageARef.current.style.opacity = opA.toFixed(3);
      stageARef.current.style.pointerEvents = p < 0.15 ? "auto" : "none";
    }

    // Stage B: 0.22 - 0.55 (Pull-back & Telemetry)
    const opB =
      p >= 0.2 && p < 0.55
        ? p < 0.35
          ? (p - 0.2) / 0.15
          : p <= 0.45
          ? 1
          : 1 - (p - 0.45) / 0.1
        : 0;
    if (stageBRef.current) {
      stageBRef.current.style.opacity = opB.toFixed(3);
    }

    // Stage C: 0.50 - 0.88 (Identity Reveal)
    const opC =
      p >= 0.5 && p <= 0.88
        ? p < 0.65
          ? (p - 0.5) / 0.15
          : p <= 0.8
        ? 1
        : 1 - (p - 0.8) / 0.08
        : p > 0.88
        ? Math.max(0, 1 - (p - 0.88) / 0.12)
        : 0;
    if (stageCRef.current) {
      stageCRef.current.style.opacity = opC.toFixed(3);
      stageCRef.current.style.transform = `translateY(${(1 - opC) * 20}px)`;
      stageCRef.current.style.pointerEvents = p >= 0.55 && p <= 0.95 ? "auto" : "none";
    }

    // Stage D bottom horizon gradient
    if (stageDRef.current) {
      const opD = p > 0.85 ? Math.max(0.4, 0.4 + ((p - 0.85) / 0.15) * 0.6) : 0.4;
      stageDRef.current.style.opacity = opD.toFixed(3);
    }

    // GPU-accelerated scaleX progress bar (zero layout reflow!)
    if (progressBarRef.current) {
      const clampedP = Math.max(0, Math.min(1, p));
      progressBarRef.current.style.transform = `scaleX(${clampedP})`;
    }

    // Telemetry text indicators
    const pct = Math.round(p * 100);
    if (pipelinePercentTextRef.current) {
      pipelinePercentTextRef.current.textContent = `[${pct}%]`;
    }
    if (cameraStageTextRef.current) {
      const stageName =
        p < 0.25
          ? "01_INSPECT"
          : p < 0.55
          ? "02_WIDE_FIELD"
          : p < 0.85
          ? "03_IDENTITY"
          : "04_TRANSITION";
      if (cameraStageTextRef.current.textContent !== stageName) {
        cameraStageTextRef.current.textContent = stageName;
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isReducedMotion) {
      scrollProgressRef.current = 0.7;
      updateDomOverlays(0.7);
      return;
    }

    // Initialize overlays at Stage A
    updateDomOverlays(0);

    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    if (!track) return;

    // Single ScrollTrigger updating mutable ref and direct DOM without React re-renders
    const st = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
        updateDomOverlays(self.progress);
      },
    });

    return () => {
      st.kill();
    };
  }, [isReducedMotion, updateDomOverlays]);

  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("work");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToEngineering = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("engineering");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="top"
      ref={trackRef}
      className={`relative w-full ${
        isReducedMotion ? "min-h-screen" : "h-[320vh]"
      } bg-[#080B12]`}
    >
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between select-none">
        {/* Genuine 3D WebGL Canvas Layer with stable ref interface */}
        <Scene3D progressRef={scrollProgressRef} />

        {/* Ambient Radial Atmospheric Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#2563EB]/15 via-[#38BDF8]/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-44 bg-gradient-to-t from-[#080B12] via-[#080B12]/80 to-transparent pointer-events-none z-10" />

        {/* TOP STATUS BAR (Visible throughout Stages A, B, C) */}
        <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 flex items-center justify-between text-xs font-mono-code text-[var(--text-tertiary)] pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#0C1424]/90 border border-[var(--border-subtle)] text-[var(--text-secondary)] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-neon-cyan)] animate-pulse" />
              <span>SYS.CORE // 31.2001° N</span>
            </span>
            <span className="hidden md:inline-block text-[var(--text-muted)]">
              NODE // PRODUCTION READY
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-[#0C1424]/90 border border-[var(--border-subtle)] text-[var(--accent-neon-cyan)]">
              CAMERA STAGE:{" "}
              <span ref={cameraStageTextRef}>01_INSPECT</span>
            </span>
          </div>
        </header>

        {/* STAGE A OVERLAY: The Spark / Core Inspection (0% - 25%) */}
        <div
          ref={stageARef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-auto will-change-[opacity]"
          style={{ opacity: 1 }}
        >
          <div className="text-center max-w-xl mx-auto px-4 mt-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0C1424]/90 border border-[var(--border-accent)] font-mono-code text-xs text-[var(--accent-neon-cyan)] mb-4 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
              <span>DIGITAL ENGINEERING MONOLITH</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-wider uppercase">
              MOHAMED ELBEEK
            </h2>

            <p className="mt-3 font-mono-code text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto">
              Interactive Digital Identity &amp; System Architecture
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-2 text-xs font-mono-code text-[var(--text-tertiary)] animate-bounce">
              <span className="tracking-widest uppercase text-[var(--accent-neon-cyan)]">
                Scroll to Explore
              </span>
              <ChevronDown className="w-4 h-4 text-[var(--accent-neon-cyan)]" />
            </div>
          </div>
        </div>

        {/* STAGE B OVERLAY: The Horizon Widens (25% - 55%) */}
        <div
          ref={stageBRef}
          className="absolute inset-0 z-20 flex items-center justify-between pointer-events-none max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 will-change-[opacity]"
          style={{ opacity: 0 }}
        >
          {/* Left Telemetry Pillar */}
          <div className="hidden lg:flex flex-col gap-4 max-w-xs p-4 rounded-xl bg-[#0C1424]/85 border border-[var(--border-medium)] backdrop-blur-md shadow-xl">
            <div className="flex items-center gap-2 font-mono-code text-xs text-[var(--accent-neon-cyan)] font-semibold border-b border-[var(--border-subtle)] pb-2">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-neon-cyan)]" />
              <span>01 // ARCHITECTURAL SCOPE</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Full-Stack engineering built on deterministic backend boundaries, strict schemas, and ACID transaction isolation.
            </p>
            <div className="flex flex-wrap gap-1.5 font-mono-code text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#111C33] text-[var(--text-secondary)] border border-[var(--border-subtle)]">Next.js 16</span>
              <span className="px-2 py-0.5 rounded bg-[#111C33] text-[var(--text-secondary)] border border-[var(--border-subtle)]">NestJS</span>
              <span className="px-2 py-0.5 rounded bg-[#111C33] text-[var(--text-secondary)] border border-[var(--border-subtle)]">TypeScript</span>
            </div>
          </div>

          {/* Right Telemetry Pillar */}
          <div className="hidden lg:flex flex-col gap-4 max-w-xs p-4 rounded-xl bg-[#0C1424]/85 border border-[var(--border-medium)] backdrop-blur-md shadow-xl text-right">
            <div className="flex items-center justify-end gap-2 font-mono-code text-xs text-[var(--accent-electric)] font-semibold border-b border-[var(--border-subtle)] pb-2">
              <span>02 // PERSISTENCE &amp; CLOUD</span>
              <Cpu className="w-4 h-4 text-[var(--accent-electric)]" />
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Zero data drift with PostgreSQL, Prisma ORM, containerized microservices, and idempotent payment pipelines.
            </p>
            <div className="flex flex-wrap justify-end gap-1.5 font-mono-code text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#111C33] text-[var(--text-secondary)] border border-[var(--border-subtle)]">PostgreSQL</span>
              <span className="px-2 py-0.5 rounded bg-[#111C33] text-[var(--text-secondary)] border border-[var(--border-subtle)]">Docker</span>
              <span className="px-2 py-0.5 rounded bg-[#111C33] text-[var(--text-secondary)] border border-[var(--border-subtle)]">Redis</span>
            </div>
          </div>
        </div>

        {/* STAGE C OVERLAY: The Identity Reveal (50% - 85%) */}
        <div
          ref={stageCRef}
          className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center my-auto pointer-events-none will-change-[opacity,transform]"
          style={{
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          {/* Identity & Technical Specialization Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C1424]/90 border border-[var(--border-accent)] font-mono-code text-xs text-[var(--text-secondary)] shadow-[0_0_20px_rgba(37,99,235,0.25)] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-neon-cyan)] animate-pulse" />
              <span className="font-semibold text-white tracking-wider">
                FULL-STACK DEVELOPER
              </span>
              <span className="text-[var(--text-tertiary)]">|</span>
              <span className="text-[var(--accent-neon-cyan)] font-medium">
                Backend-Focused Engineer
              </span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0C1424]/80 border border-[var(--border-subtle)] font-mono-code text-xs text-[var(--text-tertiary)]">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Available for high-scale engineering</span>
            </div>
          </div>

          {/* Master Cinematic Identity Headline */}
          <div className="max-w-4xl">
            <div className="font-mono-code text-xs sm:text-sm text-[var(--accent-neon-cyan)] tracking-widest uppercase mb-1.5">
              Mohamed Elbeek &mdash; Digital Engineering
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.96] uppercase drop-shadow-2xl">
              <span>FROM PIXELS</span>
              <br />
              <span className="text-gradient-electric">TO PRODUCTION.</span>
            </h1>

            {/* Core Architectural Statement */}
            <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed font-sans-body">
              &ldquo;I build complete digital products &mdash; from engaging user interfaces to secure backend systems and reliable infrastructure.&rdquo;
            </p>
          </div>

          {/* Action CTAs and Profile Links */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleScrollToWork}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[var(--accent-electric)] hover:bg-[var(--accent-electric-hover)] text-white text-sm font-semibold transition-all duration-200 min-h-[48px] focus-visible:ring-2 focus-visible:ring-[var(--accent-neon-cyan)] shadow-[0_0_25px_rgba(37,99,235,0.4)] cursor-pointer"
              >
                <span>Explore Selected Work</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleScrollToEngineering}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0C1424] hover:bg-[#111C33] border border-[var(--border-medium)] hover:border-[var(--border-accent)] text-[var(--text-primary)] text-sm font-medium transition-all duration-200 min-h-[48px] focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[var(--accent-neon-cyan)]" />
                <span>Architecture Playground</span>
              </button>
            </div>

            <div className="hidden sm:block w-px h-8 bg-[var(--border-subtle)] mx-2" />

            {/* External Links */}
            <div className="flex flex-wrap items-center gap-4 font-mono-code text-xs text-[var(--text-secondary)]">
              <a
                href={meta.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors py-2 px-1 focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] rounded"
                aria-label="Mohamed Elbeek GitHub Profile"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
              </a>
              <span className="text-[var(--text-muted)]">/</span>
              <a
                href={meta.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors py-2 px-1 focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] rounded"
                aria-label="Mohamed Elbeek LinkedIn Profile"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
              </a>
              <span className="text-[var(--text-muted)]">/</span>
              <a
                href={meta.cvPath}
                download="Mohamed_Elbeek_CV.pdf"
                className="inline-flex items-center gap-1.5 text-[var(--accent-neon-cyan)] hover:text-white transition-colors py-2 px-1 focus-visible:ring-2 focus-visible:ring-[var(--accent-neon-cyan)] rounded"
                aria-label="Download Mohamed Elbeek CV PDF"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume PDF</span>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM TIMELINE SCRUB INDICATOR */}
        <footer className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 flex items-center justify-between text-xs font-mono-code text-[var(--text-tertiary)] pointer-events-none">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[var(--accent-neon-cyan)]" />
            <span className="hidden sm:inline">ARCHITECTURE PIPELINE</span>
            <span ref={pipelinePercentTextRef} className="text-[var(--accent-neon-cyan)]">[0%]</span>
          </div>

          {/* Interactive Scrub Progress Bar (GPU transform scaleX) */}
          <div className="w-36 sm:w-64 h-1.5 rounded-full bg-[#0C1424] border border-[var(--border-subtle)] overflow-hidden">
            <div
              ref={progressBarRef}
              className="w-full h-full bg-gradient-to-r from-[var(--accent-electric)] to-[var(--accent-neon-cyan)] origin-left will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">REVERSE SCROLL READY</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
        </footer>

        {/* Seamless Horizon Transition Break into Next Section */}
        <div
          ref={stageDRef}
          className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-[#080B12] pointer-events-none z-30 will-change-[opacity]"
          style={{ opacity: 0.4 }}
        />
      </div>
    </section>
  );
}
