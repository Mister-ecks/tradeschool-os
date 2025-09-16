# 🚦 Road Signs Flashcard System

## Overview
An advanced React component system for learning Ontario road signs with interactive flashcards, quizzes, and progress tracking.

## 📁 File Structure
```
/public/signs/                    # All road sign images
/data/signs.json                  # Complete sign database (42 signs)
/components/modules/road-signs/
  ├── SignFlashcards.jsx         # Main flashcard component
  ├── RoadSignsLearningModule.js # Original category-based component
  └── README.md                  # This file
/pages/road-signs.jsx            # Simple page wrapper
/app/learning-platform/road-signs/page.js  # Next.js page
```

## ✨ Features

### 🎯 **Dual View Modes**
- **Grid View**: See all signs at once, perfect for overview
- **Flashcard Mode**: Focus on one sign at a time with navigation

### 📊 **Progress Tracking**
- Real-time progress bar showing completion percentage
- Detailed statistics modal with accuracy metrics
- Tracks correct/incorrect answers per sign
- Reset functionality to start over

### 🧠 **Interactive Learning**
- Immediate feedback on quiz answers (green/red highlighting)
- Click-to-answer multiple choice questions
- Visual progress indicators
- Card navigation with dots and prev/next buttons

### 📱 **Responsive Design**
- Works on desktop, tablet, and mobile
- Adaptive grid layouts
- Touch-friendly interface

## 🚀 Usage

### Basic Implementation
```jsx
import SignFlashcards from "@/components/modules/road-signs/SignFlashcards";

export default function RoadSignsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SignFlashcards />
    </main>
  );
}
```

### Data Structure
The component expects a JSON file at `/data/signs.json` with this structure:
```json
[
  {
    "id": "stop",
    "category": "Regulatory",
    "name": "STOP",
    "meaning": "Full stop at line/crosswalk/intersection...",
    "image": "/signs/stop.png",
    "quiz": [
      {
        "question": "What shape is a STOP sign?",
        "options": ["Circle", "Triangle", "Octagon", "Rectangle"],
        "answer": "Octagon"
      }
    ]
  }
]
```

## 🎨 Customization

### Styling
- Uses Tailwind CSS for all styling
- Easy to customize colors, spacing, and layout
- Responsive breakpoints: `md:`, `lg:`

### Adding New Signs
1. Add image to `/public/signs/`
2. Add entry to `/data/signs.json`
3. Component automatically picks up new signs

### Quiz Questions
- Each sign can have multiple quiz questions
- Questions are optional (signs without quizzes show "Study Complete")
- Immediate visual feedback on answers

## 🔧 Technical Details

### State Management
- `signs`: Array of all road signs from JSON
- `progress`: Object tracking user answers per sign
- `currentIndex`: Current card in flashcard mode
- `viewMode`: "grid" or "flashcard"
- `showStats`: Boolean for statistics modal

### Performance
- Lazy loading of images with error handling
- Efficient state updates
- Smooth transitions with CSS

### Browser Support
- Modern browsers with ES6+ support
- Responsive design works on all screen sizes
- Touch gestures supported on mobile

## 📈 Progress Tracking

The component tracks:
- **Total Questions**: All quiz questions across all signs
- **Answered Questions**: Questions the user has attempted
- **Correct Answers**: Questions answered correctly
- **Accuracy Percentage**: (Correct / Total) * 100

## 🎯 Learning Modes

### Grid View
- Overview of all signs
- Quick access to any sign
- Click any card to switch to flashcard mode
- Compact quiz display

### Flashcard Mode
- Focus on one sign at a time
- Large, clear image display
- Full quiz questions with better spacing
- Navigation controls (prev/next/dots)
- Category information display

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install lucide-react
   ```

2. **Add Images**:
   - Place your road sign images in `/public/signs/`
   - Ensure filenames match the `image` field in `signs.json`

3. **Customize Data**:
   - Edit `/data/signs.json` to add/modify signs
   - Add quiz questions as needed

4. **Use Component**:
   - Import and use `SignFlashcards` in your pages
   - Component handles all functionality automatically

## 🔄 Migration from Original Component

The original `RoadSignsLearningModule.js` is still available for category-based learning. The new `SignFlashcards.jsx` provides:
- More flexible navigation
- Better progress tracking
- Improved user experience
- Easier customization

Choose based on your learning objectives:
- **Category-based**: Use `RoadSignsLearningModule.js`
- **Flashcard-based**: Use `SignFlashcards.jsx`


