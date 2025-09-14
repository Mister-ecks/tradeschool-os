'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Wrench, 
  Eye, 
  QrCode,
  ArrowRight,
  Users,
  Award,
  Clock
} from 'lucide-react';

const ModuleSelector = ({ studentId }) => {
  const [selectedModule, setSelectedModule] = useState(null);

  const modules = [
    {
      id: 'road-signs',
      title: 'Road Signs Training',
      description: 'Master traffic signs for safe driving with interactive study and quiz modes',
      icon: BookOpen,
      color: 'blue',
      features: [
        '50+ Road signs with detailed explanations',
        'Study mode for learning',
        'Interactive quiz mode',
        'Progress tracking',
        'CDL-specific focus'
      ],
      duration: '2-3 hours',
      difficulty: 'Beginner',
      studentsCount: 1250,
      component: 'RoadSignModule'
    },
    {
      id: 'youth-repair',
      title: 'Youth Repair Skills',
      description: 'Learn phone and laptop repair with step-by-step video tutorials and hands-on practice',
      icon: Wrench,
      color: 'orange',
      features: [
        'Step-by-step video tutorials',
        'Interactive quizzes after each step',
        'Photo upload for AI feedback',
        'Tool identification',
        'Safety protocols'
      ],
      duration: '4-6 hours',
      difficulty: 'Intermediate',
      studentsCount: 890,
      repairTypes: ['phone', 'laptop'],
      component: 'RepairModule'
    },
    {
      id: 'vr-ar',
      title: 'VR & AR Training',
      description: 'Immersive 3D and augmented reality experiences for hands-on learning',
      icon: Eye,
      color: 'purple',
      features: [
        'Virtual reality simulations',
        'Augmented reality overlays',
        '3D component interaction',
        'Marker-based AR training',
        'Immersive learning experiences'
      ],
      duration: '3-5 hours',
      difficulty: 'Advanced',
      studentsCount: 450,
      component: 'VRARTraining'
    },
    {
      id: 'barcode-scanner',
      title: 'Tool Recognition Scanner',
      description: 'Scan barcodes and QR codes to identify tools and learn proper usage',
      icon: QrCode,
      color: 'green',
      features: [
        'Barcode and QR code scanning',
        'Comprehensive tool database',
        'Usage instructions',
        'Safety guidelines',
        'Scan history tracking'
      ],
      duration: '1-2 hours',
      difficulty: 'Beginner',
      studentsCount: 2100,
      component: 'BarcodeScanner'
    }
  ];

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
  };

  const startModule = () => {
    if (selectedModule) {
      // In a real implementation, this would navigate to the module
      console.log(`Starting ${selectedModule.title} for student ${studentId}`);
      
      // For demo purposes, show an alert
      alert(`Starting ${selectedModule.title} module!\n\nThis would normally redirect to the training interface.`);
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-600',
        hover: 'hover:bg-blue-700',
        light: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200'
      },
      orange: {
        bg: 'bg-orange-600',
        hover: 'hover:bg-orange-700',
        light: 'bg-orange-50',
        text: 'text-orange-600',
        border: 'border-orange-200'
      },
      purple: {
        bg: 'bg-purple-600',
        hover: 'hover:bg-purple-700',
        light: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-200'
      },
      green: {
        bg: 'bg-green-600',
        hover: 'hover:bg-green-700',
        light: 'bg-green-50',
        text: 'text-green-600',
        border: 'border-green-200'
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TradeSchool OS Learning Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master essential skills through interactive modules, VR/AR experiences, and hands-on practice
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {modules.map((module, index) => {
            const colors = getColorClasses(module.color);
            const Icon = module.icon;
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  selectedModule?.id === module.id ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                }`}
                onClick={() => handleModuleSelect(module)}
              >
                <div className={`${colors.bg} p-6 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <Icon size={32} />
                    <div>
                      <h2 className="text-2xl font-bold">{module.title}</h2>
                      <p className="text-blue-100">{module.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-blue-100">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span className="text-sm">{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={16} />
                      <span className="text-sm">{module.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span className="text-sm">{module.studentsCount} students</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
                  <ul className="space-y-2 mb-6">
                    {module.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className={`w-2 h-2 ${colors.bg} rounded-full mt-2 flex-shrink-0`}></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 px-4 ${colors.bg} ${colors.hover} text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModuleSelect(module);
                    }}
                  >
                    Select Module
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Module Details */}
        {selectedModule && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-start gap-6">
              <div className={`w-16 h-16 ${getColorClasses(selectedModule.color).light} rounded-xl flex items-center justify-center`}>
                <selectedModule.icon 
                  size={32} 
                  className={getColorClasses(selectedModule.color).text} 
                />
              </div>
              
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedModule.title}
                </h2>
                <p className="text-gray-600 mb-6">{selectedModule.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedModule.duration}</div>
                    <div className="text-sm text-gray-500">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedModule.difficulty}</div>
                    <div className="text-sm text-gray-500">Difficulty Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedModule.studentsCount}</div>
                    <div className="text-sm text-gray-500">Students Enrolled</div>
                  </div>
                </div>

                {/* Special Options for Youth Repair Module */}
                {selectedModule.id === 'youth-repair' && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Choose Repair Type:</h3>
                    <div className="flex gap-4">
                      {selectedModule.repairTypes.map((type) => (
                        <button
                          key={type}
                          className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                            getColorClasses(selectedModule.color).border
                          } ${getColorClasses(selectedModule.color).text} hover:${
                            getColorClasses(selectedModule.color).bg
                          } hover:text-white`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)} Repair
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={startModule}
                    className={`flex items-center gap-2 px-8 py-4 ${getColorClasses(selectedModule.color).bg} ${getColorClasses(selectedModule.color).hover} text-white rounded-lg font-medium transition-colors`}
                  >
                    Start Learning
                    <ArrowRight size={20} />
                  </button>
                  
                  <button
                    onClick={() => setSelectedModule(null)}
                    className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back to Modules
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Platform Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
            <div className="text-gray-600">Learning Modules</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">4,690</div>
            <div className="text-gray-600">Total Students</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-gray-600">Completion Rate</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">4.8</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleSelector;
