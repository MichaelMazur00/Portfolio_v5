#!/usr/bin/env node

/**
 * Case Study Generator
 * 
 * This script generates case study HTML pages from the case-studies.json configuration.
 * It can generate individual case studies or regenerate all case studies at once.
 * 
 * Usage:
 *   node scripts/generate-case-study.js [case-study-id]
 *   node scripts/generate-case-study.js --all
 * 
 * Examples:
 *   node scripts/generate-case-study.js personalization
 *   node scripts/generate-case-study.js --all
 */

const fs = require('fs');
const path = require('path');

// Read case studies configuration
const configPath = path.join(__dirname, '..', 'case-studies.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

/**
 * Generate the HTML for a case study header
 */
function generateHeader(caseStudy) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${caseStudy.title} - Michael Mazur</title>
  <link rel="icon" href="../../favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;800&display=swap" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --brown:  #615B55;
      --cream:  #FDF9EE;
      --muted:  rgba(253,249,238,0.45);
      --mono:   'Inter', sans-serif;
    }

    body {
      font-family: var(--mono);
      font-size: 16px;
      font-weight: 300;
      line-height: 1.6;
      background: #ffffff;
      color: #000000;
    }

    .container {
      max-width: 1080px;
      margin: 0 auto;
      padding: 80px 40px 160px;
    }

    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #000000;
      text-decoration: none;
      font-weight: 500;
      font-size: 12px;
      margin-bottom: 16px;
      transition: color 0.3s ease;
    }
    .back-btn:hover { color: rgba(0,0,0,0.8); }

    .case-study-header {
      margin-bottom: 40px;
    }

    .case-study-meta {
      font-size: 12px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 20px;
    }

    .case-study-title {
      font-size: 64px;
      font-weight: 500;
      line-height: 72px;
      letter-spacing: -0.0375em;
      color: #000000;
      margin-bottom: 16px;
    }

    .case-study-desc,
    .subtitle {
      font-size: 24px;
      font-weight: 500;
      color: #000000;
      line-height: 32px;
      letter-spacing: -0.02em;
      max-width: 800px;
      margin-bottom: 32px;
    }

    .case-study-body {
      font-size: 16px;
      font-weight: 300;
      color: rgba(0,0,0,0.65);
      line-height: 1.6;
      max-width: 1000px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }

    .subtitle.iteration-subtitle {
      margin-bottom: 16px !important;
    }

    @media (max-width: 768px) {
      .case-study-body {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      .case-study-title {
        font-size: 40px;
        line-height: 48px;
      }
    }

    .image-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-top: 60px;
    }

    .image-item {
      background: rgba(0,0,0,0.05);
      border-radius: 12px;
      overflow: hidden;
      aspect-ratio: 4/3;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .image-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }

    .image-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    @media (min-width: 768px) {
      .image-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .image-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .image-item.large {
      grid-column: span 2;
      aspect-ratio: 16/9;
    }

    .image-item.tall {
      aspect-ratio: 3/4;
    }

    .full-width-image {
      width: 100%;
      margin-top: 40px;
      border-radius: 12px;
      overflow: hidden;
    }

    .full-width-image img {
      width: 100%;
      height: auto;
      display: block;
    }

    .side-by-side-images {
      display: flex;
      gap: 16px;
      margin-top: 40px;
    }

    .side-by-side-images .half-width-image {
      flex: 1;
      border-radius: 12px;
      overflow: hidden;
    }

    .side-by-side-images .half-width-image img {
      width: 100%;
      height: auto;
      display: block;
    }

    @media (max-width: 768px) {
      .side-by-side-images {
        flex-direction: column;
        gap: 16px;
      }
    }

    .full-width-video {
      width: 100%;
      margin-top: 40px;
      border-radius: 12px;
      background: #f6f6f4;
      padding: 80px;
    }

    .full-width-video video {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }

    .video-block {
      margin-top: 40px;
    }

    .video-block + .video-block {
      margin-top: 64px;
    }

    .video-block .full-width-video {
      margin-top: 0;
    }

    .video-caption {
      font-size: 14px;
      font-weight: 300;
      line-height: 1.6;
      color: rgba(0,0,0,0.65);
      margin-top: 12px;
    }

    .gif-container {
      background: #FAFAFA;
      border-radius: 12px;
      padding: 80px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #EEEEEE;
      min-height: 400px;
    }

    .gif-container img {
      max-width: 760px;
      width: auto;
      height: auto;
      border-radius: 8px;
      flex-shrink: 0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      .full-width-video { padding: 20px; border-radius: 16px; }
      .full-width-video video { box-shadow: 0 10px 24px rgba(0,0,0,0.1); }
    }
  
    /* Example-style landing header */
    .back-btn { font-size: 15px; font-weight: 700; gap: 4px; margin-bottom: 16px; }
    .case-study-header { margin-bottom: 0; }
    .case-study-title { font-size: clamp(40px, 7vw, 64px); font-weight: 800; line-height: 1.02; letter-spacing: -0.045em; margin-bottom: 24px; }
    .header-cols { display: flex; justify-content: space-between; align-items: flex-start; gap: 80px; }
    .header-cols .case-study-desc { font-size: 20px; font-weight: 300; color: #4a4a4a; line-height: 32px; letter-spacing: -0.01em; max-width: 622px; margin-bottom: 0; }
    .meta-table { width: 340px; flex-shrink: 0; }
    .meta-row { display: flex; gap: 24px; padding: 12px 0; border-bottom: 1px solid #e6e6e6; }
    .meta-row:last-child { border-bottom: none; }
    .meta-label { font-size: 14px; font-weight: 700; color: #000; width: 96px; flex-shrink: 0; }
    .meta-value { font-size: 14px; font-weight: 300; color: #4a4a4a; }
    .full-width-image.hero-card { margin-top: 40px; background: #f6f6f4; border-radius: 24px; padding: 56px 56px 0; overflow: hidden; }
    .full-width-image.hero-card img { border-radius: 8px 8px 0 0; }
    @media (max-width: 768px) {
      .header-cols { flex-direction: column; gap: 32px; }
      .header-cols .case-study-desc { font-size: 20px; }
      .meta-table { width: 100%; }
      .full-width-image.hero-card { padding: 20px 20px 0; border-radius: 16px; }
      .container { padding: 56px 20px 160px; }
      .case-study-title { font-size: 48px; line-height: 1.05; white-space: normal; }
    }
  </style>
</head>
<body>

<div class="container">
  <a href="../../index.html" class="back-btn">&lt; Back</a>

  <div class="case-study-header">
    <h1 class="case-study-title">${caseStudy.title}</h1>
    <div class="header-cols">
      <p class="case-study-desc">${caseStudy.description}</p>
      <div class="meta-table">
        <div class="meta-row"><span class="meta-label">Role</span><span class="meta-value">${caseStudy.role}</span></div>
        <div class="meta-row"><span class="meta-label">Timeline</span><span class="meta-value">${caseStudy.timeline}</span></div>
        <div class="meta-row"><span class="meta-label">Team(s)</span><span class="meta-value">${caseStudy.teams}</span></div>
      </div>
    </div>
  </div>
`;
}

/**
 * Generate the content section based on layout type
 */
function generateContent(caseStudy) {
  let content = '';
  
  if (caseStudy.layout.type === 'images-only' && caseStudy.layout.imageLayout) {
    caseStudy.layout.imageLayout.forEach((item, index) => {
      if (item.layout === 'side-by-side') {
        const marginTop = item.marginTop ? ` style="margin-top: ${item.marginTop};"` : '';
        content += `\n  <div class="side-by-side-images"${marginTop}>`;
        item.images.forEach(img => {
          content += `
    <div class="half-width-image">
      <img src="${img.src}" alt="${img.alt}" loading="lazy" />
    </div>`;
        });
        content += `
  </div>
`;
      } else {
        const marginTop = item.marginTop ? ` style="margin-top: ${item.marginTop};"` : '';
        const loading = index > 0 ? ' loading="lazy"' : '';
        content += `
  <div class="full-width-image"${marginTop}>
    <img src="${item.src}" alt="${item.alt}"${loading} />
  </div>
`;
      }
    });
  } else if (caseStudy.layout.type === 'videos-with-captions' && caseStudy.assets.videos) {
    caseStudy.assets.videos.forEach(video => {
      content += `
  <figure class="video-block">
    <div class="full-width-video">
      <video src="${video.src}" class="lazy-video" loop muted playsinline preload="none"></video>
    </div>
    <figcaption class="video-caption">${video.caption}</figcaption>
  </figure>
`;
    });
  } else if (caseStudy.layout.type === 'sections-with-content' && caseStudy.sections) {
    // First add hero GIF if it exists
    if (caseStudy.assets.gifs && caseStudy.assets.gifs[0]) {
      content += `
  <div class="full-width-image hero-card">
    <div class="gif-container">
      <img src="${caseStudy.assets.gifs[0]}" alt="${caseStudy.title} overview" />
    </div>
  </div>
`;
    }
    
    // Then add sections
    caseStudy.sections.forEach(section => {
      content += `
  <div style="margin-top: 120px;">
    <h2 class="subtitle iteration-subtitle">${section.title}</h2>
    <div class="case-study-body">
`;
      section.content.forEach(paragraph => {
        content += `      <p>${paragraph}</p>
      
`;
      });
      content += `    </div>
  </div>
`;
      
      // Add section assets
      if (section.asset) {
        if (section.asset.type === 'gif') {
          content += `
  <div class="full-width-image">
    <div class="gif-container">
      <img src="${section.asset.src}" alt="${section.asset.alt}" loading="lazy" />
    </div>
  </div>
`;
        } else if (section.asset.type === 'image') {
          content += `
  <div class="full-width-image">
    <img src="${section.asset.src}" alt="${section.asset.alt}" loading="lazy" />
  </div>
`;
        }
      } else if (section.assets) {
        section.assets.forEach((asset, index) => {
          const marginTop = index > 0 ? ' style="margin-top: 16px;"' : '';
          if (asset.type === 'gif') {
            content += `
  <div class="full-width-image"${marginTop}>
    <div class="gif-container">
      <img src="${asset.src}" alt="${asset.alt}" loading="lazy" />
    </div>
  </div>
`;
          } else if (asset.type === 'image') {
            content += `
  <div class="full-width-image"${marginTop}>
    <img src="${asset.src}" alt="${asset.alt}" loading="lazy" />
  </div>
`;
          }
        });
      }
    });
  }
  
  return content;
}

/**
 * Generate the footer with scripts
 */
function generateFooter(caseStudy) {
  let scripts = `
<script>
`;
  
  // Add video lazy loading script for videos-with-captions layout
  if (caseStudy.layout.type === 'videos-with-captions') {
    scripts += `// Only load and play the walkthrough videos once they scroll into view
(function () {
  var videos = document.querySelectorAll('.lazy-video');
  if (!('IntersectionObserver' in window)) {
    videos.forEach(function (v) { v.setAttribute('preload', 'metadata'); v.play().catch(function () {}); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var v = entry.target;
      if (entry.isIntersecting) {
        v.play().catch(function () {});
      } else {
        v.pause();
      }
    });
  }, { rootMargin: '200px 0px', threshold: 0.25 });
  videos.forEach(function (v) { io.observe(v); });
})();

`;
  }
  
  // Add GSAP animation
  scripts += `gsap.from('.container > *', {
  y: 30,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: 'power3.out',
  delay: 0.3
});
</script>

</body>
</html>`;
  
  return scripts;
}

/**
 * Generate a complete case study HTML file
 */
function generateCaseStudy(caseStudy) {
  const header = generateHeader(caseStudy);
  const content = generateContent(caseStudy);
  const footer = generateFooter(caseStudy);
  
  return header + content + '</div>\n' + footer;
}

/**
 * Write case study to file
 */
function writeCaseStudy(caseStudy) {
  const html = generateCaseStudy(caseStudy);
  const outputDir = path.join(__dirname, '..', 'case-studies', caseStudy.slug);
  const outputPath = path.join(outputDir, `${caseStudy.slug}.html`);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`✅ Generated: ${outputPath}`);
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node generate-case-study.js [case-study-id] | --all');
    console.log('\nAvailable case studies:');
    config.caseStudies.forEach(cs => {
      console.log(`  - ${cs.id}`);
    });
    process.exit(1);
  }
  
  if (args[0] === '--all') {
    console.log('Generating all case studies...\n');
    config.caseStudies.forEach(caseStudy => {
      writeCaseStudy(caseStudy);
    });
    console.log('\n✨ All case studies generated successfully!');
  } else {
    const caseStudyId = args[0];
    const caseStudy = config.caseStudies.find(cs => cs.id === caseStudyId);
    
    if (!caseStudy) {
      console.error(`❌ Error: Case study "${caseStudyId}" not found.`);
      console.log('\nAvailable case studies:');
      config.caseStudies.forEach(cs => {
        console.log(`  - ${cs.id}`);
      });
      process.exit(1);
    }
    
    console.log(`Generating case study: ${caseStudy.title}\n`);
    writeCaseStudy(caseStudy);
    console.log('\n✨ Case study generated successfully!');
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  generateCaseStudy,
  writeCaseStudy
};
