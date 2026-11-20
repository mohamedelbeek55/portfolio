import sys
import os
import time
from playwright.sync_api import sync_playwright

VIEWPORTS = [
    {"name": "phone_320_se1", "width": 320, "height": 568},
    {"name": "phone_360_android", "width": 360, "height": 800},
    {"name": "phone_375_se2", "width": 375, "height": 667},
    {"name": "phone_390_iphone13", "width": 390, "height": 844},
    {"name": "phone_393_iphone15", "width": 393, "height": 852},
    {"name": "phone_414_xr", "width": 414, "height": 896},
    {"name": "phone_430_promax", "width": 430, "height": 932},
    {"name": "tablet_768_portrait", "width": 768, "height": 1024},
    {"name": "tablet_820_air", "width": 820, "height": 1180},
    {"name": "tablet_1024_landscape", "width": 1024, "height": 768},
    {"name": "desktop_1280", "width": 1280, "height": 800},
    {"name": "desktop_1440", "width": 1440, "height": 900},
    {"name": "landscape_844_phone", "width": 844, "height": 390},
]

ROUTES = [
    "/",
    "/projects/ecommerce",
    "/projects/lexaguide",
    "/projects/company-system",
    "/projects/sakan-alarish",
    "/projects/minimal-be-creative",
    "/projects/tech-ecommerce",
]

def check_overflow(page, vp_name, route_path):
    overflow_elements = page.evaluate("""() => {
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const issues = [];
        if (scrollWidth > docWidth + 1) { // 1px threshold for rounding
            const allElements = document.querySelectorAll('*');
            for (const el of allElements) {
                const rect = el.getBoundingClientRect();
                if (rect.right > docWidth + 1.5) {
                    const tag = el.tagName.toLowerCase();
                    const id = el.id ? '#' + el.id : '';
                    const cls = el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).slice(0, 3).join('.') : '';
                    issues.push({
                        selector: `${tag}${id}${cls}`,
                        right: Math.round(rect.right),
                        width: Math.round(rect.width),
                        docWidth: docWidth,
                        overflowBy: Math.round(rect.right - docWidth)
                    });
                }
            }
        }
        return {
            hasOverflow: scrollWidth > docWidth + 1,
            docWidth: docWidth,
            scrollWidth: scrollWidth,
            offenders: issues.slice(0, 10)
        };
    }""")
    return overflow_elements

def run_audit():
    os.makedirs("test_results/screenshots", exist_ok=True)
    report = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        # 1. Test Overflow across all viewports for Homepage and Case Study
        print("=== STAGE 1: OVERFLOW AUDIT ACROSS VIEWPORTS ===")
        for vp in VIEWPORTS:
            context = browser.new_context(viewport={"width": vp["width"], "height": vp["height"]})
            page = context.new_page()
            
            console_errors = []
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
            
            for route in ["/", "/projects/ecommerce"]:
                url = f"http://localhost:3000{route}"
                try:
                    page.goto(url, wait_until="domcontentloaded")
                    page.wait_for_timeout(1000) # allow hydration and layout
                    
                    overflow = check_overflow(page, vp["name"], route)
                    status = "FAIL (OVERFLOW)" if overflow["hasOverflow"] else "PASS"
                    msg = f"[{vp['name']} {vp['width']}x{vp['height']}] Route: {route} -> {status} (docWidth: {overflow['docWidth']}, scrollWidth: {overflow['scrollWidth']})"
                    print(msg)
                    report.append(msg)
                    
                    if overflow["hasOverflow"]:
                        for off in overflow["offenders"]:
                            off_msg = f"   -> Offender: {off['selector']} (right: {off['right']}, width: {off['width']}, overflowBy: {off['overflowBy']}px)"
                            print(off_msg)
                            report.append(off_msg)
                            
                    # Take screenshot at 320, 390, 768, 1440
                    if vp["width"] in [320, 390, 768, 1440]:
                        safe_route = route.replace("/", "_").strip("_") or "home"
                        shot_path = f"test_results/screenshots/{vp['name']}_{safe_route}.png"
                        page.screenshot(path=shot_path, full_page=False)
                        
                except Exception as e:
                    print(f"Error testing {vp['name']} on {route}: {e}")
            context.close()
            
        # 2. Interactive Components Testing on Mobile (390x844)
        print("\n=== STAGE 2: INTERACTIVE COMPONENT AUDIT (390x844) ===")
        context = browser.new_context(
            viewport={"width": 390, "height": 844},
            is_mobile=True,
            has_touch=True
        )
        page = context.new_page()
        page.goto("http://localhost:3000", wait_until="networkidle")
        page.wait_for_timeout(1000)
        
        # A. Mobile Menu
        print("Testing Mobile Menu Navigation Drawer...")
        menu_button = page.locator("button[aria-label*='navigation menu'], button[aria-label*='navigation drawer']")
        if menu_button.count() > 0:
            menu_button.first.click()
            page.wait_for_timeout(400)
            menu_open_shot = "test_results/screenshots/mobile_menu_open.png"
            page.screenshot(path=menu_open_shot)
            
            # Check links exist
            links = page.locator("nav a, [role='dialog'] a").all()
            print(f"   Mobile menu opened, found {len(links)} links.")
            
            # Close via escape
            page.keyboard.press("Escape")
            page.wait_for_timeout(400)
            print("   Closed menu via Escape key.")
        else:
            print("   WARNING: Mobile menu button not found!")
            
        # B. Project Preview Modal on Mobile
        print("Testing Project Preview Modal...")
        page.evaluate("window.scrollTo(0, 1800)")
        page.wait_for_timeout(600)
        preview_btns = page.locator("button[aria-label*='Preview']")
        if preview_btns.count() > 0:
            preview_btns.first.click()
            page.wait_for_timeout(500)
            modal_shot = "test_results/screenshots/mobile_modal_preview.png"
            page.screenshot(path=modal_shot)
            
            # Check modal bounds and overflow
            modal_bounds = page.evaluate("""() => {
                const modal = document.querySelector('[role=\"dialog\"]');
                if (!modal) return null;
                const rect = modal.getBoundingClientRect();
                return {
                    width: rect.width,
                    height: rect.height,
                    top: rect.top,
                    left: rect.left,
                    viewportWidth: window.innerWidth,
                    viewportHeight: window.innerHeight,
                    overflowsX: rect.right > window.innerWidth,
                    overflowsY: rect.bottom > window.innerHeight
                };
            }""")
            print(f"   Modal bounds: {modal_bounds}")
            
            # Close modal via close button
            close_btn = page.locator("button[aria-label*='Close']")
            if close_btn.count() > 0:
                close_btn.first.click()
                page.wait_for_timeout(400)
                print("   Closed preview modal.")
            else:
                page.keyboard.press("Escape")
                page.wait_for_timeout(400)
                print("   Closed preview modal via Escape.")
        else:
            print("   WARNING: Project preview button not found!")
            
        # C. Technical Toolkit Filters & Node Selection on Mobile
        print("Testing Technical Toolkit on Mobile...")
        page.evaluate("() => document.getElementById('expertise')?.scrollIntoView()")
        page.wait_for_timeout(600)
        
        # Click a category tab
        cat_btn = page.locator("#expertise button:has-text('Databases')")
        if cat_btn.count() > 0:
            cat_btn.click()
            page.wait_for_timeout(300)
            print("   Clicked 'Databases' category filter.")
            
        # Click a tech node card
        tech_node = page.locator("#expertise button:has-text('PostgreSQL')").first
        if tech_node.count() > 0:
            tech_node.click()
            page.wait_for_timeout(300)
            print("   Selected 'PostgreSQL' node card.")
        page.screenshot(path="test_results/screenshots/mobile_toolkit.png")
        
        # D. Architecture Playground on Mobile
        print("Testing Architecture Playground on Mobile...")
        page.evaluate("() => document.getElementById('engineering')?.scrollIntoView()")
        page.wait_for_timeout(600)
        
        # Test simulation button
        sim_btn = page.locator("#engineering button:has-text('Simulate Request Flow')")
        if sim_btn.count() > 0:
            sim_btn.click()
            page.wait_for_timeout(1000)
            print("   Triggered 'Simulate Request Flow' animation.")
            
        # Test tab switch
        tab_btn = page.locator("#engineering button:has-text('Layer Inspector')")
        if tab_btn.count() > 0:
            tab_btn.click()
            page.wait_for_timeout(400)
            print("   Switched to Layer Inspector tab.")
        page.screenshot(path="test_results/screenshots/mobile_playground.png")
        
        # E. Contact Section Copy Email on Mobile
        print("Testing Contact Section on Mobile...")
        page.evaluate("() => document.getElementById('contact')?.scrollIntoView()")
        page.wait_for_timeout(600)
        copy_btn = page.locator("#contact button[aria-label*='Copy email']")
        if copy_btn.count() > 0:
            copy_btn.click()
            page.wait_for_timeout(400)
            print("   Clicked 'Copy Email' button on mobile.")
        page.screenshot(path="test_results/screenshots/mobile_contact.png")
        
        context.close()
        browser.close()

if __name__ == "__main__":
    run_audit()
