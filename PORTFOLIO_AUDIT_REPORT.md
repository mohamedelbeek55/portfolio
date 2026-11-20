# PORTFOLIO PROJECT AUDIT & DISCOVERY REPORT
**Target Repository:** `portfolio`  
**Live Production URL:** [https://portfolio-alpha-liard-14.vercel.app/](https://portfolio-alpha-liard-14.vercel.app/)  
**Audit Date:** November 19, 2026  
**Auditor Roles:** Senior Software Architect, Senior Frontend Engineer, UI/UX Auditor, Technical Content Strategist, Web Performance Engineer  
**Status:** Complete Technical, Visual, Content, and Architecture Discovery  

---

## 1. Executive Summary

This comprehensive audit evaluates the existing personal portfolio of **Mohamed Elbeek** to establish a baseline before executing an approved creative redesign towards a **Cinematic, High-Performance, 3D-Interactive, Full-Stack / Backend-Focused Engineering Experience**.

### Key Findings at a Glance
- **Current Foundation:** The application is built on **Next.js 16.4.0 (App Router)** with **React 19.3.0**, **TypeScript 5 (Strict Mode)**, **Tailwind CSS v4 (`@tailwindcss/turbopack`)**, and **Framer Motion 14.0.0**. `[VERIFIED]`
- **Content Decoupling:** Content is organized cleanly into typed data configuration files ([`src/content/siteContent.ts`](file:///d:/My_Projects/portfolio/src/content/siteContent.ts) and [`src/content/ecommerceCaseStudy.ts`](file:///d:/My_Projects/portfolio/src/content/ecommerceCaseStudy.ts)), but UI presentation is tightly coupled to specific hardcoded array indices (`projects[0]`, `projects[1]`, `projects[2]`) in [`src/components/sections/SelectedWork.tsx`](file:///d:/My_Projects/portfolio/src/components/sections/SelectedWork.tsx). `[VERIFIED]`
- **Projects Inventory:**
  - **3 projects** are rendered on the live website and in `siteContent.ts`: (1) E-Commerce Platform, (2) LexaGuide (Graduation Project), and (3) Tech E-Commerce Web App (ASP.NET MVC). `[VERIFIED]`
  - **1 additional client project** exists in the verified CV and PDF links but is **absent** from the website: **Minimal Be Creative** ([https://minimal1.vercel.app/](https://minimal1.vercel.app/)). `[VERIFIED]`
  - **1 single dedicated case study route** exists (`/projects/ecommerce`), implemented as a static monolithic view ([`src/components/case-study/EcommerceCaseStudyView.tsx`](file:///d:/My_Projects/portfolio/src/components/case-study/EcommerceCaseStudyView.tsx)) with 6 unfinished `[TODO: Mohamed to fill in ...]` editorial placeholders. `[VERIFIED]`
- **Visual & Design System Status:** The current visual aesthetic is a restrained "Dark Editorial / Engineering Blueprint" with a dark slate background (`#090a0d`), blue accents (`#3b82f6`), Newsreader serif headings, Inter sans-serif body, and JetBrains Mono technical labels. While clean and functional, it lacks the approved cinematic depth, deep blacks (`#080B12`), midnight navy layers (`#0C1424`), neon cyan glows (`#38BDF8`), WebGL shaders, smooth-scroll inertia, and 3D visual physics. `[OBSERVED]`
- **Code Health & Build Status:**
  - ESLint 9: **0 errors, 0 warnings**. `[VERIFIED]`
  - TypeScript 5 strict typecheck: **0 errors**. `[VERIFIED]`
  - Next.js Turbopack production build: **Successfully compiled in 804ms - 3.3s** generating 8 static routes and 1 dynamic sitemap route. `[VERIFIED]`
  - Security Notice: A Next.js upstream security advisory triggers a build notice (`Error [SecurityFatalError]: Your version of Next.js is affected by a known security vulnerability`) requiring an upgrade nudge. `[VERIFIED]`
- **Readiness for Redesign:** **Technically Viable & High Potential**, provided that three prerequisite architectural upgrades are executed: (1) dynamic project routing (`/projects/[slug]`), (2) unified project schema, and (3) animation engine decoupling to avoid React 19 / Turbopack bundle bloating. `[INFERRED]`

---

## 2. Existing Project Technical Overview

| Parameter | Current Specification | Verification Status | Notes |
|---|---|---|---|
| **Project Framework** | Next.js (App Router) | `[VERIFIED]` | Version `16.4.0` in [`package.json`](file:///d:/My_Projects/portfolio/package.json#L14) |
| **Framework Engine** | Turbopack | `[VERIFIED]` | Enabled via `next.config.ts` and `next build` |
| **UI Library** | React 19.3.0 / React-DOM 19.3.0 | `[VERIFIED]` | Next.js 16 peer dependencies |
| **Programming Language** | TypeScript 5.x | `[VERIFIED]` | Strict mode enabled in [`tsconfig.json`](file:///d:/My_Projects/portfolio/tsconfig.json#L7) |
| **Styling Solution** | Tailwind CSS v4 (`@tailwindcss/turbopack` ^4) | `[VERIFIED]` | Modern `@import "tailwindcss";` in [`globals.css`](file:///d:/My_Projects/portfolio/src/app/globals.css#L1) |
| **Package Manager** | npm (v10+ via `package-lock.json` v3) | `[VERIFIED]` | Lockfile present: `package-lock.json` (236 KB) |
| **Animation Engine** | Framer Motion (`framer-motion` ^14.0.0) | `[VERIFIED]` | Used for simple section reveals and blueprint pulse |
| **Iconography** | Lucide React (`lucide-react` ^1.52.0) | `[VERIFIED]` | Tree-shaken SVG icon set |
| **Typography Pipeline** | `next/font/google` | `[VERIFIED]` | Newsreader (serif), Inter (sans), JetBrains Mono (mono) |
| **Routing System** | Next.js App Router | `[VERIFIED]` | Static route `/` and `/projects/ecommerce` |
| **Rendering Strategy** | Static Site Generation (SSG / Prerender) | `[VERIFIED]` | All HTML pages prerendered static; sitemap dynamic |
| **Deployment Target** | Vercel | `[VERIFIED]` | Live at `portfolio-alpha-liard-14.vercel.app` |
| **Git Branch** | `main` | `[VERIFIED]` | Up to date with `origin/main` |
| **Git Working Tree** | Clean | `[VERIFIED]` | 0 uncommitted changes |
| **Git Origin** | `https://github.com/mohamedelbeek55/portfolio.git` | `[VERIFIED]` | Main developer GitHub repository |

### Installed Dependencies Breakdown

#### Production Dependencies ([`package.json`](file:///d:/My_Projects/portfolio/package.json#L11-L17))
- `next: 16.4.0`: Core React SSR/SSG full-stack framework.
- `react: 19.3.0`: React core.
- `react-dom: 19.3.0`: React DOM bindings.
- `framer-motion: ^14.0.0`: Motion library for React.
- `lucide-react: ^1.52.0`: Modern SVG icons.

#### Development Dependencies ([`package.json`](file:///d:/My_Projects/portfolio/package.json#L18-L27))
- `@tailwindcss/turbopack: ^4`: Official Turbopack loader for Tailwind CSS v4.
- `tailwindcss: ^4`: Utility-first CSS engine.
- `typescript: ^5`: Static typing and compilation.
- `@types/node: ^20`: Node.js typings.
- `@types/react: ^19`: React 19 typings.
- `@types/react-dom: ^19`: React DOM 19 typings.
- `eslint: ^9`: Linter core.
- `eslint-config-next: 16.4.0`: Next.js rules for ESLint 9 flat config.

---

## 3. Architecture and File Structure

### Repository Structure Overview

```
portfolio/
├── .git/                                 # Git version control metadata
├── .next/                                # Next.js compilation cache and output
├── node_modules/                         # Installed npm packages
├── public/                               # Static assets served from domain root
│   ├── projects/
│   │   └── README.md                     # Placeholder note for future project screenshots
│   ├── file.svg                          # Default Next.js starter icon (unused)
│   ├── globe.svg                         # Default Next.js starter icon (unused)
│   ├── Mohamed_Elbeek_CV.pdf             # Mohamed Elbeek's actual verified PDF resume (299 KB)
│   ├── next.svg                          # Default Next.js starter icon (unused)
│   ├── vercel.svg                        # Default Next.js starter icon (unused)
│   └── window.svg                        # Default Next.js starter icon (unused)
├── src/
│   ├── app/                              # Next.js App Router root
│   │   ├── favicon.ico                   # Standalone browser favicon
│   │   ├── globals.css                   # Tailwind v4 import, CSS variables, utility classes
│   │   ├── icon.svg                      # Dynamic SVG favicon (terminal dot + code chevron)
│   │   ├── layout.tsx                    # Root HTML layout, font injection, Schema.org Person JSON-LD
│   │   ├── opengraph-image.tsx           # Dynamic OG image generator via next/og (1200x630)
│   │   ├── page.tsx                      # Single-page portfolio root (assembles all sections)
│   │   ├── robots.ts                     # MetadataRoute.Robots generator
│   │   ├── sitemap.ts                    # MetadataRoute.Sitemap generator
│   │   ├── twitter-image.tsx             # Re-exports opengraph-image for Twitter cards
│   │   └── projects/
│   │       └── ecommerce/
│   │           └── page.tsx              # Static route for E-Commerce platform case study
│   ├── components/
│   │   ├── case-study/
│   │   │   └── EcommerceCaseStudyView.tsx# Monolithic interactive case study presentation (530 lines)
│   │   ├── hero/
│   │   │   └── HeroVisual.tsx            # Animated 5-step Architecture Pipeline Blueprint
│   │   ├── layout/
│   │   │   ├── Footer.tsx                # Minimal footer with copyright & channel anchors
│   │   │   └── Navbar.tsx                # Fixed header, smooth-scroll anchors, mobile drawer
│   │   ├── sections/
│   │   │   ├── About.tsx                 # Narrative bio + Academic & Profile Facts box
│   │   │   ├── BehindInterface.tsx       # 8 numbered backend perspective cards
│   │   │   ├── Contact.tsx               # Direct channels + interactive clipboard copy button
│   │   │   ├── Hero.tsx                  # Primary H1, editorial subheadline, status badge, CTAs
│   │   │   ├── HowIBuild.tsx             # 6-step request lifecycle blueprint + cross-cutting pillars
│   │   │   ├── SelectedWork.tsx          # 3 hardcoded projects with distinct visual weights
│   │   │   └── TechnicalToolkit.tsx      # 6 categorised skill groups with primary/supporting tiers
│   │   └── ui/
│   │       └── SectionReveal.tsx         # Framer Motion scroll-reveal container (fade-up)
│   └── content/
│       ├── ecommerceCaseStudy.ts         # Case study typed data schema & copy
│       └── siteContent.ts                # Master profile, navigation, projects, and skills data
├── .gitignore                            # Standard git ignore definitions
├── AGENTS.md                             # Next.js 16 canary agent instructions
├── eslint.config.mjs                     # ESLint 9 flat configuration
├── next-env.d.ts                         # Next.js TypeScript definitions
├── next.config.ts                        # Turbopack CSS loaders, Cache Components, Partial Prefetching
├── package-lock.json                     # Dependency lockfile
├── package.json                          # Package scripts and manifests
├── README.md                             # Project documentation and TODO guide
└── tsconfig.json                         # TypeScript strict configuration
```

### Important Files Assessment Table

| File / Directory | Purpose | Current Importance | Future Redesign Role | Status |
|---|---|---|---|---|
| [`src/content/siteContent.ts`](file:///d:/My_Projects/portfolio/src/content/siteContent.ts) | Master profile content, personal metadata, projects array, skills, lifecycle stages | **CRITICAL** | Core data foundation. Keep and expand into a typed modular content layer. | `[VERIFIED]` |
| [`src/content/ecommerceCaseStudy.ts`](file:///d:/My_Projects/portfolio/src/content/ecommerceCaseStudy.ts) | E-commerce architecture, security, concurrency, payments, and testing copy | **HIGH** | Content is reusable, but format should be unified into a polymorphic `ProjectCaseStudy` schema. | `[VERIFIED]` |
| [`src/components/sections/SelectedWork.tsx`](file:///d:/My_Projects/portfolio/src/components/sections/SelectedWork.tsx) | Renders the 3 existing projects on the home page | **HIGH** | Needs complete redesign. Current implementation tightly hardcodes `projects[0]`, `[1]`, `[2]`. | `[OBSERVED]` |
| [`src/components/case-study/EcommerceCaseStudyView.tsx`](file:///d:/My_Projects/portfolio/src/components/case-study/EcommerceCaseStudyView.tsx) | Monolithic 530-line view for the single ecommerce case study | **MEDIUM** | Replace with a generic dynamic template `src/app/projects/[slug]/page.tsx`. | `[OBSERVED]` |
| [`src/components/hero/HeroVisual.tsx`](file:///d:/My_Projects/portfolio/src/components/hero/HeroVisual.tsx) | Interactive architecture pipeline diagram in hero | **HIGH** | Visual concept is strong; candidate for upgrade to 3D WebGL / interactive canvas visual. | `[OBSERVED]` |
| [`src/components/sections/HowIBuild.tsx`](file:///d:/My_Projects/portfolio/src/components/sections/HowIBuild.tsx) | 6-stage Request Lifecycle Blueprint with automated cycling active state | **MEDIUM** | Redesign with cinematic interactive scrubbing / scroll-driven timeline. | `[OBSERVED]` |
| [`src/components/layout/Navbar.tsx`](file:///d:/My_Projects/portfolio/src/components/layout/Navbar.tsx) | Sticky header, brand, anchors, mobile drawer | **HIGH** | Redesign with cinematic floating glass dock, scroll progress bar, and magnetic links. | `[OBSERVED]` |
| [`src/components/sections/Contact.tsx`](file:///d:/My_Projects/portfolio/src/components/sections/Contact.tsx) | Contact channels, WhatsApp, and copy-email button | **HIGH** | Excellent UX interactions. Retain logic, elevate visuals into premium dark terminal card. | `[VERIFIED]` |
| [`src/app/globals.css`](file:///d:/My_Projects/portfolio/src/app/globals.css) | Color variables, blueprint grid utilities, reduced-motion rules | **HIGH** | Expand CSS variables with cinematic palette tokens (`#080B12`, `#38BDF8`, etc.). | `[OBSERVED]` |
| [`src/app/layout.tsx`](file:///d:/My_Projects/portfolio/src/app/layout.tsx) | Google fonts, metadata, Schema.org Person JSON-LD, skip-link | **CRITICAL** | Retain SEO and accessibility foundation; update font stack if display fonts change. | `[VERIFIED]` |
| [`public/Mohamed_Elbeek_CV.pdf`](file:///d:/My_Projects/portfolio/public/Mohamed_Elbeek_CV.pdf) | Actual production CV served directly | **CRITICAL** | Keep asset; verify content sync with website copy. | `[VERIFIED]` |

---

## 4. Current Website Section Inventory

The website is structured as a single-page long-scroll application plus one subpage for the case study. Every section was audited in live execution:

### Section 1: Hero Section
- **Anchor:** `#top`
- **Component File:** [`src/components/sections/Hero.tsx`](file:///d:/My_Projects/portfolio/src/components/sections/Hero.tsx)
- **Subcomponents:** [`src/components/hero/HeroVisual.tsx`](file:///d:/My_Projects/portfolio/src/components/hero/HeroVisual.tsx)
- **Purpose:** Immediate positioning of Mohamed as a backend engineer specializing in Node.js, NestJS, and data consistency.
- **Existing Content:**
  - Badge: `BACKEND DEVELOPER` with a blue pulsing dot.
  - Headline (H1): *"I build APIs with Node.js and NestJS, with a focus on authentication, payments, and data consistency."*
  - Supporting Paragraph: *"I enjoy working on the parts of software users don't always see — APIs, business logic, authentication, databases, and the systems that make products work."*
  - Status Line: *"Recent IT graduate · Cairo, Egypt · Open to backend roles and freelance work"* with a green pulse dot.
  - CTAs: "View My Work" (`#work`), "Let's Work Together" (`#contact`), GitHub, LinkedIn, and "Download CV".
  - Hero Visual: 5-step pipeline diagram (Request → Controller → Business Logic → Repository → Database).
- **Interactions:** Subtle border animation pulse across steps; smooth scroll on CTA click; external profile opens.
- **Limitations:** Flat 2D layout; CSS grid background is static; lacks depth, particle dynamics, or 3D visual anchors.
- **Recommendation:** **REDESIGN**. Retain the core messaging and status indicators, but upgrade the visual presentation to an immersive 3D/canvas interactive engineering scene. `[OBSERVED]`

### Section 2: Selected Work (Projects)
- **Anchor:** `#work`
- **Component File:** [`src/components/sections/SelectedWork.tsx`](file:///d:/My_Projects/portfolio/src/components/sections/SelectedWork.tsx)
- **Purpose:** Showcase real software engineering projects with proof of backend competency.
- **Existing Content:**
  - Section header: `// 01. WORK` · "Selected Work" · *"Projects where I focused on the backend problems behind the product."*
  - **Project 01 (Flagship):** E-Commerce Platform (NestJS, TypeScript, PostgreSQL, Prisma, Stripe, Docker, Angular). Links to Case Study (`/projects/ecommerce`), GitHub, Live App, Swagger Docs.
  - **Project 02 (Medium Weight):** LexaGuide Graduation Project (Node.js, Express, MongoDB, Mongoose, JWT, Zod, Cloudinary). 48+ REST endpoints, auth lifecycle, repositories.
  - **Project 03 (Compact Row):** Tech E-Commerce Web App (ASP.NET MVC, C#, SQL Server). Earlier database-backed CRUD work.
- **Interactions:** Hover border transitions, link navigations.
- **Limitations:**
  - Hardcoded index-based rendering in JSX (`project1`, `project2`, `project3`).
  - No project images, diagrams, or screenshots.
  - No filtering by category (Full-Stack vs. Backend API vs. Client).
  - Adding a 4th project requires rewriting the component JSX.
- **Recommendation:** **REDESIGN & REFACTOR**. Convert into a dynamic data-driven layout with visual cards, architecture diagram previews, and interactive metrics. `[OBSERVED]`

### Section 3: Behind the Interface (Perspective)
- **Anchor:** None (flow element between Work and Architecture)
- **Component File:** [`src/components/sections/BehindInterface.tsx`](file:///d:/My_Projects/portfolio/src/components/sections/BehindInterface.tsx)
- **Purpose:** Articulate Mohamed's software engineering philosophy across 8 core backend domains.
- **Existing Content:**
  - Header: `// 02. PERSPECTIVE` · "Behind the Interface"
  - 8 Cards: (1) API Design, (2) Business Logic, (3) Data Integrity, (4) Authentication, (5) Security, (6) Testing, (7) Maintainability, (8) Deployment.
- **Interactions:** Hover card borders, blue indicator lights.
- **Limitations:** Standard 4-column card grid; static textual presentation.
- **Recommendation:** **REDESIGN**. The content is stellar for backend positioning. Transform into an interactive technical architectural radar or interactive holographic grid. `[OBSERVED]`

### Section 4: How I Build (Architecture Blueprint)
- **Anchor:** `#architecture`
- **Component File:** [`src/components/sections/HowIBuild.tsx`](file:///d:/My_Projects/portfolio/src/components/sections/HowIBuild.tsx)
- **Purpose:** Demonstrate a systematic architectural workflow from HTTP request to database persistence.
- **Existing Content:**
  - Header: `// 03. ARCHITECTURE` · "How I Build"
  - 6-Stage Pipeline: 01 Client → 02 REST API → 03 Controllers → 04 Services & Logic → 05 Repository Layer → 06 Database.
  - Cross-Cutting Concerns: Authentication, Validation, Payments, Testing, CI/CD, Deployment.
- **Interactions:** Automated interval (2200ms) that cycles through active steps with a ping animation (respects `prefers-reduced-motion`).
- **Limitations:** Timing is automatic and non-interactive; users cannot scrub, click, or inspect specific layer code snippets.
- **Recommendation:** **REDESIGN**. Upgrade to an interactive, user-scrubbed system architecture diagram with code snippet popovers for each layer. `[OBSERVED]`

### Section 5: Technical Toolkit (Skills & Stack)
- **Anchor:** `#toolkit`
- **Component File:** [`src/components/sections/TechnicalToolkit.tsx`](file:///d:/My_Projects/portfolio/src/components/sections/TechnicalToolkit.tsx)
- **Purpose:** Detailed inventory of technical capabilities structured into primary and supporting tiers.
- **Existing Content:**
  - Header: `// 04. STACK & TOOLS` · "Technical Toolkit"
  - 6 Groups:
    1. Backend Core (Dominant): Node.js, NestJS, Express.js, TypeScript, REST APIs.
    2. Databases & ORM (Dominant): PostgreSQL, Prisma, MongoDB, Mongoose, MySQL, SQL Server.
    3. Architecture & Security: Clean Architecture, Repository Pattern, JWT, Refresh Token Rotation, RBAC, Zod.
    4. Third-Party Integrations: Stripe, Google OAuth, Cloudinary, Nodemailer.
    5. Testing & DevOps: Docker, Docker Compose, GitHub Actions, Railway, Jest, Supertest, Swagger / OpenAPI.
    6. Frontend (Supporting, Minor): Angular, JavaScript, HTML5, CSS3.
- **Interactions:** Hover border illumination.
- **Limitations:** Visual pills lack visual icons (logos) or proficiency indicators.
- **Recommendation:** **REDESIGN**. Keep categories; replace text-only pills with sleek tech badges with SVG icons, category tabs, and interactive relationship links. `[OBSERVED]`

### Section 6: About Section
- **Anchor:** `#about`
- **Component File:** [`src/components/sections/About.tsx`](file:///d:/My_Projects/portfolio/src/components/sections/About.tsx)
- **Purpose:** Professional narrative, education credentials, location, and verified academic facts.
- **Existing Content:**
  - Left column: Narrative story about graduating in IT from Sinai University and focusing on backend engineering. Download CV link.
  - Right column: "Academic & Profile Facts" card:
    - Degree: B.Sc. in Information Technology, Sinai University (Graduated June 2026).
    - GPA: 3.09 / 4.0 (Very Good).
    - Location: Cairo, Egypt.
    - Languages: Arabic (Native), English (Good).
- **Interactions:** Download CV link, focus rings.
- **Limitations:** Missing a professional developer portrait/visual asset; layout is somewhat conventional.
- **Recommendation:** **REDESIGN**. Retain all factual content; upgrade layout to a high-end digital identity card with verified engineering credentials. `[OBSERVED]`

### Section 7: Contact Section
- **Anchor:** `#contact`
- **Component File:** [`src/components/sections/Contact.tsx`](file:///d:/My_Projects/portfolio/src/components/sections/Contact.tsx)
- **Purpose:** Convert visitors into direct inquiries, freelance engagements, or employment interviews.
- **Existing Content:**
  - Header: `// 06. CONTACT` · "Let's Work Together"
  - Copy: *"Have a backend project, product idea, or opportunity you'd like to discuss? I'd be happy to hear about it."*
  - Action buttons: "Let's Work Together" (`mailto:mohamed.elbeek88@gmail.com`), "Copy email" button, "WhatsApp" button (`+20 127 175 9984`).
  - Direct communication table: Email, WhatsApp, LinkedIn, GitHub, CV download.
- **Interactions:**
  - Live clipboard copy with async `navigator.clipboard.writeText`.
  - Visual feedback: checkmark icon + `"Copied to clipboard"` state with 2500ms timeout.
- **Limitations:** No interactive contact inquiry form (uses `mailto:` only).
- **Recommendation:** **RETAIN & REDESIGN**. The copy-to-clipboard functionality and direct WhatsApp buttons work well. Enhance visually with a dark cinematic terminal or glass card UI, and consider adding an optional Formspree/Resend contact form. `[VERIFIED]`

### Section 8: Footer
- **Anchor:** Bottom of page
- **Component File:** [`src/components/layout/Footer.tsx`](file:///d:/My_Projects/portfolio/src/components/layout/Footer.tsx)
- **Purpose:** Persistent copyright and secondary navigation.
- **Existing Content:**
  - Author & Role: Mohamed Elbeek — Backend Developer
  - Copyright: `© 2026 Mohamed Elbeek. All rights reserved.`
  - Secondary anchors: GitHub, LinkedIn, Email, WhatsApp.
- **Recommendation:** **RETAIN & REDESIGN**. Align typography and borders with the cinematic theme. `[OBSERVED]`

### Section 9: Dedicated Case Study Page (`/projects/ecommerce`)
- **Route:** `/projects/ecommerce`
- **Page File:** [`src/app/projects/ecommerce/page.tsx`](file:///d:/My_Projects/portfolio/src/app/projects/ecommerce/page.tsx)
- **Component File:** [`src/components/case-study/EcommerceCaseStudyView.tsx`](file:///d:/My_Projects/portfolio/src/components/case-study/EcommerceCaseStudyView.tsx)
- **Data File:** [`src/content/ecommerceCaseStudy.ts`](file:///d:/My_Projects/portfolio/src/content/ecommerceCaseStudy.ts)
- **Purpose:** Deep technical dive into the flagship full-stack/backend e-commerce project.
- **Content Sections:**
  1. Sticky top navigation bar with "Back to Work", "ENGINEERING CASE STUDY", GitHub, and Live App links.
  2. Sticky left sidebar Table of Contents (visible on `lg` screens >= 1024px) tracking active scroll section.
  3. Facts strip: Backend, Payments, Infra, Deployed status.
  4. 01. Overview & Problem Statement.
  5. 02. Clean Architecture & Data Flow (with 5-layer diagram).
  6. 03. Authentication & Security (JWT, refresh rotation, RBAC, OAuth).
  7. 04. Inventory Consistency & Race Conditions (Problem / Approach / Result triad).
  8. 05. Stripe Payments & Webhooks (Idempotency, signature verification).
  9. 06. Testing, CI/CD & Production Infrastructure.
  10. 07. Post-Mortem & Next Iteration ("What I'd improve next").
  11. Next Project teaser link (`02 — LexaGuide`).
- **Outstanding Editorial Placeholders:**
  1. `meta.whyBuiltPlaceholder`: `[TODO: Mohamed to fill in — one sentence on why you chose to build this project.]`
  2. `architecture.moduleExamplePlaceholder`: `[TODO: Mohamed to fill in — optional: one concrete example of a module and how its layers look.]`
  3. `security.rotationPlaceholder`: `[TODO: Mohamed to fill in — one or two sentences on how rotation works in your implementation (what happens when an old refresh token is reused).]`
  4. `concurrency.placeholderTest`: `[TODO: Mohamed to fill in — optional: whether you have a concurrency test for this, and what it does.]`
  5. `payments.webhookStatePlaceholder`: `[TODO: Mohamed to fill in — optional: how order status changes based on webhook events.]`
  6. `reflection.placeholderImprovements`: `[TODO: Mohamed to fill in — 2 or 3 honest items...]`
- **Limitations:**
  - The entire page is a single hardcoded component (`EcommerceCaseStudyView.tsx`) rather than a dynamic route template (`/projects/[slug]`).
  - No diagrams or code snippets; purely text and CSS boxes.
  - Table of Contents sidebar is hidden on tablet/mobile (`hidden lg:block`) without any mobile dropdown replacement.
- **Recommendation:** **REPLACE WITH DYNAMIC TEMPLATE**. Extract this into markdown/MDX or structured data, and build a reusable case study layout engine. `[OBSERVED]`

---

## 5. Current Design System

### Color Palette Extraction

```mermaid
flowchart LR
    subgraph Current Palette
        C1["#090a0d<br/>Canvas Black"]
        C2["#0e1117<br/>Surface Dark"]
        C3["#141821<br/>Surface Elevated"]
        C4["#3b82f6<br/>Accent Blue"]
        C5["#f4f4f7<br/>Primary Text"]
        C6["#9ca3af<br/>Secondary Gray"]
    end
    subgraph Approved Future Palette
        F1["#080B12<br/>Deep Black"]
        F2["#0C1424<br/>Midnight Navy"]
        F3["#2563EB<br/>Electric Blue"]
        F4["#38BDF8<br/>Neon Cyan"]
        F5["#F8FAFC<br/>Pure Bright White"]
        F6["#94A3B8<br/>Secondary Slate"]
    end
    C1 -.->|Evolves into| F1
    C2 -.->|Evolves into| F2
    C4 -.->|Evolves into| F3
    C4 -.->|Augmented by| F4
    C5 -.->|Brightened to| F5
    C6 -.->|Shifted to| F6
```

#### Detailed Token Mapping

| Token Name | Current Value in Code | Future Approved Value | Status & Transition Strategy |
|---|---|---|---|
| Canvas Background | `--bg-canvas: #090a0d` | Deep Black: `#080B12` | Transition from flat dark gray-black to deep, cold cinematic space black. |
| Surface Background | `--bg-surface: #0e1117` | Midnight Navy: `#0C1424` | Transition from neutral charcoal to rich midnight navy with blue undertones. |
| Elevated Surface | `--bg-surface-elevated: #141821` | Dark Navy Elevated: `#111C33` | Provide higher contrast layer depth for cards and modals. |
| Active Surface | `--bg-surface-active: #1a202c` | Navy Highlight: `#1A2844` | Interactive active/hover state background. |
| Subtle Border | `rgba(255, 255, 255, 0.08)` | `rgba(56, 189, 248, 0.12)` | Upgrade from generic white alpha to luminous cyan/blue alpha. |
| Strong Border | `rgba(255, 255, 255, 0.15)` | `rgba(37, 99, 235, 0.35)` | Accent border for highlighted technical cards. |
| Primary Accent | `--accent-blue: #3b82f6` | Electric Blue: `#2563EB` | Shift from standard Tailwind blue to high-intensity electric royal blue. |
| Secondary Accent | *Not Present* | Neon Cyan: `#38BDF8` | Introduce high-tech neon cyan for laser highlights, glowing dots, and visual physics. |
| Primary Text | `--text-primary: #f4f4f7` | Crisp White: `#F8FAFC` | Keep high-contrast readable white text. |
| Secondary Text | `--text-secondary: #9ca3af` | Secondary Slate: `#94A3B8` | Slightly cooler slate gray for readability. |
| Tertiary Text | `--text-tertiary: #6b7280` | Muted Navy Gray: `#64748B` | Subtle technical metadata and timestamps. |

### Typography System

The existing project loads three Google Fonts via `next/font/google` in [`src/app/layout.tsx`](file:///d:/My_Projects/portfolio/src/app/layout.tsx#L5-L22):

1. **Newsreader** (`--font-newsreader`):
   - Type: Variable Editorial Serif (`normal`, `italic`)
   - Applied via: `.font-serif-heading`
   - Usage: H1 headline, section H2s, project card titles, case study headings
   - Tone: "Editorial engineering journal"
   - Evaluation: Looks refined for editorial articles, but clashes slightly with the approved **"Cinematic, High-Tech, Digital Engineering"** creative direction. For the redesign, a sharp, modern sans-serif display font (e.g., `Syne`, `Cabinet Grotesk`, `Space Grotesk`, or `Inter Tight`) or a technical modern display serif would feel significantly more cinematic. `[OBSERVED]`
2. **Inter** (`--font-inter`):
   - Type: Sans-Serif Body
   - Applied via: Default `body` font and `.font-sans-body`
   - Usage: General paragraphs, descriptions, navigation, UI elements
   - Evaluation: Outstanding readability and neutral clarity. Retain for all body copy. `[VERIFIED]`
3. **JetBrains Mono** (`--font-mono`):
   - Type: Monospaced
   - Applied via: `.font-mono-code`
   - Usage: Section tags (`// 01. WORK`), step badges (`STEP 01`), tech pills, dates, and CV metrics
   - Evaluation: Excellent engineering aesthetic. Retain for all technical labels and code. `[VERIFIED]`

### Spacing, Radii, and Layout Geometry
- **Container Max-Width:** `max-w-6xl` (72rem / 1152px) centered with `mx-auto px-4 sm:px-6`.
- **Vertical Section Spacing:** `py-20 sm:py-28` (80px - 112px padding).
- **Border Radii:**
  - Small pills & badges: `rounded` (4px) or `rounded-md` (6px).
  - Navigation bar pill: `rounded-full` (9999px).
  - Project & perspective cards: `rounded-xl` (12px) and `rounded-lg` (8px).
- **Shadows & Gradients:**
  - Header shadow: `shadow-lg shadow-black/20`.
  - Accent gradients: `bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600/20` (subtle 1px line above flagship project card).
  - Engineering grid backgrounds: Custom CSS linear gradients creating 40px and 20px grid boxes at 3.5% white opacity.
- **Breakpoints:** Uses standard Tailwind breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).

---

## 6. Existing Projects Inventory

A complete technical inventory was compiled by cross-referencing [`src/content/siteContent.ts`](file:///d:/My_Projects/portfolio/src/content/siteContent.ts), [`src/content/ecommerceCaseStudy.ts`](file:///d:/My_Projects/portfolio/src/content/ecommerceCaseStudy.ts), the verified text and hyperlink annotations of [`public/Mohamed_Elbeek_CV.pdf`](file:///d:/My_Projects/portfolio/public/Mohamed_Elbeek_CV.pdf), and the live website.

### Project 1: E-Commerce Platform (Flagship)

| Property | Details | Verification Status |
|---|---|---|
| **Project Name** | E-Commerce Platform | `[VERIFIED]` |
| **Project Tagline / Label** | Full-Stack Web Application · Personal Project | `[VERIFIED]` |
| **Weight in Portfolio** | Primary / Flagship | `[VERIFIED]` |
| **Short Description** | A backend-focused e-commerce system built around secure authentication, transactional checkout, inventory consistency, reliable payment processing, and maintainable architecture. | `[VERIFIED]` |
| **Problem Solved** | Preventing overselling in concurrent e-commerce checkouts, implementing secure JWT session management with refresh token rotation, and ensuring duplicate-safe Stripe payment handling with webhook idempotency. | `[VERIFIED]` |
| **Target Users** | Online retail shoppers, store administrators, and engineering recruiters reviewing backend architectural patterns. | `[INFERRED]` |
| **Core Features** | Product & category browsing, shopping cart, transactional checkout, admin dashboard, user authentication, role-based authorization, payment processing, automated CI/CD. | `[VERIFIED]` |
| **Frontend Technologies** | Angular, TypeScript, HTML5, CSS3 | `[VERIFIED]` |
| **Backend Technologies** | NestJS, TypeScript, Node.js, Express underlying runtime, REST APIs | `[VERIFIED]` |
| **Database & ORM** | PostgreSQL, Prisma ORM (relational schemas, versioned migrations) | `[VERIFIED]` |
| **Architecture Pattern** | Clean Architecture (Controllers → Services → Repository Interfaces → Prisma Implementations), Dependency Inversion | `[VERIFIED]` |
| **Authentication & Security** | JWT access tokens, refresh token rotation with SHA-256 hashing, Role-Based Access Control (RBAC), Google OAuth sign-in, email verification, single-use expiring password reset tokens, rate limiting. | `[VERIFIED]` |
| **Integrations** | Stripe (PaymentIntents API, idempotency keys, signature-verified webhooks), Nodemailer. | `[VERIFIED]` |
| **DevOps & Testing** | Docker, Docker Compose, GitHub Actions CI (lint, tests, build, containerization), Jest & Supertest integration tests against PostgreSQL. | `[VERIFIED]` |
| **Backend Repository** | [https://github.com/mohamedelbeek55/ecommerce-api-nestjs](https://github.com/mohamedelbeek55/ecommerce-api-nestjs) | `[VERIFIED]` |
| **Frontend Repository** | *Not explicitly linked in website* (supported by live deployment) | `[NOT FOUND]` |
| **Live Web App Demo** | [https://ecommerce-frontend-nqbt.vercel.app/](https://ecommerce-frontend-nqbt.vercel.app/) | `[VERIFIED]` |
| **Swagger API Docs** | [https://ecommerce-api-nestjs-production-f953.up.railway.app/api/docs](https://ecommerce-api-nestjs-production-f953.up.railway.app/api/docs) | `[VERIFIED]` |
| **Hosting Infrastructure** | Railway (NestJS backend API + PostgreSQL database), Vercel (Angular frontend). | `[VERIFIED]` |
| **Current Status** | Deployed, Active, Connected End-to-End | `[VERIFIED]` |
| **Case Study Availability** | Full technical write-up available at `/projects/ecommerce` | `[VERIFIED]` |
| **Visual Assets (Screenshots)** | **None found in codebase** ([`public/projects/`](file:///d:/My_Projects/portfolio/public/projects/) is empty except for a README note). | `[NOT FOUND]` |
| **Missing Information** | (1) Frontend GitHub repository link, (2) Real UI screenshots and architecture diagram PNG/SVG, (3) Resolution of the 6 `[TODO]` editorial prompts. | `[NEEDS USER INPUT]` |

---

### Project 2: LexaGuide Backend (Graduation Team Project)

| Property | Details | Verification Status |
|---|---|---|
| **Project Name** | LexaGuide | `[VERIFIED]` |
| **Project Tagline / Label** | Legal Assistance Platform · Graduation Team Project (Awarded A+) | `[VERIFIED]` |
| **Weight in Portfolio** | Medium Weight | `[VERIFIED]` |
| **Role Attribution** | Backend Developer — Graduation Team Project | `[VERIFIED]` |
| **Short Description** | Legal assistance platform with a backend API covering authentication, lawyers, consultations, legal templates, document generation, notifications, chatbot sessions, and file handling. | `[VERIFIED]` |
| **Problem Solved** | Centralizing and automating citizen access to verified legal consultations, template document generation, lawyer discovery, and scheduled consultation sessions. | `[VERIFIED]` |
| **Target Users** | Citizens seeking legal assistance, licensed lawyers managing consultations, and platform admins. | `[VERIFIED]` |
| **Core Features** | 48+ REST endpoints across 9 distinct modules; consultation lifecycle management (pending → accepted → completed); in-app real-time chat API; legal document generation; Cloudinary file uploads; admin dashboard. | `[VERIFIED]` |
| **Frontend Technologies** | React / Next.js (supporting frontend repository) | `[INFERRED]` |
| **Backend Technologies** | Node.js, Express.js, REST APIs, Zod input validation | `[VERIFIED]` |
| **Database & ORM** | MongoDB, Mongoose ODM | `[VERIFIED]` |
| **Architecture Pattern** | Modular Controller-Service-Model architecture with Zod schema validation layers. | `[VERIFIED]` |
| **Authentication & Security** | Role-based JWT auth (User / Lawyer / Admin), access and refresh token rotation, active session revocation, Google OAuth sign-in, OTP-based email verification and password reset. | `[VERIFIED]` |
| **Integrations** | Cloudinary (document and avatar media hosting), Nodemailer (OTP email dispatch). | `[VERIFIED]` |
| **Backend Repository** | [https://github.com/mohamedelbeek55/Graduation-Backend2](https://github.com/mohamedelbeek55/Graduation-Backend2) | `[VERIFIED]` |
| **Frontend Repository** | [https://github.com/mohamedelbeek55/lexaguide-frontend](https://github.com/mohamedelbeek55/lexaguide-frontend) | `[VERIFIED]` |
| **Live Web App Demo** | [https://lexaguide-frontend.vercel.app/](https://lexaguide-frontend.vercel.app/) | `[VERIFIED]` |
| **API Documentation** | *Not linked on website* | `[NOT FOUND]` |
| **Hosting Infrastructure** | Vercel (serverless deployment for frontend and API). | `[VERIFIED]` |
| **Current Status** | Completed (Graduation June 2026, Grade: A+) | `[VERIFIED]` |
| **Case Study Availability** | No dedicated case study page exists on current website. | `[NOT FOUND]` |
| **Visual Assets (Screenshots)** | None found. | `[NOT FOUND]` |
| **Missing Information** | (1) Swagger/Postman API documentation URL (if available), (2) Database schema diagram, (3) Dedicated case study write-up, (4) UI screenshots. | `[NEEDS USER INPUT]` |

---

### Project 3: Tech E-Commerce Web Application (Earlier Work)

| Property | Details | Verification Status |
|---|---|---|
| **Project Name** | Tech E-Commerce Web Application | `[VERIFIED]` |
| **Project Tagline / Label** | Earlier Work · Academic Coursework Project | `[VERIFIED]` |
| **Weight in Portfolio** | Compact Row (Minimal prominence) | `[VERIFIED]` |
| **Short Description** | A database-backed web application for technology products with CRUD functionality, SQL Server integration, and authentication. | `[VERIFIED]` |
| **Problem Solved** | Foundational full-stack e-commerce catalog management and database transactions using Microsoft technology stack. | `[INFERRED]` |
| **Target Users** | Academic evaluation / coursework demonstration. | `[INFERRED]` |
| **Core Features** | Product CRUD operations, customer authentication, SQL Server relational queries. | `[VERIFIED]` |
| **Frontend Technologies** | Razor Views / HTML5 / CSS3 | `[INFERRED]` |
| **Backend Technologies** | ASP.NET MVC, C# (.NET) | `[VERIFIED]` |
| **Database & ORM** | Microsoft SQL Server, Entity Framework / ADO.NET | `[VERIFIED]` |
| **Architecture Pattern** | Traditional MVC (Model-View-Controller) | `[VERIFIED]` |
| **Authentication & Security** | ASP.NET Membership / Identity cookie authentication. | `[INFERRED]` |
| **Repositories & Demos** | **None linked** in `siteContent.ts` (`links: []`). | `[NOT FOUND]` |
| **Current Status** | Archived / Historic academic work | `[OBSERVED]` |
| **Case Study Availability** | None | `[NOT FOUND]` |
| **Visual Assets** | None | `[NOT FOUND]` |
| **Recommendation for Redesign** | Consider keeping this in an "Archived / Earlier Works" accordion or replacing it with modern backend projects to maintain a high-signal production image. | `[INFERRED]` |

---

### Project 4: Minimal Be Creative — Client Website (Discovered in CV & Absent from Site)

| Property | Details | Verification Status |
|---|---|---|
| **Project Name** | Minimal Be Creative — Client Website | `[VERIFIED from CV]` |
| **Project Status in Codebase** | **Completely absent from `siteContent.ts`**; discovered exclusively inside [`public/Mohamed_Elbeek_CV.pdf`](file:///d:/My_Projects/portfolio/public/Mohamed_Elbeek_CV.pdf) text and PDF link annotations. | `[VERIFIED]` |
| **Technologies** | HTML5, CSS3, JavaScript (ES6), Swiper, AOS (Animate on Scroll) | `[VERIFIED from CV]` |
| **Live Demo URL** | [https://minimal1.vercel.app/](https://minimal1.vercel.app/) | `[VERIFIED from CV Annotations]` |
| **GitHub Repository** | *Not listed in CV* | `[NOT FOUND]` |
| **Description** | Production client marketing website featuring responsive design, interactive sliders (Swiper), and scroll animations (AOS). | `[INFERRED]` |
| **Strategic Assessment** | This represents proof of client delivery and commercial frontend execution. It should be evaluated whether to include it in the redesigned portfolio under a "Client / Commercial Projects" category or omit it to maintain a 100% backend focus. | `[NEEDS USER INPUT]` |

---

## 7. Future Project Architecture Recommendation

### Current Project Presentation Architecture: Analysis

1. **Where are project details currently stored?**  
   Partially in [`src/content/siteContent.ts`](file:///d:/My_Projects/portfolio/src/content/siteContent.ts) (`projectsSection.projects` array) and partially in [`src/content/ecommerceCaseStudy.ts`](file:///d:/My_Projects/portfolio/src/content/ecommerceCaseStudy.ts).
2. **Are projects hardcoded inside UI components?**  
   **Yes.** While the text is pulled from `siteContent.ts`, the rendering component [`src/components/sections/SelectedWork.tsx`](file:///d:/My_Projects/portfolio/src/components/sections/SelectedWork.tsx) explicitly assigns variables:
   ```tsx
   const project1 = projects[0];
   const project2 = projects[1];
   const project3 = projects[2];
   ```
   Each project has completely custom, separate JSX layout blocks. Adding a 4th project requires modifying the React component.
3. **Is there a central projects data file?**  
   No single unified file. Project list metadata is in `siteContent.ts`, while in-depth case study data is in a separate file only for Project 1.
4. **Is the current design reusable?**  
   **No.** There is no reusable `<ProjectCard />` or `<CaseStudyLayout />`.
5. **Can projects be added without duplicating components?**  
   **No.** Adding a new project currently requires editing both the data file and the component JSX, and creating a new hardcoded page directory (`src/app/projects/<name>/page.tsx`).
6. **Are project details and case studies separated from presentation logic?**  
   Partially for copy, but completely tightly coupled for page layout and routing.
7. **How are project images handled?**  
   There is currently zero image handling logic. No `<Image />` component from `next/image` is imported anywhere in the project.
8. **How are GitHub and live-demo links managed?**  
   Through a generic `ProjectLink` array (`{ label, url, isPrimary, isExternal }`), which is flexible but lacks typed link semantics (e.g., differentiating between backend vs. frontend repositories, or Swagger docs vs. live web app).
9. **Can a project have multiple screenshots?**  
   Not in the current data schema.
10. **Can a project have a detailed case study?**  
   Only if a dedicated React page component is manually coded, as done for `/projects/ecommerce`.

---

### Recommended Future Project Architecture

To achieve the user's preferred goal — **"Adding a new project should be as simple as creating a new project entry in a centralized data structure, rather than rebuilding the page layout"** — the following architecture is recommended:

```mermaid
flowchart TD
    subgraph Data Layer
        A["src/data/projects/<br/>project-slug.ts or .json"] --> B["src/data/projects/index.ts<br/>getAllProjects(), getProjectBySlug()"]
    end
    subgraph Core App Router
        B --> C["src/app/page.tsx<br/>Home Page (Featured Cards)"]
        B --> D["src/app/projects/page.tsx<br/>All Projects Grid / Archive"]
        B --> E["src/app/projects/[slug]/page.tsx<br/>Dynamic Polymorphic Case Study"]
    end
    subgraph Presentation Components
        C --> F["ProjectCard.tsx<br/>(Visual 3D / Hover Tilt)"]
        E --> G["CaseStudyLayout.tsx<br/>(Sticky TOC, Metrics, Code, Gallery)"]
    end
```

#### Recommended Unified Project Schema (`src/types/project.ts`)

```typescript
export type ProjectCategory = 
  | "backend-system" 
  | "full-stack" 
  | "microservice" 
  | "client-work" 
  | "academic";

export type ProjectStatus = "production" | "completed" | "in-progress" | "archived";

export interface ProjectRepository {
  type: "backend" | "frontend" | "monorepo" | "mobile";
  label: string;
  url: string;
  isPrivate?: boolean;
}

export interface ProjectDeployment {
  type: "production-app" | "staging" | "api-docs" | "storybook";
  label: string;
  url: string;
}

export interface ArchitectureLayerItem {
  order: number;
  name: string;
  role: string;
  technologies: string[];
  codeSampleSnippet?: string;
}

export interface MetricHighlight {
  label: string;
  value: string;
  detail?: string;
}

export interface ProjectScreenshot {
  url: string;
  caption: string;
  type: "ui-desktop" | "ui-mobile" | "architecture-diagram" | "benchmark" | "terminal";
  aspectRatio?: "16/9" | "4/3" | "9/16";
}

export interface ProjectItem {
  // Required Core Fields
  id: string;                                // Unique identifier (e.g., 'ecommerce-platform')
  slug: string;                            // URL path segment (e.g., 'ecommerce-platform')
  title: string;                           // Display title
  tagline: string;                         // One-sentence impact punchline
  description: string;                     // 2-3 sentence overview
  category: ProjectCategory;               // Categorization for filter tabs
  status: ProjectStatus;                   // Lifecycle state
  featured: boolean;                       // Should appear on Home Page Selected Work
  featuredOrder: number;                   // Display sequence on Home Page
  role: string;                            // Developer role & responsibility attribution
  timeline: string;                        // e.g., '2025 - 2026' or 'Graduation Project'

  // Technology Taxonomy (Required)
  techStack: string[];                     // Flat array for quick filter badges
  primaryStack: {
    backend: string[];                     // e.g., ['NestJS', 'TypeScript', 'Node.js']
    database: string[];                    // e.g., ['PostgreSQL', 'Prisma']
    frontend?: string[];                   // e.g., ['Angular'] (Optional for pure APIs)
    devops: string[];                      // e.g., ['Docker', 'GitHub Actions', 'Railway']
    integrations: string[];                // e.g., ['Stripe', 'Google OAuth']
  };

  // Links & Infrastructure (Required)
  repositories: ProjectRepository[];       // Supports multiple repos (Backend + Frontend)
  deployments: ProjectDeployment[];        // Supports multiple links (Live App + Swagger Docs)

  // Visual Assets
  coverImage?: string;                     // Primary card thumbnail preview
  bannerImage?: string;                    // Hero banner for case study
  screenshots?: ProjectScreenshot[];       // Gallery images with captions

  // Engineering Highlights
  keyFeatures: string[];                   // Concrete capabilities of the software
  engineeringHighlights: string[];         // Backend-focused achievements (e.g., 'SHA-256 tokens')
  metrics?: MetricHighlight[];             // Quantitative proof (e.g., '48+ Endpoints', '100% CI pass')

  // In-Depth Case Study (Optional — present only if project has full write-up)
  caseStudy?: {
    summary: string;
    problemStatement: string;
    architectureOverview: string;
    architectureLayers: ArchitectureLayerItem[];
    concurrencyAndIntegrity?: {
      challenge: string;
      solution: string;
      verificationApproach: string;
    };
    securityMechanisms?: string[];
    testingAndCiStrategy: string;
    lessonsLearned: string[];
    futureRoadmap: string[];
  };
}
```

---

## 8. Personal Brand and Profile Inventory

| Personal Data Item | Value in Existing Project | Storage Location | Displayed on Site? | Verification Status | Recommended Action |
|---|---|---|---|---|---|
| **Full Name** | Mohamed Elbeek | `siteContent.meta.name` | Yes (Header, Hero, Footer, Title) | `[VERIFIED]` | Retain as primary developer brand name. |
| **Legal Name** | Mohamed Mahmoud Mohamed Elbeek | `siteContent.meta.legalName`, `layout.tsx` | In Schema.org JSON-LD & CV | `[VERIFIED]` | Retain in CV and metadata; keep display name "Mohamed Elbeek". |
| **Professional Title** | Backend Developer | `siteContent.meta.title` | Yes (All sections) | `[VERIFIED]` | **Update to Approved Positioning:** "Full-Stack Developer \| Backend-Focused Engineer". |
| **Hero Headline** | *"I build APIs with Node.js and NestJS, with a focus on authentication, payments, and data consistency."* | `siteContent.hero.headline` | Yes (Hero H1) | `[VERIFIED]` | Elevate to the approved creative concept: **"FROM PIXELS TO PRODUCTION."** |
| **Location** | Cairo, Egypt | `siteContent.meta.location` | Yes (Hero badge, About, Footer) | `[VERIFIED]` | Retain. |
| **Email Address** | `mohamed.elbeek88@gmail.com` | `siteContent.meta.email`, `siteContent.contact.email` | Yes (Hero, Contact, Footer) | `[VERIFIED]` | Retain; verified in CV. |
| **Phone / WhatsApp** | `+20 127 175 9984` | `siteContent.meta.whatsappNumber`, `siteContent.contact.whatsappDisplay` | Yes (Contact action buttons) | `[VERIFIED]` | Retain; verified in CV. |
| **WhatsApp Direct URL**| `https://wa.me/201271759984` | `siteContent.meta.whatsappUrl` | Yes (Navbar, Contact, Footer) | `[VERIFIED]` | Retain. |
| **GitHub Profile** | `https://github.com/mohamedelbeek55` | `siteContent.meta.githubUrl` | Yes (All sections) | `[VERIFIED]` | Retain. |
| **LinkedIn Profile** | `https://www.linkedin.com/in/mohamed-elbeek-9b81a230b/` | `siteContent.meta.linkedinUrl` | Yes (All sections) | `[VERIFIED]` | Retain. |
| **Degree & Major** | B.Sc. in Information Technology | `siteContent.about.education.degree` | Yes (About section) | `[VERIFIED]` | Verified in CV. |
| **University** | Sinai University | `siteContent.about.education.university` | Yes (About section) | `[VERIFIED]` | Verified in CV. |
| **Graduation Date** | June 2026 | `siteContent.about.education.gradDate` | Yes (About section) | `[VERIFIED]` | Verified in CV. |
| **GPA** | `3.09 / 4.0 (Very Good)` | `siteContent.about.education.gpa` | Yes (About section & mobile drawer) | `[VERIFIED]` | Verified in CV. |
| **Curriculum Vitae (PDF)**| [`public/Mohamed_Elbeek_CV.pdf`](file:///d:/My_Projects/portfolio/public/Mohamed_Elbeek_CV.pdf) | Served from `/Mohamed_Elbeek_CV.pdf` | Yes (Hero, Nav, About, Contact) | `[VERIFIED]` | File exists (299 KB). User should confirm if an updated revision exists. |
| **Profile Photo** | *None* | *Not present* | No | `[NOT FOUND]` | Determine if Mohamed wants an avatar/portrait or an abstract 3D engineering monogram. |
| **Certifications / Courses**| ITI Advanced Front-End (Angular, 1 month); Backend Node.js training | Present in CV only | **Not on website** | `[VERIFIED from CV]` | Add to Technical Background / Certifications section. |
| **Language Proficiencies**| Arabic (Native), English (Good) | `siteContent.about` | Yes (About facts box) | `[VERIFIED]` | Retain. |

---

## 9. Assets and Visual Resources

### Public Directory Inventory

| Asset Path | File Format | File Size | Origin / Purpose | Current Status | Reusability in Redesign |
|---|---|---|---|---|---|
| [`public/Mohamed_Elbeek_CV.pdf`](file:///d:/My_Projects/portfolio/public/Mohamed_Elbeek_CV.pdf) | PDF document | 299,487 bytes | Official resume served for direct download | **CURRENT & VALID** | **REUSABLE**. Verify if user has a newer version. |
| [`src/app/favicon.ico`](file:///d:/My_Projects/portfolio/src/app/favicon.ico) | ICO | 15,086 bytes | Browser tab icon | Functional | **REPLACE** with high-resolution dark/cyan brand icon. |
| [`src/app/icon.svg`](file:///d:/My_Projects/portfolio/src/app/icon.svg) | SVG vector | 498 bytes | Modern browser favicon | Custom SVG (terminal dot + chevron) | **REPLACE** with new cinematic monogram. |
| [`src/app/opengraph-image.tsx`](file:///d:/My_Projects/portfolio/src/app/opengraph-image.tsx) | TSX (dynamic) | 3,949 bytes | Dynamic 1200x630 social preview image | Generates clean dark card | **REDESIGN** with approved palette (#080B12 / #38BDF8). |
| [`public/projects/README.md`](file:///d:/My_Projects/portfolio/public/projects/README.md) | Markdown | 122 bytes | Directory placeholder | Empty directory | Replace with real project visual assets. |
| [`public/file.svg`](file:///d:/My_Projects/portfolio/public/file.svg) | SVG | 391 bytes | Default Next.js starter template file | **UNUSED** | **DELETE / REMOVE** in future cleanup. |
| [`public/globe.svg`](file:///d:/My_Projects/portfolio/public/globe.svg) | SVG | 1,035 bytes | Default Next.js starter template file | **UNUSED** | **DELETE / REMOVE** in future cleanup. |
| [`public/next.svg`](file:///d:/My_Projects/portfolio/public/next.svg) | SVG | 1,375 bytes | Default Next.js starter template file | **UNUSED** | **DELETE / REMOVE** in future cleanup. |
| [`public/vercel.svg`](file:///d:/My_Projects/portfolio/public/vercel.svg) | SVG | 128 bytes | Default Next.js starter template file | **UNUSED** | **DELETE / REMOVE** in future cleanup. |
| [`public/window.svg`](file:///d:/My_Projects/portfolio/public/window.svg) | SVG | 385 bytes | Default Next.js starter template file | **UNUSED** | **DELETE / REMOVE** in future cleanup. |

### Visual Asset Deficiencies Identified
1. **Zero Project Screenshots:** There is not a single real screenshot, mock-up, or photo of the E-Commerce Platform or LexaGuide in the repository.
2. **Zero Architecture Diagrams:** The architecture flow is currently rendered using CSS `<div>` borders; there are no standalone vector diagrams (SVG) or exported schematics.
3. **No Developer Portrait:** No headshot or personal photo is available in the project.
4. **No Custom Tech Logos:** Technologies are displayed as text pills rather than official brand SVGs.

---

## 10. Animation and Interaction Audit

### Current Animation Inventory

| Library / Technique | Source Files | Usage | Current Quality | Reusability |
|---|---|---|---|---|
| **Framer Motion (`framer-motion`)** | [`src/components/ui/SectionReveal.tsx`](file:///d:/My_Projects/portfolio/src/components/ui/SectionReveal.tsx) | Fade-up scroll reveal (`opacity: 0, y: 18 -> opacity: 1, y: 0`) | High reliability; respects `prefers-reduced-motion` | **REUSABLE** for UI component transitions. |
| **Framer Motion (`framer-motion`)** | [`src/components/hero/HeroVisual.tsx`](file:///d:/My_Projects/portfolio/src/components/hero/HeroVisual.tsx) | Looping border color pulse (`[rgba(255,255,255,0.08), rgba(59,130,246,0.4)]`) | Simple; calm loop | Replace with WebGL shader or GSAP timeline. |
| **CSS Transitions & Hover** | Across all components | Background color transitions (`transition-colors duration-200`) | Clean, standard | Reusable. |
| **JavaScript Timers (`setInterval`)** | [`src/components/sections/HowIBuild.tsx`](file:///d:/My_Projects/portfolio/src/components/sections/HowIBuild.tsx#L18-L22) | Cycles active stage index every 2200ms | Functional, but passive | Replace with scroll-driven scrubbing. |
| **Native CSS Smooth Scroll** | `html { scroll-behavior: smooth; }` | Internal anchor link navigation (`#work`, `#contact`) | Native browser scroll | Lacks inertial dampening or momentum. |

### Technical Feasibility for Planned Animation Stack

The future creative direction specifies: **GSAP, ScrollTrigger, Motion for React, Lenis, and OGL / WebGL**.

```mermaid
graph TD
    subgraph Browser Window
        L["Lenis Smooth Scroll<br/>(Virtual inertia, physics dampening)"]
        L --> ST["GSAP ScrollTrigger<br/>(Scrubbing, pinning, parallax)"]
        ST --> C["Canvas WebGL (OGL / Three.js)<br/>(3D Engineering Core, shaders)"]
        ST --> M["Motion for React<br/>(DOM Layout & Spring Transitions)"]
    end
```

#### Feasibility & Compatibility Matrix

1. **Lenis (`@studio-freight/lenis` or `lenis`):**
   - *Feasibility:* **EXCELLENT**. Replaces the browser's native `scroll-behavior: smooth` with physics-based smooth momentum. Essential for a "cinematic" feel.
   - *Conflict Risk:* Low. Must ensure fixed headers and modal scroll locks use `lenis.stop()` / `lenis.start()`.
2. **GSAP + ScrollTrigger (`gsap`):**
   - *Feasibility:* **EXCELLENT**. Industry standard for pinned architectural breakdowns, sequence scrubbing, and multi-stage reveals.
   - *Conflict Risk:* Next.js App Router SSR requires `useGSAP` hook or dynamic client-side imports (`typeof window !== 'undefined'`) to avoid hydration mismatches.
3. **Motion for React (`motion` / `framer-motion`):**
   - *Feasibility:* Already installed (`framer-motion 14.0.0`).
   - *Evaluation:* Retain for UI component enter/exit animations, hover tooltips, and dialog modals. Use GSAP for complex timelines and scroll pinning to prevent library overlap.
4. **OGL / Three.js (`ogl` or `three`):**
   - *Feasibility:* **HIGH IMPACT**. OGL is lightweight (~30 KB vs ~150 KB for Three.js), ideal for custom GLSL shaders, particle grids, and interactive 3D nodes without ballooning the bundle size.
   - *Performance Risk:* Must ensure WebGL contexts are disposed on page navigation and disabled on low-power devices.

---

## 11. Performance, SEO and Accessibility Audit

### Measured Performance & Bundle Metrics

| Route | Type | Compilation Time | Chunks / Assets | Assessment |
|---|---|---|---|---|
| `/` (Home) | Static Prerender (`○`) | 804ms - 3.3s | 11 chunks (~250 KB gzip total JS) | **Extremely Fast**. Zero blocking server fetches. |
| `/projects/ecommerce` | Static Prerender (`○`) | Included in build | Shared static chunks | **Fast**. Instant client navigation. |
| `/_not-found` | Static Prerender (`○`) | Built-in | Default 404 handler | Standard. |
| `/sitemap.xml` | Dynamic (`ƒ`) | Generated on request | Standalone XML stream | Valid dynamic sitemap. |
| `/robots.txt` | Static Prerender (`○`) | Built-in | Standalone text file | Valid robots directives. |
| `/opengraph-image` | Static Prerender (`○`) | Edge Image Engine | Dynamic SVG/PNG buffer | Pre-generated. |

#### Top Client-Side JavaScript Chunks (Measurable in `.next/static/chunks`)
1. Core vendor chunk: `229.8 KB` (React 19 runtime, Framer Motion core, Next.js client runtime).
2. Turbopack engine chunk: `168.6 KB`.
3. Framework chunk: `144.4 KB`.
4. App chunks: `112.5 KB`.
5. Global CSS: `49.2 KB` uncompressed.

### SEO Verification

- **Meta Title:** `Mohamed Elbeek — Backend Developer` `[VERIFIED]`
- **Title Template:** `%s | Mohamed Elbeek` `[VERIFIED]`
- **Meta Description:** *"Backend Developer specializing in Node.js, NestJS, TypeScript, PostgreSQL, and production-oriented API development."* `[VERIFIED]`
- **Open Graph Metadata:** Complete Open Graph protocol tags (`og:title`, `og:description`, `og:url`, `og:siteName`, `og:locale`, `og:type`) in [`src/app/layout.tsx`](file:///d:/My_Projects/portfolio/src/app/layout.tsx#L50-L57). `[VERIFIED]`
- **Twitter Card:** `summary_large_image` with creator tag `@mohamedelbeek`. `[VERIFIED]`
- **Dynamic Social Preview:** Implemented via Next.js Edge Image generator [`src/app/opengraph-image.tsx`](file:///d:/My_Projects/portfolio/src/app/opengraph-image.tsx) (1200x630 PNG). `[VERIFIED]`
- **Structured Data (Schema.org):** Rich `Person` schema JSON-LD injected in `<head>` containing legal name, alumni of Sinai University, skills array, and social profiles. `[VERIFIED]`
- **Robots & Sitemap:** Fully configured via [`src/app/robots.ts`](file:///d:/My_Projects/portfolio/src/app/robots.ts) and [`src/app/sitemap.ts`](file:///d:/My_Projects/portfolio/src/app/sitemap.ts). `[VERIFIED]`
- **SEO Limitation:** The canonical base URL is hardcoded as `https://mohamedelbeek.com` in code, while the current live deployment is hosted on `https://portfolio-alpha-liard-14.vercel.app/`. `[OBSERVED]`

### Accessibility (a11y) Verification

- **Skip Navigation Link:** Implemented in [`src/app/layout.tsx`](file:///d:/My_Projects/portfolio/src/app/layout.tsx#L129-L134) (`<a href="#main-content" className="sr-only focus:not-sr-only...">Skip to main content</a>`). `[VERIFIED]`
- **Heading Hierarchy:** Strictly adheres to one `<h1>` per page ([`src/components/sections/Hero.tsx`](file:///d:/My_Projects/portfolio/src/components/sections/Hero.tsx#L30) on home, [`src/components/case-study/EcommerceCaseStudyView.tsx`](file:///d:/My_Projects/portfolio/src/components/case-study/EcommerceCaseStudyView.tsx#L162) on case study), followed by logical `<h2>` and `<h3>` tags. `[VERIFIED]`
- **Focus Indicators:** Accessible focus rings defined globally:
  ```css
  :focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 3px;
  }
  ```
  `[VERIFIED]`
- **Reduced Motion Support:** Explicitly implemented in both CSS (`globals.css` `@media (prefers-reduced-motion: reduce)`) and JavaScript using Framer Motion's `useReducedMotion()` hook. `[VERIFIED]`
- **Interactive Touch Targets:** All interactive links and buttons have an explicit `min-h-[44px]` class meeting WCAG 2.1 AAA touch target guidelines. `[VERIFIED]`
- **Color Contrast:** White and light slate text on `#090a0d` canvas exceeds 12:1 contrast ratio (exceeds WCAG AAA requirements). Muted text `#6b7280` meets 4.5:1 AA for large text. `[VERIFIED]`

---

## 12. Responsive Design Audit

The responsive implementation was audited across viewport resolutions using local code analysis and direct live browser webview inspection:

| Viewport Profile | Width / Resolution | Visual Layout Result | Component Behavior | Issues / Observations | Status |
|---|---|---|---|---|---|
| **Large Desktop** | 1440px × 900px | Clean, centered within `max-w-6xl` (1152px) | Full 5-column architecture flow, sticky TOC on case study | No horizontal overflow. Content beautifully centered. | `[VERIFIED]` |
| **Standard Laptop** | 1280px × 800px | Identical to large desktop | Navigation dock fits comfortably | No clipping or layout shifting. | `[VERIFIED]` |
| **Tablet** | 768px × 1024px | 2-column grids | Navigation collapses into mobile hamburger button; Architecture flow switches to 2x3 grid | Case study Table of Contents is hidden (`hidden lg:block`). | `[VERIFIED]` |
| **Mobile Standard** | 390px × 844px (iPhone) | 1-column vertical stack | Header shows brand + CV badge + hamburger; Blueprint collapses to vertical list with down-arrows | Excellent readability; 0 horizontal overflow (`scrollWidth` = 375.2px). | `[VERIFIED]` |
| **Small Mobile** | 360px × 640px (Android) | Compact vertical stack | Padding shrinks from `p-6` to `p-4`; tags wrap cleanly | No text clipping or overflowing elements. | `[VERIFIED]` |

### Detailed Responsive Findings

1. **Header & Navigation Adaptation:**
   - On screens `< 768px`, desktop navigation links (`nav`) are hidden.
   - A dedicated mobile drawer button (`aria-label="Open navigation menu"`) appears alongside a compact CV download badge.
   - Opening the drawer locks body scrolling (`document.body.style.overflow = "hidden"`) and displays full-screen vertical links with 44px touch targets.
   - Pressing `Escape` or clicking any link cleanly dismisses the drawer. `[VERIFIED]`
2. **Architecture Blueprint Adaptation:**
   - Desktop: Horizontal 5-column grid (`md:grid md:grid-cols-5`).
   - Mobile: Reorganized cleanly into a vertical card list linked by `ArrowDown` SVG icons. `[VERIFIED]`
3. **Selected Work Cards:**
   - Desktop: Multi-column meta bars with horizontal link clusters.
   - Mobile: Wraps cleanly into stacked vertical blocks; action buttons span full width or wrap naturally. `[VERIFIED]`
4. **Case Study Table of Contents Limitation:**
   - The sticky Table of Contents sidebar uses `hidden lg:block lg:col-span-3`. On viewports below 1024px (tablets and mobile), the TOC vanishes completely, leaving users with no index navigation for the 7 sections. `[OBSERVED]`

---

## 13. Build and Code Health

### Command Execution Audit Log

| Command | Working Directory | Result Code | Output Summary | Diagnostic Assessment | Status |
|---|---|---|---|---|---|
| `git status` | `D:\My_Projects\portfolio` | 0 | `nothing to commit, working tree clean` | Git state is clean and synchronized with remote. | `[VERIFIED]` |
| `git branch -a` | `D:\My_Projects\portfolio` | 0 | `* main` / `remotes/origin/main` | Single main branch workflow. | `[VERIFIED]` |
| `npm run lint` | `D:\My_Projects\portfolio` | 0 | `eslint src/` exited with 0 errors | ESLint 9 configuration validated with zero warnings. | `[VERIFIED]` |
| `npx tsc --noEmit`| `D:\My_Projects\portfolio` | 0 | Zero output, exit code 0 | TypeScript 5 strict type checking passed completely. | `[VERIFIED]` |
| `npm run build` | `D:\My_Projects\portfolio` | 0 *(after notice)* | Next.js 16.4.0 Turbopack compiled 8 static routes in 804ms | Production build succeeded with all routes prerendered. | `[VERIFIED]` |

### Technical Debt and Upstream Advisory Notice

1. **Next.js Upstream Security Advisory:**
   - During production compilation, Next.js emitted:
     ```
     Error [SecurityFatalError]: Your version of Next.js is affected by a known security vulnerability.
     We strongly recommend you upgrade Next.js.
     Reference: https://registry.npmjs.org/-/npm/v1/security/advisories/bulk
     ```
   - *Impact:* The command succeeded on retry, but indicates that Next.js `16.4.0` in `package.json` should be updated to a patched stable release during the redesign phase. `[VERIFIED]`
2. **Package-lock Path Warning:**
   - Turbopack warning: `Next.js ignored package-lock.json in D:\My_Projects because it is outside the current Git repository (D:\My_Projects\portfolio)`.
   - *Cause:* A parent directory contains a loose lockfile.
   - *Resolution:* Harmless for local development; can be silenced by configuring `turbopack.root: "."` in `next.config.ts`. `[OBSERVED]`
3. **Hardcoded Domain Mismatch:**
   - `metadataBase` in [`src/app/layout.tsx`](file:///d:/My_Projects/portfolio/src/app/layout.tsx#L30) points to `https://mohamedelbeek.com`, while the current live deployment is on `https://portfolio-alpha-liard-14.vercel.app/`. `[OBSERVED]`

---

## 14. Future Redesign Readiness

### Approved Creative Direction Alignment

- **Project Identity:** MOHAMED ELBEEK — DIGITAL ENGINEERING
- **Concept:** FROM PIXELS TO PRODUCTION.
- **Positioning:** Full-Stack Developer \| Backend-Focused Engineer.
- **Visual Style:** Cinematic, premium, interactive, technical.
- **Approved Palette:**
  - Deep Black: `#080B12`
  - Midnight Navy: `#0C1424`
  - Electric Blue: `#2563EB`
  - Neon Cyan: `#38BDF8`
  - Crisp White: `#F8FAFC`
  - Secondary Slate: `#94A3B8`
- **Animation Direction:** Extreme cinematic motion with performance-conscious execution (GSAP, ScrollTrigger, Lenis, OGL / WebGL).

### Component Disposition Matrix (Retain, Redesign, Replace, Remove)

| Component / Layer | Current File | Recommendation | Rationale |
|---|---|---|---|
| **Content Foundation** | `src/content/siteContent.ts` | **RETAIN & EXPAND** | Factual data, copy, and skills taxonomy are accurate. Expand with new project schema. |
| **Case Study Copy** | `src/content/ecommerceCaseStudy.ts` | **RETAIN & MIGRATE** | Excellent technical write-up. Needs conversion into markdown/MDX or dynamic schema. |
| **Navbar Component** | `src/components/layout/Navbar.tsx` | **REDESIGN** | Rebuild into a floating cinematic glass dock with magnetic hover and soundless micro-interactions. |
| **Hero Section** | `src/components/sections/Hero.tsx` | **REDESIGN** | Rebuild with cinematic typography, particle depth, and interactive 3D visual canvas. |
| **Hero Blueprint** | `src/components/hero/HeroVisual.tsx` | **REPLACE** | Replace flat 2D box with an interactive 3D WebGL / OGL engineering visual core. |
| **Selected Work** | `src/components/sections/SelectedWork.tsx` | **REDESIGN & REFACTOR**| Replace hardcoded layout with dynamic `<ProjectCard />` components supporting 3D card tilt and media previews. |
| **Case Study View** | `EcommerceCaseStudyView.tsx` | **REPLACE** | Replace monolithic static view with a dynamic App Router template (`/projects/[slug]`). |
| **Behind Interface** | `BehindInterface.tsx` | **REDESIGN** | Elevate 8 cards into a technical interactive radar or glowing cybernetic HUD grid. |
| **How I Build** | `HowIBuild.tsx` | **REDESIGN** | Convert automated interval timer into a scroll-scrubbed interactive architecture pipeline. |
| **Technical Toolkit** | `TechnicalToolkit.tsx` | **REDESIGN** | Add official SVG tech brand icons, interactive relationship lines, and category filter tabs. |
| **About Section** | `About.tsx` | **REDESIGN** | Elevate layout into an authoritative digital engineering credentials dossier. |
| **Contact Section** | `Contact.tsx` | **RETAIN & REDESIGN** | Keep the verified copy-to-clipboard and WhatsApp logic; elevate visual styling to a dark terminal card. |
| **Framer Motion Reveals** | `SectionReveal.tsx` | **RETAIN & INTEGRATE** | Keep for lightweight UI view reveals; pair with GSAP ScrollTrigger for pinned scenes. |
| **Public Starter SVGs** | `public/*.svg` (`globe.svg`, etc.) | **REMOVE** | Unused Create Next App template artifacts. |

---

## 15. Recommended Implementation Strategy

When you transition to the implementation phase with your next assistant, execute the work in the following structured sequence to guarantee zero regressions:

```mermaid
flowchart TD
    P1["Phase 1: Architecture & Dependencies<br/>Upgrade Next.js, add GSAP/Lenis/OGL, define unified project schema"]
    P2["Phase 2: Design Tokens & Cinematic Canvas<br/>Inject #080B12, #0C1424, #38BDF8 palette, setup WebGL canvas & Lenis"]
    P3["Phase 3: Dynamic Project Engine<br/>Build /projects/[slug] dynamic route & reusable ProjectCard component"]
    P4["Phase 4: Hero & 3D Interactive Visual<br/>Build cinematic H1 'FROM PIXELS TO PRODUCTION' & 3D WebGL core"]
    P5["Phase 5: Section Modernization<br/>Elevate Behind Interface, How I Build, Toolkit, About & Contact"]
    P6["Phase 6: Verification & Production Polish<br/>60fps audit, responsive validation (360px-1440px), SEO & a11y sign-off"]

    P1 --> P2 --> P3 --> P4 --> P5 --> P6
```

### Stage 1: Dependency & Architectural Upgrades
- Upgrade Next.js to the latest secure patched release to resolve the upstream security notice.
- Install `@studio-freight/lenis` (or `lenis`) for inertial smooth scrolling.
- Install `gsap` and `@gsap/react` for ScrollTrigger timelines.
- Install `ogl` for lightweight WebGL shaders and 3D engineering visuals.
- Establish the unified `ProjectItem` TypeScript schema.

### Stage 2: Design System & Token Foundation
- Configure CSS variables in `globals.css` with the approved cinematic palette: Deep Black (`#080B12`), Midnight Navy (`#0C1424`), Electric Blue (`#2563EB`), Neon Cyan (`#38BDF8`).
- Configure Tailwind v4 `@theme` bindings for quick utility usage (`bg-deep-black`, `text-neon-cyan`, etc.).
- Set up ambient background grain and glowing radial light gradients.

### Stage 3: Dynamic Project Engine & Case Study Template
- Create `src/data/projects/` containing typed project entries for:
  1. E-Commerce Platform (Flagship)
  2. LexaGuide (Graduation Project)
  3. Tech E-Commerce (Earlier Work / Archived)
  4. Minimal Be Creative (Client Website - pending user confirmation)
  5. Any new upcoming projects Mohamed provides.
- Implement the dynamic route `src/app/projects/[slug]/page.tsx` with static parameter generation (`generateStaticParams`).
- Build a responsive case study layout engine with mobile-friendly Table of Contents and code blocks.

### Stage 4: Cinematic Hero & 3D Engineering Visual
- Implement the approved concept: **MOHAMED ELBEEK — DIGITAL ENGINEERING** / **FROM PIXELS TO PRODUCTION**.
- Position Mohamed as: **Full-Stack Developer \| Backend-Focused Engineer**.
- Build an interactive 3D WebGL canvas visual (e.g., an interactive rotating architectural data core or node network) using OGL.

### Stage 5: Section Modernization & Cinematic Polish
- Rebuild Selected Work with 3D tilt cards, metric callouts, and direct links to GitHub/Live App.
- Rebuild Behind the Interface into an interactive technical radar.
- Rebuild How I Build into a scroll-scrubbed interactive request lifecycle.
- Upgrade Technical Toolkit with SVG tech logos and category filtering.
- Elevate About and Contact sections with glowing cybernetic borders and the existing clipboard-copy functionality.

### Stage 6: Performance, Accessibility & SEO Verification
- Verify 60fps animation performance on mobile devices.
- Verify `prefers-reduced-motion` fallbacks across all animations.
- Test keyboard tab navigation and screen reader accessibility.
- Update `metadataBase` to production custom domain once configured.

---

## 16. Missing Information and Prioritized Questions

Before generating the final implementation specification, the following information is required from Mohamed:

### A. Essential Information (Blockers for Final Design)
1. **New Projects:** What specific new projects are you planning to add to the portfolio? (Please use the template in Section 17 to provide their details).
2. **Next.js Security Upgrade Choice:** Would you like to run the Next.js security upgrade in a separate Git worktree or directly in the current checkout?
3. **Domain Name:** Is `mohamedelbeek.com` your registered custom domain, or will you continue using `portfolio-alpha-liard-14.vercel.app`?
4. **Display Font Preference:** Would you prefer to keep the literary **Newsreader Serif** for headings, or transition to a modern cinematic sans/display font (e.g., **Syne**, **Cabinet Grotesk**, or **Space Grotesk**) to match the high-tech 3D aesthetic?

### B. Project-Specific Missing Information
1. **E-Commerce Case Study Placeholders:**
   - *Motivation:* What inspired you to build the e-commerce system?
   - *Token Rotation:* What specific mechanism occurs if an old/revoked refresh token is reused? (e.g., immediate revocation of the entire token family).
   - *Concurrency Test:* Did you write an automated race-condition test script (e.g., 50 parallel requests testing stock decrement)?
   - *Webhook Lifecycle:* How does the order status transition when Stripe fires `payment_intent.succeeded` vs `payment_intent.payment_failed`?
   - *Next Steps:* What 2-3 improvements would you build next (e.g., Redis cache, RabbitMQ event queue)?
2. **Project Screenshots & Architecture Diagrams:** Do you have existing screenshots or architecture diagrams for E-Commerce and LexaGuide, or should we create high-fidelity code/architecture cards?
3. **LexaGuide API Documentation:** Is there a live Swagger or Postman URL for LexaGuide, or is the GitHub repository the sole public reference?
4. **Minimal Be Creative:** Do you want the "Minimal Be Creative" client project ([https://minimal1.vercel.app/](https://minimal1.vercel.app/)) featured on the website under "Client Work"?

### C. Personal Branding Information
1. **Profile Visual:** Do you want a real developer portrait photo on the site, or do you prefer an abstract 3D engineering monogram / avatar?
2. **Curriculum Vitae:** Is [`public/Mohamed_Elbeek_CV.pdf`](file:///d:/My_Projects/portfolio/public/Mohamed_Elbeek_CV.pdf) your latest finalized CV, or will you provide a new PDF?

---

## 17. Reusable New Project Submission Template

Use this structured template whenever you want to submit a new project for inclusion in the portfolio. Simply copy this block and fill in the fields:

```markdown
### Project Submission Template

- **Project ID / Slug:** [e.g., distributed-task-queue]
- **Project Title:** [e.g., Distributed Task Queue & Worker Engine]
- **Tagline / One-Liner:** [e.g., High-throughput asynchronous job processing system with Redis and Node.js]
- **Category:** [Full-Stack | Backend API | Distributed System | Microservice | Client Work]
- **Featured on Home Page?** [Yes / No]
- **Role & Ownership:** [e.g., Sole Backend Engineer | Lead Developer | Team Collaboration]
- **Development Status:** [In Production | Completed | Active Development]

#### Technology Stack
- **Backend Framework:** [e.g., NestJS, Express, Go, Fastify]
- **Language:** [e.g., TypeScript, Go, Python]
- **Database & ORM:** [e.g., PostgreSQL + Prisma, MongoDB + Mongoose, Redis]
- **Frontend (if applicable):** [e.g., Next.js, Angular, React, None / Headless]
- **DevOps & Cloud:** [e.g., Docker, AWS ECS, Railway, GitHub Actions]
- **Third-Party Integrations:** [e.g., Stripe, AWS S3, Twilio, SendGrid]

#### The Engineering Story
- **Problem Solved:** [What pain point or engineering challenge does this solve?]
- **Key Features (3-5 bullets):**
  - [Feature 1]
  - [Feature 2]
  - [Feature 3]
- **Backend / Technical Highlights (3-5 bullets):**
  - [e.g., Handled 10,000 req/sec with Redis Streams]
  - [e.g., Clean Architecture with Repository Pattern]
  - [e.g., Idempotent payment webhook processing]
- **Quantitative Metrics / Achievements:** [e.g., 99.9% uptime, 48+ REST endpoints, <50ms response latency]

#### Links & Resources
- **Backend GitHub Repo:** [URL or Private]
- **Frontend GitHub Repo (if separate):** [URL or Private]
- **Live Application URL:** [URL or None]
- **API Documentation (Swagger/Postman):** [URL or None]
- **Screenshots / Diagrams Available:** [Yes / No / Links to images]
```

---

## 18. Audit Verification & Report Sign-Off

- **Audit Completion Date:** November 19, 2026
- **Report Location:** [`d:\My_Projects\portfolio\PORTFOLIO_AUDIT_REPORT.md`](file:///d:/My_Projects/portfolio/PORTFOLIO_AUDIT_REPORT.md)
- **Codebase Integrity:** Unchanged. **Audit Mode strictly observed** (0 components modified, 0 dependencies installed, 0 git commits made).
- **Audit Tooling:** Static code analysis, TypeScript compiler (`tsc`), ESLint 9, Next.js Turbopack compiler, PyPDF metadata extraction, and live Playwright browser webview across viewports.

---
*End of Portfolio Audit & Discovery Report.*
