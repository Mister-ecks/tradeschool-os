'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import signsData from '@/data/signs.json';

const RoadSignsLearningModule = () => {
  const [currentCategory, setCurrentCategory] = useState('regulatory');
  const [currentSignIndex, setCurrentSignIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizResults, setQuizResults] = useState({});
  const [categoryProgress, setCategoryProgress] = useState({});
  const [completedCategories, setCompletedCategories] = useState(new Set());

  // Group signs by category
  const signsByCategory = signsData.reduce((acc, sign) => {
    if (!acc[sign.category]) {
      acc[sign.category] = [];
    }
    acc[sign.category].push(sign);
    return acc;
  }, {});

  const currentSigns = signsByCategory[currentCategory] || [];
  const currentSign = currentSigns[currentSignIndex];
  const currentQuiz = currentSign?.quiz?.[0];

  // Initialize category progress
  useEffect(() => {
    const progress = {};
    Object.keys(signsByCategory).forEach(category => {
      progress[category] = {
        total: signsByCategory[category].length,
        correct: 0,
        attempted: 0
      };
    });
    setCategoryProgress(progress);
  }, []);

  const handleAnswerSelect = (answer) => {
    if (showAnswer) return;
    
    setSelectedAnswer(answer);
    setShowAnswer(true);
    
    const isCorrect = answer === currentQuiz.answer;
    
    // Update quiz results
    setQuizResults(prev => ({
      ...prev,
      [`${currentCategory}-${currentSignIndex}`]: {
        correct: isCorrect,
        answer: answer
      }
    }));

    // Update category progress
    setCategoryProgress(prev => ({
      ...prev,
      [currentCategory]: {
        ...prev[currentCategory],
        attempted: prev[currentCategory].attempted + 1,
        correct: prev[currentCategory].correct + (isCorrect ? 1 : 0)
      }
    }));
  };

  const nextSign = () => {
    if (currentSignIndex < currentSigns.length - 1) {
      setCurrentSignIndex(prev => prev + 1);
    } else {
      // Move to next category
      const categories = Object.keys(signsByCategory);
      const currentIndex = categories.indexOf(currentCategory);
      if (currentIndex < categories.length - 1) {
        setCurrentCategory(categories[currentIndex + 1]);
        setCurrentSignIndex(0);
      }
    }
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const prevSign = () => {
    if (currentSignIndex > 0) {
      setCurrentSignIndex(prev => prev - 1);
    } else {
      // Move to previous category
      const categories = Object.keys(signsByCategory);
      const currentIndex = categories.indexOf(currentCategory);
      if (currentIndex > 0) {
        setCurrentCategory(categories[currentIndex - 1]);
        setCurrentSignIndex(signsByCategory[categories[currentIndex - 1]].length - 1);
      }
    }
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const goToCategory = (category) => {
    setCurrentCategory(category);
    setCurrentSignIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const resetProgress = () => {
    setQuizResults({});
    setCategoryProgress(prev => {
      const newProgress = {};
      Object.keys(prev).forEach(category => {
        newProgress[category] = {
          total: prev[category].total,
          correct: 0,
          attempted: 0
        };
      });
      return newProgress;
    });
    setCompletedCategories(new Set());
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Regulatory': 'bg-red-100 text-red-800 border-red-200',
      'Warning': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Guide': 'bg-blue-100 text-blue-800 border-blue-200',
      'School': 'bg-green-100 text-green-800 border-green-200',
      'Construction': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Regulatory': '🚦',
      'Warning': '⚠️',
      'Guide': 'ℹ️',
      'School': '🏫',
      'Construction': '🚧'
    };
    return icons[category] || '📋';
  };

  const isAnswerCorrect = (answer) => {
    return answer === currentQuiz?.answer;
  };

  const canProceedToNextCategory = () => {
    const progress = categoryProgress[currentCategory];
    return progress && progress.attempted >= progress.total;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Road Signs Learning Module</h1>
              <p className="text-gray-600">Master Ontario road signs with interactive quizzes</p>
            </div>
            <button
              onClick={resetProgress}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Progress
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Category Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              
              {Object.keys(signsByCategory).map((category) => {
                const progress = categoryProgress[category] || { total: 0, correct: 0, attempted: 0 };
                const percentage = progress.total > 0 ? Math.round((progress.correct / progress.total) * 100) : 0;
                const isCurrentCategory = category === currentCategory;
                
                return (
                  <button
                    key={category}
                    onClick={() => goToCategory(category)}
                    className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                      isCurrentCategory 
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                        : 'hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium capitalize">{category} Signs</span>
                      <span className="text-sm">{progress.correct}/{progress.total}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getCategoryIcon(category)}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{percentage}%</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentCategory}-${currentSignIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                {/* Sign Display */}
                <div className="text-center mb-8">
                  <div className="w-64 h-64 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-6 shadow-inner">
                    {currentSign?.image ? (
                      <img 
                        src={currentSign.image} 
                        alt={currentSign.name}
                        className="w-full h-full object-contain rounded-xl"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <div className="text-6xl" style={{ display: currentSign?.image ? 'none' : 'block' }}>
                      {getCategoryIcon(currentCategory)}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentSign?.name}</h2>
                  <div className="flex justify-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm border ${getCategoryColor(currentCategory)}`}>
                      {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Sign Meaning */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Meaning</h3>
                  <p className="text-gray-700 text-lg">{currentSign?.meaning}</p>
                </div>

                {/* Quiz Section */}
                {currentQuiz && currentQuiz.question && (
                  <div className="border-t pt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Quiz Question</h3>
                    <p className="text-lg text-gray-800 mb-6">{currentQuiz.question}</p>
                    
                    <div className="space-y-3 mb-6">
                      {currentQuiz.options.map((option, index) => {
                        const isSelected = selectedAnswer === option;
                        const isCorrect = isAnswerCorrect(option);
                        const showCorrect = showAnswer && isCorrect;
                        const showIncorrect = showAnswer && isSelected && !isCorrect;
                        
                        return (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(option)}
                            disabled={showAnswer}
                            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                              showCorrect
                                ? 'border-green-500 bg-green-50 text-green-800'
                                : showIncorrect
                                ? 'border-red-500 bg-red-50 text-red-800'
                                : isSelected
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            } ${showAnswer ? 'cursor-default' : 'cursor-pointer'}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-medium">{String.fromCharCode(65 + index)})</span>
                              <span>{option}</span>
                              {showAnswer && (
                                <div className="ml-auto">
                                  {showCorrect ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                  ) : showIncorrect ? (
                                    <XCircle className="w-5 h-5 text-red-500" />
                                  ) : null}
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Answer Explanation */}
                    {showAnswer && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {isAnswerCorrect(selectedAnswer) ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                          <span className={`font-semibold ${
                            isAnswerCorrect(selectedAnswer) ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {isAnswerCorrect(selectedAnswer) ? 'Correct!' : 'Incorrect'}
                          </span>
                        </div>
                        <p className="text-gray-700">
                          The correct answer is: <strong>{currentQuiz.answer}</strong>
                        </p>
                      </motion.div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between items-center">
                      <button
                        onClick={prevSign}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        ← Previous
                      </button>
                      
                      <div className="text-sm text-gray-500">
                        {currentSignIndex + 1} of {currentSigns.length} in {currentCategory}
                      </div>
                      
                      <button
                        onClick={nextSign}
                        disabled={currentQuiz && currentQuiz.question && !showAnswer}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        {currentSignIndex < currentSigns.length - 1 ? 'Next' : 'Next Category'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* No Quiz Message */}
                {(!currentQuiz || !currentQuiz.question) && (
                  <div className="border-t pt-8">
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">📚</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Study Complete</h3>
                      <p className="text-gray-600">This sign has no quiz questions. Continue to the next sign to practice with quizzes.</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadSignsLearningModule;
