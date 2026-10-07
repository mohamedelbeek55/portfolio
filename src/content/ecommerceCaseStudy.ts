export interface FactItem {
  label: string;
  value: string;
}

export interface ArchitectureLayer {
  step: string;
  name: string;
  role: string;
}

export interface SecurityPoint {
  title: string;
  detail: string;
}

export interface ConcurrencySection {
  problem: string;
  approach: string;
  result: string;
  placeholderTest: string;
}

export interface EcommerceCaseStudyData {
  meta: {
    number: string;
    label: string;
    title: string;
    summary: string;
    whyBuiltPlaceholder: string;
  };
  factsStrip: FactItem[];
  links: {
    github: string;
    liveApp: string;
    swagger: string;
    nextProject: {
      label: string;
      title: string;
      href: string;
    };
  };
  tableOfContents: {
    id: string;
    number: string;
    title: string;
  }[];
  architecture: {
    title: string;
    description: string;
    layers: ArchitectureLayer[];
    moduleExamplePlaceholder: string;
  };
  security: {
    title: string;
    items: string[];
    rotationPlaceholder: string;
  };
  concurrency: ConcurrencySection;
  payments: {
    title: string;
    description: string;
    webhookStatePlaceholder: string;
  };
  testingAndDeployment: {
    title: string;
    items: {
      label: string;
      detail: string;
      link?: string;
    }[];
  };
  reflection: {
    title: string;
    intro: string;
    placeholderImprovements: string;
  };
}

export const ecommerceCaseStudy: EcommerceCaseStudyData = {
  meta: {
    number: "01",
    label: "FULL-STACK WEB APPLICATION · Personal project",
    title: "E-Commerce Platform",
    summary:
      "A full-stack e-commerce application with an Angular frontend and a NestJS / Prisma / PostgreSQL backend. The frontend covers product and category browsing, cart, checkout, and an admin dashboard. The backend handles authentication, orders, inventory, and payments. Both are deployed and connected end to end.",
    whyBuiltPlaceholder:
      "[TODO: Mohamed to fill in — one sentence on why you chose to build this project.]",
  },

  factsStrip: [
    { label: "Backend", value: "NestJS · TypeScript · PostgreSQL · Prisma" },
    { label: "Payments", value: "Stripe PaymentIntents" },
    { label: "Infra", value: "Docker · GitHub Actions" },
    { label: "Deployed", value: "Railway (backend) · Vercel (frontend)" },
  ],

  links: {
    github: "https://github.com/mohamedelbeek55/ecommerce-api-nestjs",
    liveApp: "https://ecommerce-frontend-nqbt.vercel.app/",
    swagger:
      "https://ecommerce-api-nestjs-production-f953.up.railway.app/api/docs",
    nextProject: {
      label: "Next Project",
      title: "02 — LexaGuide (Graduation Team Project)",
      href: "/#work",
    },
  },

  tableOfContents: [
    { id: "overview", number: "01", title: "Overview" },
    { id: "architecture", number: "02", title: "Architecture" },
    { id: "authentication", number: "03", title: "Authentication & Security" },
    { id: "inventory", number: "04", title: "Inventory & Concurrency" },
    { id: "payments", number: "05", title: "Payments" },
    { id: "testing", number: "06", title: "Testing & Deployment" },
    { id: "next-steps", number: "07", title: "What I'd Improve Next" },
  ],

  architecture: {
    title: "Clean Architecture & Data Flow",
    description:
      "The backend follows Clean Architecture. Controllers handle HTTP, services hold the business rules, and services depend on repository interfaces rather than on Prisma directly. Prisma sits behind those interfaces. This keeps business logic unit-testable without a database and keeps persistence details out of the rules.",
    layers: [
      {
        step: "01",
        name: "Controllers",
        role: "Handle HTTP requests and delegate to services.",
      },
      {
        step: "02",
        name: "Services",
        role: "Hold domain rules, order workflows, and transactional orchestrations.",
      },
      {
        step: "03",
        name: "Repository Interfaces",
        role: "Abstract persistence contracts; services depend on interfaces, not ORM implementations.",
      },
      {
        step: "04",
        name: "Prisma Implementations",
        role: "Implement repository interfaces using Prisma Client queries and relational mappings.",
      },
      {
        step: "05",
        name: "PostgreSQL",
        role: "Relational persistence with ACID constraints, foreign keys, and atomic operations.",
      },
    ],
    moduleExamplePlaceholder:
      "[TODO: Mohamed to fill in — optional: one concrete example of a module and how its layers look.]",
  },

  security: {
    title: "Authentication & Security Mechanisms",
    items: [
      "JWT access tokens with refresh token rotation; refresh tokens are SHA-256 hashed",
      "Role-based access control (RBAC)",
      "Google OAuth sign-in",
      "Email verification",
      "Password reset with expiring, single-use tokens",
      "Rate limiting",
    ],
    rotationPlaceholder:
      "[TODO: Mohamed to fill in — one or two sentences on how rotation works in your implementation (what happens when an old refresh token is reused).]",
  },

  concurrency: {
    problem:
      "How do you prevent two concurrent checkout requests from purchasing the same inventory?",
    approach:
      "Checkout runs in a transaction, and stock is decremented with an atomic, conditional update, so the database itself rejects the change if there isn't enough stock. Inventory changes don't rely on an application-level check alone.",
    result:
      "Checkout logic is designed around data consistency rather than only the happy path, which prevents overselling under concurrent requests.",
    placeholderTest:
      "[TODO: Mohamed to fill in — optional: whether you have a concurrency test for this, and what it does.]",
  },

  payments: {
    title: "Stripe Payment Processing",
    description:
      "Payments use Stripe PaymentIntents. Requests use idempotency keys, so a retried request doesn't create a duplicate charge. Webhooks are signature-verified, and duplicate webhook events are detected and ignored.",
    webhookStatePlaceholder:
      "[TODO: Mohamed to fill in — optional: how order status changes based on webhook events.]",
  },

  testingAndDeployment: {
    title: "Testing, CI/CD & Production Infrastructure",
    items: [
      {
        label: "Automated Testing",
        detail:
          "Jest and Supertest tests run against a real PostgreSQL test database to verify endpoint contracts and transactions.",
      },
      {
        label: "CI/CD Pipeline",
        detail:
          "GitHub Actions CI pipeline automatically executes linting, test suites, production build, and Docker image packaging.",
      },
      {
        label: "API Documentation",
        detail:
          "Interactive Swagger / OpenAPI 3 specification providing request/response schemas and live endpoint testing.",
        link: "https://ecommerce-api-nestjs-production-f953.up.railway.app/api/docs",
      },
      {
        label: "Database Migrations",
        detail:
          "Version-controlled Prisma migrations tracking relational schema evolution safely across deployments.",
      },
      {
        label: "Cloud Deployment",
        detail:
          "Backend service deployed on Railway with connected PostgreSQL; Angular frontend hosted on Vercel.",
      },
      {
        label: "Containerization",
        detail:
          "Docker and Docker Compose configured for standardized local development and containerized production environments.",
      },
    ],
  },

  reflection: {
    title: "What I'd improve next",
    intro:
      "Honest reflection reads as more credible than a perfect story. A backend system is never finished in isolation; here is what I would target in the next architectural iteration:",
    placeholderImprovements:
      "[TODO: Mohamed to fill in — 2 or 3 honest items. E.g., Redis caching for popular catalog items, distributed message queue for asynchronous order event handling, or automated concurrency load testing.]",
  },
};
