"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { LAYERS, CHAPTERS } from "@/lib/scenes";
import { buildTimeline } from "@/lib/timeline";
import { getLenis, setLenis } from "@/lib/lenis";
import Overlays from "./Overlays";
import Dust from "./Dust";

gsap.registerPlugin(ScrollTrigger);

const DEV = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
const deva = (s: string) =>
  s
    .split("")
    .map((c) => DEV[Number(c)] ?? c)
    .join("");

export default function Cinematic({ ready, tier2 }: { ready: boolean; tier2: boolean }) {
  const outer = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [chapter, setChapter] = useState(0);
  const [reduced, setReduced] = useState(false);

  // smooth scrolling + timeline
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(isReduced);
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    ScrollTrigger.config({ ignoreMobileResize: true });

    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;
    if (!isReduced) {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const onProgress = (p: number) => {
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      const mark = p * 100;
      let idx = 0;
      CHAPTERS.forEach((c, i) => {
        if (mark >= c.mark) idx = i;
      });
      setChapter(idx);
    };

    let ctx: gsap.Context | null = null;
    const build = () => {
      ctx = gsap.context(() => {
        buildTimeline(stage.current!, outer.current!, { reduced: isReduced, onProgress });
      }, stage.current!);
    };
    build();

    let lastW = window.innerWidth;
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (window.innerWidth === lastW) return;
        lastW = window.innerWidth;
        ctx?.revert();
        build();
        ScrollTrigger.refresh();
      }, 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      ctx?.revert();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  // freeze scrolling while loading
  useEffect(() => {
    document.documentElement.style.overflow = ready ? "" : "hidden";
    const l = getLenis();
    if (!ready) l?.stop();
    else l?.start();
  }, [ready]);

  return (
    <section id="cinema" ref={outer} className="cinema" aria-label="Madhuram Mithai — a scroll-controlled film">
      <div className={`stage ${ready ? "ready" : ""}`} ref={stage}>
        <div className="rig" data-el="rig">
          {LAYERS.map((l, i) => (
            <div
              key={l.key}
              className="layer"
              data-layer={l.key}
              style={
                {
                  ["--op" as string]: `${l.pos[0] * 100}% ${l.pos[1] * 100}%`,
                  ["--opm" as string]: `${l.posM[0] * 100}% ${l.posM[1] * 100}%`,
                } as CSSProperties
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={l.tier === 1 || tier2 ? l.src : undefined}
                alt={l.alt}
                className={l.key === "exterior" || l.key === "owner" ? "idle" : undefined}
                decoding="async"
                fetchPriority={i === 0 ? "high" : "auto"}
                draggable={false}
                onError={() => console.warn(`Scene image failed to load: ${l.src}`)}
              />
            </div>
          ))}
        </div>

        <Dust enabled={!reduced} />
        <div className="tone" aria-hidden="true" />
        <div className="sunglow" aria-hidden="true" />
        <div className="light-spill" data-el="spill" aria-hidden="true" />
        <div className="flash" data-el="flash" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />

        <Overlays />

        <div className="hud" aria-hidden="true">
          <span className="hud-num">{deva(String(chapter + 1).padStart(2, "0"))}</span>
          <span className="hud-label">{CHAPTERS[chapter].label}</span>
        </div>
        <div className="progress" aria-hidden="true">
          <span ref={bar} />
        </div>
      </div>
    </section>
  );
}
