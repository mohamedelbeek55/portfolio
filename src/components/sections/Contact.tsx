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
      // Fallback
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#07080a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono-code text-[11px] text-blue-400 font-semibold tracking-widest uppercase">
              {"// 06. CONTACT"}
            </span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f4f4f7] tracking-tight">
            {contact.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9ca3af] font-sans-body leading-relaxed max-w-2xl">
            {contact.copy}
          </p>

          {/* Primary Action Buttons Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {/* Primary mailto button */}
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <Mail className="w-4 h-4" />
              <span>Let&apos;s Work Together</span>
            </a>

            {/* Copy Email Button with feedback */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-3 rounded bg-[#12151b] hover:bg-[#1a202c] border border-white/[0.1] text-xs font-mono-code text-[#cbd5e1] hover:text-white transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label="Copy email address to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400" aria-live="polite">
                    Copied to clipboard
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#9ca3af]" />
                  <span>Copy email</span>
                </>
              )}
            </button>

            {/* WhatsApp Button */}
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded bg-[#12151b] hover:bg-[#1a202c] border border-white/[0.1] text-xs font-mono-code text-[#cbd5e1] hover:text-white transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Clean Option List */}
          <div className="mt-12 pt-8 border-t border-white/[0.08]">
            <h3 className="font-mono-code text-xs uppercase tracking-wider text-[#6b7280] mb-4">
              Direct Communication & Channels
            </h3>

            <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {/* Email Row */}
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono-code text-[#9ca3af]">
                  Email
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm font-mono-code text-[#f4f4f7] hover:text-blue-400 transition-colors"
                  >
                    {contact.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 text-[#6b7280] hover:text-white rounded hover:bg-white/[0.05] transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
                    title="Copy Email"
                    aria-label="Copy Email"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* WhatsApp Row */}
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono-code text-[#9ca3af]">
                  WhatsApp
                </span>
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono-code text-[#f4f4f7] hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{contact.whatsappDisplay}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#6b7280]" />
                </a>
              </div>

              {/* LinkedIn Row */}
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono-code text-[#9ca3af]">
                  LinkedIn
                </span>
                <a
                  href={meta.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono-code text-[#f4f4f7] hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>linkedin.com/in/mohamed-elbeek</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#6b7280]" />
                </a>
              </div>

              {/* GitHub Row */}
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono-code text-[#9ca3af]">
                  GitHub
                </span>
                <a
                  href={meta.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono-code text-[#f4f4f7] hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>github.com/mohamedelbeek55</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#6b7280]" />
                </a>
              </div>

              {/* Download CV Row */}
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono-code text-[#9ca3af]">
                  Curriculum Vitae
                </span>
                <a
                  href={meta.cvPath}
                  download="Mohamed_Elbeek_CV.pdf"
                  className="text-sm font-mono-code text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Mohamed_Elbeek_CV.pdf (Direct download)</span>
                  <FileText className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
