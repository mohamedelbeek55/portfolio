# Mohamed Elbeek — Backend Developer Portfolio

A production-quality, dark editorial and engineering-focused personal portfolio website for **Mohamed Elbeek**, Backend Developer. Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lucide icons.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS v4 (Custom Dark Editorial Design System)
- **Animation**: Framer Motion (respects `prefers-reduced-motion`)
- **Icons**: Lucide React
- **Typography**: Newsreader (Editorial Serif), Inter (Sans), JetBrains Mono (Technical Labels) via `next/font/google`
- **SEO & Social**: Dynamic Open Graph / Twitter image generation via `next/og`, `robots.txt`, `sitemap.xml`, and Schema.org JSON-LD `Person` markup
- **Target Deployment**: Vercel

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js 18+ and npm installed.

```bash
node -v
npm -v
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

### 5. Run Lint Check
```bash
npm run lint
```

---

## ✍️ How to Edit Content

All portfolio copy, project details, and technical notes are isolated in typed configuration files so you can modify text without editing React components:

1. **Home Page & General Profile Content**:
   - File: [`src/content/siteContent.ts`](file:///d:/My_Projects/portfolio/src/content/siteContent.ts)
   - Contains: Bio, contact info, headline, Selected Work descriptions, 8 backend perspective areas, architecture lifecycle stages, and technical toolkit categories.

2. **E-Commerce Case Study Content**:
   - File: [`src/content/ecommerceCaseStudy.ts`](file:///d:/My_Projects/portfolio/src/content/ecommerceCaseStudy.ts)
   - Contains: Clean Architecture walkthrough, concurrency analysis, Stripe payment flow, testing matrix, and future improvements.

---

## 🖼 Where to Add Real Screenshots & Diagrams

When real screenshots or higher-resolution architecture diagrams are ready, place them in:
```
/public/projects/
```
Example files:
- `/public/projects/ecommerce-architecture.png`
- `/public/projects/concurrency-race-test.png`
- `/public/projects/lexaguide-schema.png`

---

## 📄 Updating the Curriculum Vitae (CV)

The portfolio directly serves the CV from the public folder. To update it:
1. Export your finalized PDF as `Mohamed_Elbeek_CV.pdf`.
2. Replace the file at:
   ```
   /public/Mohamed_Elbeek_CV.pdf
   ```
All download buttons across the Hero, Navigation, About, and Contact sections link directly to this file.

---

## 🌐 How to Deploy to Vercel

1. Push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete portfolio phases 1, 2, and 3"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **Add New Project** and import `portfolio`.
4. Vercel automatically detects Next.js. Keep default settings:
   - Framework Preset: **Next.js**
   - Build Command: `next build`
   - Output Directory: `.next`
5. Click **Deploy**. Your site will be live on an HTTPS `.vercel.app` URL or your custom domain.

---

## 📝 List of `[TODO]` Placeholders for Mohamed

To finalize all personal details, check these placeholders:

1. **E-Commerce Motivation**:
   - `src/content/ecommerceCaseStudy.ts` → `meta.whyBuiltPlaceholder`
   - *Placeholder*: `[TODO: Mohamed to fill in — one sentence on why you chose to build this project.]`
2. **Architecture Module Example**:
   - `src/content/ecommerceCaseStudy.ts` → `architecture.moduleExamplePlaceholder`
   - *Placeholder*: `[TODO: Mohamed to fill in — optional: one concrete example of a module and how its layers look.]`
3. **Token Rotation Mechanics**:
   - `src/content/ecommerceCaseStudy.ts` → `security.rotationPlaceholder`
   - *Placeholder*: `[TODO: Mohamed to fill in — one or two sentences on how rotation works in your implementation (what happens when an old refresh token is reused).]`
4. **Concurrency Test**:
   - `src/content/ecommerceCaseStudy.ts` → `concurrency.placeholderTest`
   - *Placeholder*: `[TODO: Mohamed to fill in — optional: whether you have a concurrency test for this, and what it does.]`
5. **Webhook State Transitions**:
   - `src/content/ecommerceCaseStudy.ts` → `payments.webhookStatePlaceholder`
   - *Placeholder*: `[TODO: Mohamed to fill in — optional: how order status changes based on webhook events.]`
6. **Future Improvements Reflection**:
   - `src/content/ecommerceCaseStudy.ts` → `reflection.placeholderImprovements`
   - *Placeholder*: `[TODO: Mohamed to fill in — 2 or 3 honest items. Honest reflection reads as more credible than a perfect story.]`

