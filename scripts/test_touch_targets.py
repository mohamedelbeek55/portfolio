from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 390, "height": 844})
    page = ctx.new_page()
    page.goto("http://localhost:3000", wait_until="networkidle")
    
    # Check all key buttons on mobile
    controls = page.evaluate("""() => {
        const els = Array.from(document.querySelectorAll('button, a.min-h-\\\\[44px\\\\], a[href^=\"mailto\"], a[download]'));
        return els.map(b => {
            const r = b.getBoundingClientRect();
            return {
                text: (b.innerText || b.getAttribute('aria-label') || '').slice(0, 35).replace(/\\n/g, ' ').trim(),
                w: Math.round(r.width),
                h: Math.round(r.height),
                visible: r.width > 0 && r.height > 0
            };
        }).filter(b => b.visible);
    }""")
    print(f"Total key mobile controls inspected: {len(controls)}")
    for c in controls:
        target_pass = "PASS" if c["h"] >= 40 else "WARN"
        print(f"[{target_pass}] '{c['text']}' -> {c['w']}x{c['h']}px")
    ctx.close()
    browser.close()
