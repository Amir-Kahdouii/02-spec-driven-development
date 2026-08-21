# Spec-Driven Development (SDD) — Presentation Slides

[![Deploy Slides to GitHub Pages](https://github.com/Amir-Kahdouii/02-spec-driven-development/actions/workflows/deploy.yml/badge.svg)](https://github.com/Amir-Kahdouii/02-spec-driven-development/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-teal)](https://amir-kahdouii.github.io/02-spec-driven-development/)

A modern, interactive presentation deck explaining **Spec-Driven Development (SDD)** — a structured methodology for software engineering with AI agents, bridging the gap between "vibe coding" and disciplined software delivery.

🔗 **[View Live Presentation](https://amir-kahdouii.github.io/02-spec-driven-development/)**

---

## 📌 Presentation Overview

The presentation is divided into three core modules:

1. **01 — Vibe Coding**
   - The rise of prompt-driven coding & instant prototyping
   - Common pitfalls: chaotic feedback loops, regression risks, and non-deterministic logic
2. **02 — The SDLC (Software Development Life Cycle)**
   - Classical software engineering principles
   - How requirements, architecture, and verification provide predictability
3. **03 — Spec-Driven Development**
   - Writing structured specifications before prompting
   - Combining AI generation with deterministic verification, test-driven specs, and clear boundaries

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Deployment**: [GitHub Pages](https://pages.github.com/) via [GitHub Actions](https://github.com/features/actions)

---

## 🚀 Getting Started Locally

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v20+) and [pnpm](https://pnpm.io/) installed.

### Installation & Run

1. Clone the repository:
   ```bash
   git clone git@github.com:Amir-Kahdouii/02-spec-driven-development.git
   cd 02-spec-driven-development/sdd-slides
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   pnpm build
   ```

5. Preview local production build:
   ```bash
   pnpm preview
   ```

---

## 🌐 Deployment to GitHub Pages

Deployment is fully automated using GitHub Actions (`.github/workflows/deploy.yml`).

Every push to the `master` branch automatically triggers a build and deploys the static files to GitHub Pages.

To enable GitHub Pages in your repository settings:
1. Navigate to **Settings** > **Pages** in GitHub.
2. Under **Build and deployment** -> **Source**, select **GitHub Actions**.

---

## 📁 Repository Structure

```
02-spec-driven-development/
├── .github/
│   └── workflows/
│       └── deploy.yml      # Automated GitHub Pages deployment workflow
└── sdd-slides/
    ├── public/             # Static assets
    ├── src/
    │   ├── components/     # UI components
    │   ├── deck/           # Slide deck logic, primitives, and slides content
    │   ├── lib/            # Utilities and diagrams
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.ts      # Configured with base: "./" for GitHub Pages
```

---

## 📄 License

MIT
