import type { ReactNode } from "react";
import TextReveal from "../motion/TextReveal";
import Reveal from "../motion/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function PageHeader({ eyebrow, title, description, children }: Props) {
  return (
    <header className="container-x pb-12 pt-36 sm:pb-16 sm:pt-44">
      <Reveal delay={0.1}>
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-sage">
          {eyebrow}
        </p>
      </Reveal>
      <TextReveal
        as="h1"
        trigger="mount"
        delay={0.2}
        text={title}
        className="text-display-lg max-w-4xl text-balance"
      />
      {description && (
        <Reveal delay={0.6}>
          <p className="mt-6 max-w-xl text-lg text-muted">{description}</p>
        </Reveal>
      )}
      {children && (
        <Reveal delay={0.75} className="mt-8">
          {children}
        </Reveal>
      )}
    </header>
  );
}
