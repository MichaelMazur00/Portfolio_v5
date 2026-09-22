# Example: Adding a New Case Study

This example demonstrates how to add a new case study using the case study management system.

## Scenario

You want to add a new case study called "Mobile App Redesign" that showcases a mobile app design project.

## Step-by-Step Process

### 1. Prepare Your Assets

First, create a folder and add your assets:

```bash
mkdir case-studies/mobile-app-redesign
```

Add your files:
- `case-studies/mobile-app-redesign/1.png` (Hero image)
- `case-studies/mobile-app-redesign/2.png` (Feature overview)
- `case-studies/mobile-app-redesign/3.png` (Detail 1)
- `case-studies/mobile-app-redesign/4.png` (Detail 2)

If the case study will appear in the homepage carousel, also add:
- `images/mobile-app-redesign-card-poster.jpg`
- `images/mobile-app-redesign-card.mp4`
- `images/mobile-app-redesign-card-mobile.jpg`

### 2. Add Configuration

Open `case-studies.json` and add this entry to the `caseStudies` array:

```json
{
  "id": "mobile-app-redesign",
  "title": "Mobile app redesign",
  "description": "Led the redesign of a mobile banking app, improving user engagement by 45% and reducing support tickets by 30%.",
  "role": "Lead Product Designer",
  "timeline": "2025",
  "teams": "Mobile team, Design systems",
  "slug": "mobile-app-redesign",
  "featured": true,
  "displayOrder": 6,
  "assets": {
    "cardPoster": "images/mobile-app-redesign-card-poster.jpg",
    "cardVideo": "images/mobile-app-redesign-card.mp4",
    "cardMobile": "images/mobile-app-redesign-card-mobile.jpg",
    "images": [
      "1.png",
      "2.png",
      "3.png",
      "4.png"
    ]
  },
  "layout": {
    "type": "images-only",
    "imageLayout": [
      { "src": "1.png", "alt": "Mobile app hero", "width": "full" },
      { "src": "2.png", "alt": "Feature overview", "width": "full", "marginTop": "16px" },
      {
        "layout": "side-by-side",
        "marginTop": "16px",
        "images": [
          { "src": "3.png", "alt": "Detail view 1" },
          { "src": "4.png", "alt": "Detail view 2" }
        ]
      }
    ]
  }
}
```

### 3. Generate HTML

Run the generator:

```bash
node scripts/generate-case-study.js mobile-app-redesign
```

Output:
```
Generating case study: Mobile app redesign

✅ Generated: case-studies/mobile-app-redesign/mobile-app-redesign.html

✨ Case study generated successfully!
```

### 4. Add to Homepage Carousel (if featured)

Since `featured: true`, manually add to `index.html` in two places (original set and duplicate set):

```html
<div class="project-card page-animate-media" data-case-study="mobile-app-redesign">
  <div class="project-card-media">
    <picture>
      <source media="(max-width: 600px)" srcset="images/mobile-app-redesign-card-mobile.jpg" />
      <img src="images/mobile-app-redesign-card-poster.jpg?v=1" alt="Mobile App Redesign" class="static-image" />
    </picture>
    <video src="images/mobile-app-redesign-card.mp4?v=1" poster="images/mobile-app-redesign-card-poster.jpg?v=1" class="hover-video" muted playsinline preload="none" aria-hidden="true"></video>
  </div>
</div>
```

### 5. Validate

Run the validator:

```bash
node scripts/validate-case-studies.js
```

Expected output:
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

### 6. Preview

Start a local server and preview:

```bash
python3 -m http.server 8000
```

Navigate to: `http://localhost:8000/case-studies/mobile-app-redesign/mobile-app-redesign.html`

## What You Get

The generated HTML includes:

✅ Consistent header with your metadata  
✅ Professional styling matching other case studies  
✅ Responsive layout (mobile, tablet, desktop)  
✅ GSAP animations on load  
✅ Lazy loading for images  
✅ Proper semantic HTML  
✅ Back button to homepage  

## Comparison: Before vs After

### Before (Manual)
- Copy and paste from another case study HTML file
- Manually update all metadata
- Manually add image tags for each asset
- Risk of inconsistent styling
- Time-consuming and error-prone
- Hard to maintain consistency

### After (Automated)
- Add entry to JSON file (30 seconds)
- Run one command (2 seconds)
- Automatic validation
- Guaranteed consistency
- Easy to update and maintain
- Scalable for many case studies

## Time Savings

- **Manual process**: ~15-20 minutes per case study
- **Automated process**: ~2-3 minutes per case study
- **Time saved**: ~85% reduction in effort

## Conclusion

The case study management system transforms a tedious manual process into a quick, automated workflow that ensures consistency and quality across all case studies.
