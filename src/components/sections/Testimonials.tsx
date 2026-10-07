import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials, testimonialsHeading } from "../../data/testimonials";
import { EASE } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../motion/Reveal";
import SafeImage from "../ui/SafeImage";
import { StarIcon } from "../ui/Icons";

const INTERVAL = 6000;

function Avatar({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className="grid h-12 w-12 place-items-center rounded-full bg-sage font-serif text-cream"
      >
        {initials}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={48}
      height={48}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-12 w-12 rounded-full object-cover"
    />
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const current = testimonials[index];

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      INTERVAL
    );
    return () => window.clearInterval(id);
  }, [reduced, paused]);

  return (
    <section className="section-y bg-sand/40">
      <div className="container-x">
        <SectionHeading title={testimonialsHeading} titleClassName="max-w-xl text-balance" />

        <Reveal delay={0.15} className="mt-10">
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="grid gap-4 lg:grid-cols-5 lg:gap-5"
          >
            <figure className="flex flex-col justify-between rounded-card-lg bg-cream p-7 sm:p-10 lg:col-span-2">
              <div className="min-h-[220px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <div
                      className="flex gap-1 text-wood"
                      role="img"
                      aria-label={`${current.rating} out of 5 stars`}
                    >
                      {Array.from({ length: current.rating }).map((_, i) => (
                        <StarIcon key={i} width={18} height={18} />
                      ))}
                    </div>
                    <blockquote className="mt-6 font-serif text-xl leading-snug tracking-display sm:text-2xl">
                      &ldquo;{current.quote}&rdquo;
                    </blockquote>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.figcaption
                    key={current.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <Avatar src={current.avatar} name={current.name} />
                    <span className="leading-tight">
                      <span className="block font-medium">{current.name}</span>
                      <span className="block text-sm text-muted">{current.role}</span>
                    </span>
                  </motion.figcaption>
                </AnimatePresence>

                <div role="tablist" aria-label="Choose testimonial" className="flex gap-2">
                  {testimonials.map((t, i) => (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Show testimonial from ${t.name}`}
                      onClick={() => setIndex(i)}
                      className="grid h-6 w-6 place-items-center"
                    >
                      <span
                        className={`block h-2 rounded-full transition-all duration-500 ease-soft ${
                          i === index ? "w-6 bg-ink" : "w-2 bg-line"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </figure>

            <div className="relative min-h-[320px] overflow-hidden rounded-card-lg bg-sand sm:min-h-[420px] lg:col-span-3">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: EASE }}
                  className="absolute inset-0"
                >
                  <SafeImage
                    src={current.image}
                    alt={current.imageAlt}
                    width={1400}
                    height={900}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
