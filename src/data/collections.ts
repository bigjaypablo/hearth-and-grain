import { unsplash } from "../lib/unsplash";

export type BentoItem = {
  id: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  size: "large" | "small";
};

export const philosophy = {
  title: "Bringing timeless elegance and natural beauty to your space",
  description:
    "We believe a well-designed space can improve your mood, change how you live and bring out the best in your home. Every room we make starts with how you want to feel in it.",
  cta: { label: "See our work", href: "/projects" },
  items: [
    {
      id: "living",
      title: "Living Room Furniture",
      text: "Sofas, armchairs and coffee tables made for a cozy, stylish living space.",
      image: unsplash("photo-1586023492125-27b2c045efd7", 1400),
      alt: "Living room with a linen sofa, round wooden table and warm lighting",
      size: "large",
    },
    {
      id: "bedroom",
      title: "Bedroom Essentials",
      text: "Beds, dressers and storage for a peaceful retreat.",
      image: unsplash("photo-1505693416388-ac5ce068fe85", 1000),
      alt: "Calm bedroom with natural wood and soft bedding",
      size: "small",
    },
    {
      id: "outdoor",
      title: "Outdoor Living",
      text: "Rattan, lounge sets and more for your outdoor moments.",
      image: unsplash("photo-1564013799919-ab600027ffc6", 1000),
      alt: "Outdoor terrace with lounge seating and plants",
      size: "small",
    },
  ] satisfies BentoItem[],
} as const;
