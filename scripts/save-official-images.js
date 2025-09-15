#!/usr/bin/env node

/**
 * Save Official Road Sign Images
 * Creates the official road sign images based on the shared images
 */

const fs = require('fs');
const path = require('path');

const SIGNS_DIR = path.join(__dirname, '..', 'public', 'signs');

// Create directory structure
const categories = ['regulatory', 'warning', 'guide', 'school', 'temporary'];
categories.forEach(category => {
  const categoryDir = path.join(SIGNS_DIR, category);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
    console.log(`📁 Created directory: ${category}/`);
  }
});

// Road sign mappings based on the shared images
const roadSigns = [
  // Regulatory Signs
  {
    id: 'no-left-turn',
    category: 'regulatory',
    description: 'No Left Turn - Red circle with diagonal slash over black left arrow'
  },
  {
    id: 'no-right-turn', 
    category: 'regulatory',
    description: 'No Right Turn - Red circle with diagonal slash over black right arrow'
  },
  {
    id: 'no-parking',
    category: 'regulatory', 
    description: 'No Parking - Red circle with diagonal slash over black P'
  },
  {
    id: 'no-stopping',
    category: 'regulatory',
    description: 'No Stopping - Red circle with diagonal slash over stop sign symbol'
  },
  {
    id: 'do-not-pass',
    category: 'regulatory',
    description: 'Do Not Pass - Red circle with diagonal slash over two cars'
  },
  {
    id: 'no-straight-through',
    category: 'regulatory',
    description: 'No Straight Through - Red circle with diagonal slash over up arrow'
  },
  {
    id: 'no-pedestrian',
    category: 'regulatory',
    description: 'No Pedestrian - Red circle with diagonal slash over walking person'
  },
  {
    id: 'no-bicycle',
    category: 'regulatory',
    description: 'No Bicycle - Red circle with diagonal slash over bicycle'
  },
  {
    id: 'no-u-turn',
    category: 'regulatory',
    description: 'No U-Turn - Red circle with diagonal slash over U-turn arrow'
  },
  {
    id: 'mandatory-left-turn',
    category: 'regulatory',
    description: 'Mandatory Left Turn - Green circle with black left arrow'
  },
  {
    id: 'mandatory-right-turn',
    category: 'regulatory',
    description: 'Mandatory Right Turn - Green circle with black right arrow'
  },
  {
    id: 'go-straight',
    category: 'regulatory',
    description: 'Go Straight - Green circle with black up arrow'
  },
  {
    id: 'hov-lane',
    category: 'regulatory',
    description: 'HOV Lane - Green circle with black diamond'
  },
  {
    id: 'parking-30min',
    category: 'regulatory',
    description: '30 Min Parking - Green circle with P, time restrictions'
  },
  {
    id: 'no-standing-permit',
    category: 'regulatory',
    description: 'No Standing By Permit Only - No standing with accessibility symbol'
  },

  // Warning Signs
  {
    id: 't-intersection',
    category: 'warning',
    description: 'T-Intersection - Yellow diamond with black T'
  },
  {
    id: 'curve-left',
    category: 'warning',
    description: 'Curve Left - Yellow diamond with left curve arrow'
  },
  {
    id: 'curve-right',
    category: 'warning',
    description: 'Curve Right - Yellow diamond with right curve arrow'
  },
  {
    id: 'steep-hill',
    category: 'warning',
    description: 'Steep Hill - Yellow diamond with truck on incline'
  },
  {
    id: 'road-narrows',
    category: 'warning',
    description: 'Road Narrows - Yellow diamond with narrowing lines'
  },
  {
    id: 'winding-road',
    category: 'warning',
    description: 'Winding Road - Yellow diamond with S-curve arrow'
  },
  {
    id: 'stop-ahead',
    category: 'warning',
    description: 'Stop Ahead - Yellow diamond with stop sign symbol'
  },
  {
    id: 'y-intersection',
    category: 'warning',
    description: 'Y-Intersection - Yellow diamond with Y symbol'
  },
  {
    id: 'divided-highway-ends',
    category: 'warning',
    description: 'Divided Highway Ends - Yellow diamond with merging arrows'
  },
  {
    id: 'reverse-curve',
    category: 'warning',
    description: 'Reverse Curve - Yellow diamond with S-curve arrow'
  },
  {
    id: 'railway-crossing',
    category: 'warning',
    description: 'Railway Crossing - Yellow diamond with railway tracks'
  },
  {
    id: 'two-way-traffic',
    category: 'warning',
    description: 'Two Way Traffic - Yellow diamond with opposing arrows'
  },
  {
    id: 'traffic-signal-ahead',
    category: 'warning',
    description: 'Traffic Signal Ahead - Yellow diamond with traffic light'
  },
  {
    id: 'divided-highway-begins',
    category: 'warning',
    description: 'Divided Highway Begins - Yellow diamond with diverging arrows'
  },
  {
    id: 'merge-right',
    category: 'warning',
    description: 'Merge Right - Yellow diamond with merge arrow'
  },
  {
    id: 'curve-chevron',
    category: 'warning',
    description: 'Curve Chevron - Yellow diamond with chevron arrow'
  },
  {
    id: 'pass-either-side',
    category: 'warning',
    description: 'Pass Either Side - Black square with diverging arrows'
  },
  {
    id: 'crossroad',
    category: 'warning',
    description: 'Crossroad - Yellow diamond with crossroad symbol'
  },
  {
    id: 'uneven-road',
    category: 'warning',
    description: 'Uneven Road - Yellow diamond with bumpy road'
  },
  {
    id: 'slippery-when-wet',
    category: 'warning',
    description: 'Slippery When Wet - Yellow diamond with car and skid marks'
  },
  {
    id: 'pedestrian-crossing',
    category: 'warning',
    description: 'Pedestrian Crossing - Yellow diamond with walking person'
  },
  {
    id: 'pavement-ends',
    category: 'warning',
    description: 'Pavement Ends - Yellow diamond with road surface change'
  },
  {
    id: 'falling-rocks',
    category: 'warning',
    description: 'Falling Rocks - Yellow diamond with rocks falling'
  },
  {
    id: 'deer-crossing',
    category: 'warning',
    description: 'Deer Crossing - Yellow diamond with deer silhouette'
  },

  // Guide Signs
  {
    id: 'hospital',
    category: 'guide',
    description: 'Hospital - Blue square with white H'
  },
  {
    id: 'gas-station',
    category: 'guide',
    description: 'Gas Station - Blue square with gas pump symbol'
  },
  {
    id: 'rest-area',
    category: 'guide',
    description: 'Rest Area - Blue square with rest symbol'
  },
  {
    id: 'exit-sign',
    category: 'guide',
    description: 'Exit Sign - Green square with EXIT text'
  },
  {
    id: 'service-centre',
    category: 'guide',
    description: 'Service Centre - Blue square with service symbol'
  }
];

// Create placeholder files for each sign
roadSigns.forEach(sign => {
  const categoryDir = path.join(SIGNS_DIR, sign.category);
  const filePath = path.join(categoryDir, `${sign.id}.png`);
  
  // Create a simple placeholder file
  const placeholderContent = `# ${sign.id}
# Category: ${sign.category}
# Description: ${sign.description}
# This is a placeholder for the official road sign image.
# The actual image should be uploaded to replace this file.`;
  
  fs.writeFileSync(filePath, placeholderContent);
  console.log(`✅ Created placeholder: ${sign.category}/${sign.id}.png`);
});

console.log(`\n🎉 Created ${roadSigns.length} road sign placeholders!`);
console.log(`📁 Organized into categories: ${categories.join(', ')}`);
console.log(`\n💡 Next steps:`);
console.log(`1. Replace placeholder files with actual images`);
console.log(`2. Images will automatically appear in the road signs module`);
console.log(`3. System supports: PNG, JPG, JPEG, GIF, WEBP`);

