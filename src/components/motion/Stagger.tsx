import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce, STAGGER } from "../../lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
};

export function Stagger({ children, className, stagger = STAGGER, delay = 0 }: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(stagger, delay)}
    >
      {children}
    </motion.div>
  );
}

type ItemProps = { children: ReactNode; className?: string };

export function StaggerItem({ children, className }: ItemProps) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

export default Stagger;
