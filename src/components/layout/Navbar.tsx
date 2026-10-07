"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteContent } from "@/content/siteContent";
import { Menu, X, ArrowUpRight, FileText } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  // Prevent body scroll when mobile menu is open
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#090a0d]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-lg shadow-black/20"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="#top"
          className="group flex items-center gap-2.5 text-sm focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 -ml-1 transition-colors"
          aria-label="Mohamed Elbeek - Home"
          onClick={closeMenu}
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all" />
          <span className="font-medium tracking-tight text-[#f4f4f7] group-hover:text-white transition-colors">
            {siteContent.meta.name}
          </span>
          <span className="font-mono-code text-[11px] text-[#6b7280] hidden sm:inline-block">
            / backend
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-1 text-sm font-medium"
          aria-label="Main Navigation"
        >
          <div className="flex items-center gap-1 bg-[#12151b]/80 border border-white/[0.06] rounded-full px-3 py-1 mr-4">
            {siteContent.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-1 text-xs text-[#9ca3af] hover:text-[#f4f4f7] transition-colors rounded-full hover:bg-white/[0.05] focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 border-l border-white/[0.08] pl-4">
            <a
              href={siteContent.meta.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono-code text-[#9ca3af] hover:text-white flex items-center gap-1 px-2 py-1 rounded hover:bg-white/[0.04] transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Mohamed Elbeek GitHub Profile"
            >
              GitHub
              <ArrowUpRight className="w-3 h-3 text-[#6b7280]" />
            </a>
            <a
              href={siteContent.meta.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono-code text-[#9ca3af] hover:text-white flex items-center gap-1 px-2 py-1 rounded hover:bg-white/[0.04] transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Mohamed Elbeek LinkedIn Profile"
            >
              LinkedIn
              <ArrowUpRight className="w-3 h-3 text-[#6b7280]" />
            </a>
            <a
              href={siteContent.meta.cvPath}
              download="Mohamed_Elbeek_CV.pdf"
              className="text-xs font-mono-code text-blue-400 hover:text-blue-300 flex items-center gap-1 px-2.5 py-1 rounded bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/25 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Download Mohamed Elbeek CV PDF"
            >
              <FileText className="w-3 h-3 text-blue-400" />
              CV.pdf
            </a>
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={siteContent.meta.cvPath}
            download="Mohamed_Elbeek_CV.pdf"
            className="text-xs font-mono-code text-blue-400 px-2.5 py-1.5 rounded bg-blue-500/10 border border-blue-500/20 min-h-[44px] flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Download Mohamed Elbeek CV PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#9ca3af] hover:text-white border border-white/[0.08] bg-[#12151b] rounded min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 top-[65px] bg-[#090a0d]/95 backdrop-blur-xl border-t border-white/[0.08] z-40 md:hidden flex flex-col p-6 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col gap-2 mb-8">
            <span className="font-mono-code text-[11px] uppercase tracking-wider text-[#6b7280] mb-2 px-3">
              Navigation
            </span>
            {siteContent.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="text-lg font-serif-heading text-[#f4f4f7] hover:text-blue-400 px-3 py-2.5 rounded-md hover:bg-white/[0.04] transition-colors min-h-[44px] flex items-center"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-white/[0.08] flex flex-col gap-3">
            <span className="font-mono-code text-[11px] uppercase tracking-wider text-[#6b7280] px-3">
              External & Documents
            </span>
            <a
              href={siteContent.meta.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="text-sm font-mono-code text-[#9ca3af] hover:text-white flex items-center justify-between px-3 py-3 rounded hover:bg-white/[0.04] border border-white/[0.05] min-h-[44px]"
            >
              <span>GitHub (mohamedelbeek55)</span>
              <ArrowUpRight className="w-4 h-4 text-[#6b7280]" />
            </a>
            <a
              href={siteContent.meta.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="text-sm font-mono-code text-[#9ca3af] hover:text-white flex items-center justify-between px-3 py-3 rounded hover:bg-white/[0.04] border border-white/[0.05] min-h-[44px]"
            >
              <span>LinkedIn Profile</span>
              <ArrowUpRight className="w-4 h-4 text-[#6b7280]" />
            </a>
            <a
              href={siteContent.meta.cvPath}
              download="Mohamed_Elbeek_CV.pdf"
              onClick={closeMenu}
              className="text-sm font-mono-code text-blue-400 bg-blue-500/10 border border-blue-500/25 flex items-center justify-between px-3 py-3 rounded min-h-[44px]"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Download CV (PDF)
              </span>
              <span className="text-xs text-blue-400/80">3.09 GPA</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
