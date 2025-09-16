'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  DragHandleDots2Icon as Grip,
  Clock,
  Flag,
  Lightbulb
} from 'lucide-react'

export function MultipleChoiceQuestion({ question, onAnswer, showResult, userAnswer }) {
  const handleAnswer = useCallback((answer) => {
    if (!showResult) {
      onAnswer(answer, answer === question.correctAnswer)
    }
  }, [question.correctAnswer, onAnswer, showResult])

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {question.question}
        </h3>
        <div className="flex items-center space-x-2 ml-4">
          <span className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
            question.difficulty === 'easy' ? "text-green-600 bg-green-100" :
            question.difficulty === 'medium' ? "text-yellow-600 bg-yellow-100" :
            "text-red-600 bg-red-100"
          )}>
            {question.difficulty}
          </span>
          <span className="text-sm text-gray-500">{question.points} pts</span>
        </div>
      </div>

      <div className="space-y-2">
        {question.options.map((option, index) => {
          const isSelected = userAnswer === option
          const isCorrect = option === question.correctAnswer
          const showCorrect = showResult && isCorrect
          const showIncorrect = showResult && isSelected && !isCorrect

          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
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

      {showResult && question.explanation && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Explanation:</h4>
              <p className="text-blue-800">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function TrueFalseQuestion({ question, onAnswer, showResult, userAnswer }) {
  const handleAnswer = useCallback((answer) => {
    if (!showResult) {
      onAnswer(answer, answer === question.correctAnswer)
    }
  }, [question.correctAnswer, onAnswer, showResult])

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {question.question}
        </h3>
        <div className="flex items-center space-x-2 ml-4">
          <span className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
            question.difficulty === 'easy' ? "text-green-600 bg-green-100" :
            question.difficulty === 'medium' ? "text-yellow-600 bg-yellow-100" :
            "text-red-600 bg-red-100"
          )}>
            {question.difficulty}
          </span>
          <span className="text-sm text-gray-500">{question.points} pts</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {['True', 'False'].map((option) => {
          const isSelected = userAnswer === option
          const isCorrect = option === question.correctAnswer
          const showCorrect = showResult && isCorrect
          const showIncorrect = showResult && isSelected && !isCorrect

          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={showResult}
              className={cn(
                "p-6 text-center rounded-lg border-2 transition-all duration-200",
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
              <div className="flex items-center justify-center">
                <span className="text-lg font-semibold">{option}</span>
                {showResult && (
                  <div className="ml-2">
                    {showCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {showIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {showResult && question.explanation && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Explanation:</h4>
              <p className="text-blue-800">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function FillInTheBlankQuestion({ question, onAnswer, showResult, userAnswer }) {
  const [inputValue, setInputValue] = useState(userAnswer || '')

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onAnswer(inputValue.trim(), inputValue.trim().toLowerCase() === question.correctAnswer.toLowerCase())
    }
  }, [inputValue, question.correctAnswer, onAnswer])

  const isCorrect = showResult && inputValue.toLowerCase() === question.correctAnswer.toLowerCase()

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {question.question}
        </h3>
        <div className="flex items-center space-x-2 ml-4">
          <span className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
            question.difficulty === 'easy' ? "text-green-600 bg-green-100" :
            question.difficulty === 'medium' ? "text-yellow-600 bg-yellow-100" :
            "text-red-600 bg-red-100"
          )}>
            {question.difficulty}
          </span>
          <span className="text-sm text-gray-500">{question.points} pts</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={showResult}
            placeholder="Type your answer here..."
            className={cn(
              "w-full p-4 border-2 rounded-lg text-lg font-medium transition-all duration-200",
              showResult
                ? isCorrect
                  ? "border-green-500 bg-green-50 text-green-900"
                  : "border-red-500 bg-red-50 text-red-900"
                : "border-gray-200 bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            )}
          />
          {showResult && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {isCorrect ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
            </div>
          )}
        </div>

        {!showResult && (
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="w-full py-3 px-6 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Submit Answer
          </button>
        )}
      </form>

      {showResult && question.explanation && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Explanation:</h4>
              <p className="text-blue-800">{question.explanation}</p>
              {!isCorrect && (
                <p className="text-blue-800 mt-2">
                  <strong>Correct answer:</strong> {question.correctAnswer}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function DragAndDropQuestion({ question, onAnswer, showResult, userAnswer }) {
  const [draggedItem, setDraggedItem] = useState(null)
  const [dropZones, setDropZones] = useState(userAnswer || {})

  const handleDragStart = (e, item) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, zoneId) => {
    e.preventDefault()
    if (draggedItem) {
      const newDropZones = { ...dropZones, [zoneId]: draggedItem }
      setDropZones(newDropZones)
      setDraggedItem(null)
      
      if (!showResult) {
        const isCorrect = Object.keys(newDropZones).every(zoneId => 
          newDropZones[zoneId] === question.correctAnswer[zoneId]
        )
        onAnswer(newDropZones, isCorrect)
      }
    }
  }

  const removeItem = (zoneId) => {
    if (!showResult) {
      const newDropZones = { ...dropZones }
      delete newDropZones[zoneId]
      setDropZones(newDropZones)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {question.question}
        </h3>
        <div className="flex items-center space-x-2 ml-4">
          <span className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
            question.difficulty === 'easy' ? "text-green-600 bg-green-100" :
            question.difficulty === 'medium' ? "text-yellow-600 bg-yellow-100" :
            "text-red-600 bg-red-100"
          )}>
            {question.difficulty}
          </span>
          <span className="text-sm text-gray-500">{question.points} pts</span>
        </div>
      </div>

      {/* Drag Items */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {question.dragItems.map((item, index) => {
          const isUsed = Object.values(dropZones).includes(item)
          return (
            <div
              key={index}
              draggable={!showResult && !isUsed}
              onDragStart={(e) => handleDragStart(e, item)}
              className={cn(
                "p-4 border-2 border-dashed rounded-lg text-center cursor-move transition-all duration-200",
                isUsed
                  ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "border-primary-300 bg-primary-50 text-primary-900 hover:border-primary-400 hover:bg-primary-100"
              )}
            >
              <Grip className="w-5 h-5 mx-auto mb-2" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          )
        })}
      </div>

      {/* Drop Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.dropZones.map((zone, index) => {
          const zoneId = `zone-${index}`
          const item = dropZones[zoneId]
          const isCorrect = showResult && item === question.correctAnswer[zoneId]
          const isIncorrect = showResult && item && item !== question.correctAnswer[zoneId]

          return (
            <div
              key={index}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, zoneId)}
              className={cn(
                "min-h-[100px] p-4 border-2 border-dashed rounded-lg transition-all duration-200",
                showResult
                  ? isCorrect
                    ? "border-green-500 bg-green-50"
                    : isIncorrect
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-gray-50"
                  : "border-gray-300 bg-gray-50 hover:border-primary-400 hover:bg-primary-50"
              )}
            >
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700 mb-2">{zone}</div>
                {item ? (
                  <div className="flex items-center justify-between">
                    <span className="text-primary-900 font-medium">{item}</span>
                    {!showResult && (
                      <button
                        onClick={() => removeItem(zoneId)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                    {showResult && (
                      <div>
                        {isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {isIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">Drop item here</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {showResult && question.explanation && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Explanation:</h4>
              <p className="text-blue-800">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function MatchingQuestion({ question, onAnswer, showResult, userAnswer }) {
  const [matches, setMatches] = useState(userAnswer || {})

  const handleMatch = (leftItem, rightItem) => {
    if (!showResult) {
      const newMatches = { ...matches, [leftItem]: rightItem }
      setMatches(newMatches)
      
      const isCorrect = Object.keys(newMatches).every(leftItem => 
        newMatches[leftItem] === question.correctAnswer[leftItem]
      )
      onAnswer(newMatches, isCorrect)
    }
  }

  const removeMatch = (leftItem) => {
    if (!showResult) {
      const newMatches = { ...matches }
      delete newMatches[leftItem]
      setMatches(newMatches)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {question.question}
        </h3>
        <div className="flex items-center space-x-2 ml-4">
          <span className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
            question.difficulty === 'easy' ? "text-green-600 bg-green-100" :
            question.difficulty === 'medium' ? "text-yellow-600 bg-yellow-100" :
            "text-red-600 bg-red-100"
          )}>
            {question.difficulty}
          </span>
          <span className="text-sm text-gray-500">{question.points} pts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Items</h4>
          {question.leftItems.map((item, index) => {
            const isMatched = matches[item]
            const isCorrect = showResult && matches[item] === question.correctAnswer[item]
            const isIncorrect = showResult && matches[item] && matches[item] !== question.correctAnswer[item]

            return (
              <div
                key={index}
                className={cn(
                  "p-4 border-2 rounded-lg transition-all duration-200",
                  showResult
                    ? isCorrect
                      ? "border-green-500 bg-green-50"
                      : isIncorrect
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-gray-50"
                    : "border-gray-300 bg-white hover:border-primary-400 hover:bg-primary-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item}</span>
                  {isMatched && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">→ {matches[item]}</span>
                      {!showResult && (
                        <button
                          onClick={() => removeMatch(item)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                      {showResult && (
                        <div>
                          {isCorrect && <CheckCircle className="w-4 h-4 text-green-600" />}
                          {isIncorrect && <XCircle className="w-4 h-4 text-red-600" />}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Matches</h4>
          {question.rightItems.map((item, index) => {
            const isUsed = Object.values(matches).includes(item)
            return (
              <button
                key={index}
                onClick={() => {
                  // Find the first unmatched left item
                  const leftItem = question.leftItems.find(left => !matches[left])
                  if (leftItem && !isUsed) {
                    handleMatch(leftItem, item)
                  }
                }}
                disabled={showResult || isUsed}
                className={cn(
                  "w-full p-4 text-left border-2 rounded-lg transition-all duration-200",
                  isUsed
                    ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "border-primary-300 bg-primary-50 text-primary-900 hover:border-primary-400 hover:bg-primary-100"
                )}
              >
                <span className="font-medium">{item}</span>
              </button>
            )
          })}
        </div>
      </div>

      {showResult && question.explanation && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Explanation:</h4>
              <p className="text-blue-800">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}







