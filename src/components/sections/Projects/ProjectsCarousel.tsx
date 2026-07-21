"use client";

import AutoHeight from "embla-carousel-auto-height";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Project } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";

type ProjectsCarouselProps = {
  projects: Project[];
};

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const hasMultipleProjects = projects.length > 1;

  return (
    <Carousel
      opts={{
        align: "start",
        loop: hasMultipleProjects,
      }}
      plugins={[AutoHeight()]}
      className="w-full"
    >
      <CarouselContent>
        {projects.map((project) => (
          <CarouselItem key={project.title} className="basis-full flex">
            <ProjectCard project={project} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {hasMultipleProjects && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <CarouselPrevious className="static! translate-x-0! translate-y-0!" />
          <CarouselDots />
          <CarouselNext className="static! translate-x-0! translate-y-0!" />
        </div>
      )}
    </Carousel>
  );
}
