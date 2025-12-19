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
    <section id="projects" className="w-full px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl relative inline-block scroll-fade-in">
          Projects
          <span className="absolute -bottom-2 left-0 h-1 w-12 bg-primary rounded-full" />
        </h2>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 scroll-stagger">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* Mobile Carousel Layout */}
        <div className="md:hidden">
          <ProjectsCarousel projects={projects} />
        </div>
      </div>
    </section>
  );
}
