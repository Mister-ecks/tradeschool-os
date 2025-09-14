'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize, 
  Smartphone,
  Eye,
  Hand
} from 'lucide-react';

const VRARTraining = ({ studentId }) => {
  const [mode, setMode] = useState('vr'); // 'vr' or 'ar'
  const [currentScene, setCurrentScene] = useState(0);
  const [isVRMode, setIsVRMode] = useState(false);
  const [arMarkerDetected, setArMarkerDetected] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const vrContainerRef = useRef(null);

  // Sample VR/AR training scenarios
  const trainingScenarios = [
    {
      id: 'laptop-motherboard',
      title: 'Laptop Motherboard Assembly',
      description: 'Learn to identify and work with laptop motherboard components in 3D space',
      type: 'vr',
      arMarker: 'laptop-motherboard',
      components: [
        { id: 'cpu', name: 'CPU Socket', position: [0, 0, 0], highlighted: false },
        { id: 'ram1', name: 'RAM Slot 1', position: [-1, 0, 0], highlighted: false },
        { id: 'ram2', name: 'RAM Slot 2', position: [1, 0, 0], highlighted: false },
        { id: 'gpu', name: 'Graphics Card', position: [0, -1, 0], highlighted: false },
        { id: 'storage', name: 'Storage Connector', position: [0, 1, 0], highlighted: false }
      ],
      instructions: [
        'Click on the CPU socket to learn about processor installation',
        'Hover over RAM slots to understand memory configuration',
        'Explore the graphics card area for expansion options',
        'Identify storage connectors for hard drives and SSDs'
      ]
    },
    {
      id: 'phone-disassembly',
      title: 'Smartphone Disassembly',
      description: 'Practice disassembling a smartphone in virtual reality',
      type: 'vr',
      arMarker: 'phone-disassembly',
      components: [
        { id: 'screen', name: 'Display Assembly', position: [0, 0, 0.5], highlighted: false },
        { id: 'battery', name: 'Battery', position: [0, 0, -0.5], highlighted: false },
        { id: 'camera', name: 'Camera Module', position: [-0.5, 0, 0], highlighted: false },
        { id: 'speaker', name: 'Speaker', position: [0, 0.5, 0], highlighted: false },
        { id: 'charging', name: 'Charging Port', position: [0, -0.5, 0], highlighted: false }
      ],
      instructions: [
        'Remove the screen assembly first',
        'Disconnect the battery connector carefully',
        'Remove the camera module',
        'Extract the speaker assembly',
        'Remove the charging port'
      ]
    },
    {
      id: 'tool-recognition',
      title: 'Tool Recognition AR',
      description: 'Use AR to identify tools and their proper usage',
      type: 'ar',
      arMarker: 'tool-kit',
      tools: [
        { id: 'screwdriver', name: 'Phillips Screwdriver', usage: 'For Phillips head screws' },
        { id: 'tweezers', name: 'Precision Tweezers', usage: 'For handling small components' },
        { id: 'spudger', name: 'Plastic Spudger', usage: 'For prying without damage' },
        { id: 'suction', name: 'Suction Cups', usage: 'For removing screens' }
      ],
      instructions: [
        'Point your camera at the tool marker',
        'Tap on highlighted tools to learn about them',
        'Follow the usage instructions',
        'Practice identifying tools by name'
      ]
    }
  ];

  const currentScenario = trainingScenarios[currentScene];

  // Initialize A-Frame scene
  useEffect(() => {
    if (vrContainerRef.current && mode === 'vr') {
      // A-Frame VR scene setup
      const sceneHTML = `
        <a-scene embedded vr-mode-ui="enabled: false">
          <a-assets>
            <a-mixin id="highlight" color="#00ff00" opacity="0.8"></a-mixin>
            <a-mixin id="component" color="#ffffff" opacity="0.7"></a-mixin>
          </a-assets>
          
          <!-- Lighting -->
          <a-light type="ambient" color="#404040"></a-light>
          <a-light type="directional" position="0 1 0" intensity="0.5"></a-light>
          
          <!-- Components -->
          ${currentScenario.components.map((component, index) => `
            <a-box 
              id="${component.id}"
              position="${component.position.join(' ')}"
              mixin="component"
              width="0.5"
              height="0.1"
              depth="0.5"
              data-name="${component.name}"
              animation="property: rotation; to: 0 360 0; loop: true; dur: 10000"
            >
              <a-text 
                value="${component.name}"
                position="0 0.5 0"
                align="center"
                color="#000000"
                width="4"
              ></a-text>
            </a-box>
          `).join('')}
          
          <!-- Camera -->
          <a-entity id="camera" position="0 1.6 3">
            <a-camera look-controls wasd-controls></a-camera>
            <a-cursor raycaster="objects: [data-clickable]"></a-cursor>
          </a-entity>
          
          <!-- Instructions Panel -->
          <a-entity id="instructions" position="0 2 2">
            <a-plane 
              width="4" 
              height="2" 
              color="#000000" 
              opacity="0.7"
            ></a-plane>
            <a-text 
              value="Click on components to learn about them"
              position="0 0.5 0.01"
              align="center"
              color="#ffffff"
              width="6"
            ></a-text>
            <a-text 
              value="Use WASD to move, mouse to look around"
              position="0 -0.5 0.01"
              align="center"
              color="#ffffff"
              width="6"
            ></a-text>
          </a-entity>
        </a-scene>
      `;
      
      vrContainerRef.current.innerHTML = sceneHTML;
    }
  }, [mode, currentScene, currentScenario]);

  // AR.js setup for AR mode
  useEffect(() => {
    if (mode === 'ar') {
      const arScript = document.createElement('script');
      arScript.src = 'https://cdn.jsdelivr.net/gh/aframevr/aframe@1c2407b26c61958baa93967b5412487cd94b290b/dist/aframe-master.min.js';
      arScript.onload = () => {
        const arjsScript = document.createElement('script');
        arjsScript.src = 'https://cdn.jsdelivr.net/gh/jeromeetienne/AR.js@1.5.8/aframe/build/aframe-ar.min.js';
        document.head.appendChild(arjsScript);
      };
      document.head.appendChild(arScript);
    }
  }, [mode]);

  const handleComponentClick = (componentId) => {
    setInteractionCount(prev => prev + 1);
    
    // Highlight the clicked component
    const updatedComponents = currentScenario.components.map(comp => ({
      ...comp,
      highlighted: comp.id === componentId
    }));
    
    // In a real implementation, this would update the 3D scene
    console.log(`Clicked on ${componentId}`);
  };

  const enterVRMode = () => {
    setIsVRMode(true);
    if (vrContainerRef.current) {
      const scene = vrContainerRef.current.querySelector('a-scene');
      if (scene) {
        scene.enterVR();
      }
    }
  };

  const exitVRMode = () => {
    setIsVRMode(false);
    if (vrContainerRef.current) {
      const scene = vrContainerRef.current.querySelector('a-scene');
      if (scene) {
        scene.exitVR();
      }
    }
  };

  const saveProgress = async () => {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId,
          module: 'vr-ar-training',
          currentScene,
          mode,
          interactionCount,
          timestamp: new Date().toISOString()
        }),
      });
      
      if (response.ok) {
        console.log('VR/AR progress saved successfully');
      }
    } catch (error) {
      console.error('Error saving VR/AR progress:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">VR/AR Training</h1>
              <p className="text-gray-600">Immersive 3D and augmented reality learning experiences</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setMode('vr')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  mode === 'vr' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Eye size={20} />
                VR Mode
              </button>
              <button
                onClick={() => setMode('ar')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  mode === 'ar' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Smartphone size={20} />
                AR Mode
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main VR/AR Container */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{currentScenario.title}</h2>
                <div className="flex gap-2">
                  {mode === 'vr' && (
                    <>
                      {!isVRMode ? (
                        <button
                          onClick={enterVRMode}
                          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          <Play size={20} />
                          Enter VR
                        </button>
                      ) : (
                        <button
                          onClick={exitVRMode}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Pause size={20} />
                          Exit VR
                        </button>
                      )}
                    </>
                  )}
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <Maximize size={20} />
                    Fullscreen
                  </button>
                </div>
              </div>

              {/* VR/AR Scene Container */}
              <div 
                ref={vrContainerRef}
                className={`w-full ${mode === 'vr' ? 'h-96' : 'h-80'} bg-gray-900 rounded-lg overflow-hidden`}
                style={{ position: 'relative' }}
              >
                {mode === 'ar' ? (
                  <div className="relative w-full h-full">
                    {/* AR.js Scene */}
                    <a-scene 
                      embedded 
                      arjs="sourceType: webcam; debugUIEnabled: false;"
                      vr-mode-ui="enabled: false"
                    >
                      <a-marker preset="hiro">
                        <a-entity position="0 0 0">
                          {/* AR content for tool recognition */}
                          {currentScenario.tools?.map((tool, index) => (
                            <a-box
                              key={tool.id}
                              position={`${index * 0.5 - 1} 0 0`}
                              color="#4CAF50"
                              width="0.3"
                              height="0.3"
                              depth="0.3"
                              data-name={tool.name}
                            >
                              <a-text 
                                value={tool.name}
                                position="0 0.5 0"
                                align="center"
                                color="#000000"
                                width="3"
                              ></a-text>
                            </a-box>
                          ))}
                        </a-entity>
                      </a-marker>
                      
                      <a-entity camera></a-entity>
                    </a-scene>
                    
                    {/* AR Instructions Overlay */}
                    <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white p-4 rounded-lg">
                      <h3 className="font-bold mb-2">AR Instructions:</h3>
                      <ul className="text-sm space-y-1">
                        <li>• Print the AR marker</li>
                        <li>• Point camera at marker</li>
                        <li>• Tap on highlighted tools</li>
                        <li>• Learn tool usage</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Eye size={64} className="mx-auto mb-4 opacity-50" />
                      <p className="text-lg">VR Scene Loading...</p>
                      <p className="text-sm opacity-75 mt-2">
                        Click "Enter VR" to start immersive training
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Instructions:</h3>
                <ul className="space-y-2">
                  {currentScenario.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mode Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Training Mode</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {mode === 'vr' ? (
                    <Eye className="text-purple-600" size={24} />
                  ) : (
                    <Smartphone className="text-green-600" size={24} />
                  )}
                  <div>
                    <div className="font-medium capitalize">{mode} Mode</div>
                    <div className="text-sm text-gray-500">
                      {mode === 'vr' ? 'Immersive 3D experience' : 'Camera-based AR overlay'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interaction Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Interactions:</span>
                  <span className="font-semibold">{interactionCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Scene:</span>
                  <span className="font-semibold">{currentScene + 1}/{trainingScenarios.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mode:</span>
                  <span className="font-semibold capitalize">{mode}</span>
                </div>
              </div>
            </div>

            {/* Scenarios List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Training Scenarios</h3>
              <div className="space-y-2">
                {trainingScenarios.map((scenario, index) => (
                  <button
                    key={scenario.id}
                    onClick={() => setCurrentScene(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      index === currentScene
                        ? 'bg-blue-100 text-blue-800'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">{scenario.title}</div>
                    <div className="text-sm text-gray-500">{scenario.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* AR Marker Download */}
            {mode === 'ar' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">AR Marker</h3>
                <div className="text-center">
                  <div className="w-32 h-32 bg-black mx-auto mb-4 rounded-lg flex items-center justify-center">
                    <div className="text-white text-xs text-center">
                      AR Marker<br />
                      {currentScenario.arMarker}
                    </div>
                  </div>
                  <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Download Marker
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Print this marker for AR training
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VRARTraining;
