import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const cvYamlPath = join(process.cwd(), "data", "Alexander_Gutheil_CV.yaml");
const publicDir = join(process.cwd(), "public");
const outputFileName = "Alexander_Gutheil_CV.pdf";
const publicPdfPath = join(publicDir, outputFileName);

console.log("👀 Starting RenderCV in watch mode...\n");

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
  // Generate PDF directly to public directory, skip other formats, with watch mode
  console.log(`   Input:  ${cvYamlPath}`);
  console.log(`   Output: ${publicPdfPath}`);
  console.log(`   Mode:   Watch (will regenerate on file changes)\n`);

  // Calculate relative path from YAML file to public directory
  const relativePdfPath = join("..", "public", outputFileName);

  execSync(
    `rendercv render "${cvYamlPath}" --pdf-path "${relativePdfPath}" --dont-generate-markdown --dont-generate-html --dont-generate-png --watch`,
    {
      stdio: "inherit",
      cwd: process.cwd(),
    },
  );
} catch (error) {
  console.error("\n❌ Error in watch mode:", error);
  process.exit(1);
}
