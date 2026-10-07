export type NavItem = { to: string; label: string };

export const nav: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export const navCta = { label: "Book a call", href: "/contact" };
