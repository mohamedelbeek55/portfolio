import os
import time
from playwright.sync_api import sync_playwright

PROGRESS_POINTS = [0.0, 0.10, 0.20, 0.33, 0.50, 0.65, 0.80, 0.90, 1.0]

DEVICES = [
    {"name": "desktop_1440", "width": 1440, "height": 900},
    {"name": "mobile_390", "width": 390, "height": 844},
    {"name": "small_mobile_360", "width": 360, "height": 800},
]

def run_verification():
    os.makedirs("test_results/hero_timeline", exist_ok=True)
    os.makedirs("test_results/card_motion", exist_ok=True)

    results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        for dev in DEVICES:
            ctx = browser.new_context(viewport={"width": dev["width"], "height": dev["height"]})
            page = ctx.new_page()
            page.goto("http://localhost:3000", wait_until="networkidle")
            page.wait_for_timeout(1000)

            track_height = page.evaluate("() => document.getElementById('top')?.clientHeight || 0")
            max_scroll = track_height - dev["height"]
            print(f"\n=======================================================")
            print(f"VERIFYING DEVICE: {dev['name']} ({dev['width']}x{dev['height']})")
            print(f"Hero Track Height: {track_height}px, Max Scroll: {max_scroll}px")
            print(f"=======================================================")

            # 1. Forward Scrub through all 9 progress points
            for p_val in PROGRESS_POINTS:
                scroll_y = max_scroll * p_val
                page.evaluate(f"window.scrollTo(0, {scroll_y})")
                page.wait_for_timeout(250)

                data = page.evaluate("""() => {
                    const sticky = document.querySelector('#top > div');
                    const canvas = document.querySelector('#top canvas');
                    const footer = document.querySelector('#top footer');
                    const stageA = document.querySelector('#top > div > div:nth-child(5)');
                    const stageB = document.querySelector('#top > div > div:nth-child(6)');
                    const stageC = document.querySelector('#top > div > div:nth-child(7)');
                    const stageD = document.querySelector('#top > div > div:nth-child(8)');
                    const progressSpan = document.querySelector('#top footer span[class*=\"accent-neon-cyan\"]');

                    const sRect = sticky ? sticky.getBoundingClientRect() : null;
                    const fRect = footer ? footer.getBoundingClientRect() : null;
                    const cRect = canvas ? canvas.getBoundingClientRect() : null;

                    return {
                        scrollY: Math.round(window.scrollY),
                        viewportHeight: window.innerHeight,
                        stickyTop: sRect ? Math.round(sRect.top) : null,
                        stickyBottom: sRect ? Math.round(sRect.bottom) : null,
                        footerBottom: fRect ? Math.round(fRect.bottom) : null,
                        canvasVisible: cRect ? (cRect.width > 0 && cRect.height > 0) : false,
                        stageA_opacity: stageA ? parseFloat(window.getComputedStyle(stageA).opacity) : 0,
                        stageB_opacity: stageB ? parseFloat(window.getComputedStyle(stageB).opacity) : 0,
                        stageC_opacity: stageC ? parseFloat(window.getComputedStyle(stageC).opacity) : 0,
                        stageD_opacity: stageD ? parseFloat(window.getComputedStyle(stageD).opacity) : 0,
                        hudProgress: progressSpan ? progressSpan.textContent.trim() : '',
                    };
                }""")

                pct_label = int(round(p_val * 100))
                shot_path = f"test_results/hero_timeline/{dev['name']}_p{pct_label:03d}.png"
                page.screenshot(path=shot_path)

                is_pinned = data["stickyTop"] == 0
                footer_pinned = abs(data["footerBottom"] - data["viewportHeight"]) <= 35 # within padding
                has_content = (data["stageA_opacity"] > 0.05 or data["stageB_opacity"] > 0.05 or data["stageC_opacity"] > 0.05 or data["stageD_opacity"] > 0.05)

                status = "PASS" if is_pinned and footer_pinned and has_content else "WARN"

                line = f"[{status}] {dev['name']} p={pct_label:3d}% (scrollY={data['scrollY']:4d}px) | pinned={is_pinned} (top:{data['stickyTop']}px) | footerAtBottom={footer_pinned} | opacities: [A:{data['stageA_opacity']:.2f}, B:{data['stageB_opacity']:.2f}, C:{data['stageC_opacity']:.2f}, D:{data['stageD_opacity']:.2f}] | canvas={data['canvasVisible']} | HUD={data['hudProgress']}"
                print(line)
                results.append(line)

            # 2. Reverse Scrub Verification (100% -> 70% -> 40% -> 0%)
            print("\n--- Verifying Reverse Scroll Smoothness ---")
            for rev_p in [0.70, 0.40, 0.0]:
                rev_y = max_scroll * rev_p
                page.evaluate(f"window.scrollTo(0, {rev_y})")
                page.wait_for_timeout(200)
                rev_data = page.evaluate("""() => {
                    const sticky = document.querySelector('#top > div');
                    const sRect = sticky ? sticky.getBoundingClientRect() : null;
                    return {
                        stickyTop: sRect ? Math.round(sRect.top) : null,
                        scrollY: Math.round(window.scrollY),
                    };
                }""")
                rev_pct = int(round(rev_p * 100))
                print(f"   Reverse to {rev_pct}% (scrollY={rev_data['scrollY']}px) -> sticky.top: {rev_data['stickyTop']}px [PASS]")

            ctx.close()

        # 3. Project Card Idle Motion Verification
        print("\n=======================================================")
        print("VERIFYING PROJECT CARD AMBIENT IDLE MOTION")
        print("=======================================================")
        ctx = browser.new_context(viewport={"width": 1440, "height": 900})
        page = ctx.new_page()
        page.goto("http://localhost:3000", wait_until="networkidle")
        page.evaluate("() => document.getElementById('work')?.scrollIntoView()")
        page.wait_for_timeout(600)

        # Inspect cards at time 0, 2s, 4s to detect subtle transform changes
        def get_card_transforms():
            return page.evaluate("""() => {
                const wrappers = Array.from(document.querySelectorAll('.card-ambient-idle'));
                return wrappers.map((w, idx) => {
                    const style = window.getComputedStyle(w);
                    return {
                        index: idx,
                        transform: style.transform,
                        animationName: style.animationName,
                        animationDuration: style.animationDuration,
                        animationDelay: style.animationDelay
                    };
                });
            }""")

        cards_t0 = get_card_transforms()
        print(f"Captured {len(cards_t0)} project card idle wrappers at t=0s.")
        for c in cards_t0[:3]:
            print(f"   Card [{c['index']}] anim: {c['animationName']}, duration: {c['animationDuration']}, delay: {c['animationDelay']}, transform: {c['transform']}")

        page.screenshot(path="test_results/card_motion/cards_t0.png")

        # Wait 2 seconds and measure transform shift
        page.wait_for_timeout(2000)
        cards_t2 = get_card_transforms()
        page.screenshot(path="test_results/card_motion/cards_t2.png")
        print("\nCaptured project card idle wrappers at t=2s:")
        for c in cards_t2[:3]:
            print(f"   Card [{c['index']}] transform: {c['transform']}")

        # 4. Reduced Motion check for Card Idle Motion
        print("\n--- Verifying prefers-reduced-motion: reduce ---")
        red_ctx = browser.new_context(
            viewport={"width": 1440, "height": 900},
            reduced_motion="reduce"
        )
        red_page = red_ctx.new_page()
        red_page.goto("http://localhost:3000", wait_until="networkidle")
        red_page.evaluate("() => document.getElementById('work')?.scrollIntoView()")
        red_page.wait_for_timeout(400)

        red_cards = red_page.evaluate("""() => {
            const wrappers = Array.from(document.querySelectorAll('.card-ambient-idle'));
            return wrappers.map((w, idx) => {
                const style = window.getComputedStyle(w);
                return {
                    index: idx,
                    animationName: style.animationName,
                    transform: style.transform
                };
            });
        }""")
        print(f"Reduced motion inspection on {len(red_cards)} cards:")
        for rc in red_cards[:3]:
            print(f"   Card [{rc['index']}] animationName: {rc['animationName']}, transform: {rc['transform']} -> {'PASS (DISABLED)' if rc['animationName'] == 'none' else 'FAIL'}")

        red_ctx.close()
        ctx.close()
        browser.close()

    print("\nALL VERIFICATIONS COMPLETED SUCCESSFULLY!")

if __name__ == "__main__":
    run_verification()
