import type { Variants, Transition } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.5,
  base: 0.8,
  slow: 1.1,
} as const;

export const STAGGER = 0.1;

export const baseTransition: Transition = {
  duration: DURATION.base,
  ease: EASE,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: baseTransition },
};

export const maskReveal: Variants = {
  hidden: { clipPath: "inset(12% 12% 12% 12% round 36px)", opacity: 0 },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 28px)",
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE },
  },
};

export const staggerContainer = (stagger = STAGGER, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const viewportOnce = { once: true, margin: "-80px" } as const;
