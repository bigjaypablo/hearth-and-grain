import { about } from "../data/about";
import { usePageTitle } from "../hooks/usePageTitle";
import PageHeader from "../components/ui/PageHeader";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Parallax from "../components/motion/Parallax";
import Reveal from "../components/motion/Reveal";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import Stats from "../components/sections/Stats";
import CTA from "../components/sections/CTA";
import { ArrowRight } from "../components/ui/Icons";

export default function About() {
  usePageTitle("About");
  const { story, values, team } = about;

  return (
    <>
      <PageHeader eyebrow={about.eyebrow} title={about.title} description={about.description} />

      <section className="container-x pb-20 sm:pb-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="grid grid-cols-2 items-start gap-4 sm:gap-6">
            <Parallax distance={36}>
              <Card
                src={story.images[0].src}
                alt={story.images[0].alt}
                width={1200}
                height={1500}
                className="aspect-[4/5]"
              />
            </Parallax>
            <Parallax distance={-36} className="mt-14 sm:mt-20">
              <Card
                src={story.images[1].src}
                alt={story.images[1].alt}
                width={1200}
                height={1500}
                className="aspect-[4/5]"
              />
            </Parallax>
          </div>

          <div className="lg:pt-10">
            <SectionHeading title={story.title} titleClassName="text-balance" />
            <div className="mt-6 space-y-5 text-muted">
              {story.paragraphs.map((p, i) => (
                <Reveal key={p} delay={0.1 * i}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2} className="mt-8">
              <Button href="/projects" icon={<ArrowRight />}>
                See our projects
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-y bg-sand/40">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we believe"
            title={about.valuesHeading}
            titleClassName="max-w-xl text-balance"
          />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => (
              <StaggerItem key={v.title} className="rounded-card bg-cream p-8">
                <span className="font-serif text-4xl text-wood">{`0${i + 1}`}</span>
                <h3 className="mt-6 text-2xl">{v.title}</h3>
                <p className="mt-3 text-muted">{v.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <SectionHeading title={about.teamHeading} />
          <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {team.map((m) => (
              <StaggerItem key={m.id}>
                <Card src={m.image} alt={m.alt} width={800} height={1000} className="aspect-[4/5]" />
                <h3 className="mt-4 font-serif text-xl tracking-display">{m.name}</h3>
                <p className="text-sm text-muted">{m.role}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Stats />
      <CTA />
    </>
  );
}
