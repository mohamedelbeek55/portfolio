"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Cpu,
  Database,
  Globe,
  Server,
  Activity,
  ArrowRight,
  Info,
} from "lucide-react";

interface LayerData {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  glowColor: string;
  techs: string[];
  responsibilities: string[];
  metrics: { label: string; value: string }[];
  description: string;
}

const LAYERS: LayerData[] = [
  {
    id: "frontend",
    name: "01. Frontend / Interface Layer",
    subtitle: "Client-Side Presentation & Interaction",
    icon: Globe,
    accentColor: "var(--accent-neon-cyan)",
    glowColor: "rgba(56, 189, 248, 0.4)",
    techs: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    responsibilities: [
      "Responsive, accessible design with semantic HTML & ARIA",
      "Optimistic UI updates, caching, and state management",
      "Client-side routing, view transitions, and micro-interactions",
      "Strict data contract validation on incoming API payloads",
    ],
    metrics: [
      { label: "Rendering", value: "SSR / Static" },
      { label: "FCP / LCP", value: "< 0.8s" },
      { label: "Design System", value: "Custom Tokens" },
    ],
    description:
      "Crafted with modern reactive patterns to deliver seamless, accessible user experiences while keeping client bundles lean.",
  },
  {
    id: "api",
    name: "02. Backend / API Gateway Layer",
    subtitle: "HTTP Gateway, Routing & Security Perimeter",
    icon: Server,
    accentColor: "var(--accent-electric)",
    glowColor: "rgba(37, 99, 235, 0.5)",
    techs: ["NestJS", "Node.js", "Express.js", "OpenAPI / Swagger", "JWT & OAuth2"],
    responsibilities: [
      "REST API design with strict OpenAPI / Swagger documentation",
      "Authentication perimeter: access/refresh tokens with rotation",
      "Rate limiting, CORS enforcement, and request sanitization",
      "Payload deserialization & schema validation via Zod / DTOs",
    ],
    metrics: [
      { label: "Protocols", value: "REST / HTTPS" },
      { label: "Auth Model", value: "JWT + OAuth2" },
      { label: "Doc Standard", value: "OpenAPI 3.0" },
    ],
    description:
      "The fortified entry point orchestrating traffic, enforcing authentication, and translating incoming client requests into domain operations.",
  },
  {
    id: "logic",
    name: "03. Business Logic & Services",
    subtitle: "Domain Rules, Workflows & Transactions",
    icon: Cpu,
    accentColor: "#60A5FA",
    glowColor: "rgba(96, 165, 250, 0.4)",
    techs: ["Clean Architecture", "Repository Pattern", "Stripe SDK", "Jest Unit Tests"],
    responsibilities: [
      "Decoupled service modules isolated from HTTP & persistence drivers",
      "Transactional workflows with rollback guarantees and idempotency",
      "Third-party webhook processing (Stripe, Cloudinary, Nodemailer)",
      "Exhaustive unit & integration testing with Supertest & Jest",
    ],
    metrics: [
      { label: "Architecture", value: "Clean / Hexagonal" },
      { label: "Test Runner", value: "Jest / Supertest" },
      { label: "Idempotency", value: "Header-Guarded" },
    ],
    description:
      "The core brain of the platform: domain entities, transactional boundaries, and business rules designed for zero data drift and pure testability.",
  },
  {
    id: "database",
    name: "04. Database & Persistence Layer",
    subtitle: "Data Integrity, ACID Transactions & Storage",
    icon: Database,
    accentColor: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.5)",
    techs: ["PostgreSQL", "Prisma ORM", "MongoDB", "Mongoose", "Docker"],
    responsibilities: [
      "Strict relational modeling with foreign key constraints & indexes",
      "Atomic, conditional stock queries preventing overselling under concurrency",
      "Document storage for flexible consultations, logs, and session caches",
      "Containerized database instances with automated migration pipelines",
    ],
    metrics: [
      { label: "Relational", value: "PostgreSQL" },
      { label: "Document", value: "MongoDB" },
      { label: "ORM / ODM", value: "Prisma / Mongoose" },
    ],
    description:
      "High-durability persistence ensuring ACID guarantees, transactional isolation, and performant indexed querying under concurrent read/write loads.",
  },
];

export function DigitalCore() {
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle interactive 3D tilt tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: 0, y: 0 });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const activeLayer = LAYERS[activeLayerIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto mt-12 lg:mt-16 rounded-2xl bg-gradient-to-b from-[#0C1424]/90 to-[#080B12]/95 border border-[var(--border-medium)] p-4 sm:p-6 lg:p-8 overflow-hidden shadow-2xl shadow-black/80"
      style={{
        transform: `perspective(1000px) rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 4}deg)`,
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Background Engineering Blueprint Grid */}
      <div className="absolute inset-0 engineering-grid-dense opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-electric)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--accent-neon-cyan)]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[var(--border-subtle)] z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-neon-cyan)] animate-ping" />
          <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-[var(--accent-neon-cyan)]">
            Digital Engineering Core // Interactive Architecture
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono-code text-[var(--text-tertiary)]">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[var(--accent-neon-cyan)]" />
            <span>Telemetry: Online</span>
          </span>
          <span>·</span>
          <span>Click any layer to inspect</span>
        </div>
      </div>

      {/* Main Interactive Grid: Left 3D Layer Stack, Right Inspection Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
        {/* Left: 3D Stack Visualization */}
        <div className="lg:col-span-6 flex flex-col gap-3 relative py-2">
          {/* Animated vertical data conduit */}
          <div className="absolute left-6 sm:left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[var(--accent-neon-cyan)] via-[var(--accent-electric)] to-[#38BDF8] opacity-30 pointer-events-none hidden sm:block" />

          {LAYERS.map((layer, index) => {
            const isSelected = activeLayerIndex === index;
            const Icon = layer.icon;

            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayerIndex(index)}
                className={`group relative text-left p-4 rounded-xl transition-all duration-300 w-full focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] focus-visible:outline-none ${
                  isSelected
                    ? "bg-[#111C33]/90 border border-[var(--accent-neon-cyan)]/60 shadow-[0_0_25px_rgba(56,189,248,0.2)] translate-x-2"
                    : "bg-[#0C1424]/60 hover:bg-[#111C33]/50 border border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                }`}
                aria-pressed={isSelected}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <div className="absolute -left-1 top-3 bottom-3 w-1 rounded-r bg-[var(--accent-neon-cyan)]" />
                )}

                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                      isSelected
                        ? "bg-[var(--accent-electric)]/20 border-[var(--accent-neon-cyan)]/50 text-[var(--accent-neon-cyan)] shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                        : "bg-[#080B12] border-[var(--border-subtle)] text-[var(--text-tertiary)] group-hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-display text-sm sm:text-base font-semibold truncate ${
                          isSelected ? "text-white" : "text-[var(--text-secondary)] group-hover:text-white"
                        }`}
                      >
                        {layer.name}
                      </span>
                      {isSelected ? (
                        <span className="shrink-0 text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-[var(--accent-neon-cyan)]/15 text-[var(--accent-neon-cyan)] border border-[var(--accent-neon-cyan)]/30">
                          Active
                        </span>
                      ) : (
                        <span className="shrink-0 text-xs font-mono-code text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]">
                          Inspect &rarr;
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[var(--text-tertiary)] truncate mt-0.5">
                      {layer.subtitle}
                    </p>

                    {/* Tech Badges on Selected Layer */}
                    {isSelected && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {layer.techs.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#080B12]/80 text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Inspection Telemetry Panel */}
        <div className="lg:col-span-6 bg-[#080B12]/90 rounded-xl border border-[var(--border-medium)] p-5 sm:p-6 shadow-inner relative flex flex-col justify-between min-h-[360px]">
          <div>
            {/* Panel Top Tag */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[var(--accent-neon-cyan)]" />
                <span className="font-mono-code text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                  Architecture Node Telemetry
                </span>
              </div>
              <span className="font-mono-code text-[11px] text-[var(--accent-neon-cyan)] bg-[var(--accent-neon-cyan)]/10 px-2 py-0.5 rounded border border-[var(--accent-neon-cyan)]/25">
                LAYER {activeLayerIndex + 1} OF 4
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              {activeLayer.name}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-2 font-sans-body">
              {activeLayer.description}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 my-4">
              {activeLayer.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-[#0C1424] border border-[var(--border-subtle)] rounded-lg p-2.5"
                >
                  <span className="block font-mono-code text-[10px] text-[var(--text-tertiary)] uppercase">
                    {metric.label}
                  </span>
                  <span className="block font-mono-code text-xs font-semibold text-[var(--accent-neon-cyan)] mt-0.5 truncate">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Responsibilities Checklist */}
            <div className="mt-3">
              <span className="font-mono-code text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider block mb-2">
                Core Architectural Responsibilities:
              </span>
              <ul className="space-y-1.5">
                {activeLayer.responsibilities.map((resp, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-[var(--text-secondary)] leading-tight"
                  >
                    <span className="text-[var(--accent-neon-cyan)] font-mono-code shrink-0">
                      &gt;
                    </span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTA within inspection */}
          <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
            <span className="text-[11px] font-mono-code text-[var(--text-tertiary)]">
              Integrated across production projects
            </span>
            <a
              href="#work"
              className="inline-flex items-center gap-1.5 text-xs font-mono-code text-[var(--accent-neon-cyan)] hover:text-white transition-colors"
            >
              <span>See in Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
