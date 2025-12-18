import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Project } from "@/lib/content";

type ProjectsProps = {
  projects: Project[];
};

export function Projects({ projects }: ProjectsProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  const sortedProjects = [...projects].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  return (
    <section id="projects" className="w-full px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl relative inline-block">
          Projects
          <span className="absolute -bottom-2 left-0 h-1 w-12 bg-primary rounded-full" />
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {sortedProjects.map((project) => {
            const title = project.title ?? "";
            const description = project.description ?? "";
            const technologies =
              project.technologies?.filter((t): t is string => t !== null) ??
              [];
            const projectUrl = project.projectUrl ?? undefined;
            const githubUrl = project.githubUrl ?? undefined;
            const image = project.image;

            return (
              <Card
                key={project.title}
                className="flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20"
              >
                {image?.url && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={image.url}
                      alt={image.title || title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors duration-200">
                    {title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">
                    {description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {technologies.map((tech: string) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {projectUrl && (
                      <a
                        href={projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View Project
                        </Button>
                      </a>
                    )}
                    {githubUrl && (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
