'use client'

import { useState, useEffect } from 'react'
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  Play, 
  Pause,
  Flag,
  BookOpen,
  Award
} from 'lucide-react'

export function CDLPracticeExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(3600) // 60 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [answers, setAnswers] = useState({})
  const [isPaused, setIsPaused] = useState(false)

  // Sample CDL practice questions
  const questions = [
    {
      id: 1,
      question: "What is the maximum speed limit for commercial vehicles in a school zone?",
      options: [
        "15 mph",
        "20 mph", 
        "25 mph",
        "30 mph"
      ],
      correct: 1,
      explanation: "The maximum speed limit for commercial vehicles in a school zone is 20 mph when children are present."
    },
    {
      id: 2,
      question: "How far ahead should you look when driving a commercial vehicle?",
      options: [
        "5-8 seconds",
        "10-12 seconds",
        "15-20 seconds",
        "25-30 seconds"
      ],
      correct: 2,
      explanation: "You should look 15-20 seconds ahead when driving a commercial vehicle to identify potential hazards early."
    },
    {
      id: 3,
      question: "What is the minimum tread depth for commercial vehicle tires?",
      options: [
        "1/32 inch",
        "2/32 inch",
        "4/32 inch",
        "6/32 inch"
      ],
      correct: 2,
      explanation: "Commercial vehicle tires must have a minimum tread depth of 4/32 inch on steering axle tires and 2/32 inch on other tires."
    },
    {
      id: 4,
      question: "When should you perform a pre-trip inspection?",
      options: [
        "Only before long trips",
        "Every 24 hours",
        "Before every trip",
        "Only when required by law"
      ],
      correct: 2,
      explanation: "A pre-trip inspection should be performed before every trip to ensure the vehicle is safe to operate."
    },
    {
      id: 5,
      question: "What is the maximum weight allowed on a single axle?",
      options: [
        "18,000 lbs",
        "20,000 lbs",
        "22,000 lbs",
        "24,000 lbs"
      ],
      correct: 1,
      explanation: "The maximum weight allowed on a single axle is 20,000 lbs under federal regulations."
    }
  ]

  // Timer effect
  useEffect(() => {
    if (!isPaused && timeRemaining > 0 && !isSubmitted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0 && !isSubmitted) {
      handleSubmit()
    }
  }, [timeRemaining, isPaused, isSubmitted])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(answers[currentQuestion + 1] || null)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1] || null)
    }
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    setShowResults(true)
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setTimeRemaining(3600)
    setIsSubmitted(false)
    setShowResults(false)
    setAnswers({})
    setIsPaused(false)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correct++
      }
    })
    return Math.round((correct / questions.length) * 100)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreMessage = (score) => {
    if (score >= 80) return 'Excellent! You passed!'
    if (score >= 70) return 'Good job! You passed!'
    return 'You need more practice. Keep studying!'
  }

  if (showResults) {
    const score = calculateScore()
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-8 text-center">
            <div className="mb-6">
              <Award className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Exam Complete!</h2>
              <p className="text-gray-600">Here are your results</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="text-6xl font-bold mb-2">
                <span className={getScoreColor(score)}>{score}%</span>
              </div>
              <p className={`text-xl font-medium ${getScoreColor(score)}`}>
                {getScoreMessage(score)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {questions.filter((_, index) => answers[index] === questions[index].correct).length}
                </div>
                <div className="text-sm text-blue-600">Correct Answers</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">
                  {questions.length - questions.filter((_, index) => answers[index] === questions[index].correct).length}
                </div>
                <div className="text-sm text-red-600">Incorrect Answers</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-600">
                  {questions.length}
                </div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleReset}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-4"
              >
                <RotateCcw className="w-4 h-4 inline mr-2" />
                Retake Exam
              </button>
              <button
                onClick={() => window.location.href = '/courses/cdl-fundamentals'}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Back to Course
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CDL Practice Exam</h1>
              <p className="text-gray-600">Test your knowledge with realistic CDL questions</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className={`text-lg font-mono ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-900'}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={index}
                    checked={selectedAnswer === index}
                    onChange={() => handleAnswerSelect(index)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                    )}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentQuestion(index)
                    setSelectedAnswer(answers[index] || null)
                  }}
                  className={`w-8 h-8 rounded-full text-sm ${
                    index === currentQuestion
                      ? 'bg-blue-600 text-white'
                      : answers[index] !== undefined
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="flex space-x-2">
              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Submit Exam
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


