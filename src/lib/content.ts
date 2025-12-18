import { readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";

// Content directory path
const contentDirectory = join(process.cwd(), "content");

// Content types for the portfolio site
export interface HeroSection {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedInUrl: string;
  profileImage?: {
    url: string;
    title?: string;
  };
}

export interface AboutSection {
  title: string;
  summary: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description: string;
  achievements?: string;
  order: number;
}

export interface SkillCategory {
  categoryName: string;
  skills: string[];
  order: number;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  image?: {
    url: string;
    title?: string;
  };
  featured: boolean;
  order: number;
}

// Raw data types from markdown frontmatter (may have different shapes)
interface RawHeroData {
  name?: string;
  title?: string;
  location?: string;
  email?: string;
  linkedInUrl?: string;
  profileImage?: string | { url: string; title?: string };
  profileImageTitle?: string;
}

interface RawSkillCategoryData {
  categoryName?: string;
  skills?: string[] | string;
  order?: number;
}

interface RawProjectData {
  title?: string;
  description?: string;
  technologies?: string[] | string;
  projectUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  imageTitle?: string;
  featured?: boolean;
  order?: number;
}

// Helper to read and parse a Markdown file
async function readMarkdownFile<T>(filename: string): Promise<T> {
  const filePath = join(contentDirectory, filename);
  const fileContents = await readFile(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Merge frontmatter with content
  // For about section, content becomes summary
  const result: Record<string, unknown> = { ...data };
  if (content.trim()) {
    result.summary = content.trim();
  }
  return result as T;
}

// Helper to read multiple items from a single Markdown file
async function readMarkdownCollection<T>(filename: string): Promise<T[]> {
  const filePath = join(contentDirectory, filename);

  let fileContents: string;
  try {
    fileContents = await readFile(filePath, "utf8");
  } catch (_error) {
    // File doesn't exist, return empty array
    return [];
  }

  // The format is: ---\nfrontmatter\n---\n\ncontent\n---\n\n---\nnext frontmatter...
  // Split by the separator pattern: \n---\n\n (three dashes on a line by itself)
  const rawSections = fileContents.split(/\n---\n\n/);

  const sections: string[] = [];

  // Process each section - merge frontmatter with following content
  for (let i = 0; i < rawSections.length; i++) {
    const section = rawSections[i].trim();
    if (!section) continue;

    // If this section starts with ---, it's a frontmatter block
    if (section.startsWith("---")) {
      // Check if the next section is content (doesn't start with ---)
      if (i + 1 < rawSections.length) {
        const nextSection = rawSections[i + 1].trim();
        // If next section doesn't start with ---, it's content for this entry
        if (nextSection && !nextSection.startsWith("---")) {
          // The frontmatter section ends with the closing --- (which was removed by split)
          // We need to add it back before the content
          const frontmatterEnd = section.endsWith("---") ? "" : "\n---";
          // Merge frontmatter with content, ensuring proper closing
          sections.push(`${section}${frontmatterEnd}\n\n${nextSection}`);
          i++; // Skip the next section since we've merged it
        } else {
          // No content, just frontmatter - add closing if missing
          if (!section.endsWith("---")) {
            sections.push(`${section}\n---`);
          } else {
            sections.push(section);
          }
        }
      } else {
        // Last section, just frontmatter - add closing if missing
        if (!section.endsWith("---")) {
          sections.push(`${section}\n---`);
        } else {
          sections.push(section);
        }
      }
    }
    // If section doesn't start with ---, it's orphaned content (shouldn't happen with correct format)
  }

  return sections
    .map((section) => {
      const trimmed = section.trim();
      if (!trimmed) return null;

      // Parse frontmatter and content
      const { data, content } = matter(trimmed);

      // Skip if no data (empty section)
      if (!data || Object.keys(data).length === 0) {
        return null;
      }

      const result: Record<string, unknown> = { ...data };

      if (content.trim()) {
        // Check if this is an experience with achievements
        if (content.includes("## Achievements")) {
          const parts = content.split("## Achievements");
          result.description = parts[0].trim();
          result.achievements = parts[1]?.trim() || "";
        } else {
          result.description = content.trim();
        }
      }

      return result as T;
    })
    .filter((item): item is T => item !== null);
}

// Fetch hero section
export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    const hero = await readMarkdownFile<RawHeroData>("hero.md");

    // Handle profileImage - can be a string (URL) or object
    let profileImage: { url: string; title?: string } | undefined;
    if (hero.profileImage) {
      if (typeof hero.profileImage === "string") {
        // If it's a string, convert to object
        profileImage = {
          url: hero.profileImage,
          title: hero.profileImageTitle || hero.name,
        };
      } else if (hero.profileImage.url) {
        // If it's already an object
        profileImage = {
          url: hero.profileImage.url,
          title: hero.profileImage.title || hero.profileImageTitle,
        };
      }
    }

    return {
      name: hero.name ?? "",
      title: hero.title ?? "",
      location: hero.location ?? "",
      email: hero.email ?? "",
      linkedInUrl: hero.linkedInUrl ?? "",
      profileImage,
    };
  } catch (error) {
    console.error("Error reading hero section:", error);
    return null;
  }
}

// Fetch about section
export async function getAboutSection(): Promise<AboutSection | null> {
  try {
    return await readMarkdownFile<AboutSection>("about.md");
  } catch (error) {
    console.error("Error reading about section:", error);
    return null;
  }
}

// Fetch all experiences
export async function getExperiences(): Promise<Experience[]> {
  try {
    const experiences =
      await readMarkdownCollection<Experience>("experiences.md");
    return experiences.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  } catch (error) {
    console.error("Error reading experiences:", error);
    return [];
  }
}

// Fetch all skill categories
export async function getSkillCategories(): Promise<SkillCategory[]> {
  try {
    const categories =
      await readMarkdownCollection<RawSkillCategoryData>("skills.md");
    return categories
      .map((cat) => {
        let skills: string[] = [];
        if (Array.isArray(cat.skills)) {
          skills = cat.skills;
        } else if (typeof cat.skills === "string") {
          // Handle both JSON array format and comma-separated
          try {
            skills = JSON.parse(cat.skills);
          } catch {
            skills = cat.skills
              .split(",")
              .map((s: string) => s.trim().replace(/^"|"$/g, ""));
          }
        }

        return {
          categoryName: cat.categoryName ?? "",
          skills,
          order: cat.order ?? 0,
        } as SkillCategory;
      })
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  } catch (error) {
    console.error("Error reading skill categories:", error);
    return [];
  }
}

// Fetch all projects
export async function getProjects(featured?: boolean): Promise<Project[]> {
  try {
    const projects =
      await readMarkdownCollection<RawProjectData>("projects.md");
    const filtered =
      featured !== undefined
        ? projects.filter((p) => p.featured === featured)
        : projects;

    return filtered
      .map((project) => {
        let technologies: string[] = [];
        if (Array.isArray(project.technologies)) {
          technologies = project.technologies;
        } else if (typeof project.technologies === "string") {
          // Handle both JSON array format and comma-separated
          try {
            technologies = JSON.parse(project.technologies);
          } catch {
            technologies = project.technologies
              .split(",")
              .map((t: string) => t.trim().replace(/^"|"$/g, ""));
          }
        }

        return {
          title: project.title ?? "",
          description: project.description ?? "",
          technologies,
          projectUrl: project.projectUrl,
          githubUrl: project.githubUrl,
          image: project.imageUrl
            ? {
                url: project.imageUrl,
                title: project.imageTitle,
              }
            : undefined,
          featured: project.featured ?? false,
          order: project.order ?? 0,
        } as Project;
      })
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  } catch (error) {
    console.error("Error reading projects:", error);
    return [];
  }
}
