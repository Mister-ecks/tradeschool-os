#!/usr/bin/env node

/**
 * Automated Road Sign Image Processor
 * 
 * This script will:
 * 1. Accept images in any format/name
 * 2. Use AI/pattern matching to identify the sign type
 * 3. Rename to correct format
 * 4. Place in appropriate category folder
 * 5. Update the system
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const INPUT_DIR = path.join(__dirname, '..', 'public', 'signs', 'input');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'signs');
const SUPPORTED_FORMATS = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

// Sign identification patterns
const SIGN_PATTERNS = {
  // Regulatory signs
  'stop-sign': {
    keywords: ['stop', 'octagon', 'red', 'white text'],
    patterns: [/stop/i, /octagon/i, /red.*white/i],
    category: 'regulatory'
  },
  'yield-sign': {
    keywords: ['yield', 'triangle', 'red border', 'white background'],
    patterns: [/yield/i, /triangle/i, /red.*border/i],
    category: 'regulatory'
  },
  'speed-limit': {
    keywords: ['speed', 'limit', 'km/h', 'mph', 'number'],
    patterns: [/speed/i, /limit/i, /\d+.*km\/h/i, /\d+.*mph/i],
    category: 'regulatory'
  },
  'no-entry': {
    keywords: ['no entry', 'do not enter', 'red circle', 'white background'],
    patterns: [/no.*entry/i, /do.*not.*enter/i, /red.*circle/i],
    category: 'regulatory'
  },
  'one-way': {
    keywords: ['one way', 'arrow', 'blue', 'white arrow'],
    patterns: [/one.*way/i, /arrow/i, /blue.*arrow/i],
    category: 'regulatory'
  },
  'no-parking': {
    keywords: ['no parking', 'parking', 'red circle', 'p symbol'],
    patterns: [/no.*parking/i, /parking/i, /p.*symbol/i],
    category: 'regulatory'
  },
  'no-stopping': {
    keywords: ['no stopping', 'stopping', 'red circle', 'stop symbol'],
    patterns: [/no.*stopping/i, /stopping/i, /stop.*symbol/i],
    category: 'regulatory'
  },
  'no-left-turn': {
    keywords: ['no left turn', 'left turn', 'arrow', 'red circle'],
    patterns: [/no.*left.*turn/i, /left.*turn/i, /left.*arrow/i],
    category: 'regulatory'
  },
  'no-right-turn': {
    keywords: ['no right turn', 'right turn', 'arrow', 'red circle'],
    patterns: [/no.*right.*turn/i, /right.*turn/i, /right.*arrow/i],
    category: 'regulatory'
  },
  'do-not-pass': {
    keywords: ['do not pass', 'passing', 'cars', 'vehicles'],
    patterns: [/do.*not.*pass/i, /passing/i, /cars/i, /vehicles/i],
    category: 'regulatory'
  },
  
  // Warning signs
  'curve-ahead': {
    keywords: ['curve', 'bend', 'yellow', 'diamond'],
    patterns: [/curve/i, /bend/i, /yellow.*diamond/i],
    category: 'warning'
  },
  'winding-road': {
    keywords: ['winding', 'curves', 'squiggly', 'yellow'],
    patterns: [/winding/i, /curves/i, /squiggly/i, /wavy/i],
    category: 'warning'
  },
  'steep-hill': {
    keywords: ['steep', 'hill', 'grade', 'truck', 'yellow'],
    patterns: [/steep/i, /hill/i, /grade/i, /truck/i],
    category: 'warning'
  },
  'slippery-when-wet': {
    keywords: ['slippery', 'wet', 'car', 'skid', 'yellow'],
    patterns: [/slippery/i, /wet/i, /skid/i, /car.*water/i],
    category: 'warning'
  },
  'road-narrows': {
    keywords: ['narrows', 'narrow', 'width', 'yellow'],
    patterns: [/narrows/i, /narrow/i, /width/i],
    category: 'warning'
  },
  'deer-crossing': {
    keywords: ['deer', 'animal', 'crossing', 'yellow'],
    patterns: [/deer/i, /animal/i, /crossing/i],
    category: 'warning'
  },
  'pedestrian-crossing': {
    keywords: ['pedestrian', 'walking', 'person', 'crossing'],
    patterns: [/pedestrian/i, /walking/i, /person/i, /crossing/i],
    category: 'warning'
  },
  'school-zone-ahead': {
    keywords: ['school', 'children', 'kids', 'zone'],
    patterns: [/school/i, /children/i, /kids/i, /zone/i],
    category: 'warning'
  },
  'railway-crossing': {
    keywords: ['railway', 'train', 'crossing', 'x shape'],
    patterns: [/railway/i, /train/i, /crossing/i, /x.*shape/i],
    category: 'warning'
  },
  'low-clearance': {
    keywords: ['low clearance', 'height', 'bridge', 'truck'],
    patterns: [/low.*clearance/i, /height/i, /bridge/i, /truck/i],
    category: 'warning'
  },
  
  // Guide signs
  'hospital': {
    keywords: ['hospital', 'medical', 'h symbol', 'blue'],
    patterns: [/hospital/i, /medical/i, /h.*symbol/i, /blue.*h/i],
    category: 'guide'
  },
  'gas-station': {
    keywords: ['gas', 'fuel', 'station', 'pump', 'blue'],
    patterns: [/gas/i, /fuel/i, /station/i, /pump/i],
    category: 'guide'
  },
  'rest-area': {
    keywords: ['rest', 'area', 'picnic', 'blue'],
    patterns: [/rest.*area/i, /picnic/i, /rest/i],
    category: 'guide'
  },
  'exit-sign': {
    keywords: ['exit', 'green', 'highway'],
    patterns: [/exit/i, /green.*exit/i],
    category: 'guide'
  },
  'service-centre': {
    keywords: ['service', 'centre', 'center', 'services'],
    patterns: [/service/i, /centre/i, /center/i, /services/i],
    category: 'guide'
  }
};

function createInputDirectory() {
  if (!fs.existsSync(INPUT_DIR)) {
    fs.mkdirSync(INPUT_DIR, { recursive: true });
    console.log(`📁 Created input directory: ${INPUT_DIR}`);
  }
}

function identifySign(filename, imagePath) {
  const name = filename.toLowerCase().replace(/[^a-z0-9]/g, ' ');
  
  // Try to match by filename first
  for (const [signId, config] of Object.entries(SIGN_PATTERNS)) {
    for (const pattern of config.patterns) {
      if (pattern.test(name) || pattern.test(filename)) {
        return { signId, category: config.category, confidence: 'high' };
      }
    }
  }
  
  // If no match, return unknown
  return { signId: 'unknown', category: 'unknown', confidence: 'low' };
}

function processImage(filePath) {
  const filename = path.basename(filePath);
  const ext = path.extname(filename).toLowerCase();
  
  if (!SUPPORTED_FORMATS.includes(ext)) {
    console.log(`❌ Skipping ${filename} - unsupported format`);
    return null;
  }
  
  console.log(`🔍 Processing: ${filename}`);
  
  // Identify the sign
  const identification = identifySign(filename, filePath);
  
  if (identification.signId === 'unknown') {
    console.log(`❓ Unknown sign type: ${filename}`);
    console.log(`   Please rename to include sign type (e.g., "stop-sign.jpg")`);
    return null;
  }
  
  // Create new filename
  const newFilename = `${identification.signId}${ext}`;
  const categoryDir = path.join(OUTPUT_DIR, identification.category);
  const outputPath = path.join(categoryDir, newFilename);
  
  // Ensure category directory exists
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }
  
  // Copy file to correct location
  try {
    fs.copyFileSync(filePath, outputPath);
    console.log(`✅ Processed: ${filename} → ${identification.category}/${newFilename}`);
    return {
      original: filename,
      newName: newFilename,
      category: identification.category,
      path: outputPath
    };
  } catch (error) {
    console.log(`❌ Error processing ${filename}: ${error.message}`);
    return null;
  }
}

function processAllImages() {
  console.log('🚦 Starting Road Sign Image Processing...\n');
  
  // Create input directory
  createInputDirectory();
  
  // Check if input directory has files
  const files = fs.readdirSync(INPUT_DIR);
  const imageFiles = files.filter(file => 
    SUPPORTED_FORMATS.includes(path.extname(file).toLowerCase())
  );
  
  if (imageFiles.length === 0) {
    console.log('📁 No images found in input directory.');
    console.log(`   Please add your images to: ${INPUT_DIR}`);
    console.log('\n📋 Supported formats: PNG, JPG, JPEG, GIF, WEBP');
    console.log('💡 Tip: You can name files descriptively (e.g., "stop sign.jpg")');
    return;
  }
  
  console.log(`📸 Found ${imageFiles.length} image(s) to process:\n`);
  
  const results = [];
  
  // Process each image
  imageFiles.forEach(file => {
    const filePath = path.join(INPUT_DIR, file);
    const result = processImage(filePath);
    if (result) {
      results.push(result);
    }
  });
  
  // Summary
  console.log('\n📊 Processing Summary:');
  console.log(`✅ Successfully processed: ${results.length} images`);
  console.log(`❌ Failed: ${imageFiles.length - results.length} images`);
  
  if (results.length > 0) {
    console.log('\n📁 Images organized by category:');
    const byCategory = results.reduce((acc, result) => {
      if (!acc[result.category]) acc[result.category] = [];
      acc[result.category].push(result.newName);
      return acc;
    }, {});
    
    Object.entries(byCategory).forEach(([category, files]) => {
      console.log(`   ${category}/: ${files.join(', ')}`);
    });
    
    console.log('\n🎉 Images are now ready to use in the Road Signs module!');
    console.log('   The system will automatically detect and use these images.');
  }
}

// Run the processor
processAllImages();

