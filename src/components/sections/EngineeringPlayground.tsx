"use client";

import React, { useState } from "react";
import {
  Globe,
  Layout,
  Server,
  Cpu,
  Database,
  ArrowRight,
  Activity,
  Play,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { DigitalCore } from "@/components/hero/DigitalCore";

interface NodeData {
  id: string;
  step: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  responsibilities: string[];
  technologies: string[];
  codeSnippet: string;
  codeSnippetTitle: string;
  latencyMs: number;
}

const FLOW_NODES: NodeData[] = [
  {
    id: "client",
    step: "01",
    name: "Client",
    category: "Request Origin",
    icon: Globe,
    description:
      "The initial origin: a user browser, mobile application, or external third-party consumer initiating an authenticated HTTPS request with payload headers and parameters.",
    responsibilities: [
      "User event capture and form serialization",
      "Client-side optimistic state transitions",
      "Bearer JWT token attachment to HTTP headers",
      "Network latency and retry handling",
    ],
    technologies: ["Browsers", "Mobile Apps", "Fetch API", "Axios", "REST Clients"],
    codeSnippetTitle: "Client HTTP Dispatch (Fetch)",
    codeSnippet: `// 01. Client initiates authenticated request
const response = await fetch('/api/v1/orders/checkout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${accessToken}\`,
    'Idempotency-Key': crypto.randomUUID(),
  },
  body: JSON.stringify({ items, shippingAddress }),
});`,
    latencyMs: 1.2,
  },
  {
    id: "frontend",
    step: "02",
    name: "Frontend",
    category: "Presentation Layer",
    icon: Layout,
    description:
      "The client-side application interface providing reactive UI state, accessible forms, validation feedback, and view orchestration.",
    responsibilities: [
      "Client-side input schema pre-validation",
      "Accessible ARIA feedback and focus indicators",
      "State synchronization via React Server/Client boundaries",
      "Secure cookie or memory token storage",
    ],
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS"],
    codeSnippetTitle: "React Form & Action Boundary",
    codeSnippet: `// 02. Frontend mutation handler
export function CheckoutButton({ cartItems }: { cartItems: Item[] }) {
  const [pending, setPending] = useState(false);
  
  const handleCheckout = async () => {
    setPending(true);
    try {
      const order = await submitOrder(cartItems);
      router.push(\`/orders/\${order.id}\`);
    } finally {
      setPending(false);
    }
  };
  return <button disabled={pending} onClick={handleCheckout}>Checkout</button>;
}`,
    latencyMs: 2.1,
  },
  {
    id: "api",
    step: "03",
    name: "API Gateway",
    category: "Perimeter & Routing",
    icon: Server,
    description:
      "The fortified perimeter managing reverse-proxy routing, TLS termination, CORS origin filtering, and DDoS rate-limiting before requests reach application modules.",
    responsibilities: [
      "Rate-limiting to guard against denial-of-service",
      "CORS headers and allowed HTTP method enforcement",
      "TLS / HTTPS termination and request logging",
      "Global exception interception and status translation",
    ],
    technologies: ["NestJS Middlewares", "Nginx", "Helmet.js", "Express Rate Limit"],
    codeSnippetTitle: "Gateway Security Middleware",
    codeSnippet: `// 03. Rate limiter & Security headers
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true,
  })
);`,
    latencyMs: 1.8,
  },
  {
    id: "controller",
    step: "04",
    name: "Controller",
    category: "HTTP Request Handler",
    icon: Server,
    description:
      "Handles HTTP transport concerns: parsing request parameters, running DTO validation guards, checking authorization roles, and invoking service operations.",
    responsibilities: [
      "DTO payload parsing and validation with Zod / class-validator",
      "Route guards verifying JWT signature and RBAC roles",
      "HTTP status code mapping (200, 201, 400, 401, 403, 409)",
      "Standardized response envelope formatting",
    ],
    technologies: ["NestJS Controllers", "Express Routers", "Zod", "JWT Guards"],
    codeSnippetTitle: "NestJS Controller Endpoint",
    codeSnippet: `// 04. Controller with Guards & DTO Validation
@Post('checkout')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Customer')
async checkout(
  @CurrentUser() user: UserEntity,
  @Body() dto: CreateOrderDto,
): Promise<OrderResponseDto> {
  return this.orderService.processCheckout(user.id, dto);
}`,
    latencyMs: 3.4,
  },
  {
    id: "logic",
    step: "05",
    name: "Business Logic",
    category: "Domain & Workflows",
    icon: Cpu,
    description:
      "The architectural core: encapsulates pure domain rules, orchestrates transactions, enforces invariants, and triggers external payment or notification webhooks.",
    responsibilities: [
      "Atomic stock consistency checks preventing overselling",
      "Transactional boundary orchestration with rollback guarantees",
      "Third-party integrations (Stripe, Cloudinary, Nodemailer)",
      "Domain entity business invariant verification",
    ],
    technologies: ["Clean Architecture", "Domain Services", "Stripe SDK", "Jest Unit Tests"],
    codeSnippetTitle: "Service Transaction & Business Invariant",
    codeSnippet: `// 05. Business rule: Transactional inventory deduction
async processCheckout(userId: string, dto: CreateOrderDto) {
  return this.prisma.$transaction(async (tx) => {
    // Atomic stock decrement with conditional check
    for (const item of dto.items) {
      const updated = await tx.product.updateMany({
        where: { id: item.productId, stock: { gte: item.quantity } },
        data: { stock: { decrement: item.quantity } },
      });
      if (updated.count === 0) {
        throw new ConflictException(\`Insufficient stock for item \${item.productId}\`);
      }
    }
    return tx.order.create({ data: { userId, items: dto.items } });
  });
}`,
    latencyMs: 5.6,
  },
  {
    id: "database",
    step: "06",
    name: "Database",
    category: "ACID Persistence",
    icon: Database,
    description:
      "The relational or document persistence engine: executes indexed queries, enforces foreign-key constraints, and guarantees ACID transactional durability.",
    responsibilities: [
      "ACID transactional guarantees (Atomicity, Consistency, Isolation, Durability)",
      "Indexed relational lookups and foreign key constraints",
      "Safe connection pooling across concurrent worker threads",
      "Migration history tracking and reproducible schemas",
    ],
    technologies: ["PostgreSQL", "Prisma ORM", "MongoDB", "SQL Server"],
    codeSnippetTitle: "Prisma Relational Schema",
    codeSnippet: `// 06. Relational Persistence Schema
model Order {
  id        String      @id @default(uuid())
  userId    String
  user      User        @relation(fields: [userId], references: [id])
  total     Decimal     @db.Decimal(10, 2)
  status    OrderStatus @default(PENDING)
  createdAt DateTime    @default(now())
  
  @@index([userId, status])
}`,
    latencyMs: 4.2,
  },
  {
    id: "response",
    step: "07",
    name: "Response",
    category: "Feedback & Hydration",
    icon: ArrowRight,
    description:
      "The validated response payload travels back through controllers to the client, triggering optimistic UI settlement, toast notifications, or route redirect.",
    responsibilities: [
      "JSON serialization and sensitive field omission (passwords, salts)",
      "HTTP 201 Created status and Location headers",
      "Client cache invalidation or update",
      "UI toast notification and seamless redirect",
    ],
    technologies: ["JSON Serialization", "HTTP 200/201", "Client Cache", "React Toast"],
    codeSnippetTitle: "Unified API Response Payload",
    codeSnippet: `// 07. Standardized JSON Response
{
  "success": true,
  "statusCode": 201,
  "data": {
    "orderId": "ord_9f81a23",
    "status": "CONFIRMED",
    "receiptUrl": "https://dashboard.stripe.com/..."
  },
  "timestamp": "2026-11-19T18:20:00.000Z"
}`,
    latencyMs: 1.5,
  },
];

export function EngineeringPlayground() {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(3); // Default to Controller
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState<"lifecycle" | "layers">("lifecycle");

  const activeNode = FLOW_NODES[selectedNodeIndex];
  const Icon = activeNode.icon;

  // Real-time Request Simulation runner
  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    let currentStep = 0;
    setSelectedNodeIndex(0);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < FLOW_NODES.length) {
        setSelectedNodeIndex(currentStep);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 700);
  };

  return (
    <section id="engineering" className="relative py-20 sm:py-28 lg:py-32 border-b border-[var(--border-subtle)] bg-[#080B12] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[var(--accent-electric)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-[var(--accent-neon-cyan)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C1424] border border-[var(--border-subtle)] font-mono-code text-xs text-[var(--accent-neon-cyan)] mb-3 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
              <Activity className="w-3.5 h-3.5" />
              <span>ARCHITECTURE PLAYGROUND {"//"}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              REQUEST LIFECYCLE &amp; CORE
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-secondary)] font-sans-body leading-relaxed max-w-2xl">
              Inspect an authenticated HTTP request from client dispatch through gateways, domain transactions, database queries, and back.
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#0C1424] border border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={() => setActiveTab("lifecycle")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-code transition-all cursor-pointer ${
                activeTab === "lifecycle"
                  ? "bg-[var(--accent-electric)] text-white font-semibold shadow-md"
                  : "text-[var(--text-secondary)] hover:text-white"
              }`}
            >
              Request Lifecycle
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("layers")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-code transition-all cursor-pointer ${
                activeTab === "layers"
                  ? "bg-[var(--accent-electric)] text-white font-semibold shadow-md"
                  : "text-[var(--text-secondary)] hover:text-white"
              }`}
            >
              Layer Inspector
            </button>
          </div>
        </div>

        {activeTab === "layers" ? (
          <div>
            <DigitalCore />
          </div>
        ) : (
          <div>
            {/* Real-time Telemetry & Simulation Controller Bar */}
            <div className="mb-6 p-4 rounded-xl bg-[#0C1424]/90 border border-[var(--border-accent)] flex flex-wrap items-center justify-between gap-4 shadow-xl">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono-code">
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#111C33] text-[var(--accent-neon-cyan)] border border-[var(--border-subtle)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-neon-cyan)] animate-pulse" />
                  <span>SIMULATED RUNTIME: ACTIVE</span>
                </span>
                <span className="text-[var(--text-tertiary)]">
                  TOTAL PIPELINE LATENCY:{" "}
                  <strong className="text-white font-bold">19.8ms</strong>
                </span>
                <span className="hidden md:inline-block text-[var(--text-muted)]">|</span>
                <span className="hidden md:inline-block text-[var(--text-tertiary)]">
                  ISOLATION: <strong className="text-emerald-400">SERIALIZABLE</strong>
                </span>
              </div>

              <button
                type="button"
                onClick={runSimulation}
                disabled={isSimulating}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-electric)] hover:bg-[var(--accent-electric-hover)] disabled:opacity-50 text-white text-xs font-mono-code font-semibold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer"
              >
                {isSimulating ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                    <span>Packet In Flight...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Simulate Request Flow</span>
                  </>
                )}
              </button>
            </div>

            {/* Interactive Flow Stepper Conduit */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#0C1424]/80 border border-[var(--border-medium)] mb-8 overflow-x-auto shadow-xl">
              <div className="flex items-center justify-between min-w-[700px] gap-2">
                {FLOW_NODES.map((node, index) => {
                  const isSelected = selectedNodeIndex === index;
                  const NodeIcon = node.icon;

                  return (
                    <React.Fragment key={node.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedNodeIndex(index)}
                        className={`group relative flex flex-col items-center text-center p-3 rounded-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] cursor-pointer ${
                          isSelected
                            ? "bg-[#111C33] border border-[var(--accent-neon-cyan)] shadow-[0_0_20px_rgba(56,189,248,0.25)] scale-105"
                            : "bg-[#080B12]/80 hover:bg-[#111C33]/50 border border-[var(--border-subtle)] hover:border-[var(--border-medium)]"
                        }`}
                        aria-pressed={isSelected}
                      >
                        <span className="font-mono-code text-[10px] text-[var(--text-tertiary)] mb-1">
                          {node.step}
                        </span>

                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-[var(--accent-electric)] text-white shadow-md shadow-blue-500/30"
                              : "bg-[#0C1424] text-[var(--text-secondary)] group-hover:text-white"
                          }`}
                        >
                          <NodeIcon className="w-4 h-4" />
                        </div>

                        <span
                          className={`font-display text-xs font-semibold mt-2 ${
                            isSelected ? "text-white" : "text-[var(--text-secondary)] group-hover:text-white"
                          }`}
                        >
                          {node.name}
                        </span>
                      </button>

                      {/* Flow Arrow Connector with Packet Pulse */}
                      {index < FLOW_NODES.length - 1 && (
                        <div className="flex-1 flex items-center justify-center">
                          <div className="h-0.5 w-full bg-gradient-to-r from-[var(--border-subtle)] via-[var(--accent-electric)]/40 to-[var(--border-subtle)] relative">
                            {isSelected && (
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--accent-neon-cyan)] animate-ping" />
                            )}
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Active Node Telemetry & Code Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Node Description & Responsibilities */}
              <div className="lg:col-span-5 bg-[#0C1424] border border-[var(--border-medium)] rounded-2xl p-6 sm:p-7 shadow-xl">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-subtle)]">
                  <span className="font-mono-code text-xs text-[var(--accent-neon-cyan)] uppercase tracking-wider">
                    NODE {activeNode.step} {"//"} {activeNode.category}
                  </span>
                  <span className="text-[11px] font-mono-code text-[var(--text-muted)]">
                    Latency: ~{activeNode.latencyMs}ms
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-electric)]/15 border border-[var(--accent-neon-cyan)]/40 flex items-center justify-center text-[var(--accent-neon-cyan)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                      {activeNode.name}
                    </h3>
                    <span className="text-xs font-mono-code text-[var(--text-tertiary)]">
                      {activeNode.category}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed font-sans-body">
                  {activeNode.description}
                </p>

                {/* Responsibilities list */}
                <div className="mt-5">
                  <span className="font-mono-code text-xs text-[var(--text-tertiary)] uppercase tracking-wider block mb-2">
                    Stage Responsibilities:
                  </span>
                  <ul className="space-y-2">
                    {activeNode.responsibilities.map((resp, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-[var(--text-secondary)] leading-tight"
                      >
                        <span className="text-[var(--accent-neon-cyan)] font-mono-code shrink-0">&gt;</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies list */}
                <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
                  <span className="font-mono-code text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider block mb-2">
                    Associated Technologies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeNode.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono-code px-2.5 py-1 rounded bg-[#080B12] text-[var(--accent-neon-cyan)] border border-[var(--border-subtle)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Code Snippet Slot */}
              <div className="lg:col-span-7 bg-[#080B12] border border-[var(--border-medium)] rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#0C1424] border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono-code text-xs text-[var(--text-secondary)] font-medium">
                      {activeNode.codeSnippetTitle}
                    </span>
                  </div>

                  <span className="font-mono-code text-[11px] text-[var(--accent-neon-cyan)] bg-[#080B12] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                    TypeScript / Backend
                  </span>
                </div>

                <div className="p-4 sm:p-6 overflow-x-auto font-mono-code text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed bg-[#080B12]">
                  <pre className="text-slate-300">
                    <code>{activeNode.codeSnippet}</code>
                  </pre>
                </div>

                <div className="px-4 sm:px-6 py-3 bg-[#0C1424]/60 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono-code text-[var(--text-tertiary)]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Contract Verification: Passed</span>
                  </div>
                  <span>Step {selectedNodeIndex + 1} of 7</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
