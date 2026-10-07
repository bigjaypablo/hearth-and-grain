import { usePageTitle } from "../hooks/usePageTitle";
import Hero from "../components/sections/Hero";
import Philosophy from "../components/sections/Philosophy";
import Projects from "../components/sections/Projects";
import Process from "../components/sections/Process";
import Testimonials from "../components/sections/Testimonials";
import Stats from "../components/sections/Stats";
import CTA from "../components/sections/CTA";
import Button from "../components/ui/Button";
import Reveal from "../components/motion/Reveal";
import { ArrowRight } from "../components/ui/Icons";

export default function Home() {
  usePageTitle();

  return (
    <>
      <Hero />
      <Philosophy />
      <Projects />
      <div className="bg-sand/40 pb-20 pt-10 text-center sm:pb-28">
        <Reveal>
          <Button href="/projects" icon={<ArrowRight />}>
            View all projects
          </Button>
        </Reveal>
      </div>
      <Process />
      <Testimonials />
      <Stats />
      <CTA />
    </>
  );
}
