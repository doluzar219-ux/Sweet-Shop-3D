export type Focus = [number, number];

export type LayerDef = {
  key: string;
  src: string;
  alt: string;
  /** object-position on desktop / phones (0..1) */
  pos: Focus;
  posM: Focus;
  /** tier 1 loads before the experience starts, tier 2 is lazy-loaded afterwards */
  tier: 1 | 2;
};

export const LAYERS: LayerDef[] = [
  { key: "exterior", src: "/scenes/01-exterior.jpg", alt: "Madhuram Mithai storefront at golden hour", pos: [0.5, 0.5], posM: [0.5, 0.5], tier: 1 },
  { key: "owner", src: "/scenes/02-owner-outside.jpg", alt: "The shop owner standing outside the shop", pos: [0.5, 0.5], posM: [0.3, 0.5], tier: 1 },
  { key: "door", src: "/scenes/03-doorway.jpg", alt: "The owner opening the wooden door", pos: [0.5, 0.5], posM: [0.5, 0.5], tier: 1 },
  { key: "interior", src: "/scenes/04-interior.jpg", alt: "Interior of the shop with brass counters", pos: [0.5, 0.5], posM: [0.6, 0.5], tier: 1 },
  { key: "kaju", src: "/scenes/05-kaju-katli.jpg", alt: "Kaju katli in a brass tray", pos: [0.5, 0.5], posM: [0.78, 0.5], tier: 2 },
  { key: "ladoo", src: "/scenes/06-motichoor-ladoo.jpg", alt: "Motichoor ladoo", pos: [0.5, 0.5], posM: [0.22, 0.5], tier: 2 },
  { key: "jamun", src: "/scenes/07-gulab-jamun.jpg", alt: "Gulab jamun in syrup", pos: [0.5, 0.5], posM: [0.78, 0.5], tier: 2 },
  { key: "rasmalai", src: "/scenes/08-rasmalai.jpg", alt: "Rasmalai with saffron and pistachio", pos: [0.5, 0.5], posM: [0.22, 0.5], tier: 2 },
  { key: "jalebi", src: "/scenes/09-jalebi.jpg", alt: "Crisp golden jalebi", pos: [0.5, 0.5], posM: [0.78, 0.5], tier: 2 },
  { key: "gift", src: "/scenes/10-gift-box.jpg", alt: "Open mithai gift box seen from above", pos: [0.5, 0.5], posM: [0.5, 0.5], tier: 2 },
  { key: "finale", src: "/scenes/04-interior.jpg", alt: "Wide view of the shop interior", pos: [0.5, 0.5], posM: [0.6, 0.5], tier: 1 },
];

export const CHAPTERS = [
  { mark: 0, label: "The Street" },
  { mark: 10, label: "Meet Arjun" },
  { mark: 22, label: "The Doorway" },
  { mark: 36, label: "Inside Madhuram" },
  { mark: 46, label: "The Signature Sweets" },
  { mark: 80, label: "The Gift Box" },
  { mark: 91, label: "Visit Us" },
];

export const NAV = [
  { label: "Explore", mark: 0 },
  { label: "Our Story", mark: 15 },
  { label: "Sweets", mark: 49 },
  { label: "Contact", mark: 97 },
];
