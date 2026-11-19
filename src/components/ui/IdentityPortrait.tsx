"use client";

import React, { useState } from "react";
import Image from "next/image";

interface IdentityPortraitProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function IdentityPortrait({ size = "md", className = "" }: IdentityPortraitProps) {
  const [imageError, setImageError] = useState(false);

  const dimensionClasses = {
    sm: "w-24 h-24",
    md: "w-36 h-36 sm:w-44 sm:h-44",
    lg: "w-48 h-48 sm:w-60 sm:h-60",
  }[size];

  return (
    <div className={`relative group ${className}`}>
      {/* Outer Atmospheric Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[var(--accent-electric)]/20 via-[var(--accent-neon-cyan)]/25 to-transparent blur-xl group-hover:blur-2xl transition-all pointer-events-none" />

      {/* Orbiting Depth Ring */}
      <div className="absolute -inset-2 rounded-2xl border border-[var(--accent-neon-cyan)]/20 group-hover:border-[var(--accent-neon-cyan)]/40 transition-colors pointer-events-none" />

      {/* Architectural Framing Box */}
      <div
        className={`relative ${dimensionClasses} rounded-2xl bg-[#080B12] border border-[var(--border-accent)] overflow-hidden shadow-2xl flex items-center justify-center`}
      >
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 engineering-grid opacity-30 pointer-events-none" />

        {!imageError ? (
          <Image
            src="/images/profile.jpg"
            alt="Mohamed Elbeek — Developer Portrait"
            fill
            sizes="(max-width: 768px) 180px, 240px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
            priority
          />
        ) : (
          /* High-Tech Procedural Monogram Fallback */
          <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center select-none w-full h-full bg-gradient-to-b from-[#0C1424] to-[#080B12]">
            {/* Glowing Diamond Monogram */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border border-[var(--accent-neon-cyan)]/50 rotate-45 bg-[#111C33]/60 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
              <span className="font-display font-black text-white text-xl sm:text-2xl -rotate-45 tracking-widest">
                ME
              </span>
            </div>

            <div className="mt-4 font-mono-code text-[10px] text-[var(--accent-neon-cyan)] tracking-wider">
              SYS.IDENTITY // 0x4D45
            </div>
            <div className="text-[9px] font-mono-code text-[var(--text-tertiary)]">
              MOHAMED ELBEEK
            </div>
          </div>
        )}

        {/* 4 Corner Cybernetic Brackets */}
        <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-[var(--accent-neon-cyan)]" />
        <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-[var(--accent-neon-cyan)]" />
        <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-[var(--accent-neon-cyan)]" />
        <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-[var(--accent-neon-cyan)]" />
      </div>

      {/* Floating Status Beacon */}
      <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0C1424] border border-[var(--border-accent)] font-mono-code text-[10px] text-[var(--accent-neon-cyan)] shadow-md whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>NODE // VERIFIED</span>
      </div>
    </div>
  );
}
