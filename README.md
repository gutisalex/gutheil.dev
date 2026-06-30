# gutheil.dev - Portfolio Website

A modern, responsive portfolio website built with Next.js, featuring a single source of truth for content management. The site displays professional experience, skills, and projects, with an integrated CV/resume download feature.

## 🎯 What It Does

This portfolio website showcases:

- **Hero Section** - Personal introduction with profile image
- **About Section** - Professional summary
- **Experience** - Work history with achievements
- **Skills** - Technical skills organized by category
- **Projects** - Portfolio projects (website-only)
- **Contact** - Contact information and social links
- **Resume Download** - PDF resume generation and download

## 🛠️ Tech Stack

### Core

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling

### UI Components

- **shadcn/ui** - Accessible component library (base-ui)
- **lucide-react** - Icon library
- **next-themes** - Dark mode support

### Content Management

- **Markdown** - Content files with YAML frontmatter
- **gray-matter** - Markdown/YAML parsing
- **js-yaml** - YAML parsing for content generation
- **RenderCV** - Professional PDF resume generation (Python)

### Development Tools

- **Biome** - Linting and formatting
- **Bun** - Package manager and runtime

## 📁 Project Structure

```
gutheil.dev/
├── data/                          # Single source of truth
│   └── resume.yaml                # YAML file with all CV data
├── content/                       # Generated Markdown files (auto-generated)
│   ├── hero.md
│   ├── about.md
│   ├── experiences.md
│   ├── skills.md
│   └── projects.md                # Manual edits only
├── public/                        # Static assets
│   ├── Profile_bw.jpg
│   └── resume.pdf
├── scripts/                       # Generation scripts
│   ├── generate-content-from-yaml.ts
│   └── resume/
│       └── generate-pdf.ts
├── src/
│   ├── app/                       # Next.js App Router
│   ├── components/                # React components
│   └── lib/                       # Utilities
│       └── content.ts             # Content loading logic
└── docs/                          # Documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (or Bun)
- **Python 3.12+** (for RenderCV)
- **RenderCV** - Install with: `pip3 install "rendercv[full]"`

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd gutheil.dev
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

   This project uses [Bun](https://bun.sh) as its package manager (`bun.lock`). Do not run `npm install` — it will recreate a conflicting `package-lock.json`.

3. **Generate content from YAML**

   ```bash
   bun run content:generate
   ```

   This reads `data/resume.yaml` and generates Markdown files in `content/`.

4. **Generate PDF resume** (optional, for first run)

   ```bash
   bun run resume:generate
   ```

   This generates the PDF resume to `public/resume.pdf`.

5. **Start the development server**

   ```bash
   bun run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Content Management

### Single Source of Truth

The project uses a **single source of truth** approach:

- **Edit once**: Update `data/resume.yaml`
- **Generate everything**: Run `bun run update:all`
- **Result**: Both website content and CV PDF are updated

### Available Scripts

```bash
# Generate website content from YAML
bun run content:generate

# Generate PDF resume from YAML
bun run resume:generate

# Generate both (recommended)
bun run update:all

# Development
bun run dev          # Start dev server
bun run build        # Build for production
bun run start        # Start production server

# Code quality
bun run lint         # Run linter
bun run format        # Format code
```

### Updating Content

1. **Edit** `data/resume.yaml`
2. **Run** `bun run update:all`
3. **Commit** the generated files (content/_.md and public/_.pdf)
4. **Deploy** - Changes appear on the website

### Website-Only Content

- **Projects** (`content/projects.md`) - Edit manually, not generated from YAML
- **Profile Image** - Set in generated `content/hero.md` or edit manually

### Email Address (Single Source of Truth)

- **Environment Variable**: `CONTACT_EMAIL` is the single source of truth for your email
- **Automatic Override**: The email in `content/hero.md` and `data/Alexander_Gutheil_CV.yaml` is automatically replaced with `CONTACT_EMAIL` when:
  - Generating content files (`bun run content:generate`)
  - Generating CV PDF (`bun run cv:generate`)
  - Loading content in the application (`getHeroSection()`)
- **Set Once**: Configure `CONTACT_EMAIL` in your `.env.local` file and Vercel environment variables

## 🎨 Features

- ✅ **Responsive Design** - Works on all devices
- ✅ **Dark Mode** - Automatic theme switching
- ✅ **Fast Performance** - Static generation with ISR
- ✅ **SEO Optimized** - Structured data and meta tags
- ✅ **Accessible** - WCAG compliant components
- ✅ **Type Safe** - Full TypeScript coverage

## 🚢 Deployment

### Vercel (Recommended)

The project is configured for deployment on Vercel via GitHub:

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Build Settings**

   - **Framework Preset**: Next.js
   - **Build Command**: `bun run build`
   - **Output Directory**: `.next` (default)
   - **Install Command**: `bun install`

4. **Environment Variables**

   Create a `.env.local` file in the root directory:

   ```bash
   # Required for contact form
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   
   # Required: Your contact email (single source of truth)
   CONTACT_EMAIL=your-email@example.com
   
   # Optional: Custom "from" email (defaults to onboarding@resend.dev for testing)
   # Must be a verified domain in Resend for production
   RESEND_FROM_EMAIL=Contact Form <noreply@gutheil.dev>
   ```

   **Getting your Resend API Key:**
   1. Sign up at [resend.com](https://resend.com)
   2. Go to API Keys in the dashboard
   3. Create a new API key
   4. Copy it to your `.env.local` file

   **Setting up Custom Domain (gutheil.dev):**
   - See the detailed guide: [Resend Setup with Custom Domain](./docs/RESEND_SETUP.md)
   - This includes DNS configuration, domain verification, and troubleshooting

   **Note**: 
   - The `CONTACT_EMAIL` environment variable is the **single source of truth** for your email address
   - It will override any email in `content/hero.md` and `data/Alexander_Gutheil_CV.yaml`
   - For production on Vercel, add these environment variables in the Vercel dashboard under Project Settings → Environment Variables

5. **Deploy**
   - Vercel automatically deploys on every push to main
   - Preview deployments for pull requests

### Build Process

Vercel will:

1. Install dependencies (`bun install`)
2. Run build (`bun run build`)
3. Deploy the static site

**Note**: The PDF resume must be generated locally and committed to the repository, as RenderCV (Python) is not available in Vercel's build environment. The PDF in `public/` is served statically.

### Manual Deployment Steps

If you need to update the resume PDF:

1. **Generate locally**

   ```bash
   bun run resume:generate
   ```

2. **Commit the PDF**

   ```bash
   git add public/resume.pdf
   git commit -m "Update resume PDF"
   git push
   ```

3. **Vercel automatically redeploys**

## 📚 Documentation

- [Content Architecture](./docs/CONTENT_ARCHITECTURE.md) - How content flows through the system
- [Single Source of Truth](./docs/SINGLE_SOURCE_OF_TRUTH.md) - Content management workflow
- [Resume Workflow](./docs/RESUME_WORKFLOW.md) - CV generation details
- [Resend Setup](./docs/RESEND_SETUP.md) - Setting up Resend with custom domain

## 🔧 Development

### Adding New Sections

1. Create component in `src/components/sections/`
2. Add content type in `src/lib/content.ts`
3. Generate content file or add to YAML
4. Import and use in `src/app/page.tsx`

### Styling

- Uses Tailwind CSS v4
- Components from shadcn/ui
- Custom styles in `src/app/globals.css`
- Dark mode via `next-themes`

## 📄 License

Private project - All rights reserved

## 👤 Author

Alexander Gutheil - [a.gutheil.dev](https://a.gutheil.dev)
