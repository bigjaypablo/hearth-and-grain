import { unsplash } from "../lib/unsplash";

export type Service = {
  id: string;
  title: string;
  text: string;
  includes: string[];
  timeline: string;
  image: string;
  alt: string;
};

export const servicesPage = {
  eyebrow: "Services",
  title: "Design help that fits the way you live",
  description:
    "Whether you are starting from bare walls or refreshing one room, we shape the scope around your home, your budget and your timeline.",
};

export const services: Service[] = [
  {
    id: "full-home",
    title: "Full-home design",
    text: "A complete vision for your home, from first sketch to final cushion, handled by one team.",
    includes: [
      "Concept direction and mood boards",
      "Space planning and 3D layouts",
      "Material and furniture sourcing",
      "Project management and installation",
    ],
    timeline: "10 to 16 weeks",
    image: unsplash("photo-1616486338812-3dadae4b4ace", 1400),
    alt: "Finished living room with an arched window and warm neutral furniture",
  },
  {
    id: "room",
    title: "Single-room redesign",
    text: "One room, done properly. Ideal when you love the rest of your home and want one space to finally work.",
    includes: [
      "Layout and lighting plan",
      "Furniture and decor selection",
      "Colour and material palette",
      "Installation and styling day",
    ],
    timeline: "4 to 8 weeks",
    image: unsplash("photo-1505693416388-ac5ce068fe85", 1400),
    alt: "Calm bedroom with natural wood and soft bedding",
  },
  {
    id: "sourcing",
    title: "Furniture and sourcing",
    text: "Pieces that last. We find, specify and manage furniture from makers we trust, including custom work.",
    includes: [
      "Curated shortlist from trusted makers",
      "Custom and made-to-order options",
      "Order tracking and delivery",
      "Assembly and placement",
    ],
    timeline: "2 to 6 weeks",
    image: unsplash("photo-1617806118233-18e1de247200", 1400),
    alt: "Dining area with an oak table and a statement pendant light",
  },
  {
    id: "outdoor",
    title: "Outdoor and terrace",
    text: "Gardens, terraces and courtyards designed like extra rooms, with the same care as the inside.",
    includes: [
      "Layout and planting plan",
      "Weatherproof furniture",
      "Lighting and shade",
      "Seasonal styling",
    ],
    timeline: "4 to 10 weeks",
    image: unsplash("photo-1564013799919-ab600027ffc6", 1400),
    alt: "Outdoor terrace with lounge seating and plants",
  },
];

export const faqs = [
  {
    q: "How much does a project cost?",
    a: "It depends on scope and finishes. After a free first call we send a clear proposal with a fixed design fee and a budget range for furniture and works, so you know the numbers before committing.",
  },
  {
    q: "Do you work remotely?",
    a: "Yes. Many clients work with us through video calls, shared boards and delivery tracking, with on-site visits where they matter most.",
  },
  {
    q: "Can I keep some of my existing furniture?",
    a: "Absolutely. We like to build around pieces you love, and we will tell you honestly what is worth keeping, restoring or replacing.",
  },
  {
    q: "How long does a typical project take?",
    a: "A single room usually takes 4 to 8 weeks. A full home is typically 10 to 16 weeks, depending on lead times for custom pieces.",
  },
  {
    q: "What happens after the reveal?",
    a: "We stay in touch. If anything needs adjusting in the first weeks, we sort it, and we are happy to return for seasonal refreshes later.",
  },
] as const;
