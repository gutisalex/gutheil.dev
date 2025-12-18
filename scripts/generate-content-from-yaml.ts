import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import yaml from "js-yaml";

const cvYamlPath = join(process.cwd(), "data", "resume.yaml");
const contentDir = join(process.cwd(), "content");

interface CVData {
  cv: {
    name: string;
    location: string;
    email: string;
    website: string;
    social_networks?: Array<{ network: string; username: string }>;
    sections: {
      "Professional Summary"?: string[];
      experience?: Array<{
        company: string;
        position: string;
        location: string;
        start_date: string;
        end_date?: string | "present";
        highlights?: string[];
      }>;
      skills?: Array<{
        label: string;
        details: string;
      }>;
    };
  };
}

// Convert YYYY-MM date to YYYY-MM-DD (first day of month)
function normalizeDate(dateStr: string): string {
  if (!dateStr || dateStr === "present") return "";
  if (dateStr.match(/^\d{4}-\d{2}$/)) {
    return `${dateStr}-01`;
  }
  return dateStr;
}

// Convert date to isCurrent flag
function isCurrentDate(endDate?: string | "present"): boolean {
  return !endDate || endDate === "present";
}

// Get LinkedIn URL from social networks
function getLinkedInUrl(
  socialNetworks?: Array<{ network: string; username: string }>,
): string {
  const linkedIn = socialNetworks?.find((s) => s.network === "LinkedIn");
  if (linkedIn) {
    return `https://www.linkedin.com/in/${linkedIn.username}`;
  }
  return "";
}

async function generateContentFromYaml() {
  console.log("🔄 Generating content files from YAML...\n");

  // Ensure content directory exists
  await mkdir(contentDir, { recursive: true });

  try {
    // Read and parse YAML file
    const yamlContent = await readFile(cvYamlPath, "utf8");
    const data = yaml.load(yamlContent) as CVData;

    if (!data.cv) {
      throw new Error("Invalid YAML structure: missing 'cv' key");
    }

    const cv = data.cv;

    // Generate hero.md
    console.log("   ✓ Generating hero.md...");
    const linkedInUrl = getLinkedInUrl(cv.social_networks);
    const heroContent = `---
name: ${cv.name}
title: Senior Frontend Developer
location: ${cv.location}
email: ${cv.email}
linkedInUrl: ${linkedInUrl}
profileImage: /Profile_bw.jpg
profileImageTitle: ${cv.name}
---
`;
    await writeFile(join(contentDir, "hero.md"), heroContent);

    // Generate about.md
    console.log("   ✓ Generating about.md...");
    const professionalSummary =
      cv.sections["Professional Summary"]?.[0] ||
      "Professional summary not found in YAML";
    const aboutContent = `---
title: Professional Summary
---

${professionalSummary}
`;
    await writeFile(join(contentDir, "about.md"), aboutContent);

    // Generate experiences.md
    if (cv.sections.experience && cv.sections.experience.length > 0) {
      console.log(
        `   ✓ Generating experiences.md (${cv.sections.experience.length} entries)...`,
      );
      const experiencesContent = cv.sections.experience
        .map((exp, index) => {
          const startDate = normalizeDate(exp.start_date);
          const endDate = exp.end_date ? normalizeDate(exp.end_date) : "";
          const isCurrent = isCurrentDate(exp.end_date);
          const order = index + 1;

          // Combine highlights into description and achievements
          const highlights = exp.highlights || [];
          const description = highlights.length > 0 ? highlights[0] : "";
          const achievements =
            highlights.length > 1
              ? highlights
                  .slice(1)
                  .map((h) => `- ${h}`)
                  .join("\n")
              : "";

          const achievementsSection = achievements
            ? `\n\n## Achievements\n\n${achievements}`
            : "";

          return `---
company: ${exp.company}
position: ${exp.position}
location: ${exp.location}
startDate: ${startDate}
endDate: ${endDate}
isCurrent: ${isCurrent}
order: ${order}
---

${description}${achievementsSection}
`;
        })
        .join("\n---\n\n");

      await writeFile(join(contentDir, "experiences.md"), experiencesContent);
    }

    // Generate skills.md
    if (cv.sections.skills && cv.sections.skills.length > 0) {
      console.log(
        `   ✓ Generating skills.md (${cv.sections.skills.length} categories)...`,
      );
      const skillsContent = cv.sections.skills
        .map((skill, index) => {
          // Parse skills from comma-separated string
          const skillsArray = skill.details
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
          const skillsJson = JSON.stringify(skillsArray);

          return `---
categoryName: ${skill.label}
skills: ${skillsJson}
order: ${index + 1}
---
`;
        })
        .join("\n");

      await writeFile(join(contentDir, "skills.md"), skillsContent);
    }

    console.log("\n✅ Content files generated successfully!");
    console.log(`📁 Files created in: ${contentDir}`);
    console.log(
      "\n📝 Note: projects.md is not generated from YAML (website-only content)",
    );
    console.log("   Edit projects.md manually if needed.");
  } catch (error) {
    console.error("\n❌ Error generating content:", error);
    if (error instanceof Error) {
      console.error("   Message:", error.message);
    }
    process.exit(1);
  }
}

generateContentFromYaml();
