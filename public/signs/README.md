# Road Signs Images Directory

This directory contains the road sign images used in the Road Signs Learning Module.

## File Structure

```
public/signs/
├── stop.png
├── yield.png
├── speed-limit-80.png
├── no-entry.png
├── one-way.png
├── no-parking.png
├── no-stopping.png
├── no-left-turn.png
├── no-right-turn.png
├── do-not-pass.png
├── curve-left.png
├── curve-right.png
├── steep-hill.png
├── slippery.png
├── road-narrows.png
├── deer-crossing.png
├── pedestrian-crossing.png
├── school-zone.png
├── railway-crossing.png
├── hospital.png
├── gas-station.png
├── rest-area.png
├── exit-sign.png
├── construction.png
└── detour.png
```

## Image Requirements

- **Format**: PNG, JPG, or JPEG
- **Size**: Recommended 200x200px or larger
- **Quality**: High resolution for clear display
- **Naming**: Use exact filenames as listed above

## How to Add Your Images

1. **Replace Placeholders**: The current files are SVG placeholders. Replace them with your actual road sign images.

2. **Naming Convention**: Keep the exact filenames as shown above. The system uses these filenames to match images with signs.

3. **Supported Formats**: PNG, JPG, JPEG, GIF, WEBP

4. **Auto-Upload System**: You can also use the auto-upload system:
   - Drop images in `public/signs/input/`
   - System will automatically detect, rename, and organize them

## Categories

- **Regulatory Signs**: Stop, Yield, Speed Limit, No Entry, etc.
- **Warning Signs**: Curve Left/Right, Steep Hill, Slippery, etc.
- **Guide Signs**: Hospital, Gas Station, Rest Area, etc.
- **School Signs**: School Zone, Pedestrian Crossing, etc.
- **Temporary Signs**: Construction, Detour, etc.

## Usage in Learning Module

The images are automatically loaded in the Road Signs Learning Module at:
`http://localhost:3000/learning-platform/road-signs`

Each sign displays its image, name, meaning, and includes an interactive quiz question.