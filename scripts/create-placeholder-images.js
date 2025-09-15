const fs = require('fs');
const path = require('path');

// Create a simple SVG placeholder for each sign
function createPlaceholderSVG(signName, backgroundColor = '#f0f0f0', textColor = '#333') {
  return `<svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="160" fill="${backgroundColor}" stroke="#ccc" stroke-width="2"/>
    <text x="80" y="80" text-anchor="middle" dominant-baseline="middle" 
          font-family="Arial, sans-serif" font-size="12" fill="${textColor}">
      ${signName}
    </text>
  </svg>`;
}

// Sign configurations with different colors
const signs = [
  { name: 'no-u-turn', bg: '#ff6b6b', text: '#fff' },
  { name: 'truck-route', bg: '#4ecdc4', text: '#fff' },
  { name: 'hospital', bg: '#45b7d1', text: '#fff' },
  { name: 'gas-station', bg: '#96ceb4', text: '#333' },
  { name: 'rest-area', bg: '#feca57', text: '#333' },
  { name: 'merge-left', bg: '#ff9ff3', text: '#333' },
  { name: 'lane-ends', bg: '#54a0ff', text: '#fff' },
  { name: 't-intersection', bg: '#5f27cd', text: '#fff' }
];

const signsDir = path.join(__dirname, '..', 'public', 'signs');

signs.forEach(sign => {
  const svg = createPlaceholderSVG(sign.name.toUpperCase(), sign.bg, sign.text);
  const filePath = path.join(signsDir, `${sign.name}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`Created ${sign.name}.svg`);
});

console.log('Placeholder images created successfully!');

