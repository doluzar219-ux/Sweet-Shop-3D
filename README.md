<div align="center">



  <br />
  <br />

  # 🪔 Madhuram Mithai · 3D Interactive Web Film
  ### *पारंपरिक भारतीय मिठास · Handcrafted Tradition Since 1948*

  <p align="center">
    <strong>An award-winning, scroll-choreographed 3D web experience & digital storefront celebrating Indian culinary heritage.</strong>
  </p>

  <p align="center">
    <a href="https://github.com/doluzar219-ux/Sweet-Shop-3D/stargazers"><img src="https://img.shields.io/github/stars/doluzar219-ux/Sweet-Shop-3D?style=for-the-badge&color=FFB703&logo=star" alt="Stars" /></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" /></a>
    <a href="https://greensock.com/gsap/"><img src="https://img.shields.io/badge/GSAP_3-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" /></a>
    <a href="https://orm.drizzle.team/"><img src="https://img.shields.io/badge/Drizzle_ORM-PostgreSQL-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" /></a>
    <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel" alt="Vercel Ready" /></a>
  </p>

  <p align="center">
    <a href="#-one-click-deployment-guide">🚀 <strong>Deployment Guide</strong></a> •
    <a href="#-key-features">✨ <strong>Key Features</strong></a> •
    <a href="#-tech-stack">🛠️ <strong>Tech Stack</strong></a> •
    <a href="#-local-setup--quickstart">💻 <strong>Quickstart</strong></a> •
    <a href="#-api-documentation">📡 <strong>API Reference</strong></a>
  </p>

  <img src="./assets/banner.jpg" alt="Madhuram Mithai 3D Cinematic Experience" width="100%" style="border-radius: 12px; box-shadow: 0 12px 32px rgba(0,0,0,0.4);" />

</div>

---

## 📖 Overview

**Madhuram Mithai (Sweet Shop 3D)** blends cinematic storytelling with e-commerce. Visitors don't just browse a catalogue — they embark on a **scroll-scrubbed 3D film** starting at the exterior of the bustling shop at golden hour, meeting third-generation artisan halwai Arjun, watching the vintage wooden doors open, and discovering handcrafted delicacies inside a warm, brass-and-marble ambient kitchen.

Every frame, camera tilt, pan, volumetric light beam, and Devanagari typography overlay is tied directly to the user's scroll position via **GSAP ScrollTrigger** and **Lenis smooth physics**.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🎬 **7-Act Cinematic Timeline** | 100-frame master sequence scrubbing through the street, owner encounter, doorway entrance, interior reveal, signature mithai, gift box, and checkout. |
| 🎥 **3D Camera Choreography** | Depth-simulated multi-plane camera transitions with custom focal-point anchors (`src/lib/camera.ts`). |
| 🪔 **Interactive Mithai Showcase** | Interactive spotlight and narrative for *Kaju Katli*, *Motichoor Ladoo*, *Gulab Jamun*, *Rasmalai*, and *Jalebi*. |
| 🛒 **Live Sliding Cart & Checkout** | Full shopping cart drawer with instant quantity controls, customer notes, validation, and direct order placement. |
| ✨ **Atmospheric VFX Engine** | Canvas-rendered floating golden dust motes, directional sunbeams, lens light spill, and vintage film grain. |
| ⚡ **Lenis Momentum Scrolling** | Silky smooth 60/120 FPS inertial scroll experience synchronized with GSAP's internal ticker. |
| 🗄️ **Robust Database Layer** | Next.js Serverless API routes powered by **Drizzle ORM** with connection pooling on **PostgreSQL**. |
| ♿ **Accessibility & Performance** | Automatic hardware acceleration, `prefers-reduced-motion` detection, image preloading tiers, and mobile responsive framing. |

---

## 🎬 The 7 Cinematic Acts

```mermaid
flowchart LR
    A[01. The Street<br>Golden hour exterior] --> B[02. Meet Arjun<br>Third-gen Halwai]
    B --> C[03. The Doorway<br>Door creaks open]
    C --> D[04. Inside Madhuram<br>Brass counters & steam]
    D --> E[05. Signature Sweets<br>Interactive mithai acts]
    E --> F[06. The Gift Box<br>Festive assortment]
    F --> G[07. Visit & Order<br>Location & checkout]
```

---

## 🛠️ Tech Stack

- **Frontend & App Architecture**: [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/), TypeScript.
- **Animation & Scroll Orchestration**: [GSAP 3](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/), [Lenis](https://lenis.darkroom.engineering/).
- **Styles & Layout**: [Tailwind CSS v4](https://tailwindcss.com/) with custom `@keyframes`, CSS variables, and bespoke typographic treatments.
- **Database & ORM**: [Drizzle ORM](https://orm.drizzle.team/), `drizzle-kit`, and `pg` (node-postgres connection pool).
- **Fonts & Typography**: Playfair Display, Cinzel Decorative, and Rozha One (Devanagari).

---

## 🚀 One-Click Deployment Guide

Follow this guide to deploy your project live to the internet in **under 5 minutes** for **100% free**.

### 🌟 Option 1: Deploy on Vercel + Neon PostgreSQL (Recommended)

#### Step 1: Provision a Free Cloud PostgreSQL Database
1. Go to [Neon.tech](https://neon.tech/) (or [Supabase](https://supabase.com/)) and create a free account.
2. Click **Create Project** (e.g., `sweet-shop-db`).
3. Copy your database connection string:
   ```text
   postgresql://username:password@ep-sample-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

#### Step 2: Push the Database Schema
In your local project terminal, set your connection URL and push the table schema:
```bash
# Set your DATABASE_URL in .env or run directly:
npx drizzle-kit push
```
> *This automatically creates the `orders` table in your cloud database.*

#### Step 3: Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdoluzar219-ux%2FSweet-Shop-3D)

1. Go to [Vercel](https://vercel.com/) and click **Add New > Project**.
2. Select your imported repository: `doluzar219-ux/Sweet-Shop-3D`.
3. In **Environment Variables**, add:
   - **Key**: `DATABASE_URL`
   - **Value**: *Your Neon / Supabase connection string from Step 1*
4. Click **Deploy**. Your site will be live worldwide on `https://your-project.vercel.app`! 🎉

---

### 🚂 Option 2: Deploy on Railway

1. Sign up on [Railway.app](https://railway.app/).
2. Click **New Project** → **Provision PostgreSQL**.
3. In the same project, click **New** → **GitHub Repo** and select `Sweet-Shop-3D`.
4. In the Next.js service settings:
   - Go to **Variables** → **Add Reference** → Select `DATABASE_URL` from your PostgreSQL service.
5. Railway will automatically build and deploy your application.

---

### 🐳 Option 3: Deploy with Docker

You can containerize and run the app anywhere using Docker:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 💻 Local Setup & Quickstart

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.18 or higher)
- [PostgreSQL](https://www.postgresql.org/) running locally or a cloud DB URL
- [Git](https://git-scm.com/)

### 1. Clone the repository
```bash
git clone https://github.com/doluzar219-ux/Sweet-Shop-3D.git
cd Sweet-Shop-3D
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file in the root directory (or copy from `.env.example`):
```bash
cp .env.example .env
```
Edit `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/app_db"
```

### 4. Push database tables
```bash
npx drizzle-kit push
```

### 5. Start the development server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📡 API Documentation

### 1. Place an Order
- **Endpoint**: `POST /api/orders`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Arjun Sharma",
    "phone": "+91 98765 43210",
    "note": "Please pack in gift boxes with extra silver varak.",
    "items": [
      { "id": "kaju-katli", "qty": 2 },
      { "id": "motichoor-ladoo", "qty": 1 }
    ]
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "ok": true,
    "id": 1
  }
  ```

### 2. Database Health Check
- **Endpoint**: `GET /api/health`
- **Success Response (200 OK)**:
  ```json
  {
    "ok": true
  }
  ```

---

## 📂 Project Structure

```text
Sweet-Shop-3D/
├── assets/
│   └── banner.jpg              # High-res 3D showcase banner
├── public/
│   ├── banner.jpg              # Public static banner asset
│   └── scenes/                 # Rendered scene layer photographs
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── health/route.ts # DB health probe endpoint
│   │   │   └── orders/route.ts # Order submission endpoint
│   │   ├── globals.css         # Master styling & overlays
│   │   ├── layout.tsx          # Root layout & font injection
│   │   └── page.tsx            # Entry point rendering Experience
│   ├── components/
│   │   ├── Cinematic.tsx       # GSAP viewport stage & layer manager
│   │   ├── Dust.tsx            # Dynamic golden particle VFX canvas
│   │   ├── Experience.tsx      # Preloader & scene progression manager
│   │   ├── Nav.tsx             # Floating brass navigation & cart icon
│   │   ├── OrderProvider.tsx   # React Context state for cart & sliding drawer
│   │   ├── Overlays.tsx        # Story typography & Devanagari text beats
│   │   └── Preloader.tsx       # Initial heritage loader bar & asset gate
│   ├── data/
│   │   └── sweets.ts           # Mithai menu, descriptions, pricing & shop data
│   ├── db/
│   │   ├── index.ts            # Drizzle ORM PostgreSQL connection pool
│   │   └── schema.ts           # Orders database schema definition
│   └── lib/
│     ├── camera.ts           # 3D camera pan/tilt calculations
│     ├── lenis.ts            # Lenis smooth-scroll singleton
│     ├── scenes.ts           # Scene definition tiers & viewport anchors
│     └── timeline.ts         # Master GSAP frame-by-frame scrubbing logic
├── drizzle.config.ts           # Drizzle Kit configuration with env support
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies & build scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

---

## 🎨 Customizing Sweets & Scenes

1. **Add or Edit Sweets**: Open [`src/data/sweets.ts`](file:///src/data/sweets.ts) to update items, prices, descriptions, and Devanagari callouts.
2. **Update Scene Images**: Place your 3D renders in `public/scenes/` matching the filenames in [`src/lib/scenes.ts`](file:///src/lib/scenes.ts).
3. **Change Camera Angles**: Modify viewport transforms in [`src/lib/timeline.ts`](file:///src/lib/timeline.ts) and [`src/lib/camera.ts`](file:///src/lib/camera.ts).

---

## 📄 License & Credits

Built with ❤️ celebrating traditional Indian craftsmanship and modern web technology.

Released under the **MIT License**. Feel free to fork, customize, and create your own 3D web films!
