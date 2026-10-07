export const contact = {
  eyebrow: "Contact",
  title: "Tell us about your space",
  description:
    "Share a few details and we will reply within two working days to set up a free, no-pressure first call.",
  details: [
    { label: "Email", value: "hello@hearthandgrain.studio", href: "mailto:hello@hearthandgrain.studio" },
    { label: "Phone", value: "+1 555 014 2290", href: "tel:+15550142290" },
    { label: "Studio", value: "Studio 3, 12 Orchard Lane" },
    { label: "Hours", value: "Mon to Fri, 9am to 6pm" },
  ],
  next: [
    { title: "We reply", text: "Within two working days." },
    { title: "Discovery call", text: "A relaxed 30 minute chat about your space and goals." },
    { title: "Proposal", text: "A clear scope, timeline and fee, with no surprises." },
  ],
  projectTypes: ["Full home", "Single room", "Furniture only", "Outdoor"],
  budgets: ["Under $10k", "$10k to $25k", "$25k to $60k", "$60k+"],
} as const;
