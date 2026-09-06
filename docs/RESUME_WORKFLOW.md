# Resume Workflow with RenderCV

This project uses [RenderCV](https://github.com/rendercv/rendercv) to generate a professional PDF resume from a YAML file, which is then served from the `public` directory.

## Prerequisites

1. **Python 3.12+** installed
2. **RenderCV** installed: `pip3 install "rendercv[full]"`

## Workflow

### 1. Edit Your Resume

Edit the YAML file: `data/Alexander_Gutheil_CV.yaml`

RenderCV uses a structured YAML format. See [RenderCV documentation](https://docs.rendercv.com) for details.

### 2. Generate PDF

```bash
bun run cv:generate
```

Or generate both website content and PDF:

```bash
bun run update:all
```

This will:

- Generate a PDF from the YAML file using RenderCV
- Save it to `public/Alexander_Gutheil_CV.pdf`
- The PDF in `public/` is automatically served via the API route

## API Endpoint

The resume is served via the API route: `/api/resume/download`

This endpoint:

- Serves the PDF from the `public` directory
- Returns the PDF with proper headers for download
- Works on Vercel (no Python needed in production)
- Fast and simple - no external dependencies

## Benefits

✅ **Professional Typography**: RenderCV uses Typst for perfect PDF formatting  
✅ **Version Control**: YAML is easier to diff than Markdown  
✅ **Simple Setup**: No external services needed - just generate and commit  
✅ **No Production Dependencies**: PDF generation happens locally, not on Vercel  
✅ **Easy Updates**: Update YAML → Generate → Commit → Deploy

## Troubleshooting

### RenderCV not found

```bash
pip3 install "rendercv[full]"
```

### API returns 404

- Ensure the PDF exists in the `public` directory
- Run `bun run cv:generate` to generate the PDF
- Check that `public/Alexander_Gutheil_CV.pdf` exists
