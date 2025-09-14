// Simple script to generate placeholder icons for PWA
// In production, replace with actual app icons

const fs = require('fs');
const path = require('path');

// SVG template for TradeSchool OS icon
const createIconSVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0ea5e9;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.1}" fill="url(#grad)"/>
  <g transform="translate(${size * 0.25}, ${size * 0.25})">
    <path d="M${size * 0.15} ${size * 0.1}L${size * 0.35} ${size * 0.1}M${size * 0.1} ${size * 0.2}L${size * 0.4} ${size * 0.2}M${size * 0.05} ${size * 0.3}L${size * 0.25} ${size * 0.3}L${size * 0.3} ${size * 0.4}L${size * 0.45} ${size * 0.4}" 
          stroke="white" 
          stroke-width="${size * 0.02}" 
          stroke-linecap="round" 
          fill="none"/>
    <circle cx="${size * 0.35}" cy="${size * 0.15}" r="${size * 0.03}" fill="white"/>
    <circle cx="${size * 0.4}" cy="${size * 0.35}" r="${size * 0.03}" fill="white"/>
  </g>
</svg>
`;

// Create public directory if it doesn't exist
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Icon sizes for PWA
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('Generating placeholder icons for TradeSchool OS...');

iconSizes.forEach(size => {
  const svg = createIconSVG(size);
  const filename = `icon-${size}x${size}.svg`;
  const filepath = path.join(publicDir, filename);
  
  fs.writeFileSync(filepath, svg.trim());
  console.log(`Generated ${filename}`);
});

// Create a simple favicon
const faviconSVG = createIconSVG(32);
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSVG.trim());
console.log('Generated favicon.svg');

// Create placeholder screenshots for PWA
const createScreenshotSVG = (width, height, title) => `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#f8fafc"/>
  <rect x="0" y="0" width="${width}" height="60" fill="#3b82f6"/>
  <text x="${width/2}" y="35" text-anchor="middle" fill="white" font-family="Arial" font-size="18" font-weight="bold">
    TradeSchool OS
  </text>
  <rect x="20" y="80" width="${width-40}" height="200" fill="white" stroke="#e2e8f0" stroke-width="1" rx="8"/>
  <text x="${width/2}" y="${height/2}" text-anchor="middle" fill="#64748b" font-family="Arial" font-size="24">
    ${title}
  </text>
  <circle cx="${width/2}" cy="${height/2 + 40}" r="30" fill="#3b82f6" opacity="0.1"/>
  <path d="M${width/2 - 15} ${height/2 + 35}L${width/2} ${height/2 + 50}L${width/2 + 15} ${height/2 + 35}" 
        stroke="#3b82f6" stroke-width="3" stroke-linecap="round" fill="none"/>
</svg>
`;

// Generate screenshots
const mobileScreenshot = createScreenshotSVG(390, 844, 'Mobile Learning Platform');
const desktopScreenshot = createScreenshotSVG(1280, 720, 'Desktop Dashboard');

fs.writeFileSync(path.join(publicDir, 'screenshot-mobile.svg'), mobileScreenshot.trim());
fs.writeFileSync(path.join(publicDir, 'screenshot-desktop.svg'), desktopScreenshot.trim());

console.log('Generated screenshot-mobile.svg');
console.log('Generated screenshot-desktop.svg');

console.log('\n✅ All placeholder icons and screenshots generated!');
console.log('📝 Note: Replace these with actual app icons in production');
console.log('🎨 Consider using a tool like Figma or Adobe Illustrator for professional icons');




