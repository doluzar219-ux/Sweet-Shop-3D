"use client";

import { useState } from "react";
import { NAV } from "@/lib/scenes";
import { scrollToMark } from "@/lib/lenis";

function Lotus() {
  return (
    <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="37" height="37" stroke="currentColor" strokeWidth="1.5" />
      <rect x="5.5" y="5.5" width="29" height="29" stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
      <path
        d="M20 9.5c3.4 3.9 5.1 7.2 5.1 10.4 0 3.4-1.7 6.3-5.1 8.8-3.4-2.5-5.1-5.4-5.1-8.8 0-3.2 1.7-6.5 5.1-10.4Z"
        fill="currentColor"
      />
      <path
        d="M9.5 17.4c4.5 1.1 7.4 3.2 9 6.4-1.4 3.1-4.3 4.7-8.6 4.6-1.4-3.3-1.6-7.1-.4-11Z"
        fill="currentColor"
        opacity="0.75"
      />
      <path
        d="M30.5 17.4c-4.5 1.1-7.4 3.2-9 6.4 1.4 3.1 4.3 4.7 8.6 4.6 1.4-3.3 1.6-7.1.4-11Z"
        fill="currentColor"
        opacity="0.75"
      />
    </svg>
  );
}

export default function Nav() {
  const [menu, setMenu] = useState(false);
  const go = (mark: number) => {
    setMenu(false);
    scrollToMark(mark);
  };
  return (
    <header className="nav">
      <button className="brand" onClick={() => go(0)} aria-label="Madhuram Mithai — back to start">
        <Lotus />
        <span>
          Madhuram
          <small>Mithai · Est. 1948</small>
        </span>
      </button>
      <nav className="nav-links" aria-label="Primary">
        {NAV.map((n) => (
          <button key={n.label} onClick={() => go(n.mark)}>
            {n.label}
          </button>
        ))}
      </nav>
      <button className="nav-burger" onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-label="Menu">
        <span />
        <span />
      </button>
      {menu && (
        <div className="nav-sheet">
          {NAV.map((n) => (
            <button key={n.label} onClick={() => go(n.mark)}>
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
