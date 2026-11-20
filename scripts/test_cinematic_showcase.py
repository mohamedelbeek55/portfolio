import os
import sys
import time
from playwright.sync_api import sync_playwright

OUTPUT_DIR = "test_results/cinematic_showcase"
os.makedirs(OUTPUT_DIR, exist_ok=True)

VIEWPORTS = [
    {"name": "desktop_1440", "width": 1440, "height": 900, "has_touch": False},
    {"name": "desktop_1024", "width": 1024, "height": 768, "has_touch": False},
    {"name": "tablet_768",   "width": 768,  "height": 1024, "has_touch": True},
    {"name": "phone_430",    "width": 430,  "height": 932,  "has_touch": True},
    {"name": "phone_390",    "width": 390,  "height": 844,  "has_touch": True},
    {"name": "phone_360",    "width": 360,  "height": 800,  "has_touch": True},
    {"name": "phone_320",    "width": 320,  "height": 568,  "has_touch": True},
]

def run_tests():
    results = {}
    console_errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # ─────────────────────────────────────────────────────────────────────
        # PART 1: DESKTOP CUSTOM CURSOR & HOVER INTERACTIONS (1440x900)
        # ─────────────────────────────────────────────────────────────────────
        print("\n--- 1. Testing Desktop Custom Cursor (1440x900) ---")
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            has_touch=False,
        )
        page = context.new_page()
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        page.goto("http://localhost:3000", wait_until="networkidle")
        time.sleep(1.0)

        # Move mouse to (500, 400)
        page.mouse.move(500, 400)
        time.sleep(0.3)

        cursor_data = page.evaluate("""() => {
            const dot = document.querySelector('.pointer-events-none .bg-\\\\[var\\\\(--accent-neon-cyan\\\\,\\\\#38bdf8\\\\)\\\\]');
            const ring = document.querySelector('.pointer-events-none .border-\\\\[var\\\\(--accent-neon-cyan\\\\,\\\\#38bdf8\\\\)\\\\]\\\\/65');
            const label = ring ? ring.querySelector('span') : null;
            return {
                dotExists: !!dot,
                ringExists: !!ring,
                dotOpacity: dot ? window.getComputedStyle(dot).opacity : null,
                dotTransform: dot ? dot.style.transform : null,
                ringTransform: ring ? ring.style.transform : null,
                ringWidth: ring ? window.getComputedStyle(ring).width : null,
                labelText: label ? label.textContent : null,
                pointerEvents: ring ? window.getComputedStyle(ring).pointerEvents : null
            };
        }""")
        print(f"Default Cursor State: {cursor_data}")
        results["desktop_cursor_default"] = cursor_data

        # Hover over Project Visual Preview (data-cursor="view")
        page.locator('#work [data-cursor="view"]').first.scroll_into_view_if_needed()
        time.sleep(0.5)
        preview_box = page.locator('#work [data-cursor="view"]').first.bounding_box()
        if preview_box:
            page.mouse.move(preview_box["x"] + preview_box["width"] / 2, preview_box["y"] + preview_box["height"] / 2)
            time.sleep(0.4)

            hover_data = page.evaluate("""() => {
                const ring = document.querySelector('.pointer-events-none .border-\\\\[var\\\\(--accent-neon-cyan\\\\,\\\\#38bdf8\\\\)\\\\]\\\\/65') ||
                             document.querySelector('.pointer-events-none [class*="border"]');
                const label = ring ? ring.querySelector('span') : null;
                return {
                    ringWidth: ring ? ring.style.width || window.getComputedStyle(ring).width : null,
                    labelText: label ? label.textContent : null,
                    labelOpacity: label ? window.getComputedStyle(label).opacity : null
                };
            }""")
            print(f"Cursor Hover Preview State: {hover_data}")
            results["desktop_cursor_hover_preview"] = hover_data

        page.screenshot(path=f"{OUTPUT_DIR}/desktop_cursor_preview_hover.png")

        # Verify clicking works through the cursor
        preview_btn = page.locator('#work button[aria-label*="Expand preview"]').first
        preview_btn.click()
        time.sleep(0.5)
        modal_open = page.locator('[role="dialog"]').is_visible()
        print(f"Preview Modal Opened via Click: {modal_open}")
        results["modal_opened_via_click"] = modal_open
        page.screenshot(path=f"{OUTPUT_DIR}/modal_open_test.png")

        # Close modal
        page.keyboard.press("Escape")
        time.sleep(0.4)
        modal_closed = not page.locator('[role="dialog"]').is_visible()
        print(f"Preview Modal Closed via Escape: {modal_closed}")
        results["modal_closed_via_escape"] = modal_closed

        context.close()

        # ─────────────────────────────────────────────────────────────────────
        # PART 2: MOBILE TOUCH FOLLOWER (390x844)
        # ─────────────────────────────────────────────────────────────────────
        print("\n--- 2. Testing Mobile Touch Follower (390x844) ---")
        mobile_context = browser.new_context(
            viewport={"width": 390, "height": 844},
            has_touch=True,
            is_mobile=True,
        )
        mobile_page = mobile_context.new_page()
        mobile_page.goto("http://localhost:3000", wait_until="networkidle")
        time.sleep(1.0)

        # Dispatch touchstart
        touch_start_res = mobile_page.evaluate("""() => {
            const touch = new Touch({
                identifier: 1,
                target: document.body,
                clientX: 200,
                clientY: 400
            });
            const event = new TouchEvent('touchstart', {
                bubbles: true,
                cancelable: true,
                touches: [touch],
                targetTouches: [touch],
                changedTouches: [touch]
            });
            window.dispatchEvent(event);

            const dot = document.querySelector('.pointer-events-none .w-2.h-2.rounded-full');
            const ring = document.querySelector('.pointer-events-none .w-7.h-7.rounded-full');
            const ripple = document.querySelector('.pointer-events-none .w-8.h-8.rounded-full');

            return {
                dotOpacity: dot ? window.getComputedStyle(dot).opacity : null,
                ringOpacity: ring ? window.getComputedStyle(ring).opacity : null,
                rippleOpacity: ripple ? window.getComputedStyle(ripple).opacity : null,
                dotTransform: dot ? dot.style.transform : null,
                ringTransform: ring ? ring.style.transform : null,
            };
        }""")
        print(f"Mobile Touchstart State: {touch_start_res}")
        results["mobile_touch_start"] = touch_start_res

        # Dispatch touchmove
        touch_move_res = mobile_page.evaluate("""() => {
            const touch = new Touch({
                identifier: 1,
                target: document.body,
                clientX: 200,
                clientY: 320
            });
            const event = new TouchEvent('touchmove', {
                bubbles: true,
                cancelable: true,
                touches: [touch],
                targetTouches: [touch],
                changedTouches: [touch]
            });
            window.dispatchEvent(event);

            const dot = document.querySelector('.pointer-events-none .w-2.h-2.rounded-full');
            return {
                dotTransform: dot ? dot.style.transform : null,
            };
        }""")
        print(f"Mobile Touchmove State: {touch_move_res}")
        results["mobile_touch_move"] = touch_move_res

        # Dispatch touchend
        touch_end_res = mobile_page.evaluate("""() => {
            const touch = new Touch({
                identifier: 1,
                target: document.body,
                clientX: 200,
                clientY: 320
            });
            const event = new TouchEvent('touchend', {
                bubbles: true,
                cancelable: true,
                touches: [],
                targetTouches: [],
                changedTouches: [touch]
            });
            window.dispatchEvent(event);

            const dot = document.querySelector('.pointer-events-none .w-2.h-2.rounded-full');
            const ring = document.querySelector('.pointer-events-none .w-7.h-7.rounded-full');
            return {
                dotOpacityImmediately: dot ? window.getComputedStyle(dot).opacity : null,
                ringOpacityImmediately: ring ? window.getComputedStyle(ring).opacity : null,
            };
        }""")
        print(f"Mobile Touchend State: {touch_end_res}")
        results["mobile_touch_end"] = touch_end_res

        mobile_context.close()

        # ─────────────────────────────────────────────────────────────────────
        # PART 3: SEQUENTIAL STACKED CARDS ON DESKTOP (1440x900)
        # ─────────────────────────────────────────────────────────────────────
        print("\n--- 3. Testing Desktop Sequential Stacking (1440x900) ---")
        stack_context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            has_touch=False,
        )
        stack_page = stack_context.new_page()
        stack_page.goto("http://localhost:3000", wait_until="networkidle")
        time.sleep(1.0)

        # Scroll to top of #work
        work_top = stack_page.evaluate("""() => {
            const work = document.getElementById('work');
            return work ? work.getBoundingClientRect().top + window.scrollY : 0;
        }""")
        stack_page.evaluate(f"window.scrollTo({{ top: {work_top}, behavior: 'instant' }})")
        time.sleep(1.0)

        # Measure 6 cards
        card_count = stack_page.locator('#work [data-project-index]').count()
        print(f"Cataloged Projects Rendered: {card_count}")
        results["card_count"] = card_count

        # Capture initial state of Card 01
        card0_initial = stack_page.evaluate("""() => {
            const card = document.querySelector('#work [data-stack-card="0"]');
            return {
                title: card ? card.querySelector('h3').textContent.trim() : null,
                opacity: card ? window.getComputedStyle(card).opacity : null,
                transform: card ? window.getComputedStyle(card).transform : null
            };
        }""")
        print(f"Card 01 Initial: {card0_initial}")
        results["card0_initial"] = card0_initial
        stack_page.screenshot(path=f"{OUTPUT_DIR}/desktop_stack_card01.png")

        # Scroll so Card 02 reaches near top (approx 120px) to stack over Card 01
        card1_top = stack_page.evaluate("""() => {
            const card1 = document.querySelector('#work [data-stack-card="1"]');
            return card1 ? card1.getBoundingClientRect().top + window.scrollY - 130 : 0;
        }""")
        stack_page.evaluate(f"window.scrollTo({{ top: {card1_top}, behavior: 'instant' }})")
        time.sleep(0.8)

        card0_after_card1_scroll = stack_page.evaluate("""() => {
            const card0 = document.querySelector('#work [data-stack-card="0"]');
            const card1 = document.querySelector('#work [data-stack-card="1"]');
            return {
                card0Opacity: card0 ? window.getComputedStyle(card0).opacity : null,
                card0Transform: card0 ? window.getComputedStyle(card0).transform : null,
                card0Filter: card0 ? window.getComputedStyle(card0).filter : null,
                card1Opacity: card1 ? window.getComputedStyle(card1).opacity : null,
                card1Transform: card1 ? window.getComputedStyle(card1).transform : null
            };
        }""")
        print(f"Cards Depth Transition (Card 02 active): {card0_after_card1_scroll}")
        results["card_depth_transition"] = card0_after_card1_scroll
        stack_page.screenshot(path=f"{OUTPUT_DIR}/desktop_stack_card02.png")

        # Scroll to Card 03 (Ahmed Elbeek System)
        stack_page.locator('#work [data-stack-card="2"]').scroll_into_view_if_needed()
        time.sleep(0.5)
        stack_page.screenshot(path=f"{OUTPUT_DIR}/desktop_stack_card03.png")

        # Scroll to Card 06 (Tech E-Commerce Archive)
        stack_page.locator('#work [data-stack-card="5"]').scroll_into_view_if_needed()
        time.sleep(0.5)
        stack_page.screenshot(path=f"{OUTPUT_DIR}/desktop_stack_card06.png")

        # Reverse Scroll: scroll back to top of #work where Card 01 is fully active
        work_top = stack_page.evaluate("""() => {
            const work = document.getElementById('work');
            return work ? work.getBoundingClientRect().top + window.scrollY : 0;
        }""")
        stack_page.evaluate(f"window.scrollTo({{ top: {work_top}, behavior: 'instant' }})")
        time.sleep(1.0)
        card0_reversed = stack_page.evaluate("""() => {
            const card = document.querySelector('#work [data-stack-card="0"]');
            return {
                opacity: card ? window.getComputedStyle(card).opacity : null,
                transform: card ? window.getComputedStyle(card).transform : null
            };
        }""")
        print(f"Card 01 Reversed State: {card0_reversed}")
        results["card0_reversed"] = card0_reversed

        stack_context.close()

        # ─────────────────────────────────────────────────────────────────────
        # PART 4: RESPONSIVE MULTI-DEVICE VIEWPORT SWEEP (7 VIEWPORTS)
        # ─────────────────────────────────────────────────────────────────────
        print("\n--- 4. Multi-Device Viewport Sweep (7 Viewports) ---")
        for vp in VIEWPORTS:
            name = vp["name"]
            w = vp["width"]
            h = vp["height"]
            touch = vp["has_touch"]

            vp_ctx = browser.new_context(
                viewport={"width": w, "height": h},
                has_touch=touch,
                is_mobile=touch,
            )
            vp_page = vp_ctx.new_page()
            vp_page.goto("http://localhost:3000", wait_until="networkidle")
            time.sleep(0.6)

            # Scroll to #work
            vp_page.locator("#work").scroll_into_view_if_needed()
            time.sleep(0.4)

            # Measure layout metrics & overflow
            metrics = vp_page.evaluate("""() => {
                const work = document.getElementById('work');
                const cards = document.querySelectorAll('#work [data-project-index]');
                const docWidth = document.documentElement.scrollWidth;
                const winWidth = window.innerWidth;
                const hasOverflow = docWidth > winWidth + 1;

                // Inspect sticky property on cards
                const firstCardSticky = cards[0] ? window.getComputedStyle(cards[0].parentElement).position : null;

                return {
                    docWidth,
                    winWidth,
                    hasOverflow,
                    cardCount: cards.length,
                    firstCardSticky
                };
            }""")
            print(f"Viewport [{name}] ({w}x{h}): {metrics}")
            results[f"vp_{name}"] = metrics

            # Capture screenshot of work section
            vp_page.screenshot(path=f"{OUTPUT_DIR}/{name}_work_section.png")
            vp_ctx.close()

        # ─────────────────────────────────────────────────────────────────────
        # PART 5: REDUCED MOTION TESTING
        # ─────────────────────────────────────────────────────────────────────
        print("\n--- 5. Testing prefers-reduced-motion ---")
        rm_ctx = browser.new_context(
            viewport={"width": 1440, "height": 900},
            reduced_motion="reduce",
        )
        rm_page = rm_ctx.new_page()
        rm_page.goto("http://localhost:3000", wait_until="networkidle")
        time.sleep(0.8)

        rm_page.mouse.move(300, 300)
        time.sleep(0.3)

        rm_data = rm_page.evaluate("""() => {
            const dot = document.querySelector('.pointer-events-none .w-1\\\\.5');
            const ring = document.querySelector('.pointer-events-none .border-\\\\[var\\\\(--accent-neon-cyan\\\\,\\\\#38bdf8\\\\)\\\\]\\\\/65');
            return {
                dotOpacity: dot ? window.getComputedStyle(dot).opacity : null,
                ringOpacity: ring ? window.getComputedStyle(ring).opacity : null,
            };
        }""")
        print(f"Reduced Motion State: {rm_data}")
        results["reduced_motion"] = rm_data
        rm_ctx.close()

        browser.close()

    print("\n--- ALL TESTS COMPLETED SUCCESSFULLY ---")
    return results

if __name__ == "__main__":
    run_tests()
