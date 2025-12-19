"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <Card className="flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20 py-0 w-full h-full scroll-zoom-in">
      {image?.url && (
        <div className="relative w-full aspect-3/2 overflow-hidden">
          <Image
            src={image.url}
            alt={image.title || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            <a href={projectUrl} target="_blank" rel="noopener noreferrer">
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
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
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
}
