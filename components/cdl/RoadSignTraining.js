'use client';

import { useState, useEffect } from 'react';
import { roadSigns, generateSignQuestions, getAllSigns, getSignsByCategory, getCDLSpecificSigns, getCriticalSigns } from '@/data/cdl-road-signs';
import LiveShare from './LiveShare';

export default function RoadSignTraining() {
  const [currentSign, setCurrentSign] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [trainingMode, setTrainingMode] = useState('learn'); // learn, quiz, practice
  const [filter, setFilter] = useState('all'); // all, regulatory, warning, mandatory, critical, cdl-specific
  const [difficulty, setDifficulty] = useState('medium');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizActive, setQuizActive] = useState(false);

  const getFilteredSigns = () => {
    switch (filter) {
      case 'regulatory':
        return getSignsByCategory('regulatory');
      case 'warning':
        return getSignsByCategory('warning');
      case 'mandatory':
        return getSignsByCategory('mandatory');
      case 'critical':
        return getCriticalSigns();
      case 'cdl-specific':
        return getCDLSpecificSigns();
      default:
        return getAllSigns();
    }
  };

  const startQuiz = () => {
    const signs = getFilteredSigns();
    if (signs.length === 0) return;
    
    setTrainingMode('quiz');
    setQuizActive(true);
    setScore(0);
    setQuestionIndex(0);
    setTimeRemaining(300); // 5 minutes for quiz
    
    // Generate questions for random signs
    const quizSigns = signs.sort(() => 0.5 - Math.random()).slice(0, 10);
    const allQuestions = quizSigns.flatMap(sign => 
      generateSignQuestions(sign.id, difficulty).map(q => ({ ...q, sign }))
    );
    
    if (allQuestions.length > 0) {
      setCurrentQuestion(allQuestions[0]);
    }
  };

  const startPractice = () => {
    const signs = getFilteredSigns();
    if (signs.length === 0) return;
    
    setTrainingMode('practice');
    setQuizActive(false);
    const randomSign = signs[Math.floor(Math.random() * signs.length)];
    setCurrentSign(randomSign);
    setCurrentQuestion(null);
  };

  const selectSign = (sign) => {
    setCurrentSign(sign);
    setTrainingMode('learn');
    setCurrentQuestion(null);
  };

  const startSignQuiz = (sign) => {
    const questions = generateSignQuestions(sign.id, difficulty);
    if (questions.length > 0) {
      setCurrentQuestion(questions[0]);
      setCurrentSign(sign);
      setQuestionIndex(0);
      setTrainingMode('quiz');
      setQuizActive(true);
      setScore(0);
      setTimeRemaining(120); // 2 minutes for single sign quiz
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correct;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    if (currentSign) {
      const questions = generateSignQuestions(currentSign.id, difficulty);
      if (questionIndex + 1 < questions.length) {
        setQuestionIndex(prev => prev + 1);
        setCurrentQuestion(questions[questionIndex + 1]);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz completed
        setQuizActive(false);
        setCurrentQuestion(null);
      }
    }
  };

  const resetTraining = () => {
    setCurrentSign(null);
    setCurrentQuestion(null);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTrainingMode('learn');
    setQuizActive(false);
    setTimeRemaining(0);
  };

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (quizActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (timeRemaining === 0 && quizActive) {
      setQuizActive(false);
    }
    return () => clearInterval(interval);
  }, [quizActive, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = () => {
    const percentage = (score / (questionIndex + 1)) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CDL Road Sign Training
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Master road sign recognition for commercial driver licensing
          </p>
          
          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Signs</option>
              <option value="regulatory">Regulatory Signs</option>
              <option value="warning">Warning Signs</option>
              <option value="mandatory">Mandatory Signs</option>
              <option value="critical">Critical Signs</option>
              <option value="cdl-specific">CDL Specific</option>
            </select>
            
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            
            <button
              onClick={startPractice}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Practice Mode
            </button>
            
            <button
              onClick={startQuiz}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Start Quiz
            </button>
            
            {quizActive && (
              <button
                onClick={resetTraining}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          {/* Quiz Status */}
          {quizActive && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">
                  Question {questionIndex + 1} - Score: <span className={getScoreColor()}>{score}/{questionIndex + 1}</span>
                </div>
                <div className="text-lg font-semibold text-blue-600">
                  Time: {formatTime(timeRemaining)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sign Grid */}
          {!quizActive && (
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {getFilteredSigns().map((sign) => (
                  <div
                    key={sign.id}
                    className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${
                      currentSign?.id === sign.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => selectSign(sign)}
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🚦</div>
                        <div className="text-xs text-gray-500">Sign Image</div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{sign.name}</h3>
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                      <span className="capitalize">{sign.category}</span>
                      <span className={`px-2 py-1 rounded-full ${
                        sign.importance === 'critical' ? 'bg-red-100 text-red-800' :
                        sign.importance === 'high' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {sign.importance}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startSignQuiz(sign);
                      }}
                      className="w-full text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded hover:bg-blue-200 transition-colors"
                    >
                      Quiz
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Sign Details */}
          {currentSign && !quizActive && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🚦</div>
                      <div className="text-xs text-gray-500">Sign Image</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{currentSign.name}</h2>
                    <div className="flex gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {currentSign.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        currentSign.importance === 'critical' ? 'bg-red-100 text-red-800' :
                        currentSign.importance === 'high' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {currentSign.importance}
                      </span>
                      {currentSign.cdlSpecific && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          CDL Specific
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-4">{currentSign.description}</p>
                    <button
                      onClick={() => startSignQuiz(currentSign)}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Quiz on This Sign
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Practice Mode Display */}
          {trainingMode === 'practice' && currentSign && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Practice Mode</h2>
                <div className="text-center">
                  <div className="text-8xl mb-4">🚦</div>
                  <h3 className="text-3xl font-bold mb-2">{currentSign.name}</h3>
                  <p className="text-gray-700 mb-6">{currentSign.description}</p>
                  <button
                    onClick={startPractice}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next Sign
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Question Display */}
          {currentQuestion && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-6">
                  <div className="text-6xl mb-4 text-center">🚦</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {currentSign?.name} - Question {questionIndex + 1}
                  </h3>
                  <p className="text-gray-700 text-lg">{currentQuestion.question}</p>
                </div>
                
                <div className="space-y-3 mb-6">
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
                      <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </button>
                  ))}
                </div>

                {showResult && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700">
                      <span className="font-semibold">Explanation:</span> {currentQuestion.explanation}
                    </p>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    onClick={resetTraining}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Exit Quiz
                  </button>
                  
                  {!showResult ? (
                    <button
                      onClick={submitAnswer}
                      disabled={selectedAnswer === null}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Next Question
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Training Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Signs:</span>
                  <span className="font-semibold">{getAllSigns().length}</span>
                </div>
                <div className="flex justify-between">
                  <span>CDL Specific:</span>
                  <span className="font-semibold">{getCDLSpecificSigns().length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Critical Signs:</span>
                  <span className="font-semibold">{getCriticalSigns().length}</span>
                </div>
                {quizActive && (
                  <>
                    <div className="flex justify-between">
                      <span>Current Score:</span>
                      <span className={`font-semibold ${getScoreColor()}`}>
                        {score}/{questionIndex + 1}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Percentage:</span>
                      <span className={`font-semibold ${getScoreColor()}`}>
                        {Math.round((score / (questionIndex + 1)) * 100)}%
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Live Share Component */}
            <div className="mb-6">
              <LiveShare trainingType="road-signs" />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Training Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Start with regulatory signs - they're most important</li>
                <li>• Practice daily for better retention</li>
                <li>• Focus on CDL-specific signs first</li>
                <li>• Use practice mode to familiarize yourself</li>
                <li>• Take quizzes to test your knowledge</li>
                <li>• Pay special attention to critical signs</li>
                <li>• Use live sharing for group training</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
