"use client";

import React, { useState, useRef } from "react";
import type { ProjectItem } from "@/types/project";
import {
  ExternalLink,
  ShieldCheck,
  Maximize2,
  Database,
  Lock,
  Activity,
  FileText,
  MapPin,
  Sparkles,
} from "lucide-react";

interface ProjectVisualPreviewProps {
  project: ProjectItem;
  onExpand?: (project: ProjectItem) => void;
  className?: string;
}

export function ProjectVisualPreview({
  project,
  onExpand,
  className = "",
}: ProjectVisualPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, isHovered: false });

  // Subtle interactive parallax tilt on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x: x * 8, y: y * -8, isHovered: true });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0, isHovered: false });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="view"
      onClick={() => onExpand?.(project)}
      className={`group/preview relative w-full rounded-xl sm:rounded-2xl bg-[#070A10] border border-[var(--border-subtle)] hover:border-[var(--accent-neon-cyan)]/60 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-300 cursor-pointer flex flex-col ${className}`}
      style={{
        transform: coords.isHovered
          ? `perspective(1000px) rotateX(${coords.y}deg) rotateY(${coords.x}deg)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
      }}
    >
      {/* Background Blueprint Grid & Lighting */}
      <div className="absolute inset-0 engineering-grid opacity-25 group-hover/preview:opacity-40 transition-opacity pointer-events-none" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--accent-electric)]/10 group-hover/preview:bg-[var(--accent-neon-cyan)]/15 rounded-full blur-3xl transition-all pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[var(--accent-neon-cyan)]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Browser / Engineering Window Header */}
      <div className="relative z-10 flex items-center justify-between px-3.5 sm:px-4 py-2.5 bg-[#0A0E18]/90 border-b border-[var(--border-subtle)] backdrop-blur-md">
        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          <span className="ml-2 font-mono-code text-[10px] text-[var(--text-muted)] tracking-wider uppercase hidden xs:inline-block">
            {project.slug}.internal
          </span>
        </div>

        {/* Mock Address Bar */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#05070D] border border-white/5 font-mono-code text-[10px] text-[var(--text-tertiary)] max-w-xs truncate">
          <Lock className="w-3 h-3 text-[var(--accent-neon-cyan)] shrink-0" />
          <span className="truncate">
            https://{project.slug === "ecommerce" ? "api.ecommerce.internal/v1/checkout" : project.slug === "lexaguide" ? "lexaguide.internal/consultations/active" : `${project.slug}.platform.internal`}
          </span>
        </div>

        {/* Live telemetry badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono-code text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>200 OK</span>
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExpand?.(project);
            }}
            className="p-1 rounded text-[var(--text-tertiary)] hover:text-white hover:bg-white/10 transition-colors"
            title="Expand Preview"
            aria-label={`Expand preview for ${project.title}`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Preview Screen */}
      <div className="relative z-10 flex-1 p-4 sm:p-6 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] md:min-h-[290px]">
        {/* REPLACEABLE VISUAL PLACEHOLDER: Render high-fidelity conceptual interface */}
        <ConceptualInterfaceView project={project} />

        {/* Bottom Status & Expand Cue Bar */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono-code text-[var(--text-tertiary)]">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[var(--accent-neon-cyan)]" />
            <span className="text-[10px] text-[var(--text-secondary)]">
              {project.slug === "ecommerce"
                ? "Latency: 14ms // NestJS Guard: Verified"
                : project.slug === "lexaguide"
                ? "48 REST Endpoints // 9 Modules Active"
                : project.slug === "ahmed-elbeek-system"
                ? "Secure Boundary // Synthetic Tenant #8841"
                : project.slug === "sakan-alarish"
                ? "Sinai University // Campus Proximity 450m"
                : project.slug === "minimal-be-creative"
                ? "Production Live // minimal1.vercel.app"
                : "SQL Server 2019 // ADO.NET / EF Core"}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-[var(--accent-neon-cyan)] group-hover/preview:translate-x-0.5 transition-transform text-[10px] font-semibold">
            <span>INTERACTIVE PREVIEW</span>
            <Maximize2 className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BESPOKE CONCEPTUAL INTERFACE VIEWS FOR EACH PROJECT
// Clearly marked as replaceable placeholders until actual screenshots exist.
// ─────────────────────────────────────────────────────────────────────────────

function ConceptualInterfaceView({ project }: { project: ProjectItem }) {
  switch (project.slug) {
    case "ecommerce":
      return (
        <div
          data-preview-placeholder="true"
          className="space-y-3.5 text-left font-mono-code select-none"
        >
          {/* Internal Developer Annotation */}
          {/* REPLACEABLE VISUAL PLACEHOLDER: Swap with real screenshot /public/projects/ecommerce.png */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-[#0C1424]/80 border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-neon-cyan)] animate-ping" />
              <span className="text-xs font-semibold text-white">ORDER ORCHESTRATION PIPELINE</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--accent-electric)]/20 text-[var(--accent-neon-cyan)] border border-[var(--accent-electric)]/40">
              ACID GUARANTEED
            </span>
          </div>

          {/* Transaction Flow Diagram */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="p-2.5 rounded-lg bg-[#080B12] border border-white/5 space-y-1">
              <span className="text-[10px] text-[var(--text-muted)] block">STEP 01</span>
              <p className="text-xs font-medium text-white">Inventory Lock</p>
              <span className="text-[10px] text-emerald-400 block">Stock Reserved [OK]</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#080B12] border border-[var(--border-accent)]/50 space-y-1 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
              <span className="text-[10px] text-[var(--accent-neon-cyan)] block">STEP 02</span>
              <p className="text-xs font-medium text-white">Stripe Webhook</p>
              <span className="text-[10px] text-[var(--accent-neon-cyan)] block">pi_3M... Verified</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#080B12] border border-white/5 space-y-1">
              <span className="text-[10px] text-[var(--text-muted)] block">STEP 03</span>
              <p className="text-xs font-medium text-white">Postgres Commit</p>
              <span className="text-[10px] text-emerald-400 block">Order Dispatched</span>
            </div>
          </div>

          {/* Live Order Ledger Entry */}
          <div className="p-2.5 rounded-lg bg-[#060810] border border-white/5 text-[11px] text-[var(--text-secondary)] space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-[var(--text-tertiary)]">PAYLOAD: #ORD-9821</span>
              <span className="text-emerald-400 font-semibold">$349.00 USD</span>
            </div>
            <div className="text-[10px] text-[var(--text-muted)] truncate">
              {'{'} &quot;items&quot;: [2], &quot;idempotencyKey&quot;: &quot;idem_88291a&quot;, &quot;guard&quot;: &quot;JwtAuthGuard&quot; {'}'}
            </div>
          </div>
        </div>
      );

    case "lexaguide":
      return (
        <div
          data-preview-placeholder="true"
          className="space-y-3.5 text-left font-mono-code select-none"
        >
          {/* REPLACEABLE VISUAL PLACEHOLDER: Swap with real screenshot /public/projects/lexaguide.png */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#0C1424]/80 border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-neon-cyan)]" />
              <span className="text-xs font-semibold text-white">LEGAL-TECH WORKSPACE // ACTIVE</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              ROLE: LAWYER (VERIFIED)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-[#080B12] border border-white/5 space-y-1">
              <span className="text-[10px] text-[var(--text-muted)] block">CONSULTATION LIFECYCLE</span>
              <div className="flex items-center gap-1.5 text-xs text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Status: In-Session Chat</span>
              </div>
              <span className="text-[10px] text-[var(--text-tertiary)] block">Client: Private Corporation</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#080B12] border border-white/5 space-y-1">
              <span className="text-[10px] text-[var(--text-muted)] block">DOCUMENT ENGINE</span>
              <div className="flex items-center gap-1.5 text-xs text-white">
                <FileText className="w-3.5 h-3.5 text-[var(--accent-neon-cyan)]" />
                <span>NDA_Contract_v2.pdf</span>
              </div>
              <span className="text-[10px] text-emerald-400 block">Cloudinary Signed &amp; Routed</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#060810] border border-white/5 flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
            <span>AUTH ROTATION: Refresh Token Exp: 7d</span>
            <span className="text-[var(--accent-neon-cyan)]">Session ID: #LX-9941</span>
          </div>
        </div>
      );

    case "ahmed-elbeek-system":
      return (
        <div
          data-preview-placeholder="true"
          className="space-y-3.5 text-left font-mono-code select-none"
        >
          {/* REPLACEABLE VISUAL PLACEHOLDER: Swap with real screenshot /public/projects/ahmed-elbeek-system.png */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-amber-200">SYNTHETIC DEMO ENVIRONMENT</span>
            </div>
            <span className="text-[10px] text-amber-300 font-bold">TENANT #8841-CO</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div className="p-2.5 rounded-lg bg-[#080B12] border border-white/5">
              <span className="text-[10px] text-[var(--text-muted)] block">DAILY VOLUME</span>
              <span className="text-sm font-bold text-white block mt-0.5">1,480 Units</span>
              <span className="text-[9px] text-emerald-400">Inventory Normal</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#080B12] border border-white/5">
              <span className="text-[10px] text-[var(--text-muted)] block">AUDITED TXS</span>
              <span className="text-sm font-bold text-white block mt-0.5">100%</span>
              <span className="text-[9px] text-emerald-400">Ledger Verified</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#080B12] border border-white/5 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-[var(--text-muted)] block">DISPATCH FLEET</span>
              <span className="text-sm font-bold text-white block mt-0.5">Active</span>
              <span className="text-[9px] text-[var(--accent-neon-cyan)]">North Logistics</span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-[#060810] border border-white/5 text-[10px] text-[var(--text-muted)] truncate">
            &gt; SYSTEM CORE: RBAC Executive Permission Matrix Active
          </div>
        </div>
      );

    case "sakan-alarish":
      return (
        <div
          data-preview-placeholder="true"
          className="space-y-3.5 text-left font-mono-code select-none"
        >
          {/* REPLACEABLE VISUAL PLACEHOLDER: Swap with real screenshot /public/projects/sakan-alarish.png */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#0C1424]/80 border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--accent-neon-cyan)]" />
              <span className="text-xs font-semibold text-white">STUDENT HOUSING RADAR</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--accent-neon-cyan)]/10 text-[var(--accent-neon-cyan)] border border-[var(--accent-neon-cyan)]/30">
              CAMPUS: 450M
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#080B12] border border-white/5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-white">Deluxe Student Suite 4B</span>
              <span className="text-xs font-bold text-emerald-400">Available</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[10px]">
              <span className="px-1.5 py-0.5 rounded bg-white/5 text-[var(--text-secondary)]">High-Speed Fiber</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 text-[var(--text-secondary)]">Furnished</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 text-[var(--text-secondary)]">Verified Landlord</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#060810] border border-white/5 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
            <span>Direct Sinai University Commute</span>
            <span className="text-emerald-400">Zero Agency Fees</span>
          </div>
        </div>
      );

    case "minimal-be-creative":
      return (
        <div
          data-preview-placeholder="true"
          className="space-y-3.5 text-left select-none"
        >
          {/* REPLACEABLE VISUAL PLACEHOLDER: Swap with real screenshot /public/projects/minimal-be-creative.png */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#0C1424]/80 border border-[var(--border-subtle)] font-mono-code">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--accent-neon-cyan)]" />
              <span className="text-xs font-semibold text-white uppercase tracking-wider">EDITORIAL STUDIO SHOWCASE</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white font-mono-code">
              minimal1.vercel.app
            </span>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-r from-[#0C1424] to-[#080B12] border border-white/5 flex flex-col justify-center items-center text-center py-5">
            <span className="font-display text-lg sm:text-xl font-black text-white tracking-tight uppercase">
              MINIMAL BE CREATIVE
            </span>
            <p className="font-sans-body text-xs text-[var(--text-secondary)] mt-1 max-w-xs">
              Client Commercial Web Presence with High-Contrast Editorial Typography
            </p>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono-code text-[var(--text-tertiary)] px-1">
            <span>PRODUCTION DEPLOYMENT</span>
            <span className="text-[var(--accent-neon-cyan)] flex items-center gap-1">
              <span>EXPLORE LIVE DOMAIN</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>
      );

    case "tech-ecommerce":
    default:
      return (
        <div
          data-preview-placeholder="true"
          className="space-y-3.5 text-left font-mono-code select-none"
        >
          {/* REPLACEABLE VISUAL PLACEHOLDER: Swap with real screenshot /public/projects/tech-ecommerce.png */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#0C1424]/80 border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[var(--accent-neon-cyan)]" />
              <span className="text-xs font-semibold text-white">SQL SERVER 2019 // SCHEMA</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-[var(--text-tertiary)]">
              ASP.NET MVC 5
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#080B12] border border-white/5 space-y-1.5 text-[11px]">
            <div className="text-[10px] text-[var(--text-muted)]">RELATIONAL TABLE ARCHITECTURE:</div>
            <div className="text-xs text-[var(--accent-neon-cyan)]">
              dbo.Products <span className="text-[var(--text-muted)]">-&gt;</span> dbo.Categories
            </div>
            <div className="text-[10px] text-[var(--text-secondary)]">
              [PK ProductId] [FK CategoryId] [UnitPrice] [StockLevel]
            </div>
          </div>

          <div className="p-2 rounded-lg bg-[#060810] border border-white/5 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
            <span>CONTROLLER: ProductsController.cs</span>
            <span className="text-emerald-400">ADO.NET / EF</span>
          </div>
        </div>
      );
  }
}
