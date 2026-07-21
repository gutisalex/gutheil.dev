# Content Architecture

This document explains how content is generated for both the portfolio website and the CV/resume.

## Portfolio Website Content

The portfolio website (`gutheil.dev`) gets its content from **Markdown files** stored in the `content/` directory.

### Content Flow

```
content/
├── hero.md          → Hero section (name, title, location, contact)
├── about.md         → About section (professional summary)
├── experiences.md   → Work experience entries
├── skills.md        → Technical skills by category
└── projects.md      → Portfolio projects
         ↓
    src/lib/content.ts
    (reads & parses Markdown files)
         ↓
    src/app/page.tsx
    (fetches content and renders components)
         ↓
    Website displays content
```

### How It Works

1. **Content Files**: Markdown files in `content/` directory with YAML frontmatter
2. **Content Parser**: `src/lib/content.ts` uses `gray-matter` to parse:
   - YAML frontmatter (metadata like company, position, dates)
   - Markdown content (descriptions, achievements)
3. **Page Rendering**: `src/app/page.tsx` calls functions like:
   - `getHeroSection()` → reads `content/hero.md`
   - `getExperiences()` → reads `content/experiences.md`
   - `getProjects()` → reads `content/projects.md`
4. **Components**: React components receive the parsed data and render it

### Example: Experience Entry

**File**: `content/experiences.md`

```markdown
---
company: brandung GmbH
position: Senior Frontend Developer
location: Cologne, Germany
startDate: 2025-01-01
isCurrent: true
order: 1
---

Description of the role and responsibilities.

## Achievements

- Achievement 1
- Achievement 2
```

**Flow**:

1. `getExperiences()` reads the file
2. Splits entries by `---` separator
3. Parses YAML frontmatter and Markdown content
4. Returns array of `Experience` objects
5. `Experience` component renders them

### Editing Content

To update the website content:

1. Edit the Markdown files in `content/`
2. Save the files
3. The site automatically rebuilds (or restart dev server)
4. Changes appear on the website

**No external services needed** - everything is file-based and version-controlled in Git.

---

## CV/Resume PDF

The CV/resume PDF is generated from a **YAML file** using [RenderCV](https://github.com/rendercv/rendercv).

### Content Flow

```
data/resume.yaml
    (structured YAML with all CV data)
         ↓
    scripts/resume/generate-pdf.ts
    (runs RenderCV to generate PDF)
         ↓
    docs/rendercv_output/Alexander_Gutheil_CV.pdf
    (generated PDF)
         ↓
    Copied to:
    - public/resume.pdf
         ↓
    /api/resume/download
    (serves PDF from public directory)
```

### How It Works

1. **Source File**: `data/resume.yaml` contains all CV data in RenderCV's YAML format
2. **Generation Script**: `scripts/resume/generate-pdf.ts`:
   - Runs `rendercv render` command
   - Generates PDF using Typst (professional typesetting)
   - Copies PDF to both `docs/` and `public/` directories
3. **API Route**: `src/app/api/resume/download/route.ts` serves the PDF from `public/`
4. **Download**: Users can download via the "Download Resume" button

### Editing the CV

To update your CV:

1. Edit `data/resume.yaml`
2. Run: `bun run resume:generate`
3. Commit the updated PDF
4. Deploy (PDF is served from `public/`)

### Why Two Different Systems?

- **Portfolio Website**: Uses Markdown for easy editing and direct rendering
- **CV/Resume**: Uses YAML + RenderCV for professional PDF formatting with Typst

The CV YAML is more structured (RenderCV format) while the portfolio content is simpler Markdown.

---

## Key Differences

| Aspect             | Portfolio Website            | CV/Resume                          |
| ------------------ | ---------------------------- | ---------------------------------- |
| **Source Format**  | Markdown (.md)               | YAML (.yaml)                       |
| **Location**       | `content/`                   | `data/resume.yaml`                 |
| **Parser**         | `gray-matter`                | `RenderCV` (Python)                |
| **Output**         | Rendered HTML (React)        | PDF file                           |
| **Update Process** | Edit Markdown → Auto-rebuild | Edit YAML → Generate PDF → Commit  |
| **Served Via**     | Next.js pages                | API route (`/api/resume/download`) |

---

## Summary

- **Website content** = Markdown files in `content/` → parsed at build time → rendered as HTML
- **CV/Resume** = YAML file → RenderCV generates PDF → served as downloadable file

Both are version-controlled, file-based, and require no external services (except RenderCV for PDF generation, which runs locally).
