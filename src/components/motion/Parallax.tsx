import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Pixels of travel in each direction. Negative values reverse the direction. */
  distance?: number;
};

export default function Parallax({ children, className, distance = 60 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
