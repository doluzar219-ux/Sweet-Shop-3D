import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis() {
  return instance;
}

/** Scroll to a point (0..100) of the cinematic timeline. */
export function scrollToMark(mark: number) {
  const el = document.getElementById("cinema");
  if (!el) return;
  const range = el.offsetHeight - window.innerHeight;
  const y = el.offsetTop + (range * mark) / 100;
  if (instance) instance.scrollTo(y, { duration: 2.2 });
  else window.scrollTo({ top: y, behavior: "auto" });
}
