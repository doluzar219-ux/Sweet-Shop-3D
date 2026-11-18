import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { camState, type Cam } from "./camera";
import { LAYERS } from "./scenes";
import { SWEETS } from "@/data/sweets";

gsap.registerPlugin(ScrollTrigger);

type Opts = {
  reduced: boolean;
  onProgress: (p: number) => void;
};

/**
 * The master film. One GSAP timeline of 100 "frames" is scrubbed by scroll
 * progress, so every camera move, dissolve and text beat plays forwards and
 * backwards exactly as the visitor scrolls.
 *
 *   0 – 10   Scene 1  The grand exterior (near-static camera)
 *  10 – 22   Scene 2  Meet the owner
 *  22 – 38   Scene 3  Door opens, camera follows him inside
 *  36 – 46   Scene 4  Interior reveal + welcome
 *  46 – 80   Scene 5  Five signature sweets
 *  80 – 91   Scene 6  Gift box
 *  91 – 100  Scene 7  Grand finale
 */
export function buildTimeline(root: HTMLElement, trigger: HTMLElement, { reduced, onProgress }: Opts) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const mobile = vw < 768;
  const motion = reduced ? 0.25 : 1;

  const q = <T extends HTMLElement = HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
  const layerEl = (k: string) => q(`[data-layer="${k}"]`);
  const def = (k: string) => LAYERS.find((l) => l.key === k)!;

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger,
      start: "top top",
      end: "bottom bottom",
      scrub: reduced ? true : 0.9,
      onUpdate: (self) => onProgress(self.progress),
    },
  });

  // ---------- initial state ----------
  LAYERS.forEach((l) => gsap.set(layerEl(l.key), { autoAlpha: l.key === "exterior" ? 1 : 0 }));

  // ---------- helpers ----------
  const seen = new Set<string>();
  const cam = (key: string, t0: number, t1: number, from: Cam, to: Cam, ease = "none") => {
    const d = def(key);
    const pos = mobile ? d.posM : d.pos;
    const a = camState(from, pos, vw, vh, motion);
    const b = camState(to, pos, vw, vh, motion);
    const el = layerEl(key);
    if (!seen.has(key)) {
      seen.add(key);
      gsap.set(el, a);
    }
    tl.fromTo(
      el,
      { ...a },
      { ...b, ease, duration: t1 - t0, immediateRender: false },
      t0,
    );
  };

  const fade = (key: string, t0: number, t1: number, from: number, to: number) => {
    tl.fromTo(
      layerEl(key),
      { autoAlpha: from },
      { autoAlpha: to, duration: Math.max(0.01, t1 - t0), immediateRender: false },
      t0,
    );
  };

  const block = (id: string, tIn: number, tOut?: number, stagger = 0.14) => {
    const el = q(`[data-block="${id}"]`);
    const kids = Array.from(el.querySelectorAll(":scope > .blk-inner > *"));
    gsap.set(el, { autoAlpha: 0 });
    gsap.set(kids, { autoAlpha: 0, y: 34 });
    tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9, immediateRender: false }, tIn);
    tl.fromTo(
      kids,
      { autoAlpha: 0, y: 34 },
      { autoAlpha: 1, y: 0, duration: 0.9, stagger, ease: "power2.out", immediateRender: false },
      tIn + 0.1,
    );
    if (tOut !== undefined) {
      tl.fromTo(el, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.7, immediateRender: false }, tOut);
      tl.fromTo(
        kids,
        { autoAlpha: 1, y: 0 },
        { autoAlpha: 0, y: -26, duration: 0.7, stagger: 0.04, ease: "power1.in", immediateRender: false },
        tOut,
      );
    }
  };

  // ---------- SCENE 1 · exterior ----------
  cam("exterior", 0, 10, { s: 1, fx: 0.5, fy: 0.5 }, { s: 1.07, fx: 0.5, fy: 0.48 });
  cam("exterior", 10, 15, { s: 1.07, fx: 0.5, fy: 0.48 }, { s: 1.22, fx: 0.5, fy: 0.5 });
  fade("exterior", 14, 14.6, 1, 0);

  const hint = q('[data-el="hint"]');
  tl.fromTo(hint, { autoAlpha: 1 }, { autoAlpha: 0, duration: 1.6, immediateRender: false }, 0);
  const hero = q('[data-el="hero"]');
  gsap.set(hero, { autoAlpha: 1 });
  tl.fromTo(hero, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -70, duration: 4, ease: "power1.in", immediateRender: false }, 3.2);

  // ---------- SCENE 2 · meet the owner ----------
  fade("owner", 10, 14.2, 0, 1);
  cam("owner", 10, 15, { s: 1.14, fx: 0.55, fy: 0.5 }, { s: 1, fx: 0.5, fy: 0.5 }, "power1.out");
  cam("owner", 15, 20, { s: 1, fx: 0.5, fy: 0.5 }, { s: 1.75, fx: 0.28, fy: 0.55 }, "power2.inOut");
  block("owner", 14.4, 20.4);
  // he walks: camera tracks from him to the door, with a footstep bob
  cam("owner", 20.4, 26, { s: 1.75, fx: 0.28, fy: 0.55 }, { s: 1.9, fx: 0.53, fy: 0.5 }, "power1.inOut");
  cam("owner", 26, 31.5, { s: 1.9, fx: 0.53, fy: 0.5 }, { s: 2.35, fx: 0.53, fy: 0.48 }, "power2.in");
  fade("owner", 31.5, 32, 1, 0);

  // ---------- SCENE 3 · entering ----------
  const rig = q('[data-el="rig"]');
  if (!reduced) {
    tl.fromTo(rig, { y: 0 }, { y: -7, duration: 0.65, repeat: 7, yoyo: true, ease: "sine.inOut", immediateRender: false }, 20.8);
    tl.fromTo(rig, { y: 0 }, { y: -7, duration: 0.66, repeat: 11, yoyo: true, ease: "sine.inOut", immediateRender: false }, 29.2);
    const ownerImg = layerEl("owner").querySelector("img")!;
    tl.fromTo(ownerImg, { filter: "blur(0px)" }, { filter: "blur(6px)", duration: 3, ease: "power1.in", immediateRender: false }, 28.5);
  }
  const spill = q('[data-el="spill"]');
  tl.fromTo(spill, { autoAlpha: 0 }, { autoAlpha: 0.85, duration: 6, ease: "power2.in", immediateRender: false }, 23.5);
  tl.fromTo(spill, { autoAlpha: 0.85 }, { autoAlpha: 0, duration: 2, immediateRender: false }, 30);

  fade("door", 29, 31.6, 0, 1);
  cam("door", 29, 34, { s: 1, fx: 0.5, fy: 0.5 }, { s: 1.25, fx: 0.45, fy: 0.5 });
  cam("door", 34, 37.8, { s: 1.25, fx: 0.45, fy: 0.5 }, { s: 2.4, fx: 0.6, fy: 0.4 }, "power2.in");
  fade("door", 38.2, 38.6, 1, 0);
  block("enter", 30.8, 35.2);

  const flash = q('[data-el="flash"]');
  tl.fromTo(flash, { autoAlpha: 0 }, { autoAlpha: 0.6, duration: 2, immediateRender: false }, 34.6);
  tl.fromTo(flash, { autoAlpha: 0.6 }, { autoAlpha: 0, duration: 2.2, immediateRender: false }, 36.6);

  // ---------- SCENE 4 · interior reveal ----------
  fade("interior", 35.6, 38, 0, 1);
  cam("interior", 35.6, 41, { s: 1.45, fx: 0.5, fy: 0.5 }, { s: 1, fx: 0.5, fy: 0.5 }, "power2.out");
  cam("interior", 41, 45.5, { s: 1, fx: 0.5, fy: 0.5 }, { s: 1.12, fx: 0.6, fy: 0.5 });
  block("welcome", 38.6, 44.4);
  cam("interior", 45.5, 49.5, { s: 1.12, fx: 0.6, fy: 0.5 }, { s: 2.0, fx: 0.57, fy: 0.8 }, "power2.inOut");
  fade("interior", 49.8, 50.2, 1, 0);

  // ---------- SCENE 5 · the sweets ----------
  const order = ["kaju", "ladoo", "jamun", "rasmalai", "jalebi"];
  SWEETS.forEach((s, i) => {
    const key = order[i];
    const a = 47 + 6.6 * i;
    const end = i < order.length - 1 ? a + 10 : 82;
    const toward = s.side === "left" ? 0.56 : 0.44;
    fade(key, a + 0.6, a + 2.8, 0, 1);
    if (i > 0) fade(order[i - 1], a + 2.8, a + 3.2, 1, 0);
    cam(key, a + 0.6, a + 4.2, { s: 1.16, fx: 0.5, fy: 0.5 }, { s: 1, fx: 0.5, fy: 0.5 }, "power2.out");
    cam(key, a + 4.2, end, { s: 1, fx: 0.5, fy: 0.5 }, { s: 1.08, fx: toward, fy: 0.5 });
    block(`sweet-${s.id}`, a + 1.8, a + 5.9, 0.11);
  });
  fade("jalebi", 81.6, 82, 1, 0);

  // ---------- SCENE 6 · gift box ----------
  const lidL = q('[data-el="lidL"]');
  const lidR = q('[data-el="lidR"]');
  const lidLabel = q('[data-el="lidLabel"]');
  gsap.set(lidL, { xPercent: -101 });
  gsap.set(lidR, { xPercent: 101 });
  gsap.set(lidLabel, { autoAlpha: 0 });
  tl.fromTo(lidL, { xPercent: -101 }, { xPercent: 0, duration: 2, ease: "power2.out", immediateRender: false }, 79.5);
  tl.fromTo(lidR, { xPercent: 101 }, { xPercent: 0, duration: 2, ease: "power2.out", immediateRender: false }, 79.5);
  tl.fromTo(lidLabel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, immediateRender: false }, 80.8);
  tl.fromTo(lidLabel, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.8, immediateRender: false }, 82.4);
  tl.fromTo(lidL, { xPercent: 0 }, { xPercent: -101, duration: 4, ease: "power2.inOut", immediateRender: false }, 83);
  tl.fromTo(lidR, { xPercent: 0 }, { xPercent: 101, duration: 4, ease: "power2.inOut", immediateRender: false }, 83);

  fade("gift", 81.5, 81.52, 0, 1);
  cam("gift", 81.5, 87, { s: 1.3, fx: 0.5, fy: 0.5 }, { s: 1, fx: 0.5, fy: 0.5 });
  cam("gift", 87, 91, { s: 1, fx: 0.5, fy: 0.5 }, { s: 1.45, fx: 0.42, fy: 0.55 }, "power1.inOut");
  cam("gift", 91, 93.6, { s: 1.45, fx: 0.42, fy: 0.55 }, { s: 1.5, fx: 0.42, fy: 0.55 });
  block("gift", 87.4, 90.4);

  // ---------- SCENE 7 · finale ----------
  fade("finale", 90.8, 93.2, 0, 1);
  fade("gift", 93.2, 93.6, 1, 0);
  cam("finale", 90.8, 97, { s: 1.3, fx: 0.5, fy: 0.45 }, { s: 1, fx: 0.5, fy: 0.5 }, "power2.out");
  cam("finale", 97, 100, { s: 1, fx: 0.5, fy: 0.5 }, { s: 1.04, fx: 0.5, fy: 0.5 });
  block("finale", 93.2, undefined, 0.2);

  // guarantee the timeline is exactly 100 long
  tl.to({}, { duration: 0.001 }, 99.999);

  return tl;
}
