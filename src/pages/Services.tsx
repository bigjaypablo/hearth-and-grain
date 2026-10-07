import { faqs, services, servicesPage } from "../data/services";
import { usePageTitle } from "../hooks/usePageTitle";
import PageHeader from "../components/ui/PageHeader";
import SectionHeading from "../components/ui/SectionHeading";
import Accordion from "../components/ui/Accordion";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Reveal from "../components/motion/Reveal";
import TextReveal from "../components/motion/TextReveal";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import Process from "../components/sections/Process";
import CTA from "../components/sections/CTA";
import { ArrowRight, CheckIcon } from "../components/ui/Icons";

export default function Services() {
  usePageTitle("Services");

  return (
    <>
      <PageHeader
        eyebrow={servicesPage.eyebrow}
        title={servicesPage.title}
        description={servicesPage.description}
      />

      <section className="container-x space-y-20 pb-20 sm:space-y-28 sm:pb-28">
        {services.map((s, i) => (
          <div key={s.id} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
            <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
              <Card
                src={s.image}
                alt={s.alt}
                width={1400}
                height={1050}
                className="aspect-[4/3]"
              />
            </Reveal>

            <div>
              <Reveal>
                <p className="font-serif text-3xl text-wood">{`0${i + 1}`}</p>
              </Reveal>
              <TextReveal as="h2" text={s.title} className="mt-3 text-display-md" />
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-md text-muted">{s.text}</p>
              </Reveal>

              <Stagger className="mt-6 space-y-3">
                {s.includes.map((item) => (
                  <StaggerItem key={item}>
                    <div className="flex items-center gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage text-cream">
                        <CheckIcon width={14} height={14} />
                      </span>
                      <span>{item}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal delay={0.15}>
                <p className="mt-6 text-sm text-muted">
                  Typical timeline: <span className="font-medium text-ink">{s.timeline}</span>
                </p>
                <div className="mt-6">
                  <Button href="/contact" icon={<ArrowRight />}>
                    Enquire about this
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        ))}
      </section>

      <Process />

      <section className="section-y bg-sand/40">
        <div className="container-x grid gap-12 lg:grid-cols-5 lg:gap-20">
          <SectionHeading
            title="Questions we hear a lot"
            description="Cannot find your answer here? Send us a message and we will get back to you."
            className="lg:col-span-2"
            titleClassName="text-balance"
          />
          <Reveal delay={0.1} className="lg:col-span-3">
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
