"use client";

import React, { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only enable on fine pointer devices (mouse / trackpad) and when reduced motion is NOT requested
    if (typeof window === "undefined") return;

    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointerQuery.matches || reducedMotionQuery.matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // Mutable state stored in closures to avoid ANY React state re-renders
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isStationary = true;
    let rafId: number | null = null;
    let isVisible = false;
    let currentMode: "default" | "hover" | "view" | "open" = "default";

    // Set initial position offscreen
    dot.style.transform = `translate3d(-100px, -100px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(-100px, -100px, 0) translate(-50%, -50%)`;

    const updateCursorMode = (mode: "default" | "hover" | "view" | "open") => {
      if (currentMode === mode) return;
      currentMode = mode;

      if (mode === "view") {
        ring.style.width = "54px";
        ring.style.height = "54px";
        ring.style.borderColor = "var(--accent-neon-cyan, #38bdf8)";
        ring.style.backgroundColor = "rgba(12, 20, 36, 0.75)";
        ring.style.boxShadow = "0 0 20px rgba(56, 189, 248, 0.4)";
        label.textContent = "VIEW";
        label.style.opacity = "1";
        dot.style.opacity = "0"; // hide dot to let label read clearly
      } else if (mode === "open") {
        ring.style.width = "54px";
        ring.style.height = "54px";
        ring.style.borderColor = "var(--accent-electric, #2563eb)";
        ring.style.backgroundColor = "rgba(12, 20, 36, 0.75)";
        ring.style.boxShadow = "0 0 20px rgba(37, 99, 235, 0.4)";
        label.textContent = "OPEN";
        label.style.opacity = "1";
        dot.style.opacity = "0";
      } else if (mode === "hover") {
        ring.style.width = "40px";
        ring.style.height = "40px";
        ring.style.borderColor = "var(--accent-neon-cyan, #38bdf8)";
        ring.style.backgroundColor = "rgba(56, 189, 248, 0.08)";
        ring.style.boxShadow = "0 0 14px rgba(56, 189, 248, 0.25)";
        label.textContent = "";
        label.style.opacity = "0";
        dot.style.opacity = "1";
      } else {
        // default
        ring.style.width = "26px";
        ring.style.height = "26px";
        ring.style.borderColor = "rgba(56, 189, 248, 0.65)";
        ring.style.backgroundColor = "transparent";
        ring.style.boxShadow = "none";
        label.textContent = "";
        label.style.opacity = "0";
        dot.style.opacity = "1";
      }
    };

    const animate = () => {
      // 13% interpolation per frame as specified
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;

      ringX += dx * 0.13;
      ringY += dy * 0.13;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      // Stop animation loop when cursor is stationary (<0.1px difference)
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        ringX = mouseX;
        ringY = mouseY;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        isStationary = true;
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(animate);
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Ignore simulated pointer events or touch pointers
      if (e.pointerType === "touch") return;

      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        ringX = mouseX;
        ringY = mouseY;
      }

      // Dot follows immediately without delay
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      // Start interpolation loop if stopped
      if (isStationary) {
        isStationary = false;
        if (!rafId) {
          rafId = requestAnimationFrame(animate);
        }
      }
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const action = cursorTarget.getAttribute("data-cursor");
        if (action === "view") {
          updateCursorMode("view");
          return;
        } else if (action === "open") {
          updateCursorMode("open");
          return;
        }
      }

      // Check standard interactive elements
      const interactiveTarget = target.closest("a, button, [role='button'], input, textarea, select");
      if (interactiveTarget) {
        updateCursorMode("hover");
      } else {
        updateCursorMode("default");
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      // If leaving window
      if (!e.relatedTarget) {
        isVisible = false;
        dot.style.opacity = "0";
        ring.style.opacity = "0";
        updateCursorMode("default");
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        isStationary = true;
        isVisible = false;
        dot.style.opacity = "0";
        ring.style.opacity = "0";
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {/* Immediate 6px Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--accent-neon-cyan,#38bdf8)] shadow-[0_0_8px_rgba(56,189,248,0.9)] opacity-0 pointer-events-none transition-opacity duration-150 will-change-transform"
      />

      {/* 26px Interpolating Outer Follower Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-[var(--accent-neon-cyan,#38bdf8)]/65 opacity-0 pointer-events-none flex items-center justify-center transition-[width,height,border-color,background-color,box-shadow] duration-200 ease-out will-change-transform backdrop-blur-[0.5px]"
        style={{
          width: "26px",
          height: "26px",
          transformOrigin: "center center",
        }}
      >
        <span
          ref={labelRef}
          className="font-mono-code text-[9px] font-bold tracking-widest text-white opacity-0 transition-opacity duration-150 pointer-events-none select-none"
        />
      </div>
    </div>
  );
}
