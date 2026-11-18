import { integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export type OrderItem = { id: string; name: string; qty: number };

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  note: text("note"),
  items: jsonb("items").$type<OrderItem[]>().notNull(),
  totalItems: integer("total_items").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
