import TextReveal from "../motion/TextReveal";
import Reveal from "../motion/Reveal";

type Props = {
  title: string;
  eyebrow?: string;
  description?: string;
  className?: string;
  titleClassName?: string;
};

export default function SectionHeading({
  title,
  eyebrow,
  description,
  className = "",
  titleClassName = "",
}: Props) {
  return (
    <div className={className}>
      {eyebrow && (
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-sage">
            {eyebrow}
          </p>
        </Reveal>
      )}
      <TextReveal as="h2" text={title} className={`text-display-md ${titleClassName}`} />
      {description && (
        <Reveal delay={0.15}>
          <p className="mt-5 max-w-md text-muted">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
