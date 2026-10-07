import { unsplash } from "../lib/unsplash";

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

const EMAIL = "hello@hearthandgrain.studio";

export const cta = {
  eyebrow: "Start your project",
  title: "Let's design a home you never want to leave",
  description:
    "Tell us about your space and we will reply within two working days to set up a free, no-pressure first consultation.",
  button: { label: "Book a free consultation", href: `mailto:${EMAIL}` },
  image: unsplash("photo-1502672260266-1c1ef2d93688", 2000),
  imageAlt: "Bright living room with neutral furniture and plants",
} as const;

export const footer = {
  blurb:
    "An interior design studio creating warm, timeless homes with natural materials and honest craft.",
  newsletter: {
    title: "Studio notes",
    text: "Occasional design ideas and project stories. No spam.",
    placeholder: "Your email address",
    button: "Subscribe",
    success: "Thanks, you are on the list.",
    error: "Please enter a valid email address.",
  },
  columns: [
    {
      title: "Studio",
      links: [
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Projects", href: "/projects" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: EMAIL, href: `mailto:${EMAIL}` },
        { label: "Instagram", href: "#" },
        { label: "Pinterest", href: "#" },
      ],
    },
  ] satisfies FooterColumn[],
  legal: "All rights reserved.",
};
