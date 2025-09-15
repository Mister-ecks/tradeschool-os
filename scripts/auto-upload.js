#!/usr/bin/env node

/**
 * Auto-Upload Script for Road Sign Images
 * This script monitors the input directory and automatically processes new images
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const INPUT_DIR = path.join(__dirname, '..', 'public', 'signs', 'input');
const PROCESSED_DIR = path.join(__dirname, '..', 'public', 'signs', 'processed');
const SUPPORTED_FORMATS = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

// Create directories if they don't exist
function ensureDirectories() {
  [INPUT_DIR, PROCESSED_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${path.basename(dir)}/`);
    }
  });
}

// Process a single image
function processImage(filePath) {
  const filename = path.basename(filePath);
  const ext = path.extname(filename).toLowerCase();
  
  if (!SUPPORTED_FORMATS.includes(ext)) {
    console.log(`❌ Skipping ${filename} - unsupported format`);
    return false;
  }
  
  console.log(`🔄 Processing: ${filename}`);
  
  try {
    // Run the main processing script
    execSync(`node scripts/process-sign-images.js`, { stdio: 'inherit' });
    
    // Move processed file to processed directory
    const processedPath = path.join(PROCESSED_DIR, filename);
    fs.renameSync(filePath, processedPath);
    
    console.log(`✅ Processed and moved: ${filename}`);
    return true;
  } catch (error) {
    console.log(`❌ Error processing ${filename}: ${error.message}`);
    return false;
  }
}

// Monitor directory for new files
function startMonitoring() {
  console.log('🚦 Auto-Upload System Started');
  console.log(`📁 Monitoring: ${INPUT_DIR}`);
  console.log('📋 Supported formats: PNG, JPG, JPEG, GIF, WEBP');
  console.log('💡 Just drop your images in the input folder!');
  console.log('🔄 Press Ctrl+C to stop\n');
  
  // Process any existing files first
  const existingFiles = fs.readdirSync(INPUT_DIR)
    .filter(file => SUPPORTED_FORMATS.includes(path.extname(file).toLowerCase()));
  
  if (existingFiles.length > 0) {
    console.log(`📸 Found ${existingFiles.length} existing file(s) to process:`);
    existingFiles.forEach(file => {
      const filePath = path.join(INPUT_DIR, file);
      processImage(filePath);
    });
    console.log('');
  }
  
  // Set up file watcher
  fs.watch(INPUT_DIR, (eventType, filename) => {
    if (eventType === 'rename' && filename) {
      const filePath = path.join(INPUT_DIR, filename);
      
      // Wait a moment for file to be fully written
      setTimeout(() => {
        if (fs.existsSync(filePath)) {
          processImage(filePath);
        }
      }, 1000);
    }
  });
}

// Main execution
function main() {
  ensureDirectories();
  startMonitoring();
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Auto-upload system stopped');
  process.exit(0);
});

main();

