# 🚀 NYC Code Quest Round 2 – Frontend

Modern frontend built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui (Nova)**, **Motion**, **GSAP**, and **Lenis**.

---

# 🏆 Tech Stack 

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS v4
* shadcn/ui (Nova)
* Motion
* GSAP
* Lenis
* Lucide React
* Sonner
* TanStack Query
* React Hook Form
* Zod
* Embla Carousel

---

# 📋 Prerequisites

* Node.js **22+**
* npm **11+**
* Git
* Docker Desktop
* VS Code (Recommended)

Check versions

```bash
node -v
npm -v
```

---

# ⬆️ Update npm

Before installing the project, update npm.

```bash
npm install -g npm@latest
```

Verify

```bash
npm -v
```

---

# 📥 Clone Repository

```bash
git clone <REPOSITORY_URL>
cd nyc-r2-web
```

---

# 📦 Install Dependencies

```bash
npm install
```

---

# ▶️ Development

```bash
npm run dev
```

Open

http://localhost:3000

---

# 🏗 Production

```bash
npm run build
npm start
```

---

# 📁 Project Structure

```text
src/
 ├── app/
 ├── components/
 │    ├── ui/
 │    ├── common/
 │    └── sections/
 ├── hooks/
 ├── lib/
 ├── providers/
 ├── services/
 ├── styles/
 ├── types/
 └── utils/
```

---

# 🎨 Animation Guidelines

## Motion

Use for

* Hover
* Tap
* Cards
* Buttons
* Page Transition
* Modal Animation
* Stagger Animation

---

## GSAP

Use for

* Hero Section
* Timeline
* Scroll Animation
* SVG Animation
* Landing Page
* Complex Sequences

---

## Lenis

Use globally for

* Smooth Scrolling
* Scroll Experience
* GSAP ScrollTrigger

---

## shadcn/ui

Use for

* Buttons
* Cards
* Forms
* Dialogs
* Navigation
* Tables
* Drawers
* Popovers
* Tabs
* Sidebar

---

# 🧩 Common Commands

```bash
npm run dev
npm run build
npm start
npm run lint
```

---

# 🌐 Documentation

Next.js
https://nextjs.org/docs

React
https://react.dev

TypeScript
https://www.typescriptlang.org/docs/

Tailwind CSS
https://tailwindcss.com/docs

shadcn/ui
https://ui.shadcn.com

Motion
https://motion.dev

GSAP
https://gsap.com/docs

Lenis
https://lenis.darkroom.engineering

Lucide React
https://lucide.dev

Sonner
https://sonner.emilkowal.ski

TanStack Query
https://tanstack.com/query

React Hook Form
https://react-hook-form.com

Zod
https://zod.dev

Embla Carousel
https://www.embla-carousel.com

---

# ⭐ UI Philosophy

* Responsive First
* Mobile First
* Accessible
* Reusable Components
* Dark Mode Support
* Smooth Animations
* Minimal Design
* Performance Focused

---

# 🌿 Git Workflow

Create branch

```bash
git checkout -b feature/navbar
```

Commit

```bash
git add .
git commit -m "feat: add navbar"
```

Push

```bash
git push origin feature/navbar
```

---

# 🐳 Docker

Build image

```bash
docker build -t nyc-r2-web .
```

Run

```bash
docker run -p 3000:3000 nyc-r2-web
```

Tag

```bash
docker tag nyc-r2-web gcr.io/PROJECT_ID/nyc-r2-web
```

Push

```bash
docker push gcr.io/PROJECT_ID/nyc-r2-web
```

Cloud Run

```bash
gcloud run deploy nyc-r2-web
```

---

# 🤖 AI Development Notes

* Keep components reusable.
* Prefer Server Components when possible.
* Use Client Components only when needed.
* Follow existing folder structure.
* Never duplicate components.
* Keep TypeScript strict.
* Always lint before committing.

---

# 🚀 Production Stack (2026)

Framework

* Next.js 16
* React 19
* TypeScript

UI

* shadcn/ui (Nova)
* Tailwind CSS v4
* Lucide React

Animation

* Motion
* GSAP
* Lenis

Forms

* React Hook Form
* Zod

State

* TanStack Query

Utilities

* clsx
* tailwind-merge
* class-variance-authority

Notifications

* Sonner

Carousel

* Embla Carousel

---

# 📌 Best Practices

✅ Mobile First

✅ Component Driven

✅ Semantic HTML

✅ Accessibility

✅ Lazy Loading

✅ Image Optimization

✅ Server Components First

✅ Type Safety

✅ Reusable UI

✅ Clean Code

---

# 🛠 Troubleshooting

Clear cache

```bash
rm -rf .next node_modules package-lock.json
npm install
```

Rebuild

```bash
npm run build
```

---

# 📄 License

This project is developed for **NYC Code Quest Round 2** by **Team GET 200**. Internal use during the hackathon unless otherwise specified.
