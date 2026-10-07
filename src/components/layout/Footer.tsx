import React from "react";
import { siteContent } from "@/content/siteContent";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07080a] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-[#f4f4f7]">
            {siteContent.footer.author}{" "}
            <span className="text-[#6b7280] font-normal">— {siteContent.footer.role}</span>
          </p>
          <p className="text-xs font-mono-code text-[#6b7280] mt-1">
            {siteContent.footer.copyright}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono-code text-[#9ca3af]">
          <a
            href={siteContent.meta.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-0.5 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
          >
            GitHub
            <ArrowUpRight className="w-3 h-3 text-[#6b7280]" />
          </a>
          <span className="text-white/10">/</span>
          <a
            href={siteContent.meta.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-0.5 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
          >
            LinkedIn
            <ArrowUpRight className="w-3 h-3 text-[#6b7280]" />
          </a>
          <span className="text-white/10">/</span>
          <a
            href={`mailto:${siteContent.meta.email}`}
            className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
          >
            Email
          </a>
          <span className="text-white/10">/</span>
          <a
            href={siteContent.meta.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
