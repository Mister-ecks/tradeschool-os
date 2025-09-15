"use client";
import { useState, useEffect } from "react";
import { cdlCurriculum, yardTrainingChecklist } from "@/data/cdl-curriculum";
import QuizSystem from "@/components/quiz/QuizSystem";

export default function CDLTrainingModule() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [yardTraining, setYardTraining] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [progress, setProgress] = useState({});

  // Sample quiz questions for each day
  const dayQuizzes = {
    day1: [
      {
        question: "What is the minimum age requirement for a CDL in Ontario?",
        options: ["18 years", "19 years", "21 years", "25 years"],
        correctAnswer: "18 years"
      },
      {
        question: "How many hours of service can a commercial driver work in a 24-hour period?",
        options: ["8 hours", "10 hours", "12 hours", "14 hours"],
        correctAnswer: "14 hours"
      },
      {
        question: "What class of license is required for a vehicle with a GVWR of 26,001 lbs or more?",
        options: ["Class A", "Class B", "Class C", "Class D"],
        correctAnswer: "Class B"
      }
    ],
    day2: [
      {
        question: "What is the minimum air pressure required for air brakes to function properly?",
        options: ["60 PSI", "80 PSI", "100 PSI", "120 PSI"],
        correctAnswer: "100 PSI"
      },
      {
        question: "How often should air brake systems be inspected?",
        options: ["Daily", "Weekly", "Monthly", "Annually"],
        correctAnswer: "Daily"
      },
      {
        question: "What does ABS stand for in commercial vehicles?",
        options: ["Anti-Brake System", "Automatic Brake System", "Anti-Lock Brake System", "Advanced Brake System"],
        correctAnswer: "Anti-Lock Brake System"
      }
    ],
    day3: [
      {
        question: "What does a yellow diamond-shaped sign typically indicate?",
        options: ["Warning", "Regulatory", "Guide", "Construction"],
        correctAnswer: "Warning"
      },
      {
        question: "At a four-way stop, who has the right of way?",
        options: ["The first to arrive", "The vehicle on the right", "The larger vehicle", "The vehicle going straight"],
        correctAnswer: "The first to arrive"
      },
      {
        question: "What is the speed limit in a school zone?",
        options: ["20 km/h", "30 km/h", "40 km/h", "50 km/h"],
        correctAnswer: "30 km/h"
      }
    ],
    day4: [
      {
        question: "What is the maximum speed limit for commercial vehicles on Ontario highways?",
        options: ["90 km/h", "100 km/h", "110 km/h", "120 km/h"],
        correctAnswer: "100 km/h"
      },
      {
        question: "How far should you follow behind another vehicle in good weather?",
        options: ["1 second", "2 seconds", "3 seconds", "4 seconds"],
        correctAnswer: "3 seconds"
      },
      {
        question: "What is the proper way to back up a commercial vehicle?",
        options: ["Use mirrors only", "Get out and look", "Use a spotter", "All of the above"],
        correctAnswer: "All of the above"
      }
    ],
    day5: [
      {
        question: "What is the maximum blood alcohol content for commercial drivers?",
        options: ["0.00%", "0.02%", "0.05%", "0.08%"],
        correctAnswer: "0.00%"
      },
      {
        question: "How long must you keep your logbook records?",
        options: ["30 days", "60 days", "90 days", "6 months"],
        correctAnswer: "6 months"
      },
      {
        question: "What is required for transporting hazardous materials?",
        options: ["Special endorsement", "Additional training", "Special permits", "All of the above"],
        correctAnswer: "All of the above"
      }
    ]
  };

  const handleQuizComplete = (results) => {
    setProgress(prev => ({
      ...prev,
      [selectedDay]: results
    }));
    setQuizMode(false);
  };

  const handleYardTrainingComplete = (category, results) => {
    setProgress(prev => ({
      ...prev,
      [`yard-${category}`]: results
    }));
    setSelectedCategory(null);
  };

  if (quizMode && selectedDay) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => setQuizMode(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Back to Module
          </button>
        </div>
        <QuizSystem
          questions={dayQuizzes[selectedDay] || []}
          onComplete={handleQuizComplete}
          passingScore={80}
        />
      </div>
    );
  }

  if (yardTraining) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => setYardTraining(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Back to Main Menu
          </button>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Yard Training Checklist</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {yardTrainingChecklist.categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.items.length} inspection items</p>
              
              <div className="space-y-2 mb-6">
                {category.items.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-4 h-4 border-2 border-gray-300 rounded mr-3"></div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex-1"
                >
                  Start Training
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setQuizMode(true);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">CDL Training Program</h1>
      <p className="text-gray-600 mb-8">{cdlCurriculum.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cdlCurriculum.modules.map((module) => (
          <div key={module.id} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
            <p className="text-gray-600 mb-4">{module.duration}</p>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2">Topics Covered:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {module.topics.map((topic, index) => (
                  <li key={index}>• {topic}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2">Videos ({module.videos.length}):</h4>
              <div className="space-y-1">
                {module.videos.map((video) => (
                  <div key={video.id} className="text-sm text-gray-600">
                    • {video.title} ({video.duration})
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedDay(module.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex-1"
              >
                Start Module
              </button>
              <button
                onClick={() => {
                  setSelectedDay(module.id);
                  setQuizMode(true);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Additional Training</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setYardTraining(true)}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <h3 className="text-lg font-medium mb-2">Yard Training Checklist</h3>
            <p className="text-gray-600">Hands-on inspection training</p>
          </button>
          
          <button
            onClick={() => setSelectedModule('road-signs')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <h3 className="text-lg font-medium mb-2">Road Signs Training</h3>
            <p className="text-gray-600">Interactive road signs quiz</p>
          </button>
        </div>
      </div>
    </div>
  );
}

