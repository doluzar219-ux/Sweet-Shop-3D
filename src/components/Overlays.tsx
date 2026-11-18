"use client";

import { GIFT_BOX, SHOP, SWEETS } from "@/data/sweets";
import { useOrder } from "./OrderProvider";

/** All typographic beats of the film. Positions/visibility are driven by lib/timeline.ts. */
export default function Overlays() {
  const { open } = useOrder();

  return (
    <>
      {/* ——— Scene 1 · poster hero ——— */}
      <div className="hero" data-el="hero">
        <div className="hero-inner">
          <p className="eyebrow rise" style={{ ["--i" as string]: 0 }}>
            Madhuram Mithai <i /> Est. 1948
          </p>
          <h1 className="display rise" style={{ ["--i" as string]: 1 }}>
            <span className="ln">Some traditions are</span>
            <span className="ln"> too <em>sweet</em> to forget.</span>
          </h1>
          <div className="hero-rule rise" style={{ ["--i" as string]: 2 }} />
          <p className="hero-sub rise" style={{ ["--i" as string]: 3 }}>
            Handcrafted with love. Served with tradition.
          </p>
          <p className="hero-deva rise" style={{ ["--i" as string]: 4 }}>
            मधुरम · पारंपरिक भारतीय मिठाइयाँ
          </p>
        </div>
        <ul className="facts rise" style={{ ["--i" as string]: 4 }}>
          <li>Pure ghee</li>
          <li>Hand-rolled</li>
          <li>Small batch</li>
          <li>Open till 10:30 pm</li>
        </ul>
        <span className="hero-side" aria-hidden="true">
          Mithai · Namkeen · Dry Fruits
        </span>
      </div>

      <div className="scroll-hint" data-el="hint" aria-hidden="true">
        <span>Scroll to step inside</span>
        <i />
      </div>

      {/* ——— Scene 2 ——— */}
      <div className="blk right" data-block="owner">
        <span className="ghost" aria-hidden="true">
          मिठास
        </span>
        <span className="idx" aria-hidden="true">
          01
        </span>
        <div className="blk-inner">
          <p className="eyebrow">Chapter I <i /> Meet the owner</p>
          <h2 className="display">
            Meet Arjun,
            <br />
            third-generation halwai.
          </h2>
          <p className="body">
            Every morning before the street wakes up, he is already at the kadhai — and every evening he is at the door,
            waiting to welcome you in.
          </p>
        </div>
      </div>

      {/* ——— Scene 3 ——— */}
      <div className="blk center caption" data-block="enter">
        <div className="blk-inner">
          <p className="eyebrow">Chapter II <i /> The doorway</p>
          <h2 className="display">Come in. The kettle is on.</h2>
        </div>
      </div>

      {/* ——— Scene 4 ——— */}
      <div className="blk left" data-block="welcome">
        <span className="ghost" aria-hidden="true">
          स्वागत
        </span>
        <span className="idx" aria-hidden="true">
          02
        </span>
        <div className="blk-inner">
          <p className="eyebrow">Chapter III <i /> Inside Madhuram</p>
          <h2 className="display">Welcome to our world of sweetness.</h2>
          <p className="body">
            Brass counters polished every dawn. Trays filled by hand, in small batches, in pure ghee. Come, let me show
            you what we are proud of.
          </p>
        </div>
      </div>

      {/* ——— Scene 5 · the sweets ——— */}
      {SWEETS.map((s) => (
        <div key={s.id} className={`blk ${s.side}`} data-block={`sweet-${s.id}`}>
          <span className="ghost" aria-hidden="true">
            {s.ghost}
          </span>
          <span className="idx" aria-hidden="true">
            {s.index}
          </span>
          <div className="blk-inner sweet">
            <p className="eyebrow">
              {s.index} / 05 <i /> Signature sweet
            </p>
            <h2 className="display">{s.name}</h2>
            <p className="deva">{s.devanagari}</p>
            <div className="hair" />
            <p className="lede display">{s.tagline}</p>
            <p className="body">{s.description}</p>
            <div className="price-row">
              <span className="price">{s.price}</span>
              <span className="unit">{s.unit}</span>
            </div>
            <button className="btn-gold" onClick={() => open(s.id)}>
              Order Now <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      ))}

      {/* ——— Scene 6 · gift box ——— */}
      <div className="lid lid-l" data-el="lidL" aria-hidden="true" />
      <div className="lid lid-r" data-el="lidR" aria-hidden="true" />
      <div className="lid-label" data-el="lidLabel" aria-hidden="true">
        <span>Madhuram</span>
        <small>The Signature Collection</small>
      </div>
      <div className="blk left" data-block="gift">
        <span className="ghost" aria-hidden="true">
          {GIFT_BOX.ghost}
        </span>
        <span className="idx" aria-hidden="true">
          06
        </span>
        <div className="blk-inner">
          <p className="eyebrow">Chapter IV <i /> {GIFT_BOX.name}</p>
          <h2 className="display">Every celebration deserves a little sweetness.</h2>
          <button className="btn-gold" onClick={() => open(GIFT_BOX.id)}>
            Explore Our Collection <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* ——— Scene 7 · finale ——— */}
      <footer className="blk finale" data-block="finale">
        <div className="blk-inner">
          <p className="eyebrow">Madhuram Mithai <i /> Visit us</p>
          <h2 className="display">Made with tradition. Remembered with love.</h2>
          <div className="finale-grid">
            <div>
              <h3>
                <span className="dev">पता</span> · Address
              </h3>
              <p>{SHOP.address}</p>
            </div>
            <div>
              <h3>
                <span className="dev">फ़ोन</span> · Call
              </h3>
              <p>
                <a href={SHOP.phoneHref}>{SHOP.phoneDisplay}</a>
              </p>
            </div>
            <div>
              <h3>
                <span className="dev">समय</span> · Hours
              </h3>
              <p>{SHOP.hours}</p>
            </div>
          </div>
          <div className="finale-cta">
            <a
              className="btn-gold"
              href={`https://wa.me/${SHOP.whatsappNumber}?text=${encodeURIComponent("Namaste Madhuram! I'd like to place an order.")}`}
              target="_blank"
              rel="noreferrer"
            >
              Order on WhatsApp
            </a>
            <button className="btn-ghost" onClick={() => open()}>
              Place an order
            </button>
            <div className="socials">
              {SHOP.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
