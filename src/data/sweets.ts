export type Sweet = {
  id: string;
  index: string;
  name: string;
  devanagari: string;
  /** short Devanagari watermark behind the headline */
  ghost: string;
  tagline: string;
  description: string;
  price: string;
  unit: string;
  layer: string;
  side: "left" | "right";
};

export const SWEETS: Sweet[] = [
  {
    id: "kaju-katli",
    index: "01",
    name: "Kaju Katli",
    devanagari: "काजू कतली",
    ghost: "काजू",
    tagline: "Silk of cashew, a whisper of silver.",
    description:
      "Slow-cooked cashew fudge, rolled paper-thin and crowned with edible silver varak. It melts before it ends.",
    price: "₹ XXX",
    unit: "per 250 g",
    layer: "kaju",
    side: "left",
  },
  {
    id: "motichoor-ladoo",
    index: "02",
    name: "Motichoor Ladoo",
    devanagari: "मोतीचूर लड्डू",
    ghost: "लड्डू",
    tagline: "A thousand golden pearls.",
    description:
      "Tiny boondi pearls fried in pure ghee, soaked in saffron syrup and pressed by hand into warm, orange ladoos.",
    price: "₹ XXX",
    unit: "per 250 g",
    layer: "ladoo",
    side: "right",
  },
  {
    id: "gulab-jamun",
    index: "03",
    name: "Gulab Jamun",
    devanagari: "गुलाब जामुन",
    ghost: "जामुन",
    tagline: "Warm, soft, and dripping with syrup.",
    description:
      "Khoya dumplings fried slowly to deep amber, then bathed in cardamom and rose-scented sugar syrup. Best served warm.",
    price: "₹ XXX",
    unit: "per 4 pieces",
    layer: "jamun",
    side: "left",
  },
  {
    id: "rasmalai",
    index: "04",
    name: "Rasmalai",
    devanagari: "रसमलाई",
    ghost: "रस",
    tagline: "Clouds of cream in saffron milk.",
    description:
      "Soft chenna discs floating in chilled, thickened milk, threaded with saffron and finished with hand-sliced pistachio.",
    price: "₹ XXX",
    unit: "per 2 pieces",
    layer: "rasmalai",
    side: "right",
  },
  {
    id: "jalebi",
    index: "05",
    name: "Jalebi",
    devanagari: "जलेबी",
    ghost: "जलेबी",
    tagline: "Crisp spirals, still warm.",
    description:
      "Fermented batter swirled into hot ghee, fried until crackling gold and dipped in syrup the moment it leaves the pan.",
    price: "₹ XXX",
    unit: "per 250 g",
    layer: "jalebi",
    side: "left",
  },
];

export const GIFT_BOX: Sweet = {
  id: "signature-gift-box",
  index: "06",
  name: "The Signature Mithai Box",
  devanagari: "विशेष उपहार",
  ghost: "उपहार",
  tagline: "Every celebration deserves a little sweetness.",
  description:
    "An assortment of our finest: kaju katli, motichoor ladoo, barfi, pistachio rolls and dry fruits, packed in a hand-finished maroon and gold box.",
  price: "₹ XXX",
  unit: "per box",
  layer: "gift",
  side: "left",
};

export const ORDERABLE: Sweet[] = [...SWEETS, GIFT_BOX];

export const SHOP = {
  name: "Madhuram",
  fullName: "Madhuram Mithai",
  address: "Shop No. 00, Sweet Street, Your City – 000 000 (address placeholder)",
  phoneDisplay: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsappNumber: "919876543210",
  hours: "Daily · 8:00 am – 10:30 pm (placeholder)",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};
