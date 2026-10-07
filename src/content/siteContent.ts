export interface ProjectLink {
  label: string;
  url: string;
  isPrimary?: boolean;
  isExternal?: boolean;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  label: string;
  roleLine?: string;
  weight: "primary" | "medium" | "compact";
  stack: string[];
  description: string;
  highlightConcepts?: string[];
  bulletHighlights?: string[];
  links: ProjectLink[];
  notes?: string;
}

export interface InterfaceArea {
  title: string;
  description: string;
  metricOrTag?: string;
}

export interface PipelineStage {
  step: string;
  name: string;
  detail: string;
}

export interface SupportingLayer {
  name: string;
  role: string;
}

export interface SkillCategory {
  category: string;
  isDominant?: boolean;
  isMinor?: boolean;
  skills: string[];
}

export const siteContent = {
  meta: {
    name: "Mohamed Elbeek",
    legalName: "Mohamed Mahmoud Mohamed Elbeek",
    title: "Backend Developer",
    location: "Cairo, Egypt",
    educationBrief: "B.Sc. Information Technology, Sinai University, June 2026",
    gpa: "3.09 / 4.0 (Very Good)",
    email: "mohamed.elbeek88@gmail.com",
    whatsappNumber: "+20 127 175 9984",
    whatsappUrl: "https://wa.me/201271759984",
    githubUrl: "https://github.com/mohamedelbeek55",
    linkedinUrl: "https://www.linkedin.com/in/mohamed-elbeek-9b81a230b/",
    cvPath: "/Mohamed_Elbeek_CV.pdf",
    statusBadge: "Open to backend roles & freelance work",
  },

  navigation: [
    { label: "Home", href: "#top" },
    { label: "Work", href: "#work" },
    { label: "Architecture", href: "#architecture" },
    { label: "Toolkit", href: "#toolkit" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    badge: "BACKEND DEVELOPER",
    headline:
      "I build APIs with Node.js and NestJS, with a focus on authentication, payments, and data consistency.",
    supportingText:
      "I enjoy working on the parts of software users don't always see — APIs, business logic, authentication, databases, and the systems that make products work.",
    statusLine:
      "Recent IT graduate · Cairo, Egypt · Open to backend roles and freelance work",
    primaryCta: {
      label: "View My Work",
      href: "#work",
    },
    secondaryCta: {
      label: "Let's Work Together",
      href: "#contact",
    },
    quickLinks: [
      { label: "GitHub", href: "https://github.com/mohamedelbeek55", isExternal: true },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/mohamed-elbeek-9b81a230b/",
        isExternal: true,
      },
      { label: "Download CV", href: "/Mohamed_Elbeek_CV.pdf", isDownload: true },
    ],
  },

  projectsSection: {
    heading: "Selected Work",
    subheading: "Projects where I focused on the backend problems behind the product.",
    projects: [
      {
        id: "ecommerce-platform",
        number: "01",
        title: "E-Commerce Platform",
        label: "FULL-STACK WEB APPLICATION",
        weight: "primary",
        stack: [
          "NestJS",
          "TypeScript",
          "PostgreSQL",
          "Prisma",
          "Stripe",
          "Docker",
          "Angular",
        ],
        description:
          "A backend-focused e-commerce system built around secure authentication, transactional checkout, inventory consistency, reliable payment processing, and maintainable architecture.",
        highlightConcepts: [
          "Inventory consistency",
          "Secure authentication",
          "Payment reliability",
          "Clean architecture",
          "Automated testing",
          "CI/CD",
        ],
        links: [
          {
            label: "Case Study",
            url: "/projects/ecommerce",
            isPrimary: true,
            isExternal: false,
          },
          {
            label: "GitHub",
            url: "https://github.com/mohamedelbeek55/ecommerce-api-nestjs",
            isExternal: true,
          },
          {
            label: "Live App",
            url: "https://ecommerce-frontend-nqbt.vercel.app/",
            isExternal: true,
          },
          {
            label: "Swagger API Docs",
            url: "https://ecommerce-api-nestjs-production-f953.up.railway.app/api/docs",
            isExternal: true,
          },
        ],
      },
      {
        id: "lexaguide",
        number: "02",
        title: "LexaGuide",
        label: "GRADUATION PROJECT",
        roleLine: "Backend Developer — Graduation Team Project",
        weight: "medium",
        stack: [
          "Node.js",
          "Express.js",
          "MongoDB",
          "Mongoose",
          "JWT",
          "Zod",
          "Cloudinary",
        ],
        description:
          "Legal assistance platform with a backend API covering authentication, lawyers, consultations, legal templates, document generation, notifications, chatbot sessions, and file handling.",
        bulletHighlights: [
          "48+ REST endpoints across 9 modules",
          "Role-based JWT auth (User / Lawyer / Admin) with access/refresh token rotation and session revocation",
          "Google OAuth and OTP email verification",
          "Consultation lifecycle (pending → accepted → completed)",
          "In-app chat API and Cloudinary file uploads",
        ],
        links: [
          {
            label: "Backend Repo",
            url: "https://github.com/mohamedelbeek55/Graduation-Backend2",
            isPrimary: true,
            isExternal: true,
          },
          {
            label: "Live Platform",
            url: "https://lexaguide-frontend.vercel.app/",
            isExternal: true,
          },
          {
            label: "Frontend Repo (Supporting)",
            url: "https://github.com/mohamedelbeek55/lexaguide-frontend",
            isExternal: true,
          },
        ],
        notes:
          "Backend developer on a graduation team project. The frontend repository supports the live product.",
      },
      {
        id: "tech-ecommerce",
        number: "03",
        title: "Tech E-Commerce Web Application",
        label: "EARLIER WORK",
        weight: "compact",
        stack: ["ASP.NET MVC", "C#", "SQL Server"],
        description:
          "A database-backed web application for technology products with CRUD functionality, SQL Server integration, and authentication.",
        links: [],
      },
    ] as ProjectItem[],
  },

  behindInterface: {
    heading: "Behind the Interface",
    intro:
      "I enjoy working on the parts of software that aren't always visible — designing APIs, handling business rules, thinking about data consistency, authentication, and making systems easier to maintain.",
    areas: [
      {
        title: "API Design",
        description:
          "Designing REST APIs and documenting them with Swagger / OpenAPI 3.",
      },
      {
        title: "Business Logic",
        description:
          "Keeping business rules in services, separate from controllers and persistence, so they can be unit-tested.",
      },
      {
        title: "Data Integrity",
        description:
          "Transactional checkout with atomic, conditional stock updates to prevent overselling under concurrent requests.",
      },
      {
        title: "Authentication",
        description:
          "JWT access and refresh tokens, Google OAuth, email verification, and expiring single-use password reset tokens.",
      },
      {
        title: "Security",
        description:
          "Refresh token rotation with hashed tokens, role-based access control, session revocation, and rate limiting.",
      },
      {
        title: "Testing",
        description:
          "Jest and Supertest tests against PostgreSQL, run in GitHub Actions CI.",
      },
      {
        title: "Maintainability",
        description:
          "Clean Architecture with repository interfaces, so persistence details stay out of the business rules.",
      },
      {
        title: "Deployment",
        description:
          "Docker and Docker Compose, GitHub Actions CI (lint, tests, build, Docker), backend on Railway, frontend on Vercel.",
      },
    ] as InterfaceArea[],
  },

  howIBuild: {
    heading: "How I Build",
    subheading: "A systematic flow from client request to persistent data.",
    flowTitle: "REQUEST LIFECYCLE BLUEPRINT",
    flow: [
      {
        step: "01",
        name: "Client",
        detail: "HTTP request",
      },
      {
        step: "02",
        name: "REST API",
        detail: "Routing",
      },
      {
        step: "03",
        name: "Controllers",
        detail: "HTTP handling",
      },
      {
        step: "04",
        name: "Services & Logic",
        detail: "Business rules & transactions",
      },
      {
        step: "05",
        name: "Repository Layer",
        detail: "Data access abstraction",
      },
      {
        step: "06",
        name: "Database",
        detail: "PostgreSQL / MongoDB",
      },
    ] as PipelineStage[],
    crossCutting: [
      { name: "Authentication", role: "JWT, refresh rotation, RBAC" },
      { name: "Validation", role: "Input validation (Zod)" },
      { name: "Payments", role: "Stripe PaymentIntents, webhooks, idempotency" },
      { name: "Testing", role: "Jest & Supertest" },
      { name: "CI/CD", role: "GitHub Actions" },
      { name: "Deployment", role: "Docker, Railway, Vercel" },
    ] as SupportingLayer[],
  },

  toolkit: {
    heading: "Technical Toolkit",
    subheading:
      "A focused backend stack built for consistency, type safety, and clean separation of concerns.",
    groups: [
      {
        category: "Backend Core",
        isDominant: true,
        skills: ["Node.js", "NestJS", "Express.js", "TypeScript", "REST APIs"],
      },
      {
        category: "Databases & ORM",
        isDominant: true,
        skills: [
          "PostgreSQL",
          "Prisma",
          "MongoDB",
          "Mongoose",
          "MySQL",
          "SQL Server",
        ],
      },
      {
        category: "Architecture & Security",
        skills: [
          "Clean Architecture",
          "Repository Pattern",
          "JWT",
          "Refresh Token Rotation",
          "RBAC",
          "Zod",
        ],
      },
      {
        category: "Third-Party Integrations",
        skills: ["Stripe", "Google OAuth", "Cloudinary", "Nodemailer"],
      },
      {
        category: "Testing & DevOps",
        skills: [
          "Docker",
          "Docker Compose",
          "GitHub Actions",
          "Railway",
          "Jest",
          "Supertest",
          "Swagger / OpenAPI",
        ],
      },
      {
        category: "Frontend (Supporting)",
        isMinor: true,
        skills: ["Angular", "JavaScript", "HTML5", "CSS3"],
      },
    ] as SkillCategory[],
  },

  about: {
    title: "A little about me",
    paragraphs: [
      "I'm Mohamed, a recent Information Technology graduate focused on backend development.",
      "Most of my work revolves around Node.js, NestJS, TypeScript, and databases. I enjoy the parts of software that users don't always see — designing APIs, handling business rules, thinking about data consistency, authentication, and making systems easier to maintain.",
      "I'm currently looking for a backend-focused role where I can keep building real systems, learn from experienced engineers, and grow as a backend developer.",
    ],
    education: {
      degree: "B.Sc. in Information Technology",
      university: "Sinai University",
      gradDate: "June 2026",
      gpa: "GPA 3.09 / 4.0 (Very Good)",
    },
    cvLink: "/Mohamed_Elbeek_CV.pdf",
  },

  contact: {
    heading: "Let's Work Together",
    copy: "Have a backend project, product idea, or opportunity you'd like to discuss? I'd be happy to hear about it.",
    email: "mohamed.elbeek88@gmail.com",
    whatsappDisplay: "+20 127 175 9984",
    whatsappUrl: "https://wa.me/201271759984",
    options: [
      {
        label: "Email",
        value: "mohamed.elbeek88@gmail.com",
        href: "mailto:mohamed.elbeek88@gmail.com",
        isCopyable: true,
      },
      {
        label: "WhatsApp",
        value: "+20 127 175 9984",
        href: "https://wa.me/201271759984",
        isExternal: true,
      },
      {
        label: "LinkedIn",
        value: "mohamed-elbeek-9b81a230b",
        href: "https://www.linkedin.com/in/mohamed-elbeek-9b81a230b/",
        isExternal: true,
      },
      {
        label: "GitHub",
        value: "mohamedelbeek55",
        href: "https://github.com/mohamedelbeek55",
        isExternal: true,
      },
      {
        label: "Download CV",
        value: "Mohamed_Elbeek_CV.pdf",
        href: "/Mohamed_Elbeek_CV.pdf",
        isDownload: true,
      },
    ],
  },

  footer: {
    author: "Mohamed Elbeek",
    role: "Backend Developer",
    copyright: "© 2026 Mohamed Elbeek. All rights reserved.",
  },
};
