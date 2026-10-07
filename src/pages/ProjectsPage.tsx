import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { filters, projects, type Filter } from "../data/projects";
import { usePageTitle } from "../hooks/usePageTitle";
import PageHeader from "../components/ui/PageHeader";
import Chip from "../components/ui/Chip";
import ProjectCard from "../components/ui/ProjectCard";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import CTA from "../components/sections/CTA";

export default function ProjectsPage() {
  usePageTitle("Projects");
  const [params, setParams] = useSearchParams();

  const raw = params.get("category");
  const filter: Filter = filters.find((f) => f === raw) ?? "All";

  const list = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  const onFilter = (f: Filter) => {
    setParams(f === "All" ? {} : { category: f }, { replace: true });
  };

  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title="Homes we have had the pleasure of designing"
        description="A look at recent living rooms, bedrooms, dining spaces and outdoor retreats. Tap any project for the full story."
      >
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Chip
              key={f}
              group="projects-page"
              label={f}
              active={filter === f}
              onClick={() => onFilter(f)}
            />
          ))}
        </div>
      </PageHeader>

      <section className="container-x pb-20 sm:pb-28">
        <p className="mb-6 text-sm text-muted" aria-live="polite">
          {list.length} {list.length === 1 ? "project" : "projects"}
        </p>

        <Stagger
          key={filter}
          stagger={0.08}
          className="grid gap-x-5 gap-y-12 sm:grid-cols-2 md:gap-x-8"
        >
          {list.map((p) => (
            <StaggerItem key={p.id} className="sm:even:mt-14">
              <ProjectCard project={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTA />
    </>
  );
}
