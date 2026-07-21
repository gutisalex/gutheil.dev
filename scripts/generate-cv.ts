import { execSync } from "node:child_process";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";

const cvYamlPath = join(process.cwd(), "data", "Alexander_Gutheil_CV.yaml");
const publicDir = join(process.cwd(), "public");
const outputFileName = "Alexander_Gutheil_CV.pdf";
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
  // Check if CONTACT_EMAIL is set
  if (!process.env.CONTACT_EMAIL) {
    console.error("❌ Error: CONTACT_EMAIL environment variable is not set");
    console.error("   Please set CONTACT_EMAIL in your .env.local file");
    process.exit(1);
  }

  // Read YAML file and inject email from environment variable
  const yamlContent = readFileSync(cvYamlPath, "utf8");
  const data = yaml.load(yamlContent) as { cv?: { email?: string } };

  if (!data.cv) {
    console.error("❌ Error: Invalid YAML structure: missing 'cv' key");
    process.exit(1);
  }

  // Override email with environment variable (single source of truth)
  data.cv.email = process.env.CONTACT_EMAIL;
  const updatedYaml = yaml.dump(data, { lineWidth: -1 });

  // Write to temporary file
  const tempYamlPath = join(
    process.cwd(),
    "data",
    "Alexander_Gutheil_CV.temp.yaml",
  );
  writeFileSync(tempYamlPath, updatedYaml, "utf8");

  // Generate PDF directly to public directory, skip other formats
  console.log(`   Input:  ${cvYamlPath} (email from CONTACT_EMAIL env var)`);
  console.log(`   Output: ${publicPdfPath}\n`);

  // Calculate relative path from YAML file to public directory
  const relativePdfPath = join("..", "public", outputFileName);

  execSync(
    `rendercv render "${tempYamlPath}" --pdf-path "${relativePdfPath}" --dont-generate-markdown --dont-generate-html --dont-generate-png`,
    {
      stdio: "inherit",
      cwd: process.cwd(),
    },
  );

  // Clean up temp file
  unlinkSync(tempYamlPath);

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
