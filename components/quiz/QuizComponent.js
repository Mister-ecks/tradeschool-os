'use client'

import { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Award, 
  RotateCcw,
  ChevronRight,
  Target,
  TrendingUp,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { hvacModule1KahootQuiz, hvacModule2KahootQuiz, hvacModule3KahootQuiz } from '@/data/hvac-complete-course'

export default function QuizComponent({ lessonId, title, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [userAnswers, setUserAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)

  // Get quiz data based on lesson ID
  const getQuizData = () => {
    switch (lessonId) {
      case 1:
        return hvacModule1KahootQuiz
      case 2:
        return hvacModule2KahootQuiz
      case 3:
        return hvacModule3KahootQuiz
      default:
        return hvacModule1KahootQuiz
    }
  }

  const quizData = getQuizData()
  const currentQuestion = quizData.questions[currentQuestionIndex]

  useEffect(() => {
    setTotalQuestions(quizData.questions.length)
  }, [quizData.questions.length])

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(null)
    }
  }, [timeLeft, showResult, quizCompleted])

  const handleAnswer = (answerIndex) => {
    if (showResult) return

    const isCorrect = answerIndex === currentQuestion.correctAnswer
    const newUserAnswers = {
      ...userAnswers,
      [currentQuestionIndex]: {
        answer: answerIndex,
        isCorrect,
        points: isCorrect ? currentQuestion.points : 0
      }
    }

    setUserAnswers(newUserAnswers)
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    if (isCorrect) {
      setScore(prev => prev + currentQuestion.points)
    }

    // Auto-advance after 3 seconds
    setTimeout(() => {
      if (currentQuestionIndex < quizData.questions.length - 1) {
        nextQuestion()
      } else {
        completeQuiz(newUserAnswers)
      }
    }, 3000)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setTimeLeft(30)
    }
  }

  const completeQuiz = (finalAnswers) => {
    const totalScore = Object.values(finalAnswers).reduce((sum, answer) => sum + answer.points, 0)
    const maxScore = quizData.questions.reduce((sum, question) => sum + question.points, 0)
    const percentage = Math.round((totalScore / maxScore) * 100)
    
    setQuizCompleted(true)
    setScore(totalScore)
    
    if (onComplete) {
      onComplete({
        score: totalScore,
        maxScore,
        percentage,
        answers: finalAnswers,
        questions: quizData.questions
      })
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setUserAnswers({})
    setShowResult(false)
    setTimeLeft(30)
    setQuizCompleted(false)
    setScore(0)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'hard':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (quizCompleted) {
    const percentage = Math.round((score / (totalQuestions * 10)) * 100)
    
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-primary-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Quiz Complete!
          </h2>
          
          <p className="text-gray-600 mb-8">
            Great job on completing the {title} quiz!
          </p>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {score}
                </div>
                <div className="text-sm text-gray-600">Total Score</div>
              </div>
              
              <div className="text-center">
                <div className={cn("text-3xl font-bold mb-2", getScoreColor(percentage))}>
                  {percentage}%
                </div>
                <div className="text-sm text-gray-600">Percentage</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {Object.values(userAnswers).filter(answer => answer.isCorrect).length}/{totalQuestions}
                </div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </button>
            
            <button
              onClick={() => onComplete && onComplete({ score, percentage, answers: userAnswers })}
              className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4 mr-2" />
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Quiz Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Target className="w-4 h-4 mr-1" />
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {timeLeft}s
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
              getDifficultyColor(currentQuestion.difficulty)
            )}>
              {currentQuestion.difficulty}
            </span>
            <div className="flex items-center text-sm text-gray-600">
              <Zap className="w-4 h-4 mr-1" />
              {currentQuestion.points} points
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrect = index === currentQuestion.correctAnswer
            const showCorrect = showResult && isCorrect
            const showIncorrect = showResult && isSelected && !isCorrect

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={cn(
                  "w-full p-4 text-left rounded-lg border-2 transition-all duration-200",
                  showResult
                    ? showCorrect
                      ? "border-green-500 bg-green-50 text-green-900"
                      : showIncorrect
                      ? "border-red-500 bg-red-50 text-red-900"
                      : "border-gray-200 bg-gray-50 text-gray-500"
                    : isSelected
                    ? "border-primary-500 bg-primary-50 text-primary-900"
                    : "border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {showResult && (
                    <div className="flex items-center">
                      {showCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                      {showIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
            <p className="text-blue-800">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Next Button */}
        {showResult && currentQuestionIndex < totalQuestions - 1 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={nextQuestion}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Next Question
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}



