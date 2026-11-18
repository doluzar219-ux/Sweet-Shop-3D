"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ORDERABLE, SHOP } from "@/data/sweets";
import { getLenis } from "@/lib/lenis";

type Ctx = { open: (id?: string) => void };
const OrderCtx = createContext<Ctx>({ open: () => {} });
export const useOrder = () => useContext(OrderCtx);

type Status = "idle" | "sending" | "done";

export default function OrderProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [qty, setQty] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState<number | null>(null);

  const open = useCallback((id?: string) => {
    setStatus("idle");
    setError("");
    setOrderId(null);
    setQty((prev) => {
      if (!id) return prev;
      return { ...prev, [id]: Math.max(1, prev[id] ?? 0) };
    });
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const chosen = ORDERABLE.filter((s) => (qty[s.id] ?? 0) > 0);
  const total = chosen.reduce((n, s) => n + (qty[s.id] ?? 0), 0);

  const change = (id: string, d: number) =>
    setQty((p) => ({ ...p, [id]: Math.min(50, Math.max(0, (p[id] ?? 0) + d)) }));

  const whatsappHref = useMemo(() => {
    const lines = chosen.map((s) => `• ${s.name} × ${qty[s.id]}`).join("\n");
    const msg = `Namaste Madhuram! I'd like to order:\n${lines || "(please share the menu)"}${
      name ? `\n\nName: ${name}` : ""
    }`;
    return `https://wa.me/${SHOP.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty, name]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (total === 0) return setError("Please choose at least one sweet.");
    setStatus("sending");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          note,
          items: chosen.map((s) => ({ id: s.id, qty: qty[s.id] })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setOrderId(data.id);
      setStatus("done");
      setQty({});
      setNote("");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <OrderCtx.Provider value={{ open }}>
      {children}
      {isOpen && (
        <div className="order-backdrop" role="dialog" aria-modal="true" aria-label="Order sweets" onClick={close}>
          <div className="order-panel" onClick={(e) => e.stopPropagation()} data-lenis-prevent>
            <button className="order-close" onClick={close} aria-label="Close">
              ×
            </button>
            {status === "done" ? (
              <div className="order-done">
                <p className="eyebrow">Order received</p>
                <h3>Dhanyavaad, {name || "friend"}.</h3>
                <p>
                  Your order <strong>#{orderId}</strong> has reached our kitchen. We will call you on {phone} to confirm
                  the price and pickup or delivery.
                </p>
                <a className="btn-gold" href={whatsappHref} target="_blank" rel="noreferrer">
                  Chat with us on WhatsApp
                </a>
                <button className="btn-ghost" onClick={close}>
                  Back to the shop
                </button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <p className="eyebrow">Madhuram Mithai</p>
                <h3>Your order</h3>
                <ul className="order-list">
                  {ORDERABLE.map((s) => (
                    <li key={s.id} className={(qty[s.id] ?? 0) > 0 ? "on" : ""}>
                      <div>
                        <span className="n">{s.name}</span>
                        <span className="u">
                          {s.price} · {s.unit}
                        </span>
                      </div>
                      <div className="stepper">
                        <button type="button" onClick={() => change(s.id, -1)} aria-label={`Fewer ${s.name}`}>
                          −
                        </button>
                        <span>{qty[s.id] ?? 0}</span>
                        <button type="button" onClick={() => change(s.id, 1)} aria-label={`More ${s.name}`}>
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="fields">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone / WhatsApp number"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Note (occasion, delivery area, timing…)"
                    rows={2}
                  />
                </div>
                {error && <p className="order-error">{error}</p>}
                <div className="order-actions">
                  <button className="btn-gold" type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : `Place order${total ? ` · ${total} item${total > 1 ? "s" : ""}` : ""}`}
                  </button>
                  <a className="btn-ghost" href={whatsappHref} target="_blank" rel="noreferrer">
                    Order on WhatsApp
                  </a>
                </div>
                <p className="fine">Prices are placeholders; we confirm the final amount when we call you.</p>
              </form>
            )}
          </div>
        </div>
      )}
    </OrderCtx.Provider>
  );
}
