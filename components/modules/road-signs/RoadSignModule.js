'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle, XCircle, Play, BookOpen } from 'lucide-react';

const RoadSignModule = ({ studentId }) => {
  const [mode, setMode] = useState('study'); // 'study' or 'quiz'
  const [currentSignIndex, setCurrentSignIndex] = useState(0);
  const [quizResults, setQuizResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  // Sample road signs data - in production, this would come from the database
  const roadSigns = [
    {
      id: 'stop-sign',
      name: 'Stop Sign',
      description: 'Red octagonal sign with white border and text',
      meaning: 'Come to a complete stop at the line, crosswalk, or before entering the intersection. Yield to all traffic and pedestrians before proceeding.',
      category: 'regulatory',
      importance: 'critical',
      image: '/signs/stop-sign.png',
      questions: [
        {
          question: "What must you do when you see a stop sign?",
          options: [
            "Slow down and proceed if clear",
            "Come to a complete stop",
            "Yield to traffic",
            "Continue at reduced speed"
          ],
          correct: 1,
          explanation: "A stop sign requires a complete stop at the line, crosswalk, or before entering the intersection."
        }
      ]
    },
    {
      id: 'yield-sign',
      name: 'Yield Sign',
      description: 'Red and white triangular sign',
      meaning: 'Slow down and be prepared to stop. Yield right-of-way to traffic and pedestrians. Proceed only when safe.',
      category: 'regulatory',
      importance: 'critical',
      image: '/signs/yield-sign.png',
      questions: [
        {
          question: "What does a yield sign mean?",
          options: [
            "Stop completely",
            "Slow down and yield right-of-way",
            "Speed up to merge",
            "Continue without stopping"
          ],
          correct: 1,
          explanation: "A yield sign means slow down and be prepared to stop, yielding right-of-way to other traffic."
        }
      ]
    },
    {
      id: 'no-parking',
      name: 'No Parking',
      description: 'White square sign with red circle and diagonal line over letter P',
      meaning: 'Parking is prohibited in this area. Vehicles may not be left unattended.',
      category: 'regulatory',
      importance: 'high',
      image: '/signs/no-parking.png',
      questions: [
        {
          question: "What does a no parking sign mean?",
          options: [
            "You can park for 5 minutes",
            "Parking is prohibited",
            "You can park after hours",
            "Emergency parking only"
          ],
          correct: 1,
          explanation: "No parking signs indicate that parking is completely prohibited in the designated area."
        }
      ]
    }
  ];

  const currentSign = roadSigns[currentSignIndex];
  const currentQuestion = currentSign?.questions?.[0];

  const nextSign = () => {
    if (currentSignIndex < roadSigns.length - 1) {
      setCurrentSignIndex(currentSignIndex + 1);
      setShowResult(false);
      setSelectedAnswer(null);
    }
  };

  const prevSign = () => {
    if (currentSignIndex > 0) {
      setCurrentSignIndex(currentSignIndex - 1);
      setShowResult(false);
      setSelectedAnswer(null);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correct;
    const result = {
      signId: currentSign.id,
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer: currentQuestion.correct,
      isCorrect,
      explanation: currentQuestion.explanation
    };
    
    setQuizResults([...quizResults, result]);
    setShowResult(true);
    
    if (isCorrect) {
      setQuizScore(quizScore + 1);
    }
    
    // Auto-advance after showing result
    setTimeout(() => {
      if (currentSignIndex < roadSigns.length - 1) {
        nextSign();
      } else {
        setIsQuizComplete(true);
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setQuizResults([]);
    setQuizScore(0);
    setCurrentSignIndex(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsQuizComplete(false);
  };

  const saveProgress = async () => {
    // Save quiz results to database
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId,
          module: 'road-signs',
          results: quizResults,
          score: quizScore,
          totalQuestions: roadSigns.length
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
    if (isQuizComplete) {
      saveProgress();
    }
  }, [isQuizComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Road Signs Training</h1>
              <p className="text-gray-600">Master traffic signs for safe driving</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setMode('study')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  mode === 'study' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <BookOpen size={20} />
                Study Mode
              </button>
              <button
                onClick={() => setMode('quiz')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  mode === 'quiz' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Play size={20} />
                Quiz Mode
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {mode === 'study' ? (
              /* Study Mode */
              <motion.div
                key={currentSignIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="text-center mb-8">
                  <div className="w-64 h-64 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                    <div className="text-center">
                      <div className="text-8xl mb-4">🚦</div>
                      <p className="text-gray-500">Road Sign Image</p>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentSign.name}</h2>
                  <div className="flex justify-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      currentSign.category === 'regulatory' ? 'bg-red-100 text-red-800' :
                      currentSign.category === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {currentSign.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      currentSign.importance === 'critical' ? 'bg-red-100 text-red-800' :
                      currentSign.importance === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {currentSign.importance}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700">{currentSign.description}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Meaning & Action Required</h3>
                    <p className="text-gray-700">{currentSign.meaning}</p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={prevSign}
                    disabled={currentSignIndex === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowLeft size={20} />
                    Previous
                  </button>
                  <span className="flex items-center text-gray-600">
                    {currentSignIndex + 1} of {roadSigns.length}
                  </span>
                  <button
                    onClick={nextSign}
                    disabled={currentSignIndex === roadSigns.length - 1}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Quiz Mode */
              <motion.div
                key={`quiz-${currentSignIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                {!isQuizComplete ? (
                  <>
                    <div className="text-center mb-8">
                      <div className="w-48 h-48 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                        <div className="text-center">
                          <div className="text-6xl mb-2">🚦</div>
                          <p className="text-gray-500">Sign Image</p>
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentSign.name}</h2>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {currentQuestion.question}
                      </h3>
                      
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showResult}
                            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                              selectedAnswer === index
                                ? showResult
                                  ? index === currentQuestion.correct
                                    ? 'border-green-500 bg-green-50 text-green-800'
                                    : 'border-red-500 bg-red-50 text-red-800'
                                  : 'border-blue-500 bg-blue-50'
                                : showResult && index === currentQuestion.correct
                                ? 'border-green-500 bg-green-50 text-green-800'
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
                    </div>

                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50 rounded-lg p-6 mb-6"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          {selectedAnswer === currentQuestion.correct ? (
                            <CheckCircle className="text-green-600" size={24} />
                          ) : (
                            <XCircle className="text-red-600" size={24} />
                          )}
                          <h4 className="text-lg font-semibold">
                            {selectedAnswer === currentQuestion.correct ? 'Correct!' : 'Incorrect'}
                          </h4>
                        </div>
                        <p className="text-gray-700">{currentQuestion.explanation}</p>
                      </motion.div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Question {currentSignIndex + 1} of {roadSigns.length}
                      </span>
                      {!showResult && (
                        <button
                          onClick={submitAnswer}
                          disabled={selectedAnswer === null}
                          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Submit Answer
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  /* Quiz Complete */
                  <div className="text-center">
                    <div className="text-6xl mb-6">🎉</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
                    <div className="bg-green-50 rounded-lg p-6 mb-6">
                      <h3 className="text-xl font-semibold text-green-800 mb-2">Your Score</h3>
                      <div className="text-4xl font-bold text-green-600">
                        {quizScore}/{roadSigns.length}
                      </div>
                      <p className="text-green-700">
                        {Math.round((quizScore / roadSigns.length) * 100)}% Correct
                      </p>
                    </div>
                    <button
                      onClick={resetQuiz}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                    >
                      <RotateCcw size={20} />
                      Try Again
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Signs Studied:</span>
                  <span className="font-semibold">{currentSignIndex + 1}/{roadSigns.length}</span>
                </div>
                {mode === 'quiz' && (
                  <>
                    <div className="flex justify-between">
                      <span>Quiz Score:</span>
                      <span className="font-semibold">{quizScore}/{roadSigns.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Percentage:</span>
                      <span className="font-semibold">
                        {roadSigns.length > 0 ? Math.round((quizScore / roadSigns.length) * 100) : 0}%
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sign List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">All Signs</h3>
              <div className="space-y-2">
                {roadSigns.map((sign, index) => (
                  <button
                    key={sign.id}
                    onClick={() => setCurrentSignIndex(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      index === currentSignIndex
                        ? 'bg-blue-100 text-blue-800'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-sm">🚦</span>
                      </div>
                      <div>
                        <div className="font-medium">{sign.name}</div>
                        <div className="text-sm text-gray-500 capitalize">{sign.category}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadSignModule;
