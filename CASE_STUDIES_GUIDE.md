# Case Study Management System

This document provides comprehensive documentation for the case study management system, including how to add, modify, and maintain case studies for the Michael Mazur portfolio website.

## Table of Contents

1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Configuration Schema](#configuration-schema)
4. [Adding a New Case Study](#adding-a-new-case-study)
5. [Modifying Existing Case Studies](#modifying-existing-case-studies)
6. [Generator Script](#generator-script)
7. [Validation Script](#validation-script)
8. [Layout Types](#layout-types)
9. [Best Practices](#best-practices)

---

## Overview

The case study management system consists of:

- **`case-studies.json`**: Central configuration file containing all case study metadata
- **`scripts/generate-case-study.js`**: Script to generate HTML pages from configuration
- **`scripts/validate-case-studies.js`**: Script to validate configuration and assets
- **`case-studies/`**: Directory containing individual case study folders with assets

This system allows you to:
- Maintain consistent styling across all case studies
- Easily add or update case studies without manual HTML editing
- Validate that all assets and references are correct
- Generate case study pages programmatically

---

## File Structure

```
workspace/
├── case-studies.json                    # Central configuration
├── scripts/
│   ├── generate-case-study.js          # Generator script
│   └── validate-case-studies.js        # Validation script
├── case-studies/
│   ├── personalization/
│   │   ├── personalization.html
│   │   ├── 1.png
│   │   ├── 2.png
│   │   └── ...
│   ├── platform-experience/
│   │   ├── platform-experience.html
│   │   ├── 1.mp4
│   │   └── ...
│   └── ...
└── images/                             # Carousel card assets
    ├── personalization-card-poster.jpg
    ├── personalization-card.mp4
    └── ...
```

---

## Configuration Schema

The `case-studies.json` file has the following structure:

```json
{
  "caseStudies": [
    {
      "id": "string",                    // Unique identifier
      "title": "string",                 // Display title
      "description": "string",           // Brief description (shown in header)
      "role": "string",                  // Your role in the project
      "timeline": "string",              // Project timeline
      "teams": "string",                 // Teams involved
      "slug": "string",                  // URL slug (usually same as id)
      "featured": boolean,               // Show in homepage carousel?
      "displayOrder": number,            // Order in listings (1-based)
      "assets": {                        // Asset references
        "cardPoster": "string",          // Carousel poster image (if featured)
        "cardVideo": "string",           // Carousel video (if featured)
        "cardMobile": "string",          // Mobile carousel image (if featured)
        "images": ["string"],            // Array of image filenames
        "videos": ["string"] | [{}],     // Videos or objects with src/caption
        "gifs": ["string"]               // Array of GIF filenames
      },
      "layout": {                        // Layout configuration
        "type": "string",                // Layout type (see below)
        // ... additional layout-specific properties
      },
      "sections": [                      // Optional: for sections-with-content
        {
          "title": "string",
          "content": ["string"],         // Array of paragraphs
          "asset": {} | "assets": []     // Single asset or array
        }
      ]
    }
  ]
}
```

### Required Fields

- `id`: Unique identifier (kebab-case recommended)
- `title`: Display title
- `description`: Brief description
- `role`: Your role
- `timeline`: Timeline or "—" for undisclosed
- `teams`: Team names or "—" for undisclosed
- `slug`: URL slug (must match folder name)
- `featured`: true/false
- `displayOrder`: Integer (1-based, sequential)
- `layout`: Object with at least a `type` property

---

## Adding a New Case Study

### Step 1: Prepare Assets

1. Create a new folder in `case-studies/` with your case study slug:
   ```bash
   mkdir case-studies/new-case-study
   ```

2. Add your assets (images, videos, GIFs) to this folder

3. If the case study should appear in the homepage carousel, add card assets to `images/`:
   - `new-case-study-card-poster.jpg` (poster image)
   - `new-case-study-card.mp4` (hover video)
   - `new-case-study-card-mobile.jpg` (mobile fallback)

### Step 2: Add Configuration

Add a new entry to the `caseStudies` array in `case-studies.json`:

```json
{
  "id": "new-case-study",
  "title": "Your Case Study Title",
  "description": "Brief description of the case study.",
  "role": "Product Designer",
  "timeline": "2024",
  "teams": "Design team, Engineering",
  "slug": "new-case-study",
  "featured": true,
  "displayOrder": 6,
  "assets": {
    "cardPoster": "images/new-case-study-card-poster.jpg",
    "cardVideo": "images/new-case-study-card.mp4",
    "cardMobile": "images/new-case-study-card-mobile.jpg",
    "images": [
      "1.png",
      "2.png"
    ]
  },
  "layout": {
    "type": "images-only",
    "imageLayout": [
      { "src": "1.png", "alt": "Description", "width": "full" },
      { "src": "2.png", "alt": "Description", "width": "full", "marginTop": "16px" }
    ]
  }
}
```

### Step 3: Generate HTML

Run the generator script:

```bash
node scripts/generate-case-study.js new-case-study
```

Or regenerate all:

```bash
node scripts/generate-case-study.js --all
```

### Step 4: Add to Homepage Carousel

If `featured: true`, manually add the case study to `index.html` carousel:

```html
<!-- Add this twice: once in original set, once in duplicate set -->
<div class="project-card page-animate-media" data-case-study="new-case-study">
  <div class="project-card-media">
    <picture>
      <source media="(max-width: 600px)" srcset="images/new-case-study-card-mobile.jpg" />
      <img src="images/new-case-study-card-poster.jpg?v=1" alt="New Case Study" class="static-image" />
    </picture>
    <video src="images/new-case-study-card.mp4?v=1" poster="images/new-case-study-card-poster.jpg?v=1" class="hover-video" muted playsinline preload="none" aria-hidden="true"></video>
  </div>
</div>
```

### Step 5: Validate

Run the validation script:

```bash
node scripts/validate-case-studies.js
```

---

## Modifying Existing Case Studies

### Updating Content

1. Edit the case study entry in `case-studies.json`
2. Regenerate the HTML:
   ```bash
   node scripts/generate-case-study.js case-study-id
   ```
3. Validate:
   ```bash
   node scripts/validate-case-studies.js
   ```

### Adding/Removing Assets

1. Add or remove files in the case study folder
2. Update the `assets` section in `case-studies.json`
3. Update the `layout` configuration if needed
4. Regenerate and validate

### Changing Featured Status

1. Update `featured` field in `case-studies.json`
2. If changing from `false` to `true`:
   - Add carousel card assets
   - Add carousel HTML to `index.html`
3. If changing from `true` to `false`:
   - Remove carousel HTML from `index.html`
   - Optionally remove carousel card assets

---

## Generator Script

### Usage

```bash
# Generate a specific case study
node scripts/generate-case-study.js personalization

# Generate all case studies
node scripts/generate-case-study.js --all

# Show available case studies
node scripts/generate-case-study.js
```

### What It Does

1. Reads `case-studies.json`
2. Generates HTML based on layout type
3. Includes all necessary styles and scripts
4. Writes to `case-studies/{slug}/{slug}.html`

### Programmatic Usage

```javascript
const { generateCaseStudy, writeCaseStudy } = require('./scripts/generate-case-study');

const caseStudy = { /* case study object */ };
const html = generateCaseStudy(caseStudy);
// or
writeCaseStudy(caseStudy);
```

---

## Validation Script

### Usage

```bash
node scripts/validate-case-studies.js
```

### What It Validates

1. **JSON Structure**: Checks all required fields are present
2. **Assets**: Verifies all referenced images, videos, and GIFs exist
3. **Index Integration**: Checks featured case studies appear in carousel
4. **Display Order**: Warns about gaps or duplicates in ordering

### Exit Codes

- `0`: All validations passed
- `1`: Errors found (missing assets, structural issues)

### Output

```
🔍 Starting case study validation...

📋 Validating JSON structure...
  ✅ JSON structure validated

📁 Validating assets...
  ✅ Assets validated

🏠 Validating index.html...
  ✅ index.html validated

🔢 Validating display order...
  ✅ Display order validated

============================================================
VALIDATION RESULTS
============================================================

✨ All validations passed! No issues found.
```

---

## Layout Types

The system supports three layout types:

### 1. `images-only`

For case studies that display a series of images.

**Configuration:**

```json
{
  "layout": {
    "type": "images-only",
    "imageLayout": [
      { "src": "1.png", "alt": "Description", "width": "full" },
      { "src": "2.png", "alt": "Description", "width": "full", "marginTop": "16px" },
      {
        "layout": "side-by-side",
        "marginTop": "16px",
        "images": [
          { "src": "3.png", "alt": "Left image" },
          { "src": "4.png", "alt": "Right image" }
        ]
      }
    ]
  }
}
```

**Features:**
- Full-width images
- Side-by-side image layouts
- Custom margin-top spacing
- Lazy loading for images after the first

### 2. `videos-with-captions`

For case studies that showcase videos with descriptive captions.

**Configuration:**

```json
{
  "layout": {
    "type": "videos-with-captions"
  },
  "assets": {
    "videos": [
      {
        "src": "1.mp4",
        "caption": "Description of the video content"
      },
      {
        "src": "2.mp4",
        "caption": "Another video description"
      }
    ]
  }
}
```

**Features:**
- Lazy video loading (loads when scrolled into view)
- Auto-play when visible
- Pause when out of view
- Captions below each video

### 3. `sections-with-content`

For case studies with written content organized into sections.

**Configuration:**

```json
{
  "layout": {
    "type": "sections-with-content"
  },
  "assets": {
    "gifs": ["1.gif"],
    "images": ["3.png"]
  },
  "sections": [
    {
      "title": "Section Title",
      "content": [
        "First paragraph of content.",
        "Second paragraph of content."
      ],
      "asset": {
        "type": "gif",
        "src": "2.gif",
        "alt": "Section visual"
      }
    },
    {
      "title": "Another Section",
      "content": ["Content here."],
      "assets": [
        { "type": "image", "src": "3.png", "alt": "Image" },
        { "type": "gif", "src": "4.gif", "alt": "GIF" }
      ]
    }
  ]
}
```

**Features:**
- Hero GIF at top (first GIF in assets.gifs)
- Multiple sections with titles
- Two-column text layout (stacks on mobile)
- Single asset or multiple assets per section
- Support for both images and GIFs

---

## Best Practices

### Asset Naming

- Use numbered filenames: `1.png`, `2.png`, `3.png`
- Use descriptive alt text
- Keep file sizes optimized (compress images/videos)

### Display Order

- Use sequential integers starting from 1
- Featured case studies should typically come first
- Update order when adding/removing case studies

### Timeline and Teams

- Use "—" (em dash) for undisclosed information
- Be consistent with formatting (e.g., "2022-2024" vs "2022 - 2024")

### Descriptions

- Keep descriptions concise but informative
- Highlight key outcomes or metrics when available
- Write in past tense for completed projects

### Version Control

- Commit JSON changes separately from generated HTML
- Include asset changes in the same commit as JSON updates
- Run validation before committing

### Testing

1. Generate case study HTML
2. Run validation script
3. Open generated HTML in browser
4. Test responsive behavior (mobile, tablet, desktop)
5. Verify all assets load correctly
6. Check hover states and animations

### Maintenance

- Periodically run validation to catch missing assets
- Update carousel card videos when updating case studies
- Keep asset file sizes reasonable for web performance
- Consider adding WebP versions for better compression

---

## Troubleshooting

### "Directory not found" error

Ensure the slug matches the folder name exactly:
- JSON: `"slug": "my-case-study"`
- Folder: `case-studies/my-case-study/`

### Assets not loading

1. Check file names match exactly (case-sensitive)
2. Verify files are in the correct folder
3. Run validation script to identify missing files
4. Check file permissions

### HTML not updating

1. Regenerate with `--all` flag
2. Clear browser cache
3. Check for write permissions on output file
4. Verify JSON is valid

### Carousel not showing new case study

1. Confirm `featured: true` in JSON
2. Verify carousel HTML was added to `index.html`
3. Check card assets exist in `images/` folder
4. Clear browser cache and reload

---

## Advanced Usage

### Custom Layouts

To add a new layout type:

1. Add a new case in the `generateContent()` function in `generate-case-study.js`
2. Define the layout structure in your JSON
3. Add any necessary CSS to the `generateHeader()` function
4. Test thoroughly with a sample case study

### Batch Operations

Generate all case studies and validate:

```bash
node scripts/generate-case-study.js --all && node scripts/validate-case-studies.js
```

### CI/CD Integration

Add to your CI pipeline:

```bash
# Validate configuration and assets
node scripts/validate-case-studies.js

# Generate all case studies
node scripts/generate-case-study.js --all

# Commit generated files
git add case-studies/**/*.html
git commit -m "Regenerate case study HTML"
```

---

## Support

For questions or issues with the case study management system, refer to this guide or examine the existing case studies in `case-studies.json` for examples.

Last updated: September 2026
