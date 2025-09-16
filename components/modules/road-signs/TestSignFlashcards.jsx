"use client";
import { useState, useEffect } from "react";

export default function TestSignFlashcards() {
  const [signs, setSigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Component mounted, loading signs...");
    
    // Simulate loading with hardcoded data
    setTimeout(() => {
      const testSigns = [
        {
          id: "stop",
          category: "Regulatory",
          name: "STOP",
          meaning: "Full stop at line/crosswalk/intersection, yield before proceeding.",
          image: "/signs/stop.png",
          quiz: [
            {
              question: "What shape is a STOP sign?",
              options: ["Circle", "Triangle", "Octagon", "Rectangle"],
              answer: "Octagon"
            }
          ]
        },
        {
          id: "yield",
          category: "Regulatory", 
          name: "YIELD",
          meaning: "Slow down, prepare to stop, give way to other traffic/pedestrians.",
          image: "/signs/yield.png",
          quiz: [
            {
              question: "What should you do at a YIELD sign?",
              options: ["Stop completely", "Speed up", "Slow down and give way", "Ignore"],
              answer: "Slow down and give way"
            }
          ]
        },
        {
          id: "speed-limit",
          category: "Regulatory",
          name: "Speed Limit",
          meaning: "Maximum legal speed on that stretch of road.",
          image: "/signs/speed-limit-80.png",
          quiz: [
            {
              question: "A speed limit sign indicates:",
              options: ["Recommended speed", "Maximum legal speed", "Minimum speed", "Average speed"],
              answer: "Maximum legal speed"
            }
          ]
        }
      ];
      
      console.log("Loaded test signs:", testSigns.length);
      setSigns(testSigns);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading road signs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Ontario Road Signs Training
      </h1>
      
      <div className="text-center mb-6">
        <p className="text-lg text-gray-600">
          Loaded {signs.length} road signs successfully!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {signs.map((sign) => (
          <div
            key={sign.id}
            className="rounded-xl shadow-md bg-white p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
          >
            <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-gray-400 text-sm">{sign.name}</span>
            </div>
            
            <h2 className="text-xl font-semibold text-center mb-2">{sign.name}</h2>
            <p className="text-gray-600 text-sm text-center mb-4 line-clamp-3">{sign.meaning}</p>
            
            <div className="text-xs text-gray-500">
              {sign.category} • {sign.quiz?.length || 0} questions
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


