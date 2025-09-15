'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle, XCircle, Play, BookOpen, Upload } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { roadSigns } from '@/data/road-signs-complete';

const RoadSignModule = ({ studentId }) => {
  const [mode, setMode] = useState('study'); // 'study' or 'quiz'
  const [currentSignIndex, setCurrentSignIndex] = useState(0);
  const [quizResults, setQuizResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [uploadedImages, setUploadedImages] = useState({});
  const [showImageUpload, setShowImageUpload] = useState(false);

  // Use comprehensive road signs data
  const roadSignsData = roadSigns;

  const currentSign = roadSignsData[currentSignIndex];
  const currentQuestion = currentSign?.questions?.[0];

  // Handle image upload
  const handleImageUpload = (imageUrl, signId) => {
    setUploadedImages(prev => ({
      ...prev,
      [signId]: imageUrl
    }));
  };

  // Function to generate visual representation of road signs
  const getSignVisual = (sign, small = false) => {
    const signId = sign?.id;
    const sizeClass = small ? 'w-6 h-6' : 'w-32 h-32';
    const textSize = small ? 'text-xs' : 'text-xl';
    const borderSize = small ? 'border-2' : 'border-4';
    
    // Check if there's an uploaded image for this sign
    const uploadedImage = uploadedImages[signId];
    if (uploadedImage) {
      return (
        <div className={`${sizeClass} bg-gray-100 rounded-lg flex items-center justify-center shadow-lg overflow-hidden`}>
          <img 
            src={uploadedImage} 
            alt={sign?.name || 'Road sign'}
            className="w-full h-full object-contain"
          />
        </div>
      );
    }
    
    // Check if there's an official image file (only if it's a real image)
    if (sign?.image && !sign.image.startsWith('//')) {
      return (
        <div className={`${sizeClass} bg-gray-100 rounded-lg flex items-center justify-center shadow-lg overflow-hidden`}>
          <img 
            src={sign.image} 
            alt={sign?.name || 'Road sign'}
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback to CSS rendering if image fails to load
              e.target.style.display = 'none';
            }}
          />
        </div>
      );
    }
    
    // Fallback to CSS rendering for signs without images
    switch (signId) {
      case 'stop-sign':
        return (
          <div className={`${sizeClass} bg-red-600 flex items-center justify-center ${borderSize} border-white shadow-lg`} style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
            <span className={`text-white font-bold ${textSize}`}>STOP</span>
          </div>
        );
      case 'yield-sign':
        return (
          <div className={`${sizeClass} bg-white ${borderSize} border-red-600 flex items-center justify-center`} style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}>
            <span className={`text-red-600 font-bold ${textSize}`}>YIELD</span>
          </div>
        );
      case 'speed-limit':
        return (
          <div className={`${sizeClass} bg-white ${borderSize} border-black rounded-lg flex items-center justify-center shadow-lg`}>
            <div className="text-center">
              <div className={`${small ? 'text-lg' : 'text-4xl'} font-bold text-black`}>80</div>
              <div className={`${small ? 'text-xs' : 'text-sm'} text-black`}>km/h</div>
            </div>
          </div>
        );
      case 'no-entry':
        return (
          <div className={`${sizeClass} bg-white ${borderSize} border-red-600 rounded-full flex items-center justify-center shadow-lg`}>
            <div className={`${small ? 'w-4 h-1' : 'w-20 h-4'} bg-red-600`}></div>
          </div>
        );
      case 'one-way':
        return (
          <div className={`${sizeClass} bg-blue-600 rounded-lg flex items-center justify-center shadow-lg`}>
            <div className={`${small ? 'text-lg' : 'text-6xl'} text-white`}>→</div>
          </div>
        );
      case 'no-parking':
        return (
          <div className={`${sizeClass} bg-white ${borderSize} border-black rounded-lg flex items-center justify-center shadow-lg`}>
            <div className="relative">
              <div className={`${small ? 'w-4 h-4' : 'w-16 h-16'} bg-red-600 rounded-full flex items-center justify-center`}>
                <span className={`text-white font-bold ${small ? 'text-xs' : 'text-2xl'}`}>P</span>
              </div>
              <div className={`absolute top-0 left-0 ${small ? 'w-4 h-4' : 'w-16 h-16'} ${borderSize} border-red-600 rounded-full`} style={{transform: 'rotate(45deg)', transformOrigin: 'center'}}></div>
            </div>
          </div>
        );
      case 'no-stopping':
        return (
          <div className={`${sizeClass} bg-white ${borderSize} border-black rounded-lg flex items-center justify-center shadow-lg`}>
            <div className="relative">
              <div className={`${small ? 'w-4 h-4' : 'w-16 h-16'} bg-red-600 rounded-lg flex items-center justify-center`}>
                <span className={`text-white font-bold ${small ? 'text-xs' : 'text-lg'}`}>⛔</span>
              </div>
              <div className={`absolute top-0 left-0 ${small ? 'w-4 h-4' : 'w-16 h-16'} ${borderSize} border-red-600 rounded-lg`} style={{transform: 'rotate(45deg)', transformOrigin: 'center'}}></div>
            </div>
          </div>
        );
      case 'no-left-turn':
        return (
          <div className={`${sizeClass} bg-white ${borderSize} border-black rounded-lg flex items-center justify-center shadow-lg`} style={{borderWidth: small ? '2px' : '4px'}}>
            <div className="relative">
              <div className={`${small ? 'w-4 h-4' : 'w-16 h-16'} bg-red-600 rounded-full flex items-center justify-center`} style={{transform: 'rotate(45deg)', transformOrigin: 'center'}}>
                <div className={`${small ? 'w-3 h-0.5' : 'w-12 h-1'} bg-red-600`}></div>
              </div>
              <div className={`${small ? 'text-lg' : 'text-4xl'} text-black font-bold absolute`} style={{transform: 'rotate(-45deg)'}}>↰</div>
            </div>
          </div>
        );
      case 'no-right-turn':
        return (
          <div className={`${sizeClass} bg-white ${borderSize} border-black rounded-lg flex items-center justify-center shadow-lg`} style={{borderWidth: small ? '2px' : '4px'}}>
            <div className="relative">
              <div className={`${small ? 'w-4 h-4' : 'w-16 h-16'} bg-red-600 rounded-full flex items-center justify-center`} style={{transform: 'rotate(45deg)', transformOrigin: 'center'}}>
                <div className={`${small ? 'w-3 h-0.5' : 'w-12 h-1'} bg-red-600`}></div>
              </div>
              <div className={`${small ? 'text-lg' : 'text-4xl'} text-black font-bold absolute`} style={{transform: 'rotate(-45deg)'}}>↱</div>
            </div>
          </div>
        );
      case 'do-not-pass':
        return (
          <div className={`${sizeClass} bg-white ${borderSize} border-black rounded-lg flex items-center justify-center shadow-lg`} style={{borderWidth: small ? '2px' : '4px'}}>
            <div className="relative">
              <div className={`${small ? 'w-4 h-4' : 'w-16 h-16'} bg-red-600 rounded-full flex items-center justify-center`} style={{transform: 'rotate(45deg)', transformOrigin: 'center'}}>
                <div className={`${small ? 'w-3 h-0.5' : 'w-12 h-1'} bg-red-600`}></div>
              </div>
              <div className={`${small ? 'text-lg' : 'text-4xl'} text-black font-bold absolute`} style={{transform: 'rotate(-45deg)'}}>🚗🚗</div>
            </div>
          </div>
        );
      case 'curve-left':
        return (
          <div className={`${sizeClass} bg-yellow-400 ${borderSize} border-black rounded-lg flex items-center justify-center shadow-lg`} style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}>
            <div className={`${small ? 'text-lg' : 'text-4xl'} text-black`}>↶</div>
          </div>
        );
      case 'curve-right':
        return (
          <div className={`${sizeClass} bg-yellow-400 ${borderSize} border-black rounded-lg flex items-center justify-center shadow-lg`} style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}>
            <div className={`${small ? 'text-lg' : 'text-4xl'} text-black`}>↷</div>
          </div>
        );
      case 'winding-road':
        return (
          <div className={`${sizeClass} bg-yellow-400 ${borderSize} border-black rounded-lg flex items-center justify-center shadow-lg`} style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}>
            <div className={`${small ? 'text-lg' : 'text-4xl'} text-black`}>〰️</div>
          </div>
        );
      case 'steep-hill':
        return (
          <div className={`${sizeClass} bg-yellow-400 ${borderSize} border-black rounded-lg flex items-center justify-center shadow-lg`} style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}>
            <div className={`${small ? 'text-lg' : 'text-4xl'} text-black`}>🚛</div>
          </div>
        );
      case 'slippery-when-wet':
        return (
          <div className={`${sizeClass} bg-yellow-400 ${borderSize} border-black rounded-lg flex items-center justify-center shadow-lg`} style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}>
            <div className={`${small ? 'text-lg' : 'text-4xl'} text-black`}>🚗💧</div>
          </div>
        );
      case 'road-narrows':
        return (
          <div className={`${sizeClass} bg-yellow-400 ${borderSize} border-black rounded-lg flex items-center justify-center shadow-lg`} style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}>
            <div className={`${small ? 'text-lg' : 'text-4xl'} text-black`}>◀▶</div>
          </div>
        );
      case 'deer-crossing':
        return (
          <div className={`${sizeClass} bg-yellow-400 ${borderSize} border-black rounded-lg flex items-center justify-center shadow-lg`} style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}>
            <div className={`${small ? 'text-lg' : 'text-4xl'} text-black`}>🦌</div>
          </div>
        );
      case 'pedestrian-crossing':
        return (
          <div className={`${sizeClass} bg-yellow-400 ${borderSize} border-black rounded-lg flex items-center justify-center shadow-lg`} style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}>
            <div className={`${small ? 'text-lg' : 'text-4xl'} text-black`}>🚶</div>
          </div>
        );
      case 'school-zone-ahead':
        return (
          <div className={`${sizeClass} bg-yellow-400 ${borderSize} border-black flex items-center justify-center shadow-lg`} style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
            <div className={`${small ? 'text-lg' : 'text-4xl'} text-black`}>👦👧</div>
          </div>
        );
      case 'railway-crossing':
        return (
          <div className={`${sizeClass} bg-white ${borderSize} border-red-600 flex items-center justify-center shadow-lg`} style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
            <div className={`${small ? 'text-lg' : 'text-4xl'} text-black`}>🚂</div>
          </div>
        );
      case 'hospital':
        return (
          <div className={`${sizeClass} bg-blue-600 rounded-lg flex items-center justify-center shadow-lg`}>
            <span className={`text-white font-bold ${small ? 'text-lg' : 'text-4xl'}`}>H</span>
          </div>
        );
      case 'gas-station':
        return (
          <div className={`${sizeClass} bg-blue-600 rounded-lg flex items-center justify-center shadow-lg`}>
            <span className={`text-white font-bold ${small ? 'text-lg' : 'text-4xl'}`}>⛽</span>
          </div>
        );
      case 'rest-area':
        return (
          <div className={`${sizeClass} bg-blue-600 rounded-lg flex items-center justify-center shadow-lg`}>
            <span className={`text-white font-bold ${small ? 'text-lg' : 'text-4xl'}`}>🪑</span>
          </div>
        );
      case 'exit-sign':
        return (
          <div className={`${sizeClass} bg-green-600 rounded-lg flex items-center justify-center shadow-lg`}>
            <span className={`text-white font-bold ${small ? 'text-xs' : 'text-2xl'}`}>EXIT</span>
          </div>
        );
      case 'service-centre':
        return (
          <div className={`${sizeClass} bg-blue-600 rounded-lg flex items-center justify-center shadow-lg`}>
            <span className={`text-white font-bold ${small ? 'text-lg' : 'text-4xl'}`}>🏪</span>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <div className={`${small ? 'text-lg' : 'text-8xl'} mb-4`}>🚦</div>
            <p className={`${small ? 'text-xs' : 'text-gray-500'}`}>Road Sign</p>
          </div>
        );
    }
  };

  // Navigation functions
  const nextSign = () => {
    setCurrentSignIndex((prev) => (prev + 1) % roadSignsData.length);
  };

  const prevSign = () => {
    setCurrentSignIndex((prev) => (prev - 1 + roadSignsData.length) % roadSignsData.length);
  };

  const resetQuiz = () => {
    setQuizResults([]);
    setShowResult(false);
    setSelectedAnswer(null);
    setQuizScore(0);
    setIsQuizComplete(false);
    setCurrentSignIndex(0);
  };

  // Quiz functions
  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correct;
    const newResult = {
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer: currentQuestion.correct,
      isCorrect,
      explanation: currentQuestion.explanation
    };

    setQuizResults([...quizResults, newResult]);
    setQuizScore(prev => prev + (isCorrect ? 1 : 0));
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentSignIndex < roadSignsData.length - 1) {
      setCurrentSignIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsQuizComplete(true);
    }
  };

  const finishQuiz = () => {
    setIsQuizComplete(true);
  };

  // Filter signs by category for sidebar
  const regulatorySigns = roadSignsData.filter(sign => sign.category === 'regulatory');
  const warningSigns = roadSignsData.filter(sign => sign.category === 'warning');
  const guideSigns = roadSignsData.filter(sign => sign.category === 'guide');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Road Signs Training</h1>
              <p className="text-gray-600">Master Ontario road signs for safe driving</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('study')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'study' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Study Mode
              </button>
              <button
                onClick={() => setMode('quiz')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'quiz' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Play className="w-4 h-4 inline mr-2" />
                Quiz Mode
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sign Categories</h3>
              
              {/* Regulatory Signs */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-red-600 mb-2">Regulatory Signs ({regulatorySigns.length})</h4>
                <div className="space-y-1">
                  {regulatorySigns.slice(0, 10).map((sign, index) => (
                    <button
                      key={sign.id}
                      onClick={() => setCurrentSignIndex(roadSignsData.findIndex(s => s.id === sign.id))}
                      className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors ${
                        currentSign?.id === sign.id 
                          ? 'bg-red-100 text-red-800' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="w-6 h-6 flex-shrink-0">
                        {getSignVisual(sign, true)}
                      </div>
                      <span className="text-sm font-medium truncate">{sign.name}</span>
                    </button>
                  ))}
                  {regulatorySigns.length > 10 && (
                    <p className="text-xs text-gray-500 mt-2">+{regulatorySigns.length - 10} more...</p>
                  )}
                </div>
              </div>

              {/* Warning Signs */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-yellow-600 mb-2">Warning Signs ({warningSigns.length})</h4>
                <div className="space-y-1">
                  {warningSigns.slice(0, 10).map((sign, index) => (
                    <button
                      key={sign.id}
                      onClick={() => setCurrentSignIndex(roadSignsData.findIndex(s => s.id === sign.id))}
                      className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors ${
                        currentSign?.id === sign.id 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="w-6 h-6 flex-shrink-0">
                        {getSignVisual(sign, true)}
                      </div>
                      <span className="text-sm font-medium truncate">{sign.name}</span>
                    </button>
                  ))}
                  {warningSigns.length > 10 && (
                    <p className="text-xs text-gray-500 mt-2">+{warningSigns.length - 10} more...</p>
                  )}
                </div>
              </div>

              {/* Guide Signs */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-blue-600 mb-2">Guide Signs ({guideSigns.length})</h4>
                <div className="space-y-1">
                  {guideSigns.slice(0, 5).map((sign, index) => (
                    <button
                      key={sign.id}
                      onClick={() => setCurrentSignIndex(roadSignsData.findIndex(s => s.id === sign.id))}
                      className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors ${
                        currentSign?.id === sign.id 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="w-6 h-6 flex-shrink-0">
                        {getSignVisual(sign, true)}
                      </div>
                      <span className="text-sm font-medium truncate">{sign.name}</span>
                    </button>
                  ))}
                  {guideSigns.length > 5 && (
                    <p className="text-xs text-gray-500 mt-2">+{guideSigns.length - 5} more...</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {mode === 'study' ? (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSignIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Sign Display */}
                    <div className="text-center mb-8">
                      <div className="w-64 h-64 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                        <div className="text-center">
                          {getSignVisual(currentSign)}
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
                      
                      {/* Image Upload Section */}
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">Upload Official Image</h3>
                          <button
                            onClick={() => setShowImageUpload(!showImageUpload)}
                            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <Upload className="w-4 h-4" />
                            {showImageUpload ? 'Hide Upload' : 'Upload Image'}
                          </button>
                        </div>
                        
                        {showImageUpload && (
                          <div className="flex justify-center">
                            <ImageUpload
                              onImageUpload={handleImageUpload}
                              signId={currentSign.id}
                              currentImage={uploadedImages[currentSign.id]}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sign Information */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-700">{currentSign.description}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Meaning</h3>
                        <p className="text-gray-700">{currentSign.meaning}</p>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center">
                      <button
                        onClick={prevSign}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                      </button>
                      
                      <div className="text-sm text-gray-500">
                        {currentSignIndex + 1} of {roadSignsData.length}
                      </div>
                      
                      <button
                        onClick={nextSign}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              /* Quiz Mode */
              <div className="bg-white rounded-xl shadow-lg p-8">
                {!isQuizComplete ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSignIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Quiz Question */}
                      <div className="text-center mb-8">
                        <div className="w-48 h-48 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                          <div className="text-center">
                            {getSignVisual(currentSign)}
                          </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentQuestion?.question}</h2>
                      </div>

                      {/* Answer Options */}
                      <div className="space-y-3 mb-8">
                        {currentQuestion?.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                              selectedAnswer === index
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <span className="font-medium">{String.fromCharCode(65 + index)}) {option}</span>
                          </button>
                        ))}
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-center">
                        <button
                          onClick={submitAnswer}
                          disabled={selectedAnswer === null}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                          Submit Answer
                        </button>
                      </div>

                      {/* Result Display */}
                      {showResult && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-6 p-6 rounded-lg border-2"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            {selectedAnswer === currentQuestion.correct ? (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : (
                              <XCircle className="w-6 h-6 text-red-500" />
                            )}
                            <h3 className={`text-lg font-semibold ${
                              selectedAnswer === currentQuestion.correct ? 'text-green-800' : 'text-red-800'
                            }`}>
                              {selectedAnswer === currentQuestion.correct ? 'Correct!' : 'Incorrect'}
                            </h3>
                          </div>
                          <p className="text-gray-700 mb-4">{currentQuestion.explanation}</p>
                          <div className="flex justify-center">
                            <button
                              onClick={nextQuestion}
                              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              {currentSignIndex < roadSignsData.length - 1 ? 'Next Question' : 'Finish Quiz'}
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* Progress */}
                      <div className="mt-8 text-center text-sm text-gray-500">
                        Question {currentSignIndex + 1} of {roadSignsData.length}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  /* Quiz Complete */
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
                    <p className="text-xl text-gray-600 mb-6">
                      You scored {quizScore} out of {roadSignsData.length} questions
                    </p>
                    <div className="text-lg text-gray-700 mb-8">
                      {Math.round((quizScore / roadSignsData.length) * 100)}% accuracy
                    </div>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={resetQuiz}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Retake Quiz
                      </button>
                      <button
                        onClick={() => setMode('study')}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Back to Study
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadSignModule;
