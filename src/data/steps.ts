import { unsplash } from "../lib/unsplash";

export type Step = { id: string; number: string; title: string; text: string };

export const process = {
  title: "Your home in simple steps",
  description:
    "A clear, calm process with no surprises. You always know what is happening and what comes next.",
  steps: [
    {
      id: "s1",
      number: "01",
      title: "Discovery call",
      text: "We talk through how you live, what you love and what is not working, then agree on scope and budget.",
    },
    {
      id: "s2",
      number: "02",
      title: "Design and planning",
      text: "We help you pick the perfect style and build a plan with layouts, materials and mood boards that fit your space and needs.",
    },
    {
      id: "s3",
      number: "03",
      title: "Sourcing and build",
      text: "We source furniture and finishes from trusted makers and manage every order, delivery and fitter.",
    },
    {
      id: "s4",
      number: "04",
      title: "Execution and reveal",
      text: "Our team handles the details from delivery to installation, so you can just enjoy the result.",
    },
  ] satisfies Step[],
  images: [
    {
      src: unsplash("photo-1618221195710-dd6b41faaea6", 1200),
      alt: "Interior design material samples and swatches laid out on a table",
    },
    {
      src: unsplash("photo-1616486338812-3dadae4b4ace", 1200),
      alt: "Finished living room with an arched window and warm neutral furniture",
    },
  ],
} as const;
