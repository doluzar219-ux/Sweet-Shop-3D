"use client";

import { useEffect, useRef } from "react";

/** Warm floating dust motes catching the golden-hour light. Cheap 2D canvas. */
export default function Dust({ enabled }: { enabled: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !enabled) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = w < 768 ? 26 : 55;
    const motes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 2.2,
      vx: (Math.random() - 0.3) * 0.12,
      vy: -0.05 - Math.random() * 0.2,
      a: 0.15 + Math.random() * 0.45,
      p: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    const loop = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += m.vx + Math.sin(t / 2500 + m.p) * 0.08;
        m.y += m.vy;
        if (m.y < -10) m.y = h + 10;
        if (m.x > w + 10) m.x = -10;
        if (m.x < -10) m.x = w + 10;
        const tw = 0.6 + 0.4 * Math.sin(t / 1200 + m.p);
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 3);
        g.addColorStop(0, `rgba(255,222,160,${m.a * tw})`);
        g.addColorStop(1, "rgba(255,200,120,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [enabled]);

  return <canvas ref={ref} className="dust" aria-hidden="true" />;
}
