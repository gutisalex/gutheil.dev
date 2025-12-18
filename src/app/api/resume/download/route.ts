import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Read the PDF from the public directory
    const pdfPath = join(process.cwd(), "public", "resume.pdf");
    const pdfBuffer = await readFile(pdfPath);

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"',
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error serving resume:", error);
    return NextResponse.json(
      {
        error:
          "Resume not found. Please run 'bun run resume:generate' to generate the PDF.",
      },
      { status: 404 },
    );
  }
}
