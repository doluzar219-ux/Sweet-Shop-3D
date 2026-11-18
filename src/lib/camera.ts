import type { Focus } from "./scenes";

/** Native size of the generated keyframes. */
export const IMG_W = 1568;
export const IMG_H = 882;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/**
 * Where a point of the source image (fx, fy in 0..1) lands in the viewport,
 * expressed as an offset from the viewport centre (-0.5..0.5),
 * taking `object-fit: cover` and `object-position` into account.
 */
export function viewportOffset(fx: number, fy: number, pos: Focus, vw: number, vh: number) {
  const k = Math.max(vw / IMG_W, vh / IMG_H);
  const w = IMG_W * k;
  const h = IMG_H * k;
  const x = ((vw - w) * pos[0] + fx * w) / vw;
  const y = ((vh - h) * pos[1] + fy * h) / vh;
  return { x: x - 0.5, y: y - 0.5 };
}

export type Cam = { s: number; fx: number; fy: number };

/**
 * Converts a virtual camera (zoom + focus point in image space) into a
 * transform for a viewport-sized layer with a centred transform-origin.
 * The focus is clamped so the image edge never enters the frame.
 */
export function camState(cam: Cam, pos: Focus, vw: number, vh: number, motion = 1) {
  const s = 1 + (cam.s - 1) * motion;
  const o = viewportOffset(cam.fx, cam.fy, pos, vw, vh);
  const lim = (s - 1) / (2 * s);
  const cx = clamp(o.x, -lim, lim);
  const cy = clamp(o.y, -lim, lim);
  return { scale: s, x: -s * cx * vw, y: -s * cy * vh };
}
