#!/usr/bin/env node

/**
 * Create sample road sign images for demonstration
 */

const fs = require('fs');
const path = require('path');

const signsDir = path.join(__dirname, '..', 'public', 'signs');

// Ensure signs directory exists
if (!fs.existsSync(signsDir)) {
  fs.mkdirSync(signsDir, { recursive: true });
}

// Sample images to create (these would be your actual images)
const sampleImages = [
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
  'curve-left.png',
  'curve-right.png',
  'steep-hill.png',
  'slippery.png',
  'road-narrows.png',
  'deer-crossing.png',
  'pedestrian-crossing.png',
  'school-zone.png',
  'railway-crossing.png',
  'hospital.png',
  'gas-station.png',
  'rest-area.png',
  'exit-sign.png',
  'construction.png',
  'detour.png'
];

// Create placeholder files for demonstration
sampleImages.forEach(imageName => {
  const filePath = path.join(signsDir, imageName);
  
  // Create a simple SVG placeholder
  const svgContent = `
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="8"/>
  <text x="100" y="100" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="16" fill="#374151">
    ${imageName.replace('.png', '').replace('-', ' ').toUpperCase()}
  </text>
  <text x="100" y="120" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="12" fill="#6b7280">
    Placeholder Image
  </text>
</svg>`;
  
  fs.writeFileSync(filePath, svgContent);
  console.log(`✅ Created placeholder: ${imageName}`);
});

console.log(`\n🎉 Created ${sampleImages.length} placeholder images!`);
console.log(`📁 Location: ${signsDir}`);
console.log(`\n💡 Replace these with your actual road sign images to see the real signs.`);

