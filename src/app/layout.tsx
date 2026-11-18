import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Archivo, Rozha_One } from "next/font/google";
import "./globals.css";

/* Rozha One — a Mughal-Didone display face (Devanagari + Latin from Indian Type Foundry).
   Used for every headline, the wordmark and the Devanagari accents. */
const display = Rozha_One({
  subsets: ["latin", "devanagari"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

/* Archivo — a neutral grotesque for body copy and tracked small-caps labels. */
const body = Archivo({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madhuram Mithai — Some traditions are too sweet to forget",
  description:
    "Step inside Madhuram, a traditional Indian mithai shop. Scroll to walk in with the owner and discover kaju katli, motichoor ladoo, gulab jamun, rasmalai and jalebi.",
};

export const viewport: Viewport = {
  themeColor: "#0e0405",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
