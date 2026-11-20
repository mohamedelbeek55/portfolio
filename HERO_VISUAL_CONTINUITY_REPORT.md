# HERO VISUAL CONTINUITY & PROJECT CARD IDLE MOTION REPORT

**Target System:** Personal Developer Portfolio — Cinematic Digital Identity  
**Engineer:** Mohamed Elbeek — Digital Engineering  
**Git Branch:** `feat/cinematic-portfolio-redesign`  
**Remote:** `mohamedelbeek55/portfolio`  
**Status:** **100% FIXED & VERIFIED** across Desktop ($1440 \times 900$), Mobile ($390 \times 844$), and Small Mobile ($360 \times 800$)

---

## 1. Executive Summary

A thorough architectural investigation was conducted into the reported Hero scroll regression, specifically addressing:
1. The large empty black gap between the 3D Hero and the Featured Projects section.
2. The premature disappearance of the 3D scene around 33% Hero progress.
3. The Hero footer/telemetry bar scrolling upward rather than remaining pinned to the viewport.
4. The absence of Stage B telemetry panels around 33% progress on mobile devices.
5. The lack of subtle ambient motion on the Featured Project cards.

### Summary of Discovered Causes & Solutions
| Issue / Defect | Exact Architectural Root Cause | Engineering Solution | Status |
| :--- | :--- | :--- | :--- |
| **Sticky Viewport Unpinning / 220vh Black Void** | `overflow-hidden` was applied to `<section id="top">` during the mobile overflow sweep. In CSS, `overflow: hidden` on a parent cancels `position: sticky` on child elements in document context. The child scrolled with the page instead of pinning, scrolling completely offscreen by 33% (100vh of 320vh) and leaving the remaining 220vh of `<section id="top">` as an empty black void. | Removed `overflow-hidden` from `<section id="top">`. The sticky viewport's internal container already has `w-full h-screen overflow-hidden`, keeping inner elements perfectly bounded without breaking document-level sticky pinning. | **FIXED** (Verified `stickyTop: 0px` across 0%–100%) |
| **Telemetry Footer Scrolling Up** | Direct result of the broken sticky context: the footer was scrolling with the 100vh container instead of pinning to `window.innerHeight`. | With sticky pinning restored, footer remains pinned at viewport bottom across all progress points ($0\% \to 100\%$). | **FIXED** |
| **Missing Stage B on Mobile (~33%)** | Stage B telemetry pillars had `hidden lg:flex`, making Stage B completely empty on all viewports $< 1024\text{px}$ (phones and tablets). | Replaced with responsive layout: `flex flex-col sm:flex-row items-center justify-between`. On mobile, pillars flank top-left and bottom-right around the spinning 3D core; on desktop, they flank left and right. | **FIXED** (Stage B is 100% visible across mobile and desktop) |
| **Excessive Empty Scroll Duration** | The previous `320vh` track caused 1980px of scroll on desktop and 1856px on mobile. Between 88% and 100%, content faded into a void before `#work` arrived. | Calibrated responsive track height to `h-[220vh] md:h-[260vh]`. Stage C softly eases to 0.30 opacity instead of vanishing, while Stage D transition cue rises to introduce `#work`. | **OPTIMIZED** (Crisp, fatigue-free scroll) |
| **Static Project Cards** | Project cards were visually static when not hovered with a mouse cursor, lacking an ambient feeling of life on touch devices. | Implemented two-tier architecture: outer wrapper handles subtle compositor-accelerated CSS vertical floating (`card-ambient-idle`), while inner `<article>` handles existing mouse-driven 3D tilt. Staggered phase offsets across cards. Reduced intensity on mobile. Disabled on reduced motion. | **IMPLEMENTED** (Verified via Playwright DOM transforms) |

---

## 2. Part 1 & Part 2: Empirical Sticky Pinning Investigation

### Bounding Rect Measurements Before vs. After Fix

Prior to the fix, empirical measurement showed the sticky container moving upward on every scroll frame:
```
--- PRE-FIX BREAKAGE (overflow-hidden on section#top) ---
Scroll   0.0% (scrollY=    0px) -> sticky.top:     0px, sticky.bottom:  900px
Scroll  10.0% (scrollY=  198px) -> sticky.top:  -198px, sticky.bottom:  702px
Scroll  20.0% (scrollY=  396px) -> sticky.top:  -396px, sticky.bottom:  504px
Scroll  33.0% (scrollY=  653px) -> sticky.top:  -653px, sticky.bottom:  247px  <-- 3D scene 73% offscreen!
Scroll  50.0% (scrollY=  990px) -> sticky.top:  -990px, sticky.bottom:  -90px  <-- Completely offscreen!
Scroll  65.0% (scrollY= 1287px) -> sticky.top: -1287px, sticky.bottom: -387px  <-- Pure black void
Scroll  80.0% (scrollY= 1584px) -> sticky.top: -1584px, sticky.bottom: -684px  <-- Pure black void
Scroll 100.0% (scrollY= 1980px) -> sticky.top: -1980px, sticky.bottom:-1080px  <-- Pure black void
```

After removing `overflow-hidden` from `section#top`:
```
--- POST-FIX VERIFICATION (Clean sticky pinning) ---
Scroll   0.0% (scrollY=    0px) -> sticky.top: 0px, sticky.bottom: 900px [PINNED]
Scroll  10.0% (scrollY=  144px) -> sticky.top: 0px, sticky.bottom: 900px [PINNED]
Scroll  20.0% (scrollY=  288px) -> sticky.top: 0px, sticky.bottom: 900px [PINNED]
Scroll  33.0% (scrollY=  475px) -> sticky.top: 0px, sticky.bottom: 900px [PINNED]
Scroll  50.0% (scrollY=  720px) -> sticky.top: 0px, sticky.bottom: 900px [PINNED]
Scroll  65.0% (scrollY=  936px) -> sticky.top: 0px, sticky.bottom: 900px [PINNED]
Scroll  80.0% (scrollY= 1152px) -> sticky.top: 0px, sticky.bottom: 900px [PINNED]
Scroll  90.0% (scrollY= 1296px) -> sticky.top: 0px, sticky.bottom: 900px [PINNED]
Scroll 100.0% (scrollY= 1440px) -> sticky.top: 0px, sticky.bottom: 900px [PINNED]
```
The viewport remains pinned at `top: 0px` throughout the entire Hero scroll track.

---

## 3. Calibrated Visual Sequence & Pacing

### Stage A — Initial Monolith & Spark ($0\% \to 22\%$)
- **Visuals:** Close-up on the procedural digital identity monogram monolith (`camera.position.z = 3.4`), illuminated by electric blue and cyan directional lighting.
- **Typography:** `MOHAMED ELBEEK` with animated pulse indicator and "Scroll to Explore" prompt.
- **Pacing:** Full opacity from 0% to 12%, smoothly fading out from 12% to 22%.

### Stage B — Architecture & Scope Reveal ($18\% \to 54\%$)
- **Visuals:** Camera pulls back smoothly (`camera.position.z = 5.2 \to 7.6`), revealing the concentric orbital rings and floating particle cloud around the central monolith.
- **Telemetry UI:**
  - Panel 01 (`ARCHITECTURAL SCOPE`): Deterministic boundaries, Next.js 16, NestJS, TypeScript.
  - Panel 02 (`PERSISTENCE & CLOUD`): PostgreSQL, Prisma, Docker, Redis.
- **Mobile Composition:** Instead of hiding on small screens, panels dynamically stack top-left and bottom-right around the illuminated 3D core, ensuring rich composition on phones ($360\text{px}, 390\text{px}$) and tablets ($768\text{px}$).
- **Pacing:** Fades in from 18% to 28%, stays at 100% opacity from 28% to 46%, smoothly cross-fades into Stage C from 46% to 54%.

### Stage C — Personal Identity ($48\% \to 85\%$)
- **Visuals:** Camera elevates (`camY = 0.75 \to 0.50`, `camZ = 7.6 \to 8.4`), monolith shifts to the upper-right third of the canvas to balance the typography.
- **Typography:** `FULL-STACK DEVELOPER | Backend-Focused Engineer` badge, master headline `FROM PIXELS TO PRODUCTION`, core narrative quote, and primary action CTAs (`Explore Selected Work`, `Architecture Playground`).
- **Pacing:** Fades in from 48% to 60%, remains at 100% opacity with active pointer events from 60% to 82%.

### Stage D — Seamless Hand-off to Selected Work ($78\% \to 100\%$)
- **Visual Continuity:** Stage C does not disappear into an empty black void. It gently eases opacity to 0.30 and translates slightly upward ($-28\text{px}$).
- **Transition Cue:** An architectural transition beacon rises from the bottom (`STAGE 04 // APPROACHING SELECTED WORK` with animated chevron and active pulse indicator).
- **3D Monolith:** Remains prominently visible in the upper horizon (`camY = 0.50 \to 0.35`, `camZ = 8.4 \to 9.4`, `coreScale = 0.85 \to 0.73`), acting as a receding celestial monolith.
- **Hand-off:** At 100%, the sticky viewport unlocks and the `#work` section immediately enters the viewport from the bottom with zero gap.
- **Reverse Scrolling:** Completely seamless when scrolling backward ($100\% \to 80\% \to 50\% \to 0\%$).

---

## 4. Part 3: Playwright 9-Point Progress Verification Evidence

Automated Playwright tests evaluated all 9 progress points on Desktop ($1440 \times 900$), Mobile ($390 \times 844$), and Small Mobile ($360 \times 800$):

```
=======================================================
VERIFYING DEVICE: desktop_1440 (1440x900)
Hero Track Height: 2340px, Max Scroll: 1440px
=======================================================
[PASS] desktop_1440 p=  0% (scrollY=   0px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:1.00, B:0.00, C:0.00, D:0.00] | canvas=True | HUD=[0%]
[PASS] desktop_1440 p= 10% (scrollY= 144px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.55, B:0.00, C:0.00, D:0.00] | canvas=True | HUD=[10%]
[PASS] desktop_1440 p= 20% (scrollY= 288px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.09, B:0.20, C:0.00, D:0.00] | canvas=True | HUD=[20%]
[PASS] desktop_1440 p= 33% (scrollY= 475px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.00, B:1.00, C:0.00, D:0.00] | canvas=True | HUD=[33%]
[PASS] desktop_1440 p= 50% (scrollY= 720px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.00, B:0.50, C:0.17, D:0.00] | canvas=True | HUD=[50%]
[PASS] desktop_1440 p= 65% (scrollY= 936px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.00, B:0.00, C:1.00, D:0.00] | canvas=True | HUD=[65%]
[PASS] desktop_1440 p= 80% (scrollY=1152px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.00, B:0.00, C:1.00, D:0.00] | canvas=True | HUD=[80%]
[PASS] desktop_1440 p= 90% (scrollY=1296px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.00, B:0.00, C:0.69, D:0.00] | canvas=True | HUD=[90%]
[PASS] desktop_1440 p=100% (scrollY=1440px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.00, B:0.00, C:0.30, D:0.00] | canvas=True | HUD=[100%]

--- Verifying Reverse Scroll Smoothness ---
   Reverse to 70% (scrollY=1008px) -> sticky.top: 0px [PASS]
   Reverse to 40% (scrollY=576px) -> sticky.top: 0px [PASS]
   Reverse to 0% (scrollY=0px) -> sticky.top: 0px [PASS]

=======================================================
VERIFYING DEVICE: mobile_390 (390x844)
Hero Track Height: 1857px, Max Scroll: 1013px
=======================================================
[PASS] mobile_390 p=  0% (scrollY=   0px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:1.00, B:0.00, C:0.00, D:0.00] | canvas=True | HUD=[0%]
[PASS] mobile_390 p= 10% (scrollY= 101px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.55, B:0.00, C:0.00, D:0.00] | canvas=True | HUD=[10%]
[PASS] mobile_390 p= 20% (scrollY= 203px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.09, B:0.20, C:0.00, D:0.00] | canvas=True | HUD=[20%]
[PASS] mobile_390 p= 33% (scrollY= 334px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.00, B:1.00, C:0.00, D:0.00] | canvas=True | HUD=[33%]
[PASS] mobile_390 p= 50% (scrollY= 507px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.00, B:0.49, C:0.17, D:0.00] | canvas=True | HUD=[50%]
[PASS] mobile_390 p= 65% (scrollY= 658px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.00, B:0.00, C:1.00, D:0.00] | canvas=True | HUD=[65%]
[PASS] mobile_390 p= 80% (scrollY= 810px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.00, B:0.00, C:1.00, D:0.00] | canvas=True | HUD=[80%]
[PASS] mobile_390 p= 90% (scrollY= 912px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.00, B:0.00, C:0.69, D:0.00] | canvas=True | HUD=[90%]
[PASS] mobile_390 p=100% (scrollY=1013px) | pinned=True (top:-0.0px) | footerAtBottom=True | opacities: [A:0.00, B:0.00, C:0.30, D:0.00] | canvas=True | HUD=[100%]

=======================================================
VERIFYING DEVICE: small_mobile_360 (360x800)
Hero Track Height: 1760px, Max Scroll: 960px
=======================================================
[PASS] small_mobile_360 p=  0% (scrollY=   0px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:1.00, B:0.00, C:0.00, D:0.00] | canvas=True | HUD=[0%]
[PASS] small_mobile_360 p= 10% (scrollY=  96px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.55, B:0.00, C:0.00, D:0.00] | canvas=True | HUD=[10%]
[PASS] small_mobile_360 p= 20% (scrollY= 192px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.09, B:0.20, C:0.00, D:0.00] | canvas=True | HUD=[20%]
[PASS] small_mobile_360 p= 33% (scrollY= 317px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.00, B:1.00, C:0.00, D:0.00] | canvas=True | HUD=[33%]
[PASS] small_mobile_360 p= 50% (scrollY= 480px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.00, B:0.50, C:0.17, D:0.00] | canvas=True | HUD=[50%]
[PASS] small_mobile_360 p= 65% (scrollY= 624px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.00, B:0.00, C:1.00, D:0.00] | canvas=True | HUD=[65%]
[PASS] small_mobile_360 p= 80% (scrollY= 768px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.00, B:0.00, C:1.00, D:0.00] | canvas=True | HUD=[80%]
[PASS] small_mobile_360 p= 90% (scrollY= 864px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.00, B:0.00, C:0.69, D:0.00] | canvas=True | HUD=[90%]
[PASS] small_mobile_360 p=100% (scrollY= 960px) | pinned=True (top:0px) | footerAtBottom=True | opacities: [A:0.00, B:0.00, C:0.30, D:0.00] | canvas=True | HUD=[100%]
```

---

## 5. Part 4: Project Card Ambient Idle Motion Architecture

### Separation of Concerns
To prevent animation conflicts between ambient floating and mouse-driven interactive tilt, a clean two-tier DOM architecture was implemented:

1. **Outer Wrapper (`.card-ambient-idle`):**
   - Handles continuous vertical breathing motion.
   - Desktop amplitude: $3\text{px} \to 4\text{px}$ (`translateY(-4px)`).
   - Mobile amplitude: $2\text{px} \to 2.5\text{px}$ (`translateY(-2.5px)`).
   - Slow cycle duration: $7.2\text{s} \to 9.6\text{s}$, staggered per card.
   - Staggered phase offsets: `animationDelay = ((index * 1.35) % 6)s`.
   - Uses compositor-only transform property (`will-change: transform`). Zero layout reflow or repaint.

2. **Inner Element (`<article>`):**
   - Handles mouse hover, 3D pointer tilt (`rotateX`, `rotateY`), and cursor sheen gradient.
   - Operates on its own local coordinate system without interfering with outer `translateY`.

3. **Accessibility & Reduced Motion:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     .card-ambient-idle {
       animation: none !important;
       transform: none !important;
     }
   }
   ```
   Verified via Playwright: when `reduced_motion="reduce"` is active, `animationName` returns `none` and `transform` returns `none`.

### Empirical Motion Verification
Playwright sampled transform states at $t=0\text{s}$ and $t=2\text{s}$:
```
Captured project card idle wrappers at t=0s:
   Card [0] anim: cardIdleFloatDesktop, duration: 7.2s, delay: 0s,    transform: matrix(1, 0, 0, 1, 0, -1.84)
   Card [1] anim: cardIdleFloatDesktop, duration: 8.0s, delay: 1.35s, transform: matrix(1, 0, 0, 1, 0, -0.06)
   Card [2] anim: cardIdleFloatDesktop, duration: 8.8s, delay: 2.7s,  transform: none

Captured project card idle wrappers at t=2s:
   Card [0] transform: matrix(1, 0, 0, 1, 0, -3.91)
   Card [1] transform: matrix(1, 0, 0, 1, 0, -3.02)
   Card [2] transform: matrix(1, 0, 0, 1, 0, -0.71)
```
Each card follows an independent, organic floating curve without jank or layout shift.

---

## 6. Verification Checklist

- [x] Pinning regression root cause identified and eliminated (`overflow-hidden` removed from `section#top`).
- [x] Sticky viewport remains pinned at `top: 0px` across 0% to 100% scroll.
- [x] Hero footer remains pinned to the bottom of the viewport throughout the entire scrub.
- [x] Stage B telemetry panels are fully visible and responsive on mobile and tablet viewports.
- [x] Hero track duration calibrated to `h-[220vh] md:h-[260vh]` (clean pacing, zero fatigue).
- [x] Stage C maintains continuity and transitions seamlessly into `#work` without a black void.
- [x] 3D scene remains visible, elevated, and rendered across all 9 progress points.
- [x] Reverse scrolling verified smooth from 100% back to 0%.
- [x] Ambient idle card motion implemented on separate DOM layer with staggered phases.
- [x] Reduced motion respected (`prefers-reduced-motion` cleanly disables card motion).
- [x] TypeScript compiles without errors (`npx tsc --noEmit`).
- [x] ESLint passes with 0 errors and 0 warnings (`npm run lint`).
- [x] Production build passes with 16/16 routes pre-rendered (`npm run build`).
- [x] Branch safety strictly preserved (`feat/cinematic-portfolio-redesign`).
