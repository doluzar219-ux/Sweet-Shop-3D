"use client";

import { useEffect, useState } from "react";
import { LAYERS } from "@/lib/scenes";
import Cinematic from "./Cinematic";
import Nav from "./Nav";
import Preloader from "./Preloader";
import OrderProvider from "./OrderProvider";

export default function Experience() {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [tier2, setTier2] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const urls = Array.from(new Set(LAYERS.filter((l) => l.tier === 1).map((l) => l.src)));
    let loaded = 0;
    let finished = false;
    const t0 = performance.now();
    const timers: ReturnType<typeof setTimeout>[] = [];

    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, 1100 - (performance.now() - t0));
      timers.push(
        setTimeout(() => {
          setReady(true);
          // secondary scenes (sweets, gift box) are fetched after the intro is on screen
          timers.push(setTimeout(() => setTier2(true), 800));
        }, wait),
      );
    };

    urls.forEach((src) => {
      const im = new Image();
      const done = (ok: boolean) => {
        if (!ok) setFailed(true);
        loaded += 1;
        setProgress(loaded / urls.length);
        if (loaded === urls.length) finish();
      };
      im.onload = () => done(true);
      im.onerror = () => done(false);
      im.src = src;
    });

    // never trap the visitor behind the loader
    timers.push(setTimeout(finish, 12000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <OrderProvider>
      <Preloader progress={progress} done={ready} failed={failed} />
      <Nav />
      <main>
        <Cinematic ready={ready} tier2={tier2} />
      </main>
    </OrderProvider>
  );
}
