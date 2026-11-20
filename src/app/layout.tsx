import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://mohamedelbeek.com";
const title = "Mohamed Elbeek — Full-Stack Developer";
const description =
  "Full-Stack Developer & Backend-Focused Engineer. Building complete digital products — from engaging user interfaces to secure backend systems and reliable infrastructure.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Mohamed Elbeek",
  },
  description,
  keywords: [
    "Full-Stack Developer",
    "Backend Engineer",
    "Node.js",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "React",
    "Next.js",
    "REST APIs",
    "Clean Architecture",
    "Docker",
    "Cairo Egypt",
  ],
  authors: [{ name: "Mohamed Elbeek", url: siteUrl }],
  creator: "Mohamed Elbeek",
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Mohamed Elbeek — Digital Engineering",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@mohamedelbeek",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohamed Elbeek",
  alternateName: "Mohamed Mahmoud Mohamed Elbeek",
  jobTitle: "Full-Stack Developer",
  description,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Sinai University",
  },
  knowsAbout: [
    "Node.js",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "Express.js",
    "REST APIs",
    "Clean Architecture",
    "Docker",
    "React",
    "Next.js",
    "Angular",
  ],
  sameAs: [
    "https://github.com/mohamedelbeek55",
    "https://www.linkedin.com/in/mohamed-elbeek-9b81a230b/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-deep-black)] text-[var(--text-primary)] antialiased selection:bg-blue-500/30 selection:text-white">
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[var(--accent-electric)] focus:text-white focus:text-xs focus:font-mono focus:rounded focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
