#!/usr/bin/env node

/**
 * Create all road sign images for the comprehensive sign list
 */

const fs = require('fs');
const path = require('path');

const signsDir = path.join(__dirname, '..', 'public', 'signs');

// Ensure signs directory exists
if (!fs.existsSync(signsDir)) {
  fs.mkdirSync(signsDir, { recursive: true });
}

// All the signs from your comprehensive list
const allSigns = [
  // Regulatory Signs
  'stop.png',
  'yield.png', 
  'speed-limit-80.png',
  'no-entry.png',
  'one-way.png',
  'no-parking.png',
  'no-stopping.png',
  'no-left-turn.png',
  'no-right-turn.png',
  'do-not-pass.png',
  
  // Warning Signs
  'curve-ahead.png',
  'winding-road.png',
  'steep-hill.png',
  'slippery.png',
  'road-narrows.png',
  'divided-highway-begins.png',
  'divided-highway-ends.png',
  'pedestrian-crossing.png',
  'school-zone.png',
  'deer-crossing.png',
  
  // Guide Signs
  'highway-route.png',
  'hospital.png',
  'gas.png',
  'rest-area.png',
  'airport.png',
  'park.png',
  'exit.png',
  'distance.png',
  'service.png',
  'ferry.png',
  
  // School Signs
  'school-crossing.png',
  'playground.png',
  'pedestrian-signal.png',
  'school-speed.png',
  'bicycle-crossing.png',
  'multi-use.png',
  'crosswalk.png',
  'school-bus.png',
  'disabled.png',
  'shared-roadway.png',
  
  // Construction Signs
  'flag-person.png',
  'detour.png'
];

// Create placeholder files for all signs
allSigns.forEach(imageName => {
  const filePath = path.join(signsDir, imageName);
  
  // Create a simple SVG placeholder with category-specific styling
  let bgColor = '#f3f4f6';
  let textColor = '#374151';
  let borderColor = '#d1d5db';
  
  // Category-specific colors
  if (imageName.includes('stop') || imageName.includes('yield') || imageName.includes('speed-limit') || 
      imageName.includes('no-') || imageName.includes('do-not')) {
    bgColor = '#fef2f2'; // Red background for regulatory
    textColor = '#dc2626';
    borderColor = '#fca5a5';
  } else if (imageName.includes('curve') || imageName.includes('winding') || imageName.includes('steep') ||
             imageName.includes('slippery') || imageName.includes('narrows') || imageName.includes('divided') ||
             imageName.includes('pedestrian') || imageName.includes('school-zone') || imageName.includes('deer')) {
    bgColor = '#fefce8'; // Yellow background for warning
    textColor = '#ca8a04';
    borderColor = '#fde047';
  } else if (imageName.includes('hospital') || imageName.includes('gas') || imageName.includes('rest') ||
             imageName.includes('airport') || imageName.includes('park') || imageName.includes('exit') ||
             imageName.includes('distance') || imageName.includes('service') || imageName.includes('ferry') ||
             imageName.includes('highway-route')) {
    bgColor = '#eff6ff'; // Blue background for guide
    textColor = '#2563eb';
    borderColor = '#93c5fd';
  } else if (imageName.includes('school') || imageName.includes('playground') || imageName.includes('bicycle') ||
             imageName.includes('multi-use') || imageName.includes('crosswalk') || imageName.includes('disabled') ||
             imageName.includes('shared-roadway') || imageName.includes('pedestrian-signal')) {
    bgColor = '#f0fdf4'; // Green background for school
    textColor = '#16a34a';
    borderColor = '#86efac';
  } else if (imageName.includes('flag-person') || imageName.includes('detour')) {
    bgColor = '#fff7ed'; // Orange background for construction
    textColor = '#ea580c';
    borderColor = '#fdba74';
  }
  
  const svgContent = `
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="${bgColor}" stroke="${borderColor}" stroke-width="2" rx="8"/>
  <text x="100" y="90" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="${textColor}">
    ${imageName.replace('.png', '').replace('-', ' ').toUpperCase()}
  </text>
  <text x="100" y="110" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="10" fill="${textColor}">
    Placeholder Image
  </text>
  <text x="100" y="130" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="8" fill="${textColor}">
    Replace with actual sign
  </text>
</svg>`;
  
  fs.writeFileSync(filePath, svgContent);
  console.log(`✅ Created placeholder: ${imageName}`);
});

console.log(`\n🎉 Created ${allSigns.length} placeholder images!`);
console.log(`📁 Location: ${signsDir}`);
console.log(`\n📋 Categories:`);
console.log(`   🚦 Regulatory: 10 signs`);
console.log(`   ⚠️  Warning: 10 signs`);
console.log(`   ℹ️  Guide: 10 signs`);
console.log(`   🏫 School: 10 signs`);
console.log(`   🚧 Construction: 2 signs`);
console.log(`\n💡 Replace these with your actual road sign images to see the real signs.`);

