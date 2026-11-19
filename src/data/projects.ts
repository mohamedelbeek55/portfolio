// ============================================================================
// Centralized Project Data Registry — Cinematic Portfolio Redesign
// ============================================================================
// IMPORTANT: Placeholder content is clearly marked. Project-specific details,
// screenshots, and case studies will be populated in a later phase.
// ============================================================================

import type { ProjectItem } from '@/types/project';

export const projects: ProjectItem[] = [
  // ── TIER 1: FEATURED ENGINEERING PROJECTS ──────────────────────────────

  {
    id: 'ecommerce-platform',
    slug: 'ecommerce',
    order: 1,
    title: 'E-Commerce Platform',
    label: 'FULL-STACK WEB APPLICATION',
    tier: 'featured',
    category: 'full-stack',
    stack: [
      'NestJS',
      'TypeScript',
      'PostgreSQL',
      'Prisma',
      'Stripe',
      'Docker',
      'Angular',
    ],
    description:
      'A backend-focused e-commerce system built around secure authentication, transactional checkout, inventory consistency, reliable payment processing, and maintainable architecture.',
    shortDescription:
      'Full-stack e-commerce with transactional checkout, Stripe payments, and clean architecture.',
    highlightConcepts: [
      'Inventory consistency',
      'Secure authentication',
      'Payment reliability',
      'Clean architecture',
      'Automated testing',
      'CI/CD',
    ],
    links: [
      {
        label: 'Case Study',
        url: '/projects/ecommerce',
        type: 'case-study',
        isPrimary: true,
      },
      {
        label: 'GitHub',
        url: 'https://github.com/mohamedelbeek55/ecommerce-api-nestjs',
        type: 'github',
      },
      {
        label: 'Live App',
        url: 'https://ecommerce-frontend-nqbt.vercel.app/',
        type: 'live',
      },
      {
        label: 'API Docs',
        url: 'https://ecommerce-api-nestjs-production-f953.up.railway.app/api/docs',
        type: 'api-docs',
      },
    ],
  },

  {
    id: 'lexaguide',
    slug: 'lexaguide',
    order: 2,
    title: 'LexaGuide',
    label: 'GRADUATION PROJECT',
    roleLine: 'Backend Developer — Graduation Team Project',
    tier: 'featured',
    category: 'graduation',
    stack: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'JWT',
      'Zod',
      'Cloudinary',
    ],
    description:
      'Legal assistance platform with a backend API covering authentication, lawyers, consultations, legal templates, document generation, notifications, chatbot sessions, and file handling.',
    shortDescription:
      'Legal-tech platform with 48+ endpoints, role-based auth, and consultation lifecycle management.',
    bulletHighlights: [
      '48+ REST endpoints across 9 modules',
      'Role-based JWT auth (User / Lawyer / Admin) with access/refresh token rotation and session revocation',
      'Google OAuth and OTP email verification',
      'Consultation lifecycle (pending → accepted → completed)',
      'In-app chat API and Cloudinary file uploads',
    ],
    links: [
      {
        label: 'Backend Repo',
        url: 'https://github.com/mohamedelbeek55/Graduation-Backend2',
        type: 'github',
        isPrimary: true,
      },
      {
        label: 'Live Platform',
        url: 'https://lexaguide-frontend.vercel.app/',
        type: 'live',
      },
      {
        label: 'Frontend Repo',
        url: 'https://github.com/mohamedelbeek55/lexaguide-frontend',
        type: 'frontend-repo',
      },
    ],
    notes:
      'Backend developer on a graduation team project. The frontend repository supports the live product.',
  },

  // ── TIER 2: CLIENT & INDEPENDENT WORK ──────────────────────────────────

  {
    id: 'ahmed-elbeek-system',
    slug: 'ahmed-elbeek-system',
    order: 3,
    title: 'Ahmed Elbeek Company System',
    label: 'COMMISSIONED BUSINESS SOFTWARE',
    tier: 'client',
    category: 'client-work',
    stack: [],
    description:
      'Commissioned business software project. Technical details and case study content will be added in a later phase.',
    shortDescription: 'Commissioned business software project.',
    links: [],
    isPlaceholder: true,
    syntheticDataNotice:
      'This project uses synthetic demonstration data. No actual company data is exposed.',
  },

  {
    id: 'sakan-alarish',
    slug: 'sakan-alarish',
    order: 4,
    title: 'Sakan Al-Arish',
    label: 'INDEPENDENT PRODUCT',
    tier: 'client',
    category: 'independent',
    stack: [],
    description:
      'Student accommodation platform. Technical details and case study content will be added in a later phase.',
    shortDescription: 'Student accommodation platform.',
    links: [],
    isPlaceholder: true,
  },

  {
    id: 'minimal-be-creative',
    slug: 'minimal-be-creative',
    order: 5,
    title: 'Minimal Be Creative',
    label: 'CLIENT COMMERCIAL WEBSITE',
    tier: 'client',
    category: 'client-work',
    stack: [],
    description:
      'Client commercial website. Technical details and case study content will be added in a later phase.',
    shortDescription: 'Client commercial website.',
    links: [
      {
        label: 'Live Site',
        url: 'https://minimal1.vercel.app/',
        type: 'live',
      },
    ],
    isPlaceholder: true,
  },

  // ── TIER 3: EARLIER WORK ───────────────────────────────────────────────

  {
    id: 'tech-ecommerce',
    slug: 'tech-ecommerce',
    order: 6,
    title: 'Tech E-Commerce Web Application',
    label: 'EARLIER WORK',
    tier: 'archive',
    category: 'earlier-work',
    stack: ['ASP.NET MVC', 'C#', 'SQL Server'],
    description:
      'A database-backed web application for technology products with CRUD functionality, SQL Server integration, and authentication.',
    shortDescription:
      'Database-backed product catalog with CRUD and SQL Server.',
    links: [],
  },
];

// ── Utility helpers ─────────────────────────────────────────────────────

export const featuredProjects = projects.filter((p) => p.tier === 'featured');
export const clientProjects = projects.filter((p) => p.tier === 'client');
export const archiveProjects = projects.filter((p) => p.tier === 'archive');

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
