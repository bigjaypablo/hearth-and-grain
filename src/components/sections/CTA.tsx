import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cta } from "../../data/footer";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import TextReveal from "../motion/TextReveal";
import Reveal from "../motion/Reveal";
import MagneticButton from "../motion/MagneticButton";
import Button from "../ui/Button";
import SafeImage from "../ui/SafeImage";
import { ArrowRight } from "../ui/Icons";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="contact" ref={ref} className="px-3 pt-20 sm:px-4 sm:pt-28">
      <div className="relative overflow-hidden rounded-card-lg bg-ink">
        <motion.div
          style={reduced ? undefined : { y }}
          className="absolute inset-x-0 -inset-y-[10%] will-change-transform"
        >
          <SafeImage
            src={cta.image}
            alt={cta.imageAlt}
            width={2000}
            height={1200}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 bg-ink/60" />

        <div className="container-x relative z-10 flex flex-col items-center py-24 text-center sm:py-32 lg:py-40">
          <Reveal>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-cream/75">
              {cta.eyebrow}
            </p>
          </Reveal>

          <TextReveal
            as="h2"
            text={cta.title}
            className="text-display-lg max-w-3xl text-balance text-cream"
          />

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-cream/80">{cta.description}</p>
          </Reveal>

          <Reveal delay={0.3} className="mt-10">
            <MagneticButton>
              <Button
                href="/contact"
                variant="light"
                icon={<ArrowRight />}
                className="px-8 py-4 text-base"
              >
                {cta.button.label}
              </Button>
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
