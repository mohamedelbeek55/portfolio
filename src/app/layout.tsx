import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
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
const title = "Mohamed Elbeek — Backend Developer";
const description =
  "Backend Developer specializing in Node.js, NestJS, TypeScript, PostgreSQL, and production-oriented API development.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Mohamed Elbeek",
  },
  description,
  keywords: [
    "Backend Developer",
    "Node.js",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
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
    siteName: "Mohamed Elbeek Portfolio",
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
  jobTitle: "Backend Developer",
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
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#090a0d] text-[#f4f4f7] antialiased selection:bg-blue-500/30 selection:text-white">
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-blue-600 focus:text-white focus:text-xs focus:font-mono focus:rounded focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
