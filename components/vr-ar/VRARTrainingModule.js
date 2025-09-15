"use client";
import { useState, useEffect } from "react";
import { vrArModules } from "@/data/vr-ar-modules";
import BarcodeScanner from "@/components/modules/barcode-scanner/BarcodeScanner";

export default function VRARTrainingModule() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [scannerActive, setScannerActive] = useState(false);
  const [scannedTools, setScannedTools] = useState([]);
  const [currentScene, setCurrentScene] = useState(null);
  const [quizMode, setQuizMode] = useState(false);

  // Sample quiz questions for each module
  const moduleQuizzes = {
    "laptop-repair": [
      {
        question: "What is the first step when disassembling a laptop?",
        options: ["Remove the battery", "Disconnect power", "Remove screws", "Ground yourself"],
        correctAnswer: "Ground yourself"
      },
      {
        question: "Which tool is used to pry apart laptop components?",
        options: ["Screwdriver", "Spudger", "Pliers", "Knife"],
        correctAnswer: "Spudger"
      },
      {
        question: "What is the purpose of thermal paste?",
        options: ["Adhesive", "Heat transfer", "Insulation", "Protection"],
        correctAnswer: "Heat transfer"
      }
    ],
    "phone-repair": [
      {
        question: "What type of screwdriver is needed for iPhone repairs?",
        options: ["Phillips", "Flathead", "Pentalobe", "Torx"],
        correctAnswer: "Pentalobe"
      },
      {
        question: "What is the purpose of a suction cup in phone repair?",
        options: ["Cleaning", "Lifting screen", "Holding parts", "Measuring"],
        correctAnswer: "Lifting screen"
      },
      {
        question: "What temperature should a heat gun be set to for phone repair?",
        options: ["Low", "Medium", "High", "Maximum"],
        correctAnswer: "Low"
      }
    ],
    "fiber-splicing": [
      {
        question: "What is the purpose of a fiber cleaver?",
        options: ["Cutting cable", "Creating clean ends", "Stripping coating", "Testing signal"],
        correctAnswer: "Creating clean ends"
      },
      {
        question: "What is the maximum loss allowed for a fusion splice?",
        options: ["0.1 dB", "0.3 dB", "0.5 dB", "1.0 dB"],
        correctAnswer: "0.3 dB"
      },
      {
        question: "What does OTDR stand for?",
        options: ["Optical Time Domain Reflectometer", "Optical Test Data Recorder", "Optical Transmission Data Reader", "Optical Time Delay Recorder"],
        correctAnswer: "Optical Time Domain Reflectometer"
      }
    ],
    "otdr-training": [
      {
        question: "What is the purpose of a launch cable in OTDR testing?",
        options: ["Power supply", "Reference measurement", "Signal amplification", "Data storage"],
        correctAnswer: "Reference measurement"
      },
      {
        question: "What does a spike in an OTDR trace typically indicate?",
        options: ["Fiber break", "Connector", "Bend", "Splice"],
        correctAnswer: "Connector"
      },
      {
        question: "What is the typical wavelength used for OTDR testing?",
        options: ["850 nm", "1310 nm", "1550 nm", "All of the above"],
        correctAnswer: "All of the above"
      }
    ]
  };

  const handleBarcodeScanned = (barcode) => {
    if (selectedModule) {
      const tool = selectedModule.tools.find(t => t.barcode === barcode);
      if (tool) {
        setScannedTools(prev => [...prev, tool]);
        setSelectedTool(tool);
      }
    }
  };

  const handleToolSelected = (tool) => {
    setSelectedTool(tool);
    setScannerActive(false);
  };

  const handleStartVRScene = (scene) => {
    setCurrentScene(scene);
    // In a real implementation, this would launch the VR/AR experience
    alert(`Starting VR scene: ${scene.title}`);
  };

  const handleQuizComplete = (results) => {
    setQuizMode(false);
    alert(`Quiz completed! Score: ${results.percentage}%`);
  };

  if (quizMode && selectedModule) {
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
          questions={moduleQuizzes[selectedModule.id] || []}
          onComplete={handleQuizComplete}
          passingScore={80}
        />
      </div>
    );
  }

  if (scannerActive) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => setScannerActive(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Back to Module
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Tool Scanner</h2>
          <p className="text-gray-600 mb-6">
            Scan the barcode or QR code on your tool to identify it
          </p>
          
          <BarcodeScanner onBarcodeScanned={handleBarcodeScanned} />
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Scanned Tools:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scannedTools.map((tool, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium">{tool.name}</h4>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedModule) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => setSelectedModule(null)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Back to Modules
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4">{selectedModule.title}</h1>
          <p className="text-gray-600 mb-6">{selectedModule.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tools Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Required Tools</h2>
              <div className="space-y-4">
                {selectedModule.tools.map((tool) => (
                  <div key={tool.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                       onClick={() => handleToolSelected(tool)}>
                    <div className="flex items-center space-x-4">
                      <img
                        src={tool.image}
                        alt={tool.name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.src = '/images/tool-placeholder.jpg';
                        }}
                      />
                      <div>
                        <h3 className="font-medium">{tool.name}</h3>
                        <p className="text-sm text-gray-600">{tool.description}</p>
                        <p className="text-xs text-blue-600">Barcode: {tool.barcode}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setScannerActive(true)}
                className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Scan Tool Barcode
              </button>
            </div>
            
            {/* VR Scenes Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">VR Training Scenes</h2>
              <div className="space-y-4">
                {selectedModule.vrScenes.map((scene) => (
                  <div key={scene.id} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">{scene.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{scene.description}</p>
                    <p className="text-xs text-gray-500 mb-3">Duration: {scene.duration}</p>
                    
                    <div className="mb-3">
                      <h4 className="text-sm font-medium mb-1">Objectives:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {scene.objectives.map((objective, index) => (
                          <li key={index}>• {objective}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <button
                      onClick={() => handleStartVRScene(scene)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Start VR Scene
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setQuizMode(true)}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Take Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">VR/AR Training Modules</h1>
      <p className="text-gray-600 mb-8">{vrArModules.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vrArModules.modules.map((module) => (
          <div key={module.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{module.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                module.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                module.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {module.difficulty}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{module.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Duration:</span>
                <span className="font-medium">{module.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Category:</span>
                <span className="font-medium">{module.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tools:</span>
                <span className="font-medium">{module.tools.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>VR Scenes:</span>
                <span className="font-medium">{module.vrScenes.length}</span>
              </div>
            </div>
            
            <button
              onClick={() => setSelectedModule(module)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start Module
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

