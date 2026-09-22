#!/usr/bin/env node

/**
 * Case Study Validation Script
 * 
 * This script validates:
 * 1. The case-studies.json configuration file structure
 * 2. That all referenced assets exist
 * 3. That all case study HTML files match their configuration
 * 4. That the index.html carousel includes all featured case studies
 * 
 * Usage:
 *   node scripts/validate-case-studies.js
 */

const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'case-studies.json');
const indexPath = path.join(__dirname, '..', 'index.html');

let errors = [];
let warnings = [];

/**
 * Check if a file exists
 */
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

/**
 * Validate JSON structure
 */
function validateJsonStructure(config) {
  console.log('📋 Validating JSON structure...');
  
  if (!config.caseStudies || !Array.isArray(config.caseStudies)) {
    errors.push('Configuration must have a "caseStudies" array');
    return;
  }
  
  const requiredFields = ['id', 'title', 'description', 'role', 'timeline', 'teams', 'slug', 'featured', 'displayOrder'];
  
  config.caseStudies.forEach((cs, index) => {
    requiredFields.forEach(field => {
      if (cs[field] === undefined) {
        errors.push(`Case study at index ${index} is missing required field: "${field}"`);
      }
    });
    
    if (cs.id && cs.id !== cs.slug) {
      warnings.push(`Case study "${cs.id}" has mismatched id and slug`);
    }
    
    if (!cs.layout || !cs.layout.type) {
      errors.push(`Case study "${cs.id}" is missing layout configuration`);
    }
  });
  
  console.log('  ✅ JSON structure validated');
}

/**
 * Validate assets exist
 */
function validateAssets(config) {
  console.log('\n📁 Validating assets...');
  
  config.caseStudies.forEach(cs => {
    const caseStudyDir = path.join(__dirname, '..', 'case-studies', cs.slug);
    
    // Check if case study directory exists
    if (!fileExists(caseStudyDir)) {
      errors.push(`Directory not found: case-studies/${cs.slug}/`);
      return;
    }
    
    // Check carousel assets if featured
    if (cs.featured && cs.assets) {
      const imagesDir = path.join(__dirname, '..', 'images');
      
      if (cs.assets.cardPoster) {
        const posterPath = path.join(__dirname, '..', cs.assets.cardPoster);
        if (!fileExists(posterPath)) {
          warnings.push(`Card poster not found for "${cs.id}": ${cs.assets.cardPoster}`);
        }
      }
      
      if (cs.assets.cardVideo) {
        const videoPath = path.join(__dirname, '..', cs.assets.cardVideo);
        if (!fileExists(videoPath)) {
          warnings.push(`Card video not found for "${cs.id}": ${cs.assets.cardVideo}`);
        }
      }
      
      if (cs.assets.cardMobile) {
        const mobilePath = path.join(__dirname, '..', cs.assets.cardMobile);
        if (!fileExists(mobilePath)) {
          warnings.push(`Card mobile image not found for "${cs.id}": ${cs.assets.cardMobile}`);
        }
      }
    }
    
    // Check case study content assets
    if (cs.assets.images) {
      cs.assets.images.forEach(img => {
        const imgPath = path.join(caseStudyDir, img);
        if (!fileExists(imgPath)) {
          errors.push(`Image not found for "${cs.id}": ${img}`);
        }
      });
    }
    
    if (cs.assets.videos) {
      const videos = Array.isArray(cs.assets.videos) && typeof cs.assets.videos[0] === 'object'
        ? cs.assets.videos.map(v => v.src)
        : cs.assets.videos;
        
      videos.forEach(video => {
        const videoPath = path.join(caseStudyDir, video);
        if (!fileExists(videoPath)) {
          errors.push(`Video not found for "${cs.id}": ${video}`);
        }
      });
    }
    
    if (cs.assets.gifs) {
      cs.assets.gifs.forEach(gif => {
        const gifPath = path.join(caseStudyDir, gif);
        if (!fileExists(gifPath)) {
          errors.push(`GIF not found for "${cs.id}": ${gif}`);
        }
      });
    }
    
    // Check HTML file exists
    const htmlPath = path.join(caseStudyDir, `${cs.slug}.html`);
    if (!fileExists(htmlPath)) {
      warnings.push(`HTML file not found for "${cs.id}": ${cs.slug}.html`);
    }
  });
  
  console.log('  ✅ Assets validated');
}

/**
 * Validate index.html includes featured case studies
 */
function validateIndex(config) {
  console.log('\n🏠 Validating index.html...');
  
  if (!fileExists(indexPath)) {
    errors.push('index.html not found');
    return;
  }
  
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  const featuredCaseStudies = config.caseStudies.filter(cs => cs.featured);
  
  featuredCaseStudies.forEach(cs => {
    const dataAttr = `data-case-study="${cs.slug}"`;
    const count = (indexContent.match(new RegExp(dataAttr, 'g')) || []).length;
    
    if (count === 0) {
      errors.push(`Featured case study "${cs.id}" not found in index.html carousel`);
    } else if (count < 2) {
      warnings.push(`Featured case study "${cs.id}" should appear twice in carousel (original + duplicate set), found ${count}`);
    }
  });
  
  console.log('  ✅ index.html validated');
}

/**
 * Validate display order
 */
function validateDisplayOrder(config) {
  console.log('\n🔢 Validating display order...');
  
  const orders = config.caseStudies.map(cs => cs.displayOrder);
  const uniqueOrders = new Set(orders);
  
  if (orders.length !== uniqueOrders.size) {
    warnings.push('Duplicate displayOrder values found');
  }
  
  const sortedOrders = [...orders].sort((a, b) => a - b);
  for (let i = 0; i < sortedOrders.length; i++) {
    if (sortedOrders[i] !== i + 1) {
      warnings.push(`displayOrder should be sequential starting from 1, found gap at ${i + 1}`);
      break;
    }
  }
  
  console.log('  ✅ Display order validated');
}

/**
 * Main validation function
 */
function main() {
  console.log('🔍 Starting case study validation...\n');
  
  // Check if config file exists
  if (!fileExists(configPath)) {
    console.error('❌ Error: case-studies.json not found');
    process.exit(1);
  }
  
  // Load and parse config
  let config;
  try {
    const configContent = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(configContent);
  } catch (err) {
    console.error('❌ Error parsing case-studies.json:', err.message);
    process.exit(1);
  }
  
  // Run validations
  validateJsonStructure(config);
  validateAssets(config);
  validateIndex(config);
  validateDisplayOrder(config);
  
  // Print results
  console.log('\n' + '='.repeat(60));
  console.log('VALIDATION RESULTS');
  console.log('='.repeat(60));
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('\n✨ All validations passed! No issues found.\n');
    process.exit(0);
  }
  
  if (errors.length > 0) {
    console.log('\n❌ ERRORS:');
    errors.forEach((error, index) => {
      console.log(`  ${index + 1}. ${error}`);
    });
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach((warning, index) => {
      console.log(`  ${index + 1}. ${warning}`);
    });
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`Total: ${errors.length} error(s), ${warnings.length} warning(s)`);
  console.log('='.repeat(60) + '\n');
  
  if (errors.length > 0) {
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  validateJsonStructure,
  validateAssets,
  validateIndex,
  validateDisplayOrder
};
