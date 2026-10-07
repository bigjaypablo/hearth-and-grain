import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "../../data/site";
import { EASE } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import TextReveal from "../motion/TextReveal";
import Reveal from "../motion/Reveal";
import { Stagger, StaggerItem } from "../motion/Stagger";
import Button from "../ui/Button";
import SafeImage from "../ui/SafeImage";
import { ArrowRight } from "../ui/Icons";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { hero, heroCategories } = site;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="home" ref={ref} className="p-3 sm:p-4">
      <motion.div
        style={reduced ? undefined : { scale: cardScale, transformOrigin: "50% 0%" }}
        className="relative flex min-h-[calc(100svh-1.5rem)] flex-col justify-end overflow-hidden rounded-card-lg bg-sand sm:min-h-[calc(100svh-2rem)]"
      >
        <motion.div
          style={reduced ? undefined : { y: imgY }}
          className="absolute inset-x-0 -inset-y-[12%] will-change-transform"
        >
          <motion.div
            className="h-full w-full"
            initial={reduced ? false : { scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: EASE }}
          >
            <SafeImage
              src={hero.image}
              alt={hero.imageAlt}
              width={2000}
              height={1300}
              loading="eager"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </motion.div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-ink/25"
        />

        <motion.div
          style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
          className="relative z-10 p-6 pt-32 sm:p-10 lg:p-14"
        >
          <Reveal delay={0.2}>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-cream/75">
              {hero.eyebrow}
            </p>
          </Reveal>

          <TextReveal
            as="h1"
            trigger="mount"
            delay={0.35}
            text={hero.title}
            className="text-display-xl max-w-3xl text-balance text-cream"
          />

          <Reveal delay={0.9} className="mt-6">
            <p className="max-w-md text-base text-cream/80 sm:text-lg">{hero.description}</p>
          </Reveal>

          <Reveal delay={1.05} className="mt-8 flex flex-wrap gap-3">
            <Button href={hero.primaryCta.href} variant="light" icon={<ArrowRight />}>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="glass">
              {hero.secondaryCta.label}
            </Button>
          </Reveal>

          <Reveal delay={1.2} className="mt-10">
            <p className="mb-3 text-sm text-cream/75">{hero.collectionLabel}</p>
          </Reveal>

          <Stagger delay={1.25} stagger={0.1} className="grid grid-cols-4 gap-2 sm:gap-4">
            {heroCategories.map((c) => (
              <StaggerItem key={c.label}>
                <Link
                  to={`/projects?category=${encodeURIComponent(c.label)}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-sand/40 sm:aspect-[4/3]"
                >
                  <SafeImage
                    src={c.image}
                    alt={c.alt}
                    width={600}
                    height={450}
                    loading="eager"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-soft group-hover:scale-[1.08]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent"
                  />
                  <span className="absolute bottom-2 left-2 right-2 text-[11px] font-medium leading-tight text-cream sm:bottom-3 sm:left-3 sm:text-sm">
                    {c.label}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </motion.div>
      </motion.div>
    </section>
  );
}
