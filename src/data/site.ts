import { unsplash } from "../lib/unsplash";

export type NavItem = { id: string; label: string };

export type HeroCategory = {
  label: string;
  image: string;
  alt: string;
};

export const site = {
  name: "Hearth & Grain",
  nav: [
    { id: "home", label: "Home" },
    { id: "collections", label: "Collections" },
    { id: "projects", label: "Projects" },
    { id: "process", label: "Process" },
    { id: "contact", label: "Contact" },
  ] satisfies NavItem[],
  cta: { label: "Book a call", href: "#contact" },
  hero: {
    eyebrow: "Interior design studio",
    title: "Designing homes that feel like you, inside and out",
    description:
      "We shape calm, lived-in spaces with natural materials, honest craftsmanship and a clear point of view, from the first sketch to the last cushion.",
    primaryCta: { label: "View projects", href: "/projects" },
    secondaryCta: { label: "Our approach", href: "/services" },
    image: unsplash("photo-1600210492486-724fe5c67fb0", 2000),
    imageAlt: "Warm modern living room with a cream sectional and a round wooden coffee table",
    collectionLabel: "Explore our collections",
  },
  heroCategories: [
    {
      label: "Living Room",
      image: unsplash("photo-1586023492125-27b2c045efd7", 600),
      alt: "Bright living room with a linen sofa",
    },
    {
      label: "Bedroom",
      image: unsplash("photo-1505693416388-ac5ce068fe85", 600),
      alt: "Calm bedroom with natural wood and soft bedding",
    },
    {
      label: "Dining",
      image: unsplash("photo-1617806118233-18e1de247200", 600),
      alt: "Dining area with a wooden table and pendant light",
    },
    {
      label: "Outdoor",
      image: unsplash("photo-1564013799919-ab600027ffc6", 600),
      alt: "Outdoor terrace with lounge seating and plants",
    },
  ] satisfies HeroCategory[],
} as const;
