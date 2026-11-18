# Sweet Shop 3D (Madhuram Mithai)

A cinematic, interactive scroll-driven 3D web experience for **Madhuram Mithai**, an Indian heritage sweet shop founded in 1948.

Built with **Next.js 16**, **React 19**, **GSAP**, **Lenis Smooth Scroll**, **Tailwind CSS v4**, and **Drizzle ORM** with **PostgreSQL**.

---

## 🌟 Features

- **Cinematic Scroll Experience**: Scrubbed GSAP timelines with parallax depth, 3D camera transforms, and atmospheric light/dust particles.
- **7-Scene Visual Journey**:
  1. *The Street*: Grand exterior entrance.
  2. *Meet Arjun*: Introduction to the 3rd-generation halwai.
  3. *The Doorway*: Wooden door opens into the sweet shop.
  4. *Inside Madhuram*: Warm brass counters and artisan kitchen.
  5. *The Signature Sweets*: Interactive spotlight on Kaju Katli, Motichoor Ladoo, Gulab Jamun, Rasmalai, and Jalebi.
  6. *The Gift Box*: Handcrafted festive gift box showcase.
  7. *Grand Finale & Visit Us*: Store location, hours, ordering, and contact info.
- **Interactive Cart & Order System**: Full sliding modal for order placement and checkout.
- **Backend API & Database**: Next.js App Router API (`/api/orders`, `/api/health`) backed by Drizzle ORM and PostgreSQL.
- **Accessibility & Performance**: Reduced motion support, dynamic asset preloading, and responsive mobile-optimized framing.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Animation**: [GSAP 3](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Database / ORM**: [Drizzle ORM](https://orm.drizzle.team/) & PostgreSQL (`pg`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: TypeScript

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PostgreSQL](https://www.postgresql.org/) database instance

### 2. Installation

```bash
npm install
```

### 3. Database Configuration

Configure your database connection string in `.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db
```

Generate and run Drizzle migrations:

```bash
npx drizzle-kit push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the project in your browser.
