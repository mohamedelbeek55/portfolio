import os
from playwright.sync_api import sync_playwright

PROGRESS_POINTS = [0.0, 0.10, 0.20, 0.33, 0.50, 0.65, 0.80, 0.90, 1.0]

DEVICES = [
    {"name": "desktop_1440", "width": 1440, "height": 900},
    {"name": "mobile_390", "width": 390, "height": 844},
    {"name": "small_mobile_360", "width": 360, "height": 800},
]

def capture_states():
    os.makedirs("test_results/hero_timeline", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for dev in DEVICES:
            ctx = browser.new_context(viewport={"width": dev["width"], "height": dev["height"]})
            page = ctx.new_page()
            page.goto("http://localhost:3000", wait_until="networkidle")
            page.wait_for_timeout(1000)

            track_height = page.evaluate("() => document.getElementById('top')?.clientHeight || 0")
            max_scroll = track_height - dev["height"]

            print(f"\nTesting {dev['name']} (Track: {track_height}px, maxScroll: {max_scroll}px)")

            for p_val in PROGRESS_POINTS:
                scroll_y = max_scroll * p_val
                page.evaluate(f"window.scrollTo(0, {scroll_y})")
                page.wait_for_timeout(300)

                state = page.evaluate("""() => {
                    const sticky = document.querySelector('#top > div');
                    const sRect = sticky ? sticky.getBoundingClientRect() : null;
                    const stageA = document.querySelector('#top > div > div:nth-child(4)');
                    const stageB = document.querySelector('#top > div > div:nth-child(5)');
                    const stageC = document.querySelector('#top > div > div:nth-child(6)');
                    const progressText = document.querySelector('footer span[class*=\"accent-neon-cyan\"]')?.textContent;
                    const stageText = document.querySelector('header span[class*=\"accent-neon-cyan\"] > span')?.textContent;

                    return {
                        scrollY: Math.round(window.scrollY),
                        stickyTop: sRect ? Math.round(sRect.top) : null,
                        stickyBottom: sRect ? Math.round(sRect.bottom) : null,
                        stageA_opacity: stageA ? window.getComputedStyle(stageA).opacity : null,
                        stageB_opacity: stageB ? window.getComputedStyle(stageB).opacity : null,
                        stageC_opacity: stageC ? window.getComputedStyle(stageC).opacity : null,
                        progressText: progressText,
                        stageText: stageText,
                    };
                }""")

                pct_label = int(round(p_val * 100))
                filename = f"test_results/hero_timeline/{dev['name']}_p{pct_label:03d}.png"
                page.screenshot(path=filename)
                print(f"[{dev['name']} p={pct_label}% (scrollY={state['scrollY']}px)] -> stickyTop: {state['stickyTop']}px, stageA: {state['stageA_opacity']}, stageB: {state['stageB_opacity']}, stageC: {state['stageC_opacity']}, HUD: {state['progressText']} / {state['stageText']}")

            ctx.close()
        browser.close()

if __name__ == "__main__":
    capture_states()
