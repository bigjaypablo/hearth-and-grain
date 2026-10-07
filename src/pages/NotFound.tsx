import { usePageTitle } from "../hooks/usePageTitle";
import Reveal from "../components/motion/Reveal";
import TextReveal from "../components/motion/TextReveal";
import Button from "../components/ui/Button";
import { ArrowRight } from "../components/ui/Icons";

export default function NotFound() {
  usePageTitle("Page not found");

  return (
    <section className="container-x flex min-h-[85svh] flex-col items-start justify-center pb-16 pt-32">
      <Reveal>
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-sage">Error 404</p>
      </Reveal>
      <TextReveal
        as="h1"
        trigger="mount"
        delay={0.1}
        text="This room does not exist yet"
        className="text-display-lg max-w-2xl text-balance"
      />
      <Reveal delay={0.5}>
        <p className="mt-6 max-w-md text-lg text-muted">
          The page you are looking for has moved or never existed. Let us get you back to the good stuff.
        </p>
      </Reveal>
      <Reveal delay={0.65} className="mt-8 flex flex-wrap gap-3">
        <Button href="/" icon={<ArrowRight />}>
          Back to home
        </Button>
        <Button href="/projects" variant="light" className="border border-line">
          View projects
        </Button>
      </Reveal>
    </section>
  );
}
