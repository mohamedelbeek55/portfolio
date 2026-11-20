from playwright.sync_api import sync_playwright

def investigate():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto("http://localhost:3000", wait_until="networkidle")
        page.wait_for_timeout(1000)

        # Inspect ancestors of sticky container
        ancestor_info = page.evaluate("""() => {
            const stickyEl = document.querySelector('#top > div');
            if (!stickyEl) return { error: 'Sticky element not found' };

            const ancestors = [];
            let curr = stickyEl.parentElement;
            while (curr && curr !== document.documentElement) {
                const style = window.getComputedStyle(curr);
                ancestors.push({
                    tagName: curr.tagName,
                    id: curr.id,
                    className: curr.className,
                    overflow: style.overflow,
                    overflowX: style.overflowX,
                    overflowY: style.overflowY,
                    position: style.position,
                    transform: style.transform,
                    contain: style.contain
                });
                curr = curr.parentElement;
            }

            const stickyStyle = window.getComputedStyle(stickyEl);

            return {
                stickyComputed: {
                    position: stickyStyle.position,
                    top: stickyStyle.top,
                    height: stickyStyle.height,
                    overflow: stickyStyle.overflow
                },
                ancestors: ancestors
            };
        }""")

        print("=== STICKY ELEMENT COMPUTED PROPERTIES ===")
        print(ancestor_info.get("stickyComputed"))
        print("\n=== ANCESTORS & OVERFLOW PROPERTIES ===")
        for a in ancestor_info.get("ancestors", []):
            print(f"[{a['tagName']}#{a['id']}.{a['className']}] overflow: {a['overflow']}, pos: {a['position']}, transform: {a['transform']}")

        # Now test bounding rect across scroll steps (0%, 25%, 33%, 50%, 75%, 100% of hero track)
        track_height = page.evaluate("() => document.getElementById('top')?.clientHeight || 0")
        vp_height = 900
        max_scroll = track_height - vp_height
        print(f"\nHero track total height: {track_height}px, maxScroll: {max_scroll}px")

        print("\n=== SCROLL STEPS & STICKY RECT INSPECTION ===")
        for pct in [0, 0.1, 0.2, 0.33, 0.5, 0.65, 0.8, 1.0]:
            scroll_target = max_scroll * pct
            page.evaluate(f"window.scrollTo(0, {scroll_target})")
            page.wait_for_timeout(150)

            rect = page.evaluate("""() => {
                const stickyEl = document.querySelector('#top > div');
                const track = document.getElementById('top');
                const sRect = stickyEl.getBoundingClientRect();
                const tRect = track.getBoundingClientRect();
                return {
                    scrollY: window.scrollY,
                    stickyTop: Math.round(sRect.top),
                    stickyBottom: Math.round(sRect.bottom),
                    stickyHeight: Math.round(sRect.height),
                    trackTop: Math.round(tRect.top),
                    trackBottom: Math.round(tRect.bottom),
                };
            }""")
            print(f"Scroll {pct*100:5.1f}% (scrollY={rect['scrollY']:5.0f}px) -> sticky.top: {rect['stickyTop']}px, sticky.bottom: {rect['stickyBottom']}px (track.top: {rect['trackTop']}px, track.bottom: {rect['trackBottom']}px)")

        browser.close()

if __name__ == "__main__":
    investigate()
