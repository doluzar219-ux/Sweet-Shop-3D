import { db } from "@/db";
import { orders, type OrderItem } from "@/db/schema";
import { ORDERABLE } from "@/data/sweets";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const b = body as {
    name?: unknown;
    phone?: unknown;
    note?: unknown;
    items?: unknown;
  };

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.replace(/[^\d+]/g, "") : "";
  const note = typeof b.note === "string" ? b.note.trim().slice(0, 500) : "";

  if (name.length < 2 || name.length > 80) {
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 8 || phone.length > 16) {
    return Response.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }
  if (!Array.isArray(b.items)) {
    return Response.json({ error: "Choose at least one sweet." }, { status: 400 });
  }

  const items: OrderItem[] = [];
  for (const raw of b.items as { id?: unknown; qty?: unknown }[]) {
    const product = ORDERABLE.find((p) => p.id === raw?.id);
    const qty = Number(raw?.qty);
    if (!product || !Number.isInteger(qty) || qty < 1 || qty > 50) continue;
    items.push({ id: product.id, name: product.name, qty });
  }
  if (items.length === 0) {
    return Response.json({ error: "Choose at least one sweet." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return Response.json({ error: "Database is not connected. Please configure DATABASE_URL." }, { status: 503 });
  }

  try {
    const [row] = await db
      .insert(orders)
      .values({
        customerName: name,
        phone,
        note: note || null,
        items,
        totalItems: items.reduce((n, i) => n + i.qty, 0),
      })
      .returning({ id: orders.id });
    return Response.json({ ok: true, id: row.id });
  } catch (e) {
    console.error("order insert failed", e);
    return Response.json({ error: "Could not save your order. Please try again." }, { status: 500 });
  }
}
