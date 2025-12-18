import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const cvYamlPath = join(process.cwd(), "data", "resume.yaml");
const publicDir = join(process.cwd(), "public");
const outputFileName = "resume.pdf";
const publicPdfPath = join(publicDir, outputFileName);

console.log("📄 Generating PDF from RenderCV YAML...\n");

// Check if YAML file exists
if (!existsSync(cvYamlPath)) {
  console.error(`❌ Error: CV YAML file not found at ${cvYamlPath}`);
  console.error("   Please ensure the YAML file exists.");
  process.exit(1);
}

// Check if rendercv is installed
try {
  execSync("rendercv --version", { stdio: "ignore" });
} catch (_error) {
  console.error("❌ Error: RenderCV is not installed.");
  console.error("\n   Please install RenderCV first:");
  console.error("   pip3 install 'rendercv[full]'");
  process.exit(1);
}

try {
  // Generate PDF directly to public directory, skip other formats
  console.log(`   Input:  ${cvYamlPath}`);
  console.log(`   Output: ${publicPdfPath}\n`);

  // Calculate relative path from YAML file to public directory
  const relativePdfPath = join("..", "public", outputFileName);

  execSync(
    `rendercv render "${cvYamlPath}" --pdf-path "${relativePdfPath}" --dont-generate-markdown --dont-generate-html --dont-generate-png`,
    {
      stdio: "inherit",
      cwd: process.cwd(),
    },
  );

  // Verify PDF was created
  if (existsSync(publicPdfPath)) {
    console.log(`\n✅ PDF generated successfully!`);
    console.log(`   The resume is now available at /api/resume/download`);
  } else {
    console.error(`\n❌ Error: Generated PDF not found at ${publicPdfPath}`);
    process.exit(1);
  }
} catch (error) {
  console.error("\n❌ Error generating PDF:", error);
  process.exit(1);
}
