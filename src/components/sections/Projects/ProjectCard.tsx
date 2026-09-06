"use client";

import { ExternalLink, GitBranch } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const title = project.title ?? "";
  const description = project.description ?? "";
  const technologies =
    project.technologies?.filter((t): t is string => t !== null) ?? [];
  const projectUrl = project.projectUrl ?? undefined;
  const githubUrl = project.githubUrl ?? undefined;
  const image = project.image;

  return (
    <article className="group scroll-zoom-in flex h-full flex-col overflow-hidden surface-elevated transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
      {image?.url && (
        <div className="relative aspect-3/2 overflow-hidden">
          <Image
            src={image.url}
            alt={image.title || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-lg font-semibold tracking-tight transition-colors duration-200 group-hover:text-primary">
          {title}
        </h3>
        <p className="mb-5 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {technologies.map((tech: string) => (
            <Badge
              key={tech}
              variant="outline"
              className="bg-background/50 text-[0.7rem] font-normal"
            >
              {tech}
            </Badge>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {projectUrl && (
            <a href={projectUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 bg-background/60"
              >
                <ExternalLink className="size-3.5" />
                View project
              </Button>
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 bg-background/60"
              >
                <GitBranch className="size-3.5" />
                GitHub
              </Button>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
