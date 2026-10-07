import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { philosophy, type BentoItem } from "../../data/collections";
import { maskReveal, viewportOnce } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import TextReveal from "../motion/TextReveal";
import Reveal from "../motion/Reveal";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { ArrowRight } from "../ui/Icons";

const MotionLink = motion.create(Link);
function BentoCard({ item, className = "" }: { item: BentoItem; className?: string }) {
  const reduced = useReducedMotion();
  const large = item.size === "large";

  return (
    <MotionLink
      to="/projects"
      aria-label={`${item.title}: view projects`}
      className={`group block ${className}`}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
      variants={maskReveal}
    >
      <Card
        src={item.image}
        alt={item.alt}
        width={large ? 1400 : 1000}
        height={large ? 1200 : 700}
        className="h-full min-h-[300px] sm:min-h-[340px]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent"
        />

        <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-cream text-ink transition-transform duration-500 ease-soft group-hover:-rotate-45 group-hover:bg-sage group-hover:text-cream sm:right-5 sm:top-5">
          <ArrowRight />
        </span>

        <span className="absolute inset-x-5 bottom-5 text-cream sm:inset-x-7 sm:bottom-7">
          <span className="block font-serif text-2xl tracking-display sm:text-3xl">
            {item.title}
          </span>
          <span className="mt-2 block max-w-xs text-sm text-cream/80">{item.text}</span>
        </span>
      </Card>
    </MotionLink>
  );
}

export default function Philosophy() {
  const [large, ...small] = philosophy.items;

  return (
    <section id="collections" className="section-y">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <TextReveal
            as="h2"
            text={philosophy.title}
            className="text-display-lg max-w-xl text-balance"
          />
          <Reveal delay={0.15} className="lg:justify-self-end lg:max-w-md">
            <p className="text-muted">{philosophy.description}</p>
            <div className="mt-6">
              <Button href={philosophy.cta.href} icon={<ArrowRight />}>
                {philosophy.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 md:gap-5 lg:grid-cols-3 lg:grid-rows-2">
          <BentoCard item={large} className="lg:col-span-2 lg:row-span-2" />
          {small.map((item) => (
            <BentoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
