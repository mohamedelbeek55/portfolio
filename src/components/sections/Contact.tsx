"use client";

import React, { useState } from "react";
import { siteContent } from "@/content/siteContent";
import {
  Mail,
  Copy,
  Check,
  MessageSquare,
  ArrowUpRight,
  FileText,
  Terminal,
} from "lucide-react";

export function Contact() {
  const { contact, meta } = siteContent;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 lg:py-32 bg-[#07080a] border-b border-[var(--border-subtle)] overflow-hidden scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 max-w-full h-96 bg-[var(--accent-electric)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Pitch */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C1424] border border-[var(--border-subtle)] font-mono-code text-xs text-[var(--accent-neon-cyan)] mb-4">
              <Terminal className="w-3.5 h-3.5" />
              <span>DIRECT CHANNELS {"//"}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-[1.05]">
              LET&apos;S WORK TOGETHER.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] font-sans-body leading-relaxed">
              {contact.copy}
            </p>

            {/* Quick response commitment */}
            <div className="mt-6 flex items-center gap-2 font-mono-code text-xs text-[var(--accent-neon-cyan)] bg-[#0C1424] border border-[var(--border-cyan)] px-3.5 py-2.5 rounded-xl w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Status: Active &amp; responding to engineering inquiries</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[var(--accent-electric)] hover:bg-[var(--accent-electric-hover)] text-white text-sm font-semibold transition-all duration-200 min-h-[48px] shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-[#0C1424] hover:bg-[#111C33] border border-[var(--border-medium)] text-xs font-mono-code text-[var(--text-secondary)] hover:text-white transition-all min-h-[48px] focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)]"
                aria-label="Copy email address to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400" aria-live="polite">
                      Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[var(--accent-neon-cyan)]" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href={contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-[#0C1424] hover:bg-[#111C33] border border-[var(--border-medium)] text-xs font-mono-code text-emerald-400 hover:text-emerald-300 transition-all min-h-[48px]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Cinematic Terminal Window */}
          <div className="lg:col-span-6 bg-[#080B12] border border-[var(--border-medium)] rounded-2xl overflow-hidden shadow-2xl">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0C1424] border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 font-mono-code text-xs text-[var(--text-secondary)]">
                  terminal // contact-protocol.sh
                </span>
              </div>
              <span className="text-[10px] font-mono-code text-[var(--accent-neon-cyan)]">
                online: true
              </span>
            </div>

            {/* Terminal Channel List */}
            <div className="p-5 sm:p-6 font-mono-code text-xs space-y-4">
              <div className="text-[var(--text-tertiary)] flex items-center gap-2">
                <span className="text-[var(--accent-neon-cyan)]">$</span>
                <span>cat channels.json</span>
              </div>

              <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
                {/* Email Row */}
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <span className="text-[var(--text-tertiary)] uppercase text-[11px]">
                    email
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-white hover:text-[var(--accent-neon-cyan)] transition-colors"
                    >
                      {contact.email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="p-1 hover:text-[var(--accent-neon-cyan)] text-[var(--text-tertiary)] transition-colors"
                      title="Copy email"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* WhatsApp Row */}
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <span className="text-[var(--text-tertiary)] uppercase text-[11px]">
                    whatsapp
                  </span>
                  <a
                    href={contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                  >
                    <span>{contact.whatsappDisplay}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                  </a>
                </div>

                {/* LinkedIn Row */}
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <span className="text-[var(--text-tertiary)] uppercase text-[11px]">
                    linkedin
                  </span>
                  <a
                    href={meta.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[var(--accent-neon-cyan)] transition-colors inline-flex items-center gap-1"
                  >
                    <span>mohamed-elbeek-9b81a230b</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                  </a>
                </div>

                {/* GitHub Row */}
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <span className="text-[var(--text-tertiary)] uppercase text-[11px]">
                    github
                  </span>
                  <a
                    href={meta.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[var(--accent-neon-cyan)] transition-colors inline-flex items-center gap-1"
                  >
                    <span>mohamedelbeek55</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                  </a>
                </div>

                {/* CV Row */}
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <span className="text-[var(--text-tertiary)] uppercase text-[11px]">
                    curriculum vitae
                  </span>
                  <a
                    href={meta.cvPath}
                    download="Mohamed_Elbeek_CV.pdf"
                    className="text-[var(--accent-neon-cyan)] hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>Mohamed_Elbeek_CV.pdf</span>
                    <FileText className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="text-[11px] text-[var(--text-muted)] pt-2 flex items-center justify-between">
                <span>Location: Cairo, Egypt</span>
                <span>Timezone: GMT+2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
