import { motion, type Variants } from "framer-motion";
import { EASE, DURATION, viewportOnce, staggerContainer } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

type Props = {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: "view" | "mount";
  /** Words to style differently, for example "like you". Punctuation is ignored when matching. */
  highlight?: string;
  highlightClassName?: string;
};

const word: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: DURATION.base + 0.1, ease: EASE } },
};

const clean = (w: string): string => w.replace(/[.,!?;:]/g, "").toLowerCase();

export default function TextReveal({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  trigger = "view",
  highlight,
  highlightClassName = "italic text-glow",
}: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;
  const words = text.split(" ");
  const marked = new Set((highlight ?? "").split(" ").filter(Boolean).map(clean));
  // aria-label is only allowed on headings. Paragraphs and spans get hidden text instead.
  const isHeading = as === "h1" || as === "h2" || as === "h3";

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{text}</Plain>;
  }

  const triggerProps =
    trigger === "mount"
      ? { animate: "visible" as const }
      : { whileInView: "visible" as const, viewport: viewportOnce };

  return (
    <Tag
      className={className}
      aria-label={isHeading ? text : undefined}
      initial="hidden"
      variants={staggerContainer(stagger, delay)}
      {...triggerProps}
    >
      {!isHeading && <span className="sr-only">{text}</span>}
      {words.map((w, i) => {
        const hl = marked.has(clean(w));
        return (
          <span
            key={`${w}-${i}`}
            aria-hidden="true"
            className={`inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-top ${
              hl ? "pr-[0.1em] -mr-[0.1em]" : ""
            }`}
          >
            <motion.span
              variants={word}
              className={`inline-block will-change-transform ${hl ? highlightClassName : ""}`}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
