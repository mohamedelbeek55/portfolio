"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteContent } from "@/content/siteContent";
import { Menu, X, ArrowUpRight, FileText, Terminal } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "Expertise", href: "#expertise" },
  { label: "Engineering", href: "#engineering" },
  { label: "Workflow", href: "#workflow" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  // Handle scroll detection and active section spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Intersection observer for section tracking
    const sectionIds = ["top", "work", "expertise", "engineering", "workflow", "about", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#080B12]/85 backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-2xl shadow-black/60"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="#top"
          className="group flex items-center gap-3 text-sm focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] rounded-lg p-1.5 transition-all"
          aria-label="Mohamed Elbeek — Digital Engineering Home"
          onClick={closeMenu}
        >
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#111C33] to-[#0C1424] border border-[var(--border-medium)] flex items-center justify-center group-hover:border-[var(--accent-electric)] transition-colors shadow-inner">
            <span className="font-mono-code text-xs font-bold text-[var(--accent-neon-cyan)]">ME</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--accent-neon-cyan)] animate-pulse" />
          </div>

          <div className="flex flex-col">
            <span className="font-display font-semibold tracking-tight text-[var(--text-primary)] group-hover:text-white transition-colors text-sm sm:text-base leading-tight">
              MOHAMED ELBEEK
            </span>
            <span className="font-mono-code text-[10px] tracking-widest uppercase text-[var(--text-tertiary)] flex items-center gap-1">
              DIGITAL ENGINEERING
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Floating Dock */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Primary Navigation"
        >
          <div className="flex items-center gap-1 bg-[#0C1424]/80 backdrop-blur-md border border-[var(--border-subtle)] rounded-full px-2 py-1 shadow-lg shadow-black/40">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] ${
                    isActive
                      ? "text-white bg-[var(--accent-electric)]/20 border border-[var(--accent-electric)]/40 shadow-[0_0_12px_rgba(37,99,235,0.25)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-[var(--accent-neon-cyan)] rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2 border-l border-[var(--border-subtle)] pl-3 ml-2">
            <a
              href={siteContent.meta.cvPath}
              download="Mohamed_Elbeek_CV.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-code font-medium text-[var(--accent-neon-cyan)] bg-[var(--accent-neon-cyan)]/10 hover:bg-[var(--accent-neon-cyan)]/20 border border-[var(--accent-neon-cyan)]/30 hover:border-[var(--accent-neon-cyan)]/60 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent-neon-cyan)] shadow-[0_0_15px_rgba(56,189,248,0.12)]"
              aria-label="Download Mohamed Elbeek CV PDF"
            >
              <FileText className="w-3.5 h-3.5 text-[var(--accent-neon-cyan)]" />
              <span>CV.pdf</span>
            </a>
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={siteContent.meta.cvPath}
            download="Mohamed_Elbeek_CV.pdf"
            className="text-xs font-mono-code text-[var(--accent-neon-cyan)] px-3 py-1.5 rounded-lg bg-[var(--accent-neon-cyan)]/10 border border-[var(--accent-neon-cyan)]/25 min-h-[44px] flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[var(--accent-neon-cyan)]"
            aria-label="Download CV PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-[var(--text-secondary)] hover:text-white border border-[var(--border-medium)] bg-[#0C1424] rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation drawer" : "Open navigation drawer"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Polished Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          className="fixed inset-0 top-[65px] bg-[#080B12]/98 backdrop-blur-2xl border-t border-[var(--border-subtle)] z-40 md:hidden flex flex-col p-6 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300"
        >
          {/* Header indicator */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-subtle)]">
            <span className="font-mono-code text-xs text-[var(--accent-neon-cyan)] tracking-wider uppercase flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              Navigation System
            </span>
            <span className="text-[11px] font-mono-code text-[var(--text-muted)]">
              active: #{activeSection}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 mb-8">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  style={{ animationDelay: `${index * 40}ms` }}
                  className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all min-h-[48px] ${
                    isActive
                      ? "bg-[var(--accent-electric)]/15 border border-[var(--accent-electric)]/40 text-white"
                      : "text-[var(--text-secondary)] hover:text-white hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <span className="font-display text-lg font-medium tracking-tight">
                    {item.label}
                  </span>
                  <span className="font-mono-code text-xs text-[var(--text-tertiary)] group-hover:text-[var(--accent-neon-cyan)] transition-colors">
                    0{index + 1} {"//"}
                  </span>
                </a>
              );
            })}
          </div>

          <div className="mt-auto pt-6 border-t border-[var(--border-subtle)] flex flex-col gap-3">
            <a
              href={siteContent.meta.cvPath}
              download="Mohamed_Elbeek_CV.pdf"
              onClick={closeMenu}
              className="w-full text-sm font-mono-code font-medium text-[var(--accent-neon-cyan)] bg-[var(--accent-neon-cyan)]/10 border border-[var(--accent-neon-cyan)]/30 flex items-center justify-between px-4 py-3 rounded-xl min-h-[48px]"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--accent-neon-cyan)]" />
                Download CV (PDF)
              </span>
              <span className="text-xs text-[var(--text-secondary)]">3.09 GPA</span>
            </a>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={siteContent.meta.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="text-xs font-mono-code text-[var(--text-secondary)] hover:text-white flex items-center justify-center gap-1.5 p-3 rounded-lg bg-[#0C1424] border border-[var(--border-subtle)] min-h-[44px]"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
              </a>
              <a
                href={siteContent.meta.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="text-xs font-mono-code text-[var(--text-secondary)] hover:text-white flex items-center justify-center gap-1.5 p-3 rounded-lg bg-[#0C1424] border border-[var(--border-subtle)] min-h-[44px]"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
