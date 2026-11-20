"use client";

import React, { useEffect, useRef } from "react";

export function MobileTouchFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only enable if device supports touch or coarse pointer
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!isTouchDevice || reducedMotionQuery.matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const ripple = rippleRef.current;
    if (!dot || !ring || !ripple) return;

    let activeTouchId: number | null = null;
    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let isTracking = false;
    let rafId: number | null = null;
    let fadeTimeout: NodeJS.Timeout | null = null;

    // Set initial position offscreen
    dot.style.transform = "translate3d(-100px, -100px, 0) translate(-50%, -50%)";
    ring.style.transform = "translate3d(-100px, -100px, 0) translate(-50%, -50%)";
    ripple.style.transform = "translate3d(-100px, -100px, 0) translate(-50%, -50%)";

    const animateRing = () => {
      if (!isTracking) {
        rafId = null;
        return;
      }

      // Smooth trailing interpolation (~16% per frame)
      const dx = targetX - ringX;
      const dy = targetY - ringY;
      ringX += dx * 0.16;
      ringY += dy * 0.16;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(animateRing);
    };

    const handleTouchStart = (e: TouchEvent) => {
      // If already tracking a finger, ignore extra fingers to avoid jumping
      if (activeTouchId !== null) return;

      const touch = e.changedTouches[0];
      if (!touch) return;

      activeTouchId = touch.identifier;
      targetX = touch.clientX;
      targetY = touch.clientY;
      ringX = targetX;
      ringY = targetY;
      isTracking = true;

      if (fadeTimeout) {
        clearTimeout(fadeTimeout);
        fadeTimeout = null;
      }

      // Position immediate dot and ring
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      // Show dot and ring with crisp opacity
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      ring.style.transform += " scale(1)";

      // Trigger soft expanding ripple at touchstart
      ripple.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(0.6)`;
      ripple.style.opacity = "0.7";
      ripple.style.transition = "none";

      // Force reflow for CSS transition restart
      void ripple.offsetWidth;

      ripple.style.transition = "transform 360ms cubic-bezier(0.1, 0.9, 0.2, 1), opacity 360ms ease-out";
      ripple.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(2.2)`;
      ripple.style.opacity = "0";

      // Start interpolation loop
      if (!rafId) {
        rafId = requestAnimationFrame(animateRing);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (activeTouchId === null) return;

      // Find the active touch
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (touch.identifier === activeTouchId) {
          targetX = touch.clientX;
          targetY = touch.clientY;

          // Update dot position immediately with finger
          dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
          break;
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (activeTouchId === null) return;

      let isCurrentTouchEnding = false;
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === activeTouchId) {
          isCurrentTouchEnding = true;
          break;
        }
      }

      if (!isCurrentTouchEnding) return;

      activeTouchId = null;

      // Gracefully fade out dot and ring
      dot.style.opacity = "0";
      ring.style.opacity = "0";

      fadeTimeout = setTimeout(() => {
        isTracking = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }, 220);
    };

    const handleTouchCancel = (e: TouchEvent) => {
      handleTouchEnd(e);
    };

    // Use passive listeners so native scroll is 100% untouched and smooth
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchCancel, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchCancel);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (fadeTimeout) {
        clearTimeout(fadeTimeout);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {/* Expanding Touch Start Ripple */}
      <div
        ref={rippleRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--accent-neon-cyan,#38bdf8)]/70 pointer-events-none opacity-0 will-change-transform"
        style={{
          boxShadow: "0 0 16px rgba(56, 189, 248, 0.4)",
        }}
      />

      {/* Immediate Touch Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--accent-neon-cyan,#38bdf8)] pointer-events-none opacity-0 shadow-[0_0_10px_rgba(56,189,248,0.9)] transition-opacity duration-150 will-change-transform"
      />

      {/* Soft Trailing Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-7 h-7 rounded-full border border-[var(--accent-neon-cyan,#38bdf8)]/60 bg-[var(--accent-neon-cyan,#38bdf8)]/10 pointer-events-none opacity-0 shadow-[0_0_12px_rgba(56,189,248,0.3)] transition-opacity duration-200 will-change-transform"
      />
    </div>
  );
}
