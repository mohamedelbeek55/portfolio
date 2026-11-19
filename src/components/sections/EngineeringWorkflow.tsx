"use client";

import React, { useState } from "react";
import {
  Search,
  Compass,
  PenTool,
  Code2,
  CheckCircle,
  Rocket,
  ArrowRight,
  ShieldCheck,
  GitBranch,
} from "lucide-react";

interface WorkflowStage {
  number: string;
  id: string;
  title: string;
  phase: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  objectives: string[];
  deliverables: string[];
  engineeringFocus: string;
}

const STAGES: WorkflowStage[] = [
  {
    number: "01",
    id: "understand",
    title: "Understand & Discover",
    phase: "Requirements & Scope",
    icon: Search,
    tagline: "Deconstructing domain requirements into unambiguous engineering contracts.",
    objectives: [
      "Analyze business requirements, stakeholder goals, and technical constraints",
      "Map domain entities, data cardinality, and transactional invariants",
      "Identify high-risk concurrency zones (e.g. inventory, payments, seats)",
      "Establish strict latency budgets, uptime goals, and security boundaries",
    ],
    deliverables: [
      "Entity Relationship Matrix (ERD)",
      "API Route & Resource Specifications",
      "Non-functional Security & Concurrency Requirements",
    ],
    engineeringFocus:
      "Clarifying edge cases and concurrency requirements early prevents costly database migration refactors later in the project lifecycle.",
  },
  {
    number: "02",
    id: "architect",
    title: "Architect & Model",
    phase: "System Foundations",
    icon: Compass,
    tagline: "Designing Clean Architecture boundaries and type-safe persistence models.",
    objectives: [
      "Formulate Clean / Modular Architecture boundaries to isolate business rules",
      "Model PostgreSQL schemas with explicit foreign keys, indexes, and constraints",
      "Structure authentication flows: JWT access/refresh rotation & RBAC roles",
      "Choose caching & storage patterns appropriate for the scale requirements",
    ],
    deliverables: [
      "Prisma Schema Definitions with Relational Constraints",
      "Clean Architecture Module Dependency Graph",
      "Authentication & Token Lifecycle State Machine",
    ],
    engineeringFocus:
      "By keeping persistence interfaces separate from business logic services, database technology can be upgraded or substituted without modifying core logic.",
  },
  {
    number: "03",
    id: "design",
    title: "Design & Contract",
    phase: "API & Interface Contracts",
    icon: PenTool,
    tagline: "Documenting standardized REST endpoints, DTO contracts, and UI states.",
    objectives: [
      "Write OpenAPI 3.0 / Swagger specifications for all client-facing routes",
      "Define strict request/response DTO schemas using Zod and class-validator",
      "Standardize error responses (400, 401, 403, 404, 409, 500) and error codes",
      "Design accessible, responsive UI component hierarchies with custom tokens",
    ],
    deliverables: [
      "Interactive Swagger UI Documentation Endpoint",
      "Type-safe Client Request/Response DTO Libraries",
      "Component Design System Token Map",
    ],
    engineeringFocus:
      "Strong API contracts allow frontend and backend development to proceed in parallel with zero integration friction or mismatched payloads.",
  },
  {
    number: "04",
    id: "engineer",
    title: "Engineer & Implement",
    phase: "Production Code",
    icon: Code2,
    tagline: "Writing maintainable, type-safe code with transactional guarantees.",
    objectives: [
      "Implement NestJS / Node.js services with robust transaction boundaries",
      "Enforce atomic stock deduction queries to eliminate race conditions",
      "Integrate Stripe webhooks with cryptographic signature verification and idempotency",
      "Build high-performance React / Next.js client components with optimistic UI",
    ],
    deliverables: [
      "Production-ready NestJS Backend Modules",
      "Reactive Next.js / React Client Application",
      "Integrated Third-party Webhook Handlers (Stripe, Cloudinary)",
    ],
    engineeringFocus:
      "Every financial or state-critical mutation is wrapped in an ACID transaction with an idempotency key to prevent duplicate processing.",
  },
  {
    number: "05",
    id: "validate",
    title: "Validate & Test",
    phase: "Quality & Resilience",
    icon: CheckCircle,
    tagline: "Exhaustive automated testing under live database conditions.",
    objectives: [
      "Write unit tests with Jest for isolated service business logic",
      "Execute HTTP integration tests with Supertest against containerized PostgreSQL",
      "Validate concurrent checkout scenarios to verify overselling prevention",
      "Audit accessibility, keyboard navigation, and responsive touch targets",
    ],
    deliverables: [
      "Automated Jest Unit & Supertest Integration Suite",
      "Code Coverage & Invariant Verification Reports",
      "Security & Token Expiration Vulnerability Audit",
    ],
    engineeringFocus:
      "Tests run against real database instances inside GitHub Actions, ensuring that foreign key constraints, indexes, and triggers behave identically to production.",
  },
  {
    number: "06",
    id: "deploy",
    title: "Deploy & Monitor",
    phase: "Containerized Release",
    icon: Rocket,
    tagline: "Automated CI/CD pipelines, containerization, and production monitoring.",
    objectives: [
      "Build optimized multi-stage Docker images with non-root security",
      "Configure automated GitHub Actions pipelines (lint, test, build, deploy)",
      "Deploy backend microservices to Railway with PostgreSQL database provisioning",
      "Deploy frontend applications to Vercel with edge caching and SSL",
    ],
    deliverables: [
      "Production Dockerfile & docker-compose.yml",
      "GitHub Actions CI/CD Pipeline Workflows",
      "Live Production URLs with SSL & Health Check Endpoints",
    ],
    engineeringFocus:
      "Zero-downtime rolling deployments combined with automated database migration pre-runs ensure user sessions are never interrupted during releases.",
  },
];

export function EngineeringWorkflow() {
  const [activeStageIndex, setActiveStageIndex] = useState(1); // Default to Architect
  const activeStage = STAGES[activeStageIndex];
  const Icon = activeStage.icon;

  return (
    <section id="workflow" className="relative py-20 sm:py-28 lg:py-32 border-b border-[var(--border-subtle)] bg-[#07080a]">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-[var(--accent-electric)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C1424] border border-[var(--border-subtle)] font-mono-code text-xs text-[var(--accent-neon-cyan)] mb-3">
            <GitBranch className="w-3.5 h-3.5" />
            <span>ENGINEERING WORKFLOW {"//"}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            HOW I BUILD DIGITAL PRODUCTS
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[var(--text-secondary)] font-sans-body leading-relaxed">
            A systematic 6-stage engineering journey from initial requirement analysis to automated deployment and resilient infrastructure.
          </p>
        </div>

        {/* ── Stage Selector Pills ───────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {STAGES.map((stage, idx) => {
            const isSelected = activeStageIndex === idx;
            const StageIcon = stage.icon;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStageIndex(idx)}
                className={`group text-left p-4 rounded-xl transition-all duration-200 flex flex-col justify-between min-h-[120px] focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] ${
                  isSelected
                    ? "bg-[#111C33] border border-[var(--accent-neon-cyan)] shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                    : "bg-[#0C1424]/80 hover:bg-[#111C33]/50 border border-[var(--border-subtle)] hover:border-[var(--border-medium)]"
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`font-mono-code text-xs font-bold ${
                      isSelected ? "text-[var(--accent-neon-cyan)]" : "text-[var(--text-tertiary)]"
                    }`}
                  >
                    {stage.number}
                  </span>
                  <div
                    className={`p-1.5 rounded-md ${
                      isSelected
                        ? "bg-[var(--accent-electric)] text-white"
                        : "bg-[#080B12] text-[var(--text-tertiary)] group-hover:text-white"
                    }`}
                  >
                    <StageIcon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="mt-3">
                  <span
                    className={`font-display text-sm font-semibold block leading-tight ${
                      isSelected ? "text-white" : "text-[var(--text-secondary)] group-hover:text-white"
                    }`}
                  >
                    {stage.title}
                  </span>
                  <span className="font-mono-code text-[10px] text-[var(--text-tertiary)] mt-1 block">
                    {stage.phase}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Active Stage Interactive Deep Dive ─────────────────────── */}
        <div className="bg-[#0C1424] border border-[var(--border-medium)] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 engineering-grid-dense opacity-20 pointer-events-none" />

          <div className="relative z-10">
            {/* Header Line */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-electric)]/20 border border-[var(--accent-neon-cyan)]/40 flex items-center justify-center text-[var(--accent-neon-cyan)]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono-code text-xs text-[var(--accent-neon-cyan)] uppercase">
                    STAGE {activeStage.number} {"//"} {activeStage.phase}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {activeStage.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-code text-[var(--text-tertiary)]">
                  Progressive Workflow
                </span>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-[var(--text-primary)] font-medium font-sans-body mb-8">
              &ldquo;{activeStage.tagline}&rdquo;
            </p>

            {/* Two-Column Deep-Dive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Left Column: Objectives */}
              <div className="p-5 rounded-xl bg-[#080B12]/80 border border-[var(--border-subtle)]">
                <span className="font-mono-code text-xs uppercase text-[var(--accent-neon-cyan)] tracking-wider block mb-3">
                  Key Objectives:
                </span>
                <ul className="space-y-2.5">
                  {activeStage.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                      <span className="text-[var(--accent-neon-cyan)] font-mono-code shrink-0">&gt;</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Deliverables */}
              <div className="p-5 rounded-xl bg-[#080B12]/80 border border-[var(--border-subtle)]">
                <span className="font-mono-code text-xs uppercase text-[var(--accent-electric-hover)] tracking-wider block mb-3">
                  Key Deliverables:
                </span>
                <ul className="space-y-2.5">
                  {activeStage.deliverables.map((deliv, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                      <span className="text-[var(--accent-electric-hover)] font-mono-code shrink-0">&bull;</span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Engineering Focus Callout */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-[#111C33] to-[#0C1424] border border-[var(--border-accent)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[var(--accent-neon-cyan)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono-code text-xs text-[var(--accent-neon-cyan)] font-semibold block uppercase">
                    Mohamed&apos;s Architectural Rule:
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                    {activeStage.engineeringFocus}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveStageIndex((activeStageIndex + 1) % STAGES.length)
                }
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent-electric)] hover:bg-[var(--accent-electric-hover)] text-white text-xs font-semibold transition-colors shadow-md"
              >
                <span>Next Stage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
