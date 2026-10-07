import { Link } from "react-router-dom";
import type { Project } from "../../data/projects";
import Card from "./Card";
import { ArrowRight } from "./Icons";

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block"
      aria-label={`${project.title}, ${project.category} project`}
    >
      <Card
        src={project.image}
        alt={project.alt}
        width={1200}
        height={1500}
        className="aspect-[4/5]"
      >
        <span className="pill absolute left-4 top-4 bg-cream/90 px-3 py-1.5 text-xs font-medium backdrop-blur">
          {project.category}
        </span>
        <span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-cream text-ink transition-all duration-500 ease-soft group-hover:-rotate-45 group-hover:bg-sage group-hover:text-cream">
          <ArrowRight />
        </span>
      </Card>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl tracking-display">{project.title}</h3>
          <p className="mt-1 text-sm text-muted">
            {project.kind}, {project.location}
          </p>
        </div>
        <span className="pt-1 text-sm text-muted">{project.year}</span>
      </div>
    </Link>
  );
}
