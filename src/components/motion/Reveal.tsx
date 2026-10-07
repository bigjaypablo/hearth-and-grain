import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE, DURATION, viewportOnce } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  x = 0,
  duration = DURATION.base,
}: Props) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={viewportOnce}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
