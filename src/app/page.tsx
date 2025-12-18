import { Navigation } from "@/components/Navigation";
import { ScrollToTop } from "@/components/ScrollToTop";
import { StructuredData } from "@/components/StructuredData";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience as ExperienceSection } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import {
  getAboutSection,
  getExperiences,
  getHeroSection,
  getProjects,
  getSkillCategories,
} from "@/lib/content";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // Fetch all content in parallel
  const [hero, about, experiences, skillCategories, projects] =
    await Promise.all([
      getHeroSection(),
      getAboutSection(),
      getExperiences(),
      getSkillCategories(),
      getProjects(),
    ]);

  if (!hero || !about) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">
          Content is being set up. Please check the content directory.
        </p>
      </div>
    );
  }

  return (
    <>
      <StructuredData hero={hero} />
      <Navigation />
      <main className="min-h-screen">
        <Hero hero={hero} />
        <About about={about} />
        <ExperienceSection experiences={experiences} />
        <Skills skillCategories={skillCategories} />
        <Projects projects={projects} />
        <Contact hero={hero} />
      </main>
      <ScrollToTop />
    </>
  );
}
