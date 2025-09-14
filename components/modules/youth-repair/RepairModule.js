'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Pause, 
  Upload, 
  CheckCircle, 
  Camera,
  Wrench,
  Smartphone,
  Laptop
} from 'lucide-react';

const RepairModule = ({ studentId, repairType = 'phone' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Sample repair lessons data
  const repairLessons = {
    phone: [
      {
        id: 'phone-screen-replacement',
        title: 'iPhone Screen Replacement',
        description: 'Learn how to safely replace a cracked iPhone screen',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        steps: [
          {
            title: 'Remove Screws',
            description: 'Remove the two pentalobe screws at the bottom of the phone',
            instructions: [
              'Turn off the iPhone completely',
              'Use a pentalobe screwdriver to remove the two screws',
              'Place screws in a magnetic mat to avoid losing them'
            ],
            tools: ['Pentalobe screwdriver', 'Magnetic mat'],
            safetyNotes: 'Ensure the phone is completely powered off before starting',
            quiz: {
              question: 'Why is it important to turn off the phone before removing screws?',
              options: [
                'To save battery',
                'To prevent electrical shock and damage',
                'To make screws easier to remove',
                'To clean the phone first'
              ],
              correct: 1,
              explanation: 'Turning off the phone prevents electrical shock and protects internal components from damage.'
            }
          },
          {
            title: 'Remove Screen Assembly',
            description: 'Carefully remove the screen assembly using suction cups',
            instructions: [
              'Apply suction cups to the bottom of the screen',
              'Gently pull up while applying heat to loosen adhesive',
              'Work around the edges to release all adhesive'
            ],
            tools: ['Suction cups', 'Heat gun', 'Plastic opening picks'],
            safetyNotes: 'Apply heat evenly and avoid overheating any single area',
            quiz: {
              question: 'What is the purpose of applying heat when removing the screen?',
              options: [
                'To make the phone lighter',
                'To soften the adhesive holding the screen',
                'To clean the phone',
                'To test the heat resistance'
              ],
              correct: 1,
              explanation: 'Heat softens the adhesive that holds the screen in place, making it easier to remove without damage.'
            }
          },
          {
            title: 'Install New Screen',
            description: 'Install the new screen assembly and test functionality',
            instructions: [
              'Align the new screen with the phone body',
              'Press down firmly around the edges to secure adhesive',
              'Reinstall screws and test touch functionality'
            ],
            tools: ['New screen assembly', 'Screwdriver', 'Cleaning cloth'],
            safetyNotes: 'Test the screen thoroughly before final assembly',
            quiz: {
              question: 'What should you do before final assembly of the new screen?',
              options: [
                'Apply screen protector',
                'Test touch functionality and display',
                'Clean the old screen',
                'Remove all screws'
              ],
              correct: 1,
              explanation: 'Always test the new screen for proper touch response and display quality before final assembly.'
            }
          }
        ]
      }
    ],
    laptop: [
      {
        id: 'laptop-ram-upgrade',
        title: 'Laptop RAM Upgrade',
        description: 'Learn how to upgrade laptop memory for better performance',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        steps: [
          {
            title: 'Power Down and Remove Battery',
            description: 'Safely power down the laptop and remove the battery',
            instructions: [
              'Save all work and shut down the laptop completely',
              'Unplug the power adapter',
              'Remove the battery if it\'s removable',
              'Wait 30 seconds for capacitors to discharge'
            ],
            tools: ['Phillips screwdriver', 'Anti-static wrist strap'],
            safetyNotes: 'Always use an anti-static wrist strap to prevent ESD damage',
            quiz: {
              question: 'Why should you wait 30 seconds after removing the battery?',
              options: [
                'To let the laptop cool down',
                'To allow capacitors to discharge completely',
                'To save energy',
                'To clean the laptop'
              ],
              correct: 1,
              explanation: 'Waiting allows capacitors to discharge, preventing potential electrical shock or component damage.'
            }
          },
          {
            title: 'Access RAM Compartment',
            description: 'Remove the back panel to access RAM slots',
            instructions: [
              'Remove all screws from the bottom panel',
              'Use a plastic opening tool to release clips',
              'Lift the panel carefully to avoid damaging cables'
            ],
            tools: ['Phillips screwdriver', 'Plastic opening tools', 'Screw organizer'],
            safetyNotes: 'Be gentle with clips and cables - they can be easily damaged',
            quiz: {
              question: 'What should you use to organize removed screws?',
              options: [
                'A bowl',
                'A screw organizer or magnetic mat',
                'Your pocket',
                'The floor'
              ],
              correct: 1,
              explanation: 'A screw organizer or magnetic mat prevents losing screws and helps with reassembly.'
            }
          },
          {
            title: 'Install New RAM',
            description: 'Install the new RAM modules in the correct slots',
            instructions: [
              'Release clips on existing RAM modules',
              'Remove old RAM at a 45-degree angle',
              'Insert new RAM at 45-degree angle, then press down',
              'Ensure clips lock into place'
            ],
            tools: ['New RAM modules', 'Anti-static wrist strap'],
            safetyNotes: 'Handle RAM by the edges only - never touch the gold contacts',
            quiz: {
              question: 'How should you handle RAM modules?',
              options: [
                'By the gold contacts',
                'By the edges only',
                'With bare hands',
                'With metal tools'
              ],
              correct: 1,
              explanation: 'Always handle RAM by the edges to avoid damaging the sensitive gold contacts with oils from your skin.'
            }
          }
        ]
      }
    ]
  };

  const currentLesson = repairLessons[repairType]?.[0];
  const currentStepData = currentLesson?.steps[currentStep];

  const nextStep = () => {
    if (currentStep < currentLesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowQuiz(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowQuiz(false);
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedPhotos({
          ...uploadedPhotos,
          [currentStep]: e.target.result
        });
        
        // Simulate AI feedback (placeholder for future integration)
        setTimeout(() => {
          alert('AI Feedback: Great work! Your technique looks correct. Continue to the next step.');
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuizAnswer = (answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [currentStep]: answerIndex
    });
  };

  const submitQuizAnswer = () => {
    const isCorrect = quizAnswers[currentStep] === currentStepData.quiz.correct;
    if (isCorrect) {
      setQuizScore(quizScore + 1);
    }
    setShowQuiz(false);
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
          module: 'youth-repair',
          repairType,
          currentStep,
          uploadedPhotos,
          quizAnswers,
          score: quizScore
        }),
      });
      
      if (response.ok) {
        console.log('Progress saved successfully');
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  useEffect(() => {
    saveProgress();
  }, [currentStep, uploadedPhotos, quizAnswers]);

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <p className="text-gray-600">The requested repair lesson could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            {repairType === 'phone' ? (
              <Smartphone className="text-blue-600" size={32} />
            ) : (
              <Laptop className="text-green-600" size={32} />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{currentLesson.title}</h1>
              <p className="text-gray-600">{currentLesson.description}</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / currentLesson.steps.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Step {currentStep + 1} of {currentLesson.steps.length}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Instructional Video</h2>
              <div className="relative bg-black rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="315"
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>

            {/* Current Step */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {currentStep + 1}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{currentStepData.title}</h2>
              </div>
              
              <p className="text-gray-700 mb-6">{currentStepData.description}</p>

              {/* Instructions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Instructions:</h3>
                <ol className="space-y-2">
                  {currentStepData.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tools Required */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Tools Required:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentStepData.tools.map((tool, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Safety Notes */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Safety Notes:</h3>
                <p className="text-yellow-700">{currentStepData.safetyNotes}</p>
              </div>

              {/* Photo Upload */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Upload Your Work:</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {uploadedPhotos[currentStep] ? (
                    <div>
                      <img 
                        src={uploadedPhotos[currentStep]} 
                        alt="Uploaded work"
                        className="max-w-full h-48 object-contain mx-auto rounded-lg mb-4"
                      />
                      <p className="text-green-600 font-medium">Photo uploaded successfully!</p>
                    </div>
                  ) : (
                    <div>
                      <Camera className="mx-auto text-gray-400 mb-4" size={48} />
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-800 font-medium">
                          Click to upload photo of your work
                        </span>
                      </label>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Quiz Section */}
              {!showQuiz ? (
                <button
                  onClick={() => setShowQuiz(true)}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Take Quiz for This Step
                </button>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Quiz Question:</h3>
                  <p className="text-gray-700 mb-4">{currentStepData.quiz.question}</p>
                  
                  <div className="space-y-2 mb-6">
                    {currentStepData.quiz.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                          quizAnswers[currentStep] === index
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-semibold mr-3">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={submitQuizAnswer}
                    disabled={quizAnswers[currentStep] === undefined}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    Submit Answer
                  </button>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft size={20} />
                  Previous Step
                </button>
                
                <button
                  onClick={nextStep}
                  disabled={currentStep === currentLesson.steps.length - 1}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next Step
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Steps Completed:</span>
                  <span className="font-semibold">{currentStep}/{currentLesson.steps.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Photos Uploaded:</span>
                  <span className="font-semibold">{Object.keys(uploadedPhotos).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quiz Score:</span>
                  <span className="font-semibold">{quizScore}/{currentStep + 1}</span>
                </div>
              </div>
            </div>

            {/* Steps List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">All Steps</h3>
              <div className="space-y-2">
                {currentLesson.steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      index === currentStep
                        ? 'bg-blue-100 text-blue-800'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === currentStep
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{step.title}</div>
                        <div className="text-sm text-gray-500">{step.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tools Reference */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Tools for This Step</h3>
              <div className="space-y-2">
                {currentStepData.tools.map((tool, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Wrench size={16} className="text-gray-400" />
                    <span className="text-sm">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairModule;
