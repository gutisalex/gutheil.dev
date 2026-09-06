import { SectionHeader } from "@/components/SectionHeader";
import type { Project } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";
import { ProjectsCarousel } from "./ProjectsCarousel";

type ProjectsProps = {
  projects: Project[];
};

export function Projects({ projects }: ProjectsProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section
      id="projects"
      className="relative w-full border-t border-border/60 bg-muted/30 px-4 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader label="04 — Projects" title="Selected work" />

        <div className="hidden gap-6 md:grid md:grid-cols-2 scroll-stagger">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="md:hidden">
          <ProjectsCarousel projects={projects} />
        </div>
      </div>
    </section>
  );
}
