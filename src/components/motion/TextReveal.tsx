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
};

const word: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: DURATION.base + 0.1, ease: EASE } },
};

export default function TextReveal({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  trigger = "view",
}: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;
  const words = text.split(" ");

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
      aria-label={text}
      initial="hidden"
      variants={staggerContainer(stagger, delay)}
      {...triggerProps}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-top"
        >
          <motion.span variants={word} className="inline-block will-change-transform">
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
