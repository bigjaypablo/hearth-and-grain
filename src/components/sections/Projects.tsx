import { useMemo, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, type PanInfo, type Variants } from "framer-motion";
import { filters, projects, type Filter } from "../../data/projects";
import { EASE } from "../../lib/motion";
import SectionHeading from "../ui/SectionHeading";
import Chip from "../ui/Chip";
import SafeImage from "../ui/SafeImage";
import Reveal from "../motion/Reveal";
import { ArrowLeft, ArrowRight } from "../ui/Icons";

const slide: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 70, scale: 1.03 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -70,
    transition: { duration: 0.45, ease: EASE },
  }),
};

const SWIPE = 80;

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const list = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  const current = list[index] ?? list[0];

  const go = (step: number) => {
    setDir(step);
    setIndex((i) => (i + step + list.length) % list.length);
  };

  const onFilter = (f: Filter) => {
    setFilter(f);
    setIndex(0);
    setDir(1);
  };

  const onDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (info.offset.x < -SWIPE) go(1);
    else if (info.offset.x > SWIPE) go(-1);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  return (
    <section id="projects" className="section-y bg-sand/40 pb-0">
      <div className="container-x">
        <SectionHeading
          title="See how we've transformed spaces into beautiful works of art"
          titleClassName="max-w-2xl text-balance"
        />

        <Reveal delay={0.1} className="mt-8">
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <Chip
                key={f}
                group="projects"
                label={f}
                active={filter === f}
                onClick={() => onFilter(f)}
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-8">
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured projects"
            tabIndex={0}
            onKeyDown={onKey}
            className="relative aspect-[4/5] overflow-hidden rounded-card-lg bg-sand sm:aspect-[16/9]"
          >
            <AnimatePresence mode="popLayout" custom={dir} initial={false}>
              <motion.div
                key={current.id}
                custom={dir}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={onDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <SafeImage
                  src={current.image}
                  alt={current.alt}
                  width={1600}
                  height={900}
                  draggable={false}
                  className="pointer-events-none h-full w-full select-none object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute right-4 top-4 flex items-center gap-3 rounded-full bg-cream/95 py-2 pl-2 pr-5 shadow-float backdrop-blur sm:right-6 sm:top-6"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-sage font-serif text-sm text-cream">
                  {current.title.charAt(0)}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-medium">{current.title}</span>
                  <span className="block text-xs text-muted">{current.kind}</span>
                </span>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-4 right-4 flex items-center gap-3 sm:bottom-6 sm:right-6">
              <span
                aria-live="polite"
                className="rounded-full bg-cream/95 px-4 py-2 text-sm font-medium tabular-nums backdrop-blur"
              >
                {index + 1} / {list.length}
              </span>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous project"
                className="grid h-11 w-11 place-items-center rounded-full bg-cream text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                <ArrowLeft />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next project"
                className="grid h-11 w-11 place-items-center rounded-full bg-cream text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
