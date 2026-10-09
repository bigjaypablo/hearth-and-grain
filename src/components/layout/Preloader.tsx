import { useEffect, useRef } from "react";
import { animate, motion } from "framer-motion";
import { site } from "../../data/site";
import { EASE } from "../../lib/motion";

type Props = { onDone: () => void };

const LOAD_EASE = [0.65, 0, 0.35, 1] as const;

export default function Preloader({ onDone }: Props) {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let timeout: number | undefined;

    const controls = animate(0, 100, {
      duration: 1,
      ease: LOAD_EASE,
      onUpdate: (v) => {
        if (countRef.current) countRef.current.textContent = String(Math.round(v));
      },
      onComplete: () => {
        timeout = window.setTimeout(onDone, 180);
      },
    });

    return () => {
      controls.stop();
      if (timeout) window.clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  return (
    <motion.div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center rounded-b-[48px] bg-ink text-cream"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.9, ease: EASE } }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="flex items-center gap-3 font-serif text-3xl tracking-display"
      >
        {site.name}
      </motion.div>

      <div className="mt-8 h-px w-44 overflow-hidden bg-cream/20">
        <motion.div
          className="h-full origin-left bg-cream"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: LOAD_EASE }}
        />
      </div>

      <span ref={countRef} className="mt-4 text-xs tabular-nums text-cream/60">
        0
      </span>
    </motion.div>
  );
}
