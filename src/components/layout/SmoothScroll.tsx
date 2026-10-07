import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { frame, cancelFrame } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

let instance: Lenis | null = null;

export function scrollToTop(immediate = false): void {
  if (instance) instance.scrollTo(0, { immediate, force: true });
  else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}

type Props = { children: ReactNode };

export default function SmoothScroll({ children }: Props) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    });
    instance = lenis;

    const update = (data: { timestamp: number }) => lenis.raf(data.timestamp);
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
      instance = null;
    };
  }, [reduced]);

  return <>{children}</>;
}
