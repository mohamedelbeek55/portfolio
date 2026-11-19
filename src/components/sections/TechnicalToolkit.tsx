"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Server,
  Database,
  ShieldCheck,
  Container,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Terminal,
  Activity,
  Network,
  Radio,
  Zap,
} from "lucide-react";

interface TechNode {
  id: string;
  name: string;
  category: "backend" | "databases" | "architecture" | "frontend" | "devops";
  categoryLabel: string;
  purpose: string;
  howIUseIt: string;
  capabilities: string[];
  connections: string[]; // IDs of related technologies
  associatedProjects: { name: string; slug: string }[];
}

const TECH_NODES: TechNode[] = [
  // Backend Core
  {
    id: "nestjs",
    name: "NestJS",
    category: "backend",
    categoryLabel: "Backend Core",
    purpose: "Enterprise-grade TypeScript framework",
    howIUseIt: "Modular Clean Architecture, Dependency Injection, custom Guards for JWT auth, and transactional service boundaries.",
    capabilities: ["Dependency Injection", "Custom Guards & Interceptors", "OpenAPI / Swagger Generation", "Transactional Modules"],
    connections: ["typescript", "postgresql", "prisma", "clean-arch", "docker"],
    associatedProjects: [{ name: "E-Commerce Platform", slug: "ecommerce" }],
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    categoryLabel: "Backend Core",
    purpose: "Event-driven asynchronous JavaScript runtime",
    howIUseIt: "High-throughput asynchronous I/O, microservice controllers, REST APIs, and background queue workers.",
    capabilities: ["Non-blocking Event Loop", "Stream & Buffer I/O", "Native Cryptography", "Worker Threads"],
    connections: ["nestjs", "express", "typescript", "mongodb"],
    associatedProjects: [
      { name: "E-Commerce Platform", slug: "ecommerce" },
      { name: "LexaGuide", slug: "lexaguide" },
    ],
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    categoryLabel: "Backend Core",
    purpose: "Minimalist web framework for Node.js",
    howIUseIt: "Routing pipelines, custom middleware chains, error handling boundaries, and REST service endpoints.",
    capabilities: ["Custom middleware pipelines", "Route grouping", "Request sanitization", "Global error interceptors"],
    connections: ["nodejs", "typescript", "mongodb"],
    associatedProjects: [{ name: "LexaGuide", slug: "lexaguide" }],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "backend",
    categoryLabel: "Core Language",
    purpose: "Statically typed superset of JavaScript",
    howIUseIt: "End-to-end type safety, domain model interfaces, strict compile checks, and runtime DTO verification.",
    capabilities: ["Strict null checks", "Generics & Utility types", "Discriminated unions", "Interface contracts"],
    connections: ["nestjs", "nextjs", "prisma", "react"],
    associatedProjects: [
      { name: "E-Commerce Platform", slug: "ecommerce" },
      { name: "LexaGuide", slug: "lexaguide" },
    ],
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    category: "backend",
    categoryLabel: "API Architecture",
    purpose: "Resource-oriented HTTP service architecture",
    howIUseIt: "Idempotent HTTP endpoints, standard status codes, pagination, filtering, and OpenAPI documentation.",
    capabilities: ["Idempotent operations", "Resource routing", "Standard error envelopes", "OpenAPI 3.0 specs"],
    connections: ["nestjs", "express", "clean-arch"],
    associatedProjects: [
      { name: "E-Commerce Platform", slug: "ecommerce" },
      { name: "LexaGuide", slug: "lexaguide" },
    ],
  },

  // Databases & Persistence
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "databases",
    categoryLabel: "Relational Persistence",
    purpose: "Advanced open-source relational database system",
    howIUseIt: "Primary persistence with ACID transactions, strict schema constraints, foreign keys, and performant composite indexes.",
    capabilities: ["ACID transaction isolation", "Composite & Unique indexes", "Row-level locking", "JSONB data querying"],
    connections: ["prisma", "nestjs", "docker"],
    associatedProjects: [{ name: "E-Commerce Platform", slug: "ecommerce" }],
  },
  {
    id: "prisma",
    name: "Prisma ORM",
    category: "databases",
    categoryLabel: "Data Modeling",
    purpose: "Type-safe Node.js & TypeScript ORM",
    howIUseIt: "Type-safe database client, schema migrations, transactional interactive batching, and query optimization.",
    capabilities: ["Interactive $transaction API", "Declarative schema migrations", "Zero-cost type generation", "Connection pooling"],
    connections: ["postgresql", "nestjs", "typescript"],
    associatedProjects: [{ name: "E-Commerce Platform", slug: "ecommerce" }],
  },
  {
    id: "mongodb",
    name: "MongoDB & Mongoose",
    category: "databases",
    categoryLabel: "Document Storage",
    purpose: "Flexible document-based NoSQL database & modeling layer",
    howIUseIt: "Document storage for legal consultations, flexible template schemas, chat message logs, and session records.",
    capabilities: ["Polymorphic document schemas", "Subdocument embedding", "Aggregation pipelines", "TTL session indexes"],
    connections: ["nodejs", "express"],
    associatedProjects: [{ name: "LexaGuide", slug: "lexaguide" }],
  },

  // Architecture & Security
  {
    id: "clean-arch",
    name: "Clean Architecture",
    category: "architecture",
    categoryLabel: "System Design",
    purpose: "Separation of concerns and dependency inversion",
    howIUseIt: "Decoupling business logic from HTTP frameworks and database engines using domain entities and service boundaries.",
    capabilities: ["Inverted dependency direction", "Isolated domain entities", "Pluggable data drivers", "100% unit-testable rules"],
    connections: ["nestjs", "rest-apis", "docker"],
    associatedProjects: [{ name: "E-Commerce Platform", slug: "ecommerce" }],
  },
  {
    id: "jwt-auth",
    name: "JWT & Auth Perimeter",
    category: "architecture",
    categoryLabel: "Security",
    purpose: "Stateless authentication and token lifecycle management",
    howIUseIt: "Short-lived access tokens with rotating refresh tokens, cryptographic signature verification, and RBAC guards.",
    capabilities: ["Rotating refresh tokens", "Role-Based Access Control", "Header bearer validation", "Cryptographic signature verification"],
    connections: ["nestjs", "express", "postgresql"],
    associatedProjects: [
      { name: "E-Commerce Platform", slug: "ecommerce" },
      { name: "LexaGuide", slug: "lexaguide" },
    ],
  },

  // Modern Frontend
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    categoryLabel: "Modern Frontend",
    purpose: "Full-stack React framework for web production",
    howIUseIt: "Server-side rendering, static generation, React Server Components, and optimized client hydration.",
    capabilities: ["React Server Components", "Static Site Generation (SSG)", "Server-Side Rendering (SSR)", "Route Handlers"],
    connections: ["react", "typescript", "tailwind"],
    associatedProjects: [
      { name: "LexaGuide", slug: "lexaguide" },
      { name: "Minimal Be Creative", slug: "minimal-be-creative" },
    ],
  },
  {
    id: "react",
    name: "React 19",
    category: "frontend",
    categoryLabel: "Modern Frontend",
    purpose: "Component-driven declarative user interface library",
    howIUseIt: "Accessible UI components, custom hooks for data fetching, view state machines, and memoized renders.",
    capabilities: ["Concurrent rendering", "Hooks & State primitives", "Server Actions integration", "Virtual DOM diffing"],
    connections: ["nextjs", "typescript", "tailwind"],
    associatedProjects: [
      { name: "E-Commerce Platform", slug: "ecommerce" },
      { name: "LexaGuide", slug: "lexaguide" },
    ],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    categoryLabel: "Modern Styling",
    purpose: "Utility-first CSS framework",
    howIUseIt: "Tokenized design systems, responsive layouts, dark theme styling, and minimal CSS runtime overhead.",
    capabilities: ["Utility composition", "Custom design tokens", "Zero-runtime CSS output", "Fluid typography"],
    connections: ["nextjs", "react"],
    associatedProjects: [
      { name: "LexaGuide", slug: "lexaguide" },
      { name: "Minimal Be Creative", slug: "minimal-be-creative" },
    ],
  },

  // DevOps & Cloud
  {
    id: "docker",
    name: "Docker",
    category: "devops",
    categoryLabel: "Infrastructure",
    purpose: "Containerization platform for reliable environments",
    howIUseIt: "Multi-stage production Dockerfiles, docker-compose orchestration for PostgreSQL, Redis, and microservices.",
    capabilities: ["Multi-stage build optimization", "Docker Compose networks", "Volume persistence", "Environment parity"],
    connections: ["nestjs", "postgresql", "clean-arch"],
    associatedProjects: [{ name: "E-Commerce Platform", slug: "ecommerce" }],
  },
  {
    id: "stripe-sdk",
    name: "Stripe SDK",
    category: "devops",
    categoryLabel: "Payment Gateways",
    purpose: "Global payment processing platform",
    howIUseIt: "Payment Intent creation, secure webhook signature verification, and idempotent order state transitions.",
    capabilities: ["Webhook signature checks", "PaymentIntents API", "Idempotent payment capture", "PCI DSS compliance"],
    connections: ["nestjs", "postgresql", "clean-arch"],
    associatedProjects: [{ name: "E-Commerce Platform", slug: "ecommerce" }],
  },
];

const CLUSTERS = [
  { id: "all", label: "All Constellation", icon: Network },
  { id: "backend", label: "Backend Core", icon: Server },
  { id: "databases", label: "Databases & Storage", icon: Database },
  { id: "architecture", label: "Architecture & Security", icon: ShieldCheck },
  { id: "frontend", label: "Modern Frontend", icon: Code2 },
  { id: "devops", label: "Infrastructure & DevOps", icon: Container },
];

export function TechnicalToolkit() {
  const [activeCluster, setActiveCluster] = useState<string>("all");
  const [selectedTechId, setSelectedTechId] = useState<string>("nestjs");
  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null);

  const activeNode =
    TECH_NODES.find((t) => t.id === (hoveredTechId || selectedTechId)) || TECH_NODES[0];

  const filteredNodes =
    activeCluster === "all"
      ? TECH_NODES
      : TECH_NODES.filter((n) => n.category === activeCluster);

  return (
    <section id="expertise" className="relative py-20 sm:py-28 lg:py-32 border-b border-[var(--border-subtle)] bg-[#080B12] overflow-hidden">
      {/* Background Engineering Grids */}
      <div className="absolute inset-0 engineering-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[var(--accent-electric)]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[var(--accent-neon-cyan)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C1424] border border-[var(--border-subtle)] font-mono-code text-xs text-[var(--accent-neon-cyan)] mb-3 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>SPATIAL ENGINEERING CONSOLE {"//"}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              TECHNICAL TOOLKIT &amp; TOPOLOGY
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl font-sans-body">
              An architectural constellation of backend runtimes, persistence engines, security perimeters, and modern web frameworks configured for production.
            </p>
          </div>

          {/* Telemetry Status Bar */}
          <div className="font-mono-code text-xs text-[var(--text-tertiary)] flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0C1424] border border-[var(--border-subtle)]">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>15 PRODUCTION PRIMITIVES</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0C1424] border border-[var(--border-subtle)]">
              <Zap className="w-3.5 h-3.5 text-[var(--accent-neon-cyan)]" />
              <span>STRICT DATA CONTRACTS</span>
            </span>
          </div>
        </div>

        {/* Cluster Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-[var(--border-subtle)]">
          {CLUSTERS.map((cluster) => {
            const Icon = cluster.icon;
            const isActive = activeCluster === cluster.id;
            return (
              <button
                key={cluster.id}
                type="button"
                onClick={() => setActiveCluster(cluster.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-code transition-all cursor-pointer ${
                  isActive
                    ? "bg-[var(--accent-electric)] text-white font-semibold shadow-[0_0_20px_rgba(37,99,235,0.35)]"
                    : "bg-[#0C1424]/80 text-[var(--text-secondary)] hover:text-white hover:bg-[#111C33] border border-[var(--border-subtle)]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[var(--accent-neon-cyan)]"}`} />
                <span>{cluster.label}</span>
              </button>
            );
          })}
        </div>

        {/* Console Layout: Constellation Matrix (Left) & Architectural Deep-Dive Telemetry (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Spatial Constellation Matrix */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredNodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              const isConnected = activeNode.connections.includes(node.id);

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedTechId(node.id)}
                  onMouseEnter={() => setHoveredTechId(node.id)}
                  onMouseLeave={() => setHoveredTechId(null)}
                  className={`relative p-4 rounded-xl text-left transition-all duration-200 cursor-pointer border flex flex-col justify-between min-h-[110px] overflow-hidden ${
                    isSelected
                      ? "bg-[#0C1424] border-[var(--accent-neon-cyan)] shadow-[0_0_25px_rgba(56,189,248,0.25)] ring-1 ring-[var(--accent-neon-cyan)]/50"
                      : isConnected
                      ? "bg-[#0C1424]/80 border-[var(--accent-electric)]/60 text-white shadow-[0_0_15px_rgba(37,99,235,0.15)]"
                      : "bg-[#0C1424]/40 hover:bg-[#0C1424]/90 border-[var(--border-subtle)] hover:border-[var(--border-medium)]"
                  }`}
                >
                  {/* Subtle connection glow indicator */}
                  {isConnected && (
                    <div className="absolute top-0 right-0 w-12 h-12 bg-[var(--accent-electric)]/10 rounded-full blur-xl pointer-events-none" />
                  )}

                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-code text-[10px] uppercase text-[var(--accent-neon-cyan)] tracking-wider">
                      {node.categoryLabel}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected
                          ? "bg-[var(--accent-neon-cyan)] animate-pulse"
                          : isConnected
                          ? "bg-[var(--accent-electric)]"
                          : "bg-[var(--text-muted)]"
                      }`}
                    />
                  </div>

                  <div className="mt-2">
                    <h3 className="font-display font-bold text-white text-base">
                      {node.name}
                    </h3>
                    <p className="font-mono-code text-[11px] text-[var(--text-tertiary)] truncate mt-0.5">
                      {node.purpose}
                    </p>
                  </div>

                  {/* Connected links tag */}
                  <div className="mt-2 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono-code text-[var(--text-muted)]">
                    <span>{node.connections.length} mesh links</span>
                    {isSelected && (
                      <span className="text-[var(--accent-neon-cyan)] font-semibold">ACTIVE</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Architectural Deep-Dive Telemetry Panel */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-[#0C1424] to-[#080B12] border border-[var(--border-accent)] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Top telemetry bar */}
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[var(--accent-neon-cyan)]" />
                <span className="font-mono-code text-xs text-white font-semibold uppercase tracking-wider">
                  SPECIFICATION INSPECTOR
                </span>
              </div>
              <span className="font-mono-code text-xs text-[var(--accent-neon-cyan)] bg-[var(--accent-neon-cyan)]/10 px-2.5 py-0.5 rounded border border-[var(--accent-neon-cyan)]/25">
                NODE // {activeNode.id.toUpperCase()}
              </span>
            </div>

            {/* Node Title & Purpose */}
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
                {activeNode.name}
              </h3>
              <p className="mt-1 font-mono-code text-xs text-[var(--accent-neon-cyan)]">
                {activeNode.purpose}
              </p>
            </div>

            {/* Architectural Role Description */}
            <div className="mt-5">
              <h4 className="font-mono-code text-xs text-[var(--text-tertiary)] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[var(--accent-electric)]" />
                <span>Production Implementation:</span>
              </h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans-body bg-[#080B12]/80 p-3.5 rounded-xl border border-[var(--border-subtle)]">
                {activeNode.howIUseIt}
              </p>
            </div>

            {/* Capabilities Checklist */}
            <div className="mt-6">
              <h4 className="font-mono-code text-xs text-[var(--text-tertiary)] uppercase tracking-wider mb-2.5">
                Key Capabilities &amp; Guarantees:
              </h4>
              <ul className="space-y-2">
                {activeNode.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-neon-cyan)] shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mesh Topology Connections */}
            <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
              <h4 className="font-mono-code text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                Connected Architectural Mesh:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeNode.connections.map((connId) => {
                  const targetNode = TECH_NODES.find((t) => t.id === connId);
                  return (
                    <button
                      key={connId}
                      type="button"
                      onClick={() => setSelectedTechId(connId)}
                      className="px-2.5 py-1 rounded bg-[#111C33] hover:bg-[#1C2C4E] border border-[var(--border-subtle)] text-[11px] font-mono-code text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
                    >
                      {targetNode ? targetNode.name : connId}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Associated Engineering Projects */}
            <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono-code text-xs text-[var(--text-tertiary)]">
                Implemented in:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeNode.associatedProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--accent-electric)]/15 hover:bg-[var(--accent-electric)]/30 border border-[var(--accent-electric)]/35 text-xs font-mono-code text-[var(--accent-neon-cyan)] hover:text-white transition-all"
                  >
                    <span>{p.name}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
