import { unsplash } from "../lib/unsplash";

export type TeamMember = { id: string; name: string; role: string; image: string; alt: string };

export const about = {
  eyebrow: "About the studio",
  title: "A small studio with a big love for natural materials",
  description:
    "Hearth & Grain designs calm, lived-in homes. We keep the team small so every project gets senior attention from start to finish.",
  story: {
    title: "Homes should feel like a deep breath",
    paragraphs: [
      "We started Hearth & Grain after years of seeing beautiful rooms that nobody felt comfortable in. Good design should be quiet, warm and easy to live with.",
      "That is why we work with natural materials like oak, linen, stone and clay, and with makers who build things to last. Every room starts with a conversation about how you want to feel, not just how you want it to look.",
    ],
    images: [
      {
        src: unsplash("photo-1493663284031-b7e3aefcae8e", 1200),
        alt: "Warm living room with layered neutral textures",
      },
      {
        src: unsplash("photo-1540518614846-7eded433c457", 1200),
        alt: "Bedroom with natural linen and soft light",
      },
    ],
  },
  valuesHeading: "Three ideas behind every room",
  values: [
    {
      title: "Natural first",
      text: "We choose honest materials that age well and feel good to touch, then let them do the talking.",
    },
    {
      title: "Made to last",
      text: "We would rather you own fewer, better pieces than refresh everything every few years.",
    },
    {
      title: "Designed with you",
      text: "Your habits, your routines, your taste. We design around real life, not a showroom.",
    },
  ],
  teamHeading: "Meet the team",
  team: [
    {
      id: "m1",
      name: "Maya Okafor",
      role: "Founder and Creative Director",
      image: unsplash("photo-1573496359142-b8d87734a5a2", 800),
      alt: "Portrait of Maya Okafor",
    },
    {
      id: "m2",
      name: "Tomas Reyes",
      role: "Lead Designer",
      image: unsplash("photo-1560250097-0b93528c311a", 800),
      alt: "Portrait of Tomas Reyes",
    },
    {
      id: "m3",
      name: "Elena Brooks",
      role: "Sourcing Manager",
      image: unsplash("photo-1580489944761-15a19d654956", 800),
      alt: "Portrait of Elena Brooks",
    },
    {
      id: "m4",
      name: "Noah Adeyemi",
      role: "Project Manager",
      image: unsplash("photo-1472099645785-5658abf4ff4e", 800),
      alt: "Portrait of Noah Adeyemi",
    },
  ] satisfies TeamMember[],
} as const;
