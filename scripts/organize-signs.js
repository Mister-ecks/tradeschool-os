#!/usr/bin/env node

/**
 * Script to organize road sign images by category
 * Usage: node scripts/organize-signs.js
 */

const fs = require('fs');
const path = require('path');

const signsDirectory = path.join(__dirname, '..', 'public', 'signs');
const categories = {
  regulatory: [
    'stop-sign', 'yield-sign', 'speed-limit', 'no-entry', 'one-way',
    'no-parking', 'no-stopping', 'no-left-turn', 'no-right-turn', 'do-not-pass'
  ],
  warning: [
    'curve-ahead', 'winding-road', 'steep-hill', 'slippery-when-wet', 'road-narrows',
    'deer-crossing', 'pedestrian-crossing', 'school-zone-ahead', 'railway-crossing', 'low-clearance'
  ],
  guide: [
    'hospital', 'gas-station', 'rest-area', 'exit-sign', 'service-centre'
  ]
};

function organizeImages() {
  console.log('🚦 Organizing Road Sign Images...\n');

  // Check if signs directory exists
  if (!fs.existsSync(signsDirectory)) {
    console.log('❌ Signs directory not found. Creating...');
    fs.mkdirSync(signsDirectory, { recursive: true });
  }

  // Create category directories
  Object.keys(categories).forEach(category => {
    const categoryDir = path.join(signsDirectory, category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
      console.log(`📁 Created directory: ${category}/`);
    }
  });

  // Create additional directories
  const additionalDirs = ['uploaded', 'templates', 'school', 'temporary'];
  additionalDirs.forEach(dir => {
    const dirPath = path.join(signsDirectory, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`📁 Created directory: ${dir}/`);
    }
  });

  console.log('\n✅ Directory structure created successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Add your road sign images to the appropriate category folders');
  console.log('2. Use the exact sign IDs as filenames (e.g., stop-sign.png)');
  console.log('3. Supported formats: PNG, JPG, GIF');
  console.log('4. Recommended size: 256x256px or 512x512px');
  
  console.log('\n📁 Folder structure:');
  console.log('public/signs/');
  console.log('├── regulatory/     # STOP, YIELD, Speed Limit, etc.');
  console.log('├── warning/        # Curve Ahead, Deer Crossing, etc.');
  console.log('├── guide/          # Hospital, Gas Station, etc.');
  console.log('├── school/         # School & Pedestrian signs');
  console.log('├── temporary/      # Construction signs');
  console.log('├── uploaded/       # User uploads');
  console.log('└── templates/      # Reference images');
}

// Run the script
organizeImages();


