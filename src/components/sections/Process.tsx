import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { process } from "../../data/steps";
import { EASE, viewportOnce } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import Parallax from "../motion/Parallax";

export default function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const [reached, setReached] = useState(0);
  const total = process.steps.length;

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const count = process.steps.reduce(
      (acc, _, i) => (v >= i / (total - 1) - 0.05 ? i + 1 : acc),
      0
    );
    setReached(count);
  });

  const count = reduced ? total : reached;

  return (
    <section id="process" className="section-y">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            title={process.title}
            description={process.description}
            titleClassName="text-balance"
          />

          <ol ref={listRef} className="relative mt-12 space-y-10">
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-[21px] top-6 w-px bg-line"
            />
            <motion.span
              aria-hidden="true"
              style={{ scaleY: reduced ? 1 : fill }}
              className="absolute bottom-6 left-[21px] top-6 w-px origin-top bg-ink"
            />

            {process.steps.map((step, i) => {
              const on = i < count;
              return (
                <motion.li
                  key={step.id}
                  initial={reduced ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
                  className="relative flex gap-5"
                >
                  <span
                    className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border text-sm font-medium transition-colors duration-500 ${
                      on
                        ? "border-ink bg-ink text-cream"
                        : "border-line bg-cream text-muted"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-sans text-lg font-semibold tracking-normal">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-muted">{step.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <div className="grid grid-cols-2 items-start gap-4 sm:gap-6">
          <Parallax distance={40} className="mt-0">
            <Card
              src={process.images[0].src}
              alt={process.images[0].alt}
              width={1200}
              height={1500}
              className="aspect-[4/5]"
            />
          </Parallax>
          <Parallax distance={-40} className="mt-16 sm:mt-24">
            <Card
              src={process.images[1].src}
              alt={process.images[1].alt}
              width={1200}
              height={1500}
              className="aspect-[4/5]"
            />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
