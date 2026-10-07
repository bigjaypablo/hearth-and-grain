import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import { usePageTitle } from "../hooks/usePageTitle";
import NotFound from "./NotFound";
import TextReveal from "../components/motion/TextReveal";
import Reveal from "../components/motion/Reveal";
import Parallax from "../components/motion/Parallax";
import SafeImage from "../components/ui/SafeImage";
import Card from "../components/ui/Card";
import CTA from "../components/sections/CTA";
import { ArrowLeft, ArrowRight } from "../components/ui/Icons";

export default function ProjectDetail() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  usePageTitle(project?.title);

  if (!project) return <NotFound />;

  const next = projects[(index + 1) % projects.length];
  const meta = [
    { label: "Location", value: project.location },
    { label: "Year", value: project.year },
    { label: "Area", value: project.area },
    { label: "Duration", value: project.duration },
  ];

  return (
    <>
      <header className="container-x pb-10 pt-36 sm:pb-14 sm:pt-44">
        <Reveal>
          <Link
            to="/projects"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="transition-transform duration-500 ease-soft group-hover:-translate-x-1" />
            All projects
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-sage">
            {project.category}, {project.kind}
          </p>
        </Reveal>
        <TextReveal
          as="h1"
          trigger="mount"
          delay={0.15}
          text={project.title}
          className="text-display-lg max-w-4xl text-balance"
        />
        <Reveal delay={0.5}>
          <p className="mt-6 max-w-xl text-lg text-muted">{project.summary}</p>
        </Reveal>

        <Reveal delay={0.6}>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="border-t border-line pt-4">
                <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  {m.label}
                </dt>
                <dd className="mt-1.5 font-medium">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      <section className="container-x">
        <div className="overflow-hidden rounded-card-lg bg-sand">
          <Parallax distance={50}>
            <SafeImage
              src={project.image}
              alt={project.alt}
              width={1600}
              height={1000}
              loading="eager"
              className="h-[55vh] w-full scale-110 object-cover sm:h-[75vh]"
            />
          </Parallax>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-3 lg:gap-16">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">Overview</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-2xl">The brief</h2>
            <p className="mt-4 text-muted">{project.challenge}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="text-2xl">Our approach</h2>
            <p className="mt-4 text-muted">{project.approach}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-20 sm:pb-28">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {project.gallery.map((src, i) => (
            <Reveal key={src} className={i === 0 ? "sm:col-span-2" : ""}>
              <Card
                src={src}
                alt={`${project.title}, detail ${i + 1}`}
                width={1400}
                height={i === 0 ? 788 : 1000}
                className={i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-4">
        <Reveal>
          <Link
            to={`/projects/${next.slug}`}
            className="group relative block overflow-hidden rounded-card-lg bg-sand"
          >
            <SafeImage
              src={next.image}
              alt={next.alt}
              width={1600}
              height={700}
              className="h-[320px] w-full object-cover transition-transform duration-[1100ms] ease-soft group-hover:scale-[1.05] sm:h-[420px]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-ink/10"
            />
            <span className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-cream sm:inset-x-10 sm:bottom-10">
              <span>
                <span className="block text-xs font-medium uppercase tracking-[0.18em] text-cream/70">
                  Next project
                </span>
                <span className="mt-2 block font-serif text-3xl tracking-display sm:text-5xl">
                  {next.title}
                </span>
              </span>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cream text-ink transition-all duration-500 ease-soft group-hover:-rotate-45 group-hover:bg-sage group-hover:text-cream">
                <ArrowRight />
              </span>
            </span>
          </Link>
        </Reveal>
      </section>

      <CTA />
    </>
  );
}
